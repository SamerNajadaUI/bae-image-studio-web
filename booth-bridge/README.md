# BAE 3D Booth bridge

A small job queue between **BAE Studio** (the 3D Booth page) and the **render Mac** (the Blender add-on).

```
BAE Studio ──(claude.ai connector "BAE 3D Booth")──► bridge (this worker) ◄──(HTTPS)── Blender add-on on the Mac
```

- The studio sends a booth (spec in centimetres + design files) and gets back the renders, small previews and the `.blend`.
- The Mac asks for jobs every few seconds, builds and renders in a **separate background Blender** (Metal GPU), and sends the results back.
- Any number of people can use the studio; jobs wait in the queue while the Mac is off and start when Blender is open on it.

## Deploy (once, about 5 minutes)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/SamerNajadaUI/bae-image-studio-web/tree/main/booth-bridge)

1. Click **Deploy to Cloudflare** and sign in (the free plan is enough). No keys or passwords are asked.
2. Open the worker address it gives you, e.g. `https://bae-booth-bridge.<you>.workers.dev`. The page shows:
   - the **connector address** (shown only until the connector is used the first time), and
   - **Download the Blender add-on** (the add-on already knows this bridge's address).
3. In claude.ai: **Settings → Connectors → Add custom connector**. Name **`BAE 3D Booth`** (exactly), URL = the connector address.
4. On the render Mac: Blender → Edit → Preferences → Add-ons → ⌄ → **Install from Disk** → `bae_booth.zip`.
   Open the sidebar (N) → **BAE Booth**. It shows a 6-digit code.
5. BAE Studio → **BAE 3D Booth** → approve the Mac with that code. Press **Build a test booth**.

Teammates: each adds the connector once with the same address (BAE Studio → 3D Booth → Team shows it).

## On the Mac

- Blender 4.2 or newer (built and tested on 4.5 LTS). Blender's **Online access** must be on; the add-on panel has a button for it.
- While it is taking jobs the add-on keeps the Mac awake (`caffeinate`); turn this off in the add-on's preferences.
- Pause / Take jobs, Jobs folder and Pair again are in the panel. Removing the Mac in the studio makes it pair again.

## Tools (for the studio)

`booth_status`, `booth_device`, `booth_upload`, `booth_submit`, `booth_jobs`, `booth_job`, `booth_download`, `booth_cancel`.
Files travel in 512 KB pieces (base64 in the connector, raw bytes to the Mac). Finished jobs are kept 30 days.

## Security

- The connector address contains a long random token made by the worker itself; without it the connector answers 404.
- A Mac only receives jobs after someone approves its code in the studio. Each Mac has its own secret, kept in Blender's config folder.
- Optional: set an `ACCESS_TOKEN` variable on the worker to choose the token yourself.

## Files

- `src/index.js`: the worker (connector + Mac endpoints + home page + add-on zip), one Durable Object with SQLite.
- `addon/bae_booth/`: the Blender add-on (`__init__.py` panel, `client.py` talks to the bridge) and the engine
  (`engine/build_booth.py` builds the booth from the spec, `engine/run_job.py` runs one job in background Blender).
