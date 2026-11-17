import { Buffer } from "node:buffer";
import { DurableObject } from "cloudflare:workers";
import ADDON_INIT from "../addon/bae_booth/__init__.py";
import ADDON_CLIENT from "../addon/bae_booth/client.py";
import ENGINE_RUN from "../addon/bae_booth/engine/run_job.py";
import ENGINE_BUILD from "../addon/bae_booth/engine/build_booth.py";

/* BAE 3D Booth bridge — a small job queue between BAE Studio and the render Mac.

   BAE Studio (a claude.ai artifact) talks to it as a claude.ai connector named "BAE 3D Booth":
       POST https://<worker>/mcp/<token>
   The Blender add-on on the Mac talks to it over plain HTTPS:
       /d/pair  /d/hello  /d/next  /d/file  /d/progress  /d/out  /d/done
   A Mac is used only after someone approves it in the studio (the add-on shows a 6-digit code).

   No secrets to type: the connector token is made on the first visit of the worker's home page,
   which shows the connector address once, until the connector is used for the first time.
   Optional: set ACCESS_TOKEN on the worker to choose the token yourself.
*/
const VERSION = "1.0.0";
const PROTOCOLS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
const CH = 512 * 1024; // file piece size, for uploads and downloads
const ONLINE_S = 45; // a Mac that called in the last 45 s is online
const LOST_S = 180; // a running job whose Mac has been silent this long goes back to the queue
const KEEP_DAYS = 30;

const TOOLS = [
  {
    name: "booth_status",
    title: "Render Macs and queue",
    description: "Lists the render Macs (pending ones show the 6-digit code their Blender add-on displays), whether each is online, the queue, and the connector address to share with the team.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
  },
  {
    name: "booth_device",
    title: "Approve, rename or remove a render Mac",
    description: "action approve: the Mac starts taking jobs. remove: the Mac is forgotten and must pair again. rename: give it a name.",
    inputSchema: { type: "object", properties: { device_id: { type: "string" }, action: { type: "string", enum: ["approve", "remove", "rename"] }, name: { type: "string" } }, required: ["device_id", "action"] },
  },
  {
    name: "booth_upload",
    title: "Send a file for a job",
    description: "Sends one base64 piece of a file (a design, a texture, a plan). Pieces are 524288 bytes except the last. First piece: no upload_id, give name, mime and bytes (total size); the result has upload_id for the next pieces. complete=true when all bytes arrived. Unused uploads are deleted after a day.",
    inputSchema: { type: "object", properties: { upload_id: { type: "string" }, name: { type: "string" }, mime: { type: "string" }, bytes: { type: "number" }, offset: { type: "number" }, data: { type: "string", description: "base64" } }, required: ["offset", "data"] },
  },
  {
    name: "booth_submit",
    title: "Queue a booth job",
    description: "Queues a job for the render Mac. kind build: builds the booth from spec (centimetres) in Blender and renders the views in options. files maps a path used in spec (e.g. tex/front.png) to an upload_id from booth_upload.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        kind: { type: "string", enum: ["build"] },
        spec: { type: "object" },
        files: { type: "object", additionalProperties: { type: "string" } },
        options: { type: "object" },
        by: { type: "string", description: "who asked (a display name), shown in the job list" },
      },
      required: ["kind", "spec"],
    },
  },
  {
    name: "booth_jobs",
    title: "List booth jobs",
    description: "The latest jobs with status (queued, running, done, failed, cancelled), progress and their output files.",
    inputSchema: { type: "object", properties: { limit: { type: "number" } } },
    annotations: { readOnlyHint: true },
  },
  {
    name: "booth_job",
    title: "One booth job",
    description: "One job with progress, the end of its log, result and output files.",
    inputSchema: { type: "object", properties: { job_id: { type: "string" } }, required: ["job_id"] },
    annotations: { readOnlyHint: true },
  },
  {
    name: "booth_download",
    title: "Read a piece of an output file",
    description: "Returns base64 bytes of an output file starting at offset (pieces of up to 524288 bytes). next is the offset of the following piece, or null at the end.",
    inputSchema: { type: "object", properties: { file_id: { type: "string" }, offset: { type: "number" } }, required: ["file_id"] },
    annotations: { readOnlyHint: true },
  },
  {
    name: "booth_cancel",
    title: "Cancel a booth job",
    description: "Cancels a queued job, or asks the Mac to stop a running one.",
    inputSchema: { type: "object", properties: { job_id: { type: "string" } }, required: ["job_id"] },
  },
];

