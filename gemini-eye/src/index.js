/* BAE Gemini Eye — a tiny remote MCP server that lets Claude "watch" a video through Google Gemini.
   Gemini reads the moving picture AND the soundtrack; Claude gets back what happened, second by second.

   Endpoint:   POST https://<your-worker>.workers.dev/mcp/<ACCESS_TOKEN>
   Secrets:    GEMINI_API_KEY  (from https://aistudio.google.com/apikey)
               ACCESS_TOKEN    (any long random text; it is part of the connector URL, so only you can use it)
   Optional:   GEMINI_MODEL    (default gemini-3.8-flash)

   Tools:
     watch_video({video_url, question, fps?, start_s?, end_s?, json?})
     gemini_status()
*/
const PROTOCOLS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
const DEFAULT_MODEL = "gemini-3.8-flash";
const INLINE_MAX = 2 * 1024 * 1024; // tiny clips go inline; everything else through the Files API (no base64 work, fits the free CPU limit)
const FETCH_MAX = 90 * 1024 * 1024;

const TOOLS = [
  {
    name: "watch_video",
    title: "Watch a video with Gemini",
    description:
      "Gemini watches a video (moving picture and soundtrack together) from an https URL and answers the question about it. " +
      "Use it to review an AI-generated shot against its brief: who is where, faces and wardrobe, inside/outside, extra or duplicated people, " +
      "order of events, camera move, framing, motion quality (sliding feet, jitter, unwanted slow motion), lip-sync, dialogue, language, sound and music. " +
      "Ask for timestamps as MM:SS. Returns Gemini's answer as text (JSON text when json is true).",
    inputSchema: {
      type: "object",
      properties: {
        video_url: { type: "string", description: "Direct https URL of the video file (mp4/mov/webm)." },
        question: { type: "string", description: "What Gemini should look for and how to answer." },
        fps: { type: "number", description: "Frames per second Gemini samples, 1–10. Default 4 for short shots (fast action needs 5+)." },
        start_s: { type: "number", description: "Optional start of the clip to review, in seconds." },
        end_s: { type: "number", description: "Optional end of the clip to review, in seconds." },
        json: { type: "boolean", description: "Ask Gemini for a JSON reply (describe the shape in the question)." },
        model: { type: "string", description: "Optional Gemini model id to use instead of the default." },
      },
      required: ["video_url", "question"],
    },
  },
  {
    name: "gemini_status",
    title: "Check the Gemini connection",
    description: "Checks that the Gemini API key works and that the configured model is available.",
    inputSchema: { type: "object", properties: {} },
  },
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type, mcp-protocol-version, mcp-session-id, authorization",
      "access-control-allow-methods": "POST, GET, OPTIONS",
    };
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (url.pathname === "/" || url.pathname === "/health")
      return new Response("BAE Gemini Eye is running. Connect it in claude.ai with the /mcp/<ACCESS_TOKEN> URL.", { headers: { "content-type": "text/plain", ...cors } });

    const m = url.pathname.match(/^\/mcp\/([^/]+)\/?$/);
    if (!m || !env.ACCESS_TOKEN || !safeEqual(decodeURIComponent(m[1]), env.ACCESS_TOKEN))
      return new Response("Not found", { status: 404, headers: cors });
    if (request.method === "GET") return new Response("Method not allowed", { status: 405, headers: { allow: "POST", ...cors } });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });

    let body;
    try { body = await request.json(); } catch { return json(rpcError(null, -32700, "Parse error"), 400, cors); }
    const msgs = Array.isArray(body) ? body : [body];
    const out = [];
    for (const msg of msgs) {
      const res = await handle(msg, env, request);
      if (res) out.push(res);
    }
    if (!out.length) return new Response(null, { status: 202, headers: cors });
    return json(Array.isArray(body) ? out : out[0], 200, cors);
  },
};

async function handle(msg, env, request) {
  const { id, method, params } = msg || {};
  const isNote = id === undefined || id === null;
  try {
    switch (method) {
      case "initialize": {
        const asked = params?.protocolVersion;
        return ok(id, {
          protocolVersion: PROTOCOLS.includes(asked) ? asked : PROTOCOLS[0],
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: "bae-gemini-eye", title: "BAE Gemini Eye", version: "1.0.0" },
          instructions: "Gemini watches videos for Claude. Call watch_video with a direct video URL and a precise review question; ask for MM:SS timestamps.",
        });
      }
      case "notifications/initialized":
      case "notifications/cancelled":
        return null;
      case "ping":
        return ok(id, {});
      case "tools/list":
        return ok(id, { tools: TOOLS });
      case "tools/call": {
        const name = params?.name, args = params?.arguments || {};
        if (name === "gemini_status") return ok(id, await status(env));
        if (name === "watch_video") return ok(id, await watch(args, env));
        return rpcError(id, -32602, `Unknown tool: ${name}`);
      }
      default:
        return isNote ? null : rpcError(id, -32601, `Method not found: ${method}`);
    }
  } catch (e) {
    return ok(id, toolError(e?.message || String(e)));
  }
}

