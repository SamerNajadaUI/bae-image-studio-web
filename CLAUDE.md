# BAE Studio — handover for Claude Code

Read this whole file before touching anything. It replaces the memory of a very long working session.

## 1. Who you work for and how to talk to him

- The owner is Samer, a designer at **Bank al Etihad (BAE), Jordan**.
- He writes mostly in **Jordanian Arabic**. Reply in the language he used. Keep replies **short and simple**: what changed, what was tested, what is not tested. No long explanations, no code in the reply unless he asks.
- **Quality first, always (his words, 17 Nov 2026): "credits do not matter to me, what matters is that the work comes out professional. This is a bank. Always give me the solution with the highest quality."** When two routes exist, build the better one and say what it costs; never pick the cheaper one to save credits. (Testing still must not waste credits for nothing: say what a real test spent.)
- He judges by the result on screen. When he says something is wrong, he is usually right: study the reference again before defending the work.
- He is not a developer. Never ask him to run commands. Never ask him to paste keys or passwords.
- When he says "study first, do nothing until I say انطلق (go)", write the study and the plan in chat and wait.

## 2. What the product is

"BAE Studio" is one web page with several apps on its home screen. It is published as a **claude.ai artifact**:

`https://claude.ai/artifact/4tomrLrEEaVDTAC3Z3A5h7` (version 180 at the time of writing)

Home cards (`index.html`, ids `openGallery`, `openReels`, `openAnim`, `openUpscale`, `openResize`, `openBrand`):

| App | Section id | What it does |
|---|---|---|
| Photography + Icons | `#setup`, `#gallery` | Brief → Claude writes the prompt under the BAE rules → Magnific renders (Seedream 5.5 for photos, GPT image model for 3D icons) |
| Reels | `#reels` | Idea → script → characters → locations → scenes → Seedance 2.5 video, with a "Director" chat and a learning "brain" |
| Animation templates | `#anim` | After Effects template downloads |
| BAE Upscale | `#upscale` | The studio's own free upscaler (runs in the browser) |
| BAE Resize | `#resize` | One approved picture → every screen size; crop or AI background extension, original pixels put back (section 13) |
| Brand Identity | `#brand` | Colours, logo, type, grid, assets, and **Templates and gradients** |

## 3. Repositories

| Repo | Role |
|---|---|
| `SamerNajadaUI/bae-image-studio` (this one) | Source of truth: `index.html`, `app.js`, assets |
| `SamerNajadaUI/bae-image-studio-web` | Copy for the web: same `app.js` + `index.html`, plus `bae-upscale-space/` and `gemini-eye/` |
| `SamerNajadaUI/bae-gemini-eye` | Cloudflare Worker (MCP server "BAE Gemini Eye"): `watch_video`, `upload_start`, `upload_chunk`, `host_file`, `gemini_status`. Samer deploys it himself with the Deploy-to-Cloudflare button |

After every change: commit and push here, then copy `app.js` and `index.html` (and any new asset) to `bae-image-studio-web` and push there too. Commit as Samer Najada (his git identity is already configured on his machine; do not write his email anywhere in files or chat).

## 4. Files

```
index.html   ~1750 lines. All markup and ALL CSS (one <style> block; new CSS goes before the last </style>)
app.js       ~5500 lines. One outer IIFE. All logic.
refs/        photography references, studio references (st_minimal_01/02), outfit sheets (of_01..of_19) + _t.jpg thumbs
grad/        the six OFFICIAL gradient elements: BAE_gradient_{circle_1,circle_2,lozenge_h_1,lozenge_h_2,lozenge_v_1,lozenge_v_2}.png + _preview.webp
ai/          freeform.gz.txt: the Illustrator freeform-gradient template (see section 9)
up/          BAE Upscale engine: tf.min.js, x2/ and x4/ model weights as base64 text parts (net.json, w0.txt, w1.txt)
anim/        animation template previews (v/*.mp4, p/*.jpg)
```

### app.js map (line numbers drift; search for the header comments)

| Around line | Block |
|---|---|
| 7 | Rich fields and the `@` picker: `AT`, `AT_SHOTS` (20 camera angles), `AT_OUTFITS` (19 outfit sheets), `atMake`, `atVal/atRead/atWrite`. Chips serialise as `@Name`, `[shot: Name]`, `[outfit: Name]` |
| 210 | References: `MAX_REFS=10`, `REF_USES` (colour + light / colour grading / lighting / style) |
| 280–360 | **The brand locks**: `JO_CANDID`, `CLIENT_RULES`, `COMPOSITION_RULE`, `STUDIO_RULE`, `LOCATION_BG` |
| 1314 | `ANGLES4` — the "Create image, different angles" button (4 candid angles) |
| 1355 | Recent / history (`addHistory`, `histCloud`, `histPull`) |
| 1386 | Web runtime (when the page runs outside claude.ai) |
| 1508 | Character library (shared, in the artifact database) |
| 1619 | Icons mode: `ICON_RULES`, `ICON_LOCK`, `ICON_NEG` |
| 2024 | Reels production: `RL`, `RL_BAE`, stages, Seedance, Magnific Spaces |
| 2226 | Director's brain / memory (`MEM`), Director chat (`BRC`) |
| 4380 | "New look + features (v84)": UI language, tutorial, Prompt Generator (`UXPG`, includes the outfit-sheet prompt) |
| 4918 | Brand Identity module (IIFE, `P=$("brand")`): colours, logo, type, grid, assets, **Templates and gradients** (`FORMATS`, `TBG`, `SHAPES`, `LAYOUTS`, `TP`, `makePoints`, `geom`, `tplSVG`, `tplDraw`, `tplAsk`) |
| 5189 | Layout advisor (`LV`, `LVT` taste memory, `lvRun`, `lvRedo`, `lvUse`, `LV_CENTER`) |
| 5297 | BAE Upscale module |

Code rules that have bitten before:
- Everything is inside one IIFE. A top-level `const` must be defined **above** any code that runs at load (temporal dead zone). Function declarations hoist.
- New feature blocks are inserted just before the final `boot();` / `})();`.
- Do not name a CSS class `.chip` (it clashes); brand page classes start with `.bi-`, templates `.tp-`, advisor `.lv-`, upscale `.up-`, `@` picker `.at-`.
- The brief (`#brief`) and the Director input (`#rlInput`) are contenteditable divs with a `.value` shim. Set text with `.value=` then dispatch an `input` event.
- Always run `node --check app.js` after editing.

## 5. Runtime services (only inside claude.ai)

The page uses `await claude.use(name)`:

- `sample` — Claude (text + images). Helper in the code: `rlAsk(prompt, opts)` returns parsed JSON.
- `mcp` — connectors, called as the viewer:
  - **Magnafic** (Magnific): generation, upload, wait, spaces, upscale, expand, crop, etc. (39 tools declared; `images_expand`, `images_crop`, `creations_trash` and `images_resize` added for BAE Resize)
  - **BAE Gemini Eye**: `watch_video`, `gemini_status`, `upload_start`, `upload_chunk`, `host_file`
- `db` — collections with rules (read: view, write: admin): `brain`, `research`, `advisors`, `mem`, `memmeta`, `archive`, `chars`, `charimg`, `brandfiles`, `brandblob`, `upscale`. Private per-person data lives under `data/users/<uid>/…` (Recent history, reels, `lvtaste`).
- `user`, `downloads`, `assets`, `dictation`.

### Publishing the artifact

Publishing happens from a Claude session that has the Artifact tool (claude.ai), not from plain git:

- Publish `index.html` with `app.js` (and any new asset) as supporting files, to the same artifact URL.
- **Omit `capabilities`** to keep the stored declaration. If you ever change it you must restate ALL of it (see the list above), otherwise the missing ones are revoked.
- `.bin` files are not served. Text files max 16 MB each, 64 MB per publish. That is why the upscaler weights are base64 `.txt` parts.
- **Every publish reloads the page Samer has open.** Do not publish while he is in the middle of testing something.

### Testing

There is no test suite in the repo. The previous session tested with Playwright + a mocked `window.claude` (mock `sample.json`, `mcp.callTool`, `db`). Rebuild a small harness like that when you need one: serve the folder on localhost, inject the mock with `addInitScript`, click through, take screenshots, and look at them.

A mock proves the UI and the wiring only. Always tell Samer what was tested with a mock and what was never tested for real.

## 6. Hard rules

- **Never run paid Magnific generations to test.** Generation spends his credits. Mock it.
- Never type or store API keys, passwords or tokens. Never create accounts for him.
- His email is private. Do not put it in files, prompts, URLs or third-party requests.
- Never copy a real person's face. Do not download photos of public figures.
- Do not embed copyrighted reference images (his camera-angle guide image was deliberately not used).
- **Never redraw or recolour the BAE logo.** Only the symbol already shipped in the page may be placed; final work uses the official lockups.
- Outfit sheets are unbranded (no logos). The exceptions, added by Samer himself: `of_18` / `of_19`, the Bassmet al Etihad staff polo (men / women; white Arabic logo small on the chest, large on the back), and `of_16` / `of_17`, the official BAE staff uniform (black polo with the white emblem on the chest and the lockup on the back), whose prompt says to keep the marks exactly as on the sheet.
- For the upscaler: he wants it **his own, free, named "BAE Upscale"**, never a paid service. Do not route it through Magnific. Avoid non-commercial licences (CodeFormer was rejected for that reason).
- A new public GitHub repo needs his explicit yes.

## 7. BAE brand system (the part every feature must respect)

Concept: **Deep Clarity**. Pillars: Intelligence (precise, clear) and Warmth (present, familiar).