const hub = (env) => env.HUB.get(env.HUB.idFromName("main"));
const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type, mcp-protocol-version, mcp-session-id, authorization",
  "access-control-allow-methods": "POST, GET, OPTIONS",
};
const json = (o, status = 200, h = {}) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json", ...cors, ...h } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const H = hub(env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (url.pathname === "/health") return new Response("BAE 3D Booth bridge is running.", { headers: { "content-type": "text/plain", ...cors } });
    if (url.pathname === "/" || url.pathname === "/setup") return homePage(url, env, H);
    if (url.pathname === "/addon.zip" || url.pathname === "/bae_booth.zip")
      return new Response(addonZip(url.origin), { headers: { "content-type": "application/zip", "content-disposition": 'attachment; filename="bae_booth.zip"', ...cors } });

    /* the render Mac */
    const d = url.pathname.match(/^\/d\/([a-z]+)(?:\/([\w-]+))?(?:\/(\d+))?$/);
    if (d) {
      try { return await device(request, url, d, H); }
      catch (e) { return json({ error: e?.message || String(e) }, e?.status || 500); }
    }

    /* the studio, through the claude.ai connector */
    const m = url.pathname.match(/^\/mcp\/([^/]+)\/?$/);
    if (!m) return new Response("Not found", { status: 404, headers: cors });
    const token = env.ACCESS_TOKEN || (await H.token());
    if (!safeEqual(decodeURIComponent(m[1]), token)) return new Response("Not found", { status: 404, headers: cors });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { allow: "POST", ...cors } });
    let body;
    try { body = await request.json(); } catch { return json(rpcError(null, -32700, "Parse error"), 400); }
    const msgs = Array.isArray(body) ? body : [body];
    const out = [];
    for (const msg of msgs) { const r = await rpc(msg, env, H, url); if (r) out.push(r); }
    if (!out.length) return new Response(null, { status: 202, headers: cors });
    return json(Array.isArray(body) ? out : out[0]);
  },
};

async function rpc(msg, env, H, url) {
  const { id, method, params } = msg || {};
  const isNote = id === undefined || id === null;
  try {
    switch (method) {
      case "initialize": {
        const asked = params?.protocolVersion;
        return ok(id, {
          protocolVersion: PROTOCOLS.includes(asked) ? asked : PROTOCOLS[0],
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: "bae-booth-bridge", title: "BAE 3D Booth", version: VERSION },
          instructions: "Queue for the BAE 3D Booth render Mac. booth_status shows the Macs; booth_upload + booth_submit queue a Blender build; booth_job / booth_download read the results.",
        });
      }
      case "notifications/initialized":
      case "notifications/cancelled":
        return null;
      case "ping":
        return ok(id, {});
      case "tools/list":
        await H.markConnected();
        return ok(id, { tools: TOOLS });
      case "tools/call": {
        await H.markConnected();
        const name = params?.name, a = params?.arguments || {};
        const base = url.origin;
        let r;
        if (name === "booth_status") r = await H.status(base, env.ACCESS_TOKEN || null);
        else if (name === "booth_device") r = await H.deviceAction(a);
        else if (name === "booth_upload") {
          const data = Buffer.from(String(a.data || ""), "base64");
          r = await H.upload({ upload_id: a.upload_id, name: a.name, mime: a.mime, bytes: a.bytes, offset: +a.offset || 0 }, data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
        }
        else if (name === "booth_submit") r = await H.submit(a);
        else if (name === "booth_jobs") r = await H.jobs(a.limit);
        else if (name === "booth_job") r = await H.job(a.job_id, true);
        else if (name === "booth_download") {
          const p = await H.piece(a.file_id, +a.offset || 0);
          r = { ...p, data: Buffer.from(p.data).toString("base64") };
        }
        else if (name === "booth_cancel") r = await H.cancel(a.job_id);
        else return rpcError(id, -32602, `Unknown tool: ${name}`);
        return ok(id, { content: [{ type: "text", text: JSON.stringify(r) }], structuredContent: r });
      }
      default:
        return isNote ? null : rpcError(id, -32601, `Method not found: ${method}`);
    }
  } catch (e) {
    return ok(id, { content: [{ type: "text", text: e?.message || String(e) }], isError: true });
  }
}

