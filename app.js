(() => {
"use strict";
const SRV = "Magnafic";
const STYLE = "professional photography, clean natural light";
const $ = id => document.getElementById(id);

/* ================= Rich fields: the brief and the Director chat hold small character pictures (chips) picked with @ =================
   The textarea is swapped for an editable box that still answers .value (chips read as "@Name"), so the rest of the studio is unchanged. */
const AT={fields:[],menu:null,open:null};
const AT_SHOTS=[["Bird's Eye View","From directly above"],["High Angle","Camera above eye level, looking down"],["Eye Level","Camera at the subject's eye height"],["Low Angle","Camera below eye level, looking up"],["Worm's Eye View","Extreme low, camera near the ground"],["Dutch Angle","Camera tilted on a diagonal"],["Profile","Side view of the subject"],["3/4 View","Subject turned slightly away"],["Close-Up","Tight on the face or a detail"],["Medium Close-Up","Chest or shoulders up"],["Medium Shot","Waist up"],["Medium Full Shot","Head to mid-thigh"],["Full Body Shot","Whole body in frame"],["Long Shot","Subject small in the environment"],["Extreme Long Shot","Tiny subject, wide establishing scene"],["Over the Shoulder","From behind someone's shoulder"],["Point of View (POV)","Seen through the subject's eyes"],["Framing","Subject inside a natural or built frame"],["Leading Lines","Lines lead the eye to the subject"],["Silhouette","Backlit, dark outline of the subject"]];
function atShotChip(name){ const s=document.createElement("span"); s.className="at-chip shot"; s.contentEditable="false"; s.dataset.shot=name; s.setAttribute("role","button"); s.setAttribute("aria-label","Camera: "+name+" — change"); s.textContent=name; return s; }
const AT_OUTFITS=[
 ["of_01","Rust shirt, cream trousers","Women","rust-orange oversized linen shirt with rolled sleeves, tied at the waist; cream wide-leg pleated linen trousers; tan top-handle leather bag with gold clasp; gold-frame aviator sunglasses; stacked gold bangles and a small gold watch; gold hoop earrings"],
 ["of_02","Beige trench, brown trousers","Women","long stone-beige cotton trench coat worn open; white fitted crew-neck T-shirt; dark chocolate-brown pleated wide-leg trousers; dark brown woven leather shoulder bag; cream suede low-top sneakers with gum soles; chunky gold hoop earrings"],
 ["of_03","Orange shirt, brown trousers","Women","bright orange oversized linen shirt worn open with rolled sleeves; white ribbed tank top; dark brown high-waist pleated wide-leg trousers; small black leather shoulder bag; slim tortoiseshell sunglasses; one silver hoop earring"],
 ["of_04","Cream jacket, brown trousers","Men","cream soft zip-up jacket with a shirt collar and ribbed hem; crisp white dress shirt; dark brown patterned silk tie; mid-brown tailored straight trousers"],
 ["of_05","Orange knit, grey trousers","Men","burnt-orange brushed wool crew-neck sweater; white cotton dress shirt underneath; mid-grey wool flannel pleated trousers; steel bracelet watch with a cream dial"],
 ["of_06","Cable vest, blue shirt","Women","cream cable-knit V-neck sleeveless vest over a light blue cotton shirt; cream high-waist wide-leg trousers; dark brown slim leather belt with a gold buckle; dark brown leather shoulder bag; dark brown leather penny loafers; gold hoop earrings; silver watch"],
 ["of_07","Blue shirt, linen trousers","Women","light blue fine-striped oversized cotton shirt with turned-back cuffs; beige linen high-waist pleated wide-leg trousers; white canvas low-top sneakers; tan leather shoulder bag with a gold chain strap; gold hoop earrings; fine gold pendant necklace; gold bangles"],
 ["of_08","Orange shirt, blue jeans","Women","orange oversized linen shirt with a chest pocket, worn open with rolled sleeves; white tank top; light-blue high-waist wide-leg jeans; cream top-handle leather bag with a gold clasp; white leather sneakers; fine gold necklace and chain bracelet"],
 ["of_09","Brown jacket, cream trousers","Women","brown cotton cropped button jacket with a shirt collar and blue-striped turned-back cuffs; cream ribbed tank top; cream high-waist wide-leg trousers; dark brown leather belt with a gold buckle; dark brown leather shoulder bag; layered fine gold necklaces"],
 ["of_10","Cream tweed jacket","Women","cream cropped collarless tweed jacket with gold buttons and two flap pockets; white tank top; beige linen-blend pleated wide-leg trousers; beige leather crossbody flap bag; metallic gold pointed flat shoes with a strap; fine gold necklace; gold ball stud earrings"],
 ["of_11","Camel cable knit, chinos","Men","camel cable-knit half-zip sweater over a white dress shirt and a dark brown tie; khaki-beige slim pleated chinos; white leather low-top sneakers"],
 ["of_12","Blue flower cardigan","Girls","child's dusty-blue chunky knit cardigan with cream trim, wooden buttons and small white crochet daisies; cream short-sleeve T-shirt; cream relaxed trousers with an elastic waist and rolled hems; white leather sneakers; cream fabric hair bow"],
 ["of_13","Beige knit, blue jeans","Girls","child's oatmeal-beige chunky ribbed crew-neck sweater; light-blue straight wide-leg jeans with raw hems; taupe suede sneakers with cream side stripes, unbranded; small cream and tan leather crossbody bag"],
 ["of_14","Navy sweater, light jeans","Boys","child's dark navy cotton crew-neck sweater, plain and unbranded; white cotton button-up shirt underneath; light-blue wide straight jeans; white canvas low-top sneakers"],
 ["of_15","Camel cable knit, black jeans","Boys","child's camel cable-knit half-zip sweater with a stand collar over a white T-shirt; washed-black straight jeans; cream and beige leather sneakers"],
 ["of_16","BAE staff polo, jeans (men)","Staff","men's black cotton pique polo shirt, straight regular fit, flat collar, two-button placket, short sleeves with ribbed cuffs; dark indigo straight-leg jeans; slim black leather belt with a matte silver buckle; clean white leather sneakers. This is the official Bank al Etihad staff uniform: the small white emblem on the wearer's left chest and the white Arabic and English logo lockup across the upper back are part of the garment, keep them exactly as on the sheet (same shape, size and position, never redrawn, restyled or recoloured); the lockup shows only when the back is seen, the chest emblem only from the front; no other logo or text anywhere"],
 ["of_17","BAE staff polo, jeans (women)","Staff","women's black cotton pique polo shirt, slightly fitted at the waist, flat collar, short placket, short cap sleeves with ribbed cuffs; dark indigo high-waisted straight-leg jeans; slim black leather belt with a matte silver buckle; clean white leather sneakers. This is the official Bank al Etihad staff uniform: the small white emblem on the wearer's left chest and the white Arabic and English logo lockup across the upper back are part of the garment, keep them exactly as on the sheet (same shape, size and position, never redrawn, restyled or recoloured); the lockup shows only when the back is seen, the chest emblem only from the front; no other logo or text anywhere"],
 ["of_18","Bassmet al Etihad polo, jeans (men)","Staff","men's black cotton pique polo shirt, straight regular fit, flat collar, short button placket, short sleeves with ribbed cuffs; dark indigo straight-leg jeans; slim black leather belt with a matte silver buckle; clean white leather sneakers. This is the official Bassmet al Etihad staff uniform: the small white Bassmet al Etihad logo (symbol and Arabic lettering) on the wearer's left chest and the same logo, large, centred on the upper back are part of the garment, keep them exactly as on the sheet (same symbol, same Arabic lettering, same proportions, size and position, pure white, never redrawn, retyped, translated, restyled or recoloured); the large logo shows only when the back is seen, the chest logo only from the front; no other logo or text anywhere"],
 ["of_19","Bassmet al Etihad polo, jeans (women)","Staff","women's black cotton pique polo shirt, slightly fitted at the waist, flat collar, short button placket, short cap sleeves with ribbed cuffs; dark indigo high-waisted straight-leg jeans; slim black leather belt with a matte silver buckle; clean white leather sneakers. This is the official Bassmet al Etihad staff uniform: the small white Bassmet al Etihad logo (symbol and Arabic lettering) on the wearer's left chest and the same logo, large, centred on the upper back are part of the garment, keep them exactly as on the sheet (same symbol, same Arabic lettering, same proportions, size and position, pure white, never redrawn, retyped, translated, restyled or recoloured); the large logo shows only when the back is seen, the chest logo only from the front; no other logo or text anywhere"]
 ["of_20","Oatmeal half-zip, gingham shirt","Men","oatmeal-beige heathered cotton half-zip sweatshirt with a stand collar, plain and unbranded; light blue and white gingham button-down cotton shirt underneath; black pleated straight-leg trousers; steel watch with a white dial on a black leather strap; dark tortoiseshell round glasses"],
 ["of_21","Suede jacket, striped polo","Women","dark chocolate-brown suede cropped bomber jacket with a shirt collar and elastic hem; brown and cream striped knit sleeveless polo; cream high-waist pleated wide-leg trousers; slim black leather belt with a gold buckle; taupe top-handle leather bag with gold hardware, unbranded; dark tortoiseshell sunglasses; chunky gold rings, gold bracelet watch and gold dome earrings"],
 ["of_22","Olive overshirt, white tee","Men","sage-olive cotton twill overshirt worn open with rolled sleeves and a chest pocket; plain white crew-neck T-shirt; mid-blue straight carpenter jeans; tan leather belt; clean white leather low-top sneakers; steel watch with a navy dial on a tan leather strap; thin silver chain"],
 ["of_23","Camel knit half-zip, tie","Men","camel ribbed wool half-zip sweater with a high collar; crisp white dress shirt; dark green silk tie with a small brown medallion pattern; dark brown tailored straight trousers; black leather monk-strap shoes with chunky soles"],
 ["of_24","Cream knit, suede jacket","Men","cream ribbed wool crew-neck sweater; dark indigo straight jeans; dark brown suede zip-up jacket with a shirt collar; light taupe suede Chelsea boots; paper takeaway coffee cup with a kraft sleeve, unbranded"],
 ["of_25","Camel jacket, white shirt","Women","camel brushed wool cropped collarless jacket with gold buttons and four flap pockets; ivory silk shirt; black high-waist pleated wide-leg trousers; black structured leather top-handle bag with silver hardware, plain and unbranded; black cat-eye sunglasses; gold chain bracelet, gold drop earrings, silver ring"],
].map(([id,name,cat,d])=>({id,name,cat,d,src:`refs/${id}_t.jpg`}));
const atOutfit=name=>AT_OUTFITS.find(o=>o.name.toLowerCase()===String(name||"").toLowerCase());
const atOutfitsIn=text=>[...String(text||"").matchAll(/\[outfit: ([^\]]+)\]/gi)].map(m=>atOutfit(m[1])).filter(Boolean);
function atOutfitChip(name){ const o=atOutfit(name); const s=document.createElement("span"); s.className="at-chip outfit"; s.contentEditable="false"; s.dataset.outfit=o?.name||name; s.setAttribute("role","button"); s.setAttribute("aria-label","Outfit: "+(o?.name||name)+" — change"); s.title=o?.name||name;
  if(o){ const im=document.createElement("img"); im.src=o.src; im.alt=""; im.draggable=false; s.appendChild(im); } else s.textContent=name; return s; }
function atChars(){ try{ return CHAR_REFS.map(r=>({name:charName(r.id),src:r.src||"",cat:r.lib?(CL_CATS.find(c=>c[0]===r.cat)||[])[1]||"":"Yours"})).filter(x=>x.name); }catch{ return []; } }
function atChip(name,src){ const s=document.createElement("span"); s.className="at-chip"; s.contentEditable="false"; s.dataset.name=name; s.setAttribute("role","button"); s.setAttribute("aria-label",name+" — change character"); s.title=name;
  if(src){ const im=document.createElement("img"); im.src=src; im.alt=""; im.draggable=false; s.appendChild(im); } else { s.textContent=(name.trim()[0]||"?").toUpperCase(); s.classList.add("noimg"); } return s; }
function atRead(el){ let out=""; for(const n of el.childNodes){ if(n.nodeType===3) out+=n.nodeValue.replace(/​/g,""); else if(n.nodeType!==1) continue; else if(n.classList.contains("at-chip")) out+=n.dataset.shot?"[shot: "+n.dataset.shot+"]":n.dataset.outfit?"[outfit: "+n.dataset.outfit+"]":"@"+n.dataset.name; else if(n.tagName==="BR") out+="\n"; else { const t=atRead(n); out+=(out&&!out.endsWith("\n")?"\n":"")+t; } } return out; }
function atVal(el){ const v=atRead(el); return el.lastChild?.tagName==="BR"?v.replace(/\n$/,""):v; }
function atWrite(el,text){ text=String(text??""); el.textContent=""; if(!text) return;
  const cs=atChars().sort((x,y)=>y.name.length-x.name.length), by=new Map(cs.map(c=>[c.name.toLowerCase(),c]));
  const q=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"), shots=new Map(AT_SHOTS.map(x=>[x[0].toLowerCase(),x[0]]));
  const re=new RegExp((cs.length?"@("+cs.map(c=>q(c.name)).join("|")+")|":"()")+"\\[shot: ("+AT_SHOTS.map(x=>q(x[0])).join("|")+")\\]|\\[outfit: ("+AT_OUTFITS.map(x=>q(x.name)).join("|")+")\\]","gi");
  const put=t=>{ t.split("\n").forEach((ln,k)=>{ if(k) el.appendChild(document.createElement("br")); if(ln) el.appendChild(document.createTextNode(ln)); }); };
  let last=0,m; while((m=re.exec(text))){ if(!m[0]){ re.lastIndex++; continue; } put(text.slice(last,m.index)); if(m[3]) el.appendChild(atOutfitChip(m[3])); else if(m[2]) el.appendChild(atShotChip(shots.get(m[2].toLowerCase()))); else { const c=by.get(m[1].toLowerCase()); el.appendChild(atChip(c.name,c.src)); } last=m.index+m[0].length; }
  put(text.slice(last)); if(el.lastChild?.classList?.contains("at-chip")) el.appendChild(document.createTextNode(" ")); if(text.endsWith("\n")) el.appendChild(document.createElement("br")); }
function atEnd(el){ try{ const r=document.createRange(); r.selectNodeContents(el); r.collapse(false); const s=getSelection(); s.removeAllRanges(); s.addRange(r); }catch{} }
function atMake(id,enterSends){ const ta=$(id); if(!ta||ta.tagName!=="TEXTAREA") return;
  const el=document.createElement("div"); el.id=id; el.className=(ta.className+" at-field").trim(); el.contentEditable="true"; el.setAttribute("role","textbox"); el.setAttribute("aria-multiline","true"); el.spellcheck=false;
  for(const k of ["dir","aria-label","aria-describedby"]) if(ta.hasAttribute(k)) el.setAttribute(k,ta.getAttribute(k)); el.dataset.ph=ta.getAttribute("placeholder")||"";
  Object.defineProperty(el,"value",{get:()=>atVal(el),set:v=>{ atWrite(el,v); if(document.activeElement===el) atEnd(el); }});
  Object.defineProperty(el,"placeholder",{get:()=>el.dataset.ph,set:v=>{ el.dataset.ph=v; }});
  Object.defineProperty(el,"selectionStart",{get:()=>atVal(el).length}); el.setSelectionRange=()=>atEnd(el); el.select=()=>atEnd(el);
  if(ta.dataset.only) el.dataset.only=ta.dataset.only; const v0=ta.value; ta.replaceWith(el); if(v0) atWrite(el,v0); AT.fields=AT.fields.filter(x=>x.isConnected); AT.fields.push(el);
  el.addEventListener("paste",e=>{ const im=[...(e.clipboardData?.files||[])].find(f=>/^image\//.test(f.type)); if(im&&id==="brief"){ e.preventDefault(); lvRun(im); return; } if(im) return; e.preventDefault(); const t=(e.clipboardData||window.clipboardData)?.getData("text/plain")||""; if(t) document.execCommand("insertText",false,t); });
  el.addEventListener("drop",e=>{ if(e.dataTransfer?.types?.includes("Files")) return; e.preventDefault(); });
  el.addEventListener("keydown",e=>{ if(AT.open&&AT.open.el===el){ const O=AT.open;
      if(e.key==="Escape"){ e.preventDefault(); e.stopImmediatePropagation(); atHide(); return; }
      if(O.vis?.length&&/^Arrow(Down|Up|Left|Right)$/.test(e.key)&&(O.cols>1||/Down|Up/.test(e.key))){ e.preventDefault(); e.stopImmediatePropagation(); const V=O.vis, n=V.length, at=Math.max(0,V.indexOf(O.i)), st=e.key==="ArrowDown"?O.cols:e.key==="ArrowUp"?-O.cols:e.key==="ArrowRight"?1:-1; let k=at+st; if(k<0||k>=n) k=Math.abs(st)===1?(k+n)%n:at; O.i=V[k]; atDraw(); return; }
      if(O.vis?.length&&(e.key==="Enter"||e.key==="Tab")&&!e.isComposing){ e.preventDefault(); e.stopImmediatePropagation(); atPick(O.i); return; } }
    if(e.key==="Enter"&&!e.isComposing&&!(e.ctrlKey||e.metaKey)&&(e.shiftKey||!enterSends)){ e.preventDefault(); e.stopImmediatePropagation(); document.execCommand("insertLineBreak"); } },true);
  el.addEventListener("input",()=>{ if(!el.querySelector(".at-chip")&&!atRead(el).trim()&&el.childNodes.length) el.textContent=""; atCheck(el); });
  el.addEventListener("keyup",e=>{ if(/^Arrow|Home|End/.test(e.key)&&!(AT.open&&AT.open.chip)) atCheck(el); });
  el.addEventListener("click",e=>{ const c=e.target.closest?.(".at-chip"); if(c){ e.preventDefault(); atOpen({el,chip:c,q:""}); } else atCheck(el); });
  el.addEventListener("blur",()=>setTimeout(()=>{ if(document.activeElement!==el&&!AT.menu?.matches(":hover")) atHide(); },150));
}
function atMenu(){ if(AT.menu) return AT.menu; const d=document.createElement("div"); d.className="at-menu"; d.hidden=true; d.setAttribute("role","listbox"); d.setAttribute("aria-label","Characters"); document.body.appendChild(d);
  d.addEventListener("mousedown",e=>{ e.preventDefault(); const b=e.target.closest("[data-ati]"), tb=e.target.closest("[data-attab]"); if(tb){ if(AT.open){ AT.open.tab=tb.dataset.attab; AT.open.i=-1; atDraw(); } } else if(b) atPick(+b.dataset.ati); else if(e.target.closest("[data-atrm]")){ const O=AT.open; if(O?.chip){ O.chip.remove(); const el=O.el; atHide(); el.dispatchEvent(new Event("input",{bubbles:true})); } } });
  addEventListener("resize",atHide); addEventListener("scroll",e=>{ if(AT.open&&!d.contains(e.target)) atHide(); },true); return AT.menu=d; }
function atHide(){ if(AT.menu) AT.menu.hidden=true; AT.open=null; }
function atList(q,only){ q=String(q||"").toLowerCase(); const of=only&&only!=="outfit"?[]:AT_OUTFITS.filter(x=>!q||(x.name+" "+x.cat+" outfit").toLowerCase().includes(q)).map(x=>({outfit:true,name:x.name,cat:x.cat,src:x.src}));
  if(only==="outfit") return of; const cs=only==="shot"?[]:atChars().filter(x=>!q||x.name.toLowerCase().includes(q)).sort((x,y)=>x.name.localeCompare(y.name)).slice(0,40);
  const sh=only==="char"?[]:AT_SHOTS.filter(x=>!q||x[0].toLowerCase().includes(q)||"camera angle shot".includes(q)).map(x=>({shot:true,name:x[0],cat:x[1]})); return [...cs,...of,...sh]; }
function atOpen(o){ const only=o.chip?(o.chip.dataset.shot?"shot":o.chip.dataset.outfit?"outfit":"char"):(o.el.dataset.only||null); const was=AT.open&&AT.open.el===o.el&&!o.chip&&!AT.open.chip?AT.open:null, items=atList(o.q,only); AT.open={i:0,...o,only,items,tab:was?.tab}; if(was&&was.q===o.q&&was.i>=0&&was.i<items.length) AT.open.i=was.i; if(o.chip){ const k=AT.open.items.findIndex(x=>x.name===(o.chip.dataset.shot||o.chip.dataset.outfit||o.chip.dataset.name)); if(k>=0) AT.open.i=k; } atDraw();
  try{ if(!CL.loaded) clLoad().then(()=>{ if(AT.open&&AT.open.el===o.el){ AT.open.items=atList(AT.open.q,AT.open.only); atDraw(); } }); }catch{} }
function atDraw(){ const O=AT.open, d=atMenu(); if(!O) return; const r=(O.chip||O.el).getBoundingClientRect(), all=atChars().length, kind=x=>x.shot?"shot":x.outfit?"outfit":"char";
  /* a grid of cards under three tabs: characters, outfits, camera angles. The picture is landscape so the whole character sheet shows */
  const groups={char:[],outfit:[],shot:[]}; O.items.forEach((x,i)=>groups[kind(x)].push(i));
  const tabs=(O.only?[O.only]:["char","outfit","shot"]), cur=O.items[O.i]; if(!tabs.includes(O.tab)) O.tab=cur?kind(cur):tabs[0];
  if(O.q&&!groups[O.tab].length){ const t=tabs.find(k=>groups[k].length); if(t) O.tab=t; }
  const V=O.vis=groups[O.tab]; if(!V.includes(O.i)) O.i=V.length?V[0]:-1; const W=Math.min(O.tab==="shot"?440:560,innerWidth-16); O.cols=O.tab==="shot"?(W>=400?2:1):(W>=460?3:2);
  const label={char:"Characters",outfit:"Outfits",shot:"Camera angles"}, cam=`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>`;
  const card=i=>{ const x=O.items[i], sel=i===O.i; return x.shot?`<button type="button" role="option" class="at-shot" aria-selected="${sel}" data-ati="${i}"><span class="ph cam">${cam}</span><span class="nm two" data-noi18n><b>${esc(x.name)}</b><small>${esc(x.cat)}</small></span></button>`
    :`<button type="button" role="option" class="at-card" aria-selected="${sel}" data-ati="${i}"><span class="pv">${x.src?`<img src="${esc(x.src)}" alt="" loading="lazy">`:`<span class="ph" aria-hidden="true">${esc((x.name.trim()[0]||"").toUpperCase())}</span>`}</span><span class="nm" dir="auto" data-noi18n>${esc(x.name)}</span>${x.cat?`<span class="ct">${esc(x.cat)}</span>`:""}</button>`; };
  const empty=O.tab==="char"?(all?"No character with that name.":"No characters yet. Add them in the character library."):O.tab==="outfit"?"No outfit with that name.":"No camera angle with that name.";
  d.innerHTML=(tabs.length>1?`<div class="at-tabs" role="tablist">${tabs.map(k=>`<button type="button" role="tab" data-attab="${k}" aria-selected="${k===O.tab}">${label[k]}<i>${groups[k].length}</i></button>`).join("")}</div>`:`<div class="at-head">${O.chip?"Change "+(O.tab==="char"?"character":O.tab==="outfit"?"outfit":"camera angle"):label[O.tab]}</div>`)
    +(V.length?`<div class="at-grid${O.tab==="shot"?" shots":""}" style="grid-template-columns:repeat(${O.cols},minmax(0,1fr))">${V.map(card).join("")}</div>`:`<p class="t12 muted">${empty}</p>`)+(O.chip?`<button type="button" class="rm" data-atrm>Remove</button>`:"");
  d.hidden=false; d.style.width=W+"px"; d.style.left=Math.max(8,Math.min(r.left,innerWidth-d.offsetWidth-8))+"px";
  const h=d.offsetHeight; d.style.top=Math.max(8,(innerHeight-r.bottom>h+12||r.top<h+12?r.bottom+6:r.top-h-6))+"px"; if(V.indexOf(O.i)<=0) d.scrollTop=0; else d.querySelector('[data-ati][aria-selected="true"]')?.scrollIntoView({block:"nearest"}); }
function atCheck(el){ const s=getSelection(); if(!s.rangeCount||!s.isCollapsed){ atHide(); return; } const n=s.anchorNode; if(!n||n.nodeType!==3||!el.contains(n)){ atHide(); return; }
  const v=n.nodeValue.slice(0,s.anchorOffset), m=v.match(/(^|[\s(،,.:])@([^\s@]{0,24})$/); if(!m){ atHide(); return; }
  atOpen({el,node:n,start:v.length-m[2].length-1,end:s.anchorOffset,q:m[2]}); }
function atPick(i){ const O=AT.open, x=O?.items[i]; if(!x) return; const el=O.el;
  const mk=()=>x.outfit?atOutfitChip(x.name):x.shot?atShotChip(x.name):atChip(x.name,x.src);
  if(O.chip){ O.chip.replaceWith(mk()); }
  else { const r=document.createRange(); try{ r.setStart(O.node,O.start); r.setEnd(O.node,Math.min(O.end,O.node.nodeValue.length)); }catch{ atHide(); return; } r.deleteContents(); const sp=document.createTextNode(" "), c=mk(); r.insertNode(sp); r.insertNode(c);
    el.focus(); const s=getSelection(), r2=document.createRange(); r2.setStart(sp,1); r2.collapse(true); s.removeAllRanges(); s.addRange(r2); }
  atHide(); el.dispatchEvent(new Event("input",{bubbles:true})); }
/* the library arrived or changed: turn typed @names into pictures, refresh pictures, and show a live example in an untouched brief */
function atRefresh(){ const by=new Map(atChars().map(c=>[c.name,c]));
  for(const el of AT.fields){ if(document.activeElement===el) continue; const v=atVal(el);
    if((v.includes("@")&&[...by.keys()].some(n=>v.toLowerCase().includes("@"+n.toLowerCase())))||(v.includes("[shot: ")&&!el.querySelector(".at-chip.shot"))||(v.includes("[outfit: ")&&!el.querySelector(".at-chip.outfit"))) atWrite(el,v); }
  const b=$("brief"); try{ if(b&&document.activeElement!==b&&S.mode!=="icon"&&by.size){ const v=atVal(b).trim(); if(!v||v===DEFAULT_BRIEF){ const c=CHAR_REFS.find(r=>r.lib)||CHAR_REFS[0]; if(c){ atWrite(b,`@${charName(c.id)} sitting by the window of a quiet café in Jabal al-Weibdeh, soft morning light, absorbed in the phone in her hand, half-smiling at the screen. [shot: 3/4 View]`); b.dispatchEvent(new Event("input",{bubbles:true})); } } } }catch{} }
atMake("brief",false); atMake("rlInput",true);
setTimeout(()=>{ try{ clLoad().then(atRefresh).catch(()=>{}); }catch{} },1200);

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
 ["st_minimal_01","BAE STUDIO STYLE (master reference): woman standing centred against a seamless warm cream wall with a soft pool of light, tone-on-tone camel satin blouse and tan pleated wide-leg trousers, light-oak table with two small props, wide negative space",1],
 ["st_minimal_02","BAE STUDIO STYLE (master reference): man seated cross-legged on a light-oak chair, navy tailored suit over a cream crew-neck knit, burgundy socks, white-painted textured wall with soft raking sunlight, light oak floor, wide negative space",1],
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
].map(([id,d,st])=>({id,d,src:/^st_/.test(id)?`refs/${id}_t.jpg`:`refs/${id}.jpg`,set:"bae",studio:!!st,auto:/^st_/.test(id)}));
const ALL_REFS=[...BAE_REFS,...REFS];
AT_OUTFITS.forEach(o=>ALL_REFS.push({id:o.id,d:"Outfit sheet: "+o.name+" — "+o.d,src:o.src,set:"of",studio:false,auto:true,outfit:o.name}));
const refById=id=>ALL_REFS.find(r=>r.id===id);
const isOutfit=id=>/^of_\d/.test(String(id||""));
const PICK_STUDIO=["st_minimal_01","st_minimal_02","bae_b113_0"];
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
const PICK_BOLD_STUDIO=["st_minimal_01","st_minimal_02","bae_b113_0"];
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
const CHAR_REFS=[]; /* the character library starts empty and is filled by the team owner (see "Character library") */

const CHAR_KEY="bae_char_names_v1";
let CHAR_NAMES={}; try{ CHAR_NAMES=JSON.parse(localStorage.getItem(CHAR_KEY)||"{}"); }catch{}
const charName=id=>((refById(id)?.lib?refById(id).defName:CHAR_NAMES[id]||refById(id)?.defName)||id).trim();
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
  const ofs=atOutfitsIn($("brief")?.value).map(o=>o.id); S.picked=S.picked.filter(id=>!isOutfit(id));
  const chars=[...named,...S.picked.filter(id=>isChar(id)&&!named.includes(id))], rest=S.picked.filter(id=>!isChar(id));
  S.picked=[...chars,...ofs,...rest].slice(0,MAX_REFS); }
/* the outfit the user picked in the brief, spelled out for the prompt writers */
function outfitNote(){ const L=atOutfitsIn($("brief")?.value); return L.length?` OUTFIT CHOSEN BY THE USER — mandatory, overrides every wardrobe rule of the look and the studio: ${L.map(o=>`[outfit: ${o.name}] = ${o.d}`).join(" | ")}. ${L.length>1?"Each outfit belongs to the person named right next to its tag in the brief; never swap or mix them. Each person wears":"The person wears"} exactly these pieces (same colours, fabrics and cuts), worn naturally; ${L.length>1?"the outfit sheets are":"the outfit sheet is"} attached as wardrobe reference${L.length>1?"s":""}. Describe the clothes in words in the prompt and never print the tag.`:""; }
function castText(){ const chars=refPlan().filter(r=>isChar(r.id)); if(!chars.length) return "";
  return "CAST — these people are fixed characters; keep each one's exact identity (face, facial features, hairline and hairstyle, eye colour, skin tone, build): "+chars.map(r=>`${charLabel(r.id)} = ${r.tag} (${refById(r.id).look})`).join("; ")+". When the brief names a character, or describes a person of the same gender and age who is not otherwise named, that person IS the character. Characters keep their own look even where the generic people description would differ. Their clothing, pose and background in the reference are NOT used: dress them by the look rules for this scene."; }
const MAX_REFS=10;
/* what each style reference is used for: the user chooses per image */
const REF_USES={both:["Colour + light","COLOUR GRADING and LIGHTING reference: take its palette, tonal curve, contrast, saturation, white balance and the way skin tones render, and its light direction, light quality (hard or soft), shadows and highlights"],
  grade:["Colour grading","COLOUR GRADING reference only: take its palette, tonal curve, contrast, saturation, white balance and the way skin tones render; ignore its light direction, camera and everything else"],
  light:["Lighting","LIGHTING reference only: take its light direction, light quality (hard or soft), key-to-fill ratio, shadows, highlights and time-of-day feel; ignore its colours, camera and everything else"],
  style:["Full style",""]};
let REF_USE={}; try{ REF_USE=JSON.parse(localStorage.getItem("bae_ref_use")||"{}")||{}; }catch{}
const refUsable=id=>{ const r=refById(id); return !!r&&id!=="user-image"&&!isChar(id)&&!isOutfit(id)&&!r.auto&&r.set!=="ic"; };
const refUseOf=id=>REF_USES[REF_USE[id]]?REF_USE[id]:(refById(id)?.set==="bae"?"both":"style");

/* ---------------- Jordanian faces: one casting lock for every image and video prompt in the studio ---------------- */
const JO_FACE = `JORDANIAN FACES — CASTING LOCK (applies to every person in every image or video prompt):
- Never write "Arab" or "Middle Eastern" on its own: image models answer with one stereotype (dark skin, heavy beard, traditional dress, everyone alike). Write "Jordanian man / woman / boy / girl from Amman" and then the concrete features.
- Give EVERY person their own explicit values, and never repeat the same combination for two people in one project: skin tone · eye colour · hair colour, texture and cut · eyebrows · nose · face shape and jaw · build · for men, facial hair.
- Skin: the centre of the range is light olive to medium olive (also fair; tan-brown less often). It is lighter than models assume; never default to deep brown.
- Eyes: dark brown for most; hazel, green or grey for about one person in five.
- Hair: black or dark brown for most, sometimes medium brown; straight or wavy.
- Eyebrows: dark and full; men's straight and low-set, women's defined with a soft arch.
- Young men 18-35: the most common look is a short boxed beard with a clean cheek line, joined to the moustache (also: stubble, or a thick moustache alone; clean-shaven is the minority); black hair with a low or mid fade and a brushed-back or textured top; broad jaw, full cheeks, sturdy neck; build from athletic to heavy-set. A metal wristwatch reads local.
- Young women 18-35: long hair, straight or softly waved, centre part, black to brown; oval or heart-shaped face; natural full lips; light everyday makeup.
- Middle-aged 36-59: men have a fuller face, a receding or thinning hairline, grey in the beard and at the temples, a moustache or short beard or a shaved face with shadow; women have shoulder-length styled hair, dark or dyed brown to caramel, a softer jaw, light makeup.
- Elderly 60+: grey or white hair; men often keep a white moustache or trimmed beard; deep lines around the eyes and mouth, uneven pigmentation, heavier brows, warm expressive eyes.
- Teens 13-17: slimmer faces; boys with a first thin moustache and a fade haircut; girls with long hair tied back; clear skin with a few blemishes, no makeup look.
- Children under 12: round soft faces, big dark eyes, hair often a shade lighter (dark to chestnut brown); boys in short cuts, girls with a ponytail or loose hair.
- Real people, not influencers: visible skin texture, slight asymmetry, a faint darker tone under the eyes, now and then a mole or freckles; no filter look, no lip-filler look, no contact-lens eyes, no heavy contour, unless the brief asks for a glam look. Where a retouching rule applies, keep it; the features still follow this lock.
- Wardrobe follows the wardrobe rules (modern, casual or smart; no head covering or traditional dress unless the brief asks for it).
- Never copy the face of a real person.`;
/* ---------------- Jordanian places: one location lock for every image and video prompt in the studio ---------------- */
const JO_PLACE = `JORDANIAN PLACES — LOCATION LOCK (applies to every exterior and street in every image or video prompt):
- Never write only "a Middle Eastern city" or "an Arab street": models answer with desert, domes and old souks. Name the place type below and its concrete materials.
- The one constant of Amman: pale limestone. Almost every building, old or new, is clad in cream to light-beige stone blocks; it turns warm gold and pink at sunset. The city is built on hills, so streets slope and other hills full of buildings close the background.
- MODERN AMMAN (default; Abdali Boulevard and the new downtown): 6 to 10 storey blocks in smooth cream limestone combined with large glass curtain walls; horizontal metal louvres and sun-shade screens; perforated geometric metal panels on recessed balconies; warm-lit shopfronts and colonnades at street level; a few glass towers behind (dark blue glass, one cylindrical). Pedestrian boulevards paved in grey stone setts with small inlaid ground lights; rows of palm trees and clipped round-crowned trees in planters; large black square planters with topiary; white tensile fabric canopies stretched between buildings on steel masts and cables; wide stairs with stainless-steel handrails beside limestone-block retaining walls and clipped hedges; café A-frame boards and terraces.
- STREET DETAILS THAT READ JORDANIAN: green street-name signs in Arabic and English; black bollards, zebra crossings, yellow kerb lines; Jordanian flags on poles; white and black saloon cars (Hyundai, Kia, Toyota), yellow taxis, white number plates; a small glass security kiosk at mall and tower entrances.
- RESIDENTIAL AND HILLSIDE AMMAN (only when the story needs an ordinary neighbourhood): 3 to 5 storey cubic limestone apartment buildings stacked up steep hills, flat roofs crowded with white plastic water tanks, satellite dishes and solar heaters; dark cypress and pine trees between buildings; a minaret or dome on the skyline; soft haze over the far hills.
- OLD DOWNTOWN (only when the brief asks for it): a busy street lined with tall palms, older 4 to 6 storey stone buildings, Arabic shop signs, yellow taxis and dense traffic, pavements full of people, overhead cables, a big mural on a blank wall.
- LIGHT: very clear deep-blue sky and crisp sun for most of the year; blue hour with warm interior light glowing from shopfronts; winter days can be grey with rain and wet, reflective asphalt; at night LED outlines on towers and a carpet of city lights over the hills.
- Avoid unless asked: desert, camels, mud-brick, onion domes, souk alleys, Gulf-style skyscraper skylines, ornate arches everywhere.
- Never show a real brand's sign or logo unless the user names it; invent neutral shop signs.`;
/* ---------------- Characters are made in two stages: a natural portrait first, the character sheet from the chosen portrait second ---------------- */
const JO_PORTRAIT = `CHARACTER PROMPTS — STAGE 1 IS A NATURAL PORTRAIT, NEVER A CHARACTER SHEET:
A character's "prompt" describes ONE ordinary, natural photograph of that one person, so the user can generate a few and choose the face they like:
- one person only, vertical 3:4, framed chest-up or waist-up, looking toward the camera or just past it, a relaxed natural expression;
- in a real everyday place that suits them (a street in Amman, a café, an office, a living room, a car park, a shop) with the real light of that place and a softly out-of-focus background with depth — NOT a studio, NOT a plain, grey or seamless backdrop, NOT a multi-panel sheet, no turnaround views;
- write, in this order: who they are (Jordanian man / woman / boy / girl from Amman, exact age, role), the face in concrete features from the casting lock, hair and facial hair, build, the exact outfit (every garment the user asked for, with colour and fabric), then the place and the light;
- eye-level 50mm or 85mm lens, photoreal, natural colour, real skin texture, no beauty filter; no text, no logos, nobody else in focus.
STAGE 2 (the studio does it, you do not write it): when the user has chosen a portrait, the studio turns that exact image into the three-panel character sheet on plain grey, using the portrait as the identity reference.`;
function rlSheetPrompt2(e){
  const T=String(rlTpl("char")||RL_TPL.char).split("\n"); const layout=(T[0]||"").replace(/\s*\[and headwear\]/i,""); const skin=(T.find(x=>/^SKIN AND TEXTURE/i.test(x))||"").replace(/\[wardrobe colours\]/i,"the outfit's own colours");
  return `Use the person in the reference image (@img1) as the ONLY source of identity: the same face, age, skin tone, eyes, eyebrows, hair, facial hair and build, and the same outfit, all unchanged. Do not redesign, beautify, slim or restyle them. Ignore the reference's background, pose and lighting.
${layout}
THE PERSON: exactly the person in @img1${e?.name?` (${e.name})`:""}${e?.description?` — ${String(e.description).slice(0,300)}`:""}. Upright balanced posture, relaxed empty hands at the sides, calm neutral expression with the mouth closed.
WARDROBE, identical in every view: exactly the outfit worn in @img1${e?.wardrobe?` (${String(e.wardrobe).slice(0,300)})`:""}, continued naturally down to trousers or skirt and shoes that belong with it. No bag, no props, no logos, no lettering.
${skin}`;
}
const rlIsSheetPrompt=t=>/three-panel|character sheet|plain gr[ae]y clean background/i.test(String(t||""));
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
/* the house way of shooting: caught moments, never posed to the lens */
const JO_CANDID=`CANDID LOCK — the BAE way of shooting, in every photograph and every shot:
- CAUGHT, NOT POSED: the image is a moment that was happening anyway and the camera happened to catch it. Nobody looks at the camera, ever: no eye contact with the lens, no smile to the viewer, no posing, no presenting an object to the camera. People are absorbed in what they do: looking at the phone, at the person they talk to, at what their hands are doing, down, away, or out of frame.
- IN THE MIDDLE OF AN ACTION: mid-step, mid-sip, mid-laugh, mid-sentence, reaching, turning, typing. Natural unposed body, weight on one leg, hands busy. Small imperfections are welcome: a strand of hair moving, a sleeve creased, a half-smile.
- THE CAMERA OBSERVES FROM THE SIDE: prefer a three-quarter view, a profile from the side, a three-quarter view from behind, or over the shoulder. A flat frontal view is the last choice and even then the eyes look away. Use the angle the user picked when there is a [shot: …] tag.
- ONE FOCUS IN THE MIDDLE: one clear subject or moment sits in the central area of the frame and is the sharpest thing in it; everything else is quiet and supports it. Shallow to medium depth of field, soft foreground or background, calm edges.
- THE PLACE IS QUIET, NOT CROWDED: a simple, uncluttered location with few elements and large calm surfaces (a wall, a window, a clean street, a table). No busy decoration, no crowd, no signs, nothing competing with the subject. The place is felt, not shown off.
The only exception: a character portrait or character sheet made as an identity reference, and anything the user explicitly asks for (for example "looking at the camera").`;
const CLIENT_RULES = `CLIENT ART DIRECTION — MANDATORY, OVERRIDES EVERYTHING ELSE:
A. Modern and contemporary everything. Even when the place is Amman, show a modern, new, upscale location (contemporary architecture, new buildings, sleek cafés, modern apartments and offices). Nothing old, traditional, rustic or dated.
B. People: NO hijab, NO headscarf, NO head covering of any kind; NO traditional Arab clothing (no thobe, dishdasha, abaya, keffiyeh, shemagh, kaftan). Wardrobe is modern and contemporary and follows the selected LOOK below (bold colourful streetwear, or elegant and calm). NO ORANGE CLOTHING on anyone: no orange, rust, terracotta, coral, amber, tangerine or peach garments or accessories. Brand orange may appear only in the light, background or props, never on people.
C. Skin: high-end professional retouching — even, refined skin tone, smooth healthy complexion, soft glow, minimised blemishes and pores, while keeping a subtle real texture (never plastic, waxy or airbrushed-flat).
D. Faces: every person follows the casting lock below.
${JO_FACE}
E. Places: every exterior follows the location lock below; rule A still decides which kind of place (modern and upscale by default).
${JO_PLACE}
D. Phones: any phone is a modern iPhone 18 (latest flagship, ultra-thin uniform bezels, Dynamic Island, slim metal frame), with no visible logo. Never an old or generic phone.
E. Decor and furniture: modern Scandinavian IKEA-style interiors — light oak/birch wood, white and warm-neutral walls, clean lines, functional minimal furniture, soft textiles, a few plants. No clutter, no ornate or traditional decor, no brand names.
F. Candid: every image follows the candid lock below.
${JO_CANDID}`;
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
function lookRule(){ return S.look==="Bold"?LOOK_BOLD+(S.setting==="Studio"?"\nIn the studio the STUDIO lock wins over this look: eye-level camera, calm pose, warm neutral grade and the plain warm wall. From the bold look keep only one stronger solid wardrobe colour (deep navy, burgundy or teal) worn as a clean block.":""):LOOK_CALM; }
function lookLine(){ return S.look==="Bold"?"Look lock: BOLD & COLOURFUL — refined old-money minimal wardrobe (tailored trousers, crisp shirts, fine knits, clean blazers, loafers or white leather sneakers; never streetwear), crisp white or ink-black layers over ONE fresh BAE colour piece per person (blush #F1C0B6, raspberry #B9516E, burgundy #A33755 or sky blue #4BBCDF), each person a different colour, never teal or green; bright clean light, confident energy, clean punchy grade.":"Look lock: ELEGANT & CALM — refined old-money tailored wardrobe ONLY in the warm, deep BAE palette (ink #19181E, slate #4F4E62, burgundy #A33755, raspberry #B9516E, dusty rose #F1C0B6, stone #CCC3B4, ecru #FFFAF4), never streetwear, never teal: a deep anchor piece, one tonal mid-tone, ecru or white as one layer only, one quiet accent; ordered and harmonious; never head-to-toe stone, beige or cream, never matching outfits; gentle angle and soft natural light."; }
const CLIENT_LINE = "Mandatory art direction: modern, contemporary, upscale setting; modern wardrobe that follows the look lock, with no orange clothing on anyone; no hijab, no headscarf, no traditional Arab clothing; professionally retouched skin with an even skin tone and subtle real texture; any phone is a modern iPhone 18 with no visible logo; modern Scandinavian IKEA-style decor. Candid, caught moment: nobody looks at the camera, people absorbed in a real action, seen from a three-quarter, side or behind angle; one clear focus in the middle of the frame; a quiet uncluttered place.";
const CLIENT_NEG = "orange clothing, orange shirt, orange jacket, orange dress, orange sweater, rust clothing, terracotta clothing, coral clothing, hijab, headscarf, head covering, niqab, abaya, thobe, dishdasha, keffiyeh, shemagh, kaftan, traditional Arab clothing, old buildings, souk, old town, rustic, dated decor, ornate furniture, clutter, old phone, generic phone, visible logo, blemishes, uneven skin tone, acne, plastic skin, waxy skin, looking at the camera, eye contact with the camera, staring at the viewer, posing for the camera, posed portrait, stiff pose, cluttered background, crowded scene";
/* Composition lock — always on */
const COMPOSITION_RULE = `COMPOSITION LOCK — MANDATORY: the person (main subject) is centred horizontally, standing or sitting on the vertical centre line of the frame, with balanced, near-symmetrical framing and equal space on the left and right. Never place the person on the left or right third. Eyes sit around the upper third; keep comfortable head room. Any copy space is distributed evenly around the centred subject (above, or equally on both sides).`;
const COMPOSITION_LINE = "Composition lock: the person (or the group, as one centred cluster) is centred in the middle of the frame on the vertical centre line, balanced symmetrical framing with equal space left and right; not on the left, not on the right.";
const COMPOSITION_NEG = "off-centre subject, subject on the left, subject on the right, rule-of-thirds placement, subject cropped at the edge";
/* Setting lock — Studio overrides any location in the brief */
/* A scene must tell its whole story: whoever the action involves is in the frame */
const STORY_RULE = `STORY LOCK: show everything the action needs so the moment reads instantly. Paying or buying → a cashier or sales associate across the counter (facing the customer, softly in focus, dressed in the same refined style) and the shop's products displayed neatly and minimally behind (folded garments, boxed goods on light-oak shelves). Ordering → a barista or waiter. Meeting or advice → the other person. Never an empty counter, empty shop or missing counterpart. The main subject stays centred; secondary people are smaller or softer.`;
const STORY_LINE = "Story lock: every person the action needs is in the frame (e.g. a cashier or sales associate across the counter when paying, with neatly displayed products), never an empty counter or empty shop; the main subject stays centred.";
const STUDIO_RULE = `SETTING LOCK — STUDIO, MINIMAL AND CLEAN (overrides any location named in the brief or seen in other references; overrides the look's camera and grade). Match the two BAE STUDIO STYLE master references exactly in style, never in face or identity:
- SET: one plain wall and nothing else — a seamless warm cream / light-stone wall (#ECE8DF to warm beige), smooth plaster or white-painted board-textured, optionally a light oak plank floor. Empty, calm, architectural. No decor, no plants, no shelves, no screens, no signage.
- PROPS: at most ONE piece of light-oak or walnut furniture (a chair, a stool or a small table) plus at most two small objects that tell the brief's story (a phone, a card, a microphone, an amber glass). A place named in the brief becomes these one or two props, never a built set. Every person the action needs is present, nobody extra.
- COMPOSITION: wide frame with generous negative space on both sides for copy; the subject centred or just off-centre and small in the frame (about half to two-thirds of the height), full body or medium-full; eye-level camera, straight and level, 50–85mm look, f/4–5.6 so the person, clothes and props are all crisp.
- LIGHT: one large soft warm key from the side that reads as window light, low contrast, soft natural shadow; a gentle pool of light or soft raking diagonal sun shapes on the wall behind the subject; faint natural vignette. No hard flash, no coloured gels, no rim lights.
- WARDROBE: smart, tailored, modern, solid colours only — tone-on-tone earth (camel, tan, sand, cream, taupe) or one deep block (navy, ink) over cream; fine fabrics with visible texture and drape (satin, wool, fine knit); pleated wide-leg trousers, a draped blouse, an unstructured suit over a crew-neck knit, no tie; leather shoes. Exactly one small BAE accent in burgundy, terracotta or orange (socks, a glass, a notebook). No patterns, no logos, no prints, no heavy jewellery.
- PEOPLE: calm, composed, confident, caught in an unposed moment; never looking at the camera — eyes on the phone, on what the hands do, or away out of frame; body turned three-quarter or in profile; relaxed posture (legs crossed, hand resting on furniture, adjusting a cuff, mid-step); natural skin texture, minimal make-up, groomed hair.
- FINISH: high-end editorial campaign photograph, medium-format clarity, true fabric and skin detail, warm neutral grade (cream, sand, oak), clean and uncluttered, no grain, no HDR.`;
const STUDIO_LINE = "Setting lock: STUDIO, minimal and clean. One seamless warm cream / light-stone wall (smooth plaster or white-painted texture), optional light oak floor, at most one light-oak or walnut piece of furniture and two small story props; wide frame with generous negative space, subject centred and small in frame, eye-level, everything crisp; one large soft warm side key with a gentle pool of light or soft raking sun shapes on the wall; tailored solid-colour wardrobe, tone-on-tone earth or deep navy over cream, one small burgundy/terracotta accent, no patterns or logos; calm unposed moment, eyes away from the camera, body turned three-quarter; high-end editorial finish. No real location, no built set, no clutter.";
const STUDIO_NEG = "outdoor, street, city background, window view, landscape, real-world location, cluttered set, shelves, plants, decor, patterned clothing, printed fabric, logos on clothing, coloured gels, hard flash, low angle distortion, wide-angle distortion, busy background, oversaturated colours";
const LOCATION_LINE = "Setting lock: on location in a real, modern, upscale place in Amman. Background softly blurred with shallow depth of field (f/2 look), clean and nearly empty: open sky, soft greenery or one plain wall; no building, facade or busy detail behind the people.";
const LOCATION_BG=`
BACKGROUND LOCK — ON-LOCATION (mandatory): everything behind the people is softly blurred: shallow depth of field, f/1.8–2.8 look on a 50–85mm lens, creamy soft bokeh, the people tack sharp. The background is clean and nearly empty, with very few elements: open sky, a soft blurred line of trees or greenery, one plain wall or a far soft horizon. Outdoors, most of what is behind and above the people is open sky. NO building dominating the frame, no facade or architecture filling the background, no windows, lamp posts, railings, signs or parked cars behind the heads; if any building appears it is small, far away, low in the frame and fully out of focus. Nothing in the background competes with the people.`;
function settingRule(){ return S.setting==="Studio"?STUDIO_RULE:LOCATION_BG.trim()+"\n"+(S.look==="Bold"?`SETTING LOCK — ON-LOCATION: the real, modern, upscale place the brief names (in modern Amman), bright and clean; when outdoors, a bright open sky behind the subjects.`:`SETTING LOCK — ON-LOCATION: the real, modern, upscale place the brief names (modern Amman), with depth layers and foreground bokeh.`); }
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
    if(typeof v==="string"&&/^resolution$/i.test(k)&&/^[24]k$/i.test(v)) out.res4k=true;
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
  /* Locked to Seedream 5.5 (ByteDance); other Seedream versions only appear if 5.5 is missing */
  const nanoAll=list.filter(m=>/seedream/i.test(m.id+" "+m.name)).sort((a,b)=>ver(b.id+" "+b.name)-ver(a.id+" "+a.name));
  const exact=nanoAll.filter(m=>/5[\s._-]?5(?!\d)/.test(m.id+" "+m.name));
  const nano=exact.length?exact.slice(0,1):nanoAll;
  S.models={nano};
  const sel=$("selNano"); sel.innerHTML="";
  if(!nano.length) sel.innerHTML=`<option value="">Seedream 5.5 (not found in your Magnific models)</option>`;
  nano.forEach(m=>{ const o=document.createElement("option"); o.value=m.id; o.textContent=m.name+(exact.length?" · locked":" · 5.5 not found, pick one"); sel.appendChild(o); });
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
  $("mNanoName").textContent=S.mode==="icon"?`${S.gptName||"GPT 2.5"} · via Magnific`:(S.nanoName||"Seedream 5.5")+" · via Magnific";
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
    if(r.set==="ch"){ if(CL.cat!=="all"&&r.cat!==CL.cat) return; const w=document.createElement("div"); w.className="ch-card"; w.appendChild(b);
      const inp=document.createElement("input"); inp.type="text"; inp.className="ch-name"; inp.value=charName(r.id); inp.setAttribute("aria-label","Character name, add other spellings after a slash"); inp.spellcheck=false; inp.dir="auto"; inp.placeholder="Name — e.g. Ali / علي";
      if(!CL.canEdit) inp.readOnly=true;
      inp.onchange=()=>{ const v=inp.value.trim(); if(v&&r.lib){ r.defName=v; clUpdate(r.docId,{name:v}); } syncCast(); renderRefs(); };
      if(S._newChar===r.id){ setTimeout(()=>{ inp.focus(); inp.select(); },60); S._newChar=null; }
      w.appendChild(inp);
      if(r.lib){ const c=CL.list.find(x=>x.id===r.docId); if(c){ const t=document.createElement("span"); t.className="t12 muted ch-size"; t.textContent=c.orig?`Original kept${c.px?` · ${c.px[0]}×${c.px[1]}`:""}`:c._mag?"Original sent to your Magnific · team copy max 2000 px":"Stored reduced (max 2000 px) — add it again to keep the original"; w.appendChild(t); } }
      if(CL.canEdit&&r.lib){ const row=document.createElement("div"); row.className="ch-row"; const sel=document.createElement("select"); sel.className="ch-cat"; sel.setAttribute("aria-label","Shelf"); sel.innerHTML=CL_CATS.map(([k,l])=>`<option value="${k}"${r.cat===k?" selected":""}>${l}</option>`).join(""); sel.onchange=()=>{ r.cat=sel.value; clUpdate(r.docId,{cat:sel.value}); renderRefs(); };
        const x=document.createElement("button"); x.type="button"; x.className="ch-del"; x.textContent="Remove"; x.onclick=()=>{ if(x.dataset.sure){ clRemove(r.docId).then(renderRefs); } else { x.dataset.sure="1"; x.textContent="Remove for everyone?"; setTimeout(()=>{ delete x.dataset.sure; x.textContent="Remove"; },4000); } };
        row.appendChild(sel); row.appendChild(x); w.appendChild(row); }
      if(r.lib){ const row2=document.createElement("div"); row2.className="ch-row ch-acts"; const d=document.createElement("button"); d.type="button"; d.className="btn small"; d.textContent="Download"; d.onclick=()=>clDownload(r.docId,d); row2.appendChild(d);
        if(CL.canEdit){ const l=document.createElement("label"); l.className="btn small"; l.innerHTML=`Replace<input type="file" accept="image/jpeg,image/png,image/webp" class="sr">`; l.querySelector("input").onchange=e=>{ const f=e.target.files?.[0]; e.target.value=""; if(f) clReplace(r.docId,f); }; row2.appendChild(l); }
        w.appendChild(row2); }
      b.onclick=()=>{ const j=S.picked.indexOf(r.id); if(j>=0){ S.picked.splice(j,1); S._autoCast=(S._autoCast||[]).filter(x=>x!==r.id); } else if(S.picked.length<MAX_REFS) S.picked.unshift(r.id); renderRefs(); };
      box.appendChild(w); return; }
    b.onclick=()=>{ const j=S.picked.indexOf(r.id); if(j>=0) S.picked.splice(j,1); else if(S.picked.length<MAX_REFS) S.picked.push(r.id); renderRefs(); };
    box.appendChild(b); });
  if(S.refTab==="ch"){
    if(!CL.loaded&&!CL._loading){ CL._loading=true; clLoad().then(()=>{ CL._loading=false; renderRefs(); clMigrateLocal(); }); }
    const head=document.createElement("div"); head.className="cl-head"; head.innerHTML=clTabsHTML()+(CL.busy?`<p class="t12" role="status">${esc(CL.busy)}</p>`:"")+(CL.err?`<p class="t12 bad" role="alert">${esc(CL.err)}</p>`:"");
    head.querySelectorAll("[data-clcat]").forEach(t=>t.onclick=()=>{ CL.cat=t.dataset.clcat; renderRefs(); }); box.prepend(head);
    if(CL.canEdit){ const w=document.createElement("label"); w.className="ch-card ch-add"; w.innerHTML=`<span class="plus" aria-hidden="true">+</span><b>Add character</b><span class="t12 muted">A clear photo or a character sheet. It joins the team library; name it, then write the name in any brief.</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple class="sr">`; w.querySelector("input").onchange=e=>{ clUpload(e.target.files); e.target.value=""; }; box.appendChild(w); }
    else if(!CL.list.length&&CL.loaded){ const e=document.createElement("p"); e.className="muted cl-empty"; e.textContent="No characters in the library yet. The studio owner adds them."; box.appendChild(e); } }
  const nb=S.picked.filter(id=>refById(id)?.set==="bae").length;
  $("refCount").textContent=`${S.picked.length} / ${MAX_REFS} · ${nb} BAE`;
  /* selected strip: always visible, click to remove */
  const pk=$("picked"); pk.innerHTML="";
  if(!S.picked.length) pk.innerHTML=`<span class="none">No references picked. Choose up to ${MAX_REFS} below, or use Auto-pick.</span>`;
  S.picked.forEach(id=>{ const r=refById(id); if(!r) return; const b=document.createElement("button"); b.type="button"; b.className="pk"; b.title="Remove: "+r.d; b.setAttribute("aria-label","Remove reference: "+r.d);
    b.innerHTML=`<img src="${r.src}" alt="">${isChar(id)?`<span class="pk-name">${esc(charLabel(id))}</span>`:""}`; b.onclick=()=>{ S.picked=S.picked.filter(x=>x!==id); S._autoCast=(S._autoCast||[]).filter(x=>x!==id); renderRefs(); };
    if(refUsable(id)&&S.mode!=="icon"){ const w=document.createElement("div"); w.className="pkw"; w.appendChild(b); const s=document.createElement("select"); s.className="pk-use"; s.setAttribute("aria-label","Use this reference for"); s.title="What to take from this reference";
      s.innerHTML=Object.entries(REF_USES).map(([k,v])=>`<option value="${k}">${v[0]}</option>`).join(""); s.value=refUseOf(id); s.onchange=()=>{ REF_USE[id]=s.value; try{ localStorage.setItem("bae_ref_use",JSON.stringify(REF_USE)); }catch{} }; w.appendChild(s); pk.appendChild(w); }
    else pk.appendChild(b); });
}
function syncTabs(){ document.querySelectorAll("#refTabs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.tab===S.refTab?"true":"false"));
  $("addRefWrap").hidden=S.refTab!=="user";
  $("refHint").textContent=({
    ic:"BAE illustration set (guidelines p.101, light mode). Sent to GPT 2.5 as style direction only: material, translucency, gradient, angle and lighting.",
    user:"Your own reference photos, kept only on this device. Add licensed images that show the light, wardrobe or camera angle you want.",
    bae:"Photos from the Bank al Etihad guidelines. Picked frames go to Claude for style analysis and to Seedream 5.5 as references. Up to 10, from any set. Under each picked photo choose what to take from it: colour grading, lighting, both, or the full style. Choosing Studio picks the BAE studio frames for you.",
    yt:"Youth campaign set: bold streetwear, low-angle wide camera, blue sky, hard sun and friends mid-laugh. Used for wardrobe, camera and energy; their logos and orange clothing are never copied.",
    mj:"Mari Juliano lifestyle set, for clean natural light and candid energy. Mix with the other sets, up to 10 in total.",
    ch:"The team's character library. Write a character's name in the brief and they are cast automatically."})[S.refTab]; }
$("refTabs").addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b) return; S.refTab=b.dataset.tab; syncTabs(); renderRefs(); });
renderRefs(); syncTabs();
$("btnClearRefs").onclick=()=>{ S.picked=[]; renderRefs(); };
$("btnAuto").onclick=async()=>{
  if(!sample) return flash($("s1state"),"Claude is unavailable in this view.",true);
  const b=$("btnAuto"); b.disabled=true; b.textContent="Picking…";
  try{
    const o=await sample.json(`Pick 4 reference photos whose light, setting and energy best match this brief, for a Bank al Etihad photo. Brief: "${$("brief").value}" (a [shot: …] tag in the brief is the camera angle/framing the user chose: build the composition on it, describe it in plain photographic words, never print the tag itself; it overrides the Shot option).${outfitNote()} Setting: ${S.setting}. Shot: ${S.shot}.
Look: ${S.look==="Bold"?"BOLD & COLOURFUL — pick at least 2 Youth campaign photos (ids starting \"yt\") for wardrobe and camera angle, plus at least 1 BAE photo":"ELEGANT & CALM — pick at least 2 BAE guideline photos (ids starting \"bae_\")"}.
Rules: ${S.setting==="Studio"?"Setting is STUDIO: pick only photos marked [studio], then fill with BAE close-up/selective-focus frames.":"Setting is on-location: prefer BAE depth, focus and movement frames plus Mari Juliano frames with clean natural light."} Prefer frames where the person is centred.
Catalog:\n${ALL_REFS.filter(r=>r.set!=="ch"&&r.set!=="ic"&&r.set!=="of").map(r=>r.id+(r.studio?" [studio]":"")+": "+r.d).join("\n")}\nReply with only a JSON array of 4 ids, e.g. ["yt04","yt06","bae_b108_2","r061"].`,{modelTier:"quick"});
    if(Array.isArray(o)){ const cast=S.picked.filter(isChar); S.picked=[...cast,...o.map(String).filter(id=>refById(id)&&!isChar(id)&&!/^ic_/.test(id))].slice(0,MAX_REFS); renderRefs(); }
  }catch(e){ flash($("s1state"),sampleCopy(e),true); }
  finally{ b.disabled=false; b.textContent="Auto-pick for this brief"; }
};
async function refBlobs(){ const out=[]; for(const id of S.picked){ const r=refById(id); if(r?.lib&&!r.blob){ try{ r.blob=await clBlob(r.docId); }catch{} } if(r?.blob){ out.push({id,blob:r.blob}); continue; } try{ const res=await fetch(`refs/${id}.jpg`); if(res.ok) out.push({id,blob:await res.blob()}); }catch{} } return out; }

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

Brief (may be Arabic or English; a [shot: …] tag is the camera angle/framing the user chose — it is mandatory and overrides the Shot option): "${$("brief").value}"${outfitNote()}
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
    const prompt=`Write one production image prompt for ByteDance Seedream 5.5 for this Bank al Etihad photograph.
${BAE_RULES}

${REF_STYLE}

${COMPOSITION_RULE}

${STORY_RULE}

${settingRule()}

${lookRule()}

Scene breakdown: ${JSON.stringify(S.analysis||{brief:$("brief").value})}
Brief: "${$("brief").value}" (a [shot: …] tag in the brief is the camera angle/framing the user chose: build the composition on it, describe it in plain photographic words, never print the tag itself; it overrides the Shot option).${outfitNote()} Setting: ${S.setting}. Shot: ${S.shot}. Aspect ratio: ${aspectText()}. Output: native 2K, highest quality. Channel: ${$("channel").value}. Copy space for the gradient shape: ${$("copySpace").checked?"yes, keep calm, even space around the centred subject":"no"}.
Reference images (${S.picked.length}) will be attached. Character references carry identity (see CAST). The others are STYLE references; what they show is for YOUR understanding of the photography only — never describe or reuse that content in the prompt: ${S.picked.filter(id=>!isChar(id)).map(id=>`${refById(id)?.set==="bae"?"BAE guideline":refById(id)?.set==="yt"?"Youth campaign":"Mari Juliano"} — ${refById(id)?.d}`).join("; ")}
${castText()}${S.upload&&$("useUpAsRef").checked?"; plus the user's own image as the first reference for content":""}.

Requirements:
- Begin with exactly: "Professional photography, clean natural light."
- Photorealistic, 2K, real camera language (lens, aperture, angle), believable Jordanian people in modern places.
- Apply every point of the CLIENT ART DIRECTION explicitly in the prompt: modern upscale setting, modern elegant wardrobe, no hijab or traditional Arab clothing, professionally retouched even skin tone, iPhone 18 for any phone, modern IKEA-style decor.
- State the composition explicitly: the person centred on the vertical centre line, balanced framing, equal space left and right.
- ${S.setting==="Studio"?"STUDIO: describe the plain warm wall, the single piece of furniture, the soft side light with its light shape on the wall, the wide negative space and the tailored solid-colour wardrobe explicitly; translate any location in the brief into one or two small props; no real location, no built set.":"ON-LOCATION: encode depth layers and foreground bokeh in a modern real place."}
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
  if(!/2k/i.test(t)) t+=" Ultra-detailed 2K resolution.";
  t=t.replace(/\n*Mandatory art direction:[^\n]*/g,"").replace(/\n*Look lock:[^\n]*/g,"");
  t+="\n\n"+CLIENT_LINE+"\n"+lookLine();
  if(!/Composition lock:/.test(t)) t+="\n"+COMPOSITION_LINE;
  t=t.replace(/\n*Setting lock:[^\n]*/g,"")+"\n"+(S.setting==="Studio"?STUDIO_LINE:LOCATION_LINE);
  t=t.replace(/\n*Story lock:[^\n]*/g,"")+"\n"+STORY_LINE;
  return t;
}

/* ---------------- STEP 3: generate ---------------- */
const MODELS={ nano:{el:"rNano",sel:"selNano",mode:"modeNano",prompt:"pNano",label:"Seedream 5.5"}, icon:{el:"rNano",sel:"selIcon",mode:"modeIcon",prompt:"pNano",label:"GPT 2.5"}, iconNano:{el:"rNano2",sel:"selNano",mode:"modeNano",prompt:"pNano",label:"Seedream 5.5"} };
const genKey=()=>S.mode==="icon"?"icon":"nano";
/* Icons render with GPT 2.5 only; photography with Seedream 5.5 */
const genKeys=()=>S.mode==="icon"?["icon"]:["nano"];
const isIconKey=k=>k==="icon"||k==="iconNano";
function negativeNow(){ if(S.mode==="icon") return ICON_NEG; return [S.negative||"logos, text, watermark, signage, oversaturated, HDR, extra fingers",CLIENT_NEG,COMPOSITION_NEG,S.setting==="Studio"?STUDIO_NEG:"sharp detailed background, building dominating the background, busy architecture behind the subject, deep focus, cluttered background, lamp posts, signage",S.look==="Bold"?LOOK_BOLD_NEG:LOOK_CALM_NEG].filter(Boolean).join(", "); }
const STEPS=["Upload references","Render in 2K","2K check","Ready"];
function aspectVal(){ if(S.mode==="icon") return "16:9"; const v=$("aspect").value; if(v==="custom"){ const w=parseInt($("cw").value,10)||0,h=parseInt($("ch").value,10)||0; return w&&h?{width:w,height:h}:"auto"; } return v; }
function aspectText(){ const a=aspectVal(); return typeof a==="string"?a:`${a.width}×${a.height}px`; }
function ratioCSS(){ const a=aspectVal(); if(a==="auto") return "4 / 3"; if(typeof a==="object") return `${a.width} / ${a.height}`; const [w,h]=a.split(":").map(Number); return `${w} / ${h}`; }
function renderCard(key,st){
  const m=MODELS[key]; const el=$(m.el); const name=$(m.sel).selectedOptions[0]?.textContent?.replace(" · latest","")||m.label;
  const outs=st.outs||[]; const o=outs[st.sel||0];
  const res=o&&o.long?(o.long>=2000?`2K · ${o.long}px`:`${o.long}px`):"";
  el.innerHTML=`<div class="head"><b>${esc(m.label)}</b><span class="count">${esc(name)}</span></div>
  <div class="frame ${st.busy?"busy":""}${isIconKey(key)?" iconframe":""}" style="aspect-ratio:${ratioCSS()}">${o?.img?`<img src="${o.img}" alt="Generated image ${(st.sel||0)+1} from ${esc(m.label)}">`:`${!o&&!st.busy?`<div class="ph-empty" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="10" width="36" height="28" rx="6"/><circle cx="18" cy="21" r="4"/><path d="M8 34l10-9 8 7 6-5 10 8"/></svg></div>`:""}<span class="ph-txt">${esc(o?"Magnific sent a link but not the image itself, and claude.ai blocks outside images inside pages. Open the PNG below to view or save it.":(st.ph||"Your image appears here"))}</span>`}${res?`<span class="badge">${esc(res)}</span>`:""}${st.busy?`<span class="elapsed" id="elapsed-${key}">${fmtTime(st.t0)}</span>`:""}</div>
  ${outs.length>1?`<div class="thumbs">${outs.map((x,i)=>`<button type="button" data-i="${i}" aria-pressed="${i===(st.sel||0)}" aria-label="Show image ${i+1}${x.angle?" · "+esc(x.angle):""}" title="${esc(x.angle||"")}">${x.img?`<img src="${x.img}" alt="">`:i+1}</button>`).join("")}</div>`:""}${o?.angle?`<p class="t12 muted">Angle: ${esc(o.angle)}</p>`:""}
  <ol class="steps">${STEPS.map((s,i)=>`<li class="${st.steps?.[i]||""}">${s}${st.stepNote?.[i]?` · ${esc(st.stepNote[i])}`:""}</li>`).join("")}</ol>
  ${st.err?`<div class="msg">${esc(st.err)}</div>`:""}${st.refWarn?`<div class="msg info">${esc(st.refWarn)}</div>`:""}
  <div class="btns">${o?.blob?`<button class="btn small primary" data-act="dl">Download ${/png/.test(o.blob.type)?"PNG":"image"}</button>`:""}${o?.url?`<a class="btn small ${o.blob?"":"primary"}" href="${esc(o.url)}" target="_blank" rel="noopener">Open ${o.long>=3800?"4K ":""}PNG</a><button class="btn small" data-act="copy">Copy link</button>`:""}${o?.webUrl?`<a class="btn small ${o.blob||o.url?"":"primary"}" href="${esc(o.webUrl)}" target="_blank" rel="noopener">Open in Magnific</a>`:""}${st.done||st.err?`<button class="btn small" data-act="regen">Regenerate</button>`:""}</div>
  ${o?.id&&st.done&&!S.web?`<form class="edit-one" data-edit><label class="t12 muted" for="edit-${key}">Change one thing in this image</label><div class="row"><textarea class="rl-field" id="edit-${key}" rows="1" dir="auto" data-only="outfit" aria-label="Change one thing in this image" placeholder="e.g. make the jacket navy · or type @ to pick an outfit">${esc(st.editQ||"")}</textarea><button class="btn small primary" type="submit" ${st.editing?"disabled":""}>${st.editing?"Editing…":"Apply change"}</button></div><span class="t12 ${st.editErr?"bad":"muted"}" role="status">${esc(st.editErr||st.editMsg||"Same photo, same person. Only what you ask changes. Makes 1 new image.")}</span></form>`:""}
  ${isIconKey(key)&&o?.blob?`<div class="btns exports"><span class="t12 muted">Export PNG on Light Stone:</span>${[96,144,192,256,1024,"wide"].map(s=>`<button class="btn small" data-exp="${s}" title="${({96:"S · square, dashboards, tooltips",144:"M · square, spot, onboarding",192:"L · square, modals, marketing",256:"XL · square, hero moments",1024:"Square master",wide:"Full 16:9 frame"})[s]}">${({96:"S 96",144:"M 144",192:"L 192",256:"XL 256",1024:"1024",wide:"16:9 full"})[s]}</button>`).join("")}</div>`:""}
  ${o?.url?`<input type="text" readonly class="linkbox" id="link-${key}" value="${esc(o.url)}" aria-label="Image link">`:""}
  ${o?.links?.length>1?`<details class="links"><summary>All links from Magnific (${o.links.length})</summary>${o.links.map(u=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a>`).join("")}</details>`:""}`;
  el.querySelector('[data-act="dl"]')?.addEventListener("click",()=>save(key,o));
  el.querySelector('[data-act="copy"]')?.addEventListener("click",async e=>{ const b=e.currentTarget; try{ await navigator.clipboard.writeText(o.url); b.textContent="Copied"; }catch{ const i=$("link-"+key); i.focus(); i.select(); b.textContent="Selected, press Ctrl/Cmd+C"; } setTimeout(()=>{ b.textContent="Copy link"; },1800); });
  el.querySelector('[data-act="regen"]')?.addEventListener("click",()=>generate([key]));
  if(el.querySelector("[data-edit]")){ atMake("edit-"+key,true); const f=$("edit-"+key), fm=el.querySelector("[data-edit]"); if(f){ if(st.editing) f.contentEditable="false"; f.addEventListener("input",()=>{ st.editQ=f.value; }); f.addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); fm.requestSubmit(); } }); }
    fm.addEventListener("submit",e=>{ e.preventDefault(); editImage(key,String($("edit-"+key)?.value||"")); }); }
  el.querySelectorAll(".thumbs button").forEach(b=>b.addEventListener("click",()=>{ st.sel=+b.dataset.i; renderCard(key,st); }));
  el.querySelector(".frame > img")?.addEventListener("click",()=>openLightbox(o.img));
  el.querySelectorAll("[data-exp]").forEach(b=>b.addEventListener("click",()=>exportIcon(o,b.dataset.exp==="wide"?"wide":+b.dataset.exp,MODELS[key].label)));
}
const cards={nano:{},icon:{}};
function idle(){ for(const k of genKeys()){ if(!cards[k]) cards[k]={}; if(!cards[k].steps) cards[k]={ph:S.mode==="icon"?`Your icon appears here on Light Stone, 16:9. Describe the icon above and press Create icon.`:"Your 2K image appears here. Write a brief above and press Create image.",steps:[]}; renderCard(k,cards[k]); } }
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
Reply with only JSON: {"modes":[{"value":"exact value","label":"short label","param":"setting name"}],"best_mode":"value of the highest-quality mode or null","res_4k":"exact value that means 2K (about 2048 px on the long side), or null if 2K is not offered","max_res":"largest resolution value","best_quality":"exact highest quality value or null","quality_param":"setting name or null","max_images":4}
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
  if(refUsable(id)&&S.mode!=="icon"){ const u=refUseOf(id); if(u!=="style") return {role:"image",use:REF_USES[u][1]}; }
  return ({
    "user-image":{role:"image",use:"camera and photography style direction (lens feel, light, colour); its subject is already described in words"},
    bae:{role:"image",use:meta?.auto?"STUDIO STYLE master reference — match its wall, light, negative space, framing, wardrobe styling and finish; never copy the person's face or identity":meta?.studio?"photography style direction: soft directional studio light, backdrop tone and colour grade":"photography style direction: light, depth of field, focus and colour grade"},
    yt:{role:"image",use:"camera and photography style direction: low wide angle, lens feel, hard sunlight, saturated colour grade and styling energy"},
    mj:{role:"image",use:"photography style direction: clean natural light and colour"},
    user:{role:"image",use:"camera and photography style direction"},
    ic:{role:"image",use:"BAE illustration style direction: translucent layered material, orange-to-burgundy gradient, soft rounded 3D forms, isometric angle and lighting"},
    of:{role:"image",use:"wardrobe reference (outfit sheet \""+(meta?.outfit||"")+"\"): the clothes and accessories the person wears"},
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
function libSummary(){ const n=Object.keys(S.magIds||{}).length; const total=ALL_REFS.filter(r=>r.set!=="user"&&!r.auto).length; return n?`${n} of ${total} references linked from your Magnific library.`:"Not linked yet. Upload the reference pack to a Magnific folder named “BAE References”, then press Link library."; }
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
        if(Object.keys(map).length>=ALL_REFS.filter(r=>r.set!=="user"&&!r.auto).length) break;
      }
    }
    const seenIds=new Set(); let tmpl=null;
    for(let page=0;page<30&&Object.keys(map).length<ALL_REFS.filter(r=>r.set!=="user"&&!r.auto).length;page++){
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
    const total=ALL_REFS.filter(r=>r.set!=="user"&&!r.auto); const missing=total.filter(r=>!S.magIds[r.id.toLowerCase()]).map(r=>r.id);
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
    for(const r of refs){ const res=await fetch(`refs/${r.id}.jpg`); if(res.ok) zip.file(r.id+".jpg",await res.blob()); }
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
  const chars=list.filter(r=>isChar(key(r))), ofl=list.filter(r=>isOutfit(key(r))), style=list.filter(r=>!isChar(key(r))&&!isOutfit(key(r))), tags=style.map(r=>r.tag).join(", ");
  const ofLine=ofl.length?`Wardrobe reference: ${ofl.map(r=>`${r.tag} = outfit sheet "${refById(key(r))?.outfit||""}"`).join(", ")}. ${ofl.length>1?"Each sheet dresses the one person this prompt gives it to; never mix pieces between people. Dress each of them":"Dress the person"} in exactly the pieces shown there: same colours, fabrics, cuts and details, worn naturally and fitted to the pose. Never show the flat-lay itself, the grey board or loose items. `:"";
  const castLine=chars.length?`Character references (identity): ${chars.map(r=>`${r.tag} = ${charLabel(key(r))}`).join(", ")}. Keep each character's exact face, facial features, hairline and hairstyle, eye colour, skin tone and build so they are clearly the same person. Use ONLY their identity: ignore the clothing, grey backdrop, pose and three-panel sheet layout in those images; dress them by the look rules. `:"";
  const picky=style.some(r=>refUsable(key(r))&&refUseOf(key(r))!=="style");
  if(picky) return castLine+ofLine+`Reference images, each used ONLY for what is named: ${style.map(r=>{ const k=key(r), u=refUsable(k)?refUseOf(k):"style"; return `${r.tag} = ${u==="style"?"photographic style (camera angle, lens feel, depth of field, light and colour grade)":REF_USES[u][1]}`; }).join("; ")}. Match the named qualities closely so the image clearly shares that colour grade and that light. Recreate NOTHING literal from any of them: not the location, building, walls, furniture, objects, people, faces, poses, clothing, composition or framing. The scene, content and composition come only from this prompt.`;
  return castLine+ofLine+(!style.length?"":`Reference images (photographic style ONLY): ${tags}. Study them only for camera height and angle, lens and focal-length feel, depth of field, light direction and quality, colour grade, and the general kind of place (modern, open, architectural). Recreate NOTHING literal from them: not the location, building, walls, furniture, objects, people, faces, poses, clothing, clothing colours, composition or framing. The scene is a new, different place; content and composition come only from this prompt.`); }
async function uploadRefs(){
  const sig=S.picked.join(",")+"|"+(S.upload&&$("useUpAsRef").checked?S.upload.size:"");
  if(refCache&&refCache.sig===sig&&!refCache.errors.length) return refCache;
  const items=[]; if(S.upload&&$("useUpAsRef").checked) items.push({id:"user-image",blob:S.upload});
  (await refBlobs()).forEach(r=>items.push(r));
  const list=[], errors=[], missing=[];
  /* your own images (uploaded characters, your references, the brief image) are sent to your Magnific once and remembered */
  let UMAG={}; try{ UMAG=JSON.parse(localStorage.getItem("bae_user_magids")||"{}"); }catch{}
  const mine=it=>it.id==="user-image"||refById(it.id)?.user||refById(it.id)?.auto||refById(it.id)?.set==="user";
  const unlinked=items.filter(it=>!mine(it)&&!S.magIds?.[String(it.id).toLowerCase()]).map(it=>String(it.id).toLowerCase());
  if(unlinked.length&&!S.allowDirectUpload) await findRefsByName(unlinked);
  for(const it of items){
    /* Preferred: the image already lives in the user's Magnific library (BAE References folder) */
    const magId=S.magIds?.[String(it.id).toLowerCase()]||(it.id!=="user-image"?UMAG[it.id]:null);
    if(magId){ const meta=refById(it.id)||{}; list.push({ref:it.id,id:magId,url:null,...refRole(it.id,meta)}); continue; }
    if(mine(it)&&it.blob){
      try{ const nm=it.id==="user-image"?"brief-image":(isChar(it.id)?"character-"+charLabel(it.id):"reference-"+it.id);
        const up=await rlUploadMag(it.blob,nm); if(!up?.id) throw {code:"tool_error",message:"Magnific returned no identifier"};
        if(it.id!=="user-image"){ UMAG[it.id]=up.id; try{ localStorage.setItem("bae_user_magids",JSON.stringify(UMAG)); }catch{} }
        const meta=it.id==="user-image"?{set:"user-image"}:(refById(it.id)||{}); list.push({ref:it.id,id:up.id,url:null,...refRole(it.id,meta)}); }
      catch(e){ const why=e?.code==="blocked_by_policy"?"image upload is blocked in your Magnific tool permissions":(e?.message||e?.code||"unknown"); errors.push(`${isChar(it.id)?charLabel(it.id):it.id}: couldn't upload to Magnific — ${String(why).slice(0,140)}`); log("✕","reference "+it.id+" not uploaded",{code:e?.code,message:e?.message}); }
      continue; }
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
  if(!S.quiet) $("s3").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
  let refs=[], upErr=[], wanted=S.picked.length+(S.upload&&$("useUpAsRef").checked?1:0);
  try{ const u=await uploadRefs(); refs=u.list; upErr=u.errors; }catch(e){ log("✕","references",e); upErr=[String(e?.message||e?.code||e)]; }
  keys.forEach(k=>{ const c=cards[k]; c.steps=[!wanted||refs.length===wanted?"ok":"err"];
    c.stepNote=[!wanted?"none picked":`${refs.length} of ${wanted} attached${refs.length?" as "+refs.map(r=>r.tag).join(", "):""}`];
    c.refWarn=upErr.length?`References not attached: ${upErr.join(" · ")}. Open the Connector log for details.`:""; renderCard(k,c); });
  flash($("s3state"),"Rendering with Seedream 5.5…");
  await Promise.allSettled(keys.map(k=>runModel(k,refs)));
  clearInterval(tick);
  const ok=keys.some(k=>cards[k].done&&!cards[k].err);
  stage(3,ok?"done":undefined); flash($("s3state"),ok?`Finished in ${fmtTime(t0)}. Download, open the PNG or generate again.`:"Not generated. See the message under the image.",!ok); syncButtons();
}
async function runModel(key,refs){
  const m=MODELS[key]; const c=cards[key]; const modelId=$(m.sel).value||null; if($(m.prompt).value.trim()) $(m.prompt).value=enforce($(m.prompt).value);
  /* Name the attached references in the prompt as @img1, @img2… in upload order */
  if($(m.prompt).value.trim()) $(m.prompt).value=$(m.prompt).value.replace(/\n*(Character references \(identity\)|Wardrobe reference|Reference images)[^\n]*/g,"")+(refs.length?"\n"+refLine(refs):"");
  const prompt=$(m.prompt).value.trim();
  const ang=S.mode!=="icon"&&Array.isArray(S.angles)?S.angles:null;
  const mode=$(m.mode).value||null; const count=ang?ang.length:Math.max(1,Math.min(4,+$("count").value||1)); const aspect=aspectVal();
  const up=()=>renderCard(key,c);
  try{
    if(!prompt) throw {code:"tool_error",message:"Write the prompt first (step 2)."};
    c.steps[1]="run"; c.ph=`Rendering ${count} in 2K…`; up();
    if(modelId&&!(modelId in S.opts)) await loadOptions(key);
    const opt=(modelId&&S.opts[modelId])||{raw:await modelDetails(modelId),parsed:{}}; const P=opt.parsed||{};
    const modeParam=(P.modes||[]).find(x=>String(x.value)===String(mode))?.param||null;
    const plan=await buildArgs("images_generate",
      `Generate exactly 1 ${S.mode==="icon"?"3D icon illustration image, 16:9 widescreen, on a flat Light Stone #ECE8DF background,":"photorealistic image"} with model "${modelId||m.label}". Use the prompt verbatim.
Resolution: 2K. Use the exact 2K value from the model settings${P.res_4k?` ("${P.res_4k}")`:""}; if 2K is not offered, use the closest larger value, else the largest${P.max_res?` ("${P.max_res}")`:""}.
Quality: the highest available${P.best_quality?` ("${P.best_quality}"${P.quality_param?` on "${P.quality_param}"`:""})`:""}.
${mode?`Mode: "${mode}"${modeParam?` on setting "${modeParam}"`:""}.`:"Mode: model default."}
Aspect ratio: ${typeof aspect==="string"?(aspect==="auto"?"auto (let the model choose)":aspect):`custom ${aspect.width}x${aspect.height} px`}.
Number of images: 1 (the page calls this tool once per image).
REFERENCES ARE REQUIRED: attach EVERY item in Data.references, in exactly this order, so the first becomes @img1, the second @img2 and so on (the prompt refers to them by those tags). Use the schema's reference field(s) with the uploaded creation identifiers (or URLs if the schema takes URLs). Put EVERY reference in the GENERAL image reference list (reference type "image", shown as @img1, @img2… in Magnific), keeping the order. NEVER use the "style" reference type/slot and NEVER the "character" or "product" slot: the style slot must stay empty/default because it changes the rendering type (photo vs illustration vs 3D). Each reference object carries the creation id in the field "identifier" (exactly that name). If the schema needs a type per reference, set it to "image". Do not drop any reference. Fill the negative prompt field if the schema has one. Turn off any prompt auto-enhancement so the brand prompt stays as written.`,
      {model:modelId, model_label:m.label, model_settings:opt.raw, prompt, negative_prompt:negativeNow(), composition:"person centred on the vertical centre line", setting:S.setting, aspect_ratio:aspect, resolution:P.res_4k||"2K", quality:P.best_quality||"high", mode, num_images:1, references:refs},"default");
    plan.args=oneImage(fixRefs(plan.args,refs));
    const asked4k=!!P.res_4k||/2k|2048|4k|3840|4096/i.test(JSON.stringify(plan.args));
    /* One image per Magnific call, all calls in parallel: models that ignore the count still give exactly N images,
       and each image has its own creation, preview and PNG link */
    c.outs=Array.from({length:count},()=>({id:null,url:null,img:null,blob:null,long:0,pending:true})); c.sel=0; c.webUrls=[]; up();
    let done=0;
    const genOne=async(slot)=>{
      const r=await callMag("images_generate",ang?swapPrompt(plan.args,prompt,prompt+"\n\n"+ang[slot].line):plan.args); if(ang) c.outs[slot].angle=ang[slot].name;
      let rr=readResult(r); if(!rr.ids.length&&!rr.urls.length&&!rr.images.length) rr=await extractWithClaude(r,"the creation identifier of the image being generated");
      const genId=rr.ids[0]||null; const web=rr.webUrl||rr.links.find(u=>/magnific\.com\/app\//i.test(u))||null;
      if(!rr.images.length&&!DONE.test(rr.status)){ if(!genId) throw {code:"tool_error",message:"Magnific didn't return a creation to wait for."}; rr=await waitFor([genId],"2K image generation"); }
      const o=c.outs[slot]; o.id=rr.ids[0]||genId; o.url=rr.urls[0]||null; o.webUrl=rr.webUrl||web; o._rr=rr;
      let shot=rr.images[0]||null, pw=0;
      if(!shot&&o.id){ const pv=await preview(o.id); shot=pv.image; o.url=o.url||pv.urls[0]||null; pw=Math.max(pv.w,pv.h); }
      if(shot){ o.img=`data:${shot.mime};base64,${shot.data}`; o.blob=b64Blob(shot.data,shot.mime); }
      /* Size: trust Magnific's reported dimensions, then the requested 4K, then the preview's own pixels */
      o.long=pw||Math.max(rr.w,rr.h)||(asked4k?(plan.expected_long_side_px||2048):0)||(o.img?await longSide(o.img):0)||plan.expected_long_side_px||0;
      if(rr.res4k||asked4k&&/2k|4k/i.test(JSON.stringify(plan.args))) o.long=Math.max(o.long,2048);
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
    /* 2K check: Magnific upscale only for an output that came back under 2K */
    let ups=0;
    for(const o of c.outs){
      if(o.long>=2000||isIconKey(key)) continue;
      if(S.upModes===null){ try{ const mr=await callMag("images_upscale_modes_list",{}); S.upModes=mr.payload??mr.content; }catch{ S.upModes=""; } }
      const factor=o.long?Math.max(2,Math.min(16,Math.pow(2,Math.ceil(Math.log2(2048/o.long))))):2;
      const ua=await buildArgs("images_upscale",`Upscale this photograph ${factor}x so the long side is at least 2048 px (2K) for ${$("channel").value}. Photographic realism: preserve faces, skin texture and fabric faithfully, keep creativity/hallucination at the minimum, no stylisation.`,
        {creation_identifier:o.id, source_url:o.url, current_long_side_px:o.long||null, scale_factor:factor, available_modes:S.upModes},"quick");
      const ur=await callMag("images_upscale",ua.args);
      let ux=readResult(ur); if(!ux.ids.length&&!ux.urls.length) ux=await extractWithClaude(ur,"the creation identifier of the upscale job");
      if(!(ux.urls.length||ux.images.length)&&ux.ids[0]) ux=await waitFor([ux.ids[0]],"2K upscale");
      let shot=ux.images[0]||null; let uw=Math.max(ux.w,ux.h);
      if(!shot&&ux.ids[0]){ const pv=await preview(ux.ids[0]); shot=pv.image; ux.urls.push(...pv.urls); uw=uw||Math.max(pv.w,pv.h); }
      if(shot){ o.img=`data:${shot.mime};base64,${shot.data}`; o.blob=b64Blob(shot.data,shot.mime); }
      o.id=ux.ids[0]||o.id; o.url=ux.urls[0]||o.url; o.long=uw||(o.long?o.long*factor:3840); ups++; up();
    }
    c.steps[2]="ok"; c.stepNote[2]=isIconKey(key)?"not needed for icons":ups?`${ups} upscaled with Magnific`:"native 2K";
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
/* Change one thing in a finished image: the result itself is the reference, Claude writes a strict "same photo, only this changes" prompt */
async function editImage(key,ask){ const c=cards[key]; ask=String(ask||"").trim(); const base=c?.outs?.[c.sel||0]; if(!c||!base?.id||!ask||c.editing) return;
  c.editing=true; c.editQ=ask; c.editErr=""; c.editMsg="Writing the edit…"; renderCard(key,c);
  try{ const icon=isIconKey(key); const fit=icon?null:atOutfitsIn(ask)[0]||null; let fitId=null;
    if(fit){ c.editMsg="Sending the outfit sheet to Magnific…"; renderCard(key,c); let U={}; try{ U=JSON.parse(localStorage.getItem("bae_user_magids")||"{}"); }catch{} fitId=S.magIds?.[fit.id]||U[fit.id]||null;
      if(!fitId){ if(!S.connected) await connect(true); const res=await fetch(`refs/${fit.id}.jpg`); if(!res.ok) throw {code:"tool_error",message:"The outfit sheet file is missing."}; const up=await rlUploadMag(await res.blob(),"outfit-"+fit.id); if(!up?.id) throw {code:"tool_error",message:"Magnific returned no identifier for the outfit sheet."}; fitId=up.id; U[fit.id]=fitId; try{ localStorage.setItem("bae_user_magids",JSON.stringify(U)); }catch{} }
      c.editMsg="Writing the edit…"; renderCard(key,c); }
    const w=await rlAsk(`You write ONE image-edit prompt for an image model that receives the finished image as ${fit?"reference @img1 and an outfit sheet as reference @img2":"its only reference, @img1"}. The user likes the image and wants a single change.
USER'S CHANGE (may be Arabic): "${ask}"${fit?`
THE USER PICKED AN OUTFIT: @img2 is a flat-lay sheet of the outfit "${fit.name}". Its pieces: ${fit.d}. The change is: dress the person in @img1 in exactly these pieces — same colours, fabrics, cuts and details as @img2 — worn naturally and fitted to the pose and the light. Shoes and bag appear only if that part of the body is in frame or it is natural to carry them. Never show the flat-lay, the grey board or loose items. Say this explicitly in the CHANGE ONLY part and name the pieces. Any other words the user wrote are extra instructions.`:""}
THE PROMPT THAT MADE THE IMAGE (context only, do not repeat it): """${String($(MODELS[key].prompt).value||"").slice(0,2500)}"""
Write the edit prompt in English, 60–110 words, in this order:
1. "Edit @img1. This is the same ${icon?"icon illustration":"photograph"}." 
2. LOCK: say what stays identical — ${icon?"the same object, shape, material, glass look, lighting, colours, framing and flat background":"the same person with the identical face, hair, skin, expression, body and pose; the same background, props, framing, camera angle, lens, light, shadows and colour grade"} — except what the change touches.
3. CHANGE ONLY: describe the requested change precisely and concretely (garment, cut, fabric, colour; or object, colour, position). ${icon?"":"For clothing: solid colours, fine fabric with natural drape, no logos, no prints, no text, unless the user asked otherwise. Keep the new clothes consistent with the light and the pose."}
4. End with: "Nothing else changes. ${icon?"Clean 3D render":"Photorealistic"}, 2K, no text, no watermark."
Never invent extra changes. Return ONLY JSON: {"prompt":"…","summary":"what changes, in 6 words or fewer"}`,{modelTier:"quick",cache:false});
    const prompt=String(w?.prompt||"").trim(); if(!prompt) throw {code:"bad_answer"};
    c.editMsg=`Editing: ${String(w.summary||ask).slice(0,60)}…`; renderCard(key,c);
    const out=await rlJob(()=>rlImage({prompt,aspect:aspectText(),refs:[{id:base.id,tag:"@img1"},...(fitId?[{id:fitId,tag:"@img2"}]:[])],label:"image edit"}));
    const src=rlFull[out.id]||null; const o={id:out.id,url:null,img:src,blob:null,long:base.long||2048,webUrl:out.web||null,pending:false,edit:ask};
    if(src){ try{ const m=src.match(/^data:([^;]+);base64,(.*)$/); if(m) o.blob=b64Blob(m[2],m[1]); }catch{} }
    try{ await completeFiles(o,{ids:[o.id],urls:[],links:[],images:[]}); }catch{}
    if(icon){ try{ await whitenOut(o); }catch{} }
    c.outs.push(o); c.sel=c.outs.length-1; c.editQ=""; c.editMsg="Done. The edited image was added next to the original."; if(o.url||o.img) addHistory(o);
  }catch(e){ log("✕","image edit",{code:e?.code,message:e?.message}); c.editMsg=""; c.editErr=e?.code==="refs_missing"?"Couldn't attach the image to edit. Nothing was spent.":(e?.code&&!e.server&&["not_granted","rate_limited","refused"].includes(e.code)?sampleCopy(e):mcpCopy(e)); }
  c.editing=false; renderCard(key,c); }
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
  const filename=`BAE_${MODELS[key].label.replace(/\s+/g,"-")}_${aspectText().replace(/[:×]/g,"x")}_${o.long>=2000?"2K":"preview"}.${ext}`;
  if(S.web){ const a=document.createElement("a"); a.href=URL.createObjectURL(o.blob); a.download=filename; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },1500); return; }
  if(!downloads){ flash($("s3state"),"Saving isn't available in this view. Use “Open file”.",true); return; }
  try{ await downloads.save({filename,data:o.blob}); }
  catch(e){ if(e?.code!=="declined") flash($("s3state"),"Couldn't save the file ("+e?.code+").",true); }
}

/* ---------------- one-click flow, presets, history, lightbox ---------------- */
$("btnCreate").onclick=createAll;
/* four separate images of the same moment, each from a different candid camera position */
const ANGLES4=[
 ["3/4 front","CAMERA: eye level, about 45 degrees to one side of the subject (three-quarter front view), medium shot from the waist up, 50mm look. The subject is absorbed in the action and looks at what they are doing, never at the camera."],
 ["Side profile","CAMERA: directly at the subject's side at eye level, clean full profile, medium-full shot from head to mid-thigh, 85mm look with a soft background. The subject is caught mid-movement, eyes on what they are doing."],
 ["From behind","CAMERA: behind the subject and slightly to one side (three-quarter view from behind, over the shoulder), chest-up framing. We see the back of the shoulder, the line of the cheek and what the subject is looking at or holding; the face is mostly turned away. The place opens up in front of them."],
 ["Wide, from a distance","CAMERA: observational long shot from across the place with a longer lens, eye level. The whole body is in frame and small (about a third of the frame height), sitting in the middle of a quiet, uncluttered place; optionally one soft out-of-focus element in the near foreground. The subject is unaware of the camera."]
].map(([name,line])=>({name,line:`${line}\nThis camera position is mandatory and overrides any other camera angle, framing or shot size written above. Same person, same clothes, same place, same light and the same moment as described above: only the camera position changes.`}));
$("btnAngles")?.addEventListener("click",async()=>{ if(S.mode==="icon"||S.web) return; const b=$("btnAngles"), t=b.textContent; S.angles=ANGLES4; b.disabled=true; b.textContent="Creating 4 angles…"; try{ await createAll(); } finally{ S.angles=null; b.disabled=false; b.textContent=t; } });
function swapPrompt(args,from,to){ const key=from.slice(0,80); let hit=false; const walk=v=>{ if(typeof v==="string"){ if(v===from||(key.length>40&&v.includes(key))){ hit=true; return to; } return v; } if(Array.isArray(v)) return v.map(walk); if(v&&typeof v==="object"){ const o={}; for(const k in v) o[k]=walk(v[k]); return o; } return v; }; const out=walk(args); if(!hit&&out&&typeof out==="object"&&"prompt" in out) out.prompt=to; return out; }
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
    if(!S.quiet) $("s3").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
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
const HMAX=40;
function saveHist(h){ h=h.slice(0,HMAX); const cut=(n,keep)=>h.map((x,i)=>({...x,prompt:String(x.prompt||"").slice(0,n),thumb:i<keep?x.thumb:null}));
  /* when the browser's store is full, shorten the saved prompts first: the small pictures are what make Recent usable */
  for(const v of [()=>h,()=>cut(1500,HMAX),()=>cut(400,HMAX),()=>cut(400,24),()=>cut(200,8).slice(0,12)]){ try{ localStorage.setItem(HKEY,JSON.stringify(v())); return; }catch{} } }
async function thumbOf(dataUrl){ try{ const bmp=await createImageBitmap(await (await fetch(dataUrl)).blob()); const k=240/Math.max(bmp.width,bmp.height); const c=document.createElement("canvas"); c.width=Math.round(bmp.width*k); c.height=Math.round(bmp.height*k); c.getContext("2d").drawImage(bmp,0,0,c.width,c.height); return c.toDataURL("image/jpeg",.78); }catch{ return null; } }
async function addHistory(o,key){
  const k=key||Object.keys(cards).find(q=>cards[q]?.outs?.includes(o))||(S.mode==="icon"?"icon":"nano");
  const x={hid:"h"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),id:o.id||null,thumb:o.img?await thumbOf(o.img):null,url:o.url||null,webUrl:o.webUrl||null,res:o.long>=2000?"2K":(o.long?o.long+"px":""),long:o.long||0,aspect:aspectText(),aspectVal:$("aspect")?.value||"",look:S.look,setting:S.setting,mode:S.mode,key:k,
    brief:String($("brief").value||"").slice(0,2000),prompt:String($(MODELS[k]?.prompt||"pNano")?.value||"").slice(0,7000),note:o.edit?("Edit: "+String(o.edit).slice(0,80)):(o.angle||""),t:Date.now()};
  const h=loadHist(); h.unshift(x); saveHist(h); renderHistory(); histCloud(x); if(!x.thumb) histFill();
}
/* entries saved without a small picture (Magnific sent only a link): fetch a 512 px view of each, one at a time, and keep it */
let histFilling=false;
async function histFill(){ if(histFilling) return; histFilling=true;
  try{ for(let n=0;n<HMAX;n++){ if(!mcp||mcp.web||!S.connected) break; const x=loadHist().find(q=>!q.thumb&&q.id&&!HIST_MISS.has(q.hid)); if(!x) break; HIST_MISS.add(x.hid);
      try{ const r=await callMag("creations_read",{creationIdentifier:x.id,hq:"low"}), im=readResult(r).images[0], th=im?await thumbOf(`data:${im.mime};base64,${im.data}`):null;
        if(th){ const h=loadHist(), y=h.find(q=>q.hid===x.hid); if(y){ y.thumb=th; saveHist(h); renderHistory(); histCloud(y); } } }catch{}
      await new Promise(r=>setTimeout(r,350)); } }catch{} histFilling=false; }
const HIST_MISS=new Set();
/* the list also lives in the user's private space, so it follows them to another device */
async function histCloud(x){ try{ await rlStoreInit(); if(!RLS.db||!RLS.uid) return; await RLS.db.collection(`data/users/${RLS.uid}/hist`).doc(x.hid).set(JSON.parse(JSON.stringify(x))); }catch{} }
async function histPull(){ try{ await rlStoreInit(); if(!RLS.db||!RLS.uid) return; const sn=await RLS.db.collection(`data/users/${RLS.uid}/hist`).get(); const cloud=sn.docs.map(d=>JSON.parse(JSON.stringify(d.data()))).filter(x=>x&&x.hid);
    const h=loadHist(), have=new Set(h.map(x=>x.hid)); let add=0; for(const x of cloud){ if(!have.has(x.hid)){ h.push(x); add++; } } if(add){ h.sort((p,q)=>(q.t||0)-(p.t||0)); saveHist(h); renderHistory(); }
    const old=cloud.sort((p,q)=>(q.t||0)-(p.t||0)).slice(HMAX); for(const x of old) RLS.db.collection(`data/users/${RLS.uid}/hist`).doc(x.hid).delete().catch(()=>{}); }catch{} }
/* open a past image again: the brief, the prompt and the image come back, ready to change or regenerate */
async function histOpen(x){
  try{ if(x.mode&&S.mode!==x.mode) setMode(x.mode);
    if(x.mode!=="icon"){ if(x.setting) document.querySelector(`.seg[data-key="setting"] button[data-v="${x.setting}"]`)?.click(); if(x.look) document.querySelector(`.seg[data-key="look"] button[data-v="${x.look}"]`)?.click();
      const as=$("aspect"); if(as&&x.aspectVal&&[...as.options].some(p=>p.value===x.aspectVal)){ as.value=x.aspectVal; as.dispatchEvent(new Event("change",{bubbles:true})); } }
    const b=$("brief"); b.value=x.brief||""; b.dispatchEvent(new Event("input",{bubbles:true}));
    const k=MODELS[x.key]?x.key:(S.mode==="icon"?"icon":"nano"); const pf=$(MODELS[k].prompt); if(pf&&x.prompt){ pf.value=x.prompt; pf.dispatchEvent(new Event("input",{bubbles:true})); }
    const o={id:x.id||null,url:x.url||null,img:x.thumb||null,blob:null,long:x.long||0,webUrl:x.webUrl||null,pending:false};
    cards[k]={busy:false,done:true,t0:x.t||Date.now(),steps:["ok","ok","ok","ok"],stepNote:["from Recent","","",""],outs:[o],sel:0,editMsg:x.id?"Opened from Recent. Change one thing, or regenerate.":""}; renderCard(k,cards[k]); syncButtons?.();
    $(MODELS[k].el)?.scrollIntoView({behavior:"smooth",block:"center"});
    if(x.id&&mcp&&S.connected){ try{ const pv=await preview(x.id); if(pv?.image&&cards[k]?.outs?.[0]===o){ o.img=`data:${pv.image.mime};base64,${pv.image.data}`; o.blob=b64Blob(pv.image.data,pv.image.mime); o.url=o.url||pv.urls?.[0]||null; renderCard(k,cards[k]); } }catch{} }
  }catch(e){ log("✕","open recent",{message:e?.message}); }
}
function renderHistory(){
  const h=loadHist(), box=$("history");
  $("btnClearHist").hidden=!h.length;
  if(!h.length){ box.innerHTML='<div class="empty" style="grid-column:1/-1">Images you create appear here. Open one to change it or carry on from it.</div>'; return; }
  box.innerHTML=h.map((x,i)=>`<div class="hist"><button type="button" class="im" data-i="${i}" title="${esc(String(x.brief||"").slice(0,200))}" aria-label="Open image ${i+1} to continue">${x.thumb?`<img src="${x.thumb}" alt="">`:`<span>${esc(x.aspect)} · ${esc(x.res||"")}</span>`}</button><div class="meta"><span>${esc(new Date(x.t||Date.now()).toLocaleDateString("en-GB",{day:"numeric",month:"short"}))} · ${esc(x.res||"")}</span>${x.url?`<a href="${esc(x.url)}" target="_blank" rel="noopener">PNG</a>`:""}</div>${x.note?`<span class="t12 muted" data-noi18n>${esc(x.note)}</span>`:""}<button type="button" class="btn small" data-open="${i}">Open to edit</button></div>`).join("");
  box.querySelectorAll(".im").forEach(b=>b.onclick=()=>{ const x=h[+b.dataset.i]; if(x.thumb) openLightbox(x.thumb); else if(x.url) window.open(x.url,"_blank","noopener"); });
  box.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>histOpen(h[+b.dataset.open]));
}
$("btnClearHist").onclick=()=>{ const b=$("btnClearHist"); if(b.dataset.sure){ delete b.dataset.sure; b.textContent="Clear"; const old=loadHist(); saveHist([]); renderHistory(); rlStoreInit().then(()=>{ if(RLS.db&&RLS.uid) old.forEach(x=>x.hid&&RLS.db.collection(`data/users/${RLS.uid}/hist`).doc(x.hid).delete().catch(()=>{})); }).catch(()=>{}); } else { b.dataset.sure="1"; b.textContent="Clear all? Press again"; setTimeout(()=>{ if(b.dataset.sure){ delete b.dataset.sure; b.textContent="Clear"; } },4000); } };
renderHistory(); setTimeout(()=>histPull(),2500);
/* fill the missing small pictures once Magnific is connected */
{ let tries=0; const t=setInterval(()=>{ if(++tries>40){ clearInterval(t); return; } try{ if(mcp&&!mcp.web&&S.connected){ clearInterval(t); histFill(); } }catch{} },3000); }

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
    $(m.prompt).value=$(m.prompt).value.replace(/\n*(Character references \(identity\)|Wardrobe reference|Reference images)[^\n]*/g,"")+(plan.length?"\n"+refLine(plan):"");
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
/* ================= Character library: ONE shared library for the whole team, kept in the page's database. The owner adds and removes; everyone casts. ================= */
const CL={list:[],loaded:0,canEdit:false,cat:"all",busy:"",err:""};
const CL_CATS=[["men","Men"],["women","Women"],["kids","Kids"],["elderly","Elderly"]];
const clRefId=id=>"ch_l"+id;
function clSync(){ for(const A of [ALL_REFS,CHAR_REFS]) for(let i=A.length-1;i>=0;i--) if(A[i].lib) A.splice(i,1);
  for(const c of CL.list){ const r={id:clRefId(c.id),docId:c.id,defName:c.name||"Character",d:"Character: "+(c.look||c.name||""),look:c.look||"exactly the person in this reference image",src:c.thumb||"",blob:null,set:"ch",studio:false,user:true,lib:true,cat:c.cat||"men"}; ALL_REFS.push(r); CHAR_REFS.push(r); }
  S.picked=S.picked.filter(id=>refById(id)); try{ atRefresh(); }catch{} }
async function clLoad(force){
  await rlStoreInit(); const db=RLS.db; if(!db){ CL.err="The library needs the page's database — open the studio in claude.ai."; return CL; }
  if(!force&&CL.loaded&&Date.now()-CL.loaded<60000) return CL;
  try{ const sn=await db.collection("chars").get(); CL.list=sn.docs.map(d=>({id:d.id,...JSON.parse(JSON.stringify(d.data()))})).sort((a,b)=>(b.at||0)-(a.at||0)); CL.loaded=Date.now(); CL.err=""; }
  catch(e){ CL.err="Couldn't open the character library."; log("✕","character library",{code:e?.code,message:e?.message}); }
  try{ const u=await window.claude?.use?.("user"); CL.canEdit=!!u?.canEdit?.(); }catch{}
  clSync(); return CL; }
const CL_BLOB=new Map();
async function clBlob(docId){ if(CL_BLOB.has(docId)) return CL_BLOB.get(docId);
  const meta=CL.list.find(x=>x.id===docId);
  if(meta?.asset){ try{ const r=await fetch("/_blob/"+meta.asset); if(r.ok){ const b=await r.blob(); if(b.size>1000&&/^image\//.test(b.type||meta.mime||"image/jpeg")){ const o=b.type?b:new Blob([b],{type:meta.mime||"image/jpeg"}); CL_BLOB.set(docId,o); return o; } } }catch{} }
  const col=RLS.db.collection("charimg"); const sn=await col.doc(docId).get(); const m=sn.exists?sn.data():null; let d=m?.d||null;
  if(!d&&m?.n){ const parts=await Promise.all([...Array(+m.n)].map((_,i)=>col.doc(docId+"_"+i).get())); d=parts.map(x=>x.exists?x.data()?.d||"":"").join(""); }
  if(!d) throw {code:"not_found",message:"This character's image is missing from the library."};
  const b=await (await fetch(d)).blob(); CL_BLOB.set(docId,b); return b; }
async function clJpegUnder(blob,maxBytes){ let out=null; for(const [px,q] of [[2000,.9],[1800,.88],[1600,.86],[1400,.84],[1200,.82],[1000,.8]]){ const bmp=await createImageBitmap(blob); const k=Math.min(1,px/Math.max(bmp.width,bmp.height)); const c=document.createElement("canvas"); c.width=Math.round(bmp.width*k); c.height=Math.round(bmp.height*k); c.getContext("2d").drawImage(bmp,0,0,c.width,c.height); out=await new Promise(r=>c.toBlob(r,"image/jpeg",q)); if(out.size<=maxBytes) break; } return out; }
const clDataUrl=blob=>new Promise((res,rej)=>{ const fr=new FileReader(); fr.onload=()=>res(String(fr.result)); fr.onerror=rej; fr.readAsDataURL(blob); });
/* Download: one helper for every image on the site */
async function uxSaveBlob(blob,name){ const ext=/png/.test(blob.type)?".png":/webp/.test(blob.type)?".webp":".jpg"; const filename=String(name||"image").replace(/[\\/:*?"<>|]+/g," ").replace(/\.[a-z0-9]{2,5}$/i,"").trim().slice(0,80)+ext;
  if(S.web||!downloads){ const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=filename; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },1500); return; }
  await downloads.save({filename,data:blob}); }
/* keeps one character image: the original in the page's file store, a reduced copy in pieces as a fallback, a small preview for the card */
async function clStoreImage(id,blob){
  const full=await clJpegUnder(blob,900000); let thumb=""; for(const [px,q] of [[560,.8],[480,.76],[400,.72],[320,.7]]){ const bmp=await createImageBitmap(full); const k=Math.min(1,px/Math.max(bmp.width,bmp.height)); const c=document.createElement("canvas"); c.width=Math.round(bmp.width*k); c.height=Math.round(bmp.height*k); c.getContext("2d").drawImage(bmp,0,0,c.width,c.height); thumb=c.toDataURL("image/jpeg",q); if(thumb.length<=60000) break; }
  { const data=await clDataUrl(full), SZ=90000, n=Math.ceil(data.length/SZ), col=RLS.db.collection("charimg");
    for(let i=0;i<n;i++) await col.doc(id+"_"+i).set({d:data.slice(i*SZ,(i+1)*SZ)});
    await col.doc(id).set({n,at:Date.now()}); }
  let asset=null; try{ const A=await window.claude?.use?.("assets"); if(A&&blob.size<=19.5*1048576){ const r=await A.upload(blob); asset=r?.id||null; } }catch(e){ log("·","original not stored in the file store",{code:e?.code,message:e?.message}); }
  let dims=null; try{ const bm=await createImageBitmap(blob); dims=[bm.width,bm.height]; }catch{}
  CL_BLOB.set(id,asset?blob:full);
  /* the owner's own Magnific gets the untouched original now, so their renders never use a reduced copy */
  try{ const u=JSON.parse(localStorage.getItem("bae_user_magids")||"{}"); delete u[clRefId(id)]; localStorage.setItem("bae_user_magids",JSON.stringify(u)); }catch{}
  rlUploadMag(blob,"character-"+id).then(up=>{ if(!up?.id) return; try{ const u=JSON.parse(localStorage.getItem("bae_user_magids")||"{}"); u[clRefId(id)]=up.id; localStorage.setItem("bae_user_magids",JSON.stringify(u)); }catch{} const c=CL.list.find(x=>x.id===id); if(c){ c._mag=true; if(S.refTab==="ch") renderRefs(); } }).catch(e=>log("·","original not sent to Magnific yet",{code:e?.code,message:e?.message}));
  return {full,fields:{thumb,asset,mime:blob.type||"image/jpeg",px:dims,orig:!!asset}}; }
async function clReplace(id,blob){ const c=CL.list.find(x=>x.id===id); if(!c||!CL.canEdit) return; const old=c.asset;
  CL.busy="Replacing the image…"; renderRefs();
  try{ const {fields}=await clStoreImage(id,blob); fields.at=Date.now(); Object.assign(c,fields); await RLS.db.collection("chars").doc(id).update(fields); refCache=null;
    if(old&&old!==fields.asset){ try{ const A=await window.claude?.use?.("assets"); await A?.delete(old); }catch{} } CL.err=""; }
  catch(e){ CL.err="Couldn't replace the image: "+String(e?.message||e?.code||e).slice(0,160); }
  CL.busy=""; clSync(); renderRefs(); }
async function clDownload(id,btn){ const c=CL.list.find(x=>x.id===id); if(!c) return; const t=btn?.textContent; if(btn){ btn.disabled=true; btn.textContent="Preparing…"; }
  try{ await uxSaveBlob(await clBlob(id),"BAE character "+String(c.name||"").split("/")[0].trim()); }catch(e){ CL.err="Couldn't download: "+String(e?.message||e?.code||e).slice(0,140); renderRefs(); }
  if(btn){ btn.disabled=false; btn.textContent=t; } }
/* add one character: Claude looks once to write the casting line and choose the shelf */
async function clAdd(blob,name,cat){
  if(!CL.canEdit||!RLS.db) throw {message:"Only the studio owner adds characters to the library."};
  const id="c"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  const {full,fields}=await clStoreImage(id,blob);
  let look="", guess=cat||"";
  try{ if(sample){ const o=await sample.json(`Describe the person in this image in ONE short casting phrase: man or woman (or boy / girl), approximate age, hair, facial hair if any, eye colour, build. No name, no clothes, no background. Also choose the shelf: "men" (adult man under 60), "women" (adult woman under 60), "kids" (under 18), "elderly" (60 or older, any gender). Reply with only JSON: {"look":"…","cat":"men|women|kids|elderly"}`,{images:[full],modelTier:"quick"}); look=String(o?.look||"").trim().slice(0,220); if(!guess&&CL_CATS.some(([k])=>k===o?.cat)) guess=o.cat; } }catch{}
  const doc={name:String(name||"New character").slice(0,60),cat:guess||"men",look,at:Date.now(),by:RLS.uid||null,...fields};
  await RLS.db.collection("chars").doc(id).set(doc);
  CL.list.unshift({id,...doc}); clSync(); return id; }
async function clUpdate(id,patch){ const c=CL.list.find(x=>x.id===id); if(!c||!CL.canEdit) return; Object.assign(c,patch); clSync(); try{ await RLS.db.collection("chars").doc(id).update(patch); }catch(e){ log("✕","character update",{code:e?.code}); } }
const CL_WAS=new Map();
async function clRemove(id){ if(!CL.canEdit) return; CL_WAS.set(id,CL.list.find(x=>x.id===id)); CL.list=CL.list.filter(x=>x.id!==id); clSync(); try{ const col=RLS.db.collection("charimg"); const sn=await col.doc(id).get().catch(()=>null); const n=+(sn?.exists?sn.data()?.n:0)||0; const was=CL_WAS.get(id); await RLS.db.collection("chars").doc(id).delete(); if(was?.asset){ try{ const A=await window.claude?.use?.("assets"); await A?.delete(was.asset); }catch{} } for(let i=0;i<n;i++) await col.doc(id+"_"+i).delete().catch(()=>{}); await col.doc(id).delete(); }catch(e){ log("✕","character remove",{code:e?.code}); } }
async function clUpload(files){ const L=[...files].filter(f=>/^image\//.test(f.type)).slice(0,8); if(!L.length) return; let n=0, last=null;
  for(const f of L){ CL.busy=`Adding ${++n} of ${L.length}…`; renderRefs(); try{ last=await clAdd(f,"",""); CL.err=""; }catch(e){ CL.err="Couldn't add the image: "+String(e?.message||e?.code||e).slice(0,160); } }
  CL.busy=""; if(last){ S._newChar=clRefId(last); CL.cat="all"; } renderRefs(); }
/* the first version kept "your characters" in this browser: the owner's move into the team library once */
async function clMigrateLocal(){ if(!CL.canEdit) return; let recs=[]; try{ recs=(await IDB.all()).filter(r=>/^ch_u/.test(r.id)); }catch{} if(!recs.length) return;
  for(const r of recs){ try{ await clAdd(r.blob,CHAR_NAMES[r.id]||r.name||"Character",""); await IDB.del(r.id); delete CHAR_NAMES[r.id]; }catch{ break; } }
  try{ localStorage.setItem(CHAR_KEY,JSON.stringify(CHAR_NAMES)); }catch{} renderRefs(); }
function clTabsHTML(){ const n=k=>CL.list.filter(c=>k==="all"||c.cat===k).length; return `<div class="cl-tabs" role="group" aria-label="Character shelves">${[["all","All"],...CL_CATS].map(([k,l])=>`<button type="button" data-clcat="${k}" aria-pressed="${CL.cat===k}">${l} <span>${n(k)}</span></button>`).join("")}</div>`; }
/* Reels: cast a library character into the open reel */
async function uxCastLib(id){ const c=CL.list.find(x=>x.id===id); if(!c||!RL) return; const nm=String(c.name||"Character").split("/")[0].trim();
  const e=rlNewElement("character",nm,c.look||""); e.lib=nm; e.libId=c.id; rlEnsureHandles(RL); rlSave(); rlBoard();
  try{ await rlUseImage(e.tag,await clBlob(c.id),{quiet:true}); }catch(err){ e.err="Couldn't load this character from the library."; rlBoard(); } }
async function uxSaveLib(tag,btn){ const e=rlElByTag(tag); if(!e||!(e.portraitId||e.id)) return; if(btn){ btn.disabled=true; btn.textContent="Saving…"; }
  try{ await clLoad(); const blob=await rlFullImage(e.portraitId||e.id); if(!blob) throw {message:"Couldn't read the image from Magnific."}; await clAdd(blob,e.name||"Character",""); if(btn) btn.textContent="Saved to library ✓"; }
  catch(err){ if(btn){ btn.disabled=false; btn.textContent="Save to library"; } rlSys("Couldn't save to the library: "+String(err?.message||err?.code||err).slice(0,160)); } }
/* Your own characters: upload a photo, give it a name, then just write the name in the brief */
function addUserChar(rec){ if(refById(rec.id)) return; const r={id:rec.id,defName:rec.name||"New character",d:"Character: "+(rec.look||rec.name||"your character"),look:rec.look||"exactly the person in this reference image",src:URL.createObjectURL(rec.blob),blob:rec.blob,set:"ch",studio:false,user:true}; ALL_REFS.push(r); CHAR_REFS.push(r); }
async function describeChar(rec){ try{ if(!sample) return; const o=await sample.json(`Describe the person in this image in ONE short casting phrase: man or woman (or boy / girl), approximate age, hair, facial hair if any, eye colour, build. No name, no clothes, no background. Reply with only JSON: {"look":"…"}`,{images:[rec.blob],modelTier:"quick"}); const look=String(o?.look||"").trim().slice(0,220); if(!look) return; rec.look=look; const r=refById(rec.id); if(r){ r.look=look; r.d="Character: "+look; } try{ await IDB.put(rec); }catch{} }catch{} }
async function uploadChars(files){ let last=null;
  for(const f of [...files].slice(0,8)){ if(!/^image\//.test(f.type)) continue; const rec={id:"ch_u"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),name:"New character",blob:await toJpeg(f,2000)}; addUserChar(rec); try{ await IDB.put(rec); }catch{} describeChar(rec); last=rec.id; }
  if(last){ S._newChar=last; S.refTab="ch"; syncTabs(); renderRefs(); } }
async function removeUserChar(id){ try{ await IDB.del(id); }catch{} for(const A of [ALL_REFS,CHAR_REFS]){ const i=A.findIndex(r=>r.id===id); if(i>=0) A.splice(i,1); } delete CHAR_NAMES[id]; try{ localStorage.setItem(CHAR_KEY,JSON.stringify(CHAR_NAMES)); const u=JSON.parse(localStorage.getItem("bae_user_magids")||"{}"); delete u[id]; localStorage.setItem("bae_user_magids",JSON.stringify(u)); }catch{} S.picked=S.picked.filter(x=>x!==id); S._autoCast=(S._autoCast||[]).filter(x=>x!==id); renderRefs(); }
function addUserRef(rec){ if(/^ch_/.test(rec.id)) return addUserChar(rec); ALL_REFS.push({id:rec.id,d:"Your reference: "+(rec.name||"image"),src:URL.createObjectURL(rec.blob),blob:rec.blob,set:"user",studio:false}); }
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
  $("heroTitle").textContent=icon?"Turn an idea into a BAE icon.":"Turn a brief into an on-brand 2K photograph.";
  $("heroLede").textContent=icon?"Describe the icon. Claude designs it in the BAE illustration system (glassmorphism over the orange-to-burgundy gradient, one focal point), and GPT 2.5 renders it in 16:9 on a Light Stone background.":"Write what the photo should show. Claude reads it against the BAE photography rules and your references, writes the prompt, and Seedream 5.5 renders it in 4K.";
  if(!S.web) $("heroSub").textContent=icon?"GPT 2.5 · 16:9 · Light Stone background · via Magnific":"Seedream 5.5 · 2K · via Magnific";
  $("briefLbl").textContent=icon?"Icon idea":"Brief";
  $("btnCreate").textContent=icon?"Create icon":"Create image";
  $("presets").innerHTML=(icon?ICON_PRESETS:PHOTO_PRESETS).map(([l,b])=>`<button type="button" data-b="${esc(b)}">${esc(l)}</button>`).join("");
  if(!S.web) $("mNanoName").textContent=icon?`${S.gptName||"GPT 2.5"} · via Magnific`:(S.nanoName||"Seedream 5.5")+" · via Magnific";
  $("results").classList.add("one"); $("rNano2").hidden=true;
  $("pNano").value=PROMPT_STASH[m]||""; $("pNano").placeholder=icon?"The icon prompt is written after the concept. You can edit it before generating.":"Written after the scene is described. You can edit it before generating.";
  $("promptLbl").textContent=icon?"GPT 2.5 icon prompt":"Seedream 5.5 prompt";
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
    {el:()=>$("modeSeg"), t:"Choose what to make", p:()=>"Photography makes 2K photos. Icons makes 3D BAE icons on Light Stone. You can switch any time."},
    {el:()=>$("briefCard"), t:()=>icon()?"Describe the icon":"Describe the photo", p:()=>icon()?"Write the idea in a sentence, in Arabic or English, or tap an example like Cards stack.":"Write what the photo should show, in Arabic or English, or tap an example to start from."},
    {el:()=>$("optCard"), t:"Pick a few options", p:()=>icon()?"Icons are already locked to 16:9 on Light Stone with glassmorphism and the BAE gradient. Just choose how many.":"Choose the look, setting, shot and size. Wardrobe, light, iPhone 18 and the centred subject are already locked to the BAE rules."},
    {el:()=>$("refCard"), t:"References are ready", p:()=>"We pick BAE images that guide the camera and style, never the layout. Press Browse all to change them."},
    {el:()=>$("btnCreate"), t:()=>icon()?"Create the icon":"Create the image", p:()=>icon()?"One press: Claude designs the icon and GPT 2.5 renders it. It takes a minute or two.":"One press: Claude reads the brief, writes the prompt, and Seedream 5.5 renders it in 4K. It takes a minute or two."},
    {el:()=>$("s3"), t:"Download it", p:()=>icon()?"Your icon appears here. Download the 16:9 PNG or the square S, M, L and XL sizes.":"Your image appears here. Download the 2K PNG, open it in Magnific, or create another."},
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
3. CHARACTERS — assets come first, in TWO stages. Stage 1: for each character you write a natural PORTRAIT prompt (one person, a real everyday place, natural light — never a studio or a plain backdrop, never a sheet) so the user can generate and choose the face. Stage 2: the studio itself turns the chosen portrait into the THREE-PANEL character sheet on plain grey (portrait · neck-to-shoes front · neck-to-shoes back); you never write the sheet prompt. Be specific in the portrait: exact age, face, eyes, hair, build, every garment with colour and fabric.
${JO_PORTRAIT}
4. LOCATIONS & PROPS — each location is an EMPTY establishing plate (no people) with its layout written with positions (left/right/back wall, doors with hinge and opening direction, windows, furniture); it is a STYLE reference for textures and light, never a fixed frame. Each prop is a PRODUCT SHEET of ONE object shown twice (front three-quarter and back three-quarter, ~45° and slightly above), ALWAYS on a plain gray clean background, with its physical state and what it must NOT be confused with. Follow the LOCATION and PROP SHEET templates.
5. DIRECTING — first a FILM LOOK shared by every scene (written once, reused verbatim so the reel reads as one film): format and aspect, film stock look, lens character, grade with a colour split (dominant 60% / secondary 30% / accent 10%) and white balance in K, 24 fps and 180° shutter, pore-level matte skin, "photorealistic — no 3D render, no game engine", global constraints (NO FADE, no slow motion unless written, nobody looks into the camera, no text/logos/watermark), audio policy (SFX and dialogue only, no music, no subtitles). Then one Seedance 2.5 prompt per scene (usually 4–15 s; whatever length the user asks for) written in the SCENE PROMPT FORMAT of the brain: opener, SECTION + location, first-frame blocking of every person, SHOT n (a–b s) with mm + FOV°, one named move with distance and speed, framing limits, camera height and position, ACTING micro-detail and what not to do, per-second ACTION timeline for continuous takes, framing guarantees (HEAD PRIORITY), props state, RULES, sound. Refer to every element by its HANDLE (@char_…, @loc_…, @prop_…). Do NOT write a REFERENCES block or the film look inside scenes: the studio adds both automatically when it renders.
   BLOCKING BLUEPRINT FIRST: before writing any scene, decide its geography like a director and script supervisor: the zones (INTERIOR/EXTERIOR, behind/in front of a counter, inside/outside a car), which zone every person is in, doors (hinge, opening direction), where the camera stands for each shot and which way it looks (lens as FOV°), the axis of action (180° rule), the motivated light source and the time of day, the exact head-count and the props in each hand. Then write the prompts FROM the blueprint and state the geography explicitly in words (e.g. "Sara @img1 is INSIDE the apartment hallway; Lina @img2 stands OUTSIDE on the landing; the door opens inward; the camera is inside, behind Sara's right shoulder"). Never leave the AI to guess where anyone is.
   FIRST FRAME: every scene also gets a still-image prompt for its exact first frame (same shot size, lens, blocking, wardrobe, light and grade as Shot 1, photoreal, BAE look). It is generated first as an image with the tagged references, it serves as an optional preview of the opening; by default the video is NOT animated from it (reference-to-video).
6. RENDER — each scene renders separately in Seedance 2.5 as REFERENCE-TO-VIDEO: no start frame; every asset in the scene (characters, locations, props) is attached in Media as @img1, @img2… in tag order, and the prompt alone builds the opening composition (so describe the first moment's framing precisely). The first-frame still is optional — a preview only, used as a start frame only if the user ticks it.`;
/* House templates (the team can override them in the brain's "templates" section) */
const RL_TPL={"char": "Three-panel cinematic character sheet, one horizontal 16:9 image on a PLAIN GRAY CLEAN BACKGROUND — a seamless flat matte mid-grey studio backdrop (neutral grey, no gradient, no floor line, no texture, no shadows on the backdrop), soft even diffused studio light, neutral white balance. Three panels side by side at identical scale: (1) LEFT — a large head-and-shoulders PORTRAIT including the entire head, hair [and headwear] and face, looking into camera — the ONLY face and the ONLY head on the sheet; (2) MIDDLE — full-body FRONT view of the wardrobe from the BASE OF THE NECK to the SHOES: the top edge of the panel cuts through the base of the neck, the head and hair lie above the border and are NOT shown; the panel starts at the collar, the neck-to-toe figure fills the whole panel height, shoes fully visible with a few centimetres of grey below them; (3) RIGHT — full-body BACK view framed exactly the same way, top edge at the base of the neck, no head, same scale, both shoes visible. HARD RULE: panels 2 and 3 contain NO head, NO face, NO hair — only the neck stump at the top border, collar, shoulders, torso, arms, legs and shoes; do not draw a smaller head inside them; this is a framing crop of a complete healthy body. Identical wardrobe, light and scale in panels 2 and 3. No captions, labels, panel borders, text or watermark.\nTHE PERSON: an original Jordanian [man/woman] exactly [age] years old, [occupation / place in the story] — [essence: e.g. a characterful working man with quiet dignity, warm, likable, trustworthy]. Face: [shape], [complexion], [cheekbones], [nose with one natural irregularity], [lips], [facial hair if any], [hair: colour, length, texture, how it falls]. Eyes: [colour, size, lashes], [gaze: calm, attentive…], [brows], [mouth: closed, faintest hint of a smile]. Clearly [age], [skin age detail]. Build: [build], upright balanced posture, relaxed empty hands at the sides.\nWARDROBE, identical in every view: [garment 1 — colour from the BAE palette, fabric, fit, wear and age]; [garment 2 …]; [trousers/skirt: cut, length, fabric]; [belt]; [shoes: material, colour, wear]. No jewellery [unless written], no bag, no props, no logos, no lettering. (BAE: refined old-money minimal; never orange, never teal, never streetwear; no hijab unless the brief asks.)\nSKIN AND TEXTURE: realistic natural skin with visible fine pores, faint expression lines at the eyes, subtle natural tone variation, lightly retouched even tone but never smoothed, completely matte — no wet shine, no specular highlights, no glare, no beauty filter, no plastic or waxy look. Tactile real cotton, wool and leather; everyday authenticity, not costume styling. Extremely soft diffused wraparound light like a giant overcast softbox, shadowless, no rim light, no hard shadows. Muted palette of [wardrobe colours] and warm skin against the grey; eye-level 50mm lens for the portrait, 85mm for the body views; subtle natural film grain, calm intimate documentary mood, photoreal cinematic realism. One original character shown in three views only, no other people, no cropped feet.", "prop": "Product asset sheet of ONE [object] — the SAME single object shown twice from two genuinely different angles — on a PLAIN GRAY CLEAN BACKGROUND — a flat even mid-grey studio backdrop with no gradient, no texture and no props, soft even studio light, only a faint soft contact shadow under it. [PHYSICAL STATE: what it is, its real volume, whether it stands/lies/is empty or hollow; what it is NOT attached to — no hand, no body, no stand, no mannequin.]\nVIEW 1 (left half of the sheet): FRONT THREE-QUARTER view, the camera about 45 degrees off the front axis and slightly above — [what this angle shows: the key front feature clearly on the near-front, the side wall turning away, a glimpse of the top].\nVIEW 2 (right half of the sheet): BACK THREE-QUARTER view of the same object, camera about 45 degrees off the back axis and slightly above — [what this angle shows: the back, openings, the front feature hidden or only at the far edge].\nBoth views identical in scale, height, lighting and colour; nothing is flat or frontal, every edge shows the object's real volume.\nAPPEARANCE — stay as close as possible to a real [object]: [materials, colours, textures, finishes, seams, edges, proportions, small details]. NOT [the things the model could confuse it with: e.g. not a rolled bandage, not a rigid brace, not a flat cut-out] — no logos, no text, no watermark. Photographic realism, catalogue clarity.\n(Phones: a modern iPhone 18 with no visible logo; screen off or a soft clean glow with no readable text.)", "loc": "[Place in modern Amman, specific: e.g. the entrance hall of a modern Abdoun apartment], completely EMPTY — no people, no animals, no text, no logos — [time of day], [motivated light: source, direction, colour temperature in K, how it falls], [layout with positions: what is on the left wall, the right wall, the back wall; doors with hinge side and opening direction; windows; key furniture and props in place], [materials and textures: light oak, white plaster, stone…], [grade: warm neutral, BAE]. Wide establishing frame at eye level, 24mm (74°), anamorphic lens character, shallow depth of field, fine film grain, photoreal, no 3D render.\nUse: the location image is a STYLE reference for architecture, textures and light, never a fixed frame.\nPOSITION MAP (when positions matter): generate \"High angle top-down wide shot of the location @loc, empty, same light\" with numbered circles where people stand; attach it as a reference that defines positions only.", "scene": "Write every scene prompt as continuous precise prose (no markdown, no bullet lists), in this order:\n1. OPENER — \"Cinematic [N]-second sequence in [K] SECTION(S), [M] shots, hard cut between shots/sections, realistic, no overacting.\" + global rules for this scene (\"Nobody ever looks into the camera.\").\n2. SECTION \"[name]\" — [@loc_handle] (shots a–b, t1–t2 s): place, time, light (source, direction, K), grade. The location is a style reference.\n3. BLOCKING at the first frame, for every person: exact pose (standing / leaning back on the edge of X / sitting on the RIGHT end of the sofa, on the edge of the seat), what supports the body, hands (which hand, where, holding what, thumbs hooked…), gaze (eyes on the floor / on the sleeve, unfocused), body angle, what is on their left and right, how the light hits them, INSIDE/OUTSIDE. Say who appears ONLY in which shot.\n4. SHOT n (a–b s): lens in mm with FOV (35mm, 54°), STATIC or ONE named move with distance and speed (\"smooth steady DOLLY IN for the whole shot, closing about a quarter of the distance\"); framing limits (\"from just above his head to his hips\"); camera height in cm and position relative to the subject (\"high above his head, tilted down, to his front-right, so we see the right side of his face in three-quarter view\"); what the background shows because of that angle; ACTING in micro-detail (eyes, jaw, lips, breath) and what NOT to do (no frown, no tears, no sigh, no movement); who is NOT in the shot. \"HARD CUT.\" before the next shot.\n5. CONTINUOUS TAKE: an ACTION timeline per second (\"8–9s — ONE MOVEMENT: …; 9–10s — …; 10–12s — …\"), one action per range, physical detail (weight, fabric stretch, skin, effort, breath).\n6. FRAMING GUARANTEES where AI fails: \"HEAD PRIORITY: the head stays complete with headroom in every frame\"; hands and the key prop fully in frame; the camera stops at a stated distance and never overshoots.\n7. PROPS: state at the first frame, which hand or limb, how it moves, what it never does (\"never taken off\", \"never changes hands\").\n8. RULES: no other people, no pets, no text, no logos, no watermark; the place, light and grade exactly as the location; left/right specifics; no slow motion and no speed changes unless written; no cuts inside a continuous take.\n9. Sound per section: room tone, specific SFX with timing, dialogue (who, language, delivery, the exact line), \"No music, no subtitles\" (music is added in the edit).\nUse element handles exactly (@char_sara, @loc_hall, @prop_phone). Do NOT write a REFERENCES block or the film look — the studio adds them automatically."};
const rlTpl=k=>(BR?.sections?.find(s=>s.id==="templates")?.[k])||RL_TPL[k];
const RL_ADV={"trend": {"name": "Trend Scout", "icon": "↗", "role": "Finds what is travelling right now: formats, hooks, sounds, memes and talking points in Jordan, the Arab world and global reels.", "order": 1}, "story": {"name": "Story Doctor", "icon": "✎", "role": "Guards the insight and the story: one human truth, a clear turn, a payoff that earns the brand.", "order": 2}, "dp": {"name": "Director of Photography", "icon": "◉", "role": "Camera, lens, light and composition that look expensive and stay readable to the AI.", "order": 3}, "performance": {"name": "Performance Coach", "icon": "☺", "role": "Acting, casting and wardrobe truth: performances that feel real, never 'ad acting'.", "order": 4}, "tech": {"name": "Seedance Technician", "icon": "⚙", "role": "Prompt engineering for Seedance 2.5 and Nano Banana: references, constraints and the failure modes that waste credits.", "order": 5}};
const rlAdv=id=>({...(RL_ADV[id]||{name:id,icon:"•",role:""}),...((BR?.advisors||[]).find(x=>x.id===id)||{})});
const RL_SD25=`SEEDANCE 2.5 — WHAT IT TAKES (ByteDance, July 2026):
- Length: 4–30 s per generation in ONE pass (2.0 was 15 s). Longer films: multi-round extension — continue from the previous clip (reuse only its last 2–3 s as the hand-off; feeding more makes it replay finished action).
- Inputs per generation: up to 30 reference images, 10 reference videos, 10 reference audio clips, plus optional start image / end image. Output 480p / 720p / 1080p (no 4K), aspect 16:9, 9:16, 4:3, 3:4, 1:1, 21:9. Audio is generated with the picture (switch it on).
- Within 30 s it can tell a multi-shot story (setup, development, turn, resolution) with real cuts: write a timed shot list ("SHOT 1 (0–6 s)…") — timestamps steer pacing, they are not frame-exact.
- Editing after generation: timestamp-level fixes (change only 12–15 s), swap a character/action, green-screen background swap, change ONLY the camera move, reference-guided edits — say what must stay unchanged.
- References: cite them by tag (@img1, @Video 1, @Audio 1). Give each reference ONE job and say what must NOT transfer (identity only / location geometry only / motion only / voice only). Separate character, product and location images; character sheets neutral, no props; props as their own image with a role in the plot.
- Max capacity is not the target: use the smallest set that adds unique information (a 5-character scene worked with ~11 visual refs, got confused at 14). Split crowded dialogue scenes into simpler shots.
- Video refs guide camera path, blocking and timing (not exact mocap). Audio refs guide voice but don't lock words or accent — write the dialogue in the prompt too.
- Clay/textureless 3D renders or a top-down plan as a reference can lock composition, blocking and light direction.
- A long take needs something to travel toward (a walk, a push-in, an event); static subjects drift. Describe looks in plain visual terms — naming a film, studio or artist can be rejected by moderation.
- Real cost/time: a 30 s 1080p clip with audio takes ~9–10 min; 15 s with 7 refs ~12 min. Judge by usable seconds per credit, draft at 480p first.`;
const RL_SEEDREAM=`SEEDREAM 5.5 (ByteDance) — THE IMAGE MODEL FOR EVERY STILL (cast sheets, locations, props, storyboard frames, first frames). Always 2K.
- Takes up to 10 reference images; output tiers 1K / 1.5K / 2K (2K ≈ 4.2 MP, e.g. 2736×1536 wide); aspect 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9. Transparent PNG backgrounds possible. Very strong at small, dense text (Arabic still needs checking letter by letter) and at preserving everything outside an edit across many rounds of edits.
- Write the prompt as a brief, one clause per decision: open with the DELIVERABLE ("Cinematic storyboard frame, vertical 9:16, …" / "Character reference sheet …"), then subject, setting, light, lens & framing, style, and end with exclusions ("no text, no logos, no watermark").
- Name the orientation in words (vertical 9:16 / wide 16:9). Describe products by materials and parts, not just colour. Say where the subject sits and where empty space stays.
- Text in the image: put each line in double quotes, give it a position, type style and colour, and end with "no other text".
- Keep it under ~600 words. Refer to attached references as @img1, @img2… and give each ONE job (identity / place / product).`;
const RL_DIALOGUE=`DIALOGUE — SPOKEN ARABIC THAT SOUNDS RIGHT (every spoken line, no exceptions):
- All speech is in the reel's language (Jordanian Arabic unless the settings say otherwise). Never write a spoken line in English or in Latin letters, and state once in AUDIO: "All speech is Jordanian Arabic (Amman dialect); no English speech."
- Write each line in Arabic script WITH FULL TASHKEEL (حَرَكات) the way a Jordanian actually says it — dialect vowels, sukun on silent endings — so the model pronounces it correctly: «مَرْحَبا، كيفْ حالْكُمْ؟», «هَسّا بَدْفَعْها بْكَبْسِة», «وَلا يْهِمَّكْ». Keep lines short (what fits the seconds: about 2–3 words per second).
- In the prompt, each line sits inside its timed stage, bound to its speaker and its voice: 0–4s … @char_wissam says to camera in Jordanian Arabic, calm and warm (voice reference @voice1): «مَرْحَبا، كيفْ حالْكُمْ؟» — everyone else keeps their mouth closed. Number the lines @voice1, @voice2… in the order they are spoken; the studio swaps each for the user's audio reference (@audio1…) when one is attached.
- Return the same lines in "dialogue": [{"n":1,"who":"@char_wissam","at":"0–4s","line":"مَرْحَبا، كيفْ حالْكُمْ؟","delivery":"calm, warm","tts":"[warm] مَرْحَبا… كيفْ حالْكُمْ؟"}] — "line" exactly as in the prompt, with tashkeel. No dialogue → "dialogue": [].
- "tts" is the same line prepared for the voice generator (ElevenLabs v4 in Magnific): the Arabic words with full tashkeel, unchanged, plus AUDIO TAGS in square brackets, in English, placed right before the words they colour. Emotions: [excited] [curious] [confident] [warm] [calm] [energetic] [serious] [sarcastic] [mischievous] [happy] [sad] [angry] [whispers]. Reactions: [laughs] [starts laughing] [sighs] [exhales] [snorts]. Pauses: an ellipsis … for a beat, or [pause 0.5s]. A tag must describe something HEARD and stay short and plain ([low, steady voice], never [standing] or [smiling]); a vague tag can come out as a sound effect. Use one emotion tag per phrase, a reaction only where the script has one, punctuation for rhythm (، ؟ ! …). The studio adds the [Jordanian Arabic accent] tag itself. Never put stage directions or English words to be spoken in it — everything outside brackets is said aloud.`;
const RL_JO=`JORDAN, FROM THE INSIDE (you are the best creative director in Jordan; think like a Jordanian, not a tourist):
- Values that move people here: النخوة (stepping in for someone without being asked), الشهامة (gallantry, quiet decency), الغيرة (protective care for family and neighbourhood), الكرم (generosity: the host who insists, the extra plate), الشرف والسمعة (honour and how the family is seen), الجيرة (the neighbour is family), العونة (everyone helps: harvest, wedding, moving house), برّ الوالدين (caring for parents). Show these through ACTIONS, never slogans: a young man pays a stranger's taxi without a word, the son quietly settles his father's bill, the neighbour lends the gas cylinder.
- Daily texture: Amman hills and stairs (Jabal al-Weibdeh, Jabal Amman, Lweibdeh, Rainbow St, Abdali, Sweifieh, Taj, Downtown/Balad), traffic at the 7th circle, servees and yellow taxis, the khaltour coffee, kaak with zaatar, knafeh from Habibah, mansaf at Friday lunch, the jameed, the shrak bread, falafel at Hashem, the gas truck's tune, the morning "ya sabah al-khair", the evening walk, the hookah on the balcony, winter sobba heater and the family around it, snow day in Amman, the Dead Sea Friday, Aqaba holidays, Wadi Rum, Ajloun forests, Jerash, Salt's yellow houses, Irbid students, Zarqa workers.
- Occasions: Ramadan (iftar rush, fanous, sohour, family gatherings), the two Eids (عيدية, new clothes, visiting elders first), Tawjihi results day (the whole family waiting, horns, knafeh), weddings (zaffeh, dabke, the jaha asking for the bride's hand with coffee), graduation, back to school, Independence Day 25 May, Mother's Day 21 March, the first salary, the first car, the first flat (with the whole family inspecting).
- Humour that lands: understatement and self-irony, the mother who knows everything, the auntie's questions (إيمتى بدنا نفرح فيك؟), the dad who negotiates every price, cousins in the family WhatsApp group, "ولا يهمك" that hides a sacrifice, "على راسي", "تكرم عينك", "يا زلمة", "والله غير…" (the host's oath). Warm teasing, never mockery of anyone's origin, tribe, accent, religion or region.
- Respect lines: modest wardrobe for families; no alcohol, no romance clichés, no mocking elders, no showing money flaunted vulgarly, no Gulf/Egyptian/Levantine-generic dialect (use Jordanian: شو، هسا، بدي، منيح، يا زلمة، ليش، كيفك، والله). Faces, names and skin tones look Jordanian. Arabic on screen is correct and Jordanian in tone.
- Making ideas EXCLUSIVE: each idea starts from a real Jordanian truth (a small habit everyone recognises but nobody filmed), turns on one human value (nakhwa, karam, ghira, sharaf…), and lets the BAE product be the quiet enabler of that value, not the hero. Never repeat an idea, setting or twist already in memory or this chat; if it smells like a generic bank ad (smiling family + phone + city skyline), throw it away and dig deeper.
${JO_FACE}
${JO_PLACE}`;
const RL_BAE=`BANK AL ETIHAD HOUSE STYLE (non-negotiable in every image and video prompt):
- Cinematic, warm, premium, human. Clean natural light (golden hour, window light, soft daylight), warm neutral grade with orange and burgundy accents, fine grain, gentle halation. Never cold, never neon.
- Modern Jordan only: today's Amman (Abdali, new towers, sleek cafés, modern homes and offices, modern malls). Modern Scandinavian IKEA-style interiors: light oak, white walls, clean lines.
- People: modern, contemporary, refined "old money" minimal wardrobe for every age (tailored trousers, crisp shirts, fine knits, clean blazers, loafers or white leather sneakers), colours only from the BAE palette (ink #19181E, white, light stone #ECE8DF, ecru #FFFAF4, stone #CCC3B4, burgundy #A33755, raspberry #B9516E, blush #F1C0B6, sky blue #4BBCDF). NEVER orange clothing, never teal, never streetwear. No hijab, no headscarf, no traditional Arab clothing.
- Skin: natural texture with visible pores, professionally retouched even tone, soft glow, never plastic.
- Candid always: caught moments, never posed. Nobody looks at the camera or performs for it (unless the script has a presenter speaking to camera, or the image is a character reference portrait or sheet). People are absorbed in a real action; the camera watches from a three-quarter, side, behind or over-the-shoulder angle; one clear focus in the middle of the frame; quiet, uncluttered places with few elements.
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
/* ---------- where a reel lives (v154) ----------
   One account document holds at most 262,144 bytes (measured 17 Nov 2026). A long Director chat alone passes that, and from then on every
   save to the account was refused while the page only said "Saved in this browser": Samer worked three days on a reel that existed on one
   laptop only, and another device showed him the version of three days before.
   So: the chat is its own document (reelchat_<id>) and both documents are trimmed to fit; what reached the account is remembered per reel
   on this device (RL_SYNC); when this device and the account hold different versions, nobody is overwritten: he chooses, and the other
   version stays as a copy; and a save that did not reach the account says so in a bar he cannot miss. */
const RL_SYNC="bae_reels_v3_sync", RL_MAX=235000;
const rlBytes=o=>new Blob([JSON.stringify(o)]).size;
const rlSyncGet=id=>lsGet(RL_SYNC,{})[id]||null;
const rlSyncSet=(id,v)=>{ const m=lsGet(RL_SYNC,{}); if(v) m[id]=v; else delete m[id]; lsSet(RL_SYNC,m); };
const rlChatId=id=>"reelchat_"+String(id).replace(/[^A-Za-z0-9_-]/g,"");
const rlClock=t=>{ if(!t) return ""; const d=new Date(t), n=new Date(), same=d.toDateString()===n.toDateString(); return (same?"today ":d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})+" ")+d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}); };
/* the chat as the account can hold it: the words always stay; the working data of older replies goes first, then the oldest messages */
function rlFitChat(chat){ let c=(chat||[]).map(m=>({...m})); const big=()=>rlBytes(c)>RL_MAX;
  for(let i=0;i<c.length-12&&big();i++){ delete c[i].prompt; delete c[i].mem; delete c[i].advisors; }
  for(let i=0;i<c.length&&big();i++) if(String(c[i].text||"").length>6000) c[i].text=String(c[i].text).slice(0,6000)+" …";
  while(c.length>8&&big()) c.shift();
  return c; }
function rlFitMain(body){ const m={...body,chat:[],chatDoc:1}; if(rlBytes(m)<=RL_MAX) return m;
  m.scenes=(m.scenes||[]).map(x=>{ const y={...x}; delete y.history; return y; }); if(rlBytes(m)<=RL_MAX) return m;
  m.events=(m.events||[]).slice(-20); m.ideasPrev=[]; if(rlBytes(m)<=RL_MAX) return m;
  if(rlBytes(m)>258000) throw {code:"too_big",message:"This reel is larger than one account document can hold, even without its chat."}; return m; }
async function rlCloudGet(id){ const s=await rlCol().doc(rlDocId(id)).get(); if(!s.exists) return null; const p=JSON.parse(JSON.stringify(s.data()));
  if(p.chatDoc){ try{ const c=await rlCol().doc(rlChatId(id)).get(); p.chat=c.exists?(c.data()?.chat||[]):[]; }catch{ p.chat=[]; } delete p.chatDoc; }
  return p; }
/* send one version to the account. force = he chose this version over the account's, which is already kept as a copy */
async function rlPush(body,force){ const id=body.id, sy=rlSyncGet(id);
  if(!force){ const r=await rlCol().doc(rlDocId(id)).get(), at=r.exists?(r.data()?.updatedAt||0):0;
    if(at&&at!==body.updatedAt&&(sy?at>sy.at:at>(body.updatedAt||0))) throw {code:"conflict",at}; }
  const main=rlFitMain(body);
  await rlCol().doc(rlChatId(id)).set({kind:"reelchat",id,updatedAt:body.updatedAt,chat:rlFitChat(body.chat)});
  await rlCol().doc(rlDocId(id)).set(main);
  rlSyncSet(id,{at:body.updatedAt}); }
/* keep a version as a project of its own, so choosing one version never loses the other */
async function rlStash(p,label){ const c=rlClean(p); c.id=rlNew().id; c.title=((p.title||"Untitled reel").slice(0,48)+" · "+label).slice(0,80); c.space=null;
  const okLocal=lsSet(RL_P+c.id,c); if(okLocal){ const idx=lsGet(RL_IDX,[]); idx.unshift(rlMeta(c)); lsSet(RL_IDX,idx.slice(0,80)); } let okCloud=false;
  if(RLS.mode==="account"){ try{ await rlPush(c,true); okCloud=true; }catch(e){ log("✕","reel copy",{code:e?.code,message:e?.message}); } }
  if(!okLocal&&!okCloud) throw {code:"no_room",message:"The other version could not be kept as a copy (this browser's storage is full and the account refused it). Nothing was changed."};
  return c.id; }
async function rlList(){
  await rlStoreInit();
  let list=[];
  if(RLS.mode==="account"){ try{ const snap=await rlCol().where("kind","==","reel").get(); list=snap.docs.map(d=>d.data()).filter(Boolean).map(rlMeta); }catch(e){ log("✕","reels list",{code:e?.code}); } }
  const loc=lsGet(RL_IDX,[]), lAt=new Map(loc.map(x=>[x.id,x.updatedAt||0])), cAt=new Map(list.map(x=>[x.id,x.updatedAt||0]));
  const m=new Map(); for(const x of [...loc,...list]){ const o=m.get(x.id); if(!o||(x.updatedAt||0)>=(o.updatedAt||0)) m.set(x.id,x); }
  return [...m.values()].filter(x=>!lsGet("bae_reels_v3_del",[]).includes(x.id)).map(x=>({...x,lAt:lAt.get(x.id)||0,cAt:cAt.get(x.id)||0,two:rlTwo(x.id,lAt.get(x.id)||0,cAt.get(x.id)||0)})).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
}
/* does this device hold a version that the account does not? "ask" = both moved or nobody knows: he must choose. "local" = only here. */
function rlTwo(id,l,c){ if(RLS.mode!=="account"||!l) return ""; if(!c) return lsGet(RL_P+id,null)?"local":""; if(l===c) return ""; const sy=rlSyncGet(id);
  if(sy) return c<=sy.at?(l>c?"local":""):(l<=sy.at?"":"ask");   /* the account still holds what this device sent: this device leads. It moved on elsewhere: fine if nothing new here, else ask */
  return l>c?"local":(lsGet(RL_P+id,null)?"ask":""); }
async function rlLoadProject(id){
  await rlStoreInit(); let c=null;
  if(RLS.mode==="account"){ try{ c=await rlCloudGet(id); }catch(e){ log("✕","reel load",{code:e?.code,message:e?.message}); } }
  const l=lsGet(RL_P+id,null); let p=c||l;
  if(c&&l){ const how=rlTwo(id,l.updatedAt||0,c.updatedAt||0);
    if(how==="ask"){ p=await rlChoose(l,c); if(!p) return null; }
    else p=(how==="local"||(l.updatedAt||0)===(c.updatedAt||0))?l:c;
    if(p===c) rlSyncSet(id,{at:c.updatedAt||0}); }
  else if(c) rlSyncSet(id,{at:c.updatedAt||0});
  if(p) rlUpgrade(p); return p;
}
/* two different versions of one reel: show both, let him pick, keep the other as a copy */
function rlChoose(l,c){ return new Promise(done=>{
  const facts=p=>{ const sc=p.scenes||[], cast=(p.characters||[]).map(x=>x.name).filter(Boolean).slice(0,4).join(", "), last=[...(p.chat||[])].reverse().find(m=>m.role==="u"&&m.text);
    return `<ul><li><b>${esc(rlClock(p.updatedAt))}</b><span>last saved</span></li><li><b>${sc.length}</b><span>${sc.length===1?"scene":"scenes"}${sc[0]?.title?`: <span dir="auto">${esc(String(sc[0].title).slice(0,70))}</span>`:""}</span></li><li><b>${(p.characters||[]).length}</b><span>cast${cast?`: <span dir="auto">${esc(cast)}</span>`:""}</span></li><li><b>${(p.locations||[]).length}</b><span>places and props</span></li><li><b>${(p.chat||[]).length}</b><span>chat messages${last?`, last: <span dir="auto">“${esc(String(last.text).slice(0,60))}”</span>`:""}</span></li></ul>`; };
  const d=document.createElement("div"); d.className="rl-vs"; d.setAttribute("role","dialog"); d.setAttribute("aria-modal","true"); d.setAttribute("aria-label","Two versions of this reel");
  d.innerHTML=`<div class="rl-vs-box"><h2>Two versions of this reel</h2><p>This device and your account hold different versions of <b dir="auto">${esc(l.title||c.title||"this reel")}</b>. Choose the one to continue with. The other one is not deleted: it stays in your Reels as a copy.</p>
    <div class="rl-vs-two"><section><h3>On this device</h3>${facts(l)}<button type="button" class="btn primary" data-pick="l">Continue with this device's version</button></section>
    <section><h3>In your account</h3>${facts(c)}<button type="button" class="btn" data-pick="c">Continue with the account's version</button></section></div>
    <button type="button" class="a-btn rl-vs-x" data-pick="">Decide later</button></div>`;
  $("reels").appendChild(d); d.querySelector("[data-pick]").focus();
  d.addEventListener("click",async e=>{ const b=e.target.closest("[data-pick]"); if(!b||d.dataset.busy) return; const k=b.dataset.pick; if(!k){ d.remove(); return done(null); }
    d.dataset.busy="1"; b.textContent="Keeping the other version as a copy…";
    const mine=k==="l"?l:c, other=k==="l"?c:l;
    try{ await rlStash(other,k==="l"?"account version":"this device's version"); }
    catch(err){ log("✕","reel stash",{message:err?.message}); delete d.dataset.busy; b.textContent="Try again"; let w=d.querySelector(".rl-warn"); if(!w){ w=document.createElement("p"); w.className="rl-warn"; d.querySelector(".rl-vs-box").appendChild(w); } w.textContent=(err?.message||"The other version could not be kept as a copy. Nothing was changed.")+" Use Backup on the card first."; return; }
    /* the chosen version is a new, deliberate save: it gets today's time, so no other device mistakes an older copy for the newer one */
    mine.updatedAt=Date.now();
    if(k==="l") rlSyncSet(l.id,{at:c.updatedAt||0,chose:1}); else { lsSet(RL_P+c.id,rlClean(c)); rlSyncSet(c.id,{at:c.updatedAt||0,chose:1}); }
    d.remove(); done(mine); });
}); }
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
  if(RLS.mode!=="account"){ rlSavedState(okLocal?"local":"fail",okLocal?"":"This browser's storage is full."); return; }
  if(RLS.clash===body.id){ rlSavedState("clash"); return; }
  const force=!!rlSyncGet(body.id)?.chose;
  rlChain=rlChain.then(()=>rlPush(body,force)).then(()=>rlSavedState("saved"),e=>{ log("✕","reel save",{code:e?.code,message:e?.message});
    if(e?.code==="conflict"){ RLS.clash=body.id; RLS.clashAt=e.at; return rlSavedState("clash"); }
    rlSavedState(okLocal?"local":"fail",e?.code==="too_big"?e.message:String(e?.message||e?.code||"").replace(/\(request_id[^)]*\)/i,"").slice(0,140)); });
  return rlChain;
}
/* the small line beside the title, and a bar nobody can miss when the work is NOT in the account */
function rlSavedState(s,why){ const el=$("rlSaved"); if(el){ el.dataset.s=s; el.textContent={saving:"Saving…",saved:"Saved to your account",local:"NOT in your account",clash:"NOT in your account",fail:"Couldn't save"}[s]||""; }
  const bar=$("rlSyncBar"); if(!bar) return; if(s==="saving") return; if(s==="saved"){ bar.hidden=true; return; }
  if(s==="local"&&RLS.mode!=="account"){ bar.hidden=true; if(el) el.textContent="Saved in this browser"; return; }
  bar.hidden=false; bar.dataset.s=s;
  bar.innerHTML=s==="clash"?`<span><b>This reel was changed on another device</b> (${esc(rlClock(RLS.clashAt))}). Your work here is safe in this browser, but it is not in your account yet.</span><span class="rl-sync-act"><button type="button" class="a-btn" data-rlsync="mine">Keep my version</button><button type="button" class="a-btn" data-rlsync="theirs">Open the other version</button><button type="button" class="a-btn" data-rlsync="bak">Download a backup</button></span>`
    :s==="fail"?`<span><b>This reel could not be saved.</b> ${esc(why||"")} Download a backup now, before you close this page.</span><span class="rl-sync-act"><button type="button" class="a-btn" data-rlsync="bak">Download a backup</button><button type="button" class="a-btn" data-rlsync="retry">Try again</button></span>`
    :`<span><b>Not saved to your account.</b> This reel is saved in this browser only, so your other devices do not have it. ${esc(why||"")}</span><span class="rl-sync-act"><button type="button" class="a-btn" data-rlsync="retry">Try again</button><button type="button" class="a-btn" data-rlsync="bak">Download a backup</button></span>`; }
async function rlSyncAct(k){ if(!RL) return; const id=RL.id;
  if(k==="bak") return rlBackup(RL);
  if(k==="retry"){ rlSavedState("saving"); return rlFlush(); }
  let other=null; try{ other=await rlCloudGet(id); }catch{}
  if(k==="mine"){ if(other) await rlStash(other,"other device's version"); RLS.clash=null; RL.updatedAt=Date.now(); rlSyncSet(id,{at:other?.updatedAt||0,chose:1}); rlSavedState("saving"); return rlFlush(); }
  if(k==="theirs"&&other){ await rlStash(RL,"this device's version"); RLS.clash=null; lsSet(RL_P+id,rlClean(other)); rlSyncSet(id,{at:other.updatedAt||0}); rlUpgrade(other); RL=other; rlSavedState("saved"); rlRender(); } }
/* a reel as one file: the safety net that does not depend on any storage */
async function rlBackup(p){ const body=rlClean(p), name=`BAE-reel-${String(body.title||"reel").replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-|-$/g,"").slice(0,40)||"reel"}-${(d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}-${String(d.getHours()).padStart(2,"0")}${String(d.getMinutes()).padStart(2,"0")}`)(new Date(body.updatedAt||Date.now()))}.json`;
  const blob=new Blob([JSON.stringify({bae_reel_backup:1,savedAt:Date.now(),project:body})],{type:"application/json"});
  try{ if(downloads&&!S.web){ await downloads.save({filename:name,data:blob}); return; } }catch(e){ if(e?.code==="declined") return; }
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; a.click(); }
async function rlRestore(file){ let o=null; try{ o=JSON.parse(await file.text()); }catch{} const p=o?.project; if(!o?.bae_reel_backup||!p||p.kind!=="reel") throw {message:"This file is not a BAE reel backup."};
  const c=JSON.parse(JSON.stringify(p)); c.id=rlNew().id; c.title=((p.title||"Untitled reel").slice(0,60)+" · restored").slice(0,80); c.space=null; c.updatedAt=Date.now();
  lsSet(RL_P+c.id,c); const idx=lsGet(RL_IDX,[]); idx.unshift(rlMeta(c)); lsSet(RL_IDX,idx.slice(0,80));
  if(RLS.mode==="account"){ try{ await rlPush(c,true); }catch(e){ log("✕","reel restore",{code:e?.code,message:e?.message}); } } return c.id; }
async function rlDelete(id){
  lsSet("bae_reels_v3_del",[...lsGet("bae_reels_v3_del",[]),id].slice(-200));
  try{ localStorage.removeItem(RL_P+id); }catch{} lsSet(RL_IDX,lsGet(RL_IDX,[]).filter(x=>x.id!==id)); rlSyncSet(id,null);
  if(RLS.mode==="account"){ try{ await rlCol().doc(rlDocId(id)).delete(); }catch{} try{ await rlCol().doc(rlChatId(id)).delete(); }catch{} }
}
async function rlDuplicate(id){ const p=await rlLoadProject(id); if(!p) return; const c=JSON.parse(JSON.stringify(p)); c.id=rlNew().id; c.title=(p.title||"Untitled reel")+" copy"; c.space=null; c.createdAt=c.updatedAt=Date.now(); const keep=RL; RL=c; await rlFlush(); await rlChain; RL=keep; }

/* ---------- thumbnails: cached in this browser by Magnific creation id, fetched again when missing ---------- */
const rlTmem={}, rlFull={}, rlTQ=new Set(), rlTTried=new Set(); let rlTBusy=0;
/* small previews also live in the user's account, so another device shows them at once instead of pulling every full image from Magnific */
const rlTCol=()=>RLS.mode==="account"&&RLS.db&&RLS.uid?RLS.db.collection("data/users/"+RLS.uid+"/thumbs/t"):null;
const rlTDoc=cid=>String(cid).replace(/[^A-Za-z0-9_-]/g,"_").slice(0,150);
const rlTUp=new Set();
async function rlTFit(data){ if(data.length<=95000) return data; try{ const bmp=await createImageBitmap(await (await fetch(data)).blob()); for(const [px,q] of [[900,.7],[760,.66],[640,.62],[520,.6],[400,.58]]){ const k=Math.min(1,px/Math.max(bmp.width,bmp.height)); const cv=document.createElement("canvas"); cv.width=Math.round(bmp.width*k); cv.height=Math.round(bmp.height*k); cv.getContext("2d").drawImage(bmp,0,0,cv.width,cv.height); const d=cv.toDataURL("image/jpeg",q); if(d.length<=95000) return d; } }catch{} return null; }
function rlTCloud(cid,data0){ const c=rlTCol(); if(!c||rlTUp.has(cid)||!data0) return; rlTUp.add(cid); try{ if(localStorage.getItem("rlTC:"+cid)) return; }catch{}
  rlTFit(data0).then(data=>{ if(!data) return;
  try{ c.doc(rlTDoc(cid)).set({d:data,at:Date.now()}).then(()=>{ try{ localStorage.setItem("rlTC:"+cid,"1"); }catch{} },()=>{ rlTUp.delete(cid); }); }catch{} }); }
function rlTGet(cid){ if(!cid) return null; if(String(cid).startsWith("lib:")) return refById(String(cid).slice(4))?.src||null; if(rlTmem[cid]){ rlTCloud(cid,rlTmem[cid]); return rlTmem[cid]; } try{ const v=localStorage.getItem(RL_T+cid); if(v){ rlTCloud(cid,v); return rlTmem[cid]=v; } }catch{} return null; }
function rlTSet(cid,data){ if(!cid||!data) return; rlTmem[cid]=data; rlTCloud(cid,data); try{ localStorage.setItem(RL_T+cid,data); }catch{ try{ const ks=Object.keys(localStorage).filter(k=>k.startsWith(RL_T)); ks.slice(0,Math.ceil(ks.length/3)).forEach(k=>localStorage.removeItem(k)); localStorage.setItem(RL_T+cid,data); }catch{} } }
function rlNeed(cid){ if(!cid||String(cid).startsWith("lib:")||rlTGet(cid)||rlTTried.has(cid)||(!rlTCol()&&(!mcp||!S.connected))) return; rlTQ.add(cid); rlPump(); }
async function rlPump(){
  while(rlTBusy<4&&rlTQ.size){ const cid=rlTQ.values().next().value; rlTQ.delete(cid); rlTTried.add(cid); rlTBusy++;
    (async()=>{ const c=rlTCol(); let d=null; if(c){ try{ const sn=await c.doc(rlTDoc(cid)).get(); d=sn.exists?sn.data()?.d||null:null; }catch{} }
      if(d){ rlTmem[cid]=d; rlTUp.add(cid); try{ localStorage.setItem(RL_T+cid,d); localStorage.setItem("rlTC:"+cid,"1"); }catch{} rlBoardSoon(); return; }
      if(!mcp||!S.connected){ rlTTried.delete(cid); return; }
      const pv=await preview(cid); if(pv.image){ const src=`data:${pv.image.mime};base64,${pv.image.data}`; rlFull[cid]=src; rlTSet(cid,await rlThumb(src,rlIsSheet(cid)?1100:480)); rlBoardSoon(); }
    })().catch(()=>{}).finally(()=>{ rlTBusy--; rlPump(); }); }
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
  if(BR.canEdit&&!BR_ADS_RUN) setTimeout(()=>brWatchAds(),25000);
  return BR;
}
/* ---------- The studio watches queued ads with Gemini while it is open; the daily research turns them into memory cards ---------- */
let BR_ADS_RUN=false;
async function brWatchAds(){
  if(BR_ADS_RUN||!mcp||!RLS.db||!BR.canEdit) return; BR_ADS_RUN=true;
  try{ const db=RLS.db, day=new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Amman"});
    const q=await db.doc("memmeta/adqueue").get(); const queue=(q.exists?q.data().items:null)||[]; if(!queue.length) return;
    const w=await db.doc("memmeta/adwatch").get(); let items=(w.exists?w.data().items:null)||[];
    const seen=new Set(items.map(x=>x.url)); let today=items.filter(x=>x.day===day&&x.analysis).length;
    for(const a of queue){ if(today>=4) break; if(!a?.url||seen.has(a.url)) continue;
      if(document.hidden||rlBusy){ await new Promise(r=>setTimeout(r,15000)); if(document.hidden) break; }
      let rec={url:a.url,title:a.title||"",brand:a.brand||"",country:a.country||"",day,at:Date.now()};
      try{ const r=await mcp.callTool(GEYE,"watch_video",{video_url:a.url,fps:1,end_s:75,detail:"low",question:"Give a shot-by-shot breakdown with MM:SS: hook in the first 2 s, story beats, the human insight, how the product appears, camera/lens/light/grade, pacing and cut rhythm, music/sound, the ending/packshot, on-screen text. Then: why it works, what a Jordanian bank could steal from it, and what would NOT fit Jordan."},{cache:false});
        rec.analysis=String(typeof r?.payload==="string"?r.payload:r?.payload?.answer||(r?.content||[]).map(c=>c.text||"").join("")||"").slice(0,9000); if(rec.analysis) today++; else rec.err="empty"; }
      catch(e){ const m=String(e?.message||e?.code||""); if(/quota|exhaust|429|not_granted|not.?connected|manifest/i.test(m)) break; rec.err=m.slice(0,200); }
      seen.add(a.url); items=[...items,rec].slice(-60);
      await db.doc("memmeta/adwatch").set({items,updatedAt:Date.now()}).catch(()=>{});
      log(rec.analysis?"✓":"✕","ad watched for the brain",{title:rec.title,url:rec.url,err:rec.err});
      await new Promise(r=>setTimeout(r,4000)); }
  }catch(e){ log("✕","ad watch",{code:e?.code}); }
}
async function brLoadFeedback(){ if(!RLS.db) return []; try{ const f=await RLS.db.collection("feedback").orderBy("at","desc").limit(30).get(); BR.feedback=f.docs.map(d=>({id:d.id,...JSON.parse(JSON.stringify(d.data()))})); }catch{} return BR.feedback; }

/* =====================================================================
   LONG-TERM MEMORY — like a person's: everything kept, recalled by relevance
   - mem/<shard>     : memory cards (atomic, verbatim), packed ~400 per document, never deleted or compressed
   - memmeta/catalog : list of shards, counts, topics
   - archive/<part>  : the raw, word-for-word record of everything (research, notes, feedback, lessons)
   - feedback        : short-term memory (today's signals) until the nightly consolidation turns it into cards
   Recall: BM25 relevance over text + topics + bilingual keywords, boosted by stage, evidence and team lessons,
   then one hop along the graph links. The Director gets the most relevant memories every turn and can search for more.
   ===================================================================== */
const MEM={cards:[],byId:new Map(),df:new Map(),avg:1,loaded:0,catalog:null,loading:null};
const MEM_STOP=new Set("the a an and or of to in on at for with by from is are be this that it as not no but if then than so do does into over under its his her their our your you we they he she i me my was were has have had will would can could should one two all any each very more most also just only out up down off about after before when where who what which how why like same other new old use used make made keep".split(" ").concat("في من على الى إلى عن مع هذا هذه ذلك تلك هو هي هم انا أنا انت إنت احنا اللي الي التي الذي كان كانت يكون بس او أو و ثم لما اذا إذا كل بعد قبل عند شو ليش كيف وين هاد هاي هسا".split(" ")));
function memTok(s){
  return String(s||"").toLowerCase()
    .replace(/[ً-ٰٟـ]/g,"").replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي")
    .split(/[^\p{L}\p{N}]+/u).filter(w=>w.length>1&&!MEM_STOP.has(w));
}
async function memLoad(force){
  await rlStoreInit(); const db=RLS.db; if(!db) return MEM;
  if(MEM.loading) return MEM.loading;
  if(!force&&MEM.loaded&&Date.now()-MEM.loaded<10*60000) return MEM;
  MEM.loading=(async()=>{
    try{
      const cat=await db.doc("memmeta/catalog").get();
      if(!cat.exists){ MEM.catalog=null; MEM.cards=[]; MEM.loaded=Date.now(); return MEM; }
      MEM.catalog=JSON.parse(JSON.stringify(cat.data()));
      const [voc,...shards]=await Promise.all([db.doc("memmeta/vocab").get().then(s=>s.exists?JSON.parse(JSON.stringify(s.data())):null).catch(()=>null),...(MEM.catalog.shards||[]).map(id=>db.doc("mem/"+id).get().then(s=>s.exists?JSON.parse(JSON.stringify(s.data())):null).catch(()=>null))]);
      MEM.vocab=voc?.topics||{};
      const cards=[]; for(const s of shards) for(const c of (s?.cards||[])) if(c&&c.id&&c.t) cards.push(c);
      Object.assign(MEM,memIndex(cards)); MEM.loaded=Date.now();
    }catch(e){ log("✕","memory load",{code:e?.code}); }
    return MEM;
  })();
  try{ return await MEM.loading; } finally{ MEM.loading=null; }
}
/* the search index: words of the text and context, plus each topic's bilingual terms (so باب finds "door") */
function memIndex(cards){
  const topTok=new Map(); const tt=t=>{ if(!topTok.has(t)){ const x=MEM.vocab?.[t]; topTok.set(t,memTok([t,...(x?.en||[]),...(x?.ar||[])].join(" "))); } return topTok.get(t); };
  const df=new Map(); let total=0;
  for(const c of cards){ const tags=[...(c.tp||[]).flatMap(tt),...memTok([(c.kw||[]).join(" "),(c.en||[]).join(" ")].join(" "))];
    c._tok=[...memTok(c.t+" "+(c.cx||"")),...tags]; c._tags=new Set(tags); total+=c._tok.length; for(const w of new Set(c._tok)) df.set(w,(df.get(w)||0)+1); }
  return {cards,byId:new Map(cards.map(c=>[c.id,c])),df,avg:cards.length?total/cards.length:1};
}
/* relevance: BM25 on the card text, plus tag hits, stage fit, evidence, team lessons; superseded cards rank lower */
function memSearch(query,{stage,limit=20,kinds,expand=true}={}){
  const q=[...new Set(memTok(query))]; const N=MEM.cards.length||1, k1=1.2, b=0.75;
  if(!MEM.cards.length) return [];
  const idf=w=>Math.log(1+(N-(MEM.df.get(w)||0)+.5)/((MEM.df.get(w)||0)+.5));
  const scored=[];
  for(const c of MEM.cards){
    if(kinds&&!kinds.includes(c.k)) continue;
    let rel=0;
    if(q.length){ const tf=new Map(); for(const w of c._tok) tf.set(w,(tf.get(w)||0)+1);
      for(const w of q){ const f=tf.get(w); if(f) rel+=idf(w)*(f*(k1+1))/(f+k1*(1-b+b*c._tok.length/MEM.avg)); if(c._tags.has(w)) rel+=1.2; }
      if(rel===0) continue; }
    /* relevance first; then what the team confirmed, what fits this stage, the team's own lessons */
    let s=rel*(1+0.15*Math.log(1+(+c.ev||1)))+(+c.w||2)*0.15;
    if(stage&&(c.st||[]).some(x=>x===stage||x==="any")) s+=q.length?0.8:2;
    if(c.k==="lesson") s+=q.length?0.6:1.2;
    if(c.sup) s-=3;
    if(s>0.3) scored.push([s,c]);
  }
  scored.sort((x,y)=>y[0]-x[0]);
  const top=scored.slice(0,limit).map(([s,c])=>({c,score:+s.toFixed(2)}));
  if(expand){ const seen=new Set(top.map(x=>x.c.id)); const extra=[];
    for(const {c} of top.slice(0,Math.min(8,top.length))) for(const l of (c.ln||[])){ const n=MEM.byId.get(l.id); if(n&&!seen.has(n.id)&&extra.length<Math.ceil(limit/3)){ seen.add(n.id); extra.push({c:n,score:0,via:{from:c.id,r:l.r}}); } }
    top.push(...extra); }
  return top;
}
const memLine=({c,via},full)=>`[${c.id} · ${c.k}${(+c.ev||1)>1?` · ×${c.ev}`:""}${c.at?` · ${new Date(c.at).toLocaleDateString("en-CA")}`:""}${via?` · linked (${via.r}) to ${via.from}`:""}${c.sup?` · superseded by ${c.sup}`:""}] ${c.cx?`(${c.cx}) `:""}${!full&&c.t.length>1600?c.t.slice(0,1100)+` … [${c.t.length.toLocaleString()} characters — open_memory ${c.id} reads it in full]`:c.t}`;
/* short-term memory: today's signals and lessons not yet consolidated into cards */
async function memShortTerm(){
  if(!RLS.db) return [];
  try{ const since=+(MEM.catalog?.consolidatedAt||0);
    const f=await RLS.db.collection("feedback").orderBy("at","desc").limit(60).get();
    return f.docs.map(d=>d.data()).filter(x=>x&&+x.at>since).filter(x=>!x.implicit||["edited_by_user","revised","edit_requested","asked_for_more","chosen","advisor_applied","advisor_skipped","gemini_review"].includes(x.signal)).slice(0,25); }
  catch{ return []; }
}
/* what the Director gets on every turn: the most relevant long-term memories + today's short-term memory */
async function memContext(query,stage,{limit=36}={}){
  await memLoad();
  const hits=memSearch(query,{stage,limit});
  const lessons=memSearch(query,{stage,limit:12,kinds:["lesson"],expand:false}).filter(x=>!hits.some(h=>h.c.id===x.c.id));
  const st=await memShortTerm();
  const used=[...hits,...lessons].map(x=>x.c.id);
  const txt=MEM.cards.length?`### LONG-TERM MEMORY — ${MEM.cards.length} memories kept word for word; here are the ${used.length} most relevant to this moment (team lessons win over general knowledge; a superseded memory yields to the one that replaced it)
${[...hits,...lessons].map(x=>memLine(x)).join("\n")}`:"";
  const sTxt=st.length?`### SHORT-TERM MEMORY — today's team signals, not yet consolidated
${st.map(x=>`- ${x.kind}${x.signal?`/${x.signal}`:""}${x.verdict===1?" 👍":x.verdict===-1?" 👎":""}: ${String(x.note||"").slice(0,300)}${x.before?` | BEFORE: ${String(x.before).slice(0,200)} | AFTER: ${String(x.after||"").slice(0,200)}`:""}${x.item&&!x.before?` | on: ${String(x.item).slice(0,160)}`:""}`).join("\n")}`:"";
  return {text:[txt,sTxt].filter(Boolean).join("\n\n"),ids:used,count:MEM.cards.length};
}
/* tools the Director can call to search deeper before it decides */
function memTools(onUse){
  return [
    {name:"search_memory",description:"Search the Director's long-term memory (everything the team and the research ever taught it, word for word). Use English or Arabic keywords; add a stage to focus. Returns the most relevant memory cards with ids.",
      inputSchema:{type:"object",properties:{query:{type:"string"},stage:{type:"string",enum:["idea","script","characters","locations","directing","render","any"]},kind:{type:"string",enum:["lesson","insight","technique","fact","trend","rule","example","mistake","research","any"]},limit:{type:"number"}},required:["query"]},
      execute:async({query,stage,kind,limit})=>{ await memLoad(); const r=memSearch(String(query||""),{stage:stage&&stage!=="any"?stage:null,kinds:kind&&kind!=="any"?[kind]:null,limit:Math.max(3,Math.min(25,+limit||12))}); onUse?.(r.map(x=>x.c.id),String(query||"")); return r.length?r.map(x=>memLine(x)).join("\n"):"No memory matches. Try other words."; }},
    {name:"open_memory",description:"Open one memory card by id with everything linked to it (the graph neighbours) and where it came from.",
      inputSchema:{type:"object",properties:{id:{type:"string"}},required:["id"]},
      execute:async({id})=>{ await memLoad(); const c=MEM.byId.get(String(id)); if(!c) return "Not found."; onUse?.([c.id]);
        const links=(c.ln||[]).map(l=>({r:l.r,c:MEM.byId.get(l.id)})).filter(x=>x.c);
        const back=MEM.cards.filter(x=>(x.ln||[]).some(l=>l.id===c.id)).slice(0,10);
        return `${memLine({c},true)}\nTopics: ${(c.tp||[]).join(", ")} | stages: ${(c.st||[]).join(", ")} | sources: ${trimJSON(c.src||[],600)}\nLINKS:\n${links.map(x=>`(${x.r}) ${memLine({c:x.c})}`).join("\n")||"none"}\nLINKED FROM:\n${back.map(x=>memLine({c:x})).join("\n")||"none"}`; }}];
}
/* read-only handle for checking recall from the browser console */
try{ Object.defineProperty(window,"baeMemory",{value:Object.freeze({search:(q,o)=>memSearch(String(q||""),o||{}).map(x=>({id:x.c.id,kind:x.c.k,score:x.score,text:x.c.t,via:x.via})),stats:()=>({cards:MEM.cards.length,shards:MEM.catalog?.shards?.length||0}),_bench:(n)=>{ const base=MEM.cards; if(!base.length) return null; const big=[]; for(let i=0;i<n;i++){ const b=base[i%base.length]; big.push({...b,id:"x"+i,t:b.t+" v"+i,ln:[]}); } const keep={cards:MEM.cards,byId:MEM.byId,df:MEM.df,avg:MEM.avg}; const t0=performance.now(); const ix=memIndex(big); const t1=performance.now(); Object.assign(MEM,ix); const t2=performance.now(); memSearch("door inside outside باب",{stage:"directing",limit:36}); const t3=performance.now(); Object.assign(MEM,keep); return {cards:n,indexMs:Math.round(t1-t0),searchMs:Math.round(t3-t2)}; }})}); }catch{}
async function rlMemFor(query,stage,limit=36){ try{ return await memContext(query,stage,{limit}); }catch(e){ log("✕","memory recall",{code:e?.code}); return {text:"",ids:[],count:0}; } }
/* what the Director reads before every answer — nothing is cut: the core knowledge in full, the assistant directors' full notes,
   the team's lessons in full, the memories recalled for THIS moment, today's short-term memory and this morning's research */
/* The brain is big, so each moment loads only the shelves it needs; the rest stay one tool call away (studio_read brain). */
const BR_WHEN={masters:["idea","script"],jordan_ads:["idea","script"],egypt_ads:["idea","script"],
  templates:["characters","locations","directing"],seedream55:[],seedance25:[],
  hf_seedance_writer:["directing"],hf_acting_director:["directing","script"],cinematography:["directing"],ai_video_rules:["directing","characters","locations"],adil_workflow:["directing"],directing_workflow:["directing"]};
function brPick(mode){ if(!mode) return {use:BR.sections,skip:[]};
  const use=[],skip=[]; for(const s of BR.sections){ const w=Array.isArray(s.stages)&&s.stages.length?s.stages:BR_WHEN[s.id]; (!w||w.includes(mode)||s.id==="lessons"?use:skip).push(s); } return {use,skip}; }
function brText(memText,mode){
  if(!BR.sections.length&&!BR.research.length&&!memText) return "";
  const {use,skip}=brPick(mode);
  const lessons=use.find(s=>s.id==="lessons"), rest=use.filter(s=>s.id!=="lessons");
  const R=BR.research[0];
  return `DIRECTOR'S BRAIN — the team's shared memory. Read ALL of it before you decide: the core knowledge, the team's lessons, the long-term memories recalled for this moment, today's short-term memory and this morning's research. Where the team's lessons or memories disagree with general knowledge, the team wins; a newer memory that supersedes an older one wins.
${rest.map(s=>`### ${s.title}\n${s.text||""}`).join("\n\n")}
${BR.advisors.length?`### ASSISTANT DIRECTORS — five specialists who research every morning and advise you. Consult them; pass on their best note when it matters.\n${BR.advisors.map(x=>`[${x.id}] ${x.name} — ${x.role}\n${x.notes||""}`).join("\n\n")}`:""}
${lessons?`### ${lessons.title}\n${lessons.text||""}`:""}
${memText||""}
${R?`### This morning's research (${R.date})\n${R.text||""}`:""}
${skip.length?`### MORE SHELVES IN THE BRAIN (not loaded now — open one with studio_read section "brain", arg = its id, when the task needs it): ${skip.map(s=>`${s.id} = ${s.title}`).join(" · ")}`:""}`;
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
/* ---------- the memory, browsable: search, open a memory, follow its links ---------- */
const BRM={q:"",k:""};
const MEM_KINDS=["lesson","mistake","rule","technique","insight","fact","trend","example","research","advisor"];
function brMemHTML(){
  const n=MEM.cards.length, cat=MEM.catalog||{};
  const topics=Object.entries(cat.topics||{}).sort((a,b)=>b[1]-a[1]).slice(0,30);
  return `<section class="rl-card br-mem" id="brMem"><div class="rl-ihead"><b>Search the memory</b></div>
   <form class="br-memform" id="brMemSearch"><input class="rl-field" name="q" dir="auto" value="${esc(BRM.q)}" placeholder="Ramadan, Seedance, باب…" aria-label="Search the memory"><select class="rl-field" name="k" aria-label="Kind"><option value="">All kinds</option>${MEM_KINDS.map(k=>`<option${BRM.k===k?" selected":""}>${k}</option>`).join("")}</select><button class="btn primary small" type="submit">Search</button></form>
  ${topics.length?`<div class="br-topics">${topics.slice(0,8).map(([t,c])=>`<button type="button" class="br-topic" data-memq="${esc(t)}">${esc(t)} <span>${c}</span></button>`).join("")}</div>`:""}
  <div id="brMemRes" class="br-memres">${n?"":`<p class="muted">The memory is being prepared.</p>`}</div></section>`;
}
function brMemCard(c){ return `<button type="button" class="br-mcard" data-memopen="${esc(c.id)}"><span class="k">${esc(c.k)}${(+c.ev||1)>1?` · ×${c.ev}`:""}${c.sup?" · replaced":""}</span>${c.cx?`<span class="t12 muted">${esc(c.cx)}</span>`:""}<span class="t" dir="auto">${esc(c.t.length>320?c.t.slice(0,320)+"…":c.t)}</span><span class="t12 muted">${(c.tp||[]).slice(0,4).map(esc).join(" · ")}${c.at?` · ${new Date(c.at).toLocaleDateString("en-CA")}`:""}</span></button>`; }
function brMemSearchShow(q,k){
  BRM.q=q; BRM.k=k||""; const box=$("brMemRes"); if(!box) return;
  if(!q.trim()&&!k){ box.innerHTML=""; return; }
  const r=memSearch(q,{kinds:k?[k]:null,limit:30,expand:false});
  box.innerHTML=r.length?`<p class="t12 muted">${r.length} memories${q?` for “${esc(q)}”`:""}${k?` · ${esc(k)}`:""}</p>${r.map(x=>brMemCard(x.c)).join("")}`:`<p class="muted">Nothing yet for “${esc(q)}”.</p>`;
}
const MEM_REL={supports:"var(--teal-dark)",contradicts:"var(--burgundy)",supersedes:"var(--orange)",example:"var(--orange-med)",related:"var(--stone)"};
function brGraph(c,nb){
  const W=640,H=300,cx=W/2,cy=H/2, short=t=>{ t=String(t||""); return t.length>30?t.slice(0,29)+"…":t; };
  const pts=nb.map((x,i)=>{ const a=-Math.PI/2+i*2*Math.PI/nb.length; return {...x,x:cx+Math.cos(a)*250,y:cy+Math.sin(a)*112}; });
  return `<svg class="br-graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="This memory and the memories linked to it">
  ${pts.map(p=>`<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="${MEM_REL[p.r]||MEM_REL.related}" stroke-width="1.5"${p.back?' stroke-dasharray="4 4"':""}/>`).join("")}
  <circle cx="${cx}" cy="${cy}" r="12" fill="var(--orange)"/><text x="${cx}" y="${cy+30}" text-anchor="middle" class="c">${esc(short(c.t))}</text>
  ${pts.map(p=>`<g class="n" data-memopen="${esc(p.c.id)}" tabindex="0" role="button"><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="18" fill="transparent"/><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="7" fill="${MEM_REL[p.r]||MEM_REL.related}"/><text x="${p.x.toFixed(1)}" y="${(p.y+(p.y<cy?-12:20)).toFixed(1)}" text-anchor="middle">${esc(short(p.c.t))}</text></g>`).join("")}</svg>
  <p class="t12 muted br-legend">${Object.entries(MEM_REL).map(([r,col])=>`<span><i style="background:${col}"></i>${r}</span>`).join("")}<span>dashed = links pointing here</span></p>`;
}
function brMemOpen(id){
  const c=MEM.byId.get(id), box=$("brMemRes"); if(!c||!box) return;
  const out=(c.ln||[]).map(l=>({r:l.r,c:MEM.byId.get(l.id)})).filter(x=>x.c);
  const inn=MEM.cards.filter(x=>x!==c&&(x.ln||[]).some(l=>l.id===c.id)&&!out.some(o=>o.c===x)).map(x=>({r:(x.ln.find(l=>l.id===c.id)||{}).r||"related",c:x,back:true}));
  const nb=[...out,...inn].slice(0,12);
  const src=(c.src||[]).map(x=>{ const ref=String(x.ref||""); return [x.type,/^https?:\/\//.test(ref)?`<a href="${esc(ref)}" target="_blank" rel="noopener">${esc(x.title||ref.replace(/^https?:\/\//,"").slice(0,48))}</a>`:esc(ref),esc(x.date||"")].filter(Boolean).join(" "); }).join(" · ");
  box.innerHTML=`<div class="br-mdetail"><div class="rl-btns"><button class="a-btn" type="button" data-memback>← Back</button></div>
   <div class="br-mfull"><span class="k">${esc(c.k)}${(+c.ev||1)>1?` · confirmed ${c.ev}×`:""}${c.sup?" · replaced by a newer memory":""}</span><p dir="auto">${esc(c.t)}</p>
   <span class="t12 muted">${(c.tp||[]).map(esc).join(" · ")}${(c.st||[]).length?` · stages: ${(c.st||[]).map(esc).join(", ")}`:""}${c.at?` · ${new Date(c.at).toLocaleDateString("en-CA")}`:""}</span>${src?`<span class="t12 muted">From: ${src}</span>`:""}</div>
   ${nb.length?brGraph(c,nb):`<p class="t12 muted">No links yet — each night new memories are linked to the ones they support, extend or replace.</p>`}
   ${nb.map(x=>`<div class="br-mlink"><span class="r" style="color:${MEM_REL[x.r]||"inherit"}">${esc(x.r)}${x.back?" (to this)":""}</span>${brMemCard(x.c)}</div>`).join("")}</div>`;
  box.scrollIntoView?.({block:"nearest"});
}
/* ---------- Talk to the Director: a private chat that answers from the brain itself ---------- */
const BRC={msgs:[],busy:false,live:"",abort:null,loaded:false};
const BRC_ASK=["What did you learn lately?","What are you still weak at?","How would you direct a Ramadan reel?","Where are you heading next?"];
const brcKey=()=>"bae_brain_chat_"+(RLS.uid||"me");
function brcLoad(){ if(BRC.loaded) return; BRC.loaded=true; try{ const m=JSON.parse(localStorage.getItem(brcKey())||"[]"); if(Array.isArray(m)) BRC.msgs=m.slice(-40); }catch{} }
function brcSave(){ try{ localStorage.setItem(brcKey(),JSON.stringify(BRC.msgs.slice(-40))); }catch{} }
function brcSelf(){
  const fb=BR.feedback||[], cat=MEM.catalog||{}, kinds={}; for(const c of MEM.cards) kinds[c.k]=(kinds[c.k]||0)+1;
  const newest=[...MEM.cards].filter(c=>c.at).sort((x,y)=>y.at-x.at).slice(0,14);
  const topics=Object.entries(cat.topics||{}).sort((x,y)=>y[1]-x[1]).slice(0,24).map(([t,n])=>`${t} (${n})`).join(", ");
  return `YOUR STATE TODAY
- Long-term memories: ${MEM.cards.length} (${Object.entries(kinds).map(([k,n])=>`${k} ${n}`).join(", ")||"none yet"})
- Topics you know most about: ${topics||"none yet"}
- Days of morning research: ${Math.max(+cat.researchDays||0,BR.research.length)}
- Team notes: ${fb.length} recent · thumbs up ${fb.filter(x=>!x.implicit&&x.verdict===1).length} · thumbs down ${fb.filter(x=>!x.implicit&&x.verdict===-1).length} · lessons taught ${fb.filter(x=>x.kind==="lesson").length}
- Knowledge shelves: ${BR.sections.map(s=>`${s.id} = ${s.title}${s.updatedAt?` (updated ${rlAgo(s.updatedAt)})`:""}`).join(" · ")}
- How you grow: every morning five assistant directors research and write you notes; every night new memories are saved and linked to older ones; the team teaches you rules and rates your work.
NEWEST THINGS YOU LEARNED
${newest.map(c=>`- [${c.k} · ${new Date(c.at).toLocaleDateString("en-CA")}] ${String(c.t).slice(0,260)}`).join("\n")||"- nothing dated yet"}
RECENT TEAM NOTES
${fb.slice(0,12).map(x=>`- ${x.kind==="lesson"?"lesson":x.verdict===1?"liked":x.verdict===-1?"disliked":"signal"} ${x.kind||""}${x.note?`: ${String(x.note).slice(0,200)}`:""}`).join("\n")||"- none yet"}`; }
function brcPrompt(mem){
  const lessons=BR.sections.find(s=>s.id==="lessons"), R=BR.research[0];
  return `You are the Director of BAE Studio: the film director who makes Bank al Etihad's reels in Jordan. A teammate is talking to you privately, outside any project. They want to know how you think, what you have learned, where you are weak, and what you would do next. Talk as yourself, in the first person.
RULES
- Answer from YOUR BRAIN below. When you say you learned something, it must be in there. If the brain has nothing on a point, say so plainly, then give your own professional view and mark it as your view.
- Be honest about gaps and weak spots; never flatter yourself.
- Reply in the language the teammate writes in (Jordanian Arabic if they write Arabic). Short and clear: a few short paragraphs or a short list. Plain text, no markdown symbols.
- You have two tools: search_memory (find memories on a topic) and read_shelf (open one knowledge shelf in full). Use them when the question needs detail you do not see below.
- Nothing is generated here and nothing costs credits. This is only a conversation.
${brcSelf()}
YOUR KNOWLEDGE SHELVES (opening lines; open a shelf with read_shelf for the rest)
${BR.sections.filter(s=>s.id!=="lessons").map(s=>`### ${s.id} — ${s.title}\n${String(s.text||"").slice(0,1400)}`).join("\n\n")}
${lessons?`### LESSONS FROM THE TEAM\n${String(lessons.text||"").slice(0,9000)}`:""}
${BR.advisors.length?`### YOUR ASSISTANT DIRECTORS' LATEST NOTES\n${BR.advisors.map(x=>`[${x.name||x.id}] ${String(x.notes||"").slice(0,1200)}`).join("\n\n")}`:""}
${R?`### THIS MORNING'S RESEARCH (${R.date})\n${String(R.text||"").slice(0,5000)}`:""}
${mem||""}`; }
const brcTools=()=>[
  {name:"search_memory",description:"Search your long-term memory. Returns up to 15 memories.",inputSchema:{type:"object",properties:{query:{type:"string"}},required:["query"]},execute:async i=>({memories:memSearch(String(i?.query||""),{limit:15}).map(x=>({kind:x.c.k,date:x.c.at?new Date(x.c.at).toLocaleDateString("en-CA"):"",confirmed:+x.c.ev||1,text:String(x.c.t).slice(0,500)}))})},
  {name:"read_shelf",description:"Open one knowledge shelf in full by its id.",inputSchema:{type:"object",properties:{id:{type:"string"}},required:["id"]},execute:async i=>{ const s=BR.sections.find(x=>x.id===String(i?.id||"")); if(!s) throw new Error("No shelf with that id. Ids: "+BR.sections.map(x=>x.id).join(", ")); return {title:s.title,text:String(s.text||"").slice(0,24000)}; }}];
function brcHTML(){
  return `<section class="rl-card br-chat" id="brChat"><div class="rl-ihead"><b>Talk to the Director</b>${BRC.msgs.length?`<button type="button" class="a-btn" data-brcclear>Clear</button>`:""}</div>
  <div class="br-chatlog" id="brcLog" aria-live="polite">${brcLogHTML()}</div>
  <form class="br-chatform" id="brcForm"><textarea class="rl-field" name="q" rows="1" dir="auto" placeholder="Ask the Director…" aria-label="Message the Director"></textarea><button class="btn primary small" type="submit">${BRC.busy?"Stop":"Send"}</button></form></section>`; }
function brcLogHTML(){
  if(!BRC.msgs.length&&!BRC.busy) return `<p class="t12 muted">He answers from his own memory, research and the team's lessons. Free — nothing is generated.</p><div class="br-topics">${BRC_ASK.map(q=>`<button type="button" class="br-topic" data-brcq="${esc(q)}">${esc(q)}</button>`).join("")}</div>`;
  return BRC.msgs.map(m=>`<div class="br-msg ${m.role==="user"?"me":"dir"}" dir="auto">${m.role==="user"?"":`<span class="t12 muted">Director</span>`}<p>${esc(m.content)}</p></div>`).join("")+(BRC.busy?`<div class="br-msg dir" dir="auto"><span class="t12 muted">Director</span><p id="brcLive">${BRC.live?esc(BRC.live):"Thinking…"}</p></div>`:""); }
function brcDraw(){ const s=$("brChat"); if(!s) return; const q=s.querySelector("textarea")?.value||""; s.outerHTML=brcHTML(); const t=$("brChat")?.querySelector("textarea"); if(t) t.value=q; const l=$("brcLog"); if(l) l.scrollTop=l.scrollHeight; if(typeof uxT==="function") uxT($("brChat")); }
async function brcSend(q){
  q=String(q||"").trim(); if(!q||BRC.busy) return;
  if(!sample){ BRC.msgs.push({role:"user",content:q},{role:"assistant",content:"The chat needs Claude, which isn't connected in this view."}); brcDraw(); return; }
  BRC.msgs.push({role:"user",content:q}); BRC.busy=true; BRC.live=""; BRC.abort=new AbortController(); brcDraw(); const ta=$("brChat")?.querySelector("textarea"); if(ta) ta.value="";
  let text="";
  try{ const mem=(await rlMemFor(BRC.msgs.filter(m=>m.role==="user").slice(-2).map(m=>m.content).join(" "),null,40)).text;
    const hist=BRC.msgs.slice(-12).map(m=>({role:m.role,content:m.content})); hist[0].role==="assistant"&&hist.shift();
    hist[0]={role:"user",content:brcPrompt(mem)+"\n\n--- THE CONVERSATION STARTS ---\n"+hist[0].content};
    try{ const r=await sample(hist,{cache:false,signal:BRC.abort.signal,tools:brcTools(),onText:({text:t})=>{ BRC.live=t; const el=$("brcLive"); if(el){ el.textContent=t; const l=$("brcLog"); if(l) l.scrollTop=l.scrollHeight; } }}); text=String(r?.text||BRC.live||"").trim(); }
    catch(e){ if(e?.code==="cancelled"||e?.name==="AbortError"||BRC.abort.signal.aborted){ text=String(e?.text||BRC.live||"").trim(); }
      else if(typeof e?.text==="string"&&e.text.trim()) text=e.text.trim();
      else { const r=await rlAsk(hist.map(m=>(m.role==="user"?"TEAMMATE: ":"DIRECTOR: ")+m.content).join("\n\n")+'\n\nReply as the Director. Return JSON {"reply":"..."}',{cache:false}); text=String(r?.reply||"").trim(); } }
  }catch(e){ log("✕","brain chat",{code:e?.code}); text=e?.code==="rate_limited"?"Too many questions in a row. Give me a minute and ask again.":e?.code==="not_granted"?"The chat needs permission to use Claude on this page.":"I couldn't answer just now. Ask me again."; }
  if(text) BRC.msgs.push({role:"assistant",content:text}); BRC.busy=false; BRC.live=""; brcSave(); brcDraw();
}
function rlShowBrain(){
  $("rlLib").hidden=true; $("rlProjView").hidden=true; $("rlBrain").hidden=false; $("reels").dataset.mode="brain"; $("reels").scrollTop=0;
  const box=$("rlBrainBody"); box.innerHTML=`<p class="muted">Loading the Director's memory…</p>`;
  Promise.all([brLoad(true),brLoadFeedback(),memLoad(true)]).then(()=>{
    if(!RLS.db){ box.innerHTML=rlEmpty("The shared memory needs the page's database, which isn't available in this view. Open the page in claude.ai."); return; }
    const fb=BR.feedback, up=fb.filter(x=>!x.implicit&&x.verdict===1).length, down=fb.filter(x=>!x.implicit&&x.verdict===-1).length, taught=fb.filter(x=>x.kind==="lesson").length, sig=fb.filter(x=>x.implicit).length;
    box.innerHTML=`
    <div class="br-stats"><div><b>${MEM.cards.length.toLocaleString()}</b><span>Memories</span></div><div><b>${Math.max(+MEM.catalog?.researchDays||0,BR.research.length)}</b><span>Days of research</span></div><div><b>${fb.length}</b><span>Team notes</span></div></div>
    ${(brcLoad(),brcHTML())}
    <form class="rl-card br-teach" id="brTeach"><div class="rl-ihead"><b>Teach the Director</b></div><textarea class="rl-field" name="t" rows="2" dir="auto" placeholder="A rule, an insight, a line people really say…"></textarea><div class="rl-btns"><button class="btn primary small" type="submit">Teach</button><span class="t12 muted" id="brTeachMsg"></span></div></form>
    ${brMemHTML()}
    ${BR.research.length?`<details class="rl-card br-sec"><summary><b>Today's research</b><span class="t12 muted">${esc(BR.research[0].date||"")}</span></summary><div class="br-text" dir="auto">${esc(BR.research[0].text||"")}</div>${(BR.research[0].sources||[]).length?`<p class="t12 muted">Sources: ${(BR.research[0].sources||[]).slice(0,8).map(u=>`<a href="${esc(u.url||u)}" target="_blank" rel="noopener">${esc(u.title||u.url||u)}</a>`).join(" · ")}</p>`:""}</details>`:""}
    <details class="rl-card br-sec"><summary><b>Assistant directors</b><span class="t12 muted">5 specialists</span></summary><div class="br-advs">${["trend","story","dp","performance","tech"].map(id=>{ const A=rlAdv(id); return `<div class="br-adv"><div class="ih"><span class="ic" aria-hidden="true">${esc(A.icon||"•")}</span><b>${esc(A.name||id)}</b></div><div class="br-text" dir="auto">${esc(A.notes||"Research arrives tomorrow morning.")}</div><span class="t12 muted">${A.updatedAt?"Updated "+rlAgo(A.updatedAt):""}</span></div>`; }).join("")}</div></details>
    <details class="rl-card br-sec br-know"><summary><b>What the Director knows</b><span class="t12 muted">${BR.sections.length} topics</span></summary>
    ${BR.sections.map(s=>`<details class="br-sub"><summary><b>${esc(s.title||s.id)}</b><span class="t12 muted">${s.updatedAt?"Updated "+rlAgo(s.updatedAt):""}</span></summary>
      <div class="br-text" dir="auto" data-sec="${esc(s.id)}">${esc(s.text||"")}</div>
      ${BR.canEdit?`<div class="rl-btns"><button class="a-btn" type="button" data-bredit="${esc(s.id)}">Edit</button></div>`:""}</details>`).join("")}</details>
    ${fb.length?`<details class="rl-card br-sec"><summary><b>Recent team notes</b><span class="t12 muted">${Math.min(fb.length,15)}</span></summary>${fb.slice(0,15).map(x=>`<div class="br-fb" dir="auto"><span>${x.kind==="lesson"?"✎":x.implicit?"·":x.verdict===1?"👍":"👎"}</span><div><b>${esc(x.kind==="lesson"?"Lesson":x.kind)}${x.signal?` · ${esc(String(x.signal).replace(/_/g," "))}`:""}</b>${x.note?` — ${esc(x.note)}`:""}<br><span class="t12 muted">${esc(x.project?.title||"")}${x.by&&x.by===RLS.uid?" · you":""} · ${rlAgo(x.at)}</span></div></div>`).join("")}</details>`:""}`;
  });
}

/* ---------- staying alive: retry dropped connections, keep the screen awake, resume when the user comes back ---------- */
const rlTransient=e=>/upstream_error|unavailable|network|timeout|cancel|connection|failed to fetch|load failed|aborted/i.test(((e?.code)||"")+" "+((e?.message)||""));
/* a long answer can arrive cut off or wrapped in prose: recover the JSON instead of failing */
function rlLooseJSON(t){ t=String(t||"").replace(/```(?:json)?/gi,""); const i=t.indexOf("{"); if(i<0) return null; t=t.slice(i);
  try{ return JSON.parse(t.slice(0,t.lastIndexOf("}")+1)); }catch{}
  /* close a truncated object: walk it, track open strings/brackets, cut at the last complete value */
  let st=[],inS=false,esc=false,lastOK=-1;
  for(let k=0;k<t.length;k++){ const c=t[k];
    if(inS){ if(esc) esc=false; else if(c==="\\") esc=true; else if(c==='"') inS=false; continue; }
    if(c==='"') inS=true; else if(c==="{"||c==="[") st.push(c==="{"?"}":"]"); else if(c==="}"||c==="]"){ st.pop(); lastOK=k; if(!st.length) break; } else if(c===",") lastOK=k-1; }
  for(let cut=lastOK;cut>0;cut=t.lastIndexOf(",",cut-1)-1){ const head=t.slice(0,cut+1); let st2=[],inS2=false,e2=false;
    for(const c of head){ if(inS2){ if(e2) e2=false; else if(c==="\\") e2=true; else if(c==='"') inS2=false; continue; } if(c==='"') inS2=true; else if(c==="{"||c==="[") st2.push(c==="{"?"}":"]"); else if(c==="}"||c==="]") st2.pop(); }
    if(inS2) continue; try{ const o=JSON.parse(head+st2.reverse().join("")); if(o&&typeof o==="object") return o; }catch{} if(cut<2) break; }
  const m=t.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)("?)/); if(m) try{ return {reply:JSON.parse('"'+m[1].replace(/\\$/,"")+'"')+(m[2]?"":"…")}; }catch{}
  return null; }
async function rlAsk(prompt,opts){
  for(let i=0;;i++){ try{ return await sample.json(prompt,opts); }
    catch(e){ if(i<2&&rlTransient(e)&&e?.code!=="cancelled"){ await new Promise(r=>setTimeout(r,i?6000:2500)); if(document.hidden) await new Promise(r=>{ const f=()=>{ if(!document.hidden){ document.removeEventListener("visibilitychange",f); r(); } }; document.addEventListener("visibilitychange",f); }); continue; } throw e; } }
}
let rlWakeN=0, rlWakeLock=null;
async function rlWake(on){ rlWakeN=Math.max(0,rlWakeN+(on?1:-1));
  try{ if(rlWakeN>0&&!rlWakeLock&&navigator.wakeLock&&!document.hidden){ rlWakeLock=await navigator.wakeLock.request("screen"); rlWakeLock.addEventListener?.("release",()=>{ rlWakeLock=null; }); }
    else if(rlWakeN===0&&rlWakeLock){ const l=rlWakeLock; rlWakeLock=null; await l.release(); } }catch{} }
const rlJob=async(fn)=>{ rlWake(true); try{ return await fn(); } finally{ rlWake(false); } };

/* ---------- Asset intake: images dropped in the chat are sorted into Cast / Locations / Props, uploaded at original quality ---------- */
const RL_BLOBS=new Map();   /* intake key -> original File (this session only) */
const rlNoImg=e=>!e.id&&!(e.lib&&e.fromLib)&&e.status!=="run";
const rlMissing=()=>rlEls().filter(rlNoImg);
async function rlIntake(imgs,text,small){
  const els=rlEls().map(e=>({handle:e.handle,kind:rlKind(e),name:e.name||"",has_image:!rlNoImg(e),description:String(e.description||"").slice(0,160)}));
  const out=await rlAsk(`You sort the images a user just dropped into the chat of a video-production studio (Bank al Etihad reels, Jordan). ${imgs.length} image${imgs.length>1?"s are":" is"} attached, numbered 1…${imgs.length} in order.
USER'S MESSAGE: ${text||"(no text — images only)"}
PRODUCTION ELEMENTS SO FAR (handle · kind · name · has_image · description): ${trimJSON(els,6000)}
For EACH image decide:
- "use": "asset" when it is a production asset = a CHARACTER (a person / character sheet / actor photo), a LOCATION (a place, interior or exterior, usually empty or wide) or a PROP (one object, product, document, vehicle, phone/app screen meant to appear in the film). "reference" when it is something to look at or discuss, not an element: a storyboard, a screenshot of this studio or an error, a mood board, a frame of a finished video, a brief, text.
- "kind": character | location | prop (for assets).
- "target": the handle of the EXISTING element this image is for, or null to create a new element. Rules, in this order: (1) an explicit mapping in the user's message always wins — "image 1 = Omar", "الأولى عمر والثانية الصالون", "1 char 2 location", names in the file order they describe; (2) otherwise match by what the image shows against the elements' names and descriptions, preferring elements with has_image=false; (3) if the user sends the images in the same order as the elements without an image of the right kind, use that order to break ties; (4) no good match → null (new element). Never give two images the same target.
- "name": a short natural name for a NEW element, in the user's language (e.g. "عمر — أبو يزن", "صالة الدفع", "ملف الفواتير"); for an existing target repeat its name.
- "slug": for a NEW element, 1–2 lowercase English words joined by "_" for its handle (e.g. "omar", "service_hall", "bills_folder").
- "note": one short line saying what the image shows.
Also "only_assets": true when the message only hands over assets (or has no text) and asks nothing else; false when the user also asks or instructs something the Director must answer.
Reply with ONLY JSON: {"items":[{"i":1,"use":"asset","kind":"character","target":"@char_x"|null,"name":"…","slug":"…","note":"…"}],"only_assets":true}`,{modelTier:"quick",cache:false,images:small});
  const items=(Array.isArray(out?.items)?out.items:[]).filter(x=>x&&imgs[+x.i-1]).map(x=>({i:+x.i,use:x.use==="asset"&&/^(character|location|prop)$/.test(x.kind)?"asset":"reference",kind:x.kind,target:x.target?String(x.target):null,name:String(x.name||"").slice(0,60),slug:String(x.slug||"").slice(0,24),note:String(x.note||"").slice(0,200)}));
  return {items,only:!!out?.only_assets};
}
function rlNewElement(kind,name,note,slug){
  const base=String(slug||name||"").normalize("NFKD").replace(/[^\x00-\x7F]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"").slice(0,20);
  const pre={character:"char",location:"loc",prop:"prop"}[kind]; const taken=h=>rlEls().some(e=>String(e.handle).toLowerCase()===h);
  let h=`@${pre}_${base||(rlEls().filter(e=>rlKind(e)===kind).length+1)}`; for(let k=2;taken(h);k++) h=`@${pre}_${base||"item"}${k}`;
  const e={tag:"@img"+(RL.nextTag++),handle:h,name:name||`${{character:"Character",location:"Location",prop:"Prop"}[kind]} ${rlEls().filter(x=>rlKind(x)===kind).length+1}`,role:"",description:note||"",prompt:"",lib:null};
  if(kind==="character") RL.characters.push(e); else { e.kind=kind==="prop"?"prop":"location"; RL.locations.push(e); }
  return e;
}
/* file the sorted images: each goes to its element and is uploaded untouched; returns the rows of the chat card */
function rlFileIntake(imgs,items,thumbs){
  const rows=[], jobs=[], used=new Set();
  for(const it of items){ const a=imgs[it.i-1]; const row={i:it.i,thumb:thumbs[it.i-1]||null,note:it.note,key:"k"+Date.now().toString(36)+it.i,w:a.w||0,h:a.h||0,bytes:a.blob.size};
    if(it.use!=="asset"){ row.ref=true; rows.push(row); continue; }
    let e=it.target&&rlElByTag(it.target); if(e&&(rlKind(e)!==it.kind||used.has(e.tag))) e=null;
    if(!e){ e=rlNewElement(it.kind,it.name,it.note,it.slug); row.isNew=true; }
    used.add(e.tag); row.tag=e.tag; row.prev=row.isNew?null:{id:e.id||null,fromUser:!!e.fromUser,lib:e.lib||null,fromLib:!!e.fromLib};
    RL_BLOBS.set(row.key,a.blob); rows.push(row); jobs.push([e.tag,a.blob]); }
  rlEnsureHandles(RL);
  /* uploads run in the background, two at a time, while the Director answers */
  const q=[...jobs]; const worker=async()=>{ while(q.length){ const [tag,blob]=q.shift(); await rlUseImage(tag,blob,{quiet:true}); rlRenderChat(); } };
  if(jobs.length){ if(!S.connected) connect(true).catch(()=>{}).finally(()=>{ worker(); worker(); }); else { worker(); worker(); } }
  for(const r of rows) if(r.tag) rlEvent(`The user gave their own image for ${rlElByTag(r.tag)?.handle} (${rlElByTag(r.tag)?.name||""})${r.isNew?" — a new element the studio created from it":""}.`);
  return rows;
}
const rlMP=r=>r.w&&r.h?`${r.w}×${r.h}`:"";
const rlSize=b=>b>1048576?(b/1048576).toFixed(1)+" MB":Math.max(1,Math.round(b/1024))+" KB";
function rlIntakeHTML(m,mi){
  if(!m.intake?.length) return "";
  const kinds={character:"Character",location:"Location",prop:"Prop"};
  const rows=m.intake.map((r,ri)=>{ const e=r.tag&&rlElByTag(r.tag);
    const st=r.ref?`<span class="st">Reference only — not filed</span>`:!e?`<span class="st">Removed</span>`:e.status==="run"?`<span class="st run">${esc(e._note||"Uploading…")}</span>`:e.status==="err"?`<span class="st bad">${esc(e.err||"Failed")}</span>`:e.id?`<span class="st ok">✓ Original quality${rlMP(r)?` · ${rlMP(r)}`:""}${r.bytes?` · ${rlSize(r.bytes)}`:""}</span>`:`<span class="st">Waiting…</span>`;
    const opts=[...rlEls().map(x=>`<option value="${esc(x.tag)}"${e&&x.tag===e.tag?" selected":""}>${esc(x.name||x.handle)} · ${kinds[rlKind(x)]}</option>`),`<option value="+character">＋ New character</option>`,`<option value="+location">＋ New location</option>`,`<option value="+prop">＋ New prop</option>`,`<option value="-"${r.ref||!e?" selected":""}>Don't use (reference only)</option>`].join("");
    return `<li>${r.thumb?`<img src="${r.thumb}" alt="">`:`<span class="ph"></span>`}<div class="tx"><b dir="auto"><span class="n">${r.i}</span>${e?`${esc(e.name||e.handle)} <span class="k">${kinds[rlKind(e)]}${r.isNew?" · new":""}</span>`:esc(r.note||"Image")}</b>${st}</div><select aria-label="Move image ${r.i}" data-intake="${mi}:${ri}"${e&&e.status==="run"?" disabled":""}>${opts}</select></li>`; }).join("");
  return `<div class="rl-intake"><div class="h"><b>Your images, sorted</b><span class="t12 muted">wrong place? move it</span></div><ul>${rows}</ul></div>`;
}
/* move an already-uploaded image to another element (no re-upload) */
async function rlIntakeMove(mi,ri,val){
  const m=RL.chat[mi], r=m?.intake?.[ri]; if(!r) return;
  const from=r.tag&&rlElByTag(r.tag); const id=from?.id||null; const blob=RL_BLOBS.get(r.key);
  if(from){ if(r.isNew){ RL.characters=RL.characters.filter(x=>x!==from); RL.locations=RL.locations.filter(x=>x!==from); }
    else Object.assign(from,{id:r.prev?.id||null,fromUser:!!r.prev?.fromUser,lib:r.prev?.lib||null,fromLib:!!r.prev?.fromLib,status:r.prev?.id?"ok":null,seen:null}); }
  r.tag=null; r.isNew=false; r.ref=false; r.prev=null;
  if(val==="-"){ r.ref=true; }
  else { let to=val.startsWith("+")?rlNewElement(val.slice(1),"",r.note):rlElByTag(val); if(!to) return;
    if(val.startsWith("+")){ r.isNew=true; rlEnsureHandles(RL); } else r.prev={id:to.id||null,fromUser:!!to.fromUser,lib:to.lib||null,fromLib:!!to.fromLib};
    r.tag=to.tag;
    if(id){ Object.assign(to,{id,status:"ok",stale:false,fromUser:true,lib:null,fromLib:false}); rlEvent(`The user moved their image to ${to.handle} (${to.name||""}).`);
      if(blob){ to.status="run"; to._live=true; to._note="Studying your image…"; rlRenderChat(); rlBoard(); try{ if(await rlStudyImage(to,blob)) to.seen=`${to.description}${to.wardrobe?` Wardrobe: ${to.wardrobe}`:""}${to.details?` Details: ${to.details}`:""}`; }catch{} to.status="ok"; delete to._live; delete to._note; } }
    else if(blob){ rlSave(); rlRenderChat(); await rlUseImage(to.tag,blob,{quiet:true}); } }
  rlSave(); rlRenderChat(); rlBoard();
}
/* "What do you already have?" — the checklist under the Director's reply when elements still need an image */
function rlKitHTML(m,mi){
  if(!m.kit||mi!==RL.chat.reduce((a,x,k)=>x.kit?k:a,-1)) return "";
  const all=rlEls(); if(!all.length) return "";
  const miss=all.filter(rlNoImg); const G=[["character","Characters"],["location","Locations"],["prop","Props"]];
  const cnt=G.map(([k,l])=>{ const n=all.filter(e=>rlKind(e)===k).length; return n?`${n} ${n>1?l.toLowerCase():l.toLowerCase().replace(/s$/,"")}`:""; }).filter(Boolean).join(" · ");
  const row=e=>{ const th=e.id?rlTGet(e.id):e.lib?rlTGet("lib:ch_"+String(e.lib).toLowerCase()):null; const busy=e.status==="run";
    return `<li>${th?`<img src="${th}" alt="">`:`<span class="ph" aria-hidden="true">${rlKind(e)==="character"?"☺":rlKind(e)==="prop"?"◆":"▦"}</span>`}<div class="tx"><b dir="auto">${esc(e.name||e.handle)}</b><span class="st${busy?" run":e.id?" ok":""}">${busy?esc(e._note||"Working…"):e.fromUser?"✓ Your image":e.fromLib?"✓ BAE library":e.id?"✓ Generated":"No image yet"}</span></div>${busy?"":`<label class="btn small">${e.id?"Replace":"Upload"}<input type="file" accept="image/*" hidden data-rl-own="${esc(e.tag)}"></label>`}</li>`; };
  return `<div class="rl-kit"><div class="h"><b>${miss.length?"Do you already have any of these?":"All set — every element has an image"}</b><span class="t12 muted">${cnt}</span></div>
    ${G.map(([k,l])=>{ const L=all.filter(e=>rlKind(e)===k); return L.length?`<div class="g">${l}</div><ul>${L.map(row).join("")}</ul>`:""; }).join("")}
    <div class="f"><label class="btn small primary">＋ Upload several — I'll sort them<input type="file" accept="image/*" multiple hidden data-rl-many="1"></label>${miss.filter(e=>e.prompt).length?`<button type="button" class="btn small" data-rl-genmiss="1">Generate the other ${miss.filter(e=>e.prompt).length} · Seedream 5.5</button>`:""}</div>
    <p class="t12 muted">Uploads keep their original quality. Drop them in any order, or write “image 1 = Omar, image 2 = the hall”.</p></div>`;
}
/* the reply appears while it is being written */
let RL_LIVE_T=0, RL_LIVE_TXT="";
function rlLive(raw){
  const m=String(raw||"").match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)/); if(!m) return;
  let t; try{ t=JSON.parse('"'+m[1].replace(/\\u[0-9a-fA-F]{0,3}$/,"").replace(/\\$/,"")+'"'); }catch{ return; }
  if(t.length<3) return; RL_LIVE_TXT=t; const now=Date.now(); if(now-RL_LIVE_T<70) return; RL_LIVE_T=now;
  const box=$("rlMsgs"); let d=box.querySelector(".rl-typing-m"); if(!d){ rlTyping(true); d=box.querySelector(".rl-typing-m"); }
  let live=d.querySelector(".rl-live"); if(!live){ d.classList.add("live"); live=document.createElement("div"); live.className="rl-live rl-fmt"; live.dir="auto"; d.appendChild(live); }
  const stick=box.scrollHeight-box.scrollTop-box.clientHeight<80; live.innerHTML=rlFmt(t)+'<span class="rl-caret" aria-hidden="true"></span>'; if(stick) box.scrollTop=box.scrollHeight;
}
/* ---------- Claude: the director in the chat ---------- */
function rlState(){
  const set=rlSet();
  return {title:RL.title,stage:RL.stage,viewing_tab:RL.view,settings:set,notes:RL.notes,ideas:RL.ideas,picked_idea:RL.picked,script:RL.script,next_free_tag:"@img"+RL.nextTag,
    characters:RL.characters.map(({name,tag,handle,role,description,wardrobe,prompt,id,lib,fromUser})=>({tag,handle,name,role,description,wardrobe,prompt,image_generated:!!id,library:lib||null,own_image:!!fromUser||undefined})),
    locations:RL.locations.map(({name,tag,handle,kind,description,prompt,id})=>({tag,handle,name,kind,description,prompt,image_generated:!!id})),
    film_look:RL.look||null,
    scenes:RL.scenes.map(({n,title,logline,duration_s,refs,prompt,frame_prompt,frame,status,review})=>({n,title,logline,duration_s,refs,frame_prompt,prompt,first_frame_generated:!!frame?.id,video_rendered:status==="done",gemini_review:review?{score:review.score,verdict:review.verdict,summary:review.summary,issues:review.issues.map(x=>`[${x.t}] ${x.what}`)}:null}))};
}
/* ---------- The Director as an agent: it reads every tab in full and changes exactly what it needs through tools ---------- */
function rlEvent(x){ if(!RL) return; (RL.events=RL.events||[]).push({t:Date.now(),x:String(x).slice(0,400)}); RL.events=RL.events.slice(-80); }
const rlKind=e=>RL.characters.includes(e)?"character":e.kind==="prop"?"prop":"location";
const rlImgState=e=>e.fromUser?"user's own image":e.fromLib?"BAE library image":e.status==="run"?"generating now":e.id?(e.stale?"generated (prompt changed since — regenerate)":"generated"):"no image yet";
function rlElFull(e){ return {kind:rlKind(e),tag:e.tag,handle:e.handle,name:e.name,role:e.role,description:e.description,wardrobe:e.wardrobe,details:e.details,prompt:e.prompt,library:e.lib||null,image:rlImgState(e),what_the_image_shows:e.seen||null,error:e.err||null}; }
function rlSceneFull(sc){ return {n:sc.n,title:sc.title,logline:sc.logline,duration_s:sc.duration_s,refs:sc.refs,blueprint:sc.blueprint||null,frame_prompt:sc.frame_prompt,prompt:sc.prompt,dialogue:(sc.dialogue||[]).map(d=>({n:d.n,who:d.who,at:d.at,line:d.line,delivery:d.delivery,voice_reference_attached:!!d.audio?.id})),
  first_frame:sc.frame?.status==="run"?"generating now":sc.frame?.id?(sc.frame.stale?"generated (frame prompt changed since)":"generated"):"none",what_the_first_frame_shows:sc.frame?.seen||null,
  video:sc.status==="run"?"rendering now":sc.status==="done"?"rendered":sc.status==="err"?"failed: "+(sc.note||""):"not rendered",
  check:sc.check?{dirty:!!sc.check.dirty,passed:sc.check.passed,total:sc.check.total}:null,
  gemini_review:sc.review?{score:sc.review.score,verdict:sc.review.verdict,summary:sc.review.summary,issues:(sc.review.issues||[]).map(x=>`[${x.t}] ${x.cat||""}: ${x.what}${x.fix?` → fix: ${x.fix}`:""}`)}:null}; }
function rlOverview(){
  const set=rlSet();
  return {title:RL.title,stage:RL.stage,user_is_viewing_tab:RL.view,settings:set,next_free_tag:"@img"+RL.nextTag,
    ideas:RL.ideas.map((x,i)=>`${i}: ${x.title}${RL.picked&&RL.picked.title===x.title?" (PICKED)":""}`),picked_idea:RL.picked?{title:RL.picked.title,logline:RL.picked.logline}:null,
    script:RL.script?{title:RL.script.title,duration_s:RL.script.duration_s,scenes:(RL.script.scenes||[]).map(s=>`${s.n}. ${s.title}`)}:null,
    film_look:RL.look?String(RL.look).slice(0,300)+(RL.look.length>300?"…":""):null,
    elements:rlEls().map(e=>({kind:rlKind(e),handle:e.handle,tag:e.tag,name:e.name,image:rlImgState(e),description:String(e.description||"").slice(0,220),seen:e.seen?String(e.seen).slice(0,220):undefined})),
    scenes:RL.scenes.map(sc=>({n:sc.n,title:sc.title,duration_s:sc.duration_s,refs:sc.refs,first_frame:sc.frame?.id?"yes":"no",video:sc.status==="done"?"rendered":sc.status||"no",review:sc.review?.score??null})),
    notes:RL.notes?String(RL.notes).slice(0,1500)+(RL.notes.length>1500?"… (studio_read notes for all)":""):""};
}
function rlSection(section,arg){
  switch(section){
    case "overview": return rlOverview();
    case "ideas": return {ideas:RL.ideas,picked:RL.picked,earlier_ideas:RL.ideasPrev.map(x=>x.title)};
    case "script": return RL.script||"No script yet.";
    case "characters": return RL.characters.map(rlElFull);
    case "locations": return RL.locations.filter(e=>e.kind!=="prop").map(rlElFull);
    case "props": return RL.locations.filter(e=>e.kind==="prop").map(rlElFull);
    case "locations_all": return RL.locations.map(rlElFull);
    case "element": { const e=rlElByTag(arg)||rlEls().find(x=>x.name&&String(x.name).toLowerCase()===String(arg||"").toLowerCase()); return e?rlElFull(e):`No element "${arg}". Elements: ${rlEls().map(x=>x.handle).join(", ")}`; }
    case "scenes": return RL.scenes.map(rlSceneFull);
    case "scene": { const sc=RL.scenes.find(x=>+x.n===+arg); return sc?rlSceneFull(sc):`No scene ${arg}. Scenes: ${RL.scenes.map(x=>x.n).join(", ")||"none"}`; }
    case "film_look": return RL.look||"Not written yet.";
    case "notes": return RL.notes||"(empty)";
    case "settings": return rlSet();
    case "brain": { const b=BR.sections.find(x=>x.id===String(arg||"").trim())||BR.sections.find(x=>String(x.title||"").toLowerCase().includes(String(arg||"").toLowerCase())); return b?`### ${b.title}\n${b.text||""}`:`Brain shelves: ${BR.sections.map(x=>`${x.id} = ${x.title}`).join(" · ")}`; }
    case "activity": return (RL.events||[]).slice(-40).map(x=>`${new Date(x.t).toLocaleString()} — ${x.x}`).join("\n")||"Nothing yet.";
    default: return "Unknown section.";
  }
}
const rlSnapKeys=["title","notes","ideas","ideasPrev","picked","script","characters","locations","scenes","look","settings","stage","view","nextTag"];
const rlSnap=()=>JSON.parse(JSON.stringify(Object.fromEntries(rlSnapKeys.map(k=>[k,RL[k]])),(k,v)=>k.startsWith("_")?undefined:v));
const RL_UNDO=new Map();
function rlUndoTurn(id){ const s=RL_UNDO.get(id); if(!s||!RL) return; Object.assign(RL,JSON.parse(JSON.stringify(s))); RL_UNDO.delete(id);
  const m=RL.chat.find(x=>x.undo===id); if(m){ m.undone=true; delete m.undo; }
  rlEvent("The user undid the Director's changes from one reply."); rlSys(rlAr()?"رجّعت كل التغييرات تبعت هالرد.":"All changes from that reply were undone."); rlSave(); rlRender(); }
function rlCleanHandle(h,kind){ const p={character:"char",location:"loc",prop:"prop"}[kind]||"loc"; let s=String(h||"").trim().replace(/^@/,"").toLowerCase().replace(/[^a-z0-9_]+/g,"_").replace(/^_+|_+$/g,""); if(!s) return null; if(!/^(char|loc|prop)_/.test(s)) s=p+"_"+s; return "@"+s.slice(0,32); }
const RL_MAXS=30;
const rlTooLong=L=>{ const bad=L.filter(x=>+x.duration_s>RL_MAXS); return bad.length?`REFUSED: Seedance 2.5 renders at most ${RL_MAXS} seconds per scene (scene${bad.length>1?"s":""} ${bad.map(x=>x.n+" = "+x.duration_s+" s").join(", ")}). For a longer continuous moment, split it into consecutive parts of at most ${RL_MAXS} s (e.g. 30 s → two 15 s scenes titled "… (part 1/2)" and "… (part 2/2)"), where each part starts exactly on the previous part's END STATE (same positions, wardrobe, light, camera grammar, sound continuing) so they cut together as one take; the studio joins all scenes into one film in Deliver. Nothing was changed — call again with the parts, and tell the user why.`:""; };
/* tools the Director calls while it thinks; mutations are recorded so the reply shows them and can be undone */
function rlStudioTools(turn){
  const T=(label)=>rlStep(label);
  const changed=x=>{ if(!turn.snap) turn.snap=rlSnap(); turn.changes.push(x); };
  const S1=v=>typeof v==="string"?v:JSON.stringify(v);
  const els={type:"string",description:"handle like @char_sara / @loc_hall / @prop_ticket (or tag @img3 or the name)"};
  return [
    {name:"studio_read",description:"Read any part of the production IN FULL (nothing is cut): overview, ideas, script, characters, locations, props, element (arg = handle), scenes, scene (arg = number), film_look, notes, settings, brain (arg = shelf id: the Director's craft knowledge that isn't loaded right now), activity (what the user and the studio did recently: edits, uploads, generations, renders, reviews). Read before you change something you can't see completely above.",
      inputSchema:{type:"object",properties:{section:{type:"string",enum:["overview","ideas","script","characters","locations","props","element","scenes","scene","film_look","notes","settings","activity","brain"]},arg:{type:"string"}},required:["section"]},
      execute:async({section,arg})=>{ T(`Reading ${section}${arg?` ${arg}`:""}`); const r=S1(rlSection(section,arg)); return r.length>24000?r.slice(0,24000)+"… (cut — read a single element or scene instead)":r; }},
    {name:"studio_upsert_element",description:"Add ONE character, location or prop, or change fields of an existing one. Only the fields you pass change; everything else (its image, tag, edits) stays. Pass the full new text for a field you change (e.g. the whole prompt). A new element needs kind, handle, name, description and a complete prompt (CHARACTER SHEET / LOCATION / PROP SHEET template). If an element uses the user's own image, its image is the truth: only align description/prompt with it.",
      inputSchema:{type:"object",properties:{kind:{type:"string",enum:["character","location","prop"]},handle:els,new_handle:{type:"string",description:"rename the handle (rarely)"},name:{type:"string"},role:{type:"string"},description:{type:"string"},wardrobe:{type:"string"},details:{type:"string"},prompt:{type:"string"},library:{type:"string",enum:["","Wissam","Lina","Sara","Omar"]}},required:["handle"]},
      execute:async(a)=>{ const e=rlElByTag(a.handle)||rlEls().find(x=>a.name&&x.name&&x.name.toLowerCase()===String(a.name).toLowerCase()&&(!a.kind||rlKind(x)===a.kind));
        const F=["name","role","description","wardrobe","details","prompt"];
        if(e){ const diff=F.filter(f=>a[f]!=null&&String(a[f])!==String(e[f]||"")); if(a.library!=null&&(a.library||null)!==(e.lib||null)) diff.push("library");
          if(a.new_handle){ const h=rlCleanHandle(a.new_handle,rlKind(e)); if(h&&h!==e.handle){ diff.push("handle"); } }
          if(!diff.length) return `No change: ${e.handle} already has these values.`;
          changed(`✎ ${e.handle}: ${diff.join(", ")}`); T(`Editing ${e.handle}`);
          for(const f of F) if(a[f]!=null) e[f]=String(a[f]);
          if(diff.includes("prompt")&&e.id&&!e.fromUser&&!e.fromLib) e.stale=true;
          if(a.library!=null){ e.lib=a.library||null; rlLinkLibrary(); }
          if(diff.includes("handle")){ const old=e.handle; e.handle=rlCleanHandle(a.new_handle,rlKind(e)); for(const sc of RL.scenes){ const rx=new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"); sc.prompt=String(sc.prompt||"").replace(rx,e.handle); sc.frame_prompt=String(sc.frame_prompt||"").replace(rx,e.handle); sc.refs=(sc.refs||[]).map(r=>String(r).toLowerCase()===old.toLowerCase()?e.handle:r); } }
          rlEvent(`Director edited ${e.handle} (${diff.join(", ")}).`); turn.dirty=true;
          return `Updated ${e.handle} (${e.tag}): ${diff.join(", ")}.${e.stale?" Its image no longer matches the prompt — it needs regenerating (ask the user or use studio_action generate_image).":""}`; }
        const kind=a.kind||"location"; const handle=rlCleanHandle(a.handle,kind)||rlCleanHandle(a.name,kind);
        if(!handle) return "Give a handle.";
        if(!a.prompt&&!a.library) return "A new element needs a complete prompt.";
        const n={tag:"@img"+(RL.nextTag++),handle,name:a.name||handle.replace(/^@\w+?_/,""),role:a.role||"",description:a.description||"",prompt:a.prompt||"",lib:a.library||null};
        if(a.wardrobe) n.wardrobe=a.wardrobe; if(a.details) n.details=a.details;
        changed(`＋ ${kind} ${handle}`); T(`Adding ${handle}`);
        if(kind==="character") RL.characters.push(n); else { if(kind==="prop") n.kind="prop"; else n.kind="location"; RL.locations.push(n); }
        rlEnsureHandles(RL); rlLinkLibrary(); rlEvent(`Director added ${kind} ${handle}.`); turn.dirty=true;
        return `Added ${kind} ${n.handle} as ${n.tag}. It has no image yet.`; }},
    {name:"studio_delete",description:"Delete exactly one thing: an element (target = handle), a scene (target = scene number) or a script scene (target = 'script:N'). Everything else stays. Tell the user in the reply what you deleted.",
      inputSchema:{type:"object",properties:{target:{type:"string"}},required:["target"]},
      execute:async({target})=>{ const t=String(target||"").trim();
        if(/^script:\d+$/i.test(t)){ const n=+t.split(":")[1]; const L=RL.script?.scenes||[]; const i=L.findIndex(s=>+s.n===n); if(i<0) return "No such script scene."; changed(`− script scene ${n}`); L.splice(i,1); rlEvent(`Director deleted script scene ${n}.`); turn.dirty=true; return `Deleted script scene ${n}.`; }
        if(/^\d+$/.test(t)){ const i=RL.scenes.findIndex(s=>+s.n===+t); if(i<0) return `No scene ${t}.`; changed(`− scene ${t}`); T(`Deleting scene ${t}`); RL.scenes.splice(i,1); rlEvent(`Director deleted scene ${t}.`); turn.dirty=true; return `Deleted scene ${t}. Remaining: ${RL.scenes.map(s=>s.n).join(", ")||"none"}.`; }
        const e=rlElByTag(t)||rlEls().find(x=>x.name&&x.name.toLowerCase()===t.toLowerCase()); if(!e) return `Nothing called ${t}.`;
        changed(`− ${e.handle}`); T(`Deleting ${e.handle}`);
        RL.characters=RL.characters.filter(x=>x!==e); RL.locations=RL.locations.filter(x=>x!==e);
        const used=RL.scenes.filter(sc=>[sc.prompt,sc.frame_prompt,...(sc.refs||[])].join(" ").toLowerCase().includes(String(e.handle).toLowerCase())).map(s=>s.n);
        rlEvent(`Director deleted ${e.handle}.`); turn.dirty=true;
        return `Deleted ${e.handle}.${used.length?` Scenes ${used.join(", ")} still mention it — update them.`:""}`; }},
    {name:"studio_upsert_scene",description:"Create or change ONE directing scene (shot). Only the fields you pass change. For a new scene give everything (blueprint first, then frame_prompt and prompt). Changing prompt resets its rendered video; the studio re-checks the scene automatically.",
      inputSchema:{type:"object",properties:{n:{type:"number"},title:{type:"string"},logline:{type:"string"},duration_s:{type:"number"},refs:{type:"array",items:{type:"string"}},blueprint:{type:"object"},frame_prompt:{type:"string"},prompt:{type:"string"},dialogue:{type:"array",items:{type:"object"},description:"spoken lines [{n,who,at,line (Arabic with full tashkeel),delivery}], matching @voice1… in the prompt"},new_n:{type:"number",description:"move the scene to this number (others shift)"}},required:["n"]},
      execute:async(a)=>{ const n=+a.n; const fields=["title","logline","duration_s","refs","blueprint","frame_prompt","prompt","dialogue"]; const sc0={n}; for(const f of fields) if(a[f]!=null) sc0[f]=a[f];
        const old=RL.scenes.find(x=>+x.n===n);
        if(!old&&!a.prompt) return "A new scene needs a prompt (and a blueprint and frame_prompt).";
        changed(old?`✎ scene ${n}: ${fields.filter(f=>a[f]!=null).join(", ")}`:`＋ scene ${n}`); T(old?`Rewriting scene ${n}`:`Writing scene ${n}`);
        turn.scenes.push(sc0);
        if(a.new_n!=null&&+a.new_n!==n) turn.moves.push([n,+a.new_n]);
        rlEvent(`Director ${old?"changed":"added"} scene ${n}.`); turn.dirty=true;
        return `${old?"Updated":"Added"} scene ${n}.`; }},
    {name:"studio_write_scenes",description:"THE WAY TO WRITE MANY SCENES (e.g. starting Video Directing): give a short plan per scene and the studio writes each full scene (blueprint, first-frame prompt, Seedance prompt) in its own focused pass, two at a time, then checks it. Use this instead of writing several full scenes yourself. Existing scenes with the same n are rewritten from your brief.",
      inputSchema:{type:"object",properties:{scenes:{type:"array",items:{type:"object",properties:{n:{type:"number"},title:{type:"string"},logline:{type:"string"},duration_s:{type:"number"},refs:{type:"array",items:{type:"string"}},brief:{type:"string",description:"what happens, shot sizes/camera idea, performance, sound, dialogue lines — 2–6 sentences"}},required:["n","title","brief"]}}},required:["scenes"]},
      execute:async({scenes})=>{ const L=(Array.isArray(scenes)?scenes:[]).filter(x=>x&&x.n!=null&&x.brief); if(!L.length) return "Give scenes with n, title and brief.";
        changed(`✍ writing scene${L.length>1?"s":""} ${L.map(x=>x.n).join(", ")}`); T(`Planning ${L.length} scene${L.length>1?"s":""}`);
        turn.writes.push(...L); rlEvent(`Director planned scenes ${L.map(x=>x.n).join(", ")} and the studio is writing them.`); turn.dirty=true;
        return `The studio will write scenes ${L.map(x=>x.n).join(", ")} right after your reply (about a minute each, two at a time). Tell the user they appear in Shots as they finish.`; }},
    {name:"studio_script",description:"Change the script: pass 'scene' to add or change ONE script scene (by n, only given fields change), or 'script' to replace the whole script (title, duration_s, scenes).",
      inputSchema:{type:"object",properties:{scene:{type:"object",description:"{n,time,title,action,dialogue:[{who,line}],on_screen_text,sound}"},script:{type:"object"}}},
      execute:async({scene,script})=>{ if(script&&typeof script==="object"){ changed("✎ script (whole)"); T("Rewriting the script"); RL.script=script; rlEvent("Director rewrote the script."); turn.dirty=true; return "Script replaced."; }
        if(scene&&scene.n!=null){ RL.script=RL.script||{title:RL.title,scenes:[]}; const L=RL.script.scenes=RL.script.scenes||[]; const i=L.findIndex(s=>+s.n===+scene.n); changed(`${i<0?"＋":"✎"} script scene ${scene.n}`); T(`Editing script scene ${scene.n}`);
          if(i<0){ L.push(scene); L.sort((x,y)=>+x.n-+y.n); } else L[i]={...L[i],...scene}; rlEvent(`Director ${i<0?"added":"edited"} script scene ${scene.n}.`); turn.dirty=true; return `Script scene ${scene.n} saved.`; }
        return "Pass scene or script."; }},
    {name:"studio_set",description:"Set one project field: title, notes_append (add a line to the notes), notes (replace), film_look, settings ({length, aspect, lang, res}), stage, open_tab (show the user a tab: idea, script, characters, locations, directing, render), picked_idea (index of the idea).",
      inputSchema:{type:"object",properties:{field:{type:"string",enum:["title","notes_append","notes","film_look","settings","stage","open_tab","picked_idea"]},value:{}},required:["field","value"]},
      execute:async({field,value})=>{ const v=value;
        if(field==="open_tab"){ if(rlStageIx(v)<0) return "Unknown tab."; turn.openTab=String(v); return `The user will see the ${v} tab.`; }
        changed(`✎ ${field.replace("_"," ")}`); turn.dirty=true;
        if(field==="title") RL.title=String(v);
        else if(field==="notes_append") RL.notes=[RL.notes,String(v)].filter(Boolean).join("\n");
        else if(field==="notes") RL.notes=String(v);
        else if(field==="film_look"){ RL.look=String(v); RL.scenes.forEach(s=>{ if(s.check) s.check.dirty=true; }); }
        else if(field==="settings"&&v&&typeof v==="object"){ RL.settings={...rlSet(),...v}; }
        else if(field==="stage"){ if(rlStageIx(v)<0) return "Unknown stage."; RL.stage=String(v); }
        else if(field==="picked_idea"){ const x=RL.ideas[+v]; if(!x) return "No such idea."; RL.picked=x; }
        rlEvent(`Director set ${field}.`); return `${field} saved.`; }},
    {name:"studio_action",description:"Start a studio job. These spend Magnific credits and take minutes — use them only when the user asked for it (or clearly approved). generate_image (target = element handle), generate_frame (target = scene number), render_video (target = scene number), review_video (Gemini watches the rendered scene, target = scene number), check_scene (re-check a scene's prompt, target = scene number), generate_storyboard (one Seedream 5.5 still at 2K per script scene; target = all, or script scene numbers like 2,3), generate_voices (ElevenLabs voice clip for every dialogue line of a scene whose character already has a voice chosen; target = scene number). Jobs start right after your reply.",
      inputSchema:{type:"object",properties:{action:{type:"string",enum:["generate_image","generate_frame","render_video","review_video","check_scene","generate_storyboard","generate_voices"]},target:{type:"string"}},required:["action","target"]},
      execute:async({action,target})=>{ const t=String(target||"");
        if(action==="generate_storyboard"){ if(!RL.script?.scenes?.length) return "No script yet."; turn.actions.push([action,t]); T("Queued: storyboard"); return `Queued the storyboard (${t==="all"||!t?"every script scene":"script scene "+t}); one Seedream 5.5 still at 2K per scene.`; }
        if(action==="generate_image"){ if(!rlElByTag(t)&&!turn.changes.some(c=>c.includes(t))) return `No element ${t}.`; }
        else if(!RL.scenes.find(s=>+s.n===+t)&&!turn.scenes.some(s=>+s.n===+t)) return `No scene ${t}.`;
        turn.actions.push([action,t]); T(`Queued: ${action.replace("_"," ")} ${t}`); return `Queued ${action} ${t}; it starts as soon as you reply.`; }}
  ];
}
function rlApplyTurn(turn){
  /* scene writes go through the same merge as before: stale video/frame + automatic re-check */
  if(turn.scenes.length){ const toCheck=[];
    for(const sc of turn.scenes){ const i=RL.scenes.findIndex(x=>+x.n===+sc.n);
      if(i<0){ RL.scenes.push({...sc}); toCheck.push(sc.n); continue; }
      const old=RL.scenes[i]; const m={...old,...sc}; if(sc.dialogue){ m.dialogue=old.dialogue; rlSetDialogue(m,sc.dialogue); }
      if(sc.prompt&&sc.prompt!==old.prompt) Object.assign(m,{status:null,clip:null,url:null,note:null,_src:null,web:null});
      if((sc.prompt&&sc.prompt!==old.prompt)||(sc.frame_prompt&&sc.frame_prompt!==old.frame_prompt)||(sc.blueprint&&JSON.stringify(sc.blueprint)!==JSON.stringify(old.blueprint))||(sc.refs&&JSON.stringify(sc.refs)!==JSON.stringify(old.refs))){ toCheck.push(sc.n); if(m.frame?.id&&sc.frame_prompt&&sc.frame_prompt!==old.frame_prompt) m.frame={...m.frame,stale:true}; }
      RL.scenes[i]=m; }
    for(const [a,b] of turn.moves){ const i=RL.scenes.findIndex(x=>+x.n===a); if(i<0) continue; const [s]=RL.scenes.splice(i,1); RL.scenes.splice(Math.max(0,Math.min(RL.scenes.length,b-1)),0,s); RL.scenes.forEach((x,k)=>x.n=k+1); }
    RL.scenes.sort((x,y)=>+x.n-+y.n);
    if(toCheck.length) setTimeout(()=>rlCheckScenes(toCheck,{quiet:true}),60); }
  if(turn.openTab) RL.view=turn.openTab;
}
async function rlWriteScenes(L){
  for(const p of L){ const n=+p.n; let sc=RL.scenes.find(x=>+x.n===n);
    const base={title:String(p.title||""),logline:String(p.logline||""),duration_s:Math.max(4,Math.min(120,+p.duration_s||8)),refs:Array.isArray(p.refs)?p.refs.map(String):(sc?.refs||[])};
    if(!sc){ sc={n,...base,prompt:"",frame_prompt:""}; RL.scenes.push(sc); } else Object.assign(sc,base);
    sc.improvePending={instruction:`WRITE THIS SCENE IN FULL${sc.prompt?" (replace the current version)":" (it is empty now)"}: ${p.brief}`}; }
  RL.scenes.sort((x,y)=>+x.n-+y.n); rlSave(); rlBoard();
  const q=L.map(p=>+p.n); const worker=async()=>{ while(q.length){ const n=q.shift(); const sc=RL.scenes.find(x=>+x.n===n); if(sc?.improvePending) await rlImproveScene(n,sc.improvePending.instruction); } };
  await Promise.all([worker(),worker()]);
}
function rlRunActions(turn){
  if(turn.writes?.length) rlWriteScenes(turn.writes);
  for(const [a,t] of turn.actions){
    if(a==="generate_voices") rlVoiceGenAll(t);
    else if(a==="generate_storyboard") rlGenStoryboard(t&&t!=="all"?String(t).split(/[ ,]+/).map(x=>+x-1).filter(x=>x>=0):null);
    else if(a==="generate_image") rlGenElement(rlElByTag(t)?.tag||t);
    else if(a==="generate_frame") rlGenFrame(t);
    else if(a==="render_video") rlRenderScene(t);
    else if(a==="review_video") rlReview(t);
    else if(a==="check_scene") rlCheckScenes([t]);
  }
}
/* the Director looks at every new image (generated or replaced), so it always knows what is actually on screen */
async function rlDataBlob(src){ try{ const r=await fetch(src); return await r.blob(); }catch{ return null; } }
async function rlSee(o,label,brief){
  if(!sampleImages||!o?.id) return;
  const src=rlFull[o.id]||rlTGet(o.id); if(!src) return; const blob=await rlDataBlob(src); if(!blob) return;
  try{ const r=await rlAsk(`You are the director's eye. This is the image now used as ${label} in a Bank al Etihad reel. Describe exactly what is visible so the director can write prompts that match it and spot mistakes: people (age, look, wardrobe), objects, place, light, colours, framing, any text, anything that differs from the brief.
Brief it was made from (may differ — the image wins): ${String(brief||"").slice(0,1500)}
Reply with only JSON: {"seen":"3–5 precise sentences","mismatch":"what differs from the brief, or empty"}`,{modelTier:"default",images:[blob],cache:false});
    if(r?.seen){ o.seen=String(r.seen)+(r.mismatch?` MISMATCH vs brief: ${r.mismatch}`:""); rlEvent(`The Director looked at ${label}: ${String(r.seen).slice(0,200)}${r.mismatch?` — differs: ${String(r.mismatch).slice(0,160)}`:""}`); rlSave(); } }catch{}
}
function rlPromptFor(text,memText,canSearch,agent,filed){
  const set=rlSet();
  const hist=RL.chat.filter(m=>m.role!=="sys").slice(-14).map(m=>`${m.role==="u"?"USER":"YOU"}: ${m.text}${m.n?` [attached ${m.n} image(s)]`:""}${m.videos?.length?` [attached ${m.videos.length} video(s): ${m.videos.map(v=>v.name).join(", ")}]`:""}`).join("\n");
  const vids=RL.chat.filter(m=>m.role==="u"&&m.videos?.some(v=>v.analysis)).slice(-2).flatMap(m=>m.videos.filter(v=>v.analysis));
  return `You are the creative director and AI film director of Bank al Etihad (Jordan) in a reels production studio. You talk with a BAE designer in a chat and build the production with them, one stage at a time. Answer in the user's language (Arabic or English, Jordanian tone is fine), warm and direct, short paragraphs.

${RL_METHOD}

${RL_DIALOGUE}

${RL_SD25}

${RL_SEEDREAM}

${RL_BAE}

${RL_JO}

${brText(memText,/scene|shot|prompt|seedance|مشهد|مشاهد|برومبت|لقط/i.test(text||"")||["directing","render"].includes(RL.view)||["directing","render"].includes(RL.stage)?"directing":RL.stage==="render"?"directing":RL.stage)}
${canSearch?`
MEMORY SEARCH: your long-term memory holds ${MEM.cards.length} memories. The most relevant ones are above. If this request touches something they don't cover (a new topic, place, occasion, product, technique), call search_memory (English or Arabic keywords) before deciding, and open_memory to follow links. At most 3 searches; never search for what is already above.`:""}

TARGET: ${set.aspect} reel, about ${set.length} seconds in total, dialogue language: ${set.lang}. Characters in the team's character library (they can be cast by name): ${CL.list.length?CL.list.slice(0,40).map(c=>`${String(c.name||"").split("/").map(x=>x.trim()).filter(Boolean).join(" or ")} (${c.cat}${c.look?"; "+c.look:""})`).join(" · "):"none yet"}.

STAGE FLOW: idea → script → characters → locations → directing → render. Work on what the user asks; by default the current stage. When the user approves ("تمام", "ok", "approve", picks an idea…), move to the next stage AND deliver it in the same answer. The user can come back at any time to change an earlier stage (a new idea, a new or edited character, a new location, a rewritten scene): do exactly that change, keep everything else, and update later stages only where the change requires it. If attachments are given (storyboards, characters, places, scripts), analyse them carefully and record the useful facts in "notes" because you will not see the images again.

HANDLES: every character, location and prop has a permanent readable handle (@char_sara, @loc_hall, @prop_phone) and an internal tag (@img1…) shown in the project state. In every prompt refer to elements ONLY by their handle. Keep each existing element's tag and handle. A NEW element gets a handle you choose (@char_<name>, @loc_<place>, @prop_<object>; lowercase latin letters, digits and underscores) — the studio assigns its tag. The studio maps handles to Seedance's @img numbers when it renders.

${agent?`YOU ARE AN AGENT WITH FULL CONTROL OF THE STUDIO. You can read every tab in full and add, change or delete anything through your tools:
- studio_read: read any section completely (characters, locations, props, scenes, script, an element, a scene, activity…). The overview below is a summary — before changing something, read it if you can't see all of it.
- studio_upsert_element / studio_delete / studio_upsert_scene / studio_script / studio_set: make EXACTLY the change needed, one item at a time. Nothing else is touched, images and the user's edits are kept. Do several calls in one turn when the user asks for several things.
- studio_action: start generations/renders/reviews (they cost credits — only when the user asks or approves).
DO EXACTLY WHAT THE USER ASKS. You are their assistant: when they ask for one 30-second scene, write ONE 30-second scene; when they say delete the other scenes, delete them; when they ask to rebuild scenes, rebuild them. Never split, shorten, cap, refuse or add an approval step on your own. If a model limit might matter (e.g. a video model's maximum clip length), mention it in one short line AFTER doing what they asked. Every scene must name its elements by handle (@char_…, @loc_…, @prop_…) in refs and in the prompt, so their images are attached as references. Big jobs go through the tools, never as one giant JSON answer: to write several scenes (e.g. starting Video Directing) call studio_write_scenes ONCE with a short plan per scene — the studio writes each full scene itself; use studio_upsert_scene only for a targeted edit. For many elements, several studio_upsert_element calls in one round. Your final JSON answer stays SHORT (reply, chips, advisors; under ~2500 characters) once you've used tools. You have only a few tool rounds per reply, so call SEVERAL tools at once in the same round (e.g. all the elements you add or edit together), read only what isn't already shown below, and then answer. Never say you can't see or can't change a tab: read it and do it. After acting, the reply tells the user in one or two short lines what you changed (the studio also lists the changes under your message with an Undo button). If something is ambiguous and costly, ask; otherwise act.
The JSON keys characters/locations/scenes below still work but are for building a whole stage from scratch; for any targeted change use the tools.

PROJECT OVERVIEW (JSON): ${trimJSON(rlOverview(),14000)}

THE TAB THE USER IS LOOKING AT (${RL.view}), IN FULL: ${trimJSON(rlSection(RL.view==="characters"?"characters":RL.view==="locations"?"locations_all":RL.view==="directing"||RL.view==="render"?"scenes":RL.view==="script"?"script":"ideas"),24000)}
`:`PROJECT STATE (JSON): ${trimJSON(rlState(),40000)}`}
${(()=>{ const since=RL.lastReplyAt||0; const ev=(RL.events||[]).filter(x=>x.t>since); return ev.length?`WHAT HAPPENED IN THE STUDIO SINCE YOUR LAST REPLY (the user and the studio did this — take it into account):\n${ev.map(x=>"- "+x.x).join("\n")}\n`:""; })()}

CONVERSATION SO FAR:
${hist||"(none)"}

${vids.length?`VIDEOS THE USER ATTACHED — Gemini watched them (picture and sound) for you; treat this as what is in the video, and record the useful facts in "notes":
${vids.map(v=>`### ${v.name}${v.dur?` (${Math.round(v.dur)} s)`:""}\n${String(v.analysis).slice(0,9000)}`).join("\n\n")}

`:""}${filed?`IMAGES THE USER JUST ATTACHED — ALREADY FILED BY THE STUDIO (uploading at original quality, each is being studied and its description/prompt updated automatically). Do NOT create these elements again, do NOT use "from_attachment", do NOT rewrite their description or prompt; just build on them:
${filed.rows.map(r=>r.tag?`- image ${r.i} → ${rlElByTag(r.tag)?.handle} "${rlElByTag(r.tag)?.name||""}" (${rlKind(rlElByTag(r.tag))}${r.isNew?", NEW element created from the image":""}) — ${r.note}`:`- image ${r.i} → reference only, not filed — ${r.note}`).join("\n")}
The studio shows the user a card with this sorting (they can move an image). In your reply confirm it in one short line and continue with what they asked.
`:""}ASSETS — HOW YOU ASK FOR THEM: whenever you propose or change the cast, locations or props, finish the reply by telling the user the count in one line ("٣ شخصيات، ٤ أماكن، ٥ أغراض") and asking whether they already have any of them — they can upload some, all, or none, in any order, and you will sort them; whatever they don't have you generate. The studio shows an upload checklist under your reply automatically (set "ask_assets":true to show it at any other moment, e.g. when the user says they have images). Never invent that an image was uploaded.
USER NOW: ${text||"(attachments only)"}

Reply with ONLY one JSON object whose FIRST key is "reply" (the user watches it appear as you write, so write it before anything else; keep it short and direct). Always include "reply" (the chat message, no markdown tables) and "stage" (the furthest stage the production has reached after this turn). Include a key ONLY when you create or change it. "characters", "locations" and "scenes" ADD or UPDATE the items you list (matched by tag/handle/number); items you leave out are kept (delete only with studio_delete). Other keys replace their value:
- "title": short reel title
- "notes": everything learned from attachments and decisions (append to existing notes)
- "ideas": [{"title","hook","logline","beats","why_viral","product_moment","jury"}]  (3 per request). Before answering, silently generate at least 8 directions through different lenses of the masters, score each with THE JURY in the brain, and return only the best 3; "jury" = one line on why it wins (score /35)
- "picked_idea": index (0-based) into "ideas" when the user picks one
- "script": {"title","duration_s","scenes":[{"n","time","title","action","dialogue":[{"who","line"}],"on_screen_text","sound"}]}
- "characters": [{"tag","handle","name","role","description","wardrobe","library":null|"<a name from the character library>","prompt","from_attachment":null|N}]  — when you propose characters, ALWAYS give each one a complete, specific "prompt" (STAGE 1: a natural portrait photo of that one person in a real everyday place — face, hair, build, exact wardrobe, place and light; never a character sheet, never a plain backdrop) so the user can generate it or attach their own photo. A character with "own_image": true uses the user's photo — keep its description and wardrobe exactly as they are  — from_attachment: when the user ATTACHED a photo or sheet of this character (in THIS message), give its number N (1 = first attached image, in order). The studio then uses the user's image itself as the character's reference image — never redesign or re-imagine that person; describe them exactly as in the image. When the user attaches characters, map EVERY attached image to an element (characters, or locations/props for places and objects); if two attachments look the same, still map both and say so
  — prompt = the STAGE 1 natural portrait prompt (the studio makes the three-panel sheet from the chosen portrait afterwards); set "library" only when the user wants that BAE character
- "locations": [{"tag","handle","name","kind":"location"|"prop","description","prompt","from_attachment":null|N}]  — full image prompt (LOCATION template, empty of people / PROP SHEET template)
- "film_look": the shared FILM LOOK paragraph (write it with the first scenes; change it only when asked)
- "scenes": [{"n","title","logline","duration_s","refs":["@char_…","@loc_…"],"blueprint":{...},"frame_prompt","prompt","dialogue":[{"n","who","at","line","delivery"}]}]  — logline = one line "what it does"; blueprint = the top-down blocking plan written FIRST (format: ${RL_BP_SCHEMA}); frame_prompt = the still-image prompt (Seedream 5.5) for the scene's first frame, using the tags ("the man @img1 sits…"); prompt = the full Seedance 2.5 prompt that continues from that first frame, following the DIRECTING structure; duration 4–15 s, ${set.aspect}
- "chips": 2–4 short suggested next replies for the user, in their language
- "used_memories": ids of the memory cards (c_…) that actually shaped this answer, 0–8
- "advisors": 0–3 short notes from the ASSISTANT DIRECTORS that matter for THIS reply: [{"id":"trend"|"story"|"dp"|"performance"|"tech","note":"one concrete suggestion in the user's language"}]. Only when genuinely useful; never repeat what you already did.`;
}
async function rlSend(text,{retry}={}){
  if(rlBusy||!RL) return; text=(text||"").trim(); const atts=retry?[]:rlPending.slice(); if(!text&&!atts.length) return;
  if(!sample){ rlSys("Claude isn't available in this view. Open the page in claude.ai and allow Claude.",true); return; }
  rlBusy=true; const ctl=new AbortController(); RL._ctl=ctl; { const sb=$("rlSend"); sb.classList.add("stop"); sb.setAttribute("aria-label","Stop"); } RL.chatPending=null;
  const imgs=atts.filter(a=>!a.video), vids=atts.filter(a=>a.video);
  let um=null;
  if(!retry){
    const thumbs=[]; for(const a of imgs){ const t=await rlThumb(a.url,160); if(t) thumbs.push(t); }
    const videos=[]; for(const a of vids){ const v=await rlVideoThumb(a.url); if(v.thumb) thumbs.push(v.thumb); videos.push({id:"v"+Date.now().toString(36)+videos.length,name:a.name||"video",size:a.blob.size,dur:v.dur,_stage:"upload",_p:0}); }
    um={role:"u",text,thumbs,n:imgs.length,videos:videos.length?videos:undefined,t:Date.now()}; RL.chat.push(um);
    if(text) brSignal("chat","request",0,{note:text,item:`stage ${RL.stage} · viewing ${RL.view}${imgs.length?` · ${imgs.length} image(s) attached`:""}${vids.length?` · ${vids.length} video(s) attached`:""}`,key:text});
    rlPending=[]; rlRenderAtt(); $("rlInput").value="";
  }
  RL.chatPending={text,at:Date.now()}; rlFlush(); rlRenderChat(); RL_STEPS.length=0;
  rlStep(imgs.length?`Reading your ${imgs.length} image${imgs.length>1?"s":""}`:vids.length?"Getting your video ready":"Reading your message");
  await rlJob(async()=>{ try{
    /* everyday requests use the fast model; ideas, scripts and scene writing get the deep one */
    const deep=["idea","script"].includes(RL.stage)||text.length>240||/idea|script|concept|scene|shot|write|rewrite|storyboard|فكر|أفكار|افكار|سكر[يـ]?بت|مشهد|مشاهد|اكتب|إكتب|ابن[يِ]|ستوري/i.test(text);
    const opts={modelTier:deep?"complex":"default",cache:false,signal:ctl.signal,onText:({text:t})=>rlLive(t)};
    const turn0={snap:null};
    for(let i=0;i<vids.length&&um;i++){ const a=vids[i], v=um.videos[i];
      if(a.blob.size>RL_VMAX){ v.err="too large"; v._stage="err"; rlVProgUpdate(v); rlSys(`${v.name} is larger than 200 MB, so Gemini can't watch it here. Trim it and attach it again.`,true); continue; }
      try{ rlStep(`Uploading ${v.name} · 0%`,{id:"up"+i});
        v.analysis=await rlGeminiWatchBlob(a.blob,rlVideoQuestion(text),({stage,p})=>{ v._stage=stage; v._p=p; rlVProgUpdate(v); if(stage==="upload") rlStep(`Uploading ${v.name} · ${p}%`,{id:"up"+i}); else { rlStep(`Uploaded ${v.name}`,{id:"up"+i,done:true}); rlStep(stage==="send"?"Sending it to Gemini":"Gemini is watching and listening",{id:"gw"+i}); } });
        v._stage="done"; rlVProgUpdate(v); rlStep("Gemini watched it",{id:"gw"+i,done:true});
        brSignal("chat","video_reference",0,{note:`Gemini watched "${v.name}": ${String(v.analysis).slice(0,700)}`,item:text||"",key:"vid"+v.name+v.size});
        rlFlush();
      }catch(e){ v.err=String(e?.code||"error"); v._stage="err"; rlVProgUpdate(v); const c=e?.code||"";
        rlSys(/not available on this connector/i.test(String(e?.message||""))?"Claude still has the old tool list of the “BAE Gemini Eye” connector. In claude.ai open Settings → Connectors → BAE Gemini Eye, press Disconnect, then connect it again (it should show 4 tools), and resend. Your text was sent without the video.":c==="server_not_connected"||c==="not_granted"||/not.?connected|manifest/i.test(String(e?.message||""))?"To let Gemini watch videos, add the “BAE Gemini Eye” connector in claude.ai (Settings → Connectors). Your text was sent without the video.":`Gemini couldn't watch ${v.name}: ${String(e?.message||c).slice(0,200)}. Your text was sent without it.`,true); rlTyping(true); }
    }
    if(imgs.length){ if(sampleImages){ opts.images=[]; for(const a of imgs.slice(0,10)){ opts.images.push(a.blob.size>1.5e6?await toJpeg(a.blob,1600).catch(()=>a.blob):a.blob); try{ const bm=await createImageBitmap(a.blob); a.w=bm.width; a.h=bm.height; bm.close?.(); }catch{} } } else rlSys("This view can't send images to Claude, so only your text was used.",true); }
    let filed=null;
    if(imgs.length&&opts.images&&mcp&&!retry){
      rlStep(`Sorting your ${imgs.length} image${imgs.length>1?"s":""} into cast, locations and props`,{id:"sort"});
      try{ const it=await rlIntake(imgs.slice(0,10),text,opts.images);
        if(it.items.some(x=>x.use==="asset")){ if(!turn0.snap) turn0.snap=rlSnap();
          const rows=rlFileIntake(imgs.slice(0,10),it.items,um?.thumbs||[]); filed={rows,only:it.only};
          rlStep(`Filed ${rows.filter(r=>r.tag).length} image${rows.filter(r=>r.tag).length>1?"s":""} · uploading at original quality`,{id:"sort",done:true}); rlBoard(); }
        else rlStep("Images are references, nothing to file",{id:"sort",done:true});
      }catch(e){ if(e?.code==="cancelled") throw e; rlStep("Couldn't sort the images — the Director will look at them",{id:"sort",done:true}); }
    }
    if(filed?.only){ /* fast path: the message only handed over assets — no need to wake the whole room */
      const n=filed.rows.filter(r=>r.tag).length, miss=rlMissing().filter(e=>!filed.rows.some(r=>r.tag===e.tag));
      RL.chatPending=null;
      RL.chat.push({role:"a",text:rlAr()?`وزّعت ${n===1?"الصورة":`الـ ${n} صور`} على أماكنها، وعم يرتفعوا بجودتهم الأصلية. بدرس كل وحدة وبحدّث وصفها وبرومبتها لحالي.${miss.length?`\nضايل ${miss.length} بدون صورة — ارفعهم أو خلّيني أولّدهم.`:""}`:`I filed ${n===1?"your image":`your ${n} images`}; they're uploading at original quality. I'll study each one and update its description and prompt.${miss.length?`\n${miss.length} still ${miss.length>1?"have":"has"} no image — upload or let me generate ${miss.length>1?"them":"it"}.`:""}`,intake:filed.rows,kit:miss.length>0,chips:miss.length?(rlAr()?["ولّد الباقي","عندي صور ثانية"]:["Generate the rest","I have more images"]):[]});
      { const id="u"+Date.now().toString(36); RL_UNDO.clear(); RL.chat.forEach(x=>{ delete x.undo; }); RL_UNDO.set(id,turn0.snap); const last=RL.chat[RL.chat.length-1]; last.undo=id; last.changes=filed.rows.filter(r=>r.tag).map(r=>`${r.isNew?"＋":"⇪"} ${rlElByTag(r.tag)?.handle||""}`); }
      RL.lastReplyAt=Date.now(); return; }
    rlStep("Reading the Director’s memory");
    await brLoad();
    const mem=await rlMemFor([text,RL.title,RL.picked?.title,RL.picked?.logline,RL.view!==RL.stage?RL.view:""].filter(Boolean).join(" "),RL.stage==="render"?"directing":RL.stage);
    const used=new Set(), searched=[];
    const lim=await sample.limits?.().catch(()=>null);
    const turn={changes:[],scenes:[],moves:[],actions:[],writes:[],snap:turn0.snap,dirty:false};
    const nEl0=rlEls().length;
    if(lim?.tools){ const st=rlStudioTools(turn), mt=MEM.cards.length?memTools((ids,q)=>{ ids.forEach(i=>used.add(i)); if(q&&!searched.includes(q)){ searched.push(q); rlStep(`Searching memory: “${q}”`); } }):[];
      const order=["studio_read","studio_upsert_element","studio_write_scenes","studio_upsert_scene","studio_delete","studio_set","search_memory","studio_action","studio_script","open_memory"];
      opts.tools=[...st,...mt].sort((x,y)=>order.indexOf(x.name)-order.indexOf(y.name)).slice(0,Math.max(1,+lim.tools.maxCount||9)); }
    rlStep(mem.count?`Recalled ${mem.ids.length} of ${mem.count} memories`:"Memory ready",{done:true});
    rlStep("The Director is thinking with the five assistant directors");
    const slow=setTimeout(()=>rlStep("Writing the answer"),9000);
    const out=await rlAsk(rlPromptFor(text,mem.text,!!opts.tools?.some(t=>t.name==="search_memory"),!!opts.tools?.some(t=>t.name==="studio_upsert_element"),filed),opts)
      .catch(e=>{ if(e?.code!=="invalid_json"&&e?.code!=="empty_completion") throw e; const o=rlLooseJSON(e.text);
        if(o) return o; if(turn.changes.length||turn.scenes.length) return {reply:rlAr()?"خلصت التغييرات اللي تحت. ردّي المكتوب انقطع، فاسألني إذا بدك تفاصيل.":"I made the changes below; my written reply got cut off — ask me for details."}; throw e; })
      .finally(()=>clearTimeout(slow));
    RL.chatPending=null;
    const own=filed?[]:[...(Array.isArray(out?.characters)?out.characters:[]),...(Array.isArray(out?.locations)?out.locations:[])].filter(x=>x&&x.from_attachment!=null&&imgs[+x.from_attachment-1]).map(x=>({handle:x.handle,name:x.name,tag:x.tag,blob:imgs[+x.from_attachment-1].blob}));
    if(!turn.snap&&out&&["characters","locations","scenes","script","ideas","film_look","title"].some(k=>out[k]!=null)) turn.snap=rlSnap();
    rlApplyTurn(turn);
    rlApply(out||{});
    { const last=RL.chat[RL.chat.length-1]; if(last?.role==="a"){ const ch=[...(filed?filed.rows.filter(r=>r.tag).map(r=>`${r.isNew?"＋":"⇪"} ${rlElByTag(r.tag)?.handle||""} (your image)`):[]),...turn.changes];
        if(filed) last.intake=filed.rows;
        /* the checklist appears when the Director proposed elements, or assets arrived, and something still has no image */
        if(rlMissing().length&&(rlEls().length>nEl0||filed||(Array.isArray(out?.characters)&&out.characters.length)||(Array.isArray(out?.locations)&&out.locations.length)||out?.ask_assets)) last.kit=true;
        if(out){ if(Array.isArray(out.characters)&&out.characters.length) ch.push(`✎ characters (${out.characters.length})`); if(Array.isArray(out.locations)&&out.locations.length) ch.push(`✎ locations & props (${out.locations.length})`); if(Array.isArray(out.scenes)&&out.scenes.length) ch.push(`✎ scenes ${out.scenes.map(x=>x.n).join(", ")}`); if(out.script) ch.push("✎ script"); if(Array.isArray(out.ideas)&&out.ideas.length) ch.push("＋ new ideas"); if(out.film_look) ch.push("✎ film look"); }
        if(turn.actions.length) ch.push(...turn.actions.map(([x,t])=>`▶ ${x.replace("_"," ")} ${t}`));
        if(ch.length){ last.changes=ch.slice(0,24); if(turn.snap){ const id="u"+Date.now().toString(36); RL_UNDO.clear(); RL.chat.forEach(x=>{ delete x.undo; }); RL_UNDO.set(id,turn.snap); last.undo=id; } } } }
    RL.lastReplyAt=Date.now();
    setTimeout(()=>rlRunActions(turn),80);
    for(const o of own){ const el=(o.handle&&rlElByTag(o.handle))||[...RL.characters,...RL.locations].find(e=>e.name&&o.name&&e.name.toLowerCase()===String(o.name).toLowerCase())||(o.tag&&rlElByTag(o.tag)); if(el) rlUseImage(el.tag,o.blob); }
    const last=RL.chat[RL.chat.length-1];
    if(last?.role==="a"&&mem.count) last.mem={recalled:mem.ids.length,total:mem.count,used:(Array.isArray(out?.used_memories)?out.used_memories:[]).map(String).filter(id=>MEM.byId.has(id)).slice(0,8),searched:searched.slice(0,3)};
  }catch(e){ if(e?.code==="cancelled"){ RL.chatPending=null; RL.chat.push({role:"sys",text:rlAr()?"وقفت. أي إشي عملته الأدوات قبل الوقف ضل محفوظ.":"Stopped. Anything the tools already did stays."}); }
    else if(!rlTransient(e)){ RL.chatPending=null; RL.chat.push({role:"sys",err:true,text:sampleCopy(e)}); } }
  finally{ rlTyping(false); rlBusy=false; RL._ctl=null; { const sb=$("rlSend"); sb.classList.remove("stop"); sb.setAttribute("aria-label","Send"); } rlSave(); rlRender(); setTimeout(uxAutoStep,500); } });
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
    if(o2){ const m={...o2,...n,tag:o2.tag,handle:o2.handle||n.handle,id:o2.id,web:o2.web,lib:n.library!==undefined?n.library:o2.lib,status:o2.status}; if(o2.id&&n.prompt&&n.prompt!==o2.prompt&&!o2.fromUser) m.stale=true; delete m.library; return m; }
    const m={...n,lib:n.library||null,tag:"@img"+(RL.nextTag++)}; delete m.library; return m; });
  const upsert=(oldL,newL)=>{ const m=merge(oldL,newL.filter(x=>x&&typeof x==="object"&&(x.prompt||x.library||x.lib||x.from_attachment!=null||oldL.some(y=>(x.tag&&y.tag===x.tag)||(x.handle&&String(y.handle).toLowerCase()===String(x.handle).toLowerCase()))))); return [...oldL.map(x=>m.find(y=>y.tag===x.tag)||x),...m.filter(y=>!oldL.some(x=>x.tag===y.tag))]; };
  if(Array.isArray(o.characters)) RL.characters=upsert(RL.characters,o.characters);
  if(Array.isArray(o.locations)) RL.locations=upsert(RL.locations,o.locations);
  rlEnsureHandles(RL); rlLinkLibrary();
  if(typeof o.film_look==="string"&&o.film_look.trim()) RL.look=o.film_look.trim();
  let toCheck=[];
  if(Array.isArray(o.scenes)) o.scenes=o.scenes.filter(sc=>sc&&typeof sc==="object"&&(sc.prompt||RL.scenes.some(x=>+x.n===+sc.n)));
  if(Array.isArray(o.scenes)){ const kept=RL.scenes.filter(x=>!o.scenes.some(sc=>+sc.n===+x.n)); RL.scenes=[...kept,...o.scenes.map(sc=>{ const old=RL.scenes.find(x=>+x.n===+sc.n); if(!old){ toCheck.push(sc.n); return {...sc}; }
    const m={...old,...sc}; if(sc.dialogue){ m.dialogue=old.dialogue; rlSetDialogue(m,sc.dialogue); } if(sc.prompt&&sc.prompt!==old.prompt) Object.assign(m,{status:null,clip:null,url:null,note:null,_src:null,web:null});
    if((sc.prompt&&sc.prompt!==old.prompt)||(sc.frame_prompt&&sc.frame_prompt!==old.frame_prompt)||(sc.blueprint&&JSON.stringify(sc.blueprint)!==JSON.stringify(old.blueprint))){ toCheck.push(sc.n); if(m.frame?.id&&sc.frame_prompt&&sc.frame_prompt!==old.frame_prompt) m.frame={...m.frame,stale:true}; }
    return m; })].sort((x,y)=>+x.n-+y.n); }
  if(toCheck.length) setTimeout(()=>rlCheckScenes(toCheck,{quiet:true}),60);
  if(o.stage&&rlStageIx(o.stage)>=0){ if(rlStageIx(o.stage)!==rlStageIx(RL.stage)) RL.view=o.stage; RL.stage=o.stage; }
  RL.chat.push({role:"a",text:String(o.reply||"…"),chips:Array.isArray(o.chips)?o.chips.slice(0,4):[],advisors:Array.isArray(o.advisors)?o.advisors.filter(x=>x&&x.note).slice(0,3).map(x=>({id:String(x.id||""),note:String(x.note).slice(0,400)})):[]});
}
function rlLinkLibrary(){ for(const c of RL.characters){ if(c.fromLib){ c.fromLib=false; } if(!c.lib||c.id||c._live||c._libTried||c.status==="run") continue;
    const want=String(c.lib).toLowerCase(); const hit=CL.list.find(x=>String(x.name||"").split("/").map(y=>y.trim().toLowerCase()).includes(want)); if(!hit) continue;
    c._libTried=true; c.libId=hit.id; if(!c.description) c.description=hit.look||""; clBlob(hit.id).then(b=>rlUseImage(c.tag,b,{quiet:true})).catch(()=>{}); } }
function rlSys(t,bad){ RL.chat.push({role:"sys",text:t,err:!!bad}); rlRenderChat(); }
function rlTyping(on,note){ const b=$("rlMsgs"); b.querySelector(".rl-typing-m")?.remove(); if(!on){ RL_STEPS.length=0; RL_LIVE_TXT=""; return; }
  const d=document.createElement("div"); d.className="rl-m a rl-typing-m"; d.setAttribute("role","status"); d.setAttribute("aria-live","polite");
  d.innerHTML=`<div class="rl-typhead"><span class="rl-typing" aria-hidden="true"><i></i><i></i><i></i></span><span>${esc(note||RL_STEPS.filter(x=>!x.done).slice(-1)[0]?.label||"The Director is thinking…")}</span></div>${RL_STEPS.length?`<ul class="rl-steps">${rlStepsHTML()}</ul>`:""}`;
  if(RL_LIVE_TXT){ d.classList.add("live"); d.insertAdjacentHTML("beforeend",`<div class="rl-live rl-fmt" dir="auto">${rlFmt(RL_LIVE_TXT)}<span class="rl-caret" aria-hidden="true"></span></div>`); }
  b.appendChild(d); b.scrollTop=b.scrollHeight; }
/* ---------- videos in the chat: the page can't reach the web, so the video goes to Gemini through the BAE Gemini Eye connector in small pieces ---------- */
const RL_VMAX=200*1024*1024;
async function rlVideoThumb(url){ try{ const v=document.createElement("video"); v.muted=true; v.playsInline=true; v.preload="auto"; v.src=url; await new Promise((res,rej)=>{ v.onloadeddata=res; v.onerror=rej; setTimeout(rej,6000); }); v.currentTime=Math.min(0.6,(v.duration||1)/3); await new Promise(res=>{ v.onseeked=res; setTimeout(res,2500); }); const k=Math.min(1,160/Math.max(v.videoWidth,v.videoHeight)); const c=document.createElement("canvas"); c.width=Math.max(1,Math.round(v.videoWidth*k)); c.height=Math.max(1,Math.round(v.videoHeight*k)); c.getContext("2d").drawImage(v,0,0,c.width,c.height); return {thumb:c.toDataURL("image/jpeg",.75),dur:v.duration||0}; }catch{ return {thumb:null,dur:0}; } }
async function rlGeminiWatchBlob(blob,question,onStep){
  if(!mcp) throw {code:"no_mcp"};
  const toB64=async b=>{ const u=new Uint8Array(await b.arrayBuffer()); let s=""; for(let i=0;i<u.length;i+=0x8000) s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000)); return btoa(s); };
  const val=r=>r?.payload&&typeof r.payload==="object"?r.payload:(()=>{ try{ return JSON.parse((r?.content||[]).map(c=>c.text||"").join("")); }catch{ return {}; } })();
  const st=val(await mcp.callTool(GEYE,"upload_start",{bytes:blob.size,mime:blob.type||"video/mp4",name:blob.name||"reference.mp4"},{cache:false}));
  if(!st.upload_url) throw {code:"tool_error",message:"Gemini upload didn't start."};
  const CH=+st.chunk_bytes||524288; let file=null;
  onStep?.({stage:"upload",p:0});
  for(let off=0;off<blob.size;off+=CH){
    const last=off+CH>=blob.size;
    if(last) onStep?.({stage:"send",p:100});
    const r=val(await mcp.callTool(GEYE,"upload_chunk",{upload_url:st.upload_url,offset:off,data:await toB64(blob.slice(off,off+CH)),last},{cache:false}));
    if(last) file=r.file; else onStep?.({stage:"upload",p:Math.min(99,Math.round((off+CH)/blob.size*100))});
  }
  if(!file?.name) throw {code:"tool_error",message:"Gemini didn't confirm the upload."};
  onStep?.({stage:"watch",p:100});
  let w=null;
  for(let i=0;;i++){ try{ w=await mcp.callTool(GEYE,"watch_video",{file_name:file.name,question,fps:blob.size>40*1048576?2:3},{cache:false}); break; }
    catch(e){ const m=String(e?.message||e?.result?.content?.[0]?.text||""); if(i<5&&/still processing|took too long|busy|high demand|503|429/i.test(m)){ await new Promise(r=>setTimeout(r,8000)); continue; } throw e; } }
  return typeof w?.payload==="string"?w.payload:w?.payload?.answer||(w?.content||[]).map(c=>c.text||"").join("");
}
const RL_VSTAGE={upload:"Uploading",send:"Sending to Gemini…",watch:"Gemini is watching and listening…",done:"Uploaded · Gemini watched it",err:"Not uploaded"};
function rlVProgHTML(v){
  const st=v._stage||(v.analysis?"done":v.err?"err":"upload"), p=st==="upload"?(v._p||0):100;
  const busy=st==="send"||st==="watch";
  return `<div class="rl-vprog ${st}" data-vprog="${esc(v.id||"")}" role="progressbar" aria-label="${esc(v.name)}" aria-valuemin="0" aria-valuemax="100" ${busy?"":`aria-valuenow="${p}"`}><div class="rl-vprog-h"><span>🎬 ${esc(v.name)}${v.size?` · ${(v.size/1048576).toFixed(1)} MB`:""}</span><b>${st==="upload"?`Uploading ${p}%`:st==="done"?"✓ "+RL_VSTAGE.done:st==="err"?"✕ "+RL_VSTAGE.err:RL_VSTAGE[st]}</b></div><div class="rl-vprog-t"><i style="width:${p}%"${busy?' class="run"':""}></i></div></div>`;
}
function rlVProgUpdate(v){ const el=document.querySelector(`[data-vprog="${CSS.escape(v.id||"")}"]`); if(el) el.outerHTML=rlVProgHTML(v); }
function rlVideoQuestion(userText){
  return `You are the eyes of an AI commercial director at Bank al Etihad (Jordan). The user attached this video to the chat${userText?` with the message: "${String(userText).slice(0,600)}"`:""}. Watch ALL of it, picture and sound together, and write a precise, factual breakdown the director can use (never guess; say when unsure). Use MM:SS timestamps.
1. OVERVIEW: what it is (ad, storyboard animatic, reference clip, behind-the-scenes, trend), length, aspect ratio, overall idea and why it works or doesn't.
2. SHOT BY SHOT: for each shot — timecode range, shot size, angle, lens feel (wide/normal/tele, depth of field), camera move (and speed), who is where and what they do, acting/expressions, props, location, light (direction, quality, colour temperature), colour grade, on-screen text (exact words), transitions.
3. SOUND: transcribe all speech exactly (and the language/dialect), music (mood, tempo, where it hits), SFX, silence.
4. RHYTHM & STORY: hook in the first 2 seconds, beats (setup, problem, choice, resolution), pacing and cut rhythm, the payoff and brand moment.
5. TO RECREATE WITH SEEDANCE 2.5: the characters, locations and props it would need as assets, and the 3–5 most important things to get right.`;
}


/* Claude writes or revises ONE element without touching the rest of the project */
async function rlWriteElement(kind,base,instruction){
  const set=rlSet();
  const o=await rlAsk(`You write production assets for a Bank al Etihad reel (${set.aspect}, ${set.length} s).
${kind==="character"?"Write a CHARACTER.\n"+JO_PORTRAIT:kind==="prop"?"Write a PROP / PRODUCT. The image prompt MUST follow this house template exactly, keeping every fixed sentence and replacing every [bracket] with specific detail:\n"+rlTpl("prop"):"Write a LOCATION. The image prompt MUST follow this house template, replacing every [bracket] with specific detail (positions of walls, doors, windows and furniture included):\n"+rlTpl("loc")}
${RL_BAE}

Reel so far: ${trimJSON({title:RL.title,idea:RL.picked,notes:RL.notes,script:RL.script},6000)}
Current element (JSON): ${trimJSON(base,4000)}
User request: ${instruction||"Write it well from the name and description."}

${kind==="character"?JO_FACE+"\n":kind==="location"?JO_PLACE+"\n":""}Reply with only JSON: {"name":"","role":"","description":"one or two lines","wardrobe":"${kind==="character"?"the outfit":""}","prompt":"the full image prompt"}`,{modelTier:"default"});
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
      return `<article class="rl-pc"><button type="button" class="rl-pc-open" data-open="${esc(p.id)}"><span class="rl-pc-cover">${im?`<img src="${im}" alt="">`:`<i aria-hidden="true">${esc((p.title||"R").trim().slice(0,1).toUpperCase())}</i>`}</span><span class="rl-pc-meta"><b dir="auto">${esc(p.title)}</b><span>${esc(st)} · ${p.n?.cast||0} cast · ${p.n?.shots||0} shots${p.n?.done?` · ${p.n.done} filmed`:""}</span><span class="t12 muted">Edited ${rlAgo(p.updatedAt)}</span>${p.two==="ask"?`<span class="rl-pc-two">Two versions: this device ${esc(rlClock(p.lAt))}, account ${esc(rlClock(p.cAt))}. Open it to choose.</span>`:p.two==="local"?`<span class="rl-pc-two">The newest version is on this device only. Open it to send it to your account.</span>`:""}</span></button>
        <div class="rl-pc-act">${p.two==="ask"?"":`<button type="button" class="a-btn" data-dup="${esc(p.id)}">Duplicate</button>`}<button type="button" class="a-btn" data-bak="${esc(p.id)}">Backup</button>${p.two?"":`<button type="button" class="a-btn" data-del="${esc(p.id)}">Delete</button>`}</div></article>`; };
    box.innerHTML=`<button type="button" class="rl-pc rl-pc-new" id="rlNewCard"><span class="plus" aria-hidden="true">+</span><b>New reel</b><span class="t12 muted">Start from an idea, a brief or a storyboard</span></button><button type="button" class="rl-pc rl-pc-new ux-pgcard" data-uxpg><span class="plus" aria-hidden="true">✎</span><b>Prompt Generator</b><span class="t12 muted">A ready prompt for a character, a place or a prop</span></button>`+list.map(card).join("");
  });
}
async function rlOpen(id){
  const p=id?await rlLoadProject(id):null; if(id&&!p) return rlShowLib();
  RLS.clash=null; RL=p||rlNew(); if(!p) rlSave();
  $("rlLib").hidden=true; $("rlProjView").hidden=false; $("reels").dataset.mode="proj"; $("reels").dataset.view="chat";
  clLoad().then(()=>{ if(RL){ rlLinkLibrary(); rlBoard(); } }); rlLinkLibrary(); rlSyncSettings(); rlSavedState("saving"); rlRender(); if(p) rlFlush();
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
    const mag=[...rlEls().filter(e=>e.pending&&!e._live).map(e=>({kind:"el",o:e})),...(RL.script?.scenes||[]).filter(s=>s.board?.pending&&!s.board._live).map(s=>({kind:"el",o:s.board})),...RL.scenes.filter(s=>s.frame?.pending&&!s.frame._live).map(s=>({kind:"frame",o:s.frame})),...RL.scenes.filter(s=>s.pending&&!s._live).map(s=>({kind:"video",o:s})),...(RL.final?.pending&&!RL.final._live?[{kind:"final",o:RL.final}]:[])];
    const claudeJobs=RL.scenes.filter(s=>(s.checkPending&&!s._checking)||(s.improvePending&&!s._improving)).length+rlEls().filter(e=>e.status==="write"||e.revisePending).length;
    if(!mag.length&&!claudeJobs&&!RL.chatPending) return;
    if(mag.length&&mcp){ if(!S.connected) await connect(true);
      await Promise.allSettled(mag.map(async({kind,o})=>{ o._live=true; o.status="run"; if(kind==="video") o.note="Picking up the render from Magnific…"; rlBoard();
        try{ const video=kind==="video"||kind==="final"; let rr=await waitFor([o.pending],video?"video":"image",video?30:10,video);
          if(kind==="video"){ await rlFinishVideo(o,rr,o.pending); o.note="Finished while you were away."; }
          else if(kind==="final"){ const all=[...rr.urls,...rr.links]; Object.assign(o,{id:rr.ids[0]||o.pending,web:rr.webUrl||o.web||null,url:all.find(u=>/\.(mp4|mov|webm)(\?|#|$)/i.test(u))||null,status:null,note:"Final reel ready."}); delete o.pending; await rlLoadVideo(o,o.id); }
          else { const id=rr.ids[0]||o.pending; let shot=rr.images[0]; if(!shot){ const pv=await preview(id); shot=pv.image; } if(shot){ const src=`data:${shot.mime};base64,${shot.data}`; rlFull[id]=src; rlTSet(id,await rlThumb(src,rlIsSheet(id)?1100:480)); }
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
function rlRenderNavOld(){
  const si=rlStageIx(RL.stage);
  const done=k=>({idea:!!RL.picked,script:!!RL.script?.scenes?.length,characters:RL.characters.length>0&&RL.characters.every(e=>e.id),locations:RL.locations.length>0&&RL.locations.every(e=>e.id),directing:RL.scenes.length>0&&RL.scenes.every(s=>s.status==="done"),render:!!RL.space?.url||!!RL.final?.id})[k];
  $("rlStages").innerHTML=RL_STAGES.map(([k,l],i)=>`<button type="button" role="tab" aria-selected="${RL.view===k}" data-tab="${k}" class="${done(k)?"done":""}${i===si?" cur":""}${i>si+1&&!done(k)?" later":""}"><span class="n" aria-hidden="true">${done(k)?"✓":i+1}</span><span class="lb">${l}</span></button>`).join("");
  requestAnimationFrame(()=>$("rlStages").querySelector('[aria-selected="true"]')?.scrollIntoView?.({block:"nearest",inline:"center"}));
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
/* under each Director reply: what it remembered before answering */
function rlMemChip(m){
  const used=(m.used||[]).map(id=>MEM.byId.get(id)).filter(Boolean);
  return `<details class="rl-memchip" dir="auto"><summary><span aria-hidden="true">🧠</span> Read ${m.recalled} of ${m.total} memories${m.searched?.length?` · searched ${m.searched.map(q=>`“${esc(q)}”`).join(", ")}`:""}${(m.used||[]).length?` · ${(m.used||[]).length} shaped this answer`:""}</summary>${used.length?used.map(c=>`<div class="rl-memc"><span class="k">${esc(c.k)}</span> ${esc(c.t.length>260?c.t.slice(0,260)+"…":c.t)}</div>`).join(""):`<div class="rl-memc muted">Open the Director's brain to search everything it remembers.</div>`}</details>`;
}
/* readable replies: bullets, numbered lists and **bold** */
function rlFmt(t){
  const lines=String(t||"").split("\n"); let out="", list=null;
  const inl=x=>esc(x).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>");
  const close=()=>{ if(list){ out+=`</${list}>`; list=null; } };
  for(const ln of lines){
    const b=ln.match(/^\s*[•\-\*·]\s+(.*)$/), n=ln.match(/^\s*\d+[.)]\s+(.*)$/);
    if(b||n){ const k=b?"ul":"ol"; if(list!==k){ close(); out+=`<${k}>`; list=k; } out+=`<li>${inl((b||n)[1])}</li>`; continue; }
    close(); out+=ln.trim()?`<p>${inl(ln)}</p>`:"";
  }
  close(); return out;
}
function rlAdvHTML(m,mi){
  const list=(m.advisors||[]).map((x,ai)=>({x,ai})).filter(({x})=>x&&x.note);
  if(!list.length) return "";
  const live=list.filter(({x})=>!x.used&&!x.skipped);
  return `<section class="rl-room2" aria-label="Ideas from the assistant directors"><div class="rl-room2-h"><span>The room</span><span class="t12 muted">${live.length?`${live.length} idea${live.length>1?"s":""} from your assistant directors`:"all answered"}</span></div>
    <div class="rl-room2-list">${list.map(({x,ai})=>{ const A=rlAdv(x.id); return `<div class="rl-room2-c${x.used?" used":x.skipped?" skipped":""}"><span class="av" aria-hidden="true">${esc(A.icon||"•")}</span><div class="tx"><div class="who"><b>${esc(A.name||x.id)}</b>${A.role?`<span>${esc(A.role)}</span>`:""}</div><p dir="auto">${esc(x.note)}</p>${x.used?`<span class="st">✓ Applied</span>`:x.skipped?`<span class="st">Skipped</span>`:`<div class="ac"><button type="button" class="btn small primary" data-adv="${mi}:${ai}">Apply</button><button type="button" class="btn small" data-advskip="${mi}:${ai}">Skip</button></div>`}</div></div>`; }).join("")}</div></section>`;
}
/* what the Director is doing right now, step by step */
const RL_STEPS=[];
function rlStep(label,{done,id}={}){
  const last=RL_STEPS[RL_STEPS.length-1];
  if(id&&RL_STEPS.find(x=>x.id===id)){ const x=RL_STEPS.find(x=>x.id===id); x.label=label; if(done) x.done=true; }
  else { if(last&&!last.done&&!done) last.done=true; RL_STEPS.push({id,label,done:!!done}); }
  const b=$("rlMsgs").querySelector(".rl-typing-m .rl-steps"); if(b) b.innerHTML=rlStepsHTML(); else rlTyping(true);
}
const rlStepsHTML=()=>RL_STEPS.slice(-6).map(x=>`<li class="${x.done?"ok":"run"}"><span class="d" aria-hidden="true">${x.done?"✓":""}</span>${esc(x.label)}</li>`).join("");
function rlRenderChat(){
  const b=$("rlMsgs");
  if(!RL.chat.length) b.innerHTML=uxHelloHTML();
  else b.innerHTML=RL.chat.map((m,mi)=>{
    const role=m.role==="u"?"u":m.role==="a"?"a":"sys";
    const media=`${m.thumbs?.length?`<div class="imgs">${m.thumbs.map(t=>`<img src="${t}" alt="">`).join("")}</div>`:m.n?`<div class="t12" style="opacity:.7;margin-top:6px">${m.n} image${m.n>1?"s":""} attached</div>`:""}${m.n&&role==="u"?`<div class="rl-sent">✓ ${m.n} image${m.n>1?"s":""} sent</div>`:""}${m.videos?.length?m.videos.map(v=>v.analysis&&!v._stage?`${rlVProgHTML({...v,_stage:"done"})}<details class="rl-vsaw"><summary>What Gemini saw</summary><div dir="auto">${esc(String(v.analysis).slice(0,6000))}</div></details>`:v._stage&&v._stage!=="done"&&v._stage!=="err"?rlVProgHTML(v):v.analysis?`${rlVProgHTML({...v,_stage:"done"})}<details class="rl-vsaw"><summary>What Gemini saw</summary><div dir="auto">${esc(String(v.analysis).slice(0,6000))}</div></details>`:rlVProgHTML({...v,_stage:"err"})).join(""):""}`;
    const body=role==="a"?`<div class="rl-fmt">${rlFmt(m.text)}</div>`:esc(m.text||"");
    return `${role==="a"&&RL.chat[mi-1]?.role!=="a"?`<div class="rl-who"><span class="av" aria-hidden="true">✦</span>Director</div>`:""}<div class="rl-m ${role}${m.err?" err":""}" dir="auto">${body}${media}</div>${m.changes?.length?`<div class="rl-chg${m.undone?" undone":""}"><div class="h"><b>${m.undone?"Undone":"Done in the studio"}</b>${m.undo&&RL_UNDO.has(m.undo)?`<button type="button" class="btn small" data-rlundo="${m.undo}">Undo</button>`:""}</div><ul>${m.changes.map(c=>`<li dir="auto">${esc(c)}</li>`).join("")}</ul></div>`:""}${rlIntakeHTML(m,mi)}${rlKitHTML(m,mi)}${m.prompt?.text?`<details class="rl-vsaw"><summary>${esc(m.prompt.label||"Prompt")}</summary><div dir="auto">${esc(String(m.prompt.text).slice(0,6000))}</div></details>`:""}${rlAdvHTML(m,mi)}${m.mem?rlMemChip(m.mem):""}`;
  }).join("");
  if(RL.chatPending&&!rlBusy) b.insertAdjacentHTML("beforeend",`<div class="rl-m sys rl-retry" dir="auto">The connection dropped before Claude answered. Your message is saved. <button type="button" class="a-btn" id="rlRetry">Answer it now</button></div>`);
  if(rlBusy&&RL_STEPS.length) rlTyping(true);
  b.scrollTop=b.scrollHeight;
  const last=[...RL.chat].reverse().find(m=>m.role==="a");
  const chips=last?.chips?.length?last.chips:(RL.chat.length?rlChipsFor():["بدي ريلز عن Quick Pay: ادفع كل فواتيرك بكبسة زر","Give me 3 viral ideas for a BAE savings reel"]);
  $("rlChips").innerHTML=chips.map(c=>`<button type="button" dir="auto">${esc(c)}</button>`).join("");
  uxRenderNext();
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
    const nb=(RL.script?.scenes||[]).filter(s=>s.board?.id).length, busyB=(RL.script?.scenes||[]).some(s=>s.board?._live);
    out.push(rlHead("Script",RL.script?`${esc(RL.script.title||"")} · ${RL.script.duration_s||rlSet().length} s · edit any line, or ask Claude for changes in the chat`:"Scene by scene, with timing, dialogue, on-screen text and sound.",
      RL.script?.scenes?.length?`<button class="a-btn" type="button" data-rl="genboard"${busyB?" disabled":""}>${busyB?"Drawing the storyboard…":nb?"Redraw all scenes":"Create storyboard"}</button><label class="a-btn ux-sbstyle" title="Optional: one image whose drawing style every sheet follows">${RL.sbStyle?.id?"Style reference ✓":RL._sbUp?"Uploading…":"Style reference"}<input type="file" accept="image/*" class="sr" data-ux-sbstyle></label>${RL.sbStyle?.id?`<button class="a-btn" type="button" data-ux="sbstyleoff">Remove style</button>`:""}${nb?`<button class="a-btn" type="button" data-ux="animatic">▶ Free preview</button><button class="a-btn" type="button" data-rl="dlboard">Download all (${nb})</button>`:""}`:""));
    if(!RL.script?.scenes?.length) out.push(rlEmpty(RL.picked?"Ask Claude to write the script for the chosen idea.":"Choose an idea first.",RL.picked?`<button class="btn primary" type="button" data-rl="sayraw" data-t="${esc(rlAr()?"اكتبلي السيناريو للفكرة المختارة.":"Write the script for the chosen idea.")}">Write the script</button>`:`<button class="btn" type="button" data-tab="idea">Go to Idea</button>`));
    else{ out.push(`<div class="rl-card">${RL.script.scenes.map((s,i)=>`<div class="rl-beat${s.board?" has-sb":""}" dir="auto"><span class="tc">${esc(s.time||"")}</span><div class="ln"><b>${esc(s.title||"")}</b>
      <textarea class="rl-field" rows="2" data-rl-edit="b:${i}:action" aria-label="Action">${esc(s.action||"")}</textarea>
      <textarea class="rl-field" rows="${Math.max(1,(s.dialogue||[]).length)}" data-rl-edit="b:${i}:dialogue" aria-label="Dialogue, one line per speaker as Name: line" placeholder="Name: line">${esc((s.dialogue||[]).map(d=>`${d.who||""}: ${d.line||""}`).join("\n"))}</textarea>
      <div class="rl-two"><input class="rl-field" data-rl-edit="b:${i}:on_screen_text" value="${esc(s.on_screen_text||"")}" placeholder="On-screen text" aria-label="On-screen text"><input class="rl-field" data-rl-edit="b:${i}:sound" value="${esc(s.sound||"")}" placeholder="Sound" aria-label="Sound"></div></div>${s.board?rlBoardCell(s,i):""}</div>`).join("")}</div>`);
      out.push(`<div class="rl-btns rl-rateline"><span class="t12 muted">How is this script?</span>${rlRate("script","script:"+(RL.script.title||""),RL.script.scenes.map(s=>`${s.title}: ${s.action}`).join(" / "))}</div>`);
      if(rlStageIx(RL.stage)<=rlStageIx("script")) out.push(rlNext("approveScript","Approve script · build the cast"));
    }
  }
  if(v==="characters"||v==="locations"){
    const isC=v==="characters", list=isC?RL.characters:RL.locations;
    out.push(rlHead(isC?"Cast":"Locations & props",isC?"Reference sheets keep every face the same in every shot.":"Empty establishing images and product sheets. Every shot inherits their light.",
      `${list.some(e=>!e.id&&!e.fromLib&&e.prompt)?`<button class="a-btn" type="button" data-rl="genall" data-list="${isC?"c":"l"}">Generate all missing</button>`:""}`));
    const add=RL._adding&&((isC&&RL._adding==="character")||(!isC&&RL._adding!=="character"))?rlAddForm(RL._adding):"";
    out.push(`<div class="rl-grid">${list.map(e=>rlElCard(e,isC?"c":"l")).join("")}${add||`<div class="rl-addcard">${isC?`<button type="button" class="rl-add" data-rl="add" data-k="character"><span aria-hidden="true">+</span>Add character</button><div class="rl-libcast"><span class="t12 muted">${CL.list.length?"Or cast from the character library":"The character library is empty — add characters in Photography → References → Characters"}</span><div>${CL.list.slice(0,24).map(c=>`<button type="button" class="rl-castchip" data-ux="castlib" data-id="${esc(c.id)}" ${RL.characters.some(x=>x.libId===c.id)?"disabled":""}>${c.thumb?`<img src="${c.thumb}" alt="">`:""}<span dir="auto">${esc(String(c.name||"").split("/")[0].trim())}</span></button>`).join("")}</div></div>`:`<button type="button" class="rl-add" data-rl="add" data-k="location"><span aria-hidden="true">+</span>Add location</button><button type="button" class="rl-add" data-rl="add" data-k="prop"><span aria-hidden="true">+</span>Add prop</button>`}</div>`}</div>`);
    if(isC&&rlStageIx(RL.stage)<=rlStageIx("characters")&&list.length) out.push(rlNext("approveCast","Approve cast · build the locations"));
    if(!isC&&rlStageIx(RL.stage)<=rlStageIx("locations")&&list.length) out.push(rlNext("approveLoc","Approve locations · direct the shots"));
  }
  if(v==="directing"){
    const set=rlSet(), ar=set.aspect.replace(":"," / ");
    const missing=rlEls().filter(e=>!e.id).map(e=>e.tag);
    out.push(rlHead("Shots",`${RL.scenes.length?RL.scenes.length+" scenes · ":""}${set.aspect} · ${set.res==="draft"?"Draft 480p":set.res} · Seedance 2.5 with every asset as a reference (no start frame)`,RL.scenes.length?`<button class="a-btn" type="button" data-ux="animatic">▶ Free preview</button><button class="a-btn" type="button" data-rl="allvideos">All videos</button>`:""));
    if(missing.length&&RL.scenes.length) out.push(`<p class="rl-warn">Generate ${missing.join(", ")} first (Cast / Locations) so every shot can use them.</p>`);
    if(!RL.scenes.length) out.push(rlEmpty("Claude writes one Seedance 2.5 prompt per scene, with its first frame, from the script, cast and locations.",`<button class="btn primary" type="button" data-rl="say" data-t="approveLoc">Direct the shots</button>`));
    else{ out.push(`<div class="rl-sb">${RL.scenes.map(sc=>{ const im=rlTGet(sc.clip)||rlTGet(sc.frame?.id); return `<button type="button" class="rl-sbi" data-rl="goto" data-n="${sc.n}" style="aspect-ratio:${ar}" aria-label="Scene ${sc.n}">${im?`<img src="${im}" alt="">`:""}<span>${sc.n}</span>${sc.status==="done"?'<i aria-hidden="true">▶</i>':""}${sc.status==="run"||sc.frame?.status==="run"?'<em class="dot" aria-hidden="true"></em>':""}</button>`; }).join("")}</div>`);
      out.push(`<details class="rl-card rl-look"${RL.look?"":" open"}><summary><b>Film look</b><span class="t12 muted">Shared by every shot, added on top of each prompt when it renders</span></summary><textarea class="rl-prompt" data-rl-edit="look:0" spellcheck="false" dir="ltr" placeholder="Claude writes the film look with the scenes: stock look, lens character, grade with a 60/30/10 colour split, white balance, 24 fps, skin, global constraints, audio policy.">${esc(RL.look||"")}</textarea></details>`);
      out.push(RL.scenes.map(rlShotCard).join("")); }
  }
  if(v==="render"){ out.push(rlDeliver()); out.push(uxSizesHTML()); }
  /* keep the page exactly where the user is: a re-render must never jump the scroll */
  const scr=[$("reels"),B,B.parentElement,document.scrollingElement].filter(Boolean).map(el=>[el,el.scrollTop,el.scrollLeft]); const viewWas=RL._viewShown; RL._viewShown=v;
  B.style.minHeight=B.offsetHeight+"px";
  B.innerHTML=out.join("");
  uxCostFill(B); uxRenderNext(); if(RL.auto&&!rlBusy){ clearTimeout(UX.autoT); UX.autoT=setTimeout(uxAutoStep,1500); }
  if(viewWas===v) for(const [el,t,l] of scr){ if(el.scrollTop!==t) el.scrollTop=t; if(el.scrollLeft!==l) el.scrollLeft=l; }
  B.style.minHeight="";
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
    <div class="rl-media${busy||writing?" busy":""}" style="aspect-ratio:${isProp?"1 / 1":kind==="c"&&e.stage==="portrait"?"3 / 4":"16 / 9"}">${th?`<img src="${th}" alt="${esc(e.name||"")}" data-zoom="${esc(img)}">`:`<span class="ph">${busy||writing?"":img?"Loading image…":"No image yet"}</span>`}${busy?`<span class="rl-busy">${e._note||"Generating…"}</span>`:writing?`<span class="rl-busy">Claude is writing…</span>`:""}</div>
    <p>${esc(e.description||e.role||"")}</p>
    ${e.status==="paused"?`<p class="rl-status">Still generating in Magnific — it appears here when it's done.</p>`:""}
    ${e.fromUser&&e.id?`<p class="rl-status">✓ Your image — used as ${esc(e.handle||e.tag)} in every first frame and shot.</p>`:""}
    ${e.fromLib?`<p class="rl-status${e.id?"":" bad"}">${e.id?"BAE character from your Magnific library":"Link your Magnific library first (Photography → References → Link library), so this character can be attached."}</p>`:""}
    ${kind==="c"&&e.id&&e.stage==="portrait"&&!busy?`<p class="rl-status ux-keep">Step 1 of 2 — this is the portrait. Happy with the face? Turn it into the character sheet. Not yet? Generate another.</p>`:""}${kind==="c"&&e.stage==="sheet"&&!busy?`<p class="rl-status ux-keep">✓ Character sheet made from the chosen portrait.</p>`:""}
    <div class="rl-btns">${kind==="c"&&e.id&&CL.canEdit&&!e.libId&&!busy?`<button class="btn small" type="button" data-ux="savelib" data-tag="${e.tag}">Save to library</button>`:""}${kind==="c"&&e.id&&(e.stage==="portrait"||(e.fromUser&&e.stage!=="sheet"))&&!e.fromLib?`<button class="btn small primary" type="button" data-ux="sheet" data-tag="${e.tag}" ${busy||writing?"disabled":""}>Make character sheet</button>`:""}${e.fromLib?"":`<button class="btn small${e.id&&!e.stale?"":" primary"}" type="button" data-rl="gen" data-tag="${e.tag}" ${busy||writing||!e.prompt?"disabled":""}>${busy?(e._note?"Working…":"Generating…"):e.fromUser?"Generate instead":e.id?(kind==="c"&&!rlIsSheetPrompt(e.prompt)?"Another portrait":"Regenerate"):(kind==="c"&&!rlIsSheetPrompt(e.prompt)?"Generate portrait":"Generate image")}</button><label class="btn small rl-own" ${busy?'aria-disabled="true"':""}>${e.id?"Replace":"Use my image"}<input type="file" accept="image/*" class="sr" data-rl-own="${esc(e.tag)}" ${busy?"disabled":""}></label>`}${e.id&&!busy?`<button class="btn small" type="button" data-ux="dl" data-id="${esc(e.id)}" data-name="${esc(e.name||e.handle||"image")}">Download</button>`:""}<button class="btn small" type="button" data-rl="edit" data-tag="${e.tag}">Edit</button>${e.web?`<a class="btn small" href="${esc(e.web)}" target="_blank" rel="noopener">Magnific</a>`:""}<span class="rl-sp"></span>${rlRate(kind==="c"?"character":e.kind||"location","el:"+e.tag+":"+(e.id||"p"),`${e.name}: ${e.description||""} | ${String(e.prompt||"").slice(0,600)}`)}</div>
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
/* which disclosures the user opened stay open across re-renders */
const RL_OPEN=new Set();
const rlOpenAttr=(k,def)=>RL_OPEN.has(k)?" open":RL_OPEN.has("!"+k)?"":def?" open":"";
function rlShotNext(sc){
  const f=sc.frame||{};
  if(sc._improving||sc.improvePending) return {label:sc.prompt?"Updating the prompt…":"Writing the scene…",busy:true};
  if(f.status==="run"||f.pending) return {label:"Generating first frame…",busy:true};
  if(sc.status==="run"||sc.pending) return {label:sc.pending?"Rendering in Magnific…":"Rendering video…",busy:true};
  if(sc._reviewing) return {label:"Gemini is watching…",busy:true};
  if(!f.id&&sc.useFrame===true) return {label:"Generate first frame",act:"frame"};
  if(sc.status!=="done") return {label:"Generate video",act:"render"};
  if(!sc.review||sc.review.clip!==sc.clip) return {label:"👁 Review with Gemini",act:"review"};
  if(sc.review.issues?.length&&sc.review.verdict!=="keep") return {label:"Fix the prompt with Gemini’s notes",act:"revfix"};
  return {label:"Generate video again",act:"render",quiet:true};
}
function rlShotCard(sc){
  const set=rlSet(), ar=set.aspect.replace(":"," / "), f=sc.frame||{};
  const {refs}=rlSceneRefs(sc), fr=rlSceneRefs(sc,"frame_prompt").refs;
  const used=[...new Map([...fr,...refs].filter(r=>!r.map).map(r=>[r.global,r])).values()].sort((x,y)=>+x.global.slice(4)-+y.global.slice(4));
  const vsrc=sc._src||(!sc._blocked&&sc.url)||null, poster=rlTGet(sc.clip)||rlTGet(f.id)||"";
  if(f.id&&!rlTGet(f.id)) rlNeed(f.id);
  const busy=f.status==="run"?"Generating first frame…":sc.status==="run"?(sc.note||"Rendering video…"):"";
  const media=vsrc&&sc.status==="done"?`<video src="${esc(vsrc)}" ${poster?`poster="${poster}"`:""} controls playsinline loop preload="metadata" data-rl-vid="${sc.n}"></video>`
    :poster?`<img src="${poster}" alt="Scene ${sc.n}" data-zoom="${esc(f.id||sc.clip)}">`:`<span class="ph">${busy?"":`Scene ${sc.n}`}</span>`;
  const startOK=!!f.id, useStart=startOK&&sc.useFrame===true, ck=sc.check, nx=rlShotNext(sc), K="scn:"+sc.n;
  const chip=(ok,label,warn)=>`<span class="rl-chip${ok?" ok":warn?" warn":""}">${ok?"✓ ":""}${label}</span>`;
  const chips=[
    sc._checking?`<span class="rl-chip"><span class="spin" aria-hidden="true"></span> Checking</span>`:ck?.dirty?chip(false,"Check again",true):ck?chip(true,`${ck.passed||0}/8 checks`):chip(false,"Not checked"),
    chip(!!f.id,"First frame"), chip(sc.status==="done","Video"),
    sc.review&&sc.review.clip===sc.clip?chip(sc.review.verdict==="keep",`Gemini ${sc.review.score}/10`,sc.review.verdict!=="keep"):""
  ].join("");
  return `<article class="rl-scn" id="rlShot${sc.n}" dir="auto">
    <div class="rl-scn-media"><div class="rl-media dark${busy?" busy":""}" style="aspect-ratio:${ar}">${media}${busy?`<span class="rl-busy">${esc(busy)}</span>`:""}${sc.status==="done"?`<span class="rl-badge">Video</span>`:f.id?`<span class="rl-badge">First frame</span>`:""}</div></div>
    <div class="rl-scn-body">
      <div class="rl-scn-head"><span class="rl-tag">Scene ${sc.n}</span><span class="sub">${sc.duration_s||""} s</span></div>
      <h3 class="rl-scn-title">${esc(sc.title||"")}</h3>
      ${sc.logline?`<p class="rl-scn-log">${esc(sc.logline)}</p>`:""}
      <div class="rl-chips">${chips}</div>
      ${used.length?`<div class="rl-refs" aria-label="Cast and places in this scene">${used.map(r=>{ const e=rlElByTag(r.global), im=rlTGet(rlImgOf(e)); return `<span class="rl-ref" title="${esc(e?.name||"")}">${im?`<img src="${im}" alt="" data-zoom="${esc(rlImgOf(e))}">`:`<i></i>`}<b>${esc(e?.name||rlLabel(e)||r.global)}</b></span>`; }).join("")}</div>`:""}
      <div class="rl-scn-cta">${nx.act?`<button class="btn small${nx.quiet?"":" primary"}" type="button" data-rl="${nx.act}" data-n="${sc.n}">${nx.label}</button>${nx.act==="render"?`<span class="ux-cost" data-uxcost='{"k":"video","s":${+sc.n}}'></span>`:""}`:`<span class="rl-chip"><span class="spin" aria-hidden="true"></span> ${esc(nx.label)}</span>`}<button class="btn small" type="button" data-rl="ask" data-n="${sc.n}" aria-expanded="${!!sc._ask}" ${sc._improving?"disabled":""}>✎ Ask for edit</button></div>
      ${f.err?`<p class="rl-status bad">${esc(f.err)}</p>`:""}${sc.note&&sc.status==="err"?`<p class="rl-status bad">${esc(sc.note)}</p>`:""}
      ${sc._ask||sc._improving||sc.improveErr||sc.lastChange?.changes?.length?`<div class="rl-scn-edit">${rlShotBar(sc,true)}</div>`:""}
      <details class="rl-scn-more" data-open-key="${K}"${rlOpenAttr(K)}><summary>Scene details <span class="t12 muted">prompts · blocking · the room · review</span></summary>
        <div class="rl-scn-inner">
          ${rlShotBar(sc,false)}
          ${rlBlockingHTML(sc)}
          <details class="rl-sec" data-open-key="${K}:f"${rlOpenAttr(K+":f")}><summary>First frame prompt <span class="t12 muted">Seedream 5.5 · ${set.aspect}</span></summary>
            <textarea class="rl-prompt" id="rlF${sc.n}" data-rl-edit="f:${sc.n}" spellcheck="false" dir="ltr" placeholder="Written from the scene when you generate the first frame">${esc(sc.frame_prompt||"")}</textarea>
            <div class="rl-btns"><button class="btn small" type="button" data-rl="frame" data-n="${sc.n}" ${f.status==="run"||f.pending?"disabled":""}>${f.status==="run"||f.pending?"Generating…":f.id?"Regenerate first frame":"Generate first frame"}</button>${f.web?`<a class="btn small" href="${esc(f.web)}" target="_blank" rel="noopener">Magnific</a>`:""}</div>
            ${f.status==="paused"||(f.pending&&f.status!=="run")?`<p class="rl-status">Still generating in Magnific — it appears here when it's done.</p>`:""}${f.stale&&f.id?`<p class="rl-status warn">The supervisor corrected this prompt after the image was made. Regenerate it.</p>`:""}
          </details>
          ${rlDialogueHTML(sc)}${uxSpeakHTML(sc)}
          <details class="rl-sec" data-open-key="${K}:v"${rlOpenAttr(K+":v")}><summary>Video prompt <span class="t12 muted">Seedance 2.5 · ${Math.max(4,Math.min(120,+sc.duration_s||8))} s</span></summary>
            <textarea class="rl-prompt tall" data-rl-edit="s:${sc.n}" spellcheck="false" dir="ltr">${esc(sc.prompt||"")}</textarea>
            <label class="rl-chk"><input type="checkbox" data-rl-start="${sc.n}" ${useStart?"checked":""} ${startOK?"":"disabled"}> Start the video from the first frame (off = Seedance builds the shot from the references only)${startOK?"":" — generate a first frame first"}</label>
            <div class="rl-btns"><button class="btn small" type="button" data-rl="render" data-n="${sc.n}" ${sc.status==="run"||sc.pending?"disabled":""}>${sc.status==="run"?"Rendering…":sc.pending?"Rendering in Magnific…":sc.status==="done"?"Generate video again":"Generate video"}</button>${sc.status==="done"&&!vsrc&&!sc._blocked?`<button class="btn small" type="button" data-rl="play" data-n="${sc.n}">Play here</button>`:""}<button class="btn small" type="button" data-rl="copys" data-n="${sc.n}">Copy prompt</button>${sc.url?`<a class="btn small" href="${esc(sc.url)}" target="_blank" rel="noopener">MP4</a>`:""}${sc.web?`<a class="btn small" href="${esc(sc.web)}" target="_blank" rel="noopener">Magnific</a>`:""}</div>
            ${sc.stale&&sc.clip?`<p class="rl-status warn">The scene prompt was corrected after this video was made.</p>`:""}
            ${sc._blocked&&!vsrc&&sc.status==="done"?`<p class="rl-status">The video can't play inside this page — open the MP4 or Magnific to watch it.</p>`:""}
          </details>
          ${sc.status==="done"?`<details class="rl-sec" data-open-key="${K}:r"${rlOpenAttr(K+":r",!!sc.review)}><summary>Gemini review</summary>${rlReviewHTML(sc)}</details>`:""}
          ${sc.status==="done"||f.id?`<div class="rl-btns rl-rateline"><span class="t12 muted">${sc.status==="done"?"How is this shot?":"How is this first frame?"}</span>${rlRate("shot","shot:"+sc.n+":"+(sc.clip||f.id),`Scene ${sc.n} ${sc.title}: ${String(sc.prompt||"").slice(0,800)}`)}</div>`:""}
          ${sc.note&&sc.status!=="run"&&sc.status!=="err"?`<p class="rl-status">${esc(sc.note)}</p>`:""}
        </div>
      </details>
    </div></article>`;
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
  return `<details class="rl-block rl-sec" data-open-key="scn:${sc.n}:b"${rlOpenAttr("scn:"+sc.n+":b")}><summary><span>Blocking &amp; continuity</span>${pill}</summary>
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
6 Exact head-count stated positively ("exactly two people in frame: …"); mirrors/reflections controlled; same faces and wardrobe (zero drift).
6b House standard (Higgsfield): block order, ACTIVE REFERENCES first, FOV in degrees from the anchor table, ACTING TASK block per character before the timeline, END STATE per stage, positive phrasing only, HOLD FOR THE FULL TIMELINE last.
7 Who speaks in which shot; others keep mouths closed.
8 BAE: modern Amman, BAE wardrobe, no logos.`;
function rlQuickCheck(sc){
  const w=[], P=sc.prompt||"", F=sc.frame_prompt||"", bp=sc.blueprint;
  const ts=[...[...P.matchAll(/(\d+):(\d{2}(?:\.\d+)?)\s*[–-]\s*(\d+):(\d{2}(?:\.\d+)?)/g)].map(m=>(+m[3])*60+(+m[4])),...[...P.matchAll(/(?:^|\n)\s*(\d+(?:\.\d+)?)\s*(?:s\s*)?(?:–|-|to)\s*(\d+(?:\.\d+)?)\s*s\b/gi)].map(m=>+m[2])];
  if(ts.length&&Math.abs(Math.max(...ts)-(+sc.duration_s||0))>0.6) w.push(`Shot timings end at ${Math.max(...ts)}s but the scene is ${sc.duration_s}s.`);
  for(const t of new Set([...rlTokens(P),...rlTokens(F)])) if(!rlElByTag(t)) w.push(`${t} isn't in Cast or Locations.`);
  if(bp&&(bp.zones||[]).length>1){ const zonesUsed=new Set((bp.people||[]).map(p=>p.zone)); if(zonesUsed.size>1&&!/inside|interior/i.test(F+P)&&!/outside|exterior/i.test(F+P)) w.push("The prompts don't say who is inside and who is outside."); }
  if(!/exactly (one|two|three|four|five|\d+) (person|people|women|men|characters?)|no other people|only (one|two|three|\d+) people/i.test(P+F)&&(bp?.people||[]).length) w.push("Head-count isn't stated.");
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
  const lessons=(BR.sections.find(s=>s.id==="lessons")?.text||"").slice(0,1500), set=rlSet();
  await Promise.race([memLoad().catch(()=>{}),new Promise(r=>setTimeout(r,2500))]);
  await Promise.all(list.map(async sc=>{
    const local=rlQuickCheck(sc), beat=RL.script?.scenes?.[(+sc.n||1)-1]||null;
    try{
      const out=await rlAsk(`You are a fast, precise script supervisor for an AI-video scene (${set.aspect}; Seedream 5.5 first frame, then Seedance 2.5). Find what would make the AI misread the scene and fix it with SMALL text edits. Do not rewrite or restyle what is already correct.
${RL_CHECKLIST}
Team lessons: ${lessons||"none"}
Team memory (past mistakes, lessons and rules that match this scene): ${memSearch([sc.title,sc.logline,String(sc.prompt||"").slice(0,900)].filter(Boolean).join(" "),{stage:"directing",limit:10,kinds:["mistake","lesson","rule","technique"],expand:false}).map(x=>"\n- "+x.c.t).join("")||"none"}
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
  if(instruction&&!instruction.startsWith("WRITE THIS SCENE")) brSignal("shot","edit_requested",-1,{note:instruction,item:`Scene ${sc.n} · ${sc.title||""}`,before:sc.prompt,key:sc.n+instruction});
  await brLoad();
  const mem=await rlMemFor([instruction,sc.title,sc.logline,String(sc.prompt||"").slice(0,900)].filter(Boolean).join(" "),"directing",30);
  const set=rlSet(), before={title:sc.title,duration_s:sc.duration_s,refs:sc.refs,blueprint:sc.blueprint,frame_prompt:sc.frame_prompt,prompt:sc.prompt};
  let ok=false;
  try{
    const out=await rlAsk(`You are the Director of a Bank al Etihad reel (${set.aspect}, Seedance 2.5 reference-to-video: every element is attached as @img references, no start frame, so the prompt must build the opening composition itself; a Seedream 5.5 first-frame still is an optional preview; dialogue ${set.lang}).
${instruction?`THE USER ASKED FOR THIS CHANGE TO SCENE ${sc.n}: "${instruction}"
Apply it precisely and completely. Keep everything the user didn't ask to change (story beat, cast, wardrobe, location, tags), unless the change requires it.`:`UPDATE SHOT PROMPT: rewrite scene ${sc.n} so it is clearly BETTER than the current version, using everything in the brain below, especially the team's latest lessons and this morning's research. Raise the craft: a stronger first-second hook, more precise and motivated camera work (shot sizes, FOV°, moves with speed), better light, a more specific and natural performance, cleaner physics, tighter timing, sharper sound design. Do not change the story beat, the cast or the location.`}
Rules: keep every element handle (@char_…, @loc_…, @prop_…) exactly. WRITE THE SEEDANCE PROMPT BY THE HOUSE STANDARD — the "Higgsfield Seedance Prompt Writer" and "Higgsfield Acting Director" sections of the brain, which win over any older format note:
- Block order: SCENE CONTEXT → ACTIVE REFERENCES (one line per handle: what it defines ONLY, "100% matches the reference") → LOCATION MAP (foreground/midground/background, camera position, light source) → FIRST FRAME / BLOCKING → FORMAT MODE (oner / CUT 1… / timed multishot) → OPTICS (shot size + FOV in degrees from the anchor table: 107/84/63/47/29/18/12/8°, "no drift mid-segment") → CAMERA (third core layer: height, distance, one motivated move, speed in km/h) → ACTION (cause → effect) → PERFORMANCE with an ACTING TASK block per character in frame (scene direction unspoken, motive, goal, obstacle, tactic with eye-work as purposeful action, one safety line for living eyes) placed before the timeline → PHYSICS → LIGHTING (source, direction, white balance in Kelvin) → COLOR GRADE / WARDROBE only if needed → AUDIO → STYLE + OUTPUT SETTINGS (short suffix) → POSITIVE LOCKS → HOLD FOR THE FULL TIMELINE (3–6 lines).
- Timed scenes: stage headings lead with the timestamp ("0–2.5s — SHOT 1 — MCU, 29° FOV:"), stages never overlap or leave gaps, the last ends exactly at duration_s, every stage closes with an END STATE; inside notes and acting tasks refer to moments by timestamps, never shot numbers. Cuts only where stated ("the camera does not cut on its own").
- Positive phrasing only (state the target, never "no/not/don't"); emotion through muscle and eye-work, never adjectives; left/right from the camera; color as material + light + role; no director, film, camera or lens model names; English only; never put an @handle in a stage where that thing isn't present.
- The studio attaches the reference images and the film look itself: write the ACTIVE REFERENCES lines with handles (they're renumbered to @img1… automatically), and fold the film look into LIGHTING / COLOR GRADE / STYLE in your own words. State the geography explicitly (zones, who is where, door direction, camera position and direction, exact head-count, light source). Update the blueprint if the blocking changes, and keep frame_prompt = the exact first moment of the first stage. Avoid every mistake in the AI-video rules.

${RL_SD25}

${RL_BAE}

${brText(mem.text,"directing")}

PROJECT: script ${trimJSON(RL.script,4000)}
CAST: ${trimJSON(RL.characters.map(({tag,name,description,wardrobe})=>({tag,name,description,wardrobe})),2500)}
LOCATIONS & PROPS: ${trimJSON(RL.locations.map(({tag,name,kind,description})=>({tag,name,kind,description})),2000)}
CURRENT SCENE: ${trimJSON({n:sc.n,...before},16000)}

${RL_DIALOGUE}

Blueprint format: ${RL_BP_SCHEMA}

Before answering, run this check on your own result and fix anything that fails:
${RL_CHECKLIST}

Reply with only JSON: {"title":"","duration_s":0,"refs":["@img1"],"blueprint":{...},"frame_prompt":"full text","prompt":"full text","dialogue":[{"n":1,"who":"@char_x","at":"0–4s","line":"…","delivery":""}],"passed":8,"changes":["3–6 short bullets saying what you changed and why, in the user's language"]}`,{modelTier:"default",effort:"medium",cache:false});
    if(!out||!out.prompt) throw {code:"invalid_json",message:"Claude didn't return a new prompt."};
    sc.history=[{...before,at:Date.now(),why:instruction||"Update shot prompt"},...(sc.history||[])].slice(0,6);
    if(out.title) sc.title=String(out.title);
    if(+out.duration_s) sc.duration_s=Math.max(4,Math.min(120,+out.duration_s));
    if(Array.isArray(out.refs)&&out.refs.length) sc.refs=out.refs.map(String);
    if(out.blueprint&&typeof out.blueprint==="object") sc.blueprint=out.blueprint;
    if(out.frame_prompt&&out.frame_prompt!==sc.frame_prompt){ sc.frame_prompt=String(out.frame_prompt); if(sc.frame?.id) sc.frame.stale=true; }
    if(out.prompt!==sc.prompt){ sc.prompt=String(out.prompt); if(sc.clip) sc.stale=true; }
    if(Array.isArray(out.dialogue)) rlSetDialogue(sc,out.dialogue);
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
/* ---------- Gemini Eye: Gemini watches the rendered shot (picture AND sound) and reports what went wrong, second by second ---------- */
const GEYE="BAE Gemini Eye";
const rlRevCats={identity:"Face / wardrobe",geography:"Who is where",extra_people:"Extra people",action_order:"Order of events",camera:"Camera",framing:"Framing",motion:"Motion",physics:"Physics",lip_sync:"Lip-sync",dialogue:"Dialogue",audio:"Sound",text:"Text / logo",brand:"Brand",other:"Other"};
const rlT=t=>{ const m=String(t||"").match(/(\d+):(\d{1,2})(?:\.(\d))?/); return m?(+m[1])*60+(+m[2])+(m[3]?+m[3]/10:0):null; };
async function rlVideoUrl(sc){
  if(sc.url&&/^https:\/\//.test(sc.url)) return sc.url;
  if(!sc.clip) return null;
  try{ const a=await buildArgs("creations_register_download","Get a direct download URL (https) for this finished VIDEO creation.",{identifier:sc.clip});
    const x=readResult(await callMag("creations_register_download",a.args)); const u=[...x.urls,...x.links].find(u=>/^https:\/\//.test(u)&&!/magnific\.com\/app\//i.test(u));
    if(u){ sc.url=u; rlSave(); } return u||null; }catch{ return null; }
}
function rlReviewBrief(sc){
  const {prompt,refs}=rlSceneRefs(sc), set=rlSet(), beat=RL.script?.scenes?.[(+sc.n||1)-1]||null, bp=sc.blueprint||{};
  const who=refs.map(r=>`${r.tag} = ${r.name}${r.map?" (position map, not a person)":""}`).join("; ");
  const lines=(beat?.dialogue||[]).map(d=>`${d.who}: "${d.line}"`).join(" | ");
  return `You are a strict script supervisor reviewing ONE AI-generated video shot for a Bank al Etihad (Jordan) commercial. Watch the whole clip, picture and sound together, at the given frame rate, and compare it with the brief below. Report ONLY what you actually see and hear; never guess. Use exact timestamps MM:SS (or MM:SS.s).

THE BRIEF
- Format: ${set.aspect}, about ${Math.max(4,Math.min(120,+sc.duration_s||8))} s, dialogue language: ${set.lang}.
- Characters/locations (the prompt refers to them as @imgN): ${who||"see prompt"}.
- Planned positions: ${trimJSON({zones:bp.zones,people:bp.people,cameras:bp.cameras},1500)}
- Script beat: ${trimJSON(beat,1200)}
- Expected dialogue: ${lines||"none (nobody should speak)"}
- Full shot prompt given to the video model:
${String(prompt||"").slice(0,9000)}

CHECK, in this order: 1 who is where (inside/outside, left/right, behind/in front of a barrier, zones) · 2 identity: same faces, hair, wardrobe as described, no face drift between cuts · 3 extra, missing or duplicated people (twins) · 4 order of events and timing vs the prompt's seconds · 5 camera: lens feel, the named move, angle (three-quarter vs frontal), framing (head cropped? hands/feet in frame?) · 6 motion quality: sliding feet, jitter, morphing, unwanted slow motion, objects melting, physics · 7 who speaks, lip-sync, language/dialect, lines cut off, other people's mouths moving · 8 sound: unwanted music, missing or wrong SFX · 9 readable text, logos, screens · 10 brand safety and modesty for a Jordanian audience.

Reply with ONLY JSON:
{"score":0-10,"verdict":"keep"|"fix"|"redo","summary":"one or two sentences","issues":[{"t":"MM:SS","category":"geography|identity|extra_people|action_order|camera|framing|motion|physics|lip_sync|dialogue|audio|text|brand|other","severity":"high"|"medium"|"low","what":"what is wrong, concretely","expected":"what the brief asked for","fix":"how to word the prompt so it cannot happen again"}],"good":["what works and must be kept"],"audio":{"speech_heard":"exact words or none","language":"","music":true|false,"sfx":"main sounds heard"}}
Order issues by severity, at most 12. score 10 = perfect against the brief.`;
}
async function rlReview(n){
  const sc=RL.scenes.find(x=>+x.n===+n); if(!sc||!mcp||sc._reviewing) return;
  sc._reviewing=true; sc.reviewErr=null; rlBoard(); rlWake(true);
  try{
    const url=await rlVideoUrl(sc);
    if(!url) throw {code:"no_url",message:"There's no direct link to this video yet. Open it in Magnific once, or generate it again."};
    const r=await mcp.callTool(GEYE,"watch_video",{video_url:url,question:rlReviewBrief(sc),fps:Math.max(+sc.duration_s||8)<=8?5:4,json:true},{cache:false});
    const txt=typeof r?.payload==="string"?r.payload:r?.payload?.answer||(r?.content||[]).map(c=>c.text||"").join("")||"";
    let o=null; try{ o=JSON.parse(txt.replace(/^```(?:json)?|```$/g,"").trim()); }catch{ const m=txt.match(/\{[\s\S]*\}/); try{ o=m?JSON.parse(m[0]):null; }catch{} }
    if(!o) throw {code:"bad_json",message:"Gemini answered, but not in the expected format: "+txt.slice(0,240)};
    sc.review={at:Date.now(),clip:sc.clip,score:+o.score||0,verdict:String(o.verdict||""),summary:String(o.summary||""),issues:(o.issues||[]).filter(x=>x&&x.what).slice(0,12).map(x=>({t:String(x.t||""),category:String(x.category||"other"),severity:String(x.severity||"medium"),what:String(x.what),expected:String(x.expected||""),fix:String(x.fix||"")})),good:(o.good||[]).map(String).slice(0,6),audio:o.audio||null};
    const iss=sc.review.issues;
    rlEvent(`Gemini reviewed scene ${sc.n}: ${sc.review.score}/10 (${sc.review.verdict}). ${sc.review.summary}`);
    brSignal("shot","gemini_review",sc.review.verdict==="keep"?1:-1,{note:`Gemini watched scene ${sc.n} (${sc.review.score}/10, ${sc.review.verdict}): ${sc.review.summary} ISSUES: ${iss.map(x=>`[${x.t} ${x.category}/${x.severity}] ${x.what} → fix: ${x.fix}`).join(" | ")}${sc.review.good.length?` KEEP: ${sc.review.good.join("; ")}`:""}`,item:`Scene ${sc.n} · ${sc.title||""}: ${String(sc.prompt||"").slice(0,700)}`,key:"rev"+sc.n+(sc.clip||"")});
  }catch(e){
    const c=e?.code||"";
    sc.reviewErr=c==="server_not_connected"||c==="not_granted"||/not.?connected|unknown server|not in the manifest/i.test(String(e?.message||""))?"Gemini Eye isn't connected for you yet. Add the “BAE Gemini Eye” connector in claude.ai (Settings → Connectors), then try again."
      :c==="tool_error"?"Gemini: "+String(e?.message||e?.result?.content?.[0]?.text||"").slice(0,300)
      :String(e?.message||c||"Review failed").slice(0,300);
  }finally{ sc._reviewing=false; rlWake(false); rlSave(); rlBoard(); }
}
function rlReviewHTML(sc){
  const R=sc.review, cur=R&&R.clip===sc.clip;
  const head=`<div class="rl-btns rl-revbar"><button class="btn small${R?"":" primary"}" type="button" data-rl="review" data-n="${sc.n}" ${sc._reviewing?"disabled":""}>${sc._reviewing?"Gemini is watching…":R?"Review again with Gemini":"👁 Review with Gemini"}</button>${R&&R.issues.length&&!sc._improving?`<button class="btn small primary" type="button" data-rl="revfix" data-n="${sc.n}">Fix the prompt with these</button>`:""}<span class="t12 muted">Gemini watches the picture and the sound</span></div>`;
  if(sc._reviewing) return head+`<p class="rl-status"><span class="spin" aria-hidden="true" style="display:inline-block;vertical-align:-2px"></span> Gemini is watching the shot frame by frame and listening to the sound…</p>`;
  if(sc.reviewErr) return head+`<p class="rl-status bad">${esc(sc.reviewErr)}</p>`;
  if(!R) return head;
  const col=R.verdict==="keep"?"ok":R.verdict==="redo"?"bad":"warn";
  return head+`<div class="rl-review" dir="auto"><div class="rl-revhead"><span class="rl-pill ${col==="ok"?"ok":"warn"}">${R.score}/10 · ${esc(R.verdict||"")}</span>${cur?"":`<span class="t12 muted">from an earlier take</span>`}<p>${esc(R.summary)}</p></div>
  ${R.issues.length?`<ul class="rl-revlist">${R.issues.map(x=>`<li class="sev-${esc(x.severity)}"><button type="button" class="rl-revt" data-rl="seek" data-n="${sc.n}" data-t="${rlT(x.t)??""}" ${rlT(x.t)==null?"disabled":""}>${esc(x.t||"—")}</button><div><b>${esc(rlRevCats[x.category]||x.category)}</b> ${esc(x.what)}${x.expected?`<span class="t12 muted"> · expected: ${esc(x.expected)}</span>`:""}</div></li>`).join("")}</ul>`:`<p class="t12 muted">No problems found.</p>`}
  ${R.good.length?`<p class="t12 muted">Keep: ${R.good.map(esc).join(" · ")}</p>`:""}
  ${R.audio?`<p class="t12 muted">Heard: ${esc(String(R.audio.speech_heard||"no speech"))}${R.audio.language?` (${esc(R.audio.language)})`:""}${R.audio.music?" · music present":""}${R.audio.sfx?` · ${esc(R.audio.sfx)}`:""}</p>`:""}</div>`;
}
function rlReviewFix(n){
  const sc=RL.scenes.find(x=>+x.n===+n); const R=sc?.review; if(!R) return;
  const iss=R.issues.filter(x=>x.severity!=="low").length?R.issues.filter(x=>x.severity!=="low"):R.issues;
  rlImproveScene(n,`Gemini watched the rendered video of this shot (${R.score}/10) and found these problems. Rewrite the prompt so each one cannot happen again — be explicit and physical (zones, positions, order of events, locks), not vague:\n${iss.map(x=>`- [${x.t}] ${x.what}${x.expected?` (expected: ${x.expected})`:""}${x.fix?` → suggested fix: ${x.fix}`:""}`).join("\n")}${R.good.length?`\nKeep what worked: ${R.good.join("; ")}`:""}`);
}
function rlShotBar(sc,editOnly){
  const busy=sc._improving, ar=rlAr();
  const chips=ar?["سينمائي أكثر","أضحك","لقطات أقرب","حركة كاميرا أجرأ","أقصر وأسرع"]:["More cinematic","Funnier","Closer shots","Bolder camera","Shorter, faster"];
  const room=sc.room?.items?.filter(x=>!x.done)||[];
  if(editOnly) return `${sc._ask?`<form class="rl-ask" data-ask="${sc.n}"><label class="t12 muted" for="rlAsk${sc.n}">What should change in this scene? Write it any way you like.</label><textarea class="rl-field" id="rlAsk${sc.n}" name="q" rows="3" dir="auto" placeholder="${ar?"مثلاً: خلي الكاميرا هاند هيلد، وسارة تبتسم لما تفتح الباب، والضو أدفى":"e.g. make it handheld, she smiles when she opens the door, warmer light"}"></textarea><div class="rl-askchips">${chips.map(c=>`<button type="button" data-chip="${esc(c)}">${esc(c)}</button>`).join("")}</div><div class="rl-btns"><button class="btn small primary" type="submit">Apply edit</button><button class="btn small" type="button" data-rl="askcancel" data-n="${sc.n}">Cancel</button></div></form>`:""}
  ${busy?`<p class="rl-status"><span class="spin" aria-hidden="true" style="display:inline-block;vertical-align:-2px"></span> ${busy==="edit"?"Applying your edit, then the script supervisor checks it…":"Rewriting with everything the Director knows today…"}</p>`:""}
  ${sc.improveErr?`<p class="rl-status bad">${esc(sc.improveErr)}</p>`:""}
  ${sc.lastChange?.changes?.length&&!busy?`<details class="rl-changes"><summary><b>${sc.lastChange.kind==="edit"?"✓ Your edit is in":sc.lastChange.kind==="undo"?"Undone":"✓ Updated"}</b> · ${sc.lastChange.changes.length} change${sc.lastChange.changes.length>1?"s":""}${sc.history?.length?` <button class="a-btn" type="button" data-rl="undo" data-n="${sc.n}">Undo</button>`:""}</summary><ul>${sc.lastChange.changes.map(c=>`<li dir="auto">${esc(c)}</li>`).join("")}</ul></details>`:""}`;
  return `<div class="rl-shotbar"><button class="btn small" type="button" data-rl="improve" data-n="${sc.n}" title="Rewrites this scene's prompts by itself, with everything the Director knows now: the latest images, film look, lessons and the Gemini review. Old version kept — Undo." ${busy?"disabled":""}>${busy==="upgrade"?"Rewriting…":"✦ Auto-improve prompt"}</button><button class="btn small" type="button" data-rl="room" data-n="${sc.n}" ${sc._room||busy?"disabled":""}>${sc._room?"The room is thinking…":"Ask the room"}</button>${sc.history?.length?`<button class="a-btn" type="button" data-rl="undo" data-n="${sc.n}" ${busy?"disabled":""} title="Back to the previous version">Undo</button>`:""}</div>
  ${sc.roomErr?`<p class="rl-status bad">${esc(sc.roomErr)}</p>`:""}
  ${room.length?`<div class="rl-room" dir="auto">${sc.room.items.map((x,i)=>x.done?"":`<div class="rl-roomi"><span class="ic" aria-hidden="true">${esc(rlAdv(x.id).icon||"•")}</span><div><span class="t12 muted">${esc(rlAdv(x.id).name||x.id)}</span><b>${esc(x.title)}</b><p>${esc(x.why)}</p><div class="rl-btns"><button class="btn small primary" type="button" data-rl="roomapply" data-n="${sc.n}" data-i="${i}" ${busy?"disabled":""}>Apply</button><button class="a-btn" type="button" data-rl="roomskip" data-n="${sc.n}" data-i="${i}">Skip</button></div></div></div>`).join("")}</div>`:""}`;
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
  await brLoad(); await Promise.race([memLoad().catch(()=>{}),new Promise(r=>setTimeout(r,2500))]);
  const ids=["trend","story","dp","performance","tech"];
  try{
    const out=await rlAsk(`Five assistant directors review ONE scene of a Bank al Etihad reel (${rlSet().aspect}, Seedance 2.5). Each gives exactly ONE concrete, high-impact improvement from their speciality, grounded in their latest research notes and the team's lessons. No generic advice; name the exact change (lens, move, beat, line, gesture, prop, constraint…). Write in the user's language (${rlAr()?"Arabic, Jordanian tone":"English"}); keep handles (@char_…) as they are.
${ids.map(id=>{ const A=rlAdv(id); return `[${id}] ${A.name} — ${A.role}\nLatest notes: ${String(A.notes||"").slice(0,700)}`; }).join("\n\n")}
Team lessons: ${BR.sections.find(s=>s.id==="lessons")?.text||"none"}
Team memory relevant to this scene: ${memSearch([sc.title,sc.logline,String(sc.prompt||"").slice(0,900)].filter(Boolean).join(" "),{stage:"directing",limit:14}).map(x=>"\n- "+memLine(x)).join("")||"none"}
Script beat: ${trimJSON((({board,sheet,...r})=>r)(RL.script?.scenes?.[(+sc.n||1)-1]||{}),1000)}
${rlSbText()}
Scene ${sc.n} "${sc.title||""}" (${sc.duration_s||""} s):
${String(sc.prompt||"").slice(0,6000)}
Reply with only JSON: {"suggestions":[{"id":"trend","title":"3–6 words","why":"one line","instruction":"the exact edit to make, written as an instruction to the director"}]} — exactly 5, one per id in this order: ${ids.join(", ")}.`,{modelTier:"default",effort:"low",cache:false});
    sc.room={at:Date.now(),items:(out?.suggestions||[]).filter(x=>x&&x.instruction).slice(0,5).map(x=>({id:String(x.id||""),title:String(x.title||""),why:String(x.why||""),instruction:String(x.instruction)}))};
  }catch(e){ sc.roomErr=sampleCopy(e); }
  finally{ delete sc._room; rlWake(false); rlSave(); rlBoard(); }
}
async function rlEnsureChecked(sc){ if(sc._checkP){ await sc._checkP; return; } if(!sc.check||sc.check.dirty||!sc.blueprint){ await rlCheckScenes([sc.n],{quiet:true}); } }
/* ---------- Dialogue lines and voice references (@audio1…) ---------- */
function rlSetDialogue(sc,L){ const old=sc.dialogue||[];
  sc.dialogue=(Array.isArray(L)?L:[]).filter(x=>x&&x.line).map((x,i)=>{ const n=+x.n||i+1; const o=old.find(y=>+y.n===n&&String(y.who||"")===String(x.who||""));
    return {n,who:String(x.who||""),at:String(x.at||""),line:String(x.line),delivery:String(x.delivery||""),tts:String(x.tts||""),audio:o&&o.line===String(x.line)?o.audio||null:null}; }); }
function rlVoices(sc){ const L=(sc.dialogue||[]).filter(d=>d.audio?.id); return L.map((d,i)=>({tag:"@audio"+(i+1),id:d.audio.id,n:d.n,d})); }
/* swap @voiceN for the attached @audioK, or for plain words when no voice is attached; list the voices under ACTIVE REFERENCES */
function rlVoiceCompose(sc,prompt){
  const V=rlVoices(sc); let p=String(prompt||"");
  p=p.replace(/\(?\s*voice reference @voice(\d+)\s*\)?/gi,(m,n)=>{ const v=V.find(x=>+x.n===+n); return v?`(voice reference ${v.tag}: same voice, tone and pronunciation)`:""; }).replace(/@voice(\d+)/gi,(m,n)=>{ const v=V.find(x=>+x.n===+n); return v?v.tag:"the character's own voice"; });
  if(V.length){ const lines=V.map(v=>{ const e=rlElByTag(v.d.who); return `${v.tag} = the recorded voice of ${e?.name||v.d.who||"the speaker"} saying «${v.d.line}»${v.d.at?` at ${v.d.at}`:""} — defines the voice, accent, pronunciation and rhythm of that line ONLY; lip-sync the speaker to it.`; });
    p=/^\s*ACTIVE REFERENCES\b/im.test(p)?p.replace(/(^|\n)(\s*ACTIVE REFERENCES[^\n]*\n(?:[^\n]+\n)*)/i,(m,a,b)=>`${a}${b}${lines.join("\n")}\n`):`ACTIVE REFERENCES\n${lines.join("\n")}\n\n${p}`; }
  return {prompt:p,voices:V};
}
/* ---------- Voices: one Magnific voice per character, one generated clip per line (ElevenLabs via audio_tts) ---------- */
let RL_VOICES=null;
async function rlVoiceList(){
  if(RL_VOICES) return RL_VOICES;
  if(!S.connected) await connect(true);
  const norm=L=>(Array.isArray(L)?L:[]).filter(v=>v&&v.id!=null).map(v=>({id:v.id,name:String(v.name||v.id),provider:String(v.provider||"").toLowerCase(),gender:v.gender||"",age:String(v.age||"").replace("_"," "),language:(v.languages||[]).join(", ")||v.language||"",style:String(v.description||v.style||"").replace(/\s+/g," ").slice(0,160),source:v.source||""}));
  let L=[];
  for(const args of [{search:"Arabic"},{}]){ const r=await callMag("audio_voices_list",args);
    L=norm(r?.payload?.voices);
    if(!L.length){ const o=await sample.json(`From this Magnific MCP tool result, list the text-to-speech voices. Result:\n${trimJSON(r?.payload??r?.content,24000)}\n\nReply with only JSON: {"voices":[{"id":0,"name":"","provider":"elevenlabs|gemini|…","gender":"","age":"","languages":["Arabic"],"description":"how it sounds, max 20 words","source":"mine|catalog|"}]}`,{modelTier:"quick"}); L=norm(o?.voices); }
    if(L.length) break; }
  /* Arabic ElevenLabs voices first (they take v4 audio tags), Levantine ones on top */
  const rank=v=>(/levant|jordan|syria|leban|palestin|شام/i.test(v.style)?0:1)+(v.provider.includes("eleven")?0:2)+(/arab/i.test(v.language)?0:4);
  RL_VOICES=L.sort((x,y)=>rank(x)-rank(y)).slice(0,60); return RL_VOICES;
}
async function rlVoiceChoose(n,di){ const sc=RL.scenes.find(x=>+x.n===+n), d=sc?.dialogue?.[di]; if(!d) return;
  d._vpick="load"; delete d._err; rlBoard();
  try{ await rlVoiceList(); d._vpick="open"; }catch(e){ d._vpick=null; d._err=/not in the manifest|tool_not_found|unknown tool|not available/i.test(String(e?.message||e?.code||""))?"Magnific's voice tools aren't reachable from the studio. Generate the voice in Magnific → Audio → Voice Generator, then use Attach voice.":mcpCopy(e); }
  rlBoard(); }
function rlVoiceSet(n,di,id,name){ const sc=RL.scenes.find(x=>+x.n===+n), d=sc?.dialogue?.[di]; if(!d) return; const e=rlElByTag(d.who);
  const vv=(RL_VOICES||[]).find(x=>String(x.id)===String(id)); const V={id:isNaN(+id)?id:+id,name,provider:vv?.provider||"",source:vv?.source||""};
  if(e){ e.voice=V; rlEvent(`The user chose the voice "${name}" for ${e.handle}.`); } else { /* a speaker without an element (e.g. an off-screen voice): same voice for every line with that speaker name */ for(const s2 of RL.scenes) for(const d2 of (s2.dialogue||[])) if(d2.who===d.who) d2.voice=V; }
  delete d._vpick; rlSave(); rlBoard(); }
const rlVoiceOf=d=>rlElByTag(d.who)?.voice||d.voice||null;
async function rlVoiceGen(n,di){ const sc=RL.scenes.find(x=>+x.n===+n), d=sc?.dialogue?.[di]; if(!d||d._gen) return;
  const v=rlVoiceOf(d); if(!v){ rlVoiceChoose(n,di); return; }
  d._gen=true; delete d._err; rlBoard(); rlWake(true);
  try{ if(!S.connected) await connect(true);
    const eleven=!v.provider||v.provider.includes("eleven");
    const base=(d.tts&&d.tts.replace(/\[[^\]]*\]/g,"").replace(/[\s…،؟!.]/g,"").length>1?d.tts:d.line).trim();
    /* ElevenLabs v4 acts on [audio tags]; other voice families would read them aloud, so they get the bare line and the direction apart */
    const text=eleven?(/accent\]/i.test(base)?base:`[Jordanian Arabic accent] ${base}`):base.replace(/\[[^\]]*\]/g,"").replace(/\s+/g," ").trim();
    const mk=model=>({text,voiceId:v.id,...(v.source==="mine"?{source:"mine"}:{}),...(model?{model}:{}),...(eleven?{stability:0.4}:{systemInstruction:`${d.delivery||"Natural, warm"}, Jordanian Arabic (Amman) accent, conversational`})});
    let r; try{ r=await callMag("audio_tts",mk(eleven?"eleven_v4":null)); }
    catch(e1){ if(!/invalid mod|model|mode/i.test(String(e1?.message||""))) throw e1; r=await callMag("audio_tts",mk(null)); }
    let rr=readResult(r); if(!rr.ids.length) rr=await extractWithClaude(r,"the creation identifier of the audio being generated");
    const id=rr.ids[0]; if(!id) throw {code:"tool_error",message:"Magnific returned no audio."};
    if(!DONE.test(rr.status)) await waitFor([id],"voice").catch(()=>{});
    const e=rlElByTag(d.who); d.audio={id,name:v.name,by:"tts",web:rr.webUrl||null}; if(sc.clip) sc.stale=true;
    rlEvent(`A voice clip was generated for scene ${n}, line ${d.n} (${e?.name||d.who}, voice ${v.name}).`);
  }catch(e){ d._err=/not in the manifest|tool_not_found|unknown tool|not available/i.test(String(e?.message||e?.code||""))?"Magnific's voice tools aren't reachable from the studio. Generate the voice in Magnific → Audio → Voice Generator, then use Attach voice.":mcpCopy(e); }
  finally{ delete d._gen; rlWake(false); rlSave(); rlBoard(); }
}
async function rlVoiceGenAll(n){ const sc=RL.scenes.find(x=>+x.n===+n); if(!sc) return; for(let i=0;i<(sc.dialogue||[]).length;i++){ const d=sc.dialogue[i]; if(!d.audio?.id&&rlVoiceOf(d)) await rlVoiceGen(n,i); } }
let RL_AUDIO_LIST=null;
async function rlAudioPick(n,di){
  const sc=RL.scenes.find(x=>+x.n===+n), d=sc?.dialogue?.[di]; if(!d) return;
  d._pick="load"; rlBoard();
  try{ if(!S.connected) await connect(true);
    const plan=await buildArgs("creations_list","List the user's most recent AUDIO creations (voice-overs / speech / voice generator results), newest first, up to 15. Filter by type audio if the tool allows it.",{type:"audio",limit:15},"quick");
    const r=await callMag("creations_list",plan.args);
    const o=await sample.json(`From this Magnific MCP tool result, list the AUDIO creations only (not images or videos). Result:\n${trimJSON(r?.payload??r?.content,14000)}\n\nReply with only JSON: {"items":[{"id":"creation identifier","name":"its name or the first words of its text/prompt","when":"created time if shown","seconds":0}]}`,{modelTier:"quick"});
    RL_AUDIO_LIST=(o?.items||[]).filter(x=>x&&x.id).slice(0,15); d._pick="open";
  }catch(e){ d._pick=null; d._err=mcpCopy(e); }
  rlBoard();
}
function rlAudioSet(n,di,id,name){ const sc=RL.scenes.find(x=>+x.n===+n), d=sc?.dialogue?.[di]; if(!d) return;
  id=String(id||"").trim(); const m=id.match(/([A-Za-z0-9_-]{8,})\/?(?:\?.*)?$/); if(/^https?:/.test(id)&&m) id=m[1];
  d.audio=id?{id,name:String(name||"voice")}:null; delete d._pick; delete d._err; if(sc.clip) sc.stale=true;
  rlEvent(id?`The user attached a voice reference to scene ${n}, line ${d.n} (${d.who}).`:`The user removed the voice reference of scene ${n}, line ${d.n}.`); rlSave(); rlBoard(); }
function rlDialogueHTML(sc){
  const L=sc.dialogue||[]; if(!L.length) return "";
  const V=rlVoices(sc);
  return `<details class="rl-sec rl-dlg" data-open-key="dlg:${sc.n}"${rlOpenAttr("dlg:"+sc.n,true)}><summary><span class="rl-sec-t">Dialogue &amp; voices</span><span class="t12 muted">${L.length} line${L.length>1?"s":""} · ${V.length} voice${V.length===1?"":"s"} attached</span></summary>
  <p class="t12 muted">Pick a voice for each character once, then generate each line (ElevenLabs, Arabic with tashkeel and audio tags). Each clip goes to Seedance as ${V.length?V.map(v=>v.tag).join(", "):"@audio1…"} with the line written in the prompt. Voice clips cost Magnific credits.</p>
  ${L.some(d=>!d.audio?.id&&rlVoiceOf(d))&&L.length>1?`<div class="acts" style="margin-bottom:8px"><button type="button" class="btn small" data-rl="dlggenall" data-n="${sc.n}">Generate all missing voices</button></div>`:""}
  <ul>${L.map((d,i)=>{ const e=rlElByTag(d.who); const v=V.find(x=>x.d===d);
    return `<li><div class="dl-top"><b>${esc(e?.name||d.who||"Speaker")}</b><span class="t12 muted">${esc(d.at||"")}${d.delivery?` · ${esc(d.delivery)}`:""}</span>${v?`<span class="rl-chip ok">${v.tag} · ${esc(d.audio.name||"voice")}</span>`:""}</div>
      <div class="ln" dir="rtl" lang="ar">${esc(d.line)}</div>
      ${d.tts?`<div class="tts" dir="rtl" lang="ar"><span class="t12 muted" dir="ltr">Voice script</span> ${esc(d.tts)}</div>`:""}
      <div class="acts"><button type="button" class="btn small primary" data-rl="dlggen" data-n="${sc.n}" data-i="${i}"${d._gen||d._vpick==="load"?" disabled":""}>${d._gen?"Generating the voice…":d._vpick==="load"?"Loading voices…":!rlVoiceOf(d)?"Choose a voice":v?"Regenerate voice":"Generate voice"}</button>${rlVoiceOf(d)?`<button type="button" class="btn small" data-rl="dlgvoice" data-n="${sc.n}" data-i="${i}" title="Change this character's voice">🎙 ${esc(String(rlVoiceOf(d).name).slice(0,22))}</button>`:""}<button type="button" class="btn small" data-rl="dlgcopy" data-n="${sc.n}" data-i="${i}">Copy line</button><button type="button" class="btn small" data-rl="dlgpick" data-n="${sc.n}" data-i="${i}"${d._pick==="load"?" disabled":""}>${d._pick==="load"?"Loading your audio…":v?"Change voice":"Attach voice"}</button>${v?`<button type="button" class="btn small" data-rl="dlgclear" data-n="${sc.n}" data-i="${i}">Remove</button>`:""}</div>
      ${d._err?`<p class="t12" style="color:#a23a2a">${esc(d._err)}</p>`:""}
      ${d._vpick==="open"?`<div class="pick">${(RL_VOICES||[]).length?(RL_VOICES||[]).map(x=>`<button type="button" class="btn small" data-rl="dlgvset" data-n="${sc.n}" data-i="${i}" data-id="${esc(x.id)}" data-name="${esc(String(x.name||"voice").slice(0,40))}" title="${esc([x.gender,x.age,x.language,x.provider,x.style].filter(Boolean).join(" · "))}">${esc(String(x.name||x.id).slice(0,26))}<span class="t12 muted"> ${esc([x.gender,x.age,/levant|jordan/i.test(x.style)?"Levantine":"",x.provider&&!x.provider.includes("eleven")?x.provider:""].filter(Boolean).join(" · ").slice(0,34))}</span></button>`).join(""):`<span class="t12 muted">No voices came back from Magnific.</span>`}</div>`:""}
      ${d._pick==="open"?`<div class="pick">${(RL_AUDIO_LIST||[]).length?(RL_AUDIO_LIST||[]).map(a=>`<button type="button" class="btn small" data-rl="dlgset" data-n="${sc.n}" data-i="${i}" data-id="${esc(a.id)}" data-name="${esc(String(a.name||"voice").slice(0,40))}" dir="auto">${esc(String(a.name||a.id).slice(0,46))}${a.seconds?` · ${Math.round(a.seconds)}s`:""}</button>`).join(""):`<span class="t12 muted">No audio found in your Magnific yet.</span>`}
        <form class="paste" data-rl-dlgpaste="${sc.n}:${i}"><input type="text" placeholder="…or paste the Magnific audio link / ID" aria-label="Magnific audio link or ID"><button class="btn small" type="submit">Attach</button></form></div>`:""}</li>`; }).join("")}</ul></details>`;
}
/* ---------- Storyboard: one Seedream 5.5 still (2K) per script scene, each generated on its own ---------- */
/* Put the scene's references into video_generate's own reference field, in the exact shape its schema asks for */
let RL_LASTREFSCHEMA=null;
async function rlPutRefs(args,refs,start,tool="video_generate",audios=[]){
  const sch=(await schemaOf(tool))?.inputSchema||{}; const P=sch.properties||{};
  const idOf=it=>it?.properties||{};
  const ID_PREF=["identifier","creationIdentifier","creation_identifier","creationId","url","uri","image","source","id"];
  /* the array field whose items take a creation identifier/url and that the description calls references/images/media */
  const cands=Object.entries(P).filter(([k,v])=>(v.type==="array"||v.items)&&v.items&&(typeof v.items==="object"));
  const score=([k,v])=>(/^references?$/i.test(k)?6:/reference/i.test(k)?5:/^(images?|media|medias|inputs?|assets?)$/i.test(k)?4:/image|media/i.test(k)?3:0)+(/reference|@img|image/i.test(String(v.description||""))?1:0)-(/end|last|start|first|frame|audio|video/i.test(k)?3:0);
  cands.sort((a,b)=>score(b)-score(a));
  const pick=cands[0];
  let key, item=(id,kind="image")=>({identifier:id,type:kind});
  if(pick&&score(pick)>0){ key=pick[0]; const it=pick[1].items;
    if(it.type==="string") item=id=>id;
    else { const ip=idOf(it); const idK=ID_PREF.find(k=>k in ip)||Object.keys(ip).find(k=>/identifier|url|id$/i.test(k));
      const tK=Object.keys(ip).find(k=>/^(type|kind|media_?type|role)$/i.test(k)); const tV=tK?((ip[tK].enum||[]).find(x=>/image|reference/i.test(x))||"image"):null; const aV=tK?((ip[tK].enum||[]).find(x=>/audio|voice|sound/i.test(x))||"audio"):null;
      item=(id,kind="image")=>({[idK||"identifier"]:id,...(tK?{[tK]:kind==="audio"?aV:tV}:{})}); } }
  else key=Object.keys(args).find(k=>Array.isArray(args[k])&&/reference|image|media/i.test(k))||"references";
  const out={...args};
  /* drop any other reference-like arrays Claude may have filled, so nothing is duplicated or mislabelled */
  for(const k of Object.keys(out)) if(k!==key&&Array.isArray(out[k])&&/reference|image|media/i.test(k)&&!/start|end|first|last/i.test(k)) delete out[k];
  out[key]=[...refs.map(r=>item(r.id)),...audios.map(a=>item(a.id,"audio"))];
  /* a separate audio-reference field, if the tool has one, takes the voices instead */
  if(audios.length){ const ak=Object.entries(P).find(([k,v])=>k!==key&&(v.type==="array"||v.items)&&/audio|voice/i.test(k)&&/reference|input|audio/i.test(k+" "+String(v.description||"")));
    if(ak){ const it=ak[1].items||{}; const ip=it.properties||{}; const idK=ID_PREF.find(k=>k in ip)||"identifier";
      out[ak[0]]=audios.map(a=>it.type==="string"?a.id:{[idK]:a.id}); out[key]=refs.map(r=>item(r.id)); } }
  /* a start image field, only when the user chose one */
  if(!start) for(const k of Object.keys(out)) if(k!==key&&/^(start|first|init)_?(image|frame)|image_?url$|^image$/i.test(k)&&!refs.some(r=>JSON.stringify(out[k]).includes(r.id))) delete out[k];
  log("✓",tool+" references",{key,sample:out[key][0],count:out[key].length});
  RL_LASTREFSCHEMA={key,item:pick?pick[1].items:null,props:Object.keys(P)};
  return out;
}
/* every reference must be a real creation in the user's Magnific: check them all (free) before spending credits */
let RL_GETPLAN=null;
async function rlMissingCreations(ids){
  ids=[...new Set(ids.filter(Boolean))]; if(!ids.length) return [];
  if(!RL_GETPLAN){ try{ RL_GETPLAN=(await buildArgs("creations_get","Get this one creation's details by its identifier.",{identifier:"__ID__"},"quick")).args; }catch{ return []; }
    if(!JSON.stringify(RL_GETPLAN||{}).includes("__ID__")) RL_GETPLAN={...(RL_GETPLAN||{}),identifier:"__ID__"}; }
  const bad=[];
  await Promise.all(ids.map(async id=>{ try{ await callMag("creations_get",replaceDeep(RL_GETPLAN,"__ID__",id)); }
    catch(e){ if(/not found|does not exist|no such|unknown (creation|identifier)|invalid identifier/i.test(String(e?.message||"")+" "+String(e?.code||""))) bad.push(id); } }));
  return bad;
}
/* ---------- Storyboard sheets: one black-and-white 16:9 sheet per script stage, numbered shots, before any video is made ---------- */
const RL_SBBIG=new Set();
const RL_SBSTYLE=`Black-and-white storyboard sheet, landscape 16:9, on clean off-white paper. Clean pencil and ink line drawing with simple soft grayscale marker shading, confident comic-storyboard linework, no photographic rendering. A hand-lettered header in the top-left corner. Under it, the panels sit in a neat grid with thin black frames and equal gutters; under every panel a narrow caption strip in hand-lettered capitals. Small handwritten margin notes and little arrows are allowed only where listed. Generous empty paper around the grid.`;
async function rlBoardPlan(){
  const S0=RL.script?.scenes||[]; if(!S0.length) return null;
  const set=rlSet(); const els=rlEls().filter(e=>e.id||e.description);
  const out=await rlAsk(`You are the storyboard artist's director for a Bank al Etihad (Jordan) reel. Plan the WHOLE storyboard before any video is generated: one storyboard SHEET per script stage, each sheet with 2 to 5 numbered SHOTS (panels).
House method (Higgsfield): check camera angles and action while still working with images. Give EVERY shot a starting position, an action and an end state, and carry that end state into the next shot. Decide how much action fits one shot; keep it readable. The video prompts will later follow these panels exactly, so the plan must be shootable.
Rules:
- Exactly ${S0.length} sheets, in order, one for each script stage below (sheet k = stage k). Never merge or drop stages.
- Shots are numbered continuously across sheets (1, 2, 3 …).
- "name" = the camera angle or shot idea in 2-4 CAPITAL words (ANGLED WIDE, MACRO HANDS, OVER SHOULDER, TOP SHOT, LOW WIDE, REACTION CLOSE …). Vary angles; no two neighbouring shots with the same size and angle.
- "draw" = what the artist draws in that panel: the key moment, who is where (screen left / right), the prop in which hand, the expression as a task, one line. English.
- "note" = optional tiny margin note, max 5 words (e.g. "phone — RIGHT hand", "camera does NOT follow"). Usually empty.
- "stage_title" = 2-4 CAPITAL words naming the stage; "note" on the sheet = optional rhythm note (e.g. "CUT ON SOUND", "FAST CUTS, ~1s EACH").
- "refs" per sheet = handles of the characters / places / props that appear on it (only from ELEMENTS).
- "continuity" = one paragraph that will be repeated on every sheet: each character's look (hair, age, wardrobe), the layout of each place (what is on the left / right), each prop's exact look, and which hand holds what. Fixed facts only.
- No dialogue text inside panels. Everything in English (captions are lettered in English).
FORMAT OF THE REEL: ${set.aspect} (panels are drawn in this frame shape) · ${RL.script.duration_s||set.length} s
FILM LOOK: ${String(RL.look||"").slice(0,800)||"natural, premium, cinematic; Jordanian setting"}
SCRIPT STAGES: ${trimJSON(S0.map((x,k)=>({stage:k+1,time:x.time,title:x.title,action:x.action,dialogue:(x.dialogue||[]).map(d=>d.who+": "+d.line),on_screen_text:x.on_screen_text,sound:x.sound})),7000)}
ELEMENTS (handle · name · description): ${trimJSON(els.map(e=>`${e.handle} · ${e.name||""} · ${String(e.description||"").slice(0,220)}`),5000)}
${RL_JO}
Reply with only JSON: {"continuity":"…","sheets":[{"stage":1,"stage_title":"…","note":"","refs":["@char_…"],"shots":[{"n":1,"name":"…","draw":"…","start":"…","action":"…","end":"…","note":""}]}]}`,{modelTier:"default",cache:false});
  const sheets=(Array.isArray(out?.sheets)?out.sheets:[]).filter(x=>Array.isArray(x?.shots)&&x.shots.length);
  if(!sheets.length) throw {code:"invalid_json",message:"No storyboard plan came back."};
  let n=0; RL.sbplan={continuity:String(out.continuity||""),at:Date.now()};
  S0.forEach((sc,i)=>{ const sh=sheets.find(x=>+x.stage===i+1)||sheets[i]; if(!sh) return;
    sc.sheet={title:String(sh.stage_title||sc.title||"").toUpperCase().slice(0,40),note:String(sh.note||"").slice(0,60),refs:(sh.refs||[]).map(String),
      shots:sh.shots.slice(0,6).map(x=>({n:++n,name:String(x.name||"").toUpperCase().slice(0,36),draw:String(x.draw||x.action||""),start:String(x.start||""),action:String(x.action||""),end:String(x.end||""),note:String(x.note||"").slice(0,40)}))}; });
  rlEvent(`The storyboard plan was written: ${S0.length} sheets, ${n} shots.`); rlSave(); return RL.sbplan;
}
function rlSheetPrompt(i,refs,styleTag){
  const sc=RL.script.scenes[i], sh=sc.sheet, set=rlSet(), N=sh.shots.length;
  const frame=set.aspect==="9:16"?"a tall vertical 9:16 frame":set.aspect==="16:9"?"a wide 16:9 frame":set.aspect==="1:1"?"a square frame":`a ${set.aspect} frame`;
  const cols=N<=3?N:N===4?2:3;
  return `${RL_SBSTYLE}
HEADER (letter it exactly): "STAGE ${i+1} — ${sh.title}${sc.time?`  ${String(sc.time).replace(/\s/g,"")}`:""}${sh.note?`  ·  ${sh.note.toUpperCase()}`:""}"
LAYOUT: exactly ${N} panels, ${cols} per row, read left to right, top to bottom. Every panel is ${frame}. No other panels, no title block, no logos.
${sh.shots.map(x=>`PANEL ${x.n} — caption (letter it exactly): "SHOT ${x.n} · ${x.name}". Draw: ${x.draw}${x.start||x.end?` (starts: ${x.start||"—"}; action: ${x.action||"—"}; ends: ${x.end||"—"} — draw the clearest moment of the action)`:""}${x.note?` Margin note in small handwriting: "${x.note}".`:""}`).join("\n")}
CONTINUITY (identical on every sheet): ${RL.sbplan?.continuity||""}
${refs.length?`REFERENCES: ${refs.map((r,k)=>`@img${k+1} = ${r.name} — use ONLY for ${r.kind==="character"?"the face, hair, build and wardrobe":r.kind==="prop"?"the object's shape and markings":"the place's layout and furniture"}; redraw it as a pencil and ink drawing, never photographic`).join("; ")}.`:""}
${styleTag?`STYLE REFERENCE: ${styleTag} shows the drawing style, paper, lettering and sheet layout to match. Copy its STYLE only — none of its people, places, panels or words.`:""}
RULES: grayscale only, no colour. The same character design, room layout and props in every panel. No extra characters. No speech bubbles, no dialogue text, no decorative captions, no invented scenes. The only lettering is the header, the ${N} captions and the listed margin notes, spelled exactly as written.`;
}
async function rlBoardFrame(i){
  const sc=RL.script?.scenes?.[i]; if(!sc) return;
  const b=sc.board=Object.assign(sc.board||{},{status:"write",err:null,_live:true}); rlSave(); rlBoard();
  try{
    if(!sc.sheet||!RL.sbplan) await (RL._sbplanP||(RL._sbplanP=rlBoardPlan().finally(()=>{ delete RL._sbplanP; })));
    if(!sc.sheet) throw {code:"invalid_json",message:"No plan for this stage. Press Create storyboard again."};
    const els=(sc.sheet.refs||[]).map(h=>rlElByTag(h)).filter(e=>e&&e.id).slice(0,7);
    const refs=els.map(e=>({id:e.id,tag:e.handle,name:e.name||e.handle,kind:RL.characters.includes(e)?"character":e.kind==="prop"?"prop":"location"}));
    /* one look for all sheets: the user's own style image, else the first finished sheet */
    const styleId=RL.sbStyle?.id||(RL.script.scenes.find((x,k)=>k!==i&&x.board?.id&&x.board.sheet)?.board.id)||null;
    const all=styleId?[...refs,{id:styleId,tag:"style"}]:refs;
    const prompt=rlSheetPrompt(i,refs,styleId?`@img${all.length}`:null);
    Object.assign(b,{status:"run",prompt,sheet:true,moment:`${sc.sheet.shots.length} shots · ${sc.sheet.shots.map(x=>x.n).join(", ")}`,refs:refs.map(r=>r.tag)}); rlSave(); rlBoard();
    const img=await rlJob(()=>rlImage({prompt,aspect:"16:9",refs:all,label:`storyboard sheet ${i+1}`,onQueued:(id,web)=>{ b.pending=id; b.web=web||b.web; RL_SBBIG.add(id); rlSave(); }}));
    RL_SBBIG.add(img.id); Object.assign(b,{id:img.id,web:img.web,status:"ok",at:Date.now()}); delete b.pending;
    rlEvent(`Storyboard sheet ${i+1} was drawn (${b.moment}).`);
  }catch(e){ b.status="err"; b.err=e?.code==="invalid_json"||e?.code==="refused"?sampleCopy(e):mcpCopy(e); delete b.pending; }
  finally{ delete b._live; rlSave(); rlBoard(); }
}
async function rlGenStoryboard(only){
  const S0=RL.script?.scenes||[]; const L=S0.map((_,i)=>i).filter(i=>only==null?true:only.includes(i));
  if(only==null){ for(const sc of S0){ delete sc.sheet; if(sc.board){ delete sc.board.id; delete sc.board.sheet; } } RL.sbplan=null; }
  L.forEach(i=>{ const sc=S0[i]; sc.board=Object.assign(sc.board||{},{status:"queued",err:null,_live:true}); }); rlSave(); rlBoard();
  try{ if(!RL.sbplan) await (RL._sbplanP||(RL._sbplanP=rlBoardPlan().finally(()=>{ delete RL._sbplanP; }))); }
  catch(e){ L.forEach(i=>{ const b=S0[i].board; b.status="err"; b.err=sampleCopy(e); delete b._live; }); rlSave(); rlBoard(); return; }
  const q=[...L];
  /* the first sheet sets the drawing style; the others follow it */
  if(!RL.sbStyle?.id&&!S0.some(x=>x.board?.id&&x.board.sheet)&&q.length>1) await rlBoardFrame(q.shift());
  const worker=async()=>{ while(q.length){ const i=q.shift(); await rlBoardFrame(i); } };
  await Promise.all([worker(),worker()]);
}
/* the approved shot plan, for the scene writer: video prompts follow the panels */
function rlSbText(){ const S0=(RL.script?.scenes||[]).filter(x=>x.sheet?.shots?.length); if(!S0.length) return "";
  return `STORYBOARD (the approved shot plan — the video prompt's shots keep this order, these angles and these actions; each shot's end state is the next shot's start):\n${S0.map((x,i)=>`Stage ${i+1} ${x.sheet.title}${x.time?` (${x.time})`:""}: ${x.sheet.shots.map(h=>`Shot ${h.n} ${h.name} — ${h.draw}${h.end?` → ends: ${h.end}`:""}`).join(" | ")}`).join("\n").slice(0,5000)}\nCONTINUITY: ${String(RL.sbplan?.continuity||"").slice(0,1200)}`; }
const rlIsSheet=id=>RL_SBBIG.has(id)||!!(RL?.script?.scenes||[]).some(x=>x.board?.sheet&&(x.board.id===id||x.board.pending===id));
/* every storyboard still in one ZIP (stored, no re-compression) */
const CRC_T=(()=>{ const t=new Uint32Array(256); for(let n=0;n<256;n++){ let c=n; for(let k=0;k<8;k++) c=c&1?0xEDB88320^(c>>>1):c>>>1; t[n]=c>>>0; } return t; })();
function crc32(u){ let c=0xFFFFFFFF; for(let i=0;i<u.length;i++) c=CRC_T[(c^u[i])&255]^(c>>>8); return (c^0xFFFFFFFF)>>>0; }
async function makeZip(files){
  const enc=new TextEncoder(), parts=[], cen=[]; let off=0;
  for(const f of files){ const data=new Uint8Array(await f.blob.arrayBuffer()), name=enc.encode(f.name), crc=crc32(data);
    const h=new DataView(new ArrayBuffer(30)); h.setUint32(0,0x04034b50,true); h.setUint16(4,20,true); h.setUint16(8,0,true); h.setUint32(14,crc,true); h.setUint32(18,data.length,true); h.setUint32(22,data.length,true); h.setUint16(26,name.length,true);
    parts.push(h.buffer,name,data);
    const c=new DataView(new ArrayBuffer(46)); c.setUint32(0,0x02014b50,true); c.setUint16(4,20,true); c.setUint16(6,20,true); c.setUint32(16,crc,true); c.setUint32(20,data.length,true); c.setUint32(24,data.length,true); c.setUint16(28,name.length,true); c.setUint32(42,off,true);
    cen.push(c.buffer,name); off+=30+name.length+data.length; }
  const csize=cen.reduce((a,x)=>a+(x.byteLength??x.length),0);
  const e=new DataView(new ArrayBuffer(22)); e.setUint32(0,0x06054b50,true); e.setUint16(8,files.length,true); e.setUint16(10,files.length,true); e.setUint32(12,csize,true); e.setUint32(16,off,true);
  return new Blob([...parts,...cen,e.buffer],{type:"application/zip"});
}
async function rlFullImage(id){
  /* the full-size file: what generation returned, else ask Magnific for the original */
  let src=rlFull[id];
  const big=src?await longSide(src):0;
  if(!src||big<2000){ const o={id,url:null,img:null,long:0}; await completeFiles(o,null).catch(()=>{}); if(o.img&&(await longSide(o.img))>big) src=o.img; }
  if(!src) return null; rlFull[id]=src; return await (await fetch(src)).blob();
}
async function rlDownloadBoard(btn){
  const L=(RL.script?.scenes||[]).map((s,i)=>({s,i})).filter(x=>x.s.board?.id);
  if(!L.length) return;
  if(!downloads){ rlSys("Saving isn't available in this view."); return; }
  const lbl=btn?.textContent; let done=0; const files=[];
  for(const {s,i} of L){ if(btn) btn.textContent=`Preparing ${++done}/${L.length}…`;
    const b=await rlFullImage(s.board.id).catch(()=>null); if(!b) continue;
    const ext=/png/.test(b.type)?"png":/webp/.test(b.type)?"webp":"jpg";
    files.push({name:`${String(i+1).padStart(2,"0")}_${String(s.title||"scene").replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-|-$/g,"").slice(0,40)||"scene"}.${ext}`,blob:b}); }
  if(btn) btn.textContent=lbl;
  if(!files.length){ rlSys("Couldn't read the storyboard images from Magnific."); return; }
  try{ await downloads.save({filename:`BAE_${String(RL.title||"reel").replace(/[^\p{L}\p{N}]+/gu,"-").slice(0,40)}_storyboard.zip`,data:await makeZip(files)}); }
  catch(e){ if(e?.code!=="declined") rlSys("Couldn't save the file ("+(e?.code||"error")+")."); }
}
function rlBoardCell(s,i){
  const b=s.board||{}; const thumb=b.id?rlTGet(b.id):null; if(b.id&&!thumb) rlNeed(b.id); const live=!!b._live;
  const st=live&&b.status==="queued"?"Waiting…":live&&b.status==="write"?"Planning the shots…":live&&b.status==="run"?"Drawing in Seedream 5.5 · 2K…":b.status==="err"?esc(b.err||"Failed"):b.pending&&!b.id?"Finishing in Magnific…":b.id&&!thumb?"Loading the preview…":"";
  return `<div class="rl-sbcell${live||(b.id&&!thumb)?" busy":""}">${thumb?`<img src="${thumb}" alt="Storyboard sheet ${i+1}" data-rl-zoom="${esc(b.id)}">`:`<div class="ph">${st||"No sheet yet"}</div>`}
    <div class="cap"><span class="t12 muted">${thumb&&st?st:esc(b.moment||"")}</span><span class="rl-btns">${b.id?`<button type="button" class="btn small" data-ux="dl" data-id="${esc(b.id)}" data-name="Storyboard sheet ${i+1}">Download</button>`:""}<label class="btn small"${live?' aria-disabled="true"':""}>Replace<input type="file" accept="image/*" class="sr" data-ux-sbrep="${i}"${live?" disabled":""}></label><button type="button" class="btn small" data-rl="board1" data-i="${i}"${live?" disabled":""}>${b.id?"Redraw":"Draw"}</button></span></div></div>`;
}
/* ---------- Magnific: images for cast, locations and first frames ---------- */
async function rlImage({prompt,aspect,refs=[],label,onQueued}){
  const model=$("selNano").value||null;
  const plan=await buildArgs("images_generate",`Generate exactly 1 photorealistic image with model "${model||"Seedream 5.5"}" (ByteDance Seedream 5.5). Use the prompt verbatim. Aspect ratio ${aspect}. Resolution 2K (the 2K tier, about 2048 px+ on the long side), highest quality. ${refs.length?"Attach EVERY item of Data.references as image references, in exactly this order (the first is @img1, the second @img2…), using each item's identifier.":"No references."}`,
    {model, model_label:"Seedream 5.5", prompt, aspect_ratio:aspect, resolution:"2K", num_images:1, references:refs.length?refs.map(r=>({identifier:r.id,type:"image"})):undefined},"default");
  let iargs=oneImage(plan.args);
  if(refs.length){ iargs=await rlPutRefs(iargs,refs,null,"images_generate"); const miss=refs.filter(r=>!JSON.stringify(iargs).includes(r.id)); if(miss.length) throw {code:"refs_missing",message:`Couldn't attach ${miss.map(r=>r.tag).join(", ")}; stopped before spending credits.`}; }
  const r=await callMag("images_generate",iargs);
  let rr=readResult(r); if(!rr.ids.length&&!rr.images.length) rr=await extractWithClaude(r,"the creation identifier of the image being generated");
  const id0=rr.ids[0]; const web=rr.webUrl||null;
  if(id0&&onQueued) onQueued(id0,web);
  if(!rr.images.length&&!DONE.test(rr.status)&&id0) rr=await waitFor([id0],label||"image");
  const id=rr.ids[0]||id0; if(!id) throw {code:"tool_error",message:"Magnific returned no creation."};
  let shot=rr.images[0]; if(!shot){ const pv=await preview(id); shot=pv.image; }
  if(shot){ const src=`data:${shot.mime};base64,${shot.data}`; rlFull[id]=src; rlTSet(id,await rlThumb(src,rlIsSheet(id)?1100:480)); }
  return {id, web:rr.webUrl||web};
}
/* the user's own image becomes the element's reference (uploaded to Magnific, used as @img in every frame and shot) */
async function toJpegFull(blob,q=.95){ const bmp=await createImageBitmap(blob); const c=document.createElement("canvas"); c.width=bmp.width; c.height=bmp.height; c.getContext("2d").drawImage(bmp,0,0); return await new Promise(r=>c.toBlob(r,"image/jpeg",q)); }
/* give a file of any size a temporary public link (BAE Gemini Eye), sent in pieces at full quality */
async function rlHostFile(file,mime,name,onP){
  const big=S.fileArgs, step=big?12*1048576:700*1024; let hostId=null, url=null;
  for(let off=0;off<file.size;off+=step){
    const piece=file.slice(off,off+step);
    const data=big?{$file:{data:piece,name:(name||"file").replace(/\.[^.]+$/,"")+"_"+off+({"image/png":".png","image/webp":".webp","audio/wav":".wav"}[mime]||".jpg"),type:mime}}:await toB64(piece);
    let r; try{ r=await mcp.callTool(GEYE,"host_file",{data,mime,name,bytes:file.size,offset:off,...(hostId?{host_id:hostId}:{})},{cache:false}); }
    catch(e){ if(big&&off===0&&!/not_connected|not_granted|not in the manifest/i.test(String(e?.code||"")+String(e?.message||""))){ return rlHostFileSmall(file,mime,name); } throw {code:"tool_error",message:`BAE Gemini Eye couldn't keep the image (${e?.code||e?.message||"error"}). Reconnect the BAE Gemini Eye connector (Settings → Connectors), then try again.`}; }
    const o=r?.payload&&typeof r.payload==="object"?r.payload:(()=>{ try{ return JSON.parse((r?.content||[]).map(c=>c.text||"").join("")); }catch{ return {}; } })();
    hostId=o.host_id||hostId; if(o.url) url=o.url; onP?.(Math.min(1,(off+piece.size)/file.size));
  }
  if(!url) throw {code:"tool_error",message:"BAE Gemini Eye didn't return a link for the image."};
  return url;
}
async function rlHostFileSmall(file,mime,name){ const keep=S.fileArgs; S.fileArgs=false; try{ return await rlHostFile(file,mime,name); } finally{ S.fileArgs=keep; } }
async function rlUploadMag(blob,name){
  if(!S.connected) await connect(true);
  const sc=await schemaOf("creations_upload_image");
  const props=sc?.inputSchema?.properties||{};
  const descOf=k=>`${k} ${props[k]?.description||""} ${props[k]?.format||""}`.toLowerCase();
  /* where does the tool take the image? bytes (base64/file) or a link (url) */
  const fileKey=Object.keys(props).find(k=>/base64|bytes|content|data|file/.test(k.toLowerCase())&&!/url|name|type|mime|folder|project/i.test(k))
    ||Object.keys(props).find(k=>/base64|bytes/.test(descOf(k))&&!/name|mime|folder/i.test(k));
  const urlKey=Object.keys(props).find(k=>/url|uri|link|source/i.test(k)&&!/folder|project/i.test(k))
    ||Object.keys(props).find(k=>/\burl\b|https?:/.test(descOf(k))&&!/name|mime|folder/i.test(k));
  /* full quality: the original file goes to Magnific untouched (no resize, no re-compression) */
  const mime=/^image\/(jpeg|png|webp)$/.test(blob.type)?blob.type:"image/jpeg";
  const orig=blob.type===mime?blob:await toJpegFull(blob).catch(()=>blob);
  const ext={"image/jpeg":".jpg","image/png":".png","image/webp":".webp"}[mime];
  name=String(name||"image").replace(/\.[a-z0-9]{2,5}$/i,"")+ext;
  const FILE_MAX=15.5*1048576;
  const hostIt=async()=>rlHostFile(orig,mime,name);
  let link=null, val=null, mode="";
  if(fileKey&&S.fileArgs&&orig.size<=FILE_MAX){ mode="file"; }
  else if(urlKey){ mode="url"; link=await hostIt(); }
  else if(fileKey&&S.fileArgs){ mode="file"; } /* bigger than 16 MB and no link field: re-encode at FULL resolution below */
  else if(fileKey){ mode="inline"; }
  else throw {code:"tool_error",message:`Magnific's upload tool takes: ${Object.keys(props).join(", ")||"(no schema)"} — none of them is an image. Send me this message.`};
  const hint=mode==="url"?`The image is at this public URL; put it in "${urlKey}": ${link}`:`The image bytes go in "${fileKey}": put the placeholder "${/data:|data url|dataurl/i.test(descOf(fileKey))?"__FILE_DATAURL__":"__FILE__"}" there.`;
  const plan=await buildArgs("creations_upload_image",`Upload one image named ${name} (${mime}, full resolution) to the user's Magnific creations so it can be used as a reference image (@img) in image and video generation. ${hint}`,mode==="url"?{filename:name,mime_type:mime,[urlKey]:link}:{filename:name,mime_type:mime,[fileKey]:"__FILE__"});
  let args=plan.args||{};
  if(mode!=="url"){
    if(!/__FILE(_DATAURL)?__/.test(JSON.stringify(args))) args={...args,[fileKey]:"__FILE__"};
    const usesDataUrl=JSON.stringify(args).includes("__FILE_DATAURL__");
    if(mode==="file"&&!usesDataUrl){
      let f=orig, fm=mime; if(f.size>FILE_MAX){ for(const q of [.95,.9,.85]){ f=await toJpegFull(orig,q); fm="image/jpeg"; if(f.size<=FILE_MAX) break; } }
      val={$file:{data:f,name:name.replace(/\.[a-z0-9]+$/i,fm==="image/jpeg"?".jpg":ext),type:fm}};
    } else {
      /* this view can't pass files: only ~1 MB fits inline, so use a link if the tool takes one */
      if(urlKey){ link=link||await hostIt(); args={...args}; delete args[fileKey]; args[urlKey]=link; }
      else { const small=await toJpeg(blob,2048).catch(()=>blob); const b64=await toB64(small); val=usesDataUrl?"data:image/jpeg;base64,"+b64:b64; }
    }
    if(val){ args=replaceDeep(args,"__FILE__",val); args=replaceDeep(args,"__FILE_DATAURL__",val); }
  } else if(!JSON.stringify(args).includes(link)) args={...args,[urlKey]:link};
  const r=await callMag("creations_upload_image",args);
  let rr=readResult(r); if(!rr.ids.length&&!rr.urls.length) rr=await extractWithClaude(r,"the uploaded creation's identifier and url");
  if(!rr.ids.length) throw {code:"tool_error",message:"Magnific accepted the upload but returned no identifier"};
  /* an upload may still be processing: wait until it is ready to be used as a reference */
  try{ await waitFor([rr.ids[0]],"upload",4); }catch{}
  /* the upload result can carry several ids (upload, asset, creation): keep the one Magnific knows as a creation */
  let good=rr.ids[0];
  if((await rlMissingCreations([good])).length){
    const alts=rr.ids.slice(1); let x=null; for(const a of alts) if(!(await rlMissingCreations([a])).length){ x=a; break; }
    if(!x){ const ex=await extractWithClaude(r,"the Pikaso CREATION identifier of the uploaded image (the id that creations_get / creations_list use — not an upload, asset or file id)"); for(const a of ex.ids||[]) if(a!==good&&!(await rlMissingCreations([a])).length){ x=a; break; } }
    if(!x) throw {code:"tool_error",message:"Magnific took the upload but didn't return a creation id it can find again. Try once more; if it repeats, send me this message."};
    good=x; }
  return {id:good,web:rr.links?.find(u=>/magnific\.com/.test(u))||null};
}
/* study the user's own image so every description and prompt matches it exactly */
async function rlStudyImage(e,blob){
  if(blob.size>4e6) blob=await toJpeg(blob,2000).catch(()=>blob); /* only Claude's copy is smaller; Magnific gets the original */
  if(!sampleImages) return false;
  const isChar=RL.characters.includes(e), isProp=e.kind==="prop";
  const kind=isChar?"character":isProp?"prop/product":"location";
  const o=await rlAsk(`You are the casting and art department of a commercial director. The user uploaded the reference image of the ${kind} ${e.handle||e.tag} "${e.name||""}" for a Bank al Etihad (Jordan) reel. From now on THIS IMAGE is the truth — study it and describe it EXACTLY, so every prompt matches it.
Current notes (may be wrong — the image wins): ${trimJSON({description:e.description,wardrobe:e.wardrobe,prompt:String(e.prompt||"").slice(0,800)},1600)}
${isChar?`Describe: apparent age, gender, build and height impression, face shape, skin tone, eyes, brows, nose, lips, facial hair, hairline, hair colour/length/style, distinctive marks; then EXACT wardrobe top to bottom (garment, colour, fabric, fit, details, shoes, accessories); then posture and attitude. If the image is a multi-panel sheet, read all panels.`:isProp?`Describe: exact object, shape, size impression, materials, colours, finish, branding/markings, condition, details front and back.`:`Describe: kind of place, layout and depth, walls/floor/ceiling materials and colours, doors and windows (where, which side), furniture and objects, light sources and direction, colour temperature, time of day, mood.`}
Reply with ONLY JSON: {"description":"2–3 sentences, concrete","${isChar?"wardrobe":"details"}":"precise, comma-separated","prompt":"a complete image-generation prompt that recreates exactly this ${kind}${isChar||isProp?" on a plain gray clean background (three-panel character sheet for a character)":""}","summary_ar":"one short Jordanian-Arabic sentence telling the user what you saw"}`,{modelTier:"default",images:[blob],cache:false});
  if(!o||!o.description) return false;
  e.description=String(o.description); if(isChar&&o.wardrobe) e.wardrobe=String(o.wardrobe); if(!isChar&&o.details) e.details=String(o.details);
  if(o.prompt) e.prompt=String(o.prompt);
  e.studied=Date.now(); e._summary=String(o.summary_ar||"");
  return true;
}
async function rlUseImage(tag,blob,{quiet}={}){
  const e=rlElByTag(tag); if(!e||!blob||!mcp) return;
  e.status="run"; e.err=null; e._live=true; e._note="Uploading your image…"; rlBoard();
  try{
    const th=await rlThumb(URL.createObjectURL(blob),640);
    const out=await rlJob(()=>rlUploadMag(blob,`${String(e.handle||e.tag).replace(/^@/,"")}.jpg`));
    Object.assign(e,{id:out.id,web:out.web||e.web,status:"ok",stale:false,fromUser:true,lib:null,fromLib:false}); if(th) rlTSet(out.id,th);
    e._note="Studying your image…"; rlBoard();
    const studied=await rlStudyImage(e,blob).catch(()=>false);
    rlEvent(`The user replaced the image of ${e.handle} (${e.name||""}) with their own${studied?`; the Director studied it: ${String(e.description||"").slice(0,240)}`:""}.`);
    if(studied) e.seen=`${e.description}${e.wardrobe?` Wardrobe: ${e.wardrobe}`:""}${e.details?` Details: ${e.details}`:""}`;
    if(studied){
      /* carry the new look into every scene that uses this element */
      const hs=[e.handle,e.tag].filter(Boolean).map(x=>String(x).toLowerCase());
      const ns=RL.scenes.filter(sc=>hs.some(h=>String(sc.prompt||"").toLowerCase().includes(h)||String(sc.frame_prompt||"").toLowerCase().includes(h)||(sc.refs||[]).map(x=>String(x).toLowerCase()).includes(h))).map(sc=>sc.n);
      if(!quiet) RL.chat.push({role:"a",text:`👁 ${e._summary||`I studied your image of ${e.name}.`}\n${e.description}${e.wardrobe?`\nWardrobe: ${e.wardrobe}`:""}${e.details?`\nDetails: ${e.details}`:""}${ns.length?`\nI'm updating scene${ns.length>1?"s":""} ${ns.join(", ")} to match.`:""}`,changes:[`✎ ${e.handle}: description${e.wardrobe?", wardrobe":""}, prompt (from your image)`,...ns.map(n=>`↻ scene ${n} re-checked`)],prompt:{label:`New prompt for ${e.handle}`,text:e.prompt},t:Date.now()});
      rlRenderChat();
      if(ns.length) rlCheckScenes(ns,{quiet:true});
    }
    brSignal(RL.characters.includes(e)?"character":"location","own_image_used",1,{item:`${e.handle||e.tag} ${e.name||""}`,key:"own"+e.tag});
  }catch(err){ e.status="err"; e.err="Your image wasn't uploaded: "+mcpCopy(err); }
  finally{ delete e._live; delete e._note; rlSave(); rlBoard(); }
}
async function rlGenElement(tag){
  const e=rlElByTag(tag); if(!e||!mcp||!sample||e.status==="run"||!e.prompt) return;
  if(!S.connected) await connect(true);
  e.status="run"; e.err=null; e._live=true; rlBoard();
  const isLoc=RL.locations.includes(e)&&e.kind!=="prop";
  const isChar=RL.characters.includes(e), portrait=isChar&&!rlIsSheetPrompt(e.prompt);
  const sendPrompt=isLoc||portrait||/plain gr[ae]y clean background/i.test(e.prompt)?e.prompt:`${e.prompt}\nBackground: plain gray clean background — seamless flat matte mid-grey, no gradient, no texture, no floor line, no shadows on the backdrop.`;
  try{ const out=await rlJob(()=>rlImage({prompt:sendPrompt,aspect:portrait?"3:4":"16:9",label:portrait?"portrait":"reference image",onQueued:(id,web)=>{ e.pending=id; e.web=web||e.web; rlFlush(); }})); Object.assign(e,{id:out.id,web:out.web,status:"ok",stale:false}); delete e.pending; delete e.seen; if(isChar){ e.stage=portrait?"portrait":"sheet"; if(portrait){ e.portraitId=out.id; } }
    rlEvent(`A new image of ${e.handle} (${e.name||""}) was generated.`); setTimeout(()=>rlSee(e,`the reference image of ${rlKind(e)} ${e.handle} "${e.name||""}"`,e.prompt),1500); }
  catch(err){ if(e.pending&&rlTransient(err)){ e.status="paused"; e.err=null; } else { e.status="err"; e.err=mcpCopy(err); delete e.pending; } }
  finally{ delete e._live; }
  rlSave(); rlBoard();
}
async function rlGenSheet(tag){
  const e=rlElByTag(tag); if(!e||!mcp||!sample||e.status==="run") return; const src=e.portraitId||e.id; if(!src) return;
  if(!S.connected) await connect(true);
  e.status="run"; e.err=null; e._live=true; e._note="Making the character sheet…"; rlBoard();
  try{ const prompt=rlSheetPrompt2(e);
    const out=await rlJob(()=>rlImage({prompt,aspect:"16:9",refs:[{id:src,tag:e.handle,name:e.name||"the character"}],label:"character sheet",onQueued:(id,web)=>{ e.pending=id; rlFlush(); }}));
    Object.assign(e,{portraitId:src,id:out.id,web:out.web,status:"ok",stale:false,stage:"sheet",sheetPrompt:prompt}); delete e.pending; delete e.seen;
    rlEvent(`The character sheet of ${e.handle} (${e.name||""}) was made from the chosen portrait.`); }
  catch(err){ if(e.pending&&rlTransient(err)){ e.status="paused"; e.err=null; } else { e.status="err"; e.err=mcpCopy(err); delete e.pending; } }
  finally{ delete e._live; delete e._note; }
  rlSave(); rlBoard();
}
async function rlGenFrame(n){
  const sc=RL.scenes.find(x=>+x.n===+n); if(!sc||!mcp||!sample||sc.frame?.status==="run") return;
  if(!S.connected) await connect(true);
  const f=sc.frame=sc.frame||{}; f.status="run"; f.err=null; f._live=true; rlBoard(); rlWake(true);
  try{
    await rlEnsureChecked(sc);
    if(!(sc.frame_prompt||"").trim()){
      const o=await rlAsk(`Write ONE photorealistic still-image prompt (ByteDance Seedream 5.5) for the exact FIRST FRAME of this Seedance 2.5 scene: shot size, lens, camera height, blocking and screen sides, wardrobe, props, light and grade, as in its first shot. Name people, places and props with their handles exactly as the scene does ("@char_sara stands…"); the studio adds the references block itself. State the geography explicitly from the blueprint: zones (INTERIOR/EXTERIOR…), who is in which zone, door direction, where the camera stands and looks, exact head-count, light source. No motion words. ${RL_BAE}\n\nBlueprint: ${trimJSON(sc.blueprint||null,4000)}\n\nScene prompt:\n${sc.prompt}\n\nReply with only JSON: {"frame_prompt":"..."}`,{modelTier:"default"});
      sc.frame_prompt=String(o?.frame_prompt||"").trim(); if(!sc.frame_prompt) throw {code:"invalid_json",message:"Claude didn't return a first-frame prompt."};
    }
    const {prompt,refs,missing}=rlSceneRefs(sc,"frame_prompt");
    if(missing.length) throw {code:"tool_error",message:`Generate ${missing.join(", ")} first, so the first frame can use them.`};
    const out=await rlImage({prompt,aspect:rlSet().aspect,refs,label:"first frame",onQueued:(id,web)=>{ f.pending=id; f.web=web||f.web; rlFlush(); }});
    Object.assign(f,{id:out.id,web:out.web,status:"ok",stale:false}); delete f.pending; delete f.seen;
    rlEvent(`The first frame of scene ${sc.n} was generated.`); setTimeout(()=>rlSee(f,`the first frame of scene ${sc.n}`,sc.frame_prompt),1500);
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
  if(RL.characters.includes(e)) return `${r.tag} = ${e.name} — defines face, hair, build and wardrobe ONLY, 100% matches the reference. Pose, backdrop, panel layout and lighting of the sheet are not inherited.`;
  if(e.kind==="prop") return `${r.tag} = ${e.name} — defines the exact object ONLY: shape, materials, colours, printed details, 100% matches the reference.`;
  return `${r.tag} = ${e.name} — defines the place ONLY: architecture, materials, textures and light character. Its camera angle is not inherited.`; }
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
    /* house standard: ACTIVE REFERENCES open the prompt; the film look sits in the STYLE suffix, never as a prefix */
    if(lines.length){
      if(/^\s*ACTIVE REFERENCES\b/im.test(body)){ /* keep the writer's own lines; add any reference it didn't describe */
        const miss=refs.filter(r=>!new RegExp(r.tag.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?!\\d)\\s*[=:—-]").test(body)).map(r=>lines[refs.indexOf(r)]);
        if(miss.length) body=body.replace(/(^|\n)(\s*ACTIVE REFERENCES[^\n]*\n)/i,(m,p,h)=>`${p}${h}${miss.join("\n")}\n`); }
      else body=`ACTIVE REFERENCES\n${lines.join("\n")}\n\n${body}`; }
    if(RL.look&&!/^\s*STYLE\b/im.test(body)&&!/FILM LOOK\s*:/i.test(body)) body=body.replace(/\n\s*(POSITIVE LOCKS|HOLD FOR THE FULL TIMELINE)\b/i,m=>`\n\nSTYLE\n${RL.look}\n${m}`)+(/(POSITIVE LOCKS|HOLD FOR THE FULL TIMELINE)/i.test(body)?"":`\n\nSTYLE\n${RL.look}`);
  }
  return {prompt:body, refs:refs.map(({el,...r})=>r), missing:els.filter(el=>!el.id).map(el=>el.tag)};
}
const RL_PH="<<SCENE_PROMPT>>";
async function rlRenderScene(n){
  const sc=RL.scenes.find(x=>+x.n===+n); if(!sc||!mcp||!sample||sc.status==="run") return;
  if(!S.connected) await connect(true);
  if(!sc.check||sc.check.dirty||!sc.blueprint){ sc.status="run"; sc.note="The script supervisor is checking the scene first…"; rlBoard(); await rlEnsureChecked(sc); sc.status=null; }
  const {prompt:p0,refs,missing}=rlSceneRefs(sc);
  if(missing.length){ sc.status="err"; sc.note=`Generate ${missing.join(", ")} first (Cast / Locations), so they can be attached.`; rlBoard(); return; }
  { const bad=await rlMissingCreations(refs.filter(r=>!r.map).map(r=>r.id));
    if(bad.length){ const els=rlEls().filter(e=>bad.includes(e.id));
      for(const e of els){ e.err="This image isn't in your Magnific (Creation not found). "+(e.fromUser?"Press “Replace my image” and upload it again.":e.fromLib?"Relink the BAE library (Photography → References).":"Press Generate image."); e.id=null; e.status="err"; e.fromUser=false; }
      sc.status="err"; sc.note=`${els.length?els.map(e=>`${e.handle} (${e.name||""})`).join(", "):bad.join(", ")} ${bad.length>1?"aren't":"isn't"} in your Magnific, so Seedance would refuse it. I stopped before spending credits — upload or generate ${bad.length>1?"them":"it"} again (marked red in Cast / Locations), then press Generate video.`;
      rlEvent(`Render of scene ${sc.n} stopped: missing creations ${els.map(e=>e.handle).join(", ")}.`); rlSave(); rlBoard(); return; } }
  if(!refs.length){ sc.status="err"; sc.note="This scene names no characters, locations or props, so no images would be attached. Add their handles (@char_…, @loc_…) to the prompt or ask the Director to fix the scene."; rlBoard(); return; }
  const start=sc.useFrame===true&&sc.frame?.id?sc.frame.id:null;
  const vc=rlVoiceCompose(sc,p0); const voices=vc.voices;
  const prompt=start?`START FRAME: the video begins exactly on the provided start image and animates from it; keep its composition, faces, wardrobe, place and light.\n\n${vc.prompt}`:vc.prompt;
  sc.status="run"; sc.note="Finding Seedance 2.5…"; sc._blocked=false; sc._live=true; rlBoard(); rlWake(true);
  const t0=Date.now();
  try{
    const m=await rlModel(); const set=rlSet(); const dur=Math.max(4,Math.min(120,+sc.duration_s||8)); /* Seedance 2.5 takes 4–30 s; longer is sent as asked */
    sc.note=start?"Sending the first frame to Seedance 2.5…":"Sending to Seedance 2.5…"; rlBoard();
    const plan=await buildArgs("video_generate",`Generate ONE video with the Seedance 2.5 model${m.id?` (model id "${m.id}")`:""}. Use the prompt verbatim. Duration ${dur} seconds. Aspect ratio ${set.aspect}. ${set.res==="draft"?"Draft mode (480p preview) if the tool offers it.":`Resolution ${set.res}.`} Audio on (the prompt writes the sound). ${start?"IMAGE-TO-VIDEO: put Data.start_image.identifier in the tool's start image / first frame / init image field so the video starts on that frame. ":""}Attach EVERY item of Data.references as image references, in exactly this order, so the first is @img1, the second @img2 and so on; use each item's identifier.${start?" Do not add the start image to the references list unless the tool has no separate start image field; if it has none, put it FIRST in the references with role start/first frame and keep the others after it.":""} If the model id is not in Data, pick the Seedance 2.5 entry from Data.models.`,
      {model:m.id, model_name:m.name, models:m.id?null:m.raw, prompt:RL_PH, duration_seconds:dur, aspect_ratio:set.aspect, resolution:set.res==="draft"?"480p":set.res, mode:set.res==="draft"?"draft":"standard", start_image:start?{identifier:start,type:"image"}:undefined, references:refs.map(r=>({identifier:r.id,type:"image"}))},"default");
    let args=fixRefs(plan.args,refs.map(r=>({id:r.id})));
    const lost=()=>refs.filter(r=>!JSON.stringify(args).includes(r.id));
    if(lost().length){ /* the arguments dropped some reference images: rebuild once, insisting on them */
      const p2=await buildArgs("video_generate",`Generate ONE video with Seedance 2.5. EVERY ONE of the ${refs.length} items in Data.references MUST be attached as image references (media / references / reference images field), in this exact order, each by its identifier — the previous attempt left out ${lost().map(r=>r.tag).join(", ")}. No start image. Prompt verbatim, ${dur} seconds, aspect ${set.aspect}, audio on.`,{model:m.id,model_name:m.name,models:m.id?null:m.raw,prompt:RL_PH,duration_seconds:dur,aspect_ratio:set.aspect,resolution:set.res==="draft"?"480p":set.res,references:refs.map(r=>({identifier:r.id,type:"image"}))},"default");
      args=fixRefs(p2.args,refs.map(r=>({id:r.id})));
      if(lost().length) throw {code:"refs_missing",message:`Couldn't attach ${lost().map(r=>r.tag+" ("+r.name+")").join(", ")} to Seedance, so I stopped before spending credits. Try again; if it repeats, tell Claude.`}; }
    /* ROOT FIX: the reference list is written by the page from the tool's real schema — never left to a guess.
       Each item carries the real creation identifier; labels like "@img1" never go in an id field. */
    args=await rlPutRefs(args,refs,start,"video_generate",voices);
    /* the settings Magnific must receive are written by the page from the tool's own schema, never left to a guess */
    { const VP=(await schemaOf("video_generate"))?.inputSchema?.properties||{};
      const resWant=set.res==="draft"?"Draft":/^4k$/i.test(set.res)?"4K":set.res;
      if("resolution" in VP||!Object.keys(VP).length) args.resolution=resWant; else for(const k of Object.keys(args)) if(/resolution/i.test(k)&&!args[k]) args[k]=resWant;
      if("duration" in VP) args.duration=dur;
      if("aspectRatio" in VP) args.aspectRatio=set.aspect;
      /* the prompt is written by the page, whole and exactly as composed (voices already swapped to @audioN) — never retyped by a model */
      delete args.multi_prompt;
      const putP=o=>{ for(const k of Object.keys(o)){ const v=o[k]; if(typeof v==="string"&&v.includes(RL_PH)) o[k]=v.split(RL_PH).join(prompt); else if(v&&typeof v==="object") putP(v); } }; putP(args);
      if("prompt" in VP||!Object.keys(VP).length||!JSON.stringify(args).includes(prompt.slice(0,60))) args.prompt=prompt;
      if("withSoundEffects" in VP) args.withSoundEffects=true;
      if("promptMode" in VP) args.promptMode="manual";
      for(const k of Object.keys(args)) if(args[k]===""||args[k]==null) delete args[k]; }
    if(/@voice\d/i.test(JSON.stringify(args))) throw {code:"voice_tag",message:"The prompt still names @voice instead of @audio, so I stopped before spending credits. Tell Claude."};
    { const sent=JSON.stringify(args); const missing=[...refs,...voices].filter(r=>!sent.includes(r.id));
      sc.lastCall={at:Date.now(),schema:RL_LASTREFSCHEMA,args:JSON.parse(JSON.stringify(args,(k,v)=>k==="prompt"&&typeof v==="string"?v.slice(0,300)+"…":v))};
      if(missing.length){ rlSave(); throw {code:"refs_missing",message:`${missing.length} reference image${missing.length>1?"s":""} (${missing.map(r=>r.tag).join(", ")}) couldn't be attached, so I stopped before spending credits. Send me a screenshot.`}; } }
    const r=await callMag("video_generate",args).catch(e=>{ if(sc.lastCall) sc.lastCall.error=String(e?.message||e?.code||e).slice(0,600); rlSave(); throw e; });
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
  rlEvent(`Scene ${sc.n}'s video finished rendering.`);
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
  RL.scenes.forEach(s=>{ const r=rlSceneRefs(s,"prompt",{compose:false}); n.push({title:`Shot ${s.n} · ${s.title||""} · ${s.duration_s||""} s`,text:`${s.logline?s.logline+"\n\n":""}References in order: ${r.refs.map(x=>`${x.tag} = ${x.map?"position map":`${x.name} (${rlElByTag(x.global)?.handle||x.global})`}`).join(", ")||"none"}\n\nBLOCKING (checked by the script supervisor${s.check?.passed?`: ${s.check.passed}/8 checks`:""}):\n${bpText(s.blueprint)}\n\nFIRST FRAME (Seedream 5.5):\n${s.frame_prompt||"—"}\n\nSEEDANCE 2.5:\n${s.prompt||""}`}); });
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
  const shots=RL.scenes.map(sc=>{ const r=rlSceneRefs(sc); return {scene:sc.n,title:sc.title,duration_s:Math.max(4,Math.min(120,+sc.duration_s||8)),first_frame_creation:sc.frame?.id||null,reference_creations:r.refs.map(x=>({tag:x.tag,creation:x.id,name:x.name})),prompt:(sc.frame?.id?"START FRAME: the video begins exactly on the connected start image.\n\n":"")+r.prompt}; });
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

/* ================= New look + features (v84) ================= */
/*UXDICT*/const UX_AR={
"Reels":"الريلز","Home":"الرئيسية","New reel":"ريل جديد","Start from an idea, a brief or a storyboard":"ابدأ من فكرة أو بريف أو ستوري بورد","Director's brain":"عقل المخرج","What the Director knows and learns every day":"شو بيعرف المخرج وشو بيتعلم كل يوم",
"Projects save to your account automatically. Only you can see them.":"المشاريع بتنحفظ بحسابك لحالها. إنت بس اللي بتشوفها.","Projects save in this browser automatically.":"المشاريع بتنحفظ بهالمتصفح لحالها.","From idea to film with Claude and Seedance 2.5, collected in a Magnific Space.":"من الفكرة للفيديو مع Claude و Seedance 2.5.",
"Duplicate":"انسخ","Delete":"احذف","Reel title":"اسم الريل","Saved to your account":"محفوظ بحسابك","Saved in this browser":"محفوظ بهالمتصفح","Saving…":"عم يحفظ…","Couldn't save":"ما انحفظ",
"Chat":"الشات","Board":"اللوحة","Simple":"بسيط","Pro":"محترف","Settings":"الإعدادات","Mode":"الوضع","View":"العرض","Interface":"لغة الواجهة","Length":"المدة","Format":"المقاس","Dialogue":"الحوار","Video quality":"جودة الفيديو",
"15 s":"15 ثانية","30 s":"30 ثانية","45 s":"45 ثانية","60 s":"60 ثانية","9:16 · Reels / TikTok":"9:16 · ريلز وتيك توك","4:5 · Feed":"4:5 · فيد","16:9 · Widescreen":"16:9 · عريض","1:1 · Square":"1:1 · مربع","Jordanian Arabic":"عربي أردني","Modern Standard Arabic":"عربي فصحى","English":"إنجليزي","Draft 480p · cheap test":"تجربة 480p · رخيصة",
"Story":"القصة","Images":"الصور","Scenes":"المشاهد","Video":"الفيديو","Idea":"الفكرة","Script":"السكريبت","Cast":"الشخصيات","Places & props":"الأماكن والأغراض","Production stages":"مراحل الشغل",
"Director":"المخرج","with 5 assistant directors · Gemini Eye":"ومعه 5 مساعدين · Gemini Eye","Message the Director…":"اكتب للمخرج…","Message the Director":"اكتب للمخرج","Send":"ابعث","Stop":"وقّف","Speak":"احكي بصوتك","Attach images or videos":"ارفع صور أو فيديو","Attach images or videos — Gemini watches videos":"ارفع صور أو فيديو",
"Images, videos (Gemini watches them), sheets or a script · Enter to send · Shift+Enter for a new line":"صور، فيديوهات، أو سكريبت · Enter للإرسال",
"What are we filming today?":"شو بدنا نصوّر اليوم؟","Tell me the idea in your own words, or drop your images. I take it from there, step by step.":"احكيلي الفكرة بكلامك، أو ارفع صورك. أنا بكمّل الباقي خطوة خطوة.","Or start from a ready-made template":"أو ابدأ من قالب جاهز",
"Product ad":"إعلان منتج","Introduce one product and its main benefit":"عرّف بمنتج وفايدته الأساسية","Offer or campaign":"عرض أو حملة","A limited offer people should act on":"عرض لفترة محدودة","Comedy situation":"موقف كوميدي","A relatable Jordanian moment, product as the hero":"موقف أردني من الحياة، والمنتج هو البطل","Occasion":"مناسبة","Ramadan, Eid, Mother's Day, national days":"رمضان، العيد، عيد الأم، المناسبات الوطنية",
"Keep going on your own":"كمّل لحالك","Stops before anything that costs credits":"بوقف قبل أي إشي بيصرف credits","The Director is working…":"المخرج عم يشتغل…","Choose an idea":"اختار فكرة","Write the script":"اكتب السكريبت","Script is good · prepare the images":"السكريبت تمام · جهّز الصور","Cast is good · places and props next":"الشخصيات تمام · التالي: الأماكن والأغراض","Places are good · write the scenes":"الأماكن تمام · اكتب المشاهد","Preparing the images…":"عم يجهّز الصور…","Open the images":"افتح الصور","All scenes are filmed · deliver":"كل المشاهد جاهزة · التسليم","Unlimited plan":"اشتراك مفتوح",
"Done in the studio":"انعمل بالستوديو","Undone":"انلغى","Undo":"تراجع","Answer it now":"جاوب هسا","The room":"غرفة المساعدين","Apply":"طبّق","Skip":"تجاوز","✓ Applied":"✓ انطبّق","Skipped":"انتجاوز","all answered":"كلهم انجاوبوا","Ideas from the assistant directors":"أفكار المساعدين","What Gemini saw":"شو شاف Gemini",
"Your images, sorted":"صورك، مرتبة","wrong place? move it":"بمكان غلط؟ انقلها","Do you already have any of these?":"عندك أي إشي من هدول جاهز؟","Upload":"ارفع","＋ Upload several — I'll sort them":"＋ ارفع كذا صورة وأنا برتّبهم","Uploads keep their original quality. Drop them in any order, or write “image 1 = Omar, image 2 = the hall”.":"الصور بتنرفع بجودتها الأصلية. ارفعهم بأي ترتيب، أو اكتب: صورة 1 = عمر، صورة 2 = الصالة.","✓ Generated":"✓ جاهزة","All set — every element has an image":"تمام، كل عنصر إله صورة",
"Three directions built to stop the scroll. Choose one, or ask for more.":"ثلاث أفكار بتوقّف السكرول. اختار وحدة، أو اطلب غيرهم.","More ideas":"أفكار ثانية","Suggest 3 ideas":"اقترح 3 أفكار","Describe the reel in the chat — the product, the message, the audience — or attach a storyboard. Claude answers with three viral ideas.":"احكي عن الريل بالشات: المنتج، الرسالة، الجمهور. والمخرج برجعلك بثلاث أفكار.","Choose":"اختار","Chosen":"المختارة","Hook":"الهوك","Why it travels":"ليش بتنتشر","Product moment":"لحظة المنتج","Jury":"التقييم","Use this":"استعمل هاي","Brief notes from Claude":"ملاحظات على البريف",
"Scene by scene, with timing, dialogue, on-screen text and sound.":"مشهد مشهد، مع التوقيت والحوار والنص والصوت.","Generate storyboard":"ولّد الستوري بورد","Redraw storyboard":"ارسم الستوري بورد من جديد","Drawing the storyboard…":"عم يرسم الستوري بورد…","▶ Free preview":"▶ معاينة مجانية","Choose an idea first.":"اختار فكرة أول.","Ask Claude to write the script for the chosen idea.":"اطلب من المخرج يكتب السكريبت.","Go to Idea":"روح للفكرة","Action":"الحدث","Name: line":"الاسم: الجملة","Dialogue, one line per speaker as Name: line":"الحوار، كل جملة بسطر","On-screen text":"النص على الشاشة","Sound":"الصوت","How is this script?":"كيف السكريبت؟","Approve script · build the cast":"السكريبت تمام · جهّز الشخصيات","Waiting…":"بالدور…","Choosing the key moment…":"عم يختار اللحظة…","Drawing in Seedream 5.5 · 2K…":"عم يرسم بـ Seedream 5.5 · 2K…","Download":"نزّل","Redraw":"ارسم من جديد",
"Reference sheets keep every face the same in every shot.":"صورة مرجعية لكل شخصية عشان يضل الوجه نفسه بكل لقطة.","Locations & props":"الأماكن والأغراض","Locations":"الأماكن","Empty establishing images and product sheets. Every shot inherits their light.":"صور للأماكن فاضية وللأغراض. كل لقطة بتوخذ إضاءتها منهم.","Generate all missing":"ولّد كل الناقص","Add character":"ضيف شخصية","Add location":"ضيف مكان","Add prop":"ضيف غرض","Or cast a BAE character":"أو اختار شخصية من BAE","Generate image":"ولّد الصورة","Generate instead":"ولّد بدالها","Regenerate":"ولّد من جديد","Generating…":"عم يولّد…","Uploading…":"عم يرفع…","Use my image":"استعمل صورتي","Replace my image":"بدّل صورتي","Replace":"بدّل","Edit":"عدّل","Revise":"عدّل","Remove":"احذف","Cancel":"إلغاء","Create":"أنشئ","Done":"تم","Close":"سكّر","No image yet":"ما في صورة لسا","Loading image…":"عم يحمّل الصورة…","Ask for a change… e.g. older, navy blazer":"اطلب تعديل… مثلاً: أكبر بالعمر، جاكيت كحلي","Approve cast · build the locations":"الشخصيات تمام · جهّز الأماكن","Approve locations · direct the shots":"الأماكن تمام · اكتب المشاهد","Direct the shots":"اكتب المشاهد","New character":"شخصية جديدة","New location":"مكان جديد","New prop":"غرض جديد","Who they are, age, look, role in the story":"مين هو، العمر، الشكل، ودوره بالقصة","The place, time of day, mood":"المكان، الوقت، والجو","The object and why it matters":"الغرض وليش مهم","Good — teach the Director":"حلو، علّم المخرج","Weak — teach the Director":"ضعيف، علّم المخرج",
"Shots":"المشاهد","All videos":"كل الفيديوهات","Film look":"شكل الفيلم","Shared by every shot, added on top of each prompt when it renders":"مشترك بين كل المشاهد","Scene details":"تفاصيل المشهد","prompts · blocking · the room · review":"البرومبتات · الحركة · المساعدين · المراجعة","Not checked":"مش مفحوص","Not checked yet":"مش مفحوص لسا","Check again":"افحص كمان مرة","Checking":"عم يفحص","Checking…":"عم يفحص…","Check this scene":"افحص المشهد","First frame":"أول فريم","✓ Video":"✓ الفيديو","✓ First frame":"✓ أول فريم","Cast and places in this scene":"الشخصيات والأماكن بهالمشهد",
"Generate video":"ولّد الفيديو","Generate video again":"ولّد الفيديو من جديد","Generate first frame":"ولّد أول فريم","Regenerate first frame":"ولّد أول فريم من جديد","Rendering…":"عم يطلع…","Rendering video…":"عم يطلع الفيديو…","Rendering in Magnific…":"عم يطلع بـ Magnific…","Generating first frame…":"عم يولّد أول فريم…","Updating the prompt…":"عم يحدّث البرومبت…","Writing the scene…":"عم يكتب المشهد…","Gemini is watching…":"Gemini عم يتفرج…","👁 Review with Gemini":"👁 راجع مع Gemini","Review again with Gemini":"راجع كمان مرة مع Gemini","Fix the prompt with Gemini’s notes":"صلّح حسب ملاحظات Gemini","✎ Ask for edit":"✎ اطلب تعديل","Apply edit":"طبّق التعديل","What should change in this scene? Write it any way you like.":"شو بدك تغيّر بالمشهد؟ اكتبها زي ما بدك.","✦ Auto-improve prompt":"✦ حسّن البرومبت لحاله","Ask the room":"اسأل المساعدين","The room is thinking…":"المساعدين عم يفكروا…","Rewriting…":"عم يعيد الكتابة…","Blocking & continuity":"الحركة والاستمرارية","Top-down blocking plan":"مخطط الحركة من فوق","Make a position map":"اعمل خريطة مواقع","Remake the map":"اعمل الخريطة من جديد","Making the map…":"عم يعمل الخريطة…","Position map":"خريطة المواقع","Who is where":"مين وين","Order of events":"ترتيب الأحداث","No blueprint yet. The script supervisor builds one when it checks the scene.":"ما في مخطط لسا. بينعمل لما ينفحص المشهد.","First frame prompt":"برومبت أول فريم","Video prompt":"برومبت الفيديو","Written from the scene when you generate the first frame":"بينكتب لما تولّد أول فريم","Copy prompt":"انسخ البرومبت","Play here":"شغّله هون","Gemini review":"مراجعة Gemini","How is this shot?":"كيف المشهد؟","How is this first frame?":"كيف أول فريم؟","The video can't play inside this page — open the MP4 or Magnific to watch it.":"الفيديو ما بيشتغل جوّا الصفحة. افتح MP4 أو Magnific.","The scene prompt was corrected after this video was made.":"البرومبت تعدّل بعد ما طلع هالفيديو.","Still generating in Magnific — it appears here when it's done.":"لسا عم يتولّد بـ Magnific. بيظهر هون لما يخلص.","No problems found.":"ما في مشاكل.","No dialogue":"بدون حوار",
"Dialogue & voices":"الحوار والأصوات","Generate voice":"ولّد الصوت","Regenerate voice":"ولّد الصوت من جديد","Generate all missing voices":"ولّد كل الأصوات الناقصة","Generating the voice…":"عم يولّد الصوت…","Choose a voice":"اختار صوت","Change voice":"غيّر الصوت","Attach voice":"اربط صوت","Attach":"اربط","Copy line":"انسخ الجملة","Voice script":"نص الصوت","Loading voices…":"عم يحمّل الأصوات…","Loading your audio…":"عم يحمّل أصواتك…","No audio found in your Magnific yet.":"ما في أصوات بحسابك على Magnific لسا.",
"Fit the exact voices · lip-sync (beta)":"ركّب الأصوات بالزبط مع حركة الشفايف (تجريبي)","Fitting the voice…":"عم يركّب الصوت…","Back to the original video":"رجّع الفيديو الأصلي","Replaces the video's sound with your generated voices and matches the lips. Background sound from Seedance is not kept.":"ببدّل صوت الفيديو بأصواتك المولّدة وبطابق حركة الشفايف. صوت الخلفية من Seedance ما بيضل.","Confirm":"أكّد",
"Play":"شغّل","Pause":"وقّف مؤقت","Play again":"شغّل من الأول","Free preview":"معاينة مجانية","Free preview: storyboard frames with your generated voices on the real timing.":"معاينة مجانية: صور الستوري بورد مع أصواتك بالتوقيت الحقيقي.","Free preview: storyboard frames on the real timing. Generate voices to hear the dialogue too.":"معاينة مجانية: صور الستوري بورد بالتوقيت الحقيقي. ولّد الأصوات عشان تسمع الحوار كمان.","No credits are spent.":"ما بتنصرف أي credits.",
"Deliver":"التسليم","Collect the whole production in a Magnific Space, join the clips into one reel, and keep a copy of every prompt.":"اجمع الشغل كله، ادمج المقاطع بريل واحد، واحتفظ بنسخة من كل البرومبتات.","Final reel":"الريل النهائي","Join clips into one reel":"ادمج المقاطع بريل واحد","Join again":"ادمج من جديد","Joining…":"عم يدمج…","Joining clips in Magnific…":"عم يدمج المقاطع بـ Magnific…","Build in Magnific Space":"ابنيه بـ Magnific Space","Update the Space":"حدّث الـ Space","Open Space":"افتح الـ Space","Building…":"عم يبني…","Production bible":"ملف الإنتاج","The idea, script, cast, locations and every image and Seedance prompt in one document.":"الفكرة والسكريبت والشخصيات والأماكن وكل البرومبتات بملف واحد.","Copy all prompts":"انسخ كل البرومبتات","Copied":"انتسخ","Other sizes":"مقاسات ثانية","Makes a copy of this reel in another format. Cast, places, script and voices come along; the scenes are generated again in the new size.":"بيعمل نسخة من الريل بمقاس ثاني. الشخصيات والأماكن والسكريبت والأصوات بتيجي معه، والمشاهد بتتولّد من جديد بالمقاس الجديد.","Generate at least the cast and locations first.":"ولّد الشخصيات والأماكن أول.",
"Characters":"الشخصيات","Props":"الأغراض","Places":"الأماكن","Character":"شخصية","Location":"مكان","Prop":"غرض","No image yet":"ما في صورة لسا","Original quality":"الجودة الأصلية","Draft 480p":"تجربة 480p","Magnific Space":"Magnific Space","Download MP4":"نزّل MP4","Working…":"عم يشتغل…","Claude is writing…":"عم يكتب…"
};
const UX_AR_RE=[
[/^Scene (\d+)$/,m=>`مشهد ${m[1]}`],[/^Idea (\d+)$/,m=>`فكرة ${m[1]}`],[/^Idea (\d+) · chosen$/,m=>`فكرة ${m[1]} · المختارة`],
[/^(\d+) s$/,m=>`${m[1]} ثانية`],[/^Open scene (\d+)$/,m=>`افتح مشهد ${m[1]}`],
[/^Generate the missing images \((\d+)\)$/,m=>`ولّد الصور الناقصة (${m[1]})`],[/^Download all \((\d+)\)$/,m=>`نزّل الكل (${m[1]})`],
[/^(\d+)\/(\d+) scenes filmed$/,m=>`${m[1]} من ${m[2]} مشاهد جاهزة`],[/^(✓ )?(\d+)\/8 checks$/,m=>`${m[1]||""}${m[2]}/8 فحوصات`],
[/^(\d+) ideas? from your assistant directors$/,m=>`${m[1]} أفكار من المساعدين`],
[/^(\d+) lines? · (\d+) voices? attached$/,m=>`${m[1]} جمل · ${m[2]} أصوات مربوطة`],
[/^≈ ([\d,]+) credits$/,m=>`≈ ${m[1]} credit`],[/^Ready in (.+?)\.?$/,m=>`جاهز خلال ${m[1]}`],
[/^Generate the other (\d+) · Seedream 5\.5$/,m=>`ولّد الباقي (${m[1]}) · Seedream 5.5`],
[/^Ask Claude to change (.+)$/,m=>`اطلب تعديل على ${m[1]}`],[/^Confirm · (.+)$/,m=>`أكّد · ${m[1]}`],
[/^(\d+) characters?$/,m=>`${m[1]} شخصيات`],[/^Earlier ideas \((\d+)\)$/,m=>`أفكار سابقة (${m[1]})`],
[/^Edited (.+)$/,m=>`آخر تعديل ${m[1]}`]
];
/*END*/
const UX={lang:"en",level:"simple",dict:null,costV:new Map(),costP:new Map(),autoN:0};
try{ UX.lang=localStorage.getItem("bae_ui_lang2")||"en"; UX.level=localStorage.getItem("bae_ui_level")||"simple"; }catch{}
const UX_GROUPS=[["story","Story",["idea","script"]],["images","Images",["characters","locations"]],["scenes","Scenes",["directing"]],["video","Video",["render"]]];
const UX_SUB={idea:"Idea",script:"Script",characters:"Cast",locations:"Places & props"};
function uxApply(){
  const R=$("reels"); if(!R) return; R.dataset.level=UX.level; R.dataset.ui=UX.lang; R.dir=UX.lang==="ar"?"rtl":"ltr"; R.lang=UX.lang;
  document.querySelectorAll("[data-uxlevel]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.uxlevel===UX.level)));
  const sel=$("uxLang"); if(sel) sel.value=UX.lang;
  uxT(R);
}
/* ---------- Arabic interface: every label is translated after it is drawn; the source stays English ---------- */
const UX_ORIG=new WeakMap();
const UX_SKIP=".rl-m,.rl-fmt,textarea,.rl-prompt,[data-noi18n],.rl-vsaw,.rl-memc,script,style,.rl-titlein,video";
function uxTr(s){
  const k=s.replace(/\s+/g," ").trim(); if(!k) return null;
  const hit=UX_AR[k]; if(hit!=null) return s.replace(k,hit);
  for(const [re,fn] of UX_AR_RE){ const m=k.match(re); if(m) return fn(m); }
  return null;
}
function uxT(root){
  if(!root) return; const ar=UX.lang==="ar";
  const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); const nodes=[]; let n; while((n=tw.nextNode())) nodes.push(n);
  for(const t of nodes){ const p=t.parentElement; if(!p||p.closest(UX_SKIP)) continue;
    if(ar){ const src=UX_ORIG.get(t)?.en??t.nodeValue; const o=UX_ORIG.get(t); if(o&&o.ar===t.nodeValue) continue; const tr=uxTr(src); if(tr!=null&&tr!==t.nodeValue){ UX_ORIG.set(t,{en:src,ar:tr}); t.nodeValue=tr; } }
    else { const o=UX_ORIG.get(t); if(o&&o.ar===t.nodeValue){ t.nodeValue=o.en; } } }
  for(const el of root.querySelectorAll?.("[placeholder],[aria-label],[title]")||[]){ if(el.closest("[data-noi18n]")) continue;
    for(const a of ["placeholder","aria-label","title"]){ const v=el.getAttribute(a); if(!v) continue; const key="ux_"+a.replace("-","_");
      if(ar){ if(el.dataset[key+"Ar"]===v) continue; const tr=uxTr(v); if(tr!=null){ el.dataset[key]=v; el.dataset[key+"Ar"]=tr; el.setAttribute(a,tr); } }
      else if(el.dataset[key]&&el.dataset[key+"Ar"]===v) el.setAttribute(a,el.dataset[key]); } }
}
let uxObsT=0;
function uxObserve(){ const R=$("reels"); if(!R||!window.MutationObserver) return;
  new MutationObserver(()=>{ if(UX.lang!=="ar"||uxObsT) return; uxObsT=requestAnimationFrame(()=>{ uxObsT=0; uxT(R); const a=document.querySelector(".ux-anim"); if(a) uxT(a); }); }).observe(R,{childList:true,subtree:true,characterData:true}); }
const uxL=s=>UX.lang==="ar"?(uxTr(s)??s):s;

/* ---------- 4 steps instead of 6 tabs ---------- */
function rlRenderNav(){
  const done=k=>({idea:!!RL.picked,script:!!RL.script?.scenes?.length,characters:RL.characters.length>0&&RL.characters.every(e=>e.id),locations:RL.locations.length>0&&RL.locations.every(e=>e.id),directing:RL.scenes.length>0&&RL.scenes.every(s=>s.status==="done"),render:!!RL.space?.url||!!RL.final?.id})[k];
  const N=$("rlStages"); N.classList.add("ux4");
  const gi=Math.max(0,UX_GROUPS.findIndex(g=>g[2].includes(RL.view))), cur=UX_GROUPS[gi];
  N.innerHTML=UX_GROUPS.map(([k,l,subs],i)=>{ const target=subs.includes(RL.view)?RL.view:(subs.find(x=>!done(x))||subs[subs.length-1]);
    return `<button type="button" role="tab" aria-selected="${i===gi}" data-tab="${target}" data-g="${k}" class="${subs.every(done)?"done":""}"><span class="bar" aria-hidden="true"></span><span class="lb">${l}</span></button>`; }).join("")
    +(cur[2].length>1?`<div class="ux-sub">${cur[2].map(k=>`<button type="button" role="tab" aria-selected="${RL.view===k}" data-tab="${k}">${UX_SUB[k]}</button>`).join("")}</div>`:"");
}

/* ---------- the one big button: what happens next ---------- */
function uxNextStep(){
  if(!RL||!RL.chat.length) return null;
  const ar=rlAr()||UX.lang==="ar", ix=rlStageIx(RL.stage), miss=l=>l.filter(x=>!x.id&&!x.fromLib&&x.prompt), work=l=>l.some(x=>["run","queued","write"].includes(x.status));
  if(rlBusy) return {label:"The Director is working…",busy:true};
  if(!RL.picked) return RL.ideas.length?{label:"Choose an idea",view:"idea",pick:true}:null;
  if(!RL.script?.scenes?.length) return {label:"Write the script",raw:ar?"اكتبلي السيناريو للفكرة المختارة.":"Write the script for the chosen idea.",free:true};
  if(ix<=rlStageIx("script")) return {label:"Script is good · prepare the images",say:"approveScript",free:true};
  for(const [stage,list,code,say,okLabel] of [["characters",RL.characters,"c","approveCast","Cast is good · places and props next"],["locations",RL.locations,"l","approveLoc","Places are good · write the scenes"]]){
    if(ix>rlStageIx(stage)) continue;
    if(work(list)) return {label:"Preparing the images…",busy:true};
    const m=miss(list); if(m.length) return {label:`Generate the missing images (${m.length})`,gen:code,cost:{k:"image",n:m.length}};
    if(list.some(x=>!x.id&&!x.fromLib)) return {label:"Open the images",view:stage};
    if(stage==="characters"&&list.some(x=>x.id&&x.stage==="portrait")) return {label:"Choose the portraits · make the character sheets",view:"characters"};
    return list.length?{label:okLabel,say,free:true}:null; }
  if(RL.stage==="directing"){ if(!RL.scenes.length) return null;
    const sc=RL.scenes.find(s=>s.status!=="done"); if(!sc) return {label:"All scenes are filmed · deliver",view:"render"};
    const nx=rlShotNext(sc); return nx.busy?{label:nx.label,busy:true}:{label:`Open scene ${sc.n}`,view:"directing",scroll:"rlShot"+sc.n}; }
  return null;
}
function uxRenderNext(){
  const el=$("uxNext"); if(!el||!RL) return; const st=uxNextStep();
  el.innerHTML=st?`<button type="button" class="go" data-ux="next" ${st.busy?"disabled":""}><span>${esc(st.label)}</span>${st.cost?`<span class="cost" data-uxcost='${JSON.stringify(st.cost)}'></span>`:""}</button>
    <div class="row"><label class="ux-auto"><input type="checkbox" id="uxAuto" ${RL.auto?"checked":""}><span>Keep going on your own</span></label><span>${RL.auto?"Stops before anything that costs credits":""}</span></div>`:"";
  uxCostFill(el);
}
function uxSay(k){ const t=RL_SAY[k], ar=rlAr()||UX.lang==="ar";
  if(k==="approveScript") brSignal("script","approved",1,{item:(RL.script?.scenes||[]).map(s=>`${s.title}: ${s.action}`).join(" / "),key:"script"});
  if(k==="approveCast") brSignal("character","approved",1,{item:RL.characters.map(e=>`${e.name}: ${e.description||""}`).join(" | "),key:"cast"});
  if(k==="approveLoc") brSignal("location","approved",1,{item:RL.locations.map(e=>`${e.name}: ${e.description||""}`).join(" | "),key:"loc"});
  rlSend(t?t[ar?1:0]:k); }
function uxDoNext(st,auto){
  if(!st||st.busy) return false;
  if(st.say){ uxSay(st.say); return true; }
  if(st.raw){ rlSend(st.raw); return true; }
  if(auto){ if(st.pick&&RL.ideas.length){ const ar=rlAr()||UX.lang==="ar", x=RL.ideas[0]; rlSend(ar?`اخترت الفكرة 1: ${x.title||""}. اكتبلي السيناريو.`:`I choose idea 1: ${x.title||""}. Write the script.`); return true; } return false; }
  if(st.gen){ (st.gen==="c"?RL.characters:RL.locations).filter(x=>!x.id&&!x.fromLib&&x.prompt).forEach(x=>rlGenElement(x.tag)); RL.view=st.gen==="c"?"characters":"locations"; }
  if(st.view) RL.view=st.view;
  $("reels").dataset.view="board"; document.querySelectorAll("[data-rlview]").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.rlview==="board")));
  rlSave(); rlRender(); if(st.scroll) setTimeout(()=>$(st.scroll)?.scrollIntoView({block:"start",behavior:"smooth"}),60);
  return true;
}
/* autopilot: after each answer, take the next step by itself while it is free; anything that spends credits waits for the user */
function uxAutoStep(){
  if(!RL||!RL.auto||rlBusy) return; const last=RL.chat[RL.chat.length-1]; if(!last||last.err||RL.chatPending) return;
  if(++UX.autoN>10){ RL.auto=false; uxRenderNext(); return; }
  const st=uxNextStep(); if(!st||!(st.free||st.pick)) return;
  uxDoNext(st,true);
}

/* ---------- prices before spending ---------- */
async function uxCostArgs(c){
  const set=rlSet();
  if(c.k==="video"){ const sc=RL.scenes.find(x=>+x.n===+c.s); const m=await rlModel().catch(()=>null); if(!m?.id) return null;
    return ["video_generate",{slug:m.id,prompt:"x",duration:Math.max(4,Math.min(120,+sc?.duration_s||8)),aspectRatio:set.aspect,resolution:set.res==="draft"?"Draft":/^4k$/i.test(set.res)?"4K":set.res}]; }
  if(c.k==="image"){ const id=S.models?.nano?.id; return ["images_generate",{...(id?{mode:id}:{}),resolution:"2K",count:1,aspectRatio:set.aspect}]; }
  if(c.k==="speak") return ["video_speak",{durationSeconds:+c.d||8,videoUrl:c.v}];
  return null;
}
async function uxCost(c){
  const key=JSON.stringify(c)+"|"+JSON.stringify(rlSet()); if(UX.costV.has(key)) return UX.costV.get(key);
  if(!UX.costP.has(key)) UX.costP.set(key,(async()=>{ try{ if(!S.connected) return null; const a=await uxCostArgs(c); if(!a) return null;
    const r=await callMag("simulate_cost",{tool:a[0],arguments:a[1]}); let o=r?.payload; if(typeof o==="string"){ try{ o=JSON.parse(o); }catch{} }
    const v=o&&typeof o.credits==="number"?{credits:o.credits*(+c.n||1),unlimited:!!o.isUnlimited}:null; if(v) UX.costV.set(key,v); else UX.costP.delete(key); return v; }catch{ UX.costP.delete(key); return null; } })());
  return UX.costP.get(key);
}
const uxCostText=v=>v?(v.unlimited?"Unlimited plan":`≈ ${Math.round(v.credits).toLocaleString("en")} credits`):"";
function uxCostFill(root){ if(!root||!RL) return; root.querySelectorAll("[data-uxcost]").forEach(el=>{ let c; try{ c=JSON.parse(el.dataset.uxcost); }catch{ return; }
  const key=JSON.stringify(c)+"|"+JSON.stringify(rlSet()); if(UX.costV.has(key)){ el.textContent=uxCostText(UX.costV.get(key)); return; }
  uxCost(c).then(v=>{ if(v&&el.isConnected) el.textContent=uxCostText(v); }); }); }

/* ---------- speak instead of typing ---------- */
async function uxMicInit(){
  const btn=$("uxMic"), inp=$("rlInput"); if(!btn||!inp) return;
  let d=null; try{ d=await window.claude?.use?.("dictation"); }catch{} if(!d) return;
  btn.hidden=false; let base="";
  d.onPartial?.(({text})=>{ if(S.mic!=="rl") return; inp.value=base+(text||""); inp.dispatchEvent(new Event("input",{bubbles:true})); });
  d.onFinal?.(({text})=>{ if(S.mic!=="rl") return; base=(base+(text||"")).trim()+" "; inp.value=base; inp.dispatchEvent(new Event("input",{bubbles:true})); });
  d.onState?.(({state})=>{ if(S.mic==="rl") btn.setAttribute("aria-pressed",String(state==="listening")); });
  btn.onclick=()=>{ if(btn.getAttribute("aria-pressed")==="true"){ d.stop().catch(()=>{}); return; } S.mic="rl";
    base=inp.value.trim()?inp.value.trim()+" ":""; d.start().catch(e=>{ btn.setAttribute("aria-pressed","false"); if(e?.code==="not_granted") btn.hidden=true; }); };
}

/* the Brief box (Photography and Icons): speak it instead of typing. Shares the one dictation with Reels and the Art Director
   (S.mic says which box is listening); the words are added after what is already written. */
async function briefMicInit(){
  const btn=$("briefMic"); if(!btn) return;
  let d=null; try{ d=await window.claude?.use?.("dictation"); }catch{} if(!d) return;
  btn.hidden=false; let base="";
  const put=t=>{ const inp=$("brief"); if(!inp) return; inp.value=t; inp.dispatchEvent(new Event("input",{bubbles:true})); };
  d.onPartial?.(({text})=>{ if(S.mic==="brief") put(base+(text||"")); });
  d.onFinal?.(({text})=>{ if(S.mic!=="brief") return; base=(base+(text||"")).trim()+" "; put(base); });
  d.onState?.(({state})=>{ if(S.mic==="brief") btn.setAttribute("aria-pressed",String(state==="listening")); });
  btn.onclick=()=>{ if(btn.getAttribute("aria-pressed")==="true"){ d.stop().catch(()=>{}); return; } S.mic="brief";
    const v=String($("brief")?.value||"").trim(); base=v?v+" ":""; d.start().catch(e=>{ btn.setAttribute("aria-pressed","false"); if(e?.code==="not_granted") btn.hidden=true; }); };
}

/* ---------- ready-made starts ---------- */
const UX_TPL=[
  ["Product ad","Introduce one product and its main benefit",["I need a 30 second reel that introduces a product: [product name]. Main benefit: [benefit]. Audience: [who].","بدي ريل 30 ثانية يعرّف بمنتج: [اسم المنتج]. الفايدة الأساسية: [الفايدة]. الجمهور: [مين]."]],
  ["Offer or campaign","A limited offer people should act on",["I need a reel for an offer: [the offer]. It ends on [date]. What people should do: [action].","بدي ريل عن عرض: [العرض]. بينتهي بتاريخ [التاريخ]. المطلوب من الناس: [شو يعملوا]."]],
  ["Comedy situation","A relatable Jordanian moment, product as the hero",["I need a funny Jordanian everyday situation where [product] solves the problem. Tone: light, family friendly.","بدي موقف كوميدي أردني من الحياة اليومية، و[المنتج] هو اللي بحل المشكلة. الأسلوب خفيف ومناسب للعيلة."]],
  ["Occasion","Ramadan, Eid, Mother's Day, national days",["I need a reel for [occasion] from Bank al Etihad. Feeling: [warm / proud / playful]. Product or message: [optional].","بدي ريل لمناسبة [المناسبة] من بنك الاتحاد. الإحساس: [دافي / فخر / مرح]. المنتج أو الرسالة: [اختياري]."]]];
function uxHelloHTML(){ return `<div class="ux-hello"><h3>What are we filming today?</h3><p>Tell me the idea in your own words, or drop your images. I take it from there, step by step.</p>
  <div><p class="t12 muted" style="margin-bottom:8px">Or start from a ready-made template</p><div class="ux-tpl">${UX_TPL.map((t,i)=>`<button type="button" data-ux="tpl" data-i="${i}">${t[0]}<span>${t[1]}</span></button>`).join("")}</div></div></div>`; }

/* ---------- free preview: storyboard frames + voices on the real timing, before any video credit is spent ---------- */
let UX_GET=null;
async function uxAudioUrl(a){
  if(!a) return null; if(a.url) return a.url; if(/^https?:/i.test(String(a.id))) return a.id;
  try{ if(!S.connected) await connect(true);
    if(!UX_GET){ try{ UX_GET=(await buildArgs("creations_get","Get this one creation's details by its identifier.",{identifier:"__ID__"},"quick")).args; }catch{ UX_GET={identifier:"__ID__"}; } }
    const r=await callMag("creations_get",replaceDeep(UX_GET,"__ID__",a.id)); const rr=readResult(r); const all=[...(rr.urls||[]),...(rr.links||[])];
    a.url=all.find(u=>/\.(mp3|wav|m4a|ogg|aac|flac)(\?|#|$)/i.test(u))||all.find(u=>/audio|tts|voice/i.test(u)&&!/magnific\.com\/app\//i.test(u))||null; return a.url; }catch{ return null; }
}
const uxSecs=t=>{ const m=String(t||"").match(/(\d+(?:\.\d+)?)(?::(\d{1,2}))?/); if(!m) return null; return m[2]!=null?+m[1]*60+ +m[2]:+m[1]; };
function uxTimeline(){
  const beats=(RL.script?.scenes||[]), total=+RL.script?.duration_s||rlSet().length||30; const F=[];
  beats.forEach((s,i)=>{ const parts=String(s.time||"").split(/[-–—]/); let a=uxSecs(parts[0]), b=uxSecs(parts[1]);
    if(a==null||b==null||b<=a){ a=i*total/beats.length; b=(i+1)*total/beats.length; }
    F.push({a,b,sheet:!!s.board?.sheet,img:s.board?.id?rlTGet(s.board.id):null,id:s.board?.id||null,title:s.title||"",text:(s.dialogue||[]).map(d=>d.line).filter(Boolean).join(" · ")||s.on_screen_text||s.action||""}); });
  if(!F.length){ let t=0; for(const sc of RL.scenes){ const d=+sc.duration_s||8; F.push({a:t,b:t+d,img:rlTGet(sc.frame?.id)||rlTGet(sc.clip)||null,title:sc.title||"",text:sc.logline||""}); t+=d; } }
  const V=[]; let off=0; for(const sc of RL.scenes){ for(const d of sc.dialogue||[]) if(d.audio?.id){ const st=uxSecs(String(d.at||"").split(/[-–—]/)[0]); V.push({t:off+(st??0),a:d.audio,line:d.line}); } off+=+sc.duration_s||8; }
  const end=Math.max(F.length?F[F.length-1].b:0,off,1); return {F,V,end};
}
async function uxAnimatic(){
  if(!RL) return; document.querySelector(".ux-anim")?.remove();
  const T=uxTimeline(); if(!T.F.length){ return; }
  T.F.forEach(f=>{ if(f.id&&!f.img) rlNeed(f.id); });
  const wide=T.F.some(f=>f.sheet), ar=wide?"16/9":rlSet().aspect.replace(":","/");
  const box=document.createElement("div"); box.className="ux-anim"; box.setAttribute("role","dialog"); box.setAttribute("aria-label","Free preview"); box.dir=$("reels").dir;
  box.innerHTML=`<div class="stage${wide?" wide":""}" style="aspect-ratio:${ar}"><div class="ph"></div><div class="cap" data-noi18n dir="auto"></div></div><div class="bar"><i></i></div>
    <div class="ctl"><button type="button" class="p" data-a="play">Play</button><button type="button" data-a="close">Close</button></div>
    <p class="t12"><span>${T.V.length?"Free preview: storyboard frames with your generated voices on the real timing.":"Free preview: storyboard frames on the real timing. Generate voices to hear the dialogue too."}</span> <span>No credits are spent.</span></p>`;
  document.body.appendChild(box); uxT(box);
  const stage=box.querySelector(".stage"), ph=stage.querySelector(".ph"), cap=stage.querySelector(".cap"), bar=box.querySelector(".bar i"), pb=box.querySelector('[data-a="play"]');
  let t=0, playing=false, last=0, raf=0, curF=-1; const players=new Map(); const fired=new Set();
  Promise.all(T.V.map(async v=>{ const u=await uxAudioUrl(v.a); if(u){ const au=new Audio(u); au.preload="auto"; players.set(v,au); } }));
  const show=()=>{ const i=T.F.findIndex(f=>t>=f.a&&t<f.b), f=T.F[i<0?T.F.length-1:i]; if(i!==curF){ curF=i; const img=f.img||(f.id?rlTGet(f.id):null);
      stage.querySelector("img")?.remove(); if(img){ const im=new Image(); im.src=img; im.alt=""; stage.insertBefore(im,cap); ph.textContent=""; } else ph.textContent=f.title||""; cap.textContent=f.text||""; }
    bar.style.width=Math.min(100,t/T.end*100)+"%"; };
  const stopAll=()=>players.forEach(a=>{ try{ a.pause(); }catch{} });
  const tick=now=>{ if(!playing) return; t+=(now-last)/1000; last=now;
    for(const v of T.V) if(!fired.has(v)&&t>=v.t){ fired.add(v); const a=players.get(v); if(a){ try{ a.currentTime=0; a.play().catch(()=>{}); }catch{} } }
    if(t>=T.end){ playing=false; t=T.end; show(); pb.textContent=uxL("Play again"); return; }
    show(); raf=requestAnimationFrame(tick); };
  const play=()=>{ if(t>=T.end){ t=0; fired.clear(); curF=-1; } playing=true; last=performance.now(); pb.textContent=uxL("Pause"); raf=requestAnimationFrame(tick); };
  const pause=()=>{ playing=false; cancelAnimationFrame(raf); stopAll(); pb.textContent=uxL("Play"); };
  const close=()=>{ pause(); box.remove(); document.removeEventListener("keydown",onKey); };
  const onKey=e=>{ if(e.key==="Escape") close(); };
  document.addEventListener("keydown",onKey);
  box.addEventListener("click",e=>{ const b=e.target.closest("[data-a]"); if(!b){ if(e.target===box) close(); return; } if(b.dataset.a==="close") close(); else playing?pause():play(); });
  show(); pb.focus();
}

/* ---------- exact voice with lip-sync (beta): builds one dialogue track on the scene's timing, then Magnific fits the lips to it ---------- */
function uxWav(buf){ const n=buf.length, ch=buf.numberOfChannels, sr=buf.sampleRate, out=new DataView(new ArrayBuffer(44+n*ch*2)); const w=(o,s)=>{ for(let i=0;i<s.length;i++) out.setUint8(o+i,s.charCodeAt(i)); };
  w(0,"RIFF"); out.setUint32(4,36+n*ch*2,true); w(8,"WAVEfmt "); out.setUint32(16,16,true); out.setUint16(20,1,true); out.setUint16(22,ch,true); out.setUint32(24,sr,true); out.setUint32(28,sr*ch*2,true); out.setUint16(32,ch*2,true); out.setUint16(34,16,true); w(36,"data"); out.setUint32(40,n*ch*2,true);
  const C=[...Array(ch)].map((_,c)=>buf.getChannelData(c)); let o=44; for(let i=0;i<n;i++) for(let c=0;c<ch;c++){ const v=Math.max(-1,Math.min(1,C[c][i])); out.setInt16(o,v<0?v*0x8000:v*0x7fff,true); o+=2; }
  return new Blob([out.buffer],{type:"audio/wav"}); }
async function uxDialogueTrack(sc){
  const L=(sc.dialogue||[]).filter(d=>d.audio?.id); if(!L.length) throw {message:"Generate the voices first."};
  if(L.length===1&&!(uxSecs(String(L[0].at||"").split(/[-–—]/)[0])>0.3)) return L[0].audio.id; /* one line from the start: the clip itself */
  const dur=Math.max(4,+sc.duration_s||8), sr=44100, ctx=new OfflineAudioContext(1,Math.ceil(dur*sr),sr);
  for(const d of L){ const u=await uxAudioUrl(d.audio); if(!u) throw {message:"Couldn't read a voice clip from Magnific."};
    const ab=await (await fetch(u)).arrayBuffer(); const b=await ctx.decodeAudioData(ab); const s=ctx.createBufferSource(); s.buffer=b; s.connect(ctx.destination); s.start(Math.max(0,Math.min(dur-0.2,uxSecs(String(d.at||"").split(/[-–—]/)[0])||0))); }
  const wav=uxWav(await ctx.startRendering()); return await rlHostFile(new File([wav],`scene${sc.n}_dialogue.wav`,{type:"audio/wav"}),"audio/wav",`scene${sc.n}_dialogue.wav`);
}
async function uxSpeak(n,btn){
  const sc=RL.scenes.find(x=>+x.n===+n); if(!sc||!sc.clip||sc._speaking) return;
  if(btn&&btn.dataset.armed!=="1"){ btn.dataset.armed="1"; const v=await uxCost({k:"speak",d:+sc.duration_s||8,v:sc.clip}); btn.textContent=`${uxL("Confirm")}${v?` · ${uxCostText(v)}`:""}`; return; }
  sc._speaking=true; sc.note="Building the dialogue track…"; rlBoard();
  try{ if(!S.connected) await connect(true);
    const audio=await uxDialogueTrack(sc); sc.note="Fitting the voice and the lips in Magnific… a few minutes."; rlBoard();
    const r=await callMag("video_speak",{videoUrl:sc.clip,audioUrl:audio}); let rr=readResult(r); if(!rr.ids.length) rr=await extractWithClaude(r,"the creation identifier of the video being generated");
    const id=rr.ids[0]; if(!id) throw {message:"Magnific returned no video."};
    if(!DONE.test(rr.status)) rr=await waitFor([id],"lip-sync video",30,true);
    sc.clipOrig=sc.clipOrig||{clip:sc.clip,url:sc.url||null,web:sc.web||null}; delete sc._src; await rlFinishVideo(sc,rr,id);
    sc.note="The exact voices are now on the video. The original is kept — press “Back to the original video” to return."; rlEvent(`Scene ${sc.n}: the generated voices were fitted to the video with lip-sync.`);
  }catch(e){ sc.note=`Lip-sync didn't run: ${String(e?.message||e?.code||e).slice(0,240)} Nothing was changed.`; }
  finally{ delete sc._speaking; rlSave(); rlBoard(); }
}
function uxSpeakHTML(sc){
  if(sc.status!=="done"||!sc.clip||!(sc.dialogue||[]).some(d=>d.audio?.id)) return "";
  return `<div class="rl-btns ux-keep" style="margin-top:8px"><button class="btn small" type="button" data-ux="speak" data-n="${sc.n}" ${sc._speaking?"disabled":""}>${sc._speaking?"Fitting the voice…":"Fit the exact voices · lip-sync (beta)"}</button>${sc.clipOrig?`<button class="btn small" type="button" data-ux="unspeak" data-n="${sc.n}">Back to the original video</button>`:""}</div>${sc._speaking||/lip|voices are now/i.test(sc.note||"")?`<p class="rl-status ux-keep">${esc(sc.note||"")}</p>`:`<p class="t12 muted ux-keep" style="margin:6px 0 0">Replaces the video's sound with your generated voices and matches the lips. Background sound from Seedance is not kept.</p>`}`;
}

/* ---------- other sizes: a copy of the reel in another format, same cast, places, script and voices ---------- */
async function uxResize(aspect){
  if(!RL) return; await rlFlush(); const old=rlSet().aspect; const c=rlClean(RL); c.id=rlNew().id; c.title=`${RL.title||"Reel"} · ${aspect}`; c.createdAt=c.updatedAt=Date.now(); c.space=null; c.final=null;
  c.settings={...c.settings,aspect}; const sw=s=>typeof s==="string"?s.split(old).join(aspect).replace(/\bvertical\b/gi,aspect==="16:9"?"widescreen":aspect==="1:1"?"square":"vertical"):s;
  c.look=sw(c.look);
  for(const s of c.scenes||[]){ s.prompt=sw(s.prompt); s.frame_prompt=sw(s.frame_prompt); for(const k of ["clip","url","web","review","reviewErr","lastCall","pending","pendingAt","frame","map","clipOrig"]) delete s[k]; s.status=null; s.note=null; s.stale=false; if(s.check) s.check.dirty=true; }
  for(const b of c.script?.scenes||[]) delete b.board;
  c.events=[]; c.chat=[...(c.chat||[]),{role:"sys",text:`Copy of this reel in ${aspect}. Cast, places, script, dialogue and voices are kept; scenes need to be generated again in the new format.`}];
  const keep=RL; RL=c; await rlFlush(); RL=keep; await rlOpen(c.id);
}
function uxSizesHTML(){ const cur=rlSet().aspect; return `<section class="rl-card" style="padding:16px"><b>Other sizes</b><p class="muted" style="margin:6px 0 12px">Makes a copy of this reel in another format. Cast, places, script and voices come along; the scenes are generated again in the new size.</p><div class="rl-btns">${["9:16","1:1","4:5","16:9"].filter(a=>a!==cur).map(a=>`<button class="btn small" type="button" data-ux="resize" data-a="${a}">${a}</button>`).join("")}</div></section>`; }

/* ---------- Prompt Generator: a ready prompt only, for a character, a place or a prop ---------- */
const UXPG={kind:"character",gender:"",age:"",busy:false,out:null,err:null,text:"",file:null,fileUrl:"",gen:null,genBusy:"",saveName:""};
async function uxPGSheetRun(){
  if(!UXPG.file) throw {message:"Choose the photo first."};
  const small=await toJpeg(UXPG.file,1400);
  const o=await rlAsk(`Look at this photo of ONE person. It will be turned into a three-panel character sheet, so describe exactly what is visible, nothing invented.
Reply with only JSON: {"title":"a short English label, e.g. 'Man, 30s, leather jacket'","person":"one sentence: man / woman / boy / girl, approximate age, face shape, skin tone, eyes, eyebrows, hair (colour, length, how it falls), facial hair, build","wardrobe":"every visible garment with colour, fabric and fit, top to bottom; jewellery or watch if visible","note":"one short sentence in the user's language saying what you saw"}
${UXPG.text?`The user adds: ${UXPG.text}`:""}`,{images:[small],modelTier:"default",cache:false});
  if(!o?.person) throw {code:"invalid_json"};
  return {title:o.title||"Character sheet",note:o.note||"",prompt:rlSheetPrompt2({name:"",description:o.person,wardrobe:o.wardrobe||""}),fromPhoto:true};
}
/* make the sheet right here: the photo goes to Magnific as the identity reference, Seedream draws the three panels */
async function uxPGSheetMake(){
  if(!UXPG.out?.prompt||!UXPG.file||UXPG.genBusy) return; UXPG.err=null;
  try{ UXPG.genBusy="Sending your photo to Magnific…"; uxPGDraw(); if(!S.connected) await connect(true);
    const of=!!UXPG.out.outfit; const up=await rlUploadMag(UXPG.file,of?"outfit-photo":"character-photo"); if(!up?.id) throw {message:"Magnific returned no identifier for the photo."};
    UXPG.genBusy=`Seedream 5.5 is drawing the ${of?"outfit":"character"} sheet · 2K…`; uxPGDraw();
    const out=await rlImage({prompt:UXPG.out.prompt,aspect:"16:9",refs:[{id:up.id,tag:of?"@outfit":"@character",name:of?"the outfit photo":"the character"}],label:of?"outfit sheet":"character sheet"});
    const blob=await rlFullImage(out.id).catch(()=>null); UXPG.gen={id:out.id,web:out.web||null,blob,url:blob?URL.createObjectURL(blob):rlTGet(out.id)||""}; }
  catch(e){ UXPG.err=mcpCopy(e); }
  UXPG.genBusy=""; if(document.querySelector(".ux-pg")) uxPGDraw();
}
/* outfit sheet: Claude lists every piece the person wears; the prompt lays them out flat on plain light grey, no person */
async function uxPGOutfitRun(){
  if(!UXPG.file) throw {message:"Choose the photo first."};
  const small=await toJpeg(UXPG.file,1400);
  const o=await rlAsk(`Look at this photo of a person wearing an outfit. List ONLY the clothes and accessories that are visible, nothing invented, nothing about the person's face or body.
For each piece give the exact colour (a precise colour word, e.g. "stone beige", "dark chocolate brown"), fabric and texture, cut and fit, length, and the details that make it recognisable (collar, lapels, buttons, pleats, pockets, hem, sole, hardware). Describe a piece that is partly hidden as the whole garment it clearly is. Never name a brand and never describe a logo or printed text: say "unbranded".
Order: outerwear, top, bottom, shoes, bag, belt, scarf, jewellery, other. 3 to 9 pieces.
${UXPG.text?`The user adds: ${UXPG.text}`:""}
Reply with only JSON: {"title":"a short English label, e.g. 'Beige trench, brown trousers'","items":[{"name":"Trench coat","detail":"…"}],"note":"one short sentence in the user's language saying what you saw"}`,{images:[small],modelTier:"default",cache:false});
  const items=(Array.isArray(o?.items)?o.items:[]).filter(x=>x?.name&&x?.detail).slice(0,9); if(!items.length) throw {code:"invalid_json"};
  const prompt=`Outfit sheet, one horizontal 16:9 landscape image: a clean flat-lay catalogue board of the complete outfit worn in the reference image. Every piece is shown separately as its own crisp cut-out product photo. NO person, no model, no mannequin, no body, no hands, no hanger.
BACKGROUND: one seamless, flat, matte, plain light grey (#E6E6E6) across the whole frame. No gradient, no texture, no floor line, no props, no frame.
THE PIECES — each shown exactly once, whole, front view, laid flat and smoothed, with the exact colour, fabric, cut and details of the reference image:
${items.map((x,i)=>`${i+1}. ${String(x.name).trim()}: ${String(x.detail).trim()}`).join("\n")}
LAYOUT: balanced editorial arrangement across the landscape frame. The two largest garments are the biggest and sit left and right of centre; the smaller pieces (shoes, bag, belt, scarf, jewellery) sit around them at believable relative scale. Even spacing, nothing overlapping, nothing cropped, generous margins on all four sides.
LIGHT AND FINISH: soft, even, shadowless studio light from above with only a faint soft contact shadow under each piece; true neutral colour, sharp fabric texture and stitching, high-end e-commerce catalogue quality, 2K.
All pieces are unbranded: no logos, no brand names, no labels, no tags, no printed text, no captions, no numbers, no watermark.`;
  return {title:o.title||"Outfit sheet",note:o.note||"",prompt,fromPhoto:true,outfit:true};
}
async function uxPGRun(){
  if(UXPG.kind==="outfit") return await uxPGOutfitRun();
  if(UXPG.kind==="sheet") return await uxPGSheetRun();
  const kind=UXPG.kind, who=kind==="character"?[UXPG.gender,UXPG.age].filter(Boolean).join(", "):"";
  const o=await rlAsk(`You write ONE image-generation prompt for Bank al Etihad (Jordan) productions, for Seedream 5.5 at 2K. The user only wants the prompt.
${kind==="character"?JO_PORTRAIT+"\n"+JO_FACE:kind==="prop"?"Write a PROP / PRODUCT sheet prompt. The prompt MUST follow this house template exactly, keeping every fixed sentence and replacing every [bracket] with specific detail:\n"+rlTpl("prop")+"\nPROPS: one object, exact material, colour, size and markings; any text on it spelled exactly; real brand logos only when the user names them.":"Write a LOCATION prompt (an empty establishing image of the place). The prompt MUST follow this house template, replacing every [bracket] with specific detail:\n"+rlTpl("loc")+"\n"+JO_PLACE+"\nFor an interior, keep the same world: stone or terrazzo floors, large windows with that clear light, contemporary furniture; say where the walls, doors, windows and main furniture are. No people in the image."}
${kind==="character"?"":RL_BAE}
USER REQUEST (any language; the prompt itself is in English): ${UXPG.text||"(nothing written — invent a good, typical one)"}
${who?`MUST BE: ${who}.`:""}
${kind==="character"?"Use exactly the outfit the user describes; if they describe none, choose ordinary modern casual clothes. ":""}Fill every choice the user left open with one specific, believable value. Never copy a real person's face.
Reply with only JSON: {"title":"a short English name for it","prompt":"the complete prompt, ready to paste","note":"one short sentence in the user's language saying what you chose"}`,{modelTier:"default",cache:false});
  if(o&&kind==="character") o.sheet=rlSheetPrompt2({name:"",description:"",wardrobe:""});
  return o;
}
function uxPGHTML(){
  const seg=(key,opts)=>`<div class="a-seg" role="group">${opts.map(([v,l])=>`<button type="button" data-pg="${key}" data-v="${v}" aria-pressed="${UXPG[key]===v}">${l}</button>`).join("")}</div>`;
  const ph=UXPG.kind==="outfit"?"e.g. leave out the coffee cup, add a brown belt":UXPG.kind==="sheet"?"e.g. keep the leather jacket, add white sneakers":UXPG.kind==="character"?"e.g. a bank employee in her thirties, friendly, navy blazer":UXPG.kind==="prop"?"e.g. an orange leather wallet with a small logo":"e.g. a modern living room in Amman, afternoon light";
  return `<div class="ux-pgbox" role="dialog" aria-label="Prompt Generator"><div class="hd"><b>Prompt Generator</b><button type="button" class="a-btn" data-pg="close">Close</button></div>
    <p class="muted">Describe what you need in your own words. You get a ready prompt to copy — nothing is generated and no credits are spent.</p>
    ${seg("kind",[["character","Character"],["sheet","Sheet from my photo"],["outfit","Outfit sheet from a photo"],["location","Place"],["prop","Prop"]])}
    ${UXPG.kind==="sheet"||UXPG.kind==="outfit"?`<label class="pg-photo pg-drop">${UXPG.fileUrl?`<img src="${UXPG.fileUrl}" alt="Your photo">`:""}<span class="tx"><b>${UXPG.file?"Drop another photo here, or click to change":"Drop the photo here, or click to choose"}</b><span class="t12 muted">You can also paste it. ${UXPG.kind==="outfit"?"Claude lists every piece the person wears and writes a 16:9 outfit sheet prompt: each piece laid flat on plain light grey, no person.":"Claude looks at it and writes the three-panel character sheet prompt for that exact person."}</span></span><input type="file" accept="image/*" class="sr" data-pgfile></label>`:""}
    ${UXPG.kind==="character"?`<div class="row">${seg("gender",[["","Any"],["man","Man"],["woman","Woman"]])}${seg("age",[["","Any age"],["child under 12","Child"],["teenager 13-17","Teen"],["young adult 18-35","Young"],["middle-aged 36-59","Middle-aged"],["elderly 60+","Elderly"]])}</div>`:""}
    <label class="lbl" for="uxPgText">${UXPG.kind==="sheet"||UXPG.kind==="outfit"?"Notes (optional)":"Description"}</label><textarea id="uxPgText" rows="3" dir="auto" placeholder="${ph}">${esc(UXPG.text)}</textarea>
    <div class="rl-btns"><button type="button" class="btn" data-pg="go" ${UXPG.busy?"disabled":""}>${UXPG.busy?"Writing the prompt…":UXPG.out?"Write another":"Write the prompt"}</button></div>
    ${UXPG.err?`<p class="rl-status err" role="alert">${esc(UXPG.err)}</p>`:""}
    ${UXPG.out?`<div class="res"><div class="hd"><b dir="auto" data-noi18n>${esc(UXPG.out.title||"Prompt")}</b><button type="button" class="btn small" data-pg="copy">Copy prompt</button></div>${UXPG.out.note?`<p class="t12 muted" dir="auto" data-noi18n>${esc(UXPG.out.note)}</p>`:""}${UXPG.out.sheet?`<b class="t12">1 · Portrait prompt</b>`:""}<pre class="rl-prompt" dir="ltr" data-noi18n>${esc(UXPG.out.prompt||"")}</pre>${UXPG.out.fromPhoto?`<p class="t12 muted">In Magnific: attach the same photo as the reference image, 16:9, then paste this prompt. Or let the studio do it:</p><div class="rl-btns"><button type="button" class="btn primary small" data-pg="make" ${UXPG.genBusy?"disabled":""}>${UXPG.genBusy?esc(UXPG.genBusy):UXPG.gen?"Make another sheet":"Make the sheet now"}</button><span class="ux-cost" data-uxcost='{"k":"image","n":1}'></span></div>${UXPG.gen?`<div class="pg-gen">${UXPG.gen.url?`<img src="${UXPG.gen.url}" alt="${UXPG.out.outfit?"Outfit sheet":"Character sheet"}">`:`<p class="t12 muted">The sheet is in your Magnific.</p>`}<div class="rl-btns">${UXPG.gen.blob?`<button type="button" class="btn small" data-pg="dlgen">Download</button>`:""}${UXPG.gen.web?`<a class="btn small" href="${esc(UXPG.gen.web)}" target="_blank" rel="noopener">Open in Magnific</a>`:""}${UXPG.gen.blob&&CL.canEdit&&!UXPG.out.outfit?`<input class="rl-field" id="uxPgName" dir="auto" placeholder="Name — e.g. Ali / علي" value="${esc(UXPG.saveName)}" aria-label="Character name"><button type="button" class="btn small" data-pg="savegen">Save to library</button>`:""}</div></div>`:""}`:""}${UXPG.out.sheet?`<div class="hd" style="margin-top:8px"><b class="t12">2 · Character sheet prompt — attach the portrait you chose as the reference image</b><button type="button" class="btn small" data-pg="copy2">Copy</button></div><pre class="rl-prompt" dir="ltr" data-noi18n id="uxPgSheet">${esc(UXPG.out.sheet)}</pre>`:""}</div>`:""}</div>`;
}
function uxPGDraw(){ let w=document.querySelector(".ux-pg"); if(!w){ w=document.createElement("div"); w.className="ux-pg"; $("reels").appendChild(w); uxPGWire(w); clLoad().catch(()=>{}); } const t=w.querySelector("#uxPgText"); if(t) UXPG.text=t.value; const nm=w.querySelector("#uxPgName"); if(nm) UXPG.saveName=nm.value; w.innerHTML=uxPGHTML(); uxT(w); uxCostFillAny(w); }
function uxCostFillAny(root){ root.querySelectorAll("[data-uxcost]").forEach(el=>{ let c; try{ c=JSON.parse(el.dataset.uxcost); }catch{ return; } uxCost(c).then(v=>{ if(v&&el.isConnected) el.textContent=uxCostText(v); }).catch(()=>{}); }); }
function uxPGWire(w){
  w.addEventListener("click",async e=>{ if(e.target===w){ w.remove(); return; } const b=e.target.closest("[data-pg]"); if(!b) return; const a=b.dataset.pg;
    if(a==="close"){ w.remove(); return; }
    if(a==="kind"||a==="gender"||a==="age"){ UXPG[a]=b.dataset.v; if(a==="kind"){ UXPG.out=null; UXPG.err=null; UXPG.gen=null; } uxPGDraw(); return; }
    if(a==="make"){ uxPGSheetMake(); return; }
    if(a==="dlgen"){ if(UXPG.gen?.blob) uxSaveBlob(UXPG.gen.blob,(UXPG.out?.outfit?"BAE outfit sheet ":"BAE character sheet ")+(UXPG.out?.title||"")).catch(()=>{}); return; }
    if(a==="savegen"){ const nm=(w.querySelector("#uxPgName")?.value||"").trim(); if(!nm){ w.querySelector("#uxPgName")?.focus(); return; } b.disabled=true; b.textContent="Saving…"; try{ await clLoad(); await clAdd(UXPG.gen.blob,nm,""); b.textContent="Saved to library ✓"; }catch(err){ b.disabled=false; b.textContent="Save to library"; UXPG.err="Couldn't save to the library: "+String(err?.message||err?.code||err).slice(0,140); uxPGDraw(); } return; }
    if(a==="copy2"){ try{ await navigator.clipboard.writeText(UXPG.out?.sheet||""); b.textContent="Copied ✓"; }catch{ b.textContent="Select the text and copy"; } return; }
    if(a==="copy"){ try{ await navigator.clipboard.writeText(UXPG.out?.prompt||""); b.textContent="Copied ✓"; }catch{ const pre=w.querySelector("pre"); const r=document.createRange(); r.selectNodeContents(pre); const sel=getSelection(); sel.removeAllRanges(); sel.addRange(r); b.textContent="Selected — press copy"; } return; }
    if(a==="go"&&!UXPG.busy){ UXPG.text=w.querySelector("#uxPgText")?.value.trim()||""; UXPG.busy=true; UXPG.err=null; uxPGDraw();
      try{ const o=await uxPGRun(); if(!o?.prompt) throw {code:"invalid_json"}; UXPG.out=o; UXPG.gen=null; }catch(err){ UXPG.err=err?.message&&!err.code?err.message:sampleCopy(err); }
      UXPG.busy=false; if(document.querySelector(".ux-pg")) uxPGDraw(); } });
  const setPhoto=f=>{ if(!f||!/^image\//.test(f.type)){ UXPG.err="That file isn't an image. Use JPEG, PNG or WebP."; uxPGDraw(); return; } if(UXPG.fileUrl) URL.revokeObjectURL(UXPG.fileUrl); UXPG.file=f; UXPG.fileUrl=URL.createObjectURL(f); if(UXPG.kind!=="outfit") UXPG.kind="sheet"; UXPG.out=null; UXPG.gen=null; UXPG.err=null; uxPGDraw(); };
  w.addEventListener("change",e=>{ const f=e.target.matches?.("[data-pgfile]")&&e.target.files?.[0]; if(f) setPhoto(f); });
  /* drop a photo anywhere on the window, or paste one */
  const hasFile=e=>[...(e.dataTransfer?.types||[])].includes("Files");
  w.addEventListener("dragover",e=>{ if(!hasFile(e)) return; e.preventDefault(); w.classList.add("drag"); });
  w.addEventListener("dragleave",e=>{ if(e.target===w||!w.contains(e.relatedTarget)) w.classList.remove("drag"); });
  w.addEventListener("drop",e=>{ if(!hasFile(e)) return; e.preventDefault(); w.classList.remove("drag"); setPhoto([...e.dataTransfer.files].find(f=>/^image\//.test(f.type))||e.dataTransfer.files[0]); });
  w.addEventListener("paste",e=>{ const f=[...(e.clipboardData?.files||[])].find(x=>/^image\//.test(x.type)); if(f){ e.preventDefault(); setPhoto(f); } });
  w.addEventListener("keydown",e=>{ if(e.key==="Escape") w.remove(); });
}
/* ---------- wiring ---------- */
function uxInit(){
  const R=$("reels"); if(!R) return;
  document.querySelectorAll("[data-uxlevel]").forEach(b=>b.onclick=()=>{ UX.level=b.dataset.uxlevel; try{ localStorage.setItem("bae_ui_level",UX.level); }catch{} uxApply(); });
  const sel=$("uxLang"); if(sel) sel.onchange=()=>{ UX.lang=sel.value; try{ localStorage.setItem("bae_ui_lang2",UX.lang); }catch{} uxApply(); if(RL) rlRender(); };
  R.addEventListener("change",e=>{ if(e.target.id==="uxAuto"&&RL){ RL.auto=e.target.checked; UX.autoN=0; rlSave(); uxRenderNext(); if(RL.auto) uxAutoStep(); } });
  R.addEventListener("click",e=>{ const b=e.target.closest("[data-ux]"); if(!b||!RL) return; const a=b.dataset.ux;
    if(a==="next"){ UX.autoN=0; uxDoNext(uxNextStep(),false); }
    else if(a==="tpl"){ const t=UX_TPL[+b.dataset.i]; const i=$("rlInput"); i.value=t[2][1]; i.dispatchEvent(new Event("input",{bubbles:true})); i.focus(); const m=i.value.indexOf("["); if(m>=0) i.setSelectionRange(m,i.value.indexOf("]",m)+1); }
    else if(a==="animatic") uxAnimatic();
    else if(a==="speak") uxSpeak(b.dataset.n,b);
    else if(a==="unspeak"){ const sc=RL.scenes.find(x=>+x.n===+b.dataset.n); if(sc?.clipOrig){ Object.assign(sc,sc.clipOrig); delete sc.clipOrig; delete sc._src; sc.note=null; rlLoadVideo(sc,sc.clip).finally(()=>{ rlSave(); rlBoard(); }); } }
    else if(a==="resize"){ b.disabled=true; uxResize(b.dataset.a); }
    else if(a==="sbstyleoff"){ RL.sbStyle=null; rlSave(); rlBoard(); }
    else if(a==="sheet") rlGenSheet(b.dataset.tag);
    else if(a==="castlib"){ b.disabled=true; uxCastLib(b.dataset.id); }
    else if(a==="dl"){ const t=b.textContent; b.disabled=true; b.textContent="Preparing…"; rlFullImage(b.dataset.id).then(bl=>{ if(!bl) throw 0; return uxSaveBlob(bl,"BAE "+(b.dataset.name||"image")); }).catch(()=>rlSys("Couldn't download this image from Magnific.",true)).finally(()=>{ b.disabled=false; b.textContent=t; }); }
    else if(a==="savelib") uxSaveLib(b.dataset.tag,b);
  });
  R.addEventListener("change",async e=>{ const f=e.target.matches?.("[data-ux-sbstyle]")&&e.target.files?.[0]; if(!f||!RL) return;
    RL._sbUp=true; rlBoard(); try{ const up=await rlUploadMag(f,f.name||"storyboard-style"); const id=typeof up==="string"?up:(up?.id||up?.identifier); if(id){ RL.sbStyle={id,name:f.name||"style"}; rlEvent("A storyboard style reference was added."); } }catch(err){ rlSys("Couldn't upload the style image: "+String(err?.message||err?.code||err).slice(0,160)); } finally{ delete RL._sbUp; rlSave(); rlBoard(); } });
  R.addEventListener("click",e=>{ if(e.target.closest("[data-uxpg]")){ uxPGDraw(); setTimeout(()=>$("uxPgText")?.focus(),60); } });
  R.addEventListener("change",async e=>{ const t=e.target.matches?.("[data-ux-sbrep]")?e.target:null; const f=t?.files?.[0]; if(!f||!RL) return; const i=+t.dataset.uxSbrep; t.value=""; const sc=RL.script?.scenes?.[i]; if(!sc) return;
    const b=sc.board=Object.assign(sc.board||{},{status:"run",err:null,_live:true}); rlBoard();
    try{ const up=await rlUploadMag(f,"storyboard-sheet-"+(i+1)); if(!up?.id) throw {message:"Magnific returned no identifier"}; RL_SBBIG.add(up.id); Object.assign(b,{id:up.id,web:up.web||null,status:"ok",sheet:true,fromUser:true,moment:"your image",at:Date.now()}); rlEvent(`The user replaced storyboard sheet ${i+1} with their own image.`); }
    catch(err){ b.status=b.id?"ok":"err"; b.err="Couldn't upload: "+String(err?.message||err?.code||err).slice(0,140); }
    finally{ delete b._live; rlSave(); rlBoard(); } });
  uxApply(); uxObserve(); uxMicInit(); briefMicInit();
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
    const k=e.target.closest("[data-bak]"); if(k){ const l=lsGet(RL_P+k.dataset.bak,null); let c=null; if(RLS.mode==="account"){ try{ c=await rlCloudGet(k.dataset.bak); }catch{} } const p=l&&c?((l.updatedAt||0)>=(c.updatedAt||0)?l:c):(l||c); if(l&&c&&(l.updatedAt||0)!==(c.updatedAt||0)){ await rlBackup(l); await rlBackup(c); } else if(p) await rlBackup(p); return; }
    const x=e.target.closest("[data-del]"); if(x){ if(x.dataset.sure){ await rlDelete(x.dataset.del); return rlShowLib(); } x.dataset.sure="1"; x.textContent="Delete for good?"; x.classList.add("danger"); setTimeout(()=>{ if(x.isConnected){ delete x.dataset.sure; x.textContent="Delete"; x.classList.remove("danger"); } },3500); }
  });
  $("rlOpenBrain").onclick=()=>rlShowBrain();
  $("rlSyncBar")?.addEventListener("click",async e=>{ const b=e.target.closest("[data-rlsync]"); if(!b||b.disabled) return; b.disabled=true; try{ await rlSyncAct(b.dataset.rlsync); }catch(err){ log("✕","reel sync",{message:err?.message}); const w=$("rlSyncBar"); if(w&&err?.message) w.insertAdjacentHTML("beforeend",`<span class="t12">${esc(err.message)}</span>`); } finally{ if(b.isConnected) b.disabled=false; } });
  $("rlRestoreBtn")?.addEventListener("click",()=>$("rlRestoreFile").click());
  $("rlRestoreFile")?.addEventListener("change",async e=>{ const f=e.target.files?.[0]; e.target.value=""; if(!f) return; const st=$("rlStore"); try{ await rlRestore(f); rlShowLib(); }catch(err){ if(st) st.textContent=err?.message||"That file could not be restored."; } });
  $("rlBrainBack").onclick=()=>{ $("rlBrain").hidden=true; rlShowLib(); };
  $("rlBrainBody").addEventListener("submit",e=>{ const f=e.target.closest("#brcForm"); if(!f) return; e.preventDefault(); if(BRC.busy){ BRC.abort?.abort(); return; } brcSend(f.q.value); });
  $("rlBrainBody").addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing&&e.target.closest?.("#brcForm textarea")){ e.preventDefault(); if(!BRC.busy) brcSend(e.target.value); } });
  $("rlBrainBody").addEventListener("click",e=>{ const q=e.target.closest("[data-brcq]"); if(q){ brcSend(q.dataset.brcq); return; } if(e.target.closest("[data-brcclear]")){ BRC.abort?.abort(); BRC.msgs=[]; brcSave(); brcDraw(); } });
  $("rlBrainBody").addEventListener("submit",e=>{ const f=e.target.closest("#brMemSearch"); if(!f) return; e.preventDefault(); const d=new FormData(f); brMemSearchShow(String(d.get("q")||""),String(d.get("k")||"")); });
  $("rlBrainBody").addEventListener("click",e=>{ const o=e.target.closest("[data-memopen]"); if(o){ brMemOpen(o.dataset.memopen); return; }
    const t=e.target.closest("[data-memq]"); if(t){ const f=$("brMemSearch"); if(f){ f.q.value=t.dataset.memq; f.k.value=""; } brMemSearchShow(t.dataset.memq,""); return; }
    if(e.target.closest("[data-memback]")) brMemSearchShow(BRM.q,BRM.k); });
  $("rlBrainBody").addEventListener("keydown",e=>{ const o=e.target.closest?.("g[data-memopen]"); if(o&&(e.key==="Enter"||e.key===" ")){ e.preventDefault(); brMemOpen(o.dataset.memopen); } });
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
  $("rlForm").onsubmit=e=>{ e.preventDefault(); if(rlBusy){ RL?._ctl?.abort(); return; } rlSend($("rlInput").value); };
  $("rlInput").addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); rlSend($("rlInput").value); } });
  document.addEventListener("visibilitychange",()=>{ if(!document.hidden&&RL&&!$("rlProjView").hidden){ setTimeout(rlResume,600); if(rlWakeN>0) rlWake(true).then(()=>rlWake(false)); } });
  $("rlMsgs").addEventListener("click",e=>{ if(e.target.closest("#rlRetry")&&RL?.chatPending) rlSend(RL.chatPending.text,{retry:true});
    const gm=e.target.closest("[data-rl-genmiss]"); if(gm&&RL){ gm.disabled=true; (async()=>{ if(!S.connected) await connect(true); const L=rlMissing().filter(x=>x.prompt); const q=[...L]; const w=async()=>{ while(q.length){ await rlGenElement(q.shift().tag); rlRenderChat(); } }; rlRenderChat(); await Promise.all([w(),w()]); })(); return; }
    const un=e.target.closest("[data-rlundo]"); if(un&&RL){ rlUndoTurn(un.dataset.rlundo); return; }
    const sk=e.target.closest("[data-advskip]"); if(sk&&RL){ const [mi,ai]=sk.dataset.advskip.split(":").map(Number); const x=RL.chat[mi]?.advisors?.[ai]; if(x){ x.skipped=true; brSignal("chat","advisor_skipped",-1,{note:x.note,item:rlAdv(x.id).name,key:"skip"+x.note}); rlSave(); rlRenderChat(); } return; }
    const u=e.target.closest("[data-adv]"); if(u&&RL){ const [mi,ai]=u.dataset.adv.split(":").map(Number); const x=RL.chat[mi]?.advisors?.[ai]; if(x){ x.used=true; const A=rlAdv(x.id); brSignal("chat","advisor_used",1,{note:x.note,item:A.name,key:x.note}); rlSend(rlAr()?`طبّق اقتراح ${A.name}: ${x.note}`:`Apply the ${A.name}'s suggestion: ${x.note}`); } } });
  $("rlChips").onclick=e=>{ const b=e.target.closest("button"); if(b) rlSend(b.textContent); };
  $("reels").addEventListener("toggle",e=>{ const d=e.target, k=d?.dataset?.openKey; if(!k) return; if(d.open){ RL_OPEN.add(k); RL_OPEN.delete("!"+k); } else { RL_OPEN.delete(k); RL_OPEN.add("!"+k); } },true);
  $("reels").addEventListener("change",e=>{
    const mv=e.target.closest?.("[data-intake]"); if(mv){ const [mi,ri]=mv.dataset.intake.split(":").map(Number); rlIntakeMove(mi,ri,mv.value); return; }
    const many=e.target.closest?.("[data-rl-many]"); if(many&&many.files?.length){ for(const f of [...many.files].slice(0,10)) rlPending.push({blob:f,url:URL.createObjectURL(f),name:f.name}); many.value=""; rlRenderAtt(); if(!rlBusy) rlSend(""); return; }
    const t=e.target.closest?.("[data-rl-own]"); if(!t||!t.files?.[0]) return; const f=t.files[0]; t.value=""; rlUseImage(t.dataset.rlOwn,f); });
  const rlGrow=()=>{ const t=$("rlInput"); t.style.height="auto"; t.style.height=Math.min(180,t.scrollHeight)+"px"; };
  $("rlInput").addEventListener("input",rlGrow); new MutationObserver(()=>{}).observe($("rlInput"),{attributes:true});
  $("rlForm").addEventListener("submit",()=>setTimeout(rlGrow,0));
  $("reels").addEventListener("submit",e=>{ const f=e.target.closest("[data-rl-dlgpaste]"); if(!f) return; e.preventDefault(); const [n,i]=f.dataset.rlDlgpaste.split(":"); const v=f.querySelector("input").value.trim(); if(v) rlAudioSet(n,+i,v,"pasted voice"); });
  $("rlFile").onchange=e=>{ for(const f of [...e.target.files].slice(0,10-rlPending.length)) rlPending.push({blob:f,url:URL.createObjectURL(f),name:f.name,video:/^video\//.test(f.type)}); e.target.value=""; rlRenderAtt(); };
  $("rlInput").addEventListener("paste",e=>{ const fs=[...(e.clipboardData?.files||[])].filter(f=>/^image\//.test(f.type)); if(fs.length){ fs.forEach(f=>rlPending.push({blob:f,url:URL.createObjectURL(f),name:f.name})); rlRenderAtt(); } });
  $("rlChatPane").addEventListener("dragover",e=>e.preventDefault());
  $("rlChatPane").addEventListener("drop",e=>{ e.preventDefault(); [...(e.dataTransfer?.files||[])].filter(f=>/^(image|video)\//.test(f.type)).slice(0,10).forEach(f=>rlPending.push({blob:f,url:URL.createObjectURL(f),name:f.name,video:/^video\//.test(f.type)})); rlRenderAtt(); });
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
    const zm=e.target.closest("[data-rl-zoom]"); if(zm&&typeof openLightbox==="function"){ const zid=zm.dataset.rlZoom, small=zm.src; openLightbox(rlFull[zid]||small); if(!rlFull[zid]&&mcp&&S.connected) preview(zid).then(pv=>{ if(!pv.image) return; const src=`data:${pv.image.mime};base64,${pv.image.data}`; rlFull[zid]=src; const im=$("lbImg"); if(im&&!$("lightbox").hidden&&im.getAttribute("src")===small) im.src=src; }).catch(()=>{}); return; }
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
    else if(a==="genboard"){ if(!S.connected) await connect(true); rlGenStoryboard(); }
    else if(a==="board1"){ if(!S.connected) await connect(true); rlGenStoryboard([+b.dataset.i]); }
    else if(a==="dlboard") rlDownloadBoard(b);
    else if(a==="dlgcopy"){ const d=RL.scenes.find(x=>+x.n===+b.dataset.n)?.dialogue?.[+b.dataset.i]; if(d){ try{ await navigator.clipboard.writeText(d.line); b.textContent="Copied ✓"; }catch{ b.textContent="Select the text to copy"; } setTimeout(()=>{ b.textContent="Copy line"; },1600); } }
    else if(a==="dlggen") rlVoiceGen(b.dataset.n,+b.dataset.i);
    else if(a==="dlggenall") rlVoiceGenAll(b.dataset.n);
    else if(a==="dlgvoice") rlVoiceChoose(b.dataset.n,+b.dataset.i);
    else if(a==="dlgvset"){ rlVoiceSet(b.dataset.n,+b.dataset.i,b.dataset.id,b.dataset.name); }
    else if(a==="dlgpick") rlAudioPick(b.dataset.n,+b.dataset.i);
    else if(a==="dlgset") rlAudioSet(b.dataset.n,+b.dataset.i,b.dataset.id,b.dataset.name);
    else if(a==="dlgclear") rlAudioSet(b.dataset.n,+b.dataset.i,"");
    else if(a==="genall") (b.dataset.list==="c"?RL.characters:RL.locations).filter(x=>!x.id&&!x.fromLib&&x.prompt).forEach(x=>rlGenElement(x.tag));
    else if(a==="edit"){ const el=rlElByTag(b.dataset.tag); if(el){ el._edit=true; rlBoard(); } }
    else if(a==="editdone"){ const el=rlElByTag(b.dataset.tag); if(el){ el._edit=false; el.err=null; if(el.status==="err") el.status=null; rlSave(); rlBoard(); } }
    else if(a==="remove"){ if(!b.dataset.sure){ b.dataset.sure="1"; b.textContent="Remove for good?"; b.classList.add("danger"); return; } const el=rlElByTag(b.dataset.tag); if(el) brSignal(RL.characters.includes(el)?"character":el.kind||"location","removed",-1,{item:`${el.name}: ${el.description||""}`,key:el.tag});
      rlEvent(`The user deleted ${el?.handle||b.dataset.tag}${el?.name?` (${el.name})`:""}.`);
      RL.characters=RL.characters.filter(x=>x.tag!==b.dataset.tag); RL.locations=RL.locations.filter(x=>x.tag!==b.dataset.tag); rlSave(); rlBoard(); }
    else if(a==="add"){ RL._adding=b.dataset.k; rlBoard(); setTimeout(()=>B.querySelector(".rl-addform input")?.focus(),30); }
    else if(a==="addcancel"){ RL._adding=null; rlBoard(); }
    else if(a==="cast"){ rlAddElement("character",b.dataset.n,"BAE character from the library",b.dataset.n); }
    else if(a==="check") rlCheckScenes([b.dataset.n]);
    else if(a==="stopcheck"){ e.preventDefault(); const sc=RL.scenes.find(x=>String(x.n)===b.dataset.n); sc?._ctl?.abort(); }
    else if(a==="improve") rlImproveScene(b.dataset.n);
    else if(a==="review") rlReview(b.dataset.n);
    else if(a==="revfix") rlReviewFix(b.dataset.n);
    else if(a==="seek"){ const v=document.querySelector(`video[data-rl-vid="${b.dataset.n}"]`); const t=+b.dataset.t; if(v&&Number.isFinite(t)){ try{ v.currentTime=Math.max(0,t-0.3); v.play?.().catch(()=>{}); v.scrollIntoView?.({block:"nearest"}); }catch{} } }
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
    else if(a==="copyall"||a==="copys"){ const txt=a==="copyall"?rlBibleText():(sc0=>rlVoiceCompose(sc0,rlSceneRefs(sc0).prompt).prompt)(RL.scenes.find(x=>+x.n===+b.dataset.n)); try{ await navigator.clipboard.writeText(txt||""); const t=b.textContent; b.textContent="Copied"; setTimeout(()=>b.textContent=t,1400); }catch{} }
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
      rlEvent(`The user edited by hand: ${p[0]==="look"?"the film look":p[0]==="b"?`script scene ${+p[1]+1} ${p[2]}`:p[0]==="s"?`scene ${p[1]} Seedance prompt`:p[0]==="f"?`scene ${p[1]} first-frame prompt`:`${p[1]} ${p[2]||"prompt"}`}. New text: ${String(t.value).slice(0,260)}`);
      brSignal(kind,"edited_by_user",0,{note:`The user rewrote ${p[0]==="b"?"script "+p[2]:p[0]==="s"?"the Seedance prompt":p[0]==="f"?"the first-frame prompt":(p[2]||"prompt")} by hand — learn from the difference.`,before,after:t.value,key:t.dataset.rlEdit}); } });
  uxInit();
})();
function rlRenderAtt(){ $("rlAtt").innerHTML=rlPending.map((a,i)=>a.video?`<span class="th vid" title="${esc(a.name||"")}"><video src="${a.url}" muted playsinline preload="metadata"></video><span class="vb" aria-hidden="true">▶</span><button type="button" data-i="${i}" aria-label="Remove">×</button></span>`:`<span class="th"><img src="${a.url}" alt="${esc(a.name||"")}"><button type="button" data-i="${i}" aria-label="Remove">×</button></span>`).join(""); }

/* ================= Brand Identity: the BAE system on one page, with ready-to-download assets ================= */
(function(){
  const P=$("brand"); if(!P) return; const body=$("biBody");
  const T=(name,hex,print)=>({name,hex,print:print||null});
  const TIERS=[
    {id:"primary",title:"Primary",note:"The main chromatic identifier",share:"40%",list:[T("Orange","#FA6428",{pantone:"1655 C",cmyk:[0,76,100,0]}),T("Light Orange","#FFFAF4"),T("Soft Orange","#FDCBB4"),T("Medium Orange","#FB9A75"),T("Dark Orange","#C13A23")]},
    {id:"neutral",title:"Neutral",note:"Balance and legibility",share:"30% light · 20% dark",list:[T("White","#FFFFFF"),T("Light Stone","#ECE8DF"),T("Stone","#CCC3B4"),T("Ink","#19181E",{pantone:"276 C",cmyk:[17,20,0,88]}),T("Medium Ink","#4F4E62"),T("Light Ink","#75738D")]},
    {id:"comp",title:"Complimentary",note:"Gradients, tints, UI, illustration, interiors",share:"5% + 5%",list:[T("Burgundy","#A33755",{pantone:"7420 C",cmyk:[0,66,48,36]}),T("Medium Burgundy","#B9516E"),T("Light Burgundy","#F1C0B6"),T("Teal","#32969B",{pantone:"7495 C",cmyk:[68,3,0,39]}),T("Dark Teal","#196E78")]}];
  const ALL=TIERS.flatMap(t=>t.list.map(c=>({...c,tier:t.title})));
  const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
  const cmykOf=c=>{ if(c.print?.cmyk) return {v:c.print.cmyk,official:true}; const [r,g,b]=rgb(c.hex).map(x=>x/255), k=1-Math.max(r,g,b); const f=x=>k>=1?0:Math.round((1-x-k)/(1-k)*100); return {v:[f(r),f(g),f(b),Math.round(k*100)],official:false}; };
  const lum=h=>{ const [r,g,b]=rgb(h).map(v=>{ v/=255; return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4); }); return .2126*r+.7152*g+.0722*b; };
  const on=h=>lum(h)>.45?"#19181E":"#FFFFFF";
  const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-");
  const copyBtn=(label,val)=>`<button type="button" class="bi-copy" data-copy="${esc(val)}"><span>${label}</span><b>${esc(val)}</b></button>`;
  const save=async(b,name)=>{ if(S.web||!downloads){ const a=document.createElement("a"); a.href=URL.createObjectURL(b); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },1500); } else { try{ await downloads.save({filename:name,data:b}); }catch{} } };
  const saveText=(text,name,type)=>save(new Blob([text],{type}),name);
  /* Adobe Swatch Exchange (.ase): opens in Illustrator, Photoshop, InDesign */
  function ase(mode){ const blocks=ALL.map(c=>{ const name=`BAE ${c.name}`; const vals=mode==="CMYK"?cmykOf(c).v.map(x=>x/100):rgb(c.hex).map(x=>x/255); const len=2+(name.length+1)*2+4+vals.length*4+2; const buf=new DataView(new ArrayBuffer(6+len)); let o=0; buf.setUint16(o,1); o+=2; buf.setUint32(o,len); o+=4; buf.setUint16(o,name.length+1); o+=2; for(const ch of name){ buf.setUint16(o,ch.charCodeAt(0)); o+=2; } buf.setUint16(o,0); o+=2; const m=mode==="CMYK"?"CMYK":"RGB "; for(const ch of m){ buf.setUint8(o++,ch.charCodeAt(0)); } for(const v of vals){ buf.setFloat32(o,v); o+=4; } buf.setUint16(o,0); return buf.buffer; });
    const head=new DataView(new ArrayBuffer(12)); "ASEF".split("").forEach((ch,i)=>head.setUint8(i,ch.charCodeAt(0))); head.setUint16(4,1); head.setUint16(6,0); head.setUint32(8,blocks.length); return new Blob([head.buffer,...blocks],{type:"application/octet-stream"}); }
  const cssVars=()=>`:root{\n${ALL.map(c=>`  --bae-${slug(c.name)}: ${c.hex};`).join("\n")}\n}\n`;
  const tokens=()=>JSON.stringify({brand:"Bank al Etihad",source:"Guidelines V1.1, June 2026",colors:ALL.map(c=>({name:c.name,tier:c.tier,hex:c.hex,rgb:rgb(c.hex),cmyk:cmykOf(c).v,cmykOfficial:cmykOf(c).official,pantone:c.print?.pantone||null})),type:{latin:"GT Walsheim Regular",arabic:"Avenir Arabic Regular",scale:SCALE.map(([role,size,tr,lh])=>({role,size,tracking:tr,lineHeight:lh}))},grid:{margin:"7% of width",columns:12,rows:12}},null,2);
  function sheetSVG(mode){ const W=1600, pad=80, cw=(W-pad*2-40*4)/5, ch=230; let y=150, out=[`<rect width="100%" height="100%" fill="#FFFAF4"/>`,`<text x="${pad}" y="96" font-family="GT Walsheim, Arial, sans-serif" font-size="44" fill="#19181E">Bank al Etihad — colour palette · ${mode==="CMYK"?"print (CMYK)":"screen (RGB)"}</text>`];
    for(const t of TIERS){ out.push(`<text x="${pad}" y="${y}" font-family="GT Walsheim, Arial, sans-serif" font-size="24" fill="#4F4E62">${t.title} · ${t.share}</text>`); y+=24;
      t.list.forEach((c,i)=>{ const x=pad+(i%5)*(cw+40), yy=y+Math.floor(i/5)*(ch+30); const k=cmykOf(c); const l1=mode==="CMYK"?`C${k.v[0]} M${k.v[1]} Y${k.v[2]} K${k.v[3]}${k.official?"":" *"}`:c.hex, l2=mode==="CMYK"?(c.print?.pantone?`PANTONE ${c.print.pantone}`:""):`R${rgb(c.hex)[0]} G${rgb(c.hex)[1]} B${rgb(c.hex)[2]}`;
        out.push(`<rect x="${x}" y="${yy}" width="${cw}" height="${ch}" rx="22" fill="${c.hex}" stroke="#CCC3B4" stroke-width="${c.hex==="#FFFFFF"||c.hex==="#FFFAF4"?1:0}"/><text x="${x+18}" y="${yy+38}" font-family="GT Walsheim, Arial, sans-serif" font-size="22" fill="${on(c.hex)}">${c.name}</text><text x="${x+18}" y="${yy+ch-46}" font-family="GT Walsheim, Arial, sans-serif" font-size="18" fill="${on(c.hex)}">${l1}</text><text x="${x+18}" y="${yy+ch-20}" font-family="GT Walsheim, Arial, sans-serif" font-size="18" fill="${on(c.hex)}">${l2}</text>`); });
      y+=Math.ceil(t.list.length/5)*(ch+30)+50; }
    if(mode==="CMYK") out.push(`<text x="${pad}" y="${y}" font-family="GT Walsheim, Arial, sans-serif" font-size="18" fill="#4F4E62">* converted from the screen colour, not an official print value — confirm with the brand team before printing.</text>`);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${y+60}" width="${W}" height="${y+60}">${out.join("")}</svg>`; }
  const SCALE=[["Headline",200,"-4%","90%"],["Headline",160,"-4%","90%"],["Headline",120,"-4%","100%"],["Headline",80,"-4%","100%"],["Subhead",40,"-1%","110%"],["Subhead",32,"-1%","110%"],["Subhead",24,"0%","110%"],["Subhead",18,"-2%","110%"],["Body",20,"0%","120%"],["Body",16,"0%","120%"],["Body",12,"1%","120%"]];
  const COMBOS=[["Primary","#FFFFFF","#FA6428","White on Orange"],["Primary","#FA6428","#FFFFFF","Orange on White"],["Secondary","#FFFAF4","#4F4E62","Light Orange on Medium Ink"],["Secondary","#C13A23","#FFFAF4","Dark Orange on Light Orange"],["Tertiary","#ECE8DF","#19181E","Light Stone on Ink"],["Tertiary","#4F4E62","#ECE8DF","Medium Ink on Light Stone"]];
  /* the symbol already ships with the studio; it is offered as SVG in each approved colour */
  const emblem=()=>document.querySelector(".l-emblem");
  const symbolSVG=(fill,bg)=>{ const e=emblem(); if(!e) return ""; const vb=e.getAttribute("viewBox")||"0 0 84.53 82.12"; const [,,w,h]=vb.split(/\s+/).map(Number); const inner=e.innerHTML;
    return bg?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-w*.5} ${-h*.5} ${w*2} ${h*2}"><rect x="${-w*.5}" y="${-h*.5}" width="${w*2}" height="${h*2}" fill="${bg}"/><g fill="${fill}">${inner}</g></svg>`:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><g fill="${fill}">${inner}</g></svg>`; };
  /* ---------- team asset shelves: the owner uploads official files once, everyone downloads ---------- */
  const BF={list:[],loaded:false,canEdit:false,busy:"",err:""};
  const SHELVES=[["logos","Logos","Official lockups: Symbol, English, Arabic, Bilingual — SVG, PDF, PNG"],["gradients","Gradients","Orange, dark and frame gradients"],["illustrations","Illustrations","Light and dark mode sets"],["templates","Templates","Per ratio: 1x1, 3x4, 9x16, 16x9"],["guidelines","Guidelines","The guideline PDF and reference sheets"],["other","Other","Anything else the team needs"]];
  async function bfLoad(){ await rlStoreInit(); if(!RLS.db){ BF.err="Asset shelves need the page's database — open the studio in claude.ai."; BF.loaded=true; return; }
    try{ const sn=await RLS.db.collection("brandfiles").get(); BF.list=sn.docs.map(d=>({id:d.id,...JSON.parse(JSON.stringify(d.data()))})).sort((a,b)=>String(a.name).localeCompare(String(b.name))); }catch(e){ BF.err="Couldn't open the asset shelves."; }
    try{ const u=await window.claude?.use?.("user"); BF.canEdit=!!u?.canEdit?.(); }catch{} BF.loaded=true; }
  const b64=buf=>{ let s=""; const u=new Uint8Array(buf); for(let i=0;i<u.length;i+=0x8000) s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000)); return btoa(s); };
  async function bfAdd(file,shelf){ const MAX=12*1048576; if(file.size>MAX) throw {message:`${file.name} is larger than 12 MB.`};
    const id="f"+Date.now().toString(36)+Math.random().toString(36).slice(2,6); const mime=file.type||(/\.svg$/i.test(file.name)?"image/svg+xml":"application/octet-stream");
    let asset=null; if(file.size>1500000){ try{ const A=await window.claude?.use?.("assets"); if(A){ const r=await A.upload(file); asset=r?.id||null; } }catch{} }
    let n=0; if(!asset){ const data=b64(await file.arrayBuffer()), SZ=90000; n=Math.ceil(data.length/SZ); if(n>70) throw {message:`${file.name} is too large for the shelf (max about 4.5 MB without the file store).`}; const col=RLS.db.collection("brandblob"); for(let i=0;i<n;i++){ BF.busy=`Saving ${file.name} · ${Math.round((i+1)/n*100)}%`; draw(); await col.doc(id+"_"+i).set({d:data.slice(i*SZ,(i+1)*SZ)}); } }
    let prev=""; try{ if(/svg/.test(mime)&&file.size<60000) prev="data:image/svg+xml;base64,"+b64(await file.arrayBuffer()); else if(/^image\/(png|jpeg|webp)/.test(mime)){ const bmp=await createImageBitmap(file); const k=Math.min(1,360/Math.max(bmp.width,bmp.height)); const c=document.createElement("canvas"); c.width=Math.round(bmp.width*k); c.height=Math.round(bmp.height*k); c.getContext("2d").drawImage(bmp,0,0,c.width,c.height); prev=c.toDataURL("image/webp",.8); if(prev.length>60000) prev=c.toDataURL("image/jpeg",.6); } }catch{}
    const doc={name:file.name.slice(0,120),shelf,mime,size:file.size,n,asset,prev:prev.length<=60000?prev:"",at:Date.now()}; await RLS.db.collection("brandfiles").doc(id).set(doc); BF.list.push({id,...doc}); BF.list.sort((a,b)=>String(a.name).localeCompare(String(b.name))); }
  async function bfBlob(f){ if(f.asset){ const r=await fetch("/_blob/"+f.asset); if(r.ok){ const b=await r.blob(); return new Blob([b],{type:f.mime}); } }
    const col=RLS.db.collection("brandblob"); const parts=await Promise.all([...Array(+f.n||0)].map((_,i)=>col.doc(f.id+"_"+i).get())); const bin=atob(parts.map(x=>x.exists?x.data()?.d||"":"").join("")); const u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new Blob([u],{type:f.mime}); }
  async function bfDownload(f,btn){ const t=btn.textContent; btn.disabled=true; btn.textContent="Preparing…"; try{ const b=await bfBlob(f); await save(b,f.name); }catch(e){ BF.err="Couldn't download "+f.name+"."; draw(); } btn.disabled=false; btn.textContent=t; }
  async function bfRemove(f){ BF.list=BF.list.filter(x=>x.id!==f.id); draw(); try{ await RLS.db.collection("brandfiles").doc(f.id).delete(); const col=RLS.db.collection("brandblob"); for(let i=0;i<(+f.n||0);i++) await col.doc(f.id+"_"+i).delete().catch(()=>{}); if(f.asset){ const A=await window.claude?.use?.("assets"); await A?.delete(f.asset).catch(()=>{}); } }catch{} }
  const kb=n=>n>1048576?(n/1048576).toFixed(1)+" MB":Math.max(1,Math.round(n/1024))+" KB";
  function shelvesHTML(){ if(!BF.loaded) return `<p class="muted">Loading the asset shelves…</p>`;
    return (BF.busy?`<p class="t12" role="status">${esc(BF.busy)}</p>`:"")+(BF.err?`<p class="t12 bad" role="alert">${esc(BF.err)}</p>`:"")+SHELVES.map(([k,title,note])=>{ const L=BF.list.filter(f=>f.shelf===k); if(!L.length&&!BF.canEdit) return "";
      return `<div class="bi-shelf"><div class="bi-shelfhead"><div><b>${title}</b><span class="t12 muted">${note}</span></div>${BF.canEdit?`<label class="btn small">Add files<input type="file" multiple class="sr" data-bfadd="${k}"></label>`:""}</div>
        ${L.length?`<div class="bi-files">${L.map(f=>`<div class="bi-file"><div class="pv">${f.prev?`<img src="${f.prev}" alt="">`:`<span>${esc((f.name.split(".").pop()||"file").toUpperCase().slice(0,4))}</span>`}</div><div class="tx"><b dir="auto" data-noi18n>${esc(f.name)}</b><span class="t12 muted">${kb(f.size)}</span></div><div class="rl-btns"><button type="button" class="btn small primary" data-bfdl="${esc(f.id)}">Download</button>${BF.canEdit?`<button type="button" class="bi-x" data-bfrm="${esc(f.id)}">Remove</button>`:""}</div></div>`).join("")}</div>`:`<p class="t12 muted">Nothing here yet. Add the official files from the asset library.</p>`}</div>`; }).join("")||`<p class="muted">No files yet. The studio owner adds the official assets.</p>`; }
  /* ---------- Templates and gradients (v128): the guideline's five steps, rendered on a canvas ----------
     1 solid brand colour · 2 an organic brand shape · 3 linear gradient fill #C13A23 0% → #FA6428 61% → #C13A23 100% at an angle · 4 layer blur 75 ·
     5 more shapes, lighter shades on top. Three uses: Background (full bleed), Frame (a soft L from two adjacent sides), Shape (circle / lozenges with
     a progressive blur, sharp on one side). The organic shapes are drawn here, close to the guideline: the official library shapes were not supplied.
     Everything is computed in floating point at a small size, then scaled up with a fine dither, so a 4K or 8K file never bands. */
  const FORMATS=[["Social",[["Instagram post 1:1",1080,1080],["Instagram portrait 4:5",1080,1350],["BAE portrait 3:4",1080,1440],["Story / Reel 9:16",1080,1920],["Facebook post",1200,630],["LinkedIn post",1200,627],["LinkedIn square",1200,1200],["X post 16:9",1600,900],["YouTube thumbnail",1280,720],["WhatsApp status",1080,1920]]],
    ["Covers",[["LinkedIn cover",1584,396],["Facebook cover",1640,624],["X header",1500,500],["YouTube banner",2560,1440],["Email header",1200,400]]],
    ["Display ads",[["Medium rectangle",300,250],["Large rectangle",336,280],["Leaderboard",728,90],["Billboard",970,250],["Half page",300,600],["Wide skyscraper",160,600],["Mobile banner",320,50],["Mobile large",320,100]]],
    ["Screens",[["Presentation 16:9",1920,1080],["Web hero",1440,600],["App splash",1170,2532],["Digital screen portrait",1080,1920],["Digital screen landscape",3840,2160]]]];
  const FLAT=FORMATS.flatMap(g=>g[1].map(f=>({g:g[0],name:f[0],w:f[1],h:f[2]})));
  const LAYOUTS=[["grad","Gradient only"],["logo","Logo"],["copy","Logo + copy"],["image","Image + copy"]];
  /* a tone is the fill of one shape: colour at 0%, at 61%, at 100% */
  const TONES={deep:["Dark Orange","#C13A23","#FA6428","#C13A23"],mid:["Orange","#FA6428","#FB9A75","#FA6428"],light:["Medium Orange","#FB9A75","#FDCBB4","#FB9A75"],glow:["Soft Orange","#FDCBB4","#FFFAF4","#FDCBB4"],cream:["Light Orange","#FFFAF4","#FFFAF4","#FFFAF4"],flat:["Orange flat","#FA6428","#FA6428","#FA6428"],
    sdark:["Dark Stone","#CCC3B4","#DDD6CA","#CCC3B4"],stone:["Stone","#ECE8DF","#F6F1E9","#ECE8DF"],
    ndeep:["Deep navy","#06051A","#0E0C26","#06051A"],nmid:["Navy violet","#0E0C26","#2C2A48","#0E0C26"],nlight:["Grey violet","#24223F","#4B4964","#24223F"],nglow:["Light grey violet","#4B4964","#626079","#4B4964"]};
  const FAMS={orange:{name:"Orange",tones:["deep","mid","light","glow","cream","flat"]},stone:{name:"Stone",tones:["sdark","stone","cream","glow"]},dark:{name:"Dark",tones:["ndeep","nmid","nlight","nglow"]}};
  /* organic shapes: a closed smooth curve through points at even angles, radius 0..1 */
  const BLOBS=[[1,.8,.93,.68,.86,.98,.74],[.9,1,.7,.82,.62,.9,.76,.96],[1,.86,.6,.76,1,.8,.56,.72],[.76,.96,1,.8,.6,.72,.92,.66,.86],[1,.62,.95,.6,1,.58],[1,.9,.72,.64,.74,.92,1,.82,.62,.8]].map(R=>{ const n=R.length, p=R.map((r,i)=>[Math.cos(i/n*2*Math.PI)*r,Math.sin(i/n*2*Math.PI)*r]), f=v=>v.toFixed(4); let d=`M${f(p[0][0])} ${f(p[0][1])}`;
    for(let i=0;i<n;i++){ const a=p[(i+n-1)%n], b=p[i], c=p[(i+1)%n], e=p[(i+2)%n]; d+=`C${f(b[0]+(c[0]-a[0])/6)} ${f(b[1]+(c[1]-a[1])/6)} ${f(c[0]-(e[0]-b[0])/6)} ${f(c[1]-(e[1]-b[1])/6)} ${f(c[0])} ${f(c[1])}`; } return d+"Z"; });
  /* one shape: b organic shape, x y centre (0..1 of the gradient's own area), s size (share of the mean side), r rotation, e stretch, t tone, a fill angle, bl layer blur (Figma units at 1080), o strength */
  const B=(b,x,y,s,r,e,t,a,bl,o)=>({b,x,y,s,r,e:e||1,t,a:a??35,bl:bl??75,o:o??1});
  const mir=L=>L.map(q=>({...q,x:1-q.x,r:-q.r,a:180-q.a}));
  const F01=[B(5,.5,1.06,.6,0,3,"deep",0,120),B(5,1.07,.5,.6,90,3,"deep",180,120),B(1,.42,.86,.3,4,2.8,"mid",0,120,.9),B(1,.88,.4,.3,94,2.8,"mid",0,120,.9),B(4,.3,.8,.16,0,2.6,"light",0,110,.8),B(4,.83,.24,.16,90,2.6,"light",0,110,.8)];
  const F02=[B(5,.4,.4,1.2,45,1.4,"deep",0,110),B(1,.45,.8,.34,4,2.8,"light",0,120,.8),B(1,.82,.42,.34,94,2.8,"light",0,120,.8),B(5,.5,1.08,.62,0,3,"cream",0,120),B(5,1.09,.5,.62,90,3,"cream",0,120)];
  const S01=[B(5,.5,1.06,.6,0,3,"sdark",0,120),B(5,1.07,.5,.6,90,3,"sdark",180,120),B(1,.42,.86,.3,4,2.8,"stone",0,120,.9),B(1,.88,.4,.3,94,2.8,"stone",0,120,.9)];
  const S02=[B(5,.4,.4,1.2,45,1.4,"sdark",0,110),B(5,.5,1.08,.62,0,3,"cream",0,120),B(5,1.09,.5,.62,90,3,"cream",0,120)];
  const BG=(d,m,l,g)=>[
    [B(5,.5,.5,1.15,45,1.4,d,0,100),B(2,.06,.08,.6,30,1.4,d,200,100,.8),B(0,.96,.94,.6,60,1.5,d,20,100,.8),B(4,1.04,.3,.28,80,1.5,l,90,90,.9),B(3,1.06,.29,.12,0,1.2,g,0,80,.6)],
    [B(5,.5,.5,1.15,-45,1.4,d,0,100),B(2,.94,.08,.6,-30,1.4,d,200,100,.8),B(0,.04,.94,.6,-60,1.5,d,20,100,.8),B(4,.3,-.03,.28,5,1.6,l,0,90,.9),B(3,.29,-.05,.12,0,1.2,g,0,80,.6)],
    [B(5,.5,.5,1.15,80,1.35,d,0,100),B(2,.1,1.02,.75,-10,1.6,d,200,100,.85),B(0,.9,.02,.6,20,1.5,d,20,100,.8),B(4,-.04,.6,.28,85,1.5,l,90,90,.9),B(3,-.06,.61,.12,0,1.2,g,0,80,.6)]];
  const BO=BG("deep","mid","light","glow"), BD=BG("nmid","nmid","nlight","nglow").map(L=>L.map((q,i)=>i===3?{...q,s:.4,o:1}:i===4?{...q,s:.18,o:.8}:q));
  const SH=(b,file,name,form,dir,blobs)=>({k:b,g:"Shape · image-led layouts",name,fam:"orange",kind:"shape",form,dir,base:"#FA6428",file,blobs});
  const LIB=[
    ...BO.map((L,i)=>({k:"orange_0"+(i+1),g:"Background · Orange",name:"Orange 0"+(i+1),fam:"orange",kind:"bg",base:"#FA6428",file:"gr_orange_{r}_0"+(i+1),blobs:L})),
    {k:"frame_01_en",g:"Frame · Orange",name:"Frame gradient 01 · English",fam:"orange",kind:"frame",base:"#FFFAF4",file:"Frame_gradient_01_English_{r}",blobs:F01},
    {k:"frame_01_ar",g:"Frame · Orange",name:"Frame gradient 01 · Arabic",fam:"orange",kind:"frame",base:"#FFFAF4",file:"Frame_gradient_01_Arabic_{r}",blobs:mir(F01)},
    {k:"frame_02_en",g:"Frame · Orange",name:"Frame gradient 02 · English",fam:"orange",kind:"frame",base:"#FA6428",file:"Frame_gradient_02_English_{r}",blobs:F02},
    {k:"frame_02_ar",g:"Frame · Orange",name:"Frame gradient 02 · Arabic",fam:"orange",kind:"frame",base:"#FA6428",file:"Frame_gradient_02_Arabic_{r}",blobs:mir(F02)},
    {k:"stone_01",g:"Frame · Stone",name:"Stone frame 01",fam:"stone",kind:"frame",base:"#FFFAF4",file:"gr_frame_{r}_01",blobs:S01},
    {k:"stone_02",g:"Frame · Stone",name:"Stone frame 02",fam:"stone",kind:"frame",base:"#ECE8DF",file:"gr_frame_{r}_02",blobs:S02},
    ...BD.map((L,i)=>({k:"dark_0"+(i+1),g:"Dark · internal and corporate only",name:"Dark 0"+(i+1),fam:"dark",kind:"bg",base:"#0E0C26",file:"gr_dark_{r}_0"+(i+1),blobs:L})),
    SH("circle_1","BAE_gradient_circle_1","Circle · sharp top","circle","top",[B(0,.14,.3,.7,-40,1.3,"deep",0,170,.9),B(1,.82,.14,.75,20,1.3,"light",30,170,.8),B(2,.6,.92,.7,10,1.5,"deep",0,170,.7)]),
    SH("circle_2","BAE_gradient_circle_2","Circle · sharp right","circle","right",[B(0,.2,.26,.7,-40,1.3,"deep",0,170,.95),B(1,.82,.18,.7,20,1.3,"light",30,170,.8),B(2,.64,.9,.65,10,1.5,"deep",0,170,.75)]),
    SH("loz_h_1","BAE_gradient_lozenge_h_1","Lozenge horizontal · sharp top","loz_h","top",[B(0,.04,.42,.6,-20,1.2,"deep",0,170,.9),B(1,.58,.5,.5,0,1.5,"mid",30,170,.6),B(3,.92,.15,.4,20,1.2,"light",30,170,.55),B(2,.8,1.05,.5,0,1.6,"deep",0,170,.6)]),
    SH("loz_h_2","BAE_gradient_lozenge_h_2","Lozenge horizontal · sharp right","loz_h","right",[B(0,.06,.38,.6,-20,1.2,"deep",0,170,.95),B(1,.62,.5,.5,0,1.5,"mid",30,170,.5),B(3,.9,.15,.4,20,1.2,"light",30,170,.55),B(2,.3,1.05,.5,0,1.6,"deep",0,170,.55)]),
    SH("loz_v_1","BAE_gradient_lozenge_v_1","Lozenge vertical · sharp top","loz_v","top",[B(1,.28,.06,.7,20,1.3,"light",30,170,.8),B(0,1.02,.42,.55,80,1.3,"deep",0,170,.9),B(2,.45,1.0,.65,10,1.3,"deep",0,170,.7)]),
    SH("loz_v_2","BAE_gradient_lozenge_v_2","Lozenge vertical · sharp right","loz_v","right",[B(1,.28,.08,.7,20,1.3,"light",30,170,.75),B(0,1.04,.44,.55,80,1.3,"deep",0,170,.95),B(2,.4,1.0,.65,10,1.3,"deep",0,170,.7)])];
  const item=k=>LIB.find(i=>i.k===k)||LIB[0];
  const QUAL=[["x1","Standard",0],["4k","4K",3840],["8k","8K",7680]];
  const TP={fmt:3,item:"orange_01",layout:"grad",lang:"en",blobs:null,sel:-1,q:"x1",mesh:"mid",head:"",sub:"",ask:"",busy:"",err:"",note:"",custom:false,seed:0};
  const clone=L=>L.map(q=>({...q}));
  const blobs=()=>TP.blobs||(TP.blobs=clone(item(TP.item).blobs));
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const ratioKey=(w,h)=>{ const r=w/h, K=[["9x16",9/16],["3x4",3/4],["1x1",1],["16x9",16/9]].find(x=>Math.abs(x[1]-r)<.006); return K?K[0]:`${w}x${h}`; };
  /* where the gradient lives inside the frame, in pixels: the whole frame, or the circle / lozenge */
  function geom(o){ const {w,h}=o, it=o.it, m=Math.round(w*.07), mn=Math.min(w,h), ar=o.lang==="ar", solo=o.layout==="grad", sh=it.form;
    if(it.kind!=="shape") return {x:0,y:0,w,h,r:0};
    const box=(x,y,bw,bh)=>({x,y,w:bw,h:bh,r:Math.min(bw,bh)/2});
    if(solo){ if(sh==="circle"){ const d=mn*.78; return box((w-d)/2,(h-d)/2,d,d); }
      if(sh==="loz_h"){ const lw=w*.84, lh=Math.min(h*.76,lw*.5); return box((w-lw)/2,(h-lh)/2,lw,lh); }
      const lh=h*.84, lw=Math.min(w*.76,lh*.5); return box((w-lw)/2,(h-lh)/2,lw,lh); }
    /* with a logo or copy: the element keeps clear of the headline block above it and the signature row below it */
    if(h<220||w/h>2.4){ const eh=h*.7, ew=sh==="circle"?eh:sh==="loz_h"?Math.min(w*.3,eh*2):eh*.5, cx=ar?w*.4:w*.6, eh2=sh==="loz_h"?Math.min(eh,ew*.5):eh; return box(cx-ew/2,(h-eh2)/2,ew,eh2); }
    const sig=(h-2*m)/12*1.5+h*.035, T=m+(o.layout==="logo"?0:Math.min(w*.092,h*.085)*1.9+h*.03), Bm=h-m-sig, bh=Math.max(40,Bm-T), bw=w-2*m;
    if(sh==="circle"){ const d=Math.min(bw,bh); return box(ar?m:w-m-d,T+(bh-d)/2,d,d); }
    if(sh==="loz_h"){ const lh=Math.min(bh,bw*.5); return box(m,T+(bh-lh)/2,bw,lh); }
    const lw=Math.min(bw,bh*.5); return box(ar?m:w-m-lw,T,lw,bh); }
  /* ----- engine ----- */
  const BLUR_K=1.6; /* layer blur 75 on the guideline's own artboard, carried to a 1080 frame */
  function boxes(sig){ const wi=Math.sqrt(12*sig*sig/3+1); let wl=Math.floor(wi); if(wl%2===0) wl--; const m=Math.round((12*sig*sig-3*wl*wl-12*wl-9)/(-4*wl-4)); return [0,1,2].map(i=>Math.max(0,((i<m?wl:wl+2)-1)/2)); }
  function boxH(s,d,w,h,r){ const iw=1/(2*r+1); for(let y=0;y<h;y++){ const row=y*w*4; for(let c=0;c<4;c++){ let acc=0; for(let x=0;x<=r&&x<w;x++) acc+=s[row+x*4+c]; for(let x=0;x<w;x++){ d[row+x*4+c]=acc*iw; const a=x+r+1, b=x-r; if(a<w) acc+=s[row+a*4+c]; if(b>=0) acc-=s[row+b*4+c]; } } } }
  function boxV(s,d,w,h,r){ const iw=1/(2*r+1), st=w*4; for(let x=0;x<w;x++){ for(let c=0;c<4;c++){ const col=x*4+c; let acc=0; for(let y=0;y<=r&&y<h;y++) acc+=s[col+y*st]; for(let y=0;y<h;y++){ d[col+y*st]=acc*iw; const a=y+r+1, b=y-r; if(a<h) acc+=s[col+a*st]; if(b>=0) acc-=s[col+b*st]; } } } }
  let gcv=null; const paths={};
  const blobPath=i=>paths[i]||(paths[i]=new Path2D(BLOBS[i%BLOBS.length]));
  /* the colour field of a gradient area fw × fh (small), as float RGB 0..255 */
  function gField(it,L,Wf,Hf,res){ const k=Math.min(1,res/Math.max(Wf,Hf)), fw=Math.max(2,Math.round(Wf*k)), fh=Math.max(2,Math.round(Hf*k)), d=new Float32Array(fw*fh*3), bc=rgb(it.base);
    for(let i=0;i<d.length;i+=3){ d[i]=bc[0]; d[i+1]=bc[1]; d[i+2]=bc[2]; }
    const ref=Math.sqrt(fw*fh), ax=clamp(Math.pow(Wf/Hf,.25),.6,1.7); gcv=gcv||document.createElement("canvas");
    for(const q of L){ const tn=TONES[q.t]||TONES.deep, sig=q.bl/2*ref/1080*BLUR_K, pad=Math.ceil(sig*3)+2, cw=fw+2*pad, ch=fh+2*pad; gcv.width=cw; gcv.height=ch; const c=gcv.getContext("2d",{willReadFrequently:true});
      const R=q.s*ref/2, an=q.a*Math.PI/180, ca=Math.cos(an), sa=Math.sin(an); c.translate(pad+q.x*fw,pad+q.y*fh); c.scale(ax,1/ax); c.rotate(q.r*Math.PI/180); c.scale(R*q.e,R);
      const g=c.createLinearGradient(-ca,-sa,ca,sa); g.addColorStop(0,tn[1]); g.addColorStop(.61,tn[2]); g.addColorStop(1,tn[3]); c.fillStyle=g; c.fill(blobPath(q.b));
      const im=c.getImageData(0,0,cw,ch).data, n=cw*ch*4; let a=new Float32Array(n), b=new Float32Array(n); for(let i=0;i<n;i+=4){ const al=im[i+3]/255*q.o; a[i]=im[i]*al; a[i+1]=im[i+1]*al; a[i+2]=im[i+2]*al; a[i+3]=al; }
      if(sig>.4) for(const r of boxes(sig)){ if(r<1) continue; boxH(a,b,cw,ch,r); boxV(b,a,cw,ch,r); }
      for(let y=0;y<fh;y++){ let i=((y+pad)*cw+pad)*4, j=y*fw*3; for(let x=0;x<fw;x++,i+=4,j+=3){ const al=a[i+3]; if(al>.0004){ const u=1-al; d[j]=a[i]+d[j]*u; d[j+1]=a[i+1]+d[j+1]*u; d[j+2]=a[i+2]+d[j+2]*u; } } } }
    return {w:fw,h:fh,d}; }
  /* a prepared render: output size W × H for the format o */
  function gPrep(o,W,H,res){ const it=o.it, K=W/o.w, g=geom(o), G={x:g.x*K,y:g.y*K,w:g.w*K,h:g.h*K}, F=gField(it,o.blobs,g.w,g.h,res), shape=it.kind==="shape";
    const xi=new Int32Array(W), xw=new Float32Array(W); for(let x=0;x<W;x++){ const u=clamp(((x+.5)-G.x)/G.w*F.w-.5,0,F.w-1.001), i=Math.floor(u); xi[x]=i*3; xw[x]=u-i; }
    return {o,it,W,H,K,G,F,xi,xw,shape,page:shape&&o.layout!=="grad"?rgb("#FFFAF4"):null,alpha:shape&&o.layout==="grad",smax:(it.form==="loz_v"?.09:.058)*Math.min(G.w,G.h)}; }
  /* paint rows y0..y1 as RGBA bytes, with a fine dither */
  function gRows(R,y0,y1,out){ const {W,G,F,xi,xw,it}=R, fw=F.w, fh=F.h, d=F.d, base=rgb(it.base), pg=R.page; let s=(y0*2654435761+W*40503+12345)>>>0||1, p=0;
    const cx=G.x+G.w/2, cy=G.y+G.h/2, hw=G.w/2, hh=G.h/2, rr=Math.min(hw,hh), top=it.dir==="top", sm=R.smax;
    for(let y=y0;y<y1;y++){ const v=clamp(((y+.5)-G.y)/G.h*fh-.5,0,fh-1.001), yi=Math.floor(v), wy=v-yi, r0=yi*fw*3, r1=r0+fw*3, py=y+.5;
      for(let x=0;x<W;x++,p+=4){ let al=1;
        if(R.shape){ const px=x+.5, qx=Math.abs(px-cx)-hw+rr, qy=Math.abs(py-cy)-hh+rr, sd=Math.hypot(Math.max(qx,0),Math.max(qy,0))+Math.min(Math.max(qx,qy),0)-rr, t=top?clamp((py-G.y)/G.h,0,1):clamp((G.x+G.w-px)/G.w,0,1), sg=t*sm;
          al=sg<.6?clamp(.5-sd,0,1):sd>3.4*sg?0:sd<-3.4*sg?1:1/(1+Math.exp(1.702*sd/sg));
          if(al<=0){ if(pg){ out[p]=pg[0]; out[p+1]=pg[1]; out[p+2]=pg[2]; out[p+3]=255; } else { out[p]=base[0]; out[p+1]=base[1]; out[p+2]=base[2]; out[p+3]=0; } continue; } }
        const i=xi[x], wx=xw[x], a=r0+i, b=r1+i;
        for(let c=0;c<3;c++){ const t0=d[a+c]+(d[a+3+c]-d[a+c])*wx, t1=d[b+c]+(d[b+3+c]-d[b+c])*wx; let val=t0+(t1-t0)*wy; if(pg) val=val*al+pg[c]*(1-al);
          s^=s<<13; s^=s>>>17; s^=s<<5; out[p+c]=Math.floor(val+(s>>>0)/4294967296); }
        if(pg||!R.shape) out[p+3]=255; else { s^=s<<13; s^=s>>>17; s^=s<<5; out[p+3]=Math.floor(al*255+(s>>>0)/4294967296); } } } }
  /* brightness of the gradient under a point of the format, 0..1: decides ink or white for the logo and the copy */
  function gLum(R,x,y){ if(R.shape) return 1; const F=R.F, i=(clamp(Math.round(y/R.o.h*F.h),0,F.h-1)*F.w+clamp(Math.round(x/R.o.w*F.w),0,F.w-1))*3; return (F.d[i]*.299+F.d[i+1]*.587+F.d[i+2]*.114)/255; }
  /* logo, copy and image frame, drawn on a transparent layer over the gradient */
  function tplOverlay(R,maxArea){ const o=R.o; if(o.layout==="grad") return null; const {w,h}=o, it=o.it, sc=R.K*Math.min(1,Math.sqrt((maxArea||16e6)/(R.W*R.H)));
    const cv=document.createElement("canvas"); cv.width=Math.max(1,Math.round(w*sc)); cv.height=Math.max(1,Math.round(h*sc)); const c=cv.getContext("2d"); c.scale(cv.width/w,cv.height/h);
    const m=Math.round(w*.07), rowH=(h-2*m)/12, colW=(w-2*m)/12, ar=o.lang==="ar", tiny=h<220||w<220, pad=m, dark=it.fam==="dark";
    const font=ar?"'Avenir Arabic','IBM Plex Sans Arabic',Arial,sans-serif":"'GT Walsheim','Figtree',Arial,sans-serif";
    const ink=(x,y)=>gLum(R,clamp(x,0,w),clamp(y,0,h))>.64?"#19181E":dark?"#FFFAF4":"#FFFFFF";
    const e=emblem(), vb=(e?.getAttribute("viewBox")||"0 0 84.53 82.12").split(/\s+/).map(Number), lg=Math.max(18,Math.min(tiny?h*.5:rowH*1.5,colW*2.4,h*.5)), k=lg/vb[3], lw=vb[2]*k;
    const side=ar?w-pad:pad, wide=w/h>2.4, fs=Math.round(tiny?Math.min(h*.34,w*.07):wide?Math.min(h*.2,w*.05):Math.min(w*.092,h*.085)), fs2=Math.round(fs*.4), head=o.head||(ar?"عنوان رئيسي":"Headline goes here"), sub=o.sub||(ar?"عنوان فرعي قصير":"A short supporting line");
    if(o.layout==="image"&&!tiny&&it.kind!=="shape"){ const land=w>=h*1.15, iw=land?(w-2*pad)*.46:w-2*pad, ih=land?h-2*pad:(h-2*pad)*.48, ix=land?(ar?pad:w-pad-iw):pad, iy=land?pad:h-pad-ih, rad=Math.round(Math.min(iw,ih)*.06);
      c.fillStyle="#CCC3B4"; c.beginPath(); if(c.roundRect) c.roundRect(ix,iy,iw,ih,rad); else c.rect(ix,iy,iw,ih); c.fill(); c.fillStyle="#4F4E62"; c.font=`400 ${Math.round(fs2*.8)}px ${font}`; c.textAlign="center"; c.direction="ltr"; c.fillText("Image",ix+iw/2,iy+ih/2); }
    /* signature position: logo at the bottom on the language's side; the address sits in the opposite bottom corner */
    const ly=tiny?(h-lg)/2:h-pad-lg, lx=tiny?(ar?pad:w-pad-lw):(ar?w-pad-lw:pad);
    if(e){ c.save(); c.translate(lx,ly); c.scale(k,k); c.fillStyle=ink(lx+lw/2,ly+lg/2); for(const p of e.querySelectorAll("path")) c.fill(new Path2D(p.getAttribute("d"))); c.restore(); }
    if(o.layout!=="logo"){ const ty=tiny?h/2+fs*.34:pad+fs, tx=tiny?(ar?w-pad:pad):side, dirx=ar?-1:1; c.direction=ar?"rtl":"ltr"; c.textAlign=ar?"right":"left"; c.fillStyle=ink(tx+dirx*fs*2.5,ty-fs*.35);
      c.font=`400 ${fs}px ${font}`; try{ c.letterSpacing=ar?"0px":(-fs*.02).toFixed(2)+"px"; }catch{} c.fillText(head,tx,ty); try{ c.letterSpacing="0px"; }catch{}
      if(!tiny){ c.font=`400 ${fs2}px ${font}`; c.fillText(sub,side,pad+fs+fs2*1.9); }
      if(!tiny&&!wide){ const axp=ar?pad:w-pad; c.font=`400 ${Math.max(11,Math.round(fs2*.5))}px 'GT Walsheim','Figtree',Arial,sans-serif`; c.direction="ltr"; c.textAlign=ar?"left":"right"; c.fillStyle=ink(axp+(ar?1:-1)*fs2*3,h-pad-4); c.fillText("www.bankaletihad.com",axp,h-pad-2); } }
    return cv; }
  /* the overlay, resampled for rows y0..y1 of the output and laid over the gradient bytes */
  function ovRows(R,ov,y0,y1,out,tmp){ const W=R.W, n=y1-y0, ky=ov.height/R.H; tmp.width=W; tmp.height=n; const c=tmp.getContext("2d",{willReadFrequently:true}); c.clearRect(0,0,W,n); c.imageSmoothingQuality="high"; c.drawImage(ov,0,y0*ky,ov.width,n*ky,0,0,W,n); const s=c.getImageData(0,0,W,n).data;
    for(let i=0;i<s.length;i+=4){ const a=s[i+3]/255; if(!a) continue; const u=1-a; out[i]=s[i]*a+out[i]*u; out[i+1]=s[i+1]*a+out[i+1]*u; out[i+2]=s[i+2]*a+out[i+2]*u; out[i+3]=Math.min(255,s[i+3]+out[i+3]*u); } }
  /* draw a format on a canvas (preview, thumbnails) */
  function gCanvas(cv,o,W,H,res){ cv.width=W; cv.height=H; const R=gPrep(o,W,H,res), c=cv.getContext("2d"), im=c.createImageData(W,H); gRows(R,0,H,im.data); c.putImageData(im,0,0); const ov=tplOverlay(R); if(ov){ c.imageSmoothingQuality="high"; c.drawImage(ov,0,0,W,H); } return R; }
  /* a PNG written row by row, so an 8K file never needs an 8K canvas and the transparent edge keeps its exact values */
  const CRC=(()=>{ const t=new Uint32Array(256); for(let n=0;n<256;n++){ let c=n; for(let k=0;k<8;k++) c=c&1?0xEDB88320^(c>>>1):c>>>1; t[n]=c>>>0; } return t; })();
  const crc=(parts)=>{ let c=0xFFFFFFFF; for(const u of parts) for(let i=0;i<u.length;i++) c=CRC[(c^u[i])&255]^(c>>>8); return (c^0xFFFFFFFF)>>>0; };
  const chunk=(type,data)=>{ const t=new TextEncoder().encode(type), len=new Uint8Array(4), cc=new Uint8Array(4); new DataView(len.buffer).setUint32(0,data.length); new DataView(cc.buffer).setUint32(0,crc([t,data])); return [len,t,data,cc]; };
  const tick=()=>new Promise(r=>setTimeout(r,0));
  async function tplPNG(o,maxSide,onp){ const K=maxSide?Math.max(1,maxSide/Math.max(o.w,o.h)):1, W=Math.round(o.w*K), H=Math.round(o.h*K), R=gPrep(o,W,H,640), ov=tplOverlay(R), tmp=ov?document.createElement("canvas"):null, STRIP=96, bpp=R.alpha?4:3;
    if(!window.CompressionStream){ const k2=Math.min(1,Math.sqrt(16e6/(W*H))), cv=document.createElement("canvas"); gCanvas(cv,o,Math.round(W*k2),Math.round(H*k2),640); return await new Promise(r=>cv.toBlob(r,"image/png")); }
    const cs=new CompressionStream("deflate"), wr=cs.writable.getWriter(), z=[]; const rd=(async()=>{ const r=cs.readable.getReader(); for(;;){ const {done,value}=await r.read(); if(done) break; z.push(value); } })();
    const px=new Uint8ClampedArray(W*STRIP*4);
    for(let y0=0;y0<H;y0+=STRIP){ const y1=Math.min(H,y0+STRIP), n=y1-y0, view=px.subarray(0,n*W*4); gRows(R,y0,y1,view); if(ov) ovRows(R,ov,y0,y1,view,tmp);
      const line=new Uint8Array(n*(W*bpp+1)); let q=0, p=0; for(let y=0;y<n;y++){ line[q++]=0; if(bpp===4){ line.set(view.subarray(p,p+W*4),q); q+=W*4; p+=W*4; } else for(let x=0;x<W;x++,p+=4){ line[q++]=view[p]; line[q++]=view[p+1]; line[q++]=view[p+2]; } }
      await wr.write(line); if((y0/STRIP)%8===0){ onp?.(y1/H); await tick(); } }
    await wr.close(); await rd;
    const ih=new Uint8Array(13), dv=new DataView(ih.buffer); dv.setUint32(0,W); dv.setUint32(4,H); ih[8]=8; ih[9]=bpp===4?6:2;
    const parts=[new Uint8Array([137,80,78,71,13,10,26,10]),...chunk("IHDR",ih),...chunk("sRGB",new Uint8Array([0]))]; for(const u of z) parts.push(...chunk("IDAT",u)); parts.push(...chunk("IEND",new Uint8Array(0)));
    return new Blob(parts,{type:"image/png"}); }
  /* ----- Figma: the same build as editable layers. Written the way Figma itself writes an SVG (its own layer-blur filter), so a paste gives
     a frame with the base, one vector per organic shape with its gradient fill and its layer blur, the logo symbol and live text. ----- */
  const xml=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  function tplFig(o){ const {w,h}=o, it=o.it, G=geom(o), ref=Math.sqrt(G.w*G.h), ax=clamp(Math.pow(G.w/G.h,.25),.6,1.7), n=v=>+(+v).toFixed(2), shape=it.kind==="shape", solo=o.layout==="grad", u=it.k+"_"+w+"x"+h+"_"; let body="", defs="";
    o.blobs.forEach((q,i)=>{ const tn=TONES[q.t]||TONES.deep, R=q.s*ref/2, rr=q.r*Math.PI/180, c=Math.cos(rr), s=Math.sin(rr), cx=G.x+q.x*G.w, cy=G.y+q.y*G.h, tf=(x,y)=>{ const X=x*R*q.e, Y=y*R; return [cx+(X*c-Y*s)*ax,cy+(X*s+Y*c)/ax]; };
      let x0=1e9, y0=1e9, x1=-1e9, y1=-1e9; const d=BLOBS[q.b%BLOBS.length].replace(/(-?[\d.]+) (-?[\d.]+)/g,(m,a,b)=>{ const p=tf(+a,+b); x0=Math.min(x0,p[0]); y0=Math.min(y0,p[1]); x1=Math.max(x1,p[0]); y1=Math.max(y1,p[1]); return n(p[0])+" "+n(p[1]); });
      const an=q.a*Math.PI/180, g1=tf(-Math.cos(an),-Math.sin(an)), g2=tf(Math.cos(an),Math.sin(an)), sig=q.bl/2*ref/1080*BLUR_K, m=sig*2;
      defs+=(sig>.2?`<filter id="${u}blur${i}" x="${n(x0-m)}" y="${n(y0-m)}" width="${n(x1-x0+2*m)}" height="${n(y1-y0+2*m)}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="${n(sig)}" result="effect1_foregroundBlur_${i}"/></filter>\n`:"")+`<linearGradient id="${u}fill${i}" x1="${n(g1[0])}" y1="${n(g1[1])}" x2="${n(g2[0])}" y2="${n(g2[1])}" gradientUnits="userSpaceOnUse"><stop stop-color="${tn[1]}"/><stop offset="0.61" stop-color="${tn[2]}"/><stop offset="1" stop-color="${tn[3]}"/></linearGradient>\n`;
      body+=`<g id="Shape ${i+1} ${tn[0]}"${q.o<1?` opacity="${n(q.o)}"`:""}${sig>.2?` filter="url(#${u}blur${i})"`:""}><path d="${d}" fill="url(#${u}fill${i})"/></g>\n`; });
    defs+=`<clipPath id="${u}clip"><rect x="${n(G.x)}" y="${n(G.y)}" width="${n(G.w)}" height="${n(G.h)}"${shape?` rx="${n(Math.min(G.w,G.h)/2)}"`:""} fill="white"/></clipPath>\n`;
    let s=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">\n`+(shape&&!solo?`<rect id="Page Light Orange" width="${w}" height="${h}" fill="#FFFAF4"/>\n`:"")+`<g id="${xml(it.name)}" clip-path="url(#${u}clip)">\n<rect id="Base ${it.base}" x="${n(G.x)}" y="${n(G.y)}" width="${n(G.w)}" height="${n(G.h)}" fill="${it.base}"/>\n${body}</g>\n`;
    if(!solo){ const R=gPrep(o,48,Math.max(4,Math.round(48*h/w)),48), m=Math.round(w*.07), rowH=(h-2*m)/12, colW=(w-2*m)/12, ar=o.lang==="ar", tiny=h<220||w<220, pad=m, dark=it.fam==="dark";
      const font=ar?"Avenir Arabic, IBM Plex Sans Arabic, Arial, sans-serif":"GT Walsheim, Figtree, Arial, sans-serif", ink=(x,y)=>gLum(R,clamp(x,0,w),clamp(y,0,h))>.64?"#19181E":dark?"#FFFAF4":"#FFFFFF";
      const e=emblem(), vb=(e?.getAttribute("viewBox")||"0 0 84.53 82.12").split(/\s+/).map(Number), lg=Math.max(18,Math.min(tiny?h*.5:rowH*1.5,colW*2.4,h*.5)), k=lg/vb[3], lw=vb[2]*k;
      const side=ar?w-pad:pad, anchor=ar?"end":"start", wide=w/h>2.4, fs=Math.round(tiny?Math.min(h*.34,w*.07):wide?Math.min(h*.2,w*.05):Math.min(w*.092,h*.085)), fs2=Math.round(fs*.4), head=o.head||(ar?"عنوان رئيسي":"Headline goes here"), sub=o.sub||(ar?"عنوان فرعي قصير":"A short supporting line");
      if(o.layout==="image"&&!tiny&&!shape){ const land=w>=h*1.15, iw=land?(w-2*pad)*.46:w-2*pad, ih=land?h-2*pad:(h-2*pad)*.48, ix=land?(ar?pad:w-pad-iw):pad, iy=land?pad:h-pad-ih; s+=`<rect id="Image frame (replace the fill)" x="${n(ix)}" y="${n(iy)}" width="${n(iw)}" height="${n(ih)}" rx="${Math.round(Math.min(iw,ih)*.06)}" fill="#CCC3B4"/>\n`; }
      const ly=tiny?(h-lg)/2:h-pad-lg, lx=tiny?(ar?pad:w-pad-lw):(ar?w-pad-lw:pad);
      if(e) s+=`<g id="Logo symbol" transform="translate(${n(lx)} ${n(ly)}) scale(${k.toFixed(4)})" fill="${ink(lx+lw/2,ly+lg/2)}">${e.innerHTML}</g>\n`;
      if(o.layout!=="logo"){ const ty=tiny?h/2+fs*.34:pad+fs, tx=tiny?(ar?w-pad:pad):side, dx=ar?-1:1;
        s+=`<text id="Headline" x="${n(tx)}" y="${n(ty)}" font-family="${font}" font-size="${fs}" font-weight="400" letter-spacing="${ar?0:n(-fs*.02)}" fill="${ink(tx+dx*fs*2.5,ty-fs*.35)}" text-anchor="${anchor}">${xml(head)}</text>\n`;
        if(!tiny) s+=`<text id="Subhead" x="${n(side)}" y="${n(pad+fs+fs2*1.9)}" font-family="${font}" font-size="${fs2}" font-weight="400" fill="${ink(tx+dx*fs*2.5,ty-fs*.35)}" text-anchor="${anchor}">${xml(sub)}</text>\n`;
        if(!tiny&&!wide){ const axp=ar?pad:w-pad; s+=`<text id="Address" x="${n(axp)}" y="${n(h-pad-2)}" font-family="GT Walsheim, Figtree, Arial, sans-serif" font-size="${Math.max(11,Math.round(fs2*.5))}" fill="${ink(axp+(ar?1:-1)*fs2*3,h-pad-4)}" text-anchor="${ar?"start":"end"}">www.bankaletihad.com</text>\n`; } } }
    return s+`<defs>\n${defs}</defs>\n</svg>`; }
  /* ----- Illustrator: the gradient as a FREEFORM GRADIENT (colour points), a real .ai file. Illustrator has no open format for it, so the file is
     Samer's own saved sample (ai/freeform.gz.txt, its private data with the size and the colour points left as blanks) filled in here and wrapped
     in a PDF the way Illustrator saves an .ai. The page content of that PDF is a patch mesh of the same gradient (preview outside Illustrator). ----- */
  const MESH=[["few","Few",[3,2]],["mid","Medium",[4,3]],["many","Many",[6,4]]];
  const fSample=(F,u,v)=>{ const x=clamp(u*(F.w-1),0,F.w-1.001), y=clamp(v*(F.h-1),0,F.h-1.001), xi=Math.floor(x), yi=Math.floor(y), fx=x-xi, fy=y-yi, a=(yi*F.w+xi)*3, b=a+F.w*3; return [0,1,2].map(c=>{ const t0=F.d[a+c]+(F.d[a+3+c]-F.d[a+c])*fx, t1=F.d[b+c]+(F.d[b+3+c]-F.d[b+c])*fx; return clamp(t0+(t1-t0)*fy,0,255); }); };
  /* a PDF from a list of objects: a string, or [dictionary without the Length, bytes] for a stream */
  function pdfWrite(objs,root,info){ const te=new TextEncoder(), parts=[], offs=[]; let len=0; const put=x=>{ const u=typeof x==="string"?te.encode(x):x; parts.push(u); len+=u.length; };
    put("%PDF-1.6\n%âãÏÓ\n"); objs.forEach((o,i)=>{ offs[i]=len; put(`${i+1} 0 obj\n`); if(typeof o==="string") put(o); else { put(`<< ${o[0]} /Length ${o[1].length} >>\nstream\n`); put(o[1]); put("\nendstream"); } put("\nendobj\n"); });
    const xr=len; put(`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`+offs.map(o=>String(o).padStart(10,"0")+" 00000 n \n").join("")+`trailer\n<< /Size ${objs.length+1} /Root ${root} 0 R /Info ${info} 0 R >>\nstartxref\n${xr}\n%%EOF\n`); return parts; }
  /* the gradient as patch-mesh bytes (PDF shading type 6) */
  function meshBytes(F,w,h,nx,ny){ const X=i=>Math.round(i/nx*65535), Y=j=>Math.round((1-j/ny)*65535), data=new Uint8Array(nx*ny*61), dv=new DataView(data.buffer); let p=0;
    const pt=(x,y)=>{ dv.setUint16(p,x); dv.setUint16(p+2,y); p+=4; }, edge=(a,b)=>{ pt(a[0],a[1]); pt(Math.round(a[0]+(b[0]-a[0])/3),Math.round(a[1]+(b[1]-a[1])/3)); pt(Math.round(a[0]+(b[0]-a[0])*2/3),Math.round(a[1]+(b[1]-a[1])*2/3)); };
    for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ const A=[X(i),Y(j)], Bq=[X(i),Y(j+1)], C=[X(i+1),Y(j+1)], D=[X(i+1),Y(j)]; data[p++]=0; edge(A,Bq); edge(Bq,C); edge(C,D); edge(D,A);
      for(const [u,v] of [[i,j],[i,j+1],[i+1,j+1],[i+1,j]]){ const c=fSample(F,u/nx,v/ny); data[p++]=Math.round(c[0]); data[p++]=Math.round(c[1]); data[p++]=Math.round(c[2]); } } return data; }
  /* the colour points: an even grid, plus the lightest and the darkest spot when the grid misses them */
  function ffPoints(F,o,g){ const land=o.w>=o.h, nx=land?g[0]:g[1], ny=land?g[1]:g[0], P=[]; for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ const x=.05+.9*i/(nx-1), y=.05+.9*j/(ny-1); P.push({x,y,c:fSample(F,x,y)}); }
    const L=c=>c[0]*.299+c[1]*.587+c[2]*.114; let hi=null, lo=null; for(let y=0;y<F.h;y+=2) for(let x=0;x<F.w;x+=2){ const i=(y*F.w+x)*3, c=[F.d[i],F.d[i+1],F.d[i+2]], l=L(c), q={x:clamp(x/(F.w-1),.02,.98),y:clamp(y/(F.h-1),.02,.98),c,l}; if(!hi||l>hi.l) hi=q; if(!lo||l<lo.l) lo=q; }
    for(const q of [hi,lo]){ const near=P.reduce((m,p)=>Math.min(m,Math.hypot(p.x-q.x,p.y-q.y)),9), at=fSample(F,q.x,q.y); if(near>.12&&P.every(p=>Math.hypot(p.x-q.x,p.y-q.y)>.2||Math.abs(L(p.c)-q.l)>10)) P.push({x:q.x,y:q.y,c:at}); }
    return P; }
  let ffTpl=null;
  async function ffTemplate(){ if(ffTpl) return ffTpl; const t=await (await fetch("ai/freeform.gz.txt")).text(), bin=atob(t.trim()), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i);
    const raw=new Uint8Array(await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()); let s=""; for(let i=0;i<raw.length;i+=32768) s+=String.fromCharCode.apply(null,raw.subarray(i,i+32768)); return ffTpl=s; } /* byte for byte: the browser's "latin1" decoder is windows-1252 and would change 0x80–0x9F */
  async function tplFreeform(o,g){ const {w,h}=o, it=o.it, F=gField(it,o.blobs,w,h,240), P=ffPoints(F,o,g), n=v=>String(+(+v).toFixed(6)), ox=n(8191-w/2), oy=n(8191-h/2);
    const pts=P.map(p=>{ const [r,gg,b]=p.c.map(v=>v/255), k=1-Math.max(r,gg,b), f=v=>k>=1?0:(1-v-k)/(1-k); return `${n(f(r))} ${n(f(gg))} ${n(f(b))} ${n(k)} ${n(r)} ${n(gg)} ${n(b)} Xa\r1 1 0 ${n(p.x)} ${n(p.y)}\r/ColorPoint ,\r`; }).join("");
    const rep={BB:`-5 -${h+5} ${w+5} 5`,W:String(w),H:String(h),TB:`${w/2+.5} -${h/2+.5} ${w/2+.5} -${h/2+.5}`,TILE:`${w/2-391.5} -${h/2+279.5} ${w/2+391.5} -${h/2-279.5}`,OX:ox,OY:oy,N:String(P.length),PTS:pts};
    const txt=(await ffTemplate()).replace(/@(BB|W|H|TB|TILE|OX|OY|N|PTS)@/g,(m,k)=>rep[k]), priv=new Uint8Array(txt.length); for(let i=0;i<txt.length;i++) priv[i]=txt.charCodeAt(i)&255;
    const metaEnd=txt.indexOf("%%EndComments\r")+14, SZ=65536, blocks=[]; for(let i=0;i<priv.length;i+=SZ) blocks.push(priv.subarray(i,Math.min(priv.length,i+SZ)));
    const long=Math.max(w,h), nx=Math.max(2,Math.round(12*w/long)), ny=Math.max(2,Math.round(12*h/long)), d=new Date(), z=x=>String(x).padStart(2,"0"), stamp=`(D:${d.getUTCFullYear()}${z(d.getUTCMonth()+1)}${z(d.getUTCDate())}${z(d.getUTCHours())}${z(d.getUTCMinutes())}${z(d.getUTCSeconds())}Z)`, box=`[0 0 ${w} ${h}]`, te=new TextEncoder();
    const objs=["<< /Type /Catalog /Pages 2 0 R >>","<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      `<< /Type /Page /Parent 2 0 R /MediaBox ${box} /CropBox ${box} /BleedBox ${box} /TrimBox ${box} /ArtBox ${box} /Resources << /Shading << /Sh0 5 0 R >> >> /Contents 4 0 R /LastModified ${stamp} /PieceInfo << /Illustrator << /LastModified ${stamp} /Private 7 0 R >> >> >>`,
      ["",te.encode(`q 0 0 ${w} ${h} re W n /Sh0 sh Q`)],[`/ShadingType 6 /ColorSpace /DeviceRGB /BitsPerCoordinate 16 /BitsPerComponent 8 /BitsPerFlag 8 /Decode [0 ${w} 0 ${h} 0 1 0 1 0 1]`,meshBytes(F,w,h,nx,ny)],
      `<< /Title (${tplName(o)}) /Creator (Adobe Illustrator 30.0 \\(BAE Studio\\)) /Producer (BAE Studio) /CreationDate ${stamp} /ModDate ${stamp} >>`,
      `<< /AIMetaData 8 0 R ${blocks.map((b,i)=>`/AIPrivateData${i+1} ${9+i} 0 R`).join(" ")} /ContainerVersion 12 /CreatorVersion 30 /NumBlock ${blocks.length} /RoundtripVersion 24 >>`,
      ["",priv.subarray(0,metaEnd)],...blocks.map(b=>["",b])];
    return {blob:new Blob(pdfWrite(objs,1,6),{type:"application/illustrator"}),n:P.length}; }
  /* ----- state, names ----- */
  const cur=(over)=>{ const f=FLAT[TP.fmt], it=item(TP.item); return {...f,it,blobs:blobs(),layout:TP.layout,lang:TP.lang,head:TP.head,sub:TP.sub,...over}; };
  const tplName=o=>{ const it=o.it, rk=ratioKey(o.w,o.h); let n=it.file.replace("{r}",rk); if(it.kind==="shape"&&!(o.layout==="grad")) n+="_"+rk; if(o.custom) n+="_custom"; if(o.layout!=="grad") n+="_"+o.layout+"_"+o.lang.toUpperCase(); return n; };
  const qSide=()=>QUAL.find(q=>q[0]===TP.q)?.[2]||0;
  const outSize=o=>{ const s=qSide(), K=s?Math.max(1,s/Math.max(o.w,o.h)):1; return [Math.round(o.w*K),Math.round(o.h*K)]; };
  /* blob centre and outline, in format pixels */
  function bGeo(o,q){ const G=geom(o), ref=Math.sqrt(G.w*G.h), ax=clamp(Math.pow(G.w/G.h,.25),.6,1.7), R=q.s*ref/2; return {cx:G.x+q.x*G.w,cy:G.y+q.y*G.h,tr:`translate(${(G.x+q.x*G.w).toFixed(1)} ${(G.y+q.y*G.h).toFixed(1)}) scale(${ax.toFixed(4)} ${(1/ax).toFixed(4)}) rotate(${q.r}) scale(${(R*q.e).toFixed(2)} ${R.toFixed(2)})`}; }
  const toneCss=t=>{ const n=TONES[t]||TONES.deep; return `linear-gradient(135deg,${n[1]} 0%,${n[2]} 61%,${n[3]} 100%)`; };
  /* ----- gallery thumbnails: the whole library side by side, in the chosen size ----- */
  const thumbs=new Map(); let thumbRun=0;
  function thumbQueue(){ const run=++thumbRun, f=FLAT[TP.fmt], k=180/Math.max(f.w,f.h), W=Math.max(24,Math.round(f.w*k)), H=Math.max(24,Math.round(f.h*k)); const todo=[...document.querySelectorAll("#biTplBody [data-tpthumb]")];
    const step=()=>{ if(run!==thumbRun) return; const el=todo.shift(); if(!el) return; const it=item(el.dataset.tpthumb), key=it.k+"|"+f.w+"x"+f.h; let u=thumbs.get(key);
      if(!u){ const cv=document.createElement("canvas"); gCanvas(cv,{...f,it,blobs:it.blobs,layout:"grad",lang:"en"},W*2,H*2,72); u=cv.toDataURL("image/png"); thumbs.set(key,u); if(thumbs.size>400) thumbs.delete(thumbs.keys().next().value); }
      if(el.isConnected) el.src=u; (todo.length?setTimeout:()=>{})(step,0); }; step(); }
  /* ----- stage ----- */
  let paintT=0;
  function tplPaint(fast){ const cv=$("tpCv"); if(!cv) return; const o=cur(), k=Math.min(1,(fast?640:1100)/Math.max(o.w,o.h)); gCanvas(cv,o,Math.max(16,Math.round(o.w*k)),Math.max(16,Math.round(o.h*k)),fast?150:300);
    const ol=$("tpOl"), q=o.blobs[TP.sel]; if(ol) ol.innerHTML=q?`<path d="${BLOBS[q.b%BLOBS.length]}" transform="${bGeo(o,q).tr}" vector-effect="non-scaling-stroke" class="a"/><path d="${BLOBS[q.b%BLOBS.length]}" transform="${bGeo(o,q).tr}" vector-effect="non-scaling-stroke" class="b"/>`:""; }
  const tplSoon=fast=>{ cancelAnimationFrame(paintT); paintT=requestAnimationFrame(()=>tplPaint(fast)); };
  const hpos=(o,q)=>{ const g=bGeo(o,q); return [clamp(g.cx/o.w*100,1,99),clamp(g.cy/o.h*100,1,99)]; };
  function tplDraw(){ const box=$("biTplBody"); if(!box) return; const o=cur(), it=o.it, L=o.blobs, sel=L[TP.sel], [ow,oh]=outSize(o), groups=[...new Set(LIB.map(i=>i.g))];
    const rng=(id,label,min,max,val,unit)=>`<label class="t12">${label}<input type="range" id="${id}" min="${min}" max="${max}" value="${Math.round(val)}"><output>${Math.round(val)}${unit||""}</output></label>`;
    box.innerHTML=`
      <div class="tp-ask"><label class="lbl" for="tpAsk">Ask for a file</label><div class="row"><input class="rl-field" id="tpAsk" dir="auto" value="${esc(TP.ask)}" placeholder="e.g. a dark gradient background for a story, light in the bottom corner"><button type="button" class="btn small primary" data-tp="ask" ${TP.busy?"disabled":""}>${TP.busy||"Make it"}</button></div>${TP.err?`<span class="t12 bad" role="alert">${esc(TP.err)}</span>`:""}${TP.note?`<span class="t12" dir="auto" data-noi18n>${esc(TP.note)}</span>`:""}</div>
      <div class="tp-top"><div><label class="lbl" for="tpFmt">Size</label><select class="rl-field" id="tpFmt">${FORMATS.map(g=>`<optgroup label="${g[0]}">${g[1].map(f=>{ const i=FLAT.findIndex(x=>x.name===f[0]&&x.g===g[0]); return `<option value="${i}" ${i===TP.fmt?"selected":""}>${f[0]} · ${f[1]}×${f[2]}</option>`; }).join("")}</optgroup>`).join("")}</select></div><p class="t12 muted">The whole gradient library in this size. Pick one to edit and download it.</p></div>
      <div class="tp-lib">${groups.map(g=>`<div class="tp-group"><span class="lbl">${g}</span><div class="tp-cards">${LIB.filter(i=>i.g===g).map(i=>`<button type="button" class="tp-card${i.kind==="shape"?" clear":""}" data-tpitem="${i.k}" aria-pressed="${i.k===TP.item}"><span class="pv" style="aspect-ratio:${o.w}/${o.h}"><img data-tpthumb="${i.k}" alt="" ${thumbs.get(i.k+"|"+o.w+"x"+o.h)?`src="${thumbs.get(i.k+"|"+o.w+"x"+o.h)}"`:""}></span><b>${i.name}</b></button>`).join("")}</div></div>`).join("")}</div>
      <div class="tp-grid">
        <div class="tp-side">
          <span class="lbl">Content</span><div class="tp-chips">${LAYOUTS.map(([k,l])=>`<button type="button" class="br-topic" data-tplay="${k}" aria-pressed="${TP.layout===k}">${l}</button>`).join("")}</div>
          ${TP.layout!=="grad"?`<div class="a-seg" role="group" aria-label="Language"><button type="button" data-tplang="en" aria-pressed="${TP.lang==="en"}">English</button><button type="button" data-tplang="ar" aria-pressed="${TP.lang==="ar"}">العربية</button></div>`:""}
          ${TP.layout==="copy"||TP.layout==="image"?`<input class="rl-field" id="tpHead" dir="auto" value="${esc(TP.head)}" placeholder="Headline (optional)" aria-label="Headline"><input class="rl-field" id="tpSub" dir="auto" value="${esc(TP.sub)}" placeholder="Subhead (optional)" aria-label="Subhead">`:""}
          <span class="lbl">Shapes in this gradient</span>
          <div class="tp-layers">${L.map((q,i)=>`<button type="button" class="tp-layer" data-tpsel="${i}" aria-pressed="${i===TP.sel}"><i style="background:${toneCss(q.t)}"></i><span>${i+1} · ${(TONES[q.t]||TONES.deep)[0]}</span></button>`).join("")}</div>
          <div class="tp-chips"><button type="button" class="br-topic" data-tp="add">Add shape</button><button type="button" class="br-topic" data-tp="shuffle">Shuffle</button><button type="button" class="br-topic" data-tp="mirror">Mirror</button><button type="button" class="br-topic" data-tp="reset" ${TP.custom?"":"disabled"}>Reset</button></div>
          <p class="t12 muted">Step 1 is the solid ${it.base} base. The list goes from the bottom layer to the top: dark first, lighter on top.</p>
        </div>
        <div class="tp-main">
          <div class="tp-stage${it.kind==="shape"&&TP.layout==="grad"?" clear":""}" id="tpStage" style="aspect-ratio:${o.w}/${o.h};max-width:min(100%,calc(62vh * ${(o.w/o.h).toFixed(4)}))"><canvas id="tpCv"></canvas><svg id="tpOl" class="tp-ol" viewBox="0 0 ${o.w} ${o.h}" preserveAspectRatio="none" aria-hidden="true"></svg>${L.map((q,i)=>{ const [hx,hy]=hpos(o,q); return `<button type="button" class="tp-pt${i===TP.sel?" on":""}" data-tppt="${i}" style="left:${hx}%;top:${hy}%;background:${toneCss(q.t)}" aria-label="Shape ${i+1}, drag to move">${i+1}</button>`; }).join("")}</div>
          <p class="t12 muted"><b data-noi18n>${esc(tplName({...o,custom:TP.custom}))}.png</b> · ${o.w} × ${o.h} px. Drag a numbered handle to move that shape. Select it to change the shape itself.</p>
          <div class="tp-pt-ed">${sel?`<div class="tp-edrow"><span class="t12"><b>Shape ${TP.sel+1}</b></span><div class="tp-forms">${BLOBS.map((d,i)=>`<button type="button" data-tpform="${i}" aria-pressed="${sel.b%BLOBS.length===i}" aria-label="Organic shape ${i+1}"><svg viewBox="-1.1 -1.1 2.2 2.2"><path d="${d}"/></svg></button>`).join("")}</div><div class="tp-sw">${FAMS[it.fam].tones.map(t=>`<button type="button" data-tptone="${t}" style="background:${toneCss(t)}" title="${TONES[t][0]}" aria-label="${TONES[t][0]}" aria-pressed="${sel.t===t}"></button>`).join("")}</div></div>
            <div class="tp-edrow">${rng("tpS","Size",5,220,sel.s*100,"%")}${rng("tpRot","Rotation",-180,180,sel.r,"°")}${rng("tpE","Stretch",50,300,sel.e*100,"%")}${rng("tpBl","Blur",0,200,sel.bl)}${rng("tpA","Fill angle",0,360,((sel.a%360)+360)%360,"°")}${rng("tpO","Strength",10,100,sel.o*100,"%")}</div>
            <div class="tp-edrow"><button type="button" class="btn small" data-tp="up">Bring forward</button><button type="button" class="btn small" data-tp="down">Send back</button><button type="button" class="btn small" data-tp="dup">Duplicate</button><button type="button" class="bi-x" data-tp="del">Remove shape</button></div>`:`<span class="t12 muted">No shape selected. Pick a handle on the image or a layer in the list.</span>`}</div>
          <div class="tp-out"><span class="lbl">PNG quality</span><div class="a-seg" role="group" aria-label="PNG quality">${QUAL.map(([k,l])=>`<button type="button" data-tpq="${k}" aria-pressed="${TP.q===k}">${l}</button>`).join("")}</div><span class="t12 muted">${ow} × ${oh} px${it.kind==="shape"&&TP.layout==="grad"?" · transparent background":""} · fine dither, no banding</span></div>
          ${it.kind!=="shape"?`<div class="tp-out"><span class="lbl">Illustrator freeform gradient</span><div class="a-seg" role="group" aria-label="Colour points">${MESH.map(([k,l])=>`<button type="button" data-tpmesh="${k}" aria-pressed="${TP.mesh===k}">${l}</button>`).join("")}</div><button type="button" class="btn small primary" data-tp="ff">Download .ai for Illustrator</button><span class="t12 muted">A real Illustrator file with one Freeform Gradient: colour points you move and recolour with the Gradient tool (G). It downloads as a ZIP with the .ai inside.</span></div>`:""}
          <div class="rl-btns"><button type="button" class="btn small primary" data-tp="fig">Copy for Figma</button><button type="button" class="btn small" data-tp="svg">Download SVG</button><button type="button" class="btn small" data-tp="png">Download PNG</button><button type="button" class="btn small" data-tp="copy">Copy as image</button><button type="button" class="btn small" data-tp="zip">All sizes as ZIP</button><button type="button" class="btn small" data-tp="set">Official set as ZIP</button></div>
          <p class="t12 muted"><b>Copy for Figma</b> pastes an open file (⌘V / Ctrl+V on the canvas): the base colour, every organic shape as a vector with its gradient fill and its layer blur, the logo symbol and live text, all editable. ${it.kind==="shape"?"The soft side of a circle or lozenge is a progressive blur: in Figma, select the group and add Layer blur, Progressive. ":""}Download SVG is the same file to drag into Figma. The organic shapes here are drawn close to the guideline; they are not the official library shapes. Use only the official logo lockups from Assets for final work.</p>
        </div>
      </div>`;
    tplPaint(); thumbQueue(); if(typeof uxT==="function") uxT(box); }
  const pick=k=>{ TP.item=k; TP.blobs=null; TP.custom=false; TP.sel=-1; const it=item(k); if(TP.layout==="image"&&it.kind==="shape") TP.layout="copy"; if(/_ar$/.test(k)) TP.lang="ar"; else if(/_en$/.test(k)) TP.lang="en"; };
  async function tplAsk(){ const q=($("tpAsk")?.value||"").trim(); TP.ask=q; if(!q) return; if(!sample){ TP.err="This needs Claude, which isn't connected in this view."; tplDraw(); return; } TP.busy="Thinking…"; TP.err=""; TP.note=""; tplDraw();
    try{ const r=await rlAsk(`You set up a Bank al Etihad gradient file from a request (any language): "${q.slice(0,500)}".
Sizes (use the exact name): ${FLAT.map(f=>`${f.name} ${f.w}x${f.h}`).join("; ")}.
Library (use the exact key): ${LIB.map(i=>`${i.k} = ${i.name} (${i.g})`).join("; ")}.
How to choose: orange_* is the hero full-bleed background (dark masses at corners and edges, clean orange middle, one small light highlight at an edge). frame_* is the soft L frame: 01 has the gradient on the bottom and one side with the light area at the top on the reading side, 02 is the inverse; _en for English layouts, _ar for Arabic. stone_* is the calm stone frame. dark_* is ONLY for internal communications and corporate or high-earning audiences. circle / loz_h / loz_v are shapes for image-led layouts on a transparent background: _1 is sharp at the top and soft at the bottom, _2 is sharp on the right and soft on the left.
layout: grad (gradient only), logo, copy (logo + headline + subhead), image (image frame + copy, not for shapes).
The gradient is built from blurred organic shapes filled with a linear gradient, darker shapes first and lighter on top, one colour family only. Return "shapes" ONLY when the request asks to move or change something (for example "light in the bottom corner", "darker at the top"); otherwise return an empty list and the library version is used. Each shape: b = organic shape 0 to ${BLOBS.length-1}, x and y = centre from 0 to 1 inside the gradient area (0,0 is top left, values slightly outside are allowed), s = size 0.15 to 1.5, r = rotation in degrees, e = stretch 1 to 2.2, t = tone, bl = blur 60 to 120, o = strength 0.4 to 1. Tones by family — orange: deep, mid, light, glow, cream · stone: sdark, stone, cream, glow · dark: ndeep, nmid, nlight, nglow. Use 3 to 6 shapes; big dark ones at corners and edges, small light ones last.
Return ONLY JSON: {"size":"exact size name","item":"library key","layout":"grad|logo|copy|image","lang":"en|ar","headline":"","subhead":"","shapes":[{"b":0,"x":0,"y":0,"s":1,"r":0,"e":1.5,"t":"deep","bl":90,"o":1}],"note":"one short sentence in the user's language on what you made"}`,{modelTier:"quick",cache:false});
      const i=FLAT.findIndex(f=>f.name.toLowerCase()===String(r?.size||"").toLowerCase()); if(i>=0) TP.fmt=i; if(LIB.some(x=>x.k===r?.item)) pick(r.item); if(LAYOUTS.some(l=>l[0]===r?.layout)) TP.layout=r.layout; if(r?.lang==="ar"||r?.lang==="en") TP.lang=r.lang; TP.head=String(r?.headline||""); TP.sub=String(r?.subhead||"");
      const it=item(TP.item); if(TP.layout==="image"&&it.kind==="shape") TP.layout="copy"; const ok=FAMS[it.fam].tones, n=(v,a,b,d)=>isFinite(+v)?clamp(+v,a,b):d;
      const L=(Array.isArray(r?.shapes)?r.shapes:[]).filter(s=>isFinite(+s?.x)&&isFinite(+s?.y)).slice(0,8).map((s,k)=>({b:Math.abs(Math.round(+s.b||0))%BLOBS.length,x:n(s.x,-.3,1.3,.5),y:n(s.y,-.3,1.3,.5),s:n(s.s,.05,2.2,.6),r:n(s.r,-180,180,0),e:n(s.e,.5,3,1.4),t:ok.includes(s.t)?s.t:ok[Math.min(k,1)],a:n(s.a,0,360,35),bl:n(s.bl,0,200,90),o:n(s.o,.1,1,1)}));
      if(L.length>=2){ TP.blobs=L; TP.custom=true; } TP.note=String(r?.note||"").slice(0,240);
    }catch(e){ TP.err=e?.code==="rate_limited"?"Too many requests. Try again in a minute.":"Couldn't set that up. Try again."; }
    TP.busy=""; tplDraw(); }
  const flash=(a,msg,back)=>{ a.textContent=msg; setTimeout(()=>{ if(a.isConnected) a.textContent=back; },2600); };
  const OFFICIAL=[["9x16",1080,1920],["3x4",1080,1440],["1x1",1080,1080],["16x9",1920,1080]];
  P.addEventListener("click",async e=>{ const t=e.target; if(!t.closest("#biTplBody")) return;
    const ib=t.closest("[data-tpitem]"); if(ib){ pick(ib.dataset.tpitem); tplDraw(); $("tpStage")?.scrollIntoView({block:"nearest",behavior:"smooth"}); return; }
    const la=t.closest("[data-tplay]"); if(la){ TP.layout=la.dataset.tplay; if(TP.layout==="image"&&item(TP.item).kind==="shape") TP.layout="copy"; tplDraw(); return; }
    const lg=t.closest("[data-tplang]"); if(lg){ TP.lang=lg.dataset.tplang; tplDraw(); return; }
    const mb=t.closest("[data-tpmesh]"); if(mb){ TP.mesh=mb.dataset.tpmesh; tplDraw(); return; }
    const qb=t.closest("[data-tpq]"); if(qb){ TP.q=qb.dataset.tpq; tplDraw(); return; }
    const sl=t.closest("[data-tpsel]"); if(sl){ TP.sel=TP.sel===+sl.dataset.tpsel?-1:+sl.dataset.tpsel; tplDraw(); return; }
    const fm=t.closest("[data-tpform]"); if(fm){ const q=blobs()[TP.sel]; if(q){ q.b=+fm.dataset.tpform; TP.custom=true; tplDraw(); } return; }
    const tn=t.closest("[data-tptone]"); if(tn){ const q=blobs()[TP.sel]; if(q){ q.t=tn.dataset.tptone; TP.custom=true; tplDraw(); } return; }
    const pt=t.closest("[data-tppt]"); if(pt){ if(TP.dragged){ TP.dragged=false; return; } TP.sel=+pt.dataset.tppt; tplDraw(); return; }
    const a=t.closest("[data-tp]"); if(!a) return; const k=a.dataset.tp, L=blobs(), it=item(TP.item), o=cur({custom:TP.custom});
    if(k==="shuffle"){ const R=(()=>{ let s=(++TP.seed*2654435761)>>>0||1; return ()=>{ s^=s<<13; s^=s>>>17; s^=s<<5; return (s>>>0)/4294967296-.5; }; })(); TP.blobs=clone(it.blobs).map(q=>({...q,b:Math.floor((R()+.5)*BLOBS.length)%BLOBS.length,x:q.x+R()*.1,y:q.y+R()*.1,r:q.r+R()*40,s:q.s*(1+R()*.2),e:clamp(q.e*(1+R()*.3),.6,2.6)})); TP.custom=true; TP.sel=-1; tplDraw(); }
    else if(k==="mirror"){ TP.blobs=mir(L); TP.custom=true; tplDraw(); }
    else if(k==="reset"){ TP.blobs=null; TP.custom=false; TP.sel=-1; tplDraw(); }
    else if(k==="add"){ const tones=FAMS[it.fam].tones; L.push(B(L.length%BLOBS.length,.5,.5,.4,0,1.3,tones[Math.min(2,tones.length-1)],35,90,1)); TP.sel=L.length-1; TP.custom=true; tplDraw(); }
    else if(k==="del"){ if(L.length>1&&L[TP.sel]){ L.splice(TP.sel,1); TP.sel=-1; TP.custom=true; tplDraw(); } }
    else if(k==="dup"){ const q=L[TP.sel]; if(q&&L.length<12){ L.splice(TP.sel+1,0,{...q,x:q.x+.06,y:q.y+.06}); TP.sel++; TP.custom=true; tplDraw(); } }
    else if(k==="up"||k==="down"){ const i=TP.sel, j=i+(k==="up"?1:-1); if(L[i]&&L[j]){ [L[i],L[j]]=[L[j],L[i]]; TP.sel=j; TP.custom=true; tplDraw(); } }
    else if(k==="ask") tplAsk();
    else if(k==="png"){ a.disabled=true; try{ const b=await tplPNG(o,qSide(),p=>{ a.textContent=`Rendering ${Math.round(p*100)}%`; }); if(b) await save(b,tplName(o)+".png"); }catch(err){ TP.err="Couldn't make the PNG in this browser. Try a smaller quality."; tplDraw(); return; } a.disabled=false; a.textContent="Download PNG"; }
    else if(k==="ff"){ if(!window.JSZip||!window.DecompressionStream){ TP.err="This browser can't build the Illustrator file. Try Chrome."; tplDraw(); return; } a.disabled=true; a.textContent="Building…"; try{ const x={...o,layout:"grad"}, m=await tplFreeform(x,MESH.find(q=>q[0]===TP.mesh)?.[2]||[4,3]), z=new JSZip(), nm=tplName(x)+"_freeform"; z.file(nm+".ai",m.blob); await save(await z.generateAsync({type:"blob",compression:"DEFLATE"}),nm+".zip"); }catch(err){ TP.err="Couldn't build the Illustrator file."; tplDraw(); return; } a.disabled=false; a.textContent="Download .ai for Illustrator"; }
    else if(k==="fig"){ let ok=false; try{ await navigator.clipboard.writeText(tplFig(o)); ok=true; }catch{} flash(a,ok?"Copied. Paste in Figma":"Copy blocked. Use Download SVG","Copy for Figma"); }
    else if(k==="svg") saveText(tplFig(o),tplName(o)+".svg","image/svg+xml");
    else if(k==="copy"){ a.disabled=true; a.textContent="Rendering…"; let ok=false; try{ const b=await tplPNG(o,Math.min(qSide(),3840)); await navigator.clipboard.write([new ClipboardItem({"image/png":b})]); ok=true; }catch{} a.disabled=false; flash(a,ok?"Image copied":"Copy blocked. Use Download PNG","Copy as image"); }
    else if(k==="zip"||k==="set"){ if(!window.JSZip){ TP.err="The zip library didn't load."; tplDraw(); return; } const label=a.textContent; a.disabled=true;
      try{ const z=new JSZip(), big=qSide()?2:1, jobs=[];
        if(k==="zip") for(const f of FLAT) jobs.push([f.g,{...o,...f},0,f.name.replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"")+"_"]);
        else for(const i of LIB){ if(i.kind==="shape"){ const d=i.form==="circle"?[1850,1850]:i.form==="loz_h"?[3200,1800]:[1300,2200]; jobs.push(["Shapes",{name:i.name,w:d[0],h:d[1],it:i,blobs:i.blobs,layout:"grad",lang:"en"},0]); } else for(const [rk,w,h] of OFFICIAL) jobs.push([i.g.split(" · ").reverse().join(" ").replace(/internal.*/,"Dark").trim()+"/"+rk,{name:i.name,w,h,it:i,blobs:i.blobs,layout:"grad",lang:"en"},Math.max(w,h)*big]); }
        let n=0; for(const [dir,x,side,pre] of jobs){ a.textContent=`Rendering ${++n} of ${jobs.length}`; z.folder(dir).file((pre||"")+tplName(x)+".png",await tplPNG(x,side)); await tick(); }
        a.textContent="Packing…"; await save(await z.generateAsync({type:"blob",compression:"STORE"}),k==="zip"?`${tplName({...o,w:0,h:0}).replace(/_0x0/,"")}_all_sizes.zip`:"BAE_gradients_official_set.zip"); }catch(err){ TP.err="Couldn't build the ZIP."; tplDraw(); return; }
      a.disabled=false; a.textContent=label; } });
  P.addEventListener("change",e=>{ const id=e.target.id; if(id==="tpFmt"){ TP.fmt=+e.target.value; tplDraw(); } else if(id==="tpHead"||id==="tpSub"){ TP.head=$("tpHead")?.value||""; TP.sub=$("tpSub")?.value||""; tplPaint(); } else if(/^tp(S|Rot|E|Bl|A|O)$/.test(id)) tplPaint(); });
  P.addEventListener("input",e=>{ const id=e.target.id, q=blobs()[TP.sel];
    if(/^tp(S|Rot|E|Bl|A|O)$/.test(id)&&q){ const v=+e.target.value; if(id==="tpS") q.s=v/100; else if(id==="tpRot") q.r=v; else if(id==="tpE") q.e=v/100; else if(id==="tpBl") q.bl=v; else if(id==="tpA") q.a=v; else q.o=v/100; TP.custom=true; const out=e.target.nextElementSibling; if(out) out.textContent=v+(id==="tpBl"?"":id==="tpRot"||id==="tpA"?"°":"%"); tplSoon(true); }
    else if(id==="tpAsk") TP.ask=e.target.value; else if(id==="tpHead"||id==="tpSub"){ TP.head=$("tpHead")?.value||""; TP.sub=$("tpSub")?.value||""; tplSoon(true); } });
  P.addEventListener("keydown",e=>{ if(e.target.id==="tpAsk"&&e.key==="Enter"){ e.preventDefault(); tplAsk(); } const pt=e.target.closest?.("[data-tppt]"); if(pt&&/^Arrow/.test(e.key)){ e.preventDefault(); const i=+pt.dataset.tppt, q=blobs()[i], d=e.shiftKey?.05:.01; if(e.key==="ArrowLeft") q.x-=d; if(e.key==="ArrowRight") q.x+=d; if(e.key==="ArrowUp") q.y-=d; if(e.key==="ArrowDown") q.y+=d; TP.custom=true; TP.sel=i; const [hx,hy]=hpos(cur(),q); pt.style.left=hx+"%"; pt.style.top=hy+"%"; tplSoon(true); } });
  P.addEventListener("pointerdown",e=>{ const pt=e.target.closest?.("[data-tppt]"); if(!pt) return; const i=+pt.dataset.tppt, st=$("tpStage"), q=blobs()[i]; if(!st||!q) return; pt.setPointerCapture(e.pointerId); let moved=false; const sx=e.clientX, sy=e.clientY, x0=q.x, y0=q.y;
    const mv=ev=>{ if(!moved&&Math.hypot(ev.clientX-sx,ev.clientY-sy)<3) return; const r=st.getBoundingClientRect(), o=cur(), G=geom(o); q.x=clamp(x0+(ev.clientX-sx)/r.width*o.w/G.w,-.5,1.5); q.y=clamp(y0+(ev.clientY-sy)/r.height*o.h/G.h,-.5,1.5); const [hx,hy]=hpos(o,q); pt.style.left=hx+"%"; pt.style.top=hy+"%"; moved=true; TP.custom=true; TP.sel=i; tplSoon(true); };
    const up=()=>{ pt.removeEventListener("pointermove",mv); pt.removeEventListener("pointerup",up); pt.removeEventListener("pointercancel",up); if(moved){ TP.dragged=true; setTimeout(()=>{ TP.dragged=false; tplDraw(); },0); } };
    pt.addEventListener("pointermove",mv); pt.addEventListener("pointerup",up); pt.addEventListener("pointercancel",up); });
  /* ---------- page ---------- */
  const G={w:1080,h:1920,mode:"rgb"};
  function gridHTML(){ const m=Math.round(G.w*.07), cw=(G.w-2*m)/12, rh=(G.h-2*m)/12; return `<div class="bi-gridres"><div><b>${m} px</b><span>Margin (7% of width)</span></div><div><b>${cw.toFixed(1)} px</b><span>Column width (12)</span></div><div><b>${rh.toFixed(1)} px</b><span>Row height (12)</span></div><div><b>${Math.round(G.w-2*m)} × ${Math.round(G.h-2*m)}</b><span>Safe area</span></div></div>`; }
  function draw(){
    const sc=P.scrollTop;
    body.innerHTML=`
    <nav class="bi-nav" aria-label="Sections">${[["biColour","Colour"],["biLogo","Logo"],["biType","Typography"],["biGrid","Grid"],["biRules","Gradient, illustration, photo"],["biMotion","Motion"],["biTpl","Templates"],["biAssets","Assets"]].map(([id,l])=>`<a href="#${id}" data-jump="${id}">${l}</a>`).join("")}</nav>
    <section class="bi-card bi-concept"><div><span class="t12 muted">Creative concept</span><h3>Deep Clarity</h3><p>Three layers of structured intelligence, moving from depth to surface, from indistinct to certain.</p></div><div class="bi-pillars"><div><b>Intelligence</b><span>Proactive · precise · adaptive · clear</span></div><div><b>Warmth</b><span>Present · generous · familiar · celebratory</span></div></div></section>

    <section class="bi-sec" id="biColour"><div class="bi-h"><div><h3>Colour</h3><p>Click any value to copy it.</p></div>
      <div class="a-seg" role="group" aria-label="Colour space"><button type="button" data-bimode="rgb" aria-pressed="${G.mode==="rgb"}">Screen · RGB</button><button type="button" data-bimode="cmyk" aria-pressed="${G.mode==="cmyk"}">Print · CMYK</button></div></div>
      <div class="bi-weight" role="img" aria-label="Palette weighting: Primary 40%, Neutral light 30%, Neutral dark 20%, Complimentary 5% and 5%"><i style="flex:40;background:#FA6428;color:#fff">Primary 40%</i><i style="flex:30;background:#ECE8DF;color:#19181E">Neutral light 30%</i><i style="flex:20;background:#19181E;color:#fff">Neutral dark 20%</i><i style="flex:5;background:#A33755" title="Complimentary 5%"></i><i style="flex:5;background:#32969B" title="Complimentary 5%"></i></div>
      ${TIERS.map(t=>`<div class="bi-tier"><div class="bi-tierhead"><b>${t.title}</b><span class="t12 muted">${t.note} · ${t.share}</span></div><div class="bi-swatches">${t.list.map(c=>{ const k=cmykOf(c), r=rgb(c.hex); return `<div class="bi-sw"><div class="bi-chip" style="background:${c.hex};color:${on(c.hex)}${/^#FFF/.test(c.hex)?";box-shadow:inset 0 0 0 1px #CCC3B4":""}"><b>${c.name}</b>${c.print?.pantone&&G.mode==="cmyk"?`<span>PANTONE ${c.print.pantone}</span>`:""}</div>
        <div class="vals">${G.mode==="rgb"?copyBtn("HEX",c.hex)+copyBtn("RGB",r.join(", ")):copyBtn("CMYK",k.v.join(" / "))+(c.print?.pantone?copyBtn("Pantone",c.print.pantone):"")+`<span class="t12 ${k.official?"ok":"warn"}">${k.official?"Official print value":"Converted from screen — confirm before print"}</span>`}</div></div>`; }).join("")}</div></div>`).join("")}
      <div class="bi-dl"><b>Download the palette</b><div class="rl-btns">
        <button type="button" class="btn small primary" data-bidl="ase-rgb">Adobe swatches · RGB (.ase)</button><button type="button" class="btn small primary" data-bidl="ase-cmyk">Adobe swatches · CMYK (.ase)</button>
        <button type="button" class="btn small" data-bidl="svg-rgb">Palette sheet · RGB (.svg)</button><button type="button" class="btn small" data-bidl="svg-cmyk">Palette sheet · CMYK (.svg)</button>
        <button type="button" class="btn small" data-bidl="css">CSS variables</button><button type="button" class="btn small" data-bidl="json">Design tokens (.json)</button></div>
        <p class="t12 muted">The guidelines give official print values (Pantone + CMYK) for Orange, Ink, Burgundy and Teal only. Every other CMYK value here is a plain conversion and is marked so.</p></div>
    </section>

    <section class="bi-sec" id="biLogo"><div class="bi-h"><div><h3>Logo</h3><p>Four lockups: Symbol · English · Arabic · Bilingual. Match the lockup to the language of the message.</p></div></div>
      <div class="bi-combos">${COMBOS.map(([rank,fg,bg,label],i)=>`<div class="bi-combo"><div class="tile" style="background:${bg}${/^#FFF/.test(bg)?";box-shadow:inset 0 0 0 1px #CCC3B4":""}">${symbolSVG(fg)}</div><div class="tx"><span class="t12 muted">${rank}</span><b>${label}</b></div><div class="rl-btns"><button type="button" class="btn small" data-bisym="${i}" data-bg="0">Symbol SVG</button><button type="button" class="btn small" data-bisym="${i}" data-bg="1">With background</button></div></div>`).join("")}</div>
      <p class="t12 muted">Only these six pairs are approved, plus monochrome light-on-dark and dark-on-light. The full lockups (English, Arabic, Bilingual) are in Assets → Logos below.</p>
      <div class="bi-rules"><div><b>Safe space</b><p>1X = the logo's x-height. Keep at least 1X clear on every side; 2X for hero moments.</p></div><div><b>Position</b><p>English: left. Arabic: right. Top = brand-led. Bottom = signature. Logo-led pieces: optically centred.</p></div><div><b>Partner lockups</b><p>1X of logo height around, 1.5X between the two marks, both in one matching monotone.</p></div><div><b>Never</b><p>Redraw, recolour, stretch or modify. Never on a busy or low-contrast background.</p></div></div>
    </section>

    <section class="bi-sec" id="biType"><div class="bi-h"><div><h3>Typography</h3><p>One weight only: Regular.</p></div><button type="button" class="btn small" data-bidl="typecss">Copy the scale as CSS</button></div>
      <div class="bi-fonts"><div><span class="t12 muted">English / Latin</span><b style="font-family:'GT Walsheim',var(--font)">GT Walsheim Regular</b><p style="font-family:'GT Walsheim',var(--font)">Banking that moves at the pace of your life.</p></div><div dir="rtl"><span class="t12 muted">العربية</span><b style="font-family:'Avenir Arabic',var(--font)">Avenir Arabic Regular</b><p style="font-family:'Avenir Arabic',var(--font)">بنك يمشي على إيقاع يومك.</p></div></div>
      <div class="bi-tablewrap"><table class="bi-table"><thead><tr><th>Role</th><th>Size</th><th>Tracking</th><th>Line height</th><th>Sample</th></tr></thead><tbody>${SCALE.map(([role,size,tr,lh])=>`<tr><td>${role}</td><td>${size} pt</td><td>${tr}</td><td>${lh}</td><td><span style="font-size:${Math.max(12,Math.min(40,size/4+8))}px;letter-spacing:${parseFloat(tr)/100}em;line-height:${parseFloat(lh)/100}">Deep Clarity</span></td></tr>`).join("")}</tbody></table></div>
      <p class="t12 muted">Sizes scale with the canvas; the tracking and line height paired with each step never change. Bold, Medium, Light, Italic and trial font files are outside the system. The font files are licensed — get them from the brand team (B_Fonts), they are not shared here.</p>
    </section>

    <section class="bi-sec" id="biGrid"><div class="bi-h"><div><h3>Grid</h3><p>Margins are 7% of the width. 12 columns × 12 rows on every format.</p></div></div>
      <div class="bi-gridtool"><div class="rl-btns">${[["9:16",1080,1920],["3:4",1080,1440],["1:1",1080,1080],["16:9",1920,1080]].map(([l,w,h])=>`<button type="button" class="btn small${G.w===w&&G.h===h?" primary":""}" data-bisize="${w}x${h}">${l}</button>`).join("")}<label class="t12">Width <input class="rl-field" type="number" min="100" max="20000" id="biW" value="${G.w}"></label><label class="t12">Height <input class="rl-field" type="number" min="100" max="20000" id="biH" value="${G.h}"></label></div>
        <div id="biGridRes">${gridHTML()}</div>
        <div class="bi-blocks"><table class="bi-table"><thead><tr><th>Block</th><th>Rows</th><th>Columns · 9:16, 3:4, 1:1</th><th>Columns · 16:9</th></tr></thead><tbody><tr><td>Headline</td><td>2–5</td><td>8–12</td><td>8–12</td></tr><tr><td>Subhead</td><td>1</td><td>3–6</td><td>2–4</td></tr><tr><td>Logo</td><td>1</td><td>4–6</td><td>2–4</td></tr></tbody></table></div></div>
    </section>

    <section class="bi-sec" id="biRules"><div class="bi-h"><div><h3>Gradient, illustration, photography</h3></div><button type="button" class="btn small" data-bigo="gallery">Open gradient elements</button></div>
      <div class="bi-rules"><div><b>Gradient</b><p>Soft, blurred organic shapes, layered and diffused. Never a linear blend. Three roles: background, frame, shape. Shapes sit between the cut-out subject and the background.</p></div><div><b>Dark gradient</b><p>Internal and corporate audiences only. Keep it minimal in external work.</p></div><div><b>Illustration</b><p>One focal point. No text inside. Light version on light, dark version on dark; never invert. Sizes 96, 144, 192, 256 px.</p></div><div><b>Photography</b><p>Depth over flatness. Clarity through focus. Colour with warmth. A Jordanian lens: real faces and places.</p></div><div><b>AI imagery</b><p>Fine for tactical campaigns, rapid content and concepts. Not for evergreen hero images, core portraits or trust-critical use.</p></div><div><b>Social treatment</b><p>Primary: gradient shape between subject and background. Secondary: black-and-white subject with gradient overlay, on flat orange only.</p></div></div>
    </section>

    <section class="bi-sec" id="biMotion"><div class="bi-h"><div><h3>Motion</h3><p>Fluidity, depth, focus.</p></div></div>
      <div class="bi-tablewrap"><table class="bi-table"><thead><tr><th>Element</th><th>Duration</th><th>Animate by</th><th>Values</th></tr></thead><tbody>
        <tr><td>Main sentence in</td><td>1500 ms</td><td>Words</td><td>Opacity 0→100, blur 20→0, position 10→0</td></tr><tr><td>Main sentence out</td><td>900 ms</td><td>Lines</td><td>Opacity 100→0, blur 0→20</td></tr>
        <tr><td>Secondary text in</td><td>1200 ms · 600 ms after main</td><td>Lines</td><td>Opacity 0→100, blur 20→0, position 6→0</td></tr><tr><td>Secondary text out</td><td>900 ms · 300 ms after main</td><td>Lines</td><td>Opacity 100→0, blur 0→20</td></tr>
        <tr><td>Frame gradient reveal</td><td>1200 ms</td><td>—</td><td>Opacity or position</td></tr><tr><td>Gradient loop</td><td>30 s (or 15, 8, 6 s)</td><td>—</td><td>Linear, no easing, each shape 360° clockwise</td></tr></tbody></table></div>
    </section>

    <section class="bi-sec" id="biTpl"><div class="bi-h"><div><h3>Templates and gradients</h3><p>Built the way the guideline builds it: a solid brand colour, blurred organic shapes filled with the brand gradient, lighter shades on top. Background, Frame, Dark and Shape, in every digital size, as a high-quality PNG up to 8K.</p></div></div>
      <div id="biTplBody"></div>
    </section>

    <section class="bi-sec" id="biAssets"><div class="bi-h"><div><h3>Assets</h3><p>${BF.canEdit?"Add the official files once. Everyone on the team downloads them from here.":"Official files, ready to download."}</p></div></div>
      <div id="biShelves">${shelvesHTML()}</div>
      <p class="t12 muted">Questions, asset requests and approvals go to the brand team.</p>
    </section>`;
    tplDraw(); P.scrollTop=sc; if(typeof uxT==="function") uxT(P);
  }
  P.addEventListener("click",async e=>{
    const c=e.target.closest("[data-copy]"); if(c){ try{ await navigator.clipboard.writeText(c.dataset.copy); c.classList.add("done"); setTimeout(()=>c.classList.remove("done"),1200); }catch{} return; }
    const j=e.target.closest("[data-jump]"); if(j){ e.preventDefault(); $(j.dataset.jump)?.scrollIntoView({behavior:"smooth",block:"start"}); return; }
    const m=e.target.closest("[data-bimode]"); if(m){ G.mode=m.dataset.bimode; draw(); return; }
    const z=e.target.closest("[data-bisize]"); if(z){ const [w,h]=z.dataset.bisize.split("x").map(Number); G.w=w; G.h=h; draw(); return; }
    const go=e.target.closest("[data-bigo]"); if(go){ P.hidden=true; $("openGallery")?.click(); return; }
    const sy=e.target.closest("[data-bisym]"); if(sy){ const [rank,fg,bg,label]=COMBOS[+sy.dataset.bisym]; saveText(symbolSVG(fg,sy.dataset.bg==="1"?bg:null),`BAE_symbol_${slug(label)}${sy.dataset.bg==="1"?"_bg":""}.svg`,"image/svg+xml"); return; }
    const d=e.target.closest("[data-bidl]"); if(d){ const k=d.dataset.bidl;
      if(k==="ase-rgb") save(ase("RGB"),"BAE_palette_RGB.ase"); else if(k==="ase-cmyk") save(ase("CMYK"),"BAE_palette_CMYK.ase");
      else if(k==="svg-rgb") saveText(sheetSVG("RGB"),"BAE_palette_RGB.svg","image/svg+xml"); else if(k==="svg-cmyk") saveText(sheetSVG("CMYK"),"BAE_palette_CMYK.svg","image/svg+xml");
      else if(k==="css") saveText(cssVars(),"bae-colors.css","text/css"); else if(k==="json") saveText(tokens(),"bae-tokens.json","application/json");
      else if(k==="typecss"){ const css=SCALE.map(([role,size,tr,lh])=>`.bae-${role.toLowerCase()}-${size}{font-family:"GT Walsheim","Avenir Arabic",sans-serif;font-weight:400;font-size:${size}pt;letter-spacing:${parseFloat(tr)/100}em;line-height:${parseFloat(lh)/100}}`).join("\n"); try{ await navigator.clipboard.writeText(css); d.textContent="Copied ✓"; setTimeout(()=>d.textContent="Copy the scale as CSS",1500); }catch{} }
      return; }
    const dl=e.target.closest("[data-bfdl]"); if(dl){ const f=BF.list.find(x=>x.id===dl.dataset.bfdl); if(f) bfDownload(f,dl); return; }
    const rm=e.target.closest("[data-bfrm]"); if(rm){ if(rm.dataset.sure){ const f=BF.list.find(x=>x.id===rm.dataset.bfrm); if(f) bfRemove(f); } else { rm.dataset.sure="1"; rm.textContent="Remove for everyone?"; setTimeout(()=>{ if(rm.isConnected){ delete rm.dataset.sure; rm.textContent="Remove"; } },4000); } return; }
  });
  P.addEventListener("change",async e=>{
    if(e.target.id==="biW"||e.target.id==="biH"){ G.w=Math.max(100,+$("biW").value||1080); G.h=Math.max(100,+$("biH").value||1920); $("biGridRes").innerHTML=gridHTML(); return; }
    const a=e.target.matches?.("[data-bfadd]")?e.target:null; if(a&&a.files?.length){ const shelf=a.dataset.bfadd, files=[...a.files].slice(0,20); a.value=""; BF.err="";
      for(const f of files){ BF.busy=`Saving ${f.name}…`; draw(); try{ await bfAdd(f,shelf); }catch(err){ BF.err=String(err?.message||err?.code||err).slice(0,200); } }
      BF.busy=""; draw(); } });
  const open=()=>{ P.hidden=false; P.scrollTop=0; draw(); if(!BF.loaded) bfLoad().then(draw); };
  const close=()=>{ P.hidden=true; $("openBrand")?.focus(); };
  $("openBrand")?.addEventListener("click",open); $("closeBrand")?.addEventListener("click",close);
})();


/* ================= Layout advisor: drop a layout, Claude reads the copy and proposes the right visual (photo, 3D icon or copy-led) ================= */
const LV={busy:false,out:null,err:"",thumb:"",w:0,h:0};
/* ---- taste memory: what this designer used, rejected and asked for in their own words; fed back into every advice ---- */
const LVT_KEY="bae_lv_taste", LVT_MAX=60;
let LVT=(()=>{ try{ const v=JSON.parse(localStorage.getItem(LVT_KEY)||"[]"); return Array.isArray(v)?v:[]; }catch{ return []; } })();
const lvtDoc=async()=>{ await rlStoreInit(); return RLS.db&&RLS.uid?rlCol().doc("lvtaste"):null; };
function lvtSave(){ LVT=LVT.slice(-LVT_MAX); try{ localStorage.setItem(LVT_KEY,JSON.stringify(LVT)); }catch{} lvtDoc().then(d=>d&&d.set({kind:"lvtaste",items:LVT,updatedAt:Date.now()})).catch(()=>{}); }
function lvtAdd(k,o,x,extra){ if(!o||!x) return; const e={k,t:Date.now(),type:x.type,product:String(o.product||"").slice(0,40),msg:String(o.message||"").slice(0,90),brief:String(extra?.brief||x.brief||"").slice(0,220),...(extra?.say?{say:String(extra.say).slice(0,220)}:{}),...(k==="used"&&o.best&&o.best!==x.type?{over:o.best}:{})};
  const last=LVT[LVT.length-1]; if(last&&last.k===e.k&&last.brief===e.brief&&last.say===e.say) return; LVT.push(e); lvtSave(); }
(async()=>{ try{ const d=await lvtDoc(); if(!d) return; const s=await d.get(); const items=s.exists?(s.data()?.items||[]):[]; if(!Array.isArray(items)||!items.length) return;
  const seen=new Set(LVT.map(e=>e.t+e.k)); const merged=[...LVT,...items.filter(e=>e&&!seen.has(e.t+e.k))].sort((p,q)=>(p.t||0)-(q.t||0)).slice(-LVT_MAX); if(merged.length!==LVT.length){ LVT=merged; try{ localStorage.setItem(LVT_KEY,JSON.stringify(LVT)); }catch{} } }catch{} })();
function lvTaste(){ if(!LVT.length) return ""; const lab=e=>`[${e.product||"general"} · ${(LV_TYPES[e.type]||[e.type])[0]}]`, pick=(k,n)=>LVT.filter(e=>e.k===k).slice(-n);
  const used=pick("used",10), own=pick("own",8), rej=pick("rejected",8), cnt={}; LVT.filter(e=>e.k==="used").forEach(e=>{ const key=(e.product||"general")+" → "+(LV_TYPES[e.type]||[e.type])[0]; cnt[key]=(cnt[key]||0)+1; });
  const over=LVT.filter(e=>e.k==="used"&&e.over).slice(-5);
  return `WHAT THIS DESIGNER CHOSE BEFORE — learn their taste from it. Lean toward the kind of scene, person, action and mood they USED; keep away from what they REJECTED; what they wrote IN THEIR OWN WORDS is the strongest signal of what they want. Use it to choose and to score, never copy an old brief word for word, and the brand rules still win.
${Object.keys(cnt).length?`VISUAL TYPE THEY USED PER PRODUCT: ${Object.entries(cnt).map(([k,n])=>`${k} ×${n}`).join(" · ")}\n`:""}${over.length?`TIMES THEY OVERRULED THE ADVISOR'S BEST FIT: ${over.map(e=>`${e.product||"general"}: advisor said ${(LV_TYPES[e.over]||[e.over])[0]}, they used ${(LV_TYPES[e.type]||[e.type])[0]}`).join(" · ")}\n`:""}${used.length?`USED:\n${used.map(e=>`- ${lab(e)} ${e.brief}`).join("\n")}\n`:""}${own.length?`IN THEIR OWN WORDS:\n${own.map(e=>`- ${lab(e)} "${e.say}"`).join("\n")}\n`:""}${rej.length?`REJECTED:\n${rej.map(e=>`- ${lab(e)} ${e.brief}`).join("\n")}\n`:""}`; }
/* ---- zones: where the copy sits and where the visual goes, as fractions of the layout ---- */
const lvBox=b=>{ const n=v=>Math.max(0,Math.min(1,+v||0)); if(!b||typeof b!=="object") return null; const x=n(b.x), y=n(b.y), w=Math.min(n(b.w),1-x), h=Math.min(n(b.h),1-y); return w>.04&&h>.04?{x,y,w,h}:null; };
function lvWhere(b){ if(!b) return ""; const cx=b.x+b.w/2, cy=b.y+b.h/2, fullW=b.w>.82, fullH=b.h>.82; if(fullW&&fullH) return "the whole frame";
  const hz=cx<.4?"left":cx>.6?"right":"centre", vt=cy<.4?"top":cy>.6?"bottom":"middle";
  if(fullW) return `the ${vt} ${b.h<.42?"third":"half"}`; if(fullH) return hz==="centre"?"the centre column":`the ${hz} ${b.w<.42?"third":"half"}`;
  return vt==="middle"?(hz==="centre"?"the centre":`the ${hz} side`):hz==="centre"?`the ${vt} centre`:`the ${vt} ${hz} area`; }
/* the composition lock that travels with the brief: the subject stays in the visual zone, the copy zone stays calm */
const LV_CENTER="Composition: the main subject (the person, or the object) is always in the CENTRE of the frame, centred left-to-right, filling about the middle half of the picture, with calm, even, low-detail space on both sides. Never push the subject to the left or right third or into a corner.";
function lvComp(o){ return LV_CENTER; }
function lvAspect(o){ const as=$("aspect"); if(!as||!LV.w||!LV.h) return o.aspect; const V=o.visual_kind==="frame"&&o.visual_box?o.visual_box:{w:1,h:1}, r=(V.w*LV.w)/(V.h*LV.h); let best=o.aspect, d=1e9;
  [...as.options].forEach(p=>{ const m=/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/.exec(p.value); if(!m) return; const e=Math.abs(Math.log((+m[1]/+m[2])/r)); if(e<d){ d=e; best=p.value; } }); return best; }
const LV_TYPES={photo_studio:["Photo · Studio","photo"],photo_lifestyle:["Photo · Lifestyle","photo"],icon:["3D icon","icon"],copy_led:["Copy-led","none"]};
/* the team's characters and the outfit library, listed for Claude so it can propose a cast and clothes */
function lvCastInfo(){ const cs=CHAR_REFS.filter(r=>r.lib).map(r=>`"${charName(r.id)}" (${(CL_CATS.find(c=>c[0]===r.cat)||[])[1]||"character"})`);
  return `CAST AND WARDROBE SUGGESTION — for every photo option also choose from these libraries:
CHARACTERS (name and shelf): ${cs.length?cs.join(", "):"none in the library — leave cast empty"}
OUTFITS (name · for · pieces): ${AT_OUTFITS.map(o=>`"${o.name}" · ${o.cat} · ${o.d.slice(0,110)}`).join(" | ")}
"people" = one entry for EVERY person in the brief (1 to 3), in the order the brief mentions them: {"role":"two or three words, e.g. the father, the daughter, the woman","cast":"…","outfit":"…"}.
"cast" = the exact name of ONE character whose shelf fits that person (Men for a man, Women for a woman, Kids for a child, Elderly for an older person), or "" when none fits. Never give the same character to two people. Write the brief about the same kind of people you cast.
"outfit" = the exact name of ONE outfit made for that person (Women, Men, Girls or Boys) that suits the scene, the season and the mood of the copy (calmer tailored ones for studio), or "" when none fits. Girls and Boys outfits are for children only, and a child never gets an adult outfit. Never give the same outfit to two people. When you pick outfits, do not describe any other clothes in the brief.`; }
const lvClean=x=>{ const usedC=new Set(), usedO=new Set(); const raw=Array.isArray(x?.people)&&x.people.length?x.people:(x?.cast||x?.outfit?[{role:"",cast:x.cast,outfit:x.outfit}]:[]);
  x.people=raw.slice(0,3).map(p=>{ const c=CHAR_REFS.find(r=>r.lib&&charName(r.id).toLowerCase()===String(p?.cast||"").trim().toLowerCase()&&!usedC.has(r.id)); if(c) usedC.add(c.id); const o=atOutfit(String(p?.outfit||"").trim()); const ok=o&&!usedO.has(o.id); if(ok) usedO.add(o.id);
    return {role:String(p?.role||"").trim().slice(0,40),cast:c?charName(c.id):"",castSrc:c?.src||"",outfit:ok?o.name:"",outfitSrc:ok?o.src:""}; }).filter(p=>p.cast||p.outfit); delete x.cast; delete x.outfit; return x; };
async function lvRun(file){ if(LV.busy||!file) return; const box=$("lvOut"); if(!box) return;
  if(!sample){ LV.err="Claude isn't connected in this view."; lvDraw(); return; }
  LV.busy=true; LV.err=""; LV.out=null; try{ if(LV.thumb) URL.revokeObjectURL(LV.thumb); }catch{} LV.thumb=URL.createObjectURL(file); LV.w=LV.h=0; lvDraw();
  try{ const small=await toJpeg(file,1600).catch(()=>file); try{ const bm=await createImageBitmap(file); LV.w=bm.width; LV.h=bm.height; bm.close?.(); }catch{} if(!CL.loaded) await clLoad().catch(()=>{});
    const o=await rlAsk(`You are the senior art director for Bank al Etihad (Jordan). The attached image is a design layout that still has NO visual: copy, logo and an empty area. Decide which visual belongs in the empty area.
THE THREE CHOICES
1. PHOTO — a person or people. "photo_lifestyle" = real place in modern Amman, candid, daily life. "photo_studio" = one person on a plain warm cream wall, minimal, tailored, calm. Best when the message is human: welcome, care, relationship, trust, a life moment, a customer or employee speaking. Lifestyle when the copy is about a moment of life; studio when the copy speaks directly to the reader, is corporate, or the layout is very clean.
2. ICON — one BAE 3D glass icon with a single focal object. Best when the message is a product, feature, service, number, offer, security or an abstract idea, and the copy is short.
3. COPY_LED — no image at all. Best when there is a lot of copy (long paragraph, terms, lists, announcement) or the empty area is too small for a visual.
BRAND: concept "Deep Clarity"; pillars Intelligence (precise, clear) and Warmth (present, familiar). One focal point. Never put text inside a visual.
HOW BAE SHOOTS PEOPLE — every photo brief must follow this: candid, caught moments, never posed. The person NEVER looks at the camera; they are absorbed in a real action (on the phone, mid-step, mid-sip, talking to someone out of frame). The camera watches from a three-quarter view, the side, behind or over the shoulder — say which. One clear focus in the middle; a quiet, uncluttered place with few elements (lifestyle) or one plain wall (studio).
READ THE COPY FIRST — the visual must express the MESSAGE, not just fill the space. Transcribe the copy exactly, then name: the headline, the subhead, the call to action; the PRODUCT (loan, home loan, car loan, credit card, debit card, current account, savings, deposit, transfer, mobile app, digital payment, insurance, SME / business, youth, rewards, security, careers, announcement, greeting, or "general brand"); the single promise the copy makes to the reader; who it speaks to; and the tone. Then build every scene on that promise: show the human result of the product (the moment the loan makes possible, the ease the card gives, the calm of being covered), never the product itself, a bank branch, cash, cards held up or a phone screen with UI.
READ THE SPACE — judge how heavy the copy is, the background colour, the text colour, whether the layout is Arabic (text on the right) or English, and "visual_kind" = "full_bleed" when the image will run behind or under the copy, or "frame" when the image lives in its own separate box beside the copy; "visual_box" = that box as fractions of the layout from 0 to 1 (x and y = top-left corner, w and h = size).
SUBJECT ALWAYS IN THE CENTRE — house rule with no exception: in every brief the main subject (the person, or the object) sits in the centre of the frame, centred left-to-right, filling about the middle half, with calm even space on both sides. Never write "left third", "right third", "on the left", "on the right" or a corner for the subject.
THEN score all four types 0–100 for THIS copy and write, for each type except copy_led, a ready brief in English for the image generator: who or what, doing what, wardrobe or object, mood, and state that the subject is centred in the frame with calm space on both sides. For a photo to sit on a flat coloured card, say the background should match or blend with the card colour. Briefs: 25–45 words, concrete, Jordanian context, no brand names of others, no text in the image.
Write "why" lines in ${UX.lang==="ar"?"Arabic":"the language of the layout's copy"}, one short sentence each, and make each "why" tie the visual to the promise of the copy. Write "message" in the same language.
${lvCastInfo()}
${lvTaste()}
Return ONLY JSON: {"copy":"…","headline":"…","product":"…","message":"the promise in one short sentence","audience":"…","tone":"…","copy_load":"light|medium|heavy","empty_area":"…","background":"…","text_colour":"…","visual_kind":"full_bleed|frame","visual_box":{"x":0,"y":0,"w":0,"h":0},"aspect":"16:9|9:16|21:9|3:4|1:1|4:5","best":"photo_studio|photo_lifestyle|icon|copy_led","verdict":"one short sentence","options":[{"type":"photo_studio","score":0,"why":"…","brief":"…","people":[{"role":"","cast":"","outfit":""}]},{"type":"photo_lifestyle","score":0,"why":"…","brief":"…","people":[{"role":"","cast":"","outfit":""}]},{"type":"icon","score":0,"why":"…","brief":"…"},{"type":"copy_led","score":0,"why":"…","brief":""}]}`,{images:[small],cache:false});
    if(!o||!Array.isArray(o.options)) throw {code:"bad_answer"};
    o.options=o.options.filter(x=>LV_TYPES[x?.type]).map(lvClean).sort((x,y)=>(+y.score||0)-(+x.score||0)); o.text_box=null; o.visual_box=lvBox(o.visual_box); o.visual_kind=o.visual_kind==="frame"?"frame":"full_bleed"; o.comp=lvComp(o); o.aspect=lvAspect(o); LV.out=o;
  }catch(e){ log("✕","layout advisor",{code:e?.code,message:e?.message}); LV.err=e?.code==="rate_limited"?"Too many requests. Try again in a minute.":"Couldn't read the layout. Try again."; }
  LV.busy=false; lvDraw(); }
function lvDraw(focus){ const box=$("lvOut"); if(!box) return; const o=LV.out;
  box.innerHTML=LV.busy?`<div class="lv-wait"><img src="${LV.thumb}" alt=""><span role="status">Reading your layout…</span></div>`:LV.err?`<p class="t12 bad" role="alert">${esc(LV.err)}</p>`:!o?"":`<div class="lv-res"><div class="lv-top"><div class="lv-map"><img src="${LV.thumb}" alt="Your layout"></div><div>${o.product||o.message?`<p class="lv-msg" dir="auto" data-noi18n>${o.product?`<b>${esc(String(o.product).slice(0,40))}</b>`:""}${o.message?` ${esc(String(o.message).slice(0,160))}`:""}</p>`:""}<span class="t12 muted">Copy</span><p dir="auto" data-noi18n>${esc(String(o.copy||"").slice(0,240))}</p><p class="lv-verdict" dir="auto" data-noi18n>${esc(o.verdict||"")}</p><p class="t12 muted lv-key"><span>Subject always in the centre</span><span data-noi18n>${esc(o.aspect||"")}</span></p></div><button type="button" class="bi-x" data-lvx aria-label="Close the suggestions">Close</button></div>
    <div class="lv-opts">${o.options.map((x,i)=>{ const [label,mode]=LV_TYPES[x.type]; return `<div class="lv-opt${i===0?" best":""}"><div class="h"><b>${label}</b><span class="sc">${Math.round(+x.score||0)}%</span>${i===0?`<span class="tag">Best fit</span>`:""}</div><p class="t12" dir="auto" data-noi18n>${esc(x.why||"")}</p>${mode!=="none"&&x.brief?`<p class="br" dir="auto" data-noi18n>${esc(x.brief)}</p>${(x.people||[]).map((p,k)=>`<div class="lv-cast"><span class="t12 muted" data-noi18n>${esc(p.role||"Suggested")}</span>${p.cast?`<span class="pill">${p.castSrc?`<img src="${esc(p.castSrc)}" alt="">`:""}<span data-noi18n>${esc(p.cast)}</span><button type="button" data-lvdrop="${i}" data-k="cast" data-p="${k}" aria-label="Remove the suggested character">×</button></span>`:""}${p.outfit?`<span class="pill">${p.outfitSrc?`<img class="of" src="${esc(p.outfitSrc)}" alt="">`:""}<span data-noi18n>${esc(p.outfit)}</span><button type="button" data-lvdrop="${i}" data-k="outfit" data-p="${k}" aria-label="Remove the suggested outfit">×</button></span>`:""}</div>`).join("")}${x.sceneUrl?`<div class="lv-cast"><span class="t12 muted">Scene reference</span><span class="pill"><img class="of" src="${x.sceneUrl}" alt="Your scene reference"><button type="button" data-lvdrop="${i}" data-k="scene" aria-label="Remove the scene reference">×</button></span></div>`:""}<div class="rl-btns"><button type="button" class="btn small ${i===0?"primary":""}" data-lvuse="${i}">Use this brief</button><button type="button" class="btn small" data-lvmore="${i}" ${x.busy?"disabled":""}>${x.busy?"Thinking…":"Another idea"}</button>${mode==="photo"?`<label class="btn small lv-scene">Add a scene photo<input type="file" accept="image/*" data-lvscene="${i}" ${x.busy?"disabled":""}></label>`:""}</div>${(x.chat||[]).length||x.talking?`<div class="lv-chat" data-lvchat="${i}">${(x.chat||[]).map((m,k)=>m.r==="u"?`<div class="lv-m u" dir="auto" data-noi18n>${esc(m.t)}</div>`:`<div class="lv-m a">${m.t?`<p dir="auto" data-noi18n>${esc(m.t)}</p>`:""}${m.prop?`<div class="lv-prop${m.done?" done":""}"><span class="t12 muted">${m.done==="used"?"This is the brief now":m.done==="no"?"Not used":"Proposed brief"}</span><p class="br" dir="auto" data-noi18n>${esc(m.prop.brief)}</p>${m.done?"":`<div class="rl-btns"><button type="button" class="btn small primary" data-lvapply="${i}" data-k="${k}">Use this version</button><button type="button" class="btn small" data-lvskip="${i}" data-k="${k}">No, keep talking</button></div>`}</div>`:""}</div>`).join("")}${x.talking?`<div class="lv-m a"><span class="rl-typing"><i></i><i></i><i></i></span></div>`:""}</div>`:""}<form class="lv-say" data-lvsay="${i}"><input class="rl-field" name="q" dir="auto" placeholder="Talk it over: what do you have in mind, or what should change?" aria-label="Discuss the idea for ${label}" ${x.busy||x.talking?"disabled":""}><button type="submit" class="btn small" ${x.busy||x.talking?"disabled":""}>Send</button></form><p class="t12 muted lv-hint">Nothing changes in the brief until you press "Use this version".</p>${x.err?`<p class="t12 bad" role="alert">${esc(x.err)}</p>`:""}`:`<p class="t12 muted">No image. Let the copy lead.</p>`}</div>`; }).join("")}</div>${LVT.length?`<p class="t12 muted lv-learn"><span>Learning from ${LVT.length} of your choices.</span> <button type="button" class="bi-x" data-lvforget>Forget them</button></p>`:""}</div>`;
  if(typeof uxT==="function") uxT(box);
  if(focus!==undefined){ const c=box.querySelector(`[data-lvchat="${focus}"]`); if(c) c.scrollTop=c.scrollHeight; const f=box.querySelector(`[data-lvsay="${focus}"] input`); if(f&&!f.disabled) f.focus({preventScroll:true}); } }
/* a different scene for one option: a fresh idea, or the user's own idea turned into a brief */
async function lvRedo(i,say,file){ const o=LV.out, x=o?.options?.[i]; if(!x||x.busy) return; const [label]=LV_TYPES[x.type]; say=String(say||"").trim(); const photo=x.type!=="icon";
  if(say) lvtAdd("own",o,x,{say}); else if(!file&&x.brief) lvtAdd("rejected",o,x);
  if(file){ if(!/^image\//.test(file.type)){ x.err="That file isn't an image. Use JPEG, PNG or WebP."; lvDraw(); return; } try{ if(x.sceneUrl) URL.revokeObjectURL(x.sceneUrl); }catch{} x.scene=file; x.sceneUrl=URL.createObjectURL(file); }
  x.busy=true; x.err=""; x.past=x.past||[]; if(x.brief&&!x.past.includes(x.brief)) x.past.push(x.brief); lvDraw();
  try{ const r=await rlAsk(`You are the senior art director for Bank al Etihad (Jordan). A design layout needs a visual of this type: ${label} (${x.type==="photo_studio"?"one person on a plain warm cream wall, minimal, tailored, calm, not looking at the camera; at most one piece of light-oak furniture and two small props":x.type==="photo_lifestyle"?"real people in a real modern place in Amman, candid daily life":"one BAE 3D glass icon with a single focal object, no people"}).
LAYOUT COPY: "${String(o.copy||"").slice(0,400)}"
PRODUCT: ${o.product||"unknown"} · THE PROMISE OF THE COPY: ${o.message||"unknown"} · SPEAKS TO: ${o.audience||"unknown"} · TONE: ${o.tone||"unknown"}
Build the scene on that promise: show the human result of the product, never the product itself, a branch, cash, cards held up or a phone screen with UI.
EMPTY AREA FOR THE VISUAL: ${o.empty_area||"unknown"} · BACKGROUND: ${o.background||"unknown"}
SPACE RULE THE BRIEF MUST FOLLOW — ${LV_CENTER}
BRIEFS ALREADY PROPOSED AND REJECTED — do not repeat their scene, person, action or object:
${x.past.map((b,k)=>`${k+1}. ${b}`).join("\n")}
${x.scene?`THE USER ATTACHED A SCENE REFERENCE PHOTO (the image in this message). Build the brief on what it shows: the kind of place, what the person does, the framing, the camera angle, the light and the mood. Keep its idea and composition, adapt it to Bank al Etihad and Jordan, never copy the identity of the person in it and never mention brands.`:""}
${say?`THE USER'S OWN IDEA (any language) — build the brief on exactly this, keep everything they asked for, only add what is missing: "${say}"`:x.scene?"":"Propose a clearly DIFFERENT scene that still expresses the copy: change who it is (age, gender), what they do, the object or prop, or the mood."}
For a photo: candid, caught moment, the person never looks at the camera and is absorbed in a real action; name the camera angle (three-quarter, side, from behind or over the shoulder); one clear focus; a quiet uncluttered place.
Write ONE brief in English for the image generator, 25–45 words, concrete, Jordanian context: who or what, doing what, wardrobe or object, mood, with the subject centred in the frame and calm space on both sides. No text in the image, no other brands.
${photo?lvCastInfo():""}
${lvTaste()}
Return ONLY JSON: {"brief":"…","why":"one short sentence in ${UX.lang==="ar"?"Arabic":"the language of the layout copy"} on how this fits the copy"${photo?`,"people":[{"role":"","cast":"","outfit":""}]`:""}}`,{modelTier:x.scene?"default":"quick",cache:false,...(x.scene?{images:[await toJpeg(x.scene,1400).catch(()=>x.scene)]}:{})});
    const b=String(r?.brief||"").trim(); if(!b) throw {code:"bad_answer"}; x.brief=b; if(r.why) x.why=String(r.why); if(photo){ x.people=r.people; x.cast=r.cast; x.outfit=r.outfit; lvClean(x); } }
  catch(e){ log("✕","layout idea",{code:e?.code}); x.err=e?.code==="rate_limited"?"Too many requests. Try again in a minute.":"Couldn't write another idea. Try again."; }
  x.busy=false; lvDraw(); }
/* talk an idea over before anything is rewritten: the art director answers, may ask one question, and only PROPOSES a brief; the option changes when the designer accepts it */
async function lvTalk(i,say){ const o=LV.out, x=o?.options?.[i]; say=String(say||"").trim(); if(!x||x.busy||x.talking||!say) return; const [label]=LV_TYPES[x.type], photo=x.type!=="icon"; x.chat=x.chat||[]; x.chat.push({r:"u",t:say}); x.talking=true; x.err=""; lvDraw(i);
  try{ const r=await rlAsk(`You are the senior art director for Bank al Etihad (Jordan), talking with the designer about ONE visual idea for a layout. This is a conversation between two colleagues: answer what he says, think with him, be honest. You do NOT rewrite anything on your own.
THE VISUAL TYPE: ${label} (${x.type==="photo_studio"?"one person on a plain warm cream wall, minimal, tailored, calm":x.type==="photo_lifestyle"?"real people in a real modern place in Amman, candid daily life":"one BAE 3D glass icon with a single focal object, no people"}).
LAYOUT COPY: "${String(o.copy||"").slice(0,400)}"
PRODUCT: ${o.product||"unknown"} · THE PROMISE OF THE COPY: ${o.message||"unknown"} · SPEAKS TO: ${o.audience||"unknown"} · TONE: ${o.tone||"unknown"}
THE BRIEF ON THE TABLE NOW: "${x.brief}"
HOUSE RULES (never broken): ${photo?"candid, nobody looks at the camera, people caught in a real action; camera three-quarter, side, behind or over the shoulder; ":""}the subject in the CENTRE of the frame with calm space on both sides; a quiet uncluttered scene with one focus; Jordanian context; no text and no other brands in the image; show the human result of the product, never the product itself, a branch, cash or a phone screen with UI.
THE TALK SO FAR:
${x.chat.slice(-10).map(m=>`${m.r==="u"?"DESIGNER":"YOU"}: ${m.t||""}${m.prop?` [you proposed: "${m.prop.brief}"${m.done==="no"?" — he said no":m.done==="used"?" — he accepted it":""}]`:""}`).join("\n")}
HOW TO ANSWER
- "say": 1 to 3 short sentences in the DESIGNER'S language (he usually writes Jordanian Arabic; answer the same way, warm and direct). React to what he actually said. If his idea is good, say why it fits the copy. If it weakens the message or breaks a house rule, say so plainly and offer the nearest thing that works. If what he wants is not clear yet, ask ONE short question and propose nothing.
- "proposal": null while you are still discussing or asking. Give a proposal ONLY when he asked for a change or agreed to one and it is clear enough to write. Then change ONLY what was discussed and keep everything else of the brief on the table. The proposal is a brief in English for the image generator, 25 to 45 words, concrete: who or what, doing what, wardrobe or object, mood, the subject centred with calm space on both sides.
${photo?lvCastInfo():""}
${lvTaste()}
Return ONLY JSON: {"say":"…","proposal":null}  or  {"say":"…","proposal":{"brief":"…","why":"one short sentence in the designer's language on how it fits the copy"${photo?`,"people":[{"role":"","cast":"","outfit":""}]`:""}}}`,{modelTier:"default",cache:false});
    const m={r:"a",t:String(r?.say||"").trim().slice(0,700)}, b=String(r?.proposal?.brief||"").trim();
    if(b){ const tmp={people:r.proposal.people}; if(photo) lvClean(tmp); m.prop={brief:b.slice(0,900),why:String(r.proposal.why||"").slice(0,300),people:photo?tmp.people:[]}; }
    if(!m.t&&!m.prop) throw {code:"bad_answer"}; x.chat.push(m); }
  catch(e){ log("✕","layout talk",{code:e?.code}); x.err=e?.code==="rate_limited"?"Too many requests. Try again in a minute.":"I couldn't answer that. Try again."; }
  x.talking=false; lvDraw(i); }
function lvApply(i,k,yes){ const o=LV.out, x=o?.options?.[i], m=x?.chat?.[k]; if(!m?.prop||m.done) return;
  if(yes){ x.past=x.past||[]; if(x.brief&&!x.past.includes(x.brief)) x.past.push(x.brief); x.brief=m.prop.brief; if(m.prop.why) x.why=m.prop.why; if(x.type!=="icon"&&m.prop.people?.length) x.people=m.prop.people; m.done="used"; lvtAdd("own",o,x,{say:[...x.chat].slice(0,k).reverse().find(q=>q.r==="u")?.t||""}); }
  else { m.done="no"; lvtAdd("rejected",o,{...x,brief:m.prop.brief}); }
  lvDraw(i); }
function lvUse(i){ const o=LV.out, x=o?.options?.[i]; if(!x) return; const mode=LV_TYPES[x.type][1]; if(mode==="none") return;
  if(S.mode!==mode) setMode(mode);
  if(mode==="photo"){ const want=x.type==="photo_studio"?"Studio":"On-location"; document.querySelector(`.seg[data-key="setting"] button[data-v="${want}"]`)?.click(); }
  const as=$("aspect"); if(as&&[...as.options].some(p=>p.value===o.aspect)){ as.value=o.aspect; as.dispatchEvent(new Event("change",{bubbles:true})); }
  lvtAdd("used",o,x);
  const b=$("brief"); const cap=s=>s?s[0].toUpperCase()+s.slice(1):s; b.value=x.brief+(o.comp?" "+o.comp:"")+(mode==="photo"?(x.people||[]).map(p=>` ${cap(p.role)||"Character"}: ${p.cast?`@${p.cast} `:""}${p.outfit?`${p.cast?"wearing":"wears"} [outfit: ${p.outfit}] `:""}`).join(""):""); b.dispatchEvent(new Event("input",{bubbles:true})); b.scrollIntoView({block:"center",behavior:"smooth"}); b.focus();
  if(mode==="photo"&&x.scene){ setUpload(x.scene).then(()=>{ const u=$("useUpAsRef"); if(u) u.checked=true; }).catch(()=>{}); } }
(function(){ const d=$("lvDrop"), f=$("lvFile"); if(!d||!f) return;
  f.addEventListener("change",()=>{ const x=f.files?.[0]; f.value=""; if(x) lvRun(x); });
  const card=d.closest(".brief-card")||d;
  card.addEventListener("dragover",e=>{ if(e.dataTransfer?.types?.includes("Files")){ e.preventDefault(); d.classList.add("over"); } });
  card.addEventListener("dragleave",e=>{ if(!card.contains(e.relatedTarget)) d.classList.remove("over"); });
  card.addEventListener("drop",e=>{ const x=[...(e.dataTransfer?.files||[])].find(y=>/^image\//.test(y.type)); d.classList.remove("over"); if(x){ e.preventDefault(); e.stopPropagation(); lvRun(x); } });
  $("lvOut").addEventListener("change",e=>{ const s=e.target.matches?.("[data-lvscene]")?e.target:null; const f=s?.files?.[0]; if(f){ const i=+s.dataset.lvscene; const q=$("lvOut").querySelector(`[data-lvsay="${i}"] input`)?.value||""; lvRedo(i,q,f); } });
  $("lvOut").addEventListener("submit",e=>{ const f=e.target.closest("[data-lvsay]"); if(!f) return; e.preventDefault(); const q=String(new FormData(f).get("q")||"").trim(); if(q) lvTalk(+f.dataset.lvsay,q); else f.querySelector("input")?.focus(); });
  $("lvOut").addEventListener("click",e=>{ const ap=e.target.closest("[data-lvapply],[data-lvskip]"); if(ap){ lvApply(+(ap.dataset.lvapply??ap.dataset.lvskip),+ap.dataset.k,ap.hasAttribute("data-lvapply")); return; } const u=e.target.closest("[data-lvuse]"); if(u){ lvUse(+u.dataset.lvuse); return; } const mo=e.target.closest("[data-lvmore]"); if(mo){ lvRedo(+mo.dataset.lvmore,""); return; }
    const dr=e.target.closest("[data-lvdrop]"); if(dr){ const x=LV.out?.options?.[+dr.dataset.lvdrop]; if(x){ const k=dr.dataset.k; if(k==="scene"){ try{ URL.revokeObjectURL(x.sceneUrl); }catch{} x.scene=null; x.sceneUrl=""; } else { const p=x.people?.[+dr.dataset.p]; if(p){ p[k]=""; p[k+"Src"]=""; x.people=x.people.filter(q=>q.cast||q.outfit); } } lvDraw(); } return; } if(e.target.closest("[data-lvforget]")){ LVT=[]; lvtSave(); lvDraw(); return; } if(e.target.closest("[data-lvx]")){ LV.out=null; lvDraw(); } });
})();

/* ================= BAE Upscale: the studio's own upscaler. It runs inside this page, on the viewer's own graphics card, with open-source
   weights that ship with the studio (ESRGAN "thick", MIT licence). No outside service, no credits, and the image never leaves the device
   (only small copies go to Claude for the "what I see" and "check" steps). "Training" = a shared set of finishing corrections that moves
   a little each time someone marks a result; the network weights themselves are fixed. ================= */
(function(){
  const P=$("upscale"); if(!P) return; const body=$("upBody");
  const PROBLEMS=[["smooth","Too smooth / plastic",{grain:8,sharp:6}],["pores","Pores / skin texture missing",{grain:10,sharp:4}],["harsh","Too harsh / gritty",{sharp:-12,grain:-6,faith:8}],["invented","Invented detail",{faith:15}],["mark","Real mark lost or changed",{faith:15}],["wrinkles","Wrinkles changed",{faith:10}],["freckles","Freckles / spots lost",{faith:10,grain:3}],["hair","Hair / beard wrong",{sharp:6}],["eyes","Eyes blurry or changed",{sharp:8}],["lips","Lips / mouth / teeth wrong",{sharp:5}],["identity","Looks like a different person",{faith:20}],["halos","Halos / over-sharpened edges",{sharp:-15,faith:5}],["bg","Background artefacts",{faith:8,grain:-2}]];
  const PK=Object.fromEntries(PROBLEMS.map(p=>[p[0],p]));
  const NUM=["sharp","grain","faith"], ZERO=()=>({sharp:0,grain:0,faith:0});
  const CHAIN={"2x":[2],"4x":[4],"8x":[2,4],"10x":[2,4],"16x":[4,4]}, MAXSIDE=12000;
  /* phones and tablets have little graphics memory and a small canvas limit: smaller tiles, smaller results */
  const PHONE=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Mac/i.test(navigator.platform||""));
  const MAXAREA=PHONE?12e6:140e6, TILE=PHONE?64:128;
  const tooBig=k=>{ const m=+k.replace("x",""), w=U.w*m, h=U.h*m; return Math.max(w,h)>MAXSIDE||w*h>MAXAREA; };
  /* open any picture the browser can show, also formats createImageBitmap refuses (HEIC on iPhone) */
  async function decode(src){ try{ return await createImageBitmap(src); }catch{} const u=URL.createObjectURL(src); try{ const im=new Image(); im.decoding="async"; await new Promise((res,rej)=>{ im.onload=res; im.onerror=rej; im.src=u; }); const c=document.createElement("canvas"); c.width=im.naturalWidth; c.height=im.naturalHeight; c.getContext("2d").drawImage(im,0,0); return c; } finally{ setTimeout(()=>URL.revokeObjectURL(u),2000); } }
  const U={file:null,url:"",w:0,h:0,scan:null,target:"4x",tune:ZERO(),runs:[],sel:-1,busy:"",prog:0,err:"",msg:"",marks:new Set(),note:"",auto:null,autoBusy:false,team:{clean:ZERO(),blurry:ZERO(),n:0,lessons:[]},teamLoaded:false,canTeach:false,split:50,zoom:{x:.5,y:.35},stop:false};
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,Math.round(v)));
  const bucket=()=>/blurry|very_low/.test(U.scan?.quality||"")?"blurry":"clean";
  const hasFace=()=>!!U.scan&&U.scan.face!=="none";
  /* ---------- team tuning ---------- */
  async function teamLoad(){ if(U.teamLoaded) return; U.teamLoaded=true; try{ const l=JSON.parse(localStorage.getItem("bae_up_tuning2")||"null"); if(l) U.team={...U.team,...l}; }catch{}
    try{ await rlStoreInit(); if(RLS.db){ const d=await RLS.db.collection("upscale").doc("tuning2").get(); if(d.exists){ const v=JSON.parse(JSON.stringify(d.data())); U.team={clean:{...ZERO(),...(v.clean||{})},blurry:{...ZERO(),...(v.blurry||{})},n:+v.n||0,lessons:Array.isArray(v.lessons)?v.lessons:[]}; } } const u=await window.claude?.use?.("user"); U.canTeach=!!u?.canEdit?.(); }catch{} }
  async function teamSave(){ try{ localStorage.setItem("bae_up_tuning2",JSON.stringify(U.team)); }catch{} try{ await rlStoreInit(); if(RLS.db&&U.canTeach) await RLS.db.collection("upscale").doc("tuning2").set(JSON.parse(JSON.stringify(U.team))); }catch(e){ log("✕","upscale tuning save",{code:e?.code}); } }
  function teamLearn(fin,rate,lesson){ const b=U.team[bucket()], base=baseFin(); for(const k of NUM) b[k]=Math.round((b[k]+((fin[k]-base[k])-b[k])*rate)*10)/10; U.team.n=(+U.team.n||0)+1; if(lesson) U.team.lessons=[{t:Date.now(),q:bucket(),...lesson},...(U.team.lessons||[])].slice(0,40); teamSave(); }
  /* finishing = what happens after the network: how close to the original, how sharp, how much fine grain */
  const baseFin=()=>({sharp:hasFace()?22:16,grain:hasFace()?12:6,faith:bucket()==="blurry"?6:12});
  const fin=()=>{ const b=baseFin(), t=U.team[bucket()]; return {sharp:clamp(b.sharp+(+t.sharp||0)+U.tune.sharp,0,100),grain:clamp(b.grain+(+t.grain||0)+U.tune.grain,0,60),faith:clamp(b.faith+(+t.faith||0)+U.tune.faith,0,70)}; };
  const mult=()=>+U.target.replace("x","")||1;
  const outPx=()=>[Math.round(U.w*mult()),Math.round(U.h*mult())];
  /* ---------- the engine ---------- */
  let TF=null; const MODELS={};
  async function engine(){ if(TF) return TF;
    if(!window.tf) await new Promise((res,rej)=>{ const s=document.createElement("script"); s.src="up/tf.min.js"; s.onload=res; s.onerror=()=>rej({message:"The upscale engine didn't load. Reload the page and try again."}); document.head.appendChild(s); });
    const tf=window.tf; try{ await tf.setBackend("webgl"); }catch{} await tf.ready(); try{ tf.env().set("WEBGL_DELETE_TEXTURE_THRESHOLD",0); if(PHONE) tf.env().set("WEBGL_FORCE_F16_TEXTURES",true); }catch{}
    if(tf.getBackend()!=="webgl") throw {message:"This browser has no graphics acceleration (WebGL), which BAE Upscale needs. Try Chrome on a computer."};
    const one=i=>Array.isArray(i)?i[0]:i;
    class MultiplyBeta extends tf.layers.Layer{ constructor(){ super({}); } call(i){ return tf.mul(one(i),0.2); } static className="MultiplyBeta"; }
    const shuffle=s=>{ class PS extends tf.layers.Layer{ constructor(){ super({}); } computeOutputShape(sh){ return [sh[0],sh[1],sh[2],3]; } call(i){ return tf.depthToSpace(one(i),s,"NHWC"); } static className=`PixelShuffle${s}x`; } return PS; };
    for(const c of [MultiplyBeta,shuffle(2),shuffle(4)]){ try{ tf.serialization.registerClass(c); }catch{} }
    return TF=tf; }
  async function model(s){ if(MODELS[s]) return MODELS[s]; const tf=await engine(); U.busy=`Loading the ${s}× network (once)…`; draw(); const net=await (await fetch(`up/x${s}/net.json`)).json(); const data=new Uint8Array(net.bytes); let off=0;
    for(const p of net.parts){ const t=await (await fetch(`up/x${s}/${p}`)).text(); for(let i=0;i<t.length;i+=1048576){ const bin=atob(t.slice(i,i+1048576)); for(let j=0;j<bin.length;j++) data[off++]=bin.charCodeAt(j); } }
    if(off!==net.bytes) throw {message:"The upscale network didn't download completely. Reload and try again."};
    return MODELS[s]=await tf.loadLayersModel(tf.io.fromMemory({modelTopology:net.modelTopology,format:net.format,generatedBy:net.generatedBy,convertedBy:net.convertedBy,weightSpecs:net.weightSpecs,weightData:data.buffer})); }
  const mk=(w,h)=>{ const c=document.createElement("canvas"); c.width=w; c.height=h; return c; };
  /* one network pass over the whole picture, tile by tile with overlap so no seams show */
  async function pass(src,s,label,from,to){ const tf=await engine(), net=await model(s); const W=src.width, H=src.height, out=mk(W*s,H*s), og=out.getContext("2d"), sg=src.getContext("2d",{willReadFrequently:true});
    const T=TILE, PAD=PHONE?8:12; const cols=Math.ceil(W/T), rows=Math.ceil(H/T), total=cols*rows; let done=0;
    for(let ty=0;ty<rows;ty++) for(let tx=0;tx<cols;tx++){ if(U.stop) throw {code:"stopped"};
      const x0=tx*T, y0=ty*T, x1=Math.min(W,x0+T), y1=Math.min(H,y0+T), sx=Math.max(0,x0-PAD), sy=Math.max(0,y0-PAD), ex=Math.min(W,x1+PAD), ey=Math.min(H,y1+PAD), w=ex-sx, h=ey-sy;
      const id=sg.getImageData(sx,sy,w,h);
      const t=tf.tidy(()=>{ const x=tf.browser.fromPixels(id,3).toFloat().div(255).expandDims(0); const y=net.predict(x); return tf.clipByValue(one2(y),0,1).mul(255).squeeze(0); });
      const d=await t.data(); t.dispose(); const ow=w*s, oh=h*s, od=new ImageData(ow,oh), px=od.data; for(let i=0,j=0;i<d.length;i+=3,j+=4){ px[j]=d[i]; px[j+1]=d[i+1]; px[j+2]=d[i+2]; px[j+3]=255; }
      const tc=mk(ow,oh); tc.getContext("2d").putImageData(od,0,0);
      og.drawImage(tc,(x0-sx)*s,(y0-sy)*s,(x1-x0)*s,(y1-y0)*s,x0*s,y0*s,(x1-x0)*s,(y1-y0)*s);
      done++; U.prog=from+(to-from)*done/total; U.busy=`${label} · ${Math.round(done/total*100)}%`; tick(); await tf.nextFrame(); }
    return out; }
  const one2=y=>Array.isArray(y)?y[0]:y;
  function resize(src,w,h){ if(src.width===w&&src.height===h) return src; let c=src; /* step down in halves for a clean result */ while(c.width/2>w&&c.height/2>h){ const n=mk(Math.round(c.width/2),Math.round(c.height/2)), g=n.getContext("2d"); g.imageSmoothingQuality="high"; g.drawImage(c,0,0,n.width,n.height); c=n; }
    const o=mk(w,h), g=o.getContext("2d"); g.imageSmoothingQuality="high"; g.drawImage(c,0,0,w,h); return o; }
  /* finishing: blend toward the plain enlargement (faithfulness), unsharp mask, fine luminance grain */
  async function finish(raw,f){ const W=raw.width, H=raw.height, out=mk(W,H), g=out.getContext("2d",{willReadFrequently:true}); g.drawImage(raw,0,0);
    if(f.faith>0){ const base=await decode(U.file); g.globalAlpha=f.faith/100; g.imageSmoothingQuality="high"; g.drawImage(base,0,0,W,H); g.globalAlpha=1; }
    if(f.sharp<=0&&f.grain<=0) return out;
    const k=Math.max(1,mult()), rad=Math.max(.6,k*.28), amt=f.sharp/100*1.6, sig=f.grain/100*22, cell=Math.max(1,Math.round(k/3));
    const bl=mk(W,H), bg=bl.getContext("2d",{willReadFrequently:true}); if(amt>0){ bg.filter=`blur(${rad}px)`; bg.drawImage(out,0,0); bg.filter="none"; }
    const STR=256; let seed=1234567; const rnd=()=>{ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; };
    for(let y=0;y<H;y+=STR){ const h=Math.min(STR,H-y), a=g.getImageData(0,y,W,h), p=a.data, b=amt>0?bg.getImageData(0,y,W,h).data:null;
      let nrow=null; for(let r=0;r<h;r++){ if(sig>0&&((y+r)%cell===0||!nrow)){ nrow=new Float32Array(Math.ceil(W/cell)+1); for(let i=0;i<nrow.length;i++) nrow[i]=(rnd()+rnd()+rnd()-1.5)*sig; }
        for(let x=0,i=r*W*4;x<W;x++,i+=4){ let R=p[i],G=p[i+1],B=p[i+2]; if(b){ const dr=R-b[i],dg=G-b[i+1],db=B-b[i+2]; const lim=40; R+=amt*Math.max(-lim,Math.min(lim,dr)); G+=amt*Math.max(-lim,Math.min(lim,dg)); B+=amt*Math.max(-lim,Math.min(lim,db)); }
          if(sig>0){ const l=(R*.3+G*.59+B*.11)/255, n=nrow[(x/cell)|0]*(.35+.65*4*l*(1-l)); R+=n; G+=n; B+=n; }
          p[i]=R<0?0:R>255?255:R; p[i+1]=G<0?0:G>255?255:G; p[i+2]=B<0?0:B>255?255:B; } }
      g.putImageData(a,0,y); if((y/STR)%8===0) await new Promise(r=>setTimeout(r,0)); }
    return out; }
  const toBlob=(c,type,q)=>new Promise(r=>c.toBlob(r,type,q));
  let tickAt=0; const tick=()=>{ const n=Date.now(); if(n-tickAt<250) return; tickAt=n; const el=$("upBusy"); if(el) el.textContent=U.busy; const pb=$("upProg"); if(pb) pb.value=Math.round(U.prog*100); };
  /* the chosen image is kept in this browser, so a page reload (for example when the studio updates) does not lose it */
  const idb=()=>new Promise((res,rej)=>{ const r=indexedDB.open("bae_upscale",1); r.onupgradeneeded=()=>r.result.createObjectStore("k"); r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); });
  async function keep(f){ try{ if(f&&!f._buf) f._buf=await f.arrayBuffer(); const d=await idb(); await new Promise((res,rej)=>{ const t=d.transaction("k","readwrite"); f?t.objectStore("k").put({buf:f._buf,name:f.name,type:f.type,target:U.target},"last"):t.objectStore("k").delete("last"); t.oncomplete=res; t.onerror=()=>rej(t.error); }); d.close(); }catch{} }
  async function restore(){ if(U.file) return; try{ const d=await idb(); const v=await new Promise((res,rej)=>{ const q=d.transaction("k").objectStore("k").get("last"); q.onsuccess=()=>res(q.result); q.onerror=()=>rej(q.error); }); d.close(); if(v?.buf&&!U.file){ const ok=await setFile(new File([v.buf],v.name||"image",{type:v.type||"image/jpeg"}),true); if(!ok){ U.err=""; draw(); keep(null); return; } if(v.target&&CHAIN[v.target]&&!tooBig(v.target)){ U.target=v.target; } U.msg0="Your last image is back. The enlarged versions are not kept after a reload, so press Upscale again."; draw(); } }catch{} }
  /* ---------- reading the picture ---------- */
  async function setFile(f,quiet){ if(!f||!/^image\//.test(f.type)){ U.err="That file isn't an image. Use JPEG, PNG or WebP."; draw(); return; } if(U.busy) return; U.msg0="";
    let bmp=await decode(f).catch(()=>null); if(!bmp||!bmp.width){ U.err="Couldn't open that image. Try a JPEG or PNG."; draw(); return false; }
    if(!/^image\/(jpeg|png|webp)$/.test(f.type)||!(await createImageBitmap(f).catch(()=>null))){ const c=mk(bmp.width,bmp.height); c.getContext("2d").drawImage(bmp,0,0); const b=await toBlob(c,"image/png"); if(b) f=new File([b],String(f.name||"image").replace(/\.[a-z0-9]+$/i,"")+".png",{type:"image/png"}); }
    try{ if(U.url) URL.revokeObjectURL(U.url); }catch{}
    for(const r of U.runs){ try{ URL.revokeObjectURL(r.url); }catch{} }
    Object.assign(U,{file:f,url:URL.createObjectURL(f),w:bmp.width,h:bmp.height,scan:null,tune:ZERO(),runs:[],sel:-1,err:"",msg:"",marks:new Set(),note:"",auto:null});
    const L=Math.max(bmp.width,bmp.height); const want=L<=500?"10x":L<=800?"8x":L<=1600?"4x":"2x", keys=Object.keys(CHAIN); U.target=[...keys.slice(0,keys.indexOf(want)+1)].reverse().find(k=>!tooBig(k))||"2x"; draw(); if(!quiet) keep(f); scan(); return true; }
  async function scan(){ const blank={quality:"soft",noise:"none",face:"none",faces:0,facebox:null,marks:[],describe:"",risk:""}; if(!sample||!U.file){ U.scan=blank; draw(); return; } const f=U.file; U.scanBusy=true; draw();
    try{ const o=await rlAsk(`You are a photo restoration specialist preparing an image for a faithful enlargement. Look at the attached image (${U.w}×${U.h} px) and report only what is really there.
Return ONLY JSON:
{"quality":"clean|soft|blurry|very_low" (clean = sharp, just small; soft = slightly soft; blurry = clearly blurred or heavily compressed; very_low = tiny or badly degraded),
"noise":"none|jpeg|grain",
"face":"none|small|medium|large" (how much of the frame the main face fills), "faces":0,
"facebox":{"x":0,"y":0,"w":0,"h":0} (the main face as fractions of the image width and height, or null),
"marks":["every real identifying mark you can see, each with its exact place, e.g. 'small mole on the left cheek near the nose', 'freckles across the nose', 'short beard with a gap under the lower lip', 'crow's feet at the right eye', 'scar on the chin'"] (up to 8, empty if none are visible),
"describe":"one faithful sentence: who is in it (age range, gender, hair, beard, headwear), expression, clothing, light. No names.",
"risk":"one short sentence in plain words on what could go wrong when this image is enlarged"}`,{images:[await toJpeg(f,1400).catch(()=>f)],cache:false});
      if(U.file!==f) return; U.scan={quality:["clean","soft","blurry","very_low"].includes(o?.quality)?o.quality:"soft",noise:o?.noise||"none",face:o?.face||"none",faces:+o?.faces||0,facebox:o?.facebox&&+o.facebox.w>0?o.facebox:null,marks:(Array.isArray(o?.marks)?o.marks:[]).map(String).slice(0,8),describe:String(o?.describe||""),risk:String(o?.risk||"")};
    }catch(e){ log("✕","upscale scan",{code:e?.code}); if(U.file===f) U.scan=blank; }
    U.scanBusy=false; if(!U.busy) draw(); }
  /* ---------- run ---------- */
  async function run(){ if(U.busy||!U.file) return; const [ow,oh]=outPx(); if(tooBig(U.target)){ U.err=PHONE?"That is too large for a phone. Choose a smaller size, or use a computer.":"That is larger than a browser can hold. Choose a smaller size."; draw(); return; }
    U.err=""; U.auto=null; U.stop=false; U.prog=0; U.busy="Starting the engine…"; draw(); const t0=Date.now(), target=U.target, chain=CHAIN[target];
    try{ await engine(); const bmp=await decode(U.file); let c=mk(bmp.width,bmp.height); c.getContext("2d").drawImage(bmp,0,0);
      /* weight each pass by its pixel count so the bar moves evenly */ let px=bmp.width*bmp.height; const wts=chain.map(s=>{ const v=px; px*=s*s; return v; }), sum=wts.reduce((a,b)=>a+b,0); let acc=0;
      for(let i=0;i<chain.length;i++){ const a=acc/sum; acc+=wts[i]; c=await pass(c,chain[i],`Pass ${i+1} of ${chain.length} · ${chain[i]}×`,a*.94,acc/sum*.94); }
      const raw=resize(c,ow,oh); U.busy="Finishing…"; U.prog=.96; draw();
      await addRun(raw,target,Math.round((Date.now()-t0)/1000)); U.busy=""; draw(); check();
    }catch(e){ log("✕","upscale",{code:e?.code,message:e?.message}); U.busy=""; U.msg0=""; U.err=e?.code==="stopped"?"Stopped.":(e?.message&&!/[{<]/.test(e.message)?String(e.message).slice(0,200):"The upscale didn't finish. Try a smaller size, or close other heavy tabs."); draw(); } }
  async function addRun(raw,target,secs){ const f=fin(), out=await finish(raw,f), blob=await toBlob(out,"image/jpeg",.95); const run={raw,canvas:out,blob,url:URL.createObjectURL(blob),fin:{...f},target,w:out.width,h:out.height,secs,label:`v${U.runs.length+1} · ${target.replace("x","×")}`,marks:[],note:""};
    U.runs.push(run); U.sel=U.runs.length-1; U.marks=new Set(); U.note=""; return run; }
  /* ---------- checking ---------- */
  async function crop(src,box,size){ const bmp=await decode(src); const b=box||{x:.25,y:.15,w:.5,h:.5}, pad=.25; const x=Math.max(0,(b.x-b.w*pad))*bmp.width, y=Math.max(0,(b.y-b.h*pad))*bmp.height, w=Math.min(bmp.width-x,b.w*(1+2*pad)*bmp.width), h=Math.min(bmp.height-y,b.h*(1+2*pad)*bmp.height);
    const k=Math.min(1,size/Math.max(w,h))||1, c=mk(Math.max(1,Math.round(w*k)),Math.max(1,Math.round(h*k))); const g=c.getContext("2d"); g.imageSmoothingQuality="high"; g.drawImage(bmp,x,y,w,h,0,0,c.width,c.height); return await toBlob(c,"image/jpeg",.92); }
  async function check(){ const o=U.runs[U.sel]; if(!o||U.autoBusy) return; if(!sample){ U.auto={error:"The automatic check needs Claude. Mark the problems yourself below."}; draw(); return; } U.autoBusy=true; draw();
    try{ const fb=U.scan?.facebox; const imgs=[await crop(U.file,fb,900),await crop(o.blob,fb,1400),await toJpeg(U.file,900),await toJpeg(o.blob,1200)];
      const r=await rlAsk(`You are a strict retoucher checking an image enlargement. Images in order: 1 = ORIGINAL, close crop of the main subject; 2 = ENLARGED, the same crop; 3 = ORIGINAL, whole frame; 4 = ENLARGED, whole frame. The goal was a faithful enlargement: sharper and cleaner, the same person, nothing invented, natural skin.
Real marks seen in the original: ${(U.scan?.marks||[]).join("; ")||"none listed"}.
Compare region by region — skin of forehead, cheeks, nose; eyes and lashes; eyebrows; lips, mouth, teeth; hair, hairline, beard; clothing and headwear; background — and report every real problem, nothing imagined. Problem keys you may use: ${PROBLEMS.map(p=>`${p[0]} (${p[1]})`).join(", ")}.
Return ONLY JSON: {"identity":"same|slightly_changed|changed","score":0-100,"verdict":"one short plain sentence","issues":[{"key":"…","where":"e.g. left cheek","note":"what exactly is wrong, in a few words"}],"good":["up to 3 things that came out well"]}`,{images:imgs,cache:false});
      if(U.runs[U.sel]!==o) { U.autoBusy=false; return; }
      U.auto={identity:r?.identity||"same",score:clamp(+r?.score||0,0,100),verdict:String(r?.verdict||""),issues:(Array.isArray(r?.issues)?r.issues:[]).filter(x=>PK[x?.key]).slice(0,10),good:(Array.isArray(r?.good)?r.good:[]).map(String).slice(0,3)};
      for(const x of U.auto.issues) U.marks.add(x.key); if(U.auto.identity==="changed") U.marks.add("identity");
    }catch(e){ log("✕","upscale check",{code:e?.code}); U.auto={error:"The automatic check couldn't run. Mark the problems yourself below."}; }
    U.autoBusy=false; draw(); }
  /* ---------- retry and teach: the network result is kept, only the finishing is redone, so a retry takes seconds ---------- */
  async function refinish(lesson){ const o=U.runs[U.sel]; if(!o||U.busy) return; U.busy="Applying the fixes…"; U.err=""; draw();
    try{ const run=await addRun(o.raw,o.target,0); if(lesson) teamLearn(run.fin,.2,lesson); U.auto=null; U.busy=""; draw(); check(); }catch(e){ U.busy=""; U.err="Couldn't apply the fixes."; draw(); } }
  async function retry(){ const o=U.runs[U.sel]; if(!o||U.busy) return; if(!U.marks.size&&!U.note.trim()){ U.err="Mark at least one problem or write a note first."; draw(); return; }
    const d=ZERO(); for(const k of U.marks){ const p=PK[k]?.[2]||{}; for(const q in p) d[q]+=p[q]; }
    if(U.note.trim()&&sample){ U.busy="Reading your note…"; draw(); try{ const r=await rlAsk(`A retoucher wrote this note about an enlarged photo: "${U.note.trim().slice(0,600)}". Turn it into corrections for the finishing sliders. sharp = edge sharpness (-20..20). grain = fine photographic grain that gives skin micro-texture (-20..20). faith = how much to pull the result back toward the plain original, which removes invented detail and harshness but softens (-20..20). 0 = no change.
Return ONLY JSON: {"sharp":0,"grain":0,"faith":0}`,{modelTier:"quick",cache:false}); for(const k of NUM) d[k]+=clamp(+r?.[k]||0,-20,20); }catch{} U.busy=""; }
    for(const k of NUM) U.tune[k]=clamp(U.tune[k]+d[k],-80,80); o.marks=[...U.marks]; o.note=U.note;
    await refinish({marks:o.marks,note:U.note.trim().slice(0,200),ok:false}); }
  function approve(){ const o=U.runs[U.sel]; if(!o) return; o.ok=true; teamLearn(o.fin,.5,{marks:[],note:"approved",ok:true}); U.msg="Saved. The next images of this kind start from these settings."; draw(); setTimeout(()=>{ U.msg=""; if(!P.hidden&&!U.busy) draw(); },4000); }
  async function download(kind){ const o=U.runs[U.sel]; if(!o) return; const name=(U.file?.name||"image").replace(/\.[a-z0-9]+$/i,"")+"_BAE-Upscale_"+o.target; const b=kind==="png"?await toBlob(o.canvas,"image/png"):o.blob; if(b) await uxSaveBlob(b,name).catch(()=>{}); }
  /* ---------- page ---------- */
  const QN={clean:"Sharp, just small",soft:"Slightly soft",blurry:"Blurry or compressed",very_low:"Very low quality"};
  const SL=[["sharp","Sharpness",0,100],["grain","Skin grain",0,60],["faith","Stay close to the original",0,70]];
  function draw(){ const o=U.runs[U.sel]||null, [ow,oh]=outPx(), big=!!U.file&&tooBig(U.target), f=fin(), mp=ow*oh/1e6;
    body.innerHTML=`
    <section class="rl-card up-top">
      <label class="pg-drop up-drop${U.file?" has":""}" id="upDrop"><input type="file" accept="image/*" id="upFile" ${U.busy?"disabled":""}>${U.file?`<img src="${U.url}" alt="Your image"><span><b data-noi18n>${esc(U.file.name)}</b><span class="t12 muted">${U.w} × ${U.h} px · click, drop or paste to replace</span></span>`:`<span><b>Drop, paste or choose an image</b><span class="t12 muted">It is enlarged here on your own computer. Nothing is uploaded and nothing is charged.</span></span>`}</label>
      ${U.file?`<div class="up-set">
        <div><span class="lbl">Enlarge</span><div class="a-seg" role="group" aria-label="Scale">${Object.keys(CHAIN).map(k=>`<button type="button" data-upscale="${k}" aria-pressed="${U.target===k}" ${U.busy||tooBig(k)?"disabled":""}>${k.replace("x","×")}</button>`).join("")}</div><span class="t12 ${big?"bad":"muted"}">${ow.toLocaleString()} × ${oh.toLocaleString()} px · ${mp<10?mp.toFixed(1):Math.round(mp)} MP${big?(PHONE?" · too large for a phone":" · too large for a browser"):mp>40?" · large: this can take several minutes":""}</span>${PHONE?`<span class="t12 muted">On a phone the result is limited to 12 MP and it is slow. A computer does the big sizes.</span>`:""}</div>
        <div class="up-scan"><span class="lbl">What I see</span>${U.scan?`<p><b>${QN[U.scan.quality]}</b>${U.scan.face!=="none"?` · face: ${esc(U.scan.face)}`:" · no face"}${U.scan.noise!=="none"?` · ${esc(U.scan.noise)} noise`:""}</p>${U.scan.marks.length?`<p class="t12">Real marks to keep: <span data-noi18n dir="auto">${esc(U.scan.marks.join(" · "))}</span></p>`:""}${/blurry|very_low/.test(U.scan.quality)?`<p class="t12 bad">This image is blurred. The engine enlarges and cleans it without inventing a face, so detail that is not in the picture will not come back.</p>`:U.scan.risk?`<p class="t12 muted" data-noi18n dir="auto">${esc(U.scan.risk)}</p>`:""}`:`<p class="t12 muted">${U.scanBusy?"Looking at your image…":"—"}</p>`}</div>
        <div class="up-plan"><span class="lbl">Plan</span><ol>${CHAIN[U.target].map(s=>`<li><b>BAE Upscale ${s}× pass</b><span class="t12 muted">Rebuilds edges and texture from the pixels that are there</span></li>`).join("")}${U.target==="10x"?`<li><b>Resample to 10×</b><span class="t12 muted">From 8× with a high-quality resize</span></li>`:""}<li><b>Finishing</b><span class="t12 muted">sharpness ${f.sharp} · skin grain ${f.grain} · close to original ${f.faith}%</span></li></ol></div>
      </div>
      <div class="rl-btns"><button type="button" class="btn primary" data-upgo ${U.busy||big?"disabled":""}>${U.runs.length?"Upscale again":"Upscale"}</button>${U.busy?`<button type="button" class="btn small" data-upstop>Stop</button>`:""}</div>
      ${U.busy?`<div class="up-busy"><progress id="upProg" max="100" value="${Math.round(U.prog*100)}" aria-label="Progress"></progress><span class="t12" id="upBusy" role="status">${esc(U.busy)}</span></div>`:""}`:""}
      ${U.err?`<p class="t12 bad" role="alert">${esc(U.err)}</p>`:""}${U.msg0&&!U.runs.length?`<p class="t12" role="status">${esc(U.msg0)}</p>`:""}
      <p class="t12 muted">BAE Upscale runs on this computer's graphics card. Free, private, no outside service. Team tuning learned from ${+U.team.n||0} marked result${U.team.n===1?"":"s"}.</p>
    </section>
    ${o?`<section class="rl-card up-res">
      <div class="rl-ihead"><b>Compare</b><div class="rl-btns">${U.runs.map((r,i)=>`<button type="button" class="btn small${i===U.sel?" primary":""}" data-upsel="${i}" data-noi18n>${esc(r.label)}${r.ok?" ✓":""}</button>`).join("")}</div></div>
      <div class="up-cmp" id="upCmp" style="aspect-ratio:${U.w}/${U.h};max-width:calc(72vh * ${(U.w/U.h).toFixed(4)})"><img src="${o.url}" alt="Enlarged image"><div class="b4" id="upB4" style="width:${U.split}%"><img src="${U.url}" alt="Original image" style="width:${10000/Math.max(1,U.split)}%"></div><span class="tag l">Before</span><span class="tag r">After</span><div class="bar" id="upBar" style="left:${U.split}%" role="slider" tabindex="0" aria-label="Before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(U.split)}"></div></div>
      <p class="t12 muted">Drag the line to compare. Click anywhere on the image to inspect that spot at full detail below. ${o.w.toLocaleString()} × ${o.h.toLocaleString()} px${o.secs?` · took ${o.secs>90?Math.round(o.secs/60)+" min":o.secs+" s"}`:""}</p>
      <div class="up-loupe"><figure><div id="upL1"></div><figcaption>Before</figcaption></figure><figure><div id="upL2"></div><figcaption>After · 100%</figcaption></figure></div>
      <div class="up-sl">${SL.map(([k,l,a,b])=>`<label><span>${l}</span><input type="range" min="${a}" max="${b}" value="${f[k]}" data-upsl="${k}" ${U.busy?"disabled":""}><output>${f[k]}</output></label>`).join("")}<button type="button" class="btn small" data-upapply ${U.busy?"disabled":""}>Apply</button></div>
      <div class="rl-btns"><button type="button" class="btn small primary" data-updl="jpg">Download JPEG</button><button type="button" class="btn small" data-updl="png">Download PNG</button></div>
    </section>
    <section class="rl-card up-chk">
      <div class="rl-ihead"><b>Check</b>${U.autoBusy?`<span class="t12" role="status">Checking every region…</span>`:`<button type="button" class="a-btn" data-upcheck>Check again</button>`}</div>
      ${U.auto&&!U.auto.error?`<div class="up-auto"><p><b>${U.auto.score}/100</b> · identity: <b class="${U.auto.identity==="same"?"ok":"bad"}">${esc(U.auto.identity.replace("_"," "))}</b></p><p data-noi18n dir="auto">${esc(U.auto.verdict)}</p>${U.auto.issues.length?`<ul>${U.auto.issues.map(x=>`<li><b>${esc(PK[x.key][1])}</b> <span data-noi18n dir="auto">${esc([x.where,x.note].filter(Boolean).join(" — "))}</span></li>`).join("")}</ul>`:`<p class="t12 ok">No problems found by the automatic check. Look yourself too.</p>`}${U.auto.good.length?`<p class="t12 muted" data-noi18n dir="auto">Good: ${esc(U.auto.good.join(" · "))}</p>`:""}</div>`:U.auto?.error?`<p class="t12 muted">${esc(U.auto.error)}</p>`:""}
      <span class="lbl">Mark the problems</span>
      <div class="up-marks">${PROBLEMS.map(([k,l])=>`<button type="button" class="br-topic" data-upmark="${k}" aria-pressed="${U.marks.has(k)}">${l}</button>`).join("")}</div>
      <label class="lbl" for="upNote">Note (optional)</label><textarea class="rl-field" id="upNote" rows="2" dir="auto" placeholder="e.g. skin on the cheeks is too smooth, beard edge too sharp">${esc(U.note)}</textarea>
      <div class="rl-btns"><button type="button" class="btn primary" data-upretry ${U.busy?"disabled":""}>Retry with these fixes</button><button type="button" class="btn" data-upok ${U.busy?"disabled":""}>This one is right · remember it</button></div>
      ${U.msg?`<p class="t12 ok" role="status">${esc(U.msg)}</p>`:""}
      <p class="t12 muted">A retry only redoes the finishing, so it takes seconds and costs nothing. Both buttons teach the team tuning${U.canTeach?"":" on this device; only the studio owner's marks are shared with everyone"}.</p>
    </section>`:""}`;
    if(o) loupe(); if(typeof uxT==="function") uxT(P); }
  function loupe(){ const o=U.runs[U.sel]; const a=$("upL1"), b=$("upL2"); if(!o||!a) return; const W=o.w, H=o.h, bw=a.clientWidth||320, bh=a.clientHeight||240;
    const px=clamp(U.zoom.x*W-bw/2,0,Math.max(0,W-bw)), py=clamp(U.zoom.y*H-bh/2,0,Math.max(0,H-bh));
    for(const [el,src] of [[a,U.url],[b,o.url]]){ el.style.backgroundImage=`url("${src}")`; el.style.backgroundSize=`${W}px ${H}px`; el.style.backgroundPosition=`-${px}px -${py}px`; } }
  P.addEventListener("click",e=>{ const t=e.target;
    const s=t.closest("[data-upscale]"); if(s){ if(!U.busy){ U.target=s.dataset.upscale; draw(); if(U.file) keep(U.file); } return; }
    if(t.closest("[data-upgo]")){ run(); return; } if(t.closest("[data-upstop]")){ U.stop=true; return; }
    if(t.closest("[data-upretry]")){ U.note=$("upNote")?.value||""; retry(); return; } if(t.closest("[data-upok]")){ approve(); return; }
    const dl=t.closest("[data-updl]"); if(dl){ download(dl.dataset.updl); return; } if(t.closest("[data-upcheck]")){ check(); return; }
    if(t.closest("[data-upapply]")){ const cur=fin(); for(const el of P.querySelectorAll("[data-upsl]")) U.tune[el.dataset.upsl]+=(+el.value)-cur[el.dataset.upsl]; refinish(null); return; }
    const v=t.closest("[data-upsel]"); if(v){ U.sel=+v.dataset.upsel; U.marks=new Set(U.runs[U.sel].marks||[]); U.note=U.runs[U.sel].note||""; U.auto=null; draw(); return; }
    const m=t.closest("[data-upmark]"); if(m){ const k=m.dataset.upmark; U.marks.has(k)?U.marks.delete(k):U.marks.add(k); m.setAttribute("aria-pressed",U.marks.has(k)); return; }
    const c=t.closest("#upCmp"); if(c&&!t.closest("#upBar")){ const r=c.getBoundingClientRect(); U.zoom={x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height}; loupe(); } });
  P.addEventListener("input",e=>{ if(e.target.id==="upNote") U.note=e.target.value; const sl=e.target.closest?.("[data-upsl]"); if(sl) sl.nextElementSibling.textContent=sl.value; });
  P.addEventListener("change",e=>{ if(e.target.id==="upFile"){ const f=e.target.files?.[0]; e.target.value=""; if(f) setFile(f); } });
  P.addEventListener("dragover",e=>{ if(e.dataTransfer?.types?.includes("Files")){ e.preventDefault(); $("upDrop")?.classList.add("over"); } });
  P.addEventListener("dragleave",e=>{ if(!P.contains(e.relatedTarget)) $("upDrop")?.classList.remove("over"); });
  P.addEventListener("drop",e=>{ const f=[...(e.dataTransfer?.files||[])].find(x=>/^image\//.test(x.type)); if(f){ e.preventDefault(); setFile(f); } });
  document.addEventListener("paste",e=>{ if(P.hidden||e.target.closest?.("textarea,input,[contenteditable]")) return; const f=[...(e.clipboardData?.files||[])].find(x=>/^image\//.test(x.type)); if(f){ e.preventDefault(); setFile(f); } });
  const setSplit=v=>{ U.split=Math.max(2,Math.min(98,v)); const b4=$("upB4"), bar=$("upBar"); if(!b4) return; b4.style.width=U.split+"%"; b4.firstElementChild.style.width=(10000/U.split)+"%"; bar.style.left=U.split+"%"; bar.setAttribute("aria-valuenow",Math.round(U.split)); };
  P.addEventListener("pointerdown",e=>{ const bar=e.target.closest("#upBar"); if(!bar) return; e.preventDefault(); bar.setPointerCapture(e.pointerId); const mv=ev=>{ const r=$("upCmp").getBoundingClientRect(); setSplit((ev.clientX-r.left)/r.width*100); }; const up=()=>{ bar.removeEventListener("pointermove",mv); bar.removeEventListener("pointerup",up); bar.removeEventListener("pointercancel",up); }; bar.addEventListener("pointermove",mv); bar.addEventListener("pointerup",up); bar.addEventListener("pointercancel",up); });
  P.addEventListener("keydown",e=>{ if(e.target.id!=="upBar") return; if(e.key==="ArrowLeft"){ e.preventDefault(); setSplit(U.split-3); } else if(e.key==="ArrowRight"){ e.preventDefault(); setSplit(U.split+3); } });
  addEventListener("resize",()=>{ if(!P.hidden) loupe(); });
  const open=()=>{ P.hidden=false; P.scrollTop=0; try{ sessionStorage.setItem("bae_up_open","1"); }catch{} draw(); restore(); teamLoad().then(()=>{ if(!U.busy) draw(); }); };
  $("openUpscale")?.addEventListener("click",open); $("closeUpscale")?.addEventListener("click",()=>{ P.hidden=true; try{ sessionStorage.removeItem("bae_up_open"); }catch{} $("openUpscale")?.focus(); });
  /* if the page reloaded while this tool was open, come straight back to it */
  try{ if(sessionStorage.getItem("bae_up_open")==="1") setTimeout(open,600); }catch{}
})();

/* ================= Art Director: the Photography brief becomes a conversation (v137) =================
   The designer talks; Claude keeps a SHOT CARD (who, outfit, action, place, camera, light). The card is turned into the brief and handed to the
   studio's own pipeline (createAll / editImage), so every brand lock stays where it was. Also: remake a dropped photo changing only some fields,
   a rule check before any credit is spent, taste memory, voice, A/B compare, three directions, and a rough preview inside a dropped layout. */
(function(){
  const host=$("briefCard"), brief=$("brief"); if(!host||!brief) return;
  const F=[["who","Who"],["outfit","Outfit"],["action","Action"],["place","Place"],["camera","Camera"],["light","Light"]], ONLY={who:"char",outfit:"outfit",camera:"shot"};
  const PC={msgs:[],card:{},src:null,keep:{},fix:null,busy:"",att:[],layout:null,edit:null};
  const el=document.createElement("div"); el.className="pc"; el.id="pc";
  el.innerHTML=`<div class="pc-head"><span class="pc-av" aria-hidden="true">AD</span><div class="pc-ttl"><b class="t18">Art Director</b><span class="t12 muted">Say the photo you need. Or add a photo and say what to change in it.</span></div><button type="button" class="btn small" data-pc="new">New chat</button></div>
    <div class="pc-msgs" id="pcMsgs" aria-live="polite"></div>
    <div class="pc-card" id="pcCard" hidden></div>
    <div class="pc-att" id="pcAtt"></div>
    <div class="pc-compose"><textarea id="pcInput" dir="auto" rows="1" aria-label="Message to the Art Director" placeholder="Describe the photo, or say what to change. Type @ for a character, an outfit or a camera angle."></textarea>
      <div class="pc-row"><label class="pc-ic" title="Add a photo to remake, or a layout"><input type="file" accept="image/*" id="pcFile" class="sr"><span aria-hidden="true">＋</span><span class="sr">Add a photo or a layout</span></label><button type="button" class="pc-ic" id="pcMic" hidden aria-pressed="false" aria-label="Speak instead of typing"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button><span class="t12 light pc-hint">Enter sends · Shift + Enter new line</span><button type="button" class="btn small primary" data-pc="send">Send</button></div></div>`;
  const cls=document.createElement("details"); cls.className="pc-classic"; cls.innerHTML=`<summary><b>Brief and classic controls</b><span class="t12 muted">The exact brief the studio uses. You can still write it yourself.</span></summary>`;
  const inner=document.createElement("div"); inner.className="pc-classic-in"; cls.appendChild(inner);
  for(const n of [host.querySelector(".brief-meta"),brief,$("presets"),$("lvDrop"),host.querySelector(".create-row")]) if(n) inner.appendChild(n);
  host.prepend(cls); host.prepend(el); atMake("pcInput",true); const inp=$("pcInput");
  const sync=()=>{ const icon=S.mode==="icon"||!!S.web; el.hidden=icon; if(icon) cls.open=true; };
  $("modeSeg")?.addEventListener("click",()=>setTimeout(sync,0)); document.querySelectorAll("#landing [data-enter]").forEach(b=>b.addEventListener("click",()=>setTimeout(sync,60))); setTimeout(sync,0); setTimeout(sync,1500);
  try{ const T=$("tour"); let byTour=false; if(T) new MutationObserver(()=>{ if(!T.hidden){ if(!cls.open){ cls.open=true; byTour=true; } } else if(byTour){ cls.open=false; byTour=false; } }).observe(T,{attributes:true,attributeFilter:["hidden","class"]}); }catch{}
  /* ----- taste memory: what he liked, what he rejected and why ----- */
  const PCT_KEY="bae_pc_taste"; let PCT=(()=>{ try{ const v=JSON.parse(localStorage.getItem(PCT_KEY)||"[]"); return Array.isArray(v)?v:[]; }catch{ return []; } })();
  const pctDoc=async()=>{ await rlStoreInit(); return RLS.db&&RLS.uid?rlCol().doc("pctaste"):null; };
  function pctAdd(k,why,b){ PCT.push({k,t:Date.now(),brief:String(b||brief.value||"").slice(0,220),why:String(why||"").slice(0,120)}); PCT=PCT.slice(-60); try{ localStorage.setItem(PCT_KEY,JSON.stringify(PCT)); }catch{} pctDoc().then(d=>d&&d.set({kind:"pctaste",items:PCT,updatedAt:Date.now()})).catch(()=>{}); }
  (async()=>{ try{ const d=await pctDoc(); if(!d) return; const s=await d.get(), items=s.exists?(s.data()?.items||[]):[]; if(!Array.isArray(items)||!items.length) return; const seen=new Set(PCT.map(e=>e.t+e.k)); PCT=[...PCT,...items.filter(e=>e&&!seen.has(e.t+e.k))].sort((p,q)=>(p.t||0)-(q.t||0)).slice(-60); try{ localStorage.setItem(PCT_KEY,JSON.stringify(PCT)); }catch{} }catch{} })();
  const taste=()=>{ if(!PCT.length) return ""; const L=PCT.filter(e=>e.k==="like").slice(-8), D=PCT.filter(e=>e.k==="dislike").slice(-8); return `THE DESIGNER'S TASTE so far (lean toward what he liked, keep away from what he rejected; the house rules still win):${L.length?"\nLIKED: "+L.map(e=>"• "+e.brief).join(" "):""}${D.length?"\nREJECTED: "+D.map(e=>`• ${e.brief}${e.why?" — because: "+e.why:""}`).join(" "):""}`; };
  /* ----- card ----- */
  const clean=o=>{ const c={}; for(const k of ["who","outfit","action","place","camera","light","setting","aspect","extra"]){ const v=o?.[k]; if(typeof v==="string"&&v.trim()) c[k]=v.trim().slice(0,400); } if(c.setting&&!/^(On-location|Studio)$/.test(c.setting)) delete c.setting; return c; };
  const pretty=v=>esc(String(v||"")).replace(/\[(?:outfit|shot): ([^\]]+)\]/g,"$1");
  const compose=c=>[[c.who,c.action,c.place].filter(Boolean).join(" ")+(c.light?", "+c.light:""),c.outfit?"Wearing "+c.outfit:"",c.extra||"",c.camera||""].map(s=>String(s).trim().replace(/\.$/,"")).filter(Boolean).join(". ")+".";
  function apply(){ const c=PC.card, b=compose(c); brief.value=b; brief.dispatchEvent(new Event("input",{bubbles:true}));
    if(c.setting){ const bt=document.querySelector(`.seg[data-key="setting"] button[data-v="${c.setting}"]`); if(bt&&bt.getAttribute("aria-pressed")!=="true") bt.click(); }
    const as=$("aspect"); if(as&&c.aspect&&as.value!==c.aspect&&[...as.options].some(o=>o.value===c.aspect)){ as.value=c.aspect; as.dispatchEvent(new Event("change",{bubbles:true})); } return b; }
  const cur=()=>{ const k=genKeys()[0], c=cards[k], o=c?.outs?.[c.sel||0]; return o?.id?{k,c,o}:null; };
  const chars=txt=>{ const t=String(txt||"").toLowerCase(); return CHAR_REFS.filter(r=>{ const n=charName(r.id).toLowerCase(); return n&&t.includes("@"+n); }); };
  /* ----- drawing ----- */
  const say=(t,extra)=>{ PC.msgs.push({r:"a",t:String(t||""),...(extra||{})}); };
  function msgHTML(m,i){ const last=i===PC.msgs.length-1, live=m.res&&i===PC.msgs.map(x=>!!x.res).lastIndexOf(true);
    if(m.r==="u") return `<div class="pc-m u" dir="auto" data-noi18n>${m.imgs?.length?`<span class="pc-imgs">${m.imgs.map(u=>`<img src="${u}" alt="">`).join("")}</span>`:""}${esc(m.t)}</div>`;
    let h=`<div class="pc-m a${m.err?" err":""}">${m.t?`<p dir="auto" data-noi18n>${esc(m.t)}</p>`:""}`;
    if(m.ask) h+=`<p dir="auto" data-noi18n><b>${esc(m.ask.q)}</b></p>${last&&m.ask.options?.length?`<div class="pc-chips">${m.ask.options.map(o=>`<button type="button" data-pcsay="${esc(o)}" dir="auto" data-noi18n>${esc(o)}</button>`).join("")}</div>`:""}`;
    if(m.dirs) h+=`<div class="pc-dirs">${m.dirs.map((d,k)=>`<button type="button" class="pc-dir" data-pcdir="${i}:${k}"><b dir="auto" data-noi18n>${esc(d.title)}</b><span class="t12 muted" dir="auto" data-noi18n>${pretty(compose(d.card)).slice(0,220)}</span></button>`).join("")}</div>${last?`<div class="pc-chips"><button type="button" data-pcall="${i}">Render all three (3 images, spends credits)</button></div>`:""}`;
    if(m.fixq&&last) h+=`<div class="pc-chips"><button type="button" data-pcfix="1">Fix it to the BAE rules</button><button type="button" data-pcfix="0">Keep it like the original</button></div>`;
    if(m.check) h+=`<ul class="pc-check">${m.check.map(c=>`<li class="${c.ok?"ok":"no"}"><i aria-hidden="true">${c.ok?"✓":"!"}</i><span>${esc(c.rule)}${c.fix?`<small dir="auto" data-noi18n>${esc(c.fix)}</small>`:""}</span></li>`).join("")}</ul>`;
    if(m.ready&&last) h+=`<div class="pc-go"><span class="t12 muted" id="pcCost">${PC.src?"1 image · remake of your photo · Seedream 5.5 · 2K":"1 image · Seedream 5.5 · 2K"}</span><div class="pc-chips strong"><button type="button" class="go" data-pc="create">${PC.src?"Create the remake":"Create image"}</button>${PC.src?"":`<button type="button" data-pc="angles">Create 4 angles</button><button type="button" data-pcsay="Give me three different directions for this">3 directions</button>`}</div></div>`;
    if(m.res){ h+=`<div class="pc-res n${Math.min(4,m.res.imgs.length)}">${m.res.imgs.map((u,k)=>`<button type="button" class="pc-im" data-pclb="${i}:${k}" aria-label="View larger"><img src="${u}" alt=""></button>`).join("")}</div>`;
      if(live) h+=`<div class="pc-chips"><button type="button" data-pcrate="like" aria-pressed="${m.rate==="like"}" aria-label="I like it">👍</button><button type="button" data-pcrate="dislike" aria-pressed="${m.rate==="dislike"}" aria-label="Not right">👎</button><button type="button" data-pcsay="The same moment, from the side">From the side</button><button type="button" data-pcsay="A little closer">Closer</button><button type="button" data-pcsay="A little wider">Wider</button>${(cur()?.c?.outs?.length||0)>1?`<button type="button" data-pc="cmp">Compare A / B</button>`:""}${PC.layout||LV.thumb?`<button type="button" data-pc="lay">See it in the layout</button>`:""}<button type="button" data-pc="open">Open the result</button></div>`;
      if(live&&m.rate==="dislike"&&!m.why) h+=`<div class="pc-chips why"><span class="t12 muted">What is wrong?</span>${["Too posed","Looks at the camera","Wrong light","Wrong outfit","Not centred","Busy background","Face is off"].map(w=>`<button type="button" data-pcwhy="${w}">${w}</button>`).join("")}</div>`; }
    if(m.lay) h+=`<button type="button" class="pc-im wide" data-pclay="${i}"><img src="${m.lay}" alt="Rough preview inside the layout"></button><span class="t12 muted">Rough preview: your image placed in the layout's picture area.</span>`;
    return h+`</div>`; }
  function drawCard(){ const c=PC.card, box=$("pcCard"), has=F.some(([k])=>c[k])||PC.src; box.hidden=!has; if(!has){ box.innerHTML=""; return; }
    box.innerHTML=`<div class="pc-cardh"><b>Shot card</b>${PC.src?`<span class="pc-src"><img src="${PC.src.url}" alt="">Remake of your photo<button type="button" class="bi-x" data-pc="nosrc">Remove</button></span>`:""}<span class="pc-set"><span class="a-seg" role="group" aria-label="Setting">${["On-location","Studio"].map(v=>`<button type="button" data-pcset="${v}" aria-pressed="${(c.setting||S.setting)===v}">${v}</button>`).join("")}</span><select id="pcAspect" aria-label="Size">${[...($("aspect")?.options||[])].filter(o=>o.value!=="custom").map(o=>`<option value="${o.value}" ${(c.aspect||$("aspect").value)===o.value?"selected":""}>${esc(o.value==="auto"?"Auto":o.value)}</option>`).join("")}</select></span></div>
      <div class="pc-fields">${F.map(([k,l])=>{ const keep=!!(PC.src&&PC.keep[k]), lock=PC.src&&k==="who"&&PC.src.f.who, v=keep?(PC.src.f[k]||"as in the photo"):(c[k]||"");
        return `<div class="pc-f${keep?" keep":""}"><span class="lbl">${l}</span>${PC.src?(lock?`<span class="pc-kc on" title="A real person is never copied. Pick a library character.">Change</span>`:`<button type="button" class="pc-kc${keep?"":" on"}" data-pckeep="${k}" aria-pressed="${!keep}">${keep?"Keep":"Change"}</button>`):""}${PC.edit===k&&!keep?`<textarea id="pcEd" dir="auto" rows="1" ${ONLY[k]?`data-only="${ONLY[k]}"`:""} placeholder="${ONLY[k]?"Type @ to pick, or write":"Write"}">${esc(c[k]||"")}</textarea>`:`<button type="button" class="pc-v" data-pcedit="${k}" ${keep?"disabled":""} dir="auto" data-noi18n>${v?pretty(v):`<i>${lock?"Pick a character":"Add"}</i>`}</button>`}</div>`; }).join("")}</div>`;
    if(PC.edit&&$("pcEd")){ atMake("pcEd",true); const e=$("pcEd"), k=PC.edit; e.focus(); atEnd(e); const done=()=>{ if(PC.edit!==k) return; const v=e.value.trim(); if(v) PC.card[k]=v; else delete PC.card[k]; PC.edit=null; drawCard(); };
      e.addEventListener("keydown",ev=>{ if(ev.key==="Enter"&&!ev.shiftKey&&!ev.isComposing){ ev.preventDefault(); done(); } else if(ev.key==="Escape"){ PC.edit=null; drawCard(); } }); e.addEventListener("blur",()=>setTimeout(()=>{ if(document.activeElement!==e&&!AT.menu?.matches(":hover")&&!AT.open) done(); },220)); } }
  function draw(){ const box=$("pcMsgs"); box.innerHTML=(PC.msgs.length?"":`<div class="pc-empty"><p class="t12 muted">Try one:</p><div class="pc-chips">${["A young couple planning their first home budget at the kitchen table, morning light","A staff member helping a customer at a branch desk","بدي صورة لشاب بدفع بالموبايل بكافيه هادي"].map(t=>`<button type="button" data-pcsay="${esc(t)}" dir="auto" data-noi18n>${esc(t)}</button>`).join("")}</div></div>`)+PC.msgs.map(msgHTML).join("")+(PC.busy?`<div class="pc-m a busy"><span class="rl-typing"><i></i><i></i><i></i></span><span class="t12 muted" id="pcBusy" data-noi18n>${esc(PC.busy)}</span></div>`:"");
    box.scrollTop=box.scrollHeight; drawCard(); $("pcAtt").innerHTML=PC.att.map((a,i)=>`<span class="th"><img src="${a.url}" alt=""><button type="button" data-pcatt="${i}" aria-label="Remove">×</button></span>`).join(""); if(typeof uxT==="function") uxT(el);
    const cs=$("pcCost"); if(cs&&!PC.src&&typeof uxCost==="function") uxCost({k:"image",n:1}).then(v=>{ if(v&&cs.isConnected) cs.textContent=`1 image · Seedream 5.5 · 2K · ${v.unlimited?"included in your plan":"about "+v.credits+" credits"}`; }).catch(()=>{}); }
  /* ----- the conversation ----- */
  function ask(text,nImg){ const lib=atChars().map(c=>"@"+c.name).slice(0,60).join(", ")||"(none yet)", c=cur(), tail=PC.msgs.slice(-9,-1).map(m=>`${m.r==="u"?"DESIGNER":"YOU"}: ${String(m.t||m.ask?.q||(m.res?"[you delivered an image]":"")).slice(0,300)}`).join("\n");
    return `You are the Art Director of BAE Studio, the image studio of Bank al Etihad (Jordan). You talk with the designer in THEIR language (usually Jordanian Arabic, sometimes English): short, warm, concrete, never formal. You turn the talk into ONE photograph by keeping a shot card. You never write the final image prompt; the studio writes it from your card.

HOUSE RULES (never broken; if the designer's wish would break one, adjust the card so it respects the rule and say so in one short phrase):
- Candid: nobody looks at the camera; people are caught in the middle of a real action.
- Camera from the side, from behind or three-quarter. Frontal is the last choice.
- The main subject is in the CENTRE of the frame, calm space on both sides.
- A quiet, uncluttered place with one focus. On location the background is soft and clean. In the studio: a plain warm cream wall, at most one light-oak piece, tone-on-tone tailored clothes.
- Jordanian people and places. No logos, text or watermark (only the staff uniform outfit carries the bank's mark).
- Never describe or copy a real person's face. People always come from the character library.

LIBRARY. Characters (write exactly "@Name"): ${lib}
Outfits (write exactly "[outfit: Name]"): ${AT_OUTFITS.map(o=>o.name+" ("+o.cat+")").join("; ")}
Camera angles (write exactly "[shot: Name]"): ${AT_SHOTS.map(s=>s[0]).join("; ")}

THE SHOT CARD NOW: ${JSON.stringify(PC.card)}
ON SCREEN: ${c?"a FINISHED IMAGE (the designer may ask to change one thing in it)":"no image yet"}.
${PC.src?`REMAKE MODE: the designer gave a source photo to repeat with changes. What the photo shows: ${JSON.stringify(PC.src.f)}. Kept from the photo now: ${JSON.stringify(PC.keep)} (who is never kept: the person is always replaced by a library character).`:""}
${taste()}
${tail?"THE TALK SO FAR:\n"+tail+"\n":""}THE DESIGNER NOW SAYS: "${text.slice(0,1500)}"${nImg?`\n${nImg} image(s) are attached to this message. Decide what the first one is: a design LAYOUT with copy on it, or a PHOTO to remake.`:""}

HOW TO FILL THE CARD. Each field is a phrase that reads as one sentence when joined: who + action + place, light.
- who: the subject, with "@Name" for every library character ("@Sara, a young mother"); or an object if there are no people.
- action: what they are doing, starting with a verb in -ing, caught mid-action, eyes on the thing they do.
- place: where, starting with in / at / on; a quiet Jordanian place.
- outfit: "[outfit: Name]" from the library when one fits or was asked, else a short description, else empty.
- camera: one "[shot: Name]" from the list (prefer 3/4 View, Profile or a behind view). light: a short phrase.
- setting: "On-location" or "Studio". aspect: one of 16:9, 9:16, 1:1, 4:5, 3:4, 4:3, 3:2, 2:3, 21:9 (story or reel = 9:16, post = 4:5 or 1:1).
Choose camera, light and outfit yourself when the designer did not say; do not ask about them. Keep every field the designer did not touch.

Return ONLY JSON:
{"say":"1 or 2 short sentences in the designer's language: what you understood or what you did. No lists, no questions here.",
"card":{"who":"","outfit":"","action":"","place":"","camera":"","light":"","setting":"","aspect":"","extra":""},
"ask":null,
"do":"talk",
"edit":"",
"check":[],
"directions":[],
"image":"none",
"source":null,
"keep":null}
- "ask": null, or {"q":"ONE short question","options":["2 to 4 short answers"]}; only when who, action or place is truly missing and you cannot choose well yourself${PC.src?", or when the source photo shows a person and the card has no @character to replace them (offer library names as options)":""}. Never more than one question.
- "do": "edit" ONLY when an image is on screen and the designer asks to change something in it; then "edit" is that single change in plain English (use "[outfit: Name]" when a library outfit is meant). "angles" when they ask for other angles of the same moment. "directions" when they ask for ideas or options: then "directions" holds exactly 3 clearly different, on-brand ways to show the same message, each {"title":"3 to 5 words in the designer's language","card":{…full card…}}. "ready" when the card has who (or an object), action and place and the designer wants the picture or has nothing to add. "layout" when the attached image is a design layout. Otherwise "talk".
- "check" (only when do is "ready"): exactly these five, each {"rule":"…","ok":true|false,"fix":"if you had to adjust the card for this rule, what you changed, in the designer's language; else empty"}: "Candid, nobody looks at the camera" · "Camera from the side, behind or three-quarter" · "Subject in the centre" · "Quiet, clean background" · "No logos or text". After your adjustments every rule should be ok.
- "image": "layout" | "photo" | "none". When "photo": "source" = what the PHOTO shows, field by field {"who":"people described generically (age range, build, what they wear); empty if there are no people; never a name or an identity","outfit":"","action":"","place":"","camera":"","light":"","issues":["house rules the photo breaks, e.g. looks at the camera, subject off centre, busy background"]} and "keep" = {"outfit":true|false,"action":true|false,"place":true|false,"camera":true|false,"light":true|false} from what the designer said to change (everything they did not mention is kept). In the card, fill ONLY the fields that change.`; }
  async function turn(text,files){ text=String(text||"").trim(); if(PC.busy||(!text&&!files?.length)) return;
    files=(files||[]).slice(0,2); PC.msgs.push({r:"u",t:text||(files.length?"(photo)":""),imgs:PC.att.map(a=>a.url)}); PC.att=[]; PC.busy=files.length?"Looking at the photo…":"Thinking…"; draw();
    const imgs=[]; for(const f of files){ try{ const j=await toJpeg(f,1600); imgs.push({blob:j,url:URL.createObjectURL(j),orig:f}); }catch{} } PC.busy="";
    if(!sample){ say("Claude isn't connected in this view. Open the studio in claude.ai, or write the brief yourself below.",{err:true}); cls.open=true; draw(); return; }
    if(imgs.length&&!sampleImages){ say("I can't look at images in this view. Describe it in words and I'll build it.",{err:true}); draw(); return; }
    PC.busy="Thinking…"; draw();
    try{ const r=await rlAsk(ask(text||"Look at the attached image.",imgs.length),{modelTier:"default",cache:false,...(imgs.length?{images:imgs.map(x=>x.blob)}:{})}); await handle(r||{},imgs); }
    catch(e){ log("✕","art director",{code:e?.code,message:e?.message}); say(e?.code==="rate_limited"?"Too many requests right now. Try again in a minute.":e?.code==="not_granted"?"Claude needs your permission in this page first.":"I couldn't answer that. Try again.",{err:true}); }
    PC.busy=""; draw(); }
  async function handle(r,imgs){ const txt=String(r.say||"").trim().slice(0,600);
    if(imgs.length&&r.image==="layout"){ PC.layout=imgs[0].blob; say(txt||"That is a layout. I'm reading it."); draw(); try{ lvRun(imgs[0].orig||imgs[0].blob); $("lvOut")?.scrollIntoView({behavior:"smooth",block:"nearest"}); }catch{} return; }
    if(imgs.length&&r.source&&typeof r.source==="object"){ const f={}; for(const [k] of F) if(typeof r.source[k]==="string") f[k]=r.source[k].trim().slice(0,300); PC.src={blob:imgs[0].blob,url:imgs[0].url,f,issues:(Array.isArray(r.source.issues)?r.source.issues:[]).map(String).slice(0,5)}; PC.keep={outfit:true,action:true,place:true,camera:true,light:true}; PC.fix=null;
      try{ const bmp=await createImageBitmap(imgs[0].blob), ar=bmp.width/bmp.height, as=$("aspect"), best=[...as.options].map(o=>o.value).filter(v=>/^\d+:\d+$/.test(v)).map(v=>[v,Math.abs(Math.log(ar/(v.split(":")[0]/v.split(":")[1])))]).sort((a,b)=>a[1]-b[1])[0]; if(best) PC.card.aspect=best[0]; }catch{} }
    if(r.card&&typeof r.card==="object") PC.card={...PC.card,...clean(r.card)};
    if(PC.src){ if(r.keep&&typeof r.keep==="object") for(const [k] of F) if(k!=="who"&&typeof r.keep[k]==="boolean") PC.keep[k]=r.keep[k]; PC.keep.who=false; for(const [k] of F) if(k!=="who"&&PC.card[k]&&r.card?.[k]&&r.keep?.[k]===undefined&&!imgs.length) PC.keep[k]=false; }
    const m={r:"a",t:txt}; if(r.ask&&typeof r.ask==="object"&&r.ask.q) m.ask={q:String(r.ask.q).slice(0,200),options:(Array.isArray(r.ask.options)?r.ask.options:[]).map(o=>String(o).slice(0,60)).slice(0,5)};
    if(r.do==="directions"&&Array.isArray(r.directions)){ const d=r.directions.filter(x=>x?.card).slice(0,3).map(x=>({title:String(x.title||"Direction").slice(0,60),card:{...PC.card,...clean(x.card)}})); if(d.length) m.dirs=d; }
    if((r.do==="ready"||r.do==="angles")&&!m.ask){ if(PC.src&&PC.src.f.who&&!chars(PC.card.who).length){ m.ask={q:"Which character replaces the person in the photo? Type @ and pick one.",options:atChars().slice(0,4).map(c=>"@"+c.name)}; }
      else { m.ready=true; const ck=(Array.isArray(r.check)?r.check:[]).filter(c=>c?.rule).slice(0,6).map(c=>({rule:String(c.rule).slice(0,80),ok:c.ok!==false,fix:String(c.fix||"").slice(0,160)})); if(ck.length) m.check=ck;
        if(PC.src&&PC.src.issues.length&&PC.fix===null){ m.ready=false; m.fixq=true; m.t=(m.t?m.t+" ":"")+"The photo breaks a house rule: "+PC.src.issues.join(", ")+"."; } } }
    PC.msgs.push(m);
    if(r.do==="edit"&&String(r.edit||"").trim()){ if(cur()){ draw(); await doEdit(String(r.edit).trim()); } else { m.ready=!m.ask; } } }
  const snap=(k,from)=>{ const c=cards[k], outs=(c?.outs||[]).slice(from||0).filter(o=>o.img||o.url); return outs.map(o=>o.img||o.url); };
  const watch=()=>setInterval(()=>{ const s=$("pcBusy"), c=cards[genKeys()[0]], i=c?.steps?.lastIndexOf("run"), n=(i>=0&&c.stepNote?.[i])||c?.editMsg||$("flowMsg")?.textContent; if(s&&n) s.textContent=String(n).slice(0,90); },900);
  async function doEdit(change){ const x=cur(); if(!x){ say("There is no image to change yet.",{err:true}); return; } PC.busy="Changing it…"; draw(); const n=x.c.outs.length, t=watch();
    try{ await editImage(x.k,change); }catch{} clearInterval(t); PC.busy=""; if(x.c.outs.length>n) PC.msgs.push({r:"a",t:"",res:{imgs:snap(x.k,n)}}); else say(x.c.editErr||"The change didn't come back. Nothing else was touched.",{err:true}); }
  async function create(angles){ if(PC.busy) return; if(PC.src) return remake(); if(!compose(PC.card).replace(/\W/g,"")){ say("Tell me the photo first.",{err:true}); draw(); return; }
    const b=apply(); PC.busy=angles?"Creating 4 angles…":"Creating the image…"; draw(); const t=watch(); S.quiet=true;
    try{ if(angles){ S.angles=ANGLES4; try{ await createAll(); } finally{ S.angles=null; } } else await createAll(); }catch(e){ log("✕","art director create",{message:e?.message}); } S.quiet=false; clearInterval(t); PC.busy="";
    const k=genKeys()[0], im=snap(k); if(im.length) PC.msgs.push({r:"a",t:"",res:{imgs:im},brief:b}); else say(cards[k]?.err||$("flowMsg")?.textContent||"The image didn't come back.",{err:true}); draw(); }
  /* a library image as a Magnific reference: linked library first, then a one-time upload that is remembered */
  async function magId(id){ let U={}; try{ U=JSON.parse(localStorage.getItem("bae_user_magids")||"{}"); }catch{} const have=S.magIds?.[String(id).toLowerCase()]||U[id]; if(have) return have;
    const r=refById(id); let blob=r?.blob||null; if(!blob&&r?.lib){ try{ blob=r.blob=await clBlob(r.docId); }catch{} } if(!blob){ const res=await fetch(`refs/${id}.jpg`); if(res.ok) blob=await res.blob(); } if(!blob) return null;
    const up=await rlUploadMag(blob,"ref-"+id); if(up?.id){ U[id]=up.id; try{ localStorage.setItem("bae_user_magids",JSON.stringify(U)); }catch{} } return up?.id||null; }
  /* "make one like this, but change…": the source photo is @img1, the library character and the outfit sheet follow */
  async function remake(){ const c=PC.card, s=PC.src, k="nano"; if(PC.busy) return; const cast=chars(c.who).slice(0,2);
    if(s.f.who&&!cast.length){ say("",{ask:{q:"Which character replaces the person in the photo? Type @ and pick one.",options:atChars().slice(0,4).map(x=>"@"+x.name)}}); draw(); return; }
    if(S.mode==="icon") setMode("photo"); PC.busy="Sending your photo to Magnific…"; draw(); apply();
    try{ if(!mcp||S.web) throw {code:"x",message:"Magnific isn't reachable in this view. Open the studio in claude.ai."}; if(!S.connected) await connect(true);
      const up=await rlUploadMag(s.blob,"remake-source"); if(!up?.id) throw {code:"tool_error",message:"Magnific returned no identifier for your photo."};
      const refs=[{id:up.id,tag:"@img1",what:"the designer's source photo"}]; for(const r of cast){ const id=await magId(r.id); if(!id) throw {code:"tool_error",message:`Couldn't send ${charName(r.id)}'s picture to Magnific.`}; refs.push({id,tag:"@img"+(refs.length+1),what:`the character sheet of ${charName(r.id)}`}); }
      const fit=PC.keep.outfit?null:atOutfitsIn(c.outfit)[0]||null; if(fit){ const id=await magId(fit.id); if(id) refs.push({id,tag:"@img"+(refs.length+1),what:`a flat-lay sheet of the outfit "${fit.name}" (${fit.d})`}); }
      PC.busy="Writing the remake…"; draw(); const kept=F.filter(([f])=>f!=="who"&&PC.keep[f]), changed=F.filter(([f])=>f!=="who"&&!PC.keep[f]&&c[f]);
      const w=await rlAsk(`You write ONE prompt for the image model Seedream. It receives these references, in this order: ${refs.map(r=>`${r.tag} = ${r.what}`).join("; ")}.
THE JOB: a NEW photograph that repeats @img1 and changes only what is listed.
WHAT @img1 SHOWS: ${JSON.stringify(s.f)}
KEEP EXACTLY AS IN @img1: ${kept.length?kept.map(([f,l])=>`${l} (${s.f[f]||"as shown"})`).join("; "):"nothing in particular"}; also the framing, the composition and the mood unless a change below touches them.
CHANGE: ${[cast.length?`the person${cast.length>1?"s":""} → ${cast.map((r,i)=>`${charName(r.id)} from ${refs[i+1].tag} (identical face, hair, skin tone and build as that sheet)`).join(" and ")}; NEVER reproduce the face or the identity of anyone in @img1`:"",...changed.map(([f,l])=>`${l} → ${c[f]}`),c.extra?`also: ${c.extra}`:""].filter(Boolean).join("; ")||"nothing else"}.
${PC.fix===true?"ALSO CORRECT, quietly: nobody looks at the camera (eyes on what they are doing); the main subject sits in the centre of the frame with calm space on both sides; the background is quiet and soft.":PC.fix===false?"Keep the gaze and the framing of @img1 as they are.":""}
HOUSE STYLE for everything you change: candid, mid-action, Jordanian people and places, quiet uncluttered scene, natural light, solid colours and fine fabrics, no logos or text${fit&&/staff/i.test(fit.name)?" except the bank's marks on the staff polo, exactly as on its sheet":""}. If an outfit sheet is given, the person wears exactly those pieces; never show the flat-lay or its board.
Write the prompt in English, 90 to 150 words, in this order: 1. "Recreate @img1 as a new photograph." 2. LOCK: what stays identical to @img1. 3. REPLACE: each change, concrete, naming its reference. 4. End with: "Photorealistic, 2K, natural skin texture, no text, no logos, no watermark."
Return ONLY JSON: {"prompt":"…","summary":"what changes, in 8 words or fewer"}`,{modelTier:"default",cache:false,...(sampleImages?{images:[s.blob]}:{})});
      const prompt=String(w?.prompt||"").trim(); if(!prompt) throw {code:"bad_answer",message:"The remake prompt came back empty."};
      PC.busy=`Rendering: ${String(w.summary||"the remake").slice(0,60)}…`; draw();
      const out=await rlJob(()=>rlImage({prompt,aspect:aspectText(),refs:refs.map(r=>({id:r.id,tag:r.tag})),label:"remake"}));
      const src=rlFull[out.id]||null, o={id:out.id,url:null,img:src,blob:null,long:2048,webUrl:out.web||null,pending:false,edit:"Remake"}; if(src){ try{ const mm=src.match(/^data:([^;]+);base64,(.*)$/); if(mm) o.blob=b64Blob(mm[2],mm[1]); }catch{} }
      try{ await completeFiles(o,{ids:[o.id],urls:[],links:[],images:[]}); }catch{}
      const pf=$(MODELS[k].prompt); if(pf){ pf.value=prompt; pf.dispatchEvent(new Event("input",{bubbles:true})); }
      cards[k]={busy:false,done:true,t0:Date.now(),steps:["ok","ok","ok","ok"],stepNote:["remake of your photo","","",""],outs:[o],sel:0,editMsg:"Remake of your photo. Change one thing, or ask the Art Director."}; renderCard(k,cards[k]); try{ syncButtons(); }catch{} if(o.url||o.img) addHistory(o,k);
      PC.busy=""; const im=snap(k); if(im.length) PC.msgs.push({r:"a",t:"",res:{imgs:im}}); else say("Magnific finished but sent no picture. Open Recent in a minute.",{err:true});
    }catch(e){ log("✕","remake",{code:e?.code,message:e?.message}); PC.busy=""; say(e?.code==="refs_missing"?"Couldn't attach your photo. Nothing was spent.":(e?.code==="x"||e?.code==="bad_answer"?e.message:(["not_granted","rate_limited","refused"].includes(e?.code)&&!e.server?sampleCopy(e):mcpCopy(e))),{err:true}); }
    draw(); }
  /* the picture placed inside the layout he dropped: Claude marks the picture area and the areas that must stay on top */
  async function inLayout(){ const x=cur(), L=PC.layout||(LV.thumb?await (await fetch(LV.thumb)).blob():null), srcImg=x?.o?.img||x?.o?.url; if(!x||!L||!srcImg||PC.busy) return; PC.busy="Placing it in the layout…"; draw();
    try{ const r=await rlAsk(`This is a design layout. Return ONLY JSON, all numbers in percent of the layout's width and height: {"visual":{"x":0,"y":0,"w":100,"h":100},"keep":[{"x":0,"y":0,"w":0,"h":0}]} — "visual" is the area where the main photograph or illustration sits or should sit (the whole layout if the picture is the full background); "keep" lists up to 6 tight boxes around the logo, the headline, the body copy and the button, which must stay visible on top.`,{modelTier:"quick",cache:false,images:[L]});
      const lb=await createImageBitmap(L), k=Math.min(1,1400/Math.max(lb.width,lb.height)), W=Math.round(lb.width*k), H=Math.round(lb.height*k), cv=document.createElement("canvas"); cv.width=W; cv.height=H; const g=cv.getContext("2d"); g.drawImage(lb,0,0,W,H);
      const im=new Image(); im.crossOrigin="anonymous"; await new Promise((res,rej)=>{ im.onload=res; im.onerror=rej; im.src=srcImg; });
      const pc=v=>clamp01(+v/100), clamp01=v=>Math.max(0,Math.min(1,isFinite(v)?v:0)), v=r?.visual||{x:0,y:0,w:100,h:100}, bx=pc(v.x)*W, by=pc(v.y)*H, bw=Math.max(8,pc(v.w)*W), bh=Math.max(8,pc(v.h)*H), sc=Math.max(bw/im.naturalWidth,bh/im.naturalHeight), sw=bw/sc, sh=bh/sc;
      g.drawImage(im,(im.naturalWidth-sw)/2,(im.naturalHeight-sh)/2,sw,sh,bx,by,bw,bh);
      for(const q of (Array.isArray(r?.keep)?r.keep:[]).slice(0,6)){ const qx=pc(q.x), qy=pc(q.y), qw=pc(q.w), qh=pc(q.h); if(qw>0&&qh>0&&qw*qh<.5) g.drawImage(lb,qx*lb.width,qy*lb.height,qw*lb.width,qh*lb.height,qx*W,qy*H,qw*W,qh*H); }
      PC.busy=""; PC.msgs.push({r:"a",t:"",lay:cv.toDataURL("image/jpeg",.9)}); }
    catch(e){ PC.busy=""; say("I couldn't build the layout preview in this browser.",{err:true}); } draw(); }
  function compare(){ const x=cur(); if(!x||x.c.outs.length<2) return; let a=Math.max(0,(x.c.sel||0)-1), b=x.c.sel||0; if(a===b) b=a+1; const d=document.createElement("div"); d.className="pc-cmp"; d.setAttribute("role","dialog"); d.setAttribute("aria-label","Compare two images");
    const paint=()=>{ d.innerHTML=`<div class="pc-cmp-in"><div class="pc-cmp-h"><b class="t18">Compare</b><button type="button" class="btn small" data-x>Close</button></div><div class="pc-cmp-g">${[a,b].map((i,s)=>{ const o=x.c.outs[i]; return `<figure><img src="${o.img||o.url}" alt=""><figcaption><select data-side="${s}" aria-label="Image">${x.c.outs.map((q,n)=>`<option value="${n}" ${n===i?"selected":""}>${n+1}${q.edit?" · "+esc(String(q.edit).slice(0,30)):q.angle?" · "+esc(q.angle):""}</option>`).join("")}</select><button type="button" class="btn small primary" data-use="${i}">Use this one</button></figcaption></figure>`; }).join("")}</div></div>`; };
    paint(); document.body.appendChild(d); d.addEventListener("click",e=>{ const u=e.target.closest("[data-use]"); if(u){ x.c.sel=+u.dataset.use; renderCard(x.k,x.c); d.remove(); draw(); } else if(e.target.closest("[data-x]")||e.target===d) d.remove(); });
    d.addEventListener("change",e=>{ const s=e.target.closest("[data-side]"); if(s){ if(s.dataset.side==="0") a=+s.value; else b=+s.value; paint(); } }); d.addEventListener("keydown",e=>{ if(e.key==="Escape") d.remove(); }); d.tabIndex=-1; d.focus(); }
  /* ----- input ----- */
  const send=()=>{ const t=inp.value, files=PC.att.map(a=>a.file); if(!t.trim()&&!files.length) return; inp.value=""; turn(t,files); };
  const attach=f=>{ if(!f||!/^image\//.test(f.type)) return; PC.att=[{file:f,url:URL.createObjectURL(f)}]; draw(); inp.focus(); };
  inp.addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing&&!(e.ctrlKey||e.metaKey)){ e.preventDefault(); send(); } });
  inp.addEventListener("paste",e=>{ const im=[...(e.clipboardData?.files||[])].find(f=>/^image\//.test(f.type)); if(im){ e.preventDefault(); attach(im); } });
  $("pcFile").addEventListener("change",e=>{ attach(e.target.files?.[0]); e.target.value=""; });
  el.addEventListener("dragover",e=>{ if(e.dataTransfer?.types?.includes("Files")){ e.preventDefault(); el.classList.add("drag"); } }); el.addEventListener("dragleave",()=>el.classList.remove("drag"));
  el.addEventListener("drop",e=>{ el.classList.remove("drag"); const f=[...(e.dataTransfer?.files||[])].find(x=>/^image\//.test(x.type)); if(f){ e.preventDefault(); e.stopPropagation(); attach(f); } });
  el.addEventListener("change",e=>{ if(e.target.id==="pcAspect"){ PC.card.aspect=e.target.value; apply(); } });
  el.addEventListener("click",async e=>{ const t=e.target, q=s=>t.closest(s); let b;
    if((b=q("[data-pcsay]"))){ if(!PC.busy) turn(b.dataset.pcsay); return; }
    if((b=q("[data-pcatt]"))){ PC.att=[]; draw(); return; }
    if((b=q("[data-pcset]"))){ PC.card.setting=b.dataset.pcset; apply(); drawCard(); return; }
    if((b=q("[data-pckeep]"))){ const k=b.dataset.pckeep; PC.keep[k]=!PC.keep[k]; PC.edit=PC.keep[k]?null:k; drawCard(); return; }
    if((b=q("[data-pcedit]"))){ PC.edit=b.dataset.pcedit; drawCard(); return; }
    if((b=q("[data-pcfix]"))){ PC.fix=b.dataset.pcfix==="1"; say(PC.fix?"I'll correct it to the house rules.":"I'll keep it like the original.",{ready:true}); draw(); return; }
    if((b=q("[data-pcdir]"))){ const [i,k]=b.dataset.pcdir.split(":").map(Number), d=PC.msgs[i]?.dirs?.[k]; if(d&&!PC.busy){ PC.card={...d.card}; turn(`Use the direction "${d.title}".`); } return; }
    if((b=q("[data-pcall]"))){ const dirs=PC.msgs[+b.dataset.pcall]?.dirs||[]; if(PC.busy||PC.src) return; for(const d of dirs){ PC.card={...d.card}; say(d.title); await create(false); } return; }
    if((b=q("[data-pclb]"))){ const [i,k]=b.dataset.pclb.split(":").map(Number); openLightbox(PC.msgs[i]?.res?.imgs?.[k]); return; }
    if((b=q("[data-pclay]"))){ openLightbox(PC.msgs[+b.dataset.pclay]?.lay); return; }
    if((b=q("[data-pcrate]"))){ const m=[...PC.msgs].reverse().find(x=>x.res); if(m){ m.rate=b.dataset.pcrate; m.why=""; if(m.rate==="like") pctAdd("like","",m.brief); draw(); } return; }
    if((b=q("[data-pcwhy]"))){ const m=[...PC.msgs].reverse().find(x=>x.res); if(m){ m.why=b.dataset.pcwhy; pctAdd("dislike",m.why,m.brief); say("Noted. I'll keep away from that. Tell me what to change and I'll fix this one."); draw(); } return; }
    if(!(b=q("[data-pc]"))) return; const k=b.dataset.pc;
    if(k==="send") send(); else if(k==="create") create(false); else if(k==="angles") create(true); else if(k==="cmp") compare(); else if(k==="lay") inLayout();
    else if(k==="open"){ const x=cur(); $(MODELS[x?.k||"nano"].el)?.scrollIntoView({behavior:"smooth",block:"center"}); }
    else if(k==="nosrc"){ PC.src=null; PC.keep={}; PC.fix=null; draw(); }
    else if(k==="new"){ if(PC.busy) return; PC.msgs=[]; PC.card={}; PC.src=null; PC.keep={}; PC.fix=null; PC.att=[]; PC.edit=null; draw(); inp.focus(); } });
  /* ----- voice ----- */
  (async()=>{ const btn=$("pcMic"); let d=null; try{ d=await window.claude?.use?.("dictation"); }catch{} if(!d||!btn) return; btn.hidden=false; let base="";
    d.onPartial?.(({text})=>{ if(S.mic!=="pc") return; inp.value=base+(text||""); });
    d.onFinal?.(({text})=>{ if(S.mic!=="pc") return; base=(base+(text||"")).trim()+" "; inp.value=base; });
    d.onState?.(({state})=>{ if(S.mic==="pc") btn.setAttribute("aria-pressed",String(state==="listening")); });
    btn.onclick=()=>{ if(btn.getAttribute("aria-pressed")==="true"){ d.stop().catch(()=>{}); return; } S.mic="pc"; base=inp.value.trim()?inp.value.trim()+" ":""; d.start().catch(e=>{ btn.setAttribute("aria-pressed","false"); if(e?.code==="not_granted") btn.hidden=true; }); }; })();
  draw();
})();

/* ================= BAE Resize: one approved picture → every screen size, without redrawing it =================
   The picture itself is never regenerated. For each size the page picks the lightest route:
     same ratio → plain resize · the subject still fits → crop only · otherwise → the background is EXTENDED by AI (Magnific Expand) and the
     ORIGINAL PIXELS ARE PUT BACK on top with a soft, tone-matched edge, so the person stays exactly as approved.
   Sizes that need extending share "masters" (one extension reused by several sizes, then extended again for the extreme ones),
   so a whole set costs one or two extensions and every size shows the same background.
   Measured on a real picture (Nov 2026): Magnific Expand follows the fill instruction and did not repeat the subject; Flux Outpainting rewrote the
   instruction and tripled the person at 1:5. Magnific returns at most about 5 MP, so the extension is read back in 768 px tiles (crop is free). */
(()=>{
  const P=$("resize"); if(!P) return; const body=$("rzBody");
  const DEF=[[1920,1080],[3840,2160],[1920,3240],[256,512],[1080,3840],[128,640],[1920,2160],[1080,1920],[128,512],[1920,3840]];
  const SKEY="bae_rz_sizes", CKEY="bae_rz_runs", EXT_CREDITS=30, MODE="magnific-expand", STEP=2.5, TILE=768, PAD=1.3, SMALL=1500;
  const okSize=s=>Array.isArray(s)&&s.length===2&&s.every(n=>Number.isInteger(n)&&n>=16&&n<=8192);
  let SIZES=(()=>{ try{ const v=JSON.parse(localStorage.getItem(SKEY)||"null"); if(Array.isArray(v)&&v.length&&v.every(okSize)) return v; }catch{} return DEF.map(s=>[...s]); })();
  const saveSizes=()=>{ try{ localStorage.setItem(SKEY,JSON.stringify(SIZES)); }catch{} };
  const R={file:null,name:"",bmp:null,sw:0,sh:0,thumb:"",busy:"",step:"",err:"",an:null,plan:null,M:{},qc:{},pos:{},px:{},fmt:"png",notes:{},done:false,stop:false,trash:[],U:{},sharp:true};
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const mk=(w,h)=>{ const c=document.createElement("canvas"); c.width=Math.max(1,Math.round(w)); c.height=Math.max(1,Math.round(h)); return c; };
  const gcd=(a,b)=>b?gcd(b,a%b):a;
  const ratioName=(w,h)=>{ const g=gcd(w,h), a=w/g, b=h/g; return a<=40&&b<=40?`${a}:${b}`:(w>=h?`${(w/h).toFixed(2)}:1`:`1:${(h/w).toFixed(2)}`); };
  const sid=it=>it.w+"x"+it.h;
  const share=(a,b)=>{ a=clamp(+a||0,0,1)+.05; b=clamp(+b||0,0,1)+.05; return clamp(a/(a+b),.12,.88); };

  /* ---------- the plan: which route each size takes (pure arithmetic, no AI) ---------- */
  function steps(src,lens){ const out=[], L=[...new Set(lens)].sort((a,b)=>a-b), max=L[L.length-1]; let cur=src;
    while(cur<max){ const lim=cur*STEP, fit=L.filter(l=>l>cur&&l<=lim); const next=fit.length?fit[fit.length-1]:Math.round(Math.min(lim,max)); out.push(next); cur=next; } return out; }
  function makePlan(sw,sh,an,sizes){
    const rs=sw/sh, sb=an.subject, cx=(sb.x+sb.w/2)*sw, cy=(sb.y+sb.h/2)*sh;
    const minW=Math.min(sw,Math.max(sb.w*sw*PAD,sw*.2)), minH=Math.min(sh,Math.max(sb.h*sh*1.12,sh*.2)), fitW=Math.min(sw,sb.w*sw*1.08); /* a crop is enough when the subject still fits with a little air */
    const items=sizes.map(([w,h])=>{ const r=w/h;
      if(Math.abs(r/rs-1)<.012) return {w,h,kind:"same"};
      if(r<rs){ const cw=sh*r; return cw>=fitW-1?{w,h,kind:"crop",axis:"x",win:cw}:{w,h,kind:"ext",fam:"tall"}; }
      const ch=sw/r; return ch>=minH-1?{w,h,kind:"crop",axis:"y",win:ch}:{w,h,kind:"ext",fam:"wide"}; });
    const fams={};
    const tall=items.filter(i=>i.fam==="tall");
    if(tall.length){ const Wc=Math.round(minW), x0=Math.round(clamp(cx-Wc/2,0,sw-Wc)); tall.forEach(i=>i.len=Math.round(Wc*i.h/i.w));
      fams.tall={axis:"y",base:{x:x0,y:0,w:Wc,h:sh},cross:Wc,src:sh,share:share(an.top?.ease,an.bottom?.ease),masters:steps(sh,tall.map(i=>i.len))}; }
    const wide=items.filter(i=>i.fam==="wide");
    if(wide.length){ wide.forEach(i=>i.len=Math.round(sh*i.w/i.h));
      fams.wide={axis:"x",base:{x:0,y:0,w:sw,h:sh},cross:sh,src:sw,share:share(an.left?.ease,an.right?.ease),masters:steps(sw,wide.map(i=>i.len))}; }
    for(const f of Object.values(fams)) f.offs=f.masters.map(L=>Math.round(f.share*(L-f.src)));
    items.forEach(i=>{ if(i.kind==="ext"){ const F=fams[i.fam]; i.m=F.masters.findIndex(L=>L>=i.len-1); if(i.m<0) i.m=F.masters.length-1; } });
    const n=Object.values(fams).reduce((a,f)=>a+f.masters.length,0);
    return {items,fams,cx,cy,ext:n,credits:n*EXT_CREDITS};
  }
  /* which sides the page can continue itself (measured on the picture's own edge; Claude can veto), and what is left for the model */
  function finishPlan(pl){ let n=0;
    for(const [fam,F] of Object.entries(pl.fams)){ const base=mk(F.base.w,F.base.h); base.getContext("2d").drawImage(R.bmp,F.base.x,F.base.y,F.base.w,F.base.h,0,0,F.base.w,F.base.h);
      const pv={canvas:base,len:F.src,off:0}, [na,nb]=F.axis==="y"?["top","bottom"]:["left","right"], ok=(s,nm)=>{ try{ return R.an[nm]?.plain!==false&&edgeModel(pv,F,s).plain; }catch{ return false; } };
      F.plain={A:ok("A",na),B:ok("B",nb)}; F.names=[na,nb];
      F.aiSteps=F.masters.map((L,k)=>{ const prevLen=k?F.masters[k-1]:F.src, prevOff=k?F.offs[k-1]:0, ea=F.offs[k]-prevOff, eb=L-prevLen-ea; return (ea>0&&!F.plain.A)||(eb>0&&!F.plain.B); }); n+=F.aiSteps.filter(Boolean).length; }
    pl.ext=n; pl.credits=n*EXT_CREDITS; return pl; }
  /* how far a size's window can slide (0..1) and where it sits by default */
  function range(it){ const pl=R.plan;
    if(it.kind==="same") return null;
    if(it.kind==="crop"){ const max=(it.axis==="x"?R.sw:R.sh)-it.win; if(max<2) return null; const c=it.axis==="x"?pl.cx:pl.cy; return {crop:true,max,def:clamp(c-it.win/2,0,max)/max}; }
    const F=pl.fams[it.fam], L=F.masters[it.m], d=it.len-F.src; if(d<1) return null;
    const lo=Math.max(0,1-(1-F.share)*(L-F.src)/d), hi=Math.min(1,F.share*(L-F.src)/d); if(hi-lo<.01) return {lo,hi:lo,def:.5,fixed:true};
    return {lo,hi,def:(clamp(F.share,lo,hi)-lo)/(hi-lo)}; }
  /* the part of the source (or of a master) that a size shows */
  function region0(it){ const pl=R.plan, rg=range(it), v=R.pos[sid(it)]??rg?.def??.5;
    if(it.kind==="same") return {img:R.bmp,sx:0,sy:0,sw:R.sw,sh:R.sh};
    if(it.kind==="crop"){ const o=(rg?rg.max:0)*v; return it.axis==="x"?{img:R.bmp,sx:o,sy:0,sw:it.win,sh:R.sh}:{img:R.bmp,sx:0,sy:o,sw:R.sw,sh:it.win}; }
    const F=pl.fams[it.fam], M=R.M[it.fam]?.[it.m]; if(!M) return null;
    const t=rg?rg.lo+(rg.hi-rg.lo)*v:F.share, o=clamp(F.offs[it.m]-t*(it.len-F.src),0,F.masters[it.m]-it.len);
    return F.axis==="y"?{img:M.canvas,sx:0,sy:o,sw:F.cross,sh:it.len}:{img:M.canvas,sx:o,sy:0,sw:it.len,sh:F.cross}; }
  /* Sharpened pictures (R.U). A size that needs more pixels than the picture has is no longer stretched: the picture it is cut from
     (the original, or a finished master) is enlarged once by Magnific Precision "photo" (faithful, nothing invented, measured for real on
     Samer's climber picture, 17 Nov 2026) and the size is cut from that. Sizes that fit inside the real pixels never touch it. */
  const NEED=1.06, ukey=it=>it.kind==="ext"?it.fam+it.m:"src";
  const grow=it=>{ if(it.kind==="same") return Math.max(it.w/R.sw,it.h/R.sh); if(it.kind==="crop") return it.axis==="x"?Math.max(it.w/it.win,it.h/R.sh):Math.max(it.w/R.sw,it.h/it.win);
    const F=R.plan.fams[it.fam]; return F.axis==="y"?Math.max(it.w/F.cross,it.h/it.len):Math.max(it.w/it.len,it.h/F.cross); };
  function region(it){ const r=region0(it), U=r&&R.U[ukey(it)]; if(!U||grow(it)<=NEED) return r;
    return {img:U.canvas,sx:r.sx*U.zx,sy:r.sy*U.zy,sw:r.sw*U.zx,sh:r.sh*U.zy,sharp:true}; }
  /* resample in halving steps so big reductions stay clean */
  function scaled(img,sx,sy,sw,sh,dw,dh){ let src=img,x=sx,y=sy,w=sw,h=sh;
    for(;;){ const last=w<=dw*2&&h<=dh*2, tw=last?dw:Math.max(dw,Math.ceil(w/2)), th=last?dh:Math.max(dh,Math.ceil(h/2)), c=mk(tw,th), g=c.getContext("2d");
      g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high"; g.drawImage(src,x,y,w,h,0,0,tw,th); if(last) return c; src=c; x=0; y=0; w=tw; h=th; } }
  const render=(it,w,h)=>{ const r=region(it); return r?scaled(r.img,r.sx,r.sy,r.sw,r.sh,w,h):null; };
  const enlarge=it=>{ const r=region(it); return r?Math.max(it.w/r.sw,it.h/r.sh):1; };
  const hqSize=it=>{ if(Math.max(it.w,it.h)>=SMALL) return null; const r=region(it); if(!r) return null; const k=Math.min(1,4096/Math.max(r.sw,r.sh)), w=Math.round(r.sw*k), h=Math.round(r.sh*k); return w>=it.w*2?[w,h]:null; };

  /* ---------- Claude: where the subject is and which side is easy to continue ---------- */
  async function analyse(){
    const small=await toJpeg(R.file,1568).catch(()=>R.file);
    const o=await rlAsk(`You prepare one approved photograph for resizing to many screen formats. The picture itself will never be redrawn: it is cropped, or its background is extended beyond its edges by an outpainting model. Look at the image and return what the layout engine needs.
"subject": ONE box, as fractions of the image from 0 to 1 (x and y = top-left corner, w and h = size), around what must stay whole in every format: the main person (or the main object) only, with the whole head and hair, both arms and hands, and the one thing they are using (the laptop they type on, the phone or cup in their hand). TIGHT: the box hugs the person. Leave OUT the room, the wall, the rest of the table or sofa, plants, and anything blurred in the foreground or background; those may be cropped. Cut the box at the table edge or the waist if the picture does; never cut a head or a hand. The box is almost never the whole picture: if yours is wider than 0.75 or taller than 0.9, look again and tighten it to the person. If several people belong together, one box around all of them.
For each side ("top","bottom","left","right"): "ease" from 0 to 1 = how safely the picture can be continued beyond that edge (1 = plain sky, plain wall, even floor, soft blur: easy and invisible · 0.5 = textured ground, simple furniture · 0 = the edge cuts through a person, a face, hands, text or a complex object), and "fill" = what should continue beyond that edge, in one plain sentence for the outpainting model, written from what is really at that edge (colour, material, focus), e.g. "a perfectly clear, cloudless, smooth deep blue sky, even colour, no clouds" or "the same plain warm limestone floor, softly out of focus, empty". If a line or long object crosses that edge (a rope, a cable, a pole, a railing, a road, a horizon, a wall edge), say in the same sentence that it continues straight to the new edge of the frame, e.g. "clear deep blue sky; the climbing rope continues in one straight line up to the top edge". Keep each "fill" under 150 characters. Never ask for new objects or people. And "plain": true ONLY when the whole strip along that edge, from one end to the other, is a single plain featureless surface (a clear sky, a flat wall, a seamless studio backdrop) with nothing crossing it; false when anything else touches that edge (ground with texture, furniture, plants, a blurred object, a horizon).
"scene": the picture in at most ten words.
Return ONLY JSON: {"subject":{"x":0,"y":0,"w":0,"h":0},"top":{"ease":0,"fill":"","plain":false},"bottom":{"ease":0,"fill":"","plain":false},"left":{"ease":0,"fill":"","plain":false},"right":{"ease":0,"fill":"","plain":false},"scene":""}`,{images:[small],modelTier:"default",cache:false});
    const n=v=>clamp(+v||0,0,1), b=o?.subject||{}; let x=n(b.x), y=n(b.y), w=clamp(+b.w||0,0,1-x), h=clamp(+b.h||0,0,1-y);
    if(w<.05||h<.05){ x=.3; y=.15; w=.4; h=.7; }
    const side=s=>({ease:n(o?.[s]?.ease??.5),fill:String(o?.[s]?.fill||"").slice(0,260),plain:o?.[s]?.plain===true?true:o?.[s]?.plain===false?false:null});
    return {subject:{x,y,w,h},top:side("top"),bottom:side("bottom"),left:side("left"),right:side("right"),scene:String(o?.scene||"").slice(0,120)};
  }

  /* ---------- Magnific: extend, wait, read the result back in tiles ---------- */
  const pid=r=>r?.payload?.creation?.identifier||r?.payload?.creations?.[0]?.identifier||r?.payload?.identifier||readResult(r).ids[0]||null;
  async function waitDone(id,what="extend"){ for(let i=0;i<14;i++){ if(R.stop) throw {code:"stopped"}; const r=await mag("creations_wait",{identifiers:[id],timeoutSeconds:55});
      const x=r?.payload?.results?.[0]||r?.payload?.creations?.[0]||{}, st=String(x.status||readResult(r).status||"").toLowerCase();
      if(FAIL.test(st)) throw {code:"tool_error",message:"Magnific could not "+what+" this picture ("+st+")."}; if(DONE.test(st)) return; }
    throw {code:"tool_error",message:"Magnific is still working on the extension. Open BAE Resize again in a few minutes and press Create: the finished extension is reused, free."}; }
  const rtxt=r=>{ const p=r?.payload; return (typeof p==="string"?p:JSON.stringify(p??""))+"\n"+(r?.content||[]).map(c=>c.text||"").join("\n"); };
  /* claude.ai allows only so many connector calls a minute ("Too many MCP tool calls this minute. Retry after 20 seconds").
     Every Magnific call of this module goes through one pace: calls are spaced, a refusal is waited out and the same call repeated
     (it never ran, so nothing is paid twice), and the pace learns: slower after a refusal, a little faster after a calm stretch. */
  const PACE={gap:750,next:0,hold:0,ok:0}; try{ PACE.gap=clamp(+localStorage.getItem("bae_rz_pace")||750,450,2500); }catch{}
  const BUSY=/too many|rate.?limit|retry after|try again in \d|\b429\b/i;
  async function paced(fn){ for(let a=0;;a++){ if(R.stop) throw {code:"stopped"};
      const now=Date.now(), at=Math.max(now,PACE.next,PACE.hold); PACE.next=at+PACE.gap; if(at>now) await new Promise(r=>setTimeout(r,at-now)); if(R.stop) throw {code:"stopped"};
      try{ const r=await fn(); if(++PACE.ok>=30){ PACE.ok=0; PACE.gap=Math.max(450,PACE.gap*.92); } return r; }
      catch(e){ const t=errText(e); if(!(BUSY.test(t)||e?.code==="rate_limited")||a>=9) throw e;
        const sec=clamp((+(t.match(/after\s+(\d+)\s*s/i)||[])[1]||20)+2,5,90); PACE.ok=0; PACE.gap=Math.min(2500,PACE.gap*1.4); PACE.hold=Date.now()+sec*1000; PACE.waits=(PACE.waits||0)+1;
        try{ localStorage.setItem("bae_rz_pace",String(Math.round(PACE.gap))); }catch{} log("·","resize pace",{wait:sec,gap:Math.round(PACE.gap)});
        R.pause=`claude.ai asked for a short pause · continuing in ${sec} s`; status(R.pause); } } }
  const mag=(tool,args)=>paced(()=>callMag(tool,args));
  const errText=e=>{ let s=""; try{ s=String(e?.message||"")+" "+JSON.stringify(e?.result??"")+" "+JSON.stringify(e?.data??""); }catch{} return s; };
  /* THE REAL SIZE of a Magnific picture. Measured on real results (Nov 2026):
     · the size in the creation's details is NOT the file's size (details said 711×3556, the file is 704×3552: the model works in steps of 16);
     · a big request is shrunk by Magnific's own rule (1264×6320 came back 704×3584, also when 4k is asked);
     · a crop LARGER than the file is refused, and the refusal states the true size ("up to 704 x 3552 px"); a crop POSITION past the edge is silently moved back in.
     So: ask for an impossible crop and read the true size from the refusal; if the refusal's text does not reach the page, find the size with size probes (never position probes). */
  async function fits(id,w,h){ try{ const c=await mag("images_crop",{creationIdentifier:id,aspectRatio:"1:1",customWidth:w,customHeight:h,cropX:0,cropY:0}), t=pid(c); if(t) R.trash.push(t); return !!t; }catch(e){ if(e?.code==="stopped") throw e; return false; } }
  async function edge(test,lo,hi){ /* largest value that still fits, lo is known to fit */ while(hi-lo>1){ if(R.stop) throw {code:"stopped"}; const m=(lo+hi)>>1; if(await test(m)) lo=m; else hi=m; } return lo; }
  async function realSize(id,hw,hh){
    try{ await mag("images_crop",{creationIdentifier:id,aspectRatio:"1:1",customWidth:10000,customHeight:10000,cropX:0,cropY:0}); }
    catch(e){ if(e?.code==="stopped") throw e; const m=errText(e).match(/up to\s+(\d{2,5})\s*[x×]\s*(\d{2,5})/i); if(m&&+m[1]>31&&+m[2]>31) return [+m[1],+m[2]]; }
    status("Measuring the extended picture…"); let w=0,h=0;
    try{ const r=await mag("creations_get",{creationIdentifier:id}), p=r?.payload, m=p&&typeof p==="object"?(p.metadata||p.creation?.metadata||p.creations?.[0]?.metadata||{}):{};
      w=+m.width; h=+m.height; if(!(w>31&&h>31)){ const t=rtxt(r), x=t.match(/\bwidth["'\s:=]+(\d{2,5})/i), y=t.match(/\bheight["'\s:=]+(\d{2,5})/i); w=+x?.[1]||0; h=+y?.[1]||0; } }catch(e){ log("✕","resize size",{code:e?.code,message:e?.message}); }
    if(w>31&&h>31){ const c=[Math.floor(w/16)*16,Math.floor(h/16)*16]; if(await fits(id,c[0],c[1])&&!(await fits(id,c[0]+1,32))&&!(await fits(id,32,c[1]+1))) return c; }
    if(!(await fits(id,32,32))) throw {code:"tool_error",message:"Magnific did not let the page read the extended picture. Try again in a minute."};
    const W=await edge(v=>fits(id,v,32),32,Math.max(hw,w,64)+65), H=await edge(v=>fits(id,32,v),32,Math.max(hh,h,64)+65); log("·","resize measured",{details:[w,h],measured:[W,H]}); return [W,H]; }
  /* one square piece of Magnific's picture as pixels. The bytes are decoded in the page (a data: fetch is blocked by the page's security);
     if the read returns no bytes, the piece is loaded from its file link instead. */
  const imgFromUrl=u=>new Promise((res,rej)=>{ const im=new Image(); im.crossOrigin="anonymous"; im.onload=()=>createImageBitmap(im).then(res,rej); im.onerror=()=>rej(new Error("link blocked")); im.src=u; });
  async function tile(id,x,y,T){ let why="";
    for(let a=0;a<3;a++){ try{ x=Math.max(0,Math.round(x)); y=Math.max(0,Math.round(y)); if(R.stop) throw {code:"stopped"};
        const c=await mag("images_crop",{creationIdentifier:id,aspectRatio:"1:1",customWidth:T,customHeight:T,cropX:x,cropY:y}), tid=pid(c); if(!tid){ why="the crop returned no id"; throw 0; } R.trash.push(tid);
        const st=String(c?.payload?.creation?.status||"").toLowerCase(); if(st&&!DONE.test(st)) await waitDone(tid);
        const r=await mag("creations_read",{creationIdentifier:tid,hq:"medium"}), rr=readResult(r), im=rr.images[0];
        if(im){ const bmp=await createImageBitmap(b64Blob(im.data,im.mime||"image/jpeg")); if(bmp.width>=T*.9) return bmp; why=`the piece came back at ${bmp.width} px`; if(bmp.width>16){ const c2=mk(T,T); c2.getContext("2d").drawImage(bmp,0,0,T,T); return await createImageBitmap(c2); } }
        else why="the read returned no image ("+(r?.content||[]).map(b=>b.type).join(",")+")";
        const urls=[...rr.urls]; if(!urls.length){ try{ urls.push(...readResult(await mag("creations_get",{creationIdentifier:tid})).urls); }catch{} }
        for(const u of urls.filter(u=>!/conversions|preview/i.test(u)).concat(urls)){ try{ return await imgFromUrl(u); }catch(e){ why+=" · link blocked"; } }
        throw 0;
      }catch(e){ if(e?.code==="stopped") throw e; if(e&&e!==0) why=why||String(e?.message||"").replace(/\(request_id[^)]*\)/i,"").trim()||e?.code||String(e); log("✕","resize tile",{x,y,T,why,code:e?.code,message:e?.message});
        if(a===2) throw {code:"tool_error",message:`Magnific did not return a part of the extended picture (${String(why).slice(0,120)}). Press Create again: the extension is reused, free. If it repeats, send me this message.`}; await new Promise(r=>setTimeout(r,1200)); } } }
  /* the AI picture, rebuilt at its own pixel size from tiles; only the rows / columns the extension needs */
  async function readBack(id,aw,ah,axis,ranges,onP){ const A=mk(aw,ah), g=A.getContext("2d"), T=Math.min(TILE,aw,ah), al=axis==="y"?ah:aw, cl=axis==="y"?aw:ah;
    const line=(a,b,len)=>{ const out=[]; a=clamp(Math.floor(a),0,len-T); b=clamp(Math.ceil(b),a+1,len); for(let p=a;p<b;p+=T) out.push(Math.min(p,len-T)); return out; };
    const cross=line(0,cl,cl), seen=new Set(), jobs=[];
    for(const [a,b] of ranges) if(b-a>1) for(const p of line(a,b,al)) for(const q of cross){ const x=axis==="y"?q:p, y=axis==="y"?p:q, k=x+","+y; if(!seen.has(k)){ seen.add(k); jobs.push([x,y]); } }
    let done=0; const run=async()=>{ for(;;){ const j=jobs.shift(); if(!j) return; if(R.stop) throw {code:"stopped"}; const bmp=await tile(id,j[0],j[1],T); g.drawImage(bmp,j[0],j[1],T,T); bmp.close?.(); onP?.(++done,done+jobs.length); } };
    const total=jobs.length; onP?.(0,total); await Promise.all([run(),run(),run()]); return A; }
  /* ---------- plain sides are continued by the page itself: no AI, full resolution, the picture's own grain ----------
     A strip at the picture's edge is read in a canonical position (row 0 = the edge row, rows going INTO the picture).
     If it is one plain surface (a clear sky, a flat wall), it is described by three things: its tone at the edge and how it changes
     with distance, its slow change from side to side, and its grain. The new area is those three continued outward: the tone change
     eases off, the side-to-side change fades, the grain is mirrored so it is the picture's real grain. */
  function edgeStrip(prev,F,side,S){ const tall=F.axis==="y", c=mk(F.cross,S), g=c.getContext("2d",{willReadFrequently:true}), len=prev.len;
    if(tall&&side==="A") g.setTransform(1,0,0,1,0,0); else if(tall) g.setTransform(1,0,0,-1,0,len); else if(side==="A") g.setTransform(0,1,1,0,0,0); else g.setTransform(0,-1,1,0,0,len);
    g.drawImage(prev.canvas,0,0); return g.getImageData(0,0,F.cross,S).data; }
  const box1=(v,n,ch,r)=>{ const o=new Float64Array(v.length); for(let c=0;c<ch;c++){ let s=0,k=0; for(let i=0;i<Math.min(n,r+1);i++){ s+=v[i*ch+c]; k++; } for(let i=0;i<n;i++){ o[i*ch+c]=s/k; const add=i+r+1, rem=i-r; if(add<n){ s+=v[add*ch+c]; k++; } if(rem>=0){ s-=v[rem*ch+c]; k--; } } } return o; };
  function edgeModel(prev,F,side){ const W=F.cross, S=Math.round(clamp(prev.len*.06,48,200)), im=edgeStrip(prev,F,side,S), rm=new Float64Array(S*3), cm=new Float64Array(W*3);
    for(let r=0;r<S;r++) for(let x=0;x<W;x++){ const i=(r*W+x)*4; for(let k=0;k<3;k++){ rm[r*3+k]+=im[i+k]/W; cm[x*3+k]+=im[i+k]/S; } }
    const g=[0,0,0], i0=[0,0,0], mean=[0,0,0]; let rowRes=0;
    for(let k=0;k<3;k++){ let sx=0,sy=0,sxx=0,sxy=0; for(let r=0;r<S;r++){ sx+=r; sy+=rm[r*3+k]; sxx+=r*r; sxy+=r*rm[r*3+k]; } g[k]=(S*sxy-sx*sy)/(S*sxx-sx*sx); i0[k]=(sy-g[k]*sx)/S; mean[k]=sy/S;
      for(let r=0;r<S;r++) rowRes=Math.max(rowRes,Math.abs(rm[r*3+k]-(i0[k]+g[k]*r))); }
    const dev=new Float64Array(W*3); for(let x=0;x<W;x++) for(let k=0;k<3;k++) dev[x*3+k]=cm[x*3+k]-mean[k];
    let lat=dev; const rad=Math.max(8,Math.round(W/10)); for(let p=0;p<3;p++) lat=box1(lat,W,3,rad); const fine=box1(dev,W,3,4); let colRes=0, latMax=0; for(let i=0;i<W*3;i++){ colRes=Math.max(colRes,Math.abs(fine[i]-lat[i])); latMax=Math.max(latMax,Math.abs(lat[i])); }
    /* grain = the strip minus a small blur of itself */
    const f=new Float64Array(W*S*3); for(let i=0,j=0;i<im.length;i+=4,j+=3){ f[j]=im[i]; f[j+1]=im[i+1]; f[j+2]=im[i+2]; }
    let b=f; for(let p=0;p<2;p++){ const h=new Float64Array(b.length); for(let r=0;r<S;r++) h.set(box1(b.subarray(r*W*3,(r+1)*W*3),W,3,5),r*W*3); const v=new Float64Array(b.length), colv=new Float64Array(S*3);
      for(let x=0;x<W;x++){ for(let r=0;r<S;r++) for(let k=0;k<3;k++) colv[r*3+k]=h[(r*W+x)*3+k]; const o=box1(colv,S,3,5); for(let r=0;r<S;r++) for(let k=0;k<3;k++) v[(r*W+x)*3+k]=o[r*3+k]; } b=v; }
    const Rg=new Float32Array(W*S*3); let s2=0; for(let i=0;i<Rg.length;i++){ Rg[i]=f[i]-b[i]; s2+=Rg[i]*Rg[i]; } const hp=Math.sqrt(s2/Rg.length);
    return {W,S,i0,g,lat,R:Rg,hp,rowRes,colRes,latMax,plain:rowRes<4.5&&colRes<5&&hp<9&&latMax<42}; }
  /* the continued surface, canonical: E rows outside (row E-1 touches the edge) then `band` rows that lie over the picture for the blend */
  function synth(m,E,band){ const {W,S}=m, H=E+band, c=mk(W,H), g=c.getContext("2d"), im=g.createImageData(W,H), px=im.data, Sd=clamp(S*4,240,900), gk=m.g.map(v=>clamp(v*Sd,-26,26)/Sd), lf=W*1.5;
    for(let q=0;q<H;q++){ const r=q-E, d=-r, t=r>=0?r:d-1, n=Math.floor(t/S), o=t%S, rr=n%2?S-1-o:o, latK=r>=0?1:Math.exp(-d/lf), b0=[0,1,2].map(k=>r>=0?m.i0[k]+gk[k]*r:m.i0[k]-gk[k]*Sd*(1-Math.exp(-d/Sd)));
      for(let x=0;x<W;x++){ const i=(q*W+x)*4, j=(rr*W+x)*3; px[i]=b0[0]+m.lat[x*3]*latK+m.R[j]; px[i+1]=b0[1]+m.lat[x*3+1]*latK+m.R[j+1]; px[i+2]=b0[2]+m.lat[x*3+2]*latK+m.R[j+2]; px[i+3]=255; } }
    g.putImageData(im,0,0); return c; }
  /* fine grain: the level in the calmest patches (so real detail is not mistaken for grain), and a way to add what is missing */
  function grainLevel(ctx,x,y,w,h){ x=Math.round(x); y=Math.round(y); w=Math.floor(w); h=Math.floor(h); if(w<40||h<40) return 0; const d=ctx.getImageData(x,y,w,h).data, v=[];
    for(let by=1;by+16<h-1;by+=24) for(let bx=1;bx+16<w-1;bx+=24){ let s=0,s2=0; for(let yy=by;yy<by+16;yy++) for(let xx=bx;xx<bx+16;xx++){ const i=(yy*w+xx)*4+1, e=d[i]-(d[i-4]+d[i+4]+d[i-w*4]+d[i+w*4])/4; s+=e; s2+=e*e; } v.push(Math.sqrt(Math.max(0,s2/256-(s/256)**2))); }
    if(v.length<4) return 0; v.sort((p,q)=>p-q); return v[Math.floor(v.length*.15)]/1.118; }
  function addGrain(ctx,x,y,w,h,sigma){ x=Math.round(x); y=Math.round(y); w=Math.floor(w); h=Math.floor(h); if(w<1||h<1||!(sigma>=.4)) return; let s=((x+1)*73856093^(y+1)*19349663^w)>>>0||1; const rnd=()=>{ s^=s<<13; s>>>=0; s^=s>>>17; s^=s<<5; s>>>=0; return s/4294967296; };
    for(let y0=0;y0<h;y0+=512){ const hh=Math.min(512,h-y0), im=ctx.getImageData(x,y+y0,w,hh), px=im.data; for(let i=0;i<px.length;i+=4){ const n=(rnd()+rnd()+rnd()-1.5)*2*sigma; px[i]+=n; px[i+1]+=n; px[i+2]+=n; } ctx.putImageData(im,x,y+y0); } }
  /* master = the AI extension with the previous layer (the original, or the master before) put back on top, tone-matched and feathered */
  function compose(F,L,A,prev,at,bA,bB,ai){ const tall=F.axis==="y", W=tall?F.cross:L, H=tall?L:F.cross, c=mk(W,H), g=c.getContext("2d");
    g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high"; g.drawImage(A,0,0,A.width,A.height,0,0,W,H);
    bA=Math.round(bA); bB=Math.round(bB); const end=at+prev.len, pg=prev.canvas.getContext("2d",{willReadFrequently:true});
    /* Remove the step at each join. The model re-draws the original faithfully but often gives the NEW area a slightly different tone,
       so the step sits exactly at the picture's edge. Measure it there (a thin strip just outside against a thin strip just inside, in 24 bins
       across so a step that changes from side to side is followed), then lift the new area by that amount: all of it at the join, fading to
       half far away, so the sky keeps one tone and no line is left. */
    const NB=24, thin=Math.round(clamp(prev.len*.012,4,24));
    const bins=(ctx,o)=>{ const d=tall?ctx.getImageData(0,o,F.cross,thin).data:ctx.getImageData(o,0,thin,F.cross).data, w=tall?F.cross:thin, h=tall?thin:F.cross, s=new Float64Array(NB*3), n=new Float64Array(NB);
      for(let y=0;y<h;y++) for(let x=0;x<w;x++){ const c=tall?x:y, b=Math.min(NB-1,Math.floor(c/F.cross*NB)), i=(y*w+x)*4; if(d[i+3]<250) continue; s[b*3]+=d[i]; s[b*3+1]+=d[i+1]; s[b*3+2]+=d[i+2]; n[b]++; }
      for(let b=0;b<NB;b++) if(n[b]){ s[b*3]/=n[b]; s[b*3+1]/=n[b]; s[b*3+2]/=n[b]; } return s; };
    const seam=(from,to,aiO,pvO,joinAt)=>{ const ext=to-from; if(ext<thin+2) return; const A2=bins(g,aiO), P2=bins(pg,pvO); let st=new Float64Array(NB*3); for(let i=0;i<NB*3;i++) st[i]=clamp(P2[i]-A2[i],-90,90);
      for(let pass=0;pass<3;pass++){ const t=st.slice(); for(let b=0;b<NB;b++) for(let c=0;c<3;c++){ const l=t[Math.max(0,b-1)*3+c], r=t[Math.min(NB-1,b+1)*3+c]; st[b*3+c]=(l+2*t[b*3+c]+r)/4; } }
      if(st.every(v=>Math.abs(v)<.7)) return;
      const off=new Float32Array(F.cross*3); for(let c=0;c<F.cross;c++){ const f=clamp((c+.5)/F.cross*NB-.5,0,NB-1), b0=Math.floor(f), b1=Math.min(NB-1,b0+1), t=f-b0; for(let k=0;k<3;k++) off[c*3+k]=st[b0*3+k]*(1-t)+st[b1*3+k]*t; }
      const Z=clamp(ext*.6,60,F.cross*1.5), im=tall?g.getImageData(0,from,F.cross,ext):g.getImageData(from,0,ext,F.cross), px=im.data, w=tall?F.cross:ext, h=tall?ext:F.cross;
      for(let y=0;y<h;y++) for(let x=0;x<w;x++){ const along=(tall?y:x)+from, c=tall?x:y, d=Math.abs(along-joinAt), u=Math.min(1,d/Z), k=.5+.5*(1-u*u*(3-2*u)), i=(y*w+x)*4; px[i]+=off[c*3]*k; px[i+1]+=off[c*3+1]*k; px[i+2]+=off[c*3+2]*k; }
      g.putImageData(im,tall?0:from,tall?from:0); };
    if(at>0) seam(0,at,at-thin,0,at); if(end<L) seam(end,L,end,prev.len-thin,end);
    /* the model's new area is smoother than the photograph (and is enlarged): give it the photograph's grain so the texture does not change at the join */
    const rect=(o,n)=>tall?[0,o,F.cross,n]:[o,0,n,F.cross];
    if(ai?.A&&at>40){ const n=Math.min(at,500), want=grainLevel(pg,...rect(0,Math.min(prev.len,400))), has=grainLevel(g,...rect(at-n,n)); addGrain(g,...rect(0,at),Math.min(6,Math.sqrt(Math.max(0,want*want-has*has)))); }
    if(ai?.B&&L-end>40){ const n=Math.min(L-end,500), m=Math.min(prev.len,400), want=grainLevel(pg,...rect(prev.len-m,m)), has=grainLevel(g,...rect(end,n)); addGrain(g,...rect(end,L-end),Math.min(6,Math.sqrt(Math.max(0,want*want-has*has)))); }
    const pc=mk(prev.canvas.width,prev.canvas.height), q=pc.getContext("2d"); q.drawImage(prev.canvas,0,0); q.globalCompositeOperation="destination-in";
    /* a long, eased blend: the join is spread over the whole calm band between the picture's edge and the subject */
    const gr=tall?q.createLinearGradient(0,0,0,prev.len):q.createLinearGradient(0,0,prev.len,0), fa=bA/prev.len, fb=bB/prev.len, ease=[[0,0],[.25,.1],[.5,.5],[.75,.9],[1,1]];
    if(at>0) ease.forEach(([t,v])=>gr.addColorStop(fa*t,`rgba(0,0,0,${v})`)); else gr.addColorStop(0,"#000");
    if(end<L) ease.forEach(([t,v])=>gr.addColorStop(1-fb*t,`rgba(0,0,0,${v})`)); else gr.addColorStop(1,"#000");
    q.fillStyle=gr; q.fillRect(0,0,pc.width,pc.height); g.drawImage(pc,tall?0:at,tall?at:0); return c; }
  const cacheKey=()=>`${R.name}|${R.file.size}|${R.sw}x${R.sh}`;
  const runs=()=>{ try{ return JSON.parse(localStorage.getItem(CKEY)||"{}"); }catch{ return {}; } };
  const runSave=o=>{ const all=runs(); all[cacheKey()]={...o,t:Date.now()}; const keys=Object.keys(all).sort((a,b)=>all[b].t-all[a].t); try{ localStorage.setItem(CKEY,JSON.stringify(Object.fromEntries(keys.slice(0,12).map(k=>[k,all[k]])))); }catch{} };
  const fillText=(F,an,doA=true,doB=true)=>{ const [sa,sbb,la,lb]=F.axis==="y"?[an.top,an.bottom,"Above the picture","Below the picture"]:[an.left,an.right,"To the left of the picture","To the right of the picture"];
    return `${doA?`${la}: ${sa.fill||"the same background, plain and even"}. `:""}${doB?`${lb}: ${sbb.fill||"the same background, plain and even"}. `:""}Same light, colour, grain and focus blur. Calm and empty: no people, no new objects, no text, nothing repeated.`; };
  /* images_expand refuses a prompt longer than 500 characters (measured) */
  const fit500=t=>{ t=String(t).replace(/\s+/g," ").trim(); if(t.length<=500) return t; const c=t.slice(0,497), i=Math.max(c.lastIndexOf(". "),c.lastIndexOf("; "),c.lastIndexOf(", ")); return (i>300?c.slice(0,i):c).trim()+"."; };
  const f16=v=>Math.max(32,Math.floor(v/16)*16);
  async function trash(){ const ids=[...new Set(R.trash)]; R.trash=[]; for(let i=0;i<ids.length;i+=150){ try{ await mag("creations_trash",{creationIdentifiers:ids.slice(i,i+150)}); }catch(e){ log("✕","resize tidy",{code:e?.code,message:e?.message}); return; } } }
  async function family(fam,redoFrom){ const pl=R.plan, F=pl.fams[fam], tall=F.axis==="y", saved=runs()[cacheKey()]?.[fam]||{};
    const base=mk(F.base.w,F.base.h); base.getContext("2d").drawImage(R.bmp,F.base.x,F.base.y,F.base.w,F.base.h,0,0,F.base.w,F.base.h);
    const sig=`v6,${F.base.x},${F.base.w},${F.share.toFixed(3)},${F.plain.A?1:0}${F.plain.B?1:0}`;
    const reuse=saved.sig===sig?saved:{sig,ids:[],dims:[],src:[],spent:saved.spent||0}; reuse.src=reuse.src||[]; R.M[fam]=R.M[fam]||[];
    const keep=()=>runSave({...runs()[cacheKey()],an:R.an,[fam]:reuse});
    let prev={canvas:base,len:F.src,off:0};
    for(let k=0;k<F.masters.length;k++){ if(R.stop) throw {code:"stopped"};
      const L=F.masters[k], off=F.offs[k], at=off-prev.off, end=at+prev.len, ea=at, eb=L-end, tag=`${tall?"tall":"wide"} extension ${k+1} of ${F.masters.length}`;
      if(redoFrom!=null&&k>=redoFrom){ reuse.ids[k]=null; reuse.dims[k]=null; reuse.src[k]=null; }
      if(R.M[fam][k]&&redoFrom!=null&&k<redoFrom){ prev={canvas:R.M[fam][k].canvas,len:L,off}; continue; }
      /* each side is continued by the page when it is plain, by the model when it is not */
      const mA=ea>0?(F.plain.A?"synth":"ai"):"", mB=eb>0?(F.plain.B?"synth":"ai"):"", sb=R.an.subject, s0=tall?sb.y*R.sh:sb.x*R.sw, s1=tall?(sb.y+sb.h)*R.sh:(sb.x+sb.w)*R.sw;
      /* how deep the blend may go on each side: never into the subject */
      let bA=clamp(Math.min(prev.len*.3,(prev.off+s0)*.8),16,700), bB=clamp(Math.min(prev.len*.3,(prev.len-prev.off-s1)*.8),16,700); if(bA+bB>prev.len*.9){ const z=prev.len*.9/(bA+bB); bA*=z; bB*=z; }
      const W=tall?F.cross:L, H=tall?L:F.cross, A=mk(W,H), ag=A.getContext("2d"); ag.imageSmoothingEnabled=true; ag.imageSmoothingQuality="high";
      if(mA==="synth"||mB==="synth"){ status(`Continuing the plain background · ${tag}`); await new Promise(r=>setTimeout(r,20));
        if(mA==="synth"){ const c=synth(edgeModel(prev,F,"A"),ea,Math.round(bA)); ag.save(); if(tall) ag.setTransform(1,0,0,1,0,at-ea); else ag.setTransform(0,1,1,0,at-ea,0); ag.drawImage(c,0,0); ag.restore(); }
        if(mB==="synth"){ const c=synth(edgeModel(prev,F,"B"),eb,Math.round(bB)); ag.save(); if(tall) ag.setTransform(1,0,0,-1,0,end+eb); else ag.setTransform(0,1,-1,0,end+eb,0); ag.drawImage(c,0,0); ag.restore(); } }
      let id=null;
      if(mA==="ai"||mB==="ai"){ const both=mA==="ai"&&mB==="ai";
        /* When only one side needs the model, it is given just the part of the picture next to that side: a smaller request,
           which Magnific returns at (nearly) full resolution instead of shrinking a very tall frame. The source is always a picture
           this page uploaded (never Magnific's raw result), sized in steps of 16. */
        const N=Math.min(prev.len,Math.round(F.cross*1.25)), p0=both||mA==="ai"?0:prev.len-N, sl=both?prev.len:N, xa=mA==="ai"?ea:0, xb=mB==="ai"?eb:0, fl=xa+sl+xb;
        if(!both){ if(mA==="ai") bA=Math.min(bA,sl*.45); else bB=Math.min(bB,sl*.45); }
        const u=Math.min(1,Math.sqrt(3.2e6/(F.cross*fl)),9000/fl), sc=f16(F.cross*u), sp=f16(sl*u), len=Math.max(sp+16,f16(fl*u)), ia=clamp(Math.round(xa/fl*len),0,len-sp), fw=tall?sc:len, fh=tall?len:sc;
        let wh=null; id=reuse.ids[k]||null; if(id) wh=reuse.dims[k]||null;
        if(!id){ if(!reuse.src[k]){ status(`Sending the picture to Magnific…`); const cut=tall?scaled(prev.canvas,0,p0,F.cross,sl,sc,sp):scaled(prev.canvas,p0,0,sl,F.cross,sp,sc);
            const blob=await new Promise(r=>cut.toBlob(r,"image/png")); reuse.src[k]=(await paced(()=>rlUploadMag(blob,(R.name||"image")+"_resize_"+(k+1)))).id; keep(); }
          status(`Extending the background · ${tag} · ${EXT_CREDITS} credits`);
          const note=String(R.notes[fam+k]||"").trim(), args={creationIdentifier:reuse.src[k],aspectRatio:tall?"1:2":"2:1",customWidth:fw,customHeight:fh,imageX:tall?0:ia,imageY:tall?ia:0,mode:MODE,prompt:fit500((note?`${note.slice(0,160)}. `:"")+fillText(F,R.an,mA==="ai",mB==="ai"))};
          const r=await mag("images_expand",args); id=pid(r); if(!id) throw {code:"tool_error",message:"Magnific accepted the extension but returned no identifier."};
          reuse.ids[k]=id; reuse.dims[k]=null; reuse.spent=(reuse.spent||0)+EXT_CREDITS; keep(); await waitDone(id); }
        else if(!wh) await waitDone(id);
        if(!wh){ wh=await realSize(id,fw,fh); reuse.dims[k]=wh; keep(); }
        /* ka = real pixels per plan unit along the extension (Magnific may shrink the two directions slightly differently) */
        const ln=tall?wh[1]:wh[0], ka=ln/fl;
        const P=await readBack(id,wh[0],wh[1],F.axis,[[0,mA==="ai"?(xa+bA)*ka:0],[mB==="ai"?(xa+sl-bB)*ka:ln,ln]],(d,t)=>status(`Reading the ${tag} back · ${d} / ${t}`));
        const m0=at+p0-xa; if(tall) ag.drawImage(P,0,0,P.width,P.height,0,m0,F.cross,fl); else ag.drawImage(P,0,0,P.width,P.height,m0,0,fl,F.cross); }
      status(`Putting the original back · ${tag}`); await new Promise(r=>setTimeout(r,20));
      const canvas=compose(F,L,A,prev,at,bA,bB,{A:mA==="ai",B:mB==="ai"}); R.M[fam][k]={canvas,len:L,off,id,ai:!!id}; prev={canvas,len:L,off}; delete R.qc[fam+k]; delete R.U[fam+k]; paint(); if(id){ status(`Checking the ${tag}`); await check(fam,k).catch(()=>{}); } }
    trash().catch(()=>{});
  }
  /* a second look by Claude at every extension, so a bad one is flagged before it is downloaded */
  const clip=(t,n)=>{ t=String(t||"").replace(/\s+/g," ").trim(); if(t.length<=n) return t; const c=t.slice(0,n), i=c.lastIndexOf(" "); return (i>n*.5?c.slice(0,i):c).replace(/[\s,;:.·-]+$/,"")+"…"; };
  async function check(fam,k){ const M=R.M[fam]?.[k]; if(!M||!sample) return; const F=R.plan.fams[fam], c=M.canvas, s=Math.min(1,1568/Math.max(c.width,c.height));
    const blob=await new Promise(r=>scaled(c,0,0,c.width,c.height,Math.round(c.width*s),Math.round(c.height*s)).toBlob(r,"image/jpeg",.9));
    const orig=await toJpeg(R.file,1024).catch(()=>null);
    const a=Math.round(M.off/M.len*100), b=Math.round((M.off+F.src)/M.len*100), tall=F.axis==="y";
    const o=await rlAsk(`Quality check of a background extension, for a designer who will decide whether to redo it. ${orig?"Image 1 is the ORIGINAL approved photograph. Image 2 is the extended version":"The image is the extended version"}: the original (sometimes only its middle part across the ${tall?"width":"height"}) sits between ${a}% and ${b}% of ${orig?"image 2's":"its"} ${tall?"height (from the top)":"width (from the left)"}, untouched; everything outside that band was generated to continue the background.
Judge ONLY the generated areas and the two joins, the way a viewer sees the picture at normal size.
NOT a defect, never report: anything that is already in the original photograph (${orig?"check image 1: ":""}a table, a cup, a plant, a blurred foreground object and their natural continuation beyond the edge are correct); a calm, plain continuation; a slightly softer or simpler background; small differences nobody would notice without searching.
A defect: the person or a main object appears a second time; a NEW person, object, furniture or text that has no source in the original; a clearly visible straight line, band or jump of brightness or sharpness at a join; warped, smeared or impossible shapes; a surface that changes character (clouds in a sky that was clear).
"verdict": "ok" = nothing a viewer would notice · "look" = a small thing, worth one look, fine to use if the designer agrees · "redo" = a clear fault anyone would see.
"issues": at most 2, only for "look" or "redo", each ONE short phrase of at most 8 words, in ${UX.lang==="ar"?"Arabic":"plain English"}, saying what and where (top, bottom, left, right). Empty for "ok". When unsure between two verdicts choose the calmer one.
Return ONLY JSON: {"verdict":"ok","issues":[]}`,{images:orig?[orig,blob]:[blob],modelTier:"default",cache:false});
    const issues=(Array.isArray(o?.issues)?o.issues:[]).map(x=>clip(x,70)).filter(Boolean).slice(0,2);
    const level=o?.verdict==="redo"?"redo":o?.verdict==="look"||(o?.verdict!=="ok"&&issues.length)?"look":"ok";
    R.qc[fam+k]={ok:level==="ok",level,issues:level==="ok"?[]:issues}; }

  /* ---------- sharpen: real pixels for the sizes that would otherwise be stretched ---------- */
  const UP={mode:"ultra-photo",scale:"2x",sharpness:7,grain:0,ultraDetail:7}, UPMAX=16e6, upEst=mp=>Math.max(90,Math.round(mp*6.6)*10);
  try{ R.sharp=localStorage.getItem("bae_rz_sharp")!=="0"; }catch{}
  /* one target per picture that has a stretched size: the original ("src") or a master (fam+index) */
  function sharpTargets(all){ const pl=R.plan, T={}; if(!pl||(!R.sharp&&!all)) return [];
    for(const it of pl.items){ const g=grow(it); if(g<=NEED) continue; const F=it.kind==="ext"?pl.fams[it.fam]:null, bw=F?(F.axis==="y"?F.cross:F.masters[it.m]):R.sw, bh=F?(F.axis==="y"?F.masters[it.m]:F.cross):R.sh;
      if(bw*bh*4>UPMAX||Math.max(bw,bh)*2>8192) continue;                       /* too large to enlarge twice: that size stays as it is */
      const k=ukey(it), t=T[k]=T[k]||{key:k,fam:it.fam,m:it.m,src:!F,bw,bh,z:1,n:0}; t.z=Math.max(t.z,g); t.n++; }
    return Object.values(T); }
  const upSaved=()=>runs()[R.file?cacheKey():""]?.up||{};
  const sharpOpen=()=>sharpTargets().filter(t=>!R.U[t.key]);
  const sharpCost=()=>sharpOpen().filter(t=>!upSaved()[t.key]?.id).reduce((a,t)=>a+upEst(t.bw*t.bh/1e6),0);
  /* small copies of two pictures: how far apart they are, and by how much the colour moved */
  function apart(a,b){ const n=48, px=c=>{ const t=mk(n,n), g=t.getContext("2d",{willReadFrequently:true}); g.imageSmoothingQuality="high"; g.drawImage(c,0,0,n,n); return g.getImageData(0,0,n,n).data; }, A=px(a), B=px(b), m=[0,0,0]; let e=0;
    for(let i=0;i<A.length;i+=4) for(let c=0;c<3;c++){ const d=B[i+c]-A[i+c]; m[c]+=d; e+=d*d; } return {mean:m.map(v=>v/(n*n)),rms:Math.sqrt(e/(n*n*3))}; }
  function addRGB(c,d){ const g=c.getContext("2d"), H=256; for(let y=0;y<c.height;y+=H){ const h=Math.min(H,c.height-y), im=g.getImageData(0,y,c.width,h), p=im.data; for(let i=0;i<p.length;i+=4){ p[i]+=d[0]; p[i+1]+=d[1]; p[i+2]+=d[2]; } g.putImageData(im,0,y); } }
  async function sharpen(){ const list=sharpOpen().filter(t=>t.src||R.M[t.fam]?.[t.m]); if(!list.length) return;
    const all=()=>runs()[cacheKey()]||{}, put=(k,o,add=0)=>{ const r=all(); runSave({...r,up:{...(r.up||{}),[k]:o},upSpent:(r.upSpent||0)+add}); };
    const sigOf=t=>{ if(t.src) return "src"; const f=all()[t.fam]||{}; return (f.sig||"")+"|"+Array.from({length:t.m+1},(_,i)=>f.ids?.[i]||"-").join(","); };
    const label=t=>t.src?"original":`${t.fam} extension ${t.m+1}`, pic=t=>t.src?R.bmp:R.M[t.fam][t.m].canvas;
    /* 1. start every enlargement: they run at Magnific at the same time */
    for(const t of list){ let o=all().up?.[t.key]||{}; if(o.of!==sigOf(t)) o={of:sigOf(t)};
      if(!o.id){ if(!o.src){ status(`Sharpening · sending the ${label(t)}`); const c=mk(t.bw,t.bh); c.getContext("2d").drawImage(pic(t),0,0); const blob=await new Promise(r=>c.toBlob(r,"image/png")); c.width=c.height=0;
          o.src=(await paced(()=>rlUploadMag(blob,(R.name||"image")+"_sharp_"+t.key))).id; put(t.key,o); }
        status(`Sharpening the ${label(t)} · Magnific Precision`); const r=await mag("images_upscale",{creationIdentifier:o.src,...UP}), id=pid(r); if(!id) throw {code:"tool_error",message:"Magnific accepted the sharpening but returned no identifier."};
        o.id=id; o.dims=null; o.credits=+r?.payload?.creation?.credits||upEst(t.bw*t.bh/1e6); put(t.key,o,o.credits); }
      t.o=o; }
    /* 2. wait for each, read it back whole, keep the pixels the sizes need */
    for(const t of list){ const o=t.o; if(!o.dims){ status(`Sharpening the ${label(t)} · Magnific needs a few minutes`); await waitDone(o.id,"sharpen"); o.dims=await realSize(o.id,t.bw*2,t.bh*2); put(t.key,o); }
      const [uw,uh]=o.dims; if(uw<t.bw*1.15||Math.abs(uw/t.bw-uh/t.bh)>.03) throw {code:"tool_error",message:`The sharpened ${label(t)} came back at an unexpected size (${uw} x ${uh}). The sizes keep their normal version.`};
      const big=await readBack(o.id,uw,uh,"y",[[0,uh]],(d,n)=>status(`Reading the sharpened ${label(t)} · ${d} / ${n}`));
      const z=Math.min(uw/t.bw,Math.max(1.25,t.z*1.02)), cw=Math.round(t.bw*z), ch=Math.round(t.bh*z); let c=big; if(cw<uw-4){ c=scaled(big,0,0,uw,uh,cw,ch); big.width=big.height=0; }
      /* safety: it must be the same picture, in the same colour */
      const d=apart(pic(t),c); log("·","resize sharp",{key:t.key,size:[uw,uh],kept:[cw,ch],rms:+d.rms.toFixed(1),mean:d.mean.map(v=>+v.toFixed(1))});
      if(d.rms>24){ c.width=c.height=0; throw {code:"tool_error",message:`The sharpened ${label(t)} does not match the picture, so it was not used. The sizes keep their normal version.`}; }
      if(d.mean.some(v=>Math.abs(v)>1.2)) addRGB(c,d.mean.map(v=>-Math.round(v)));
      R.U[t.key]={canvas:c,zx:cw/t.bw,zy:ch/t.bh}; paint(); }
    trash().catch(()=>{});
  }

  /* ---------- run ---------- */
  const status=t=>{ R.step=t; const el=$("rzStep"); if(el) el.textContent=t; const st=stageOf(t); body.querySelectorAll(".rz-steps li").forEach((li,i)=>{ li.className=i<st?"done":i===st?"on":""; }); };
  async function load(f){ if(!f||R.busy) return; R.err=""; R.busy="Opening the picture…"; draw();
    try{ let bmp; try{ bmp=await createImageBitmap(f); }catch{ bmp=await createImageBitmap(await toJpegFull(f)); }
      Object.assign(R,{file:f,name:String(f.name||"image").replace(/\.[a-z0-9]{2,5}$/i,"").replace(/[^\w؀-ۿ-]+/g,"_").slice(0,40)||"image",bmp,sw:bmp.width,sh:bmp.height,an:null,plan:null,M:{},U:{},qc:{},pos:{},px:{},notes:{},done:false});
      if(R.thumb) URL.revokeObjectURL(R.thumb); R.thumb=URL.createObjectURL(f);
      const saved=runs()[cacheKey()]; if(saved?.an){ R.an=saved.an; }
      else if(sample){ R.busy="Reading the picture…"; draw(); R.an=await analyse(); runSave({...saved,an:R.an}); }
      else R.an={subject:{x:.3,y:.12,w:.4,h:.76},top:{ease:.6,fill:""},bottom:{ease:.5,fill:""},left:{ease:.5,fill:""},right:{ease:.5,fill:""},scene:""};
      R.plan=finishPlan(makePlan(R.sw,R.sh,R.an,SIZES));
    }catch(e){ log("✕","resize open",{code:e?.code,message:e?.message}); R.err=e?.message&&!/[{<]/.test(e.message)?String(e.message).slice(0,200):"This picture could not be read. Try a JPG or PNG."; }
    R.busy=""; draw(); }
  const replan=()=>{ if(!R.an) return; R.plan=finishPlan(makePlan(R.sw,R.sh,R.an,SIZES)); R.done=false; draw(); };
  const ready=it=>it.kind!=="ext"||!!R.M[it.fam]?.[it.m];
  async function create(fam,redoFrom){ if(R.busy||!R.plan) return; R.err=""; R.note=""; R.stop=false;
    const fams=fam?[fam]:Object.keys(R.plan.fams);
    const needAI=fams.some(f=>R.plan.fams[f].aiSteps.some(Boolean))||sharpTargets().length>0;
    if(needAI&&(!mcp||S.web)){ R.err="Extending the background needs Magnific, inside claude.ai."; draw(); return; }
    R.busy="Working…"; R.step="Starting…"; draw();
    try{ await rlJob(async()=>{ if(needAI&&!S.connected) await connect(true); for(const f of fams) await family(f,fam?redoFrom:null);
        if(R.sharp){ try{ await sharpen(); }catch(e){ if(e?.code==="stopped") throw e; log("✕","resize sharpen",{code:e?.code,message:e?.message}); const why=e?.message&&!/[{<]/.test(e.message)?String(e.message).replace(/\(request_id[^)]*\)/i,"").trim().slice(0,160):""; R.note=/keep their normal version/.test(why)?why:`Sharpening did not finish${why?` (${why})`:""}. Every size is ready in its normal version. Press "Sharpen the large sizes" to try again: what was done is reused.`; } } }); R.done=true; }
    catch(e){ log("✕","resize",{code:e?.code,message:e?.message,result:e?.result}); R.err=e?.code==="stopped"?"Stopped. What was finished is kept.":/not in the manifest|not_granted|not_connected/i.test(String(e?.code||"")+String(e?.message||""))?"Magnific is not connected for this tool yet. Reconnect Magnific from the top of the page, then try again.":(e?.message&&!/[{<]/.test(e.message)?String(e.message).slice(0,220):"The extension did not finish. Press Create again: what was finished is reused, free."); }
    R.busy=""; R.step=""; draw(); }

  /* ---------- files ---------- */
  const ext=()=>R.fmt==="jpg"?"jpg":"png";
  const blobOf=(it,w,h)=>new Promise(r=>{ const c=render(it,w,h); if(!c) return r(null); c.toBlob(r,R.fmt==="jpg"?"image/jpeg":"image/png",.95); });
  const fname=(w,h)=>`BAE_${R.name}_${w}x${h}.${ext()}`;
  const save=async(b,name)=>{ if(!b) return; if(S.web||!downloads){ const a=document.createElement("a"); a.href=URL.createObjectURL(b); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },1500); } else { try{ await downloads.save({filename:name,data:b}); }catch{} } };
  async function zipAll(){ if(R.busy) return; const items=R.plan.items.filter(ready); if(!items.length) return; R.busy="Packing the ZIP…"; draw();
    try{ const files=[], seen=new Set(); let n=0;
      for(const it of items){ status(`Packing ${++n} / ${items.length} · ${it.w} × ${it.h}`); await new Promise(r=>setTimeout(r,0));
        const k=sid(it); if(!seen.has(k)){ seen.add(k); files.push({name:"exact/"+fname(it.w,it.h),blob:await blobOf(it,it.w,it.h)}); }
        const hq=hqSize(it); if(hq){ const hk="hq"+hq.join("x"); if(!seen.has(hk)){ seen.add(hk); files.push({name:`HQ/BAE_${R.name}_${ratioName(it.w,it.h).replace(":","x")}_${hq[0]}x${hq[1]}.${ext()}`,blob:await blobOf(it,hq[0],hq[1])}); } } }
      await save(await makeZip(files.filter(f=>f.blob)),`BAE_${R.name}_all_sizes.zip`);
    }catch(e){ log("✕","resize zip",{message:e?.message}); R.err="The ZIP could not be made. Download the sizes one by one."; }
    R.busy=""; R.step=""; draw(); }

  /* ---------- page ----------
     The page is a WALL OF SCREENS: every size stands on one dark wall at its true shape, so the set is judged at a glance as one campaign.
     Before anything is paid for, each screen already shows where the original will sit and which part will be new (and who makes it).
     A screen opens in a focus view: drag the picture to place it, see what is new, see small LED sizes dot by dot, download. */
  const KIND={same:["Original","the original pixels, only resized"],crop:["Cropped","cut from the original, nothing generated"],ext:["Extended","the original with its background continued around it"]};
  const TINT={page:"rgba(50,150,155,.42)",ai:"rgba(250,100,40,.42)"};
  const dpr=()=>Math.min(2,window.devicePixelRatio||1);
  /* where the original sits inside an extended size, along its long direction (0..1), and who makes each new side */
  function span(it){ if(it.kind!=="ext") return null; const F=R.plan.fams[it.fam], rg=range(it), v=R.pos[sid(it)]??rg?.def??.5, t=rg?rg.lo+(rg.hi-rg.lo)*v:F.share, o=clamp(F.offs[it.m]-t*(it.len-F.src),0,F.masters[it.m]-it.len);
    const a0=(F.offs[it.m]-o)/it.len, a1=(F.offs[it.m]+F.src-o)/it.len; return {a0:clamp(a0,0,1),a1:clamp(a1,0,1),tall:F.axis==="y",A:F.plain.A?"page":"ai",B:F.plain.B?"page":"ai",F,o}; }
  function tint(g,w,h,s){ const band=(f0,f1,who)=>{ if(f1-f0<.004) return; g.fillStyle=TINT[who]; if(s.tall) g.fillRect(0,f0*h,w,(f1-f0)*h); else g.fillRect(f0*w,0,(f1-f0)*w,h); };
    band(0,s.a0,s.A); band(s.a1,1,s.B); g.fillStyle="rgba(255,250,244,.9)"; const t=Math.max(1,Math.round(Math.min(w,h)/260)); for(const f of [s.a0,s.a1]) if(f>.004&&f<.996){ if(s.tall) g.fillRect(0,Math.round(f*h)-t/2,w,t); else g.fillRect(Math.round(f*w)-t/2,0,t,h); } }
  /* a size whose background is not made yet: the original in its place, the rest marked */
  function pending(it,w,h){ const c=mk(w,h), g=c.getContext("2d"), s=span(it); g.fillStyle="#24232B"; g.fillRect(0,0,w,h); if(!s) return c; const F=s.F, b=F.base;
    g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high";
    if(s.tall) g.drawImage(R.bmp,b.x,b.y,b.w,b.h,0,s.a0*h,w,(s.a1-s.a0)*h); else g.drawImage(R.bmp,b.x,b.y,b.w,b.h,s.a0*w,0,(s.a1-s.a0)*w,h);
    tint(g,w,h,s); return c; }
  const picture=(it,w,h)=>ready(it)?render(it,w,h):pending(it,w,h);
  /* a small size shown the way an LED screen shows it: one round dot per pixel */
  function led(it,maxW,maxH){ const k=Math.round(clamp(Math.min(maxW/it.w,maxH/it.h),3,12)), ex=render(it,it.w,it.h); if(!ex) return null; const c=mk(it.w*k,it.h*k), g=c.getContext("2d"); g.imageSmoothingEnabled=false; g.drawImage(ex,0,0,it.w*k,it.h*k);
    const t=mk(k,k), tg=t.getContext("2d"); tg.fillStyle="#fff"; tg.beginPath(); tg.arc(k/2,k/2,k*.43,0,Math.PI*2); tg.fill(); g.globalCompositeOperation="destination-in"; g.fillStyle=g.createPattern(t,"repeat"); g.fillRect(0,0,c.width,c.height);
    const o=mk(c.width,c.height), og=o.getContext("2d"); og.fillStyle="#050507"; og.fillRect(0,0,o.width,o.height); og.drawImage(c,0,0); return o; }
  const tall=it=>it.w/it.h, wallH=it=>tall(it)<.45?430:tall(it)<1?340:tall(it)<1.5?260:210;
  const qcOf=it=>it.kind==="ext"?R.qc[it.fam+it.m]:null;
  const spent=()=>{ const r=runs()[R.file?cacheKey():""]||{}; return (r.tall?.spent||0)+(r.wide?.spent||0)+(r.upSpent||0); };
  const STEPS=["Read","Continue","Extend","Rebuild","Check","Sharpen"];
  const stageOf=t=>/^(Sharpening|Reading the sharpened)/.test(t)?5:/^Checking/.test(t)?4:/^Putting/.test(t)?3:/^Continuing/.test(t)?1:/^(Opening|Reading the picture|Starting)/.test(t)?0:/^Packing/.test(t)?-1:2;
  function screenHTML(it,i){ const ok=ready(it), q=qcOf(it), f=ok?enlarge(it):1, shp=ok&&!!R.U[ukey(it)]&&grow(it)>NEED, st=!ok?"wait":q&&!q.ok?(q.level==="redo"?"bad":"warn"):"good";
    return `<button type="button" class="rz-scr" data-rzopen="${i}" style="--h:${wallH(it)};--r:${(it.w/it.h).toFixed(4)}" aria-label="${it.w} by ${it.h}, ${KIND[it.kind][0]}${ok?"":", not created yet"}${q&&!q.ok?(q.level==="redo"?", has a fault":", worth a look"):""}">
      <span class="rz-glass"><canvas data-rzc="${i}"></canvas></span>
      <span class="rz-cap"><i class="rz-dot ${st}" aria-hidden="true"></i><b data-noi18n>${it.w} × ${it.h}</b></span>
      <span class="rz-sub"><span data-noi18n>${ratioName(it.w,it.h)}</span> · <span>${KIND[it.kind][0]}</span>${shp?` · <span class="rz-shp">Sharpened</span>`:f>1.08?` · <span data-noi18n>×${f.toFixed(1)}</span>`:""}</span></button>`; }
  function draw(){ const pl=R.plan, busy=!!R.busy, sb=R.an?.subject;
    let h=`<div class="rz-top${R.file?"":" empty"}">`;
    if(!R.file) h+=`<label class="rz-hero${busy?" busy":""}" id="rzDrop"><span class="rz-heroin"><b>Drop the approved picture here</b><span>A clean visual with no text and no logo. The larger the picture, the sharper every size.</span><span class="btn primary">Choose a picture</span></span><input type="file" id="rzFile" accept="image/*" ${busy?"disabled":""} aria-label="Picture to resize"></label>`;
    else h+=`<div class="rl-card rz-srcp"><div class="rz-srcimg" id="rzSrc"><img src="${R.thumb}" alt="The picture" draggable="false">${sb?`<div class="rz-box" id="rzBox" style="left:${sb.x*100}%;top:${sb.y*100}%;width:${sb.w*100}%;height:${sb.h*100}%" tabindex="0" role="group" aria-label="The part that always stays whole. Drag to move, drag a corner to resize.">${["nw","ne","sw","se"].map(c=>`<i class="rz-hd ${c}" data-rzhd="${c}"></i>`).join("")}</div>`:""}</div>
        <p class="t12 muted">${Object.values(R.M).some(m=>m?.some?.(Boolean))?"Everything inside the frame stays whole in every size. Moving it now means the sizes are created again.":"Everything inside the frame stays whole in every size. Drag it or its corners if it missed something."}</p>
        <div class="rz-srcrow"><span class="t12 muted" data-noi18n>${esc(R.name)} · ${R.sw} × ${R.sh}</span><label class="btn small rz-change"><span>Change the picture</span><input type="file" id="rzFile" accept="image/*" ${busy?"disabled":""}></label></div></div>`;
    h+=`<div class="rl-card rz-ctl"><div><span class="lbl">Sizes</span><div class="rz-chips">${SIZES.map((s,i)=>`<span class="rz-chip" data-noi18n>${s[0]}×${s[1]}<button type="button" data-rzdel="${i}" aria-label="Remove ${s[0]} by ${s[1]}" ${busy?"disabled":""}>×</button></span>`).join("")}</div>
        <div class="rz-add"><input class="rl-field" id="rzNew" inputmode="numeric" placeholder="1080x1350" aria-label="Add a size, width x height" ${busy?"disabled":""}><button type="button" class="btn small" data-rz-act="add" ${busy?"disabled":""}>Add size</button><button type="button" class="btn small ghost" data-rz-act="reset" ${busy?"disabled":""}>My 10 sizes</button></div></div>`;
    if(pl){ const c=k=>pl.items.filter(i=>i.kind===k).length, todo=Object.entries(pl.fams).reduce((a,[f,F])=>a+F.masters.filter((_,k)=>!R.M[f]?.[k]).length,0), pay=Object.entries(pl.fams).reduce((a,[f,F])=>a+F.masters.filter((_,k)=>!R.M[f]?.[k]&&F.aiSteps[k]).length,0), all=pl.items.every(ready), used=spent(), ST=sharpTargets(true), sN=ST.reduce((a,t)=>a+t.n,0), sOpen=R.sharp?ST.filter(t=>!R.U[t.key]).length:0, sCost=sharpCost(), go=todo||sOpen,
        selfSides=Object.values(pl.fams).flatMap(F=>[F.plain.A&&F.names[0],F.plain.B&&F.names[1]]).filter(Boolean);
      h+=`<ul class="rz-facts"><li><b data-noi18n>${c("same")+c("crop")}</b><span>straight from the original</span></li><li><b data-noi18n>${c("ext")}</b><span>with the background continued</span></li>${selfSides.length?`<li class="page"><b>0</b><span><span>credits for the</span> <span data-noi18n>${selfSides.join(" + ")}</span><span>: the page continues it itself</span></span></li>`:""}</ul>
        ${ST.length?`<label class="rz-sharpen"><input type="checkbox" id="rzSharp" ${R.sharp?"checked":""} ${busy?"disabled":""}><span><b><span>Sharpen the sizes that are larger than the picture</span> <span data-noi18n>(${sN})</span></b><span class="t12 muted">Magnific Precision gives them real pixels, faithful to the picture, nothing invented. Switched off, they are stretched and softer.</span></span></label>`:""}
        <div class="rz-pay">${go?`<div class="rz-cost"><b data-noi18n>${pay*EXT_CREDITS+sCost}</b><span>${sCost?"credits, roughly, sharpening included":pay?"credits to create this set":"credits: this set is free"}</span></div>`:`<div class="rz-cost done"><b data-noi18n>${pl.items.length}</b><span>sizes are ready</span></div>`}
          <div class="rl-btns">${go?`<button type="button" class="btn primary" data-rz-act="create" ${busy?"disabled":""}>${todo?"Create all sizes":"Sharpen the large sizes"}</button>`:""}<button type="button" class="btn${go?"":" primary"}" data-rz-act="zip" ${busy||!pl.items.some(ready)?"disabled":""}>${all?"Download all (ZIP)":"Download the ready ones (ZIP)"}</button>
          <div class="a-seg" role="group" aria-label="File type"><button type="button" data-rzfmt="png" aria-pressed="${R.fmt==="png"}">PNG</button><button type="button" data-rzfmt="jpg" aria-pressed="${R.fmt==="jpg"}">JPG</button></div></div>
          ${used?`<p class="t12 muted"><span>Used on this picture so far:</span> <span data-noi18n>${used}</span> <span>credits</span></p>`:""}</div>`; }
    h+=`</div></div>`;
    if(R.err) h+=`<p class="rl-warn" role="alert">${esc(R.err)}</p>`;
    if(R.note&&!busy) h+=`<p class="rz-note" role="status">${esc(R.note)}</p>`;
    if(busy){ const st=stageOf(R.step||R.busy); h+=`<div class="rl-card rz-busy" role="status"><span class="spin" aria-hidden="true"></span><div class="rz-busyin">${st>=0&&/Working/.test(R.busy)?`<ol class="rz-steps">${STEPS.map((s,i)=>`<li class="${i<st?"done":i===st?"on":""}">${s}</li>`).join("")}</ol>`:`<b>${esc(R.busy)}</b>`}<span class="t12 muted" id="rzStep" data-noi18n>${esc(R.step)}</span></div>${/Working/.test(R.busy)?`<button type="button" class="btn small" data-rz-act="stop">Stop</button>`:""}</div>`; }
    if(pl){ const anyNew=pl.items.some(i=>i.kind==="ext"), redo=Object.keys(pl.fams).map(redoHTML).join("");
      h+=`<section class="rz-wall" aria-label="All sizes"><header class="rz-wallh"><h3>The wall</h3><p>${pl.items.every(ready)?"Every size, at its true shape. Open one to place the picture or download it.":"This is how each size will be framed. Nothing is paid for until you press Create."}</p>
          ${anyNew?`<ul class="rz-legend"><li><i style="background:#8a8894"></i>Original</li>${Object.values(pl.fams).some(F=>F.plain.A||F.plain.B)?`<li><i style="background:${TINT.page}"></i>Continued by the page</li>`:""}${pl.ext?`<li><i style="background:${TINT.ai}"></i>Extended by AI</li>`:""}</ul>`:""}</header>
        <div class="rz-row" id="rzRow">${pl.items.map(screenHTML).join("")}</div></section>
        ${redo?`<details class="rl-card rz-ext"${Object.values(R.qc).some(q=>q&&q.level==="redo")?" open":""}><summary>AI extensions</summary><p class="t12 muted rz-exp">Each new background was looked at automatically. A note is a hint, not an error: if the picture looks right to you, use it. "Make it again" asks for a new try of that extension and the ones built on it, and costs credits.</p>${redo}</details>`:""}
        <p class="t12 muted">The person and everything in the original stay exactly as they are: only the background around them is new. A number such as ×1.4 means that size is larger than the picture has pixels for. A size marked Sharpened was given real pixels by Magnific Precision: there the whole picture, the person included, is the same picture rendered finer, not the original pixels.</p>`; }
    body.innerHTML=h; if(typeof uxT==="function") uxT(body); paint(); if(FO.i!=null) (R.plan?.items[FO.i]?focusDraw():focusClose()); }
  function redoHTML(fam){ const F=R.plan.fams[fam]; return F.masters.map((L,k)=>{ const M=R.M[fam]?.[k], q=R.qc[fam+k]; if(!M||!M.ai) return ""; const n=R.plan.items.filter(i=>i.fam===fam&&i.m===k).length;
      return `<div class="rz-redo"><span class="t12 muted"><span>${fam==="tall"?"Tall":"Wide"} extension</span> <span data-noi18n>${k+1}</span> · <span data-noi18n>${n}</span> <span>sizes use it</span>${q?(q.ok?` · <span class="ok">Checked</span>`:` · <span class="${q.level==="redo"?"bad":"warn"}"><span>${q.level==="redo"?"Clear fault":"Worth a look"}</span>${q.issues.length?`: <span dir="auto" data-noi18n>${q.issues.map(esc).join(" · ")}</span>`:""}</span>`):""}</span>
        <input class="rl-field" data-rznote="${fam+k}" dir="auto" value="${esc(R.notes[fam+k]||"")}" placeholder="What to change (optional), e.g. keep the floor empty" aria-label="What to change in this extension">
        <button type="button" class="btn small" data-rzredo="${fam}:${k}" ${R.busy?"disabled":""}><span>Make it again</span> <span data-noi18n>· ${F.aiSteps.slice(k).filter(Boolean).length*EXT_CREDITS}</span> <span>credits</span></button></div>`; }).join(""); }
  /* wall previews are drawn at the size they are shown; the full size is only made when a file is downloaded */
  function paint(){ if(!R.plan) return; const d=dpr(); body.querySelectorAll("canvas[data-rzc]").forEach(cv=>{ const it=R.plan.items[+cv.dataset.rzc]; if(!it) return; const r=cv.parentElement.getBoundingClientRect(); if(r.width<2) return;
      const w=Math.max(8,Math.round(r.width*d)), h=Math.max(8,Math.round(r.height*d)), c=picture(it,w,h); if(!c) return; cv.width=w; cv.height=h; cv.getContext("2d").drawImage(c,0,0); }); }

  /* ---------- focus view ---------- */
  const FO=document.createElement("div"); FO.className="rz-focus"; FO.hidden=true; FO.setAttribute("role","dialog"); FO.setAttribute("aria-modal","true"); FO.setAttribute("aria-label","One size"); P.appendChild(FO); FO.i=null; FO.show=false; FO.led=false;
  function focusOpen(i){ FO.i=i; FO.show=false; FO.led=false; FO.from=body.querySelector(`[data-rzopen="${i}"]`); FO.hidden=false; focusDraw(); FO.querySelector("[data-fo=close]")?.focus(); }
  function focusClose(){ FO.hidden=true; FO.i=null; FO.innerHTML=""; paint(); (body.querySelector(`[data-rzopen="${FO.last}"]`)||FO.from)?.focus?.(); }
  function focusDraw(){ const i=FO.i, it=R.plan.items[i]; FO.last=i; const ok=ready(it), rg=ok?range(it):null, q=qcOf(it), f=ok?enlarge(it):1, small=Math.max(it.w,it.h)<SMALL, hq=ok?hqSize(it):null, s=span(it), n=R.plan.items.length, M=it.kind==="ext"?R.M[it.fam]?.[it.m]:null;
    const move=rg&&!rg.fixed, horiz=it.kind==="crop"?it.axis==="x":it.fam==="wide";
    FO.innerHTML=`<div class="rz-fbar"><button type="button" class="rz-fx" data-fo="close" aria-label="Close">×</button>
        <div class="rz-ft"><b data-noi18n>${it.w} × ${it.h}</b><span><span data-noi18n>${ratioName(it.w,it.h)}</span> · <span>${KIND[it.kind][1]}</span></span></div>
        <div class="rz-fnav"><button type="button" data-fo="prev" aria-label="Previous size">‹</button><span data-noi18n>${i+1} / ${n}</span><button type="button" data-fo="next" aria-label="Next size">›</button></div></div>
      <div class="rz-fstage" id="rzFS"><canvas id="rzFC" class="${move&&!FO.led?"move "+(horiz?"x":"y"):""}"${move?` tabindex="0" role="slider" aria-label="Place the picture" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round((R.pos[sid(it)]??rg.def)*100)}"`:""}></canvas></div>
      <div class="rz-ftools">
        <div class="rz-fnote">${!ok?`<span>This size is not created yet. The coloured parts show what will be new.</span>`:FO.led?`<span>One dot is one pixel, the way the screen shows it.</span>`:move?`<span>Drag the picture to place it</span> <span class="rz-keys">${horiz?"← →":"↑ ↓"}</span>`:`<span>This size has one framing.</span>`}${f>1.08?` <span class="rz-tag warn"><span>Enlarged</span> <span data-noi18n>×${f.toFixed(1)}</span></span>`:""}${q?(q.ok?` <span class="rz-tag good">Checked</span>`:` <span class="rz-tag ${q.level==="redo"?"bad":"warn"}"><span>${q.level==="redo"?"Clear fault":"Worth a look"}</span>${q.issues.length?`: <span dir="auto" data-noi18n>${q.issues.map(esc).join(" · ")}</span>`:""}</span>`):""}</div>
        <div class="rl-btns">${s&&ok?`<button type="button" class="btn small" data-fo="show" aria-pressed="${FO.show}">Show what is new</button>`:""}${small&&ok?`<button type="button" class="btn small" data-fo="led" aria-pressed="${FO.led}">LED preview</button>`:""}${hq?`<button type="button" class="btn small" data-fo="hq"><span>High quality</span> <span data-noi18n>${hq[0]}×${hq[1]}</span></button>`:""}${ok?`<button type="button" class="btn small primary" data-fo="dl">Download</button>`:""}</div></div>`;
    if(typeof uxT==="function") uxT(FO); focusPaint(); }
  function focusPaint(){ const it=R.plan?.items[FO.i], cv=FO.querySelector("#rzFC"), st=FO.querySelector("#rzFS"); if(!it||!cv||!st) return; const r=st.getBoundingClientRect(), d=dpr(), k=Math.min((r.width-8)/it.w,(r.height-8)/it.h), cw=Math.max(8,Math.round(it.w*k)), ch=Math.max(8,Math.round(it.h*k));
    cv.style.width=cw+"px"; cv.style.height=ch+"px"; let c;
    if(FO.led&&ready(it)) c=led(it,cw*d,ch*d); else { const w=Math.round(cw*d), h=Math.round(ch*d); c=picture(it,w,h); if(c&&FO.show&&ready(it)){ const s=span(it); if(s) tint(c.getContext("2d"),w,h,s); } }
    if(!c) return; cv.width=c.width; cv.height=c.height; cv.getContext("2d").drawImage(c,0,0); cv._len=(it.kind==="crop"?it.axis==="x":it.fam==="wide")?cw:ch; }
  /* how far the picture can travel inside this size, as a share of the size's own length */
  const travel=it=>{ const rg=range(it); if(!rg||rg.fixed) return 0; if(it.kind==="crop") return rg.max/it.win; const F=R.plan.fams[it.fam]; return (rg.hi-rg.lo)*(it.len-F.src)/it.len; };
  const nudge=(it,dv)=>{ const rg=range(it); if(!rg||rg.fixed) return; const k=sid(it); R.pos[k]=clamp((R.pos[k]??rg.def)+dv,0,1); FO.querySelector("#rzFC")?.setAttribute("aria-valuenow",Math.round(R.pos[k]*100)); focusPaint(); };
  let raf=0;
  FO.addEventListener("pointerdown",e=>{ const cv=e.target.closest("#rzFC"); if(!cv||FO.led) return; const it=R.plan.items[FO.i], tr=travel(it); if(!tr||!ready(it)) return; e.preventDefault(); cv.setPointerCapture(e.pointerId); cv.classList.add("drag");
    const horiz=it.kind==="crop"?it.axis==="x":it.fam==="wide", p0=horiz?e.clientX:e.clientY, k=sid(it), v0=R.pos[k]??range(it).def, sign=it.kind==="crop"?-1:1;
    const mv=ev=>{ const dlt=((horiz?ev.clientX:ev.clientY)-p0)/(cv._len*tr); R.pos[k]=clamp(v0+sign*dlt,0,1); if(!raf) raf=requestAnimationFrame(()=>{ raf=0; focusPaint(); }); };
    const up=()=>{ cv.classList.remove("drag"); cv.removeEventListener("pointermove",mv); cv.removeEventListener("pointerup",up); cv.removeEventListener("pointercancel",up); cv.setAttribute("aria-valuenow",Math.round(R.pos[k]*100)); };
    cv.addEventListener("pointermove",mv); cv.addEventListener("pointerup",up); cv.addEventListener("pointercancel",up); });
  FO.addEventListener("click",async e=>{ if(e.target===FO){ focusClose(); return; } const t=e.target.closest("[data-fo]"); if(!t) return; const a=t.dataset.fo, it=R.plan.items[FO.i], n=R.plan.items.length;
    if(a==="close") focusClose(); else if(a==="prev"||a==="next"){ FO.i=(FO.i+(a==="next"?1:n-1))%n; FO.show=false; FO.led=false; focusDraw(); FO.querySelector(`[data-fo="${a}"]`)?.focus(); }
    else if(a==="show"){ FO.show=!FO.show; FO.led=false; focusDraw(); FO.querySelector('[data-fo="show"]')?.focus(); } else if(a==="led"){ FO.led=!FO.led; FO.show=false; focusDraw(); FO.querySelector('[data-fo="led"]')?.focus(); }
    else if(a==="dl"||a==="hq"){ const hq=a==="hq"?hqSize(it):null, [w,h]=hq||[it.w,it.h]; t.disabled=true; await save(await blobOf(it,w,h),fname(w,h)); t.disabled=false; } });
  FO.addEventListener("keydown",e=>{ if(e.key==="Escape"){ e.preventDefault(); focusClose(); return; } const it=R.plan?.items[FO.i]; if(!it) return;
    if(e.target.id==="rzFC"){ const horiz=it.kind==="crop"?it.axis==="x":it.fam==="wide", sign=it.kind==="crop"?-1:1, st=e.shiftKey?.1:.02, m={ArrowLeft:horiz?-1:0,ArrowRight:horiz?1:0,ArrowUp:horiz?0:-1,ArrowDown:horiz?0:1}[e.key]; if(m){ e.preventDefault(); nudge(it,sign*m*st); } return; }
    if(e.target.closest("input,textarea")) return; if(e.key==="ArrowLeft"){ e.preventDefault(); FO.querySelector('[data-fo="prev"]')?.click(); } else if(e.key==="ArrowRight"){ e.preventDefault(); FO.querySelector('[data-fo="next"]')?.click(); }
    if(e.key==="Tab"){ const f=[...FO.querySelectorAll("button:not([disabled]),canvas[tabindex]")]; if(!f.length) return; const a=f[0], z=f[f.length-1]; if(e.shiftKey&&document.activeElement===a){ e.preventDefault(); z.focus(); } else if(!e.shiftKey&&document.activeElement===z){ e.preventDefault(); a.focus(); } } });

  /* ---------- the frame that always stays whole: drag it or its corners ---------- */
  body.addEventListener("pointerdown",e=>{ const box=e.target.closest("#rzBox"); if(!box||R.busy) return; const host=$("rzSrc").getBoundingClientRect(), hd=e.target.dataset?.rzhd||"", s={...R.an.subject}, x0=e.clientX, y0=e.clientY; e.preventDefault(); box.setPointerCapture(e.pointerId); let cur=s;
    const mv=ev=>{ const dx=(ev.clientX-x0)/host.width, dy=(ev.clientY-y0)/host.height; let {x,y,w,h}=s;
      if(!hd){ x=clamp(x+dx,0,1-w); y=clamp(y+dy,0,1-h); } else { if(hd[1]==="w"){ const nx=clamp(x+dx,0,x+w-.08); w+=x-nx; x=nx; } else w=clamp(w+dx,.08,1-x); if(hd[0]==="n"){ const ny=clamp(y+dy,0,y+h-.08); h+=y-ny; y=ny; } else h=clamp(h+dy,.08,1-y); }
      cur={x,y,w,h}; box.style.left=x*100+"%"; box.style.top=y*100+"%"; box.style.width=w*100+"%"; box.style.height=h*100+"%"; };
    const up=()=>{ box.removeEventListener("pointermove",mv); box.removeEventListener("pointerup",up); box.removeEventListener("pointercancel",up); if(Object.keys(cur).some(k=>Math.abs(cur[k]-s[k])>.004)) setBox(cur); };
    box.addEventListener("pointermove",mv); box.addEventListener("pointerup",up); box.addEventListener("pointercancel",up); });
  body.addEventListener("keydown",e=>{ if(e.target.id!=="rzBox"||R.busy) return; const d={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key]; if(!d) return; e.preventDefault(); const s={...R.an.subject}, st=.02;
    if(e.shiftKey){ s.w=clamp(s.w+d[0]*st,.08,1-s.x); s.h=clamp(s.h+d[1]*st,.08,1-s.y); } else { s.x=clamp(s.x+d[0]*st,0,1-s.w); s.y=clamp(s.y+d[1]*st,0,1-s.h); } setBox(s); setTimeout(()=>$("rzBox")?.focus(),0); });
  function setBox(s){ R.an={...R.an,subject:s,byHand:true}; R.M={}; R.U=R.U.src?{src:R.U.src}:{}; R.qc={}; R.pos={}; runSave({...runs()[cacheKey()],an:R.an}); replan(); }

  body.addEventListener("change",e=>{ if(e.target.id==="rzFile"){ const f=e.target.files?.[0]; if(f) load(f); }
    else if(e.target.id==="rzSharp"){ R.sharp=e.target.checked; try{ localStorage.setItem("bae_rz_sharp",R.sharp?"1":"0"); }catch{} if(!R.sharp) R.U={}; R.note=""; draw(); } });
  body.addEventListener("input",e=>{ const n=e.target.dataset?.rznote; if(n!=null) R.notes[n]=e.target.value; });
  body.addEventListener("keydown",e=>{ if(e.target.id==="rzNew"&&e.key==="Enter"){ e.preventDefault(); body.querySelector('[data-rz-act="add"]')?.click(); } });
  body.addEventListener("click",async e=>{ const t=e.target.closest("button"); if(!t) return; const d=t.dataset;
    if(d.rzopen!=null) focusOpen(+d.rzopen);
    else if(d.rzdel!=null){ SIZES.splice(+d.rzdel,1); if(!SIZES.length) SIZES=DEF.map(s=>[...s]); saveSizes(); R.plan?replan():draw(); }
    else if(d.rzAct==="add"){ const m=/(\d{2,5})\s*[x×*, ]\s*(\d{2,5})/i.exec($("rzNew")?.value||""), s=m&&[+m[1],+m[2]]; if(!s||!okSize(s)){ R.err="Write the size as width x height, for example 1080x1350 (16 to 8192 px)."; draw(); return; } R.err=""; if(!SIZES.some(x=>x[0]===s[0]&&x[1]===s[1])) SIZES.push(s); saveSizes(); R.plan?replan():draw(); }
    else if(d.rzAct==="reset"){ SIZES=DEF.map(s=>[...s]); saveSizes(); R.plan?replan():draw(); }
    else if(d.rzAct==="create") create();
    else if(d.rzAct==="stop"){ R.stop=true; status("Stopping after this step…"); }
    else if(d.rzAct==="zip") zipAll();
    else if(d.rzfmt){ R.fmt=d.rzfmt; draw(); }
    else if(d.rzredo){ const [f,k]=d.rzredo.split(":"); create(f,+k); } });
  P.addEventListener("dragover",e=>{ if(e.dataTransfer?.types?.includes("Files")){ e.preventDefault(); $("rzDrop")?.classList.add("over"); } });
  P.addEventListener("dragleave",e=>{ if(!P.contains(e.relatedTarget)) $("rzDrop")?.classList.remove("over"); });
  P.addEventListener("drop",e=>{ const f=[...(e.dataTransfer?.files||[])].find(x=>/^image\//.test(x.type)); if(f){ e.preventDefault(); load(f); } });
  document.addEventListener("paste",e=>{ if(P.hidden||e.target.closest?.("textarea,input,[contenteditable]")) return; const f=[...(e.clipboardData?.files||[])].find(x=>/^image\//.test(x.type)); if(f){ e.preventDefault(); load(f); } });
  let rzT=0; addEventListener("resize",()=>{ if(P.hidden) return; clearTimeout(rzT); rzT=setTimeout(()=>{ paint(); if(FO.i!=null) focusPaint(); },150); });
  const open=()=>{ P.hidden=false; P.scrollTop=0; draw(); };
  $("openResize")?.addEventListener("click",open); $("closeResize")?.addEventListener("click",()=>{ P.hidden=true; $("openResize")?.focus(); });
  window.__rz={makePlan,steps,R};
})();

/* ======================================================================================================
   BAE 3D Booth (phase 1): the studio sends booth jobs to the render Mac and shows what comes back.
   Studio  ->  "BAE 3D Booth" connector (Cloudflare worker: booth/bridge)  ->  Blender add-on on the Mac.
   The Mac pairs once: its add-on shows a 6-digit code, someone approves it here. Jobs run in a background Blender
   on the Mac (Metal GPU); the pictures, previews and the .blend come back through the connector in 512 KB pieces.
   Phase 1 = the plumbing + a test build. Plan / designs / result / film come in the next phases.
   ====================================================================================================== */
(()=>{
  const P=$("booth"); if(!P) return; const body=$("boBody");
  const BSRV="BAE 3D Booth", CHB=524288;
  const DEMO={"name":"Test booth","file":"BAE_test_booth","units":"cm","width":1000,"depth":488,"height":250,"orbit_frames":84,"floors":[{"name":"Booth floor","x":0,"y":0,"w":660,"d":488,"colour":"#D9D4CA"},{"name":"Outdoor seating floor (Area 5)","x":660,"y":0,"w":340,"d":488,"colour":"#C9C2B5"}],"walls":[{"name":"Exterior front","from":[0,0],"to":[660,0],"thick":25,"openings":[{"name":"Door 01","at":144,"width":399,"height":190,"post":{"width":10,"height":185},"radius":30}]},{"name":"Exterior back","from":[660,488],"to":[0,488],"thick":25,"openings":[{"name":"Door 02","at":117,"width":399,"height":190,"post":{"width":10,"height":185},"radius":30}]},{"name":"Exterior left","from":[0,488],"to":[0,0],"thick":10},{"name":"Exterior right","from":[660,0],"to":[660,488],"thick":10,"openings":[{"name":"Door 03","at":163,"width":170,"height":190,"radius":30}]},{"name":"Star advent wall (Area 3)","from":[543,463],"to":[650,342],"thick":4,"colour":"#C8321E","height":250}],"pieces":[{"type":"box","name":"Area 1 units (photobooth, post cards, storage)","x":10,"y":0,"w":120,"d":488,"h":200,"z":0,"colour":"#D62D20"},{"type":"table","name":"Bar table 1 (60 cm)","x":164,"y":347,"r":30,"h":110,"colour":"#2B2B2B"},{"type":"table","name":"Bar table 2 (60 cm)","x":164,"y":226,"r":30,"h":110,"colour":"#2B2B2B"},{"type":"cylinder","name":"Activities table (180 cm)","x":406,"y":218,"r":90,"h":75,"z":0,"colour":"#E8451E"},{"type":"ring","name":"Stool","x":406,"y":218,"ring":116,"r":15,"h":45,"count":10,"start":18,"colour":"#B9301C"},{"type":"cylinder","name":"Pendant light 1","x":406,"y":218,"r":16,"h":22,"z":178,"colour":"#B9301C"},{"type":"cylinder","name":"Pendant cord 1","x":406,"y":218,"r":0.6,"h":50,"z":200,"colour":"#222222"},{"type":"cylinder","name":"Pendant light 2","x":451,"y":218,"r":16,"h":22,"z":178,"colour":"#B9301C"},{"type":"cylinder","name":"Pendant cord 2","x":451,"y":218,"r":0.6,"h":50,"z":200,"colour":"#222222"},{"type":"cylinder","name":"Pendant light 3","x":361,"y":218,"r":16,"h":22,"z":178,"colour":"#B9301C"},{"type":"cylinder","name":"Pendant cord 3","x":361,"y":218,"r":0.6,"h":50,"z":200,"colour":"#222222"},{"type":"cylinder","name":"Pendant light 4","x":406,"y":263,"r":16,"h":22,"z":178,"colour":"#B9301C"},{"type":"cylinder","name":"Pendant cord 4","x":406,"y":263,"r":0.6,"h":50,"z":200,"colour":"#222222"},{"type":"cylinder","name":"Pendant light 5","x":406,"y":173,"r":16,"h":22,"z":178,"colour":"#B9301C"},{"type":"cylinder","name":"Pendant cord 5","x":406,"y":173,"r":0.6,"h":50,"z":200,"colour":"#222222"},{"type":"box","name":"Glass wall back","x":660,"y":486,"w":340,"d":2,"h":250,"z":0,"colour":"#DCEBF0","alpha":0.25},{"type":"box","name":"Glass wall right","x":998,"y":0,"w":2,"d":488,"h":250,"z":0,"colour":"#DCEBF0","alpha":0.25},{"type":"box","name":"Glass wall front","x":660,"y":0,"w":340,"d":2,"h":250,"z":0,"colour":"#DCEBF0","alpha":0.25},{"type":"box","name":"Glass post front right","x":994,"y":0,"w":6,"d":6,"h":250,"z":0,"colour":"#D62D20"},{"type":"box","name":"Glass post back right","x":994,"y":482,"w":6,"d":6,"h":250,"z":0,"colour":"#D62D20"},{"type":"box","name":"Glass post front 773","x":773,"y":0,"w":6,"d":6,"h":250,"z":0,"colour":"#D62D20"},{"type":"box","name":"Glass post back 773","x":773,"y":482,"w":6,"d":6,"h":250,"z":0,"colour":"#D62D20"},{"type":"box","name":"Glass post front 886","x":886,"y":0,"w":6,"d":6,"h":250,"z":0,"colour":"#D62D20"},{"type":"box","name":"Glass post back 886","x":886,"y":482,"w":6,"d":6,"h":250,"z":0,"colour":"#D62D20"},{"type":"box","name":"Glass post right 160","x":994,"y":160,"w":6,"d":6,"h":250,"z":0,"colour":"#D62D20"},{"type":"box","name":"Glass post right 322","x":994,"y":322,"w":6,"d":6,"h":250,"z":0,"colour":"#D62D20"},{"type":"box","name":"Glass top beam back","x":660,"y":482,"w":340,"d":6,"h":6,"z":244,"colour":"#D62D20"},{"type":"box","name":"Glass top beam front","x":660,"y":0,"w":340,"d":6,"h":6,"z":244,"colour":"#D62D20"},{"type":"box","name":"Glass top beam right","x":994,"y":0,"w":6,"d":488,"h":6,"z":244,"colour":"#D62D20"},{"type":"box","name":"Table 1 base","x":735,"y":85,"w":50,"d":50,"h":61,"z":0,"colour":"#D62D20"},{"type":"box","name":"Table 1 top (70 x 70)","x":725,"y":75,"w":70,"d":70,"h":4,"z":61,"colour":"#F15A22"},{"type":"box","name":"Chair 1","x":676,"y":88,"w":44,"d":44,"h":45,"z":0,"colour":"#B9301C"},{"type":"box","name":"Chair 2","x":800,"y":88,"w":44,"d":44,"h":45,"z":0,"colour":"#B9301C"},{"type":"box","name":"Chair 3","x":738,"y":150,"w":44,"d":44,"h":45,"z":0,"colour":"#B9301C"},{"type":"box","name":"Table 2 base","x":855,"y":219,"w":50,"d":50,"h":61,"z":0,"colour":"#D62D20"},{"type":"box","name":"Table 2 top (70 x 70)","x":845,"y":209,"w":70,"d":70,"h":4,"z":61,"colour":"#F15A22"},{"type":"box","name":"Chair 4","x":796,"y":222,"w":44,"d":44,"h":45,"z":0,"colour":"#B9301C"},{"type":"box","name":"Chair 5","x":920,"y":222,"w":44,"d":44,"h":45,"z":0,"colour":"#B9301C"},{"type":"box","name":"Chair 6","x":858,"y":284,"w":44,"d":44,"h":45,"z":0,"colour":"#B9301C"},{"type":"box","name":"Table 3 base","x":735,"y":353,"w":50,"d":50,"h":61,"z":0,"colour":"#D62D20"},{"type":"box","name":"Table 3 top (70 x 70)","x":725,"y":343,"w":70,"d":70,"h":4,"z":61,"colour":"#F15A22"},{"type":"box","name":"Chair 7","x":676,"y":356,"w":44,"d":44,"h":45,"z":0,"colour":"#B9301C"},{"type":"box","name":"Chair 8","x":800,"y":356,"w":44,"d":44,"h":45,"z":0,"colour":"#B9301C"},{"type":"box","name":"Chair 9","x":738,"y":418,"w":44,"d":44,"h":45,"z":0,"colour":"#B9301C"},{"type":"cylinder","name":"Floor lamp 1 pole","x":690,"y":450,"r":2,"h":150,"z":0,"colour":"#B8935A","metal":1,"rough":0.3},{"type":"cylinder","name":"Floor lamp 1 shade","x":690,"y":450,"r":18,"h":26,"z":150,"colour":"#FFD9B0","emit":3},{"type":"cylinder","name":"Floor lamp 2 pole","x":968,"y":40,"r":2,"h":150,"z":0,"colour":"#B8935A","metal":1,"rough":0.3},{"type":"cylinder","name":"Floor lamp 2 shade","x":968,"y":40,"r":18,"h":26,"z":150,"colour":"#FFD9B0","emit":3},{"type":"box","name":"Gift box 02 (back end of the star)","x":481,"y":401,"w":60,"d":45,"h":90,"z":0,"colour":"#F15A22"},{"type":"box","name":"Gift box 01 (back end, front)","x":442,"y":384,"w":50,"d":40,"h":45,"z":0,"colour":"#D62D20"},{"type":"box","name":"Gift box 03 (back end, small)","x":497,"y":366,"w":40,"d":30,"h":35,"z":0,"colour":"#E8451E"},{"type":"box","name":"Gift box 02 (door end of the star)","x":579,"y":294,"w":55,"d":45,"h":80,"z":0,"colour":"#D62D20"},{"type":"box","name":"Gift box 04 (door end, front)","x":535,"y":290,"w":50,"d":35,"h":40,"z":0,"colour":"#F15A22"},{"type":"box","name":"Gift box 01 (door end, top)","x":589,"y":298,"w":35,"d":35,"h":30,"z":80,"colour":"#F15A22"},{"type":"box","name":"TV 65 inch (on the TV wall)","x":645,"y":25,"w":4,"d":138,"h":89.6,"z":121.5,"colour":"#151515","rough":0.2}],"orbit_fps":12,"cameras":[{"file":"08_star_corner","name":"Star corner","eye":[300,205,135],"look":[590,400,100],"lens":22},{"file":"09_buzzer_corner","name":"Buzzer corner","eye":[455,185,140],"look":[640,60,122],"lens":20}]};
  const B={st:null,err:"",errCode:"",jobs:[],job:null,busy:"",imgs:{},timer:0,open:false};
  const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
  const ago=t=>{ if(!t) return ""; const s=Math.max(0,(Date.now()-t)/1000); return s<60?"just now":s<3600?Math.round(s/60)+" min ago":s<86400?Math.round(s/3600)+" h ago":new Date(t).toLocaleDateString(); };
  const bcall=async(tool,input)=>{ if(!mcp) throw {code:"capability_disabled"}; log("→","booth "+tool,tool==="booth_upload"?{...input,data:"…"}:input);
    try{ const r=await mcp.callTool(BSRV,tool,input||{},{cache:false}); const v=r?.payload&&typeof r.payload==="object"?r.payload:(()=>{ try{ return JSON.parse((r?.content||[]).map(c=>c.text||"").join("")); }catch{ return {}; } })(); return v; }
    catch(e){ log("✕","booth "+tool,{code:e?.code,message:e?.message}); throw e; } };
  const setupCode=c=>/server_not_connected|not_in_manifest|selection_required|needs_reauth|not_granted|capability_disabled|server_not_found/.test(String(c||""));
  /* claude.ai asks the viewer to allow a connector only while a call started by a click waits: these mean "not allowed yet", fixed by a click */
  const askCode=c=>/approval_required|consent_required|upstream_error/.test(String(c||""));

  async function refresh(){
    try{ B.st=await bcall("booth_status"); B.err=""; B.errCode=""; window.__boWork?.ready();
      const j=await bcall("booth_jobs",{limit:8}); B.jobs=j.jobs||[];
      if(B.job){ const k=await bcall("booth_job",{job_id:B.job.id}); B.job=k; if(k.status==="done") await previews(k); }
    }catch(e){ B.errCode=e?.code||"error"; B.err=e?.message||String(e?.code||e); }
    draw(); schedule();
  }
  function schedule(){ clearTimeout(B.timer); if(!B.open||P.hidden||B.ask) return;
    const live=(B.st?.devices||[]).some(d=>d.status==="pending")||B.jobs.some(j=>j.status==="queued"||j.status==="running");
    if(setupCode(B.errCode)||askCode(B.errCode)) return; B.timer=setTimeout(refresh,live?4000:20000); }

  async function fetchFile(o){ let off=0, parts=[];
    while(off!=null){ const p=await bcall("booth_download",{file_id:o.file_id,offset:off}); parts.push(b64Blob(p.data,o.mime)); off=p.next; }
    return new Blob(parts,{type:o.mime}); }
  async function previews(k){ for(const o of k.outputs||[]){ if(!/_preview\.jpg$/.test(o.path)||B.imgs[o.file_id]) continue;
      try{ B.imgs[o.file_id]=URL.createObjectURL(await fetchFile(o)); }catch{} } }
  const saveB=async(b,name)=>{ if(S.web||!downloads){ const a=document.createElement("a"); a.href=URL.createObjectURL(b); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },1500); return; }
    try{ await downloads.save({filename:name,data:b}); }catch(e){ if(e?.code!=="declined") throw e; } };
  async function download(o,btn){ const was=btn.textContent; btn.disabled=true; btn.textContent="Downloading…";
    try{ let b=await fetchFile(o), name=o.path;
      if(/\.blend$/.test(name)){ if(!window.JSZip) throw new Error("zip library didn't load"); const z=new JSZip(); z.file(name,b); b=await z.generateAsync({type:"blob"}); name=name.replace(/\.blend$/,"_blend.zip"); }
      await saveB(b,name); btn.textContent="Saved"; }
    catch(e){ btn.textContent="Couldn't download"; log("✕","booth download",{code:e?.code,message:e?.message}); }
    setTimeout(()=>{ btn.disabled=false; btn.textContent=was; },2500); }

  async function test(){ B.busy="Sending the test booth…"; draw();
    try{ const r=await bcall("booth_submit",{title:"Test booth",kind:"build",spec:DEMO,options:{views:["01_front_left","05_inside"],width:1920,height:1080,samples:64,blend:true}});
      B.job={id:r.job_id,status:"queued",pct:0,msg:"Waiting for a render Mac",outputs:[]}; }
    catch(e){ B.err=e?.message||String(e?.code); B.errCode=e?.code||""; }
    B.busy=""; refresh(); }
  async function devAct(id,action,btn){ btn.disabled=true; try{ await bcall("booth_device",{device_id:id,action}); }catch(e){ B.err=e?.message||String(e?.code); } refresh(); }
  async function cancel(id){ try{ await bcall("booth_cancel",{job_id:id}); }catch{} refresh(); }

  function setupHTML(){
    const why=askCode(B.errCode)?"claude.ai couldn't open the BAE 3D Booth connector: it is not added to your claude.ai yet (the window said “No matching connector found”), or the window was closed before Allow.":B.errCode==="needs_reauth"?"The BAE 3D Booth connector needs to be reconnected (claude.ai → Settings → Connectors).":B.errCode==="not_in_manifest"?"The BAE 3D Booth connector is turned off for this page. Turn it on from this page's permissions menu, then press Check again.":"The BAE 3D Booth connector is not added to your claude.ai yet.";
    return `<section class="rl-card bo-card"><b>Set up (once)</b><p class="muted">${esc(why)}</p>
      <ol class="bo-steps"><li><b>The bridge</b> (done once, by the studio owner): deploy it from the <i>booth/bridge</i> folder (Deploy to Cloudflare). Its home page shows the connector address and the Blender add-on.</li>
      <li><b>The connector</b> (every person in the team): claude.ai → Settings → Connectors → Add custom connector. Name <b>BAE 3D Booth</b>, address from the bridge page, or ask the studio owner for it.</li>
      <li><b>The render Mac</b> (once): download the add-on from the bridge page; in Blender: Edit → Preferences → Add-ons → Install from Disk. It shows a 6-digit code.</li>
      <li><b>Approve the Mac</b> here, with that code.</li></ol>
      <div class="btns"><button class="btn primary" type="button" data-bo="check">Check again</button></div></section>`; }

  function macsHTML(){ const ds=B.st?.devices||[];
    const row=d=>{ const pill=d.status==="pending"?`<span class="bo-pill wait">Waiting for approval</span>`:d.online?(d.job?`<span class="bo-pill on">Working</span>`:`<span class="bo-pill on">Online</span>`):`<span class="bo-pill off">Offline · ${esc(ago(Date.now()-d.last_seen_s*1000))}</span>`;
      return `<div class="bo-mac"><div class="bo-mac-t"><b>${esc(d.name)}</b>${pill}</div>
        ${d.status==="pending"?`<p class="muted">Approve only if Blender on your Mac shows this code:</p><div class="bo-code">${esc((d.code||"").replace(/(\d{3})(\d{3})/,"$1 $2"))}</div><div class="btns"><button class="btn primary small" type="button" data-bo="approve" data-id="${esc(d.id)}">Approve this Mac</button><button class="btn small" type="button" data-bo="remove" data-id="${esc(d.id)}">Not mine</button></div>`
        :`<div class="btns"><button class="btn small" type="button" data-bo="remove" data-id="${esc(d.id)}">Remove</button></div>`}</div>`; };
    return `<section class="rl-card bo-card"><b>Render Mac</b>${ds.length?ds.map(row).join(""):`<p class="muted">No Mac yet. On the render Mac, install the Blender add-on from the bridge page. It appears here with a code to approve.</p>`}
      ${B.st?.addon_url?`<p class="muted bo-small">Add-on: <a href="${esc(B.st.addon_url)}" target="_blank" rel="noopener">${esc(B.st.addon_url)}</a></p>`:""}</section>`; }

  function jobHTML(k){ const outs=k.outputs||[];
    const stills=outs.filter(o=>/\.png$/.test(o.path)), blend=outs.find(o=>/\.blend$/.test(o.path));
    const prev=v=>outs.find(o=>o.path===v.replace(/\.png$/,"_preview.jpg"));
    const live=k.status==="queued"||k.status==="running";
    return `<div class="bo-job"><div class="bo-mac-t"><b>${esc(k.title)}</b><span class="bo-pill ${k.status==="done"?"on":k.status==="failed"?"bad":live?"wait":"off"}">${esc(k.status)}</span></div>
      ${live?`<div class="bo-bar"><i style="width:${Math.max(3,k.pct||0)}%"></i></div><p class="muted">${esc(k.msg||"")}${k.status==="queued"&&!(B.st?.devices||[]).some(d=>d.online&&d.status==="approved")?" · the Mac is offline: it starts when Blender is open on it":""}</p><div class="btns"><button class="btn small" type="button" data-bo="cancel" data-id="${esc(k.id)}">Cancel</button></div>`:""}
      ${k.status==="failed"?`<p class="bo-err">${esc((k.error||"").slice(0,400))}</p>`:""}
      ${k.status==="done"?`<div class="bo-shots">${stills.map(s=>{ const pv=prev(s.path); return `<figure>${pv&&B.imgs[pv.file_id]?`<img src="${B.imgs[pv.file_id]}" alt="${esc(s.label)}">`:`<div class="bo-ph">Loading…</div>`}<figcaption>${esc(s.label)}</figcaption><button class="btn small" type="button" data-bo="dl" data-f="${esc(s.file_id)}">Download PNG</button></figure>`; }).join("")}</div>
        <div class="btns">${blend?`<button class="btn small" type="button" data-bo="dl" data-f="${esc(blend.file_id)}">Download the Blender file</button>`:""}<span class="muted bo-small">${k.result?.device?esc("Rendered on "+k.result.device.split(" (")[0]+" in "+k.result.seconds+" s"+(k.device?" · "+k.device:"")):""}</span></div>`:""}</div>`; }

  function draw(){
    if(!mcp){ body.innerHTML=`<section class="rl-card bo-card"><b>Open BAE Studio in claude.ai</b><p class="muted">The 3D Booth works through a claude.ai connector.</p></section>`; return; }
    if(setupCode(B.errCode)){ body.innerHTML=setupHTML(); return; }
    if(askCode(B.errCode)&&B.tried){ body.innerHTML=setupHTML(); return; }
    if(B.ask||askCode(B.errCode)){ body.innerHTML=`<section class="rl-card bo-card"><b>Connect the 3D Booth</b>
      <p class="muted">${B.ask?"BAE Studio uses the BAE 3D Booth connector to reach the render Mac. Press Connect; claude.ai asks you once to allow it.":"claude.ai didn't get your answer just now. Press Connect and choose Allow."}</p>
      <div class="btns"><button class="btn primary" type="button" data-bo="connect">Connect</button></div>
      <p class="muted bo-small">Not added the connector yet? Connect tells you the steps.</p></section>`; return; }
    if(!B.st){ body.innerHTML=`<section class="rl-card bo-card"><p class="muted">${B.err?esc(B.err):"Connecting to the render Mac…"}</p>${B.err?`<div class="btns"><button class="btn small" type="button" data-bo="check">Try again</button></div>`:""}</section>`; return; }
    const ready=(B.st.devices||[]).some(d=>d.status==="approved");
    const others=B.jobs.filter(j=>!B.job||j.id!==B.job.id);
    body.innerHTML=`<div class="bo-grid"><div class="bo-col">${macsHTML()}
      <section class="rl-card bo-card"><b>Test the Mac</b><p class="muted">Builds a test booth (the Christmas booth's walls and furniture, no designs) and renders two views at 1920×1080, plus the Blender file.</p>
        <div class="btns"><button class="btn primary" type="button" data-bo="test" ${!ready||B.busy?"disabled":""}>${B.busy?esc(B.busy):"Build a test booth"}</button></div>${!ready?`<p class="muted bo-small">Approve a Mac first.</p>`:""}</section>
      <details class="rl-card bo-card"><summary><b>Team</b></summary><p class="muted">Everyone who uses the 3D Booth adds the connector once: claude.ai → Settings → Connectors → Add custom connector, name <b>BAE 3D Booth</b>, this address. Share it only inside the team.</p>
        <code class="bo-addr" data-noi18n>${esc(B.st.connector_url||"")}</code><div class="btns"><button class="btn small" type="button" data-bo="copy">Copy the address</button></div></details></div>
      <div class="bo-col">${B.job?`<section class="rl-card bo-card"><b>This job</b>${jobHTML(B.job)}</section>`:""}
      <section class="rl-card bo-card"><b>Recent jobs</b>${others.length?others.map(j=>`<button class="bo-row" type="button" data-bo="open" data-id="${esc(j.id)}"><span>${esc(j.title)}</span><span class="muted">${esc(j.status)} · ${esc(ago(j.created))}</span></button>`).join(""):`<p class="muted">Nothing yet.</p>`}</section></div></div>
      ${B.err?`<p class="bo-err">${esc(B.err)}</p>`:""}`;
  }

  body.addEventListener("click",async e=>{ const b=e.target.closest("[data-bo]"); if(!b) return; const a=b.dataset.bo;
    if(a==="check"||a==="connect"){ B.tried=true; B.ask=false; B.err=""; B.errCode=""; B.st=null; draw(); refresh(); }
    else if(a==="test") test();
    else if(a==="approve"||a==="remove") devAct(b.dataset.id,a,b);
    else if(a==="cancel") cancel(b.dataset.id);
    else if(a==="open"){ B.job={id:b.dataset.id,status:"",outputs:[]}; refresh(); }
    else if(a==="dl"){ const o=(B.job?.outputs||[]).find(x=>x.file_id===b.dataset.f); if(o) download(o,b); }
    else if(a==="copy"){ try{ await navigator.clipboard.writeText(B.st?.connector_url||""); b.textContent="Copied"; }catch{ const r=document.createRange(); r.selectNodeContents(body.querySelector(".bo-addr")); getSelection().removeAllRanges(); getSelection().addRange(r); b.textContent="Selected: press Copy"; } setTimeout(()=>b.textContent="Copy the address",2000); }
  });
  const open=async()=>{ P.hidden=false; P.scrollTop=0; B.open=true;
    /* call the connector on its own only once this viewer has allowed it; otherwise wait for the Connect click */
    const st=B.st?"granted":await window.claude?.use?.("permissions").then(p=>p?.state("mcp:"+BSRV)).catch(()=>"unavailable");
    B.ask=st!=="granted"&&!B.st; draw(); if(!B.ask) refresh(); };
  $("openBooth")?.addEventListener("click",open);
  $("closeBooth")?.addEventListener("click",()=>{ P.hidden=true; B.open=false; clearTimeout(B.timer); $("openBooth")?.focus(); });
  document.addEventListener("visibilitychange",()=>{ if(!document.hidden&&B.open&&!P.hidden) refresh(); });
  window.__bo={B,refresh,bcall,fetchFile,saveB,draw};
})();

/* ======================================================================================================
   BAE 3D Booth (phase 2): booth projects. Talk first, then Plan, Designs, Build.
   1 Talk     a booth designer (Claude) discusses the idea: reads the floor plan / designs / photo of the space if there are any,
              asks, proposes 2-3 layout ideas with a sketch. NOTHING is built until Samer presses "Make the plan".
   2 Plan     Claude writes the booth spec (cm, front-left corner, the same schema as booth/bridge/addon/bae_booth/engine/build_booth.py);
              the page draws it from above with every piece numbered; changes by talking ("move the TV to the right").
   3 Designs  one card per printed surface: upload the design, find it in the PDF (Claude marks the box, the page crops it) or keep the colour.
   4 Build    the job goes to the render Mac (phase 1 bridge): all views, the .blend, the contractor's placement sheet drawn here.
   Projects: data/users/<uid>/booths/p/<id> (+ localStorage copy); files: the assets store (editors) or this session only.
   ====================================================================================================== */
(()=>{
  const P=$("booth"), W=$("boWork"); if(!P||!W) return;
  const BO=()=>window.__bo||{};
  const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
  const rid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  const LKEY="bae_booth_projects", CHB=524288, PDFJS="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
  const VIEWS=["01_front_left","02_front","03_back_right","04_left_side","05_inside","06_top"];
  const T={list:[],cur:null,busy:"",err:"",ready:false,pages:{},mem:new Map(),job:null,imgs:{},timer:0,loaded:false,
    lv:{pid:null,dev:null,rev:null,img:"",msg:"",busy:"",err:"",sent:{},timer:0,news:[],seen:0}};
  const STEPS=[["talk","Talk"],["plan","Plan"],["designs","Designs"],["build","Build"]];

  /* ---------- the schema Claude writes (kept in step with build_booth.py) ---------- */
  const SPEC_DOC=`BOOTH SPEC (JSON). Units: centimetres. Origin: the FRONT-LEFT corner of the site, x to the right, y towards the back, z up.
{
 "name": "...", "file": "short_file_name", "units":"cm", "width": <site width x>, "depth": <site depth y>, "height": <default wall height>,
 "floors":[{"name","x","y","w","d","colour":"#hex"}],
 "walls":[{"name","from":[x,y],"to":[x,y],"thick":<cm>,"height"?:<cm>,"colour"?:"#hex","art"?:"tex/<slot>.png","art_inside"?:"tex/<slot>.png",
           "openings"?:[{"name","at":<cm from 'from' along the wall>,"width","height","radius"?:<rounded top corners>,"post"?:{"width","height"}}]}],
 "pieces":[
   {"type":"box","name","x","y","w","d","h","z"?:0,"colour":"#hex","emit"?:0,"alpha"?:1,"rough"?:0.5},       (x,y = the box's front-left corner)
   {"type":"cylinder","name","x","y","r","h","z"?:0,"colour"},                                                (x,y = centre)
   {"type":"table","name","x","y","r","h","colour"},                                                          (round top on a brass stem)
   {"type":"ring","name","x","y","ring":<radius of the circle of seats>,"r","h","count","start"?:<deg>,"colour"},  (stools around a centre)
   {"type":"art","name","from":[x,y],"to":[x,y],"z","h","art":"tex/<slot>.png","lift"?:0.6,"emit"?:0}       (a flat print or panel; its LEFT edge at 'from')
 ],
 "cameras"?:[{"file":"07_name","name","eye":[x,y,z],"look":[x,y,z],"lens":24}],
 "notes":["every conflict or assumption, one line each"]
}
WALL RULE: a wall runs from 'from' to 'to'; its OUTSIDE (where its "art" is seen) is on the RIGHT of that direction, its thickness goes to the LEFT (inward).
So a booth's front wall runs left to right ([0,0]→[W,0]) and is seen from the front; the back wall runs [W,D]→[0,D]; the left wall [0,D]→[0,0]; the right wall [W,0]→[W,D].
"art_inside" is a print on the other face. Art images are stretched over the whole wall (length × height), openings stay open.
Doors: an opening "at" cm from the wall's 'from' end. Glass walls: thin boxes with "alpha":0.25 and colour "#DCEBF0".
Sizes are real: a bar table h 110 r 30, stool h 45 r 15, chair 44×44×45, sofa 180×80×80, counter 120×60×105, TV 65" = 144×4×81 hung at z 95-120.
Colours: Bank al Etihad palette only: #FA6428 orange, #C13A23 dark orange, #FB9A75 medium, #FDCBB4 soft, #FFFAF4 light, #19181E ink, #ECE8DF stone, #CCC3B4 dark stone. Floors light stone or warm grey.
Never draw or invent a logo or words: any logo or text appears only inside a design image the user gives.`;
  const BRAND=`Bank al Etihad (BAE), Jordan. Brand: "Deep Clarity", warm and precise; orange family colours; the logo is never redrawn (only official files). Booths are for real events: malls, outdoor plazas, exhibitions.`;

  /* ---------- storage ---------- */
  const col=async()=>{ try{ await rlStoreInit(); return RLS.db&&RLS.uid?RLS.db.collection(`data/users/${RLS.uid}/booths/p`):null; }catch{ return null; } };
  const lsGet=()=>{ try{ return JSON.parse(localStorage.getItem(LKEY)||"[]"); }catch{ return []; } };
  const lsPut=list=>{ try{ localStorage.setItem(LKEY,JSON.stringify(list.slice(0,30))); }catch{} };
  function slim(p){ const q=JSON.parse(JSON.stringify(p)); q.chat=(q.chat||[]).slice(-40); let s=JSON.stringify(q);
    while(s.length>230000&&q.chat.length>4){ q.chat.splice(0,4); s=JSON.stringify(q); } return q; }
  async function save(p){ p.updated=Date.now(); const q=slim(p);
    const list=lsGet().filter(x=>x.id!==p.id); list.unshift(q); lsPut(list);
    const c=await col(); if(c){ try{ await c.doc(p.id).set(q); p.synced=true; }catch(e){ p.synced=false; log("✕","booth save",{code:e?.code,message:e?.message}); } } }
  async function loadList(){ let cloud=[]; const c=await col();
    if(c){ try{ const sn=await c.get(); cloud=sn.docs.map(d=>JSON.parse(JSON.stringify(d.data()))).filter(x=>x?.id); }catch{} }
    const m=new Map(); for(const x of [...lsGet(),...cloud]){ const o=m.get(x.id); if(!o||(x.updated||0)>(o.updated||0)) m.set(x.id,x); }
    T.list=[...m.values()].sort((a,b)=>(b.updated||0)-(a.updated||0)); T.loaded=true; }
  async function remove(p){ T.list=T.list.filter(x=>x.id!==p.id); lsPut(lsGet().filter(x=>x.id!==p.id)); const c=await col(); if(c) c.doc(p.id).delete().catch(()=>{}); }

  /* ---------- files: kept in the assets store when this viewer may, otherwise for this session ---------- */
  async function keep(file){
    try{ const A=await window.claude?.use?.("assets"); if(A){ const r=await A.upload(file); return {id:r.id,url:r.url,name:file.name,type:file.type,size:file.size}; } }catch(e){ log("✕","booth asset",{code:e?.code,message:e?.message}); }
    const k="m_"+rid(); T.mem.set(k,file); return {mem:k,name:file.name,type:file.type,size:file.size}; }
  async function blobOf(f){ if(f.mem){ const b=T.mem.get(f.mem); if(!b) throw new Error(`${f.name} was only kept for the session that added it. Add it again.`); return b; }
    const r=await fetch(f.url||("/_blob/"+f.id)); if(!r.ok) throw new Error("couldn't read "+f.name); return r.blob(); }

  /* ---------- PDF pages (pdf.js on the main thread) ---------- */
  let pdfjsP=null;
  const script=src=>new Promise((ok,no)=>{ const s=document.createElement("script"); s.src=src; s.onload=ok; s.onerror=()=>no(new Error("the PDF reader didn't load")); document.head.appendChild(s); });
  const pdfjs=()=>pdfjsP||(pdfjsP=script(PDFJS+"pdf.worker.min.js").then(()=>script(PDFJS+"pdf.min.js")).then(()=>{ window.pdfjsLib.GlobalWorkerOptions.workerSrc=PDFJS+"pdf.worker.min.js"; return window.pdfjsLib; }).catch(e=>{ pdfjsP=null; throw e; }));
  async function pagesOf(f){ /* -> [{canvas (about 2400 px), small Blob for Claude}] */
    const key=f.id||f.mem; if(T.pages[key]) return T.pages[key];
    const blob=await blobOf(f); const out=[];
    if(/pdf/i.test(f.type)||/\.pdf$/i.test(f.name)){
      const lib=await pdfjs(); const doc=await lib.getDocument({data:new Uint8Array(await blob.arrayBuffer())}).promise;
      for(let i=1;i<=Math.min(doc.numPages,16);i++){ const pg=await doc.getPage(i); const v0=pg.getViewport({scale:1}); const sc=Math.min(4,2400/Math.max(v0.width,v0.height));
        const v=pg.getViewport({scale:sc}); const c=document.createElement("canvas"); c.width=Math.round(v.width); c.height=Math.round(v.height);
        const g=c.getContext("2d"); g.fillStyle="#fff"; g.fillRect(0,0,c.width,c.height); await pg.render({canvasContext:g,viewport:v}).promise; out.push({canvas:c}); }
    } else { const bmp=await createImageBitmap(blob); const sc=Math.min(1,2400/Math.max(bmp.width,bmp.height)); const c=document.createElement("canvas"); c.width=Math.round(bmp.width*sc); c.height=Math.round(bmp.height*sc); c.getContext("2d").drawImage(bmp,0,0,c.width,c.height); out.push({canvas:c}); }
    for(const o of out){ const s=Math.min(1,1568/Math.max(o.canvas.width,o.canvas.height)); const c=document.createElement("canvas"); c.width=Math.round(o.canvas.width*s); c.height=Math.round(o.canvas.height*s); c.getContext("2d").drawImage(o.canvas,0,0,c.width,c.height); o.small=await new Promise(r=>c.toBlob(r,"image/jpeg",.88)); o.thumb=c.toDataURL("image/jpeg",.6); }
    return T.pages[key]=out; }
  async function claudeImages(p){ /* the pictures Claude looks at, numbered, with a list saying what each one is */
    const max=Math.max(1,Math.min(16,(sampleImages?.maxCount||sampleImages?.max||10)));
    const imgs=[], list=[];
    for(const f of p.files||[]){ let pages; try{ pages=await pagesOf(f); }catch(e){ list.push(`${f.name}: could not be read (${e.message})`); continue; }
      pages.forEach((o,i)=>{ if(imgs.length<max){ imgs.push(o.small); list.push(`image ${imgs.length} = ${f.name}${pages.length>1?` page ${i+1}`:""} (${f.role||"file"})`); } }); }
    return {imgs,list}; }

  /* ---------- geometry, drawing from above ---------- */
  const num=v=>Number.isFinite(+v)?+v:0;
  function wallParts(w,spec){ const [x0,y0]=w.from, [x1,y1]=w.to, L=Math.hypot(x1-x0,y1-y0)||1, dx=(x1-x0)/L, dy=(y1-y0)/L, T=num(w.thick)||10;
    const cuts=[...(w.openings||[])].sort((a,b)=>a.at-b.at), segs=[]; let cur=0;
    for(const o of cuts){ if(o.at>cur) segs.push([cur,o.at]); cur=o.at+o.width; } if(cur<L) segs.push([cur,L]);
    const pt=(s,t)=>[x0+dx*s-dy*t, y0+dy*s+dx*t];
    return {L,segs,cuts,pt,T}; }
  function pieceList(spec){ /* every placed thing with its centre and size, for the numbers and the sheet */
    const out=[];
    for(const p of spec.pieces||[]){ const t=p.type;
      if(t==="box") out.push({name:p.name,cx:num(p.x)+num(p.w)/2,cy:num(p.y)+num(p.d)/2,size:`${p.w} × ${p.d} × ${p.h} cm`,p});
      else if(t==="cylinder"||t==="table") out.push({name:p.name,cx:num(p.x),cy:num(p.y),size:`Ø ${2*num(p.r)} cm, h ${p.h}`,p});
      else if(t==="ring") out.push({name:`${p.name} × ${p.count}`,cx:num(p.x),cy:num(p.y),size:`ring Ø ${2*num(p.ring)} cm`,p});
      else if(t==="art"){ const [a,b]=[p.from||[0,0],p.to||[0,0]]; out.push({name:p.name,cx:(a[0]+b[0])/2,cy:(a[1]+b[1])/2,size:`${Math.round(Math.hypot(b[0]-a[0],b[1]-a[1]))} × ${p.h} cm`,p}); } }
    for(const w of spec.walls||[]) for(const o of w.openings||[]){ const g=wallParts(w,spec); const c=g.pt(o.at+o.width/2,0); out.push({name:`${o.name||"Opening"} (${w.name})`,cx:c[0],cy:c[1],size:`opening ${o.width} × ${o.height} cm`,door:1}); }
    /* small or overhead things (cords, lamps, posts, beams) stay in the list but get no number on the drawing, and two numbers never sit on one spot */
    const minor=x=>{ const q=x.p; if(!q) return false; const big=Math.max(num(q.w),num(q.d),2*num(q.r)); return num(q.z)>=150||big<=10||(q.type==="box"&&Math.min(num(q.w),num(q.d))<=8); };
    const shown=[]; return out.map((x,i)=>{ const y={...x,n:i+1}; y.mark=!minor(x)&&!shown.some(s=>Math.hypot(s.cx-x.cx,s.cy-x.cy)<25); if(y.mark) shown.push(y); return y; }); }
  function topSVG(spec,o={}){
    const Wd=num(spec.width)||600, D=num(spec.depth)||400, pad=Math.max(Wd,D)*.06, Y=y=>D-y, list=o.numbers===false?[]:pieceList(spec);
    const fs=Math.max(Wd,D)/55; let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${Wd+2*pad} ${D+2*pad}" class="bo-top" role="img" aria-label="${esc(spec.name||"Booth")} from above">`;
    s+=`<rect x="0" y="0" width="${Wd}" height="${D}" fill="#F4F1EB" stroke="#CCC3B4" stroke-dasharray="${fs/2} ${fs/2}" stroke-width="${fs/8}"/>`;
    for(const f of spec.floors||[]) s+=`<rect x="${num(f.x)}" y="${Y(num(f.y)+num(f.d))}" width="${num(f.w)}" height="${num(f.d)}" fill="${esc(f.colour||"#E9E4DA")}" opacity=".7"/>`;
    for(const z of o.zones||[]) s+=`<rect x="${num(z.x)}" y="${Y(num(z.y)+num(z.d))}" width="${num(z.w)}" height="${num(z.d)}" rx="${fs/2}" fill="#FA6428" fill-opacity=".14" stroke="#C13A23" stroke-width="${fs/10}"/><text x="${num(z.x)+num(z.w)/2}" y="${Y(num(z.y)+num(z.d)/2)}" font-size="${fs*1.1}" text-anchor="middle" dominant-baseline="middle" fill="#19181E">${esc(z.name)}</text>`;
    for(const p of spec.pieces||[]){ const c=esc(p.colour||"#FB9A75"), op=p.alpha&&p.alpha<1?.35:.95;
      if(p.type==="box") s+=`<rect x="${num(p.x)}" y="${Y(num(p.y)+num(p.d))}" width="${num(p.w)}" height="${num(p.d)}" fill="${c}" fill-opacity="${op}" stroke="#19181E" stroke-opacity=".25" stroke-width="${fs/14}"/>`;
      else if(p.type==="cylinder"||p.type==="table") s+=`<circle cx="${num(p.x)}" cy="${Y(num(p.y))}" r="${num(p.r)}" fill="${c}" fill-opacity="${op}" stroke="#19181E" stroke-opacity=".25" stroke-width="${fs/14}"/>`;
      else if(p.type==="ring") for(let k=0;k<num(p.count);k++){ const a=2*Math.PI*k/num(p.count)+num(p.start)*Math.PI/180; s+=`<circle cx="${num(p.x)+num(p.ring)*Math.cos(a)}" cy="${Y(num(p.y)+num(p.ring)*Math.sin(a))}" r="${num(p.r)}" fill="${c}"/>`; }
      else if(p.type==="art"){ const [a,b]=[p.from||[0,0],p.to||[0,0]]; s+=`<line x1="${a[0]}" y1="${Y(a[1])}" x2="${b[0]}" y2="${Y(b[1])}" stroke="#C13A23" stroke-width="${fs/2.5}" stroke-linecap="round"/>`; } }
    for(const w of spec.walls||[]){ const g=wallParts(w,spec); const col=w.art?"#C13A23":esc(w.colour||"#FA6428");
      for(const [a,b] of g.segs){ const q=[g.pt(a,0),g.pt(b,0),g.pt(b,g.T),g.pt(a,g.T)]; s+=`<polygon points="${q.map(([x,y])=>`${x},${Y(y)}`).join(" ")}" fill="${col}"/>`; }
      for(const c of g.cuts){ const a=g.pt(c.at,g.T/2), b=g.pt(c.at+c.width,g.T/2); s+=`<line x1="${a[0]}" y1="${Y(a[1])}" x2="${b[0]}" y2="${Y(b[1])}" stroke="#19181E" stroke-opacity=".45" stroke-width="${fs/10}" stroke-dasharray="${fs/3} ${fs/3}"/>`; } }
    for(const x of list.filter(q=>q.mark)){ const r=fs*.95; s+=`<circle cx="${x.cx}" cy="${Y(x.cy)}" r="${r}" fill="#19181E"/><text x="${x.cx}" y="${Y(x.cy)}" font-size="${fs*1.05}" text-anchor="middle" dominant-baseline="central" fill="#fff">${x.n}</text>`; }
    s+=`<text x="${Wd/2}" y="${-pad*.35}" font-size="${fs*1.2}" text-anchor="middle" fill="#55535c">BACK · ${Wd} cm</text><text x="${Wd/2}" y="${D+pad*.75}" font-size="${fs*1.2}" text-anchor="middle" fill="#55535c">FRONT</text><text x="${-pad*.45}" y="${D/2}" font-size="${fs*1.2}" text-anchor="middle" fill="#55535c" transform="rotate(-90 ${-pad*.45} ${D/2})">${D} cm</text>`;
    return s+"</svg>"; }
  function slotsOf(spec){ const out=[], seen=new Set();
    const add=(path,label,w,h)=>{ if(!path||seen.has(path)) return; seen.add(path); out.push({path,label,w:Math.round(w),h:Math.round(h)}); };
    for(const w of spec.walls||[]){ const L=Math.hypot(w.to[0]-w.from[0],w.to[1]-w.from[1]), H=num(w.height)||num(spec.height)||250; add(w.art,`${w.name} (outside)`,L,H); add(w.art_inside,`${w.name} (inside)`,L,H); }
    for(const p of spec.pieces||[]) if(p.type==="art"){ const [a,b]=[p.from||[0,0],p.to||[0,0]]; add(p.art,p.name,Math.hypot(b[0]-a[0],b[1]-a[1]),num(p.h)); }
    return out; }
  /* The render Mac's engine reads the spec literally: a piece without a number it needs stops the whole build.
     fixSpec repairs what Claude wrote (numbers as text, art panels without a position, unknown types) and leaves out,
     with a note, anything that cannot be built. forBuild then removes the designs that were not given. */
  const isPt=(a,n=2)=>Array.isArray(a)&&a.length>=n&&a.slice(0,n).every(v=>v!==null&&v!==""&&Number.isFinite(+v));
  const pt=(a,n=2)=>a.slice(0,n).map(v=>+v);
  const hex=(c,d)=>/^#[0-9a-f]{6}$/i.test(String(c||""))?c:d;
  function fixSpec(s){ const left=[]; const pos=v=>num(v)>0;
    s.units="cm"; s.width=num(s.width); s.depth=num(s.depth); s.height=num(s.height)||250;
    s.floors=(Array.isArray(s.floors)?s.floors:[]).filter(f=>f&&pos(f.w)&&pos(f.d)).map((f,i)=>({...f,name:String(f.name||`Floor ${i+1}`),x:num(f.x),y:num(f.y),w:num(f.w),d:num(f.d),colour:hex(f.colour,"#D9D4CA")}));
    s.walls=(Array.isArray(s.walls)?s.walls:[]).filter(w=>{ const ok=w&&isPt(w.from)&&isPt(w.to)&&Math.hypot(w.to[0]-w.from[0],w.to[1]-w.from[1])>1; if(!ok&&w) left.push(w.name||"a wall"); return ok; }).map((w,i)=>{
      const o={...w,name:String(w.name||`Wall ${i+1}`),from:pt(w.from),to:pt(w.to),thick:num(w.thick)||10};
      if(w.height!=null) o.height=num(w.height)||s.height; else delete o.height;
      if(w.colour) o.colour=hex(w.colour,"#FA6428"); else delete o.colour;
      o.openings=(Array.isArray(w.openings)?w.openings:[]).filter(q=>q&&pos(q.width)&&pos(q.height)).map(q=>{ const r={...q,at:num(q.at),width:num(q.width),height:num(q.height)};
        if(q.radius!=null) r.radius=num(q.radius); if(q.post&&!(pos(q.post.width)&&pos(q.post.height))) delete r.post; return r; });
      for(const k of ["art","art_inside"]) if(typeof o[k]!=="string"||!o[k]) delete o[k];
      return o; });
    const need={box:["w","d","h"],cylinder:["r","h"],table:["r","h"],ring:["count","ring","r","h"]};
    s.pieces=(Array.isArray(s.pieces)?s.pieces:[]).map((p,i)=>{ if(!p||typeof p!=="object") return null;
      const q={...p,name:String(p.name||`Piece ${i+1}`)}; let t=String(q.type||"").toLowerCase();
      if(t==="art"||t==="panel"||t==="print"||t==="sign"){ t="art";
        if(!(isPt(q.from)&&isPt(q.to))&&isPt([q.x,q.y])&&pos(q.w)){ q.from=[+q.x,+q.y]; q.to=[+q.x+ +q.w,+q.y]; }
        if(!(isPt(q.from)&&isPt(q.to))||!pos(q.h)){ left.push(q.name); return null; }
        q.from=pt(q.from); q.to=pt(q.to); q.x=q.from[0]; q.y=q.from[1]; q.h=num(q.h); }
      else { if(!need[t]) t=pos(q.w)&&pos(q.d)&&pos(q.h)?"box":pos(q.r)&&pos(q.h)?"cylinder":"";
        if(!t||!isPt([q.x,q.y])||!need[t].every(k=>pos(q[k]))){ left.push(q.name); return null; }
        q.x=+q.x; q.y=+q.y; for(const k of need[t]) q[k]=num(q[k]); if(t==="ring") q.count=Math.max(1,Math.min(40,Math.round(q.count))); }
      q.type=t; q.z=num(q.z); q.colour=hex(q.colour,"#F15A22");
      for(const k of ["emit","alpha","rough","metal","lift","start","stem"]) if(q[k]!=null) q[k]=num(q[k]);
      if(q.alpha!=null&&!(q.alpha>0&&q.alpha<=1)) delete q.alpha;
      return q; }).filter(Boolean);
    s.cameras=(Array.isArray(s.cameras)?s.cameras:[]).filter(c=>c&&c.file&&isPt(c.eye,3)&&isPt(c.look,3)).map(c=>({...c,file:String(c.file).replace(/[^\w-]/g,"_"),name:String(c.name||c.file),eye:pt(c.eye,3),look:pt(c.look,3),lens:num(c.lens)||28}));
    s.notes=Array.isArray(s.notes)?s.notes.map(String):[];
    if(left.length) s.notes.push("Left out because a size or position was missing: "+[...new Set(left)].join(", ")+". Ask me to add them again.");
    return s; }
  function validSpec(s){ if(!s||typeof s!=="object") return "no spec";
    if(!(num(s.width)>0&&num(s.depth)>0)) return "width and depth are missing";
    fixSpec(s); if(!s.walls.length&&!s.pieces.length) return "nothing to build"; return ""; }
  /* what the Mac gets: only the designs that were really given; a printed panel kept as "plain colour" becomes a plain panel */
  function forBuild(p,files){ const s=fixSpec(JSON.parse(JSON.stringify(p.spec)));
    for(const w of s.walls){ for(const k of ["art","art_inside"]) if(w[k]&&!files[w[k]]) delete w[k]; w.colour=w.colour||"#FA6428"; }
    s.pieces=s.pieces.map(q=>{ if(q.type!=="art"||files[q.art]) return q;
      const [a,b]=[q.from,q.to], dx=b[0]-a[0], dy=b[1]-a[1], T=2;
      if(Math.abs(dy)<0.5) return {type:"box",name:q.name,x:Math.min(a[0],b[0]),y:a[1]-(dx>0?T:0),z:q.z,w:Math.abs(dx),d:T,h:q.h,colour:q.colour,rough:0.6};
      if(Math.abs(dx)<0.5) return {type:"box",name:q.name,x:a[0]-(dy<0?T:0),y:Math.min(a[1],b[1]),z:q.z,w:T,d:Math.abs(dy),h:q.h,colour:q.colour,rough:0.6};
      return {...q,art:"",plain:q.colour}; }).filter(q=>q.type!=="art"||q.art||q.plain);
    return s; }

  /* ---------- talking to the booth designer ---------- */
  const history=p=>(p.chat||[]).slice(-24).map(m=>`${m.role==="me"?"DESIGNER (user)":"YOU"}: ${m.text}${m.ideas?.length?`\n  [you proposed ideas: ${m.ideas.map(i=>i.title).join(" / ")}]`:""}`).join("\n");
  async function talk(p,text){
    const {imgs,list}=await claudeImages(p);
    const prompt=`You are the senior booth and event-space designer of the in-house creative studio of ${BRAND}
You are talking with a designer from the team. This is the DISCUSSION before anything is built: understand, ask, propose, agree. You never build here.
Speak in the user's language and dialect (Jordanian Arabic when they write Arabic), short and warm, like a creative director in a meeting.

WHAT THE USER STARTED WITH: ${p.mode==="plan"?"a floor plan (and maybe the designs of the walls)":"only an empty space, no plan and no design yet"}.
FILES ATTACHED (pictures in this order): ${list.length?list.join("; "):"none"}.
WHAT WE AGREED SO FAR: ${p.summary||"(nothing yet)"}
THE TALK SO FAR:
${history(p)||"(this is the start)"}
THE USER NOW SAYS: ${text}

HOW TO ANSWER
- If there is a plan: say in one or two lines what you read (overall size, areas, doors, main pieces) and list any measurement that does not add up. Ask only what the plan does not tell you.
- If there is only a space: find out, over the talk, the size (width × depth, height if limited), where it is (mall, outdoor, exhibition hall), the occasion, the activities and pieces they want, who visits, and anything that must be there. Ask at most TWO questions per message, the most important first.
- When you know enough, propose 2 or 3 DIFFERENT layout ideas (or improvements of their plan): each with a title, a one-line concept, why it works for the visitors and the bank, and its zones as rectangles in cm from the site's FRONT-LEFT corner (x right, y back) inside the site's width and depth, so the page can sketch it. Do not propose ideas again if the user is already developing one: refine it instead.
- Be honest about problems (a TV that does not fit, a door too narrow, a queue with no room).
- "ready": true ONLY when the user has clearly chosen or approved a direction and the size is known; otherwise false. Never decide for them.
- "summary": in English, everything agreed so far that the plan must follow (size, entrances, zones, pieces with sizes, materials, colours, the chosen idea). Rewrite it whole each time, max 1200 characters.
Return JSON: {"say": "...", "ideas": [{"title","concept","why","zones":[{"name","x","y","w","d"}]}] or [], "ready": false, "summary": "...", "title": "a short name for this booth in the user's language (2-5 words, e.g. «بوث الكريسماس»), or null if unknown yet", "site": {"width": cm, "depth": cm, "height": cm} or null}`;
    return rlAsk(prompt,{images:imgs,modelTier:"complex"}); }
  async function makePlan(p,extra){
    const {imgs,list}=await claudeImages(p);
    const prompt=`You are the booth builder of the in-house creative studio of ${BRAND}
Write the exact booth SPEC that a Blender script builds, from what was agreed with the designer. Measure carefully: every piece goes exactly where the plan says; the contractor builds from these numbers.
${SPEC_DOC}

FILES (pictures in this order): ${list.length?list.join("; "):"none"}. Read the plan's dimensions from the drawings when there is a plan; read each area's elevation for heights and pieces.
WHAT WAS AGREED: ${p.summary||"(see the talk)"}
CHOSEN IDEA: ${p.idea?JSON.stringify(p.idea):"(see the talk)"}
THE TALK:
${history(p)}
${extra?`EXTRA INSTRUCTION: ${extra}`:""}

RULES
- Every wall that carries a printed design gets "art":"tex/<short_slot_name>.png" (one image per wall face). Free-standing printed panels, signs, backlit graphics are "art" pieces with their own slot. Plain walls just get a colour.
- Put every agreed piece (furniture, screens, counters, lights, plants as simple boxes or cylinders) at its real size and place.
- Add 1 or 2 "cameras" that show the most important corner from inside at eye level (z about 160).
- "notes": every assumption you made and every conflict in the plan, one short line each, in the user's language.
Return JSON: {"spec": {...}, "say": "one or two lines to the designer about what you built and what to check"}`;
    return rlAsk(prompt,{images:imgs,modelTier:"complex"}); }
  async function editPlan(p,text){
    const prompt=`You keep the booth SPEC of the in-house creative studio of ${BRAND} up to date. The designer asks for a change.
${SPEC_DOC}
CURRENT SPEC: ${JSON.stringify(p.spec)}
THE DESIGNER SAYS: ${text}
Change ONLY what was asked (and what it moves with it), keep everything else exactly, keep the same slot names. If the request is unclear or impossible, do not change the spec and ask.
Return JSON: {"spec": {...full spec...} or null when nothing changed, "say": "short answer in the designer's language"}`;
    return rlAsk(prompt,{modelTier:"complex"}); }
  async function findInPdf(p,slot){
    const {imgs,list}=await claudeImages(p);
    if(!imgs.length) throw new Error("there is no plan or design file in this booth");
    const r=await rlAsk(`Find, in the attached pictures, the 2D design (front view / elevation artwork) that should be printed on this surface of a booth:
SURFACE: ${slot.label} — ${slot.w} cm wide × ${slot.h} cm high. ${p.summary?`Context: ${p.summary.slice(0,600)}`:""}
PICTURES: ${list.join("; ")}
Give the box around the ARTWORK ONLY (inside its dimension lines, labels and arrows; no page title), as fractions 0..1 of that picture (x,y from the top-left). If you cannot find it, say so.
Return JSON: {"image": <number of the picture, 1-based> or null, "box": {"x","y","w","h"} or null, "say": "one short line in the designer's language"}`,{images:imgs,modelTier:"complex"});
    if(!r?.image||!r?.box) throw new Error(r?.say||"not found in the files");
    let k=0; for(const f of p.files||[]){ const pages=await pagesOf(f); for(const o of pages){ k++; if(k===+r.image){ const c=o.canvas, b=r.box;
      const x=Math.max(0,b.x*c.width), y=Math.max(0,b.y*c.height), w=Math.min(c.width-x,b.w*c.width), h=Math.min(c.height-y,b.h*c.height);
      const out=document.createElement("canvas"); out.width=Math.round(w); out.height=Math.round(h); out.getContext("2d").drawImage(c,x,y,w,h,0,0,out.width,out.height);
      const blob=await new Promise(rr=>out.toBlob(rr,"image/png")); return {blob,say:r.say}; } } }
    throw new Error("that picture is not there any more"); }

  /* ---------- sending the build to the Mac ---------- */
  async function upload(blob,name){ const bcall=BO().bcall; let id=null;
    for(let off=0;off<blob.size;off+=CHB){ const part=blob.slice(off,off+CHB);
      const data=await new Promise((ok,no)=>{ const fr=new FileReader(); fr.onload=()=>ok(String(fr.result).split(",")[1]||""); fr.onerror=no; fr.readAsDataURL(part); });
      const a={offset:off,data}; if(id) a.upload_id=id; else Object.assign(a,{name,mime:blob.type||"image/png",bytes:blob.size});
      const r=await bcall("booth_upload",a); id=r.upload_id; }
    return id; }
  async function build(p){ const bcall=BO().bcall; if(!bcall) throw new Error("the 3D Booth connector isn't ready");
    T.busy="Sending the designs…"; draw(); const files={};
    for(const s of slotsOf(p.spec)){ const d=p.slots?.[s.path]; if(!d?.file) continue; T.busy=`Sending ${s.label}…`; draw(); files[s.path]=await upload(await blobOf(d.file),s.path.split("/").pop()); }
    const spec=forBuild(p,files), views=[...VIEWS,...spec.cameras.map(c=>c.file)];
    T.busy="Queuing the build…"; draw();
    const r=await bcall("booth_submit",{title:p.name||"Booth",kind:"build",spec,files,options:{views,width:1920,height:1080,samples:128,blend:true}});
    p.jobs=[r.job_id,...(p.jobs||[])].slice(0,20); p.step="build"; await save(p); T.job={id:r.job_id,status:"queued",pct:0,msg:"Waiting for the render Mac",outputs:[]}; }
  async function poll(){ clearTimeout(T.timer); const p=T.cur; if(!p||P.hidden||!p.jobs?.length||p.step!=="build") return;
    try{ const k=await BO().bcall("booth_job",{job_id:p.jobs[0]}); T.job=k;
      if(k.status==="done") for(const o of k.outputs||[]) if(/_preview\.jpg$/.test(o.path)&&!T.imgs[o.file_id]){ try{ T.imgs[o.file_id]=URL.createObjectURL(await BO().fetchFile(o)); }catch{} } }
    catch(e){ T.err=e?.message||String(e?.code||e); }
    draw(); if(T.job&&(T.job.status==="queued"||T.job.status==="running")) T.timer=setTimeout(poll,4000); }

  /* ---------- the contractor's placement sheet (drawn here, from the spec) ---------- */
  async function sheetPNG(p){ const spec=p.spec, list=pieceList(spec), Wd=1800, top=topSVG(spec);
    const img=await new Promise((ok,no)=>{ const im=new Image(); im.onload=()=>ok(im); im.onerror=no; im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(top); });
    const mapW=1150, mapH=Math.round(mapW*img.height/img.width), rowH=30, H=Math.max(mapH+160,140+list.length*rowH+(spec.notes?.length||0)*26+60);
    const c=document.createElement("canvas"); c.width=Wd; c.height=H; const g=c.getContext("2d");
    g.fillStyle="#FFFAF4"; g.fillRect(0,0,Wd,H); g.fillStyle="#19181E"; g.font="34px sans-serif"; g.fillText(`${spec.name||p.name||"Booth"} — placement sheet`,40,64);
    g.font="18px sans-serif"; g.fillStyle="#55535c"; g.fillText(`${spec.width} × ${spec.depth} cm · positions are the CENTRE of each piece, in cm from the LEFT edge and from the FRONT edge`,40,98);
    g.drawImage(img,30,130,mapW,mapH);
    let y=150; const x0=mapW+60; g.font="17px sans-serif";
    for(const it of list){ g.fillStyle="#19181E"; g.beginPath(); g.arc(x0+12,y-6,12,0,7); g.fill(); g.fillStyle="#fff"; g.textAlign="center"; g.fillText(String(it.n),x0+12,y); g.textAlign="left";
      g.fillStyle="#19181E"; g.fillText(String(it.name).slice(0,38),x0+34,y); g.fillStyle="#7a7782"; g.fillText(`${Math.round(it.cx)} from left · ${Math.round(it.cy)} from front · ${it.size}`,x0+34,y+16); y+=rowH+8; }
    if(spec.notes?.length){ y+=10; g.fillStyle="#C13A23"; g.fillText("Notes",x0,y); y+=24; g.fillStyle="#19181E"; for(const n of spec.notes){ g.fillText(String(n).slice(0,70),x0,y); y+=24; } }
    return new Promise(r=>c.toBlob(r,"image/png")); }

  /* ---------- drawing the page ---------- */
  const stepIdx=s=>STEPS.findIndex(x=>x[0]===s);
  function chatHTML(p){ return (p.chat||[]).map((m,i)=>`<div class="bow-m ${m.role==="me"?"me":"ai"}"><div class="bow-b" dir="auto">${esc(m.text).replace(/\n/g,"<br>")}${m.files?.length?`<div class="bow-f">📎 ${m.files.map(esc).join(", ")}</div>`:""}</div>
      ${m.ideas?.length?`<div class="bow-ideas">${m.ideas.map((d,j)=>`<div class="bow-idea${p.idea?.title===d.title?" on":""}"><div class="bow-sk">${topSVG({width:p.site?.width||600,depth:p.site?.depth||400,floors:[],walls:[],pieces:[]},{zones:d.zones,numbers:false})}</div><b dir="auto">${esc(d.title)}</b><p dir="auto">${esc(d.concept)}</p>${d.why?`<p class="muted bo-small" dir="auto">${esc(d.why)}</p>`:""}<button class="btn small" type="button" data-w="pick" data-i="${i}" data-j="${j}">${p.idea?.title===d.title?"Chosen":"Develop this idea"}</button></div>`).join("")}</div>`:""}</div>`).join(""); }
  function stepper(p){ const k=stepIdx(p.step); return `<ol class="bow-steps">${STEPS.map(([s,l],i)=>`<li class="${i<k?"done":i===k?"on":""}"><button type="button" data-w="go" data-s="${s}" ${i>k&&!(i===1&&p.spec)&&!(i>1&&p.spec)?"disabled":""}>${i+1} · ${l}</button></li>`).join("")}</ol>`; }
  function talkHTML(p){ const empty=!(p.chat||[]).length;
    return `<section class="rl-card bo-card"><div class="bow-chat" id="bowChat">${empty?`<p class="muted" dir="auto">${p.mode==="plan"?"Attach the floor plan (PDF or pictures) and the wall designs if you have them, and tell the designer about the booth. Nothing is built until you agree on the idea.":"Tell the designer about the space: its size, where it is, the occasion and what should happen in it. A photo of the empty space helps. Nothing is built until you agree on the idea."}</p>`:chatHTML(p)}${T.busy?`<div class="bow-m ai"><div class="bow-b"><span class="rl-typing">${esc(T.busy)}</span></div></div>`:""}</div>
      ${p.files?.length?`<div class="bow-files">${p.files.map((f,i)=>`<span class="bow-file">${esc(f.name)}<button type="button" aria-label="Remove ${esc(f.name)}" data-w="unfile" data-i="${i}">×</button></span>`).join("")}</div>`:""}
      <form class="bow-in" data-w="send"><label class="btn small bow-att">Attach<input type="file" id="bowFile" accept="application/pdf,image/*" multiple hidden></label><textarea id="bowText" rows="2" dir="auto" placeholder="${p.mode==="plan"?"Tell the designer about this booth…":"The space, the occasion, what should happen in it…"}"></textarea><button class="btn primary" type="submit" ${T.busy?"disabled":""}>Send</button></form>
      ${p.ready?`<div class="bow-ready"><p dir="auto"><b>Ready for the plan.</b> ${esc(p.summary||"").slice(0,300)}</p><button class="btn primary" type="button" data-w="plan" ${T.busy?"disabled":""}>Make the plan</button></div>`:""}</section>`; }
  function planHTML(p){ const s=p.spec, list=pieceList(s);
    return `<section class="rl-card bo-card"><div class="bow-planhead"><b>${esc(s.name||p.name)}</b><span class="muted">${s.width} × ${s.depth} cm · height ${s.height} cm</span></div>
      <div class="bow-map">${topSVG(s)}</div>
      ${s.notes?.length?`<div class="bow-notes"><b>To check</b><ul>${s.notes.map(n=>`<li dir="auto">${esc(n)}</li>`).join("")}</ul></div>`:""}
      <details class="bow-list"><summary>Every piece and its place (${list.length})</summary><ol>${list.map(x=>`<li><b dir="auto">${esc(x.name)}</b> <span class="muted">${Math.round(x.cx)} cm from left · ${Math.round(x.cy)} cm from front · ${esc(x.size)}</span></li>`).join("")}</ol></details>
      <div class="bow-chat small" id="bowChat">${(p.planChat||[]).map(m=>`<div class="bow-m ${m.role==="me"?"me":"ai"}"><div class="bow-b" dir="auto">${esc(m.text)}</div></div>`).join("")}${T.busy?`<div class="bow-m ai"><div class="bow-b"><span class="rl-typing">${esc(T.busy)}</span></div></div>`:""}</div>
      <form class="bow-in" data-w="edit"><textarea id="bowText" rows="2" dir="auto" placeholder="Change something: “move the TV to the right corner”, “the door is 400 wide”…"></textarea><button class="btn primary" type="submit" ${T.busy?"disabled":""}>Change</button></form>
      <div class="btns"><button class="btn" type="button" data-w="go" data-s="talk">Back to the talk</button><button class="btn" type="button" data-w="replan" ${T.busy?"disabled":""}>Make the plan again</button><button class="btn primary" type="button" data-w="go" data-s="designs">The plan is right → Designs</button></div></section>`; }
  function designsHTML(p){ const slots=slotsOf(p.spec), hasFiles=(p.files||[]).length>0;
    return `<section class="rl-card bo-card"><p class="muted">One design per printed surface, at its real size. Logos and words only come from your files; nothing is redrawn.</p>
      ${slots.length?`<div class="bow-slots">${slots.map(s=>{ const d=p.slots?.[s.path]; const src=d?.file?(d.file.url||(d.file.mem&&T.mem.get(d.file.mem)?URL.createObjectURL(T.mem.get(d.file.mem)):"")):"";
        return `<div class="bow-slot"><div class="bow-prev" style="aspect-ratio:${Math.max(.2,Math.min(6,s.w/(s.h||1)))}">${src?`<img src="${esc(src)}" alt="">`:`<span>${d?.colour?"Plain colour":"No design yet"}</span>`}</div>
          <b dir="auto">${esc(s.label)}</b><span class="muted bo-small">${s.w} × ${s.h} cm${d?.say?` · ${esc(d.say)}`:""}</span>
          <div class="btns"><label class="btn small">Upload<input type="file" accept="image/*" hidden data-w="slotfile" data-p="${esc(s.path)}"></label>${hasFiles?`<button class="btn small" type="button" data-w="find" data-p="${esc(s.path)}" ${T.busy?"disabled":""}>Find it in my files</button>`:""}<button class="btn small" type="button" data-w="plain" data-p="${esc(s.path)}">Plain colour</button></div></div>`; }).join("")}</div>`
      :`<p class="muted">This plan has no printed surfaces: the walls keep their colours.</p>`}
      <div class="btns"><button class="btn" type="button" data-w="go" data-s="plan">Back to the plan</button><button class="btn primary" type="button" data-w="go" data-s="build">Designs are ready → Build</button></div></section>`; }
  function buildHTML(p){ const k=T.job, st=BO().B?.st, macs=(st?.devices||[]).filter(d=>d.status==="approved"), mac=macs.find(d=>d.online)||macs[0], live=k&&(k.status==="queued"||k.status==="running");
    const outs=k?.outputs||[], stills=outs.filter(o=>/\.png$/.test(o.path)), blend=outs.find(o=>/\.blend$/.test(o.path));
    return `<section class="rl-card bo-card"><p class="muted">${mac?`Render Mac: <b>${esc(mac.name)}</b> · ${mac.online?"online":"offline: the build waits and starts when Blender is open on it"}`:"No render Mac approved yet (see Render Mac below)."}</p>
      <div class="btns"><button class="btn primary" type="button" data-w="build" ${T.busy||live?"disabled":""}>${T.busy?esc(T.busy):p.jobs?.length?"Build again":"Build the booth"}</button><button class="btn" type="button" data-w="sheet">Placement sheet (PNG)</button><button class="btn" type="button" data-w="go" data-s="plan">Change the plan</button></div>
      ${k?`<div class="bo-job"><div class="bo-mac-t"><b>${esc(k.title||p.name)}</b><span class="bo-pill ${k.status==="done"?"on":k.status==="failed"?"bad":live?"wait":"off"}">${esc(k.status)}</span></div>
        ${live?`<div class="bo-bar"><i style="width:${Math.max(3,k.pct||0)}%"></i></div><p class="muted">${esc(k.msg||"")}</p><div class="btns"><button class="btn small" type="button" data-w="cancel">Cancel</button></div>`:""}
        ${k.status==="failed"?`<p class="bo-err">${esc((k.error||"").slice(0,500))}</p>`:""}
        ${k.status==="done"?`<div class="bo-shots">${stills.map(s=>{ const pv=outs.find(o=>o.path===s.path.replace(/\.png$/,"_preview.jpg")); return `<figure>${pv&&T.imgs[pv.file_id]?`<img src="${T.imgs[pv.file_id]}" alt="${esc(s.label)}">`:`<div class="bo-ph">Loading…</div>`}<figcaption>${esc(s.label)}</figcaption><button class="btn small" type="button" data-w="dl" data-f="${esc(s.file_id)}">Download PNG</button></figure>`; }).join("")}</div>
          <div class="btns">${blend?`<button class="btn small" type="button" data-w="dl" data-f="${esc(blend.file_id)}">Download the Blender file</button>`:""}<button class="btn small" type="button" data-w="dlall">Download everything (.zip)</button><span class="muted bo-small">${k.result?.device?esc(`Rendered on ${k.result.device.split(" (")[0]} in ${k.result.seconds} s`):""}</span></div>`:""}</div>`:""}
    </section>`; }
  /* ---------- Live: the booth is built in the Blender that is open on the Mac (add-on 1.1, engine/live.py) ----------
     Every plan change goes straight to Blender (only what changed is rebuilt); what the designer moves, turns or deletes
     by hand in Blender comes back into the plan (bridge: booth_status → devices[].live.spec / rev / changes). */
  const liveMac=()=>{ const ds=(BO().B?.st?.devices||[]).filter(d=>d.status==="approved"&&d.live?.on); return ds.find(d=>d.id===T.lv.dev)||ds[0]||null; };
  const liveOn=p=>!!p&&T.lv.pid===p.id;
  /* Blender only gets the designs this booth really has: a surface without one keeps its slot name aside ("art_slot"),
     so a design left on the Mac by another booth can never show, and the plan gets its slots back when Blender sends it. */
  function liveSpec(p){ const s=fixSpec(JSON.parse(JSON.stringify(p.spec))); const has=path=>!!p.slots?.[path]?.file;
    for(const w of s.walls){ w.colour=w.colour||"#FA6428"; for(const k of ["art","art_inside"]) if(w[k]&&!has(w[k])){ w[k+"_slot"]=w[k]; delete w[k]; } }
    for(const q of s.pieces) if(q.type==="art"&&q.art&&!has(q.art)){ q.art_slot=q.art; q.art=""; }
    return s; }
  function fromLive(spec){ const s=JSON.parse(JSON.stringify(spec));
    for(const w of s.walls||[]) for(const k of ["art","art_inside"]) if(w[k+"_slot"]){ w[k]=w[k]||w[k+"_slot"]; delete w[k+"_slot"]; }
    for(const q of s.pieces||[]) if(q.art_slot){ q.art=q.art||q.art_slot; delete q.art_slot; }
    return s; }
  async function liveSnap(o){ const blob=await BO().fetchFile(o); if(T.lv.img) URL.revokeObjectURL(T.lv.img); T.lv.img=URL.createObjectURL(blob); T.lv.imgAt=Date.now(); }
  async function liveCall(p,op,extra={}){ const bcall=BO().bcall; const mac=liveMac(); if(!mac) throw new Error("Blender isn't open in Live mode on the Mac.");
    let r=await bcall("booth_submit",{kind:"live",title:p.name||"Booth",device_id:mac.id,spec:extra.spec||null,files:extra.files||{},options:{op,...(extra.options||{})}});
    for(let i=0;i<90&&(r.status==="queued"||r.status==="running");i++){ T.lv.msg=r.msg||"Working in Blender…"; draw(); await new Promise(ok=>setTimeout(ok,2000)); r=await bcall("booth_job",{job_id:r.id||r.job_id}); }
    if(r.status!=="done") throw new Error(r.error||"Blender didn't answer.");
    const pic=(r.outputs||[]).find(o=>o.path==="live_view.png"); if(pic) await liveSnap(pic);
    return r; }
  async function liveApply(p,snapshot=true){ T.lv.busy="Building in Blender…"; T.lv.err=""; draw();
    try{ const files={}; for(const sl of slotsOf(p.spec)){ const d=p.slots?.[sl.path]; if(!d?.file) continue; const sig=d.file.id||d.file.mem||d.file.name;
        if(T.lv.sent[sl.path]===sig) continue; T.lv.busy=`Sending ${sl.label} to Blender…`; draw(); files[sl.path]=await upload(await blobOf(d.file),sl.path.split("/").pop()); T.lv.sent[sl.path]=sig; }
      T.lv.busy="Building in Blender…"; draw();
      const r=await liveCall(p,"apply",{spec:liveSpec(p),files,options:{snapshot}});
      const res=r.result||{}; if(res.rev!=null) T.lv.rev=res.rev; p.liveRev=T.lv.rev;
      T.lv.msg=res.built?(res.built.length?`Rebuilt ${res.built.length===1?res.built[0]:res.built.length+" parts"} · kept ${res.kept}`:"Nothing to rebuild: Blender already matches the plan"):"";
      if(res.failed?.length) T.lv.msg+=` · left out: ${res.failed.map(x=>x.split(" (")[0]).join(", ")}`; }
    catch(e){ T.lv.err=e?.message||String(e?.code||e); }
    T.lv.busy=""; draw(); }
  async function liveStart(p){ const mac=liveMac(); if(!mac) return; T.lv={...T.lv,pid:p.id,dev:mac.id,img:T.lv.pid===p.id?T.lv.img:"",sent:T.lv.pid===p.id?T.lv.sent:{},news:[],err:""};
    // Blender may already hold this booth with changes made by hand while the studio was closed: those win
    const lv=mac.live; if(p.liveRev!=null&&lv?.spec&&lv.title===(p.name||"Booth")&&lv.rev!=null&&lv.rev!==p.liveRev&&!validSpec(lv.spec)){ p.spec=fromLive(lv.spec); T.lv.news.unshift({at:Date.now(),names:["what you did in Blender since last time (the plan now follows it)"]}); }
    T.lv.rev=lv?.rev??null; T.lv.seen=Date.now(); await liveApply(p); await save(p); livePoll(); }
  function liveStop(){ clearTimeout(T.lv.timer); T.lv.pid=null; draw(); }
  async function livePoll(){ clearTimeout(T.lv.timer); const p=T.cur; if(!p||!liveOn(p)||P.hidden) return;
    try{ const st=await BO().bcall("booth_status"); if(BO().B) BO().B.st=st; const mac=(st.devices||[]).find(d=>d.id===T.lv.dev); const lv=mac?.live;
      const was=T.lv.off; let changed=false;
      if(!lv?.on){ T.lv.off=true; }
      else { T.lv.off=false;
        if(!T.lv.busy&&lv.rev!=null&&lv.rev!==T.lv.rev&&lv.spec&&lv.title===(p.name||"Booth")){
          const fresh=(lv.changes||[]).filter(c=>c.rev>(T.lv.rev??-1)); const names=[...new Set(fresh.flatMap(c=>c.names))];
          if(!validSpec(lv.spec)){ p.spec=fromLive(lv.spec); T.lv.rev=lv.rev; p.liveRev=lv.rev; if(names.length){ T.lv.news.unshift({at:Date.now(),names}); T.lv.news=T.lv.news.slice(0,6); (p.planChat=p.planChat||[]).push({role:"ai",text:`In Blender you changed: ${names.join(", ")}. The plan follows.`}); }
            await save(p); changed=true; if(names.length) liveCall(p,"snapshot").then(draw).catch(()=>{}); } } }
      if(changed||was!==T.lv.off||T.lv.err){ T.lv.err=""; draw(); } }
    catch(e){ T.lv.err=e?.message||String(e?.code||e); draw(); }
    T.lv.timer=setTimeout(livePoll,3000); }
  function liveHTML(p){ const mac=liveMac(), on=liveOn(p);
    if(!on) return `<section class="rl-card bo-card bow-live"><div class="bo-mac-t"><b>Live in Blender</b><span class="bo-pill ${mac?"on":"off"}">${mac?"ready":"not open"}</span></div>
      ${mac?`<p class="muted">Blender is open on <b>${esc(mac.name)}</b>. Build this booth there now and watch every change happen; what you move by hand comes back into this plan.</p>
        <div class="btns"><button class="btn primary" type="button" data-w="livego" ${T.lv.busy?"disabled":""}>Build it live in Blender</button></div>`
      :`<p class="muted">Open Blender on the Mac: the BAE Booth panel (sidebar, N) has Live on. It needs the add-on 1.1 or newer.</p>`}</section>`;
    const busy=T.lv.busy;
    return `<section class="rl-card bo-card bow-live on"><div class="bo-mac-t"><b>Live in Blender</b><span class="bo-pill ${T.lv.off?"bad":busy?"wait":"on"}">${T.lv.off?"Blender closed":busy?"working":"live"}</span></div>
      <div class="bow-livepic">${T.lv.img?`<img src="${T.lv.img}" alt="The booth in Blender now">`:`<div class="bo-ph">${busy?esc(busy):"Waiting for the first picture…"}</div>`}${busy&&T.lv.img?`<span class="bow-livebusy">${esc(busy)}</span>`:""}</div>
      <p class="muted bo-small" dir="auto">${T.lv.off?"Blender stopped answering: open it on the Mac (Live on), then press Send the plan again.":esc(T.lv.msg||"Every change to the plan shows in Blender in a second or two.")}${mac?` · ${esc(mac.name)}`:""}${T.lv.rev!=null?` · version ${T.lv.rev}`:""}</p>
      ${T.lv.news.length?`<div class="bow-livenews">${T.lv.news.slice(0,3).map(n=>`<div dir="auto"><b>Changed in Blender:</b> ${esc(n.names.join(", "))}</div>`).join("")}</div>`:""}
      ${T.lv.err?`<p class="bo-err" dir="auto">${esc(T.lv.err)}</p>`:""}
      <div class="btns"><button class="btn small" type="button" data-w="livesnap" ${busy?"disabled":""}>New picture</button><button class="btn small" type="button" data-w="livefocus" ${busy?"disabled":""}>Frame the booth in Blender</button><button class="btn small" type="button" data-w="livego" ${busy?"disabled":""}>Send the plan again</button><button class="btn small" type="button" data-w="livestop">Stop live</button></div></section>`; }
  function draw(){
    if(!sample&&!T.cur){ W.innerHTML=""; return; }
    if(!T.cur){ W.innerHTML=`<section class="rl-card bo-card bow-home"><div class="bo-mac-t"><b>Booths</b></div>
        <p class="muted">Start a new booth. You talk the idea through with the booth designer first; nothing is built until you agree.</p>
        <div class="bow-start"><button class="bow-choice" type="button" data-w="new" data-m="plan"><b>I have a floor plan</b><span>Upload the plan and the designs</span></button><button class="bow-choice" type="button" data-w="new" data-m="space"><b>I only have a space</b><span>Size, place and occasion: the designer proposes the booth</span></button></div>
        ${T.list.length?`<div class="bow-proj">${T.list.map(x=>`<button class="bo-row" type="button" data-w="open" data-id="${esc(x.id)}"><span dir="auto">${esc(x.name||"Booth")}</span><span class="muted">${esc(STEPS[stepIdx(x.step)]?.[1]||"")} · ${new Date(x.updated||x.created).toLocaleDateString()}</span></button>`).join("")}</div>`:""}</section>`; return; }
    const p=T.cur;
    // what the designer is typing survives every redraw (Live redraws while Blender changes things)
    const keep=["bowText","bowName"].map(id=>{ const el=$(id); return el?{id,v:el.value,f:document.activeElement===el,a:el.selectionStart,b:el.selectionEnd}:null; }).filter(Boolean);
    const ch0=$("bowChat"), atEnd=!ch0||ch0.scrollHeight-ch0.scrollTop-ch0.clientHeight<40, top0=ch0?.scrollTop||0;
    W.innerHTML=`<section class="bow-head"><button class="g-back" type="button" data-w="home"><i aria-hidden="true">←</i>Booths</button><input class="bow-name" id="bowName" value="${esc(p.name||"")}" aria-label="Booth name" dir="auto"><button class="btn small" type="button" data-w="del">Delete</button></section>
      ${stepper(p)}${p.spec&&p.step!=="talk"?liveHTML(p):""}${p.step==="talk"?talkHTML(p):p.step==="plan"&&p.spec?planHTML(p):p.step==="designs"&&p.spec?designsHTML(p):p.step==="build"&&p.spec?buildHTML(p):talkHTML(p)}
      ${T.err?`<p class="bo-err" dir="auto">${esc(T.err)}</p>`:""}`;
    const same=T.drawn===p.id+"/"+p.step; T.drawn=p.id+"/"+p.step;
    for(const k of keep){ const el=$(k.id); if(!el||(!same&&k.id==="bowText")) continue; if(k.id==="bowText"||k.f) el.value=k.v; if(k.f){ el.focus({preventScroll:true}); try{ el.setSelectionRange(k.a,k.b); }catch{} } }
    const ch=$("bowChat"); if(ch) ch.scrollTop=atEnd?ch.scrollHeight:top0; }

  /* ---------- actions ---------- */
  const say=(p,role,text,extra)=>{ (p.chat=p.chat||[]).push({role,text,t:Date.now(),...extra}); };
  async function run(label,fn){ if(T.busy) return; T.busy=label; T.err=""; draw();
    try{ await fn(); }catch(e){ T.err=e?.code==="not_granted"?"Claude isn't available on this page right now.":(e?.message||String(e?.code||e)); log("✕","booth work",{code:e?.code,message:e?.message}); }
    T.busy=""; draw(); }
  async function send(text,files){ const p=T.cur; if(!text&&!files?.length) return;
    await run(files?.length?"Reading your files…":"Thinking…",async()=>{
      const names=[]; for(const f of files||[]){ const k=await keep(f); k.role=/pdf/i.test(f.type)?"plan or designs (PDF)":"picture"; (p.files=p.files||[]).push(k); names.push(f.name); }
      say(p,"me",text||(names.length?"(files)":""),names.length?{files:names}:{}); draw(); T.busy="Thinking…"; draw();
      const r=await talk(p,text||`I attached: ${names.join(", ")}`);
      say(p,"ai",String(r?.say||"…"),r?.ideas?.length?{ideas:r.ideas}:{});
      if(r?.summary) p.summary=String(r.summary).slice(0,1500);
      if(r?.site&&num(r.site.width)>0) p.site={width:num(r.site.width),depth:num(r.site.depth)||num(r.site.width),height:num(r.site.height)||250};
      p.ready=!!r?.ready;
      if((!p.name||/^New booth/.test(p.name))&&r?.title) p.name=String(r.title).slice(0,60);
      await save(p); }); }
  async function doPlan(extra){ const p=T.cur; await run("Measuring and writing the plan…",async()=>{
      const r=await makePlan(p,extra); const bad=validSpec(r?.spec); if(bad) throw new Error("The plan didn't come out right ("+bad+"). Press Make the plan again.");
      p.spec=r.spec; if(!p.name||/^New booth/.test(p.name)) p.name=r.spec.name||p.name; p.planChat=[{role:"ai",text:String(r.say||"")}]; p.step="plan"; await save(p); });
    if(liveOn(p)&&p.spec) liveApply(p); }
  async function doEdit(text){ const p=T.cur; if(!text) return; (p.planChat=p.planChat||[]).push({role:"me",text}); await run("Changing the plan…",async()=>{
      const r=await editPlan(p,text); if(r?.spec&&!validSpec(r.spec)){ p.spec=r.spec; p._changed=true; } p.planChat.push({role:"ai",text:String(r?.say||"Done.")}); await save(p); });
    if(p._changed&&liveOn(p)){ delete p._changed; liveApply(p); } delete p._changed; }
  async function newBooth(mode){ const p={id:"b"+rid(),name:"New booth",mode,step:"talk",chat:[],files:[],slots:{},created:Date.now()};
    T.cur=p; T.list.unshift(p); await save(p); draw(); $("bowText")?.focus(); }

  W.addEventListener("submit",e=>{ const f=e.target.closest("form[data-w]"); if(!f) return; e.preventDefault(); const tx=$("bowText"), v=(tx?.value||"").trim();
    if(f.dataset.w==="send"){ const files=[...($("bowFile")?.files||[])]; if(tx) tx.value=""; send(v,files); }
    else if(f.dataset.w==="edit"){ if(tx) tx.value=""; doEdit(v); } });
  W.addEventListener("keydown",e=>{ if(e.target.id==="bowText"&&e.key==="Enter"&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); e.target.closest("form")?.requestSubmit(); } });
  W.addEventListener("change",async e=>{ const t=e.target;
    if(t.id==="bowFile"&&t.files?.length){ const names=[...t.files].map(f=>f.name); const tx=$("bowText"); if(tx&&!tx.value.trim()) tx.placeholder=`${names.join(", ")} — add a message, or press Send`; }
    if(t.id==="bowName"&&T.cur){ T.cur.name=t.value.trim()||"Booth"; save(T.cur); }
    if(t.dataset.w==="slotfile"&&t.files?.[0]&&T.cur){ const p=T.cur, path=t.dataset.p; await run("Keeping the design…",async()=>{ (p.slots=p.slots||{})[path]={file:await keep(t.files[0]),from:"upload"}; await save(p); }); if(liveOn(p)) liveApply(p,false); } });
  W.addEventListener("click",async e=>{ const b=e.target.closest("[data-w]"); if(!b||b.tagName==="FORM"||b.tagName==="INPUT") return; const a=b.dataset.w, p=T.cur;
    if(a==="new") newBooth(b.dataset.m);
    else if(a==="open"){ T.cur=T.list.find(x=>x.id===b.dataset.id)||null; T.job=null; if(T.lv.pid&&T.lv.pid!==T.cur?.id) liveStop(); draw(); if(T.cur?.step==="build") poll(); }
    else if(a==="home"){ T.cur=null; clearTimeout(T.timer); liveStop(); draw(); }
    else if(a==="del"&&p){ if(b.dataset.sure){ await remove(p); T.cur=null; draw(); } else { b.dataset.sure="1"; b.textContent="Delete this booth? Press again"; setTimeout(()=>{ if(b.isConnected){ delete b.dataset.sure; b.textContent="Delete"; } },4000); } }
    else if(a==="go"&&p){ p.step=b.dataset.s; await save(p); draw(); if(p.step==="build") poll(); }
    else if(a==="unfile"&&p){ p.files.splice(+b.dataset.i,1); await save(p); draw(); }
    else if(a==="pick"&&p){ const d=p.chat[+b.dataset.i]?.ideas?.[+b.dataset.j]; if(d){ p.idea=d; send(`Let's go with “${d.title}”. ${d.concept}`); } }
    else if(a==="plan") doPlan();
    else if(a==="replan") doPlan("Write the plan again from the start, checking every measurement.");
    else if(a==="plain"&&p){ (p.slots=p.slots||{})[b.dataset.p]={colour:true}; delete T.lv.sent[b.dataset.p]; await save(p); draw(); if(liveOn(p)) liveApply(p,false); }
    else if(a==="livego"&&p){ if(liveOn(p)) liveApply(p); else liveStart(p); }
    else if(a==="livestop") liveStop();
    else if(a==="livesnap"&&p){ T.lv.busy="Taking a picture…"; draw(); try{ await liveCall(p,"snapshot"); T.lv.err=""; }catch(err){ T.lv.err=err?.message||String(err); } T.lv.busy=""; draw(); }
    else if(a==="livefocus"&&p){ try{ await liveCall(p,"focus"); await liveCall(p,"snapshot"); }catch(err){ T.lv.err=err?.message||String(err); } draw(); }
    else if(a==="find"&&p){ const s=slotsOf(p.spec).find(x=>x.path===b.dataset.p); await run(`Looking for ${s.label} in your files…`,async()=>{ const r=await findInPdf(p,s);
        const f=new File([r.blob],s.path.split("/").pop(),{type:"image/png"}); (p.slots=p.slots||{})[s.path]={file:await keep(f),from:"pdf",say:r.say}; await save(p); }); if(liveOn(p)) liveApply(p,false); }
    else if(a==="build"&&p) run("Sending…",async()=>{ await build(p); setTimeout(poll,1500); });
    else if(a==="cancel"&&p&&p.jobs?.[0]){ try{ await BO().bcall("booth_cancel",{job_id:p.jobs[0]}); }catch{} poll(); }
    else if(a==="dl"&&T.job){ const o=(T.job.outputs||[]).find(x=>x.file_id===b.dataset.f); if(!o) return; const was=b.textContent; b.disabled=true; b.textContent="Downloading…";
      try{ let blob=await BO().fetchFile(o), name=o.path; if(/\.blend$/.test(name)){ const z=new JSZip(); z.file(name,blob); blob=await z.generateAsync({type:"blob"}); name=name.replace(/\.blend$/,"_blend.zip"); } await BO().saveB(blob,name); b.textContent="Saved"; }
      catch(err){ b.textContent="Couldn't download"; } setTimeout(()=>{ b.disabled=false; b.textContent=was; },2500); }
    else if(a==="dlall"&&T.job&&p){ const was=b.textContent; b.disabled=true; b.textContent="Preparing…";
      try{ if(!window.JSZip) throw new Error("zip"); const z=new JSZip(); for(const o of (T.job.outputs||[]).filter(x=>!/_preview\.jpg$/.test(x.path))){ b.textContent=`Preparing ${o.path}…`; z.file(o.path,await BO().fetchFile(o)); }
        z.file("placement_sheet.png",await sheetPNG(p)); z.file("booth_spec.json",JSON.stringify(p.spec,null,1));
        await BO().saveB(await z.generateAsync({type:"blob"}),`${(p.name||"booth").replace(/[^\w؀-ۿ-]+/g,"_")}.zip`); b.textContent="Saved"; }
      catch(err){ b.textContent="Couldn't download"; } setTimeout(()=>{ b.disabled=false; b.textContent=was; },2500); }
    else if(a==="sheet"&&p){ try{ await BO().saveB(await sheetPNG(p),`${(p.name||"booth").replace(/[^\w؀-ۿ-]+/g,"_")}_placement_sheet.png`); }catch(err){ T.err="Couldn't draw the sheet."; draw(); } }
  });
  window.__boWork={ ready(){ if(!T.loaded){ T.loaded=true; loadList().then(draw); } else draw(); }, T, topSVG, pieceList, slotsOf, sheetPNG };
  $("closeBooth")?.addEventListener("click",()=>clearTimeout(T.timer));
  $("openBooth")?.addEventListener("click",()=>window.__boWork.ready());
})();

boot();
})();