### Colour tokens
- Orange `#FA6428` (primary) · Dark Orange `#C13A23` · Medium Orange `#FB9A75` · Soft Orange `#FDCBB4` · Light Orange `#FFFAF4`
- Ink `#19181E` · Stone `#ECE8DF` · darker stone `#CCC3B4`
- Screenshots of the guideline PDF show these colours shifted (for example `#FA6428` reads as about `#E8703E`). Trust the hex values, not the pixels.

### Type and grid
- GT Walsheim (Latin) and Avenir Arabic, **Regular only**. English is left-aligned with the logo on the left; Arabic is right-aligned with the logo on the right.
- Margin = 7% of the width. 12 × 12 grid.

### Photography — Samer's standing rule ("keep it forever")
- **Candid. Nobody ever looks at the camera.** People are caught in the middle of a real action.
- Camera from the **side, from behind, or three-quarter**. Frontal is the last choice.
- **The main subject (person or object) is always in the CENTRE of the frame**, about the middle half, calm space on both sides. Never left third, right third or a corner. This applies to the brief, the advisor and the final prompt.
- Lifestyle locations are quiet and uncluttered, one focus.
- **On-location only:** the background behind people is soft blur, few details, clean, sky, no dominant building.
- **Studio ("Studio minimal clean"):** plain warm cream wall, at most one light-oak piece, tone-on-tone tailored wardrobe, eyes away from camera. Two master references `refs/st_minimal_01/02` are attached at original size.
- A reference from the BAE guideline set carries **colour grading + lighting** by default; per reference the user can choose colour grading, lighting, both or style. Maximum 10 references.

### Icons
3D glassmorphism icon, one focal object, centred, on Light Stone, 16:9. No text inside.

## 8. Feature notes worth knowing

**Layout advisor (Photography page).** Drop a layout screenshot → Claude reads the copy, names the product and the promise, scores four options (Photo Studio, Photo Lifestyle, 3D icon, Copy-led), writes a brief for each, proposes a library character and an outfit **for every person** in the scene. "Another idea", "tell me what you have in mind", "Add a scene photo". "Use this brief" fills the brief, sets mode/setting/aspect and appends `LV_CENTER`.
It learns: `LVT` (localStorage `bae_lv_taste` + `data/users/<uid>/lvtaste`) stores what he used, rejected and wrote himself, and `lvTaste()` feeds it back into every prompt. A zone-based composition (subject opposite the text) was built and **rejected by Samer** — do not bring it back.

**The box under each advisor idea is a conversation (v152).** Samer: he wants to discuss the idea, not have it rewritten "randomly from its own head". `lvTalk(i,say)` keeps a thread per option (`x.chat`): the art director answers in his language, may ask ONE question, and only **proposes** a brief (`m.prop`). The option's brief changes only when he presses "Use this version" (`lvApply`); "No, keep talking" records a rejection. "Another idea" and "Add a scene photo" still call `lvRedo`. Tested with a mocked Claude only.

**Edit one thing in a finished image.** `editImage(key, ask)`: Claude writes a strict edit prompt, the result is used as `@img1`, an outfit sheet as `@img2`.

**BAE Upscale.** In-browser engine: tfjs + ESRGAN-thick x2/x4 (MIT), tiled, with finishing (faithfulness blend, sharpen, grain), problem chips (too smooth, pores, gritty, invented detail, lost mark, wrinkles, freckles, hair, eyes, lips…) and the loop upscale → compare → note → retry. Phone limits exist because iPhones ran out of memory.
A server version exists in `bae-image-studio-web/bae-upscale-space/` (Hugging Face Docker Space: FastAPI job queue, Real-ESRGAN `realesr-general-x4v3` + GFPGAN v1.4, returns an image link). Tested locally only. Samer has to create the Hugging Face Space himself and send the URL; then the studio must be wired to it.
**Samer's verdict on the current quality: "dumb and not strong".** He wants it stronger than Magnific, built in Claude Code, learning by itself, on his **Apple M5**. Honest position already given to him: beating Magnific and true self-training cannot be promised; the realistic plan is a strong open model (SUPIR class) run locally on his Mac with an automatic check-and-adjust loop and optional fine-tuning. **Open question: his RAM (16 / 24 / 32 GB).** Ask before choosing the model.

## 9. Brand gradient — rebuilt in v128 (waiting for Samer's verdict)

Samer rejected the old builder twice (blurred circles, card-style frame, flat black, white behind the PNG). After his "انطلق" it was rebuilt from the guideline. He does **not** have the brand library shapes, so the organic shapes are drawn by us and the page says so.

### What the guideline says (keep following it)
1. Solid brand colour. 2. A brand shape (organic blob). 3. Linear gradient fill `#C13A23` 0% → `#FA6428` 61% → `#C13A23` 100%, at an angle. 4. Layer blur 75. 5. More shapes, lighter shades on top.
- Palette: `#FFFAF4`, `#FDCBB4`, `#FB9A75`, `#FA6428`, `#C13A23`. One colour family.
- **Background**: dark masses at corners and edges, diagonal flow, clean orange middle, one small light highlight at an edge.
- **Frame**: a soft **L** from two adjacent sides fading into Light Orange. 01 = gradient bottom + right, 02 = the inverse; Arabic is mirrored. Stone frames use Stone and Light Orange.
- **Shape** (image-led layouts): circle, lozenge horizontal, lozenge vertical; progressive blur 0 → 100; two directions each: sharp top / soft bottom (`_1`) and sharp right / soft left (`_2`).
- **Dark**: navy-violet `#0E0C26` with grey-violet lights up to `#626079`; internal and corporate only.

### How it is built now (app.js, "Templates and gradients (v128)")
- `TONES` (fill of one shape: colour at 0 / 61 / 100%), `FAMS`, `BLOBS` (six organic outlines), `LIB` (18 library items with the official file names), `B(b,x,y,s,r,e,t,a,bl,o)` = one shape.
- Engine: `gField` draws each shape small, blurs it in floating point and layers it; `gPrep` + `gRows` scale it to any size with a fine dither (no banding) and cut the circle / lozenge with the progressive soft edge (edge softness was measured on the six official PNGs in `grad/`). `BLUR_K` maps "layer blur 75" to pixels.
- `tplPNG` writes the PNG itself row by row (CompressionStream), so 8K works without an 8K canvas and shapes keep a clean transparent background. `tplOverlay` draws logo / copy / image frame and picks ink or white from the colour underneath.
- UI: library gallery in the chosen size → editor (numbered handles move a shape; panel changes outline, tone, size, rotation, stretch, blur, fill angle, strength, order) → Download PNG (Standard / 4K / 8K), Copy for Figma (PNG image), All sizes as ZIP, Official set as ZIP.
- **Copy for Figma = editable layers** (Samer asked for an open file, not an image). `tplFig` writes an SVG the way Figma itself exports one (its own layer-blur filter pattern): base rect, one vector per organic shape with gradient fill + layer blur, logo symbol, live text. `Download SVG` is the same file. `Copy as image` keeps the PNG. The circle / lozenge soft side cannot be written in SVG: it pastes crisp and the page tells him to add Layer blur → Progressive in Figma.
- **Not confirmed in real Figma.** The v127 paste lost the blur (plain filter). If the Figma-format filter is also dropped, the reliable route is a small Figma plugin that builds the nodes (frame, vectors, gradient fills, layer blur, progressive blur) from the studio's JSON. Offer it; it needs his yes.

- **Illustrator = Freeform Gradient (v133).** What Samer really wants is Illustrator's **Freeform Gradient** (colour points), not shapes and not a mesh (the PDF patch-mesh test opened as "Non-Native Art" and was dropped; `meshBytes` survives only as the PDF preview inside the .ai). There is no open format for it, so `tplFreeform` fills in Samer's own saved sample: `ai/freeform.gz.txt` = gzip + base64 of that file's Illustrator private data, with blanks `@W@ @H@ @BB@ @TB@ @TILE@ @OX@ @OY@ @N@ @PTS@` (artboard size, ruler origin = 8191 − half size, and the colour points). In the private data a freeform gradient is `/SmoothShadingStyle : (Adobe Diffusion Coloring Style) N /ColorPoints`, then per point `c m y k r g b Xa` / `1 1 0 x y` (x, y = 0..1 from the top left) / `/ColorPoint ,`. The data is wrapped in a minimal PDF (`pdfWrite`) with `/PieceInfo /Illustrator /Private` (AIMetaData + 64 KB blocks), exactly how an .ai is stored. Points = an even grid (Few 3×2, Medium 4×3, Many 6×4) + the lightest / darkest spot (`ffPoints`). The download is a ZIP with the .ai inside, because the artifact download list refuses `.ai`. Backgrounds, frames and dark only; not the circle / lozenge.
  - Proven: a hand-made test (sample + 13 new points, original PDF container, 1920×1080) opened in Illustrator 2026 as an editable freeform gradient ("زبط"). The studio's output at 1920×1080 is byte-identical to the sample outside the points and the tile box.
  - **Not yet confirmed by Samer:** the studio's own minimal PDF container, and sizes other than 1920×1080.
  - Careful: decode the template byte for byte (`String.fromCharCode`), never `TextDecoder("latin1")` (it is windows-1252 and corrupts the embedded binary).

Tested with Playwright from disk only (rendering, editor, every export, both ZIPs, SVG rendered next to the canvas). Never tested for real: inside claude.ai, the paste in Figma, "Ask for a file" with real Claude, Safari / iPhone.

**Recent thumbnails (v136).** Samer saw 40 grey tiles ("16:9 · 2K") in Recent. Two causes fixed: `addHistory` only made a thumbnail when Magnific had sent image bytes (`o.img`), and `saveHist` dropped thumbnails first when localStorage was full. Now `histFill` fetches a 512 px view of every entry without one (`creations_read` with `{creationIdentifier, hq:"low"}`, called directly, no Claude call), one at a time once Magnific is connected, and saves it locally and to the cloud copy; `saveHist` shortens the stored prompts before it gives up any thumbnail. Tested with a mocked connector only.