async function device(request, url, d, H) {
  const [, verb, arg, n] = d;
  if (verb === "pair" && request.method === "POST") {
    const b = await request.json().catch(() => ({}));
    return json(await H.pair(String(b.name || "Render Mac").slice(0, 60), JSON.stringify(b.info || {}).slice(0, 2000)));
  }
  const auth = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const dev = await H.auth(auth);
  if (!dev) return json({ error: "unknown device", status: "unknown" }, 401);
  if (verb === "hello") return json(await H.hello(dev.id));
  if (dev.status !== "approved") return json({ error: "not approved yet", status: dev.status }, 403);
  if (verb === "next" && request.method === "POST") return json(await H.claim(dev.id));
  if (verb === "file" && arg) {
    const p = await H.piece(arg, (+n || 0) * CH, dev.id);
    return new Response(p.data, { headers: { "content-type": "application/octet-stream", "x-total": String(p.bytes), ...cors } });
  }
  if (verb === "progress" && arg && request.method === "POST") return json(await H.progress(dev.id, arg, await request.json().catch(() => ({}))));
  if (verb === "out" && arg && request.method === "POST") {
    const q = url.searchParams;
    return json(await H.output(dev.id, arg, { path: q.get("path"), mime: q.get("mime"), bytes: +q.get("bytes"), offset: +q.get("offset") || 0, label: q.get("label") || "" }, await request.arrayBuffer()));
  }
  if (verb === "done" && arg && request.method === "POST") return json(await H.done(dev.id, arg, await request.json().catch(() => ({}))));
  return json({ error: "unknown request" }, 404);
}

