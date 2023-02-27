import { useContext, useEffect, useRef, useState } from 'react'
import { getCookie } from '../utils/getCookie'
import getUser from '../utils/getUser'
import axios from 'axios'

import Nav from '../components/Nav'
import sendSvg from '../assets/svg/send.svg'
import lefArrow from '../assets/svg/arrow-left.svg'
import sadSvg from '../assets/svg/sad.svg'
import threeDotsSvg from '../assets/svg/three-dots.svg'
import { MainContext } from '../contexts/Main'
import { host } from "../config/config"
import Avatar from '../components/User/Avatar'
import muteSvg from "../components/../assets/svg/mute.svg"

export default function Chat() {
  const {user} = useContext(MainContext)
  const textRef = useRef()
  const [currentfolderName, setCurrentFolderName] = useState("primary")
  const [chats, setChats] = useState([])
  const [areChatsLoading, setAreChatsLoading] = useState(true)
  const [currentChat, setCurrentChat] = useState("")

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')


  async function loadChats() {
    setAreChatsLoading(true)
    try {
      let response = await axios.post(host + 'api/chat/load-chats', { token: getCookie('token'), folder_name: currentfolderName })
      console.log("loaded Chats", response)
      setChats(response.data)
      setAreChatsLoading(false)
    } catch (err) {
      console.log(err)
    }

  }

  async function send(e) {
    e.preventDefault()
    try {
      let response = await axios.post(host + "api/chat/message/send", { token: getCookie('token'), chat_id: currentChat, text: textRef.current.value })
      console.log('message sent', response.data.data)
      textRef.current.value = ""
      // loadMessages()
    } catch (err) {

    }
  }

  async function loadMessages() {
    try {
      let response = await axios.post(host + "api/chat/message/load", { chat_id: currentChat, token: getCookie('token') })
      console.log("loaded Messages", response.data)
      setMessages(response.data)
    } catch (err) {
      console.log(err)
    }

  }



  useEffect(() => {
    loadChats()
  }, [currentfolderName])

  useEffect(() => {
    if (currentChat != "") {
      loadMessages()
    }
  }, [currentChat])


  return (
    <div className='chat-page'>

      <Nav />


      <section className="start py-10 min-h-screen bg-slate-50 ">
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
                    <div className='flex flex-col ' >

                      <img className='w-20' src={sadSvg} alt="" />
                      <div className="alert alert-info shadow-lg bg-sky-700 text-white px-4 py-2 flex gap-2 rounded-md ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className='text-sm'> Looks like it's empty  </span>
                      </div>
                    </div>
                    : chats.map((item, index) => <Box setCurrentFolderName={setCurrentFolderName} currentfolderName={currentfolderName} currentChat={currentChat} setCurrentChat={setCurrentChat} key={index} item={item} />)}
              </div>
            </div>
            <div className="right w-5/12 flex flex-col-reverse " style={{ maxHeight: "800px" }}>

              <form action="" className='flex items-center gap-2 ' >
                <textarea type="text" cols={1} rows={1} ref={textRef}
                  className='resize-none w-full overflow-y-clip  border border-slate-200  outline-none rounded-md  py-2 px-8' placeholder='Message' />
                <div className=
                  "rounded-md w-8 h-8 px-1 py-1  img-wrap bg-sky-600  hover:bg-sky-800 cursor-pointer" onClick={(e) => send(e)}>
                  <img className='w-full  ' src={sendSvg} alt="" />
                </div>
              </form>

              <div className="messages   ">
                {
                  messages.map((i, j) => {
                    return(  <div className={`message  flex  mb-3 rounded-lg ${user.username}   ${i.sender_id.username == user.username ? "justify-end " : "justify-start"} `}>
                      <p className='py-2 px-3 bg-slate-100' > {i.text}  </p>
                      <Avatar username={i.sender_id.username} avatar={i.sender_id.avatar} />
                    </div>
                    )
                  })
                }
              </div>

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
  const { chat_id, unseen_messages_count, } = props.item
  const foo = props.item.isMuted
  const { setCurrentChat, currentChat, currentfolderName, setCurrentFolderName } = props
  const { users_id, last_message } = chat_id

  const [showOptios, setShowOptions] = useState(false)
  const [isMuted, setIsMuted] = useState(foo)

  async function move(folder_name) {
    setShowOptions(false)
    try {
      let response = await axios.post(host + "api/chat/move", { chat_id: chat_id._id, token: getCookie('token'), folder_name })
      console.log("moving to", response.data)
      setCurrentFolderName(folder_name)
    } catch (err) {
      console.log(err)
    }
  }

  async function mute() {
    let val;
    isMuted == 1 ? val = 0 : val = 1;
    setShowOptions(false)
    try {
      let response = await axios.post(host + "api/chat/mute", { chat_id: chat_id._id, token: getCookie('token'), val, })
      console.log("changing  ", response.data)
      setIsMuted(val)
    } catch (err) {
      console.log(err)
    }
  }



  // console.log("box", currentChat, chat_id)


  let chatTitle = chat_id.target.username
  let chatAvatar = chat_id.target.avatar
  return (
    <div className={`message flex  justify-between items-center py-2  rounded-md cursor-pointer
      ${currentChat == chat_id._id ? "bg-slate-300" : ""}
    ` }
    >
      <div className="left flex justify-between gap-3 items-center hover:bg-slate-200 flex-1 py-2 px-1   " onClick={() => setCurrentChat(chat_id._id)}  >
        <div className="left flex gap-2">
          <Avatar username={chatAvatar} />
          <div className='flex '>
            <p className="username text-xl mb-1 rounded-md "> {chatTitle} </p>
            <p className="last-message text-sm text-gray-600 rounded-md ">  {last_message} </p>
          </div>
        </div>
        <div className="right">
          {isMuted == 1 ? <img className='w-6' src={muteSvg} alt="" /> : ""}
        </div>
      </div>
      <div className="right relative">
        <img className='w-8 hover:bg-slate-200 p-1 ' onClick={() => setShowOptions(!showOptios)} src={threeDotsSvg} alt="" />
        <div className={`chat-options   absolute  bg-white  shadow-md rounded-md z-20 ${showOptios ? "" : "hidden"} `} style={{ width: "150px" }}>
          <p className={` py-2 px-1 text-center hover:bg-slate-200 font-bold rounded-tl-md rounded-tr-md text-blue-800 
            
          `} onClick={() => mute()} >  {isMuted == 1 ? "Unmute" : "Mute"}   </p>

          {
            currentfolderName == "request" ?
              <p className=' py-2 px-1  text-center  hover:bg-slate-200  text-blue-800 font-bold ' onClick={() => move('primary')} >
                Move to Primary
              </p> :
              currentfolderName == "primary" ?
                <p className=' py-2 px-1  text-center  hover:bg-slate-200  text-blue-800 font-bold ' onClick={() => move('secondary')}  >
                  Move to Secondary </p> :
                currentfolderName == "secondary" ?
                  <p className=' py-2 px-1  text-center  hover:bg-slate-200  text-blue-800 font-bold ' onClick={() => move('primary')} > Move to Primary </p> :
                  ""
          }
          <p className=' py-2 px-1  text-red-800   hover:bg-slate-200   font-bold  text-center    ' > Delete </p>
          <p className=' py-2  px-1  text-center mt-1  hover:bg-slate-200    text-blue-800 ' onClick={() => setShowOptions(false)} > Cancel</p>

        </div>
      </div>
    </div>


  )
}

function ChatOptions() {

}