## 10. Other things waiting on Samer

- Real tests he has not reported back on: soft-background lock on location, Recent history sync, edit fidelity (identity kept), the 4-angles button, per-reference use, the advisor on a real layout.
- Hugging Face Space for BAE Upscale (he creates it, sends the URL).
- His Mac's RAM for the local upscaler plan.

## 11. Ideas already offered and not yet built (Layout advisor)

4. Three directions with a quick thumbnail each (spends Magnific credits — ask first).
5. Put the generated image back inside the layout to preview the final result.
6. A pre-generation check that the prompt follows the house rules.

## 12. Photography becomes a chat — plan agreed with Samer (he approved all of it)

"The chat above" = the brief box on the Photography page. He wants it clearly stronger and interactive. Publish each stage on its own and let him test before the next.

1. **Done (v135): the `@` picker is a grid.** Three tabs (Characters / Outfits / Camera angles), cards with a landscape 16:9 picture and the name under it, 3 columns on a computer and 2 on a phone, arrows move in two directions (`atDraw`, `O.tab`, `O.vis`, `O.cols`). Tested with a mocked library only.
2. **Done (v137): chat core.** Module "Art Director" at the end of `app.js` (IIFE, state `PC`, classes `.pc-`). It sits at the top of `#briefCard`; the old brief, presets, layout drop and Create buttons moved into `<details class="pc-classic">` ("Brief and classic controls") and still work. One Claude call per message (`ask()` builds the prompt, `handle()` reads the JSON: `say`, `card`, `ask`, `do` = talk / ready / edit / angles / directions / layout, `check`, `directions`, `image`, `source`, `keep`). The **shot card** (`PC.card`: who, outfit, action, place, camera, light, setting, aspect) is turned into the brief by `compose()` and handed to the untouched pipeline: `apply()` → `createAll()`; edits by talking go to `editImage()`. `S.quiet` stops the page from scrolling while the chat generates. Card fields are clickable (the editor reuses the `@` picker with `data-only`). Hidden in Icons mode and in the web runtime.
3. **Done (v137): "make one like this, but change…"** A photo attached in the chat becomes `PC.src` (what it shows, per field) with keep / change per field in the card (`PC.keep`; who is never kept). `remake()` uploads the photo (`rlUploadMag`) as `@img1`, the library character(s) and the outfit sheet as the next references (`magId`), Claude writes a LOCK / REPLACE prompt, `rlImage` renders, the result becomes the normal result card. If the photo breaks a rule the chat asks: fix it or keep it like the original (`PC.fix`).
4. **Done (v137): check before spending and taste.** `do:"ready"` shows the five house rules ticked (with what the Art Director adjusted) and the Create buttons; nothing is generated without a press, except an edit he asked for in words. 👍 / 👎 + a reason are stored in `PCT` (localStorage `bae_pc_taste` + `data/users/<uid>/pctaste`) and fed back by `taste()`.
5. **Done (v137): extras.** Voice (`#pcMic`, shares the dictation capability with Reels through `S.mic`; v159 adds `#briefMic` on the Brief box, `briefMicInit()`, `S.mic` = "rl" / "pc" / "brief", each box only listens to its own), Compare A / B (`compare()`), three directions (text first; "Render all three" spends 3 images and says so), "See it in the layout" (`inLayout()`: Claude marks the picture area and the boxes to keep on top; a rough preview).

Tested with Playwright and a mocked Claude + Magnific only (desktop and phone width): talk → question → ready check → create → edit by talking → compare → taste → directions → card edit → remake to the end → layout preview. **Never tested for real:** how well the real Claude fills the card, real generation and real remake fidelity (same camera / action), credits line, voice, the chat inside claude.ai. The chat is not saved across a reload.

Open choice left to us ("see what fits"): whether the current options (Photo / Icon, Studio / Location, aspect, references) stay visible beside the chat or fold into "advanced". The brand locks (candid, centre, soft background, studio) do not change; the chat works on top of them.


## 13. BAE Resize (v138)

Samer studied tadvio.com and asked for the same idea inside the studio: give one clean visual (no text, no logo) and get all his screen sizes, with a Download All ZIP. His ten sizes are the default preset (`DEF`): 1920×1080, 3840×2160, 1920×3240, 256×512, 1080×3840, 128×640, 1920×2160, 1080×1920, 128×512, 1920×3840.

**Decision, from a real paid test on his picture (350 credits):**
- Never regenerate (Seedream redraws the person). Extend the background only (outpainting) and keep the original.
- Engine = Magnific `images_expand` with `mode:"magnific-expand"` (30 credits): it follows the fill instruction and did not repeat the subject. `bfl-outpainting` (130) rewrites the prompt itself and **tripled the man at 1:5**. Do not switch to it.
- Extend toward the easy side (sky, plain wall) and say exactly what continues there ("cloudless sky…"), otherwise it invents clouds and furniture.
- Magnific returns at most about 5 MP whatever is asked, and the page cannot fetch the CDN file, so the result is read back in 768 px tiles: `images_crop` (free, instant, square custom size) then `creations_read` `hq:"medium"` (returns up to about 800 px, so 768 is 1:1).

**How it works (module "BAE Resize" at the end of `app.js`, state `R`, classes `.rz-`):**
- `analyse()`: Claude returns the subject box and, per side, `ease` and a `fill` sentence.
- `makePlan()` (pure arithmetic): each size is `same` (resize), `crop` (subject still fits) or `ext`. Sizes that need extending share **masters**: the source is cropped to the subject width ×1.3, extended once (up to 2.5× per step), then again for the extreme ratios; each size is a window cut from the smallest master that holds it. Two extensions cover all eight of his tall sizes.
- `family()` uploads the base (`rlUploadMag`), calls `images_expand`, waits, reads the size with `creations_get`, `readBack()` fetches only the tiles the extension needs, `compose()` puts the previous layer (the original, then the master before) back on top with a tone match and a feathered edge. So the person is always the original pixels.
- `check()`: Claude looks at each master and flags repeats, new objects, seams ("Review"); "Make it again" redoes one extension with an optional note.
- Per size: slider to move the window, "Actual pixels" for the small LED sizes, "High quality" = the same ratio at the native size. ZIP has `exact/` and `HQ/`.
- Finished extensions are remembered in localStorage (`bae_rz_runs`, by file name + size + dimensions) and reused free after a reload.

