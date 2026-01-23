import React, { useState, useEffect, useRef } from 'react'
import { useVariant } from '../variants/VariantProvider'
import CoverSelectorBottomSheet from '../components/CoverSelectorBottomSheet'
import './PreviewScreen.css'

function PreviewScreen({ images, onCancel, onDone, isMultiSelect, profilePosts = [] }) {
  const { isVariant } = useVariant()
  const isV2 = isVariant('v2')
  const isV4 = isVariant('v4')
  const [tempCoverIndex, setTempCoverIndex] = useState(0)
  const [tempImages, setTempImages] = useState([...images])
  const [isSheetHidden, setIsSheetHidden] = useState(false)
  const previewContentRef = useRef(null)
  
  // Zoom state for cover preview (v2 only, mobile only)
  const [coverZoom, setCoverZoom] = useState(1)
  const [coverPan, setCoverPan] = useState({ x: 0, y: 0 })
  const [isZooming, setIsZooming] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const coverImageRef = useRef(null)
  const lastTouchDistance = useRef(0)
  const lastTouchCenter = useRef({ x: 0, y: 0 })
  const lastSingleTouch = useRef({ x: 0, y: 0 })

  // Initialize cover to first image
  useEffect(() => {
    setTempCoverIndex(0)
    setTempImages([...images])
    // Reset zoom when images change
    setCoverZoom(1)
    setCoverPan({ x: 0, y: 0 })
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

  // Handle pinch zoom for cover preview (v2 only, mobile only)
  useEffect(() => {
    if (!isV2 || !coverImageRef.current) return

    const coverImage = coverImageRef.current
    const isMobile = window.innerWidth <= 450

    if (!isMobile) return

    const getTouchDistance = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const getTouchCenter = (touches) => {
      return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2
      }
    }

    const calculateBounds = (zoom) => {
      const container = coverImage.parentElement
      if (!container) return { maxPanX: 0, maxPanY: 0, minPanX: 0, minPanY: 0 }
      
      // Use offsetWidth/offsetHeight to get actual content size
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight
      
      // When image is scaled by zoom from center:
      // - Scaled width = containerWidth * zoom
      // - Scaled height = containerHeight * zoom
      // - Overflow on each side = (scaledSize - containerSize) / 2
      // Since translate happens after scale, we need to divide by zoom to get the correct pan value
      // The pan values are in the original coordinate space, but the visual movement is zoom * pan
      const overflowX = (containerWidth * zoom - containerWidth) / 2
      const overflowY = (containerHeight * zoom - containerHeight) / 2
      
      // Convert overflow to pan values (divide by zoom since translate is after scale)
      const maxPanX = Math.max(0, overflowX / zoom)
      const maxPanY = Math.max(0, overflowY / zoom)
      
      return { 
        maxPanX,
        maxPanY,
        minPanX: -maxPanX,
        minPanY: -maxPanY
      }
    }

    const constrainPan = (panX, panY, zoom) => {
      const { maxPanX, maxPanY, minPanX, minPanY } = calculateBounds(zoom)
      return {
        x: Math.max(minPanX, Math.min(maxPanX, panX)),
        y: Math.max(minPanY, Math.min(maxPanY, panY))
      }
    }

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault()
        setIsZooming(true)
        setIsPanning(false)
        lastTouchDistance.current = getTouchDistance(e.touches)
        lastTouchCenter.current = getTouchCenter(e.touches)
      } else if (e.touches.length === 1 && coverZoom > 1) {
        // Single touch when zoomed - allow panning
        e.preventDefault()
        setIsPanning(true)
        setIsZooming(false)
        lastSingleTouch.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        }
      }
    }

    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && isZooming) {
        e.preventDefault()
        const currentDistance = getTouchDistance(e.touches)
        const currentCenter = getTouchCenter(e.touches)
        
        const scale = currentDistance / lastTouchDistance.current
        const newZoom = Math.max(1, Math.min(coverZoom * scale, 3)) // Limit zoom between 1x and 3x
        
        // Calculate pan offset based on touch center movement
        // Since translate is after scale, movement needs to be divided by zoom
        const deltaX = (currentCenter.x - lastTouchCenter.current.x) / newZoom
        const deltaY = (currentCenter.y - lastTouchCenter.current.y) / newZoom
        
        // Adjust existing pan for zoom change (scale proportionally)
        const zoomRatio = newZoom / coverZoom
        
        setCoverPan(prev => {
          // Scale existing pan, then add movement
          const adjustedPanX = prev.x * zoomRatio + deltaX
          const adjustedPanY = prev.y * zoomRatio + deltaY
          return constrainPan(adjustedPanX, adjustedPanY, newZoom)
        })
        
        setCoverZoom(newZoom)
        
        lastTouchDistance.current = currentDistance
        lastTouchCenter.current = currentCenter
      } else if (e.touches.length === 1 && isPanning && coverZoom > 1) {
        // Single touch panning when zoomed
        // Since translate is after scale, movement needs to be divided by zoom
        e.preventDefault()
        const deltaX = (e.touches[0].clientX - lastSingleTouch.current.x) / coverZoom
        const deltaY = (e.touches[0].clientY - lastSingleTouch.current.y) / coverZoom
        
        setCoverPan(prev => {
          const newPanX = prev.x + deltaX
          const newPanY = prev.y + deltaY
          return constrainPan(newPanX, newPanY, coverZoom)
        })
        
        lastSingleTouch.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        }
      }
    }

    const handleTouchEnd = (e) => {
      if (e.touches.length < 2) {
        setIsZooming(false)
      }
      if (e.touches.length === 0) {
        setIsPanning(false)
      }
    }

    coverImage.addEventListener('touchstart', handleTouchStart, { passive: false })
    coverImage.addEventListener('touchmove', handleTouchMove, { passive: false })
    coverImage.addEventListener('touchend', handleTouchEnd)

    return () => {
      coverImage.removeEventListener('touchstart', handleTouchStart)
      coverImage.removeEventListener('touchmove', handleTouchMove)
      coverImage.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isV2, coverZoom, isZooming, isPanning])

  // Constrain pan when zoom changes to ensure image always fills container
  useEffect(() => {
    if (!isV2 || !coverImageRef.current) {
      if (coverZoom <= 1) {
        setCoverPan({ x: 0, y: 0 })
      }
      return
    }

    const container = coverImageRef.current.parentElement
    if (!container) return
    
    if (coverZoom <= 1) {
      setCoverPan({ x: 0, y: 0 })
      return
    }

    // Use offsetWidth/offsetHeight for accurate dimensions
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight
    
    // Calculate maximum pan to keep image edges aligned with container edges
    // Since translate happens after scale, we need to divide by zoom
    const overflowX = (containerWidth * coverZoom - containerWidth) / 2
    const overflowY = (containerHeight * coverZoom - containerHeight) / 2
    const maxPanX = Math.max(0, overflowX / coverZoom)
    const maxPanY = Math.max(0, overflowY / coverZoom)
    const minPanX = -maxPanX
    const minPanY = -maxPanY

    // Constrain current pan to valid bounds
    setCoverPan(prev => ({
      x: Math.max(minPanX, Math.min(maxPanX, prev.x)),
      y: Math.max(minPanY, Math.min(maxPanY, prev.y))
    }))
  }, [isV2, coverZoom])

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
    // Reset zoom when cover changes
    setCoverZoom(1)
    setCoverPan({ x: 0, y: 0 })
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
    <div className={`preview-screen ${isV2 ? 'v2' : ''} ${isV4 ? 'v4' : ''}`}>
      {/* Header */}
      <div className="preview-header">
        <button className="preview-header-button" onClick={handleCancel}>
          <span>Cancel</span>
        </button>
        <h2 className="preview-header-title">{isV2 ? 'Adjust preview' : 'Preview'}</h2>
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
              <img 
                ref={index === 0 && isV2 ? coverImageRef : null}
                src={imgSrc} 
                alt={`Preview ${index + 1}`}
                style={index === 0 && isV2 ? {
                  transform: `scale(${coverZoom}) translate(${coverPan.x}px, ${coverPan.y}px)`,
                  transformOrigin: 'center center',
                  transition: (isZooming || isPanning) ? 'none' : 'transform 0.1s ease-out'
                } : {}}
              />
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
