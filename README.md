# BAE Image Studio

Brief in, on-brand 4K photograph out, styled on the Bank al Etihad "Deep Clarity" system.

**Live:** https://samernajadaui.github.io/bae-image-studio-web/

## How it works

1. **Brief.** Write what the photo should show (Arabic or English), or start from an example.
2. **Describe.** Claude reads the brief, an optional image to rebuild and your references against the BAE photography rules.
3. **Prompt.** Claude writes the Nano Banana 2.1 prompt. Locked rules are appended to every prompt: professional photography, clean natural light, centred subject, modern settings, modern wardrobe (no hijab or traditional dress, no orange clothing), retouched skin tone, iPhone 18, IKEA-style decor.
4. **Image.** Google Nano Banana 2.1 renders natively in 4K. Download the PNG.

## Keys

The page runs entirely in the browser. Open **API keys** and add:

- **Google Gemini API key** (required): from https://aistudio.google.com/apikey. Used for `gemini-nano-banana-2.1`.
- **Anthropic API key** (optional): from https://console.anthropic.com/settings/keys. Without it, the prompt is built from the brief and the locked rules.

Keys are saved only in your browser's localStorage and sent only to Google and Anthropic. Usage is billed to the account that owns each key.

## References

This public copy ships **without** reference photos. The BAE guideline photos, the Mari Juliano portfolio and the campaign references are not licensed for public redistribution. Add your own licensed photos under **References → Your references**; they stay in your browser (IndexedDB).

## Files

- `index.html`: layout and styles (BAE palette, single Regular weight, BAE type steps, 7% margins).
- `app.js`: app logic. Inside claude.ai it uses the viewer's Claude account and Magnific connector; anywhere else it uses the Gemini and Anthropic APIs directly.

AI imagery follows BAE guidelines p.117: tactical campaigns, rapid content and concept work, not evergreen hero imagery or real customer stories.