**How Magnific really behaves (measured live on Samer's account, 16 Nov 2026 — the first four versions failed in his hands because the mock did not copy this):**
- The size in `creations_get` metadata is NOT the file's size: details said 711×3556, the file is 704×3552 (the model works in steps of 16).
- A big request is shrunk by Magnific's own rule: 1264×6320 came back 704×3584, the same with `resolution:"4k"`. Never assume the requested size.
- `images_crop` refuses a crop LARGER than the file and the refusal states the true size ("A crop fits inside the picture: up to 704 x 3552 px"); non-square sizes are fine; a crop POSITION past the edge is silently moved back inside (so position probes lie, size probes do not).
- `creations_wait` can come back `processing`; loop.
- The page's security blocks `fetch("data:…")`; decode base64 with `b64Blob`.
So `realSize()` asks for a 10000×10000 crop and reads the size from the refusal, with size probes as fallback. Everything sent to Magnific is sized in steps of 16. Every extension starts from a picture the page uploaded itself (the original, then each finished master), never from Magnific's raw result, so what the model redraws under the join equals what the page puts back. `compose()` measures the tone step exactly at each join (24 bins across) and removes it, then blends over the whole calm band up to the subject.
The mock that copies all of this is in `dev/resize-mock-test.js` (Playwright; run it with MSG=1/0 and META=1/0, set IMG to a test picture). Run it before changing this module.

**Quality pass (v144):**
- A plain side (clear sky, flat wall) is continued by the page itself, no AI: `edgeModel()` reads a strip at the edge, decides if it is plain (numbers, and Claude's `plain` flag can veto) and `synth()` continues its tone, side-to-side drift and mirrored real grain. Free, full resolution, no invented clouds. On Samer's test picture the sky join is invisible at 100%.
- When only one side needs the model, Magnific gets just the strip of the picture next to that side (about 1.25× the width), so the request stays near 3 MP and comes back at almost full resolution instead of 704 px wide.
- The model's new area gets the photograph's grain (`grainLevel`, `addGrain`).
- Tiles and probe crops are moved to Magnific's trash when a run ends (`creations_trash`, added to the manifest).
- Samer approved a three-phase plan: 1 quality (done, except "rolling" full-resolution extension when both sides need AI), 2 interface (a wall of screens at true proportions, focus view with drag, editable subject box, staged progress, LED simulation, phone carousel), 3 workflow (several pictures at once, named size sets, history, a button from Photography, wide formats polish).

**Interface (v145), phase 2 done:** the page is a dark "wall of screens" (`.rz-wall`, `screenHTML`): every size at its true shape; before paying, each screen already shows the original in place and the new parts tinted (teal = continued by the page, orange = AI) via `pending()`/`tint()`. A screen opens a focus view (`FO`, `focusDraw`): drag the picture to place it (arrow keys too), "Show what is new", "LED preview" for small sizes (one round dot per pixel), High quality, Download, previous / next, Esc. The source panel has the keep-frame (`#rzBox`): drag it or its corners, `setBox()` replans (and resets created sizes). Progress is a five-step stepper (`STEPS`, `stageOf`). The cost is one big number; credits used on this picture are shown after. On phones the wall is a swipe carousel. Samer confirmed the real run works ("زبط") before this was built. Phase 3 (several pictures, named size sets, history, button from Photography) is next.

**Sharpen (v150), approved by Samer after a real before / after on his climber picture.** The real cause of soft big sizes is not the AI: a 2560 px picture gives a tall crop about 1312 px wide, and 1920-wide sizes stretch it x1.46, person included. Tested for real (17 Nov 2026, about 780 credits): one coherent extension at the exact size (1312x3104, both sides, rope continued because the fill text said so), then `images_upscale` `mode:"ultra-photo"` 2x (Magnific Precision "photo": faithful, nothing invented), cut and reduced to 1920x3840. Result at 100%: no seams, sharper face, rock and AI background, same person. `grain:0` is the smooth one (the "balanced" preset puts visible grain in a clear sky). Cost: 90 credits for 1.1 MP, 270 for 4 MP, about 3 minutes.
In the page: `sharpTargets()` = one target per picture that has a stretched size (`grow(it)>NEED`): the original (`"src"`, for same / crop sizes) or a master (`fam+index`). `sharpen()` runs after the families: uploads the page's own picture as PNG, starts every upscale, waits, reads each back whole (`readBack`), keeps it at the scale the sizes need (`R.U[key]={canvas,zx,zy}`), checks it is the same picture in the same colour (`apart()`, small offset corrected with `addRGB`). `region()` returns the sharpened picture for a stretched size and the untouched one for every other size (`region0`). Saved per picture in `runs()[key].up` (+ `upSpent`), tied to the master's extension ids. Any failure leaves every size in its normal version and shows a calm note (`R.note`); the switch "Sharpen the sizes that are larger than the picture" (localStorage `bae_rz_sharp`) turns it off. Pictures whose 2x would pass 16 MP are skipped.
Also in v150: `analyse()` asks that a line crossing an edge (rope, pole, horizon) continues straight to the new edge; `fit500()` keeps the expand prompt under the tool's 500-character limit (measured: longer prompts are refused).
Honest status: the method and every call were run for real through the connector; the page's own run of it is mock-tested only. Samer's first run is the real test.

**v149: v147 and v148 were ROLLED BACK. The extension code is v146 again, plus the call pace (`paced()` / `mag()`).** Samer's verdict on the pieces, with two real results (a climber against a sky, 2048x4096 and 128x512): "the one before was better, this one has many visible cuts, not smooth at all". What his results show: a hard horizontal line at every join, the sky in bands of different tone (each piece is a separate generation with its own tone), and no overall sense (the rope ends in mid-air, because a strip does not see the whole picture). More pixels, worse picture.
Lessons, keep them:
- One generation that sees the whole picture is coherent; several pieces are not, however well they are blended. Sharpness must not be bought with seams.
- v147 was shipped after a mock test only, and the mock paints a smooth gradient, so it cannot show seams or tone bands. **Never ship a change to how the picture is built without a real result looked at at 100%.** The mock proves wiring only.
- The measurements below are still true and useful (size rule of `magnific-expand`, the other modes, the read being a JPEG of 800 px), but the "pieces" design built on them is not in the code any more. `images_resize` stays in the manifest, unused.
- A better route to try, for real first, before touching the tool: one coherent extension as in v146, then an upscale of the new background only, original pixels put back as always.

**(Rolled back) Full resolution in pieces (v147).** Samer: quality over credits, always. Measured on his account (17 Nov 2026, 520 credits of real tests, `magnific-expand`):
- The result is exactly the size asked for only while **each new side is at most about 1536 px** and the **whole frame at most about 4.15 MP**. Exact: 1024x2304, 1024x2560, 1024x3008 (new side 1504), 1024x2048 (both sides), 2048x1536, 2048x1952 (4.0 MP). Shrunk: 1328x2928 -> 1136x2528, 1024x3136 -> 784x2416, 1024x4096 -> 528x2128 (new side lands near 1536 each time), 2048x2304 -> 1920x2160 (area cap). The old "about 5 MP" note was wrong.
- Other expand modes, same request: `seedream-4-5` (50, returns 2720x6144) **moves and redraws the person**: unusable. `imagen-nano-banana-2-flash` (150, returns 2752x6200) keeps the person in place and is sharp, but rewrites the foreground; not needed because `magnific-expand` is already 1:1 with the source. `resolution:"4k"` does nothing for `magnific-expand`.
- A piece that continues an earlier piece (context = the picture built so far) stays calm and consistent: tested once for real.
So `family()` no longer makes one call per master. `reach(cross)` = what one call can hold (`ADD`=1504 new px, `AREA`=4.0e6), `pieces(F,k)` = the pieces of one master per side. Each AI side of each piece is its own call (the two sides run at once), given the strip next to that side at the picture's own pixels (steps of 16; the tall family's width is now a multiple of 16). `F.aiSteps[k]` is now the NUMBER of calls of master k (cost = sum x 30). Cache: `reuse.ch["k.j.A|B"]={src,id,dims}`, signature `v7` (older saved runs are redone). If Magnific ever shrinks a piece the page still places it correctly (`ka`) and logs "resize shrunk".
- Tiles: `creations_read` returns a JPEG of at most 800 px (quality about 80, 4:2:0), which left 8 px blocks. Now each 400 px tile is enlarged x2 with `images_resize` (free), read at 800 and reduced in the page: the blocks are gone (measured). `images_resize` was added to the manifest (39 Magnific tools); if it is refused the page falls back to 768 px tiles (`R.noFine`).
- **Call limit (v148).** Samer's first real run of v147 (iPhone, 210 credits spent) stopped with "Too many MCP tool calls this minute. Retry after 20 seconds": claude.ai limits connector calls per minute and the fine tiles had tripled them. Now every Magnific call of the module goes through `paced()` / `mag()`: calls are spaced (`PACE.gap`, learned and kept in localStorage `bae_rz_pace`), a refusal is waited out and the same call repeated (up to 10 times; the call never ran, so nothing is paid twice). And the result is enlarged x2 ONCE per piece (`images_resize`, verified with `realSize`), then read in 800 px tiles (`readBack(..., z=2)`): 2 calls per tile instead of 3. A both-sides picture is about 240 calls, 4 to 5 minutes. The real limit per minute is not known; the pace finds it.
- Still mock-tested only inside the page: the whole new flow end to end. The size rule and the look of a second piece are real.
- Known content limit: when the picture cuts a person at the bottom, a long extension downward makes the model imagine legs and shoes. The note field ("keep the blurred foreground, no legs") steers it.

**Calmer check (v146).** On Samer's second picture (man with a headset at a laptop, blurred mug in the foreground) the automatic check wrote long alarming English notes, cut mid-word, and flagged the mug and table that are in the original; and Claude's keep-frame covered the whole picture (three extensions, 90 credits). Now `check()` sends the original next to the extended picture, is told that anything present in the original is never a defect, and returns `verdict` ok / look / redo with at most two short issues (`clip()` cuts at a word). The UI shows "Worth a look" (amber) or "Clear fault" (red), opens the "AI extensions" card only on a clear fault, and explains in one line what a note is and what "Make it again" costs. The `subject` instruction in `analyse()` now asks for a tight box around the person and the one thing they use, and to look again if it is wider than 0.75 or taller than 0.9. Mock-tested only; the real Claude's verdicts are not yet seen.

**Tested** with Playwright and a mocked Magnific + Claude only (plan, both extensions, tiles, compose, check, ZIP, phone width). **Never tested for real inside the studio:** the upload through BAE Gemini Eye, real tiles, the tone match on a real extension, the check with real Claude.
Known limits: tiles appear in his Magnific history; a 2560×1440 source means the 1920-wide tall sizes are enlarged ×1.4 (the card says so, a 4K source fixes it); not yet reachable from a Photography result (upload only).


## 14. BAE 3D Booth (17 Nov 2026) — proof done, phase 1 (bridge + add-on + studio page) built

**What Samer wants.** Today the team draws a floor plan, designs every side in 2D, turns each piece into 3D with an image model one at a time, and tells the builder "put it on the right": pieces land in the wrong place. He wants Blender to build the WHOLE booth from the plan, and to use a Blender scene as the reference for Seedance 2.5 with his assets. The steps must stay very simple. He studied Dan Kieft's "Claude + Blender" method (claude-and-blender.vercel.app, allowed in the environment's network): low-poly Blender scene → MP4 as `@video1` (camera, motion and layout only) + character sheet + a realistic still made from a Blender screenshot → Seedance 2.5, Draft first.

**Facts.**
- Samer has a Mac, the Claude app and **Blender 4.5.10 LTS**. The official Blender connector (Blender Lab, April 2026) is said to need Blender 5.1+ (one source, not confirmed): ask him to update before relying on it.
- Blender's own Python runs in this cloud container: `uv venv --python 3.11` then `uv pip install "bpy>=4.5,<4.6"` gives Blender 4.5 LTS, same series as his, so the `.blend` opens on his Mac. Cycles on CPU: a 1920×1080 still takes about a minute, EEVEE is not available here.
- Magnific has `models3d_generate` (image → GLB) for special pieces, and `video_generate` takes `references` of type `video`, `image`, `character`, `product` (the Seedance route).

