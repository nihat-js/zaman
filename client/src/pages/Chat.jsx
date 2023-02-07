import { useEffect, useState } from 'react'
import { getCookie } from '../utils/getCookie'
import axios from 'axios'
import './Chat.scss'

export default function Chat() {

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const [chats, setChats] = useState([])
  // const [chatId] = "63e112f7d236da678203de3a"
  // const senderId = "63e1101e1c0a167a1f3c11ec" // nihat
  // const receiverId = ""

  async function loadChats() {
    let response = await axios.post('http://localhost:5000/load-chats', { token: getCookie('token') })
    console.log("loaded Chats"  , response.data.data)
    setChats(response.data.data)
  }

  async function sendMessage(e) {
    e.preventDefault()
    let response = await axios.post('http://localhost:5000/send-message', { token: getCookie('token') })
    console.log('message sent', response.data.data)
  }

  async function loadMessages() {
    let response = await axios.post('http://localhost:5000/load-messages', { chat_id  : selectedChat , token: getCookie('token') })
    console.log("loaded Messages" , response.data)
    setMessages(response.data.data)
    
  }

  function loadMessagesMore() {

  }

  useEffect(() => {
    loadChats()
  }, [])

  return (
    <div className='chat-page'>
      <div className='container'>
        <div className="contacts">
          <ul>
            {chats.map((item, index) => {
              return <li key={index} onClick={() => { setSelectedChat(item.id); loadMessages() }} > <img src={item.target_pp} alt="" width="32px" height="32px" />  {item.target_username}</li>
            })}
          </ul>
        </div>
        <div className="messages">
          <h4 className="message"> Who are you </h4>
          <h5 className="message"> I sent you </h5>
          <form onSubmit={(e) => sendMessage(e)}>
            <input type="text" />
            <button  > Send  </button>
          </form>
        </div>
      </div>
    </div>
  )
}
