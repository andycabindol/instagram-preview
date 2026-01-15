import React, { useState } from 'react'
import './Screen3MultiSelect.css'

function Screen3MultiSelect({ onClose, onNext }) {
  const [selectedImages, setSelectedImages] = useState([0, 1])
  
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

  const toggleImage = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter(i => i !== index))
    } else {
      setSelectedImages([...selectedImages, index])
    }
  }

  return (
    <div className="screen3-multiselect">
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
          const imagesToPass = selectedImages.map(idx => images[idx])
          onNext(imagesToPass)
        }}>
          <span>Next</span>
        </button>
      </div>

      {/* Picture Preview */}
      <div className="picture-preview">
        <img src={images[0]} alt="Preview" />
        <img src={images[1]} alt="Preview 2" className="preview-overlay" />
      </div>

      {/* Bottom Navigation Bar */}
      <div className="nav-bar-bottom">
        <div className="recents-section">
          <span className="recents-text">Recents</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="chevron-right">
            <path d="M6 4l4 4-4 4" stroke="#f7f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <button className="gallery-button active">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" strokeWidth="1.5" fill="none"/>
            <rect x="9" y="1" width="6" height="6" strokeWidth="1.5" fill="none"/>
            <rect x="1" y="9" width="6" height="6" strokeWidth="1.5" fill="none"/>
            <rect x="9" y="9" width="6" height="6" strokeWidth="1.5" fill="none"/>
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
          const isSelected = selectedImages.includes(index)
          return (
            <div 
              key={index} 
              className={`image-tile ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleImage(index)}
            >
              <img src={img} alt={`Image ${index + 1}`} />
              {isSelected && (
                <>
                  <div className="overlay"></div>
                  <div className="selection-badge">
                    {selectedImages.indexOf(index) + 1}
                  </div>
                </>
              )}
              {!isSelected && <div className="empty-badge"></div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Screen3MultiSelect

