import React from 'react'
import { useVariant } from '../variants/VariantProvider'
import './ProfilePreviewScreen.css'

function ProfilePreviewScreen({ coverImage, profilePosts = [], onClose }) {
  const { isVariant } = useVariant()
  const isV1 = isVariant('v1')

  // Only show for v1
  if (!isV1) {
    return null
  }

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
    <div className="profile-preview-screen">
      {/* Header */}
      <div className="profile-preview-header">
        <div className="profile-preview-header-spacer"></div>
        <h2 className="profile-preview-header-title">Preview on profile</h2>
        <button className="profile-preview-header-button" onClick={onClose}>
          <span>Done</span>
        </button>
      </div>

      {/* Profile Grid Preview */}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfilePreviewScreen
