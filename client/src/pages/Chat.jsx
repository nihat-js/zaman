import { useContext, useEffect, useRef, useState } from 'react'
import { getCookie } from '../utils/getCookie'
import axios from 'axios'
import io from 'socket.io-client';
import { MainContext } from '../contexts/Main'
import { host } from "../config/config"

import Nav from '../components/Nav'
import sendSvg from '../assets/svg/send.svg'
import lefArrow from '../assets/svg/arrow-left.svg'
import sadSvg from '../assets/svg/sad.svg'
import threeDotsSvg from '../assets/svg/three-dots.svg'
import Avatar from '../components/User/Avatar'
import muteSvg from "../components/../assets/svg/mute.svg"
import trashSvg from "../assets/svg/trash.svg"
import EmojiPicker from 'emoji-picker-react';
import InputEmoji from "react-input-emoji";


import './Chat.scss'
let socket = io('http://localhost:3000');
export default function Chat() {
  const { user, theme } = useContext(MainContext)

  const [currentfolderName, setCurrentFolderName] = useState("primary")
  const [chats, setChats] = useState([])
  const [areChatsLoading, setAreChatsLoading] = useState(true)
  const [currentChat, setCurrentChat] = useState("")

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [chatTheme, setChatTheme] = useState(0)
  let token = getCookie('token')
  useEffect(() => {

    socket.on('load', (data) => {
      console.log('loading', data)
      setMessages(data)
    })

    socket.on("theme", (x) => {
      setChatTheme(x)
    })

    socket.on("new", (data) => {
      console.log("messages", messages)
      // console.log("new", messages)
      // setMessages(prevState  =>  {message :   [...prevState.messages, data] } )
      // setMessages(messages => [...messages, msg]);
      setMessages((x) => [...x, data])
      // setQuotes(prevState => prevState.concat(msg))
    })

    socket.on('delete', (id) => {
      setMessages((x) => x.filter(y => y._id != id))
    })

  }, [])


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

  async function send() {

    socket.emit('send', { text: text, chat_id: currentChat, token: getCookie('token') })
    setText("")
    // try {
    //   let response = await axios.post(host + "api/chat/message/send", { token: getCookie('token'), chat_id: currentChat, text: textRef.current.value })
    //   console.log('message sent', response.data.data)
    //   textRef.current.value = ""
    //   // loadMessages()
    // } catch (err) {

    // }
  }

  // async function loadMessages() {
  //   try {
  //     let response = await axios.post(host + "api/chat/message/load", { chat_id: currentChat, token: getCookie('token') })
  //     console.log("loaded Messages", response.data)
  //     setMessages(response.data)
  //   } catch (err) {
  //     console.log(err)
  //   }  
  // }
  // !!!!!! now using socket.io 



  useEffect(() => {
    loadChats()
  }, [currentfolderName])

  useEffect(() => {
    if (currentChat == "") {

    } else {
      setChatTheme(0)
      socket.emit('join', { chat_id: currentChat, token: getCookie('token') })
      socket.emit('load', { chat_id: currentChat })

    }

  }, [currentChat])


  function deleteMessage(id) {
    socket.emit('delete', { message_id: id, token: getCookie('token'), chat_id: currentChat })
  }

  function leaveRoom() {
    socket.emit('leave', { chat_id: currentChat })
  }


  function updateTheme(x) {
    console.log('bura gelir')
    socket.emit('theme', { chat_id: currentChat, theme: x })
  }



  return (
    <div className='chat-page'>

      <Nav />


      <section className={`start py-10 min-h-screen bg-slate-50 ${theme == "dark" ? 'bg-slate-800 text-gray-600' : ""} 
        }
      `}>
        <div style={{ maxWidth: "1200px" }} className="mx-auto">
          <div className="row flex gap-6" style={{ minHeight: "700px" }} >
            <div className={`left w-3/12  shadow-md  rounded-md py-2  px-4 ${theme == "dark" ? 'bg-slate-700 text-white' : ""}   `}>

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
            <div className=
              {`right w-7/12  flex flex-col py-5 px-3  ${currentChat == "" ? "hidden" : ""}  
            ${chatTheme == 0 ? "bg-slate-50" : chatTheme == 1 ? "bg-sky-800 " :
                  chatTheme == 2 ? "bg-indigo-800  " : chatTheme == 3 ? "bg-green-800" : chatTheme == 4 ? "bg-yellow-800" : ""} 
            `} style={{ maxHeight: "700px" }}>
              <header className='flex gap-2 py-3 px-2 shadow-md rounded-md mb-5'>
                <p> Select theme </p>
                <div className='flex gap-2'>
                  {
                    ["slate-200", "sky-800", "indigo-800", "green-800", "yellow-800"].map((i, j) => {
                      return <div onClick={() => updateTheme(j)}
                        className={`w-5 h-5 rounded-md hover:opacity-70 bg-${i} ${j == chatTheme ? "border border-blue-800" : ""} `} />
                    })
                  }
                </div>
              </header>


              <div className="messages-div flex-1 px-5   " style={{ overflowY: "auto" }} >
                {
                  messages.map((i, j) => {
                    return (<div key={j}
                      className={`message  flex items-center  mb-3 rounded-lg ${user.username}   ${i.sender_id.username == user.username ? "justify-end  " : "justify-start  "}                     `}>

                      {
                        i.sender_id.username == user.username &&
                        <button className='hover:bg-slate-200' onClick={() => deleteMessage(i._id)} >
                          <img className='w-5 h-5 rounded-md mr-2' src={trashSvg} alt="" />
                        </button>
                      }

                      {i.sender_id.username != user.username &&
                        < Avatar username={i.sender_id.username} avatar={i.sender_id.avatar} />
                      }

                      <p className={`py-3 px-3 mx-2 bg-slate-100  rounded-md 
                          ${chatTheme == 0 ? "" : chatTheme == 1 ? "bg-sky-600 " :
                          chatTheme == 2 ? " text-black  " : chatTheme == 3 ? "bg-green-600" : chatTheme == 4 ? "bg-yellow-600" : ""} 
                      `} > {i.text}  </p>

                      {i.sender_id.username == user.username &&
                        < Avatar username={i.sender_id.username} avatar={i.sender_id.avatar} />
                      }

                    </div>
                    )
                  })
                }
              </div>

              <form action="" className='flex items-center gap-2 ' >
                {/* <textarea type="text" cols={1} rows={1} ref={textRef} onKeyDown={(e) => { e.code == "Enter" ? send(e) : "" }}
                  className='resize-none w-full overflow-y-clip  border border-slate-200  outline-none rounded-3xl  py-2 px-8 ' placeholder='Message' /> */}
                {/* <EmojiPicker onSelect={handleEmojiClick}  /> */}
                <InputEmoji value={text} onChange={setText} onEnter={send} />
                <button className="rounded-full w-12 h-12 p-2  img-wrap bg-sky-600  hover:bg-sky-800 cursor-pointer" onClick={(e) => { e.preventDefault(); send() }}>
                  <img className='w-full  ' src={sendSvg} alt="" />
                </button>
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
  const { chat_id, unseen_messages_count, } = props.item
  const foo = props.item.isMuted
  const { setCurrentChat, currentChat, currentfolderName, setCurrentFolderName } = props
  const { users_id, last_message } = chat_id
  const {theme } = useContext(MainContext)

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
      <div className={`left flex justify-between gap-6 items-center hover:bg-slate-200 ${theme == "dark" ? "hover:bg-slate-600" : "" }  flex-1 py-2 px-2 rounded-md   `}
        onClick={
          () => { socket.emit('leave', { chat_id: currentChat, token: getCookie('token') }); setCurrentChat(chat_id._id) }
        } >
        <div className="left flex gap-2 px-2">
          <Avatar avatar={chatAvatar} username={chatTitle} />
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
        <img className={`w-8 hover:bg-slate-200 p-1 rounded-md  ${theme == "dark" ? "hover:bg-slate-600" : "" }  `} onClick={() => setShowOptions(!showOptios)} src={threeDotsSvg} alt="" />
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