**The proof (`booth/`).** `christmas_booth.json` is ONE spec in centimetres, measured from the FRONT-LEFT corner (x right, y back): floors, walls (from / to, thickness, openings, artwork seen from outside), pieces. `build_booth.py spec out stills|video|all` builds it (walls with real openings, artwork cut out of his own PDF pages and mapped at real size, tables, stools, glass walls), saves the `.blend`, renders six views and an orbit clip. `sheet.py` draws the contractor's placement sheet from the same spec (every piece numbered with its distance from the left wall and from the front). The textures and his PDF are NOT in the repo (they were cut from "Christams_Floor_Plan.pdf", 10 pages: plan 1000×488 cm + each side and area with dimensions).
- Wall convention: the outside is on the RIGHT of the direction from → to, the artwork's left edge is at `from`, thickness goes inward.
- Found in his document: the Area 1 elevation adds up to 530 cm (160 + 250 + 120) but the booth is 488 deep (plan: 160 + 250 + 76). The artwork was fitted to 488. Tell the team.
- **The star corner (Area 3), added after Samer said it was missing:** the dashed diagonal on the plan IS the star's wall. A thin wall on that diagonal, the star cut out of the PDF with a transparent background (`mat_image` keeps the alpha and can be backlit with `emit`), the "Play & Win" letters above it, gift boxes at both ends. Second measurement conflict: the star is 180 cm wide, the diagonal is 187 cm on the plan but only about 162 cm between the inner faces of the walls. It is shown at real size, overhanging. Both conflicts are in the spec's `notes`.
- **Round 3 (Samer: direction is right, nothing else missing, "choose what fits best" for the conflicts).** Decisions written in the spec's `notes`: the star is built at 156 cm so it sits inside its 162 cm panel; Area 1 keeps photobooth 160 and post cards 250 at real size and the storage cabin becomes 78 cm. Added Buzzer Area 2 from page 7 of the PDF: TV wall on the inside of the right wall (front corner to Door 03) and buzzer wall on the inside of the front wall (Door 01 to the right wall), as `art` pieces, plus the TV as a slab with its screen. New conflict found: the TV wall is 170 cm in the elevation but only 138 cm is free, and a 65 inch TV with its frame (about 142 cm) does not fit: tell the team (55 inch, or move Door 03 by 7 cm). Door openings take `radius` (rounded top corners, artwork continues on them). `build_booth.py spec out stills view1,view2` renders only the named views (a full set takes about 10 minutes on CPU).
- **Family reference scene (`booth/family_scene.py spec out check|video`).** Samer asked for a 20 s Blender scene as the Seedance 2.5 reference: father, mother and son walk up from far, go in through Door 01, look at Area 1, stop at the star (the boy points and hops). Plain mannequins on purpose, four shots with camera cuts (timeline markers), 960x540 at 24 fps (Seedance 2.5 on Magnific: clips and video references up to 30 s, at least 24 fps and 409,600 pixels, up to 6 shots, references of type video / character / image / product). `PEOPLE` (paths in cm and seconds) and `SHOTS` at the top of the file are the whole scene. The full render takes about 20 to 30 minutes on CPU. Waiting for his characters, outfits, time of day, place and sound; then a Draft first, say the cost, and the final only after his yes.
- **First real Seedance 2.5 run (17 Nov 2026, 21,600 credits, 20 s, 1080p, with sound; Samer asked for no Draft).** Characters from the library: Mizo (father), dina (mother), oun (son); night, outdoor plaza, Christmas music and crowd. References: the Blender clip as `video` (key `video1`), the three character sheets as `character`, three NIGHT stills of the booth from Blender as `image` (`booth/night_stills.py`: same build, dark sky, warm lights). One prompt with time-coded shots, `promptMode:"manual"` (`booth/family_seedance_prompt.txt`). What came back, seen in frames only: camera, cuts, blocking and booth layout follow the Blender clip closely, night look and wardrobe as asked, booth marks look intact at small size. Weak points: the booth keeps the flat "3D render" look of the Blender stills (a realistic still of the booth would fix it), oun came out as a small boy (the mannequin is 128 cm, he is about 14), in the last seconds the family turns toward the camera. Not checked: marks at 100%, faces against the sheets, the sound. Uploading local files to Magnific needs `ak-data.magnific.com` in the environment's network (added to Default with his approval). Character pictures come from the artifact's asset store (`chars` documents hold the `asset` id).
- **Second run, after Samer's verdict on the first ("looks 3D, the people walk like robots, not real"; he sent a pro prompt as a model).** What changed, keep it as the method: (1) the Blender clip is CAMERA ONLY; the prompt says the mannequins are position markers, to replace them and "create every person's movement independently, do NOT copy the stiff motion" (from his example prompt), with a paragraph on how real people walk; (2) the booth references are no longer Blender stills but REAL-LOOKING stills: each night Blender still goes through Seedream 5.5 (`images_generate`, the still as an `image` reference, "turn this 3D render into a real cinematic photograph, same angle, same booth, every logo and word unchanged", set in a night Christmas market), 50 credits each; five were made (market exterior three-quarter, inside, star, buzzer corner, seating area) and all kept the layout and the readable signs at preview size; (3) prompt in blocks: GOAL, REFERENCES, WARDROBE, SCENE AND FEEL, one block per shot with its seconds, SOUND, STYLE AND CONTINUITY; (4) the son's marker is 160 cm. Then Samer asked for 30 seconds visiting every area: `family_scene.py` is now 30 s, six shots (walk up, door, photobooth and post cards, star, buzzer and TV, outdoor seating), 864x486, 5 samples (about 45 minutes on CPU); `looks` / `points` / `hops` are lists of time windows. Run cost: 32,400 credits (30 s, 1080p). Result, seen in frames only: real-looking market, booth and people, all six areas in order, camera as in the Blender clip; the method works. Still weak: oun again looks about 10 and short, the father is still standing at the end (the others sit), marks and faces not checked at 100%, sound not heard. **Samer's verdict: "the result is excellent"** — keep this method.
- Not built yet: ribbons / gift boxes / ornaments on the outside as real 3D pieces (they are flat prints on the walls now), the photobooth niche and the Area 1 shelves as real depth, clean artwork (the PDF artwork carries dimension labels).

