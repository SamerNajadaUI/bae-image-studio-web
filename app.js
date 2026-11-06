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
 ["bae_b114_1","BAE studio set: bearded man in a camel knit cardigan over a white tee at a white desk, warm textured plaster wall, centred, direct gaze",1],
 ["bae_b114_2","BAE studio set: woman in a cream turtleneck with a jade-green knit skirt seated, patterned backdrop and sheer curtain, restrained architectural set",1],
 ["bae_b113_1","BAE studio product: hand holding a phone with the banking app, warm wood background, soft dramatic light",1],
 ["bae_b106_1","BAE depth: foreground bokeh of warm flowers framing a woman in a black tailored jacket and a blue-and-white printed midi skirt",0],
 ["bae_b107_0","BAE selective focus: young woman writing in a white blouse with a printed blue-and-red silk scarf, soft warm background, window light",0],
 ["bae_b107_1","BAE selective focus through a blurred foreground, woman in a black coat, intimate",0],
 ["bae_b107_3","BAE layered depth: man seen through a window with reflections, warm light",0],
 ["bae_b108_2","BAE medium close-up: two women laughing together in pink and blue madras-check shirts against a warm wall, candid connection",0],
 ["bae_b111_1","BAE foreground bokeh: profile of a woman behind a soft warm blurred foreground",0],
 ["bae_b111_2","BAE clarity: man in sunglasses sharp amid a motion-blurred city street",0],
 ["bae_b111_3","BAE movement: woman mid-stride in a motion-blurred urban scene",0]
].map(([id,d,st])=>({id,d,src:`refs/${id}.jpg`,set:"bae",studio:!!st}));
const ALL_REFS=[...BAE_REFS,...REFS];
const refById=id=>ALL_REFS.find(r=>r.id===id);
const PICK_STUDIO=["bae_b113_0","bae_b114_1","bae_b114_2"];
const PICK_LOCATION=["bae_b106_1","bae_b111_2","bae_b107_1","bae_b108_2"];
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
/* BAE illustration set (guidelines p.101, light mode), used as style direction for the Icons mode */
const ICON_REFS=[
 ["ic_savings","BAE icon: translucent coin over a stack of orange-to-burgundy coins"],
 ["ic_cards","BAE icon: three stacked translucent cards in soft orange and burgundy"],
 ["ic_investments","BAE icon: coin riding a curved orange-to-burgundy arrow pointing up"],
 ["ic_fraud_security","BAE icon: frosted fingerprint tile over a burgundy check-mark disc"],
 ["ic_application","BAE icon: phone with app tiles and a translucent card floating over it"],
 ["ic_branches","BAE icon: isometric orange building with a translucent glass roof"],
 ["ic_branch_location","BAE icon: small isometric building with a translucent location pin"],
 ["ic_financial_literacy","BAE icon: translucent light bulb behind a curved burgundy wallet"],
 ["ic_gold_bars","BAE icon: translucent bars and burgundy cards fanned together"],
 ["ic_community","BAE icon: three soft paper-cut figures holding hands over a globe"],
 ["ic_brand_hand","BAE icon: hand holding a wavy ring shape"]
].map(([id,d])=>({id,d,src:`refs/${id}.jpg`,set:"ic",studio:false}));
ALL_REFS.push(...ICON_REFS);
const PICK_ICON=["ic_savings","ic_cards","ic_investments","ic_fraud_security"];
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
/* Wardrobe colour comes ONLY from the BAE palette (guideline p.18–22). The orange family is never worn (client rule).
   Bold & colourful = the FRESH side of the palette, crisp colour-blocking.  Elegant & calm = the WARM, deep side, tonal and ordered. */
const BAE_WEAR_FRESH = "Teal #32969B, Dark Teal #196E78, Burgundy #A33755, Medium Burgundy #B9516E (raspberry), Light Burgundy #F1C0B6 (blush pink), Sky Blue #4BBCDF (from the BAE gradient system), with White #FFFFFF, Light Stone #ECE8DF and Ink #19181E as the base";
const BAE_WEAR_WARM = "Ink #19181E, Medium Ink #4F4E62 (slate), Burgundy #A33755, Medium Burgundy #B9516E, Dark Teal #196E78, Light Burgundy #F1C0B6 (dusty rose), Stone #CCC3B4, Light Stone #ECE8DF, Light Orange #FFFAF4 (ecru) and White #FFFFFF";
const LOOK_BOLD = `LOOK — BOLD & COLOURFUL (the youth campaign references guide camera, light and energy only):
Wardrobe: Gen Z street-style fashion — oversized plain tees, retro football-style tees without crests or text, baggy and wide-leg light-wash denim, denim jackets, colour-block knit sweater vests and fluffy cardigans, camp-collar and striped retro shirts, crop tops with pleated wide trousers, crochet vests, bucket hats and beanies, striped tube socks, chunky retro sneakers, tinted round sunglasses. WARDROBE COLOUR — FRESH BAE PALETTE ONLY: ${BAE_WEAR_FRESH}. Light-wash denim counts as sky blue. Crisp, clean colour-blocking: each outfit pairs one or two of the fresh colours (teal, sky blue, raspberry, blush, burgundy) with a white, light-stone or ink base; each person in the frame leads with a DIFFERENT fresh colour; bright, airy and modern, never muddy. No colour outside this list: no orange, coral, rust, yellow, lime, purple, red or neon.
Camera: low-angle (worm's-eye) wide-angle 16–24 mm hero shot looking up at the subjects, a big clean blue sky (or bright open background) behind them, bright hard sunlight with crisp shadows and an occasional sun flare, punchy saturated commercial colour grade, deep focus with the faces sharp.
Energy: friends together, laughing out loud, mid-action and playful (selfies, piggybacks, leaning in cheek to cheek, walking towards camera); slight motion blur allowed on limbs. Props when they fit: skateboards, iced drinks, iPhone 18, backpacks — no logos.`;
/* ELEGANT & CALM wardrobe, read from the 12 BAE guideline photos (pp.106–114): dark tailoring anchors every frame
   (black blazer, navy coat, dark denim workwear), warm knits as the mid-tone (camel cardigan, chocolate, olive),
   crisp white or ecru as ONE layer, and one colour or pattern accent per person (cobalt, jade, rose, burgundy, teal,
   blue-and-white print, pink/blue madras check, printed silk scarf). Never head-to-toe beige. */
const LOOK_CALM = `LOOK — ELEGANT & CALM (styling read from the BAE guideline photos pp.106–114; colours ONLY from the BAE palette):
WARDROBE COLOUR — WARM, DEEP BAE PALETTE ONLY: ${BAE_WEAR_WARM}. No colour outside this list: no orange, rust, camel, brown, olive, mustard, cobalt or neon.
How to dress each person, in this order:
 1. Deep anchor: ink or slate relaxed tailoring (soft-shouldered blazer, long wool coat, fine-knit, dark denim), OR a deep burgundy or dark teal piece.
 2. Tonal mid-tone: a second piece in the same family (burgundy with raspberry or dusty rose; dark teal with slate; ink with stone).
 3. Light layer: ecru or white (shirt, tee, turtleneck) as ONE layer only, never head to toe.
 4. One quiet accent at most: dusty rose scarf, burgundy knit, dark-teal bag, simple jewellery or dark sunglasses.
Warm and ordered: tonal, harmonious, layered, matte textures (wool, knit, linen, silk); relaxed modern fits. In couples and groups each person takes a different family (one burgundy, one dark teal, one ink) so the frame stays balanced, never matching.
Choose for the SCENE:
 - Home, family, planning money → knitwear: burgundy or dusty-rose knit over ecru, slate or ink trousers.
 - City, street, business → ink or slate tailoring with an ecru layer, one burgundy or dark-teal accent.
 - Café, friends, social → raspberry or dusty-rose piece against an ink or slate anchor.
 - Work, creative studio, small business → dark-teal or slate shirt, sleeves rolled, stone trousers.
 - Premium, wealth, investment → ink tailoring, ecru knit, minimal jewellery.
 - Studio portrait → one strong solid: ink blazer, burgundy knit or dark-teal shirt against the plaster set.
Mood and camera: composed, warm and confident; eye-level or gentle angles with selective focus, foreground depth and soft directional natural light.`;
const LOOK_CALM_NEG = "colours outside the BAE palette, camel, brown, olive, mustard, cobalt, neon colours, all-beige outfit, head-to-toe beige, head-to-toe cream, all-white outfit, monochrome beige styling, sand-coloured outfits, matching couple outfits, matching coats, washed-out pastel wardrobe";
const LOOK_BOLD_NEG = "colours outside the BAE palette, yellow clothing, lime green, purple, red clothing, neon colours, muddy colours, all-beige outfit, all-neutral outfit, muted dull colours, formal business suit, stiff pose, eye-level flat framing";
function lookRule(){ return S.look==="Bold"?LOOK_BOLD+(S.setting==="Studio"?"\nIn the studio, keep the bold wardrobe, low-angle wide camera and saturated grade; the backdrop may be a single seamless colour from the fresh BAE palette (teal, sky blue, blush or light stone) instead of plaster.":""):LOOK_CALM; }
function lookLine(){ return S.look==="Bold"?"Look lock: BOLD & COLOURFUL — Gen Z streetwear colour-blocked ONLY in the fresh BAE palette (teal #32969B, dark teal #196E78, sky blue #4BBCDF, raspberry #B9516E, blush #F1C0B6, burgundy #A33755) on a white, light-stone or ink base, each person leading with a different fresh colour, no colour outside the palette; low-angle wide-angle 16–24 mm hero shot against a bright open sky or backdrop, hard bright sunlight, clean punchy grade, friends laughing mid-action.":"Look lock: ELEGANT & CALM — tailored wardrobe ONLY in the warm, deep BAE palette (ink #19181E, slate #4F4E62, burgundy #A33755, raspberry #B9516E, dark teal #196E78, dusty rose #F1C0B6, stone #CCC3B4, ecru #FFFAF4): a deep anchor piece, one tonal mid-tone, ecru or white as one layer only, one quiet accent; ordered and harmonious; never head-to-toe stone, beige or cream, never matching outfits; gentle angle and soft natural light."; }
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
function setMag(k,t){ $("dotMag").className="dot "+k; $("stMag").textContent=t; syncSetup(); }

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
/* Magnific wants every reference as {identifier, …}. Whatever key the argument writer used
   (creationIdentifier, id, uuid…) or if it sent bare strings, normalise to "identifier", in order. */
function fixRefs(args,refs){
  const ALIASES=["identifier","creationIdentifier","creation_identifier","assetIdentifier","id","uuid","creationId"];
  const known=(refs||[]).map(r=>r&&(r.id||r.identifier)).filter(Boolean);
  const fix=(arr)=>arr.map((it,i)=>{
    if(typeof it==="string") return {identifier:it,type:"image"};
    if(!it||typeof it!=="object") return it;
    const o={...it}; let idv=null;
    for(const k of ALIASES){ if(o[k]!=null&&o[k]!==""){ idv=idv||String(o[k]); if(k!=="identifier") delete o[k]; } }
    o.identifier=idv||known[i]||o.identifier;
    if(o.type&&o.type!=="image") o.type="image";
    return o; });
  const visit=(o,d=0)=>{ if(!o||typeof o!=="object"||d>6) return;
    for(const k of Object.keys(o)){ const v=o[k];
      if(/reference/i.test(k)&&Array.isArray(v)) o[k]=fix(v);
      else if(v&&typeof v==="object") visit(v,d+1); } };
  const copy=JSON.parse(JSON.stringify(args||{})); visit(copy);
  return copy;
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
$("setupMagBtn").onclick=()=>connect(false);
$("setupLibBtn").onclick=()=>{ const w=$("libWrap"); w.open=true; w.scrollIntoView({behavior:"smooth",block:"center"}); };
$("btnBrowse").onclick=()=>{ const b=$("refBrowse"), open=b.hidden; b.hidden=!open; $("btnBrowse").setAttribute("aria-expanded",String(open)); $("btnBrowse").textContent=open?"Hide library":"Browse all"; };
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
    await loadOptions("nano"); await loadOptions("icon");
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
  if(nano[0]) S.nanoName=nano[0].name;
  log("·","model locked",{nano:nano.map(m=>m.name)});
  /* Icons mode: locked to GPT 2.5 (newest GPT image model in Magnific) */
  const gptAll=list.filter(m=>/gpt|openai|chatgpt/i.test(m.id+" "+m.name)).sort((a,b)=>ver(b.id+" "+b.name)-ver(a.id+" "+a.name));
  const g25=gptAll.filter(m=>/2[\s._-]?5(?!\d)/.test(m.id+" "+m.name));
  const gpt=g25.length?g25.slice(0,1):gptAll.slice(0,1);
  const gs=$("selIcon"); gs.innerHTML="";
  if(!gpt.length) gs.innerHTML='<option value="">GPT 2.5 (not found in your Magnific models)</option>';
  gpt.forEach(m=>{ const o=document.createElement("option"); o.value=m.id; o.textContent=m.name+(g25.length?" · locked":" · 2.5 not found, newest GPT"); gs.appendChild(o); });
  gs.disabled=true; log("·","icon model locked",{gpt:gpt.map(m=>m.name)});
  if(gpt[0]) S.gptName=gpt[0].name;
  $("mNanoName").textContent=S.mode==="icon"?`${S.gptName||"GPT 2.5"} + ${S.nanoName||"Nano Banana 2.1"} · via Magnific`:(S.nanoName||"Nano Banana 2.1")+" · via Magnific";
}

