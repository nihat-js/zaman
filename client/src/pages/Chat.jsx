import { useState } from 'react'
import { getCookie } from '../utils/getCookie'
import axios from 'axios'
import './Chat.scss'

export default function Chat() {

  const [messages, setMessages] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [selectedChat,setSelectedChat] = useState(null)
  
  // const [chatId] = "63e112f7d236da678203de3a"
  // const senderId = "63e1101e1c0a167a1f3c11ec" // nihat
  // const receiverId = ""

  

 async function sendMessage(e) {
  e.preventDefault()
  console.log('we are sending')
  let response = await axios.post('http://localhost:5000/send-message' , { token : getCookie('token') } )
  console.log(response.data)
  }

  function loadMessages() {


  }

  function loadMessagesMore(){
     
  }

  return (
    <div className='chat-page'>
      <div className='container'>
        <div className="contacts">
          <ul>
            <li> Nihat </li>
            <li> Eltun  </li>
            <li> Cosqun </li>
          </ul>
        </div>
        <div className="messages">
          <h4 className="message"> Who are you </h4>
          <h5 className="message"> I sent you </h5>
          <form onSubmit={(e) => sendMessage(e)}>
            <input  type="text" />
            <button  > Send  </button>
          </form>
        </div>
      </div>
    </div>
  )
}
