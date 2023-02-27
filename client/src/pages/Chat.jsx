import { useContext, useEffect, useState } from 'react'
import { getCookie } from '../utils/getCookie'
import getUser from '../utils/getUser'
import axios from 'axios'

import Nav from '../components/Nav'
import sendSvg from '../assets/svg/send.svg'
import lefArrow from '../assets/svg/arrow-left.svg'
import sadSvg from '../assets/svg/sad.svg'
import threeDotsSvg from '../assets/svg/three-dots.svg'
import { MainContext } from '../contexts/Main'
import {host} from "../config/config"

export default function Chat() {
  const user = useContext(MainContext)

  const [currentfolderName, setCurrentFolderName] = useState("primary")
  const [chats, setChats] = useState([])
  const [areChatsLoading, setAreChatsLoading] = useState(true)
  const [currentChat, setCurrentChat] = useState("")

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const [text, setText] = useState('')


  async function loadChats() {
    setAreChatsLoading(true)
    try {
      let response = await axios.post('http://localhost:5000/api/chat/load-chats', { token: getCookie('token'), folder_name: currentfolderName })
      console.log("loaded Chats", response)
      setChats(response.data)
      setAreChatsLoading(false)
    } catch (err) {
      console.log(err)
    }

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



  useEffect(() => {
    loadChats()
  }, [])

  useEffect(() => {
    loadChats()
  }, [currentfolderName])

  return (
    <div className='chat-page'>

      <Nav />


      <section className="start py-10">
        <div style={{ maxWidth: "1200px" }} className="mx-auto">
          <div className="row flex gap-12 " style={{ minHeight: "600px" }} >
            <div className="left w-4/12 border-r-gray-400 border-r-2  px-4  ">

              {currentfolderName != "request" ? <header className='flex justify-between mb-6 transi '>
                <h3 className="title font-bold text-3xl "> Chat </h3>
                <button className='text-sky-900 font-bold ' onClick={() => setCurrentFolderName('request')} > Requests </button>
              </header>
                : <header className='flex justify-between items-center mb-6'>
                  <img className='w-8 h-8 p-2 cursor-pointer hover:bg-slate-100 rounded-full' onClick={() => setCurrentFolderName("primary")} src={lefArrow} alt="" />
                  <h3 className='font-bold text-2xl'> Chat Requests </h3>
                  <div>  </div>
                </header>
              }

              {currentfolderName != "request" ?
                <div className="chat-filter flex gap-2">

                  <p onClick={() => setCurrentFolderName("primary")}
                    className={`px-2 py-2 text-gray-600  hover:bg-gray-100 rounded-md cursor-pointer ${currentfolderName == "primary" ? "bg-gray-200 animate-pulse" : ""}  `}   > Primary </p>
                  <p onClick={() => { setCurrentFolderName("secondary"); }}
                    className={`px-2 py-2 text-gray-600  rounded-md  hover:bg-gray-200 cursor-pointer ${currentfolderName == "secondary" ? "bg-gray-200 animate-pulse" : ""}  `} > Secondary </p>
                </div>
                : ""
              }

              <div className="messages mt-4">
                {areChatsLoading ? [...new Array(5)].map((item, index) => <SkletonBox key={index} />) :
                  chats.length == 0 ?
                    <div className='flex flex-col items-center' >

                      <img className='w-20' src={sadSvg} alt="" />
                      <div className="alert alert-info shadow-lg bg-sky-700 text-white px-4 py-2 flex gap-2 rounded-md ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className='text-sm'> Looks like it's empty  </span>
                      </div>
                    </div>
                    : chats.map((item, index) => <Box currentChat={currentChat} setCurrentChat={setCurrentChat} key={index} item={item} />)}
              </div>
            </div>
            <div className="right w-5/12">
              <form action="" className='flex relative ' >
                <textarea type="text" cols={1} rows={1} className='resize-none w-full overflow-y-clip  border border-slate-200  outline-none rounded-md  py-2 px-8' placeholder='Message' />
                <div className="absolute  right-2 top-4  rounded-md w-7 h-7 px-1 py-1  img-wrap bg-sky-600  hover:bg-sky-800 cursor-pointer" onClick={() => send()}>
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


function SkletonBox() {
  return (
    <div className='message flex gap-3 items-center py-2  rounded-md select-none'>
      <div className='w-12 h-12 bg-slate-200 rounded-full animate-pulse ' >  </div>
      <div>
        <p className="username text-sm rounded-md text-transparent bg-slate-200 mb-1"> heyiamloading </p>
        <p className="last-message text-sm rounded-md text-transparent bg-slate-200  "> Ne vaxt gelirsen </p>
      </div>
    </div>

  )
}


function Box(props) {
  const { chat_id, unseen_messages_count, currentChat, setCurrentChat } = props.item
  const { users_id, last_message } = chat_id

  const [showOptios, setShowOptions] = useState(false)



  let chatAvatarSource
  let chatTitle

  if (users_id.length == 2) {
    let target = users_id.find(x => x.username != user.username)
    chatAvatarSource = target.avatar ? "http://localhost:5000/avatars/" + target.avatar : "http://localhost:5000/avatars/default.svg"
    chatTitle = target.username
  }

  return (
    <div className='message flex  justify-between items-center py-2 hover:bg-slate-200 rounded-md cursor-pointer' onClick={(e) => {    e.target.tagName.toLowerCase() == "img" ? "" :   setCurrentChat(chat_id._id) }}  >
      <div className="left flex gap-3 items-center ">
        <div className='w-12 h-12 bg-slate-200 rounded-full ' > <img className='rounded-full' src={chatAvatarSource} alt="" /> </div>
        <div>
          <p className="username text-sm mb-1 rounded-md "> {chatTitle} </p>
          <p className="last-message text-sm text-gray-600 rounded-md ">  {last_message} </p>
        </div>
      </div>
      <div className="right relative">
        <img className='w-6' onClick={() => setShowOptions(!showOptios)} src={threeDotsSvg} alt="" />
        <div className={`chat-options   absolute  bg-white  shadow-md rounded-md z-20 ${showOptios ? "" : "hidden"} `} style={{ width: "150px" }}>
          <p className=' py-2 px-1 text-center hover:bg-slate-200 font-bold rounded-tl-md rounded-tr-md text-blue-800 ' > Mute </p>
          <p className=' py-2 px-1  text-center  hover:bg-slate-200  text-blue-800 font-bold ' > Move to Secondary </p>
          <p className=' py-2 px-1  text-red-800   hover:bg-slate-200   font-bold  text-center    ' > Delete </p>
          <p className=' py-2  px-1  text-center mt-1  hover:bg-slate-200    text-blue-800 ' onClick={() =>  setShowOptions(false) } > Cancel</p>

        </div>
      </div>
    </div>


  )
}

function ChatOptions() {

}