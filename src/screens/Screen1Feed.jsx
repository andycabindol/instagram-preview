import React, { useState, useEffect, useRef } from 'react'
import StatusBar from '../components/StatusBar'
import HomeIndicator from '../components/HomeIndicator'
import './Screen1Feed.css'

// Post Component
function Post({ postData, index }) {
  return (
    <div className="post-section">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-user-info">
          <div className="user-avatar">
            <img src={postData.avatar} alt={postData.username} />
          </div>
          <div className="user-details">
            <div className="user-name-row">
              <span className="user-name">{postData.username}</span>
              {postData.verified && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="verified-badge">
                  <circle cx="8" cy="8" r="7" fill="#0098fd"/>
                  <path d="M6 8L7.5 9.5L10 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
        </div>
        <button className="options-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1.5" fill="#0c1014"/>
            <circle cx="12" cy="12" r="1.5" fill="#0c1014"/>
            <circle cx="12" cy="19" r="1.5" fill="#0c1014"/>
          </svg>
        </button>
      </div>

      {/* Post Image */}
      <div className="post-image">
        <img src={postData.image} alt="Post" />
      </div>

      {/* Post Details */}
      <div className="post-details">
        {/* Action Bar */}
        <div className="action-bar">
          <div className="actions-left">
            <div className="action-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="action-icon liked">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ff0034"/>
              </svg>
              <span className="action-count">{postData.likes}</span>
            </div>
            <div className="action-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="action-icon">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#0c1014" strokeWidth="2" fill="none"/>
              </svg>
              <span className="action-count">{postData.comments}</span>
            </div>
            <div className="action-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="action-icon">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#0c1014" strokeWidth="2" fill="none"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#0c1014" strokeWidth="2" fill="none"/>
              </svg>
              <span className="action-count">{postData.shares}</span>
            </div>
          </div>
          <div className="action-right">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="action-icon">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="#0c1014" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Likes */}
        <div className="likes-section">
          <div className="liker-avatars">
            {[1, 2, 3].map((i) => (
              <div key={i} className="liker-avatar" style={{ zIndex: 4 - i }}>
                <img src={`http://localhost:3845/assets/2639dd094add503fa06938ece0528107d856f013.png`} alt={`Liker ${i}`} />
              </div>
            ))}
          </div>
          <p className="likes-text">
            Liked by <strong>{postData.likedBy}</strong> and <strong>{postData.totalLikes}</strong> <strong>others</strong>
          </p>
        </div>

        {/* Description */}
        <div className="post-description">
          <div className="description-line">
            <strong>{postData.username}</strong>
            <span>{postData.caption}</span>
          </div>
          {postData.caption2 && (
            <div className="description-line">
              <span>{postData.caption2}</span>
              <span className="more-link">more</span>
            </div>
          )}
        </div>

        {/* Comment */}
        <div className="post-comment">
          <strong>{postData.commentUser}</strong>
          <span>{postData.comment}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="comment-like">
            <path d="M8 13.35l-1.45-1.32C3.6 9.36 1.33 7.28 1.33 5.5c0-1.58 1.42-2.83 3.17-2.83 1.16 0 2.24.54 2.92 1.39C8.73 3.21 9.81 2.67 11 2.67c1.75 0 3.17 1.25 3.17 2.83 0 1.78-2.27 3.86-5.22 6.53L8 13.35z" fill="#ff0034"/>
          </svg>
        </div>

        <p className="post-time">{postData.time}</p>
      </div>
    </div>
  )
}

