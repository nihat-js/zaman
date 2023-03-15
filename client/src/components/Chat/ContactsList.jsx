import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../contexts/Main"
import axios from "axios";
import { host } from "../../config/config";
import { token } from "../../utils/utils";
import leftArrow from "../../assets/svg/arrow-left.svg"
import sadSvg from "../../assets/svg/sad.png"
import ContactsBox from "./ContactsBox"
export default function ContactsList({ currentChat,setCurrentChat , socket, leaveRoom }) {

  const { theme } = useContext(MainContext)
  const [currentfolderName, setCurrentFolderName] = useState("primary")
  const [areChatsLoading, setAreChatsLoading] = useState(true)
  const [chats, setChats] = useState([])

  async function loadChats() {
    setAreChatsLoading(true)
    try {
      let response = await axios.post(host + 'api/chat/load-chats', { token: token, folder_name: currentfolderName })
      console.log("loaded Chats", response)
      setChats(response.data)
      setAreChatsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    loadChats()
  }, [currentfolderName])

  return (

    <div style={{height : "700px" }} className={` overflow-y-auto  shadow-md  rounded-md py-2  px-4 ${theme == "dark" ? 'bg-slate-700 text-white' : ""}   `}>
      {currentfolderName != "request" ? <header className='flex justify-between mb-6 transi '>
        <h3 className="title font-bold text-3xl "> Chat </h3>
        <button className='text-sky-900 font-bold ' onClick={() => setCurrentFolderName('request')} > Requests </button>
      </header>
        : <header className='flex justify-between items-center mb-6'>
          <img className='w-8 h-8 p-2 cursor-pointer hover:bg-slate-100 rounded-full' onClick={() => setCurrentFolderName("primary")} src={leftArrow} alt="" />
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
            : chats.map((item, index) => <ContactsBox leaveRoom={leaveRoom} setCurrentFolderName={setCurrentFolderName} currentfolderName={currentfolderName} currentChat={currentChat} setCurrentChat={setCurrentChat} key={index} item={item} />)}
      </div>
    </div>)
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

