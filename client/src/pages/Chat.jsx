import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client';

import { token } from '../utils/utils';
import { MainContext } from '../contexts/Main'
import Nav from '../components/Nav'
import './Chat.scss'

import ContactsList from '../components/Chat/ContactsList';
import Conversation from "../components/Chat/Conversation"
let socket = io('http://localhost:3000');
export default function Chat() {
  const { user, theme } = useContext(MainContext)

  const [currentChat, setCurrentChat] = useState("")
  const [messages, setMessages] = useState([])
  const [chatTheme, setChatTheme] = useState(0)


  useEffect(() => {
    socket.on('load', (data) => {
      console.log('debuggging problem',data )
      setMessages(data)
    })
    socket.on("theme", (x) => {
      setChatTheme(x)
    })
    socket.on("new", (data) => {
      console.log("messages", messages)
      setMessages((x) => [...x, data])
    })
    socket.on('delete', (id) => {
      setMessages((x) => x.filter(y => y._id != id))
    })

  }, [])


  async function send(text) {
    socket.emit('send', { text: text, chat_id: currentChat, token: token })
  }
  // !!!!!! now using socket.io 
  function deleteMessage(id) {
    socket.emit('delete', { message_id: id, token, chat_id: currentChat })
  }
  function updateTheme(x) {
    // console.log('bura gelir')
    socket.emit('theme', { chat_id: currentChat, theme: x })
  }
  function leaveRoom(){
    socket.emit('leave', { chat_id: currentChat, token: token })
  }


  useEffect(() => {
    if (currentChat == "") {
    } else {
      setChatTheme(0)
      socket.emit('join', { chat_id: currentChat, token })
      socket.emit('load', { chat_id: currentChat })
    }

  }, [currentChat])


  return (
    <div className='chat-page'>
      <Nav />

      <main className={` bg-slate-50   ${theme == "dark" ? 'bg-slate-800 text-gray-600' : ""}  `} >
        <div style={{ maxWidth: "1200px"  }} className={`start py-10 min-h-screen mx-auto  flex  `}>
          <div className="left w-3/12 " >
            <ContactsList socket={socket} leaveRoom={leaveRoom} currentChat={currentChat}  setCurrentChat={setCurrentChat} />
          </div>
          <div className="right w-9/12">
            <Conversation chatTheme={chatTheme} currentChat={currentChat} messages={messages} deleteMessage={deleteMessage} send={send} />
          </div>
        </div >
      </main>


    </div >
  )
}



