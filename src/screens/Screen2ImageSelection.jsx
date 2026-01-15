import React, { useState } from 'react'
import './Screen2ImageSelection.css'

function Screen2ImageSelection({ onClose, onNext, onMultiSelectToggle, multiSelectMode }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedImages, setSelectedImages] = useState([])
  const [isMultiSelect, setIsMultiSelect] = useState(multiSelectMode)
  
  const images = [
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
  ]


  const handleMultiSelectToggle = () => {
    const newMultiSelectMode = !isMultiSelect
    setIsMultiSelect(newMultiSelectMode)
    onMultiSelectToggle()
    
    // When enabling multi-select, start fresh with current photo as #1
    if (newMultiSelectMode) {
      setSelectedImages([selectedImageIndex])
    }
  }

  const handleImageClick = (index) => {
    if (isMultiSelect) {
      const isCurrentlySelected = selectedImages.includes(index)
      const isCurrentlyPreviewed = index === selectedImageIndex
      
      if (isCurrentlySelected && isCurrentlyPreviewed) {
        // If clicking the currently previewed selected image, deselect it
        const newSelectedImages = selectedImages.filter(i => i !== index)
        setSelectedImages(newSelectedImages)
        // If there are other selected images, preview the most recently selected one
        if (newSelectedImages.length > 0) {
          setSelectedImageIndex(newSelectedImages[newSelectedImages.length - 1])
        } else {
          // If no images selected, preview the clicked one (even though it's deselected)
          setSelectedImageIndex(index)
        }
      } else if (isCurrentlySelected && !isCurrentlyPreviewed) {
        // If clicking a previously selected image, just update preview
        setSelectedImageIndex(index)
      } else {
        // If clicking an unselected image, add it and preview it
        setSelectedImages([...selectedImages, index])
        setSelectedImageIndex(index)
      }
    } else {
      // Single select mode: just change selection
      setSelectedImageIndex(index)
    }
  }

  return (
    <div className="screen2-image-selection">
      {/* Top Navigation Bar */}
      <div className="nav-bar-top">
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#f7f9f9" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <p className="nav-title">New post</p>
        <button className="next-button" onClick={() => {
          // Pass selected images to onNext
          const imagesToPass = isMultiSelect 
            ? selectedImages.map(idx => images[idx])
            : [images[selectedImageIndex]]
          onNext(imagesToPass)
        }}>
          <span>Next</span>
        </button>
      </div>

      {/* Picture Preview */}
      <div className="picture-preview">
        <img src={images[selectedImageIndex]} alt="Preview" />
      </div>

      {/* Bottom Navigation Bar */}
      <div className="nav-bar-bottom">
        <div className="recents-section">
          <span className="recents-text">Recents</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="chevron-right">
            <path d="M6 4l4 4-4 4" stroke="#f7f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <button 
          className={`gallery-button ${isMultiSelect ? 'active' : ''}`}
          onClick={handleMultiSelectToggle}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
            <rect x="9" y="1" width="6" height="6" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
            <rect x="1" y="9" width="6" height="6" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
            <rect x="9" y="9" width="6" height="6" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
          </svg>
        </button>
      </div>

      {/* Image Grid */}
      <div className="image-grid">
        <div className="camera-tile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="14" rx="2" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
            <path d="M8 7V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
            <circle cx="12" cy="14" r="3" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        {images.map((img, index) => {
          const isSelected = isMultiSelect ? selectedImages.includes(index) : index === selectedImageIndex
          const isPreviewed = index === selectedImageIndex
          const isPreviouslySelected = isMultiSelect && selectedImages.includes(index) && !isPreviewed
          const selectionNumber = isMultiSelect && selectedImages.includes(index) 
            ? selectedImages.indexOf(index) + 1 
            : null
          
          return (
            <div 
              key={index} 
              className={`image-tile ${isSelected ? 'selected' : ''}`}
              onClick={() => handleImageClick(index)}
            >
              <img src={img} alt={`Image ${index + 1}`} />
              {isMultiSelect && isPreviewed && (
                <>
                  <div className="overlay overlay-white"></div>
                  {selectionNumber && (
                    <div className="selection-badge">
                      {selectionNumber}
                    </div>
                  )}
                </>
              )}
              {isMultiSelect && isPreviouslySelected && (
                <>
                  <div className="overlay overlay-black"></div>
                  {selectionNumber && (
                    <div className="selection-badge">
                      {selectionNumber}
                    </div>
                  )}
                </>
              )}
              {!isMultiSelect && isSelected && (
                <div className="overlay overlay-white"></div>
              )}
              {isMultiSelect && !isSelected && (
                <div className="empty-badge"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Screen2ImageSelection

