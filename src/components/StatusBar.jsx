import React from 'react'
import './StatusBar.css'

function StatusBar({ dark = false }) {
  return (
    <div className={`status-bar ${dark ? 'dark' : ''}`}>
      <div className="status-bar-time">
        <p>13:37</p>
      </div>
      <div className="status-bar-levels">
        <div className="status-bar-battery">
          <div className="battery-border"></div>
          <div className="battery-cap">
            <svg width="2" height="3" viewBox="0 0 2 3" fill="none">
              <path d="M1 0V3" stroke={dark ? '#ffffff' : '#000000'} strokeWidth="1.328"/>
            </svg>
          </div>
          <div className="battery-capacity"></div>
        </div>
        <div className="status-bar-wifi">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <path d="M8.5 0C5.5 0 2.9 1.2 1 3L8.5 10.5L16 3C14.1 1.2 11.5 0 8.5 0Z" fill={dark ? '#ffffff' : '#000000'}/>
          </svg>
        </div>
        <div className="status-bar-cellular">
          <svg width="19" height="12" viewBox="0 0 19 12" fill="none">
            <rect x="0" y="8" width="3" height="4" fill={dark ? '#ffffff' : '#000000'}/>
            <rect x="4" y="5" width="3" height="7" fill={dark ? '#ffffff' : '#000000'}/>
            <rect x="8" y="2" width="3" height="10" fill={dark ? '#ffffff' : '#000000'}/>
            <rect x="12" y="0" width="3" height="12" fill={dark ? '#ffffff' : '#000000'}/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default StatusBar

