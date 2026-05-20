# iPad Video Controller - Vercel Hosted Version

This app lets an iPad control video playback on a laptop/second screen.

- Laptop opens `/player.html`
- iPad opens `/controller.html`
- Buttons are loaded from `public/videos.json`
- Commands go through `api/command.js`
- No Socket.IO, local server, Render, or Railway is required

## Files

```text
api/command.js
public/controller.html
public/player.html
public/videos.json
package.json
vercel.json
```

## How to use

Open this on the laptop:

```text
https://your-vercel-site.vercel.app/player.html
```

Open this on the iPad:

```text
https://your-vercel-site.vercel.app/controller.html
```

Click the laptop player screen once before starting. This helps the browser allow playback.

## Editing the video buttons

Open:

```text
public/videos.json
```

Edit the list:

```json
[
  {
    "label": "Intro Video",
    "url": "https://example.com/intro.mp4"
  },
  {
    "label": "Product Video",
    "url": "https://example.com/product.mp4"
  }
]
```

Use direct video links ending in `.mp4` when possible.

## Event setup

1. Open the player link on the laptop.
2. Move that browser window to the second screen.
3. Make it fullscreen.
4. Click the player screen once.
5. Open the controller link on the iPad.
6. Tap a video button on the iPad.

Important: Set the laptop display mode to **Extend**, not **Mirror**.

## Notes

This version is designed for GitHub + Vercel hosting. It avoids WebSockets because this project is not using a persistent custom Node server.

The command relay uses a Vercel API function with temporary in-memory state. Keep the player page open before using the iPad controller.
