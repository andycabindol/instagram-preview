import React, { useState } from 'react'
import { useVariant } from '../variants/VariantProvider'
import './CoverSelectorBottomSheet.css'

function CoverSelectorBottomSheet({ images, selectedCoverIndex, onSelectCover, onDone, isHidden, onToggleHidden }) {
  const { isVariant } = useVariant()
  const isV2 = isVariant('v2')

  if (!images || images.length <= 1) {
    return null // Only show if multiple images
  }

  return (
    <div className={`cover-selector-bottom-sheet ${isHidden ? 'hidden' : ''} ${isV2 ? 'v2' : ''}`}>
      <div className="cover-selector-grabber" onClick={onToggleHidden}>
        <div className="grabber-handle"></div>
      </div>
      <div className="cover-selector-content">
        <div className="cover-selector-header">
          <span className="cover-selector-title">Select cover</span>
        </div>
        <div className="cover-selector-thumbnails">
          {images.map((imgSrc, index) => (
            <div
              key={index}
              className={`cover-thumbnail ${selectedCoverIndex === index ? 'selected' : ''}`}
              onClick={() => onSelectCover(index)}
            >
              <img src={imgSrc} alt={`Cover ${index + 1}`} />
              {selectedCoverIndex === index && (
                <div className="cover-thumbnail-check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="cover-selector-done-button" onClick={onDone}>
          <span>Done</span>
        </button>
      </div>
    </div>
  )
}

export default CoverSelectorBottomSheet