/* ------------------------------------------------------------------ the store (one Durable Object, SQLite) */
export class Hub extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT);
      CREATE TABLE IF NOT EXISTS devices (id TEXT PRIMARY KEY, name TEXT, code TEXT, secret TEXT, status TEXT, created INTEGER, seen INTEGER, info TEXT, job TEXT);
      CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, title TEXT, kind TEXT, status TEXT, created INTEGER, started INTEGER, finished INTEGER, device TEXT, input TEXT, pct REAL, msg TEXT, log TEXT, error TEXT, result TEXT, cancel INTEGER, by TEXT);
      CREATE TABLE IF NOT EXISTS files (id TEXT PRIMARY KEY, job TEXT, role TEXT, path TEXT, name TEXT, mime TEXT, bytes INTEGER, got INTEGER, label TEXT, created INTEGER);
      CREATE TABLE IF NOT EXISTS chunks (file TEXT, n INTEGER, data BLOB, PRIMARY KEY (file, n));
    `);
  }
  q(s, ...a) { return this.sql.exec(s, ...a).toArray(); }
  one(s, ...a) { return this.q(s, ...a)[0] || null; }
  meta(k, v) { if (v === undefined) return this.one("SELECT v FROM meta WHERE k=?", k)?.v ?? null; this.sql.exec("INSERT OR REPLACE INTO meta (k,v) VALUES (?,?)", k, String(v)); }

  async token() { let t = this.meta("token"); if (!t) { t = rand(20); this.meta("token", t); } return t; }
  async markConnected() { if (!this.meta("connected")) this.meta("connected", Date.now()); }
  async setup() { return { connected: !!this.meta("connected"), token: this.meta("connected") ? null : await this.token(), devices: this.one("SELECT COUNT(*) c FROM devices WHERE status='approved'").c }; }

  /* devices */
  async pair(name, info) {
    const now = Date.now();
    this.sql.exec("DELETE FROM devices WHERE status='pending' AND created<?", now - 3600e3);
    if (this.one("SELECT COUNT(*) c FROM devices WHERE status='pending'").c >= 10) throw Object.assign(new Error("too many Macs waiting for approval; try again later"), { status: 429 });
    const id = "dev_" + rand(8), secret = rand(24), code = String(100000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 900000));
    this.sql.exec("INSERT INTO devices (id,name,code,secret,status,created,seen,info) VALUES (?,?,?,?,?,?,?,?)", id, name, code, await sha(secret), "pending", now, now, info);
    return { device_id: id, secret: id + "." + secret, code, status: "pending" };
  }
  async auth(tok) {
    const [id, s] = String(tok).split(".");
    if (!id || !s) return null;
    const d = this.one("SELECT * FROM devices WHERE id=?", id);
    if (!d || !safeEqual(d.secret, await sha(s))) return null;
    this.sql.exec("UPDATE devices SET seen=? WHERE id=?", Date.now(), id);
    return d;
  }
  async hello(id) { const d = this.one("SELECT id,name,code,status FROM devices WHERE id=?", id); return { ...d, code: d.status === "pending" ? d.code : null }; }
  async deviceAction({ device_id, action, name }) {
    const d = this.one("SELECT * FROM devices WHERE id=?", device_id);
    if (!d) throw new Error("No such Mac.");
    if (action === "approve") this.sql.exec("UPDATE devices SET status='approved' WHERE id=?", device_id);
    else if (action === "remove") { this.requeueFrom(device_id); this.sql.exec("DELETE FROM devices WHERE id=?", device_id); }
    else if (action === "rename") this.sql.exec("UPDATE devices SET name=? WHERE id=?", String(name || d.name).slice(0, 60), device_id);
    else throw new Error("action must be approve, remove or rename");
    return { ok: true };
  }
  requeueFrom(devId) {
    this.sql.exec("UPDATE jobs SET status='queued', device=NULL, started=NULL, pct=0, msg='Waiting for a render Mac' WHERE status='running' AND device=?", devId);
    this.sql.exec("UPDATE devices SET job=NULL WHERE id=?", devId);
  }
  sweep() {
    const now = Date.now();
    for (const d of this.q("SELECT id FROM devices WHERE job IS NOT NULL AND seen<?", now - LOST_S * 1000)) this.requeueFrom(d.id);
  }
  async status(base, fixedToken) {
    this.sweep();
    const now = Date.now();
    const devices = this.q("SELECT id,name,code,status,seen,info,job FROM devices ORDER BY created").map((d) => ({
      id: d.id, name: d.name, status: d.status, code: d.status === "pending" ? d.code : null,
      online: now - d.seen < ONLINE_S * 1000, last_seen_s: Math.round((now - d.seen) / 1000), job: d.job, info: safeParse(d.info),
    }));
    const c = (s) => this.one("SELECT COUNT(*) c FROM jobs WHERE status=?", s).c;
    const token = fixedToken || (await this.token());
    return { version: VERSION, bridge_url: base, connector_url: `${base}/mcp/${token}`, addon_url: `${base}/addon.zip`, devices, queue: { queued: c("queued"), running: c("running") } };
  }

  /* files coming from the studio */
  async upload({ upload_id, name, mime, bytes, offset }, data) {
    let f = upload_id ? this.one("SELECT * FROM files WHERE id=? AND role='in'", upload_id) : null;
    if (upload_id && !f) throw new Error("Unknown upload_id; start the file again.");
    if (!f) {
      if (offset !== 0) throw new Error("A new file starts at offset 0.");
      const total = +bytes;
      if (!(total > 0) || total > 200 * 1024 * 1024) throw new Error("bytes (the total file size) must be between 1 byte and 200 MB.");
      const id = "up_" + rand(10);
      this.sql.exec("INSERT INTO files (id,role,name,mime,bytes,got,created) VALUES (?,?,?,?,?,0,?)", id, "in", String(name || "file").slice(0, 120), String(mime || "application/octet-stream"), total, Date.now());
      f = this.one("SELECT * FROM files WHERE id=?", id);
    }
    this.putPiece(f, offset, data);
    const g = this.one("SELECT got,bytes FROM files WHERE id=?", f.id);
    return { upload_id: f.id, received: g.got, bytes: g.bytes, complete: g.got >= g.bytes };
  }
  putPiece(f, offset, data) {
    if (offset % CH) throw new Error(`offset must be a multiple of ${CH}.`);
    const len = data.byteLength;
    if (offset + len > f.bytes) throw new Error("This piece goes past the end of the file.");
    if (len !== CH && offset + len !== f.bytes) throw new Error(`Each piece is ${CH} bytes except the last.`);
    const n = offset / CH;
    const had = this.one("SELECT length(data) l FROM chunks WHERE file=? AND n=?", f.id, n);
    this.sql.exec("INSERT OR REPLACE INTO chunks (file,n,data) VALUES (?,?,?)", f.id, n, data);
    if (!had) this.sql.exec("UPDATE files SET got=got+? WHERE id=?", len, f.id);
  }
  async piece(fileId, offset, devId) {
    const f = this.one("SELECT * FROM files WHERE id=?", fileId);
    if (!f) throw Object.assign(new Error("No such file."), { status: 404 });
    if (devId && f.role === "in" && f.job && !this.one("SELECT 1 FROM jobs WHERE id=? AND device=?", f.job, devId)) throw Object.assign(new Error("Not your job's file."), { status: 403 });
    if (offset % CH) throw new Error(`offset must be a multiple of ${CH}.`);
    const c = this.one("SELECT data FROM chunks WHERE file=? AND n=?", f.id, offset / CH);
    if (!c) throw new Error("That part of the file is not there.");
    const next = offset + CH < f.bytes ? offset + CH : null;
    return { file_id: f.id, path: f.path, name: f.name, mime: f.mime, bytes: f.bytes, offset, next, data: c.data };
  }

  /* jobs */
  async submit(a) {
    this.cleanup();
    const kind = String(a.kind || "build");
    if (kind !== "build") throw new Error("kind must be build.");
    if (!a.spec || typeof a.spec !== "object") throw new Error("spec (an object) is required.");
    const files = a.files && typeof a.files === "object" ? a.files : {};
    for (const [p, up] of Object.entries(files)) {
      if (!/^[\w./-]{1,200}$/.test(p) || p.includes("..") || p.startsWith("/")) throw new Error(`Bad file path: ${p}`);
      const f = this.one("SELECT * FROM files WHERE id=? AND role='in'", up);
      if (!f) throw new Error(`Unknown upload for ${p}.`);
      if (f.got < f.bytes) throw new Error(`${p} is not complete yet.`);
    }
    const input = JSON.stringify({ kind, spec: a.spec, options: a.options || {} });
    if (input.length > 1.5e6) throw new Error("The spec is too large.");
    const id = "job_" + rand(10);
    this.sql.exec("INSERT INTO jobs (id,title,kind,status,created,input,pct,msg,log,by,cancel) VALUES (?,?,?,?,?,?,0,?,'',?,0)", id, String(a.title || "Booth").slice(0, 120), kind, "queued", Date.now(), input, "Waiting for a render Mac", String(a.by || "").slice(0, 80));
    for (const [p, up] of Object.entries(files)) this.sql.exec("UPDATE files SET job=?, path=? WHERE id=?", id, p, up);
    const position = this.one("SELECT COUNT(*) c FROM jobs WHERE status='queued'").c;
    return { job_id: id, status: "queued", position };
  }
  view(j, full) {
    const outputs = this.q("SELECT id,path,mime,bytes,got,label FROM files WHERE job=? AND role='out' ORDER BY created, path", j.id)
      .filter((f) => f.got >= f.bytes).map((f) => ({ file_id: f.id, path: f.path, mime: f.mime, bytes: f.bytes, label: f.label }));
    const dev = j.device ? this.one("SELECT name FROM devices WHERE id=?", j.device) : null;
    const o = { id: j.id, title: j.title, kind: j.kind, status: j.status, pct: j.pct, msg: j.msg, by: j.by, created: j.created, started: j.started, finished: j.finished, device: dev?.name || null, error: j.error, outputs };
    if (full) { o.log = (j.log || "").slice(-4000); o.result = safeParse(j.result); o.position = j.status === "queued" ? this.one("SELECT COUNT(*) c FROM jobs WHERE status='queued' AND created<=?", j.created).c : null; }
    return o;
  }
  async jobs(limit) { this.sweep(); return { jobs: this.q("SELECT * FROM jobs ORDER BY created DESC LIMIT ?", Math.max(1, Math.min(50, +limit || 12))).map((j) => this.view(j, false)) }; }
  async job(id, full) { this.sweep(); const j = this.one("SELECT * FROM jobs WHERE id=?", id); if (!j) throw new Error("No such job."); return this.view(j, full); }
  async cancel(id) {
    const j = this.one("SELECT * FROM jobs WHERE id=?", id);
    if (!j) throw new Error("No such job.");
    if (j.status === "queued") this.sql.exec("UPDATE jobs SET status='cancelled', finished=?, msg='Cancelled' WHERE id=?", Date.now(), id);
    else if (j.status === "running") this.sql.exec("UPDATE jobs SET cancel=1, msg='Stopping…' WHERE id=?", id);
    return this.view(this.one("SELECT * FROM jobs WHERE id=?", id), false);
  }
  async claim(devId) {
    this.sweep();
    const busy = this.one("SELECT job FROM devices WHERE id=?", devId)?.job;
    if (busy) { const j = this.one("SELECT * FROM jobs WHERE id=? AND status='running'", busy); if (j) return { job: this.forDevice(j) }; }
    const j = this.one("SELECT * FROM jobs WHERE status='queued' ORDER BY created LIMIT 1");
    if (!j) return { job: null };
    const now = Date.now();
    this.sql.exec("UPDATE jobs SET status='running', device=?, started=?, msg='Starting on the Mac', pct=0 WHERE id=?", devId, now, j.id);
    this.sql.exec("UPDATE devices SET job=? WHERE id=?", j.id, devId);
    return { job: this.forDevice(this.one("SELECT * FROM jobs WHERE id=?", j.id)) };
  }
  forDevice(j) {
    const files = this.q("SELECT id,path,mime,bytes FROM files WHERE job=? AND role='in'", j.id).map((f) => ({ file_id: f.id, path: f.path, mime: f.mime, bytes: f.bytes, pieces: Math.ceil(f.bytes / CH) }));
    return { id: j.id, title: j.title, ...safeParse(j.input), files, piece: CH };
  }
  mine(devId, jobId) {
    const j = this.one("SELECT * FROM jobs WHERE id=?", jobId);
    if (!j || j.device !== devId || j.status !== "running") throw Object.assign(new Error("This job is not running on this Mac (it may have been cancelled or given to another Mac)."), { status: 409 });
    return j;
  }
  async progress(devId, jobId, b) {
    const j = this.mine(devId, jobId);
    const log = ((j.log || "") + (b.log ? String(b.log) : "")).slice(-20000);
    this.sql.exec("UPDATE jobs SET pct=?, msg=?, log=? WHERE id=?", Math.max(0, Math.min(100, +b.pct || 0)), j.cancel ? "Stopping…" : String(b.msg || j.msg || "").slice(0, 200), log, jobId);
    return { cancel: !!j.cancel };
  }
  async output(devId, jobId, m, data) {
    this.mine(devId, jobId);
    if (!m.path || !/^[\w./-]{1,200}$/.test(m.path) || m.path.includes("..")) throw new Error("Bad output path.");
    let f = this.one("SELECT * FROM files WHERE job=? AND role='out' AND path=?", jobId, m.path);
    if (m.offset === 0) {
      if (f) { this.sql.exec("DELETE FROM chunks WHERE file=?", f.id); this.sql.exec("DELETE FROM files WHERE id=?", f.id); }
      if (!(m.bytes > 0) || m.bytes > 500 * 1024 * 1024) throw new Error("bytes must be between 1 byte and 500 MB.");
      const id = "out_" + rand(10);
      this.sql.exec("INSERT INTO files (id,job,role,path,name,mime,bytes,got,label,created) VALUES (?,?,?,?,?,?,?,0,?,?)", id, jobId, "out", m.path, m.path.split("/").pop(), m.mime || "application/octet-stream", m.bytes, String(m.label).slice(0, 120), Date.now());
      f = this.one("SELECT * FROM files WHERE id=?", id);
    }
    if (!f) throw new Error("Send this file from offset 0 first.");
    this.putPiece(f, m.offset, data);
    const g = this.one("SELECT got,bytes FROM files WHERE id=?", f.id);
    return { file_id: f.id, received: g.got, complete: g.got >= g.bytes };
  }
  async done(devId, jobId, b) {
    const j = this.mine(devId, jobId);
    const status = j.cancel ? "cancelled" : b.ok ? "done" : "failed";
    this.sql.exec("UPDATE jobs SET status=?, finished=?, pct=?, msg=?, error=?, result=? WHERE id=?", status, Date.now(), b.ok ? 100 : j.pct, status === "done" ? "Done" : status === "cancelled" ? "Cancelled" : "Failed", b.ok ? null : String(b.error || "The Mac reported an error.").slice(0, 2000), JSON.stringify(b.result || null).slice(0, 50000), jobId);
    this.sql.exec("UPDATE devices SET job=NULL WHERE id=?", devId);
    return { ok: true, status };
  }
  cleanup() {
    const old = Date.now() - KEEP_DAYS * 86400e3;
    for (const j of this.q("SELECT id FROM jobs WHERE finished IS NOT NULL AND finished<?", old)) {
      for (const f of this.q("SELECT id FROM files WHERE job=?", j.id)) { this.sql.exec("DELETE FROM chunks WHERE file=?", f.id); this.sql.exec("DELETE FROM files WHERE id=?", f.id); }
      this.sql.exec("DELETE FROM jobs WHERE id=?", j.id);
    }
    for (const f of this.q("SELECT id FROM files WHERE job IS NULL AND created<?", Date.now() - 86400e3)) { this.sql.exec("DELETE FROM chunks WHERE file=?", f.id); this.sql.exec("DELETE FROM files WHERE id=?", f.id); }
  }
}

/* ------------------------------------------------------------------ home page */
async function homePage(url, env, H) {
  const s = await H.setup();
  const token = env.ACCESS_TOKEN || s.token;
  const conn = !s.connected && token ? `${url.origin}/mcp/${token}` : null;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BAE 3D Booth bridge</title>
<style>:root{--o:#FA6428;--ink:#19181E;--stone:#ECE8DF;--lo:#FFFAF4}body{margin:0;background:var(--lo);color:var(--ink);font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:720px;margin:0 auto;padding:40px 20px}h1{font-weight:400;font-size:28px;margin:0 0 6px}p{margin:8px 0}.card{background:#fff;border-radius:16px;padding:20px;margin:18px 0;box-shadow:0 0 0 1px var(--stone)}
code{display:block;word-break:break-all;background:var(--stone);border-radius:10px;padding:12px;font-size:14px;margin:10px 0}.btn{display:inline-block;background:var(--o);color:#fff;text-decoration:none;border-radius:999px;padding:10px 18px;border:0;font:inherit;cursor:pointer}
.ok{color:#1d7a4c}.ar{direction:rtl;text-align:right;color:#55535c}ol{padding-left:20px}</style></head><body><main>
<h1>BAE 3D Booth bridge</h1><p>Running, version ${VERSION}. ${s.devices ? `${s.devices} render Mac${s.devices > 1 ? "s" : ""} approved.` : "No render Mac approved yet."}</p>
${conn ? `<div class="card"><b>1. Add the connector in claude.ai</b><ol><li>Copy this address.</li><li>claude.ai → Settings → Connectors → Add custom connector.</li><li>Name: <b>BAE 3D Booth</b> (exactly), URL: the address.</li></ol>
<code id="u">${esc(conn)}</code><button class="btn" onclick="navigator.clipboard.writeText(document.getElementById('u').textContent).then(()=>this.textContent='Copied')">Copy address</button>
<p>This address is shown only until the connector is used for the first time. After that, BAE Studio → 3D Booth → Team shows it to share with your team.</p>
<p class="ar">انسخ العنوان، وبـ claude.ai افتح Settings ← Connectors ← Add custom connector، الاسم BAE 3D Booth والعنوان هاد. العنوان بيظهر هون لحد أول استخدام بس.</p></div>`
  : `<div class="card"><p class="ok">✓ The claude.ai connector is set up.</p><p>To give a teammate the connector address, open BAE Studio → 3D Booth → Team.</p></div>`}
<div class="card"><b>2. On the render Mac: the Blender add-on</b><p>Download it, then in Blender: Edit → Preferences → Add-ons → ⌄ → Install from Disk → choose the file. The add-on shows a 6-digit code; approve that code in BAE Studio → 3D Booth.</p>
<a class="btn" href="/addon.zip">Download the Blender add-on</a><p class="ar">نزّل الإضافة وركّبها بـ Blender، بتطلعلك 6 أرقام، وافق عليها من الاستوديو.</p></div>
</main></body></html>`;
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", ...cors } });
}

