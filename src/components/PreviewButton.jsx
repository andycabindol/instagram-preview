import React from 'react'
import { useVariant } from '../variants/VariantProvider'
import './PreviewButton.css'

function PreviewButton({ onClick }) {
  const { isVariant } = useVariant()
  const isV2 = isVariant('v2')
  const isV3 = isVariant('v3')
  const isV4 = isVariant('v4')
  const showGridIcon = isV2 || isV4
  const isRounded = isV2 || isV3 || isV4
  
  return (
    <button className={`preview-button ${isRounded ? 'preview-button-rounded' : ''}`} onClick={onClick}>
      {showGridIcon ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="preview-icon">
          <rect x="3" y="3" width="7" height="7" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
          <rect x="14" y="3" width="7" height="7" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
          <rect x="3" y="14" width="7" height="7" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
          <rect x="14" y="14" width="7" height="7" stroke="#f7f9f9" strokeWidth="1.5" fill="none"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="preview-icon">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="3" stroke="#f7f9f9" strokeWidth="2" fill="none"/>
        </svg>
      )}
      <span>Preview</span>
    </button>
  )
}

export default PreviewButton