/* ---------------- UI: brief, segs, upload, refs ---------------- */
const DEFAULT_BRIEF="Three young Jordanian friends laughing together on a rooftop terrace in modern Abdali, one showing the others her savings goal on her iPhone 18, bright afternoon sun and a clear blue sky behind them.";
try{ const saved=localStorage.getItem("bae_brief"); $("brief").value=saved&&!/Jabal Amman, morning light through the window|tailored (camel|cream) blazer checks her savings/.test(saved)?saved:DEFAULT_BRIEF; }catch{ $("brief").value=DEFAULT_BRIEF; }
$("brief").addEventListener("input",()=>{ if(S.mode!=="icon") try{ localStorage.setItem("bae_brief",$("brief").value);}catch{} countBrief(); });
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
    ic:"BAE illustration set (guidelines p.101, light mode). Sent to GPT 2.5 as style direction only: material, translucency, gradient, angle and lighting.",
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

function flash(el,txt,bad){ el.textContent=txt; el.style.color=bad?"var(--warn)":"";
  if(el&&/^s[123]state$/.test(el.id)){ const m=$("flowMsg"); if(m){ m.textContent=txt; m.classList.toggle("bad",!!bad); } } }
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
  if(S.mode==="icon") return describeIcon();
  stage(1,"active"); flash($("s1state"),"Thinking…"); $("btnDescribe").disabled=true;
  try{
    const refs=await refBlobs();
    let images=[]; if(sampleImages){ if(S.upload) images.push(S.upload); refs.forEach(r=>images.push(r.blob)); images=images.slice(0,sampleImages.maxCount||5); }
    const imgNote=images.length?`Images attached, in order: ${S.upload?"image 1 is the USER'S IMAGE to describe and rebuild; then ":""}${refs.slice(0,images.length-(S.upload?1:0)).map((r,i)=>`image ${i+1+(S.upload?1:0)} is ${({bae:"a BAE GUIDELINE photo",yt:"a YOUTH CAMPAIGN reference",mj:"a Mari Juliano reference",user:"the user's own reference"})[refById(r.id)?.set]||"a reference"} (${refById(r.id)?.d})`).join("; ")}. BAE guideline photos define the brand's light, depth and set style; YOUTH CAMPAIGN references define wardrobe, camera angle and energy for the bold look (ignore their logos, products and any orange clothing); Mari Juliano photos add clean natural light and candid energy. All references are camera and photography-style direction only: borrow camera angle, lens feel, light and colour grade, never their composition, framing, people, clothing, brands or locations.`:"No images attached; work from the brief and these reference notes: "+S.picked.map(id=>refById(id)?.d).join(" | ");
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
  if(S.mode==="icon") return writeIconPrompt();
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
Reference images (${S.picked.length}) will be attached as STYLE references. What they show, for YOUR understanding of the photography only — never describe or reuse this content in the prompt: ${S.picked.map(id=>`${refById(id)?.set==="bae"?"BAE guideline":refById(id)?.set==="yt"?"Youth campaign":"Mari Juliano"} — ${refById(id)?.d}`).join("; ")}${S.upload&&$("useUpAsRef").checked?"; plus the user's own image as the first reference for content":""}.

Requirements:
- Begin with exactly: "Professional photography, clean natural light."
- Photorealistic, 4K, real camera language (lens, aperture, angle), believable Jordanian people in modern places.
- Apply every point of the CLIENT ART DIRECTION explicitly in the prompt: modern upscale setting, modern elegant wardrobe, no hijab or traditional Arab clothing, professionally retouched even skin tone, iPhone 18 for any phone, modern IKEA-style decor.
- State the composition explicitly: the person centred on the vertical centre line, balanced framing, equal space left and right.
- ${S.setting==="Studio"?"STUDIO: describe the studio set, backdrop and softbox light explicitly; translate any location in the brief into one or two modern props on the set; no real location.":"ON-LOCATION: encode depth layers and foreground bokeh in a modern real place."}
- ${S.look==="Bold"?"LOOK BOLD & COLOURFUL: choose each person's streetwear for THIS scene and name every piece with its colour, using ONLY the fresh BAE palette (teal, dark teal, sky blue, raspberry, blush, burgundy on a white, light-stone or ink base); give each person a different lead colour; then the low-angle wide-angle 16–24 mm camera looking up, the bright open sky or backdrop, hard bright sunlight and the playful mid-laugh interaction.":"LOOK ELEGANT & CALM: choose each person's outfit for THIS scene and name every piece with its colour, using ONLY the warm, deep BAE palette (ink, slate, burgundy, raspberry, dark teal, dusty rose, stone, ecru): a deep anchor, a tonal mid-tone, ecru or white as one layer, one quiet accent; people in the same frame take different colour families; never head-to-toe stone, beige or cream."}
- Encode selective focus with one focal anchor${S.look==="Bold"?" (faces sharp)":" and the BAE warm palette"}.
- REFERENCES ARE STYLE ONLY: you have seen them and understand their photography; carry over only camera height and angle, lens feel, depth of field, light quality, colour grade and the general kind of place. Invent a NEW scene: never write "same place/location/room/street as", "like the reference image", "recreate", "replicate" or anything that copies a reference's location, objects, people, poses, wardrobe or layout, and never describe what a reference shows. Wardrobe comes only from the look rules.
- No logos, text, signage, watermarks.
Format: one flowing descriptive paragraph that reads like a photographer's shot description, 130-200 words. Refer to the attached references only by their tags, in this order: ${refPlan().map(r=>r.tag).join(", ")||"none attached"}, and ONLY inside style clauses, for example "camera height and lens feel as in @img1, light and colour grade as in @img2". Never use a tag next to a place, person, object, outfit or layout. The composition is set by this prompt (subject centred).
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
/* Drops sentences that ask the model to copy a reference literally ("same café as @img1", "recreate the reference room"),
   keeping style clauses ("light and colour grade as in @img2") and explicit prohibitions ("do not copy …"). */
function stripLiteralRefs(p){
  const parts=String(p||"").split(/(?<=[.!?])\s+/);
  const keep=parts.filter(s=>{
    const refy=/@img\d|\breference(s| image| photo)?\b/i.test(s);
    if(!refy) return true;
    if(/\b(do not|don't|never|not|no)\b/i.test(s)) return true;
    const literal=/\b(same|identical|exact(ly)?|recreat\w*|replicat\w*|cop(y|ies|ying)|reproduc\w*|duplicat\w*|match(ing)? the (place|location|room|scene|setting))\b/i.test(s);
    const content=/\b(place|location|setting|room|scene|street|building|caf[eé]|office|home|kitchen|wall|furniture|sofa|desk|person|people|man|woman|outfit|clothing|wardrobe|pose|layout|composition|background)(?![a-z])/i.test(s);
    return !(literal&&content);
  });
  return keep.join(" ");
}
function enforce(p){
  if(S.mode!=="icon") p=stripLiteralRefs(p);
  if(S.mode==="icon") return enforceIcon(p);
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
const MODELS={ nano:{el:"rNano",sel:"selNano",mode:"modeNano",prompt:"pNano",label:"Nano Banana 2.1"}, icon:{el:"rNano",sel:"selIcon",mode:"modeIcon",prompt:"pNano",label:"GPT 2.5"}, iconNano:{el:"rNano2",sel:"selNano",mode:"modeNano",prompt:"pNano",label:"Nano Banana 2.1"} };
const genKey=()=>S.mode==="icon"?"icon":"nano";
/* Icons render with both models side by side; photography with Nano Banana 2.1 */
const genKeys=()=>S.mode==="icon"?["icon","iconNano"]:["nano"];
const isIconKey=k=>k==="icon"||k==="iconNano";
function negativeNow(){ if(S.mode==="icon") return ICON_NEG; return [S.negative||"logos, text, watermark, signage, oversaturated, HDR, extra fingers",CLIENT_NEG,COMPOSITION_NEG,S.setting==="Studio"?STUDIO_NEG:"",S.look==="Bold"?LOOK_BOLD_NEG:LOOK_CALM_NEG].filter(Boolean).join(", "); }
const STEPS=["Upload references","Render in 4K","4K check","Ready"];
function aspectVal(){ if(S.mode==="icon") return "16:9"; const v=$("aspect").value; if(v==="custom"){ const w=parseInt($("cw").value,10)||0,h=parseInt($("ch").value,10)||0; return w&&h?{width:w,height:h}:"auto"; } return v; }
function aspectText(){ const a=aspectVal(); return typeof a==="string"?a:`${a.width}×${a.height}px`; }
function ratioCSS(){ const a=aspectVal(); if(a==="auto") return "4 / 3"; if(typeof a==="object") return `${a.width} / ${a.height}`; const [w,h]=a.split(":").map(Number); return `${w} / ${h}`; }
function renderCard(key,st){
  const m=MODELS[key]; const el=$(m.el); const name=$(m.sel).selectedOptions[0]?.textContent?.replace(" · latest","")||m.label;
  const outs=st.outs||[]; const o=outs[st.sel||0];
  const res=o&&o.long?(o.long>=3800?`4K · ${o.long}px`:`${o.long}px`):"";
  el.innerHTML=`<div class="head"><b>${esc(m.label)}</b><span class="count">${esc(name)}</span></div>
  <div class="frame ${st.busy?"busy":""}${isIconKey(key)?" iconframe":""}" style="aspect-ratio:${ratioCSS()}">${o?.img?`<img src="${o.img}" alt="Generated image ${(st.sel||0)+1} from ${esc(m.label)}">`:`${!o&&!st.busy?`<div class="ph-empty" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="10" width="36" height="28" rx="6"/><circle cx="18" cy="21" r="4"/><path d="M8 34l10-9 8 7 6-5 10 8"/></svg></div>`:""}<span class="ph-txt">${esc(o?"Magnific sent a link but not the image itself, and claude.ai blocks outside images inside pages. Open the PNG below to view or save it.":(st.ph||"Your image appears here"))}</span>`}${res?`<span class="badge">${esc(res)}</span>`:""}${st.busy?`<span class="elapsed" id="elapsed-${key}">${fmtTime(st.t0)}</span>`:""}</div>
  ${outs.length>1?`<div class="thumbs">${outs.map((x,i)=>`<button type="button" data-i="${i}" aria-pressed="${i===(st.sel||0)}" aria-label="Show image ${i+1}">${x.img?`<img src="${x.img}" alt="">`:i+1}</button>`).join("")}</div>`:""}
  <ol class="steps">${STEPS.map((s,i)=>`<li class="${st.steps?.[i]||""}">${s}${st.stepNote?.[i]?` · ${esc(st.stepNote[i])}`:""}</li>`).join("")}</ol>
  ${st.err?`<div class="msg">${esc(st.err)}</div>`:""}${st.refWarn?`<div class="msg info">${esc(st.refWarn)}</div>`:""}
  <div class="btns">${o?.blob?`<button class="btn small primary" data-act="dl">Download ${/png/.test(o.blob.type)?"PNG":"image"}</button>`:""}${o?.url?`<a class="btn small ${o.blob?"":"primary"}" href="${esc(o.url)}" target="_blank" rel="noopener">Open ${o.long>=3800?"4K ":""}PNG</a><button class="btn small" data-act="copy">Copy link</button>`:""}${o?.webUrl?`<a class="btn small ${o.blob||o.url?"":"primary"}" href="${esc(o.webUrl)}" target="_blank" rel="noopener">Open in Magnific</a>`:""}${st.done||st.err?`<button class="btn small" data-act="regen">Regenerate</button>`:""}</div>
  ${isIconKey(key)&&o?.blob?`<div class="btns exports"><span class="t12 muted">Export PNG on white:</span>${[96,144,192,256,1024,"wide"].map(s=>`<button class="btn small" data-exp="${s}" title="${({96:"S · square, dashboards, tooltips",144:"M · square, spot, onboarding",192:"L · square, modals, marketing",256:"XL · square, hero moments",1024:"Square master",wide:"Full 16:9 frame"})[s]}">${({96:"S 96",144:"M 144",192:"L 192",256:"XL 256",1024:"1024",wide:"16:9 full"})[s]}</button>`).join("")}</div>`:""}
  ${o?.url?`<input type="text" readonly class="linkbox" id="link-${key}" value="${esc(o.url)}" aria-label="Image link">`:""}
  ${o?.links?.length>1?`<details class="links"><summary>All links from Magnific (${o.links.length})</summary>${o.links.map(u=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a>`).join("")}</details>`:""}`;
  el.querySelector('[data-act="dl"]')?.addEventListener("click",()=>save(key,o));
  el.querySelector('[data-act="copy"]')?.addEventListener("click",async e=>{ const b=e.currentTarget; try{ await navigator.clipboard.writeText(o.url); b.textContent="Copied"; }catch{ const i=$("link-"+key); i.focus(); i.select(); b.textContent="Selected, press Ctrl/Cmd+C"; } setTimeout(()=>{ b.textContent="Copy link"; },1800); });
  el.querySelector('[data-act="regen"]')?.addEventListener("click",()=>generate([key]));
  el.querySelectorAll(".thumbs button").forEach(b=>b.addEventListener("click",()=>{ st.sel=+b.dataset.i; renderCard(key,st); }));
  el.querySelector(".frame > img")?.addEventListener("click",()=>openLightbox(o.img));
  el.querySelectorAll("[data-exp]").forEach(b=>b.addEventListener("click",()=>exportIcon(o,b.dataset.exp==="wide"?"wide":+b.dataset.exp,MODELS[key].label)));
}
const cards={nano:{},icon:{}};
function idle(){ for(const k of genKeys()){ if(!cards[k]) cards[k]={}; if(!cards[k].steps) cards[k]={ph:S.mode==="icon"?`${MODELS[k].label}: your icon appears here on white, 16:9. Describe the icon above and press Create icon.`:"Your 4K image appears here. Write a brief above and press Create image.",steps:[]}; renderCard(k,cards[k]); } }
function fmtTime(t0){ if(!t0) return "0:00"; const s=Math.max(0,Math.round((Date.now()-t0)/1000)); return Math.floor(s/60)+":"+String(s%60).padStart(2,"0"); }
idle();
function onAspect(){ $("customWrap").hidden=S.mode==="icon"||$("aspect").value!=="custom"; $("aspectPill").textContent=S.mode==="icon"?"16:9 · locked":aspectText(); for(const k of genKeys()) if(cards[k]) renderCard(k,cards[k]); }
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

$("btnGen").onclick=()=>generate(genKeys());
let refCache=null;
/* What each reference is used for; the order here is the @img1, @img2… order sent to Magnific */
function refRole(id,meta){
  const set=id==="user-image"?"user-image":meta?.set;
  return ({
    "user-image":{role:"image",use:"camera and photography style direction (lens feel, light, colour); its subject is already described in words"},
    bae:{role:"image",use:meta?.studio?"photography style direction: soft directional studio light, backdrop tone and colour grade":"photography style direction: light, depth of field, focus and colour grade"},
    yt:{role:"image",use:"camera and photography style direction: low wide angle, lens feel, hard sunlight, saturated colour grade and styling energy"},
    mj:{role:"image",use:"photography style direction: clean natural light and colour"},
    user:{role:"image",use:"camera and photography style direction"},
    ic:{role:"image",use:"BAE illustration style direction: translucent layered material, orange-to-burgundy gradient, soft rounded 3D forms, isometric angle and lighting"}
  })[set]||{role:"image",use:"camera and photography style direction"};
}
/* ---- Magnific reference library: images uploaded once to a Magnific folder named "BAE References" ----
   Magnific's upload tool only takes public links, and claude.ai pages can't send files to outside servers,
   so references are attached by their Magnific creation identifiers, matched by file name (bae_b114_1, yt04, r061…). */
const LIB_KEY="bae_mag_ids_v1";
try{ S.magIds=JSON.parse(localStorage.getItem(LIB_KEY)||"{}"); }catch{ S.magIds={}; }
setTimeout(syncSetup,0);
function libStatus(txt,kind){ const el=$("libState"); if(el){ el.textContent=txt; el.className="t12 "+(kind==="ok"?"ok-t":kind==="bad"?"bad-t":"muted"); } syncSetup(); }
/* Setup banner: shown only while Magnific isn't connected or the reference library isn't linked */
function syncSetup(){ const box=$("setup"); if(!box) return;
  if(S.web){ box.hidden=true; return; }
  const magOk=$("dotMag").classList.contains("on"), libOk=Object.keys(S.magIds||{}).length>0;
  $("setupMag").classList.toggle("done",magOk); $("setupLib").classList.toggle("done",libOk);
  $("setupMagBtn").textContent=magOk?"Connected":"Connect"; $("setupMagBtn").disabled=magOk;
  $("setupLibBtn").textContent=libOk?"Linked":"Set up"; $("setupLibBtn").disabled=libOk;
  box.hidden=magOk&&libOk; }
function libSummary(){ const n=Object.keys(S.magIds||{}).length; const total=ALL_REFS.filter(r=>r.set!=="user").length; return n?`${n} of ${total} references linked from your Magnific library.`:"Not linked yet. Upload the reference pack to a Magnific folder named “BAE References”, then press Link library."; }
/* Names in the pack: bae_b114_1, yt04, r025 (Magnific may drop the .jpg) */
/* Magnific can rewrite upload names ("bae b114 1", "Bae-B114-1", "bae_b114_1 (1)"), so each known
   reference id is matched with any separator (space, _, -, .) or none between its parts */
let _refPats=null;
function refPats(){ if(_refPats) return _refPats;
  _refPats=ALL_REFS.filter(r=>r.set!=="user").map(r=>{ const id=String(r.id).toLowerCase();
    const body=id.split("_").map(part=>part.replace(/([a-z])(\d)/g,"$1[\\s_.-]*$2")).join("[\\s_.-]*");
    return {id,re:new RegExp("(?<![a-z0-9])"+body+"(?![a-z0-9])","i")}; }).sort((a,b)=>b.id.length-a.id.length);
  return _refPats; }
function refIdFromName(s){ if(typeof s!=="string"||!s) return null; const t=s.replace(/\.(jpe?g|png|webp)\b/ig," "); for(const p of refPats()) if(p.re.test(t)) return p.id; return null; }
const SKIP_KEYS=/prompt|description|caption|negative|text|instruction/i;
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
/* An item may carry its id as identifier, creationIdentifier, assetIdentifier, id or uuid */
function itemId(v){ for(const k of ["identifier","creationIdentifier","assetIdentifier","creation_id","asset_id","id","uuid"]){ if(typeof v[k]==="string"&&v[k].length>=2) return v[k]; if(typeof v[k]==="number") return String(v[k]); } return null; }
function matchRefs(p,map){
  const put=(name,id)=>{ const k=refIdFromName(String(name||"")); if(k&&id&&!map[k]) map[k]=String(id); };
  if(p&&typeof p==="object") walk(p,(k,v)=>{ if(!v||typeof v!=="object"||Array.isArray(v)) return; const id=itemId(v); if(typeof id!=="string") return;
    let nm=null; for(const kk of Object.keys(v)) if(NAME_KEYS.test(kk)&&typeof v[kk]==="string"&&refIdFromName(v[kk])){ nm=v[kk]; break; }
    if(!nm){ walk(v,(k2,v2)=>{ if(!nm&&NAME_KEYS.test(k2)&&typeof v2==="string"&&refIdFromName(v2)) nm=v2; }); }
    /* last resort: any short string field on the item itself (file paths, urls, slugs), never prompts */
    if(!nm){ for(const kk of Object.keys(v)) if(!SKIP_KEYS.test(kk)&&typeof v[kk]==="string"&&v[kk].length<300&&refIdFromName(v[kk])){ nm=v[kk]; break; } }
    put(nm,id); });
  else if(typeof p==="string") for(const b of textBlocks(p)){ const id=textVal(b,["identifier","creationIdentifier","assetIdentifier","id","uuid"]); let nm=textVal(b,["name","title","fileName","filename","originalName","label"]);
    if(!refIdFromName(nm||"")) nm=b.split("\n").filter(l=>!/^\s*-?\s*(prompt|description|caption|text)\s*:/i.test(l)).join("\n"); put(nm,id); }
  return map;
}
function countItems(p){ let n=0; if(p&&typeof p==="object") walk(p,(k,v)=>{ if(v&&typeof v==="object"&&!Array.isArray(v)&&itemId(v)&&Object.keys(v).length>1) n++; }); else if(typeof p==="string") n=(p.match(/(^|\n)\s*-?\s*(identifier|creationIdentifier|assetIdentifier|id)\s*:/g)||[]).length; return n; }
function collectIds(p){ const out=[]; if(p&&typeof p==="object") walk(p,(k,v)=>{ if(v&&typeof v==="object"&&!Array.isArray(v)&&Object.keys(v).length>1){ const id=itemId(v); if(id) out.push(id); } }); else if(typeof p==="string"){ const re=/(?:^|\n)\s*-?\s*(?:identifier|creationIdentifier|assetIdentifier|id)\s*:\s*"?([^\s"\n]+)/g; let m; while((m=re.exec(p))) out.push(m[1]); } return [...new Set(out)]; }
/* Before rendering: any picked reference not linked yet is searched for by name, one by one */
async function findRefsByName(names){
  if(!names.length||S.web||!mcp||!sample) return;
  let tmpl=null;
  try{ const a=await buildArgs("creations_search",`Search the user's Magnific creations AND uploaded images for the image whose name, title or file name is "__REFNAME__". Put the string "__REFNAME__" verbatim in the text/query property. Include uploads and return names with identifiers.`,{query:"__REFNAME__",includeUploads:true,limit:20}); if(JSON.stringify(a.args).includes("__REFNAME__")) tmpl=a.args; }
  catch(e){ log("✕","creations_search (by name)",{code:e?.code,message:e?.message}); }
  if(!tmpl) return;
  const found={};
  for(const name of names){
    for(const q of [name,name.replace(/_/g," ")]){
      try{ const r=await callMag("creations_search",replaceDeep(tmpl,"__REFNAME__",q)); const pl=r.payload??r.content; const m=matchRefs(pl,{}); Object.assign(found,m); if(m[name]) break; }
      catch(e){ log("✕","search "+q,{code:e?.code,message:e?.message}); break; }
    }
  }
  if(Object.keys(found).length){ S.magIds={...(S.magIds||{}),...found}; try{ localStorage.setItem(LIB_KEY,JSON.stringify(S.magIds)); }catch{} log("·","references found by name",found); }
}
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
    const tryList=async(tool,goal,data)=>{ try{ const a=await buildArgs(tool,goal,data); const r=await callMag(tool,a.args); return r.payload??r.content; }catch(e){ log("✕",tool+" (library)",{code:e?.code,message:e?.message}); return null; } };
    const absorb=async pl=>{ if(pl==null) return 0; const before=Object.keys(map).length; matchRefs(pl,map); const cnt=countItems(pl); seen+=cnt;
      if(Object.keys(map).length===before&&cnt){ const o=await sample.json(`From this Magnific result, return every item's identifier and its name/title/file name. Result:\n${trimJSON(pl,15000)}\n\nReply with only a JSON array: [{"identifier":"","name":""}]`,{modelTier:"quick"}).catch(()=>null); if(Array.isArray(o)) o.forEach(x=>{ const k=refIdFromName(String(x?.name||"")); if(k&&x.identifier&&!map[k]) map[k]=String(x.identifier); }); }
      return cnt; };
    /* Uploaded assets can live behind different tools: try each until the folder's items show up */
    if(folder){
      const fdata={folderReference:folder.ref,projectReference:folder.ref,folderName:folder.name,includeAssets:true,includeUploads:true,limit:100};
      for(const [tool,goal] of [
        ["folders_get",`Get the contents of the folder/project named "${folder.name}" (reference ${JSON.stringify(folder.ref)}): every asset, upload and creation inside it, with identifiers and names. Ask for the maximum number of items.`],
        ["folders_show",`Show the folder/project named "${folder.name}" (reference ${JSON.stringify(folder.ref)}) with all its assets and uploads, including identifiers and names.`],
        ["creations_search",`Find every creation, asset and uploaded image inside the folder/project "${folder.name}" (reference ${JSON.stringify(folder.ref)}), including uploads, maximum results, with names.`]]){
        const pl=await tryList(tool,goal,fdata); const cnt=await absorb(pl);
        log("·","library via "+tool,{items:cnt,matched:Object.keys(map).length});
        if(Object.keys(map).length>=ALL_REFS.filter(r=>r.set!=="user").length) break;
      }
    }
    const seenIds=new Set(); let tmpl=null;
    for(let page=0;page<30&&Object.keys(map).length<ALL_REFS.filter(r=>r.set!=="user").length;page++){
      libStatus(`Reading your Magnific library… page ${page+1}, ${Object.keys(map).length} references found`);
      let la;
      if(page>0&&tmpl&&S._libCursor!=null) la={args:replaceDeep(tmpl,"__CURSOR__",S._libCursor)};
      else la=await buildArgs("creations_list",`List the creations and uploaded images ${folder?`inside the folder/project named "${folder.name}" (reference ${JSON.stringify(folder.ref)}) — pass that reference in the folder/project argument`:"in the user's library, newest first, including uploads"}. Return as many items per call as the tool allows (100 or the maximum), including each item's name, title or file name. ${page?`This is page ${page+1}: pass the cursor from Data.`:""}`,{folderReference:folder?.ref||null,folderName:folder?.name||null,page:page+1,cursor:page?(S._libCursor!=null?"__CURSOR__":null):null,limit:100});
      if(page===1&&JSON.stringify(la.args).includes("__CURSOR__")){ tmpl=la.args; la={args:replaceDeep(tmpl,"__CURSOR__",S._libCursor)}; }
      let pl=null; try{ const lr=await callMag("creations_list",la.args); pl=lr.payload??lr.content; }catch(e){ log("✕","creations_list (library)",{code:e?.code,message:e?.message}); break; }
      const fresh=collectIds(pl).filter(x=>!seenIds.has(x)); fresh.forEach(x=>seenIds.add(x));
      await absorb(pl);
      log("·","library page "+(page+1),{newItems:fresh.length,matched:Object.keys(map).length});
      S._libCursor=findCursor(pl);
      /* stop on an empty or repeated page, or when there is no cursor and the page was short */
      if(!fresh.length) break;
      if(S._libCursor==null&&fresh.length<20) break;
    }
    S._libCursor=null; S.magIds={...(S.magIds||{}),...map}; try{ localStorage.setItem(LIB_KEY,JSON.stringify(map)); }catch{}
    refCache=null;
    const n=Object.keys(S.magIds).length;
    const total=ALL_REFS.filter(r=>r.set!=="user"); const missing=total.filter(r=>!S.magIds[r.id.toLowerCase()]).map(r=>r.id);
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
/* References steer the camera and the photographic style only, never the composition or the content */
function refLine(list){
  if(S.mode==="icon") return list.length?"Reference images (BAE illustration style direction ONLY): "+list.map(r=>`${r.tag} = ${r.use}`).join("; ")+". Take only their material, translucency, orange-to-burgundy gradient, softness, isometric angle and lighting. Do NOT copy their objects, composition or any symbol, and do not reproduce any reference as is. The object and composition come only from this prompt.":"";
  const tags=list.map(r=>r.tag).join(", ");
  return list.length?`Reference images (photographic style ONLY): ${tags}. Study them only for camera height and angle, lens and focal-length feel, depth of field, light direction and quality, colour grade, and the general kind of place (modern, open, architectural). Recreate NOTHING literal from them: not the location, building, walls, furniture, objects, people, faces, poses, clothing, clothing colours, composition or framing. The scene is a new, different place; content and composition come only from this prompt.`:""; }
async function uploadRefs(){
  const sig=S.picked.join(",")+"|"+(S.upload&&$("useUpAsRef").checked?S.upload.size:"");
  if(refCache&&refCache.sig===sig&&!refCache.errors.length) return refCache;
  const items=[]; if(S.upload&&$("useUpAsRef").checked) items.push({id:"user-image",blob:S.upload});
  (await refBlobs()).forEach(r=>items.push(r));
  const list=[], errors=[], missing=[];
  const unlinked=items.filter(it=>it.id!=="user-image"&&!S.magIds?.[String(it.id).toLowerCase()]).map(it=>String(it.id).toLowerCase());
  if(unlinked.length&&!S.allowDirectUpload) await findRefsByName(unlinked);
  for(const it of items){
    /* Preferred: the image already lives in the user's Magnific library (BAE References folder) */
    const magId=S.magIds?.[String(it.id).toLowerCase()];
    if(magId){ const meta=refById(it.id)||{}; list.push({ref:it.id,id:magId,url:null,...refRole(it.id,meta)}); continue; }
    if(!S.allowDirectUpload){ missing.push(it.id); continue; }
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
  if(missing.length) errors.unshift(`${missing.join(", ")} not found in your Magnific library. Drag ${missing.length>1?"these files":"this file"} from the reference pack (${missing.map(x=>x+".jpg").join(", ")}) into “BAE References”, then press Link library`);
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
      `Generate exactly ${count} ${S.mode==="icon"?"3D icon illustration image(s), 16:9 widescreen, on a pure white background,":"photorealistic image(s)"} with model "${modelId||m.label}". Use the prompt verbatim.
Resolution: 4K. Use the exact 4K value from the model settings${P.res_4k?` ("${P.res_4k}")`:""}; if 4K is not offered, use the largest value${P.max_res?` ("${P.max_res}")`:""}.
Quality: the highest available${P.best_quality?` ("${P.best_quality}"${P.quality_param?` on "${P.quality_param}"`:""})`:""}.
${mode?`Mode: "${mode}"${modeParam?` on setting "${modeParam}"`:""}.`:"Mode: model default."}
Aspect ratio: ${typeof aspect==="string"?(aspect==="auto"?"auto (let the model choose)":aspect):`custom ${aspect.width}x${aspect.height} px`}.
Number of images: ${count}.
REFERENCES ARE REQUIRED: attach EVERY item in Data.references, in exactly this order, so the first becomes @img1, the second @img2 and so on (the prompt refers to them by those tags). Use the schema's reference field(s) with the uploaded creation identifiers (or URLs if the schema takes URLs). Put EVERY reference in the GENERAL image reference list (reference type "image", shown as @img1, @img2… in Magnific), keeping the order. NEVER use the "style" reference type/slot and NEVER the "character" or "product" slot: the style slot must stay empty/default because it changes the rendering type (photo vs illustration vs 3D). Each reference object carries the creation id in the field "identifier" (exactly that name). If the schema needs a type per reference, set it to "image". Do not drop any reference. Fill the negative prompt field if the schema has one. Turn off any prompt auto-enhancement so the brand prompt stays as written.`,
      {model:modelId, model_label:m.label, model_settings:opt.raw, prompt, negative_prompt:negativeNow(), composition:"person centred on the vertical centre line", setting:S.setting, aspect_ratio:aspect, resolution:P.res_4k||"4K", quality:P.best_quality||"high", mode, num_images:count, references:refs},"default");
    plan.args=fixRefs(plan.args,refs);
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
      if(o.long>=3800||isIconKey(key)) continue;
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
    c.steps[2]="ok"; c.stepNote[2]=isIconKey(key)?"not needed for icons":ups?`${ups} upscaled with Magnific`:"native 4K";
    /* Make sure every image has a PNG link, and bytes for the preview where Magnific provides them */
    c.steps[3]="run"; c.stepNote[3]="getting PNG links"; up();
    for(const o of c.outs){ await completeFiles(o,rr); up(); }
    const got=c.outs.filter(o=>o.url||o.blob).length;
    c.steps[3]=got?"ok":"err"; c.stepNote[3]=got?`${got} file${got>1?"s":""}`:"no file link returned";
    if(!got) c.err="Magnific finished but sent no image file or link. Open your Magnific creations, or send the Connector log to Claude.";
    c.busy=false; c.done=true; up();
    if(isIconKey(key)){ for(const o of c.outs) await whitenOut(o); up(); }
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
    try{ $("pNano").value=enforce(localPrompt()); stage(1,"done"); stage(2,"done"); flash($("s1state"),"Skipped: no Anthropic key, so the prompt was built from your brief and the locked rules."); syncButtons(); await generate(genKeys()); }
    finally{ b.disabled=false; b.textContent="Create image"; }
    return;
  }
  if(!sample){ flash($("s1state"),"Claude is unavailable in this view. Open the page in claude.ai.",true); return; }
  const b=$("btnCreate"); b.disabled=true; b.textContent="Creating…";
  try{
    $("s3").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
    await describe();
    if(!$("pNano").value.trim()) return;
    if(!mcp){ flash($("s3state"),"Magnific isn't reachable in this view. Open the page in claude.ai.",true); return; }
    await generate(genKeys());
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
  if(S.mode==="icon"){ cards.icon={err:"Icons are rendered with GPT 2.5 through Magnific, which works in the claude.ai version of this studio.",steps:[],ph:"Not available here"}; renderCard("icon",cards.icon); return; }
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

/* ===================== ICONS MODE =====================
   BAE illustration system (guidelines pp.91–101), rendered by GPT 2.5 through Magnific,
   locked to a square 1:1 canvas on pure white. */
const ICON_RULES=`BANK AL ETIHAD ILLUSTRATION / ICON SYSTEM (Deep Clarity, guidelines pp.91–101)
Principles: Warmth (leads with humanity), Expressiveness (confident character), Simplicity (every element earns its place).
Visual style: soft, layered depth. Translucent frosted-glass gradients build form, light passes through, shapes feel suspended rather than placed; edges are soft and dissolve slightly into atmosphere; negative space carries as much weight as the marks. Ethereal but considered: every icon belongs to the same family.
MATERIAL SYSTEM — GLASSMORPHISM + BAE GRADIENT (this is the house style, apply it to every icon):
- GLASS elements (glassmorphism): frosted, semi-transparent glass with a soft background blur, so the shapes behind them show through softened and out of focus; the colours behind tint the glass and bleed through faintly (light orange / light burgundy tint); a thin, light, low-opacity edge stroke (rim highlight) that suggests the glass's thickness; a soft gradient sheen across the surface like light reflecting off frosted glass; slightly milky, never crystal-clear, never chrome or mirror-like.
- GRADIENT elements: opaque, solid forms filled with the BAE gradient — Orange #FA6428 flowing into Burgundy #A33755 (with Dark Orange #C13A23 and Medium Burgundy #B9516E in the transition), smooth satin finish, soft rounded edges.
- Pairing: every icon combines at least one GLASS element and at least one GRADIENT element. Layer the glass IN FRONT of (or on top of) the gradient form so the gradient is visible through the frosted glass, blurred and glowing. Depth comes from this glass-over-gradient layering.
- Card stack rule: when the icon is a stack of cards, draw EXACTLY THREE identical rounded cards stacked flat in isometric view with even gaps between them: the TOP card is frosted glass (glassmorphism, see-through, edge highlight, a simple chip on it), the MIDDLE and BOTTOM cards are solid BAE gradient (orange to burgundy). No numbers, logos or text on the cards.
Form: premium 3D objects seen from a gentle isometric three-quarter view (about 30° from above, turned about 45°), softly rounded edges and bevels, smooth satin surfaces with a subtle inner glow, simple geometric volumes. Typical motifs in the set: a coin over a stack of coins (savings), three stacked translucent cards (cards), a coin riding a rising curved arrow (investments), a frosted fingerprint tile over a check-mark disc (security), a phone with app tiles and a floating card (app), an isometric building with a glass roof (branches), a location pin over a small building, a light bulb behind a curved wallet (financial literacy), bars and cards fanned (gold), paper-cut figures over a globe (community).
Colour: ONLY the illustration palette — Burgundy #A33755, Medium Burgundy #B9516E, Light Burgundy #F1C0B6, Orange #FA6428, Dark Orange #C13A23, Soft Orange #FDCBB4, Light Orange #FFFAF4. The warm orange-to-burgundy gradient is the unifying thread: solid forms graded from orange to burgundy, translucent layers in soft orange / light burgundy laid over them. No other hues.
Composition: ONE focal point per frame; one main object plus at most one or two supporting elements, overlapping for depth, not decoration; universally understood objects; centred with generous breathing room (10×10 grid with a 1X exclusion margin).
Mode: light-mode treatment, built for a white background.
Never: text, letters, numbers, logos or the BAE symbol (coin or card faces stay clean or carry a simple abstract emboss); overcrowding or decorative bits (sparkles, confetti, motion lines); mixing styles (no flat vector, line icon, cartoon or photo); illustration used as texture.`;
const ICON_LOCK="Material lock: glassmorphism + BAE gradient — at least one frosted, semi-transparent glass element (background blur, the gradient form behind showing through softly, thin light edge highlight, soft sheen) layered in front of at least one solid BAE gradient form (Orange #FA6428 to Burgundy #A33755, satin). Icon lock: one premium 3D icon in the Bank al Etihad illustration style, centred and isolated on a pure flat white #FFFFFF background that fills the entire 16:9 widescreen canvas edge to edge; no floor or ground plane, no cast shadow on the background, no backdrop gradient, no vignette, no frame or border; the icon sits in the exact centre and fills about 60–70% of the canvas HEIGHT, with even white space above and below and wide, equal white space left and right; light-mode treatment; only Burgundy, Medium Burgundy, Light Burgundy, Orange, Dark Orange, Soft Orange and Light Orange; no text, letters, numbers or logos.";
const ICON_NEG="crystal-clear glass, chrome, mirror reflections, hard refraction, rainbow caustics, coloured glass outside the palette, opaque glass, all-glass icon with no gradient form, all-solid icon with no glass, coloured background, grey background, off-white background, beige background, gradient background, floor, ground plane, cast shadow on background, drop shadow, vignette, frame, border, text, letters, numbers, logo, watermark, brand symbol, photograph, people's faces, flat 2D vector, line icon, outline icon, clip art, cartoon, emoji, sticker, blue, green, purple, teal, yellow gold, chrome metal, clutter, multiple separate icons, sparkles, confetti, motion lines";
function enforceIcon(p){
  let t=String(p||"").trim().replace(/\n*Material lock:[^\n]*/g,"").replace(/\n*Icon lock:[^\n]*/g,"").replace(/\n*Reference images[^\n]*/g,"");
  t=t.replace(/square 1:1/gi,"16:9 widescreen");
  if(!/^premium 3d/i.test(t)) t="Premium 3D glassmorphism brand icon illustration, 16:9 widescreen, centred and isolated on a pure white background. "+t;
  /* Card stacks are locked: three cards, top frosted glass, middle and bottom BAE gradient */
  if(/\bcards?\b|بطاق/i.test($("brief").value+" "+t)&&/stack|layer|three|3|مكدس|ثلاث|cards\b/i.test($("brief").value+" "+t)&&!/Card stack lock:/.test(t))
    t+="\nCard stack lock: exactly three identical rounded cards stacked flat in isometric view with even gaps; the TOP card is frosted glassmorphism glass (see-through, background blur showing the gradient card below, thin light edge highlight, soft sheen, simple chip); the MIDDLE and BOTTOM cards are solid BAE gradient, Orange #FA6428 flowing into Burgundy #A33755; no text, numbers or logos.";
  return t+"\n\n"+ICON_LOCK;
}
async function describeIcon(){
  stage(1,"active"); flash($("s1state"),"Designing the icon concept…"); $("btnDescribe").disabled=true;
  try{
    const refs=await refBlobs(); let images=[]; if(sampleImages){ if(S.upload) images.push(S.upload); refs.forEach(r=>images.push(r.blob)); images=images.slice(0,sampleImages.maxCount||5); }
    const a=await sample.json(`You are the illustration lead for Bank al Etihad. Design ONE icon in the brand's illustration system.
${ICON_RULES}

Icon request (Arabic or English): "${$("brief").value}"
${images.length?`Attached images: ${S.upload?"image 1 is the user's sketch or example (use its idea only); then ":""}the BAE illustration references (style only: material, gradient, angle, softness — not their subjects).`:""}
Choose the clearest universally understood metaphor for a banking audience in Jordan, in the BAE motif language.
Reply in English with only JSON:
{"summary":"1-2 sentences describing the finished icon","metaphor":"why this metaphor reads instantly","main_object":"","supporting":"0-2 supporting elements and how they overlap","glass":"which element(s) are frosted glassmorphism glass and what shows through them","gradient":"which element(s) are solid BAE gradient (orange to burgundy)","layering":"front-to-back order: glass in front of gradient","colour_map":"which palette colours go where","angle":"view angle and orientation","avoid":"anything that could be misread or culturally off"}`,{images:images.length?images:undefined});
    S.analysis=a;
    const f=[["Main object",a.main_object],["Supporting",a.supporting],["Glass (glassmorphism)",a.glass],["BAE gradient",a.gradient],["Layering",a.layering],["Colour",a.colour_map],["Angle",a.angle],["Why it reads",a.metaphor]];
    $("s1body").innerHTML=`<p class="summary">${esc(a.summary)}</p><dl class="spec">${f.filter(x=>x[1]).map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`+(a.avoid?`<div class="msg info">Watch: ${esc(a.avoid)}</div>`:"");
    stage(1,"done"); flash($("s1state"),"Concept ready.");
    await writeIconPrompt();
  }catch(e){ stage(1); flash($("s1state"),sampleCopy(e),true); }
  finally{ $("btnDescribe").disabled=!sample; }
}
async function writeIconPrompt(){
  stage(2,"active"); flash($("s2state"),"Writing the icon prompt…"); $("btnPrompt").disabled=true;
  try{
    const o=await sample.json(`Write one production prompt, used for both GPT 2.5 and Google Nano Banana 2.1, to render this Bank al Etihad icon in a 16:9 widescreen frame (icon centred, wide even white space left and right).
${ICON_RULES}

Icon concept: ${JSON.stringify(S.analysis||{request:$("brief").value})}
References attached, in order: ${refPlan().map(r=>`${r.tag} (${r.use})`).join("; ")||"none"}. Mention them only as style direction for material, gradient, translucency, softness, angle and lighting, e.g. "material and gradient like @img1"; never ask to copy their objects or composition.
Requirements: start with "Premium 3D glassmorphism brand icon illustration"; describe the main object and supporting elements precisely (shapes; which element is frosted glassmorphism glass — semi-transparent, background blur, the gradient form behind showing through softly, thin light edge highlight, soft sheen — and which is solid BAE gradient, Orange #FA6428 into Burgundy #A33755; glass layered in front of the gradient; for a card stack: exactly three cards, top one glass, middle and bottom BAE gradient; soft rounded edges, isometric three-quarter view, soft even studio light with gentle inner glow); centred with generous white margin; pure flat white #FFFFFF background filling the whole square canvas with no floor and no shadow on it; palette colours by name and hex; no text, numbers or logos. 90-150 words, one paragraph.
Also return a checklist of 6 short labels about BAE illustration rules with status "pass" or "note".
Reply with only JSON: {"prompt_icon":"","checklist":[{"label":"","status":"pass"}]}`);
    $("pNano").value=enforceIcon(o.prompt_icon||"");
    $("checks").innerHTML=(o.checklist||[]).map(c=>`<span class="check ${c.status==="pass"?"":"note"}">${c.status==="pass"?"✓":"!"} ${esc(c.label)}</span>`).join("");
    stage(2,"done"); flash($("s2state"),"Ready. Edit freely, then generate.");
  }catch(e){ stage(2); flash($("s2state"),sampleCopy(e),true); }
  finally{ $("btnPrompt").disabled=!sample; syncButtons(); }
}
/* White lock: flood-fill from the edges so the background is exactly #FFFFFF, keeping light tones inside the icon */
async function whitenOut(o){
  if(!o?.img) return;
  try{
    const bmp=await createImageBitmap(await (await fetch(o.img)).blob());
    const W=bmp.width,H=bmp.height; const c=document.createElement("canvas"); c.width=W; c.height=H; const x=c.getContext("2d"); x.drawImage(bmp,0,0);
    const d=x.getImageData(0,0,W,H), p=d.data, seen=new Uint8Array(W*H), st=new Int32Array(W*H); let sp=0;
    const near=i=>{ const r=p[i*4],g=p[i*4+1],b=p[i*4+2]; return r>232&&g>232&&b>232&&Math.max(r,g,b)-Math.min(r,g,b)<14; };
    for(let X=0;X<W;X++){ st[sp++]=X; st[sp++]=(H-1)*W+X; } for(let Y=0;Y<H;Y++){ st[sp++]=Y*W; st[sp++]=Y*W+W-1; }
    let changed=0;
    while(sp){ const i=st[--sp]; if(seen[i]) continue; seen[i]=1; if(!near(i)) continue; p[i*4]=p[i*4+1]=p[i*4+2]=255; p[i*4+3]=255; changed++;
      const X=i%W; if(X>0) st[sp++]=i-1; if(X<W-1) st[sp++]=i+1; if(i>=W) st[sp++]=i-W; if(i<W*(H-1)) st[sp++]=i+W; }
    x.putImageData(d,0,0);
    const blob=await new Promise(r=>c.toBlob(r,"image/png")); o.blob=blob; o.img=URL.createObjectURL(blob); o.whitened=Math.round(changed/(W*H)*100);
    log("·","white background locked",{size:`${W}×${H}`,background_pixels:o.whitened+"%"});
  }catch(e){ log("✕","white lock skipped",{message:String(e?.message||e)}); }
}
/* Exports at the BAE illustration sizes (S 96 · M 144 · L 192 · XL 256), on white */
/* Square exports trim the 16:9 frame to the icon itself and keep a 1X exclusion margin (1/10 per side, 10×10 grid) */
function iconBox(bmp){
  const W=bmp.width,H=bmp.height,k=Math.min(1,800/Math.max(W,H)),w=Math.round(W*k),h=Math.round(H*k);
  const c=document.createElement("canvas"); c.width=w; c.height=h; const x=c.getContext("2d"); x.drawImage(bmp,0,0,w,h);
  const p=x.getImageData(0,0,w,h).data; let x0=w,y0=h,x1=-1,y1=-1;
  for(let y=0;y<h;y++) for(let X=0;X<w;X++){ const i=(y*w+X)*4; if(p[i]<246||p[i+1]<246||p[i+2]<246){ if(X<x0)x0=X; if(X>x1)x1=X; if(y<y0)y0=y; if(y>y1)y1=y; } }
  if(x1<0) return {x:0,y:0,w:W,h:H};
  return {x:x0/k,y:y0/k,w:(x1-x0+1)/k,h:(y1-y0+1)/k};
}
async function exportIcon(o,size,modelLabel){
  try{
    const bmp=await createImageBitmap(o.blob); const wide=size==="wide";
    const c=document.createElement("canvas"); if(wide){ c.width=bmp.width; c.height=bmp.height; } else c.width=c.height=size; const x=c.getContext("2d");
    x.fillStyle="#FFFFFF"; x.fillRect(0,0,c.width,c.height); x.imageSmoothingQuality="high";
    if(wide) x.drawImage(bmp,0,0);
    else { const b=iconBox(bmp), inner=size*0.8, k=Math.min(inner/b.w,inner/b.h), w=b.w*k, h=b.h*k; x.drawImage(bmp,b.x,b.y,b.w,b.h,(size-w)/2,(size-h)/2,w,h); }
    const blob=await new Promise(r=>c.toBlob(r,"image/png")); const tag=String(modelLabel||"").replace(/\s+/g,"-");
    const name=wide?`BAE_icon_${tag}_16x9.png`:`BAE_icon_${tag}_${({96:"S",144:"M",192:"L",256:"XL",1024:"master"})[size]}_${size}.png`;
    if(downloads&&!S.web) await downloads.save({filename:name,data:blob}); else { const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; a.click(); }
  }catch(e){ if(e?.code!=="declined") flash($("s3state"),"Couldn't export that size: "+(e?.message||e?.code),true); }
}
/* Mode switch: Photography ↔ Icons */
const ICON_PRESETS=[["Cards stack","A stack of three bank cards: the top card frosted glassmorphism glass with a simple chip, the middle and bottom cards solid BAE orange-to-burgundy gradient"],["Savings goal","A savings goal: a translucent coin rising above a small stack of coins with a soft target ring"],["Mobile payment","Paying with a phone: a phone with a translucent card hovering over it and a soft tap ripple"],["Home loan","A home loan: a small modern house with a translucent key floating in front of it"],["Security","Account security: a frosted shield over a burgundy check-mark disc"],["Travel card","A travel card: a translucent card in front of a small globe with a curved flight path"],["Salary transfer","Salary transfer: two translucent cards exchanging a coin along a curved arrow"]];
const PHOTO_PRESETS=[...document.querySelectorAll("#presets button")].map(b=>[b.textContent,b.dataset.b]);
const PROMPT_STASH={photo:"",icon:""};
function setMode(m,init){
  if(!init) PROMPT_STASH[S.mode]=$("pNano").value;
  const prev=S.mode; S.mode=m; try{ localStorage.setItem("bae_mode",m); }catch{}
  document.body.classList.toggle("mode-icon",m==="icon");
  document.querySelectorAll("#modeSeg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.mode===m?"true":"false"));
  const icon=m==="icon";
  $("heroTitle").textContent=icon?"Turn an idea into a BAE icon.":"Turn a brief into an on-brand 4K photograph.";
  $("heroLede").textContent=icon?"Describe the icon. Claude designs it in the BAE illustration system (glassmorphism over the orange-to-burgundy gradient, one focal point), and GPT 2.5 and Nano Banana 2.1 each render it in 16:9 on pure white so you can pick the best.":"Write what the photo should show. Claude reads it against the BAE photography rules and your references, writes the prompt, and Nano Banana 2.1 renders it in 4K.";
  if(!S.web) $("heroSub").textContent=icon?"GPT 2.5 + Nano Banana 2.1 · 16:9 · white background · via Magnific":"Nano Banana 2.1 · native 4K · via Magnific";
  $("briefLbl").textContent=icon?"Icon idea":"Brief";
  $("btnCreate").textContent=icon?"Create icon":"Create image";
  $("presets").innerHTML=(icon?ICON_PRESETS:PHOTO_PRESETS).map(([l,b])=>`<button type="button" data-b="${esc(b)}">${esc(l)}</button>`).join("");
  if(!S.web) $("mNanoName").textContent=icon?`${S.gptName||"GPT 2.5"} + ${S.nanoName||"Nano Banana 2.1"} · via Magnific`:(S.nanoName||"Nano Banana 2.1")+" · via Magnific";
  $("results").classList.toggle("one",!icon); $("rNano2").hidden=!icon;
  $("pNano").value=PROMPT_STASH[m]||""; $("pNano").placeholder=icon?"The icon prompt is written after the concept. You can edit it before generating.":"Written after the scene is described. You can edit it before generating.";
  $("promptLbl").textContent=icon?"GPT 2.5 icon prompt":"Nano Banana 2.1 prompt";
  /* keep each service's own picks: only stash the picks of the mode we are actually leaving */
  if(icon){ if(prev!=="icon") S._photoPicked=S.picked.filter(id=>!/^ic_/.test(id)); S.picked=(S._iconPicked&&S._iconPicked.some(id=>/^ic_/.test(id)))?S._iconPicked:PICK_ICON.slice(); S.refTab="ic"; }
  else { if(prev==="icon") S._iconPicked=S.picked.slice(); S.picked=(S._photoPicked&&S._photoPicked.length?S._photoPicked:S.picked).filter(id=>!/^ic_/.test(id)); if(!S.picked.length) S.picked=PICK_BOLD.slice(); if(S.refTab==="ic") S.refTab=S.look==="Bold"?"yt":"bae"; }
  S.picked=S.picked.filter(id=>refById(id));
  if(icon){ try{ const saved=localStorage.getItem("bae_icon_brief"); $("brief").value=saved||ICON_PRESETS[0][1]; }catch{ $("brief").value=ICON_PRESETS[0][1]; } }
  else { try{ $("brief").value=localStorage.getItem("bae_brief")||DEFAULT_BRIEF; }catch{} }
  countBrief(); syncTabs(); renderRefs(); onAspect(); idle(); syncButtons();
  ["s1","s2","s3"].forEach(id=>$(id).classList.remove("active","done")); ["pg2","pg3","pg4"].forEach(id=>$(id).classList.remove("active","done"));
  $("s1body").innerHTML=`<div class="empty">${icon?"The icon concept appears here: main object, supporting elements, layering, colour map and angle, checked against the BAE illustration rules.":"The scene breakdown appears here: subject, setting, wardrobe, light, composition, depth and palette, with notes on how it meets the BAE photography principles."}</div>`; $("checks").innerHTML="";
}
/* Intro: emblem petals bloom, "Studio" rises, then the landing fades in. Click to skip. Runs on every visit. */
(function(){ const I=$("intro"); if(!I) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){ I.remove(); return; }
  document.body.classList.add("intro-on");
  const done=()=>{ I.remove(); setTimeout(()=>document.body.classList.remove("intro-on"),1400); };
  I.addEventListener("animationend",e=>{ if(e.target===I&&e.animationName==="introOut") done(); });
  I.addEventListener("click",()=>{ document.body.classList.add("intro-skip"); document.querySelectorAll(".landing .l-mark,.landing .l-mid h1,.landing .l-choice,.landing .l-foot").forEach(el=>el.style.animationDelay="0s"); });
  setTimeout(()=>{ if(I.isConnected) done(); },4000);
})();
/* Guided tour: spotlight + card, step by step. Opens by itself the first time someone enters the studio,
   and any time from the Tutorial button. Skip, Esc, ← → work everywhere. */
(function(){ const T=$("tour"); if(!T) return;
  const KEY="bae_tour_v1", spot=$("tourSpot"), card=$("tourCard");
  const icon=()=>S.mode==="icon";
  const EMB='<svg viewBox="0 0 84.53 82.12" aria-hidden="true">'+(document.querySelector(".wordmark svg")?.innerHTML||"")+'</svg>';
  const steps=[
    {t:"Welcome to Studio", p:()=>"On-brand images in a few simple steps. This quick tour takes about a minute.", hero:true},
    {el:()=>!$("setup").hidden?$("setup"):$("btnConnect"), t:"Connect once", p:()=>!$("setup").hidden?"Connect Magnific so the studio can render, then link your references. You only do this the first time.":"Magnific is connected. If it ever disconnects, press Reconnect here."},
    {el:()=>$("modeSeg"), t:"Choose what to make", p:()=>"Photography makes 4K photos. Icons makes 3D BAE icons on white. You can switch any time."},
    {el:()=>$("briefCard"), t:()=>icon()?"Describe the icon":"Describe the photo", p:()=>icon()?"Write the idea in a sentence, in Arabic or English, or tap an example like Cards stack.":"Write what the photo should show, in Arabic or English, or tap an example to start from."},
    {el:()=>$("optCard"), t:"Pick a few options", p:()=>icon()?"Icons are already locked to 16:9 on pure white with glassmorphism and the BAE gradient. Just choose how many.":"Choose the look, setting, shot and size. Wardrobe, light, iPhone 18 and the centred subject are already locked to the BAE rules."},
    {el:()=>$("refCard"), t:"References are ready", p:()=>"We pick BAE images that guide the camera and style, never the layout. Press Browse all to change them."},
    {el:()=>$("btnCreate"), t:()=>icon()?"Create the icon":"Create the image", p:()=>icon()?"One press: Claude designs the icon, and GPT 2.5 and Nano Banana 2.1 both render it. It takes a minute or two.":"One press: Claude reads the brief, writes the prompt, and Nano Banana 2.1 renders it in 4K. It takes a minute or two."},
    {el:()=>$("s3"), t:"Download it", p:()=>icon()?"Both icons appear side by side. Download the 16:9 PNG or the square S, M, L and XL sizes.":"Your image appears here. Download the 4K PNG, open it in Magnific, or create another."},
    {el:()=>$("advWrap"), t:"Go deeper, if you like", p:()=>"Edit the prompt, rebuild from a photo, or read the locked rules. You never need this for a good result.", last:true},
  ];
  let i=0, raf=0;
  const val=(v)=>typeof v==="function"?v():v;
  function place(){
    const s=steps[i], el=s.el?s.el():null, vw=innerWidth, vh=innerHeight, cw=card.offsetWidth, ch=card.offsetHeight, pad=10, mobile=vw<=620;
    if(!el){ spot.classList.add("center"); card.style.left=(vw-cw)/2+"px"; card.style.top=Math.max(16,(vh-ch)/2)+"px"; return; }
    spot.classList.remove("center");
    const r=el.getBoundingClientRect(), x=Math.max(8,r.left-pad), y=Math.max(8,r.top-pad), w=Math.min(vw-16,r.width+pad*2), h=Math.min(vh-16,r.bottom+pad-y);
    Object.assign(spot.style,{left:x+"px",top:y+"px",width:w+"px",height:h+"px",borderRadius:(h<70?999:22)+"px"});
    if(mobile) return; // CSS docks the card to the bottom on phones
    let top=r.bottom+pad+16, left=Math.min(Math.max(16,r.left),vw-cw-16);
    if(top+ch>vh-16){ top=r.top-pad-16-ch; }
    if(top<16){ top=Math.min(vh-ch-16,Math.max(16,r.top+24)); left=r.right+pad+16+cw<vw?r.right+pad+16:Math.max(16,r.left-cw-pad-16); if(left<16) left=vw-cw-16; }
    card.style.left=left+"px"; card.style.top=top+"px";
  }
  function show(n){
    i=Math.max(0,Math.min(steps.length-1,n)); const s=steps[i];
    card.classList.add("swap");
    const el=s.el?s.el():null;
    if(el){ const r=el.getBoundingClientRect(); if(r.top<80||r.bottom>innerHeight-(innerWidth<=620?260:40)) el.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:innerWidth<=620?"start":"center"}); }
    setTimeout(()=>{
      $("tourN").textContent=(i+1)+" / "+steps.length;
      $("tourTtl").textContent=val(s.t); $("tourTxt").textContent=val(s.p);
      card.querySelector(".tour-hero")?.remove();
      if(s.hero) $("tourTtl").insertAdjacentHTML("beforebegin",`<div class="tour-hero">${EMB}</div>`);
      $("tourDots").innerHTML=steps.map((_,k)=>`<i class="${k===i?"on":""}"></i>`).join("");
      $("tourBack").hidden=i===0;
      $("tourNext").textContent=i===0?"Start tour":s.last?(icon()?"Start creating":"Start creating"):"Next";
      place(); card.classList.remove("swap"); $("tourNext").focus({preventScroll:true});
    }, el?380:60);
  }
  function open(){ T.hidden=false; document.body.style.overflow="hidden"; show(0); addEventListener("resize",onMove); addEventListener("scroll",onMove,true); }
  function close(){ T.hidden=true; document.body.style.overflow=""; try{ localStorage.setItem(KEY,"1"); }catch{} removeEventListener("resize",onMove); removeEventListener("scroll",onMove,true); setTimeout(()=>$("brief").focus({preventScroll:true}),50); }
  const onMove=()=>{ cancelAnimationFrame(raf); raf=requestAnimationFrame(place); };
  $("tourNext").onclick=()=>{ if(steps[i].last){ close(); window.scrollTo({top:0,behavior:"smooth"}); } else show(i+1); };
  $("tourBack").onclick=()=>show(i-1);
  $("tourSkip").onclick=close;
  $("btnTour").onclick=open;
  T.addEventListener("keydown",e=>{ if(e.key==="Escape"){ e.preventDefault(); close(); } else if(e.key==="ArrowRight") $("tourNext").click(); else if(e.key==="ArrowLeft"&&i>0) show(i-1);
    else if(e.key==="Tab"){ const f=[...card.querySelectorAll("button:not([hidden])")]; const k=f.indexOf(document.activeElement); if(e.shiftKey&&k<=0){ e.preventDefault(); f[f.length-1].focus(); } else if(!e.shiftKey&&k===f.length-1){ e.preventDefault(); f[0].focus(); } } });
  /* first visit: start right after the visitor picks Photography or Icons on the landing */
  document.querySelectorAll("#landing [data-enter=photo],#landing [data-enter=icon]").forEach(b=>b.addEventListener("click",()=>{ let seen=null; try{ seen=localStorage.getItem(KEY); }catch{} if(!seen) setTimeout(open,700); }));
})();
/* Gradient elements: 6 brand shapes, preview + full-res PNG download */
const GRADS=[["circle_1","Circle 01","3700 × 3700"],["circle_2","Circle 02","3700 × 3700"],["lozenge_h_1","Lozenge horizontal 01","6400 × 3600"],["lozenge_h_2","Lozenge horizontal 02","6400 × 3600"],["lozenge_v_1","Lozenge vertical 01","2600 × 4400"],["lozenge_v_2","Lozenge vertical 02","2600 × 4400"]];
(function(){ const G=$("gallery"), grid=$("gGrid"); if(!G||!grid) return;
  const note=t=>{ $("gNote").textContent=t||""; };
  const save=async(name,blob)=>{ if(downloads){ try{ await downloads.save({filename:name,data:blob}); return; }catch(e){ if(e?.code==="declined") return; if(!/unavailable|not_granted|capability/.test(e?.code||"")) throw e; } }
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),4000); };
  const file=id=>`grad/BAE_gradient_${id}.png`;
  grid.innerHTML=GRADS.map(([id,name,size])=>`<div class="g-card"><div class="g-prev" data-full="${file(id)}" data-name="${name}" role="button" tabindex="0" aria-label="View ${name} larger"><img src="grad/BAE_gradient_${id}_preview.webp" alt="${name}" loading="lazy"></div><div class="g-meta"><div><b>${name}</b><small>${size} px · PNG</small></div></div><button class="g-dl" type="button" data-id="${id}">Download PNG</button></div>`).join("");
  grid.addEventListener("click",async e=>{ const b=e.target.closest(".g-dl"); if(b){ b.disabled=true; const old=b.textContent; b.textContent="Preparing…"; note("");
      try{ const r=await fetch(file(b.dataset.id)); if(!r.ok) throw new Error("file not found"); await save(`BAE_gradient_${b.dataset.id}.png`,await r.blob()); }
      catch(err){ note("Couldn't download: "+(err?.message||err?.code)); } finally{ b.disabled=false; b.textContent=old; } return; }
    const pv=e.target.closest(".g-prev"); if(pv&&typeof openLightbox==="function") openLightbox(pv.querySelector("img").src,pv.dataset.name); });
  $("dlAllGrad").onclick=async()=>{ const b=$("dlAllGrad"); b.disabled=true; const old=b.textContent; b.textContent="Preparing…"; note("");
    try{ if(!window.JSZip) throw new Error("zip library didn't load"); const zip=new JSZip(); for(const [id] of GRADS){ const r=await fetch(file(id)); if(r.ok) zip.file(`BAE_gradient_${id}.png`,await r.blob()); } await save("BAE-Gradient-Elements.zip",await zip.generateAsync({type:"blob"})); }
    catch(err){ note("Couldn't build the zip: "+(err?.message||err?.code)); } finally{ b.disabled=false; b.textContent=old; } };
  const open=()=>{ G.hidden=false; G.scrollTop=0; setTimeout(()=>$("closeGallery").focus(),50); };
  const close=()=>{ G.hidden=true; $("openGallery")?.focus(); };
  $("openGallery").addEventListener("click",open); $("closeGallery").addEventListener("click",close);
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&!G.hidden&&!document.querySelector(".lightbox:not([hidden])")) close(); });
})();
/* Animation direction: BAE After Effects templates (EN + AR), each with a looping video preview and a template download */
const TPL={"cats": [{"key": "kinetic", "name": "Typography · Kinetic", "sub": "Header and sub-header in and out"}, {"key": "effects", "name": "Typography · Effects", "sub": "Gradient + type, 1080 × 1350 post"}, {"key": "frames", "name": "Frame gradients", "sub": "1200 ms frame reveals, 1080 × 1350"}, {"key": "loops", "name": "Gradient loops", "sub": "1920 × 1080 · seamless loops"}], "items": [{"id": "en-bae-gradient-6s-loop", "lang": "en", "cat": "loops", "title": "6s Loop", "file": "BAE Gradient - 6s Loop", "w": 1920, "h": 1080, "dur": 6}, {"id": "en-bae-gradient-8s-loop", "lang": "en", "cat": "loops", "title": "8s Loop", "file": "BAE Gradient - 8s Loop", "w": 1920, "h": 1080, "dur": 8}, {"id": "en-bae-gradient-15s-loop", "lang": "en", "cat": "loops", "title": "15s Loop", "file": "BAE Gradient - 15s Loop", "w": 1920, "h": 1080, "dur": 15}, {"id": "en-bae-gradient-30s-loop", "lang": "en", "cat": "loops", "title": "30s Loop", "file": "BAE Gradient - 30s Loop", "w": 1920, "h": 1080, "dur": 30}, {"id": "en-bae-type-kinetic-in-out-header-sub-header", "lang": "en", "cat": "kinetic", "title": "Kinetic IN & OUT (Header + Sub-header)", "file": "BAE Type - Kinetic IN & OUT (Header + Sub-header)", "w": 1920, "h": 1080, "dur": 8}, {"id": "en-bae-post-gradient-type-1080x1350", "lang": "en", "cat": "effects", "title": "Gradient + Type (1080x1350)", "file": "BAE Post - Gradient + Type (1080x1350)", "w": 1080, "h": 1350, "dur": 8}, {"id": "en-frame-reveal-1200ms-opacity", "lang": "en", "cat": "frames", "title": "Frame Reveal - 1200ms (Opacity)", "file": "Frame Reveal - 1200ms (Opacity)", "w": 1080, "h": 1350, "dur": 3}, {"id": "en-frame-reveal-1200ms-position", "lang": "en", "cat": "frames", "title": "Frame Reveal - 1200ms (Position)", "file": "Frame Reveal - 1200ms (Position)", "w": 1080, "h": 1350, "dur": 3}, {"id": "ar-bae-gradient-6s-loop", "lang": "ar", "cat": "loops", "title": "6s Loop", "file": "AR - BAE Gradient - 6s Loop", "w": 1920, "h": 1080, "dur": 6}, {"id": "ar-bae-gradient-8s-loop", "lang": "ar", "cat": "loops", "title": "8s Loop", "file": "AR - BAE Gradient - 8s Loop", "w": 1920, "h": 1080, "dur": 8}, {"id": "ar-bae-gradient-15s-loop", "lang": "ar", "cat": "loops", "title": "15s Loop", "file": "AR - BAE Gradient - 15s Loop", "w": 1920, "h": 1080, "dur": 15}, {"id": "ar-bae-gradient-30s-loop", "lang": "ar", "cat": "loops", "title": "30s Loop", "file": "AR - BAE Gradient - 30s Loop", "w": 1920, "h": 1080, "dur": 30}, {"id": "ar-bae-type-kinetic-in-out-header-sub-header", "lang": "ar", "cat": "kinetic", "title": "Kinetic IN & OUT (Header + Sub-header)", "file": "AR - BAE Type - Kinetic IN & OUT (Header + Sub-header)", "w": 1920, "h": 1080, "dur": 8}, {"id": "ar-bae-post-gradient-type-1080x1350", "lang": "ar", "cat": "effects", "title": "Gradient + Type (1080x1350)", "file": "AR - BAE Post - Gradient + Type (1080x1350)", "w": 1080, "h": 1350, "dur": 8}, {"id": "ar-frame-reveal-1200ms-opacity", "lang": "ar", "cat": "frames", "title": "Frame Reveal - 1200ms (Opacity)", "file": "AR - Frame Reveal - 1200ms (Opacity)", "w": 1080, "h": 1350, "dur": 3}, {"id": "ar-frame-reveal-1200ms-position", "lang": "ar", "cat": "frames", "title": "Frame Reveal - 1200ms (Position)", "file": "AR - Frame Reveal - 1200ms (Position)", "w": 1080, "h": 1350, "dur": 3}]};
(function(){ const W=$("tplWrap"); if(!W) return;
  let lang="en"; try{ lang=localStorage.getItem("bae_tpl_lang")||"en"; }catch{}
  const reduce=matchMedia("(prefers-reduced-motion: reduce)");
  const note=t=>{ $("tplNote").textContent=t||""; };
  /* each template ships as data (the .aep in base64); the zip is built here, then offered through the download prompt */
  const addTpl=async(zip,t)=>{ if(!window.JSZip) throw new Error("zip library didn't load"); const r=await fetch(`anim/t/${t.id}.json`); if(!r.ok) throw new Error("template not found");
    const j=await r.json(); zip.file(`${j.folder}/${j.file}`,j.b64,{base64:true}); };
  const save=async(name,blob)=>{ if(downloads){ try{ await downloads.save({filename:name,data:blob}); return; }catch(e){ if(e?.code==="declined") return; if(!/unavailable|not_granted|capability/.test(e?.code||"")) throw e; } }
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),4000); };
  /* play only what is on screen; everything else stays paused on its poster */
  const io=new IntersectionObserver(es=>es.forEach(e=>{ const v=e.target; if(e.isIntersecting&&!reduce.matches&&!$("anim").hidden){ v.play().catch(()=>{}); } else v.pause(); }),{threshold:.35});
  function render(){
    io.disconnect();
    const list=TPL.items.filter(t=>t.lang===lang), ar=lang==="ar";
    W.innerHTML=TPL.cats.map(c=>{ const its=list.filter(t=>t.cat===c.key); if(!its.length) return "";
      const portrait=its[0].h>its[0].w, cls=portrait?"portrait":its.length===1?"solo":"";
      return `<section class="t-sec" aria-label="${esc(c.name)}"><div class="t-sec-h"><h3>${esc(c.name)}</h3><span>${esc(c.sub)}</span></div><div class="t-grid ${cls}">${its.map(t=>`
        <article class="t-card"><div class="t-vid" style="aspect-ratio:${t.w}/${t.h}" data-id="${t.id}" role="button" tabindex="0" aria-label="Play ${esc(t.title)} full screen">
          <video src="anim/v/${t.id}.mp4" poster="anim/p/${t.id}.jpg" muted loop playsinline preload="metadata" aria-hidden="true"></video><span class="t-badge">${t.dur} s</span></div>
          <div class="t-meta" ${ar?'dir="ltr"':""}><b>${esc(t.title)}</b><small>${t.w} × ${t.h} · ${t.dur} s · ${ar?"Arabic":"English"} · After Effects</small></div>
          <button class="g-dl" type="button" data-dl="${t.id}">Download template</button></article>`).join("")}</div></section>`; }).join("");
    W.querySelectorAll("video").forEach(v=>io.observe(v));
    document.querySelectorAll("[data-tlang]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.tlang===lang?"true":"false"));
    $("tplAll").textContent=`Download all ${ar?"Arabic":"English"} (.zip)`;
  }
  W.addEventListener("click",async e=>{
    const b=e.target.closest("[data-dl]");
    if(b){ const t=TPL.items.find(x=>x.id===b.dataset.dl); b.disabled=true; const old=b.textContent; b.textContent="Preparing…"; note("");
      try{ const z=new JSZip(); await addTpl(z,t); await save(`${t.file}.zip`,await z.generateAsync({type:"blob",compression:"DEFLATE"})); }
      catch(err){ note("Couldn't download: "+(err?.message||err?.code)); } finally{ b.disabled=false; b.textContent=old; } return; }
    const v=e.target.closest(".t-vid"); if(v){ const el=v.querySelector("video"); try{ el.muted=true; el.play().catch(()=>{}); (el.requestFullscreen||el.webkitEnterFullscreen||el.webkitRequestFullscreen)?.call(el); }catch{} }
  });
  W.addEventListener("keydown",e=>{ if((e.key==="Enter"||e.key===" ")&&e.target.classList?.contains("t-vid")){ e.preventDefault(); e.target.click(); } });
  document.querySelectorAll("[data-tlang]").forEach(b=>b.onclick=()=>{ lang=b.dataset.tlang; try{ localStorage.setItem("bae_tpl_lang",lang); }catch{} render(); });
  /* one zip with every template of the chosen language, each in its own folder */
  $("tplAll").onclick=async()=>{ const b=$("tplAll"); b.disabled=true; const old=b.textContent; b.textContent="Preparing…"; note("");
    try{ if(!window.JSZip) throw new Error("zip library didn't load"); const all=new JSZip();
      for(const t of TPL.items.filter(x=>x.lang===lang)) await addTpl(all,t);
      await save(`BAE Animation Direction - ${lang==="ar"?"AR":"EN"}.zip`,await all.generateAsync({type:"blob",compression:"DEFLATE"})); }
    catch(err){ note("Couldn't build the zip: "+(err?.message||err?.code)); } finally{ b.disabled=false; b.textContent=old; } };
  render();
  /* when the page opens or closes, start or stop what is visible */
  new MutationObserver(()=>{ const hid=$("anim").hidden; W.querySelectorAll("video").forEach(v=>{ if(hid) v.pause(); }); if(!hid){ io.disconnect(); W.querySelectorAll("video").forEach(v=>io.observe(v)); } }).observe($("anim"),{attributes:true,attributeFilter:["hidden"]});
})();
/* Animation direction: 1920x1080 stage.
   V1: words slide in one by one (Arabic right-to-left, English left-to-right) over a slowly rotating gradient element.
   V2: words rise out of their own masks (after Subframe Motion "Word by word"), the closing line catches a light sheen,
       over a live BAE silk flow drawn in WebGL (after Subframe Motion "Slipstream", both MIT). Loops: play, hold, exit, replay. */
