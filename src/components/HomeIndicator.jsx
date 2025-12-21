import React from 'react'
import './HomeIndicator.css'

function HomeIndicator({ dark = false }) {
  return (
    <div className={`home-indicator ${dark ? 'dark' : ''}`}>
      <div className="home-indicator-bar"></div>
    </div>
  )
}

export default HomeIndicator

