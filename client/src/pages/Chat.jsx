import { useEffect, useState } from 'react'
import { getCookie } from '../utils/getCookie'
import axios from 'axios'
import './Chat.scss'

export default function Chat() {

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const [chats, setChats] = useState([])
  const [text,setText] = useState('')
  // const [chatId] = "63e112f7d236da678203de3a"
  // const senderId = "63e1101e1c0a167a1f3c11ec" // nihat
  // const receiverId = ""

  async function loadChats() {
    let response = await axios.post('http://localhost:5000/load-chats', { token: getCookie('token') })
    console.log("loaded Chats", response.data.data)
    setChats(response.data.data)
  }

  async function sendMessage(e) {
    e.preventDefault()
    let response = await axios.post('http://localhost:5000/send-message', { token: getCookie('token') , chat_id : selectedChat , text : text   })
    console.log('message sent', response.data.data)
    setText('')
    loadMessages()
  }

  async function loadMessages() {
    let response = await axios.post('http://localhost:5000/load-messages', { chat_id: selectedChat, token: getCookie('token') })
    console.log("loaded Messages", response.data)
    setMessages(response.data.data)

  }


  useEffect(() => {
    loadChats()
  }, [])

  useEffect(() => {
    if (selectedChat) {
      loadMessages()
    }
  }, [selectedChat])

  return (
    <div className='chat-page'>


      <section className="start">
        <div className="container">
          <div className="row">
            <div className="left">
              {chats.map((item, index) => {
                return <div className='box' key={index} onClick={() => { setSelectedChat(item.id) }} > <img src={item.target_pp} alt="" width="32px" height="32px" /> 
                <h4>{item.target_username} </h4>   
                </div>
              })}
            </div>
            <div className="right">
              <div className="header"></div>
              <div className="body">
                {messages.map((item, index) => {
                  return <div className={item.type} >
                    <img src="" alt="" />
                    <h5  >  {item.text} </h5>
                  </div>
                })}
              </div>
              <div className="footer">
                <form onSubmit={(e) => sendMessage(e)}>
                  <input type="text" value={text} onChange={(e)=> setText(e.target.value) }  autoFocus />
                  <button  > Send  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
