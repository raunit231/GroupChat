import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutline from '@mui/icons-material/SearchOutlined';
import Sidebarchat from './Sidebarchat';
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar__header">
          <Avatar src='https://media.licdn.com/dms/image/C4D03AQHYZNkiN_22ug/profile-displayphoto-shrink_800_800/0/1640715880050?e=2147483647&v=beta&t=yfohBKSP5lVRhL-DyQzUWedK2VG9dI9rdy_Ne2k6cvM'/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutline/>
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <Sidebarchat/>
        <Sidebarchat/>
        <Sidebarchat/>
      </div>
    </div>
  )
}

export default Sidebar