import React from 'react'
import { useVariant } from '../variants/VariantProvider'
import './ProfilePreviewScreen.css'

function ProfilePreviewScreen({ coverImage, profilePosts = [], onClose }) {
  const { isVariant } = useVariant()
  const isV1 = isVariant('v1')
  const isV1_1 = isVariant('v1.1')
  const isV1_2 = isVariant('v1.2')
  const isV1_3 = isVariant('v1.3')
  const isPreviewVariant = isV1 || isV1_1 || isV1_2 || isV1_3

  // Only show for preview variants (v1, v1.1, v1.2, v1.3)
  if (!isPreviewVariant) {
    return null
  }

  // Create preview grid with cover image at top-left (most recent post)
  const previewGrid = [
    coverImage, // New post's cover image (most recent)
    ...profilePosts // All existing profile posts
  ]

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
          {previewGrid.map((imgSrc, index) => {
            const placeholderImage = 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop'
            return (
              <div
                key={index}
                className={`profile-preview-grid-item ${index === 0 ? 'cover-preview' : ''}`}
              >
                {imgSrc ? (
                  <img 
                    src={imgSrc} 
                    alt={index === 0 ? 'New post preview' : `Post ${index}`}
                    onError={(e) => {
                      // Replace with placeholder image if it fails to load
                      e.target.src = placeholderImage
                      e.target.onerror = null // Prevent infinite loop
                    }}
                  />
                ) : (
                  <div className="profile-preview-placeholder"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProfilePreviewScreen
