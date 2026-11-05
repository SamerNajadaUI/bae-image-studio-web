(() => {
"use strict";
const SRV = "Magnafic";
const STYLE = "professional photography, clean natural light";
const $ = id => document.getElementById(id);

/* ---------------- reference catalog (Mari Juliano lifestyle) ---------------- */
const REFS = [
 ["r007","Extreme close-up portrait, woman with curly hair and freckles tasting from a spoon, soft warm daylight, shallow depth"],
 ["r017","Over-the-shoulder at a warm wood desk, two people planning on a laptop, window light, papers and glasses"],
 ["r018","Young woman writing on a whiteboard while holding a phone, bright window light, white shirt and green knit vest"],
 ["r020","Smiling woman with a dachshund at a home table, denim jacket, terracotta mug, calm morning light"],
 ["r025","Man in a navy suit seated on a wooden chair, minimal white brick wall, studio-like restraint, negative space"],
 ["r026","Detail: hand carrying a burgundy leather bag past a dining table, pleated skirt, warm side light"],
 ["r028","Father holding his toddler on a green sofa, tender intimate moment, soft daylight"],
 ["r030","Woman and child on a sculpted wooden bench before a green hedge wall with a timber window frame"],
 ["r032","Older woman with grey hair standing in a minimal warm beige room, pendant lamp, generous negative space"],
 ["r033","Woman reading at a wooden desk beside a large window, plants, quiet home-office calm"],
 ["r034","Older man crouching to greet a dog on a sunny residential sidewalk, open shade and grass"],
 ["r037","Small café: two women chatting at the counter, terrazzo, warm wood, natural interior light"],
 ["r038","Father and daughter on a picnic blanket in a park looking at a phone together, bright sun, trees"],
 ["r053","Father with two children at a table building a craft project, warm interior, engaged faces"],
 ["r056","Product detail: hands adjusting a smartwatch on a blue tabletop, crisp light, tactile"],
 ["r058","Woman resting on the floor after a home workout, pink exercise ball, warm light on wood floor"],
 ["r059","Medium close-up of a woman laughing while fitting earbuds, clean background, candid joy"],
 ["r061","Woman laughing on a sofa with a laptop in a warm golden-lit living room"],
 ["r064","Family in a kitchen at breakfast, father lifting son, mother behind, warm morning sun"],
 ["r065","Low-angle: friends applying sunscreen under a blue sky, playful and bright"],
 ["r066","Mother kneeling to talk with her son at home, wooden chair, soft window light"],
 ["r073","Wide: two friends lounging on a bed in a soft pink room, daylight from a window"],
 ["r076","Woman lying on a sofa smiling, overhead angle, knit textures, natural light"],
 ["r080","Friends sharing dinner around a round wooden table with plants, warm and lively"],
 ["r083","Close-up of a woman eating a salad outdoors in bright sun, candid bite"],
 ["r093","Couple sitting on a vintage car sharing food bowls outdoors, relaxed daylight"],
 ["r103","Group lunch around a round table seen from above, dishes, plants, warm tones"],
 ["r107","Couple and a small dog on a bench against a pink studio wall, rolled blankets, playful"]
].map(([id,d])=>({id,d,src:`refs/${id}.jpg`,set:"mj",studio:false}));
/* Photos from the Bank al Etihad guidelines (photography chapter, pp.106–114) */
const BAE_REFS = [
 ["bae_b113_0","BAE studio people: woman in a white shirt seated, warm plaster backdrop, soft directional light, calm confident gaze",1],
 ["bae_b114_1","BAE studio set: bearded man in a brown cardigan at a white desk, warm textured plaster wall, centred, direct gaze",1],
 ["bae_b114_2","BAE studio set: woman in a cream turtleneck seated, patterned backdrop and sheer curtain, restrained architectural set",1],
 ["bae_b113_1","BAE studio product: hand holding a phone with the banking app, warm wood background, soft dramatic light",1],
 ["bae_b106_1","BAE depth: foreground bokeh of warm flowers framing a woman in a black jacket",0],
 ["bae_b107_0","BAE selective focus: young woman writing, soft warm background, window light",0],
 ["bae_b107_1","BAE selective focus through a blurred foreground, woman in a black coat, intimate",0],
 ["bae_b107_3","BAE layered depth: man seen through a window with reflections, warm light",0],
 ["bae_b108_2","BAE medium close-up: two women laughing together against a warm wall, candid connection",0],
 ["bae_b111_1","BAE foreground bokeh: profile of a woman behind a soft warm blurred foreground",0],
 ["bae_b111_2","BAE clarity: man in sunglasses sharp amid a motion-blurred city street",0],
 ["bae_b111_3","BAE movement: woman mid-stride in a motion-blurred urban scene",0]
].map(([id,d,st])=>({id,d,src:`refs/${id}.jpg`,set:"bae",studio:!!st}));
const ALL_REFS=[...BAE_REFS,...REFS];
const refById=id=>ALL_REFS.find(r=>r.id===id);
const PICK_STUDIO=["bae_b113_0","bae_b114_1","bae_b114_2"];
const PICK_LOCATION=["bae_b111_1","bae_b107_0","r061","r037"];
/* Youth campaign references sent by the client (style, wardrobe and camera only) */
const YOUTH_REFS = [
 ["yt01","Youth: two young men on wooden steps under palm trees, extreme low-angle wide shot, sun flare, retro football tee, baggy light denim shorts, striped tube socks, chunky sneakers"],
 ["yt02","Youth: two girls laughing on a green bench under a concrete overpass, low wide angle, lilac athletic top, colour-block windbreaker"],
 ["yt03","Youth: three friends taking a selfie in a skate bowl, low angle, blue sky, pink tee, patterned camp shirt, bucket hat, tube socks"],
 ["yt04","Youth: five friends on a stone wall with skateboards, ultra-low wide angle, blue sky, bold colour-block streetwear, beanies, retro sneakers"],
 ["yt05","Youth: three friends laughing in the wind, big sky above, pink cardigan, butter-yellow striped oversized shirt, brown vest"],
 ["yt06","Youth: three women cheek to cheek, low angle against deep blue sky, hard sun, crochet vest, crop tops, pleated trousers, striped knit"],
 ["yt07","Youth: friends racing piggyback, motion blur, tilted low angle, olive fluffy vest, cobalt quilted vest, baggy jeans"],
 ["yt08","Youth: playful couple on a skateboard at a skatepark, bright sun, denim on denim, white tees, tinted round sunglasses"],
 ["yt09","Youth: four friends walking across grass at golden hour, low angle, striped camp shirt, lilac fluffy cardigan, floral blouse, wide-leg jeans"]
].map(([id,d])=>({id,d,src:`refs/${id}.jpg`,set:"yt",studio:false}));
ALL_REFS.push(...YOUTH_REFS);
const PICK_BOLD=["yt04","yt06","yt03","bae_b108_2"];
const PICK_BOLD_STUDIO=["bae_b114_1","bae_b113_0","yt06","yt05"];
const MAX_REFS=6;

/* ---------------- BAE guideline digest given to Claude ---------------- */
const BAE_RULES = `BANK AL ETIHAD (BAE) PHOTOGRAPHY GUIDELINES — "Deep Clarity" direction
1. Depth over flatness: compose in distinct layers (foreground, subject, background). Nothing sits on a single flat plane.
2. Clarity through focus: selective depth of field is the signature. One sharp truth per frame (a face, a gesture or an object as the focal anchor). Moderate depth, not gimmicky blur. Focus supports the story, never announces the lens.
3. Colour with warmth: environments, surfaces and props are soft, human, approachable. Warm palette echoing the brand: orange #FA6428, soft orange #FDCBB4, light stone #ECE8DF, stone #CCC3B4, ink #19181E; burgundy #A33755 and teal #32969B only as small accents. Orange tones belong to light, surfaces and props only, never to clothing.
4. A Jordanian lens, always modern: today's Amman (Abdali Boulevard, contemporary glass-and-limestone towers, new apartments, design-led cafés, modern offices), never old souks, worn streets or dated interiors. Warm Jordan light. Jordanian faces in modern, elegant styling.
5. Composition: discovered rather than arranged; natural and organic in a real environment; give the subject presence; generous negative space; lead with the human story.
6. Shot types: extreme close-up (intimacy, detail), medium close-up (presence, human connection), wide (context, environment).
7. On-location: lived-in refinement, elevated everyday, regional authenticity, purposeful simplicity. Techniques: clarity, depth, movement (captured mid-stride, a decision already being made), foreground bokeh (a blurred element between lens and subject adds depth, warmth and a pool of colour that wraps the frame).
8. Studio: people with softness, presence and emotional clarity — gentle directional light, natural gestures, restrained styling, warm, confident and real, not over-posed. Products (cards, phones, devices) with clarity, control, tactile detail and subtle material contrast. Sets are minimal, tactile, softly architectural (plaster, stone, warm wood): form and layering, not clutter.
9. Applications: the BAE gradient shape is added later between the cut-out subject and the background, so the subject must separate cleanly from a calm background, with room for copy.
10. Never: logos, readable brand names, signage text, watermarks, other banks' branding, stereotypes, culturally insensitive moments, glossy stock-photo posing, heavy filters or HDR.`;

/* Client art direction — overrides anything else, applied to every image */
const CLIENT_RULES = `CLIENT ART DIRECTION — MANDATORY, OVERRIDES EVERYTHING ELSE:
A. Modern and contemporary everything. Even when the place is Amman, show a modern, new, upscale location (contemporary architecture, new buildings, sleek cafés, modern apartments and offices). Nothing old, traditional, rustic or dated.
B. People: NO hijab, NO headscarf, NO head covering of any kind; NO traditional Arab clothing (no thobe, dishdasha, abaya, keffiyeh, shemagh, kaftan). Wardrobe is modern and contemporary and follows the selected LOOK below (bold colourful streetwear, or elegant and calm). NO ORANGE CLOTHING on anyone: no orange, rust, terracotta, coral, amber, tangerine or peach garments or accessories. Brand orange may appear only in the light, background or props, never on people.
C. Skin: high-end professional retouching — even, refined skin tone, smooth healthy complexion, soft glow, minimised blemishes and pores, while keeping a subtle real texture (never plastic, waxy or airbrushed-flat).
D. Phones: any phone is a modern iPhone 18 (latest flagship, ultra-thin uniform bezels, Dynamic Island, slim metal frame), with no visible logo. Never an old or generic phone.
E. Decor and furniture: modern Scandinavian IKEA-style interiors — light oak/birch wood, white and warm-neutral walls, clean lines, functional minimal furniture, soft textiles, a few plants. No clutter, no ornate or traditional decor, no brand names.`;
/* LOOK: bold colourful youth streetwear (from the 9 campaign references) or elegant and calm */
const LOOK_BOLD = `LOOK — BOLD & COLOURFUL (follow the youth campaign references closely for wardrobe, camera and energy):
Wardrobe: Gen Z street-style fashion — oversized plain tees, retro football-style tees without crests or text, baggy and wide-leg light-wash denim, denim jackets, colour-block knit sweater vests and fluffy cardigans, camp-collar and striped retro shirts, crop tops with pleated wide trousers, crochet vests, bucket hats and beanies, striped tube socks, chunky retro sneakers, tinted round sunglasses. Saturated colour-block palette: cobalt blue, kelly and lime green, lilac and purple, hot pink, butter yellow, red, sky blue, white, light denim. Never orange.
Camera: low-angle (worm's-eye) wide-angle 16–24 mm hero shot looking up at the subjects, a big clean blue sky (or bright open background) behind them, bright hard sunlight with crisp shadows and an occasional sun flare, punchy saturated commercial colour grade, deep focus with the faces sharp.
Energy: friends together, laughing out loud, mid-action and playful (selfies, piggybacks, leaning in cheek to cheek, walking towards camera); slight motion blur allowed on limbs. Props when they fit: skateboards, iced drinks, iPhone 18, backpacks — no logos.`;
const LOOK_CALM = `LOOK — ELEGANT & CALM: tailored, smart-casual or refined fashion in white, cream, beige, camel, taupe, grey, navy, black or soft muted tones; composed, warm and confident; eye-level or gentle angles with selective focus and soft natural light.`;
const LOOK_BOLD_NEG = "all-beige outfit, all-neutral outfit, muted dull colours, formal business suit, stiff pose, eye-level flat framing";
function lookRule(){ return S.look==="Bold"?LOOK_BOLD+(S.setting==="Studio"?"\nIn the studio, keep the bold wardrobe, low-angle wide camera and saturated grade; the backdrop may be a single saturated seamless colour (cobalt, lilac, pink, lime or sky blue) instead of plaster.":""):LOOK_CALM; }
function lookLine(){ return S.look==="Bold"?"Look lock: BOLD & COLOURFUL — Gen Z streetwear in saturated colour-block (cobalt, green, lilac, pink, butter yellow, red, denim, white; no orange), low-angle wide-angle 16–24 mm hero shot against a bright open sky or backdrop, hard bright sunlight, punchy saturated grade, friends laughing mid-action.":"Look lock: ELEGANT & CALM — tailored refined wardrobe in white, cream, beige, camel, grey, navy or black; composed and warm; gentle angle and soft natural light."; }
const CLIENT_LINE = "Mandatory art direction: modern, contemporary, upscale setting; modern wardrobe that follows the look lock, with no orange clothing on anyone; no hijab, no headscarf, no traditional Arab clothing; professionally retouched skin with an even skin tone and subtle real texture; any phone is a modern iPhone 18 with no visible logo; modern Scandinavian IKEA-style decor.";
const CLIENT_NEG = "orange clothing, orange shirt, orange jacket, orange dress, orange sweater, rust clothing, terracotta clothing, coral clothing, hijab, headscarf, head covering, niqab, abaya, thobe, dishdasha, keffiyeh, shemagh, kaftan, traditional Arab clothing, old buildings, souk, old town, rustic, dated decor, ornate furniture, clutter, old phone, generic phone, visible logo, blemishes, uneven skin tone, acne, plastic skin, waxy skin";
/* Composition lock — always on */
const COMPOSITION_RULE = `COMPOSITION LOCK — MANDATORY: the person (main subject) is centred horizontally, standing or sitting on the vertical centre line of the frame, with balanced, near-symmetrical framing and equal space on the left and right. Never place the person on the left or right third. Eyes sit around the upper third; keep comfortable head room. Any copy space is distributed evenly around the centred subject (above, or equally on both sides).`;
const COMPOSITION_LINE = "Composition lock: the person (or the group, as one centred cluster) is centred in the middle of the frame on the vertical centre line, balanced symmetrical framing with equal space left and right; not on the left, not on the right.";
const COMPOSITION_NEG = "off-centre subject, subject on the left, subject on the right, rule-of-thirds placement, subject cropped at the edge";
/* Setting lock — Studio overrides any location in the brief */
const STUDIO_RULE = `SETTING LOCK — STUDIO (overrides any location named in the brief or seen in the references): photographed in a professional photo studio on a minimal, softly architectural BAE set — warm plaster or stone-toned seamless backdrop (light stone #ECE8DF, warm beige, soft terracotta), light oak modern furniture, at most one or two modern props that hint at the brief's story. Soft directional key light from a large softbox that reads as clean natural window light, gentle fill, soft shadow. No real-world location: no café, no street, no shop, no outdoor or city background, no window views. Like the BAE studio references (woman in white shirt, man in brown cardigan at a desk, woman in cream turtleneck).`;
const STUDIO_LINE = "Setting lock: STUDIO. Shot in a professional studio on a minimal, softly architectural set with a warm plaster or stone-toned seamless backdrop, light oak modern furniture and one or two modern props; soft directional softbox key light that reads as clean natural window light. No real location, no café, no street, no outdoor or city background.";
const STUDIO_NEG = "outdoor, street, café, restaurant, shop, office building, city background, window view, landscape, real-world location";
const LOCATION_LINE = "Setting lock: on location in a real, modern, upscale place in Amman.";
function settingRule(){ return S.setting==="Studio"?STUDIO_RULE:(S.look==="Bold"?`SETTING LOCK — ON-LOCATION: a real, modern place in Amman suited to youth energy (modern rooftop terrace, contemporary plaza, new park, skate spot, clean concrete steps), shot so the bright open sky fills the background.`:`SETTING LOCK — ON-LOCATION: a real, modern, upscale place (modern Amman), with depth layers and foreground bokeh.`); }
const REF_STYLE = CLIENT_RULES + "\n\n" + `REFERENCE PHOTOGRAPHER STYLE (Mari Juliano, lifestyle): bright, clean natural daylight (window light or open sun); crisp, sharp subjects with true-to-life colour; candid, genuine laughter and interaction captured mid-action; tidy, styled but lived-in real homes, cafés and parks; colour-coordinated wardrobe against the set; occasional low angles against open sky and overhead tabletop views. Blend: keep the clean natural light and candid energy, shift the palette to BAE warmth, add BAE depth layers and foreground bokeh, and place it in Jordan.`;

/* ---------------- state ---------------- */
const S = { setting:"On-location", shot:"Medium close-up", look:"Bold", picked:PICK_BOLD.slice(), refTab:"yt", upload:null, analysis:null, checklist:[], models:{nano:[]}, fileArgs:false, connected:false, schemas:{}, details:{}, upModes:null };
let mcp=null, sample=null, downloads=null, sampleImages=null;

/* ---------------- logging ---------------- */
const logLines=[];
function scrub(v){ try{ return JSON.parse(JSON.stringify(v,(k,x)=>{ if(x&&typeof x==="object"&&x.$file) return "[file "+(x.$file.name||"")+"]"; if(typeof x==="string"&&x.length>600) return x.slice(0,600)+"…("+x.length+" chars)"; return x; })); }catch{ return String(v); } }
function log(kind,title,obj){
  const t=new Date().toLocaleTimeString();
  let body=""; try{ body = obj===undefined?"":(typeof obj==="string"?obj:JSON.stringify(scrub(obj),null,1)); }catch{ body=String(obj); }
  if(body.length>4000) body=body.slice(0,4000)+"\n…";
  logLines.push({kind,line:`[${t}] ${kind} ${title}\n${body}`});
  const box=$("log"); const d=document.createElement("div"); d.className=kind==="✕"?"e":kind==="←"?"o":""; d.textContent=`[${t}] ${kind} ${title}\n${body}\n`; box.appendChild(d); box.scrollTop=box.scrollHeight;
  $("logCount").textContent=`· ${logLines.length}`;
}
$("btnCopyLog").onclick=async()=>{ const txt=logLines.map(l=>l.line).join("\n\n"); try{ await navigator.clipboard.writeText(txt); $("btnCopyLog").textContent="Copied"; setTimeout(()=>$("btnCopyLog").textContent="Copy log",1500);}catch{ const r=document.createRange(); r.selectNodeContents($("log")); const s=getSelection(); s.removeAllRanges(); s.addRange(r);} };
$("btnClearLog").onclick=()=>{ logLines.length=0; $("log").textContent=""; $("logCount").textContent=""; };

/* ---------------- error copy ---------------- */
function mcpCopy(e){
  const c=e?.code;
  return ({
    server_not_connected:"Magnific isn't connected for you. Add it in claude.ai Settings → Connectors (server URL https://mcp.magnific.com), then reload this page.",
    needs_reauth:"Your Magnific sign-in expired. Reconnect Magnific in claude.ai Settings → Connectors.",
    selection_required:"You have more than one Magnific connector. Choose one when claude.ai asks, then try again.",
    not_in_manifest:"Magnific is turned off for this page. Turn it on from the page's Permissions menu, then try again.",
    approval_required:"This step needs your approval. Press the button again and allow Magnific when claude.ai asks.",
    blocked_by_policy:"The Magnific tool “"+(e?.tool||"?")+"” is set to Blocked. Go to claude.ai → Customize → Connectors → Magnafic → Tool permissions and set images_*, creations_* to Always allow (on a Team/Enterprise plan the org Owner does this), then reload this page.",
    server_unavailable:"Magnific didn't answer in time. Try again in a moment.",
    tool_error:"Magnific reported a problem: "+(e?.message||"no details").slice(0,300),
    not_granted:"Connector access isn't available in this view. Open the page in claude.ai.",
    capability_disabled:"Connector access isn't available in this view. Open the page in claude.ai.",
    no_schema:"Couldn't read the Magnific tool's arguments. Allow Magnific for this page, then try again."
  })[c] || ("Magnific step failed ("+(c||"unknown")+"). "+String(e?.message||"").slice(0,200));
}
function sampleCopy(e){
  const c=e?.code;
  return ({
    not_granted:"Claude isn't allowed for this page. Allow it when asked, or from the page's Permissions menu.",
    sampling_disabled:"Claude isn't available for this account here.",
    rate_limited:"Too many requests to Claude right now. Wait a minute and try again.",
    session_expired:"Sign in to claude.ai again, then retry.",
    image_rejected:"Claude couldn't read that image. Try a JPEG or PNG under 20 MB.",
    images_unavailable:"This view can't send images to Claude, so only the text brief was used.",
    refused:"Claude declined this brief. Rephrase it and try again.",
    invalid_json:"Claude's answer came back malformed. Press the button again.",
    cancelled:"Stopped.",
    no_key:"Add your Anthropic API key under API keys to let Claude describe the scene and write the prompt.",
    bad_key:"Anthropic rejected the API key. Check it under API keys.",
    upstream_error:"Claude didn't answer: "+String(e?.message||"").slice(0,200)
  })[c] || ("Claude step failed ("+(c||"unknown")+"). Try again.");
}

/* ---------------- capabilities ---------------- */
async function boot(){
  const C=window.claude;
  if(!C||!C.use){ return bootWeb(); }
  [sample,mcp,downloads]=await Promise.all([C.use("sample"),C.use("mcp"),C.use("downloads")]);
  if(sample){ setClaude("on","Claude: ready"); try{ const l=await sample.limits(); sampleImages=l?.images||null; }catch{} } else setClaude("off","Claude: unavailable here");
  if(!mcp){ setMag("off","Magnific: unavailable here"); $("btnConnect").disabled=true; }
  else{
    try{ const st=await C.use("permissions").then(p=>p?.state("mcp:"+SRV)).catch(()=>"unavailable");
      if(st==="granted") connect(true);
    }catch{}
  }
  syncButtons();
}
function setClaude(k,t){ $("dotClaude").className="dot "+k; $("stClaude").textContent=t; }
function setMag(k,t){ $("dotMag").className="dot "+k; $("stMag").textContent=t; }

/* ---------------- Magnific bridge ---------------- */
async function callMag(tool,input){
  log("→",tool,input);
  try{ const r=await mcp.callTool(SRV,tool,input===undefined?{}:input,{cache:false}); log("←",tool,r.payload!==undefined?r.payload:r.content); return r; }
  catch(e){ log("✕",tool,{code:e?.code,message:e?.message,result:e?.result}); try{ e.tool=tool; }catch{} throw e; }
}
async function schemaOf(tool){
  if(tool in S.schemas) return S.schemas[tool];
  try{ const d=await mcp.describeTool(SRV,tool); S.schemas[tool]={description:d.description,inputSchema:d.inputSchema}; }
  catch(e){ log("✕","describe "+tool,{code:e?.code,message:e?.message}); S.schemas[tool]=null; }
  return S.schemas[tool];
}
function trimJSON(v,n){ let s; try{ s=JSON.stringify(v);}catch{ s=String(v);} return s.length>n?s.slice(0,n)+"…":s; }
/* Claude maps a plain-language goal onto the tool's real JSON Schema, so the page never guesses argument names. */
async function buildArgs(tool,goal,data,tier="quick"){
  const sc=await schemaOf(tool);
  if(!sample) throw {code:"not_granted"};
  const prompt=`You convert a goal into the exact JSON arguments for ONE call of the Magnific MCP tool "${tool}".
Tool description: ${sc?.description||"(unavailable)"}
Input JSON Schema: ${sc?trimJSON(sc.inputSchema,14000):"(unavailable — use the most likely argument names for this Magnific tool)"}

Goal: ${goal}
Data you may use: ${trimJSON(data,14000)}

Rules:
- "args" must validate against the schema: only declared properties, correct types, enum values copied exactly, every required property present.
- Never invent identifiers or URLs; use only those in Data.
- Placeholder strings in Data (like "__FILE__" or "__FILE_DATAURL__") are copied verbatim into the one property that takes them. Use "__FILE_DATAURL__" only if the schema asks for a data: URL, else "__FILE__" for raw base64.
- "expected_long_side_px": the long side in pixels you expect the output to have, or null.
Reply with only this JSON object: {"args":{...},"expected_long_side_px":null,"note":"one short line"}`;
  const out=await sample.json(prompt,{modelTier:tier});
  log("·","args for "+tool,out);
  if(!out||typeof out!=="object"||!out.args) throw {code:"invalid_json"};
  return out;
}
function replaceDeep(o,token,val){
  if(Array.isArray(o)) return o.map(x=>replaceDeep(x,token,val));
  if(o&&typeof o==="object"){ const r={}; for(const k in o) r[k]=replaceDeep(o[k],token,val); return r; }
  return o===token?val:o;
}
function walk(o,fn,depth=0){ if(depth>8||!o||typeof o!=="object") return; for(const k of Object.keys(o)){ fn(k,o[k],o); walk(o[k],fn,depth+1);} }
function readResult(r){
  const p=r?.payload; const out={ids:[],urls:[],links:[],status:"",w:0,h:0,images:[]};
  const isImgUrl=u=>/\.(png|jpe?g|webp)(\?|#|$)/i.test(u)||/[?&](format|fm)=(png|jpe?g|webp)/i.test(u);
  /* Page links (webUrl, magnific.com/app/…) are links to open, never the image file itself */
  const addUrl=(u,k="")=>{ if(typeof u!=="string"||!/^https:\/\//.test(u)) return; u=u.replace(/[)\].,;'"]+$/,"");
    if(/^(web_?url|page_?url|share_?url|app_?url|link)$/i.test(k)||/magnific\.com\/app\//i.test(u)){ out.links.push(u); if(!out.webUrl) out.webUrl=u; return; }
    if(isImgUrl(u)||/(download|image|preview|original|file|src|asset|output|result)/i.test(k)||/^url$/i.test(k)) out.urls.push(u); else out.links.push(u); };
  const scanText=t=>{ (String(t).match(/https:\/\/[^\s"'<>)\]]+/g)||[]).forEach(u=>addUrl(u)); const m=String(t).match(/(?:creation[_ ]?)?identifier["'\s:=]+([A-Za-z0-9_-]{6,})/i); if(m) out.ids.push(m[1]); const s=String(t).match(/status["'\s:=]+([a-z_]+)/i); if(s) out.status=out.status||s[1].toLowerCase(); };
  /* Image bytes can arrive as image blocks or as embedded resources; links as resource_link blocks or text */
  for(const b of (r?.content||[])){
    if(b.type==="image"&&b.data) out.images.push({data:b.data,mime:b.mimeType||"image/png"});
    else if(b.type==="resource"&&b.resource){ const rs=b.resource; if(rs.blob&&/^image\//.test(rs.mimeType||"")) out.images.push({data:rs.blob,mime:rs.mimeType}); if(rs.uri) addUrl(rs.uri,"resource"); if(rs.text){ try{ walk(JSON.parse(rs.text),scan); }catch{ scanText(rs.text); } } }
    else if(b.type==="resource_link"&&b.uri) addUrl(b.uri,/^image\//.test(b.mimeType||"")?"image":"link");
    else if(b.type==="text"&&b.text&&typeof p!=="string") scanText(b.text);
  }
  function scan(k,v){
    if(typeof v==="string"){
      if(/^(creation_?identifier|creationIdentifier|identifier|creation_?id|creationId)$/i.test(k)) out.ids.push(v);
      if(/^https:\/\//.test(v)) addUrl(v,k);
      if(/^(status|state)$/i.test(k)) out.status=out.status||v.toLowerCase();
      if(/^data:image\/(png|jpe?g|webp);base64,/.test(v)) out.images.push({data:v.split(",")[1],mime:v.slice(5,v.indexOf(";"))});
    }
    if(typeof v==="number"){ if(/^width$/i.test(k)) out.w=Math.max(out.w,v); if(/^height$/i.test(k)) out.h=Math.max(out.h,v); }
    if(typeof v==="string"&&/^resolution$/i.test(k)&&/^4k$/i.test(v)) out.res4k=true;
  }
  if(p&&typeof p==="object") walk(p,scan);
  else if(typeof p==="string") scanText(p);
  out.ids=[...new Set(out.ids)];
  out.urls=[...new Set(out.urls)].sort((a,b)=>(isImgUrl(b)?1:0)-(isImgUrl(a)?1:0));
  out.links=[...new Set(out.links)].filter(u=>!out.urls.includes(u));
  return out;
}
async function extractWithClaude(r,what){
  const txt=trimJSON(r?.payload??r?.content,12000);
  const o=await sample.json(`From this Magnific MCP tool result, extract ${what}. Result:\n${txt}\n\nReply with only JSON: {"ids":["creation identifiers"],"urls":["https image urls, best/largest first"],"status":"pending|processing|completed|failed|unknown","width":0,"height":0}`,{modelTier:"quick"});
  return {ids:o?.ids||[],urls:(o?.urls||[]).filter(u=>/^https:\/\//.test(u)),links:[],status:String(o?.status||""),w:+o?.width||0,h:+o?.height||0,images:[]};
}
const DONE=/^(completed?|succeeded|success|done|finished|ready)$/; const FAIL=/^(failed|error|cancel+ed|rejected)$/;

/* ---------------- connect & model discovery ---------------- */
$("btnConnect").onclick=()=>connect(false);
async function connect(silent){
  if(S.web) return checkGemini(silent);
  if(!mcp) return;
  setMag("wait","Magnific: connecting…"); $("btnConnect").disabled=true;
  try{
    const lt=await mcp.listTools().catch(()=>null); S.fileArgs=!!lt?.fileArgs;
    let r;
    try{ r=await callMag("images_models_list",{}); }
    catch(e){ if(e?.code!=="tool_error") throw e; const a=await buildArgs("images_models_list","List every image generation model available, with no filters.",{}); r=await callMag("images_models_list",a.args); }
    let models=collectModels(r.payload);
    if(models.length<2 && sample){ const o=await sample.json(`List every image model in this Magnific result as JSON [{"id":"exact identifier to pass as the model argument","name":"display name"}]. Result:\n${trimJSON(r.payload??r.content,20000)}`,{modelTier:"quick"}); if(Array.isArray(o)) models=o.filter(m=>m&&m.id).map(m=>({id:String(m.id),name:String(m.name||m.id)})); }
    pickModels(models);
    S.connected=true;
    await loadOptions("nano");
    S.connected=true; setMag("on","Magnific: connected"); $("btnConnect").textContent="Reconnect";
    if(!Object.keys(S.magIds||{}).length) setTimeout(linkLibrary,0);
  }catch(e){ setMag("off","Magnific: "+(e?.code||"error")); if(!silent) flash($("s3state"),mcpCopy(e),true); }
  finally{ $("btnConnect").disabled=false; syncButtons(); }
}
function collectModels(p){
  const out=[]; const seen=new Set();
  walk(p,(k,v,parent)=>{ if(v&&typeof v==="object"&&!Array.isArray(v)){ const id=v.slug||v.identifier||v.id||v.model||v.key; const name=v.name||v.title||v.displayName||v.label||id; if(typeof id==="string"&&!seen.has(id)){ seen.add(id); out.push({id,name:String(name)}); } } });
  if(!out.length&&Array.isArray(p)) p.forEach(x=>{ if(typeof x==="string"&&!seen.has(x)){ seen.add(x); out.push({id:x,name:x}); } });
  return out;
}
function ver(s){ const m=String(s).match(/(\d+(?:\.\d+)*)/g); if(!m) return 0; return Math.max(...m.map(x=>{ const [a,b="0",c="0"]=x.split("."); return (+a)*10000+(+b)*100+(+c); })); }
function pickModels(list){
  /* Locked to Nano Banana 2.1; other Nano Banana versions only appear if 2.1 is missing */
  const nanoAll=list.filter(m=>/nano[\s._-]*banana/i.test(m.id+" "+m.name)).sort((a,b)=>ver(b.id+" "+b.name)-ver(a.id+" "+a.name));
  const exact=nanoAll.filter(m=>/2[\s._-]?1(?!\d)/.test(m.id+" "+m.name)&&!/pro/i.test(m.id+" "+m.name));
  const nano=exact.length?exact.slice(0,1):nanoAll;
  S.models={nano};
  const sel=$("selNano"); sel.innerHTML="";
  if(!nano.length) sel.innerHTML=`<option value="">Nano Banana 2.1 (not found in your Magnific models)</option>`;
  nano.forEach(m=>{ const o=document.createElement("option"); o.value=m.id; o.textContent=m.name+(exact.length?" · locked":" · 2.1 not found, pick one"); sel.appendChild(o); });
  sel.disabled=!!exact.length;
  if(nano[0]) $("mNanoName").textContent=nano[0].name+" · via Magnific";
  log("·","model locked",{nano:nano.map(m=>m.name)});
}

/* ---------------- UI: brief, segs, upload, refs ---------------- */
const DEFAULT_BRIEF="Three young Jordanian friends laughing together on a rooftop terrace in modern Abdali, one showing the others her savings goal on her iPhone 18, bright afternoon sun and a clear blue sky behind them.";
try{ const saved=localStorage.getItem("bae_brief"); $("brief").value=saved&&!/Jabal Amman, morning light through the window|tailored (camel|cream) blazer checks her savings/.test(saved)?saved:DEFAULT_BRIEF; }catch{ $("brief").value=DEFAULT_BRIEF; }
$("brief").addEventListener("input",()=>{ try{ localStorage.setItem("bae_brief",$("brief").value);}catch{} countBrief(); });
function countBrief(){ $("briefCount").textContent=$("brief").value.trim().split(/\s+/).filter(Boolean).length+" words"; }
countBrief();
document.querySelectorAll(".seg[data-key]").forEach(seg=>seg.addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b) return; seg.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false")); S[seg.dataset.key]=b.dataset.v; if(seg.dataset.key==="setting"||seg.dataset.key==="look") onSetting(); }));
/* Studio swaps in the BAE studio references and re-locks the prompt's setting */
function onSetting(){
  const studio=S.setting==="Studio";
  const bold=S.look==="Bold";
  const defaults=[...PICK_LOCATION,...PICK_STUDIO,...PICK_BOLD,...PICK_BOLD_STUDIO];
  const onlyDefaults=S.picked.every(id=>defaults.includes(id));
  const want=studio?(bold?PICK_BOLD_STUDIO:PICK_STUDIO):(bold?PICK_BOLD:PICK_LOCATION);
  if(!S.noLib&&(onlyDefaults||(studio&&!S.picked.some(id=>refById(id)?.studio)))) S.picked=want.slice();
  S.picked=S.picked.filter(id=>refById(id));
  S.refTab=S.noLib?"user":(studio&&!bold?"bae":(bold?"yt":S.refTab));
  renderRefs(); syncTabs();
  $("setChip").textContent=studio?"studio set":"on-location";
  $("lookChip").textContent=bold?"bold & colourful":"elegant & calm";
  ["pNano"].forEach(id=>{ if($(id).value.trim()) $(id).value=enforce($(id).value); });
}

const drop=$("drop"), file=$("file");
drop.onclick=()=>file.click(); drop.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); file.click(); } };
["dragenter","dragover"].forEach(t=>drop.addEventListener(t,e=>{ e.preventDefault(); drop.classList.add("over"); }));
["dragleave","drop"].forEach(t=>drop.addEventListener(t,e=>{ e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop",e=>{ const f=e.dataTransfer?.files?.[0]; if(f) setUpload(f); });
file.onchange=()=>{ if(file.files[0]) setUpload(file.files[0]); };
async function setUpload(f){
  if(!/^image\//.test(f.type)){ $("dropTxt").textContent="That file isn't an image. Use JPEG, PNG or WebP."; return; }
  S.upload=await toJpeg(f,1600);
  $("dropImg").src=URL.createObjectURL(S.upload); $("dropImg").hidden=false;
  $("dropTxt").textContent=f.name+" · ready to describe. Click to replace.";
}
async function toJpeg(blob,max){
  const bmp=await createImageBitmap(blob); const k=Math.min(1,max/Math.max(bmp.width,bmp.height));
  const c=document.createElement("canvas"); c.width=Math.round(bmp.width*k); c.height=Math.round(bmp.height*k);
  c.getContext("2d").drawImage(bmp,0,0,c.width,c.height);
  return await new Promise(r=>c.toBlob(r,"image/jpeg",.88));
}

function renderRefs(){
  const box=$("refs"); box.innerHTML="";
  ALL_REFS.filter(r=>r.set===S.refTab).forEach(r=>{ const b=document.createElement("button"); b.type="button"; b.className="ref"; b.title=r.d; b.setAttribute("aria-label",r.d);
    const i=S.picked.indexOf(r.id); b.setAttribute("aria-pressed",i>=0?"true":"false"); if(i>=0) b.dataset.n=i+1;
    b.innerHTML=`<img src="${r.src}" alt="" loading="lazy">${r.studio?'<span class="tag">Studio</span>':r.set==="yt"?'<span class="tag">Youth</span>':r.set==="user"?'<span class="tag">Yours</span>':""}`;
    b.onclick=()=>{ const j=S.picked.indexOf(r.id); if(j>=0) S.picked.splice(j,1); else if(S.picked.length<MAX_REFS) S.picked.push(r.id); renderRefs(); };
    box.appendChild(b); });
  const nb=S.picked.filter(id=>refById(id)?.set==="bae").length;
  $("refCount").textContent=`${S.picked.length} / ${MAX_REFS} · ${nb} BAE`;
  /* selected strip: always visible, click to remove */
  const pk=$("picked"); pk.innerHTML="";
  if(!S.picked.length) pk.innerHTML='<span class="none">No references picked. Choose up to 6 below, or use Auto-pick.</span>';
  S.picked.forEach(id=>{ const r=refById(id); if(!r) return; const b=document.createElement("button"); b.type="button"; b.className="pk"; b.title="Remove: "+r.d; b.setAttribute("aria-label","Remove reference: "+r.d);
    b.innerHTML=`<img src="${r.src}" alt="">`; b.onclick=()=>{ S.picked=S.picked.filter(x=>x!==id); renderRefs(); }; pk.appendChild(b); });
}
function syncTabs(){ document.querySelectorAll("#refTabs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.tab===S.refTab?"true":"false"));
  $("addRefWrap").hidden=S.refTab!=="user";
  $("refHint").textContent=({
    user:"Your own reference photos, kept only on this device. Add licensed images that show the light, wardrobe or camera angle you want.",
    bae:"Photos from the Bank al Etihad guidelines. Picked frames go to Claude for style analysis and to Nano Banana 2.1 as references. Up to 6, from any set. Choosing Studio picks the BAE studio frames for you.",
    yt:"Youth campaign set: bold streetwear, low-angle wide camera, blue sky, hard sun and friends mid-laugh. Used for wardrobe, camera and energy; their logos and orange clothing are never copied.",
    mj:"Mari Juliano lifestyle set, for clean natural light and candid energy. Mix with the other sets, up to 6 in total."})[S.refTab]; }
$("refTabs").addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b) return; S.refTab=b.dataset.tab; syncTabs(); renderRefs(); });
renderRefs(); syncTabs();
$("btnClearRefs").onclick=()=>{ S.picked=[]; renderRefs(); };
$("btnAuto").onclick=async()=>{
  if(!sample) return flash($("s1state"),"Claude is unavailable in this view.",true);
  const b=$("btnAuto"); b.disabled=true; b.textContent="Picking…";
  try{
    const o=await sample.json(`Pick 4 reference photos whose light, setting and energy best match this brief, for a Bank al Etihad photo. Brief: "${$("brief").value}". Setting: ${S.setting}. Shot: ${S.shot}.
Look: ${S.look==="Bold"?"BOLD & COLOURFUL — pick at least 2 Youth campaign photos (ids starting \"yt\") for wardrobe and camera angle, plus at least 1 BAE photo":"ELEGANT & CALM — pick at least 2 BAE guideline photos (ids starting \"bae_\")"}.
Rules: ${S.setting==="Studio"?"Setting is STUDIO: pick only photos marked [studio], then fill with BAE close-up/selective-focus frames.":"Setting is on-location: prefer BAE depth, focus and movement frames plus Mari Juliano frames with clean natural light."} Prefer frames where the person is centred.
Catalog:\n${ALL_REFS.map(r=>r.id+(r.studio?" [studio]":"")+": "+r.d).join("\n")}\nReply with only a JSON array of 4 ids, e.g. ["yt04","yt06","bae_b108_2","r061"].`,{modelTier:"quick"});
    if(Array.isArray(o)){ S.picked=o.map(String).filter(id=>refById(id)).slice(0,MAX_REFS); renderRefs(); }
  }catch(e){ flash($("s1state"),sampleCopy(e),true); }
  finally{ b.disabled=false; b.textContent="Auto-pick for this brief"; }
};
async function refBlobs(){ const out=[]; for(const id of S.picked){ const r=refById(id); if(r?.blob){ out.push({id,blob:r.blob}); continue; } try{ const res=await fetch(`refs/${id}.jpg`); if(res.ok) out.push({id,blob:await res.blob()}); }catch{} } return out; }

function flash(el,txt,bad){ el.textContent=txt; el.style.color=bad?"var(--warn)":""; }
function stage(n,cls){ const s=$("s"+n); s.classList.remove("active","done"); if(cls) s.classList.add(cls);
  /* top progress: Brief → Describe (s1) → Prompt (s2) → Image (s3) */
  const pg=$("pg"+(n+1)); if(pg){ pg.classList.remove("active","done"); if(cls) pg.classList.add(cls); }
  if(cls==="active") for(let k=n+2;k<=4;k++) $("pg"+k)?.classList.remove("active","done"); }
function syncButtons(){
  $("btnDescribe").disabled=!sample;
  $("btnPrompt").disabled=!sample;
  $("btnGen").disabled=!(mcp&&sample&&$("pNano").value.trim());
}
$("pNano").addEventListener("input",syncButtons);

/* ---------------- STEP 1: describe ---------------- */
$("btnDescribe").onclick=describe;
async function describe(){
  stage(1,"active"); flash($("s1state"),"Thinking…"); $("btnDescribe").disabled=true;
  try{
    const refs=await refBlobs();
    let images=[]; if(sampleImages){ if(S.upload) images.push(S.upload); refs.forEach(r=>images.push(r.blob)); images=images.slice(0,sampleImages.maxCount||5); }
    const imgNote=images.length?`Images attached, in order: ${S.upload?"image 1 is the USER'S IMAGE to describe and rebuild; then ":""}${refs.slice(0,images.length-(S.upload?1:0)).map((r,i)=>`image ${i+1+(S.upload?1:0)} is ${({bae:"a BAE GUIDELINE photo",yt:"a YOUTH CAMPAIGN reference",mj:"a Mari Juliano reference",user:"the user's own reference"})[refById(r.id)?.set]||"a reference"} (${refById(r.id)?.d})`).join("; ")}. BAE guideline photos define the brand's light, depth and set style; YOUTH CAMPAIGN references define wardrobe, camera angle and energy for the bold look (ignore their logos, products and any orange clothing); Mari Juliano photos add clean natural light and candid energy. Borrow craft only, never their people, clothing, brands or locations.`:"No images attached; work from the brief and these reference notes: "+S.picked.map(id=>refById(id)?.d).join(" | ");
    const prompt=`You are the art director for Bank al Etihad (Jordan). Describe the photograph we will produce.
${BAE_RULES}

${REF_STYLE}

${COMPOSITION_RULE}

${settingRule()}

${lookRule()}

Brief (may be Arabic or English): "${$("brief").value}"
Setting: ${S.setting}. Shot type: ${S.shot}. Aspect ratio: ${aspectText()}. Channel: ${$("channel").value}. Copy space for gradient shape: ${$("copySpace").checked?"yes":"no"}.
${imgNote}
${S.upload?"First describe the user's image faithfully (subject, action, setting, framing), then rebuild it as a BAE photograph keeping its idea.":""}
Mandatory style: ${STYLE}.

Reply in English with only JSON:
{"summary":"2-3 sentences describing the final photo","subject":"","action":"","setting":"","wardrobe":"","light":"","composition":"","depth":"foreground / subject / background","palette":"","camera":"lens, aperture, angle","mood":"","from_user_image":"what was kept from the user's image, or empty","reference_style":"what is borrowed from the references","bae_notes":["how each key BAE principle is met"],"risks":["anything to watch, e.g. cultural sensitivity or AI misuse"]}`;
    const a=await sample.json(prompt,{images:images.length?images:undefined});
    S.analysis=a; renderAnalysis(a); stage(1,"done"); flash($("s1state"),"Done. Edit the brief and describe again, or rewrite the prompt.");
    $("btnPrompt").disabled=false;
    await writePrompts();
  }catch(e){ stage(1); flash($("s1state"),sampleCopy(e),true); }
  finally{ $("btnDescribe").disabled=!sample; }
}
function esc(s){ return String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]); }
function renderAnalysis(a){
  const f=[["Subject",a.subject],["Action",a.action],["Setting",a.setting],["Wardrobe",a.wardrobe],["Light",a.light],["Composition",a.composition],["Depth layers",a.depth],["Palette",a.palette],["Camera",a.camera],["Mood",a.mood]];
  if(a.from_user_image) f.push(["From your image",a.from_user_image]);
  if(a.reference_style) f.push(["From the references",a.reference_style]);
  $("s1body").innerHTML=`<p class="summary">${esc(a.summary)}</p><dl class="spec">${f.filter(x=>x[1]).map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`+
    (Array.isArray(a.risks)&&a.risks.length?`<div class="msg info">Watch: ${a.risks.map(esc).join(" · ")}</div>`:"");
}

/* ---------------- STEP 2: prompts ---------------- */
$("btnPrompt").onclick=writePrompts;
async function writePrompts(){
  stage(2,"active"); flash($("s2state"),"Writing…"); $("btnPrompt").disabled=true;
  try{
    const prompt=`Write one production image prompt for Google Nano Banana 2.1 for this Bank al Etihad photograph.
${BAE_RULES}

${REF_STYLE}

${COMPOSITION_RULE}

${settingRule()}

${lookRule()}

Scene breakdown: ${JSON.stringify(S.analysis||{brief:$("brief").value})}
Brief: "${$("brief").value}". Setting: ${S.setting}. Shot: ${S.shot}. Aspect ratio: ${aspectText()}. Output: native 4K, highest quality. Channel: ${$("channel").value}. Copy space for the gradient shape: ${$("copySpace").checked?"yes, keep calm, even space around the centred subject":"no"}.
Reference images (${S.picked.length}) will be attached as style references: ${S.picked.map(id=>`${refById(id)?.set==="bae"?"BAE guideline":"Mari Juliano"} — ${refById(id)?.d}`).join("; ")}${S.upload&&$("useUpAsRef").checked?"; plus the user's own image as the first reference for content":""}.

Requirements:
- Begin with exactly: "Professional photography, clean natural light."
- Photorealistic, 4K, real camera language (lens, aperture, angle), believable Jordanian people in modern places.
- Apply every point of the CLIENT ART DIRECTION explicitly in the prompt: modern upscale setting, modern elegant wardrobe, no hijab or traditional Arab clothing, professionally retouched even skin tone, iPhone 18 for any phone, modern IKEA-style decor.
- State the composition explicitly: the person centred on the vertical centre line, balanced framing, equal space left and right.
- ${S.setting==="Studio"?"STUDIO: describe the studio set, backdrop and softbox light explicitly; translate any location in the brief into one or two modern props on the set; no real location.":"ON-LOCATION: encode depth layers and foreground bokeh in a modern real place."}
- ${S.look==="Bold"?"LOOK BOLD & COLOURFUL: describe each person's streetwear outfit piece by piece in saturated colour-block colours (never orange, never all-beige), the low-angle wide-angle 16–24 mm camera looking up, the bright open sky or backdrop, hard bright sunlight and the playful mid-laugh interaction, exactly in the spirit of the youth campaign references.":"LOOK ELEGANT & CALM: describe a refined, tailored wardrobe in calm neutral tones and a composed, warm mood."}
- Encode selective focus with one focal anchor${S.look==="Bold"?" (faces sharp)":" and the BAE warm palette"}.
- State that the attached reference images guide light, colour grading, set style and candid energy only; do not copy their people, clothing, brands or exact scenes.
- No logos, text, signage, watermarks.
Format: one flowing descriptive paragraph that reads like a photographer's shot description, 130-200 words. Refer to the attached references by their tags, in this order: ${refPlan().map(r=>`${r.tag} (${r.use})`).join("; ")||"none attached"}. Example: "light and colour grade like @img1, wardrobe and low camera angle like @img2".
Also return a checklist of 6-8 BAE rules with status "pass" or "note" and a 3-6 word label.

Reply with only JSON: {"prompt_nano":"","negative":"comma list of things to avoid","checklist":[{"label":"","status":"pass"}]}`;
    const o=await sample.json(prompt);
    $("pNano").value=enforce(o.prompt_nano||"");
    S.negative=o.negative||"logos, text, watermark, signage, oversaturated, HDR, extra fingers";
    $("checks").innerHTML=(o.checklist||[]).map(c=>`<span class="check ${c.status==="pass"?"":"note"}">${c.status==="pass"?"✓":"!"} ${esc(c.label)}</span>`).join("");
    stage(2,"done"); flash($("s2state"),"Ready. Edit freely, then generate.");
  }catch(e){ stage(2); flash($("s2state"),sampleCopy(e),true); }
  finally{ $("btnPrompt").disabled=!sample; syncButtons(); }
}
function enforce(p){
  let t=p.trim();
  if(!/professional photography/i.test(t)||!/clean natural light/i.test(t)) t="Professional photography, clean natural light. "+t;
  if(!/4k/i.test(t)) t+=" Ultra-detailed 4K resolution.";
  t=t.replace(/\n*Mandatory art direction:[^\n]*/g,"").replace(/\n*Look lock:[^\n]*/g,"");
  t+="\n\n"+CLIENT_LINE+"\n"+lookLine();
  if(!/Composition lock:/.test(t)) t+="\n"+COMPOSITION_LINE;
  t=t.replace(/\n*Setting lock:[^\n]*/g,"")+"\n"+(S.setting==="Studio"?STUDIO_LINE:LOCATION_LINE);
  return t;
}

/* ---------------- STEP 3: generate ---------------- */
const MODELS={ nano:{el:"rNano",sel:"selNano",mode:"modeNano",prompt:"pNano",label:"Nano Banana 2.1"} };
function negativeNow(){ return [S.negative||"logos, text, watermark, signage, oversaturated, HDR, extra fingers",CLIENT_NEG,COMPOSITION_NEG,S.setting==="Studio"?STUDIO_NEG:"",S.look==="Bold"?LOOK_BOLD_NEG:""].filter(Boolean).join(", "); }
const STEPS=["Upload references","Render in 4K","4K check","Ready"];
function aspectVal(){ const v=$("aspect").value; if(v==="custom"){ const w=parseInt($("cw").value,10)||0,h=parseInt($("ch").value,10)||0; return w&&h?{width:w,height:h}:"auto"; } return v; }
function aspectText(){ const a=aspectVal(); return typeof a==="string"?a:`${a.width}×${a.height}px`; }
function ratioCSS(){ const a=aspectVal(); if(a==="auto") return "4 / 3"; if(typeof a==="object") return `${a.width} / ${a.height}`; const [w,h]=a.split(":").map(Number); return `${w} / ${h}`; }
function renderCard(key,st){
  const m=MODELS[key]; const el=$(m.el); const name=$(m.sel).selectedOptions[0]?.textContent?.replace(" · latest","")||m.label;
  const outs=st.outs||[]; const o=outs[st.sel||0];
  const res=o&&o.long?(o.long>=3800?`4K · ${o.long}px`:`${o.long}px`):"";
  el.innerHTML=`<div class="head"><b>${esc(m.label)}</b><span class="count">${esc(name)}</span></div>
  <div class="frame ${st.busy?"busy":""}" style="aspect-ratio:${ratioCSS()}">${o?.img?`<img src="${o.img}" alt="Generated image ${(st.sel||0)+1} from ${esc(m.label)}">`:`${!o&&!st.busy?`<div class="ph-mosaic" aria-hidden="true">${S.picked.slice(0,3).map(id=>`<img src="${refById(id)?.src}" alt="">`).join("")}</div>`:""}<span class="ph-txt">${esc(o?"Magnific sent a link but not the image itself, and claude.ai blocks outside images inside pages. Open the PNG below to view or save it.":(st.ph||"Your image appears here"))}</span>`}${res?`<span class="badge">${esc(res)}</span>`:""}${st.busy?`<span class="elapsed" id="elapsed-${key}">${fmtTime(st.t0)}</span>`:""}</div>
  ${outs.length>1?`<div class="thumbs">${outs.map((x,i)=>`<button type="button" data-i="${i}" aria-pressed="${i===(st.sel||0)}" aria-label="Show image ${i+1}">${x.img?`<img src="${x.img}" alt="">`:i+1}</button>`).join("")}</div>`:""}
  <ol class="steps">${STEPS.map((s,i)=>`<li class="${st.steps?.[i]||""}">${s}${st.stepNote?.[i]?` · ${esc(st.stepNote[i])}`:""}</li>`).join("")}</ol>
  ${st.err?`<div class="msg">${esc(st.err)}</div>`:""}${st.refWarn?`<div class="msg info">${esc(st.refWarn)}</div>`:""}
  <div class="btns">${o?.blob?`<button class="btn small primary" data-act="dl">Download ${/png/.test(o.blob.type)?"PNG":"image"}</button>`:""}${o?.url?`<a class="btn small ${o.blob?"":"primary"}" href="${esc(o.url)}" target="_blank" rel="noopener">Open ${o.long>=3800?"4K ":""}PNG</a><button class="btn small" data-act="copy">Copy link</button>`:""}${o?.webUrl?`<a class="btn small ${o.blob||o.url?"":"primary"}" href="${esc(o.webUrl)}" target="_blank" rel="noopener">Open in Magnific</a>`:""}${st.done||st.err?`<button class="btn small" data-act="regen">Regenerate</button>`:""}</div>
  ${o?.url?`<input type="text" readonly class="linkbox" id="link-${key}" value="${esc(o.url)}" aria-label="Image link">`:""}
  ${o?.links?.length>1?`<details class="links"><summary>All links from Magnific (${o.links.length})</summary>${o.links.map(u=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a>`).join("")}</details>`:""}`;
  el.querySelector('[data-act="dl"]')?.addEventListener("click",()=>save(key,o));
  el.querySelector('[data-act="copy"]')?.addEventListener("click",async e=>{ const b=e.currentTarget; try{ await navigator.clipboard.writeText(o.url); b.textContent="Copied"; }catch{ const i=$("link-"+key); i.focus(); i.select(); b.textContent="Selected, press Ctrl/Cmd+C"; } setTimeout(()=>{ b.textContent="Copy link"; },1800); });
  el.querySelector('[data-act="regen"]')?.addEventListener("click",()=>generate([key]));
  el.querySelectorAll(".thumbs button").forEach(b=>b.addEventListener("click",()=>{ st.sel=+b.dataset.i; renderCard(key,st); }));
  el.querySelector(".frame > img")?.addEventListener("click",()=>openLightbox(o.img));
}
const cards={nano:{}};
function idle(){ for(const k in MODELS){ cards[k]={ph:"Your 4K image appears here. Write a brief above and press Create image.",steps:[]}; renderCard(k,cards[k]); } }
function fmtTime(t0){ if(!t0) return "0:00"; const s=Math.max(0,Math.round((Date.now()-t0)/1000)); return Math.floor(s/60)+":"+String(s%60).padStart(2,"0"); }
idle();
function onAspect(){ $("customWrap").hidden=$("aspect").value!=="custom"; $("aspectPill").textContent=aspectText(); for(const k in MODELS) renderCard(k,cards[k]); }
["aspect","cw","ch"].forEach(id=>$(id).addEventListener(id==="aspect"?"change":"input",onAspect)); onAspect();
function setCount(n){ n=Math.max(1,Math.min(4,n)); $("count").value=n; $("countOut").textContent=n; }
$("cMinus").onclick=()=>setCount(+$("count").value-1); $("cPlus").onclick=()=>setCount(+$("count").value+1);

/* Each model's own choices (mode such as "Flare", 4K value, quality) read from Magnific */
S.opts={};
async function loadOptions(key){
  const m=MODELS[key]; const id=$(m.sel).value; const sel=$(m.mode);
  if(!id||!mcp||!sample) return;
  sel.innerHTML='<option value="">Loading options…</option>';
  try{
    if(!(id in S.opts)){
      let raw=null;
      try{ const a=await buildArgs("images_models_settings",`Get every setting and its allowed values (resolutions, quality, modes or variants, aspect ratios, number of images, reference limits) for image model ${id}.`,{model:id}); const r=await callMag("images_models_settings",a.args); raw=r.payload??r.content; }
      catch{ raw=await modelDetails(id); }
      let parsed={};
      if(raw) parsed=await sample.json(`From these Magnific settings for image model "${id}", extract the user-facing choices.
Settings: ${trimJSON(raw,16000)}
Reply with only JSON: {"modes":[{"value":"exact value","label":"short label","param":"setting name"}],"best_mode":"value of the highest-quality mode or null","res_4k":"exact value that means 4K, or null if 4K is not offered","max_res":"largest resolution value","best_quality":"exact highest quality value or null","quality_param":"setting name or null","max_images":4}
"modes" are the model's variant/mode/style choices (a dropdown such as "Flare"); leave it empty if the model has none.`,{modelTier:"quick"}).catch(()=>({}));
      S.opts[id]={raw,parsed:parsed||{}};
    }
    const p=S.opts[id].parsed; const modes=Array.isArray(p.modes)?p.modes:[];
    sel.innerHTML="";
    if(!modes.length) sel.innerHTML='<option value="">Default</option>';
    modes.forEach(md=>{ const o=document.createElement("option"); o.value=String(md.value); o.textContent=String(md.label||md.value)+(String(md.value)===String(p.best_mode)?" · best quality":""); if(String(md.value)===String(p.best_mode)) o.selected=true; sel.appendChild(o); });
    log("·","options "+id,p);
  }catch{ sel.innerHTML='<option value="">Default</option>'; }
}
$("selNano").addEventListener("change",()=>loadOptions("nano"));

$("btnGen").onclick=()=>generate(["nano"]);
let refCache=null;
/* What each reference is used for; the order here is the @img1, @img2… order sent to Magnific */
function refRole(id,meta){
  const set=id==="user-image"?"user-image":meta?.set;
  return ({
    "user-image":{role:"reference",use:"the user's own image: content and composition to rebuild"},
    bae:{role:"style",use:meta?.studio?"BAE studio set, backdrop and soft directional light":"BAE light, depth, focus and colour grade"},
    yt:{role:"style",use:"wardrobe, colour-block styling, low wide camera angle and energy"},
    mj:{role:"style",use:"clean natural light and candid energy"},
    user:{role:"style",use:"the user's reference for light, wardrobe and camera"}
  })[set]||{role:"style",use:"style reference"};
}
/* ---- Magnific reference library: images uploaded once to a Magnific folder named "BAE References" ----
   Magnific's upload tool only takes public links, and claude.ai pages can't send files to outside servers,
   so references are attached by their Magnific creation identifiers, matched by file name (bae_b114_1, yt04, r061…). */
const LIB_KEY="bae_mag_ids_v1";
try{ S.magIds=JSON.parse(localStorage.getItem(LIB_KEY)||"{}"); }catch{ S.magIds={}; }
function libStatus(txt,kind){ const el=$("libState"); if(el){ el.textContent=txt; el.className="t12 "+(kind==="ok"?"ok-t":kind==="bad"?"bad-t":"muted"); } }
function libSummary(){ const n=Object.keys(S.magIds||{}).length; const total=ALL_REFS.filter(r=>r.set!=="user").length; return n?`${n} of ${total} references linked from your Magnific library.`:"Not linked yet. Upload the reference pack to a Magnific folder named “BAE References”, then press Link library."; }
/* Names in the pack: bae_b114_1, yt04, r025 (Magnific may drop the .jpg) */
const REF_NAME_RE=/(?<![A-Za-z0-9])(bae_b\d{3}_\d|yt\d{2}|r\d{3})(?![0-9])/i;
const NAME_KEYS=/^(name|title|file_?name|original_?(file_?)?name|label|display_?name|asset_?name)$/i;
const REF_KEYS=["folderReference","projectReference","reference","identifier","id","uuid","slug"];
/* Magnific answers some tools with JSON and others with YAML-like text; both are read here */
function textBlocks(t){ return String(t).split(/\n(?=\s*-\s)|\n\s*\n|\n(?=identifier:)/).filter(b=>b.trim()); }
function textVal(block,keys){ for(const k of keys){ const m=block.match(new RegExp("(?:^|\\n|\\s|-\\s)"+k+"\\s*:\\s*\"?([^\\n\"]+)","i")); if(m) return m[1].trim(); } return null; }
function findFolder(p){
  let hit=null;
  if(p&&typeof p==="object") walk(p,(k,v)=>{ if(hit||!v||typeof v!=="object"||Array.isArray(v)) return; const name=v.name||v.title||v.label||v.displayName||v.projectName; if(typeof name==="string"&&/bae[\s_-]*ref/i.test(name)){ const key=REF_KEYS.find(x=>typeof v[x]==="string"||typeof v[x]==="number"); hit={name,ref:key?v[key]:null,raw:v}; } });
  else if(typeof p==="string") for(const b of textBlocks(p)){ if(/bae[\s_-]*ref/i.test(b)){ hit={name:"BAE References",ref:textVal(b,["folderReference","projectReference","reference","identifier","id","uuid"]),raw:b.slice(0,400)}; break; } }
  return hit;
}
function matchRefs(p,map){
  const put=(name,id)=>{ const m=String(name||"").match(REF_NAME_RE); if(m&&id&&!map[m[1].toLowerCase()]) map[m[1].toLowerCase()]=String(id); };
  if(p&&typeof p==="object") walk(p,(k,v)=>{ if(!v||typeof v!=="object"||Array.isArray(v)) return; const id=v.identifier||v.creationIdentifier; if(typeof id!=="string") return;
    let nm=null; for(const kk of Object.keys(v)) if(NAME_KEYS.test(kk)&&typeof v[kk]==="string"&&REF_NAME_RE.test(v[kk])){ nm=v[kk]; break; }
    if(!nm){ walk(v,(k2,v2)=>{ if(!nm&&NAME_KEYS.test(k2)&&typeof v2==="string"&&REF_NAME_RE.test(v2)) nm=v2; }); }
    put(nm,id); });
  else if(typeof p==="string") for(const b of textBlocks(p)){ const id=textVal(b,["identifier","creationIdentifier"]); const nm=textVal(b,["name","title","fileName","filename","originalName","label"]); put(nm,id); }
  return map;
}
function countItems(p){ let n=0; if(p&&typeof p==="object") walk(p,(k,v)=>{ if(v&&typeof v==="object"&&!Array.isArray(v)&&typeof (v.identifier||v.creationIdentifier)==="string") n++; }); else if(typeof p==="string") n=(p.match(/(^|\n)\s*-?\s*identifier\s*:/g)||[]).length; return n; }
function findCursor(p){ let cur=null; if(p&&typeof p==="object") walk(p,(k,v)=>{ if(!cur&&/^(next_?cursor|cursor|next_?page_?token|next_?page|next)$/i.test(k)&&(typeof v==="string"||typeof v==="number")&&v!=="") cur=v; }); else if(typeof p==="string"){ const m=p.match(/next_?(cursor|page_?token|page)\s*:\s*"?([^\s"\n]+)/i); if(m&&m[2]!=="null") cur=m[2]; } return cur; }
async function linkLibrary(){
  if(S.web||!mcp||!sample) return;
  const b=$("btnLinkLib"); b.disabled=true; libStatus("Looking for the “BAE References” folder in Magnific…");
  try{
    if(!S.connected) await connect(true);
    /* "BAE References" can be a personal folder or a shared TEAM project: look in both */
    let folder=null;
    for(const [goal,data] of [["List all of the user's folders and projects, including their names and references.",{}],["List the team's shared projects (team / shared scope), including their names and references.",{scope:"team",team:true}]]){
      if(folder) break;
      try{ const fa=await buildArgs("folders_list",goal,data); const fr=await callMag("folders_list",fa.args); const pl=fr.payload??fr.content; folder=findFolder(pl);
        if(!folder&&/bae[\s_-]*ref/i.test(trimJSON(pl,60000))){ const o=await sample.json(`Find the folder or project named "BAE References" in this Magnific result and return the exact value to pass as its folder/project reference. Result:\n${trimJSON(pl,14000)}\n\nReply with only JSON: {"name":"","ref":""}`,{modelTier:"quick"}).catch(()=>null); if(o?.ref) folder={name:o.name||"BAE References",ref:o.ref,raw:null}; } }
      catch(e){ log("✕","folders_list",{code:e?.code,message:e?.message}); }
    }
    log("·","library folder",folder||"not found");
    const map={}; let seen=0;
    for(let page=0;page<6;page++){
      const la=await buildArgs("creations_list",`List the creations and uploaded images ${folder?`inside the folder/project named "${folder.name}" (reference ${JSON.stringify(folder.ref)}) — pass that reference in the folder/project argument`:"in the user's library, newest first, including uploads"}. Return as many items per call as the tool allows (100 or the maximum), including each item's name, title or file name. ${page?`This is page ${page+1}: pass the cursor from Data.`:""}`,{folderReference:folder?.ref||null,folderName:folder?.name||null,page:page+1,cursor:S._libCursor||null,limit:100});
      const lr=await callMag("creations_list",la.args); const pl=lr.payload??lr.content;
      const before=Object.keys(map).length; matchRefs(pl,map); seen+=countItems(pl);
      /* Last resort: let Claude read the names if the shape is unusual */
      if(Object.keys(map).length===before&&countItems(pl)){ const o=await sample.json(`From this Magnific list of creations, return every item's identifier and its name/title/file name. Result:\n${trimJSON(pl,15000)}\n\nReply with only a JSON array: [{"identifier":"","name":""}]`,{modelTier:"quick"}).catch(()=>null); if(Array.isArray(o)) o.forEach(x=>{ const m=String(x?.name||"").match(REF_NAME_RE); if(m&&x.identifier&&!map[m[1].toLowerCase()]) map[m[1].toLowerCase()]=String(x.identifier); }); }
      S._libCursor=findCursor(pl);
      if(!S._libCursor||(Object.keys(map).length===before&&page>0)) break;
    }
    S._libCursor=null; S.magIds=map; try{ localStorage.setItem(LIB_KEY,JSON.stringify(map)); }catch{}
    refCache=null;
    const n=Object.keys(map).length;
    const total=ALL_REFS.filter(r=>r.set!=="user"); const missing=total.filter(r=>!map[r.id.toLowerCase()]).map(r=>r.id);
    if(n) libStatus(`${n} of ${total.length} references linked${folder?` from “${folder.name}”`:""}. They are attached as @img1, @img2… automatically.${missing.length?` Not in Magnific yet: ${missing.slice(0,8).join(", ")}${missing.length>8?` and ${missing.length-8} more`:""}.`:""}`,"ok");
    else libStatus(folder?`Found “${folder.name}” with ${seen} items, but no file names matched (bae_b114_1.jpg, yt04.jpg…). Keep the original file names from the pack, then link again.`:"No “BAE References” folder found. Create it in Magnific, drag the reference pack into it, then press Link library.","bad");
    renderRefs();
  }catch(e){ libStatus(mcpCopy(e),"bad"); }
  finally{ b.disabled=false; }
}
/* Reference pack: every built-in reference with its file name, zipped for one drag-and-drop into Magnific */
async function downloadPack(){
  const b=$("btnPack"); b.disabled=true; const old=b.textContent; b.textContent="Preparing…";
  try{
    if(!window.JSZip) throw new Error("zip library didn't load");
    const zip=new JSZip(); const refs=ALL_REFS.filter(r=>r.set!=="user");
    for(const r of refs){ const res=await fetch(r.src); if(res.ok) zip.file(r.id+".jpg",await res.blob()); }
    const blob=await zip.generateAsync({type:"blob"});
    if(downloads) await downloads.save({filename:"BAE-References.zip",data:blob});
    else { const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="BAE-References.zip"; a.click(); }
    libStatus(`Pack saved (${refs.length} images). In Magnific, create a folder named “BAE References”, drag all images into it, then press Link library.`);
  }catch(e){ if(e?.code!=="declined") libStatus("Couldn't build the pack: "+(e?.message||e?.code),"bad"); }
  finally{ b.disabled=false; b.textContent=old; }
}
function refPlan(){ const ids=[...(S.upload&&$("useUpAsRef").checked?["user-image"]:[]),...S.picked]; return ids.map((id,i)=>({id,tag:"@img"+(i+1),...refRole(id,refById(id))})); }
function refLine(list){ return list.length?"Reference images: "+list.map(r=>`${r.tag} = ${r.use}`).join("; ")+". Use them for those qualities only; never copy their people, logos or orange clothing.":""; }
async function uploadRefs(){
  const sig=S.picked.join(",")+"|"+(S.upload&&$("useUpAsRef").checked?S.upload.size:"");
  if(refCache&&refCache.sig===sig&&!refCache.errors.length) return refCache;
  const items=[]; if(S.upload&&$("useUpAsRef").checked) items.push({id:"user-image",blob:S.upload});
  (await refBlobs()).forEach(r=>items.push(r));
  const list=[], errors=[];
  for(const it of items){
    /* Preferred: the image already lives in the user's Magnific library (BAE References folder) */
    const magId=S.magIds?.[String(it.id).toLowerCase()];
    if(magId){ const meta=refById(it.id)||{}; list.push({ref:it.id,id:magId,url:null,...refRole(it.id,meta)}); continue; }
    if(!S.allowDirectUpload){ errors.push(`${it.id}: not in your Magnific "BAE References" folder yet`); continue; }
    try{
      const plan=await buildArgs("creations_upload_image",`Upload one JPEG image named ${it.id}.jpg to the user's Magnific creations so it can be used as a reference image (@img) in image generation. The image bytes MUST go in: put the placeholder string "__FILE__" (raw base64) as the value of the property that carries the image content, or "__FILE_DATAURL__" if that property expects a data: URL.`,{filename:it.id+".jpg",mime_type:"image/jpeg",content:"__FILE__"});
      let pargs=plan.args;
      /* Safety net: if Claude left out the placeholder, put it in the schema's content-like property */
      if(!/__FILE(_DATAURL)?__/.test(JSON.stringify(pargs))){
        const props=Object.keys(S.schemas.creations_upload_image?.inputSchema?.properties||{});
        const k=props.find(p=>/base64|content|data|image|file/i.test(p)&&!/url|name|type|mime|folder/i.test(p));
        if(k) pargs={...pargs,[k]:"__FILE__"}; else throw {code:"tool_error",message:"Couldn't find where creations_upload_image takes the image"};
      }
      let val;
      const usesDataUrl=JSON.stringify(pargs).includes("__FILE_DATAURL__");
      if(S.fileArgs&&!usesDataUrl) val={$file:{data:it.blob,name:it.id+".jpg",type:"image/jpeg"}};
      else{ const small=it.blob.size>700000?await toJpeg(it.blob,1280):it.blob; const b64=await toB64(small); val=usesDataUrl?"data:image/jpeg;base64,"+b64:b64; }
      let args=replaceDeep(pargs,"__FILE__",val); args=replaceDeep(args,"__FILE_DATAURL__",val);
      const r=await callMag("creations_upload_image",args);
      let rr=readResult(r); if(!rr.ids.length&&!rr.urls.length) rr=await extractWithClaude(r,"the uploaded creation's identifier and url");
      if(!rr.ids.length&&!rr.urls.length) throw {code:"tool_error",message:"Magnific accepted the upload but returned no identifier"};
      const meta=it.id==="user-image"?{set:"user-image"}:(refById(it.id)||{});
      list.push({ref:it.id,id:rr.ids[0]||null,url:rr.urls[0]||null,...refRole(it.id,meta)});
    }catch(e){ const why=e?.code==="blocked_by_policy"?"creations_upload_image is Blocked in your Magnific tool permissions":(e?.message||e?.code||"unknown"); errors.push(`${it.id}: ${String(why).slice(0,140)}`); log("✕","reference "+it.id+" not uploaded",{code:e?.code,message:e?.message}); }
  }
  list.forEach((x,i)=>x.tag="@img"+(i+1));
  refCache={sig,list,errors}; return refCache;
}
function toB64(blob){ return new Promise((res,rej)=>{ const fr=new FileReader(); fr.onload=()=>res(String(fr.result).split(",")[1]); fr.onerror=rej; fr.readAsDataURL(blob); }); }
async function modelDetails(id){
  if(!id) return null; if(S.details[id]!==undefined) return S.details[id];
  try{ const a=await buildArgs("images_models_show",`Show the full details and settings (resolutions, aspect ratios, reference image limits) of model ${id}.`,{model:id}); const r=await callMag("images_models_show",a.args); S.details[id]=r.payload??r.content; }
  catch{ S.details[id]=null; }
  return S.details[id];
}
async function waitFor(ids,label){
  let last=null;
  for(let i=0;i<10;i++){
    const a=await buildArgs("creations_wait",`Wait until these creations finish (${label}). Use the longest wait the tool allows.`,{identifiers:ids});
    const r=await callMag("creations_wait",a.args);
    let rr=readResult(r);
    if(!rr.status&&!rr.urls.length&&!rr.images.length) rr=await extractWithClaude(r,"the status, identifiers and image urls of the creations");
    last=rr;
    if(FAIL.test(rr.status)) throw {code:"tool_error",message:"Magnific marked the creation as "+rr.status};
    if(DONE.test(rr.status)||rr.urls.length||rr.images.length) return rr;
  }
  throw {code:"tool_error",message:"Still processing after several waits. Check your Magnific creations."};
}
async function preview(id){
  if(!id) return {image:null,urls:[],w:0,h:0};
  /* creations_read returns the finished image itself; creations_show is only a widget in Magnific's own UI */
  let urls=[],w=0,h=0;
  for(const [tool,goal] of [["creations_read","Read this finished image creation so its image content is returned, at the largest size the tool allows."],["creations_show","Show this creation so its image can be previewed."]]){
    try{ const a=await buildArgs(tool,goal,{identifier:id}); const r=await callMag(tool,a.args); const x=readResult(r); urls.push(...x.urls); w=Math.max(w,x.w); h=Math.max(h,x.h); if(x.images.length) return {image:x.images[0],urls,w,h}; }
    catch(e){ log("✕",tool+" skipped",{code:e?.code}); }
  }
  return {image:null,urls,w,h};
}
async function generate(keys){
  if(S.web) return generateWeb();
  if(!mcp||!sample) return;
  if(!S.connected) await connect(true);
  $("btnGen").disabled=true; stage(3,"active"); flash($("s3state"),"Uploading references…");
  const t0=Date.now();
  keys.forEach(k=>{ cards[k]={busy:true,t0,ph:"Uploading references to Magnific…",steps:["run"],stepNote:[]}; renderCard(k,cards[k]); });
  const tick=setInterval(()=>keys.forEach(k=>{ const e=$("elapsed-"+k); if(e) e.textContent=fmtTime(t0); }),1000);
  $("s3").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
  let refs=[], upErr=[], wanted=S.picked.length+(S.upload&&$("useUpAsRef").checked?1:0);
  try{ const u=await uploadRefs(); refs=u.list; upErr=u.errors; }catch(e){ log("✕","references",e); upErr=[String(e?.message||e?.code||e)]; }
  keys.forEach(k=>{ const c=cards[k]; c.steps=[!wanted||refs.length===wanted?"ok":"err"];
    c.stepNote=[!wanted?"none picked":`${refs.length} of ${wanted} attached${refs.length?" as "+refs.map(r=>r.tag).join(", "):""}`];
    c.refWarn=upErr.length?`References not attached: ${upErr.join(" · ")}. Open the Connector log for details.`:""; renderCard(k,c); });
  flash($("s3state"),"Rendering with Nano Banana 2.1…");
  await Promise.allSettled(keys.map(k=>runModel(k,refs)));
  clearInterval(tick);
  const ok=keys.some(k=>cards[k].done&&!cards[k].err);
  stage(3,ok?"done":undefined); flash($("s3state"),ok?`Finished in ${fmtTime(t0)}. Download, open the PNG or generate again.`:"Not generated. See the message under the image.",!ok); syncButtons();
}
async function runModel(key,refs){
  const m=MODELS[key]; const c=cards[key]; const modelId=$(m.sel).value||null; if($(m.prompt).value.trim()) $(m.prompt).value=enforce($(m.prompt).value);
  /* Name the attached references in the prompt as @img1, @img2… in upload order */
  if($(m.prompt).value.trim()) $(m.prompt).value=$(m.prompt).value.replace(/\n*Reference images:[^\n]*/g,"")+(refs.length?"\n"+refLine(refs):"");
  const prompt=$(m.prompt).value.trim();
  const mode=$(m.mode).value||null; const count=Math.max(1,Math.min(4,+$("count").value||1)); const aspect=aspectVal();
  const up=()=>renderCard(key,c);
  try{
    if(!prompt) throw {code:"tool_error",message:"Write the prompt first (step 2)."};
    c.steps[1]="run"; c.ph=`Rendering ${count} in 4K…`; up();
    if(modelId&&!(modelId in S.opts)) await loadOptions(key);
    const opt=(modelId&&S.opts[modelId])||{raw:await modelDetails(modelId),parsed:{}}; const P=opt.parsed||{};
    const modeParam=(P.modes||[]).find(x=>String(x.value)===String(mode))?.param||null;
    const plan=await buildArgs("images_generate",
      `Generate exactly ${count} photorealistic image(s) with model "${modelId||m.label}". Use the prompt verbatim.
Resolution: 4K. Use the exact 4K value from the model settings${P.res_4k?` ("${P.res_4k}")`:""}; if 4K is not offered, use the largest value${P.max_res?` ("${P.max_res}")`:""}.
Quality: the highest available${P.best_quality?` ("${P.best_quality}"${P.quality_param?` on "${P.quality_param}"`:""})`:""}.
${mode?`Mode: "${mode}"${modeParam?` on setting "${modeParam}"`:""}.`:"Mode: model default."}
Aspect ratio: ${typeof aspect==="string"?(aspect==="auto"?"auto (let the model choose)":aspect):`custom ${aspect.width}x${aspect.height} px`}.
Number of images: ${count}.
REFERENCES ARE REQUIRED: attach EVERY item in Data.references, in exactly this order, so the first becomes @img1, the second @img2 and so on (the prompt refers to them by those tags). Use the schema's reference field(s) with the uploaded creation identifiers (or URLs if the schema takes URLs). If the schema has separate style / character / general reference slots, put role "style" items in the style slot, "character" items in the character slot and the rest in the general reference list, keeping the order. Do not drop any reference. Fill the negative prompt field if the schema has one. Turn off any prompt auto-enhancement so the brand prompt stays as written.`,
      {model:modelId, model_label:m.label, model_settings:opt.raw, prompt, negative_prompt:negativeNow(), composition:"person centred on the vertical centre line", setting:S.setting, aspect_ratio:aspect, resolution:P.res_4k||"4K", quality:P.best_quality||"high", mode, num_images:count, references:refs},"default");
    const r=await callMag("images_generate",plan.args);
    let rr=readResult(r); if(!rr.ids.length&&!rr.urls.length&&!rr.images.length) rr=await extractWithClaude(r,"the creation identifiers of the images being generated");
    const genIds=rr.ids.slice();
    const webUrls=[...(rr.webUrl?[rr.webUrl]:[]),...rr.links.filter(u=>/magnific\.com\/app\//i.test(u))];
    if(!rr.images.length&&!DONE.test(rr.status)){ if(!genIds.length) throw {code:"tool_error",message:"Magnific didn't return a creation to wait for."}; c.ph="Rendering in Magnific…"; up(); rr=await waitFor(genIds,"4K image generation"); }
    c.webUrls=[...new Set([...webUrls,...(rr.webUrl?[rr.webUrl]:[])])];
    const ids=rr.ids.length?rr.ids:genIds;
    const n=Math.max(1,Math.min(count,Math.max(ids.length,rr.images.length,rr.urls.length)));
    const asked4k=!!P.res_4k||/4k|3840|4096/i.test(JSON.stringify(plan.args));
    c.outs=[]; c.sel=0;
    for(let i=0;i<n;i++){
      const o={id:ids[i]||(n===1?ids[0]:null)||null,url:rr.urls[i]||null,img:null,blob:null,long:0};
      let shot=rr.images[i]||null; let pw=0;
      if(!shot&&o.id){ const pv=await preview(o.id); shot=pv.image; o.url=o.url||pv.urls[0]||null; pw=Math.max(pv.w,pv.h); }
      if(shot){ o.img=`data:${shot.mime};base64,${shot.data}`; o.blob=b64Blob(shot.data,shot.mime); }
      /* Size: trust Magnific's reported dimensions, then the requested 4K, then the preview's own pixels */
      o.long=pw||(n===1?Math.max(rr.w,rr.h):0)||(asked4k?(plan.expected_long_side_px||3840):0)||(o.img?await longSide(o.img):0)||plan.expected_long_side_px||0;
      /* Magnific reports resolution "4k" for a native 4K render: never pay for an upscale then */
      if(rr.res4k||asked4k&&/4k/i.test(JSON.stringify(plan.args))) o.long=Math.max(o.long,3840);
      o.webUrl=c.webUrls?.[i]||c.webUrls?.[0]||null;
      c.outs.push(o);
    }
    c.steps[1]="ok"; c.stepNote[1]=`${n} image${n>1?"s":""}${mode?` · ${$(m.mode).selectedOptions[0]?.textContent.replace(" · best quality","")}`:""}`; c.steps[2]="run"; up();
    /* 4K check: Magnific upscale only for an output that came back under 4K */
    let ups=0;
    for(const o of c.outs){
      if(o.long>=3800) continue;
      if(S.upModes===null){ try{ const mr=await callMag("images_upscale_modes_list",{}); S.upModes=mr.payload??mr.content; }catch{ S.upModes=""; } }
      const factor=o.long?Math.max(2,Math.min(16,Math.pow(2,Math.ceil(Math.log2(3840/o.long))))):2;
      const ua=await buildArgs("images_upscale",`Upscale this photograph ${factor}x so the long side is at least 3840 px (4K) for ${$("channel").value}. Photographic realism: preserve faces, skin texture and fabric faithfully, keep creativity/hallucination at the minimum, no stylisation.`,
        {creation_identifier:o.id, source_url:o.url, current_long_side_px:o.long||null, scale_factor:factor, available_modes:S.upModes},"quick");
      const ur=await callMag("images_upscale",ua.args);
      let ux=readResult(ur); if(!ux.ids.length&&!ux.urls.length) ux=await extractWithClaude(ur,"the creation identifier of the upscale job");
      if(!(ux.urls.length||ux.images.length)&&ux.ids[0]) ux=await waitFor([ux.ids[0]],"4K upscale");
      let shot=ux.images[0]||null; let uw=Math.max(ux.w,ux.h);
      if(!shot&&ux.ids[0]){ const pv=await preview(ux.ids[0]); shot=pv.image; ux.urls.push(...pv.urls); uw=uw||Math.max(pv.w,pv.h); }
      if(shot){ o.img=`data:${shot.mime};base64,${shot.data}`; o.blob=b64Blob(shot.data,shot.mime); }
      o.id=ux.ids[0]||o.id; o.url=ux.urls[0]||o.url; o.long=uw||(o.long?o.long*factor:3840); ups++; up();
    }
    c.steps[2]="ok"; c.stepNote[2]=ups?`${ups} upscaled with Magnific`:"native 4K";
    /* Make sure every image has a PNG link, and bytes for the preview where Magnific provides them */
    c.steps[3]="run"; c.stepNote[3]="getting PNG links"; up();
    for(const o of c.outs){ await completeFiles(o,rr); up(); }
    const got=c.outs.filter(o=>o.url||o.blob).length;
    c.steps[3]=got?"ok":"err"; c.stepNote[3]=got?`${got} file${got>1?"s":""}`:"no file link returned";
    if(!got) c.err="Magnific finished but sent no image file or link. Open your Magnific creations, or send the Connector log to Claude.";
    c.busy=false; c.done=true; up();
    c.outs.forEach(o=>{ if(o.url||o.img) addHistory(o); });
  }catch(e){
    c.busy=false; const i=c.steps.findIndex(s=>s==="run"); if(i>=0) c.steps[i]="err";
    c.err=(e&&e.code&&["not_granted","rate_limited","refused","invalid_json","session_expired","sampling_disabled"].includes(e.code)&&!e.server)?sampleCopy(e):mcpCopy(e);
    c.ph="Not generated"; up();
  }
}
async function completeFiles(o,lastRR){
  const take=x=>{ if(!o.url&&x.urls[0]) o.url=x.urls[0]; o.links=[...new Set([...(o.links||[]),...x.urls,...x.links])]; if(!o.img&&x.images[0]){ o.img=`data:${x.images[0].mime};base64,${x.images[0].data}`; o.blob=b64Blob(x.images[0].data,x.images[0].mime); } const L=Math.max(x.w,x.h); if(L>o.long) o.long=L; };
  if(o.url&&o.img) return;
  if(o.id){
    for(const [tool,goal] of [["creations_get","Get this creation's full details, including its final full-resolution image file URL and dimensions."],["creations_read","Read this finished image creation so its image content is returned, at the largest size the tool allows."]]){
      if(o.url&&o.img) break;
      try{ const a=await buildArgs(tool,goal,{identifier:o.id,format:"png"}); const r=await callMag(tool,a.args); let x=readResult(r); if(!x.urls.length&&!x.images.length&&!x.links.length) x=await extractWithClaude(r,"the full-resolution image file URL"); take(x); }
      catch(e){ log("✕",tool+" skipped",{code:e?.code}); }
    }
  }
  if(!o.url&&lastRR){ if(lastRR.links?.length) o.links=[...new Set([...(o.links||[]),...lastRR.links])]; const file=(o.links||[]).find(u=>!/magnific\.com\/app\//i.test(u)); if(file) o.url=file; }
  if(!o.webUrl) o.webUrl=(o.links||[]).find(u=>/magnific\.com\/app\//i.test(u))||null;
}
function b64Blob(b64,mime){ const bin=atob(b64); const u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new Blob([u],{type:mime}); }
function longSide(src){ return new Promise(r=>{ const im=new Image(); im.onload=()=>r(Math.max(im.naturalWidth,im.naturalHeight)); im.onerror=()=>r(0); im.src=src; }); }
async function save(key,o){
  if(!o?.blob) return;
  const ext=/png/.test(o.blob.type)?"png":/webp/.test(o.blob.type)?"webp":"jpg";
  const filename=`BAE_${MODELS[key].label.replace(/\s+/g,"-")}_${aspectText().replace(/[:×]/g,"x")}_${o.long>=3800?"4K":"preview"}.${ext}`;
  if(S.web){ const a=document.createElement("a"); a.href=URL.createObjectURL(o.blob); a.download=filename; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },1500); return; }
  if(!downloads){ flash($("s3state"),"Saving isn't available in this view. Use “Open file”.",true); return; }
  try{ await downloads.save({filename,data:o.blob}); }
  catch(e){ if(e?.code!=="declined") flash($("s3state"),"Couldn't save the file ("+e?.code+").",true); }
}

/* ---------------- one-click flow, presets, history, lightbox ---------------- */
$("btnCreate").onclick=createAll;
async function createAll(){
  if(S.web&&!getKey("gemini")){ openKeys(); flash($("s3state"),"Add your Google Gemini API key under API keys first.",true); return; }
  if(!$("brief").value.trim()&&!S.upload){ $("brief").focus(); flash($("s1state"),"Write a brief or add an image to describe first.",true); return; }
  /* Without an Anthropic key the web version writes the prompt from the brief and the locked rules */
  if(S.web&&!getKey("anthropic")){
    const b=$("btnCreate"); b.disabled=true; b.textContent="Creating…";
    try{ $("pNano").value=enforce(localPrompt()); stage(1,"done"); stage(2,"done"); flash($("s1state"),"Skipped: no Anthropic key, so the prompt was built from your brief and the locked rules."); syncButtons(); await generate(["nano"]); }
    finally{ b.disabled=false; b.textContent="Create image"; }
    return;
  }
  if(!sample){ flash($("s1state"),"Claude is unavailable in this view. Open the page in claude.ai.",true); return; }
  const b=$("btnCreate"); b.disabled=true; b.textContent="Creating…";
  try{
    $("s1").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
    await describe();
    if(!$("pNano").value.trim()) return;
    if(!mcp){ flash($("s3state"),"Magnific isn't reachable in this view. Open the page in claude.ai.",true); return; }
    await generate(["nano"]);
  }finally{ b.disabled=false; b.textContent="Create image"; }
}
$("brief").addEventListener("keydown",e=>{ if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){ e.preventDefault(); createAll(); } });
$("presets").addEventListener("click",e=>{ const p=e.target.closest("button[data-b]"); if(!p) return; $("brief").value=p.dataset.b; $("brief").dispatchEvent(new Event("input")); $("brief").focus(); });

const HKEY="bae_history_v1";
function loadHist(){ try{ return JSON.parse(localStorage.getItem(HKEY)||"[]"); }catch{ return []; } }
function saveHist(h){ try{ localStorage.setItem(HKEY,JSON.stringify(h.slice(0,12))); }catch{ try{ localStorage.setItem(HKEY,JSON.stringify(h.slice(0,4).map(x=>({...x,thumb:null})))); }catch{} } }
async function thumbOf(dataUrl){ try{ const bmp=await createImageBitmap(await (await fetch(dataUrl)).blob()); const k=240/Math.max(bmp.width,bmp.height); const c=document.createElement("canvas"); c.width=Math.round(bmp.width*k); c.height=Math.round(bmp.height*k); c.getContext("2d").drawImage(bmp,0,0,c.width,c.height); return c.toDataURL("image/jpeg",.78); }catch{ return null; } }
async function addHistory(o){
  const h=loadHist(); h.unshift({thumb:o.img?await thumbOf(o.img):null,url:o.url||null,res:o.long>=3800?"4K":(o.long?o.long+"px":""),aspect:aspectText(),look:S.look,setting:S.setting,brief:$("brief").value.slice(0,140),t:Date.now()});
  saveHist(h); renderHistory();
}
function renderHistory(){
  const h=loadHist(), box=$("history");
  $("btnClearHist").hidden=!h.length;
  if(!h.length){ box.innerHTML='<div class="empty" style="grid-column:1/-1">Images you create appear here with their PNG links, so you can find them again after reloading.</div>'; return; }
  box.innerHTML=h.map((x,i)=>`<div class="hist"><button type="button" class="im" data-i="${i}" title="${esc(x.brief)}" aria-label="Open image ${i+1}">${x.thumb?`<img src="${x.thumb}" alt="">`:`<span>${esc(x.aspect)} · ${esc(x.res||"")}</span>`}</button><div class="meta"><span>${esc(x.res||"")} · ${esc(x.aspect)}</span>${x.url?`<a href="${esc(x.url)}" target="_blank" rel="noopener">PNG</a>`:""}</div></div>`).join("");
  box.querySelectorAll(".im").forEach(b=>b.onclick=()=>{ const x=h[+b.dataset.i]; if(x.thumb) openLightbox(x.thumb); else if(x.url) window.open(x.url,"_blank","noopener"); });
}
$("btnClearHist").onclick=()=>{ saveHist([]); renderHistory(); };
renderHistory();

/* ================= WEB RUNTIME (GitHub Pages and any page outside claude.ai) =================
   Claude via the Anthropic Messages API and Nano Banana 2.1 via the Google Gemini API, called
   from the browser with keys the viewer enters. Keys stay in this browser's localStorage only. */
const ANTHROPIC_MODEL="claude-sonnet-5-5";
const GEMINI_DEFAULT="gemini-nano-banana-2.1";
function getKey(k){ try{ return localStorage.getItem("bae_key_"+k)||""; }catch{ return ""; } }
function setKey(k,v){ try{ v?localStorage.setItem("bae_key_"+k,v.trim()):localStorage.removeItem("bae_key_"+k); }catch{} }
function openKeys(){ const k=$("keysCard"); if(!k) return; k.hidden=false; k.scrollIntoView({behavior:"smooth",block:"center"}); $("keyGemini").focus(); }
function parseJSONLoose(t){
  try{ return JSON.parse(t); }catch{}
  const f=t.match(/```(?:json)?\s*([\s\S]*?)```/); if(f){ try{ return JSON.parse(f[1]); }catch{} }
  const s=Math.min(...["{","["].map(c=>{ const i=t.indexOf(c); return i<0?Infinity:i; })), e=Math.max(t.lastIndexOf("}"),t.lastIndexOf("]"));
  if(isFinite(s)&&e>s){ try{ return JSON.parse(t.slice(s,e+1)); }catch{} }
  throw {code:"invalid_json",text:t};
}
function makeAnthropicSample(){
  const call=async(input,opts={})=>{
    const key=getKey("anthropic"); if(!key) throw {code:"no_key"};
    const content=[];
    for(const b of [].concat(opts.images||[])){ const jpg=b.size>4.5e6?await toJpeg(b,1600):b; content.push({type:"image",source:{type:"base64",media_type:jpg.type||"image/jpeg",data:await toB64(jpg)}}); }
    content.push({type:"text",text:typeof input==="string"?input:input.map(t=>t.content).join("\n\n")+"\n\nReply with only the requested JSON when JSON is asked for."});
    let r;
    try{ r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",signal:opts.signal,headers:{"content-type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:ANTHROPIC_MODEL,max_tokens:3000,messages:[{role:"user",content}]})}); }
    catch(e){ throw {code:"upstream_error",message:"Network error reaching Anthropic"}; }
    const j=await r.json().catch(()=>({}));
    if(!r.ok) throw {code:r.status===401||r.status===403?"bad_key":r.status===429?"rate_limited":"upstream_error",message:j?.error?.message||("HTTP "+r.status)};
    const text=(j.content||[]).filter(c=>c.type==="text").map(c=>c.text).join("");
    opts.onText?.({text,delta:text});
    return {text,truncated:j.stop_reason==="max_tokens"};
  };
  call.json=async(input,opts)=>parseJSONLoose((await call(input,opts)).text);
  call.limits=async()=>({maxPromptBytes:262144,images:{maxCount:8,maxInputBytes:2e7,mediaTypes:["image/jpeg","image/png","image/webp"]}});
  return call;
}
function geminiErr(r,j){ const m=j?.error?.message||("HTTP "+r.status); return {code:r.status===400&&/API key/i.test(m)||r.status===401||r.status===403?"bad_key_g":r.status===429?"rate_limited_g":r.status===404?"model_missing":"tool_error",message:m}; }
function findB64(j){ let hit=null; walk(j,(k,v,p)=>{ if(hit) return; if(k==="data"&&typeof v==="string"&&v.length>1000&&(!p.type||p.type==="image")) hit={data:v,mime:p.mime_type||p.mimeType||"image/png"}; }); return hit; }
async function geminiImage({model,prompt,images,aspect,size}){
  const key=getKey("gemini"); if(!key) throw {code:"no_key_g"};
  const imgs=[]; for(const b of images) imgs.push({mime:b.type||"image/jpeg",data:await toB64(b)});
  const rf={type:"image",mime_type:"image/png",image_size:size}; if(aspect) rf.aspect_ratio=aspect;
  log("→","Gemini interactions",{model,aspect,size,references:imgs.length,prompt:prompt.slice(0,300)});
  let r=await fetch("https://generativelanguage.googleapis.com/v1beta/interactions",{method:"POST",headers:{"content-type":"application/json","x-goog-api-key":key},
    body:JSON.stringify({model,input:[{type:"text",text:prompt},...imgs.map(i=>({type:"image",mime_type:i.mime,data:i.data}))],response_format:rf})});
  let j=await r.json().catch(()=>({}));
  if(r.ok){ const hit=j.output_image?.data?{data:j.output_image.data,mime:j.output_image.mime_type||"image/png"}:findB64(j); if(hit){ log("←","Gemini image",{bytes:hit.data.length}); return hit; } }
  else if(r.status===401||r.status===403||r.status===429) throw geminiErr(r,j);
  log("·","interactions unavailable, using generateContent",{status:r.status,message:j?.error?.message});
  const gc={responseModalities:["IMAGE"],imageConfig:{imageSize:size}}; if(aspect) gc.imageConfig.aspectRatio=aspect;
  r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{method:"POST",headers:{"content-type":"application/json","x-goog-api-key":key},
    body:JSON.stringify({contents:[{role:"user",parts:[{text:prompt},...imgs.map(i=>({inline_data:{mime_type:i.mime,data:i.data}}))]}],generationConfig:gc})});
  j=await r.json().catch(()=>({}));
  if(!r.ok){ log("✕","Gemini",{status:r.status,message:j?.error?.message}); throw geminiErr(r,j); }
  const part=(j.candidates?.[0]?.content?.parts||[]).find(p=>p.inlineData||p.inline_data);
  const d=part?(part.inlineData||part.inline_data):null;
  if(!d?.data){ const why=j.candidates?.[0]?.finishReason||j.promptFeedback?.blockReason||"no image returned"; throw {code:"tool_error",message:"Google returned no image ("+why+")."}; }
  log("←","Gemini image",{bytes:d.data.length}); return {data:d.data,mime:d.mimeType||d.mime_type||"image/png"};
}
const GEMINI_RATIOS=["1:1","3:2","2:3","3:4","4:3","4:5","5:4","9:16","16:9","21:9"];
function geminiAspect(){ const a=aspectVal(); if(a==="auto") return null; const [w,h]=typeof a==="object"?[a.width,a.height]:a.split(":").map(Number); if(GEMINI_RATIOS.includes(`${w}:${h}`)) return `${w}:${h}`;
  const t=w/h; return GEMINI_RATIOS.map(r=>{ const [x,y]=r.split(":").map(Number); return [r,Math.abs(Math.log(x/y/t))]; }).sort((p,q)=>p[1]-q[1])[0][0]; }
async function checkGemini(silent){
  const key=getKey("gemini");
  if(!key){ setMag("off","Google: add API key"); if(!silent) openKeys(); return; }
  setMag("wait","Google: checking…");
  try{
    const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000",{headers:{"x-goog-api-key":key}}); const j=await r.json().catch(()=>({}));
    if(!r.ok) throw geminiErr(r,j);
    const names=(j.models||[]).map(m=>String(m.name||"").replace(/^models\//,""));
    const exact=names.find(n=>/nano-banana-2[.-]1(?!\d)/.test(n)&&!/lite|pro/.test(n));
    S.geminiModel=exact||GEMINI_DEFAULT; S.connected=true;
    const sel=$("selNano"); sel.innerHTML=`<option value="${S.geminiModel}">Nano Banana 2.1 · ${S.geminiModel}${exact?"":" (not listed for this key)"}</option>`; sel.disabled=true;
    $("modeNano").innerHTML='<option value="">Default</option>';
    setMag(exact?"on":"wait",exact?"Google: Nano Banana 2.1 ready":"Google: key works, 2.1 not listed");
    log("·","Gemini models",{picked:S.geminiModel,found:names.filter(n=>/banana|image/.test(n))});
  }catch(e){ setMag("off","Google: "+(e.code==="bad_key_g"?"key rejected":"not reachable")); if(!silent) flash($("s3state"),geminiCopy(e),true); }
  finally{ syncButtons(); }
}
function geminiCopy(e){ return ({no_key_g:"Add your Google Gemini API key under API keys.",bad_key_g:"Google rejected the API key. Check it under API keys (aistudio.google.com/apikey).",rate_limited_g:"Google's rate limit was reached. Wait a minute and try again.",model_missing:"Nano Banana 2.1 isn't available for this key yet. Check your Google AI Studio access.",tool_error:"Google reported a problem: "+String(e?.message||"").slice(0,240)})[e?.code]||("Image step failed: "+String(e?.message||e?.code||"unknown").slice(0,200)); }
function localPrompt(){
  const look=S.look==="Bold"?"Bold, colourful youth energy":"Elegant, calm and refined";
  return `${$("brief").value.trim()} ${S.shot}, ${S.setting==="Studio"?"photographed in a minimal BAE studio set":"on location in modern Amman"}. ${look}. Depth over flatness, clarity through focus with one sharp focal anchor, warm considered colour. Believable Jordanian people, natural expressions, real camera language.${S.picked.length?" Use the attached reference images for light, colour grade, wardrobe and camera angle only, never copy their people or logos.":""}`;
}
async function generateWeb(){
  const key="nano", m=MODELS.nano, c=cards.nano={busy:true,t0:Date.now(),ph:"Preparing references…",steps:["run"],stepNote:[]};
  const t0=c.t0, up=()=>renderCard(key,c);
  $("btnGen").disabled=true; stage(3,"active"); flash($("s3state"),"Rendering with Nano Banana 2.1…"); up();
  const tick=setInterval(()=>{ const e=$("elapsed-nano"); if(e) e.textContent=fmtTime(t0); },1000);
  $("s3").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
  try{
    if(!getKey("gemini")) throw {code:"no_key_g"};
    if(!S.connected) await checkGemini(true);
    if($(m.prompt).value.trim()) $(m.prompt).value=enforce($(m.prompt).value);
    const prompt=$(m.prompt).value.trim(); if(!prompt) throw {code:"tool_error",message:"Write the prompt first (step 2)."};
    const refs=(await refBlobs()).map(r=>r.blob); if(S.upload&&$("useUpAsRef").checked) refs.unshift(S.upload);
    const sendRefs=[]; for(const b of refs.slice(0,14)) sendRefs.push(b.size>3e6?await toJpeg(b,1600):b);
    c.steps=["ok","run"]; c.stepNote=[sendRefs.length?`${sendRefs.length} attached`:"none, prompt only"]; c.ph="Rendering in 4K…"; up();
    const count=Math.max(1,Math.min(4,+$("count").value||1)), aspect=geminiAspect();
    const plan=refPlan().slice(0,sendRefs.length);
    $(m.prompt).value=$(m.prompt).value.replace(/\n*Reference images:[^\n]*/g,"")+(plan.length?"\n"+refLine(plan):"");
    const full=`${$(m.prompt).value.trim()}\n\nAvoid: ${negativeNow()}.`;
    const res=await Promise.allSettled(Array.from({length:count},()=>geminiImage({model:S.geminiModel||GEMINI_DEFAULT,prompt:full,images:sendRefs,aspect,size:"4K"})));
    const okR=res.filter(x=>x.status==="fulfilled").map(x=>x.value);
    if(!okR.length) throw res[0].reason;
    c.outs=[]; c.sel=0;
    for(const h of okR){ const img=`data:${h.mime};base64,${h.data}`; c.outs.push({img,blob:b64Blob(h.data,h.mime),url:null,long:await longSide(img)}); }
    const n4k=c.outs.filter(o=>o.long>=3800).length;
    c.steps=["ok","ok",n4k===c.outs.length?"ok":"err","ok"];
    c.stepNote=[c.stepNote[0],`${c.outs.length} image${c.outs.length>1?"s":""}${okR.length<count?` (${count-okR.length} failed)`:""}`,n4k===c.outs.length?"native 4K":`${c.outs[0].long}px, below 4K`,"ready to download"];
    if(n4k<c.outs.length) c.err="Google returned less than 4K for this model or ratio. The image is still saved at its full returned size.";
    c.busy=false; c.done=true; up(); c.outs.forEach(o=>addHistory(o));
    stage(3,"done"); flash($("s3state"),`Finished in ${fmtTime(t0)}. Download the PNG or generate again.`);
  }catch(e){
    const i=c.steps.findIndex(s=>s==="run"); if(i>=0) c.steps[i]="err";
    c.busy=false; c.err=geminiCopy(e); c.ph="Not generated"; up(); stage(3); flash($("s3state"),"Not generated. See the message under the image.",true);
  }finally{ clearInterval(tick); syncButtons(); }
}
/* Your own references, kept in this browser (IndexedDB) */
const IDB={ db:null, async open(){ if(this.db) return this.db; this.db=await new Promise((res,rej)=>{ const q=indexedDB.open("bae_studio",1); q.onupgradeneeded=()=>q.result.createObjectStore("refs",{keyPath:"id"}); q.onsuccess=()=>res(q.result); q.onerror=()=>rej(q.error); }); return this.db; },
  async all(){ const db=await this.open(); return new Promise(res=>{ const q=db.transaction("refs").objectStore("refs").getAll(); q.onsuccess=()=>res(q.result||[]); q.onerror=()=>res([]); }); },
  async put(v){ const db=await this.open(); return new Promise(res=>{ const t=db.transaction("refs","readwrite"); t.objectStore("refs").put(v); t.oncomplete=res; t.onerror=res; }); },
  async del(id){ const db=await this.open(); return new Promise(res=>{ const t=db.transaction("refs","readwrite"); t.objectStore("refs").delete(id); t.oncomplete=res; t.onerror=res; }); } };
function addUserRef(rec){ ALL_REFS.push({id:rec.id,d:"Your reference: "+(rec.name||"image"),src:URL.createObjectURL(rec.blob),blob:rec.blob,set:"user",studio:false}); }
async function loadUserRefs(){ try{ (await IDB.all()).forEach(addUserRef); }catch{} renderRefs(); }
$("addRef").addEventListener("change",async e=>{
  for(const f of [...e.target.files].slice(0,12)){ if(!/^image\//.test(f.type)) continue; const rec={id:"u"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:f.name,blob:await toJpeg(f,1600)}; addUserRef(rec); try{ await IDB.put(rec); }catch{} if(S.picked.length<MAX_REFS) S.picked.push(rec.id); }
  e.target.value=""; S.refTab="user"; syncTabs(); renderRefs();
});
$("btnDelUserRefs").onclick=async()=>{ const ids=ALL_REFS.filter(r=>r.set==="user").map(r=>r.id); for(const id of ids){ try{ await IDB.del(id); }catch{} } for(let i=ALL_REFS.length-1;i>=0;i--) if(ALL_REFS[i].set==="user") ALL_REFS.splice(i,1); S.picked=S.picked.filter(id=>!ids.includes(id)); renderRefs(); };
loadUserRefs();

async function bootWeb(){
  S.web=true; downloads=null; mcp={web:true}; sample=makeAnthropicSample(); sampleImages={maxCount:8};
  $("keysCard").hidden=false; $("libBox").hidden=true; $("heroSub").textContent="Nano Banana 2.1 · native 4K · Google Gemini API";
  $("mNanoName").textContent="Nano Banana 2.1 · Google Gemini API"; $("btnConnect").textContent="API keys";
  $("btnConnect").onclick=openKeys;
  /* Built-in library images exist only in the private build; fall back to "Your references" when they are missing */
  try{ const r=await fetch(`refs/${BAE_REFS[0].id}.jpg`,{method:"HEAD"}); if(!r.ok) throw 0; }
  catch{ for(let i=ALL_REFS.length-1;i>=0;i--) if(ALL_REFS[i].set!=="user") ALL_REFS.splice(i,1); S.picked=S.picked.filter(id=>refById(id)); document.querySelectorAll('#refTabs button:not([data-tab="user"])').forEach(b=>b.hidden=true); S.refTab="user"; S.noLib=true; }
  syncTabs(); renderRefs();
  $("keyGemini").value=getKey("gemini"); $("keyAnthropic").value=getKey("anthropic");
  webStatus(); if(getKey("gemini")) checkGemini(true);
  syncButtons();
}
function webStatus(){ setClaude(getKey("anthropic")?"on":"wait",getKey("anthropic")?"Claude: key added":"Claude: optional key"); if(!getKey("gemini")) setMag("off","Google: add API key"); }
$("btnSaveKeys").onclick=()=>{ setKey("gemini",$("keyGemini").value); setKey("anthropic",$("keyAnthropic").value); S.connected=false; webStatus(); $("keysMsg").textContent="Saved on this device."; checkGemini(false); };
$("btnForgetKeys").onclick=()=>{ setKey("gemini",""); setKey("anthropic",""); $("keyGemini").value=""; $("keyAnthropic").value=""; S.connected=false; webStatus(); $("keysMsg").textContent="Keys removed from this device."; };

$("btnLinkLib").onclick=linkLibrary; $("btnPack").onclick=downloadPack;
libStatus(libSummary(),Object.keys(S.magIds||{}).length?"ok":"");

function openLightbox(src){ if(!src) return; $("lbImg").src=src; $("lightbox").hidden=false; $("lbClose").focus(); }
function closeLightbox(){ $("lightbox").hidden=true; $("lbImg").removeAttribute("src"); }
$("lbClose").onclick=closeLightbox;
$("lightbox").addEventListener("click",e=>{ if(e.target.id==="lightbox") closeLightbox(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&!$("lightbox").hidden) closeLightbox(); });

boot();
})();