**Product decision (17 Nov 2026, Samer): Blender runs on his Mac (route b), the tool is for the whole team.** Built as phase 1:
- `booth/bridge/` = Cloudflare Worker "bae-booth-bridge" (copy for the Deploy button: `bae-image-studio-web/booth-bridge/`). One Durable Object (SQLite): devices, jobs, files in 512 KB chunks. The studio reaches it as the claude.ai connector **"BAE 3D Booth"** (`/mcp/<token>`; tools `booth_status`, `booth_device`, `booth_upload`, `booth_submit`, `booth_jobs`, `booth_job`, `booth_download`, `booth_cancel`); the Mac uses plain HTTPS `/d/pair|hello|next|file|progress|out|done`. No secret is typed: the worker makes its token and shows the connector address on its home page only until the connector is first used; afterwards the studio's Team box shows it. `/addon.zip` serves the add-on with the bridge address baked in (`config.json`).
- `booth/bridge/addon/bae_booth/` = Blender add-on (legacy add-on, Blender 4.2+): sidebar panel "BAE Booth", pairs with a 6-digit code approved in the studio, polls every ~4 s in a thread, runs each job in a separate background Blender (`blender -b --factory-startup --python engine/run_job.py -- <job_dir>`), Metal GPU via `use_gpu()`, forwards `@@PROGRESS` lines, uploads results, honours cancel, keeps the Mac awake with `caffeinate`. Needs Blender's Online Access on (panel button). **The live engine is `addon/bae_booth/engine/build_booth.py`** (the proof's `booth/build_booth.py` is older): missing designs keep the wall colour, `make_cameras()`, `use_gpu()`.
- Studio: home card `openBooth`, section `#booth`, module "BAE 3D Booth (phase 1)" at the end of `app.js` (state `B`, classes `.bo-`): setup steps when the connector is missing, render Mac list (approve the code / remove), "Build a test booth" (built-in `DEMO` spec = the Christmas booth without designs, 2 views 1920x1080 + .blend), progress, previews, PNG download, .blend as a zip (the download list refuses .blend), recent jobs, Team (connector address). Polls every 4 s while something is live, 20 s otherwise. The page's capability declaration (saved in `dev/capabilities.json`) gained the "BAE 3D Booth" server.
- Tested: the worker in `wrangler dev` (real workerd) + the client with Blender 4.5 `bpy` as the "Mac" + Playwright driving the real page through the real bridge: pair → approve → test build → previews → PNG, .blend zip downloads; cancel kills Blender; the add-on installs and enables in Blender 4.5. On CPU here a test build took 211 s. **Never tested for real:** the Deploy button, the worker on Cloudflare, the connector inside claude.ai, the add-on UI on a Mac, Metal rendering, caffeinate.
- **Phase 2 built (18 Nov 2026): booth projects, "talk first" (Samer: discuss the ideas before anything is built).** Module "BAE 3D Booth (phase 2)" at the end of `app.js` (state `T`, classes `.bow-`, container `#boWork` above the phase 1 cards; phase 1 exposes `window.__bo={B,refresh,bcall,fetchFile,saveB,draw}`). Start: "I have a floor plan" or "I only have a space". Steps: **Talk** (chat with the booth designer: `talk()` sends the attached PDF pages (pdf.js 3.11.174 from cdnjs, worker script loaded on the main thread) and photos as images; it asks max 2 questions, proposes 2-3 ideas with zone sketches, keeps `summary`, sets `ready` only when Samer chose a direction; "Make the plan" appears only then) → **Plan** (`makePlan()` writes the spec with `SPEC_DOC` = the build_booth schema; `topSVG()` draws it from above, numbers only main pieces; notes; `editPlan()` changes it by talking) → **Designs** (`slotsOf()` = one card per printed surface with its real size; Upload, "Find it in my files" = `findInPdf()`: Claude gives the picture and box, the page crops the 2400 px page render; Plain colour) → **Build** (`build()` uploads each design through `booth_upload`, submits all 6 views + spec cameras at 1920×1080, 128 samples, .blend; previews, PNG, .blend zip, "Download everything" zip with `placement_sheet.png` from `sheetPNG()` and `booth_spec.json`). Projects in `data/users/<uid>/booths/p/<id>` + localStorage `bae_booth_projects`; files in the assets store (`keep()`), or this session only when the viewer cannot upload assets.
- Tested with Playwright: the real page, the real local bridge and the Blender 4.5 client, Claude MOCKED (canned answers), the real Christmas PDF read by pdf.js (10 pages sent), front design found and cropped from page 2, every other design uploaded, built, downloaded; desktop and phone width. **Not tested for real:** how well the real Claude reads a plan, proposes ideas and writes a correct spec (the hardest part), the assets upload inside claude.ai, the space-only path end to end.
- **First real phase-2 build failed (18 Nov 2026, "Independence Day Booth", every design set to Plain colour, Blender 5.3).** Real cause (found in the job log, hidden under "missing artwork" lines): Claude wrote "art" panels with `from`/`to` but no `x`, and the engine read `p["x"]` for every piece, so one panel stopped the whole build. Fixed on both sides: the studio's `fixSpec()` (run by `validSpec` on every plan and edit) repairs numbers, gives art panels their position, turns unknown types into boxes or leaves them out with a note; `forBuild()` sends only the designs that were given, a plain-colour panel becomes a thin coloured box, plain walls are brand orange. This alone works with add-on 1.0.1 (tested with the 1.0.1 engine in Blender 4.5). Add-on 1.0.2: the engine skips a broken wall or piece and prints `skipped:` instead of stopping, a panel with no design is a plain panel, `run_job` prints `@@ERROR <reason>` and the client puts that first in the error (no more missing-artwork lines). Not yet seen on Samer's Mac.
- **Live in Blender (19 Nov 2026, add-on 1.1.0 + bridge 1.1.0). Samer: "why isn't the MCP built in, so I work live?"** The booth is now built inside the Blender he has open, and the two stay in step:
  - `engine/live.py`: every floor / wall / piece becomes ONE object (parts joined, origin at the bottom centre of the footprint) tagged `bae_key` ("wall:Front"), `bae_hash` (its spec + the design file's content), `bae_anchors` (points whose new place gives the new numbers) and `bae_mat`. `apply_steps()` is a generator: only changed elements are rebuilt, removed ones deleted; the add-on runs it a few steps per timer tick (`Runner.step()` from `_live_tick`), so the booth grows piece by piece and Blender never freezes. Scene "BAE Booth" (his own scenes are never touched), material view, framed the first time. `watch()` (every 0.8 s) writes hand changes back into the spec: move / turn / scale of a box (`rot` in degrees around its centre, new optional spec field), x / y of tables, cylinders and rings, from / to of walls and art panels, deletions; then raises `bae_rev`. `snapshot()` = OpenGL render of the viewport (or a named camera), falls back to a quick Cycles render. **The background render uses the same assembler** (`run_job.py` → `live.assemble`), so the final pictures are exactly what he saw live.
  - Client: background renders run in their own thread; Live polls every second (`/d/next?live=1` while rendering), `/d/live` heartbeat with rev / title / spec (spec only when it changed) and accumulated hand changes; live jobs go to Blender's main thread through `live_q` and wait for the runner (designs stay in `bae_booth/live/files`, so only new designs are sent). Panel: Live box (status, Show the booth, Live off).
  - Bridge 1.1.0: `booth_submit kind:"live"` with `options.op` apply / snapshot / scene / focus, `device_id`, waits up to 25 s and returns the finished job (picture = output `live_view.png`); live jobs go first, never wait behind a render, fail after 40 s if no Blender picks them up, are hidden from `booth_jobs` and deleted after a day. `booth_status` → `devices[].live` = {on, rev, title, spec, changes:[{rev, at, names}]}. Same 8 tool names, so the page's capability declaration did not change. Works from the claude.ai chat too (the tool descriptions explain Live).
  - Studio: "Live in Blender" card on Plan / Designs / Build (`liveHTML`, state `T.lv`): Build it live → `liveApply()` (changed designs only; `liveSpec()` gives Blender only the designs this booth has: a surface without one keeps its slot as `art_slot` / `art_inside_slot` and is plain, so a design left on the Mac by another booth can never show; `fromLive()` restores the slots when Blender's spec comes back; plain walls orange) → picture; every plan change (talk, Make the plan, a design, Plain colour) is sent at once; `livePoll()` every 3 s takes Blender's spec when its rev moved, notes "In Blender you changed: …" in the plan chat and refreshes the picture. Opening a booth that Blender already holds with newer hand changes takes Blender's version first.
  - Tested here: real Blender 4.5 `bpy` as the Mac (add-on client + runner), real local bridge (`wrangler dev`), Playwright on the real page, Claude mocked: first build, a talk edit (only the TV rebuilt, 0.4 s in Blender), a hand move and a deletion coming back into the plan, a new design, a render running while Live keeps answering, the final render through the new assembler (same look as before). **Not tested:** on his Mac (Blender 5.3 UI, the viewport snapshot, the timer feel), the bridge 1.1 on Cloudflare (needs a push to his `bae-booth-bridge` repo), real Claude.
- Next: phase 3 the film from a built booth (the method in "Second run" above), phase 4 special pieces (2D design to 3D model) and ready scenes.

**Agreed plan.** 0 proof on one real booth (this) → 1 the builder (plan + designs → 3D, renders, placement sheet) → 2 the app in the studio, three steps: Plan, Designs, Result, plus a chat ("move the phone to the right corner") → 3 special pieces from a 2D design to a 3D model placed by numbers → 4 Seedance video from the Blender reference. Exact stills and the builder's sheet come from Blender (official artwork on the walls, the logo is never redrawn); Seedance is for people and motion, and it may distort marks: test for real before promising.
**Open decision:** how the studio reaches Blender on his Mac: (a) the official connector with the studio opened in the Claude app, or (b) our own small Blender add-on + a cloud bridge (like BAE Gemini Eye) so it works from any device. Or (c), seen in the proof: build in the cloud with `bpy` and hand him the `.blend`, no Blender needed for the first result.


## 15. Reels storage (v154, 17 Nov 2026) — why Samer lost a day of work, and the fix

**What happened.** The artifact database refuses any document over **262,144 bytes (UTF-8)**. A reel was one document (`data/users/<uid>/reels/reel_<id>`), and 90% of it was the Director chat. His reel «فواتير أبو يزن» reached 259 KB on 15 Nov; from then on every account save from his laptop was refused, and the studio only said "Saved in this browser" in small grey text. He worked two more days (Omar became Odai, 8 shots became 14), all of it only in the laptop browser's localStorage. On 17 Nov he opened the reel on another device, got the 15 Nov version, and it saved over the account with a newer time. With the old code, opening the reel on the laptop again would have loaded that older-content, newer-time account copy and overwritten the only good copy.

**The rules now (all in `app.js`, search "where a reel lives"):**
- A reel is two documents: `reel_<id>` (everything except the chat, `chat:[]`, `chatDoc:1`) and `reelchat_<id>` (the chat). `rlFitChat` trims the account's chat copy to `RL_MAX` (235,000 b) by dropping the details of older replies first, then the oldest messages; this browser always keeps the whole chat. `rlFitMain` throws `too_big` instead of saving half a reel.
- `RL_SYNC` (localStorage `bae_reels_v3_sync`) remembers, per reel, the account time this device last agreed with. `rlTwo(id,l,c)` decides: same time → nothing; account not newer than our last sync → this device leads; account newer and we have unsynced work, or no sync record at all → **"ask"**.
- "ask" opens `rlChoose`: both versions side by side with facts (time, scene titles, cast, chat count, last message). He picks one; **the other is always kept as its own reel** ("· account version" / "· this device's version"). Nothing is overwritten before he chooses, and "Decide later" changes nothing.
- `rlPush` reads the account's time before writing; if another device saved in between it throws `conflict` and the bar `#rlSyncBar` offers "Keep my version / Open the other version / Download a backup". A failed save shows the same loud bar with "Try again". The small line under the title says "NOT in your account" in the warning colour.
- Library: a card with two versions says so and hides Delete; **Backup** downloads the reel as a JSON file (both versions when they differ); "Restore a backup file" imports one as a new reel.
- Never again: a save that fails must be loud, and a load must never replace local work the account has not seen.

**Test:** `node dev/reels-storage-test.js` (three browser contexts as devices, a mocked account that refuses documents over the real limit). Every check passes. **Not tested for real**: only Samer's laptop holds the real case.

**Still open:** the account's chat copy is trimmed when the chat alone passes 235 KB (the device keeps all of it). If he wants the full chat on every device, split the chat over several `reelchat_<id>_<n>` documents.

## 16. Talking (v165, 19 Nov 2026) — Photography is one conversation

**What Samer asked.** Hide everything on Photography and keep one thing: a chat ("Talking") that is Claude itself, not a form. He talks, drops pictures (his layout, a scene he likes, a camera angle, a colour grade), each picture is used for ONE thing and reaches Magnific at its ORIGINAL size; before the picture is made he gets a summary (scene, person, clothes, place, references, colours, style, size, how many). It must be easy enough to teach people in their forties and fifties. The rule "never show the product / a phone / a phone screen" is removed.

**How it is built (the "Art Director" module in `app.js`, search "Talking").**
- `body.talk` (Photography mode) hides `#optCard`, `#refCard`, `#advWrap`, the written brief (`.pc-classic`) and the result card `#s3`. `All tools` (`data-pc="more"`, class `talk-more`) shows them again; `talk-res` shows `#s3` once a result exists; `talk-tour` while the tutorial runs. Icons mode is untouched.
- `PC.refs` = the designer's pictures `{file (original), blob (1600 px JPEG for Claude only), url, role, what, id}`. `ROLES`: composition, angle, grade, light, place, style, outfit, remake, layout, look. Claude sets the role from the talk (`"pictures":[{n,role,what}]`), the designer can change it in the select under each picture. `setRole()` owns the side effects: `remake` builds `PC.src` (the old remake mode, Keep / Change per line), `layout` sets `PC.layout` and is never sent to Magnific.
- `turn()` takes up to 4 pictures a message, 8 in all; a failed answer removes the pictures it had added. Turns with pictures use `modelTier:"complex"`.
- `create()`: no pictures in use → the studio's own pipeline (`createAll`), repeated `PC.n` times. Pictures in use or a remake → `shoot()`: uploads every picture with `rlUploadMag(R.file)` (the original file, once; the id is remembered), then Claude writes ONE Seedream prompt that names each tag with the one thing taken from it and what is NOT copied (`ROLE_USE`), then `rlImage` × `PC.n`. Order of references: remake source, the designer's pictures, character sheets, outfit sheet.
- Ready: Claude returns `recap` (rows in the designer's language); the studio adds size and count. The brief is written at that moment (`apply()`), so "send it to the brief" is the same step. The six fields live in a closed "Change a detail by hand".
- New strings are in `UX_AR` (Arabic UI when the studio language is Arabic).
- The product rule was also removed from the Layout advisor's two prompts.

**Tested.** One REAL generation on his Magnific (60 credits, creation `Lw86oNjswO`): two of his uploads, one named "composition only", one "colour grading only", a new person and place in the text. The result took the seated pose and framing from the first, the cream and brown palette from the second, and copied neither face. `node dev/talking-test.js`: 41 checks over five scripted journeys (a 52-year-old who only taps, Samer's own layout + three pictures story, pictures with no words, a remake, too many pictures + a failed answer + phone width), mocked Claude and Magnific; every picture reaches the upload call byte for byte.
**Not tested for real:** Claude's actual answers to this prompt, the whole flow inside claude.ai, three pictures at once on Seedream, and no real person of any age has used it. The "five ages" are scripted journeys, not people.

**v166.** A character named in the card is matched by ANY of its aliases as a whole word (`nameAt`, `charAliases`): Salma's sheet was dropped because her library name is "Salma / سلمى" and only the full string was matched; "oun" also matched inside "young" in the classic brief. A character written with @ that is not in the library stops `shoot()` before anything is spent.
**v167: New chat / Recent.** Every talk is saved 0.9 s after it changes (`tkSave`): the words, the summary card, small JPEG copies of the pictures and results, and each picture's Magnific id once it was uploaded. Local list `bae_talk_chats` (20 chats) plus, when the account is there, one document `talk_<id>` in `data/users/<uid>` trimmed under 235 KB (same 256 KB limit as reels). `Recent` lists them (account and device merged, newest first), says where they are saved, opens or deletes one. Original files are NOT kept: a restored picture without a Magnific id shows "Add it again to use it" and is left out of `uses()`. A chat touched in the last 30 minutes is restored on load, so a new studio version does not wipe the talk he is in. Account saving is tested only with the device path (the test has no database).
**v168: one call for N images, and the Claude model.** Talking's count is 1, 2, 4 or 8 (`NS`, `nFit`). N images are ONE `images_generate` call with its count set (`magCount`; never name a function `setCount`, the classic stepper owns that name). `rlImage({count})` returns `all:[{id,web}]`; `generate()` takes the batch branch only when `S.batch` is on (Talking sets it and puts `#count` back). If Magnific returns fewer creations than asked, the missing ones are asked for once more. Each id is waited for on its own (`waitFor([id])`), because `waitFor` returns as soon as any one is done. The classic page still makes one call per image.
`Claude model` (under the chat): Auto, Fable 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5, kept in `bae_talk_model`, sent as `model` on the chat turn and on the prompt writer. The page can only ask: `probe()` makes a tiny `sample()` call and shows `modelApplied` ("Answering now: …", or "That model is not available here"). The shape of `modelApplied` is assumed (a string, or an object with model / name / id) and has never been seen for real.

**v169: the character library on Magnific.** Characters tab (All tools → Browse all → Characters, editors only): "Send all to Magnific" (`clMagAll`) uploads every sheet that has no Magnific identifier yet, at full size, as `character-<name>`, keeps the identifiers in `bae_user_magids` (same map `magId` reads) and writes the list to the account doc `data/users/<uid>/magchars` as `{map:{<docId>:{name,cat,mag}},n,t}`. A sheet that fails is counted and said; pressing again sends only what is missing. Uploads cost no credits. Test: `dev/clmag-test.js` (10 checks).

**v170: BAE References replace the three old sets.** The Mari Juliano (`r0xx`), Youth campaign (`yt0x`) and guideline (`bae_b*`) photos are gone from the code and from `refs/`; only the two studio masters (`st_minimal_01/02`) stay in set `bae`. The tab "BAE References" (still `data-tab="bae"`) shows the team's own photos: module `BL` (`blLoad`, `blSync`, `blImport`, `blBlob`, `blDescribe`), docs `brefs/<id>` `{d, thumb, asset, mime, px, mag, at}` (rule: read view, write admin), refs `bl_<id>` with `bl:true`. Editors press "Sync from Magnific": it lists the Magnific folder `BL_FOLDER` ("bae reference"), brings in what is new, removes what left the folder, and never deletes on an empty answer. LIMIT: the page can only read an image from Magnific through `creations_read`, so the stored team copy is about 1024 px; the owner's renders use the 2K original because the Magnific identifier is kept in `bae_user_magids`. `PICK_LOCATION`/`PICK_BOLD` are filled with the first four library photos; auto-pick chooses from the library by description. Test: `dev/blib-test.js` (15 checks).

**v172: the Talking summary is a control panel.** In the last ready message the recap rows are tappable (`RK` maps row order to a kind; needs the 7 rows in the prompt's order): people and clothes and style say "Choose", camera/light and colours say "Take from a photo"; Size is a list (`#pcAsp2`, mirrors `#aspect`) and How many is 1-2-4-8 (`data-pcnn`). `PC.pick={kind,sel,of,what}`, `pickHTML()`, `pickPhoto(id)`. Every choice is sent to Claude as ONE sentence through `turn()` so card and recap stay coherent; a BAE Reference photo goes in as a picture of the chat (`PC.refs`) with its role, and for the owner its Magnific identifier is set on the ref so it is not uploaded again. Test: `dev/recap-test.js` (16 checks). v171 was only the `brefs` rule.


## v173: BAE References are baked in
- The 34 BAE reference photos ship with the studio as small files `refs/br01.jpg`..`br34.jpg` (list `BREFS` in app.js: id, Magnific id of the 2K original, description). No Sync button, no `brefs` collection in use any more.
- When the studio OWNER renders, the Magnific id of the 2K original is used (`BR_OWNER`, seeded into `S.magIds`). Teammates upload the small copy. To add a photo: add a row to `BREFS` and the file.
- Talking clothes picker shows outfit pictures per person (`ofFor(r)` filters by category), not a name list.
- `refs/br*.jpg` stay out of the public repo.

## v174: Talking choices wait, one "Save and send"
- Choices from the summary rows (people, clothes, camera/light photo, colours photo, style) are stored in `PC.pend` and shown in the row; nothing goes to Claude until "Save and send" (`pendSend()`), which sends ONE message (plus up to two reference photos). While choices wait, the Create buttons are hidden. "Discard" drops them.

## v175: Photography / Talking is responsive
- One mobile-first block at the end of the main `<style>` ("v175"), breakpoints 480 / 600 / 768 / 1024. Picker tiles are `.pc-pc > .pc-th > img` (4:3 photos, 1:1 people, 16:9 outfits) with a check badge; the recap button class is `.pc-rb` (`.pc-rc` belongs to the Recent list).
- `node dev/resp-test.js` measures 320–1920 px: sideways scroll, elements outside the screen, stretched or thin images, squeezed text, overlapping buttons, tap targets under 44 px on phones. Run it before every publish that touches layout.

## v176: the image on screen belongs to one chat
- Bug: after "New chat" a change request edited the previous chat's image, because `cur()` read the studio's global result card. Now `stale()` records the images that exist when a chat starts (New chat, delete, opening a Recent chat) and `cur()` ignores them. Test: `node dev/newchat-test.js`.
- Known limit: opening an older chat from Recent cannot continue editing its old image; the next request builds a new photo.

## v177: chats are independent, fixed summary, one photo gives several things, brand rules, phone scrolling
- Recent: opening a chat closes the list and redraws that chat. Each result message stores `res.ids`, `res.k`, `res.p` (Magnific ids, model key, prompt); `tkLoad` puts that chat's last image back in the result card, so "change this" works on the chat's own image after reopening or a reload (this replaces the v176 limit).
- Summary: `sumHTML()` draws ONE fixed panel `#pcSum` under the messages from the last recap; it stays after results ("Create again"). Messages no longer carry the recap or the Create row. Scene and place have an "Edit" text box (`pend.txt`).
- One reference photo, several takes: `pend.photos=[{id,takes}]` with takes from composition / angle / light / grade. After sending, the picture gets `role` + `also` + `lock` (Claude may not re-role a locked picture). `roleUse(R)` / `roleName(R)` build the combined instruction for the image writer.
- Brand rules (chat prompt + both image writers): "خليك حاضر / be present" = show the lived moment, never the product or the transaction (product only when asked in words); the place is always modern, premium, minimal, tidy and the Jordanian character comes from the people; default medium long shot, people in the middle third, calm left and right thirds for a headline, people 3–4 m in front of a plain background; default 16:9 2K; garments never carry a logo even if the outfit sheet shows one.
- Real tests (Seedream 5.5, 3 images, 240 credits, seen at 1024 px): centring, medium distance, clean sides and a modern room work. Visible background blur only appears when there are objects behind the people; with a plain wall there is nothing to blur. The small emblem on the of_20 half-zip still appears: the sheet itself must be replaced with a clean one.
- Phones and tablets (`max-width:1023px` or no hover): one scroll only (the page); the message box sticks to the bottom (`body.talk .hero{overflow:clip}` makes that possible). Under 768 px pickers open as a full-screen sheet with their own scroll (`html.pc-sheet` locks the page). `dev/resp-test.js` checks all of this; `dev/newchat-test.js` checks chat independence.

## v178: a change request waits, colours and light travel as words, compact phone message box
- `do:"edit"` no longer renders by itself. Claude returns the updated card + recap (the summary changes) and the message shows "Change this image" (`m.editAsk`, `data-pcedit`); or he changes the summary and creates again. Samer asked for this: he wanted the text and scene changed, not a surprise image.
- A reference chosen for COLOURS or LIGHT is not sent to Magnific. `refWords(R)` has Claude describe only the colour grading / light (no objects, people or places) and `shoot()` puts those words in the writer prompt ("MATCH THESE, GIVEN AS WORDS"). A photo that also gives camera angle or scene is still sent, named for those only. If Claude cannot read the image the old route (photo sent with its role) is used. Real test (50 credits, seen at 512 px): the grade and hard low sun of br06 moved to a kitchen scene with nothing of the terrace or the man.
- Chat rule: exactly the people asked for; never add a person.
- Phones: the message box is one row ([+] [text] [round send]); suggestion chips are full-width (`.pc-chips.sug`), result buttons are back in rows.

## v179: an icon asked for in Talking is made by the Icons pipeline
- Bug: Samer asked the chat for a 3D icon of a car and got four photo-style renders (Seedream, studio wall), because Talking only knew the photo pipeline. Now Claude answers `"kind":"icon"` (kept in `PC.card.kind`); `modeFor()` puts the studio in Icons mode while the chat stays visible (`sync()` no longer hides it for an icon chat), `apply()` writes the icon idea as the brief, `create()` skips `shoot()` and "4 angles". `"kind":"photo"`, New chat and opening a photo chat switch back. Test: `node dev/icon-chat-test.js`. Not tested with real Claude or a real icon render.

## v180 (20 Nov 2026): the "team day" — simplicity, level, motion, quality checks
Samer asked for a team of experts (UI/UX, user research, frontend, backend/search, AI, product, QA, DevOps) led by "Zack" to review the whole site and ship an improved version without asking him. Eight read-only review agents reported; the decisions are in the PDF report `BAE-Studio-v180-report.pdf` that was sent to him.
- **Home**: one lead card "Make a picture" (Talking), the other eight apps under "More tools" with plain captions (no model names), language switch (AR / EN; Arabic by default on an Arabic device), level question (Guide me / I know my work), version label `v180` + "Copy health report". Ids and handlers of the nine entries are unchanged.
- **Language / level are global**: `uxShell()` (next to `uxApply`) sets `dir`, translates home, header, setup, the chat and the tour, and marks `body[data-level]`. Keys: `bae_ui_lang2`, `bae_ui_level` (simple | pro). Event `bae:ui` redraws the chat. Guided hides All tools, Claude model and the by-hand card; the switch "Guided | Expert" is in the chat foot.
- **Prompt (ask())**: `LEVEL()` paragraph (first-timer: one question per turn with chips; professional: trade terms, straight to ready), `BANK` block (Deep Clarity, the two pillars, "be present", the 5-step path from a banking subject to a lived moment; states that product facts are NOT known), the 34 reference photos by description with `"refs":[ids]` (kept in `PC.look`, sent instead of the fixed four), every Talking call on `modelTier:"complex"`.
- **Rule parity (Noor's finding)**: the classic writer's `STORY_RULE` used to ORDER a counterpart ("a cashier or sales associate… never a missing counterpart") and the shop's products. It is now the people-and-moment lock. This was the likeliest cause of the second person Samer got. Not yet seen on a real render through the studio.
- **After-render check**: `inspect(m)` runs after every result (photos, not icons): Claude looks at a ≤1568 px copy and returns per-image verdict use / fix / redo, problems, a plain sentence and what it could not check (`m.qc`). The UI says so honestly and offers "Fix this" (a press → `doEdit`). Nothing renders by itself.
- **Motion**: only what is new moves (`PC._seen`, `.pc-in`), fill mode is always `backwards` (a filled transform on `#pcSum` traps the fixed sheet), changed summary rows flash (`li[data-v]` → `.chg`), pictures fade in when loaded, skeleton tiles while rendering (`PC.mk`), press feedback, home → app settle. `prefers-reduced-motion` turns all of it off. `draw()` rebuilds `#pcMsgs` only when its HTML changed (`PC._mh`), so a picker tap no longer re-creates every picture, and the scroll no longer jumps.
- **Bugs fixed**: `data-pcedit` was used by two handlers, so "Change a detail by hand" was dead since v178 (the chat button is now `data-pcchg`); a failed "Save and send" lost the choices; Enter while thinking erased the text; summary buttons went by row position (rows now carry `id`); the Colours row inherited the Camera row's photo; a picker survived New chat / tab change and could leave the page locked; the sheet sat under the header at 641–767 px; a failed writing step rendered the PREVIOUS prompt (credits on the wrong scene); one failed thumbnail dropped a result's ids; the save read `PC.id` after its awaits; colour words (`words`, `lib`) of a reference were not saved; the account copy now shrinks pictures before it drops a result.
- **Release tools**: `dev/preflight.sh` (Sami) = syntax, assets, capability list, every test, sizes, public-copy leak check; prints PREFLIGHT PASS/FAIL. `APP_VER` in app.js must match the commit subject `(vN)`. `health()` keeps the last 200 errors in localStorage (`bae_health`, no prompts, names or ids). Tests added: `dev/v180-test.js` (47 checks). `dev/walk.js` takes review screenshots.
- **Deferred on purpose**: a second "review" call on every chat answer and a pre-generation "gate" with automatic repair (Noor a, b: need real-Claude trials first); a retrieval index / Recent search / bank knowledge cards in `brain` (Tariq); expert inline controls and variation sets (Rami); whole-row summary redesign and one button system (Lina); lazy building of the Animation and gradient grids (Sami); conflict handling between two devices for chats (Tariq 2).
- **Needs Samer**: the bank table (per subject: the worry it removes, who lives it, 2–3 lived moments, what never to show). Until then Claude asks instead of stating product facts.
- **Not tested for real**: anything with real Claude or real Magnific, and no real phone. All 8 reviewers and all tests used the mocked runtime.
## v183 (21 Nov 2026): brand page in tabs, precise gradients, colour sets, Light and Dark
Samer approved the expert meeting's plan ("كل اشي تمام"): improve the gradient's point placement and size precision, build a colour system ready for his new gradient colours without changing today's colours, and ship all versions. Published once as v183 (v181 + v182 + v183).
- **v181 Brand identity page** (`draw()` in the brand IIFE): three tabs `G.tab` = guide / make / files ("Guide", "Make", "Downloads"), a quick-actions row (`data-biq`: copy all colours, post background, frame, official shapes, logo files, .ase), section bar with scroll-spy (`spy()`), concept card last with ink text. Only the Make tab paints the gradient stage (the page opens in ~30 ms instead of freezing). Downloads = palette files, logo symbol SVGs, the six official PNGs (`GRADS`, moved from the old `#gallery`), team shelves. `window.baeBrandOpen(tab,anchor)`; the home "Gradient elements" card opens Downloads. Esc closes, focus goes to Home and back to the opener. `on()` picks ink or white text by real contrast ratio. Partial redraws: `redrawSec()` for RGB/CMYK and grid size, `drawShelves()` for uploads. Tables become cards under 600 px; tap targets 44 px on touch. Test: `dev/brand-tabs-test.js`.
- **v182 Gradient precision**: every shape setting has a slider and a number field (`FIELD`: X, Y in % of the gradient area with 0.1 steps, size, rotation, stretch, blur, fill angle, strength). Arrow keys move a handle 0.1% (Shift 1%). "Snap to grid" draws the brand 12×12 grid inside the 7% margin and snaps a dragged centre to it, the margin, the edges and the centre (Alt drags free). Undo / Redo (buttons and Ctrl/⌘+Z, Shift+Z, Y), 100 steps (`HS`, `hist()`). The lozenge geometry was measured against the official PNGs (2.00:1 and 1:2.00) and already matched, so it was NOT changed.
- **v182 Colour sets** (`PAL`, `palNow()`, `pc()`, `toneOf()`, `palIt()`): "Brand colours · official" never changes. A custom set swaps any brand colour (list `PAL_SRC`, grouped Orange / Stone / Dark) for another HEX everywhere the gradient uses it: shapes, base, preview, thumbnails, PNG, SVG, Figma, Illustrator, the official-set ZIP. File names get the set's name. Saved in localStorage `bae_grad_pal_v1` and, signed in, in `data/users/<uid>/gradpal`. Export / Import as `.bae-colours.json` (only brand source colours and valid HEX are accepted). When Samer sends his new gradient colours: make a set from them (or add them to `PAL.list` as a default set) — the shapes stay the same. Brand output is byte-identical to v181 (tested). Test: `dev/grad-precision-test.js` (set `OLD_APP` to a v181 app.js for the identity check).
- **v183 Light / Dark**: switch `.top-theme` in the studio header and on the landing (cycles System → Light → Dark, `localStorage bae_theme`), inline head script sets `html[data-theme]` before the styles (no flash), `meta theme-color` follows. Dark = Ink #19181E ground, surfaces #232228 / #2E2D35, text #ECE8DF, secondary #A9A7B8, accent text #FA6428, primary buttons stay #C13A23 with white. Done by remapping the UI tokens under `html[data-theme="dark"]` plus role tokens (`--on-accent`, `--accent-text`, `--ok-text`, `--hover`, `--alert-*`, `--ok*`, `--glass`) and a short override list for literal colours. Brand swatches, gradients, canvases, logo tiles and every export keep their true colours (tested: SVG and pixels identical in light and dark). Test: `dev/theme-test.js` (contrast ≥ 3:1 for every visible text on home and the brand guide).
