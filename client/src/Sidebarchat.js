import React from 'react'
import "./Sidebarchat.css"
import { Avatar } from '@mui/material'
const Sidebarchat = () => {
  return (
    <div className='sidebarChat'>
      <Avatar/>
      <div className="sidebarChat__info">
        <h2>Room Name</h2>
        <p>Last Message</p>
      </div>
    </div>
  )
}

export default Sidebarchat