const ANIM_COPY={
  ar:["نؤمن أن كل خطوة صغيرة","تصنع فرقًا حقيقيًا في حياتك","لذلك نبتكر لك حلولًا أذكى","أقرب إليك."],
  en:["We believe every small step","makes a real difference, always","so we build smarter solutions","Closer together."]
};
/* BAE silk: domain-warped streams, two slow tides (~24 s and ~30 s) breathe their width and place.
   Palette ramp: Ink → Burgundy → Dark Orange → Orange → Medium Orange → Light Orange. The text side is held darker for contrast. */
const SILK_FRAG=`precision highp float;
uniform vec2 u_res; uniform float u_t; uniform float u_side;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+1.0),f.x),f.y);}
float fbm(vec2 p){float s=0.0,a=0.5;for(int i=0;i<4;i++){s+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=0.5;}return s;}
vec3 ramp(float x){
  vec3 c=mix(vec3(0.098,0.094,0.118),vec3(0.30,0.08,0.15),smoothstep(0.0,0.22,x));
  c=mix(c,vec3(0.639,0.216,0.333),smoothstep(0.18,0.40,x));
  c=mix(c,vec3(0.757,0.227,0.137),smoothstep(0.38,0.58,x));
  c=mix(c,vec3(0.980,0.392,0.157),smoothstep(0.56,0.76,x));
  c=mix(c,vec3(0.984,0.604,0.459),smoothstep(0.74,0.90,x));
  return mix(c,vec3(1.0,0.980,0.957),smoothstep(0.90,1.0,x));}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; vec2 p=vec2(uv.x*u_res.x/u_res.y,uv.y);
  float T=u_t*0.045;
  float breath=sin(u_t*0.26), swell=sin(u_t*0.21+1.3);
  vec2 q=vec2(fbm(p*0.9+vec2(0.0,T)),fbm(p*0.9+vec2(5.2,-T)));
  float f=fbm(p*1.5+2.4*q+vec2(T*0.8,0.0));
  float s=p.y*1.15-p.x*0.32+0.95*f+0.06*breath;
  float silk=pow(0.5+0.5*sin(s*8.0),6.0+2.0*swell)*0.6+pow(0.5+0.5*sin(s*21.0+f*5.0),14.0)*0.28;
  float body=smoothstep(0.25,0.95,f);
  float x=0.10+0.50*body+silk*(0.35+0.65*body);
  float side=mix(1.0-uv.x,uv.x,u_side);
  x*=mix(1.0,0.45,smoothstep(0.25,0.80,side));
  x*=1.0-0.35*dot(uv-0.5,uv-0.5);
  vec3 col=ramp(clamp(x,0.0,1.0));
  col+=(hash(gl_FragCoord.xy)+hash(gl_FragCoord.xy+vec2(17.3,9.1))-1.0)/255.0;
  gl_FragColor=vec4(col,1.0);}`;
