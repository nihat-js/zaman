import { useEffect, useState } from 'react'
import  {getCookie}  from '../utils/getCookie'
import getUser from '../utils/getUser'
import axios from 'axios'

import Nav from '../components/Nav'
import sendSvg from '../assets/svg/send.svg'

const user = getUser()

export default function Chat() {


  const [currentfolderName, setCurrentFolderName] = useState("primary")
  const [chats, setChats] = useState([])
  const [areChatsLoading, setAreChatsLoading] = useState(true)


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

  return (
    <div className='chat-page'>

      <Nav />


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
                { areChatsLoading ? [ ...new Array(5) ].map((item,index) => <SkletonBox key={index} />  )    : chats.map((item,index) => <Box key={index} item={item} /> ) }
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
  const {chat_id , unseen_messages_count ,   } = props.item
  const { users_id } = chat_id

  let chatAvatarSource
  let chatTitle 

  if (users_id.length == 2  ){
    let target = users_id.find(x => x.username != user.username  )
    chatAvatarSource = target.avatar ? "http://localhost:5000/avatars/" + target.avatar : "http://localhost:5000/avatars/default.svg"
    chatTitle = target.username
  }

  return (
    <div className='message flex gap-3 items-center py-2 hover:bg-slate-200 rounded-md  '>
      <div className='w-12 h-12 bg-slate-200 rounded-full ' > <img className='rounded-full' src={chatAvatarSource} alt="" /> </div>
      <div>
        <p className="username text-sm mb-1 rounded-md "> {chatTitle} </p>
        <p className="last-message text-sm text-gray-600 rounded-md "> Ne vaxt gelirsen </p>
      </div>
    </div>

  )
}