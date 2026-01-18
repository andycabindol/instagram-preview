/**
 * Instagram Profile API - Vercel Serverless Function
 * 
 * Fetches Instagram profile data using two strategies:
 * 1. Best-effort scrape from Instagram
 * 2. Provider fallback (if env vars configured)
 */

/**
 * @typedef {Object} IgPost
 * @property {string} id
 * @property {string} thumbnailUrl
 * @property {boolean} [isVideo]
 * @property {string} [caption]
 * @property {string} [timestamp]
 * @property {string} [permalink]
 */

/**
 * @typedef {Object} IgProfile
 * @property {string} username
 * @property {string} [displayName]
 * @property {string} [avatarUrl]
 * @property {string} [bio]
 * @property {string} [website]
 * @property {number} [postsCount]
 * @property {number} [followersCount]
 * @property {number} [followingCount]
 * @property {IgPost[]} posts
 */

/**
 * Extract profile data from Instagram HTML
 */
function extractFromHTML(html, username) {
  try {
    // Look for embedded JSON data in script tags (multiple patterns)
    // Pattern 1: window._sharedData
    const sharedDataMatch = html.match(/<script[^>]*>window\._sharedData\s*=\s*({.+?});<\/script>/s);
    if (sharedDataMatch && sharedDataMatch[1]) {
      try {
        const data = JSON.parse(sharedDataMatch[1]);
        const user = data?.entry_data?.ProfilePage?.[0]?.graphql?.user;
        if (user) {
          return normalizeProfileData(user, username);
        }
      } catch (e) {
        console.log('Failed to parse _sharedData:', e.message);
      }
    }

    // Pattern 2: window.__additionalDataLoaded
    const additionalDataMatch = html.match(/<script[^>]*>window\.__additionalDataLoaded\s*\([^,]+,\s*({.+?})\);<\/script>/s);
    if (additionalDataMatch && additionalDataMatch[1]) {
      try {
        const data = JSON.parse(additionalDataMatch[1]);
        const user = data?.graphql?.user || data?.user;
        if (user) {
          return normalizeProfileData(user, username);
        }
      } catch (e) {
        console.log('Failed to parse __additionalDataLoaded:', e.message);
      }
    }

    // Pattern 3: Look for JSON-LD structured data
    const jsonLdPattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>(.+?)<\/script>/gs;
    const jsonLdMatches = [...html.matchAll(jsonLdPattern)];
    for (const match of jsonLdMatches) {
      try {
        const json = JSON.parse(match[1]);
        if (json['@type'] === 'Person' || json['@type'] === 'ProfilePage') {
          // Extract basic info if available
        }
      } catch (e) {
        // Continue searching
      }
    }


    // Fallback: Try to extract from meta tags
    const metaDescription = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const metaImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    const metaTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);

    if (metaTitle || metaImage) {
      return {
        username,
        displayName: metaTitle ? metaTitle[1].replace(` (@${username})`, '').trim() : username,
        avatarUrl: metaImage ? metaImage[1] : undefined,
        bio: metaDescription ? metaDescription[1] : undefined,
        posts: []
      };
    }
  } catch (error) {
    console.error('Error extracting from HTML:', error);
  }

  return null;
}

/**
 * Check if a post should be filtered out (close friends, blocked, etc.)
 */
function shouldFilterPost(node) {
  if (!node) return true;
  
  // Filter out close friends posts
  if (node.is_close_friend_content || node.close_friends_only || 
      node.audience === 'close_friends' || node.audience_type === 'close_friends') {
    return true;
  }
  
  // Filter out blocked/restricted content (only if explicitly marked)
  if (node.is_restricted === true || node.is_blocked === true || node.is_unavailable === true) {
    return true;
  }
  
  // Filter out posts with error indicators
  if (node.error === true || node.accessibility_caption?.includes('unavailable')) {
    return true;
  }
  
  // Don't filter based on image presence here - let normalization handle it
  // This allows posts with images in different formats to pass through
  return false;
}

/**
 * Normalize Instagram GraphQL user data to our format
 */