function Screen1Feed({ onPlusClick, posts: postsProp, onProfileClick }) {
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const feedRef = useRef(null)

  // Use posts from props if provided, otherwise use default posts
  const defaultPosts = [
    {
      username: 'gursky.studio',
      verified: true,
      avatar: 'http://localhost:3845/assets/28452d94f6c6b766a5d79db42b3bedceec23a9db.png',
      image: 'http://localhost:3845/assets/5f7a8ab847224a6fcd037ae7785396259c019449.png',
      likes: '1.139',
      comments: '58',
      shares: '7',
      likedBy: 'your friend',
      totalLikes: '25.513',
      caption: 'Mesmerizing colors and graceful movements!',
      caption2: 'This tropical bird truly embodies the beauty of nature\'s vibrant palette',
      commentUser: 'username',
      comment: 'Mi ac enim varius dictumst odio sed 🙌',
      time: '11 hours ago'
    },
    {
      username: 'photographer.pro',
      verified: false,
      avatar: 'http://localhost:3845/assets/aaaf628de260c2832e6e403cc52aca3cd168402d.png',
      image: 'http://localhost:3845/assets/3b722c714bc39d648077d45bd046f19102476402.png',
      likes: '892',
      comments: '23',
      shares: '12',
      likedBy: 'friend1',
      totalLikes: '8.2K',
      caption: 'Golden hour magic ✨',
      caption2: 'There\'s something special about the light at this time of day',
      commentUser: 'user123',
      comment: 'Absolutely stunning! 🔥',
      time: '2 hours ago'
    },
    {
      username: 'nature.lover',
      verified: false,
      avatar: 'http://localhost:3845/assets/8637874c7b73e4ad8e93f4f674a9469989a1b28a.png',
      image: 'http://localhost:3845/assets/911201df39ab707766f6d049048e21d7c0789617.png',
      likes: '2.4K',
      comments: '156',
      shares: '89',
      likedBy: 'nature_fan',
      totalLikes: '42.1K',
      caption: 'Mountain views never get old 🏔️',
      commentUser: 'traveler',
      comment: 'Where is this? Beautiful!',
      time: '5 hours ago'
    },
    {
      username: 'art.daily',
      verified: true,
      avatar: 'http://localhost:3845/assets/28452d94f6c6b766a5d79db42b3bedceec23a9db.png',
      image: 'http://localhost:3845/assets/5f7a8ab847224a6fcd037ae7785396259c019449.png',
      likes: '5.7K',
      comments: '234',
      shares: '145',
      likedBy: 'art_collector',
      totalLikes: '128.5K',
      caption: 'New piece in progress 🎨',
      caption2: 'Experimenting with new techniques and colors',
      commentUser: 'art_lover',
      comment: 'Can\'t wait to see the finished piece!',
      time: '1 day ago'
    },
    {
      username: 'foodie.world',
      verified: false,
      avatar: 'http://localhost:3845/assets/aaaf628de260c2832e6e403cc52aca3cd168402d.png',
      image: 'http://localhost:3845/assets/3b722c714bc39d648077d45bd046f19102476402.png',
      likes: '3.1K',
      comments: '189',
      shares: '67',
      likedBy: 'food_enthusiast',
      totalLikes: '56.8K',
      caption: 'Homemade pasta perfection 🍝',
      commentUser: 'chef_life',
      comment: 'Recipe please! 👨‍🍳',
      time: '3 hours ago'
    },
    {
      username: 'fitness.motivation',
      verified: false,
      avatar: 'http://localhost:3845/assets/8637874c7b73e4ad8e93f4f674a9469989a1b28a.png',
      image: 'http://localhost:3845/assets/911201df39ab707766f6d049048e21d7c0789617.png',
      likes: '8.9K',
      comments: '456',
      shares: '234',
      likedBy: 'fit_fam',
      totalLikes: '234.7K',
      caption: 'Morning workout complete! 💪',
      caption2: 'Starting the day right with some cardio and strength training',
      commentUser: 'workout_buddy',
      comment: 'Inspiring! Keep it up! 🔥',
      time: '6 hours ago'
    }
  ]
  
  const posts = postsProp || defaultPosts

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = feedRef.current?.scrollTop || 0
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsScrollingDown(true)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsScrollingDown(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    const feedElement = feedRef.current
    if (feedElement) {
      feedElement.addEventListener('scroll', handleScroll)
      return () => feedElement.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <div className="screen1-feed" ref={feedRef}>
      <div className={`top-bar ${isScrollingDown ? 'nav-hidden' : ''}`}>
        <StatusBar />
        
        {/* Navigation Bar */}
        <div className="nav-bar">
        <button className="plus-button" onClick={onPlusClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="#0c1014" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="nav-headline">
          <img src="http://localhost:3845/assets/7e94f66f0f67201408597e3e8df9bfbf8a77d656.svg" alt="Instagram" className="instagram-logo" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="chevron-down">
            <path d="M4 6L8 10L12 6" stroke="#0c1014" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="nav-action">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#0c1014"/>
          </svg>
        </div>
        </div>
      </div>

      {/* Posts Container */}
      <div className="posts-container">
        {/* Stories */}
        <div className="stories-section">
          <div className="story-item my-story">
            <div className="story-picture">
              <div className="story-avatar">
                <img src="http://localhost:3845/assets/28452d94f6c6b766a5d79db42b3bedceec23a9db.png" alt="Your story" />
              </div>
              <div className="story-add-badge">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" fill="#0c1014" stroke="#ffffff" strokeWidth="3"/>
                  <path d="M9 5V13M5 9H13" stroke="#f7f9f9" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <p className="story-label">Your story</p>
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="story-item">
              <div className="story-picture">
                <svg width="78" height="78" viewBox="0 0 78 78" fill="none">
                  <circle cx="39" cy="39" r="38.5" stroke="#dbdbdb"/>
                </svg>
                <div className="story-avatar">
                  <img src={`http://localhost:3845/assets/aaaf628de260c2832e6e403cc52aca3cd168402d.png`} alt={`User ${i}`} />
                </div>
              </div>
              <p className="story-label">username</p>
            </div>
          ))}
        </div>
        {posts.map((post, index) => (
          <Post key={index} postData={post} index={index} />
        ))}
      </div>

      {/* Tab Bar */}
      <div className="tab-bar">
        <div className="tabs">
          <div className="tab active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#0c1014" strokeWidth="2" fill="none"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke="#0c1014" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="tab">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#0c1014" strokeWidth="2" fill="none"/>
              <path d="m21 21-4.35-4.35" stroke="#0c1014" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="tab">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#0c1014" strokeWidth="2" fill="none"/>
              <line x1="9" y1="3" x2="9" y2="21" stroke="#0c1014" strokeWidth="2"/>
              <line x1="15" y1="3" x2="15" y2="21" stroke="#0c1014" strokeWidth="2"/>
            </svg>
          </div>
          <div className="tab">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#0c1014" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="tab" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
            <div className="profile-tab-avatar">
              <img src="http://localhost:3845/assets/28452d94f6c6b766a5d79db42b3bedceec23a9db.png" alt="Profile" />
            </div>
          </div>
        </div>
        <HomeIndicator />
      </div>
    </div>
  )
}

export default Screen1Feed

