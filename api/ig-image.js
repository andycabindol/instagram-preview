/**
 * Instagram Image Proxy - Vercel Serverless Function
 * 
 * Proxies Instagram CDN images to bypass CORS restrictions
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Only GET requests are allowed' } });
  }

  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ ok: false, error: { code: 'INVALID_URL', message: 'URL parameter is required' } });
  }

  // Validate that it's an Instagram CDN URL
  if (!url.includes('cdninstagram.com') && !url.includes('instagram.com')) {
    return res.status(400).json({ ok: false, error: { code: 'INVALID_DOMAIN', message: 'Only Instagram CDN URLs are allowed' } });
  }

  try {
    // Fetch the image from Instagram CDN
    const imageResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      }
    });

    if (!imageResponse.ok) {
      return res.status(imageResponse.status).json({ 
        ok: false, 
        error: { 
          code: 'IMAGE_FETCH_FAILED', 
          message: `Failed to fetch image: ${imageResponse.status}` 
        } 
      });
    }

    // Get the image data
    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Return the image
    return res.status(200).send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error('Error proxying image:', error);
    return res.status(500).json({
      ok: false,
      error: {
        code: 'SERVER_ERROR',
        message: error.message || 'Failed to proxy image'
      }
    });
  }
}
