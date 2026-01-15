import React from 'react'
import './ProfileGridPreviewModal.css'

function ProfileGridPreviewModal({ coverImage, profilePosts = [], onClose }) {
  // Create preview grid with cover image at top-left (most recent post)
  const previewGrid = [
    coverImage, // New post's cover image (most recent)
    ...profilePosts.slice(0, 11) // Existing profile posts (limit to 12 total for preview)
  ]

  // Fill remaining slots with placeholder gray boxes if needed
  while (previewGrid.length < 12) {
    previewGrid.push(null)
  }

  return (
    <div className="profile-preview-modal-overlay" onClick={onClose}>
      <div className="profile-preview-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="profile-preview-header">
          <h2 className="profile-preview-title">Preview on Profile</h2>
          <button className="profile-preview-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Profile Grid */}
        <div className="profile-preview-content">
          <div className="profile-preview-grid">
            {previewGrid.map((imgSrc, index) => (
              <div
                key={index}
                className={`profile-preview-grid-item ${index === 0 ? 'cover-preview' : ''}`}
              >
                {imgSrc ? (
                  <img 
                    src={imgSrc} 
                    alt={index === 0 ? 'New post preview' : `Post ${index}`}
                  />
                ) : (
                  <div className="profile-preview-placeholder"></div>
                )}
                {index === 0 && (
                  <div className="profile-preview-new-badge">New</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileGridPreviewModal
