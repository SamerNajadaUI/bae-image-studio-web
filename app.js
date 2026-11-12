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
/* Bold defaults lean on the BAE guideline frames (clean, refined) with one youth frame for camera energy only */
const PICK_BOLD=["bae_b108_2","bae_b111_2","bae_b106_1","yt04"];
const PICK_BOLD_STUDIO=["bae_b113_0","bae_b114_1","bae_b114_2"];
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
/* Characters: identity references (face, hair, build). Named, renamable; naming one in the brief casts them. */
const CHAR_REFS=[
 ["ch_wissam","Wissam / وسام","man in his early thirties, dark side-parted hair, short stubble beard, warm brown eyes, athletic build"],
 ["ch_lina","Lina / لينا","young woman, dark hair slicked back into a low braided ponytail, strong brows, grey-green eyes, slim build"],
 ["ch_sara","Sara / سارة","woman around thirty, light-blonde hair in a low bun, light freckles, grey-blue eyes, slim build"],
 ["ch_omar","Omar / عمر","man in his forties, heavy build, short brown swept-back hair, light stubble, grey-blue eyes"]
].map(([id,name,d])=>({id,defName:name,d:"Character: "+d,look:d,src:`refs/${id}.jpg`,set:"ch",studio:false}));
ALL_REFS.push(...CHAR_REFS);
const CHAR_KEY="bae_char_names_v1";
let CHAR_NAMES={}; try{ CHAR_NAMES=JSON.parse(localStorage.getItem(CHAR_KEY)||"{}"); }catch{}
const charName=id=>(CHAR_NAMES[id]||refById(id)?.defName||id).trim();
const charAliases=id=>charName(id).split("/").map(s=>s.trim()).filter(Boolean);
const charLabel=id=>charAliases(id)[0]||id;
const isChar=id=>/^ch_/.test(id);
/* Characters named in the brief, in brief order */
function castInBrief(){ const b=($("brief")?.value||"").toLowerCase();
  return CHAR_REFS.map(r=>{ let at=-1; for(const n of charAliases(r.id)){ const k=b.indexOf(n.toLowerCase()); if(k>=0&&(at<0||k<at)) at=k; } return {id:r.id,at}; })
    .filter(x=>x.at>=0).sort((x,y)=>x.at-y.at).map(x=>x.id); }
/* Put named characters first in the references (they must reach the model), auto-removing ones the brief no longer names */
function syncCast(){ if(S.mode==="icon") return;
  const named=castInBrief(); S._autoCast=S._autoCast||[];
  S.picked=S.picked.filter(id=>!(S._autoCast.includes(id)&&!named.includes(id)));
  S._autoCast=S._autoCast.filter(id=>named.includes(id));
  for(const id of named){ if(!S.picked.includes(id)){ S._autoCast.push(id); S.picked.unshift(id); } }
  /* characters first, in the order the brief names them, then any tapped ones */
  const chars=[...named,...S.picked.filter(id=>isChar(id)&&!named.includes(id))], rest=S.picked.filter(id=>!isChar(id));
  S.picked=[...chars,...rest].slice(0,MAX_REFS); }
function castText(){ const chars=refPlan().filter(r=>isChar(r.id)); if(!chars.length) return "";
  return "CAST — these people are fixed characters; keep each one's exact identity (face, facial features, hairline and hairstyle, eye colour, skin tone, build): "+chars.map(r=>`${charLabel(r.id)} = ${r.tag} (${refById(r.id).look})`).join("; ")+". When the brief names a character, or describes a person of the same gender and age who is not otherwise named, that person IS the character. Characters keep their own look even where the generic people description would differ. Their clothing, pose and background in the reference are NOT used: dress them by the look rules for this scene."; }
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
const BAE_WEAR_FRESH = "crisp White #FFFFFF and deep Ink black #19181E as the main layers, Light Stone #ECE8DF and Ecru #FFFAF4 as soft neutrals, and ONE colour piece per person from Burgundy #A33755, Medium Burgundy #B9516E (raspberry), Light Burgundy #F1C0B6 (blush) or Sky Blue #4BBCDF (from the BAE gradient system)";
const BAE_WEAR_WARM = "Ink #19181E, Medium Ink #4F4E62 (slate), Burgundy #A33755, Medium Burgundy #B9516E, Light Burgundy #F1C0B6 (dusty rose), Stone #CCC3B4, Light Stone #ECE8DF, Light Orange #FFFAF4 (ecru) and White #FFFFFF";
/* Bank-grade wardrobe, even for young people: refined "old money" minimalism, never streetwear */
const WARDROBE_BASE = `WARDROBE STANDARD (both looks): premium, refined, "quiet luxury / old money" minimal style that suits a bank, even for young people. Clean tailoring and quality fabrics: crisp poplin or oxford shirts, fine-knit polos and crew-necks (merino, cashmere), relaxed tailored blazers and overshirts, pressed straight-leg or pleated tailored trousers with a clean break, tailored chinos, long wool coats, minimal leather loafers or clean white leather sneakers, a simple watch. Well fitted, neat, pressed, nothing loud. NEVER streetwear: no oversized tees, no graphic or football tees, no baggy or balloon jeans, no tube socks, no chunky sneakers, no hoodies, no bucket hats or beanies, no crop tops, no sweater vests, no crochet.`;
const LOOK_BOLD = `LOOK — BOLD & COLOURFUL (the youth campaign references guide camera, light and energy only):
${WARDROBE_BASE}
WARDROBE COLOUR — CRISP AND FRESH, BAE PALETTE ONLY: ${BAE_WEAR_FRESH}. Build each outfit as clean contrast: white or ink-black tailoring layered OVER one colour piece (e.g. ink blazer over a blush knit, white overshirt over a raspberry polo, ink trousers with a sky-blue oxford shirt and a white knit on the shoulders), or a monochrome white or black outfit with one colour accessory. Each person in the frame takes a DIFFERENT colour piece. Never teal or green, never orange, coral, rust, yellow, lime, purple, red or neon; never more than one colour per person.
Camera: dynamic and confident — low or dutch angles and wide lenses when the brief asks for them, bright clean light, crisp shadows, clean punchy commercial grade, faces sharp.
Energy: confident, warm and alive — genuine smiles, natural mid-action moments; never posed stock.`;
/* ELEGANT & CALM wardrobe, read from the 12 BAE guideline photos (pp.106–114): dark tailoring anchors every frame
   (black blazer, navy coat, dark denim workwear), warm knits as the mid-tone (camel cardigan, chocolate, olive),
   crisp white or ecru as ONE layer, and one colour or pattern accent per person (cobalt, jade, rose, burgundy, teal,
   blue-and-white print, pink/blue madras check, printed silk scarf). Never head-to-toe beige. */
const LOOK_CALM = `LOOK — ELEGANT & CALM (styling read from the BAE guideline photos pp.106–114; colours ONLY from the BAE palette):
${WARDROBE_BASE}
WARDROBE COLOUR — WARM, DEEP BAE PALETTE ONLY: ${BAE_WEAR_WARM}. No colour outside this list: no orange, rust, camel, brown, olive, mustard, cobalt or neon.
How to dress each person, in this order:
 1. Deep anchor: ink or slate relaxed tailoring (soft-shouldered blazer, long wool coat, fine-knit, pressed trousers), OR a deep burgundy piece.
 2. Tonal mid-tone: a second piece in the same family (burgundy with raspberry or dusty rose; slate with stone; ink with stone).
 3. Light layer: ecru or white (shirt, tee, turtleneck) as ONE layer only, never head to toe.
 4. One quiet accent at most: dusty rose scarf, burgundy knit, burgundy leather bag, simple jewellery or dark sunglasses.
Warm and ordered: tonal, harmonious, layered, matte textures (wool, knit, linen, silk); relaxed modern fits. In couples and groups each person takes a different family (one burgundy, one slate, one ink) so the frame stays balanced, never matching.
Choose for the SCENE:
 - Home, family, planning money → knitwear: burgundy or dusty-rose knit over ecru, slate or ink trousers.
 - City, street, business, shopping → ink or slate tailoring with an ecru layer, one burgundy accent.
 - Café, friends, social → raspberry or dusty-rose piece against an ink or slate anchor.
 - Work, creative studio, small business → slate or white shirt, sleeves rolled, stone trousers.
 - Premium, wealth, investment → ink tailoring, ecru knit, minimal jewellery.
 - Studio portrait → one strong solid: ink blazer, burgundy knit or crisp white shirt against the plaster set.
Mood and camera: composed, warm and confident; eye-level or gentle angles with selective focus, foreground depth and soft directional natural light.`;
const LOOK_CALM_NEG = "streetwear, oversized t-shirt, baggy jeans, teal clothing, colours outside the BAE palette, camel, brown, olive, mustard, cobalt, neon colours, all-beige outfit, head-to-toe beige, head-to-toe cream, all-white outfit, monochrome beige styling, sand-coloured outfits, matching couple outfits, matching coats, washed-out pastel wardrobe";
const LOOK_BOLD_NEG = "streetwear, oversized t-shirt, graphic tee, baggy jeans, balloon trousers, tube socks, chunky sneakers, hoodie, teal clothing, green clothing, colours outside the BAE palette, yellow clothing, purple, red clothing, neon colours, more than one colour per outfit, muddy colours, stiff stock pose";
function lookRule(){ return S.look==="Bold"?LOOK_BOLD+(S.setting==="Studio"?"\nIn the studio, keep the bold wardrobe, low-angle wide camera and saturated grade; the backdrop may be a single seamless colour from the fresh BAE palette (teal, sky blue, blush or light stone) instead of plaster.":""):LOOK_CALM; }
function lookLine(){ return S.look==="Bold"?"Look lock: BOLD & COLOURFUL — refined old-money minimal wardrobe (tailored trousers, crisp shirts, fine knits, clean blazers, loafers or white leather sneakers; never streetwear), crisp white or ink-black layers over ONE fresh BAE colour piece per person (blush #F1C0B6, raspberry #B9516E, burgundy #A33755 or sky blue #4BBCDF), each person a different colour, never teal or green; bright clean light, confident energy, clean punchy grade.":"Look lock: ELEGANT & CALM — refined old-money tailored wardrobe ONLY in the warm, deep BAE palette (ink #19181E, slate #4F4E62, burgundy #A33755, raspberry #B9516E, dusty rose #F1C0B6, stone #CCC3B4, ecru #FFFAF4), never streetwear, never teal: a deep anchor piece, one tonal mid-tone, ecru or white as one layer only, one quiet accent; ordered and harmonious; never head-to-toe stone, beige or cream, never matching outfits; gentle angle and soft natural light."; }
const CLIENT_LINE = "Mandatory art direction: modern, contemporary, upscale setting; modern wardrobe that follows the look lock, with no orange clothing on anyone; no hijab, no headscarf, no traditional Arab clothing; professionally retouched skin with an even skin tone and subtle real texture; any phone is a modern iPhone 18 with no visible logo; modern Scandinavian IKEA-style decor.";
const CLIENT_NEG = "orange clothing, orange shirt, orange jacket, orange dress, orange sweater, rust clothing, terracotta clothing, coral clothing, hijab, headscarf, head covering, niqab, abaya, thobe, dishdasha, keffiyeh, shemagh, kaftan, traditional Arab clothing, old buildings, souk, old town, rustic, dated decor, ornate furniture, clutter, old phone, generic phone, visible logo, blemishes, uneven skin tone, acne, plastic skin, waxy skin";
/* Composition lock — always on */
const COMPOSITION_RULE = `COMPOSITION LOCK — MANDATORY: the person (main subject) is centred horizontally, standing or sitting on the vertical centre line of the frame, with balanced, near-symmetrical framing and equal space on the left and right. Never place the person on the left or right third. Eyes sit around the upper third; keep comfortable head room. Any copy space is distributed evenly around the centred subject (above, or equally on both sides).`;
const COMPOSITION_LINE = "Composition lock: the person (or the group, as one centred cluster) is centred in the middle of the frame on the vertical centre line, balanced symmetrical framing with equal space left and right; not on the left, not on the right.";
const COMPOSITION_NEG = "off-centre subject, subject on the left, subject on the right, rule-of-thirds placement, subject cropped at the edge";
/* Setting lock — Studio overrides any location in the brief */
/* A scene must tell its whole story: whoever the action involves is in the frame */
const STORY_RULE = `STORY LOCK: show everything the action needs so the moment reads instantly. Paying or buying → a cashier or sales associate across the counter (facing the customer, softly in focus, dressed in the same refined style) and the shop's products displayed neatly and minimally behind (folded garments, boxed goods on light-oak shelves). Ordering → a barista or waiter. Meeting or advice → the other person. Never an empty counter, empty shop or missing counterpart. The main subject stays centred; secondary people are smaller or softer.`;
const STORY_LINE = "Story lock: every person the action needs is in the frame (e.g. a cashier or sales associate across the counter when paying, with neatly displayed products), never an empty counter or empty shop; the main subject stays centred.";
const STUDIO_RULE = `SETTING LOCK — STUDIO (overrides any location named in the brief or seen in the references): photographed in a professional photo studio on a minimal, softly architectural BAE set — warm plaster or stone-toned seamless backdrop (light stone #ECE8DF, warm beige, soft terracotta), light oak modern furniture. The set is a clean, minimal STAGED VERSION of the brief's place so the story reads instantly: for shopping, a minimal boutique counter with a sales associate and a few neatly folded garments or boxed products on light-oak shelves; for a café, a minimal counter with a barista; for home, a sofa and side table. Every person the action needs is there. Soft directional key light from a large softbox that reads as clean natural window light, gentle fill, soft shadow. No real-world location: no café, no street, no shop, no outdoor or city background, no window views. Like the BAE studio references (woman in white shirt, man in brown cardigan at a desk, woman in cream turtleneck).`;
const STUDIO_LINE = "Setting lock: STUDIO. Shot in a professional studio on a minimal, softly architectural set with a warm plaster or stone-toned seamless backdrop and light oak modern furniture, dressed as a clean minimal staged version of the brief's place (e.g. a boutique counter with a sales associate and neatly displayed products) with every person the action needs; soft directional softbox key light that reads as clean natural window light. No real location, no café, no street, no outdoor or city background.";
const STUDIO_NEG = "outdoor, street, city background, window view, landscape, real-world location, empty set, missing cashier";
const LOCATION_LINE = "Setting lock: on location in a real, modern, upscale place in Amman.";
function settingRule(){ return S.setting==="Studio"?STUDIO_RULE:(S.look==="Bold"?`SETTING LOCK — ON-LOCATION: the real, modern, upscale place the brief names (in modern Amman), bright and clean; when outdoors, a bright open sky behind the subjects.`:`SETTING LOCK — ON-LOCATION: the real, modern, upscale place the brief names (modern Amman), with depth layers and foreground bokeh.`); }
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
  const out=await rlAsk(prompt,{modelTier:tier});
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
function oneImage(args){
  const KEYS=/^(num_?images|numImages|number_?of_?images|numberOfImages|count|n|quantity|variations|batch_?size|batchSize|samples|num_?outputs|numOutputs|images_?count)$/i;
  const copy=JSON.parse(JSON.stringify(args||{}));
  const visit=(o,d=0)=>{ if(!o||typeof o!=="object"||d>6) return; for(const k of Object.keys(o)){ if(KEYS.test(k)&&typeof o[k]==="number") o[k]=1; else if(o[k]&&typeof o[k]==="object"&&!/reference/i.test(k)) visit(o[k],d+1); } };
  visit(copy); return copy;
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
  $("mNanoName").textContent=S.mode==="icon"?`${S.gptName||"GPT 2.5"} · via Magnific`:(S.nanoName||"Nano Banana 2.1")+" · via Magnific";
}