async function status(env) {
  if (!env.GEMINI_API_KEY) return toolError("GEMINI_API_KEY is not set on the worker.");
  const model = env.GEMINI_MODEL || DEFAULT_MODEL;
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}`, { headers: { "x-goog-api-key": env.GEMINI_API_KEY } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) return toolError(`Gemini said ${r.status}: ${j?.error?.message || "unknown error"} (model ${model})`);
  return textResult(JSON.stringify({ ok: true, model, displayName: j.displayName || model, inputTokenLimit: j.inputTokenLimit || null, fallbacks: await fallbacks(model, env) }));
}

async function watch(args, env) {
  if (!env.GEMINI_API_KEY) return toolError("GEMINI_API_KEY is not set on the worker.");
  const videoUrl = String(args.video_url || "");
  const question = String(args.question || "").trim();
  if (!/^https:\/\//i.test(videoUrl)) return toolError("video_url must be a direct https URL of the video file.");
  if (!question) return toolError("question is required.");
  const model = String(args.model || "") || env.GEMINI_MODEL || DEFAULT_MODEL;
  const deadline = Date.now() + 85000; // stay under Cloudflare's ~100 s response limit
  const fps = clamp(Number(args.fps) || 4, 0.5, 10);

  // 1. download the video
  const vr = await fetch(videoUrl, { redirect: "follow" });
  if (!vr.ok) return toolError(`Could not download the video (${vr.status}). The link may have expired; get a fresh one.`);
  let mime = (vr.headers.get("content-type") || "").split(";")[0].trim();
  if (!/^video\//.test(mime)) mime = /\.webm(\?|$)/i.test(videoUrl) ? "video/webm" : /\.mov(\?|$)/i.test(videoUrl) ? "video/quicktime" : "video/mp4";
  const buf = await vr.arrayBuffer();
  if (buf.byteLength > FETCH_MAX) return toolError(`The video is ${(buf.byteLength / 1e6).toFixed(0)} MB; the limit here is ${FETCH_MAX / 1e6} MB.`);

  // 2. hand it to Gemini (inline when small, Files API when large)
  let part;
  if (buf.byteLength <= INLINE_MAX) part = { inline_data: { mime_type: mime, data: b64(buf) } };
  else part = { file_data: { mime_type: mime, file_uri: await uploadFile(buf, mime, env.GEMINI_API_KEY) } };
  const meta = { fps };
  if (Number.isFinite(+args.start_s)) meta.start_offset = `${Math.max(0, +args.start_s)}s`;
  if (Number.isFinite(+args.end_s)) meta.end_offset = `${Math.max(0, +args.end_s)}s`;
  part.video_metadata = meta;

  const req = {
    contents: [{ role: "user", parts: [part, { text: question }] }],
    generationConfig: { temperature: 0.2, ...(args.json ? { response_mime_type: "application/json" } : {}) },
  };
  const t0 = Date.now();
  let used = model;
  // the first model gets 35 s; if it is overloaded or slow, the faster fallbacks still fit in the time left
  let r = await gen(model, req, env.GEMINI_API_KEY, Math.min(deadline, Date.now() + 35000));
  if (!r.ok && r.status === 400 && /video_metadata|fps|offset/i.test(r.message || "")) {
    delete part.video_metadata; // some models refuse custom fps: retry with defaults
    r = await gen(model, req, env.GEMINI_API_KEY, deadline);
  }
  // busy model: wait and retry, then fall back to other Gemini models that can watch video
  const busy = (x) => !x.ok && [408, 429, 500, 503, 504, 524].includes(x.status);
  if (busy(r) && r.status !== 408 && deadline - Date.now() > 50000) {
    await new Promise((res) => setTimeout(res, 3000));
    r = await gen(model, req, env.GEMINI_API_KEY, deadline);
  }
  if (busy(r)) {
    for (const alt of await fallbacks(model, env)) {
      if (deadline - Date.now() < 15000) break;
      const r2 = await gen(alt, req, env.GEMINI_API_KEY, deadline);
      if (r2.ok) { r = r2; used = alt; break; }
      if (!busy(r2)) { r = r2; used = alt; break; }
    }
  }
  if (!r.ok) return toolError(`Gemini said ${r.status}: ${r.message}${busy(r) ? " — Google's models are busy right now; try again in a minute." : ""}`);
  const text = (r.json?.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
  if (!text) return toolError(`Gemini returned no answer (${r.json?.candidates?.[0]?.finishReason || r.json?.promptFeedback?.blockReason || "unknown reason"}).`);
  return {
    content: [{ type: "text", text }],
    structuredContent: { model: used, seconds: Math.round((Date.now() - t0) / 1000), bytes: buf.byteLength, fps, answer: text },
  };
}

/* other Gemini models to try when the chosen one is overloaded: GEMINI_FALLBACKS (comma list), else the newest flash/pro models this key can use */
async function fallbacks(model, env) {
  if (env.GEMINI_FALLBACKS) return env.GEMINI_FALLBACKS.split(",").map((s) => s.trim()).filter((m) => m && m !== model).slice(0, 3);
  try {
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=200", { headers: { "x-goog-api-key": env.GEMINI_API_KEY } });
    const j = await r.json();
    const ver = (n) => parseFloat((n.match(/gemini-(\d+(?:\.\d+)?)/) || [])[1] || 0);
    return (j.models || [])
      .filter((m) => (m.supportedGenerationMethods || []).includes("generateContent"))
      .map((m) => m.name.replace(/^models\//, ""))
      .filter((n) => /^gemini-\d+(\.\d+)?-(flash|pro)(-preview)?$/.test(n) && n !== model)
      .sort((a, b) => ver(b) - ver(a) || (/flash/.test(a) ? -1 : 1))
      .slice(0, 3);
  } catch { return []; }
}

async function gen(model, req, key, deadline) {
  const ctl = new AbortController();
  const ms = Math.max(5000, (deadline || Date.now() + 80000) - Date.now());
  const timer = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(req),
      signal: ctl.signal,
    });
    const j = await r.json().catch(() => ({}));
    return { ok: r.ok, status: r.status, json: j, message: j?.error?.message || "", model };
  } catch (e) {
    return { ok: false, status: 408, json: {}, message: `${model} took too long to answer`, model };
  } finally { clearTimeout(timer); }
}

async function uploadFile(buf, mime, key) {
  const start = await fetch("https://generativelanguage.googleapis.com/upload/v1beta/files", {
    method: "POST",
    headers: {
      "x-goog-api-key": key,
      "X-Goog-Upload-Protocol": "resumable",
      "X-Goog-Upload-Command": "start",
      "X-Goog-Upload-Header-Content-Length": String(buf.byteLength),
      "X-Goog-Upload-Header-Content-Type": mime,
      "content-type": "application/json",
    },
    body: JSON.stringify({ file: { display_name: "bae-shot-review" } }),
  });
  const upUrl = start.headers.get("x-goog-upload-url");
  if (!start.ok || !upUrl) throw new Error(`Gemini file upload could not start (${start.status}).`);
  const up = await fetch(upUrl, {
    method: "POST",
    headers: { "Content-Length": String(buf.byteLength), "X-Goog-Upload-Offset": "0", "X-Goog-Upload-Command": "upload, finalize" },
    body: buf,
  });
  const fj = await up.json().catch(() => ({}));
  const file = fj.file;
  if (!up.ok || !file?.uri) throw new Error(`Gemini file upload failed (${up.status}).`);
  // wait until the video is processed
  for (let i = 0; i < 40 && file.state && file.state !== "ACTIVE"; i++) {
    if (file.state === "FAILED") throw new Error("Gemini could not process the video file.");
    await new Promise((r) => setTimeout(r, 1500));
    const s = await fetch(`https://generativelanguage.googleapis.com/v1beta/${file.name}`, { headers: { "x-goog-api-key": key } });
    Object.assign(file, await s.json().catch(() => ({})));
  }
  return file.uri;
}

/* helpers */
const ok = (id, result) => ({ jsonrpc: "2.0", id, result });
const rpcError = (id, code, message) => ({ jsonrpc: "2.0", id, error: { code, message } });
const textResult = (text) => ({ content: [{ type: "text", text }] });
const toolError = (text) => ({ content: [{ type: "text", text }], isError: true });
const json = (o, status, headers) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json", ...headers } });
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
function b64(buf) {
  const bytes = new Uint8Array(buf);
  let s = "";
  const CH = 0x8000;
  for (let i = 0; i < bytes.length; i += CH) s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
  return btoa(s);
}
