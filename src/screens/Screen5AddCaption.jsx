import React, { useState } from 'react'
import { useVariant } from '../variants/VariantProvider'
import HomeIndicator from '../components/HomeIndicator'
import './Screen5AddCaption.css'

function Screen5AddCaption({ onBack, onShare, images = [], profilePosts = [], onOpenProfilePreview }) {
  const [caption, setCaption] = useState('')
  const { config, isVariant } = useVariant()

  // Get cover image (first image is the cover)
  const coverImage = images.length > 0 ? images[0] : null
  const hasCoverImage = coverImage !== null
  const isV1 = isVariant('v1')
  const showProfilePreviewButton = isV1 && config.enableProfilePreview

  const handleOpenProfilePreview = () => {
    if (hasCoverImage && onOpenProfilePreview) {
      onOpenProfilePreview(coverImage)
    }
  }

  return (
    <div className="screen5-add-caption">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <button className="back-button" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#0c1014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="nav-title">New post</p>
      </div>

      {/* Content */}
      <div className="content-section">
        {/* Images Preview */}
        <div className="images-preview">
          {images.length > 0 ? (
            images.map((imgSrc, index) => (
              <div key={index} className="preview-image">
                <img src={imgSrc} alt={`Post ${index + 1}`} />
              </div>
            ))
          ) : (
            // Fallback if no images are passed
            <>
              <div className="preview-image">
                <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=500&fit=crop" alt="Post 1" />
              </div>
              <div className="preview-image">
                <img src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=500&fit=crop" alt="Post 2" />
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop" alt="Post 2 overlay" className="overlay-image" />
              </div>
            </>
          )}
        </div>

        {/* Caption Section */}
        <div className="caption-section">
          <textarea 
            className="caption-input" 
            placeholder="Add a caption..."
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="caption-buttons">
            <button className="caption-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="5" r="1.5" fill="#0c1014"/>
                <circle cx="12" cy="12" r="1.5" fill="#0c1014"/>
                <circle cx="12" cy="19" r="1.5" fill="#0c1014"/>
              </svg>
              <span>Poll</span>
            </button>
            <button className="caption-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#0c1014" strokeWidth="2" fill="none"/>
              </svg>
              <span>Prompt</span>
            </button>
          </div>
        </div>

        {/* Options List */}
        <div className="options-list">
          <div className="option-item">
            <div className="option-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18V5l12-2v13" stroke="#0c1014" strokeWidth="2" fill="none"/>
                <circle cx="6" cy="18" r="3" stroke="#0c1014" strokeWidth="2" fill="none"/>
                <circle cx="18" cy="16" r="3" stroke="#0c1014" strokeWidth="2" fill="none"/>
              </svg>
              <span>Add music</span>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="chevron">
              <path d="M9 18l6-6-6-6" stroke="#6f7680" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="option-item">
            <div className="option-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#0c1014" strokeWidth="2" fill="none"/>
                <circle cx="9" cy="7" r="4" stroke="#0c1014" strokeWidth="2" fill="none"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#0c1014" strokeWidth="2" fill="none"/>
              </svg>
              <span>Tag people</span>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="chevron">
              <path d="M9 18l6-6-6-6" stroke="#6f7680" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="option-item">
            <div className="option-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#0c1014" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="10" r="3" stroke="#0c1014" strokeWidth="2" fill="none"/>
              </svg>
              <span>Add location</span>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="chevron">
              <path d="M9 18l6-6-6-6" stroke="#6f7680" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="divider"></div>
          <div className="option-item">
            <div className="option-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#0c1014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Audience</span>
            </div>
            <div className="option-right">
              <span className="option-value">Audience</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="chevron">
                <path d="M9 18l6-6-6-6" stroke="#6f7680" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="option-item">
            <div className="option-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#0c1014" strokeWidth="2" fill="none"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#0c1014" strokeWidth="2" fill="none"/>
              </svg>
              <span>Also share on...</span>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="chevron">
              <path d="M9 18l6-6-6-6" stroke="#6f7680" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="divider"></div>
          <div className="option-item">
            <div className="option-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="5" r="1.5" fill="#0c1014"/>
                <circle cx="12" cy="12" r="1.5" fill="#0c1014"/>
                <circle cx="12" cy="19" r="1.5" fill="#0c1014"/>
              </svg>
              <span>More options</span>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="chevron">
              <path d="M9 18l6-6-6-6" stroke="#6f7680" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="bottom-toolbar">
        {showProfilePreviewButton && (
          <button 
            className="preview-profile-button-v5" 
            onClick={handleOpenProfilePreview}
            disabled={!hasCoverImage}
            title={!hasCoverImage ? 'Select a cover image to preview' : 'Preview on Profile'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="#0c1014" strokeWidth="1.5" fill="none"/>
              <rect x="14" y="3" width="7" height="7" stroke="#0c1014" strokeWidth="1.5" fill="none"/>
              <rect x="3" y="14" width="7" height="7" stroke="#0c1014" strokeWidth="1.5" fill="none"/>
              <rect x="14" y="14" width="7" height="7" stroke="#0c1014" strokeWidth="1.5" fill="none"/>
            </svg>
            <span>Preview on Profile</span>
          </button>
        )}
        <button className="share-button" onClick={() => onShare(images, caption)}>
          <span>Share</span>
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}

export default Screen5AddCaption

