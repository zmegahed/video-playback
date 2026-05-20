# iPad Video Controller - Online Hosted Version

This app lets an iPad control video playback on a laptop/second screen.

- iPad opens `/controller.html`
- Laptop opens `/player.html`
- Second screen shows only the fullscreen video
- Buttons are loaded from `public/videos.json`

## Files

```text
server.js
package.json
public/controller.html
public/player.html
public/videos.json
```

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

## Local test

Install Node.js LTS, then run:

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000/controller.html
http://localhost:3000/player.html
```

## Hosting on GitHub

1. Create a new GitHub repository.
2. Upload all files from this folder.
3. Deploy the repository to Render or Railway.

GitHub Pages alone will not work for this app because the app uses WebSockets through Socket.IO.

## Deploying to Render

1. Create a Render account.
2. Click **New +**.
3. Choose **Web Service**.
4. Connect your GitHub repository.
5. Use these settings:

```text
Build Command: npm install
Start Command: npm start
```

6. Deploy.
7. Render will give you a public URL.

Use these links:

```text
https://your-app-name.onrender.com/controller.html
https://your-app-name.onrender.com/player.html
```

## Deploying to Railway

1. Create a Railway account.
2. Click **New Project**.
3. Choose **Deploy from GitHub repo**.
4. Select this repository.
5. Railway should detect Node.js automatically.
6. Deploy.
7. Railway will give you a public URL.

Use these links:

```text
https://your-app-name.up.railway.app/controller.html
https://your-app-name.up.railway.app/player.html
```

## Event setup

1. Open the player link on the laptop.
2. Move that browser window to the second screen.
3. Make it fullscreen.
4. Open the controller link on the iPad.
5. Tap a button on the iPad.

Important: Set the laptop display mode to **Extend**, not **Mirror**.

## Notes for non-technical teams

The team should only need two links:

- Controller link for the iPad
- Player link for the laptop

They should not need Terminal after the app is hosted.