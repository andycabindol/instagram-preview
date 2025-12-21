import React from 'react'
import StatusBar from '../components/StatusBar'
import HomeIndicator from '../components/HomeIndicator'
import './Screen4EditPost.css'

function Screen4EditPost({ onClose, onNext, images = [] }) {
  return (
    <div className="screen4-edit-post">
      <StatusBar dark />
      
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
      <div className="image-carousel">
        {images.length > 0 ? (
          images.map((imgSrc, index) => (
            <div key={index} className="carousel-image">
              <img src={imgSrc} alt={`Post ${index + 1}`} />
            </div>
          ))
        ) : (
          // Fallback if no images are passed
          <>
            <div className="carousel-image">
              <img src="http://localhost:3845/assets/d58c09f5cf9a359f45487f6b73532da8ccff5c91.png" alt="Post 1" />
            </div>
            <div className="carousel-image">
              <img src="http://localhost:3845/assets/d58c09f5cf9a359f45487f6b73532da8ccff5c91.png" alt="Post 2" />
              <img src="http://localhost:3845/assets/5106d463d5f468766199540286c27f4867aaa522.png" alt="Post 2 overlay" className="overlay-image" />
            </div>
          </>
        )}
      </div>

      {/* Toolbar - Post Actions */}
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
          <div className="toolbar-button">
            <svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1.5" fill="#f7f9f9"/>
              <circle cx="12" cy="12" r="1.5" fill="#f7f9f9"/>
              <circle cx="12" cy="19" r="1.5" fill="#f7f9f9"/>
            </svg>
            <span>Edit</span>
          </div>
        </div>
      </div>

      {/* Toolbar - Edit Post */}
      <div className="toolbar-edit-post">
        <div className="edit-toolbar">
          <div className="add-image-button">
            <img src={images.length > 0 ? images[0] : "http://localhost:3845/assets/d58c09f5cf9a359f45487f6b73532da8ccff5c91.png"} alt="Thumbnail" />
            <div className="add-overlay">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="#f7f9f9" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <button className="next-button-large" onClick={onNext}>
            <span>Next</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <HomeIndicator dark />
      </div>
    </div>
  )
}

export default Screen4EditPost

