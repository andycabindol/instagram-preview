import React, { useState, useEffect } from 'react'
import HomeIndicator from '../components/HomeIndicator'
import './Screen6Profile.css'

const STORAGE_KEY = 'instagram_profile_data'

function Screen6Profile({ onHomeClick, postImages: postImagesProp, profileData: profileDataProp, setProfileData: setProfileDataProp }) {
  const defaultPostImages = [
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
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
  ]
  
  const [usernameInput, setUsernameInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Use profileData from props (managed in App.jsx) or local state
  const profileData = profileDataProp || null
  const setProfileData = setProfileDataProp || (() => {})

  const handleLoadProfile = async () => {
    const username = usernameInput.trim().toLowerCase().replace(/^@/, '')
    if (!username) {
      setError('Please enter a username')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/ig?username=${encodeURIComponent(username)}`)
      
      // Check if response is OK and content-type is JSON
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text.substring(0, 200))
        setError('Server returned invalid response. Check console for details.')
        return
      }

      let data
      try {
        data = await response.json()
      } catch (parseError) {
        const text = await response.text()
        console.error('Failed to parse JSON:', parseError.message)
        console.error('Response text:', text.substring(0, 500))
        setError(`Invalid response from server: ${parseError.message}`)
        return
      }

      if (data.ok && data.profile) {
        // Log received profile data for debugging
        console.log('Profile loaded:', {
          username: data.profile.username,
          postsCount: data.profile.postsCount,
          postsArrayLength: data.profile.posts?.length || 0,
          firstPost: data.profile.posts?.[0],
          isPrivate: data.profile.isPrivate
        })
        
        // Update profile data (this will update App.jsx state)
        setProfileData(data.profile)
        // Also save to localStorage
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.profile))
        } catch (e) {
          console.error('Failed to save profile:', e)
        }
      } else {
        setError(data.error?.message || data.error?.code || 'Failed to load profile')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message || 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num) => {
    if (!num) return '0'
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  // Proxy Instagram CDN images through our API to bypass CORS
  const proxyImageUrl = (url) => {
    if (!url) return url
    // If it's already an Instagram CDN URL, proxy it
    if (url.includes('cdninstagram.com') || url.includes('instagram.com')) {
      return `/api/ig-image?url=${encodeURIComponent(url)}`
    }
    return url
  }

  // Use profile data if available, otherwise use props/defaults
  const displayUsername = profileData?.username || 'gursky.studio'
  const displayName = profileData?.displayName || 'Stan Gursky'
  const avatarUrl = proxyImageUrl(profileData?.avatarUrl) || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces'
  const bio = profileData?.bio || 'visual designer. diehard UI/UX nerd. mobile fiend. icons lover. #yourmomsfavorite'
  const website = profileData?.website
  const postsCount = profileData?.postsCount || 151
  const followersCount = profileData?.followersCount || 112000
  const followingCount = profileData?.followingCount || 162
  // Use loaded Instagram posts if available, otherwise fallback to props/defaults
  // For private profiles, use mock posts from API, otherwise use real posts or fallback
  const postImages = profileData?.posts && profileData.posts.length > 0
    ? profileData.posts.map(p => {
        // Don't proxy Unsplash URLs (mock data)
        const url = p.thumbnailUrl || '';
        if (url.includes('unsplash.com')) {
          return url;
        }
        return proxyImageUrl(url);
      }).filter(Boolean)
    : (postImagesProp || defaultPostImages)
  
  // Debug: Log what we're using
  if (profileData) {
    console.log('Profile data in component:', {
      hasPosts: !!profileData.posts,
      postsLength: profileData.posts?.length || 0,
      postImagesLength: postImages.length,
      isPrivate: profileData.isPrivate,
      isUsingFallback: !profileData.posts || profileData.posts.length === 0,
      firstPostThumbnail: profileData.posts?.[0]?.thumbnailUrl
    })
  }
  
  // Debug logging
  useEffect(() => {
    if (profileData) {
      console.log('Profile data in component:', {
        hasPosts: !!profileData.posts,
        postsLength: profileData.posts?.length || 0,
        postImagesLength: postImages.length,
        firstPostImage: postImages[0]
      })
    }
  }, [profileData, postImages])

  return (
    <div className="screen6-profile">
      {/* Instagram Profile Loader */}
      <div className="ig-loader-panel">
        <div className="ig-loader-input-group">
          <input
            type="text"
            className="ig-loader-input"
            placeholder="Enter Instagram username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLoadProfile()}
            disabled={loading}
          />
          <button
            className="ig-loader-button"
            onClick={handleLoadProfile}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load'}
          </button>
        </div>
        {error && (
          <div className="ig-loader-error">{error}</div>
        )}
        {profileData && (
          <div className="ig-loader-success">
            Loaded: @{profileData.username}
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-headline">
          <div className="username-container">
            <span className="username">{displayUsername}</span>
            {(profileData?.isPrivate === true || (profileData?.postsCount > 0 && profileData?.posts?.length === 0)) && (
              <span className="private-profile-notice">Private profile, using mock data instead</span>
            )}
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="chevron-down">
            <path d="M4 6L8 10L12 6" stroke="#0c1014" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        <div className="profile-picture-section">
          <div className="profile-picture">
            <img src={avatarUrl} alt="Profile" />
          </div>
          <div className="add-story-badge">
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" fill="#0c1014" stroke="#ffffff" strokeWidth="2"/>
              <path d="M9 5V13M5 9H13" stroke="#f7f9f9" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{formatNumber(postsCount)}</span>
            <span className="stat-label">posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{formatNumber(followersCount)}</span>
            <span className="stat-label">followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{formatNumber(followingCount)}</span>
            <span className="stat-label">following</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bio-section">
        <h2 className="bio-name">{displayName}</h2>
        <div className="bio-details">
          {website && (
            <div className="bio-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L2 8L8 14M14 2L8 8L14 14" stroke="#0c1014" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href={website} target="_blank" rel="noopener noreferrer" className="link-text">{website}</a>
            </div>
          )}
          <p className="bio-text">
            {bio.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < bio.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <div className="dashboard-card">
          <h3>Professional dashboard</h3>
          <p>16.2K accounts reached in the last 30 days.</p>
        </div>
        <div className="button-row">
          <button className="action-button"><span>Edit profile</span></button>
          <button className="action-button"><span>Share profile</span></button>
          <button className="action-button"><span>Email</span></button>
        </div>
      </div>

      {/* Highlights */}
      <div className="highlights-section">
        {[
          'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=150&h=150&fit=crop',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop',
          'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=150&h=150&fit=crop'
        ].map((imgUrl, i) => (
          <div key={i} className="highlight-item">
            <div className="highlight-circle">
              <img src={imgUrl} alt={`Highlight ${i + 1}`} />
            </div>
            <span className="highlight-label">Highlight {i + 1}</span>
          </div>
        ))}
        <div className="highlight-item">
          <div className="highlight-circle new">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="#0c1014" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="highlight-label">New</span>
        </div>
      </div>

      {/* Post Grid */}
      <div className="post-grid-section">
        <div className="profile-tabs">
          <div className="tab active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="#0c1014" strokeWidth="2" fill="none"/>
              <rect x="14" y="3" width="7" height="7" stroke="#0c1014" strokeWidth="2" fill="none"/>
              <rect x="3" y="14" width="7" height="7" stroke="#0c1014" strokeWidth="2" fill="none"/>
              <rect x="14" y="14" width="7" height="7" stroke="#0c1014" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        <div className="post-grid">
          {postImages.map((img, index) => (
            <div key={index} className="post-grid-item">
              <img 
                src={img} 
                alt={`Post ${index + 1}`}
                onError={(e) => {
                  // Replace with placeholder image if it fails to load
                  const placeholderIndex = index % defaultPostImages.length
                  e.target.src = defaultPostImages[placeholderIndex]
                  e.target.onerror = null // Prevent infinite loop
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="tab-bar">
        <div className="tabs">
          <div className="tab active" onClick={onHomeClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#0c1014" strokeWidth="2" fill="none"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke="#0c1014" strokeWidth="2" fill="none"/>
            </svg>
            <div className="tab-indicator"></div>
          </div>
          <div className="tab">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#0c1014" strokeWidth="2" fill="none"/>
              <path d="m21 21-4.35-4.35" stroke="#0c1014" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="tab">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#0c1014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="tab">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#0c1014" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="tab">
            <div className="profile-tab-avatar">
              <img src={avatarUrl} alt="Profile" />
            </div>
          </div>
        </div>
        <HomeIndicator />
      </div>
    </div>
  )
}

export default Screen6Profile

