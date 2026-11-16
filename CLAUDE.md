# BAE Studio — handover for Claude Code

Read this whole file before touching anything. It replaces the memory of a very long working session.

## 1. Who you work for and how to talk to him

- The owner is Samer, a designer at **Bank al Etihad (BAE), Jordan**.
- He writes mostly in **Jordanian Arabic**. Reply in the language he used. Keep replies **short and simple**: what changed, what was tested, what is not tested. No long explanations, no code in the reply unless he asks.
- He judges by the result on screen. When he says something is wrong, he is usually right: study the reference again before defending the work.
- He is not a developer. Never ask him to run commands. Never ask him to paste keys or passwords.
- When he says "study first, do nothing until I say انطلق (go)", write the study and the plan in chat and wait.

## 2. What the product is

"BAE Studio" is one web page with several apps on its home screen. It is published as a **claude.ai artifact**:

`https://claude.ai/artifact/4tomrLrEEaVDTAC3Z3A5h7` (version 132 at the time of writing)

Home cards (`index.html`, ids `openGallery`, `openReels`, `openAnim`, `openUpscale`, `openBrand`):

| App | Section id | What it does |
|---|---|---|
| Photography + Icons | `#setup`, `#gallery` | Brief → Claude writes the prompt under the BAE rules → Magnific renders (Seedream 5.5 for photos, GPT image model for 3D icons) |
| Reels | `#reels` | Idea → script → characters → locations → scenes → Seedance 2.5 video, with a "Director" chat and a learning "brain" |
| Animation templates | `#anim` | After Effects template downloads |
| BAE Upscale | `#upscale` | The studio's own free upscaler (runs in the browser) |
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
refs/        photography references, studio references (st_minimal_01/02), outfit sheets (of_01..of_15) + _t.jpg thumbs
grad/        the six OFFICIAL gradient elements: BAE_gradient_{circle_1,circle_2,lozenge_h_1,lozenge_h_2,lozenge_v_1,lozenge_v_2}.png + _preview.webp
up/          BAE Upscale engine: tf.min.js, x2/ and x4/ model weights as base64 text parts (net.json, w0.txt, w1.txt)
anim/        animation template previews (v/*.mp4, p/*.jpg)
```

### app.js map (line numbers drift; search for the header comments)

| Around line | Block |
|---|---|
| 7 | Rich fields and the `@` picker: `AT`, `AT_SHOTS` (20 camera angles), `AT_OUTFITS` (15 outfit sheets), `atMake`, `atVal/atRead/atWrite`. Chips serialise as `@Name`, `[shot: Name]`, `[outfit: Name]` |
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
  - **Magnafic** (Magnific): generation, upload, wait, spaces, upscale, etc. (35 tools declared)
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
- Outfit sheets are unbranded (no logos).
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

- **Illustrator mesh (v130, first test).** Samer wants ONE gradient mesh with mesh points, not shapes ("مين حكالك بدي Shapes"). `tplMesh` samples the colour field on a grid (Few 5 / Medium 8 / Many 12 patches on the long side) and writes a PDF patch mesh (shading type 6) saved as `_mesh.pdf` (the artifact download allowlist refuses `.ai`: the first try did nothing on click; allowed: gif png jpg jpeg webp mp4 webm mov txt json md docx pptx epub csv ttf html svg pdf xlsx zip fig). Backgrounds, frames and dark only; circle / lozenge are not done (their soft edge needs transparency). The PDF renders correctly (checked with poppler). **Result (Samer tested): Illustrator opens it as "Non-Native Art", not a mesh. The button is hidden (`false&&` in `tplDraw`).** Next route: write Illustrator's own native mesh syntax (legacy "Illustrator 8" text format). Samer was asked for a sample: a 2×2 gradient mesh saved as Illustrator 8, to learn the syntax from. His connector "BAE Layout Fixer for Illustrator" was switched on in his UI but its tools never reached the session; if the file route fails, build the mesh through that connector.

Tested with Playwright from disk only (rendering, editor, every export, both ZIPs, SVG rendered next to the canvas). Never tested for real: inside claude.ai, the paste in Figma, "Ask for a file" with real Claude, Safari / iPhone.

## 10. Other things waiting on Samer

- Real tests he has not reported back on: soft-background lock on location, Recent history sync, edit fidelity (identity kept), the 4-angles button, per-reference use, the advisor on a real layout.
- Hugging Face Space for BAE Upscale (he creates it, sends the URL).
- His Mac's RAM for the local upscaler plan.

## 11. Ideas already offered and not yet built (Layout advisor)

4. Three directions with a quick thumbnail each (spends Magnific credits — ask first).
5. Put the generated image back inside the layout to preview the final result.
6. A pre-generation check that the prompt follows the house rules.
