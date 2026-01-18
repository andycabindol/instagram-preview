# Instagram Preview

A React implementation of the Instagram posting flow with 6 screens.

## Features

- **6 Complete Screens**: Feed, Image Selection, Multi-select, Edit Post, Add Caption, and Profile
- **Design System**: JSON-based design system for easy editing
- **Exact Figma Match**: Uses spacing, colors, typography, and border radius from Figma variables
- **Responsive**: Max-width 375px container for desktop viewing
- **Interactive Flow**: Full navigation between screens
- **Real Instagram Profile Loading**: Load real Instagram profiles by username using Vercel serverless functions

## Installation

```bash
npm install
```

## Development

### Local Development (Vite only)

For frontend-only development:

```bash
npm run dev
```

### Full Stack Development (Vite + API)

**Use `vercel dev` for full-stack development** (recommended):

```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Run both Vite frontend and API functions
vercel dev
```

This will:
- Start Vite dev server (proxied through Vercel)
- Execute API functions in `/api` folder
- Serve everything on one port (usually `http://localhost:3000`)

**Important**: When you run `vercel dev`, it will show you the URL in the terminal. Use that URL (usually `http://localhost:3000`) to access your app.

**Note**: If you use `npm run dev` instead, the API functions won't work because Vite doesn't execute serverless functions - it will serve the API files as static JavaScript files.

## Build

```bash
npm run build
```

## Deployment

This project is configured for deployment to Vercel.

### Deploy to Vercel

1. **Using Vercel CLI** (recommended):
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Using GitHub Integration**:
   - Push your code to a GitHub repository
   - Import the project in [Vercel Dashboard](https://vercel.com/dashboard)
   - Vercel will automatically detect the Vite configuration and deploy

The `vercel.json` configuration file is already set up with:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- SPA routing support (all routes redirect to index.html)

## Screen Flow

1. **Screen 1 (Feed)**: Click the plus button to go to image selection
2. **Screen 2 (Image Selection)**: Click the gallery button (right of "Recents >") to enable multi-select
3. **Screen 3 (Multi-select)**: Select multiple images, then click Next
4. **Screen 4 (Edit Post)**: Edit your post with filters, music, etc., then click Next
5. **Screen 5 (Add Caption)**: Add a caption and configure post settings, then click Share
6. **Screen 6 (Profile)**: View your profile with the new post added

## Design System

All design tokens are stored in `design-system.json` including:
- Colors (background, text, icons, borders)
- Spacing (0px to 80px)
- Border radius (0px to 100px)
- Typography (font families, sizes, weights, letter spacing)

## Project Structure

```
instagram-preview/
├── api/
│   └── ig.js             # Instagram profile API (Vercel serverless function)
├── design-system.json    # Design tokens
├── src/
│   ├── components/       # Reusable components (StatusBar, HomeIndicator)
│   ├── screens/          # Screen components (Screen1-6)
│   ├── App.jsx           # Main app with routing
│   └── main.jsx          # Entry point
├── vercel.json           # Vercel deployment configuration
└── package.json
```

## Instagram Profile Loading

The app includes functionality to load real Instagram profiles by username. This feature uses a Vercel serverless function (`/api/ig.js`) as a backend proxy.

### How to Use

1. Navigate to the Profile screen (Screen 6)
2. Enter an Instagram username in the loader panel at the top
3. Click "Load" to fetch the profile data
4. The profile will be updated with real data: username, display name, avatar, bio, website, follower counts, and post thumbnails
5. Successfully loaded profiles are saved to localStorage and persist across sessions

### Environment Variables

**For Production (RapidAPI or other providers)**:
- `IG_PROVIDER_URL` - Base URL of your provider API (e.g., `https://instagram120.p.rapidapi.com`)
- `IG_PROVIDER_HOST` - Host header (for RapidAPI: `instagram120.p.rapidapi.com`)
- `IG_PROVIDER_KEY` - Your API key (RapidAPI key)
- `IG_PROVIDER_METHOD` - HTTP method: `GET` or `POST` (default: `GET`)
- `IG_PROVIDER_ENDPOINT` - Posts endpoint path (e.g., `/api/instagram/posts`)
- `IG_PROVIDER_PROFILE_ENDPOINT` - Profile endpoint path (optional, e.g., `/api/instagram/profile`)

**For Development/Testing**:
- `ENABLE_MOCK_DATA=true` - Enables mock data mode for testing without Instagram access

**Setting Environment Variables**:

**Local Development** (create `.env.local` file):
```bash
# For RapidAPI (instagram120.p.rapidapi.com format)
IG_PROVIDER_URL=https://instagram120.p.rapidapi.com
IG_PROVIDER_HOST=instagram120.p.rapidapi.com
IG_PROVIDER_KEY=your-rapidapi-key-here
IG_PROVIDER_METHOD=POST
IG_PROVIDER_ENDPOINT=/api/instagram/posts
IG_PROVIDER_PROFILE_ENDPOINT=/api/instagram/profile

# Or enable mock data for testing
# ENABLE_MOCK_DATA=true
```

**Vercel Deployment**:
```bash
vercel env add IG_PROVIDER_URL
# Enter: https://instagram-data1.p.rapidapi.com

vercel env add IG_PROVIDER_HOST
# Enter: instagram-data1.p.rapidapi.com

vercel env add IG_PROVIDER_KEY
# Enter: your-rapidapi-key-here

vercel env add IG_PROVIDER_ENDPOINT
# Enter: /user/info (or your specific endpoint)
```

### Instagram Blocking

**Important**: Instagram actively blocks scraping attempts. You may see `BLOCKED` errors. Solutions:

1. **Use Mock Data (Development)**: Set `ENABLE_MOCK_DATA=true` to test the UI without Instagram
2. **Use RapidAPI**: 
   - Sign up at [RapidAPI](https://rapidapi.com/)
   - Subscribe to an Instagram API (e.g., "Instagram Data" or similar)
   - Get your API key from the dashboard
   - Set environment variables as shown above
   - Common endpoints: `/user/info`, `/user/profile`, `/user/posts`
3. **Other Provider Services**: Configure `IG_PROVIDER_URL` and `IG_PROVIDER_KEY` with services like:
   - [Apify Instagram Scraper](https://apify.com/store/instagram)
   - Other Instagram API providers
4. **Instagram Official API**: Requires app approval (limited access)

The API function uses two strategies:
1. **Strategy A**: Best-effort scrape from Instagram (often blocked)
2. **Strategy B**: Provider fallback (if env vars are configured)
3. **Development Mode**: Mock data (if `ENABLE_MOCK_DATA=true`)

### API Endpoint

- **GET** `/api/ig?username=<username>`
- Returns: `{ ok: true, profile: IgProfile }` or `{ ok: false, error: { code, message } }`
- Caching: Responses are cached for 10 minutes (`s-maxage=600`)

## Notes

- Images are loaded from localhost:3845 (Figma asset server)
- All spacing, padding, and border radius values match Figma exactly
- The app uses a max-width container of 375px for desktop viewing

