import React, { useState } from 'react'
import StatusBar from '../components/StatusBar'
import './Screen3MultiSelect.css'

function Screen3MultiSelect({ onClose, onNext }) {
  const [selectedImages, setSelectedImages] = useState([0, 1])
  
  const images = [
    'http://localhost:3845/assets/d58c09f5cf9a359f45487f6b73532da8ccff5c91.png',
    'http://localhost:3845/assets/5106d463d5f468766199540286c27f4867aaa522.png',
    'http://localhost:3845/assets/1a32d037c80f7dfa3545f7af86bcc6917f7970a4.png',
    'http://localhost:3845/assets/bdfb593bad47e3aeafacd07ce5135b62040393cb.png',
    'http://localhost:3845/assets/d9768eef539368117344090ebe2bfd56f74400fc.png',
    'http://localhost:3845/assets/b16af3e7086f734dc4e2de909e3a1e7fba92de32.png',
    'http://localhost:3845/assets/ea2e4e64cdf4bd2c76487002933ec5a5161c4ef5.png',
    'http://localhost:3845/assets/247128db3dc790bc8b9430f3e9b82fa1f73eff61.png',
    'http://localhost:3845/assets/2e53e34b5c2f600c0ed0c4c241253f4e6f12018e.png',
    'http://localhost:3845/assets/d6a1c21fdbd9aa83431e92ac0480cf421dcf568a.png',
    'http://localhost:3845/assets/a8fb39e4d4554196fce04fc1081325682f57eebf.png',
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
      <StatusBar dark />
      
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
            <rect x="1" y="1" width="6" height="6" stroke="#0c1014" strokeWidth="1.5" fill="none"/>
            <rect x="9" y="1" width="6" height="6" stroke="#0c1014" strokeWidth="1.5" fill="none"/>
            <rect x="1" y="9" width="6" height="6" stroke="#0c1014" strokeWidth="1.5" fill="none"/>
            <rect x="9" y="9" width="6" height="6" stroke="#0c1014" strokeWidth="1.5" fill="none"/>
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

