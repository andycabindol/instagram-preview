import React from 'react'
import './PreviewButton.css'

function PreviewButton({ onClick }) {
  return (
    <button className="preview-button" onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="preview-icon">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="3" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
      </svg>
      <span>Preview</span>
    </button>
  )
}

export default PreviewButton
