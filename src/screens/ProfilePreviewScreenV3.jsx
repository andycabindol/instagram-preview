import React, { useState, useRef } from 'react'
import { useVariant } from '../variants/VariantProvider'
import './ProfilePreviewScreenV3.css'

function ProfilePreviewScreenV3({ images = [], profilePosts = [], onClose, onDone }) {
  const { isVariant } = useVariant()
  const isV3 = isVariant('v3')
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const containerRef = useRef(null)

  // Only show for v3
  if (!isV3) {
    return null
  }

  // Create preview grid with current cover image at top-left (most recent post)
  const previewGrid = [
    images[currentCoverIndex] || images[0], // Current cover image (most recent)
    ...profilePosts // All existing profile posts
  ]

  const handleSwipeStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleSwipeMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleSwipeEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentSlideIndex < images.length - 1) {
        // Swipe left - next slide
        const newIndex = currentSlideIndex + 1
        setCurrentSlideIndex(newIndex)
        setCurrentCoverIndex(newIndex)
      } else if (swipeDistance < 0 && currentSlideIndex > 0) {
        // Swipe right - previous slide
        const newIndex = currentSlideIndex - 1
        setCurrentSlideIndex(newIndex)
        setCurrentCoverIndex(newIndex)
      }
    }
    // Reset touch positions
    touchStartX.current = 0
    touchEndX.current = 0
  }

  const handleDone = () => {
    // Reorder images: current cover becomes first
    const reordered = [
      images[currentCoverIndex],
      ...images.filter((_, i) => i !== currentCoverIndex)
    ]
    onDone(reordered)
  }

  const handleCancel = () => {
    // Keep original order
    onClose()
  }

  return (
    <div className="profile-preview-screen-v3">
      {/* Header */}
      <div className="profile-preview-header">
        <button className="profile-preview-header-button" onClick={handleCancel}>
          <span>Cancel</span>
        </button>
        <h2 className="profile-preview-header-title">Preview on profile</h2>
        <button className="profile-preview-header-button" onClick={handleDone}>
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
              {index === 0 && images.length > 1 ? (
                <>
                  <div 
                    className="cover-preview-slides"
                    ref={containerRef}
                    onTouchStart={handleSwipeStart}
                    onTouchMove={handleSwipeMove}
                    onTouchEnd={handleSwipeEnd}
                    style={{
                      transform: `translateX(-${currentSlideIndex * 100}%)`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    {images.map((imageSrc, imgIndex) => (
                      <div key={imgIndex} className="cover-slide-item">
                        <img src={imageSrc} alt={`Slide ${imgIndex + 1}`} />
                      </div>
                    ))}
                  </div>
                  {/* Slide Indicators */}
                  <div className="cover-slide-indicators">
                    {images.map((_, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`cover-indicator ${imgIndex === currentSlideIndex ? 'active' : ''}`}
                        onClick={() => {
                          setCurrentSlideIndex(imgIndex)
                          setCurrentCoverIndex(imgIndex)
                        }}
                        onTouchStart={(e) => e.stopPropagation()}
                      />
                    ))}
                  </div>
                </>
              ) : imgSrc ? (
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

export default ProfilePreviewScreenV3
