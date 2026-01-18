# Development Setup Guide

## Option 1: Use `vercel dev` (Recommended)

Run everything together:

```bash
vercel dev
```

Then access at `http://localhost:3000` (or the port shown in terminal).

**If you see 404 errors for Vite endpoints (`/@vite/client`, etc.):**

1. Stop `vercel dev` (Ctrl+C)
2. Make sure no other processes are using ports 3000 or 5173
3. Restart: `vercel dev`
4. Check terminal output - it should show Vite starting

## Option 2: Run Separately (If vercel dev doesn't work)

**Terminal 1 - Vite Frontend:**
```bash
npm run dev
```
Access at `http://localhost:5173`

**Terminal 2 - Vercel API:**
```bash
vercel dev --listen 3001
```

Then update `vite.config.js` to proxy API calls:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true
    }
  }
}
```

## Troubleshooting

- **404 errors for `/@vite/client`**: `vercel dev` isn't proxying Vite correctly. Try Option 2.
- **API returns JavaScript code**: Using `npm run dev` instead of `vercel dev`. Use `vercel dev`.
- **Port conflicts**: Make sure ports 3000, 3001, and 5173 are free.
