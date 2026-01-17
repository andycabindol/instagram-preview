import React, { useState, useEffect } from 'react'
import { useVariant } from '../variants/VariantProvider'
import HomeIndicator from '../components/HomeIndicator'
import PreviewButton from '../components/PreviewButton'
import ProfilePreviewScreenV3 from './ProfilePreviewScreenV3'
import './Screen4EditPost.css'

function Screen4EditPost({ onClose, onNext, images = [], onOpenPreview, profilePosts = [] }) {
  const { config, isVariant } = useVariant()
  const isV3 = isVariant('v3')
  const isV1 = isVariant('v1')
  const [currentImages, setCurrentImages] = useState([...images])
  const [showProfilePreview, setShowProfilePreview] = useState(false)
  const [originalImageOrder, setOriginalImageOrder] = useState([])

  // Sync with prop changes (e.g., when preview updates images)
  useEffect(() => {
    setCurrentImages([...images])
  }, [images])

  // Store snapshot when opening preview
  const handleOpenPreview = () => {
    onOpenPreview(currentImages)
  }

  // Handle v3 profile preview
  const handleOpenProfilePreview = () => {
    setOriginalImageOrder([...currentImages])
    setShowProfilePreview(true)
  }

  const handleProfilePreviewDone = (reorderedImages) => {
    setCurrentImages(reorderedImages)
    setShowProfilePreview(false)
  }

  const handleProfilePreviewCancel = () => {
    setShowProfilePreview(false)
  }
  return (
    <div className="screen4-edit-post">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <button className="close-button" onClick={onClose}>
          <div className="close-button-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#f7f9f9" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Image Carousel */}
      <div className={`image-carousel ${currentImages.length === 1 ? 'single-image' : ''}`}>
        {currentImages.length > 0 ? (
          currentImages.map((imgSrc, index) => (
            <div key={index} className="carousel-image">
              <img src={imgSrc} alt={`Post ${index + 1}`} />
            </div>
          ))
        ) : (
          // Fallback if no images are passed
          <>
            <div className="carousel-image">
              <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=500&fit=crop" alt="Post 1" />
            </div>
            <div className="carousel-image">
              <img src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=500&fit=crop" alt="Post 2" />
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop" alt="Post 2 overlay" className="overlay-image" />
            </div>
          </>
        )}
      </div>

      {/* Toolbar Container - Fixed at Bottom */}
      <div className="toolbar-container">
        {/* Toolbar - Post Actions */}
        {(config.showEditToolbar || isV1) && (
          <div className="toolbar-post-actions">
            <div className="reels-toolbar">
              <div className="toolbar-button">
                <svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18V5l12-2v13" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
                  <circle cx="6" cy="18" r="3" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
                  <circle cx="18" cy="16" r="3" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
                </svg>
                <span>Music</span>
              </div>
              <div className="toolbar-button">
                <svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="#f7f9f9" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Text</span>
              </div>
              <div className="toolbar-button">
                <svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
                </svg>
                <span>Overlay</span>
              </div>
              <div className="toolbar-button">
                <svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M2 12h20" stroke="#f7f9f9" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Filter</span>
              </div>
              {(config.canEdit || isV1) && (
                <div className="toolbar-button">
                  <svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="5" r="1.5" fill="#f7f9f9"/>
                    <circle cx="12" cy="12" r="1.5" fill="#f7f9f9"/>
                    <circle cx="12" cy="19" r="1.5" fill="#f7f9f9"/>
                  </svg>
                  <span>Edit</span>
                </div>
              )}
              {config.showCroppingTools && (
                <div className="toolbar-button">
                  <svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
                    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="#f7f9f9" strokeWidth="1" fill="none"/>
                  </svg>
                  <span>Crop</span>
                </div>
              )}
              {config.showCoverSelectionUI && (
                <div className="toolbar-button">
                  <svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
                    {config.coverSelectionMode === 'top' && (
                      <path d="M2 8h20" stroke="#f7f9f9" strokeWidth="2" strokeLinecap="round"/>
                    )}
                    {config.coverSelectionMode === 'bottom' && (
                      <path d="M2 16h20" stroke="#f7f9f9" strokeWidth="2" strokeLinecap="round"/>
                    )}
                  </svg>
                  <span>Cover</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Toolbar - Edit Post */}
        <div className="toolbar-edit-post">
          <div className="edit-toolbar">
            <div className="add-image-button">
              <img src={currentImages.length > 0 ? currentImages[0] : "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop"} alt="Thumbnail" />
              <div className="add-overlay">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="#f7f9f9" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            {isV3 && (
              <button className="preview-profile-button-v3-toolbar" onClick={handleOpenProfilePreview}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
                  <rect x="14" y="3" width="7" height="7" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
                  <rect x="3" y="14" width="7" height="7" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
                  <rect x="14" y="14" width="7" height="7" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
                </svg>
                <span>Preview</span>
              </button>
            )}
            {config.enablePreviewFlow && !isV3 && (
              <PreviewButton onClick={handleOpenPreview} />
            )}
            <button className="next-button-large" onClick={() => onNext(currentImages)}>
              <span>Next</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <HomeIndicator dark />
        </div>
      </div>

      {/* Profile Preview Screen - V3 Only */}
      {isV3 && showProfilePreview && (
        <ProfilePreviewScreenV3
          images={currentImages}
          profilePosts={profilePosts}
          onClose={handleProfilePreviewCancel}
          onDone={handleProfilePreviewDone}
        />
      )}
    </div>
  )
}

export default Screen4EditPost

