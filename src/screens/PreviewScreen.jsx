import React, { useState, useEffect, useRef } from 'react'
import CoverSelectorBottomSheet from '../components/CoverSelectorBottomSheet'
import './PreviewScreen.css'

function PreviewScreen({ images, onCancel, onDone, isMultiSelect, profilePosts = [] }) {
  const [tempCoverIndex, setTempCoverIndex] = useState(0)
  const [tempImages, setTempImages] = useState([...images])
  const [isSheetHidden, setIsSheetHidden] = useState(false)
  const previewContentRef = useRef(null)

  // Initialize cover to first image
  useEffect(() => {
    setTempCoverIndex(0)
    setTempImages([...images])
  }, [images])

  // Handle scroll on preview grid to hide sheet
  useEffect(() => {
    const contentElement = previewContentRef.current
    if (!contentElement) return

    const handleScroll = () => {
      if (contentElement.scrollTop > 0 && !isSheetHidden) {
        setIsSheetHidden(true)
      }
    }

    contentElement.addEventListener('scroll', handleScroll)
    return () => {
      contentElement.removeEventListener('scroll', handleScroll)
    }
  }, [isSheetHidden])

  const handleToggleSheet = () => {
    setIsSheetHidden(!isSheetHidden)
  }

  const handleCoverSelect = (index) => {
    setTempCoverIndex(index)
    // Reorder images: selected cover becomes first
    const reordered = [
      images[index],
      ...images.filter((_, i) => i !== index)
    ]
    setTempImages(reordered)
  }

  const handleDone = () => {
    // Commit: return reordered images with cover as first
    const reordered = [
      images[tempCoverIndex],
      ...images.filter((_, i) => i !== tempCoverIndex)
    ]
    onDone(reordered)
  }

  const handleCancel = () => {
    // Rollback: return original images
    onCancel()
  }

  // Insert the new post (with cover) at position 0, followed by all existing profile posts
  const previewGrid = [
    tempImages[0], // Cover image
    ...profilePosts // All existing profile posts
  ]

  return (
    <div className="preview-screen">
      {/* Header */}
      <div className="preview-header">
        <button className="preview-header-button" onClick={handleCancel}>
          <span>Cancel</span>
        </button>
        <h2 className="preview-header-title">Preview</h2>
        <div style={{ width: '60px' }}></div> {/* Spacer for centering */}
      </div>

      {/* Profile Grid Preview */}
      <div className="preview-content" ref={previewContentRef}>
        <div className="preview-profile-grid">
          {previewGrid.map((imgSrc, index) => (
            <div
              key={index}
              className={`preview-grid-item ${index === 0 ? 'cover-preview' : ''}`}
            >
              <img src={imgSrc} alt={`Preview ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sheet Cover Selector (only in multi-select) */}
      {isMultiSelect && images.length > 1 && (
        <CoverSelectorBottomSheet
          images={images}
          selectedCoverIndex={tempCoverIndex}
          onSelectCover={handleCoverSelect}
          onDone={handleDone}
          isHidden={isSheetHidden}
          onToggleHidden={handleToggleSheet}
        />
      )}
    </div>
  )
}

export default PreviewScreen