/* ---------------- UI: brief, segs, upload, refs ---------------- */
const DEFAULT_BRIEF="Three young Jordanian friends laughing together on a rooftop terrace in modern Abdali, one showing the others her savings goal on her iPhone 18, bright afternoon sun and a clear blue sky behind them.";
try{ const saved=localStorage.getItem("bae_brief"); $("brief").value=saved&&!/Jabal Amman, morning light through the window|tailored (camel|cream) blazer checks her savings/.test(saved)?saved:DEFAULT_BRIEF; }catch{ $("brief").value=DEFAULT_BRIEF; }
$("brief").addEventListener("input",()=>{ if(S.mode!=="icon") try{ localStorage.setItem("bae_brief",$("brief").value);}catch{} countBrief();
  clearTimeout(S._castT); S._castT=setTimeout(()=>{ const before=S.picked.join(); syncCast(); if(S.picked.join()!==before) renderRefs(); },350); });
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
  const box=$("refs"); box.innerHTML=""; box.classList.toggle("chars",S.refTab==="ch");
  ALL_REFS.filter(r=>r.set===S.refTab).forEach(r=>{ const b=document.createElement("button"); b.type="button"; b.className="ref"; b.title=r.d; b.setAttribute("aria-label",r.d);
    const i=S.picked.indexOf(r.id); b.setAttribute("aria-pressed",i>=0?"true":"false"); if(i>=0) b.dataset.n=i+1;
    b.innerHTML=`<img src="${r.src}" alt="" loading="lazy">${r.studio?'<span class="tag">Studio</span>':r.set==="yt"?'<span class="tag">Youth</span>':r.set==="user"?'<span class="tag">Yours</span>':r.set==="ch"?`<span class="tag ch">${esc(charLabel(r.id))}</span>`:""}`;
    if(r.set==="ch"){ const w=document.createElement("div"); w.className="ch-card"; w.appendChild(b);
      const inp=document.createElement("input"); inp.type="text"; inp.className="ch-name"; inp.value=charName(r.id); inp.setAttribute("aria-label","Character name, add other spellings after a slash"); inp.spellcheck=false;
      inp.onchange=()=>{ const v=inp.value.trim(); if(v) CHAR_NAMES[r.id]=v; else delete CHAR_NAMES[r.id]; try{ localStorage.setItem(CHAR_KEY,JSON.stringify(CHAR_NAMES)); }catch{} syncCast(); renderRefs(); };
      w.appendChild(inp); b.onclick=()=>{ const j=S.picked.indexOf(r.id); if(j>=0){ S.picked.splice(j,1); S._autoCast=(S._autoCast||[]).filter(x=>x!==r.id); } else if(S.picked.length<MAX_REFS) S.picked.unshift(r.id); renderRefs(); };
      box.appendChild(w); return; }
    b.onclick=()=>{ const j=S.picked.indexOf(r.id); if(j>=0) S.picked.splice(j,1); else if(S.picked.length<MAX_REFS) S.picked.push(r.id); renderRefs(); };
    box.appendChild(b); });
  const nb=S.picked.filter(id=>refById(id)?.set==="bae").length;
  $("refCount").textContent=`${S.picked.length} / ${MAX_REFS} · ${nb} BAE`;
  /* selected strip: always visible, click to remove */
  const pk=$("picked"); pk.innerHTML="";
  if(!S.picked.length) pk.innerHTML='<span class="none">No references picked. Choose up to 6 below, or use Auto-pick.</span>';
  S.picked.forEach(id=>{ const r=refById(id); if(!r) return; const b=document.createElement("button"); b.type="button"; b.className="pk"; b.title="Remove: "+r.d; b.setAttribute("aria-label","Remove reference: "+r.d);
    b.innerHTML=`<img src="${r.src}" alt="">${isChar(id)?`<span class="pk-name">${esc(charLabel(id))}</span>`:""}`; b.onclick=()=>{ S.picked=S.picked.filter(x=>x!==id); S._autoCast=(S._autoCast||[]).filter(x=>x!==id); renderRefs(); }; pk.appendChild(b); });
}
function syncTabs(){ document.querySelectorAll("#refTabs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.tab===S.refTab?"true":"false"));
  $("addRefWrap").hidden=S.refTab!=="user";
  $("refHint").textContent=({
    ic:"BAE illustration set (guidelines p.101, light mode). Sent to GPT 2.5 as style direction only: material, translucency, gradient, angle and lighting.",
    user:"Your own reference photos, kept only on this device. Add licensed images that show the light, wardrobe or camera angle you want.",
    bae:"Photos from the Bank al Etihad guidelines. Picked frames go to Claude for style analysis and to Nano Banana 2.1 as references. Up to 6, from any set. Choosing Studio picks the BAE studio frames for you.",
    yt:"Youth campaign set: bold streetwear, low-angle wide camera, blue sky, hard sun and friends mid-laugh. Used for wardrobe, camera and energy; their logos and orange clothing are never copied.",
    mj:"Mari Juliano lifestyle set, for clean natural light and candid energy. Mix with the other sets, up to 6 in total.",
    ch:"Characters keep the same face in every image. Write a name in the brief (e.g. \"a young man like Wissam\") and that character is added automatically, or tap one to cast them. Rename under each photo; add other spellings after a slash."})[S.refTab]; }
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
Catalog:\n${ALL_REFS.filter(r=>r.set!=="ch"&&r.set!=="ic").map(r=>r.id+(r.studio?" [studio]":"")+": "+r.d).join("\n")}\nReply with only a JSON array of 4 ids, e.g. ["yt04","yt06","bae_b108_2","r061"].`,{modelTier:"quick"});
    if(Array.isArray(o)){ const cast=S.picked.filter(isChar); S.picked=[...cast,...o.map(String).filter(id=>refById(id)&&!isChar(id)&&!/^ic_/.test(id))].slice(0,MAX_REFS); renderRefs(); }
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

${STORY_RULE}

${settingRule()}

${lookRule()}

Brief (may be Arabic or English): "${$("brief").value}"
${castText()}
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

${STORY_RULE}

${settingRule()}

${lookRule()}

Scene breakdown: ${JSON.stringify(S.analysis||{brief:$("brief").value})}
Brief: "${$("brief").value}". Setting: ${S.setting}. Shot: ${S.shot}. Aspect ratio: ${aspectText()}. Output: native 4K, highest quality. Channel: ${$("channel").value}. Copy space for the gradient shape: ${$("copySpace").checked?"yes, keep calm, even space around the centred subject":"no"}.
Reference images (${S.picked.length}) will be attached. Character references carry identity (see CAST). The others are STYLE references; what they show is for YOUR understanding of the photography only — never describe or reuse that content in the prompt: ${S.picked.filter(id=>!isChar(id)).map(id=>`${refById(id)?.set==="bae"?"BAE guideline":refById(id)?.set==="yt"?"Youth campaign":"Mari Juliano"} — ${refById(id)?.d}`).join("; ")}
${castText()}${S.upload&&$("useUpAsRef").checked?"; plus the user's own image as the first reference for content":""}.

Requirements:
- Begin with exactly: "Professional photography, clean natural light."
- Photorealistic, 4K, real camera language (lens, aperture, angle), believable Jordanian people in modern places.
- Apply every point of the CLIENT ART DIRECTION explicitly in the prompt: modern upscale setting, modern elegant wardrobe, no hijab or traditional Arab clothing, professionally retouched even skin tone, iPhone 18 for any phone, modern IKEA-style decor.
- State the composition explicitly: the person centred on the vertical centre line, balanced framing, equal space left and right.
- ${S.setting==="Studio"?"STUDIO: describe the studio set, backdrop and softbox light explicitly; translate any location in the brief into one or two modern props on the set; no real location.":"ON-LOCATION: encode depth layers and foreground bokeh in a modern real place."}
- ${S.look==="Bold"?"LOOK BOLD & COLOURFUL: dress each person in refined old-money minimal style for THIS scene (tailored trousers, crisp shirts, fine knits, clean blazers or overshirts, loafers or white leather sneakers; never streetwear) and name every piece with its colour: crisp white or ink-black layers over ONE colour piece from blush, raspberry, burgundy or sky blue, a different colour for each person, never teal or green. Then camera, light and a confident, natural moment.":"LOOK ELEGANT & CALM: choose each person's outfit for THIS scene and name every piece with its colour, using ONLY the warm, deep BAE palette (ink, slate, burgundy, raspberry, dark teal, dusty rose, stone, ecru): a deep anchor, a tonal mid-tone, ecru or white as one layer, one quiet accent; people in the same frame take different colour families; never head-to-toe stone, beige or cream."}
- Encode selective focus with one focal anchor${S.look==="Bold"?" (faces sharp)":" and the BAE warm palette"}.
- REFERENCES ARE STYLE ONLY: you have seen them and understand their photography; carry over only camera height and angle, lens feel, depth of field, light quality, colour grade and the general kind of place. Invent a NEW scene: never write "same place/location/room/street as", "like the reference image", "recreate", "replicate" or anything that copies a reference's location, objects, people, poses, wardrobe or layout, and never describe what a reference shows. Wardrobe comes only from the look rules.
- No logos, text, signage, watermarks.
Format: one flowing descriptive paragraph that reads like a photographer's shot description, 130-200 words. Refer to the attached references only by their tags, in this order: ${refPlan().map(r=>r.tag).join(", ")||"none attached"}, and style tags ONLY inside style clauses, for example "camera height and lens feel as in @img2, light and colour grade as in @img3". Never use a style tag next to a place, person, object, outfit or layout. Character tags are the one exception: introduce each character once by name and tag, e.g. "Wissam (the man in @img1, same face, hair and build)", then describe his outfit from the look rules. The composition is set by this prompt (subject centred).
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
function castTags(){ try{ return refPlan().filter(r=>isChar(r.id)).map(r=>r.tag); }catch{ return []; } }
function stripLiteralRefs(p){
  const parts=String(p||"").split(/(?<=[.!?])\s+/);
  const keep=parts.filter(s=>{
    const refy=/@img\d|\breference(s| image| photo)?\b/i.test(s);
    if(!refy) return true;
    if(/\b(do not|don't|never|not|no)\b/i.test(s)) return true;
    if(castTags().some(t=>s.includes(t))||/\b(identity|same face)\b/i.test(s)&&!/\b(place|location|room|street|building)\b/i.test(s)) return true;
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
  t=t.replace(/\n*Story lock:[^\n]*/g,"")+"\n"+STORY_LINE;
  return t;
}

/* ---------------- STEP 3: generate ---------------- */
const MODELS={ nano:{el:"rNano",sel:"selNano",mode:"modeNano",prompt:"pNano",label:"Nano Banana 2.1"}, icon:{el:"rNano",sel:"selIcon",mode:"modeIcon",prompt:"pNano",label:"GPT 2.5"}, iconNano:{el:"rNano2",sel:"selNano",mode:"modeNano",prompt:"pNano",label:"Nano Banana 2.1"} };
const genKey=()=>S.mode==="icon"?"icon":"nano";
/* Icons render with GPT 2.5 only; photography with Nano Banana 2.1 */
const genKeys=()=>S.mode==="icon"?["icon"]:["nano"];
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
  ${isIconKey(key)&&o?.blob?`<div class="btns exports"><span class="t12 muted">Export PNG on Light Stone:</span>${[96,144,192,256,1024,"wide"].map(s=>`<button class="btn small" data-exp="${s}" title="${({96:"S · square, dashboards, tooltips",144:"M · square, spot, onboarding",192:"L · square, modals, marketing",256:"XL · square, hero moments",1024:"Square master",wide:"Full 16:9 frame"})[s]}">${({96:"S 96",144:"M 144",192:"L 192",256:"XL 256",1024:"1024",wide:"16:9 full"})[s]}</button>`).join("")}</div>`:""}
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
function idle(){ for(const k of genKeys()){ if(!cards[k]) cards[k]={}; if(!cards[k].steps) cards[k]={ph:S.mode==="icon"?`Your icon appears here on Light Stone, 16:9. Describe the icon above and press Create icon.`:"Your 4K image appears here. Write a brief above and press Create image.",steps:[]}; renderCard(k,cards[k]); } }
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
    ic:{role:"image",use:"BAE illustration style direction: translucent layered material, orange-to-burgundy gradient, soft rounded 3D forms, isometric angle and lighting"},
    ch:{role:"image",use:"character identity: "+charLabel(id)}
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
  const key=r=>r.ref||r.id; /* uploaded refs carry the BAE id in .ref and the Magnific id in .id */
  const chars=list.filter(r=>isChar(key(r))), style=list.filter(r=>!isChar(key(r))), tags=style.map(r=>r.tag).join(", ");
  const castLine=chars.length?`Character references (identity): ${chars.map(r=>`${r.tag} = ${charLabel(key(r))}`).join(", ")}. Keep each character's exact face, facial features, hairline and hairstyle, eye colour, skin tone and build so they are clearly the same person. Use ONLY their identity: ignore the clothing, grey backdrop, pose and three-panel sheet layout in those images; dress them by the look rules. `:"";
  return castLine+(!style.length?"":`Reference images (photographic style ONLY): ${tags}. Study them only for camera height and angle, lens and focal-length feel, depth of field, light direction and quality, colour grade, and the general kind of place (modern, open, architectural). Recreate NOTHING literal from them: not the location, building, walls, furniture, objects, people, faces, poses, clothing, clothing colours, composition or framing. The scene is a new, different place; content and composition come only from this prompt.`); }
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
async function waitFor(ids,label,loops=10,strict=false){
  let last=null;
  for(let i=0;i<loops;i++){
    const a=await buildArgs("creations_wait",`Wait until these creations finish (${label}). Use the longest wait the tool allows.`,{identifiers:ids});
    const r=await callMag("creations_wait",a.args);
    let rr=readResult(r);
    if(!rr.status&&!rr.urls.length&&!rr.images.length) rr=await extractWithClaude(r,"the status, identifiers and image urls of the creations");
    last=rr;
    if(FAIL.test(rr.status)) throw {code:"tool_error",message:"Magnific marked the creation as "+rr.status};
    if(DONE.test(rr.status)||(!(strict&&rr.status)&&(rr.urls.length||rr.images.length))) return rr;
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
  if($(m.prompt).value.trim()) $(m.prompt).value=$(m.prompt).value.replace(/\n*(Character references \(identity\)|Reference images)[^\n]*/g,"")+(refs.length?"\n"+refLine(refs):"");
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
      `Generate exactly 1 ${S.mode==="icon"?"3D icon illustration image, 16:9 widescreen, on a flat Light Stone #ECE8DF background,":"photorealistic image"} with model "${modelId||m.label}". Use the prompt verbatim.
Resolution: 4K. Use the exact 4K value from the model settings${P.res_4k?` ("${P.res_4k}")`:""}; if 4K is not offered, use the largest value${P.max_res?` ("${P.max_res}")`:""}.
Quality: the highest available${P.best_quality?` ("${P.best_quality}"${P.quality_param?` on "${P.quality_param}"`:""})`:""}.
${mode?`Mode: "${mode}"${modeParam?` on setting "${modeParam}"`:""}.`:"Mode: model default."}
Aspect ratio: ${typeof aspect==="string"?(aspect==="auto"?"auto (let the model choose)":aspect):`custom ${aspect.width}x${aspect.height} px`}.
Number of images: 1 (the page calls this tool once per image).
REFERENCES ARE REQUIRED: attach EVERY item in Data.references, in exactly this order, so the first becomes @img1, the second @img2 and so on (the prompt refers to them by those tags). Use the schema's reference field(s) with the uploaded creation identifiers (or URLs if the schema takes URLs). Put EVERY reference in the GENERAL image reference list (reference type "image", shown as @img1, @img2… in Magnific), keeping the order. NEVER use the "style" reference type/slot and NEVER the "character" or "product" slot: the style slot must stay empty/default because it changes the rendering type (photo vs illustration vs 3D). Each reference object carries the creation id in the field "identifier" (exactly that name). If the schema needs a type per reference, set it to "image". Do not drop any reference. Fill the negative prompt field if the schema has one. Turn off any prompt auto-enhancement so the brand prompt stays as written.`,
      {model:modelId, model_label:m.label, model_settings:opt.raw, prompt, negative_prompt:negativeNow(), composition:"person centred on the vertical centre line", setting:S.setting, aspect_ratio:aspect, resolution:P.res_4k||"4K", quality:P.best_quality||"high", mode, num_images:1, references:refs},"default");
    plan.args=oneImage(fixRefs(plan.args,refs));
    const asked4k=!!P.res_4k||/4k|3840|4096/i.test(JSON.stringify(plan.args));
    /* One image per Magnific call, all calls in parallel: models that ignore the count still give exactly N images,
       and each image has its own creation, preview and PNG link */
    c.outs=Array.from({length:count},()=>({id:null,url:null,img:null,blob:null,long:0,pending:true})); c.sel=0; c.webUrls=[]; up();
    let done=0;
    const genOne=async(slot)=>{
      const r=await callMag("images_generate",plan.args);
      let rr=readResult(r); if(!rr.ids.length&&!rr.urls.length&&!rr.images.length) rr=await extractWithClaude(r,"the creation identifier of the image being generated");
      const genId=rr.ids[0]||null; const web=rr.webUrl||rr.links.find(u=>/magnific\.com\/app\//i.test(u))||null;
      if(!rr.images.length&&!DONE.test(rr.status)){ if(!genId) throw {code:"tool_error",message:"Magnific didn't return a creation to wait for."}; rr=await waitFor([genId],"4K image generation"); }
      const o=c.outs[slot]; o.id=rr.ids[0]||genId; o.url=rr.urls[0]||null; o.webUrl=rr.webUrl||web; o._rr=rr;
      let shot=rr.images[0]||null, pw=0;
      if(!shot&&o.id){ const pv=await preview(o.id); shot=pv.image; o.url=o.url||pv.urls[0]||null; pw=Math.max(pv.w,pv.h); }
      if(shot){ o.img=`data:${shot.mime};base64,${shot.data}`; o.blob=b64Blob(shot.data,shot.mime); }
      /* Size: trust Magnific's reported dimensions, then the requested 4K, then the preview's own pixels */
      o.long=pw||Math.max(rr.w,rr.h)||(asked4k?(plan.expected_long_side_px||3840):0)||(o.img?await longSide(o.img):0)||plan.expected_long_side_px||0;
      if(rr.res4k||asked4k&&/4k/i.test(JSON.stringify(plan.args))) o.long=Math.max(o.long,3840);
      o.pending=false; done++; c.ph=`Rendering in Magnific… ${done} of ${count} ready`; up();
    };
    c.ph=`Rendering ${count} in Magnific…`; up();
    const res=await Promise.allSettled(c.outs.map((_,k)=>genOne(k)));
    const failed=res.filter(x=>x.status==="rejected");
    c.outs=c.outs.filter(o=>!o.pending&&(o.id||o.url||o.img));
    if(!c.outs.length) throw failed[0]?.reason||{code:"tool_error",message:"Magnific returned no image."};
    c.webUrls=c.outs.map(o=>o.webUrl).filter(Boolean);
    const n=c.outs.length;
    if(failed.length) c.refWarn=(c.refWarn?c.refWarn+" ":"")+`${failed.length} of ${count} images failed in Magnific: ${mcpCopy(failed[0].reason)}`;
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
    for(const o of c.outs){ await completeFiles(o,o._rr||{ids:[],urls:[],links:[],images:[]}); up(); }
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
  if(S.mode!=="icon"){ syncCast(); renderRefs(); }
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
    $(m.prompt).value=$(m.prompt).value.replace(/\n*(Character references \(identity\)|Reference images)[^\n]*/g,"")+(plan.length?"\n"+refLine(plan):"");
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
   locked to a 16:9 canvas on Light Stone #ECE8DF. */
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
Mode: light-mode treatment, built for a Light Stone #ECE8DF background.
Never: text, letters, numbers, logos or the BAE symbol (coin or card faces stay clean or carry a simple abstract emboss); overcrowding or decorative bits (sparkles, confetti, motion lines); mixing styles (no flat vector, line icon, cartoon or photo); illustration used as texture.`;
const ICON_LOCK="Material lock: glassmorphism + BAE gradient — at least one frosted, semi-transparent glass element (background blur, the gradient form behind showing through softly, thin light edge highlight, soft sheen) layered in front of at least one solid BAE gradient form (Orange #FA6428 to Burgundy #A33755, satin). Icon lock: one premium 3D icon in the Bank al Etihad illustration style, centred and isolated on a flat, even Light Stone #ECE8DF background (a warm, very light greige) that fills the entire 16:9 widescreen canvas edge to edge; no floor or ground plane, no cast shadow on the background, no backdrop gradient, no vignette, no frame or border; the icon sits in the exact centre and fills about 60–70% of the canvas HEIGHT, with even background space above and below and wide, equal space left and right; light-mode treatment; only Burgundy, Medium Burgundy, Light Burgundy, Orange, Dark Orange, Soft Orange and Light Orange; no text, letters, numbers or logos.";
const ICON_NEG="crystal-clear glass, chrome, mirror reflections, hard refraction, rainbow caustics, coloured glass outside the palette, opaque glass, all-glass icon with no gradient form, all-solid icon with no glass, pure white background, cool grey background, dark background, coloured background, gradient background, textured background, floor, ground plane, cast shadow on background, drop shadow, vignette, frame, border, text, letters, numbers, logo, watermark, brand symbol, photograph, people's faces, flat 2D vector, line icon, outline icon, clip art, cartoon, emoji, sticker, blue, green, purple, teal, yellow gold, chrome metal, clutter, multiple separate icons, sparkles, confetti, motion lines";
function enforceIcon(p){
  let t=String(p||"").trim().replace(/\n*Material lock:[^\n]*/g,"").replace(/\n*Icon lock:[^\n]*/g,"").replace(/\n*Reference images[^\n]*/g,"");
  t=t.replace(/square 1:1/gi,"16:9 widescreen");
  if(!/^premium 3d/i.test(t)) t="Premium 3D glassmorphism brand icon illustration, 16:9 widescreen, centred and isolated on a flat Light Stone #ECE8DF background. "+t;
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
    const o=await sample.json(`Write one production prompt for GPT 2.5 to render this Bank al Etihad icon in a 16:9 widescreen frame (icon centred, wide even Light Stone space left and right).
${ICON_RULES}

Icon concept: ${JSON.stringify(S.analysis||{request:$("brief").value})}
References attached, in order: ${refPlan().map(r=>`${r.tag} (${r.use})`).join("; ")||"none"}. Mention them only as style direction for material, gradient, translucency, softness, angle and lighting, e.g. "material and gradient like @img1"; never ask to copy their objects or composition.
Requirements: start with "Premium 3D glassmorphism brand icon illustration"; describe the main object and supporting elements precisely (shapes; which element is frosted glassmorphism glass — semi-transparent, background blur, the gradient form behind showing through softly, thin light edge highlight, soft sheen — and which is solid BAE gradient, Orange #FA6428 into Burgundy #A33755; glass layered in front of the gradient; for a card stack: exactly three cards, top one glass, middle and bottom BAE gradient; soft rounded edges, isometric three-quarter view, soft even studio light with gentle inner glow); centred with generous margin; flat, even Light Stone #ECE8DF background filling the whole 16:9 canvas edge to edge, no floor, no shadow on the background; palette colours by name and hex; no text, numbers or logos. 90-150 words, one paragraph.
Also return a checklist of 6 short labels about BAE illustration rules with status "pass" or "note".
Reply with only JSON: {"prompt_icon":"","checklist":[{"label":"","status":"pass"}]}`);
    $("pNano").value=enforceIcon(o.prompt_icon||"");
    $("checks").innerHTML=(o.checklist||[]).map(c=>`<span class="check ${c.status==="pass"?"":"note"}">${c.status==="pass"?"✓":"!"} ${esc(c.label)}</span>`).join("");
    stage(2,"done"); flash($("s2state"),"Ready. Edit freely, then generate.");
  }catch(e){ stage(2); flash($("s2state"),sampleCopy(e),true); }
  finally{ $("btnPrompt").disabled=!sample; syncButtons(); }
}
/* Background lock: flood-fill from the edges so the background is exactly Light Stone #ECE8DF.
   The reference colour is the median of the frame's edge pixels (the model may render white or stone),
   so light tones inside the icon that don't touch the edge stay as they are. */
const STONE=[236,232,223];
async function whitenOut(o){
  if(!o?.img) return;
  try{
    const bmp=await createImageBitmap(await (await fetch(o.img)).blob());
    const W=bmp.width,H=bmp.height; const c=document.createElement("canvas"); c.width=W; c.height=H; const x=c.getContext("2d"); x.drawImage(bmp,0,0);
    const d=x.getImageData(0,0,W,H), p=d.data, seen=new Uint8Array(W*H), st=new Int32Array(W*H*2); let sp=0;
    const edge=[]; for(let X=0;X<W;X+=4){ edge.push(X,(H-1)*W+X); } for(let Y=0;Y<H;Y+=4){ edge.push(Y*W,Y*W+W-1); }
    const med=k=>{ const v=edge.map(i=>p[i*4+k]).sort((m,n)=>m-n); return v[v.length>>1]; };
    let R=med(0),G=med(1),B=med(2);
    if(Math.min(R,G,B)<190||Math.max(R,G,B)-Math.min(R,G,B)>34){ R=STONE[0]; G=STONE[1]; B=STONE[2]; } /* edges aren't a light background: fall back to stone */
    const near=i=>{ const r=p[i*4],g=p[i*4+1],b=p[i*4+2]; return Math.abs(r-R)<18&&Math.abs(g-G)<18&&Math.abs(b-B)<18; };
    for(let X=0;X<W;X++){ st[sp++]=X; st[sp++]=(H-1)*W+X; } for(let Y=0;Y<H;Y++){ st[sp++]=Y*W; st[sp++]=Y*W+W-1; }
    let changed=0;
    while(sp){ const i=st[--sp]; if(seen[i]) continue; seen[i]=1; if(!near(i)) continue; p[i*4]=STONE[0]; p[i*4+1]=STONE[1]; p[i*4+2]=STONE[2]; p[i*4+3]=255; changed++;
      const X=i%W; if(X>0) st[sp++]=i-1; if(X<W-1) st[sp++]=i+1; if(i>=W) st[sp++]=i-W; if(i<W*(H-1)) st[sp++]=i+W; }
    x.putImageData(d,0,0);
    const blob=await new Promise(r=>c.toBlob(r,"image/png")); o.blob=blob; o.img=URL.createObjectURL(blob); o.whitened=Math.round(changed/(W*H)*100);
    log("·","Light Stone background locked",{size:`${W}×${H}`,background_pixels:o.whitened+"%"});
  }catch(e){ log("✕","background lock skipped",{message:String(e?.message||e)}); }
}
/* Exports at the BAE illustration sizes (S 96 · M 144 · L 192 · XL 256), on Light Stone */
/* Square exports trim the 16:9 frame to the icon itself and keep a 1X exclusion margin (1/10 per side, 10×10 grid) */
function iconBox(bmp){
  const W=bmp.width,H=bmp.height,k=Math.min(1,800/Math.max(W,H)),w=Math.round(W*k),h=Math.round(H*k);
  const c=document.createElement("canvas"); c.width=w; c.height=h; const x=c.getContext("2d"); x.drawImage(bmp,0,0,w,h);
  const p=x.getImageData(0,0,w,h).data; let x0=w,y0=h,x1=-1,y1=-1;
  for(let y=0;y<h;y++) for(let X=0;X<w;X++){ const i=(y*w+X)*4; if(Math.abs(p[i]-STONE[0])>10||Math.abs(p[i+1]-STONE[1])>10||Math.abs(p[i+2]-STONE[2])>10){ if(X<x0)x0=X; if(X>x1)x1=X; if(y<y0)y0=y; if(y>y1)y1=y; } }
  if(x1<0) return {x:0,y:0,w:W,h:H};
  return {x:x0/k,y:y0/k,w:(x1-x0+1)/k,h:(y1-y0+1)/k};
}
async function exportIcon(o,size,modelLabel){
  try{
    const bmp=await createImageBitmap(o.blob); const wide=size==="wide";
    const c=document.createElement("canvas"); if(wide){ c.width=bmp.width; c.height=bmp.height; } else c.width=c.height=size; const x=c.getContext("2d");
    x.fillStyle="#ECE8DF"; x.fillRect(0,0,c.width,c.height); x.imageSmoothingQuality="high";
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
  $("heroLede").textContent=icon?"Describe the icon. Claude designs it in the BAE illustration system (glassmorphism over the orange-to-burgundy gradient, one focal point), and GPT 2.5 renders it in 16:9 on a Light Stone background.":"Write what the photo should show. Claude reads it against the BAE photography rules and your references, writes the prompt, and Nano Banana 2.1 renders it in 4K.";
  if(!S.web) $("heroSub").textContent=icon?"GPT 2.5 · 16:9 · Light Stone background · via Magnific":"Nano Banana 2.1 · native 4K · via Magnific";
  $("briefLbl").textContent=icon?"Icon idea":"Brief";
  $("btnCreate").textContent=icon?"Create icon":"Create image";
  $("presets").innerHTML=(icon?ICON_PRESETS:PHOTO_PRESETS).map(([l,b])=>`<button type="button" data-b="${esc(b)}">${esc(l)}</button>`).join("");
  if(!S.web) $("mNanoName").textContent=icon?`${S.gptName||"GPT 2.5"} · via Magnific`:(S.nanoName||"Nano Banana 2.1")+" · via Magnific";
  $("results").classList.add("one"); $("rNano2").hidden=true;
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
    {el:()=>$("modeSeg"), t:"Choose what to make", p:()=>"Photography makes 4K photos. Icons makes 3D BAE icons on Light Stone. You can switch any time."},
    {el:()=>$("briefCard"), t:()=>icon()?"Describe the icon":"Describe the photo", p:()=>icon()?"Write the idea in a sentence, in Arabic or English, or tap an example like Cards stack.":"Write what the photo should show, in Arabic or English, or tap an example to start from."},
    {el:()=>$("optCard"), t:"Pick a few options", p:()=>icon()?"Icons are already locked to 16:9 on Light Stone with glassmorphism and the BAE gradient. Just choose how many.":"Choose the look, setting, shot and size. Wardrobe, light, iPhone 18 and the centred subject are already locked to the BAE rules."},
    {el:()=>$("refCard"), t:"References are ready", p:()=>"We pick BAE images that guide the camera and style, never the layout. Press Browse all to change them."},
    {el:()=>$("btnCreate"), t:()=>icon()?"Create the icon":"Create the image", p:()=>icon()?"One press: Claude designs the icon and GPT 2.5 renders it. It takes a minute or two.":"One press: Claude reads the brief, writes the prompt, and Nano Banana 2.1 renders it in 4K. It takes a minute or two."},
    {el:()=>$("s3"), t:"Download it", p:()=>icon()?"Your icon appears here. Download the 16:9 PNG or the square S, M, L and XL sizes.":"Your image appears here. Download the 4K PNG, open it in Magnific, or create another."},
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

/* =====================================================================
   REELS PRODUCTION — projects library · stage workspace · Seedance 2.5 · Magnific Spaces
   ===================================================================== */
const RL_STAGES=[["idea","Idea"],["script","Script"],["characters","Cast"],["locations","Locations"],["directing","Shots"],["render","Deliver"]];
const RL_METHOD=`PRODUCTION METHOD (follow it exactly):
1. IDEA — 3 distinct concepts built to go viral as short-form reels: a scroll-stopping HOOK in the first 1–2 seconds (visual surprise, relatable pain, pattern break), ONE clear emotion, a simple turn, the product moment as the payoff (never a lecture), and a loop-able or punchy ending + BAE end card. Cinematic production value. Each: title, hook, logline, beats, why it will travel, product moment.
2. SCRIPT — scene by scene with timecodes summing to the target length: action, dialogue (who, language, exact line), on-screen text, sound. Short lines; dialogue sparse and natural.
3. CHARACTERS — assets come first. One THREE-PANEL character sheet per character, ALWAYS on a plain gray clean background: (1) head-and-shoulders portrait, the ONLY head on the sheet; (2) neck-to-shoes FRONT view with no head; (3) neck-to-shoes BACK view with no head. Follow the CHARACTER SHEET template in the brain exactly, filling every bracket with specific detail (age, face, eyes, gaze, hair, build, every garment with colour, fabric, fit and wear, shoes; matte pore-level skin; giant-softbox light; 50mm portrait, 85mm body).
4. LOCATIONS & PROPS — each location is an EMPTY establishing plate (no people) with its layout written with positions (left/right/back wall, doors with hinge and opening direction, windows, furniture); it is a STYLE reference for textures and light, never a fixed frame. Each prop is a PRODUCT SHEET of ONE object shown twice (front three-quarter and back three-quarter, ~45° and slightly above), ALWAYS on a plain gray clean background, with its physical state and what it must NOT be confused with. Follow the LOCATION and PROP SHEET templates.
5. DIRECTING — first a FILM LOOK shared by every scene (written once, reused verbatim so the reel reads as one film): format and aspect, film stock look, lens character, grade with a colour split (dominant 60% / secondary 30% / accent 10%) and white balance in K, 24 fps and 180° shutter, pore-level matte skin, "photorealistic — no 3D render, no game engine", global constraints (NO FADE, no slow motion unless written, nobody looks into the camera, no text/logos/watermark), audio policy (SFX and dialogue only, no music, no subtitles). Then one Seedance 2.5 prompt per scene (4–15 s) written in the SCENE PROMPT FORMAT of the brain: opener, SECTION + location, first-frame blocking of every person, SHOT n (a–b s) with mm + FOV°, one named move with distance and speed, framing limits, camera height and position, ACTING micro-detail and what not to do, per-second ACTION timeline for continuous takes, framing guarantees (HEAD PRIORITY), props state, RULES, sound. Refer to every element by its HANDLE (@char_…, @loc_…, @prop_…). Do NOT write a REFERENCES block or the film look inside scenes: the studio adds both automatically when it renders.
   BLOCKING BLUEPRINT FIRST: before writing any scene, decide its geography like a director and script supervisor: the zones (INTERIOR/EXTERIOR, behind/in front of a counter, inside/outside a car), which zone every person is in, doors (hinge, opening direction), where the camera stands for each shot and which way it looks (lens as FOV°), the axis of action (180° rule), the motivated light source and the time of day, the exact head-count and the props in each hand. Then write the prompts FROM the blueprint and state the geography explicitly in words (e.g. "Sara @img1 is INSIDE the apartment hallway; Lina @img2 stands OUTSIDE on the landing; the door opens inward; the camera is inside, behind Sara's right shoulder"). Never leave the AI to guess where anyone is.
   FIRST FRAME: every scene also gets a still-image prompt for its exact first frame (same shot size, lens, blocking, wardrobe, light and grade as Shot 1, photoreal, BAE look). It is generated first as an image with the tagged references, then Seedance animates the video FROM that frame (image-to-video), so faces, place and light are locked before motion.
6. RENDER — each scene renders separately in Seedance 2.5: start frame + references attached in tag order.`;
/* House templates (the team can override them in the brain's "templates" section) */
const RL_TPL={"char": "Three-panel cinematic character sheet, one horizontal 16:9 image on a PLAIN GRAY CLEAN BACKGROUND — a seamless flat matte mid-grey studio backdrop (neutral grey, no gradient, no floor line, no texture, no shadows on the backdrop), soft even diffused studio light, neutral white balance. Three panels side by side at identical scale: (1) LEFT — a large head-and-shoulders PORTRAIT including the entire head, hair [and headwear] and face, looking into camera — the ONLY face and the ONLY head on the sheet; (2) MIDDLE — full-body FRONT view of the wardrobe from the BASE OF THE NECK to the SHOES: the top edge of the panel cuts through the base of the neck, the head and hair lie above the border and are NOT shown; the panel starts at the collar, the neck-to-toe figure fills the whole panel height, shoes fully visible with a few centimetres of grey below them; (3) RIGHT — full-body BACK view framed exactly the same way, top edge at the base of the neck, no head, same scale, both shoes visible. HARD RULE: panels 2 and 3 contain NO head, NO face, NO hair — only the neck stump at the top border, collar, shoulders, torso, arms, legs and shoes; do not draw a smaller head inside them; this is a framing crop of a complete healthy body. Identical wardrobe, light and scale in panels 2 and 3. No captions, labels, panel borders, text or watermark.\nTHE PERSON: an original Jordanian [man/woman] exactly [age] years old, [occupation / place in the story] — [essence: e.g. a characterful working man with quiet dignity, warm, likable, trustworthy]. Face: [shape], [complexion], [cheekbones], [nose with one natural irregularity], [lips], [facial hair if any], [hair: colour, length, texture, how it falls]. Eyes: [colour, size, lashes], [gaze: calm, attentive…], [brows], [mouth: closed, faintest hint of a smile]. Clearly [age], [skin age detail]. Build: [build], upright balanced posture, relaxed empty hands at the sides.\nWARDROBE, identical in every view: [garment 1 — colour from the BAE palette, fabric, fit, wear and age]; [garment 2 …]; [trousers/skirt: cut, length, fabric]; [belt]; [shoes: material, colour, wear]. No jewellery [unless written], no bag, no props, no logos, no lettering. (BAE: refined old-money minimal; never orange, never teal, never streetwear; no hijab unless the brief asks.)\nSKIN AND TEXTURE: realistic natural skin with visible fine pores, faint expression lines at the eyes, subtle natural tone variation, lightly retouched even tone but never smoothed, completely matte — no wet shine, no specular highlights, no glare, no beauty filter, no plastic or waxy look. Tactile real cotton, wool and leather; everyday authenticity, not costume styling. Extremely soft diffused wraparound light like a giant overcast softbox, shadowless, no rim light, no hard shadows. Muted palette of [wardrobe colours] and warm skin against the grey; eye-level 50mm lens for the portrait, 85mm for the body views; subtle natural film grain, calm intimate documentary mood, photoreal cinematic realism. One original character shown in three views only, no other people, no cropped feet.", "prop": "Product asset sheet of ONE [object] — the SAME single object shown twice from two genuinely different angles — on a PLAIN GRAY CLEAN BACKGROUND — a flat even mid-grey studio backdrop with no gradient, no texture and no props, soft even studio light, only a faint soft contact shadow under it. [PHYSICAL STATE: what it is, its real volume, whether it stands/lies/is empty or hollow; what it is NOT attached to — no hand, no body, no stand, no mannequin.]\nVIEW 1 (left half of the sheet): FRONT THREE-QUARTER view, the camera about 45 degrees off the front axis and slightly above — [what this angle shows: the key front feature clearly on the near-front, the side wall turning away, a glimpse of the top].\nVIEW 2 (right half of the sheet): BACK THREE-QUARTER view of the same object, camera about 45 degrees off the back axis and slightly above — [what this angle shows: the back, openings, the front feature hidden or only at the far edge].\nBoth views identical in scale, height, lighting and colour; nothing is flat or frontal, every edge shows the object's real volume.\nAPPEARANCE — stay as close as possible to a real [object]: [materials, colours, textures, finishes, seams, edges, proportions, small details]. NOT [the things the model could confuse it with: e.g. not a rolled bandage, not a rigid brace, not a flat cut-out] — no logos, no text, no watermark. Photographic realism, catalogue clarity.\n(Phones: a modern iPhone 18 with no visible logo; screen off or a soft clean glow with no readable text.)", "loc": "[Place in modern Amman, specific: e.g. the entrance hall of a modern Abdoun apartment], completely EMPTY — no people, no animals, no text, no logos — [time of day], [motivated light: source, direction, colour temperature in K, how it falls], [layout with positions: what is on the left wall, the right wall, the back wall; doors with hinge side and opening direction; windows; key furniture and props in place], [materials and textures: light oak, white plaster, stone…], [grade: warm neutral, BAE]. Wide establishing frame at eye level, 24mm (74°), anamorphic lens character, shallow depth of field, fine film grain, photoreal, no 3D render.\nUse: the location image is a STYLE reference for architecture, textures and light, never a fixed frame.\nPOSITION MAP (when positions matter): generate \"High angle top-down wide shot of the location @loc, empty, same light\" with numbered circles where people stand; attach it as a reference that defines positions only.", "scene": "Write every scene prompt as continuous precise prose (no markdown, no bullet lists), in this order:\n1. OPENER — \"Cinematic [N]-second sequence in [K] SECTION(S), [M] shots, hard cut between shots/sections, realistic, no overacting.\" + global rules for this scene (\"Nobody ever looks into the camera.\").\n2. SECTION \"[name]\" — [@loc_handle] (shots a–b, t1–t2 s): place, time, light (source, direction, K), grade. The location is a style reference.\n3. BLOCKING at the first frame, for every person: exact pose (standing / leaning back on the edge of X / sitting on the RIGHT end of the sofa, on the edge of the seat), what supports the body, hands (which hand, where, holding what, thumbs hooked…), gaze (eyes on the floor / on the sleeve, unfocused), body angle, what is on their left and right, how the light hits them, INSIDE/OUTSIDE. Say who appears ONLY in which shot.\n4. SHOT n (a–b s): lens in mm with FOV (35mm, 54°), STATIC or ONE named move with distance and speed (\"smooth steady DOLLY IN for the whole shot, closing about a quarter of the distance\"); framing limits (\"from just above his head to his hips\"); camera height in cm and position relative to the subject (\"high above his head, tilted down, to his front-right, so we see the right side of his face in three-quarter view\"); what the background shows because of that angle; ACTING in micro-detail (eyes, jaw, lips, breath) and what NOT to do (no frown, no tears, no sigh, no movement); who is NOT in the shot. \"HARD CUT.\" before the next shot.\n5. CONTINUOUS TAKE: an ACTION timeline per second (\"8–9s — ONE MOVEMENT: …; 9–10s — …; 10–12s — …\"), one action per range, physical detail (weight, fabric stretch, skin, effort, breath).\n6. FRAMING GUARANTEES where AI fails: \"HEAD PRIORITY: the head stays complete with headroom in every frame\"; hands and the key prop fully in frame; the camera stops at a stated distance and never overshoots.\n7. PROPS: state at the first frame, which hand or limb, how it moves, what it never does (\"never taken off\", \"never changes hands\").\n8. RULES: no other people, no pets, no text, no logos, no watermark; the place, light and grade exactly as the location; left/right specifics; no slow motion and no speed changes unless written; no cuts inside a continuous take.\n9. Sound per section: room tone, specific SFX with timing, dialogue (who, language, delivery, the exact line), \"No music, no subtitles\" (music is added in the edit).\nUse element handles exactly (@char_sara, @loc_hall, @prop_phone). Do NOT write a REFERENCES block or the film look — the studio adds them automatically."};
const rlTpl=k=>(BR?.sections?.find(s=>s.id==="templates")?.[k])||RL_TPL[k];
const RL_ADV={"trend": {"name": "Trend Scout", "icon": "↗", "role": "Finds what is travelling right now: formats, hooks, sounds, memes and talking points in Jordan, the Arab world and global reels.", "order": 1}, "story": {"name": "Story Doctor", "icon": "✎", "role": "Guards the insight and the story: one human truth, a clear turn, a payoff that earns the brand.", "order": 2}, "dp": {"name": "Director of Photography", "icon": "◉", "role": "Camera, lens, light and composition that look expensive and stay readable to the AI.", "order": 3}, "performance": {"name": "Performance Coach", "icon": "☺", "role": "Acting, casting and wardrobe truth: performances that feel real, never 'ad acting'.", "order": 4}, "tech": {"name": "Seedance Technician", "icon": "⚙", "role": "Prompt engineering for Seedance 2.5 and Nano Banana: references, constraints and the failure modes that waste credits.", "order": 5}};
const rlAdv=id=>({...(RL_ADV[id]||{name:id,icon:"•",role:""}),...((BR?.advisors||[]).find(x=>x.id===id)||{})});
const RL_BAE=`BANK AL ETIHAD HOUSE STYLE (non-negotiable in every image and video prompt):
- Cinematic, warm, premium, human. Clean natural light (golden hour, window light, soft daylight), warm neutral grade with orange and burgundy accents, fine grain, gentle halation. Never cold, never neon.
- Modern Jordan only: today's Amman (Abdali, new towers, sleek cafés, modern homes and offices, modern malls). Modern Scandinavian IKEA-style interiors: light oak, white walls, clean lines.
- People: modern, contemporary, refined "old money" minimal wardrobe for every age (tailored trousers, crisp shirts, fine knits, clean blazers, loafers or white leather sneakers), colours only from the BAE palette (ink #19181E, white, light stone #ECE8DF, ecru #FFFAF4, stone #CCC3B4, burgundy #A33755, raspberry #B9516E, blush #F1C0B6, sky blue #4BBCDF). NEVER orange clothing, never teal, never streetwear. No hijab, no headscarf, no traditional Arab clothing.
- Skin: natural texture with visible pores, professionally retouched even tone, soft glow, never plastic.
- Phones are always a modern iPhone 18 with no visible logo. No brand logos, no readable text in the scene except 【on-screen text】 written in the script.
- End every reel on a clean BAE end card moment (soft light stone or BAE gradient background) — the logo itself is added in the edit, never generated.`;
let RL=null, rlBusy=false, rlPending=[];
const rlStageIx=k=>RL_STAGES.findIndex(([x])=>x===k);
const RL_DEF_SET={length:30,aspect:"9:16",lang:"Jordanian Arabic",res:"720p"};
const rlNew=()=>({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),kind:"reel",title:"Untitled reel",stage:"idea",view:"idea",chat:[],notes:"",ideas:[],ideasPrev:[],picked:null,script:null,characters:[],locations:[],scenes:[],final:null,space:null,settings:{...RL_DEF_SET},nextTag:1,createdAt:Date.now(),updatedAt:Date.now()});
const rlSet=()=>({...RL_DEF_SET,...(RL?.settings||{})});
const rlEls=()=>[...RL.characters,...RL.locations];
const RL_TOK=/@img\d+|@(?:char|loc|prop)_[A-Za-z0-9_]+/g;
const rlElByTag=t=>{ if(!t) return null; const s=String(t).toLowerCase(); return rlEls().find(e=>e.tag===t||(e.handle&&e.handle.toLowerCase()===s)); };
const rlTokens=txt=>String(txt||"").match(RL_TOK)||[];
function rlSlug(s){ return String(s||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"").slice(0,24); }
/* readable handles (@char_sara, @loc_hall, @prop_phone), unique inside a project */
function rlEnsureHandles(p){
  const all=[...(p.characters||[]).map(e=>[e,"char"]),...(p.locations||[]).map(e=>[e,e.kind==="prop"?"prop":"loc"])], used=new Set();
  for(const [e] of all) if(e.handle&&/^@(char|loc|prop)_[a-z0-9_]+$/i.test(e.handle)&&!used.has(e.handle.toLowerCase())) used.add(e.handle.toLowerCase()); else e.handle=null;
  for(const [e,pre] of all){ if(e.handle) continue; const base="@"+pre+"_"+(rlSlug(e.lib||e.name)||String(e.tag||"x").replace("@","")); let h=base,i=2; while(used.has(h.toLowerCase())) h=base+"_"+(i++); e.handle=h; used.add(h.toLowerCase()); }
}
const rlLabel=e=>e?(e.handle||e.tag):"";
const rlAr=()=>RL.chat.some(m=>m.role==="u"&&/[؀-ۿ]/.test(m.text||""));
async function rlThumb(src,max=480){ try{ const im=new Image(); im.src=src; await im.decode(); const k=Math.min(1,max/Math.max(im.width,im.height)); const c=document.createElement("canvas"); c.width=Math.round(im.width*k); c.height=Math.round(im.height*k); c.getContext("2d").drawImage(im,0,0,c.width,c.height); return c.toDataURL("image/jpeg",.78); }catch{ return null; } }
function rlAgo(t){ if(!t) return ""; const s=Math.max(1,Math.round((Date.now()-t)/1000)); if(s<60) return "just now"; const m=Math.round(s/60); if(m<60) return m+" min ago"; const h=Math.round(m/60); if(h<24) return h+" h ago"; const d=Math.round(h/24); return d<7?d+" d ago":new Date(t).toLocaleDateString(); }

/* ---------- storage: your account (db, private to you) with this browser as a mirror ---------- */
const RLS={db:null,uid:null,mode:"local",ready:null};
const RL_IDX="bae_reels_v3_index", RL_P="bae_reels_v3_p_", RL_T="bae_rlt_";
const lsGet=(k,d)=>{ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch{ return d; } };
const lsSet=(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); return true; }catch{ return false; } };
function rlStoreInit(){
  if(RLS.ready) return RLS.ready;
  RLS.ready=(async()=>{
    try{ const C=window.claude; if(C?.use){ const [db,user]=await Promise.all([C.use("db"),C.use("user")]); const uid=user?await user.id():null; if(db&&uid){ RLS.db=db; RLS.uid=uid; RLS.mode="account"; } } }catch{}
    /* the single project of the first version becomes the first saved project */
    const old=lsGet("bae_reels_v1",null);
    if(old&&old.chat&&(old.chat.length||old.scenes?.length)){ const p={...rlNew(),...old,id:old.id||rlNew().id,kind:"reel",view:old.stage||"idea"}; rlUpgrade(p); RL=p; await rlFlush(); RL=null; try{ localStorage.removeItem("bae_reels_v1"); }catch{} }
  })();
  return RLS.ready;
}
const rlCol=()=>RLS.db.collection("data/users/"+RLS.uid);
const rlDocId=id=>"reel_"+String(id).replace(/[^A-Za-z0-9_-]/g,"");
function rlClean(p){ const o=JSON.parse(JSON.stringify(p,(k,v)=>(k.startsWith("_")||k==="thumbs"||k==="thumb")?undefined:v)); o.chat=(o.chat||[]).slice(-80); o.kind="reel"; return o; }
function rlCover(p){ const f=(p.scenes||[]).find(s=>s.frame?.id); if(f) return f.frame.id; const e=[...(p.characters||[]),...(p.locations||[])].find(x=>x.id&&!x.lib); if(e) return e.id; const l=(p.characters||[]).find(x=>x.lib); return l?"lib:ch_"+String(l.lib).toLowerCase():null; }
const rlMeta=p=>({id:p.id,title:p.title||"Untitled reel",stage:p.stage||"idea",updatedAt:p.updatedAt||0,createdAt:p.createdAt||0,cover:rlCover(p),n:{cast:(p.characters||[]).length,loc:(p.locations||[]).length,shots:(p.scenes||[]).length,done:(p.scenes||[]).filter(s=>s.status==="done").length}});
async function rlList(){
  await rlStoreInit();
  let list=[];
  if(RLS.mode==="account"){ try{ const snap=await rlCol().where("kind","==","reel").get(); list=snap.docs.map(d=>d.data()).filter(Boolean).map(rlMeta); }catch(e){ log("✕","reels list",{code:e?.code}); } }
  const m=new Map(); for(const x of [...lsGet(RL_IDX,[]),...list]){ const o=m.get(x.id); if(!o||(x.updatedAt||0)>=(o.updatedAt||0)) m.set(x.id,x); }
  return [...m.values()].filter(x=>!lsGet("bae_reels_v3_del",[]).includes(x.id)).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
}
async function rlLoadProject(id){
  await rlStoreInit(); let p=null;
  if(RLS.mode==="account"){ try{ const s=await rlCol().doc(rlDocId(id)).get(); if(s.exists) p=JSON.parse(JSON.stringify(s.data())); }catch{} }
  const lp=lsGet(RL_P+id,null); if(lp&&(!p||(lp.updatedAt||0)>(p.updatedAt||0))) p=lp;
  if(p) rlUpgrade(p); return p;
}
function rlUpgrade(p){
  p.settings={...RL_DEF_SET,...(p.settings||{})}; p.ideas=p.ideas||[]; p.ideasPrev=p.ideasPrev||[]; p.characters=p.characters||[]; p.locations=p.locations||[]; p.scenes=p.scenes||[]; p.chat=p.chat||[];
  if(p.picked==null&&p.pickedIdea!=null&&p.ideas[p.pickedIdea]) p.picked=p.ideas[p.pickedIdea]; delete p.pickedIdea;
  /* tags are permanent: an element keeps its @img number for the life of the project */
  let n=0; for(const e of [...p.characters,...p.locations]){ const k=+String(e.tag||"").replace("@img","")||0; n=Math.max(n,k); }
  p.nextTag=Math.max(p.nextTag||1,n+1);
  for(const e of [...p.characters,...p.locations]) if(!e.tag) e.tag="@img"+(p.nextTag++);
  rlEnsureHandles(p);
  if(!p.view) p.view=p.stage||"idea";
}
let rlSaveT=null, rlChain=Promise.resolve();
function rlSave(){ if(!RL) return; RL.updatedAt=Date.now(); rlSavedState("saving"); clearTimeout(rlSaveT); rlSaveT=setTimeout(rlFlush,600); }
async function rlFlush(){
  if(!RL) return; const body=rlClean(RL);
  const okLocal=lsSet(RL_P+body.id,body);
  const idx=lsGet(RL_IDX,[]).filter(x=>x.id!==body.id); idx.unshift(rlMeta(body)); lsSet(RL_IDX,idx.slice(0,80));
  if(RLS.mode!=="account"){ rlSavedState(okLocal?"local":"fail"); return; }
  rlChain=rlChain.then(()=>rlCol().doc(rlDocId(body.id)).set(body)).then(()=>rlSavedState("saved"),e=>{ log("✕","reel save",{code:e?.code,message:e?.message}); rlSavedState(okLocal?"local":"fail"); });
  return rlChain;
}
function rlSavedState(s){ const el=$("rlSaved"); if(!el) return; el.dataset.s=s; el.textContent={saving:"Saving…",saved:"Saved to your account",local:"Saved in this browser",fail:"Couldn't save — storage is full"}[s]||""; }
async function rlDelete(id){
  lsSet("bae_reels_v3_del",[...lsGet("bae_reels_v3_del",[]),id].slice(-200));
  try{ localStorage.removeItem(RL_P+id); }catch{} lsSet(RL_IDX,lsGet(RL_IDX,[]).filter(x=>x.id!==id));
  if(RLS.mode==="account"){ try{ await rlCol().doc(rlDocId(id)).delete(); }catch{} }
}
async function rlDuplicate(id){ const p=await rlLoadProject(id); if(!p) return; const c=JSON.parse(JSON.stringify(p)); c.id=rlNew().id; c.title=(p.title||"Untitled reel")+" copy"; c.space=null; c.createdAt=c.updatedAt=Date.now(); const keep=RL; RL=c; await rlFlush(); RL=keep; }

/* ---------- thumbnails: cached in this browser by Magnific creation id, fetched again when missing ---------- */
const rlTmem={}, rlFull={}, rlTQ=new Set(), rlTTried=new Set(); let rlTBusy=0;
function rlTGet(cid){ if(!cid) return null; if(String(cid).startsWith("lib:")) return refById(String(cid).slice(4))?.src||null; if(rlTmem[cid]) return rlTmem[cid]; try{ const v=localStorage.getItem(RL_T+cid); if(v) return rlTmem[cid]=v; }catch{} return null; }
function rlTSet(cid,data){ if(!cid||!data) return; rlTmem[cid]=data; try{ localStorage.setItem(RL_T+cid,data); }catch{ try{ const ks=Object.keys(localStorage).filter(k=>k.startsWith(RL_T)); ks.slice(0,Math.ceil(ks.length/3)).forEach(k=>localStorage.removeItem(k)); localStorage.setItem(RL_T+cid,data); }catch{} } }
function rlNeed(cid){ if(!cid||String(cid).startsWith("lib:")||rlTGet(cid)||rlTTried.has(cid)||!mcp||!S.connected) return; rlTQ.add(cid); rlPump(); }
async function rlPump(){
  while(rlTBusy<2&&rlTQ.size){ const cid=rlTQ.values().next().value; rlTQ.delete(cid); rlTTried.add(cid); rlTBusy++;
    preview(cid).then(async pv=>{ if(pv.image){ const src=`data:${pv.image.mime};base64,${pv.image.data}`; rlFull[cid]=src; rlTSet(cid,await rlThumb(src)); rlBoardSoon(); } }).catch(()=>{}).finally(()=>{ rlTBusy--; rlPump(); }); }
}
let rlSoonT=null; function rlBoardSoon(){ clearTimeout(rlSoonT); rlSoonT=setTimeout(()=>{ if(RL&&!$("rlProjView").hidden) rlBoard(); else if(!$("rlLib").hidden) rlShowLib(); },120); }
const rlImgOf=e=>e?.lib&&e.fromLib?"lib:ch_"+String(e.lib).toLowerCase():e?.id||null;


/* ---------- the Director's brain: shared team memory (knowledge, daily research, team feedback) ---------- */
const BR={sections:[],research:[],feedback:[],advisors:[],loaded:0,canEdit:false,uid:null};
async function brLoad(force){
  await rlStoreInit(); const db=RLS.db; if(!db) return BR;
  if(!force&&Date.now()-BR.loaded<60000) return BR;
  try{ const [s,r,ad]=await Promise.all([db.collection("brain").get(),db.collection("research").orderBy("date","desc").limit(7).get(),db.collection("advisors").get().catch(()=>({docs:[]}))]);
    BR.advisors=ad.docs.map(d=>({id:d.id,...JSON.parse(JSON.stringify(d.data()))})).sort((a,b)=>(a.order||9)-(b.order||9));
    BR.sections=s.docs.map(d=>({id:d.id,...JSON.parse(JSON.stringify(d.data()))})).sort((a,b)=>(a.order||99)-(b.order||99));
    BR.research=r.docs.map(d=>({id:d.id,...JSON.parse(JSON.stringify(d.data()))})); BR.loaded=Date.now(); }
  catch(e){ log("✕","brain load",{code:e?.code}); }
  try{ const u=await window.claude?.use?.("user"); BR.canEdit=!!u?.canEdit?.(); BR.uid=RLS.uid; }catch{}
  return BR;
}
async function brLoadFeedback(){ if(!RLS.db) return []; try{ const f=await RLS.db.collection("feedback").orderBy("at","desc").limit(30).get(); BR.feedback=f.docs.map(d=>({id:d.id,...JSON.parse(JSON.stringify(d.data()))})); }catch{} return BR.feedback; }
/* what the Director reads before every answer: knowledge first, then the team's lessons, then this morning's research */
function brText(){
  if(!BR.sections.length&&!BR.research.length) return "";
  const cut=(t,n)=>String(t||"").length>n?String(t).slice(0,n)+"…":String(t||"");
  const lessons=BR.sections.find(s=>s.id==="lessons"), rest=BR.sections.filter(s=>s.id!=="lessons");
  const R=BR.research[0];
  return `DIRECTOR'S BRAIN — the team's shared memory. Think with it on every answer. Where the team's lessons disagree with general knowledge, the lessons win.
${rest.map(s=>`### ${s.title}\n${cut(s.text,s.id==="templates"?9000:6000)}`).join("\n\n")}
${BR.advisors.length?`### ASSISTANT DIRECTORS — five specialists who research every morning and advise you. Consult them; pass on their best note when it matters.\n${BR.advisors.map(x=>`[${x.id}] ${x.name} — ${x.role}\n${cut(x.notes,800)}`).join("\n\n")}`:""}
${lessons?`### ${lessons.title}\n${cut(lessons.text,5000)}`:""}
${R?`### This morning's research (${R.date})\n${cut(R.text,4000)}`:""}`;
}
async function brFeedback(kind,key,verdict,note,item){
  if(!RL) return;
  RL.rated=RL.rated||{}; RL.rated[key]=verdict; rlSave();
  if(!RLS.db) return;
  try{ await RLS.db.collection("feedback").add({kind,key,verdict,note:String(note||"").slice(0,800),item:String(item||"").slice(0,1500),project:{id:RL.id,title:RL.title},by:RLS.uid||null,at:Date.now(),day:new Date().toLocaleDateString("en-CA")}); }
  catch(e){ log("✕","feedback save",{code:e?.code}); }
}
/* Silent learning: what the team DOES teaches the Director as much as what they say — choices, edits, revisions, regenerations, approvals */
const brSeen=new Map();
function brSignal(kind,signal,verdict,{note="",item="",before,after,key}={}){
  if(!RL||!RLS.db) return;
  const k=kind+"|"+signal+"|"+(key||item).slice(0,80); const t=brSeen.get(k)||0; if(Date.now()-t<15000) return; brSeen.set(k,Date.now());
  const cut=(s,n)=>s==null?undefined:String(s).slice(0,n);
  const doc={kind,signal,verdict,note:cut(note,800)||"",item:cut(item,1200)||"",project:{id:RL.id,title:RL.title,stage:RL.stage},by:RLS.uid||null,at:Date.now(),day:new Date().toLocaleDateString("en-CA"),implicit:true};
  if(before!==undefined) doc.before=cut(before,900); if(after!==undefined) doc.after=cut(after,900);
  RLS.db.collection("feedback").add(doc).catch(e=>log("✕","signal save",{code:e?.code}));
}
const ideaLine=x=>x?`${x.title} — ${x.hook||""} — ${x.logline||""}`:"";
function rlRate(kind,key,item){
  const v=RL.rated?.[key];
  if(RL._rateOpen?.key===key) return `<form class="rl-rateform" data-kind="${kind}" data-key="${esc(key)}" data-item="${esc(String(item||"").slice(0,1200))}" data-v="${RL._rateOpen.v}"><span aria-hidden="true">${RL._rateOpen.v===1?"👍":"👎"}</span><input class="rl-field" name="n" dir="auto" placeholder="${RL._rateOpen.v===1?"What works? (optional)":"What's wrong? (optional)"}" aria-label="Why"><button class="a-btn" type="submit">Send</button></form>`;
  return `<div class="rl-rate" data-kind="${kind}" data-key="${esc(key)}" data-item="${esc(String(item||"").slice(0,1200))}"><button type="button" data-v="1" aria-pressed="${v===1}" title="Good — teach the Director">👍</button><button type="button" data-v="-1" aria-pressed="${v===-1}" title="Weak — teach the Director">👎</button></div>`;
}
function rlShowBrain(){
  $("rlLib").hidden=true; $("rlProjView").hidden=true; $("rlBrain").hidden=false; $("reels").dataset.mode="brain"; $("reels").scrollTop=0;
  const box=$("rlBrainBody"); box.innerHTML=`<p class="muted">Loading the Director's memory…</p>`;
  Promise.all([brLoad(true),brLoadFeedback()]).then(()=>{
    if(!RLS.db){ box.innerHTML=rlEmpty("The shared memory needs the page's database, which isn't available in this view. Open the page in claude.ai."); return; }
    const fb=BR.feedback, up=fb.filter(x=>!x.implicit&&x.verdict===1).length, down=fb.filter(x=>!x.implicit&&x.verdict===-1).length, taught=fb.filter(x=>x.kind==="lesson").length, sig=fb.filter(x=>x.implicit).length;
    box.innerHTML=`
    <div class="br-stats"><div><b>${BR.sections.length}</b><span>knowledge sections</span></div><div><b>${BR.research.length}</b><span>mornings of research</span></div><div><b>${fb.length}</b><span>recent signals · ${up} 👍 ${down} 👎 · ${taught} lessons · ${sig} learned from actions</span></div></div>
    <form class="rl-card br-teach" id="brTeach"><div class="rl-ihead"><b>Teach the Director</b></div><p class="muted">A rule, an insight about Jordanians, a line people really say, an ad you loved and why. It also learns silently from what everyone does — the ideas you choose and skip, your edits, revisions, regenerations and approvals. Every morning it's all condensed into the team's lessons.</p><textarea class="rl-field" name="t" rows="3" dir="auto" placeholder="e.g. Jordanians laugh at the father who forwards every voice note… / Don't use the word 'easy' — say 'بكبسة'"></textarea><div class="rl-btns"><button class="btn primary small" type="submit">Teach</button><span class="t12 muted" id="brTeachMsg"></span></div></form>
    <div class="rl-head"><div><h2>Assistant directors</h2><p>Five specialists research every morning and advise the Director: their notes appear under its replies, and "Ask the room" on any shot gets one concrete improvement from each.</p></div></div>
    <div class="br-advs">${["trend","story","dp","performance","tech"].map(id=>{ const A=rlAdv(id); return `<div class="br-adv"><div class="ih"><span class="ic" aria-hidden="true">${esc(A.icon||"•")}</span><b>${esc(A.name||id)}</b></div><p class="t12 muted" style="margin:0">${esc(A.role||"")}</p><div class="br-text" dir="auto">${esc(A.notes||"Research arrives tomorrow morning.")}</div><span class="t12 muted">${A.updatedAt?"Updated "+rlAgo(A.updatedAt):""}</span></div>`; }).join("")}</div>
    ${BR.research.length?`<details class="rl-card br-sec" open><summary><b>This morning's research</b><span class="t12 muted">${esc(BR.research[0].date||"")} · runs every day at 5:33 AM Amman time</span></summary><div class="br-text" dir="auto">${esc(BR.research[0].text||"")}</div>${(BR.research[0].sources||[]).length?`<p class="t12 muted">Sources: ${(BR.research[0].sources||[]).slice(0,8).map(u=>`<a href="${esc(u.url||u)}" target="_blank" rel="noopener">${esc(u.title||u.url||u)}</a>`).join(" · ")}</p>`:""}${BR.research.length>1?`<p class="t12 muted">Earlier: ${BR.research.slice(1).map(r=>esc(r.date)).join(" · ")}</p>`:""}</details>`:`<div class="rl-card"><b>Daily research</b><p class="muted">The first morning research arrives at 5:33 AM Amman time.</p></div>`}
    ${BR.sections.map(s=>`<details class="rl-card br-sec"${s.id==="lessons"?" open":""}><summary><b>${esc(s.title||s.id)}</b><span class="t12 muted">${s.updatedAt?"Updated "+rlAgo(s.updatedAt):""}</span></summary>
      <div class="br-text" dir="auto" data-sec="${esc(s.id)}">${esc(s.text||"")}</div>
      ${BR.canEdit?`<div class="rl-btns"><button class="a-btn" type="button" data-bredit="${esc(s.id)}">Edit</button></div>`:""}</details>`).join("")}
    ${fb.length?`<div class="rl-card"><div class="rl-ihead"><b>Latest team notes</b></div>${fb.slice(0,15).map(x=>`<div class="br-fb" dir="auto"><span>${x.kind==="lesson"?"✎":x.implicit?"·":x.verdict===1?"👍":"👎"}</span><div><b>${esc(x.kind==="lesson"?"Lesson":x.kind)}${x.signal?` · ${esc(String(x.signal).replace(/_/g," "))}`:""}</b>${x.note?` — ${esc(x.note)}`:""}<br><span class="t12 muted">${esc(x.project?.title||"")}${x.by&&x.by===RLS.uid?" · you":""} · ${rlAgo(x.at)}</span></div></div>`).join("")}</div>`:""}`;
  });
}

/* ---------- staying alive: retry dropped connections, keep the screen awake, resume when the user comes back ---------- */
const rlTransient=e=>/upstream_error|unavailable|network|timeout|cancel|connection|failed to fetch|load failed|aborted/i.test(((e?.code)||"")+" "+((e?.message)||""));
async function rlAsk(prompt,opts){
  for(let i=0;;i++){ try{ return await sample.json(prompt,opts); }
    catch(e){ if(i<2&&rlTransient(e)&&e?.code!=="cancelled"){ await new Promise(r=>setTimeout(r,i?6000:2500)); if(document.hidden) await new Promise(r=>{ const f=()=>{ if(!document.hidden){ document.removeEventListener("visibilitychange",f); r(); } }; document.addEventListener("visibilitychange",f); }); continue; } throw e; } }
}
let rlWakeN=0, rlWakeLock=null;
async function rlWake(on){ rlWakeN=Math.max(0,rlWakeN+(on?1:-1));
  try{ if(rlWakeN>0&&!rlWakeLock&&navigator.wakeLock&&!document.hidden){ rlWakeLock=await navigator.wakeLock.request("screen"); rlWakeLock.addEventListener?.("release",()=>{ rlWakeLock=null; }); }
    else if(rlWakeN===0&&rlWakeLock){ const l=rlWakeLock; rlWakeLock=null; await l.release(); } }catch{} }
const rlJob=async(fn)=>{ rlWake(true); try{ return await fn(); } finally{ rlWake(false); } };

/* ---------- Claude: the director in the chat ---------- */
function rlState(){
  const set=rlSet();
  return {title:RL.title,stage:RL.stage,viewing_tab:RL.view,settings:set,notes:RL.notes,ideas:RL.ideas,picked_idea:RL.picked,script:RL.script,next_free_tag:"@img"+RL.nextTag,
    characters:RL.characters.map(({name,tag,handle,role,description,wardrobe,prompt,id,lib})=>({tag,handle,name,role,description,wardrobe,prompt,image_generated:!!id,library:lib||null})),
    locations:RL.locations.map(({name,tag,handle,kind,description,prompt,id})=>({tag,handle,name,kind,description,prompt,image_generated:!!id})),
    film_look:RL.look||null,
    scenes:RL.scenes.map(({n,title,logline,duration_s,refs,prompt,frame_prompt,frame,status})=>({n,title,logline,duration_s,refs,frame_prompt,prompt,first_frame_generated:!!frame?.id,video_rendered:status==="done"}))};
}
function rlPromptFor(text){
  const set=rlSet();
  const hist=RL.chat.filter(m=>m.role!=="sys").slice(-14).map(m=>`${m.role==="u"?"USER":"YOU"}: ${m.text}${m.n?` [attached ${m.n} image(s)]`:""}`).join("\n");
  return `You are the creative director and AI film director of Bank al Etihad (Jordan) in a reels production studio. You talk with a BAE designer in a chat and build the production with them, one stage at a time. Answer in the user's language (Arabic or English, Jordanian tone is fine), warm and direct, short paragraphs.

${RL_METHOD}

${RL_BAE}

${brText()}

TARGET: ${set.aspect} reel, about ${set.length} seconds in total, dialogue language: ${set.lang}. BAE characters already in the user's Magnific library (they can be cast): Wissam (man, early 30s), Lina (young woman, dark braided ponytail), Sara (woman, light-blonde low bun), Omar (man in his 40s, heavy build).

STAGE FLOW: idea → script → characters → locations → directing → render. Work on what the user asks; by default the current stage. When the user approves ("تمام", "ok", "approve", picks an idea…), move to the next stage AND deliver it in the same answer. The user can come back at any time to change an earlier stage (a new idea, a new or edited character, a new location, a rewritten scene): do exactly that change, keep everything else, and update later stages only where the change requires it. If attachments are given (storyboards, characters, places, scripts), analyse them carefully and record the useful facts in "notes" because you will not see the images again.

HANDLES: every character, location and prop has a permanent readable handle (@char_sara, @loc_hall, @prop_phone) and an internal tag (@img1…) shown in the project state. In every prompt refer to elements ONLY by their handle. Keep each existing element's tag and handle. A NEW element gets a handle you choose (@char_<name>, @loc_<place>, @prop_<object>; lowercase latin letters, digits and underscores) — the studio assigns its tag. The studio maps handles to Seedance's @img numbers when it renders.

PROJECT STATE (JSON): ${trimJSON(rlState(),26000)}

CONVERSATION SO FAR:
${hist||"(none)"}

USER NOW: ${text||"(attachments only)"}

Reply with ONLY one JSON object. Always include "reply" (the chat message, no markdown tables) and "stage" (the furthest stage the production has reached after this turn). Include a key ONLY when you create or change it, and then give its COMPLETE new value (the full list, including the elements you did not change, with their tags):
- "title": short reel title
- "notes": everything learned from attachments and decisions (append to existing notes)
- "ideas": [{"title","hook","logline","beats","why_viral","product_moment","jury"}]  (3 per request). Before answering, silently generate at least 8 directions through different lenses of the masters, score each with THE JURY in the brain, and return only the best 3; "jury" = one line on why it wins (score /35)
- "picked_idea": index (0-based) into "ideas" when the user picks one
- "script": {"title","duration_s","scenes":[{"n","time","title","action","dialogue":[{"who","line"}],"on_screen_text","sound"}]}
- "characters": [{"tag","handle","name","role","description","wardrobe","library":null|"Wissam"|"Lina"|"Sara"|"Omar","prompt"}]  — prompt = the full THREE-PANEL character sheet prompt (CHARACTER SHEET template); set "library" only when the user wants that BAE character
- "locations": [{"tag","handle","name","kind":"location"|"prop","description","prompt"}]  — full image prompt (LOCATION template, empty of people / PROP SHEET template)
- "film_look": the shared FILM LOOK paragraph (write it with the first scenes; change it only when asked)
- "scenes": [{"n","title","logline","duration_s","refs":["@char_…","@loc_…"],"blueprint":{...},"frame_prompt","prompt"}]  — logline = one line "what it does"; blueprint = the top-down blocking plan written FIRST (format: ${RL_BP_SCHEMA}); frame_prompt = the still-image prompt (Nano Banana 2.1) for the scene's first frame, using the tags ("the man @img1 sits…"); prompt = the full Seedance 2.5 prompt that continues from that first frame, following the DIRECTING structure; duration 4–15 s, ${set.aspect}
- "chips": 2–4 short suggested next replies for the user, in their language
- "advisors": 0–3 short notes from the ASSISTANT DIRECTORS that matter for THIS reply: [{"id":"trend"|"story"|"dp"|"performance"|"tech","note":"one concrete suggestion in the user's language"}]. Only when genuinely useful; never repeat what you already did.`;
}
async function rlSend(text,{retry}={}){
  if(rlBusy||!RL) return; text=(text||"").trim(); const atts=retry?[]:rlPending.slice(); if(!text&&!atts.length) return;
  if(!sample){ rlSys("Claude isn't available in this view. Open the page in claude.ai and allow Claude.",true); return; }
  rlBusy=true; $("rlSend").disabled=true; RL.chatPending=null;
  if(!retry){
    const thumbs=[]; for(const a of atts){ const t=await rlThumb(a.url,160); if(t) thumbs.push(t); }
    RL.chat.push({role:"u",text,thumbs,n:atts.length,t:Date.now()});
    if(text) brSignal("chat","request",0,{note:text,item:`stage ${RL.stage} · viewing ${RL.view}${atts.length?` · ${atts.length} image(s) attached`:""}`,key:text});
    rlPending=[]; rlRenderAtt(); $("rlInput").value="";
  }
  RL.chatPending={text,at:Date.now()}; rlFlush(); rlRenderChat(); rlTyping(true);
  await rlJob(async()=>{ try{
    const opts={modelTier:"complex",cache:false};
    if(atts.length){ if(sampleImages) opts.images=atts.map(a=>a.blob).slice(0,10); else rlSys("This view can't send images to Claude, so only your text was used.",true); }
    await brLoad();
    const out=await rlAsk(rlPromptFor(text),opts);
    RL.chatPending=null; rlApply(out||{});
  }catch(e){ if(!rlTransient(e)){ RL.chatPending=null; RL.chat.push({role:"sys",err:true,text:sampleCopy(e)}); } }
  finally{ rlTyping(false); rlBusy=false; $("rlSend").disabled=false; rlSave(); rlRender(); } });
}
function rlApply(o){
  if(o.title) RL.title=String(o.title);
  if(o.notes) RL.notes=String(o.notes);
  if(Array.isArray(o.ideas)&&o.ideas.length){ if(RL.ideas.length) RL.ideasPrev=[...RL.ideas.filter(x=>x.title!==RL.picked?.title),...RL.ideasPrev].slice(0,12); RL.ideas=o.ideas; }
  if(o.picked_idea!=null&&RL.ideas[o.picked_idea]){ const was=RL.picked; RL.picked=RL.ideas[+o.picked_idea];
    if(!was||was.title!==RL.picked.title) brSignal("idea","chosen",1,{item:ideaLine(RL.picked),note:"Rejected in the same set: "+RL.ideas.filter(x=>x!==RL.picked).map(ideaLine).join(" | "),key:RL.picked.title}); }
  if(o.script&&typeof o.script==="object") RL.script=o.script;
  /* elements keep their tag, image and edits; new ones take the next free tag */
  const merge=(oldL,newL)=>newL.map(n=>{ const o2=oldL.find(x=>n.tag&&x.tag===n.tag)||oldL.find(x=>n.handle&&x.handle&&x.handle.toLowerCase()===String(n.handle).toLowerCase())||oldL.find(x=>x.name&&n.name&&x.name.toLowerCase()===String(n.name).toLowerCase());
    if(o2){ const m={...o2,...n,tag:o2.tag,handle:o2.handle||n.handle,id:o2.id,web:o2.web,lib:n.library!==undefined?n.library:o2.lib,status:o2.status}; if(o2.id&&n.prompt&&n.prompt!==o2.prompt) m.stale=true; delete m.library; return m; }
    const m={...n,lib:n.library||null,tag:"@img"+(RL.nextTag++)}; delete m.library; return m; });
  if(Array.isArray(o.characters)) RL.characters=merge(RL.characters,o.characters);
  if(Array.isArray(o.locations)) RL.locations=merge(RL.locations,o.locations);
  rlEnsureHandles(RL); rlLinkLibrary();
  if(typeof o.film_look==="string"&&o.film_look.trim()) RL.look=o.film_look.trim();
  let toCheck=[];
  if(Array.isArray(o.scenes)) RL.scenes=o.scenes.map(sc=>{ const old=RL.scenes.find(x=>+x.n===+sc.n); if(!old){ toCheck.push(sc.n); return {...sc}; }
    const m={...old,...sc}; if(sc.prompt&&sc.prompt!==old.prompt) Object.assign(m,{status:null,clip:null,url:null,note:null,_src:null,web:null});
    if((sc.prompt&&sc.prompt!==old.prompt)||(sc.frame_prompt&&sc.frame_prompt!==old.frame_prompt)||(sc.blueprint&&JSON.stringify(sc.blueprint)!==JSON.stringify(old.blueprint))){ toCheck.push(sc.n); if(m.frame?.id&&sc.frame_prompt&&sc.frame_prompt!==old.frame_prompt) m.frame={...m.frame,stale:true}; }
    return m; });
  if(toCheck.length) setTimeout(()=>rlCheckScenes(toCheck,{quiet:true}),60);
  if(o.stage&&rlStageIx(o.stage)>=0){ if(rlStageIx(o.stage)!==rlStageIx(RL.stage)) RL.view=o.stage; RL.stage=o.stage; }
  RL.chat.push({role:"a",text:String(o.reply||"…"),chips:Array.isArray(o.chips)?o.chips.slice(0,4):[],advisors:Array.isArray(o.advisors)?o.advisors.filter(x=>x&&x.note).slice(0,3).map(x=>({id:String(x.id||""),note:String(x.note).slice(0,400)})):[]});
}
function rlLinkLibrary(){ for(const c of RL.characters){ if(!c.lib){ if(c.fromLib){ c.fromLib=false; c.id=null; } continue; } const id="ch_"+String(c.lib).toLowerCase(); const mid=S.magIds?.[id]; if(refById(id)){ c.fromLib=true; if(mid) c.id=mid; } } }
function rlSys(t,bad){ RL.chat.push({role:"sys",text:t,err:!!bad}); rlRenderChat(); }
function rlTyping(on){ const b=$("rlMsgs"); b.querySelector(".rl-typing-m")?.remove(); if(on){ const d=document.createElement("div"); d.className="rl-m a rl-typing-m"; d.innerHTML='<span class="rl-typing" aria-label="Claude is thinking"><i></i><i></i><i></i></span>'; b.appendChild(d); b.scrollTop=b.scrollHeight; } }

/* Claude writes or revises ONE element without touching the rest of the project */
async function rlWriteElement(kind,base,instruction){
  const set=rlSet();
  const o=await rlAsk(`You write production assets for a Bank al Etihad reel (${set.aspect}, ${set.length} s).
${kind==="character"?"Write a CHARACTER. The image prompt MUST follow this house template exactly, keeping every fixed sentence and replacing every [bracket] with specific, vivid detail:\n"+rlTpl("char"):kind==="prop"?"Write a PROP / PRODUCT. The image prompt MUST follow this house template exactly, keeping every fixed sentence and replacing every [bracket] with specific detail:\n"+rlTpl("prop"):"Write a LOCATION. The image prompt MUST follow this house template, replacing every [bracket] with specific detail (positions of walls, doors, windows and furniture included):\n"+rlTpl("loc")}
${RL_BAE}

Reel so far: ${trimJSON({title:RL.title,idea:RL.picked,notes:RL.notes,script:RL.script},6000)}
Current element (JSON): ${trimJSON(base,4000)}
User request: ${instruction||"Write it well from the name and description."}

Reply with only JSON: {"name":"","role":"","description":"one or two lines","wardrobe":"${kind==="character"?"the outfit":""}","prompt":"the full image prompt"}`,{modelTier:"default"});
  if(!o||!o.prompt) throw {code:"invalid_json",message:"Claude didn't return a prompt."};
  return o;
}
async function rlAddElement(kind,name,desc,lib){
  const list=kind==="character"?RL.characters:RL.locations;
  const e={tag:"@img"+(RL.nextTag++),name:name||(kind==="character"?"New character":kind==="prop"?"New prop":"New location"),description:desc||"",kind:kind==="character"?undefined:kind,lib:lib||null,prompt:""};
  list.push(e); rlEnsureHandles(RL); rlLinkLibrary(); RL._adding=null;
  if(e.fromLib){ e.prompt=`BAE character ${lib} from the Magnific library.`; rlSave(); rlBoard(); return; }
  e.status="write"; rlFlush(); rlBoard();
  try{ const o=await rlJob(()=>rlWriteElement(kind,e,null)); Object.assign(e,{name:o.name||e.name,role:o.role||e.role,description:o.description||e.description,wardrobe:o.wardrobe||e.wardrobe,prompt:o.prompt}); e.status=null; }
  catch(err){ if(rlTransient(err)){ e.err="Paused: the connection dropped. It continues when you're back."; rlSave(); rlBoard(); return; } e.status="err"; e.err=sampleCopy(err); e._edit=true; }
  rlSave(); rlBoard();
}
async function rlReviseElement(tag,instruction){
  const e=rlElByTag(tag); if(!e||!instruction) return;
  brSignal(RL.characters.includes(e)?"character":e.kind||"location","revised",-1,{note:instruction,item:`${e.name}: ${e.description||""}`,before:e.prompt,key:e.tag+instruction});
  e.status="write"; e.err=null; e.revisePending=instruction; rlFlush(); rlBoard();
  try{ const kind=RL.characters.includes(e)?"character":e.kind==="prop"?"prop":"location";
    const o=await rlJob(()=>rlWriteElement(kind,{name:e.name,role:e.role,description:e.description,wardrobe:e.wardrobe,prompt:e.prompt},instruction));
    Object.assign(e,{name:o.name||e.name,role:o.role||e.role,description:o.description||e.description,wardrobe:o.wardrobe||e.wardrobe,prompt:o.prompt}); if(e.id) e.stale=true; e.status=null; delete e.revisePending; }
  catch(err){ if(rlTransient(err)){ e.err="Paused: the connection dropped. It continues when you're back."; rlSave(); rlBoard(); return; } e.status="err"; e.err=sampleCopy(err); delete e.revisePending; }
  rlSave(); rlBoard();
}

/* ---------- rendering ---------- */
function rlShowLib(){
  $("rlLib").hidden=false; $("rlProjView").hidden=true; $("rlBrain").hidden=true; $("reels").dataset.mode="lib";
  rlStoreInit().then(()=>{ $("rlStore").textContent=RLS.mode==="account"?"Projects save to your account automatically. Only you can see them.":"Projects save in this browser automatically."; });
  rlList().then(list=>{
    const box=$("rlProjects");
    const card=p=>{ const im=rlTGet(p.cover); if(!im&&p.cover) rlNeed(p.cover); const st=RL_STAGES.find(([k])=>k===p.stage)?.[1]||"Idea";
      return `<article class="rl-pc"><button type="button" class="rl-pc-open" data-open="${esc(p.id)}"><span class="rl-pc-cover">${im?`<img src="${im}" alt="">`:`<i aria-hidden="true">${esc((p.title||"R").trim().slice(0,1).toUpperCase())}</i>`}</span><span class="rl-pc-meta"><b dir="auto">${esc(p.title)}</b><span>${esc(st)} · ${p.n?.cast||0} cast · ${p.n?.shots||0} shots${p.n?.done?` · ${p.n.done} filmed`:""}</span><span class="t12 muted">Edited ${rlAgo(p.updatedAt)}</span></span></button>
        <div class="rl-pc-act"><button type="button" class="a-btn" data-dup="${esc(p.id)}">Duplicate</button><button type="button" class="a-btn" data-del="${esc(p.id)}">Delete</button></div></article>`; };
    box.innerHTML=`<button type="button" class="rl-pc rl-pc-new" id="rlNewCard"><span class="plus" aria-hidden="true">+</span><b>New reel</b><span class="t12 muted">Start from an idea, a brief or a storyboard</span></button>`+list.map(card).join("");
  });
}
async function rlOpen(id){
  const p=id?await rlLoadProject(id):null;
  RL=p||rlNew(); if(!p) rlSave();
  $("rlLib").hidden=true; $("rlProjView").hidden=false; $("reels").dataset.mode="proj"; $("reels").dataset.view="chat";
  rlLinkLibrary(); rlSyncSettings(); rlSavedState(p?(RLS.mode==="account"?"saved":"local"):"saving"); rlRender();
  setTimeout(rlResume,400);
  $("reels").scrollTop=0; setTimeout(()=>$("rlInput").focus({preventScroll:true}),60);
}
/* Coming back (reopened page, unlocked phone): pick up Magnific renders that finished meanwhile and rerun the Claude steps that were cut off */
let rlResuming=false;
async function rlResume(){
  if(!RL||rlResuming||document.hidden) return; rlResuming=true;
  const proj=RL;
  try{
    const stale=x=>x&&x.status==="run"&&!x._live&&!x.pending;
    for(const e of rlEls()){ if(stale(e)){ e.status=null; e.err="Interrupted before Magnific started. Press Generate again."; } }
    for(const s of RL.scenes){ if(stale(s.frame)){ s.frame.status=null; s.frame.err="Interrupted before Magnific started. Press Generate again."; } if(stale(s)){ s.status=null; s.note="Interrupted before Magnific started. Press Generate video again."; } }
    if(stale(RL.final)) RL.final={note:"Interrupted. Press Join again."};
    rlBoard();
    const mag=[...rlEls().filter(e=>e.pending&&!e._live).map(e=>({kind:"el",o:e})),...RL.scenes.filter(s=>s.frame?.pending&&!s.frame._live).map(s=>({kind:"frame",o:s.frame})),...RL.scenes.filter(s=>s.pending&&!s._live).map(s=>({kind:"video",o:s})),...(RL.final?.pending&&!RL.final._live?[{kind:"final",o:RL.final}]:[])];
    const claudeJobs=RL.scenes.filter(s=>(s.checkPending&&!s._checking)||(s.improvePending&&!s._improving)).length+rlEls().filter(e=>e.status==="write"||e.revisePending).length;
    if(!mag.length&&!claudeJobs&&!RL.chatPending) return;
    if(mag.length&&mcp){ if(!S.connected) await connect(true);
      await Promise.allSettled(mag.map(async({kind,o})=>{ o._live=true; o.status="run"; if(kind==="video") o.note="Picking up the render from Magnific…"; rlBoard();
        try{ const video=kind==="video"||kind==="final"; let rr=await waitFor([o.pending],video?"video":"image",video?30:10,video);
          if(kind==="video"){ await rlFinishVideo(o,rr,o.pending); o.note="Finished while you were away."; }
          else if(kind==="final"){ const all=[...rr.urls,...rr.links]; Object.assign(o,{id:rr.ids[0]||o.pending,web:rr.webUrl||o.web||null,url:all.find(u=>/\.(mp4|mov|webm)(\?|#|$)/i.test(u))||null,status:null,note:"Final reel ready."}); delete o.pending; await rlLoadVideo(o,o.id); }
          else { const id=rr.ids[0]||o.pending; let shot=rr.images[0]; if(!shot){ const pv=await preview(id); shot=pv.image; } if(shot){ const src=`data:${shot.mime};base64,${shot.data}`; rlFull[id]=src; rlTSet(id,await rlThumb(src)); }
            Object.assign(o,{id,status:"ok",stale:false,err:null}); delete o.pending; }
        }catch(err){ if(rlTransient(err)){ o.status="paused"; } else { o.status="err"; if(kind==="video") o.note=mcpCopy(err); else o.err=mcpCopy(err); delete o.pending; } }
        finally{ delete o._live; if(RL===proj){ rlSave(); rlBoard(); } } })); }
    if(RL!==proj) return;
    const toCheck=RL.scenes.filter(s=>s.checkPending&&!s._checking&&!s.improvePending).map(s=>s.n);
    if(toCheck.length) rlCheckScenes(toCheck,{quiet:true});
    RL.scenes.filter(s=>s.improvePending&&!s._improving).forEach(s=>rlImproveScene(s.n,s.improvePending.instruction));
    for(const e of rlEls()){ if(e.revisePending&&e.status!=="err") rlReviseElement(e.tag,e.revisePending); else if(e.status==="write"&&!e.prompt){ const kind=RL.characters.includes(e)?"character":e.kind==="prop"?"prop":"location"; e.status="write"; rlJob(()=>rlWriteElement(kind,e,null)).then(o=>{ Object.assign(e,{name:o.name||e.name,role:o.role||e.role,description:o.description||e.description,wardrobe:o.wardrobe||e.wardrobe,prompt:o.prompt,status:null,err:null}); },err=>{ if(!rlTransient(err)){ e.status="err"; e.err=sampleCopy(err); } }).finally(()=>{ rlSave(); rlBoard(); }); } }
    rlRenderChat();
  }finally{ rlResuming=false; }
}
function rlSyncSettings(){ const s=rlSet(); $("rlLen").value=String(s.length); $("rlAspect").value=s.aspect; $("rlLang").value=s.lang; $("rlRes").value=s.res; }
function rlRender(){ if(!RL) return; const t=$("rlTitle"); if(document.activeElement!==t) t.value=RL.title||""; rlRenderNav(); rlRenderChat(); rlBoard(); }
function rlRenderNav(){
  const si=rlStageIx(RL.stage);
  const done=k=>({idea:!!RL.picked,script:!!RL.script?.scenes?.length,characters:RL.characters.length>0&&RL.characters.every(e=>e.id),locations:RL.locations.length>0&&RL.locations.every(e=>e.id),directing:RL.scenes.length>0&&RL.scenes.every(s=>s.status==="done"),render:!!RL.space?.url||!!RL.final?.id})[k];
  $("rlStages").innerHTML=RL_STAGES.map(([k,l],i)=>`<button type="button" role="tab" aria-selected="${RL.view===k}" data-tab="${k}" class="${done(k)?"done":""}${i===si?" cur":""}${i>si+1&&!done(k)?" later":""}"><span class="n" aria-hidden="true">${done(k)?"✓":i+1}</span><span>${l}</span></button>`).join("");
}
function rlChipsFor(){
  const ar=rlAr();
  const D={idea:ar?["اعطيني 3 أفكار فايرال","أفكار جديدة بزاوية مختلفة"]:["Give me 3 viral ideas","New ideas, different angle"],
    script:ar?["تمام السيناريو","خلّي الهوك أقوى"]:["Script approved","Make the hook stronger"],
    characters:ar?["تمام الشخصيات","ضيف شخصية ثانية"]:["Cast approved","Add a second character"],
    locations:ar?["تمام الأماكن","ضيف مكان جديد"]:["Locations approved","Add another location"],
    directing:ar?["خلّي الكاميرا أجرأ","قصّر المشهد الأول"]:["Bolder camera work","Shorten scene 1"],render:[]};
  return D[RL.view]||[];
}
function rlRenderChat(){
  const b=$("rlMsgs");
  if(!RL.chat.length) b.innerHTML=`<div class="rl-m a" dir="auto">Hi! Tell me the reel you need — the product, the message, who it's for. Attach a storyboard, character photos, places or a script and I'll analyse them.\n\nYou can come back to this project any time to change an idea, a character, a location or a shot.</div>`;
  else b.innerHTML=RL.chat.map((m,mi)=>`<div class="rl-m ${m.role==="u"?"u":m.role==="a"?"a":"sys"}${m.err?" err":""}" dir="auto">${esc(m.text||"")}${m.thumbs?.length?`<div class="imgs">${m.thumbs.map(t=>`<img src="${t}" alt="">`).join("")}</div>`:m.n?`<div class="t12" style="opacity:.7;margin-top:6px">${m.n} image${m.n>1?"s":""} attached</div>`:""}</div>${m.advisors?.length?`<div class="rl-advs" dir="auto">${m.advisors.map((x,ai)=>{ const A=rlAdv(x.id); return `<div class="rl-adv"><span class="ic" aria-hidden="true">${esc(A.icon||"•")}</span><div><b>${esc(A.name||x.id)}</b> ${esc(x.note)} <button type="button" class="rl-advuse" data-adv="${mi}:${ai}">Use</button></div></div>`; }).join("")}</div>`:""}`).join("");
  if(RL.chatPending&&!rlBusy) b.insertAdjacentHTML("beforeend",`<div class="rl-m sys rl-retry" dir="auto">The connection dropped before Claude answered. Your message is saved. <button type="button" class="a-btn" id="rlRetry">Answer it now</button></div>`);
  b.scrollTop=b.scrollHeight;
  const last=[...RL.chat].reverse().find(m=>m.role==="a");
  const chips=last?.chips?.length?last.chips:(RL.chat.length?rlChipsFor():["بدي ريلز عن Quick Pay: ادفع كل فواتيرك بكبسة زر","Give me 3 viral ideas for a BAE savings reel"]);
  $("rlChips").innerHTML=chips.map(c=>`<button type="button" dir="auto">${esc(c)}</button>`).join("");
}
const rlHead=(title,sub,actions="")=>`<div class="rl-head"><div><h2>${title}</h2>${sub?`<p>${sub}</p>`:""}</div>${actions?`<div class="rl-btns">${actions}</div>`:""}</div>`;
const rlNext=(k,label)=>`<div class="rl-next"><button class="btn primary" type="button" data-rl="say" data-t="${k}">${label}</button></div>`;
const rlEmpty=(t,btn)=>`<div class="rl-emptybox"><p>${t}</p>${btn||""}</div>`;
const RL_SAY={approveScript:["Script approved. Build the characters.","تمام السيناريو، ابنيلي الشخصيات."],approveCast:["Characters approved. Build the locations and props.","تمام الشخصيات، ابنيلي الأماكن والأغراض."],approveLoc:["Locations approved. Start the video directing: one Seedance 2.5 scene prompt (with its first-frame prompt) per scene.","تمام الأماكن، ابدأ الـ Video Directing: لكل مشهد برومبت Seedance 2.5 مع برومبت الفريم الأول."],moreIdeas:["Give me 3 new ideas, clearly different from the ones above.","اعطيني 3 أفكار جديدة ومختلفة عن اللي فوق."],ideas:["Give me 3 viral ideas for this reel.","اعطيني 3 أفكار فايرال لهاد الريلز."]};
function rlBoard(){
  if(!RL) return;
  const B=$("rlBoard");
  const act=document.activeElement, editing=act&&B.contains(act)&&act.dataset.rlEdit?{key:act.dataset.rlEdit,s:act.selectionStart,e:act.selectionEnd,top:act.scrollTop}:null;
  if(editing) rlCommit(act);
  const v=RL.view, out=[];
  if(v==="idea"){
    out.push(rlHead("Idea","Three directions built to stop the scroll. Choose one, or ask for more.",`${RL.ideas.length?`<button class="a-btn" type="button" data-rl="say" data-t="moreIdeas">More ideas</button>`:""}`));
    if(RL.notes) out.push(`<details class="rl-notes"><summary>Brief notes from Claude</summary><p dir="auto">${esc(RL.notes)}</p></details>`);
    if(!RL.ideas.length) out.push(rlEmpty("Describe the reel in the chat — the product, the message, the audience — or attach a storyboard. Claude answers with three viral ideas.",`<button class="btn primary" type="button" data-rl="say" data-t="ideas">Suggest 3 ideas</button>`));
    else out.push(`<div class="rl-grid">${RL.ideas.map((x,i)=>{ const on=RL.picked&&RL.picked.title===x.title; return `<div class="rl-item rl-idea${on?" picked":""}" dir="auto"><span class="k">Idea ${i+1}${on?" · chosen":""}</span><b>${esc(x.title||"")}</b><p><span class="lbl2">Hook</span>${esc(x.hook||"")}</p><p>${esc(x.logline||"")}</p>${x.why_viral?`<p class="muted"><span class="lbl2">Why it travels</span>${esc(x.why_viral)}</p>`:""}${x.product_moment?`<p class="muted"><span class="lbl2">Product moment</span>${esc(x.product_moment)}</p>`:""}${x.jury?`<p class="rl-jury"><span class="lbl2">Jury</span>${esc(x.jury)}</p>`:""}<div class="rl-btns">${on?`<span class="rl-pill">Chosen</span>`:`<button class="btn small primary" type="button" data-rl="pick" data-i="${i}">Choose</button>`}<span class="rl-sp"></span>${rlRate("idea","idea:"+(x.title||i),`${x.title} — ${x.hook} — ${x.logline}`)}</div></div>`; }).join("")}</div>`);
    if(RL.ideasPrev.length) out.push(`<details class="rl-notes"><summary>Earlier ideas (${RL.ideasPrev.length})</summary>${RL.ideasPrev.map((x,i)=>`<div class="rl-prev" dir="auto"><b>${esc(x.title||"")}</b> — ${esc(x.hook||x.logline||"")} <button class="a-btn" type="button" data-rl="pickprev" data-i="${i}">Use this</button></div>`).join("")}</details>`);
  }
  if(v==="script"){
    out.push(rlHead("Script",RL.script?`${esc(RL.script.title||"")} · ${RL.script.duration_s||rlSet().length} s · edit any line, or ask Claude for changes in the chat`:"Scene by scene, with timing, dialogue, on-screen text and sound."));
    if(!RL.script?.scenes?.length) out.push(rlEmpty(RL.picked?"Ask Claude to write the script for the chosen idea.":"Choose an idea first.",RL.picked?`<button class="btn primary" type="button" data-rl="sayraw" data-t="${esc(rlAr()?"اكتبلي السيناريو للفكرة المختارة.":"Write the script for the chosen idea.")}">Write the script</button>`:`<button class="btn" type="button" data-tab="idea">Go to Idea</button>`));
    else{ out.push(`<div class="rl-card">${RL.script.scenes.map((s,i)=>`<div class="rl-beat" dir="auto"><span class="tc">${esc(s.time||"")}</span><div class="ln"><b>${esc(s.title||"")}</b>
      <textarea class="rl-field" rows="2" data-rl-edit="b:${i}:action" aria-label="Action">${esc(s.action||"")}</textarea>
      <textarea class="rl-field" rows="${Math.max(1,(s.dialogue||[]).length)}" data-rl-edit="b:${i}:dialogue" aria-label="Dialogue, one line per speaker as Name: line" placeholder="Name: line">${esc((s.dialogue||[]).map(d=>`${d.who||""}: ${d.line||""}`).join("\n"))}</textarea>
      <div class="rl-two"><input class="rl-field" data-rl-edit="b:${i}:on_screen_text" value="${esc(s.on_screen_text||"")}" placeholder="On-screen text" aria-label="On-screen text"><input class="rl-field" data-rl-edit="b:${i}:sound" value="${esc(s.sound||"")}" placeholder="Sound" aria-label="Sound"></div></div></div>`).join("")}</div>`);
      out.push(`<div class="rl-btns rl-rateline"><span class="t12 muted">How is this script?</span>${rlRate("script","script:"+(RL.script.title||""),RL.script.scenes.map(s=>`${s.title}: ${s.action}`).join(" / "))}</div>`);
      if(rlStageIx(RL.stage)<=rlStageIx("script")) out.push(rlNext("approveScript","Approve script · build the cast"));
    }
  }
  if(v==="characters"||v==="locations"){
    const isC=v==="characters", list=isC?RL.characters:RL.locations;
    out.push(rlHead(isC?"Cast":"Locations & props",isC?"Reference sheets keep every face the same in every shot.":"Empty establishing images and product sheets. Every shot inherits their light.",
      `${list.some(e=>!e.id&&!e.fromLib&&e.prompt)?`<button class="a-btn" type="button" data-rl="genall" data-list="${isC?"c":"l"}">Generate all missing</button>`:""}`));
    const add=RL._adding&&((isC&&RL._adding==="character")||(!isC&&RL._adding!=="character"))?rlAddForm(RL._adding):"";
    out.push(`<div class="rl-grid">${list.map(e=>rlElCard(e,isC?"c":"l")).join("")}${add||`<div class="rl-addcard">${isC?`<button type="button" class="rl-add" data-rl="add" data-k="character"><span aria-hidden="true">+</span>Add character</button><div class="rl-libcast"><span class="t12 muted">Or cast a BAE character</span><div>${["Wissam","Lina","Sara","Omar"].map(n=>{ const r=refById("ch_"+n.toLowerCase()); return `<button type="button" class="rl-castchip" data-rl="cast" data-n="${n}" ${RL.characters.some(c=>c.lib===n)?"disabled":""}>${r?`<img src="${r.src}" alt="">`:""}${n}</button>`; }).join("")}</div></div>`:`<button type="button" class="rl-add" data-rl="add" data-k="location"><span aria-hidden="true">+</span>Add location</button><button type="button" class="rl-add" data-rl="add" data-k="prop"><span aria-hidden="true">+</span>Add prop</button>`}</div>`}</div>`);
    if(isC&&rlStageIx(RL.stage)<=rlStageIx("characters")&&list.length) out.push(rlNext("approveCast","Approve cast · build the locations"));
    if(!isC&&rlStageIx(RL.stage)<=rlStageIx("locations")&&list.length) out.push(rlNext("approveLoc","Approve locations · direct the shots"));
  }
  if(v==="directing"){
    const set=rlSet(), ar=set.aspect.replace(":"," / ");
    const missing=rlEls().filter(e=>!e.id).map(e=>e.tag);
    out.push(rlHead("Shots",`${RL.scenes.length?RL.scenes.length+" scenes · ":""}${set.aspect} · ${set.res==="draft"?"Draft 480p":set.res} · first frame, then Seedance 2.5 animates it`,RL.scenes.length?`<button class="a-btn" type="button" data-rl="allframes">All first frames</button><button class="a-btn" type="button" data-rl="allvideos">All videos</button>`:""));
    if(missing.length&&RL.scenes.length) out.push(`<p class="rl-warn">Generate ${missing.join(", ")} first (Cast / Locations) so every shot can use them.</p>`);
    if(!RL.scenes.length) out.push(rlEmpty("Claude writes one Seedance 2.5 prompt per scene, with its first frame, from the script, cast and locations.",`<button class="btn primary" type="button" data-rl="say" data-t="approveLoc">Direct the shots</button>`));
    else{ out.push(`<div class="rl-sb">${RL.scenes.map(sc=>{ const im=rlTGet(sc.clip)||rlTGet(sc.frame?.id); return `<button type="button" class="rl-sbi" data-rl="goto" data-n="${sc.n}" style="aspect-ratio:${ar}" aria-label="Scene ${sc.n}">${im?`<img src="${im}" alt="">`:""}<span>${sc.n}</span>${sc.status==="done"?'<i aria-hidden="true">▶</i>':""}${sc.status==="run"||sc.frame?.status==="run"?'<em class="dot" aria-hidden="true"></em>':""}</button>`; }).join("")}</div>`);
      out.push(`<details class="rl-card rl-look"${RL.look?"":" open"}><summary><b>Film look</b><span class="t12 muted">Shared by every shot, added on top of each prompt when it renders</span></summary><textarea class="rl-prompt" data-rl-edit="look:0" spellcheck="false" dir="ltr" placeholder="Claude writes the film look with the scenes: stock look, lens character, grade with a 60/30/10 colour split, white balance, 24 fps, skin, global constraints, audio policy.">${esc(RL.look||"")}</textarea></details>`);
      out.push(RL.scenes.map(rlShotCard).join("")); }
  }
  if(v==="render") out.push(rlDeliver());
  B.innerHTML=out.join("");
  if(editing){ const t=B.querySelector(`[data-rl-edit="${editing.key}"]`); if(t){ t.focus({preventScroll:true}); try{ t.setSelectionRange(editing.s,editing.e); }catch{} t.scrollTop=editing.top; } }
  B.querySelectorAll("video[data-rl-vid]").forEach(vd=>vd.addEventListener("error",()=>{ const sc=vd.dataset.rlVid==="final"?RL.final:RL.scenes.find(x=>String(x.n)===vd.dataset.rlVid); if(!sc) return;
    const src=vd.getAttribute("src"); if(sc._src&&src===sc._src){ sc._src=null; if(!sc.url) sc._blocked=true; } else sc._blocked=true; rlBoard(); },{once:true}));
  rlRenderNav();
}
function rlAddForm(k){
  const label={character:"New character",location:"New location",prop:"New prop"}[k];
  return `<form class="rl-item rl-addform" data-addform="${k}"><b>${label}</b>
    <input class="rl-field" name="name" placeholder="Name" aria-label="Name" required dir="auto">
    <textarea class="rl-field" name="desc" rows="3" placeholder="${k==="character"?"Who they are, age, look, role in the story":k==="prop"?"The object and why it matters":"The place, time of day, mood"}" aria-label="Description" dir="auto"></textarea>
    <p class="t12 muted">Claude writes the image prompt in the bank's style. You can edit it after.</p>
    <div class="rl-btns"><button class="btn small primary" type="submit">Create</button><button class="btn small" type="button" data-rl="addcancel">Cancel</button></div></form>`;
}
function rlElCard(e,kind){
  const isProp=e.kind==="prop", busy=e.status==="run", writing=e.status==="write", img=rlImgOf(e), th=rlTGet(img); if(img&&!th) rlNeed(img);
  if(e._edit) return `<div class="rl-item rl-edit" dir="auto"><div><span class="rl-tag">${esc(rlLabel(e))}</span><b>Edit</b></div>
    <label class="rl-lab">Name<input class="rl-field" data-rl-edit="${kind}:${e.tag}:name" value="${esc(e.name||"")}"></label>
    <label class="rl-lab">Description<textarea class="rl-field" rows="2" data-rl-edit="${kind}:${e.tag}:description">${esc(e.description||e.role||"")}</textarea></label>
    ${kind==="c"?`<label class="rl-lab">Wardrobe<textarea class="rl-field" rows="2" data-rl-edit="${kind}:${e.tag}:wardrobe">${esc(e.wardrobe||"")}</textarea></label>`:""}
    <label class="rl-lab">Image prompt<textarea class="rl-prompt" data-rl-edit="${kind}:${e.tag}:prompt" spellcheck="false" dir="ltr">${esc(e.prompt||"")}</textarea></label>
    ${e.err?`<p class="rl-status bad">${esc(e.err)}</p>`:""}
    <div class="rl-btns"><button class="btn small primary" type="button" data-rl="editdone" data-tag="${e.tag}">Done</button><button class="btn small" type="button" data-rl="remove" data-tag="${e.tag}">Remove</button></div></div>`;
  return `<div class="rl-item" dir="auto"><div class="rl-ihead"><span class="rl-tag" title="${esc(e.tag)}">${esc(rlLabel(e))}</span><b>${esc(e.name||"")}</b>${e.stale?`<span class="rl-pill warn" title="The prompt changed after this image was made">Changed</span>`:""}</div>
    <div class="rl-media${busy||writing?" busy":""}" style="aspect-ratio:${isProp?"1 / 1":"16 / 9"}">${th?`<img src="${th}" alt="${esc(e.name||"")}" data-zoom="${esc(img)}">`:`<span class="ph">${busy||writing?"":img?"Loading image…":"No image yet"}</span>`}${busy?`<span class="rl-busy">Generating…</span>`:writing?`<span class="rl-busy">Claude is writing…</span>`:""}</div>
    <p>${esc(e.description||e.role||"")}</p>
    ${e.status==="paused"?`<p class="rl-status">Still generating in Magnific — it appears here when it's done.</p>`:""}
    ${e.fromLib?`<p class="rl-status${e.id?"":" bad"}">${e.id?"BAE character from your Magnific library":"Link your Magnific library first (Photography → References → Link library), so this character can be attached."}</p>`:""}
    <div class="rl-btns">${e.fromLib?"":`<button class="btn small${e.id&&!e.stale?"":" primary"}" type="button" data-rl="gen" data-tag="${e.tag}" ${busy||writing||!e.prompt?"disabled":""}>${busy?"Generating…":e.id?"Regenerate":"Generate image"}</button>`}<button class="btn small" type="button" data-rl="edit" data-tag="${e.tag}">Edit</button>${e.web?`<a class="btn small" href="${esc(e.web)}" target="_blank" rel="noopener">Magnific</a>`:""}<span class="rl-sp"></span>${rlRate(kind==="c"?"character":e.kind||"location","el:"+e.tag+":"+(e.id||"p"),`${e.name}: ${e.description||""} | ${String(e.prompt||"").slice(0,600)}`)}</div>
    ${e.fromLib?"":`<form class="rl-revise" data-revise="${e.tag}"><input class="rl-field" name="q" placeholder="Ask for a change… e.g. older, navy blazer" aria-label="Ask Claude to change ${esc(e.name||"")}" dir="auto"><button class="a-btn" type="submit" ${writing?"disabled":""}>Revise</button></form>`}
    ${e.err?`<p class="rl-status bad">${esc(e.err)}</p>`:""}</div>`;
}
function rlEditValue(t){ const p=t.dataset.rlEdit.split(":");
  if(p[0]==="look") return RL.look||"";
  if(p[0]==="s"||p[0]==="f"){ const sc=RL.scenes.find(x=>String(x.n)===p[1]); return sc?(p[0]==="s"?sc.prompt:sc.frame_prompt)||"":null; }
  if(p[0]==="b"){ const s=RL.script?.scenes?.[+p[1]]; if(!s) return null; return p[2]==="dialogue"?(s.dialogue||[]).map(d=>`${d.who||""}: ${d.line||""}`).join("\n"):s[p[2]]||""; }
  const el=rlElByTag(p[1]); return el?el[p[2]||"prompt"]||"":null; }
function rlCommit(t){ const parts=t.dataset.rlEdit.split(":"); const k=parts[0];
  if(k==="look"){ RL.look=t.value; return; }
  if(k==="s"||k==="f"){ const sc=RL.scenes.find(x=>String(x.n)===parts[1]); if(sc){ const old=k==="s"?sc.prompt:sc.frame_prompt; if(old!==t.value&&sc.check) sc.check.dirty=true; if(k==="s") sc.prompt=t.value; else sc.frame_prompt=t.value; } return; }
  if(k==="b"){ const s=RL.script?.scenes?.[+parts[1]]; if(!s) return; const f=parts[2];
    if(f==="dialogue") s.dialogue=t.value.split("\n").map(l=>l.trim()).filter(Boolean).map(l=>{ const i=l.indexOf(":"); return i>0?{who:l.slice(0,i).trim(),line:l.slice(i+1).trim()}:{who:"",line:l}; }); else s[f]=t.value; return; }
  const el=rlElByTag(parts[1]); if(!el) return; const f=parts[2]||"prompt"; if(f==="prompt"&&el.id&&el.prompt!==t.value) el.stale=true; el[f]=t.value; }

/* One scene: the frame on the left (first frame, then the video), prompts and actions on the right */
function rlShotCard(sc){
  const set=rlSet(), ar=set.aspect.replace(":"," / "), f=sc.frame||{};
  const {refs}=rlSceneRefs(sc), fr=rlSceneRefs(sc,"frame_prompt").refs;
  const used=[...new Map([...fr,...refs].filter(r=>!r.map).map(r=>[r.global,r])).values()].sort((x,y)=>+x.global.slice(4)-+y.global.slice(4));
  const vsrc=sc._src||(!sc._blocked&&sc.url)||null, poster=rlTGet(sc.clip)||rlTGet(f.id)||"";
  if(f.id&&!rlTGet(f.id)) rlNeed(f.id);
  const busy=f.status==="run"?"Generating first frame…":sc.status==="run"?(sc.note||"Rendering video…"):"";
  const media=vsrc&&sc.status==="done"?`<video src="${esc(vsrc)}" ${poster?`poster="${poster}"`:""} controls playsinline loop preload="metadata" data-rl-vid="${sc.n}"></video>`
    :poster?`<img src="${poster}" alt="Scene ${sc.n}" data-zoom="${esc(f.id||sc.clip)}">`:`<span class="ph">${busy?"":"Generate the first frame"}</span>`;
  const startOK=!!f.id, useStart=startOK&&sc.useFrame!==false;
  return `<div class="rl-shot" id="rlShot${sc.n}" dir="auto">
    <div class="rl-shot-l">
      <div class="rl-media dark${busy?" busy":""}" style="aspect-ratio:${ar}">${media}${busy?`<span class="rl-busy">${esc(busy)}</span>`:""}${sc.status==="done"?`<span class="rl-badge">Video</span>`:f.id?`<span class="rl-badge">First frame</span>`:""}</div>
      ${used.length?`<div class="rl-refs" aria-label="References attached">${used.map(r=>{ const e=rlElByTag(r.global), im=rlTGet(rlImgOf(e)); return `<span class="rl-ref" title="${esc(e?.name||"")}">${im?`<img src="${im}" alt="" data-zoom="${esc(rlImgOf(e))}">`:`<i></i>`}<b>${esc(rlLabel(e)||r.global)}</b></span>`; }).join("")}</div>`:""}
    </div>
    <div class="rl-shot-r">
      <div class="rl-ihead"><span class="rl-tag">Scene ${sc.n}</span><b>${esc(sc.title||"")}</b> <span class="sub">${sc.duration_s||""} s</span></div>
      ${rlShotBar(sc)}
      ${rlBlockingHTML(sc)}
      <label class="rl-lab" for="rlF${sc.n}">1 · First frame <span>Nano Banana 2.1 · ${set.aspect}</span></label>
      <textarea class="rl-prompt" id="rlF${sc.n}" data-rl-edit="f:${sc.n}" spellcheck="false" dir="ltr" placeholder="Written from the scene when you generate the first frame">${esc(sc.frame_prompt||"")}</textarea>
      <div class="rl-btns"><button class="btn small${f.id?"":" primary"}" type="button" data-rl="frame" data-n="${sc.n}" ${f.status==="run"||f.pending?"disabled":""}>${f.status==="run"||f.pending?"Generating…":f.id?"Regenerate first frame":"Generate first frame"}</button>${f.web?`<a class="btn small" href="${esc(f.web)}" target="_blank" rel="noopener">Magnific</a>`:""}</div>
      ${f.err?`<p class="rl-status bad">${esc(f.err)}</p>`:""}${f.status==="paused"||(f.pending&&f.status!=="run")?`<p class="rl-status">Still generating in Magnific — it appears here when it's done.</p>`:""}${f.stale&&f.id?`<p class="rl-status warn">The supervisor corrected this first-frame prompt after the image was made. Regenerate it.</p>`:""}
      <details class="rl-vp"${sc.status==="done"?"":" open"}><summary>2 · Video <span>Seedance 2.5 · ${Math.max(4,Math.min(15,+sc.duration_s||8))} s</span></summary>
        <textarea class="rl-prompt tall" data-rl-edit="s:${sc.n}" spellcheck="false" dir="ltr">${esc(sc.prompt||"")}</textarea></details>
      <label class="rl-chk"><input type="checkbox" data-rl-start="${sc.n}" ${useStart?"checked":""} ${startOK?"":"disabled"}> Animate from the first frame${startOK?"":" (generate it first)"}</label>
      <div class="rl-btns"><button class="btn small${sc.status!=="done"&&(startOK||sc.useFrame===false)?" primary":""}" type="button" data-rl="render" data-n="${sc.n}" ${sc.status==="run"||sc.pending?"disabled":""}>${sc.status==="run"?"Rendering…":sc.pending?"Rendering in Magnific…":sc.status==="done"?"Generate video again":"Generate video"}</button>${sc.status==="done"&&!vsrc&&!sc._blocked?`<button class="btn small" type="button" data-rl="play" data-n="${sc.n}">Play here</button>`:""}<button class="btn small" type="button" data-rl="copys" data-n="${sc.n}">Copy prompt</button>${sc.url?`<a class="btn small" href="${esc(sc.url)}" target="_blank" rel="noopener">MP4</a>`:""}${sc.web?`<a class="btn small" href="${esc(sc.web)}" target="_blank" rel="noopener">Magnific</a>`:""}</div>
      ${sc.status==="done"||f.id?`<div class="rl-btns rl-rateline"><span class="t12 muted">${sc.status==="done"?"How is this shot?":"How is this first frame?"}</span>${rlRate("shot","shot:"+sc.n+":"+(sc.clip||f.id),`Scene ${sc.n} ${sc.title}: ${String(sc.prompt||"").slice(0,800)}`)}</div>`:""}
      ${sc.note&&sc.status!=="run"?`<p class="rl-status${sc.status==="err"?" bad":""}">${esc(sc.note)}</p>`:""}
      ${sc.stale&&sc.clip?`<p class="rl-status warn">The scene prompt was corrected after this video was made.</p>`:""}
      ${sc._blocked&&!vsrc&&sc.status==="done"?`<p class="rl-status">The video file can't play inside this page, so the frame is shown. Open the MP4 or Magnific to watch it.</p>`:""}
    </div></div>`;
}
/* Deliver: the Magnific Space, the joined reel and the production bible */
function rlDeliver(){
  const sp=RL.space||{}, steps=sp.steps||[], clips=RL.scenes.filter(s=>s.clip), imgs=rlAllCreations();
  const icon=s=>s==="ok"?"✓":s==="run"?'<span class="spin" aria-hidden="true"></span>':s==="err"?"!":s==="skip"?"–":"";
  const fin=RL.final||{}, fsrc=fin._src||(!fin._blocked&&fin.url)||null, fposter=rlTGet(fin.id)||"";
  return rlHead("Deliver","Collect the whole production in a Magnific Space, join the clips into one reel, and keep a copy of every prompt.")+
  `<div class="rl-card rl-space">
    <div class="rl-ihead"><b>Magnific Space</b>${sp.url?`<span class="rl-pill">${sp.builtAt?"Built "+rlAgo(sp.builtAt):"Created"}</span>`:""}</div>
    <p class="muted">One canvas with every character sheet, location, first frame and video as nodes, the brief, script and every prompt pinned as notes, and a Seedance 2.5 node per shot wired to its first frame so you can re-run any shot inside Spaces.</p>
    <p class="t12 muted">${imgs.filter(c=>c.type==="image").length} images · ${imgs.filter(c=>c.type==="video").length} videos · ${RL.scenes.length} shot prompts ready</p>
    ${steps.length?`<ol class="rl-steps2">${steps.map(s=>`<li class="${s.state}"><span class="ic">${icon(s.state)}</span><span><b>${esc(s.label)}</b>${s.note?`<span class="t12 muted">${esc(s.note)}</span>`:""}</span></li>`).join("")}</ol>`:""}
    ${sp.live?`<p class="t12 muted" aria-live="polite">${esc(sp.live)}</p>`:""}
    ${sp.err?`<p class="rl-status bad">${esc(sp.err)}</p>`:""}
    <div class="rl-btns"><button class="btn primary" type="button" data-rl="space" ${sp.status==="run"||!imgs.length?"disabled":""}>${sp.status==="run"?"Building…":sp.id?"Update the Space":"Build in Magnific Space"}</button>${sp.url||sp.id?`<a class="btn" href="${esc(sp.url||"https://www.magnific.com/spaces")}" target="_blank" rel="noopener">Open Space</a>`:""}</div>
    ${!imgs.length?`<p class="t12 muted">Generate at least the cast and locations first.</p>`:""}
  </div>
  <div class="rl-card">
    <div class="rl-ihead"><b>Final reel</b><span class="sub">${clips.length}/${RL.scenes.length} scenes filmed</span></div>
    ${fin.id?`<div class="rl-media dark rl-final" style="aspect-ratio:${rlSet().aspect.replace(":"," / ")}">${fsrc?`<video src="${esc(fsrc)}" ${fposter?`poster="${fposter}"`:""} controls playsinline preload="metadata" data-rl-vid="final"></video>`:fposter?`<img src="${fposter}" alt="Final reel">`:`<span class="ph">Ready in Magnific</span>`}</div>`:""}
    <div class="rl-btns"><button class="btn${clips.length>1?" primary":""}" type="button" data-rl="join" ${clips.length<2||fin.status==="run"?"disabled":""}>${fin.status==="run"?"Joining…":fin.id?"Join again":"Join clips into one reel"}</button>${fin.url?`<a class="btn small" href="${esc(fin.url)}" target="_blank" rel="noopener">MP4</a>`:""}${fin.web?`<a class="btn small" href="${esc(fin.web)}" target="_blank" rel="noopener">Magnific</a>`:""}</div>
    ${fin.note?`<p class="rl-status${fin.err?" bad":""}">${esc(fin.note)}</p>`:""}
  </div>
  <div class="rl-card">
    <div class="rl-ihead"><b>Production bible</b></div>
    <p class="muted">The idea, script, cast, locations and every image and Seedance prompt in one document.</p>
    <div class="rl-btns"><button class="btn" type="button" data-rl="bible">Download</button><button class="btn" type="button" data-rl="copyall">Copy all prompts</button></div>
  </div>`;
}


/* ---------- blocking blueprint: the geography of every scene, decided before a single prompt is written ---------- */
const RL_BP_SCHEMA=`"blueprint": {"zones":[{"id":"in","name":"Apartment entrance hallway (INTERIOR)","x":0,"y":0,"w":62,"h":100}], "openings":[{"name":"Front door","x1":62,"y1":38,"x2":62,"y2":62,"hinge":"left","opens":"inward into the hallway"}], "people":[{"tag":"@img1","name":"Sara","zone":"in","x":52,"y":50,"facing":90,"action":"pulls the door open"}], "props":[{"name":"phone","x":0,"y":0,"state":"in Lina's right hand, screen facing her"}], "cameras":[{"shot":1,"x":20,"y":58,"facing":80,"fov":54,"height":"eye level 1.6 m","zone":"in","move":"slow push-in"}], "light":{"source":"daylight through the open door + warm ceiling practicals","x":96,"y":50,"temp":"5600K outside / 3200K inside"}, "axis":"line Sara–Lina; the camera stays on the south side (y > 50)", "time":"late afternoon", "rules":["Sara is INSIDE in every shot","Lina is OUTSIDE until shot 3","exactly two people"]}
  Plan coordinates: a top-down map, 0–100 on both axes (x left→right, y top→bottom). "facing" is degrees clockwise from up (0 = up, 90 = right, 180 = down, 270 = left). Every person has exactly one zone in the first frame; "cameras" lists where the camera is for each shot.`;
function rlPlanSVG(bp){
  if(!bp||!Array.isArray(bp.zones)&&!Array.isArray(bp.people)) return "";
  const n=v=>Math.max(0,Math.min(100,+v||0)), dir=(a,l)=>[Math.sin((+a||0)*Math.PI/180)*l,-Math.cos((+a||0)*Math.PI/180)*l];
  const fills=["#F1E9DD","#E3EEF4","#F6E3E7","#EAF1E6"];
  const zones=(bp.zones||[]).map((z,i)=>`<rect x="${n(z.x)}" y="${n(z.y)}" width="${n(z.w)}" height="${n(z.h)}" fill="${fills[i%4]}" stroke="#CCC3B4" stroke-width=".4"/><text x="${n(z.x)+1.5}" y="${n(z.y)+4}" class="zl">${esc(String(z.name||z.id||"").slice(0,40))}</text>`).join("");
  const opens=(bp.openings||[]).map(o=>`<line x1="${n(o.x1)}" y1="${n(o.y1)}" x2="${n(o.x2)}" y2="${n(o.y2)}" stroke="#A33755" stroke-width="1.6" stroke-linecap="round"/><text x="${(n(o.x1)+n(o.x2))/2+1.5}" y="${(n(o.y1)+n(o.y2))/2-1.5}" class="ol">${esc(String(o.name||"door").slice(0,18))}</text>`).join("");
  const cams=(bp.cameras||[]).slice(0,4).map((c,i)=>{ const f=Math.max(10,Math.min(120,+c.fov||50)), a=+c.facing||0, [x1,y1]=dir(a-f/2,26), [x2,y2]=dir(a+f/2,26), x=n(c.x), y=n(c.y);
    return `<path d="M${x},${y} L${x+x1},${y+y1} A26,26 0 0 1 ${x+x2},${y+y2} Z" fill="rgba(25,24,30,${i?.04:.08})" stroke="rgba(25,24,30,.25)" stroke-width=".3"/><rect x="${x-2.2}" y="${y-1.6}" width="4.4" height="3.2" rx=".6" fill="#19181E" transform="rotate(${a} ${x} ${y})"/><text x="${x+2.6}" y="${y+4.6}" class="cl">${c.shot?"S"+c.shot:"CAM"}</text>`; }).join("");
  const ppl=(bp.people||[]).map(p=>{ const x=n(p.x), y=n(p.y), [dx,dy]=dir(p.facing,6); return `<line x1="${x}" y1="${y}" x2="${x+dx}" y2="${y+dy}" stroke="#A33755" stroke-width=".9" marker-end="url(#rlArr)"/><circle cx="${x}" cy="${y}" r="3.2" fill="#fff" stroke="#A33755" stroke-width=".9"/><text x="${x}" y="${y+1.2}" class="pl">${esc(String(p.tag||"").replace("@img",""))}</text><text x="${x}" y="${y-4.6}" class="pn">${esc(String(p.name||"").slice(0,14))}</text>`; }).join("");
  const pr=(bp.props||[]).filter(p=>p.x!=null&&(+p.x||+p.y)).map(p=>`<rect x="${n(p.x)-1.2}" y="${n(p.y)-1.2}" width="2.4" height="2.4" fill="#4BBCDF"/><text x="${n(p.x)+2}" y="${n(p.y)+1}" class="ol">${esc(String(p.name||"").slice(0,14))}</text>`).join("");
  const L=bp.light&&bp.light.x!=null?`<circle cx="${n(bp.light.x)}" cy="${n(bp.light.y)}" r="2.2" fill="#F1C0B6" stroke="#B9516E" stroke-width=".4"/><text x="${Math.min(n(bp.light.x),80)}" y="${Math.min(n(bp.light.y)+5.5,98)}" class="ol">light</text>`:"";
  return `<svg class="rl-plan" viewBox="0 0 100 100" role="img" aria-label="Top-down blocking plan"><defs><marker id="rlArr" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#A33755"/></marker></defs><rect width="100" height="100" fill="#FFFAF4"/>${zones}${opens}${cams}${pr}${L}${ppl}</svg>`;
}
function rlBlockingHTML(sc){
  const bp=sc.blueprint, ck=sc.check;
  const zoneName=id=>(bp?.zones||[]).find(z=>z.id===id)?.name||id||"";
  const pill=sc._checking?`<span class="rl-pill"><span class="spin" aria-hidden="true"></span> Checking… <b data-ck-t="${sc.n}">${Math.round((Date.now()-sc._checking)/1000)}s</b> <button type="button" class="rl-stop" data-rl="stopcheck" data-n="${sc.n}">Stop</button></span>`
    :ck?.dirty?`<span class="rl-pill warn">Edited — check again</span>`
    :ck?(ck.issues?.length?`<span class="rl-pill ok">Fixed ${ck.issues.length} · ${ck.passed||0}/8 checks${ck.secs?` · ${ck.secs}s`:""}</span>`:`<span class="rl-pill ok">✓ ${ck.passed||0}/8 checks${ck.secs?` · ${ck.secs}s`:""}</span>`)
    :`<span class="rl-pill">Not checked yet</span>`;
  return `<details class="rl-block"${bp?" open":""}><summary><span>Blocking &amp; continuity</span>${pill}</summary>
    ${bp?`<div class="rl-blockgrid">${rlPlanSVG(bp)}<div class="rl-blocktext" dir="auto">
      ${(bp.people||[]).map(p=>`<p><b>${esc(p.name||p.tag)}</b> ${esc(rlLabel(rlElByTag(p.tag))||p.tag||"")} — <span class="zone">${esc(zoneName(p.zone))}</span>${p.action?` · ${esc(p.action)}`:""}</p>`).join("")}
      ${(bp.openings||[]).map(o=>`<p class="muted">${esc(o.name||"Door")}: hinge ${esc(o.hinge||"?")}, opens ${esc(o.opens||"?")}</p>`).join("")}
      ${(bp.cameras||[]).slice(0,5).map(c=>`<p class="muted">Shot ${esc(c.shot||1)} camera: ${[zoneName(c.zone),c.height,c.fov?c.fov+"° FOV":"",c.move].filter(Boolean).map(esc).join(", ")}</p>`).join("")}
      ${bp.light?`<p class="muted">Light: ${esc(bp.light.source||"")}${bp.light.temp?` · ${esc(bp.light.temp)}`:""}</p>`:""}
      ${bp.axis?`<p class="muted">Axis: ${esc(bp.axis)}</p>`:""}
      ${(bp.rules||[]).length?`<p class="muted">Locks: ${(bp.rules||[]).map(esc).join(" · ")}</p>`:""}
    </div></div>`:`<p class="muted">No blueprint yet. The script supervisor builds one when it checks the scene.</p>`}
    ${ck?.issues?.length?`<ul class="rl-issues">${ck.issues.map(i=>`<li><b>${esc(i.problem||"")}</b>${i.fix?` → ${esc(i.fix)}`:""}</li>`).join("")}</ul>`:""}
    ${ck?.err?`<p class="rl-status bad">${esc(ck.err)}</p>`:""}
    <div class="rl-map">${sc.map?.id?`<img src="${rlTGet(sc.map.id)||""}" alt="Position map" data-zoom="${esc(sc.map.id)}"><div><b>Position map</b><p class="t12 muted">${esc((sc.map.legend||[]).join(" · "))}</p><label class="rl-chk"><input type="checkbox" data-rl-usemap="${sc.n}" ${sc.useMap!==false?"checked":""}> Attach to this shot (positions only)</label></div>`:`<div><b>Position map</b><p class="t12 muted">A top-down image of the location with numbered positions, attached as a reference so people stay exactly where they should (Adil's map technique).</p></div>`}</div>
    ${sc.map?.err?`<p class="rl-status bad">${esc(sc.map.err)}</p>`:""}
    <div class="rl-btns"><button class="a-btn" type="button" data-rl="check" data-n="${sc.n}" ${sc._checking?"disabled":""}>${ck?"Check again":"Check this scene"}</button><button class="a-btn" type="button" data-rl="makemap" data-n="${sc.n}" ${sc.map?.status==="run"?"disabled":""}>${sc.map?.status==="run"?"Making the map…":sc.map?.id?"Remake the map":"Make a position map"}</button></div>
  </details>`;
}
/* The script supervisor: an independent pass that checks every scene against the blueprint, the brain's cinematography and AI-video rules, and fixes the prompts */
/* Fast script supervisor: instant local checks, then ONE short Claude pass per scene (all scenes in parallel) that returns small text patches instead of rewriting whole prompts */
const RL_CHECKLIST=`CHECK, in order (fix only what is wrong):
1 Geography: name the zones (INTERIOR/EXTERIOR, behind/in front of a counter, inside/outside a car); every person is in exactly one zone; door hinge + opening direction; camera zone and which way it looks.
2 Who is where in EVERY shot; screen sides fixed (180° rule); eyelines match.
3 One action per shot; timestamps add up to the duration; "Hard cut." between shots.
4 Props and hands (which hand, screen facing which way); no gibberish text or logos.
5 Light: one motivated source and direction, same time of day; exterior brighter than interior through a doorway.
6 Exact head-count, "no other people, no duplicates"; mirrors/reflections avoided or controlled; same faces and wardrobe (zero drift).
7 Who speaks in which shot; others keep mouths closed.
8 BAE: modern Amman, BAE wardrobe, no logos.`;
function rlQuickCheck(sc){
  const w=[], P=sc.prompt||"", F=sc.frame_prompt||"", bp=sc.blueprint;
  const ts=[...P.matchAll(/(\d+):(\d{2}(?:\.\d+)?)\s*[–-]\s*(\d+):(\d{2}(?:\.\d+)?)/g)].map(m=>(+m[3])*60+(+m[4]));
  if(ts.length&&Math.abs(Math.max(...ts)-(+sc.duration_s||0))>0.6) w.push(`Shot timings end at ${Math.max(...ts)}s but the scene is ${sc.duration_s}s.`);
  for(const t of new Set([...rlTokens(P),...rlTokens(F)])) if(!rlElByTag(t)) w.push(`${t} isn't in Cast or Locations.`);
  if(bp&&(bp.zones||[]).length>1){ const zonesUsed=new Set((bp.people||[]).map(p=>p.zone)); if(zonesUsed.size>1&&!/inside|interior/i.test(F+P)&&!/outside|exterior/i.test(F+P)) w.push("The prompts don't say who is inside and who is outside."); }
  if(!/exactly (one|two|three|four|\d+) (person|people|women|men)|no other people/i.test(P+F)&&(bp?.people||[]).length) w.push("Head-count isn't stated.");
  return w;
}
function rlPatch(text,edits){
  let t=String(text||""); let n=0;
  for(const ed of (edits||[])){ const find=String(ed?.find||""), rep=String(ed?.replace||""); if(!rep&&!find) continue;
    if(rep&&t.includes(rep)) continue;
    if(find&&t.includes(find)){ t=t.replace(find,rep); n++; }
    else if(rep){ t=t.replace(/\s*$/,"")+"\n"+rep; n++; } }
  return {text:t,n};
}
async function rlCheckScenes(ns,{quiet}={}){
  if(!RL||!sample) return;
  const list=RL.scenes.filter(s=>(!ns||ns.map(String).includes(String(s.n)))&&!s._checking); if(!list.length) return Promise.all(RL.scenes.filter(s=>s._checkP).map(s=>s._checkP));
  let done; const all=new Promise(r=>done=r); list.forEach(s=>{ s._checkP=all; });
  list.forEach(s=>{ s._checking=Date.now(); s.checkPending=true; s._ctl=new AbortController(); }); rlFlush(); if(!quiet) rlBoard(); else rlBoardSoon(); rlWake(true); rlTick();
  await brLoad();
  const lessons=(BR.sections.find(s=>s.id==="lessons")?.text||"").slice(0,700), set=rlSet();
  await Promise.all(list.map(async sc=>{
    const local=rlQuickCheck(sc), beat=RL.script?.scenes?.[(+sc.n||1)-1]||null;
    try{
      const out=await rlAsk(`You are a fast, precise script supervisor for an AI-video scene (${set.aspect}; Nano Banana first frame, then Seedance 2.5). Find what would make the AI misread the scene and fix it with SMALL text edits. Do not rewrite or restyle what is already correct.
${RL_CHECKLIST}
Team lessons: ${lessons||"none"}
Script beat: ${trimJSON(beat,1200)}
People and places: ${trimJSON([...RL.characters,...RL.locations].map(e=>`${e.tag} ${e.name}`),600)}
Automatic warnings: ${local.join(" | ")||"none"}
SCENE ${sc.n} (${sc.duration_s||""} s)
Blueprint: ${sc.blueprint?trimJSON(sc.blueprint,3500):"MISSING — write one"}
First-frame prompt:
${sc.frame_prompt||"(empty)"}
Seedance prompt:
${sc.prompt||"(empty)"}

Reply with only JSON:
{"passed":<number of the 8 checks that pass after your fixes>,"issues":[{"problem":"short","fix":"short"}],"frame_edits":[{"find":"exact text from the first-frame prompt (or empty to append)","replace":"new text"}],"prompt_edits":[{"find":"exact text from the Seedance prompt (or empty to append)","replace":"new text"}],"blueprint":null}
Return "blueprint" only if it is missing or wrong (format: ${RL_BP_SCHEMA}). Keep @img tags exactly. Empty arrays when nothing is wrong.`,{modelTier:"default",effort:"low",cache:false,signal:sc._ctl.signal});
      if(out?.blueprint&&typeof out.blueprint==="object") sc.blueprint=out.blueprint;
      const f=rlPatch(sc.frame_prompt,out?.frame_edits), p=rlPatch(sc.prompt,out?.prompt_edits);
      if(f.n){ sc.frame_prompt=f.text; if(sc.frame?.id) sc.frame.stale=true; }
      if(p.n){ sc.prompt=p.text; if(sc.clip) sc.stale=true; }
      sc.check={at:Date.now(),secs:Math.round((Date.now()-sc._checking)/1000),passed:Math.min(8,+out?.passed||0),issues:Array.isArray(out?.issues)?out.issues.slice(0,10):[],dirty:false};
      delete sc.checkPending;
    }catch(e){
      if(e?.code==="cancelled"){ delete sc.checkPending; sc.check={...(sc.check||{}),err:"Stopped.",dirty:true}; }
      else if(rlTransient(e)) sc.check={...(sc.check||{}),err:"Paused: the connection dropped. The check continues when you're back.",dirty:true};
      else { delete sc.checkPending; sc.check={...(sc.check||{}),err:sampleCopy(e),dirty:true}; }
    }finally{ delete sc._checking; delete sc._ctl; rlSave(); rlBoardSoon(); }
  }));
  list.forEach(s=>delete s._checkP); done(); rlWake(false);
}
/* live seconds on the "checking" pill without redrawing the board */
let rlTickT=null;
function rlTick(){ clearInterval(rlTickT); rlTickT=setInterval(()=>{ const busy=RL?.scenes?.filter(s=>s._checking)||[]; if(!busy.length){ clearInterval(rlTickT); return; }
  document.querySelectorAll("[data-ck-t]").forEach(el=>{ const sc=RL.scenes.find(s=>String(s.n)===el.dataset.ckT); if(sc?._checking) el.textContent=Math.round((Date.now()-sc._checking)/1000)+"s"; }); },1000); }
/* Rewrite one scene: "Update shot prompt" makes it better with everything the Director knows today; "Ask for edit" applies the user's own change. Every version is kept so it can be undone. */
async function rlImproveScene(n,instruction){
  const sc=RL.scenes.find(x=>+x.n===+n); if(!sc||!sample||sc._improving) return;
  instruction=String(instruction||"").trim();
  sc._improving=instruction?"edit":"upgrade"; sc._ask=false; sc.improveErr=null; sc.improvePending={instruction}; rlFlush(); rlBoard(); rlWake(true);
  if(instruction) brSignal("shot","edit_requested",-1,{note:instruction,item:`Scene ${sc.n} · ${sc.title||""}`,before:sc.prompt,key:sc.n+instruction});
  await brLoad();
  const set=rlSet(), before={title:sc.title,duration_s:sc.duration_s,refs:sc.refs,blueprint:sc.blueprint,frame_prompt:sc.frame_prompt,prompt:sc.prompt};
  let ok=false;
  try{
    const out=await rlAsk(`You are the Director of a Bank al Etihad reel (${set.aspect}, Seedance 2.5 animating from a Nano Banana 2.1 first frame, dialogue ${set.lang}).
${instruction?`THE USER ASKED FOR THIS CHANGE TO SCENE ${sc.n}: "${instruction}"
Apply it precisely and completely. Keep everything the user didn't ask to change (story beat, cast, wardrobe, location, tags), unless the change requires it.`:`UPDATE SHOT PROMPT: rewrite scene ${sc.n} so it is clearly BETTER than the current version, using everything in the brain below, especially the team's latest lessons and this morning's research. Raise the craft: a stronger first-second hook, more precise and motivated camera work (shot sizes, FOV°, moves with speed), better light, a more specific and natural performance, cleaner physics, tighter timing, sharper sound design. Do not change the story beat, the cast or the location.`}
Rules: keep every element handle (@char_…, @loc_…, @prop_…) exactly; write in the SCENE PROMPT FORMAT of the brain (opener, SECTION + location, first-frame blocking, SHOT n (a–b s) with mm + FOV°, one move with distance and speed, framing limits, camera height, ACTING micro-detail and what not to do, per-second action for continuous takes, HEAD PRIORITY framing, props, RULES, sound); do not add a REFERENCES block or the film look (the studio adds them); state the geography explicitly (zones, who is where, door direction, camera position and direction, head-count, light source); one action per shot; timestamps add up to duration_s (4–15 s). Update the blueprint if the blocking changes, and keep frame_prompt = the exact first moment of shot 1. Avoid every mistake in the AI-video rules.

${RL_BAE}

${brText()}

PROJECT: script ${trimJSON(RL.script,4000)}
CAST: ${trimJSON(RL.characters.map(({tag,name,description,wardrobe})=>({tag,name,description,wardrobe})),2500)}
LOCATIONS & PROPS: ${trimJSON(RL.locations.map(({tag,name,kind,description})=>({tag,name,kind,description})),2000)}
CURRENT SCENE: ${trimJSON({n:sc.n,...before},16000)}

Blueprint format: ${RL_BP_SCHEMA}

Before answering, run this check on your own result and fix anything that fails:
${RL_CHECKLIST}

Reply with only JSON: {"title":"","duration_s":0,"refs":["@img1"],"blueprint":{...},"frame_prompt":"full text","prompt":"full text","passed":8,"changes":["3–6 short bullets saying what you changed and why, in the user's language"]}`,{modelTier:"default",effort:"medium",cache:false});
    if(!out||!out.prompt) throw {code:"invalid_json",message:"Claude didn't return a new prompt."};
    sc.history=[{...before,at:Date.now(),why:instruction||"Update shot prompt"},...(sc.history||[])].slice(0,6);
    if(out.title) sc.title=String(out.title);
    if(+out.duration_s) sc.duration_s=Math.max(4,Math.min(15,+out.duration_s));
    if(Array.isArray(out.refs)&&out.refs.length) sc.refs=out.refs.map(String);
    if(out.blueprint&&typeof out.blueprint==="object") sc.blueprint=out.blueprint;
    if(out.frame_prompt&&out.frame_prompt!==sc.frame_prompt){ sc.frame_prompt=String(out.frame_prompt); if(sc.frame?.id) sc.frame.stale=true; }
    if(out.prompt!==sc.prompt){ sc.prompt=String(out.prompt); if(sc.clip) sc.stale=true; }
    sc.lastChange={at:Date.now(),kind:instruction?"edit":"upgrade",ask:instruction||"",changes:Array.isArray(out.changes)?out.changes.slice(0,8).map(String):[]};
    sc.check={at:Date.now(),passed:Math.min(8,+out.passed||8),issues:[],dirty:false,by:"rewrite"}; ok=true; delete sc.improvePending;
  }catch(e){ if(rlTransient(e)) sc.improveErr="Paused: the connection dropped. It continues when you're back."; else { sc.improveErr=sampleCopy(e); delete sc.improvePending; } }
  finally{ delete sc._improving; rlWake(false); rlSave(); rlBoard(); }
  if(ok){ const w=rlQuickCheck(sc); if(w.length) await rlCheckScenes([sc.n],{quiet:true}); }
}
function rlUndoScene(n){
  const sc=RL.scenes.find(x=>+x.n===+n); const h=sc?.history?.[0]; if(!h) return;
  sc.history=sc.history.slice(1);
  Object.assign(sc,{title:h.title,duration_s:h.duration_s,refs:h.refs,blueprint:h.blueprint,frame_prompt:h.frame_prompt,prompt:h.prompt});
  if(sc.frame?.id) sc.frame.stale=true; if(sc.clip) sc.stale=true; if(sc.check) sc.check.dirty=true;
  sc.lastChange={at:Date.now(),kind:"undo",changes:[`Back to the version before “${h.why}”.`]}; rlSave(); rlBoard();
}
function rlShotBar(sc){
  const busy=sc._improving, ar=rlAr();
  const chips=ar?["سينمائي أكثر","أضحك","لقطات أقرب","حركة كاميرا أجرأ","أقصر وأسرع"]:["More cinematic","Funnier","Closer shots","Bolder camera","Shorter, faster"];
  const room=sc.room?.items?.filter(x=>!x.done)||[];
  return `${sc.logline?`<p class="rl-logline" dir="auto">${esc(sc.logline)}</p>`:""}<div class="rl-shotbar"><button class="btn small primary" type="button" data-rl="improve" data-n="${sc.n}" ${busy?"disabled":""}>${busy==="upgrade"?"Rewriting…":"Update shot prompt"}</button><button class="btn small" type="button" data-rl="ask" data-n="${sc.n}" aria-expanded="${!!sc._ask}" ${busy?"disabled":""}>${busy==="edit"?"Applying your edit…":"Ask for edit"}</button><button class="btn small" type="button" data-rl="room" data-n="${sc.n}" ${sc._room||busy?"disabled":""}>${sc._room?"The room is thinking…":"Ask the room"}</button>${sc.history?.length?`<button class="a-btn" type="button" data-rl="undo" data-n="${sc.n}" ${busy?"disabled":""} title="Back to the previous version">Undo</button>`:""}</div>
  ${sc._ask?`<form class="rl-ask" data-ask="${sc.n}"><label class="t12 muted" for="rlAsk${sc.n}">What should change in this scene? Write it any way you like.</label><textarea class="rl-field" id="rlAsk${sc.n}" name="q" rows="3" dir="auto" placeholder="${ar?"مثلاً: خلي الكاميرا هاند هيلد، وسارة تبتسم لما تفتح الباب، والضو أدفى":"e.g. make it handheld, she smiles when she opens the door, warmer light"}"></textarea><div class="rl-askchips">${chips.map(c=>`<button type="button" data-chip="${esc(c)}">${esc(c)}</button>`).join("")}</div><div class="rl-btns"><button class="btn small primary" type="submit">Apply edit</button><button class="btn small" type="button" data-rl="askcancel" data-n="${sc.n}">Cancel</button><span class="t12 muted">⌘/Ctrl + Enter</span></div></form>`:""}
  ${busy?`<p class="rl-status"><span class="spin" aria-hidden="true" style="display:inline-block;vertical-align:-2px"></span> ${busy==="edit"?"Applying your edit, then the script supervisor checks it…":"Rewriting with everything the Director knows today, then the script supervisor checks it…"}</p>`:""}
  ${sc.improveErr?`<p class="rl-status bad">${esc(sc.improveErr)}</p>`:""}
  ${sc.roomErr?`<p class="rl-status bad">${esc(sc.roomErr)}</p>`:""}
  ${room.length?`<div class="rl-room" dir="auto">${sc.room.items.map((x,i)=>x.done?"":`<div class="rl-roomi"><span class="ic" aria-hidden="true">${esc(rlAdv(x.id).icon||"•")}</span><div><span class="t12 muted">${esc(rlAdv(x.id).name||x.id)}</span><b>${esc(x.title)}</b><p>${esc(x.why)}</p><div class="rl-btns"><button class="btn small primary" type="button" data-rl="roomapply" data-n="${sc.n}" data-i="${i}" ${busy?"disabled":""}>Apply</button><button class="a-btn" type="button" data-rl="roomskip" data-n="${sc.n}" data-i="${i}">Skip</button></div></div></div>`).join("")}</div>`:""}
  ${sc.lastChange?.changes?.length&&!busy?`<div class="rl-changes"><b>${sc.lastChange.kind==="edit"?"Your edit":sc.lastChange.kind==="undo"?"Undone":"Updated"}</b>${sc.lastChange.ask?` · “${esc(sc.lastChange.ask)}”`:""}<ul>${sc.lastChange.changes.map(c=>`<li dir="auto">${esc(c)}</li>`).join("")}</ul></div>`:""}`;
}
/* Adil's map technique: a top-down image of the location with numbered positions, attached to the shot as a positions-only reference */
async function rlMakeMap(n){
  const sc=RL.scenes.find(x=>+x.n===+n); if(!sc||!mcp||!sample||sc.map?.status==="run") return;
  if(!S.connected) await connect(true);
  const loc=[...rlTokens(sc.prompt),...rlTokens(sc.frame_prompt),...(sc.refs||[])].map(rlElByTag).find(e=>e&&RL.locations.includes(e)&&e.kind!=="prop");
  sc.map={...(sc.map||{}),status:"run",err:null}; rlBoard(); rlWake(true);
  try{
    if(!loc) throw {code:"tool_error",message:"This scene doesn't name a location (@loc_…)."};
    if(!loc.id) throw {code:"tool_error",message:`Generate the location ${loc.handle} first.`};
    await rlEnsureChecked(sc);
    const bp=sc.blueprint||{}, zone=id=>(bp.zones||[]).find(z=>z.id===id)?.name||"";
    const where=p=>`${(+p.x)<35?"left":(+p.x)>65?"right":"centre"}-${(+p.y)<35?"back":(+p.y)>65?"front":"middle"} of the space${zone(p.zone)?` (${zone(p.zone)})`:""}`;
    const people=bp.people||[], cam=(bp.cameras||[])[0];
    const legend=people.map((p,i)=>`${i+1} = ${p.name||p.tag}`);
    const prompt=`High angle top-down wide shot of the location @img1, seen from above at about 70 degrees, completely empty, the same architecture, materials, doors and light. On the floor, flat bright red circles with large white numbers mark positions: ${people.map((p,i)=>`circle ${i+1} where ${p.name||p.tag} stands, ${where(p)}`).join("; ")}${cam?`; a black triangle marked C where the camera stands for shot 1, ${where(cam)}`:""}. Doors and openings exactly as in the location${(bp.openings||[]).length?` (${bp.openings.map(o=>`${o.name}: opens ${o.opens||"?"}`).join("; ")})`:""}. No people, no furniture changes, no text other than the numbers and C, photoreal.`;
    const out=await rlImage({prompt,aspect:"1:1",refs:[{id:loc.id,tag:"@img1"}],label:"position map"});
    sc.map={id:out.id,web:out.web,legend,status:"ok"}; sc.useMap=true;
  }catch(err){ sc.map={...(sc.map||{}),status:"err",err:mcpCopy(err)}; }
  finally{ rlWake(false); rlSave(); rlBoard(); }
}
/* Ask the room: the five assistant directors each give one concrete improvement for a scene; Apply sends it through Ask for edit */
async function rlRoom(n){
  const sc=RL.scenes.find(x=>+x.n===+n); if(!sc||!sample||sc._room) return;
  sc._room=true; sc.roomErr=null; rlBoard(); rlWake(true);
  await brLoad();
  const ids=["trend","story","dp","performance","tech"];
  try{
    const out=await rlAsk(`Five assistant directors review ONE scene of a Bank al Etihad reel (${rlSet().aspect}, Seedance 2.5). Each gives exactly ONE concrete, high-impact improvement from their speciality, grounded in their latest research notes and the team's lessons. No generic advice; name the exact change (lens, move, beat, line, gesture, prop, constraint…). Write in the user's language (${rlAr()?"Arabic, Jordanian tone":"English"}); keep handles (@char_…) as they are.
${ids.map(id=>{ const A=rlAdv(id); return `[${id}] ${A.name} — ${A.role}\nLatest notes: ${String(A.notes||"").slice(0,700)}`; }).join("\n\n")}
Team lessons: ${(BR.sections.find(s=>s.id==="lessons")?.text||"").slice(0,800)}
Script beat: ${trimJSON(RL.script?.scenes?.[(+sc.n||1)-1]||null,1000)}
Scene ${sc.n} "${sc.title||""}" (${sc.duration_s||""} s):
${String(sc.prompt||"").slice(0,6000)}
Reply with only JSON: {"suggestions":[{"id":"trend","title":"3–6 words","why":"one line","instruction":"the exact edit to make, written as an instruction to the director"}]} — exactly 5, one per id in this order: ${ids.join(", ")}.`,{modelTier:"default",effort:"low",cache:false});
    sc.room={at:Date.now(),items:(out?.suggestions||[]).filter(x=>x&&x.instruction).slice(0,5).map(x=>({id:String(x.id||""),title:String(x.title||""),why:String(x.why||""),instruction:String(x.instruction)}))};
  }catch(e){ sc.roomErr=sampleCopy(e); }
  finally{ delete sc._room; rlWake(false); rlSave(); rlBoard(); }
}
async function rlEnsureChecked(sc){ if(sc._checkP){ await sc._checkP; return; } if(!sc.check||sc.check.dirty||!sc.blueprint){ await rlCheckScenes([sc.n],{quiet:true}); } }
/* ---------- Magnific: images for cast, locations and first frames ---------- */
async function rlImage({prompt,aspect,refs=[],label,onQueued}){
  const model=$("selNano").value||null;
  const plan=await buildArgs("images_generate",`Generate exactly 1 photorealistic image with model "${model||"Nano Banana 2.1"}" (Google Nano Banana 2.1). Use the prompt verbatim. Aspect ratio ${aspect}. Highest quality, 2K or 4K if offered. ${refs.length?"Attach EVERY item of Data.references as image references, in exactly this order (the first is @img1, the second @img2…), using each item's identifier.":"No references."}`,
    {model, model_label:"Nano Banana 2.1", prompt, aspect_ratio:aspect, num_images:1, references:refs.length?refs.map(r=>({identifier:r.id,id:r.id,type:"image",name:r.tag})):undefined},"default");
  const r=await callMag("images_generate",oneImage(refs.length?fixRefs(plan.args,refs.map(r=>({id:r.id}))):plan.args));
  let rr=readResult(r); if(!rr.ids.length&&!rr.images.length) rr=await extractWithClaude(r,"the creation identifier of the image being generated");
  const id0=rr.ids[0]; const web=rr.webUrl||null;
  if(id0&&onQueued) onQueued(id0,web);
  if(!rr.images.length&&!DONE.test(rr.status)&&id0) rr=await waitFor([id0],label||"image");
  const id=rr.ids[0]||id0; if(!id) throw {code:"tool_error",message:"Magnific returned no creation."};
  let shot=rr.images[0]; if(!shot){ const pv=await preview(id); shot=pv.image; }
  if(shot){ const src=`data:${shot.mime};base64,${shot.data}`; rlFull[id]=src; rlTSet(id,await rlThumb(src)); }
  return {id, web:rr.webUrl||web};
}
async function rlGenElement(tag){
  const e=rlElByTag(tag); if(!e||!mcp||!sample||e.status==="run"||!e.prompt) return;
  if(!S.connected) await connect(true);
  e.status="run"; e.err=null; e._live=true; rlBoard();
  const isLoc=RL.locations.includes(e)&&e.kind!=="prop";
  const sendPrompt=isLoc||/plain gr[ae]y clean background/i.test(e.prompt)?e.prompt:`${e.prompt}\nBackground: plain gray clean background — seamless flat matte mid-grey, no gradient, no texture, no floor line, no shadows on the backdrop.`;
  try{ const out=await rlJob(()=>rlImage({prompt:sendPrompt,aspect:"16:9",label:"reference image",onQueued:(id,web)=>{ e.pending=id; e.web=web||e.web; rlFlush(); }})); Object.assign(e,{id:out.id,web:out.web,status:"ok",stale:false}); delete e.pending; }
  catch(err){ if(e.pending&&rlTransient(err)){ e.status="paused"; e.err=null; } else { e.status="err"; e.err=mcpCopy(err); delete e.pending; } }
  finally{ delete e._live; }
  rlSave(); rlBoard();
}
async function rlGenFrame(n){
  const sc=RL.scenes.find(x=>+x.n===+n); if(!sc||!mcp||!sample||sc.frame?.status==="run") return;
  if(!S.connected) await connect(true);
  const f=sc.frame=sc.frame||{}; f.status="run"; f.err=null; f._live=true; rlBoard(); rlWake(true);
  try{
    await rlEnsureChecked(sc);
    if(!(sc.frame_prompt||"").trim()){
      const o=await rlAsk(`Write ONE photorealistic still-image prompt (Google Nano Banana 2.1) for the exact FIRST FRAME of this Seedance 2.5 scene: shot size, lens, camera height, blocking and screen sides, wardrobe, props, light and grade, as in its first shot. Name people, places and props with their handles exactly as the scene does ("@char_sara stands…"); the studio adds the references block itself. State the geography explicitly from the blueprint: zones (INTERIOR/EXTERIOR…), who is in which zone, door direction, where the camera stands and looks, exact head-count, light source. No motion words. ${RL_BAE}\n\nBlueprint: ${trimJSON(sc.blueprint||null,4000)}\n\nScene prompt:\n${sc.prompt}\n\nReply with only JSON: {"frame_prompt":"..."}`,{modelTier:"default"});
      sc.frame_prompt=String(o?.frame_prompt||"").trim(); if(!sc.frame_prompt) throw {code:"invalid_json",message:"Claude didn't return a first-frame prompt."};
    }
    const {prompt,refs,missing}=rlSceneRefs(sc,"frame_prompt");
    if(missing.length) throw {code:"tool_error",message:`Generate ${missing.join(", ")} first, so the first frame can use them.`};
    const out=await rlImage({prompt,aspect:rlSet().aspect,refs,label:"first frame",onQueued:(id,web)=>{ f.pending=id; f.web=web||f.web; rlFlush(); }});
    Object.assign(f,{id:out.id,web:out.web,status:"ok",stale:false}); delete f.pending;
  }catch(err){ if(f.pending&&rlTransient(err)){ f.status="paused"; f.err=null; } else { f.status="err"; f.err=mcpCopy(err); delete f.pending; } }
  finally{ delete f._live; rlWake(false); }
  rlSave(); rlBoard();
}
function rlZoom(cid){ const src=rlFull[cid]||rlTGet(cid); if(!src) return; let lb=$("rlLb");
  if(!lb){ lb=document.createElement("div"); lb.id="rlLb"; lb.className="rl-lb"; lb.hidden=true; lb.setAttribute("role","dialog"); lb.setAttribute("aria-label","Image preview"); lb.innerHTML='<button type="button" aria-label="Close">×</button><img alt="">'; lb.onclick=()=>{ lb.hidden=true; }; $("reels").appendChild(lb); }
  lb.querySelector("img").src=src; lb.hidden=false; lb.querySelector("button").focus(); }

/* ---------- Magnific: Seedance 2.5 video per scene ---------- */
async function rlModel(){
  if(rlModel.m) return rlModel.m;
  let r; try{ r=await callMag("video_models_list",{}); }catch(e){ const a=await buildArgs("video_models_list","List the video models, searching for Seedance 2.5.",{query:"Seedance 2.5"}); r=await callMag("video_models_list",a.args); }
  const raw=r.payload??r.content; let id=null, name="Seedance 2.5";
  walk(raw,(k,v,o)=>{ if(id) return; if(typeof v==="string"&&/seedance[\s._-]*2[\s._-]*5/i.test(v)){ id=o.id||o.slug||o.identifier||o.model||o.key||v; name=o.name||o.label||v; } });
  if(!id&&typeof raw==="string"){ const m=raw.match(/([a-z0-9._-]*seedance[a-z0-9._-]*2[._-]?5[a-z0-9._-]*)/i); if(m) id=m[1]; }
  return rlModel.m={id,name,raw:trimJSON(raw,6000)};
}
/* At send time: the elements a prompt names (by handle or tag) are attached in tag order and renumbered @img1…,
   a REFERENCES block says what each image is for, the shared FILM LOOK goes on top, and an optional position map is attached last */
function rlRefLine(r){ const e=r.el;
  if(RL.characters.includes(e)) return `${r.tag} = ${e.name} (${e.handle}): identity reference from a three-panel character sheet — use this person's face, hair, build and wardrobe only; ignore the grey backdrop, the panel layout and the headless body panels.`;
  if(e.kind==="prop") return `${r.tag} = ${e.name} (${e.handle}): the exact prop — shape, materials, colours and details.`;
  return `${r.tag} = ${e.name} (${e.handle}): the location as a STYLE reference — architecture, materials, textures and light; not a fixed frame.`; }
function rlSceneRefs(sc,field="prompt",{compose=true}={}){
  const txt=sc[field]||"";
  const els=[]; for(const t of [...(field==="prompt"?(sc.refs||[]):[]),...rlTokens(txt)]){ const el=rlElByTag(t); if(el&&!els.includes(el)) els.push(el); }
  els.sort((x,y)=>+String(x.tag).slice(4)-+String(y.tag).slice(4));
  const map=new Map(); els.forEach((el,i)=>map.set(el,"@img"+(i+1)));
  let body=txt.replace(RL_TOK,t=>{ const el=rlElByTag(t); return el&&map.has(el)?map.get(el):t; });
  const refs=els.map(el=>({tag:map.get(el),global:el.tag,id:el.id,name:el.name,el}));
  if(sc.map?.id&&sc.useMap!==false) refs.push({tag:"@img"+(refs.length+1),global:"map",id:sc.map.id,name:"position map",map:true});
  if(compose){
    const lines=refs.map(r=>r.map?`${r.tag} = POSITION MAP of the location seen from above: it ONLY defines where people stand (${(sc.map.legend||[]).join("; ")}) and where the camera is (C). Never copy its top-down view, circles or numbers into the ${field==="prompt"?"video":"image"}.`:rlRefLine(r));
    const parts=[]; if(RL.look&&!/GLOBAL STYLE\s*:|FILM LOOK\s*:/i.test(body)) parts.push(`FILM LOOK: ${RL.look}`);
    if(lines.length&&!/^REFERENCES\s*:/im.test(body)) parts.push(`REFERENCES:\n${lines.join("\n")}`);
    parts.push(body); body=parts.join("\n\n");
  }
  return {prompt:body, refs:refs.map(({el,...r})=>r), missing:els.filter(el=>!el.id).map(el=>el.tag)};
}
async function rlRenderScene(n){
  const sc=RL.scenes.find(x=>+x.n===+n); if(!sc||!mcp||!sample||sc.status==="run") return;
  if(!S.connected) await connect(true);
  if(!sc.check||sc.check.dirty||!sc.blueprint){ sc.status="run"; sc.note="The script supervisor is checking the scene first…"; rlBoard(); await rlEnsureChecked(sc); sc.status=null; }
  const {prompt:p0,refs,missing}=rlSceneRefs(sc);
  if(missing.length){ sc.status="err"; sc.note=`Generate ${missing.join(", ")} first (Cast / Locations), so they can be attached.`; rlBoard(); return; }
  const start=sc.useFrame!==false&&sc.frame?.id?sc.frame.id:null;
  const prompt=start?`START FRAME: the video begins exactly on the provided start image and animates from it; keep its composition, faces, wardrobe, place and light.\n\n${p0}`:p0;
  sc.status="run"; sc.note="Finding Seedance 2.5…"; sc._blocked=false; sc._live=true; rlBoard(); rlWake(true);
  const t0=Date.now();
  try{
    const m=await rlModel(); const set=rlSet(); const dur=Math.max(4,Math.min(15,+sc.duration_s||8));
    sc.note=start?"Sending the first frame to Seedance 2.5…":"Sending to Seedance 2.5…"; rlBoard();
    const plan=await buildArgs("video_generate",`Generate ONE video with the Seedance 2.5 model${m.id?` (model id "${m.id}")`:""}. Use the prompt verbatim. Duration ${dur} seconds. Aspect ratio ${set.aspect}. ${set.res==="draft"?"Draft mode (480p preview) if the tool offers it.":`Resolution ${set.res}.`} Audio on (the prompt writes the sound). ${start?"IMAGE-TO-VIDEO: put Data.start_image.identifier in the tool's start image / first frame / init image field so the video starts on that frame. ":""}Attach EVERY item of Data.references as image references, in exactly this order, so the first is @img1, the second @img2 and so on; use each item's identifier.${start?" Do not add the start image to the references list unless the tool has no separate start image field; if it has none, put it FIRST in the references with role start/first frame and keep the others after it.":""} If the model id is not in Data, pick the Seedance 2.5 entry from Data.models.`,
      {model:m.id, model_name:m.name, models:m.id?null:m.raw, prompt, duration_seconds:dur, aspect_ratio:set.aspect, resolution:set.res==="draft"?"480p":set.res, mode:set.res==="draft"?"draft":"standard", start_image:start?{identifier:start,type:"image"}:undefined, references:refs.map(r=>({identifier:r.id,type:"image",name:r.tag}))},"default");
    const args=fixRefs(plan.args,refs.map(r=>({id:r.id})));
    const r=await callMag("video_generate",args);
    let rr=readResult(r); if(!rr.ids.length&&!rr.urls.length) rr=await extractWithClaude(r,"the creation identifier of the video being generated");
    const id=rr.ids[0]; sc.web=rr.webUrl||sc.web||null;
    if(id){ sc.pending=id; sc.pendingAt=Date.now(); rlFlush(); }
    if(!DONE.test(rr.status)&&id){ sc.note="Rendering in Magnific… a few minutes. You can leave this page: the render continues in Magnific and shows up here when you're back."; rlBoard(); rr=await waitFor([id],"Seedance 2.5 video",30,true); }
    await rlFinishVideo(sc,rr,id);
    sc.note=`Ready in ${fmtTime(t0)}${start?" · animated from the first frame":""}${set.res==="draft"?" · draft 480p: generate again at 720p or 1080p when you like it":""}.`;
  }catch(err){ if(sc.pending&&rlTransient(err)){ sc.status="paused"; sc.note="Still rendering in Magnific. It shows up here when you're back."; } else { sc.status="err"; sc.note=mcpCopy(err); delete sc.pending; } }
  finally{ delete sc._live; rlWake(false); }
  rlSave(); rlBoard();
}
async function rlFinishVideo(sc,rr,id){
  sc.clip=rr.ids[0]||id; sc.web=rr.webUrl||sc.web;
  const all=[...rr.urls,...rr.links]; sc.url=all.find(u=>/\.(mp4|mov|webm)(\?|#|$)/i.test(u))||all.find(u=>/video|render|output/i.test(u)&&!/magnific\.com\/app\//i.test(u))||null;
  await rlLoadVideo(sc,sc.clip);
  sc.status="done"; sc.stale=false; delete sc.pending; delete sc.pendingAt;
}
/* Ask Magnific for the finished video itself (playable in the page), else a poster frame and the file link */
async function rlLoadVideo(o,cid){
  if(!cid) return;
  const b64Url=(d,mime)=>{ try{ const bin=atob(d); const u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return URL.createObjectURL(new Blob([u],{type:mime})); }catch{ return null; } };
  try{
    const a=await buildArgs("creations_read","Read this finished VIDEO creation so its media is returned: the video file itself if the tool can, otherwise a poster frame and the video file URL.",{identifier:cid});
    const r=await callMag("creations_read",a.args);
    for(const b of (r?.content||[])){
      const rs=b.type==="resource"?b.resource:null;
      if(rs?.blob&&/^video\//.test(rs.mimeType||"")&&!o._src) o._src=b64Url(rs.blob,rs.mimeType);
      if(b.type==="video"&&b.data&&!o._src) o._src=b64Url(b.data,b.mimeType||"video/mp4");
    }
    const x=readResult(r);
    if(!o.url) o.url=[...x.urls,...x.links].find(u=>/\.(mp4|mov|webm)(\?|#|$)/i.test(u))||null;
    if(x.images[0]) rlTSet(cid,await rlThumb(`data:${x.images[0].mime};base64,${x.images[0].data}`));
  }catch(e){ log("✕","creations_read (video) skipped",{code:e?.code}); }
}
async function rlJoin(){
  const clips=RL.scenes.filter(s=>s.clip).sort((a,b)=>+a.n-+b.n); if(clips.length<2) return;
  if(!S.connected) await connect(true);
  RL.final={status:"run",note:"Joining clips in Magnific…",_live:true}; rlBoard(); rlWake(true);
  try{
    const a=await buildArgs("video_concatenate","Join these finished video clips into one MP4, in exactly this order.",{identifiers:clips.map(c=>c.clip)},"default");
    const r=await callMag("video_concatenate",a.args);
    let rr=readResult(r); const id=rr.ids[0];
    if(id){ RL.final.pending=id; rlFlush(); }
    if(!DONE.test(rr.status)&&id) rr=await waitFor([id],"joined reel",20,true);
    const all=[...rr.urls,...rr.links];
    RL.final={id:rr.ids[0]||id,web:rr.webUrl||null,url:all.find(u=>/\.(mp4|mov|webm)(\?|#|$)/i.test(u))||null,note:"Final reel ready."};
    await rlLoadVideo(RL.final,RL.final.id);
  }catch(err){ if(RL.final?.pending&&rlTransient(err)) RL.final={status:"paused",pending:RL.final.pending,note:"Still joining in Magnific. It shows up here when you're back."}; else RL.final={err:true,note:mcpCopy(err)}; }
  finally{ rlWake(false); }
  rlSave(); rlBoard();
}

/* ---------- Magnific Spaces: the whole production on one canvas ---------- */
function rlAllCreations(){
  const out=[], add=(id,type,label)=>{ if(id&&!out.some(x=>x.id===id)) out.push({id,type,label}); };
  RL.characters.forEach(e=>add(e.id,"image",`${e.tag} ${e.name} · character`));
  RL.locations.forEach(e=>add(e.id,"image",`${e.tag} ${e.name} · ${e.kind||"location"}`));
  RL.scenes.forEach(s=>add(s.frame?.id,"image",`Scene ${s.n} · first frame`));
  RL.scenes.forEach(s=>add(s.clip,"video",`Scene ${s.n} · video`));
  add(RL.final?.id,"video","Final reel");
  return out;
}
function rlNotes(){
  const set=rlSet(), I=RL.picked, n=[];
  n.push({title:`01 · Brief — ${RL.title}`,text:[`Bank al Etihad reel · ${set.aspect} · ${set.length} s · dialogue ${set.lang}`,I?`IDEA: ${I.title}\nHook: ${I.hook||""}\n${I.logline||""}\nBeats: ${Array.isArray(I.beats)?I.beats.join(" / "):I.beats||""}\nWhy it travels: ${I.why_viral||""}\nProduct moment: ${I.product_moment||""}`:"",RL.notes?`NOTES:\n${RL.notes}`:""].filter(Boolean).join("\n\n")});
  if(RL.script?.scenes?.length) n.push({title:`02 · Script — ${RL.script.title||RL.title}`,text:RL.script.scenes.map(s=>`[${s.time||""}] ${s.title||""}\n${s.action||""}${(s.dialogue||[]).map(d=>`\n${d.who}: "${d.line}"`).join("")}${s.on_screen_text?`\n【${s.on_screen_text}】`:""}${s.sound?`\nSound: ${s.sound}`:""}`).join("\n\n")});
  if(RL.characters.length) n.push({title:"03 · Cast",text:RL.characters.map(e=>`${e.tag} ${e.name}${e.lib?` (BAE library: ${e.lib})`:""}\n${e.description||""}${e.wardrobe?`\nWardrobe: ${e.wardrobe}`:""}\nPROMPT: ${e.prompt||""}`).join("\n\n")});
  if(RL.locations.length) n.push({title:"04 · Locations & props",text:RL.locations.map(e=>`${e.tag} ${e.name} (${e.kind||"location"})\n${e.description||""}\nPROMPT: ${e.prompt||""}`).join("\n\n")});
  const bpText=bp=>{ if(!bp) return "—"; const z=id=>(bp.zones||[]).find(q=>q.id===id)?.name||id; return [...(bp.people||[]).map(p=>`${p.name} ${p.tag||""}: ${z(p.zone)}${p.action?` — ${p.action}`:""}`),...(bp.openings||[]).map(o=>`${o.name}: hinge ${o.hinge||"?"}, opens ${o.opens||"?"}`),...(bp.cameras||[]).map(c=>`Shot ${c.shot||1} camera: ${z(c.zone)}, facing ${c.facing}°, ${c.fov}° FOV, ${c.height||""} ${c.move||""}`),bp.light?`Light: ${bp.light.source||""} ${bp.light.temp||""}`:"",bp.axis?`Axis: ${bp.axis}`:"",(bp.rules||[]).length?`Locks: ${bp.rules.join(" · ")}`:""].filter(Boolean).join("\n"); };
  if(RL.look) n.push({title:"05 · Film look (shared by every shot)",text:RL.look});
  RL.scenes.forEach(s=>{ const r=rlSceneRefs(s,"prompt",{compose:false}); n.push({title:`Shot ${s.n} · ${s.title||""} · ${s.duration_s||""} s`,text:`${s.logline?s.logline+"\n\n":""}References in order: ${r.refs.map(x=>`${x.tag} = ${x.map?"position map":`${x.name} (${rlElByTag(x.global)?.handle||x.global})`}`).join(", ")||"none"}\n\nBLOCKING (checked by the script supervisor${s.check?.passed?`: ${s.check.passed}/8 checks`:""}):\n${bpText(s.blueprint)}\n\nFIRST FRAME (Nano Banana 2.1):\n${s.frame_prompt||"—"}\n\nSEEDANCE 2.5:\n${s.prompt||""}`}); });
  return n;
}
async function rlFind(r,what){
  const p=r?.payload??r?.content; let id=null,url=null;
  const scanStr=s=>{ const m=String(s).match(/https:\/\/[^\s"'<>)\]]*magnific\.com\/[^\s"'<>)\]]*spaces?\/[^\s"'<>)\]]+/i); if(m&&!url) url=m[0].replace(/[).,;]+$/,""); };
  if(p&&typeof p==="object") walk(p,(k,v)=>{ if(typeof v!=="string") return; scanStr(v); if(!id&&/^(space_?id|spaceId|space_?reference|spaceReference|space_?identifier|identifier|id|uuid|reference)$/i.test(k)&&v.length>=2&&!/^https?:/.test(v)) id=v; });
  else if(p) scanStr(p);
  for(const b of r?.content||[]) if(b.type==="text") scanStr(b.text);
  if(!id&&sample){ try{ const o=await sample.json(`From this Magnific MCP result, extract ${what}. Result:\n${trimJSON(p,8000)}\nReply with only JSON {"id":"","url":""}`,{modelTier:"quick"}); id=o?.id||null; url=url||(/^https:\/\//.test(o?.url||"")?o.url:null); }catch{} }
  return {id,url};
}
async function rlBuildSpace(){
  if(!RL||!mcp||!sample) return;
  const sp=RL.space=RL.space||{}; sp.steps=[]; sp.status="run"; sp.err=null; sp.live=""; sp.added=sp.added||[]; rlBoard();
  const step=async(label,fn,optional)=>{ const s={label,state:"run"}; sp.steps.push(s); rlBoard();
    try{ const r=await fn(); s.state="ok"; s.note=r||""; }catch(e){ s.state=optional?"skip":"err"; s.note=e?.code==="tools_unavailable"?e.message:mcpCopy(e); if(!optional) throw e; } finally{ sp.live=""; rlSave(); rlBoard(); } };
  try{
    if(!S.connected) await connect(true);
    await step("Create the Space",async()=>{
      if(sp.id) return "Updating the existing Space";
      const a=await buildArgs("spaces_create","Create a new empty Magnific Space named exactly Data.name.",{name:`BAE · ${RL.title||"Reel"}`},"default");
      const r=await callMag("spaces_create",a.args); const x=await rlFind(r,"the identifier of the new Space and its web URL");
      if(!x.id) throw {code:"tool_error",message:"Magnific didn't return the Space id."};
      sp.id=x.id; sp.url=x.url||sp.url||null; sp.added=[]; return `BAE · ${RL.title||"Reel"}`; });
    await step("Add every image and video",async()=>{
      const items=rlAllCreations().filter(c=>!sp.added.includes(c.id)); if(!items.length) return "Everything is already there";
      const add=async(list,what)=>{ const a=await buildArgs("spaces_add_creations",`Add these ${what} creations to the Space (Data.space) as nodes, in this order.`,{space:sp.id,identifiers:list.map(c=>c.id),labels:list.map(c=>c.label)},"default"); const r=await callMag("spaces_add_creations",a.args); if(!sp.url){ const x=await rlFind(r,"the Space web URL"); sp.url=x.url||null; } sp.added.push(...list.map(c=>c.id)); };
      const im=items.filter(c=>c.type==="image"), vd=items.filter(c=>c.type==="video"); let note="";
      if(im.length) await add(im,"image");
      if(vd.length){ try{ await add(vd,"video"); }catch(e){ note=` · videos stay in your Magnific library (${mcpCopy(e)})`; } }
      return `${im.length} image${im.length===1?"":"s"}, ${vd.length} video${vd.length===1?"":"s"}${note}`; });
    await step("Pin the brief, script and every prompt",async()=>{
      /* Magnific caps a note at 8,000 characters: split long notes at paragraph breaks into parts (1/2, 2/2) */
      const MAX=7000, notes=[];
      for(const nt of rlNotes()){ const text=String(nt.text||"");
        if(text.length<=MAX){ notes.push(nt); continue; }
        const parts=[]; let cur="";
        for(const para of text.split(/\n\n/)){ let p=para;
          while(p.length>MAX){ if(cur){ parts.push(cur); cur=""; } parts.push(p.slice(0,MAX)); p=p.slice(MAX); }
          if((cur?cur.length+2:0)+p.length>MAX){ parts.push(cur); cur=p; } else cur=cur?cur+"\n\n"+p:p; }
        if(cur) parts.push(cur);
        parts.forEach((t,i)=>notes.push({title:`${nt.title} (${i+1}/${parts.length})`,text:t})); }
      /* on an update, pin only notes that are new or changed */
      const sig=t=>{ let h=0; for(let i=0;i<t.length;i++) h=(h*31+t.charCodeAt(i))|0; return String(h); };
      sp.pinned=sp.pinned||{}; const todo=notes.filter(nt=>sp.pinned[nt.title]!==sig(nt.text));
      if(!todo.length) return "All notes are already pinned";
      const a=await buildArgs("spaces_pin_asset","Pin a text planning note to the board of the Space Data.space. Copy the placeholder strings __TITLE__ and __TEXT__ verbatim into the note's title and its text/content fields; the page fills them in for each note.",{space:sp.id,title:"__TITLE__",text:"__TEXT__"},"default");
      const tpl=JSON.stringify(a.args).includes("__TEXT__");
      for(const [i,nt] of todo.entries()){ sp.live=`Pinning ${i+1} of ${todo.length}: ${nt.title}`; rlBoard();
        const args=tpl?replaceDeep(replaceDeep(a.args,"__TITLE__",nt.title),"__TEXT__",nt.text):(await buildArgs("spaces_pin_asset","Pin this text planning note to the Space board.",{space:sp.id,title:nt.title,text:nt.text},"quick")).args;
        await callMag("spaces_pin_asset",args); sp.pinned[nt.title]=sig(nt.text); rlFlush(); }
      return `${todo.length} note${todo.length===1?"":"s"} pinned${notes.length>todo.length?` · ${notes.length-todo.length} already there`:""}`; });
    if(RL.scenes.length) await step("Wire a Seedance 2.5 node for each shot",rlWireSpace,true);
    await step("Tidy the layout",async()=>{
      /* arranging needs the Space's page ids: read them from the Space map first */
      let pages=[], raw=null;
      try{ const sa=await buildArgs("spaces_state","Read the map of the Space Data.space (its pages, nodes and connections).",{space:sp.id}); const st=await callMag("spaces_state",sa.args); raw=st.payload??st.content;
        walk(raw&&typeof raw==="object"?raw:{},(k,v,o)=>{ if(/^page_?ids?$/i.test(k)){ (Array.isArray(v)?v:[v]).forEach(x=>{ if(typeof x==="string"||typeof x==="number") pages.push(String(x)); }); }
          if(/^pages$/i.test(k)&&Array.isArray(v)) v.forEach(p=>{ const id=p&&(p.id||p.pageId||p.page_id||p.identifier); if(id) pages.push(String(id)); }); });
        if(!pages.length&&typeof raw==="string"){ const m=raw.match(/page[_ ]?id["'\s:=]+([A-Za-z0-9_-]+)/gi)||[]; m.forEach(x=>pages.push(x.split(/["'\s:=]+/).pop())); }
      }catch(e){ log("✕","spaces_state for arrange",{code:e?.code}); }
      pages=[...new Set(pages)];
      const a=await buildArgs("spaces_arrange_nodes","Tidy every workflow of the Space Data.space into left-to-right rows, on every page listed in Data.pageIds (pass them all). If Data.pageIds is empty, take the page ids from Data.state.",{space:sp.id,pageIds:pages,state:pages.length?null:trimJSON(raw,6000)});
      await callMag("spaces_arrange_nodes",a.args); return pages.length?`${pages.length} page${pages.length>1?"s":""}`:""; },true);
    sp.status="done"; sp.builtAt=Date.now();
    brSignal("project","delivered",1,{item:`${RL.title} · idea: ${ideaLine(RL.picked)} · ${RL.characters.length} cast, ${RL.locations.length} locations, ${RL.scenes.length} shots, ${RL.scenes.filter(s=>s.status==="done").length} filmed`,note:"The team took this production all the way to a Magnific Space.",key:"delivered"});
  }catch(e){ sp.status="err"; sp.err=mcpCopy(e); }
  rlSave(); rlBoard();
}
/* Claude works the Space step by step through page tools: it reads the node catalogue, adds a video node per shot and connects it */
async function rlWireSpace(){
  const sp=RL.space;
  const lim=await sample.limits().catch(()=>null);
  if(!lim?.tools) throw {code:"tools_unavailable",message:"Skipped: this view can't let Claude work in Spaces step by step. The shot prompts are pinned, so you can add the nodes in Spaces."};
  const ALLOW=["spaces_state","spaces_get_nodes","spaces_node_types_search","spaces_create_node","spaces_patch_node","spaces_add_connection"];
  let calls=0;
  const tools=[
    {name:"describe_tool",description:"Returns the description and JSON input schema of one Magnific Spaces tool. Describe a tool before its first use.",inputSchema:{type:"object",properties:{tool:{type:"string",enum:ALLOW}},required:["tool"]},execute:async({tool})=>{ const s=await schemaOf(String(tool)); return s?{description:s.description,inputSchema:s.inputSchema}:"No schema available"; }},
    {name:"magnific",description:"Calls one Magnific Spaces tool with JSON arguments and returns its result (trimmed). Allowed: "+ALLOW.join(", ")+". It never runs generations.",inputSchema:{type:"object",properties:{tool:{type:"string",enum:ALLOW},args:{type:"object"}},required:["tool","args"]},
      execute:async({tool,args},ctx)=>{ tool=String(tool); if(!ALLOW.includes(tool)) throw new Error("Tool not allowed here"); if(++calls>70) throw new Error("Call budget used up: stop and give the final JSON now.");
        sp.live=({spaces_state:"Reading the Space",spaces_get_nodes:"Reading nodes",spaces_node_types_search:"Looking up node types",spaces_create_node:"Adding a node",spaces_patch_node:"Setting a node",spaces_add_connection:"Connecting nodes"})[tool]+"…"; rlBoard();
        if(ctx?.signal?.aborted) throw new Error("Stopped");
        const r=await callMag(tool,args&&typeof args==="object"?args:{}); return trimJSON(r.payload??r.content,12000); }}];
  const set=rlSet();
  const shots=RL.scenes.map(sc=>{ const r=rlSceneRefs(sc); return {scene:sc.n,title:sc.title,duration_s:Math.max(4,Math.min(15,+sc.duration_s||8)),first_frame_creation:sc.frame?.id||null,reference_creations:r.refs.map(x=>({tag:x.tag,creation:x.id,name:x.name})),prompt:(sc.frame?.id?"START FRAME: the video begins exactly on the connected start image.\n\n":"")+r.prompt}; });
  const out=await sample.json(`You are wiring a Magnific Space (Space id: ${sp.id}) for a Bank al Etihad reel. The board already holds the images (added from these creations) and pinned notes.
GOAL — for EACH shot below:
1. Add ONE video generation node set to the Seedance 2.5 model (find the right node type, its ports and settings with spaces_node_types_search), with the shot's prompt as its prompt, duration ${"<duration_s>"} seconds and aspect ratio ${set.aspect}.
2. If first_frame_creation is set, connect that shot's first-frame image node (the node made from it) into the video node's start / first-frame image input. If it is null, leave the start image empty.
3. If the node also takes reference images, connect the reference image nodes (made from reference_creations, in order) to them.
Find the existing image nodes with spaces_state (match them by creation identifier). If a video node named "Shot <n> · …" already exists for a shot, update it (spaces_patch_node) and fix its connections instead of adding another one. Describe each tool once before using it. Batch independent calls in the same round. Never run, delete or regenerate anything.
4. VERIFY at the end with spaces_state or spaces_get_nodes: every shot has exactly one Seedance 2.5 video node whose prompt equals the shot's prompt, whose start-frame input is connected to that shot's first-frame node, and whose reference inputs (if any) are connected in order. Name each video node "Shot <n> · <title>". Fix anything missing or wrong, then verify again.
SHOTS (JSON): ${trimJSON(shots,20000)}
When finished, reply with only JSON: {"nodes_created":0,"connections":0,"verified_shots":0,"summary":"one short line"}`,{modelTier:"default",tools});
  return (out?.summary||`${out?.nodes_created||0} video nodes, ${out?.connections||0} connections`)+(out?.verified_shots!=null?` · ${out.verified_shots}/${shots.length} shots verified`:"");
}
function rlBibleText(){ const set=rlSet(); return `# ${RL.title}\n\nBank al Etihad · Reels production · ${set.aspect} · ${set.length} s · ${new Date().toLocaleDateString()}\n\n`+rlNotes().map(n=>`## ${n.title}\n\n${n.text}`).join("\n\n")+"\n"; }
async function rlBible(){
  const name=(RL.title||"reel").replace(/[^\w؀-ۿ -]+/g,"").trim().replace(/\s+/g,"-")||"reel";
  const blob=new Blob([rlBibleText()],{type:"text/plain"});
  if(downloads){ try{ await downloads.save({filename:`BAE-${name}-production.txt`,data:blob}); return; }catch(e){ if(e?.code==="declined") return; } }
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=`BAE-${name}-production.txt`; a.click();
}

/* ---------- wiring ---------- */
(function(){
  if(!$("reels")) return;
  const R=$("reels");
  const openLib=()=>{ R.hidden=false; R.scrollTop=0; rlShowLib(); setTimeout(()=>$("rlNewCard")?.focus({preventScroll:true}),120); };
  $("openReels").addEventListener("click",openLib);
  $("closeReels").onclick=()=>{ R.hidden=true; $("openReels")?.focus(); };
  $("rlBack").onclick=async()=>{ clearTimeout(rlSaveT); if(RL) await rlFlush(); RL=null; R.scrollTop=0; rlShowLib(); };
  $("rlProjects").addEventListener("click",async e=>{
    if(e.target.closest("#rlNewCard")) return rlOpen(null);
    const o=e.target.closest("[data-open]"); if(o) return rlOpen(o.dataset.open);
    const d=e.target.closest("[data-dup]"); if(d){ d.disabled=true; await rlDuplicate(d.dataset.dup); return rlShowLib(); }
    const x=e.target.closest("[data-del]"); if(x){ if(x.dataset.sure){ await rlDelete(x.dataset.del); return rlShowLib(); } x.dataset.sure="1"; x.textContent="Delete for good?"; x.classList.add("danger"); setTimeout(()=>{ if(x.isConnected){ delete x.dataset.sure; x.textContent="Delete"; x.classList.remove("danger"); } },3500); }
  });
  $("rlOpenBrain").onclick=()=>rlShowBrain();
  $("rlBrainBack").onclick=()=>{ $("rlBrain").hidden=true; rlShowLib(); };
  $("rlBrainBody").addEventListener("submit",async e=>{ const f=e.target.closest("#brTeach"); if(!f) return; e.preventDefault(); const t=String(new FormData(f).get("t")||"").trim(); if(!t) return;
    const msg=$("brTeachMsg"); msg.textContent="Saving…";
    try{ await RLS.db.collection("feedback").add({kind:"lesson",verdict:0,note:t.slice(0,1500),item:"",project:null,by:RLS.uid||null,at:Date.now(),day:new Date().toLocaleDateString("en-CA")}); f.reset(); msg.textContent="Thanks — it joins the lessons tomorrow morning."; }
    catch(err){ msg.textContent="Couldn't save ("+(err?.code||"error")+")."; } });
  $("rlBrainBody").addEventListener("click",async e=>{ const b=e.target.closest("[data-bredit]"); if(!b) return; const id=b.dataset.bredit, div=$("rlBrainBody").querySelector(`[data-sec="${id}"]`), s=BR.sections.find(x=>x.id===id); if(!div||!s) return;
    if(b.dataset.saving){ return; }
    if(div.tagName!=="TEXTAREA"){ const ta=document.createElement("textarea"); ta.className="rl-field br-edit"; ta.dataset.sec=id; ta.value=s.text||""; ta.dir="auto"; div.replaceWith(ta); b.textContent="Save"; ta.focus(); return; }
    b.dataset.saving="1"; b.textContent="Saving…";
    const upd={text:div.value,updatedAt:Date.now()};
    if(id==="templates"){ const grab=(h,next)=>{ const m=div.value.split(h)[1]; if(!m) return null; return (next?m.split(next)[0]:m).trim(); };
      const c=grab("CHARACTER SHEET:","PROP SHEET:"), p=grab("PROP SHEET:","LOCATION:"), l=grab("LOCATION:","SCENE PROMPT FORMAT:"), sc=grab("SCENE PROMPT FORMAT:");
      if(c) upd.char=c; if(p) upd.prop=p; if(l) upd.loc=l; if(sc) upd.scene=sc; }
    try{ await RLS.db.collection("brain").doc(id).update(upd); Object.assign(s,upd); } catch(err){ b.textContent="Couldn't save"; delete b.dataset.saving; return; } rlShowBrain(); });
  $("rlTitle").addEventListener("input",()=>{ if(!RL) return; RL.title=$("rlTitle").value.trim()||"Untitled reel"; rlSave(); });
  $("rlStages").addEventListener("click",e=>{ const b=e.target.closest("[data-tab]"); if(!b||!RL) return; RL.view=b.dataset.tab; R.dataset.view="board"; rlSave(); rlBoard(); rlRenderChat(); $("rlBoardPane").scrollIntoView({block:"start"}); });
  document.addEventListener("keydown",e=>{ if(e.key!=="Escape"||R.hidden) return; const lb=$("rlLb"); if(lb&&!lb.hidden){ lb.hidden=true; return; } });
  $("rlForm").onsubmit=e=>{ e.preventDefault(); rlSend($("rlInput").value); };
  $("rlInput").addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); rlSend($("rlInput").value); } });
  document.addEventListener("visibilitychange",()=>{ if(!document.hidden&&RL&&!$("rlProjView").hidden){ setTimeout(rlResume,600); if(rlWakeN>0) rlWake(true).then(()=>rlWake(false)); } });
  $("rlMsgs").addEventListener("click",e=>{ if(e.target.closest("#rlRetry")&&RL?.chatPending) rlSend(RL.chatPending.text,{retry:true});
    const u=e.target.closest("[data-adv]"); if(u&&RL){ const [mi,ai]=u.dataset.adv.split(":").map(Number); const x=RL.chat[mi]?.advisors?.[ai]; if(x){ const A=rlAdv(x.id); brSignal("chat","advisor_used",1,{note:x.note,item:A.name,key:x.note}); rlSend(rlAr()?`طبّق اقتراح ${A.name}: ${x.note}`:`Apply the ${A.name}'s suggestion: ${x.note}`); } } });
  $("rlChips").onclick=e=>{ const b=e.target.closest("button"); if(b) rlSend(b.textContent); };
  $("rlFile").onchange=e=>{ for(const f of [...e.target.files].slice(0,10-rlPending.length)) rlPending.push({blob:f,url:URL.createObjectURL(f),name:f.name}); e.target.value=""; rlRenderAtt(); };
  $("rlInput").addEventListener("paste",e=>{ const fs=[...(e.clipboardData?.files||[])].filter(f=>/^image\//.test(f.type)); if(fs.length){ fs.forEach(f=>rlPending.push({blob:f,url:URL.createObjectURL(f),name:f.name})); rlRenderAtt(); } });
  $("rlChatPane").addEventListener("dragover",e=>e.preventDefault());
  $("rlChatPane").addEventListener("drop",e=>{ e.preventDefault(); [...(e.dataTransfer?.files||[])].filter(f=>/^image\//.test(f.type)).slice(0,10).forEach(f=>rlPending.push({blob:f,url:URL.createObjectURL(f),name:f.name})); rlRenderAtt(); });
  $("rlAtt").onclick=e=>{ const b=e.target.closest("[data-i]"); if(b){ rlPending.splice(+b.dataset.i,1); rlRenderAtt(); } };
  $("rlSettingsBtn").onclick=()=>{ const s=$("rlSettings"); s.hidden=!s.hidden; $("rlSettingsBtn").setAttribute("aria-expanded",String(!s.hidden)); };
  const keyOf={rlLen:"length",rlAspect:"aspect",rlLang:"lang",rlRes:"res"};
  for(const id of Object.keys(keyOf)) $(id).onchange=()=>{ if(!RL) return; RL.settings={...rlSet(),[keyOf[id]]:id==="rlLen"?+$(id).value:$(id).value}; rlSave(); rlBoard(); };
  document.querySelectorAll("[data-rlview]").forEach(b=>b.onclick=()=>{ R.dataset.view=b.dataset.rlview; document.querySelectorAll("[data-rlview]").forEach(x=>x.setAttribute("aria-pressed",String(x===b))); });
  const B=$("rlBoard");
  B.addEventListener("click",async e=>{
    const tab=e.target.closest("[data-tab]"); if(tab&&B.contains(tab)){ RL.view=tab.dataset.tab; rlSave(); rlRender(); return; }
    const z=e.target.closest("[data-zoom]"); if(z){ rlZoom(z.dataset.zoom); return; }
    const chip=e.target.closest(".rl-ask [data-chip]"); if(chip){ const ta=chip.closest("form").querySelector("textarea"); ta.value=(ta.value.trim()?ta.value.trim()+"، ":"")+chip.dataset.chip; ta.focus(); return; }
    const rv=e.target.closest(".rl-rate [data-v]"); if(rv){ const box=rv.closest(".rl-rate"); RL._rateOpen={key:box.dataset.key,v:+rv.dataset.v}; rlBoard(); setTimeout(()=>B.querySelector(".rl-rateform input")?.focus(),20); return; }
    const b=e.target.closest("[data-rl]"); if(!b) return; const a=b.dataset.rl, ar=rlAr();
    if(a==="pick") rlSend(ar?`اخترت الفكرة ${+b.dataset.i+1}: ${RL.ideas[+b.dataset.i]?.title||""}. اكتبلي السيناريو.`:`I choose idea ${+b.dataset.i+1}: ${RL.ideas[+b.dataset.i]?.title||""}. Write the script.`);
    else if(a==="pickprev"){ const x=RL.ideasPrev[+b.dataset.i]; if(x){ RL.ideas=[x,...RL.ideas.filter(y=>y.title!==x.title)].slice(0,4); RL.ideasPrev.splice(+b.dataset.i,1); rlSend(ar?`اخترت الفكرة: ${x.title}. اكتبلي السيناريو.`:`I choose the idea "${x.title}". Write the script.`); } }
    else if(a==="say"){ const k=b.dataset.t, t=RL_SAY[k];
      if(k==="moreIdeas") brSignal("idea","asked_for_more",-1,{item:RL.ideas.map(ideaLine).join(" | "),note:"None of these was chosen; the user asked for new ideas.",key:"more"});
      if(k==="approveScript") brSignal("script","approved",1,{item:(RL.script?.scenes||[]).map(s=>`${s.title}: ${s.action}`).join(" / "),key:"script"});
      if(k==="approveCast") brSignal("character","approved",1,{item:RL.characters.map(e=>`${e.name}: ${e.description||""}`).join(" | "),key:"cast"});
      if(k==="approveLoc") brSignal("location","approved",1,{item:RL.locations.map(e=>`${e.name}: ${e.description||""}`).join(" | "),key:"loc"});
      rlSend(t?t[ar?1:0]:k); }
    else if(a==="sayraw") rlSend(b.dataset.t);
    else if(a==="gen"){ const el=rlElByTag(b.dataset.tag); if(el?.id) brSignal(RL.characters.includes(el)?"character":el.kind||"location","regenerated",-1,{item:`${el.name}: ${String(el.prompt||"").slice(0,700)}`,note:"The user wasn't satisfied with the image and generated it again.",key:el.tag+el.id}); rlGenElement(b.dataset.tag); }
    else if(a==="genall") (b.dataset.list==="c"?RL.characters:RL.locations).filter(x=>!x.id&&!x.fromLib&&x.prompt).forEach(x=>rlGenElement(x.tag));
    else if(a==="edit"){ const el=rlElByTag(b.dataset.tag); if(el){ el._edit=true; rlBoard(); } }
    else if(a==="editdone"){ const el=rlElByTag(b.dataset.tag); if(el){ el._edit=false; el.err=null; if(el.status==="err") el.status=null; rlSave(); rlBoard(); } }
    else if(a==="remove"){ if(!b.dataset.sure){ b.dataset.sure="1"; b.textContent="Remove for good?"; b.classList.add("danger"); return; } const el=rlElByTag(b.dataset.tag); if(el) brSignal(RL.characters.includes(el)?"character":el.kind||"location","removed",-1,{item:`${el.name}: ${el.description||""}`,key:el.tag});
      RL.characters=RL.characters.filter(x=>x.tag!==b.dataset.tag); RL.locations=RL.locations.filter(x=>x.tag!==b.dataset.tag); rlSave(); rlBoard(); }
    else if(a==="add"){ RL._adding=b.dataset.k; rlBoard(); setTimeout(()=>B.querySelector(".rl-addform input")?.focus(),30); }
    else if(a==="addcancel"){ RL._adding=null; rlBoard(); }
    else if(a==="cast"){ rlAddElement("character",b.dataset.n,"BAE character from the library",b.dataset.n); }
    else if(a==="check") rlCheckScenes([b.dataset.n]);
    else if(a==="stopcheck"){ e.preventDefault(); const sc=RL.scenes.find(x=>String(x.n)===b.dataset.n); sc?._ctl?.abort(); }
    else if(a==="improve") rlImproveScene(b.dataset.n);
    else if(a==="room") rlRoom(b.dataset.n);
    else if(a==="roomapply"||a==="roomskip"){ const sc=RL.scenes.find(x=>String(x.n)===b.dataset.n), it=sc?.room?.items?.[+b.dataset.i]; if(it){ it.done=true; brSignal("shot",a==="roomapply"?"advisor_applied":"advisor_skipped",a==="roomapply"?1:-1,{note:it.instruction,item:`${rlAdv(it.id).name}: ${it.title}`,key:it.instruction}); if(a==="roomapply") rlImproveScene(sc.n,it.instruction); else { rlSave(); rlBoard(); } } }
    else if(a==="makemap") rlMakeMap(b.dataset.n);
    else if(a==="ask"){ const sc=RL.scenes.find(x=>String(x.n)===b.dataset.n); if(sc){ sc._ask=!sc._ask; rlBoard(); setTimeout(()=>$("rlAsk"+sc.n)?.focus(),20); } }
    else if(a==="askcancel"){ const sc=RL.scenes.find(x=>String(x.n)===b.dataset.n); if(sc){ sc._ask=false; rlBoard(); } }
    else if(a==="undo") rlUndoScene(b.dataset.n);
    else if(a==="frame"){ const sc=RL.scenes.find(x=>String(x.n)===b.dataset.n); if(sc?.frame?.id) brSignal("shot","frame_regenerated",-1,{item:`Scene ${sc.n} first frame: ${String(sc.frame_prompt||"").slice(0,700)}`,key:"f"+sc.frame.id}); rlGenFrame(b.dataset.n); }
    else if(a==="render"){ const sc=RL.scenes.find(x=>String(x.n)===b.dataset.n); if(sc?.clip) brSignal("shot","video_regenerated",-1,{item:`Scene ${sc.n}: ${String(sc.prompt||"").slice(0,800)}`,key:"v"+sc.clip}); rlRenderScene(b.dataset.n); }
    else if(a==="allframes") RL.scenes.filter(s=>!s.frame?.id).forEach(s=>rlGenFrame(s.n));
    else if(a==="allvideos") RL.scenes.filter(s=>s.status!=="done").forEach(s=>rlRenderScene(s.n));
    else if(a==="play"){ const sc=RL.scenes.find(x=>String(x.n)===b.dataset.n); if(sc){ b.disabled=true; b.textContent="Loading…"; if(!S.connected) await connect(true); await rlLoadVideo(sc,sc.clip); if(!sc._src&&!sc.url) sc._blocked=true; rlBoard(); } }
    else if(a==="goto") $("rlShot"+b.dataset.n)?.scrollIntoView({behavior:"smooth",block:"start"});
    else if(a==="join") rlJoin();
    else if(a==="space") rlBuildSpace();
    else if(a==="bible") rlBible();
    else if(a==="copyall"||a==="copys"){ const txt=a==="copyall"?rlBibleText():rlSceneRefs(RL.scenes.find(x=>+x.n===+b.dataset.n)).prompt; try{ await navigator.clipboard.writeText(txt||""); const t=b.textContent; b.textContent="Copied"; setTimeout(()=>b.textContent=t,1400); }catch{} }
  });
  B.addEventListener("submit",e=>{
    const f=e.target.closest("[data-addform]"); if(f){ e.preventDefault(); const fd=new FormData(f); rlAddElement(f.dataset.addform,String(fd.get("name")||"").trim(),String(fd.get("desc")||"").trim(),null); return; }
    const ak=e.target.closest("[data-ask]"); if(ak){ e.preventDefault(); const q=String(new FormData(ak).get("q")||"").trim(); if(q) rlImproveScene(ak.dataset.ask,q); return; }
    const rf=e.target.closest(".rl-rateform"); if(rf){ e.preventDefault(); const note=String(new FormData(rf).get("n")||"").trim(); RL._rateOpen=null; brFeedback(rf.dataset.kind,rf.dataset.key,+rf.dataset.v,note,rf.dataset.item); rlBoard(); return; }
    const r=e.target.closest("[data-revise]"); if(r){ e.preventDefault(); const q=String(new FormData(r).get("q")||"").trim(); if(q) rlReviseElement(r.dataset.revise,q); }
  });
  B.addEventListener("keydown",e=>{ if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){ const f=e.target.closest("[data-ask]"); if(f){ e.preventDefault(); f.requestSubmit(); } } });
  B.addEventListener("change",e=>{
    const um=e.target.closest("[data-rl-usemap]"); if(um){ const sc=RL.scenes.find(x=>String(x.n)===um.dataset.rlUsemap); if(sc){ sc.useMap=um.checked; rlSave(); rlBoard(); } return; }
    const s=e.target.closest("[data-rl-start]"); if(s){ const sc=RL.scenes.find(x=>String(x.n)===s.dataset.rlStart); if(sc){ sc.useFrame=s.checked; rlSave(); rlBoard(); } return; }
    const t=e.target.closest("[data-rl-edit]"); if(!t) return; const before=rlEditValue(t); rlCommit(t); rlSave();
    if(before!=null&&before!==t.value){ const p=t.dataset.rlEdit.split(":"), kind=p[0]==="b"?"script":p[0]==="s"||p[0]==="f"?"shot":p[0]==="c"?"character":"location";
      brSignal(kind,"edited_by_user",0,{note:`The user rewrote ${p[0]==="b"?"script "+p[2]:p[0]==="s"?"the Seedance prompt":p[0]==="f"?"the first-frame prompt":(p[2]||"prompt")} by hand — learn from the difference.`,before,after:t.value,key:t.dataset.rlEdit}); } });
})();
function rlRenderAtt(){ $("rlAtt").innerHTML=rlPending.map((a,i)=>`<span class="th"><img src="${a.url}" alt="${esc(a.name||"")}"><button type="button" data-i="${i}" aria-label="Remove">×</button></span>`).join(""); }

boot();
})();