function normalizeProfileData(user, username) {
  const posts = [];
  
  // Extract posts from edge_owner_to_timeline_media
  if (user.edge_owner_to_timeline_media?.edges) {
    const validPosts = user.edge_owner_to_timeline_media.edges
      .filter(edge => !shouldFilterPost(edge.node))
      .map((edge) => {
        const node = edge.node;
        return {
          id: node.id || node.shortcode,
          thumbnailUrl: node.display_url || node.thumbnail_src || node.thumbnail_resources?.[0]?.src,
          isVideo: node.is_video || false,
          caption: node.edge_media_to_caption?.edges?.[0]?.node?.text,
          timestamp: node.taken_at_timestamp ? new Date(node.taken_at_timestamp * 1000).toISOString() : undefined,
          permalink: node.shortcode ? `https://www.instagram.com/p/${node.shortcode}/` : undefined
        };
      });
    posts.push(...validPosts);
  }

  const isPrivate = user.is_private === true || user.isPrivate === true;
  
  // Generate mock posts if profile is private
  let finalPosts = posts;
  if (isPrivate && posts.length === 0) {
    const postsCount = user.edge_owner_to_timeline_media?.count || 12;
    // Use exact same placeholder images as defaultPostImages in Screen6Profile.jsx
    const mockImageUrls = [
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
    ];
    finalPosts = Array.from({ length: Math.min(postsCount, 50) }, (_, i) => ({
      id: `mock-post-${username}-${i}`,
      thumbnailUrl: mockImageUrls[i % mockImageUrls.length],
      isVideo: false,
      caption: `Mock post ${i + 1} - Private profile`,
      timestamp: new Date(Date.now() - i * 86400000).toISOString(), // Stagger timestamps
      permalink: undefined
    }));
  }
  
  return {
    username: user.username || username,
    displayName: user.full_name || user.username,
    avatarUrl: user.profile_pic_url_hd || user.profile_pic_url,
    bio: user.biography,
    website: user.external_url,
    postsCount: user.edge_owner_to_timeline_media?.count || 0,
    followersCount: user.edge_followed_by?.count || 0,
    followingCount: user.edge_follow?.count || 0,
    posts: finalPosts,
    isPrivate: isPrivate
  };
}

/**
 * Check if response indicates blocking (captcha, login required, etc.)
 */
function isBlocked(html) {
  if (!html) return false;
  const lowerHtml = html.toLowerCase();
  return (
    lowerHtml.includes('please wait') ||
    lowerHtml.includes('challenge') ||
    lowerHtml.includes('captcha') ||
    lowerHtml.includes('login required') ||
    lowerHtml.includes('log in') ||
    lowerHtml.includes('sign up') ||
    lowerHtml.includes('private account') ||
    lowerHtml.includes('this page is not available')
  );
}

/**
 * Strategy A: Best-effort scrape from Instagram
 */
async function scrapeInstagram(username) {
  // Updated User-Agent to a more recent Chrome version
  const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  
  try {
    // Try JSON endpoint first (Instagram GraphQL endpoint)
    const jsonUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
    const jsonResponse = await fetch(jsonUrl, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': `https://www.instagram.com/${username}/`,
        'X-Requested-With': 'XMLHttpRequest',
        'X-IG-App-ID': '936619743392459',
        'X-IG-WWW-Claim': '0',
        'Origin': 'https://www.instagram.com',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
      }
    });

    if (jsonResponse.ok) {
      const contentType = jsonResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          const data = await jsonResponse.json();
          const user = data?.data?.user;
          if (user) {
            return normalizeProfileData(user, username);
          }
        } catch (e) {
          console.log('Failed to parse JSON response:', e.message);
        }
      }
    }
  } catch (error) {
    console.log('GraphQL endpoint failed, trying HTML:', error.message);
  }

  // Fallback to HTML scraping
  try {
    const htmlUrl = `https://www.instagram.com/${username}/`;
    const htmlResponse = await fetch(htmlUrl, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.instagram.com/',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Upgrade-Insecure-Requests': '1',
      }
    });

    if (htmlResponse.ok) {
      const html = await htmlResponse.text();
      
      if (isBlocked(html)) {
        throw new Error('BLOCKED');
      }

      const profile = extractFromHTML(html, username);
      if (profile) {
        return profile;
      }
    }

    // Check if we got redirected or got an error page
    if (htmlResponse.status === 404 || htmlResponse.redirected) {
      throw new Error('PROFILE_NOT_FOUND');
    }

    throw new Error('SCRAPE_FAILED');
  } catch (error) {
    if (error.message === 'BLOCKED' || error.message === 'PROFILE_NOT_FOUND') {
      throw error;
    }
    throw new Error('SCRAPE_FAILED');
  }
}

