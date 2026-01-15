import React from 'react'
import HomeIndicator from '../components/HomeIndicator'
import './Screen6Profile.css'

function Screen6Profile({ onHomeClick, postImages: postImagesProp }) {
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
  
  const postImages = postImagesProp || defaultPostImages

  return (
    <div className="screen6-profile">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-headline">
          <span className="username">gursky.studio</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="chevron-down">
            <path d="M4 6L8 10L12 6" stroke="#0c1014" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        <div className="profile-picture-section">
          <div className="profile-picture">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" alt="Profile" />
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
        <div className="bio-details">
          <p className="bio-text">
            <span className="bio-subtitle">Designer</span>
            <br />
            visual designer. diehard UI/UX nerd. mobile fiend. icons lover. <span className="hashtag">#yourmomsfavorite</span>
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
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" alt="Profile" />
            </div>
          </div>
        </div>
        <HomeIndicator />
      </div>
    </div>
  )
}

export default Screen6Profile

