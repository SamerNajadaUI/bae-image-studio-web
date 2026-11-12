# BAE Gemini Eye

A tiny remote MCP server that lets Claude **watch videos through Google Gemini**, both the moving picture and the soundtrack.

BAE Studio's Reels production calls it after each shot is filmed. Gemini reviews the clip against the shot's brief, and the Director fixes the prompt and remembers the mistake.

## Deploy (about 5 minutes)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/SamerNajadaUI/bae-image-studio-web/tree/main/gemini-eye)

1. Click **Deploy to Cloudflare** and sign in. A free account works.
2. When it asks for the secrets, enter them:
   - `GEMINI_API_KEY`: your key from <https://aistudio.google.com/apikey>.
   - `ACCESS_TOKEN`: any long random text, 20 characters or more. Keep it private, because it is part of your connector URL.
3. When it finishes, copy the worker address, e.g. `https://bae-gemini-eye.<you>.workers.dev`.
4. In claude.ai, open **Settings → Connectors → Add custom connector**:
   - **Name:** `BAE Gemini Eye` (exactly this name, because BAE Studio looks for it).
   - **URL:** `https://bae-gemini-eye.<you>.workers.dev/mcp/<ACCESS_TOKEN>`
5. Open BAE Studio → Reels → a filmed shot → **Review with Gemini**.

To check that the worker is running, open `https://bae-gemini-eye.<you>.workers.dev/health`.

## Tools

- `watch_video({video_url, question, fps?, start_s?, end_s?, json?})`: Gemini watches the video at the given frame rate (default 4 fps) and answers.
- `gemini_status()`: checks the key and the model.

The model is set by the `GEMINI_MODEL` variable (default `gemini-3.8-flash`). Usage is billed to the Google account that owns the key.

## Security

- The key stays in Cloudflare as a secret. It never reaches the page or Claude.
- Requests without the right `ACCESS_TOKEN` in the path get a 404.
- Videos are sent to Google only for the review. Uploaded files expire on Google's side after 48 hours.