/**
 * Strategy B: Provider fallback (RapidAPI or other providers)
 */
async function fetchFromProvider(username) {
  const providerUrl = process.env.IG_PROVIDER_URL;
  const providerKey = process.env.IG_PROVIDER_KEY;
  const providerHost = process.env.IG_PROVIDER_HOST; // For RapidAPI
  const providerMethod = process.env.IG_PROVIDER_METHOD || 'GET'; // GET or POST

  if (!providerUrl || !providerKey) {
    return null;
  }

  try {
    // Determine if this is RapidAPI based on host or URL pattern
    const isRapidAPI = providerHost?.includes('rapidapi') || providerUrl?.includes('rapidapi');
    
    let url, headers, fetchOptions;

    if (isRapidAPI) {
      const endpoint = process.env.IG_PROVIDER_ENDPOINT || '/api/instagram/posts';
      const profileEndpoint = process.env.IG_PROVIDER_PROFILE_ENDPOINT || '/api/instagram/profile';
      
      headers = {
        'Content-Type': 'application/json',
        'x-rapidapi-host': providerHost || providerUrl.replace('https://', '').split('/')[0],
        'x-rapidapi-key': providerKey,
        'Accept': 'application/json'
      };

      if (providerMethod.toUpperCase() === 'POST') {
        // POST request with JSON body (instagram120.p.rapidapi.com format)
        url = `${providerUrl}${endpoint}`;
        fetchOptions = {
          method: 'POST',
          headers,
          body: JSON.stringify({ username, maxId: '' })
        };
      } else {
        // GET request (traditional format)
        url = `${providerUrl}${endpoint}?username=${encodeURIComponent(username)}`;
        fetchOptions = { headers };
      }
    } else {
      // Generic provider format
      url = `${providerUrl}?username=${encodeURIComponent(username)}`;
      headers = {
        'Authorization': `Bearer ${providerKey}`,
        'Accept': 'application/json'
      };
      fetchOptions = { headers };
    }

    // First, try to get profile info if endpoint is available
    let profileData = null;
    if (isRapidAPI && process.env.IG_PROVIDER_PROFILE_ENDPOINT) {
      try {
        const profileUrl = `${providerUrl}${process.env.IG_PROVIDER_PROFILE_ENDPOINT}`;
        const profileOptions = providerMethod.toUpperCase() === 'POST' 
          ? {
              method: 'POST',
              headers,
              body: JSON.stringify({ username })
            }
          : {
              headers,
              method: 'GET'
            };
        
        const profileResponse = await fetch(profileUrl, profileOptions);
        if (profileResponse.ok) {
          const contentType = profileResponse.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            try {
              profileData = await profileResponse.json();
            } catch (e) {
              console.log('Failed to parse profile JSON:', e.message);
            }
          }
        }
      } catch (e) {
        console.log('Profile endpoint failed, using posts data:', e.message);
      }
    }

    // Get posts data
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Provider returned ${response.status}:`, errorText.substring(0, 200));
      throw new Error(`Provider returned ${response.status}: ${errorText.substring(0, 100)}`);
    }

    // Check content type before parsing
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Provider returned non-JSON response:', text.substring(0, 200));
      throw new Error('Provider returned non-JSON response');
    }

    let data;
    try {
      data = await response.json();
      // Log raw response structure for debugging
      console.log('Raw API response keys:', Object.keys(data));
      console.log('Response structure sample:', JSON.stringify(data).substring(0, 1000));
      // Check for posts in various locations
      if (data.posts) console.log('Found data.posts:', Array.isArray(data.posts), 'length:', data.posts?.length);
      if (data.items) console.log('Found data.items:', Array.isArray(data.items), 'length:', data.items?.length);
      if (data.data) console.log('Found data.data:', typeof data.data, Array.isArray(data.data) ? 'array length: ' + data.data.length : 'keys: ' + Object.keys(data.data || {}));
    } catch (parseError) {
      const text = await response.text();
      console.error('Failed to parse JSON response:', parseError.message);
      console.error('Response text:', text.substring(0, 500));
      throw new Error(`Failed to parse JSON: ${parseError.message}`);
    }
    
    // Normalize RapidAPI/Provider response to our format
    // Handle different response structures from RapidAPI
    const responseData = data.data || data.result || data;
    
    // Extract user/profile info (from profile endpoint or posts response)
    const userInfo = profileData?.data || profileData?.user || profileData || 
                     responseData?.user || responseData?.profile || 
                     responseData || {};
    
    // Extract posts (from posts endpoint) - handle various RapidAPI response formats
    let postsArray = [];
    
    // Try different response structures - check data first, then responseData
    // RapidAPI might return posts in various nested structures
    if (Array.isArray(data)) {
      // Response is directly an array of posts
      postsArray = data;
    } else if (data.posts && Array.isArray(data.posts)) {
      postsArray = data.posts;
    } else if (data.items && Array.isArray(data.items)) {
      postsArray = data.items;
    } else if (data.media && Array.isArray(data.media)) {
      postsArray = data.media;
    } else if (data.data) {
      // Check if data.data is an array or object with posts
      if (Array.isArray(data.data)) {
        postsArray = data.data;
      } else if (data.data.posts && Array.isArray(data.data.posts)) {
        postsArray = data.data.posts;
      } else if (data.data.items && Array.isArray(data.data.items)) {
        postsArray = data.data.items;
      } else if (data.data.media && Array.isArray(data.data.media)) {
        postsArray = data.data.media;
      }
    } else if (responseData?.posts && Array.isArray(responseData.posts)) {
      postsArray = responseData.posts;
    } else if (responseData?.items && Array.isArray(responseData.items)) {
      postsArray = responseData.items;
    } else if (responseData?.media && Array.isArray(responseData.media)) {
      postsArray = responseData.media;
    } else if (Array.isArray(responseData)) {
      postsArray = responseData;
    }
    
    // Also check if posts are nested in userInfo
    if (postsArray.length === 0 && userInfo?.posts && Array.isArray(userInfo.posts)) {
      postsArray = userInfo.posts;
    }
    if (postsArray.length === 0 && userInfo?.items && Array.isArray(userInfo.items)) {
      postsArray = userInfo.items;
    }
    if (postsArray.length === 0 && userInfo?.media && Array.isArray(userInfo.media)) {
      postsArray = userInfo.media;
    }
    
    // Log for debugging
    console.log('Posts array length:', postsArray.length);
    if (postsArray.length > 0) {
      console.log('First post sample:', JSON.stringify(postsArray[0]).substring(0, 500));
    } else {
      // If no posts found, log the entire response structure to help debug
      console.log('No posts found in response. Full response structure:', {
        dataKeys: Object.keys(data),
        responseDataKeys: responseData ? Object.keys(responseData) : 'N/A',
        userInfoKeys: userInfo ? Object.keys(userInfo) : 'N/A',
        dataSample: JSON.stringify(data).substring(0, 1000)
      });
    }
    
    // Filter and normalize posts (exclude close friends, blocked, etc.)
    // First filter out close friends/blocked posts, then normalize
    const filteredPosts = postsArray.filter((post) => {
      const node = post.node || post.item || post;
      return !shouldFilterPost(node);
    });
    
    const normalizedPosts = filteredPosts
      .map((post) => {
        // Handle different post structures
        const node = post.node || post.item || post;
        
        // Try multiple ways to get thumbnail URL
        const thumbnailUrl = node?.display_url || 
                            node?.image_url || 
                            node?.thumbnail_url || 
                            node?.thumbnail_src || 
                            node?.thumbnail_resources?.[0]?.src ||
                            node?.images?.standard_resolution?.url || 
                            node?.images?.thumbnail?.url ||
                            node?.image_versions2?.candidates?.[0]?.url ||
                            node?.carousel_media?.[0]?.image_versions2?.candidates?.[0]?.url ||
                            post?.image_url ||
                            post?.thumbnail_url;
        
        return {
          id: node?.id || node?.shortcode || node?.code || node?.pk || node?.media_id || post?.id,
          thumbnailUrl: thumbnailUrl,
          isVideo: node?.is_video || node?.type === 'video' || node?.media_type === 2 || 
                  node?.media_type === 'VIDEO' || post?.type === 'video' || false,
          caption: node?.caption?.text || node?.caption || 
                  node?.edge_media_to_caption?.edges?.[0]?.node?.text || 
                  post?.caption?.text || post?.caption || '',
          timestamp: node?.taken_at_timestamp ? new Date(node.taken_at_timestamp * 1000).toISOString() : 
                     (node?.timestamp ? new Date(node.timestamp * 1000).toISOString() : 
                     (node?.created_time ? new Date(node.created_time * 1000).toISOString() : 
                     (post?.timestamp ? new Date(post.timestamp * 1000).toISOString() : new Date().toISOString()))),
          permalink: node?.permalink || node?.link || 
                    (node?.shortcode ? `https://www.instagram.com/p/${node.shortcode}/` : undefined) ||
                    (post?.permalink || post?.link)
        };
      })
      .filter((post) => {
        // Only filter out posts without thumbnails - let all others through
        // Close friends filtering happens in shouldFilterPost on the raw node
        return !!post.thumbnailUrl;
      })
    
    console.log('Normalized posts count:', normalizedPosts.length);
    console.log('Sample normalized post:', normalizedPosts[0] ? JSON.stringify(normalizedPosts[0]).substring(0, 300) : 'none');
    
    // If we have no posts but have a postsCount, log warning
    if (normalizedPosts.length === 0 && (userInfo?.media_count || userInfo?.posts_count)) {
      console.warn('WARNING: postsCount indicates posts exist but normalizedPosts is empty');
      console.warn('UserInfo sample:', JSON.stringify(userInfo).substring(0, 500));
      console.warn('ResponseData sample:', JSON.stringify(responseData).substring(0, 500));
    }
    
    // Check if profile is private
    const isPrivate = userInfo?.is_private === true || 
                     userInfo?.isPrivate === true ||
                     (normalizedPosts.length === 0 && (userInfo?.media_count > 0 || userInfo?.posts_count > 0));
    
    // Generate mock posts if profile is private
    let finalPosts = normalizedPosts;
    if (isPrivate && normalizedPosts.length === 0) {
      const postsCount = userInfo?.edge_owner_to_timeline_media?.count || userInfo?.media_count || userInfo?.posts_count || 12;
      console.log('Generating mock posts for private profile. Count:', postsCount);
      // Use exact same placeholder images as defaultPostImages in Screen6Profile.jsx
      const mockImageUrls = [
        'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
      ];
      finalPosts = Array.from({ length: Math.min(postsCount, 50) }, (_, i) => ({
        id: `mock-post-${username}-${i}`,
        thumbnailUrl: mockImageUrls[i % mockImageUrls.length],
        isVideo: false,
        caption: `Mock post ${i + 1} - Private profile`,
        timestamp: new Date(Date.now() - i * 86400000).toISOString(), // Stagger timestamps
        permalink: undefined
      }));
      console.log('Generated mock posts:', finalPosts.length, 'First URL:', finalPosts[0]?.thumbnailUrl);
    }
    
    return {
      username: userInfo?.username || username,
      displayName: userInfo?.full_name || userInfo?.fullName || userInfo?.display_name || 
                   userInfo?.name || username,
      avatarUrl: userInfo?.profile_pic_url || userInfo?.profile_pic_url_hd || 
                userInfo?.profilePicture || userInfo?.avatar_url || userInfo?.profile_picture ||
                userInfo?.profile_pic_url_hd,
      bio: userInfo?.biography || userInfo?.bio || userInfo?.description || '',
      website: userInfo?.external_url || userInfo?.website || userInfo?.externalUrl,
      postsCount: userInfo?.edge_owner_to_timeline_media?.count || userInfo?.media_count || 
                 userInfo?.posts_count || finalPosts.length || 0,
      followersCount: userInfo?.edge_followed_by?.count || userInfo?.follower_count || 
                     userInfo?.followers_count || userInfo?.followers || 0,
      followingCount: userInfo?.edge_follow?.count || userInfo?.following_count || 
                     userInfo?.following || 0,
      posts: finalPosts,
      isPrivate: isPrivate
    };
  } catch (error) {
    console.error('Provider fetch failed:', error.message);
    console.error('Error details:', error);
    // Return null so the main handler can try other strategies or return appropriate error
    return null;
  }
}