/* ------------------------------------------------------------------ the add-on, as a zip with this bridge's address inside */
function addonZip(origin) {
  const enc = new TextEncoder();
  const files = [
    ["bae_booth/__init__.py", ADDON_INIT],
    ["bae_booth/client.py", ADDON_CLIENT],
    ["bae_booth/engine/run_job.py", ENGINE_RUN],
    ["bae_booth/engine/build_booth.py", ENGINE_BUILD],
    ["bae_booth/config.json", JSON.stringify({ bridge_url: origin, version: VERSION }, null, 1)],
  ].map(([n, t]) => [enc.encode(n), enc.encode(t)]);
  const parts = [], central = [];
  let off = 0;
  const u16 = (v) => [v & 255, (v >> 8) & 255], u32 = (v) => [v & 255, (v >> 8) & 255, (v >> 16) & 255, (v >>> 24) & 255];
  for (const [name, data] of files) {
    const crc = crc32(data);
    const head = new Uint8Array([0x50, 0x4b, 3, 4, ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0)]);
    parts.push(head, name, data);
    central.push(new Uint8Array([0x50, 0x4b, 1, 2, ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(off)]), name);
    off += head.length + name.length + data.length;
  }
  const cdSize = central.reduce((s, p) => s + p.length, 0);
  const end = new Uint8Array([0x50, 0x4b, 5, 6, ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length), ...u32(cdSize), ...u32(off), ...u16(0)]);
  const all = [...parts, ...central, end];
  const out = new Uint8Array(all.reduce((s, p) => s + p.length, 0));
  let p = 0;
  for (const a of all) { out.set(a, p); p += a.length; }
  return out;
}
let CRC;
function crc32(d) {
  if (!CRC) { CRC = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; CRC[n] = c >>> 0; } }
  let c = 0xffffffff;
  for (let i = 0; i < d.length; i++) c = CRC[(c ^ d[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/* ------------------------------------------------------------------ helpers */
function rand(n) { return Array.from(crypto.getRandomValues(new Uint8Array(n)), (b) => b.toString(16).padStart(2, "0")).join(""); }
async function sha(s) { return Buffer.from(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))).toString("hex"); }
function safeEqual(a, b) { a = String(a); b = String(b); if (a.length !== b.length) return false; let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0; }
function safeParse(s) { try { return JSON.parse(s); } catch { return null; } }
function ok(id, result) { return { jsonrpc: "2.0", id, result }; }
function rpcError(id, code, message) { return { jsonrpc: "2.0", id, error: { code, message } }; }
