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

`https://claude.ai/artifact/4tomrLrEEaVDTAC3Z3A5h7` (version 152 at the time of writing)

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
5. **Done (v137): extras.** Voice (`#pcMic`, shares the dictation capability with Reels through `S.mic`), Compare A / B (`compare()`), three directions (text first; "Render all three" spends 3 images and says so), "See it in the layout" (`inLayout()`: Claude marks the picture area and the boxes to keep on top; a rough preview).

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


## 14. BAE 3D Booth (new, 17 Nov 2026) — proof built, waiting for Samer's verdict

**What Samer wants.** Today the team draws a floor plan, designs every side in 2D, turns each piece into 3D with an image model one at a time, and tells the builder "put it on the right": pieces land in the wrong place. He wants Blender to build the WHOLE booth from the plan, and to use a Blender scene as the reference for Seedance 2.5 with his assets. The steps must stay very simple. He studied Dan Kieft's "Claude + Blender" method (claude-and-blender.vercel.app, allowed in the environment's network): low-poly Blender scene → MP4 as `@video1` (camera, motion and layout only) + character sheet + a realistic still made from a Blender screenshot → Seedance 2.5, Draft first.

**Facts.**
- Samer has a Mac, the Claude app and **Blender 4.5.10 LTS**. The official Blender connector (Blender Lab, April 2026) is said to need Blender 5.1+ (one source, not confirmed): ask him to update before relying on it.
- Blender's own Python runs in this cloud container: `uv venv --python 3.11` then `uv pip install "bpy>=4.5,<4.6"` gives Blender 4.5 LTS, same series as his, so the `.blend` opens on his Mac. Cycles on CPU: a 1920×1080 still takes about a minute, EEVEE is not available here.
- Magnific has `models3d_generate` (image → GLB) for special pieces, and `video_generate` takes `references` of type `video`, `image`, `character`, `product` (the Seedance route).

**The proof (`booth/`).** `christmas_booth.json` is ONE spec in centimetres, measured from the FRONT-LEFT corner (x right, y back): floors, walls (from / to, thickness, openings, artwork seen from outside), pieces. `build_booth.py spec out stills|video|all` builds it (walls with real openings, artwork cut out of his own PDF pages and mapped at real size, tables, stools, glass walls), saves the `.blend`, renders six views and an orbit clip. `sheet.py` draws the contractor's placement sheet from the same spec (every piece numbered with its distance from the left wall and from the front). The textures and his PDF are NOT in the repo (they were cut from "Christams_Floor_Plan.pdf", 10 pages: plan 1000×488 cm + each side and area with dimensions).
- Wall convention: the outside is on the RIGHT of the direction from → to, the artwork's left edge is at `from`, thickness goes inward.
- Found in his document: the Area 1 elevation adds up to 530 cm (160 + 250 + 120) but the booth is 488 deep (plan: 160 + 250 + 76). The artwork was fitted to 488. Tell the team.
- Not built yet: rounded arch corners, ribbons / gift boxes / ornaments as real 3D pieces (they are flat prints on the walls now), the buzzer and star advent areas, the photobooth niche, clean artwork (the PDF artwork carries dimension labels).

**Agreed plan.** 0 proof on one real booth (this) → 1 the builder (plan + designs → 3D, renders, placement sheet) → 2 the app in the studio, three steps: Plan, Designs, Result, plus a chat ("move the phone to the right corner") → 3 special pieces from a 2D design to a 3D model placed by numbers → 4 Seedance video from the Blender reference. Exact stills and the builder's sheet come from Blender (official artwork on the walls, the logo is never redrawn); Seedance is for people and motion, and it may distort marks: test for real before promising.
**Open decision:** how the studio reaches Blender on his Mac: (a) the official connector with the studio opened in the Claude app, or (b) our own small Blender add-on + a cloud bridge (like BAE Gemini Eye) so it works from any device. Or (c), seen in the proof: build in the cloud with `bpy` and hand him the `.blend`, no Blender needed for the first result.

