# Fl3xPrivateSecurity

A responsive React web app prototype for iOS, Android, and desktop browsers.

## Run locally

1. Open the project folder in VS Code.
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

4. Open the local URL shown by Vite.

### Share on your local network

If your phone or friends are on the same Wi-Fi network, use the network address shown by Vite. For example:

```bash
http://192.168.7.3:5173
```

That lets others open the app from their browser while your computer is running the dev server.

## Deploy to the web

For a public URL your friends can use from anywhere, deploy the app to a hosting service such as Vercel, Netlify, or GitHub Pages.

### Vercel

1. Create a free account at https://vercel.com
2. Connect your GitHub repository containing this project
3. Use the default build settings; Vercel will run:

```bash
npm run build
```

4. After deploy, Vercel gives you a shareable URL like:

```bash
https://fl3x-private-security.vercel.app
```

> Live deployment: https://fl3x-private-security.vercel.app

### Netlify

1. Create a free account at https://app.netlify.com
2. Connect your GitHub repository
3. Set the build command to:

```bash
npm run build
```

4. Set the publish directory to:

```bash
dist
```

5. Netlify gives you a shareable URL when deploy completes.

### GitHub Pages

You can also deploy directly from GitHub:

1. Push your repository to GitHub.
2. Enable GitHub Pages in repository settings.
3. Use the `gh-pages` branch or `main` branch `dist/` folder.
4. The GitHub Actions workflow included in this project will build and publish automatically.

A published URL will look like:

```bash
https://<your-github-username>.github.io/<repo-name>
```

## Features

- Sign up and log in pages
- Social feed with posts, photos, and videos
- Chat screen with real-time-style messaging UI
- Browser notification workflow and unread alert preview
- Quick ops mission controls for rapid command dispatch
- Theme toggle with persistent light/dark mode
- PWA install prompt for mobile and desktop
- Mobile-first layout and glassmorphism styling

## Notes

This is a frontend prototype. You can add backend authentication and storage later.

## Backend configuration

Set `VITE_API_BASE_URL` for your API root and implement the following endpoints:
- `POST /api/auth/login`
- `POST /api/auth/signup`
- `GET /api/auth/me`

The app stores a bearer token and user profile in local storage for future API calls.
