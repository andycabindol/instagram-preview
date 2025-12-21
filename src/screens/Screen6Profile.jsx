import React from 'react'
import StatusBar from '../components/StatusBar'
import HomeIndicator from '../components/HomeIndicator'
import './Screen6Profile.css'

function Screen6Profile({ onHomeClick, postImages: postImagesProp }) {
  const defaultPostImages = [
    'http://localhost:3845/assets/5f7a8ab847224a6fcd037ae7785396259c019449.png',
    'http://localhost:3845/assets/3b722c714bc39d648077d45bd046f19102476402.png',
    'http://localhost:3845/assets/ff54acb39e21a7802526cd38090f80738fc604af.png',
    'http://localhost:3845/assets/3ad05cc6647c86e275d256ef92fff2926bbcd020.png',
    'http://localhost:3845/assets/f70da884556d448739bb8f23e277e3955ee66cd3.png',
    'http://localhost:3845/assets/f6e5fbd603ae2713a9021e89080d29123ba83ad8.png',
    'http://localhost:3845/assets/e288872889e28e5744aae4abd9b756a67b8a91b1.png',
    'http://localhost:3845/assets/59fbbf9ea908c1fde0f911ae75e3dedfc5a333a5.png',
    'http://localhost:3845/assets/7f1b1c5f2c0851df6518654bd6ced7384b984cc1.png',
    'http://localhost:3845/assets/9d16b88e1e13e036e5c78a94904bd433f1543315.png',
    'http://localhost:3845/assets/c953879aca4319f56ece82a4bcf7db19af094740.png',
    'http://localhost:3845/assets/396941d94def95eb4be902d9ed8ecabf81774414.png',
    'http://localhost:3845/assets/6e3edc07a961e2a2edb3db46980a46a101f08157.png',
    'http://localhost:3845/assets/76bccfc15181a44fafda4a332ed1992951070130.png',
  ]
  
  const postImages = postImagesProp || defaultPostImages

  return (
    <div className="screen6-profile">
      <StatusBar />
      
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-headline">
          <span className="username">gursky.studio</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="chevron-down">
            <path d="M4 6L8 10L12 6" stroke="#0c1014" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="nav-actions">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#0c1014"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#0c1014" strokeWidth="2" fill="none"/>
            <line x1="9" y1="3" x2="9" y2="21" stroke="#0c1014" strokeWidth="2"/>
            <line x1="15" y1="3" x2="15" y2="21" stroke="#0c1014" strokeWidth="2"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1.5" fill="#0c1014"/>
            <circle cx="12" cy="12" r="1.5" fill="#0c1014"/>
            <circle cx="12" cy="19" r="1.5" fill="#0c1014"/>
          </svg>
          <div className="notification-badge">1</div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        <div className="profile-picture-section">
          <div className="profile-picture">
            <img src="http://localhost:3845/assets/28452d94f6c6b766a5d79db42b3bedceec23a9db.png" alt="Profile" />
          </div>
          <div className="note-badge">
            <span>Note...</span>
          </div>
          <div className="add-story-badge">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" fill="#0c1014" stroke="#ffffff" strokeWidth="3"/>
              <path d="M9 5V13M5 9H13" stroke="#f7f9f9" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">151</span>
            <span className="stat-label">posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">112K</span>
            <span className="stat-label">followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">162</span>
            <span className="stat-label">following</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bio-section">
        <h2 className="bio-name">Stan Gursky</h2>
        <div className="bio-buttons">
          <div className="threads-badge">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill="#0c1014"/>
            </svg>
            <span>gursky.studio</span>
            <span className="threads-new">• 2 new</span>
            <div className="threads-dot"></div>
          </div>
        </div>
        <div className="bio-details">
          <p className="bio-text">
            <span className="bio-subtitle">Designer</span>
            <br />
            visual designer. diehard UI/UX nerd. mobile fiend. icons lover. <span className="hashtag">#yourmomsfavorite</span>
          </p>
          <div className="bio-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill="#0c1014"/>
            </svg>
            <span className="link-text">gursky.studio and 3 more</span>
          </div>
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
        {[1, 2, 3].map((i) => (
          <div key={i} className="highlight-item">
            <div className="highlight-circle">
              <img src={`http://localhost:3845/assets/88e20a400b7a078ef1a248ea7644a6ef240f8be3.png`} alt={`Highlight ${i}`} />
            </div>
            <span className="highlight-label">Highlight {i}</span>
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
          <div className="tab">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="#6f7680" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        <div className="post-grid">
          {postImages.map((img, index) => (
            <div key={index} className="post-grid-item">
              <img src={img} alt={`Post ${index + 1}`} />
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
          <div className="tab">
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

export default Screen6Profile