(function(){ const A=$("anim"); if(!A) return;
  const st={ver:"v1",lang:"ar",shape:"circle_1",timer:null,paused:false};
  const stage=$("aStage"), wrap=$("aWrap"), txt=$("aText"), shp=$("aShape"), img=$("aShapeImg"), cv=$("aCanvas");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)");
  const fit=()=>{ const r=wrap.getBoundingClientRect(); if(!r.width) return; const k=Math.min(r.width/1920,r.height/1080); stage.style.transform=`scale(${k})`; stage.style.left=((r.width-1920*k)/2)+"px"; stage.style.top=((r.height-1080*k)/2)+"px"; sizeCanvas(k); };
  new ResizeObserver(fit).observe(wrap);

  /* ---- WebGL silk (V2) ---- */
  let gl=null, prog=null, U={}, raf=0, t0=0, tAcc=8, last=0, glOk=null;
  function initGL(){
    if(glOk!==null) return glOk;
    try{
      gl=cv.getContext("webgl",{alpha:false,antialias:false,powerPreference:"low-power"});
      if(!gl) return glOk=false;
      const sh=(type,src)=>{ const o=gl.createShader(type); gl.shaderSource(o,src); gl.compileShader(o); if(!gl.getShaderParameter(o,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
      prog=gl.createProgram(); gl.attachShader(prog,sh(gl.VERTEX_SHADER,"attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}")); gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,SILK_FRAG)); gl.linkProgram(prog);
      if(!gl.getProgramParameter(prog,gl.LINK_STATUS)) throw new Error("link");
      gl.useProgram(prog); const b=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,b); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const loc=gl.getAttribLocation(prog,"a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
      U={res:gl.getUniformLocation(prog,"u_res"),t:gl.getUniformLocation(prog,"u_t"),side:gl.getUniformLocation(prog,"u_side")};
      cv.addEventListener("webglcontextlost",e=>{ e.preventDefault(); glOk=false; cancelAnimationFrame(raf); cv.style.opacity=0; });
      return glOk=true;
    }catch(e){ log("✕","silk shader",{message:String(e?.message||e)}); return glOk=false; }
  }
  /* Drawing buffer follows the displayed size (DPR at most 2, at most 2.4 MP); the stage scale does the rest */
  function sizeCanvas(k){ if(!gl) return; const dpr=Math.min(window.devicePixelRatio||1,2); let w=1920*k*dpr, h=1080*k*dpr; const cap=Math.sqrt(2400000/(w*h)); if(cap<1){ w*=cap; h*=cap; } w=Math.max(1,Math.round(w)); h=Math.max(1,Math.round(h)); if(cv.width!==w||cv.height!==h){ cv.width=w; cv.height=h; gl.viewport(0,0,w,h); draw(); } }
  function draw(){ if(!gl||!glOk) return; gl.uniform2f(U.res,cv.width,cv.height); gl.uniform1f(U.t,tAcc); gl.uniform1f(U.side,st.lang==="ar"?1:0); gl.drawArrays(gl.TRIANGLES,0,6); }
  const liveOpen=()=>!$("liveWrap")||$("liveWrap").open;
  const visible=()=>!A.hidden&&liveOpen()&&st.ver==="v2"&&!document.hidden;
  function tick(now){ if(!visible()||st.paused||reduce.matches){ raf=0; last=0; return; } if(last) tAcc+=Math.min((now-last)/1000,0.05); last=now; draw(); raf=requestAnimationFrame(tick); }
  function runSilk(){ cancelAnimationFrame(raf); raf=0; last=0; if(st.ver!=="v2"||!initGL()) return; fit(); draw(); if(visible()&&!st.paused&&!reduce.matches) raf=requestAnimationFrame(tick); }
  document.addEventListener("visibilitychange",runSilk);
  reduce.addEventListener?.("change",()=>{ runSilk(); play(); });

  /* ---- text ---- */
  const build=()=>{ const ar=st.lang==="ar", v2=st.ver==="v2"; txt.dir=ar?"rtl":"ltr"; txt.lang=ar?"ar":"en"; let k=0;
    txt.setAttribute("aria-label",ANIM_COPY[st.lang].join(" "));
    txt.innerHTML=ANIM_COPY[st.lang].map(line=>`<span class="a-line" aria-hidden="true">${line.split(/\s+/).map(w=>v2
      ? `<span class="a-m"><span style="--k:${k++}">${esc(w)}</span></span>`
      /* V1: Arabic words enter from the right and travel left; English words enter from the left and travel right */
      : `<span class="a-w" style="--k:${k++};--from:${ar?"90px":"-90px"}">${esc(w)}</span>`).join(" ")}</span>`).join("");
    return k; };
  const play=()=>{ clearTimeout(st.timer); txt.classList.remove("play","leave","v2play","v2leave"); const n=build(); void txt.offsetWidth;
    if(reduce.matches){ txt.classList.add(st.ver==="v2"?"v2play":"play"); return; }
    if(st.ver==="v2"){
      txt.classList.add("v2play");
      if(st.paused) return;
      const settled=250+n*75+720+1400;
      st.timer=setTimeout(()=>{ txt.classList.remove("v2play"); txt.classList.add("v2leave"); st.timer=setTimeout(play,360+n*28+500); },settled+2400);
    } else {
      txt.classList.add("play");
      if(st.paused) return;
      const total=200+n*110+900;
      st.timer=setTimeout(()=>{ txt.classList.add("leave"); st.timer=setTimeout(play,700); },total+2600);
    } };
  const setShape=id=>{ st.shape=id; shp.hidden=id==="none"; shp.classList.toggle("lozenge",/lozenge/.test(id)); if(id!=="none") img.src=`grad/BAE_gradient_${id}.png`; };
  const setVer=v=>{ st.ver=v; stage.classList.toggle("v2",v==="v2"); $("aShapeSeg").hidden=v==="v2";
    $("aDesc").textContent=v==="v2"?"Each word rises from its own mask, the last line catches the light, over a live BAE silk flow.":"Word by word. Arabic slides right to left, English left to right.";
    A.querySelectorAll("[data-ver]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.ver===v?"true":"false")); runSilk(); play(); };
  A.querySelectorAll("[data-ver]").forEach(b=>b.onclick=()=>setVer(b.dataset.ver));
  A.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{ st.lang=b.dataset.lang; A.querySelectorAll("[data-lang]").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false")); draw(); play(); });
  A.querySelectorAll("[data-shape]").forEach(b=>b.onclick=()=>{ setShape(b.dataset.shape); A.querySelectorAll("[data-shape]").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false")); });
  $("aReplay").onclick=play;
  /* Pause stops the loop, the rotation and the silk (WCAG 2.2.2 for motion longer than five seconds) */
  $("aPause").onclick=()=>{ st.paused=!st.paused; const b=$("aPause"); b.textContent=st.paused?"Play":"Pause"; b.setAttribute("aria-pressed",st.paused?"true":"false");
    stage.classList.toggle("paused",st.paused); if(st.paused) clearTimeout(st.timer); else play(); runSilk(); };
  $("aFull").onclick=()=>{ try{ if(document.fullscreenElement) document.exitFullscreen(); else wrap.requestFullscreen?.(); }catch{} };
  const open=()=>{ A.hidden=false; A.scrollTop=0; if(liveOpen()){ if(!img.getAttribute("src")) setShape(st.shape); requestAnimationFrame(()=>{ fit(); runSilk(); play(); }); } setTimeout(()=>$("closeAnim").focus(),50); };
  $("liveWrap")?.addEventListener("toggle",()=>{ if($("liveWrap").open){ if(!img.getAttribute("src")) setShape(st.shape); requestAnimationFrame(()=>{ fit(); runSilk(); play(); }); } else { clearTimeout(st.timer); cancelAnimationFrame(raf); raf=0; } });
  const close=()=>{ A.hidden=true; clearTimeout(st.timer); cancelAnimationFrame(raf); raf=0; txt.classList.remove("play","v2play"); $("openAnim")?.focus(); };
  $("openAnim").addEventListener("click",open); $("closeAnim").addEventListener("click",close);
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&!A.hidden&&!document.fullscreenElement) close(); });
})();
/* Landing: pick a service, then the studio opens in that mode. The emblem in the header brings it back. */
(function(){ const L=$("landing"); if(!L) return; document.body.classList.add("landing-on");
  const enter=m=>{ if(m&&m!==S.mode) setMode(m); L.classList.add("out"); document.body.classList.remove("landing-on"); window.scrollTo(0,0); setTimeout(()=>{ try{ $("brief").focus({preventScroll:true}); }catch{} },350); };
  L.querySelectorAll("[data-enter]").forEach(b=>b.addEventListener("click",()=>enter(b.dataset.enter)));
  const wm=document.querySelector(".top .wordmark"); if(wm){ wm.setAttribute("role","button"); wm.tabIndex=0; const back=()=>{ L.classList.remove("out"); document.body.classList.add("landing-on"); };
    wm.addEventListener("click",back); wm.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); back(); } }); }
})();
$("modeSeg").addEventListener("click",e=>{ const b=e.target.closest("button[data-mode]"); if(b&&b.dataset.mode!==S.mode) setMode(b.dataset.mode); });
$("brief").addEventListener("input",()=>{ if(S.mode==="icon") try{ localStorage.setItem("bae_icon_brief",$("brief").value); }catch{} });
try{ if(localStorage.getItem("bae_mode")==="icon") setMode("icon",true); }catch{}

$("btnLinkLib").onclick=linkLibrary; $("btnPack").onclick=downloadPack;
libStatus(libSummary(),Object.keys(S.magIds||{}).length?"ok":"");

function openLightbox(src){ if(!src) return; $("lbImg").src=src; $("lightbox").hidden=false; $("lbClose").focus(); }
function closeLightbox(){ $("lightbox").hidden=true; $("lbImg").removeAttribute("src"); }
$("lbClose").onclick=closeLightbox;
$("lightbox").addEventListener("click",e=>{ if(e.target.id==="lightbox") closeLightbox(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&!$("lightbox").hidden) closeLightbox(); });

boot();
})();
