# RapidAPI Setup Guide

## Step 1: Get Your RapidAPI Key

1. Go to [RapidAPI Dashboard](https://rapidapi.com/)
2. Sign up or log in
3. Search for an Instagram API (e.g., "Instagram Data", "Instagram Scraper")
4. Subscribe to the API plan you want
5. Go to the API's page and copy your **X-RapidAPI-Key**
6. Note the **X-RapidAPI-Host** (usually something like `instagram-data1.p.rapidapi.com`)

## Step 2: Find the Correct Endpoints

For `instagram120.p.rapidapi.com`, you need:
1. **Posts endpoint**: `/api/instagram/posts` (POST with JSON body)
2. **Profile endpoint**: `/api/instagram/profile` (optional, if available)

**Note**: This API uses POST requests with JSON body format:
```json
{"username":"keke","maxId":""}
```

Check your RapidAPI API documentation for:
- The exact endpoint paths
- Whether profile info is included in posts response or separate endpoint

## Step 3: Set Environment Variables

### For Local Development

Create a `.env.local` file in your project root:

```bash
IG_PROVIDER_URL=https://instagram120.p.rapidapi.com
IG_PROVIDER_HOST=instagram120.p.rapidapi.com
IG_PROVIDER_KEY=your-rapidapi-key-here
IG_PROVIDER_METHOD=POST
IG_PROVIDER_ENDPOINT=/api/instagram/posts
IG_PROVIDER_PROFILE_ENDPOINT=/api/instagram/profile
```

**Replace**:
- `instagram120.p.rapidapi.com` with your actual RapidAPI host
- `your-rapidapi-key-here` with your actual RapidAPI key
- `/api/instagram/posts` with your actual posts endpoint
- `/api/instagram/profile` with your profile endpoint (if available, otherwise leave blank)

### For Vercel Deployment

Run these commands:

```bash
vercel env add IG_PROVIDER_URL
# Paste: https://instagram120.p.rapidapi.com

vercel env add IG_PROVIDER_HOST
# Paste: instagram120.p.rapidapi.com

vercel env add IG_PROVIDER_KEY
# Paste: your-rapidapi-key-here

vercel env add IG_PROVIDER_METHOD
# Paste: POST

vercel env add IG_PROVIDER_ENDPOINT
# Paste: /api/instagram/posts

vercel env add IG_PROVIDER_PROFILE_ENDPOINT
# Paste: /api/instagram/profile (or leave empty if not available)
```

## Step 4: Test It

1. Restart your dev server (`vercel dev` or `npm run dev`)
2. Go to the Profile screen (Screen 6)
3. Enter an Instagram username
4. Click "Load"

The API will try scraping first, and if blocked, it will automatically use your RapidAPI provider.

## Troubleshooting

### If you get errors:

1. **Check your endpoint**: Make sure `IG_PROVIDER_ENDPOINT` matches the exact path from RapidAPI docs
2. **Verify your key**: Test your RapidAPI key with curl:
   ```bash
   curl --request GET \
     --url 'https://instagram-data1.p.rapidapi.com/user/info?username=instagram' \
     --header 'x-rapidapi-host: instagram-data1.p.rapidapi.com' \
     --header 'x-rapidapi-key: YOUR_KEY_HERE'
   ```
3. **Check response format**: The API tries to normalize different response formats, but if your provider returns data in a different structure, you may need to adjust the `fetchFromProvider` function in `api/ig.js`

### Common RapidAPI Endpoints

Different Instagram APIs on RapidAPI have different endpoints. Check your specific API's documentation, but common ones include:

- **User Info**: `/user/info?username=xxx`
- **User Profile**: `/user/profile?username=xxx`  
- **User Posts**: `/user/posts?username=xxx`

Some APIs return all data in one call, others require separate calls for posts.

## Example Response Format

The API expects responses in formats like:

```json
{
  "data": {
    "username": "instagram",
    "full_name": "Instagram",
    "profile_pic_url": "https://...",
    "biography": "Bringing you closer...",
    "follower_count": 1000000,
    "following_count": 100,
    "media_count": 5000
  }
}
```

Or:

```json
{
  "user": {
    "username": "instagram",
    "full_name": "Instagram",
    ...
  },
  "posts": [...]
}
```

The code tries to handle multiple formats automatically.