/**
 * Main handler
 */
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Only GET requests are allowed' } });
  }

  const { username } = req.query;

  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    return res.status(400).json({ ok: false, error: { code: 'INVALID_USERNAME', message: 'Username is required' } });
  }

  const cleanUsername = username.trim().toLowerCase().replace(/^@/, '');

  // Development mode: Return mock data for testing (set ENABLE_MOCK_DATA=true)
  if (process.env.ENABLE_MOCK_DATA === 'true') {
    // Use exact same placeholder images as defaultPostImages in Screen6Profile.jsx
    const mockImageUrls = [
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
    ];
    const mockProfile = {
      username: cleanUsername,
      displayName: `${cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1)} User`,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      bio: 'This is mock data for development. Instagram scraping is blocked.',
      website: 'https://example.com',
      postsCount: 42,
      followersCount: 1234,
      followingCount: 567,
      posts: Array.from({ length: 12 }, (_, i) => ({
        id: `mock-post-${i}`,
        thumbnailUrl: mockImageUrls[i % mockImageUrls.length],
        isVideo: false,
        caption: `Mock post ${i + 1}`,
        timestamp: new Date().toISOString(),
        permalink: `https://www.instagram.com/p/mock${i}/`
      }))
    };
    res.setHeader('Cache-Control', 'no-cache');
    return res.status(200).json({ ok: true, profile: mockProfile });
  }

  try {
    let profile = null;

    // Strategy A: Try scraping Instagram
    try {
      profile = await scrapeInstagram(cleanUsername);
    } catch (error) {
      if (error.message === 'BLOCKED') {
        // If blocked, try provider fallback
        profile = await fetchFromProvider(cleanUsername);
        if (!profile) {
          return res.status(403).json({
            ok: false,
            error: {
              code: 'BLOCKED',
              message: 'Instagram is blocking requests. This is common due to Instagram\'s anti-scraping measures. Options: 1) Configure IG_PROVIDER_URL and IG_PROVIDER_KEY environment variables for a provider fallback, 2) Use Instagram\'s official API (requires app approval), or 3) Try again later. For development, you can test with mock data.'
            }
          });
        }
      } else {
        // Try provider fallback before giving up
        profile = await fetchFromProvider(cleanUsername);
        if (!profile) {
          throw error;
        }
      }
    }

    // Strategy B: If scraping failed, try provider
    if (!profile) {
      profile = await fetchFromProvider(cleanUsername);
      if (!profile) {
        return res.status(404).json({
          ok: false,
          error: {
            code: 'PROFILE_NOT_FOUND',
            message: 'Could not fetch profile data. Profile may be private or not exist.'
          }
        });
      }
    }

    // Ensure we have at least basic data
    if (!profile.username) {
      profile.username = cleanUsername;
    }

    // Set cache headers
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json({ ok: true, profile });
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    
    return res.status(500).json({
      ok: false,
      error: {
        code: 'SERVER_ERROR',
        message: error.message || 'An unexpected error occurred'
      }
    });
  }
}
