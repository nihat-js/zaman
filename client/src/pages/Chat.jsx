import { useEffect, useState } from 'react'
import { getCookie } from '../utils/getCookie'
import axios from 'axios'
import Nav from '../components/Nav'

import sendSvg from '../assets/svg/send.svg'

export default function Chat() {

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const [chats, setChats] = useState([])
  const [text, setText] = useState('')
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
    let response = await axios.post('http://localhost:5000/send-message', { token: getCookie('token'), chat_id: selectedChat, text: text })
    console.log('message sent', response.data.data)
    setText('')
    loadMessages()
  }

  async function loadMessages() {
    let response = await axios.post('http://localhost:5000/load-messages', { chat_id: selectedChat, token: getCookie('token') })
    console.log("loaded Messages", response.data)
    setMessages(response.data.data)

  }


  function send(){

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

      <Nav />
      {/* <section className="start">
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
      </section> */}

      <section className="start py-10">
        <div style={{ maxWidth: "1200px" }} className="mx-auto">
          <div className="row flex gap-12 ">
            <div className="left w-4/12 border-r-gray-400 border-r-2  px-4  ">
              <header className='flex justify-between mb-6'>
                <h3 className="title font-bold text-3xl "> Chat </h3>
                <button className='text-sky-900 font-bold' > Requests </button>
              </header>
              <div className="chat-filter flex gap-2">
                <p className='px-2 py-2 text-gray-600 bg-gray-300 hover:bg-gray-300 rounded-md cursor-pointer ' > All </p>
                <p className='px-2 py-2 text-gray-600  rounded-md  hover:bg-gray-300 cursor-pointer ' > Users </p>
                <p className='px-2 py-2 text-gray-600  rounded-md  hover:bg-gray-300 cursor-pointer ' > Groups </p>
              </div>
              <div className="messages mt-4">
                <Box />
                <Box />
                <Box />
                <Box />
              </div>

            </div>
            <div className="right w-5/12">
              <form action="" className='flex relative ' >
                <textarea type="text" cols={1} rows={1} className='resize-none w-full overflow-y-clip  border border-slate-200  outline-none rounded-md  py-2 px-8'   placeholder='Message'  />
                <div className="absolute  right-2 top-4  rounded-md w-7 h-7 px-1 py-1  img-wrap bg-sky-600  hover:bg-sky-800 cursor-pointer" onClick={() => send() }>
                  <img className='w-full  ' src={sendSvg} alt="" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}


function Box() {
  return (
    <div className='message flex gap-3 items-center py-2 hover:bg-slate-200 rounded-md'>
      <div className='w-14 h-14 bg-slate-200 rounded-full ' > <img src="" alt="" /> </div>
      <div>
        <p className="username text-sm"> Debug </p>
        <p className="last-message text-sm text-gray-600"> Ne vaxt gelirsen </p>
      </div>
    </div>

  )
}