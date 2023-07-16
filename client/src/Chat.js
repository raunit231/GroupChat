import React, { useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import AttachFile from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import MicIcon from '@mui/icons-material/Mic'
import axios from './axios'
const Chat = ({ messages }) => {
  const [input, setInput] = useState('');
  const sendMessage = async(e) => {
    e.preventDefault();
    await axios.post('/messages/new', {
      name:"Raunit Singh",
      message:input,
      timestamp:new Date().toUTCString(),
      received:false,
    });
    setInput("");
  }
  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen ..</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map( message => {
          return <p className={`chat__message ${!message.received && 'chat__receiver'}`}>
          <span className="chat__name">
            {/* {name} */}{message.name}
          </span>
          {/* {message} */}
          {message.message}
          <span className="chat__timestamp">
            {/* {timestamp} */}
            {message.timestamp}
          </span>
        </p>
        })}

      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form >
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
          <button onClick={sendMessage} type='submit' >Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat