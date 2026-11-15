---
title: BAE Upscale
emoji: 🔶
colorFrom: red
colorTo: yellow
sdk: docker
app_port: 7860
pinned: false
license: apache-2.0
short_description: Faithful photo upscaling with face restoration
---

# BAE Upscale

Bank al Etihad studio's own image upscaler. It runs here, on this Space, in the background: you send a photo, it works, and you get a link to the result.

- **Enlarge:** Real-ESRGAN (BSD-3-Clause).
- **Faces:** GFPGAN v1.4 (Apache-2.0), blended back toward the original so the person stays the same.
- **Sizes:** 2×, 4×, 8×, 10×, 16×.

Free CPU hardware is slow: a small photo takes about a minute, a large one several minutes. Results are kept for 24 hours.

To make it private to your team, add a secret named `BAE_CODE` in the Space settings. The page then asks for that code.
