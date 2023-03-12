import React, { useEffect, useState } from 'react'
import Avatar from '../User/Avatar'
import Username from '../User/Username'
import axios from 'axios'
import { host } from '../../config/config'
import { token } from '../../utils/utils'
import io from 'socket.io-client';

export default function ShareModal({ setShowShareModal , postURL }) {
  let socket = io('http://localhost:3000');
  const [contacts, setContacts] = useState([])
  const [folderName, setFolderName] = useState("primary")
  const [selectedContacts,setSelectedContacts] = useState([])
  
  useEffect(()=>{
    return 
  },[])

  async function loadChats() {
    // setAreChatsLoading(true)
    try {
      let res = await axios.post(host + 'api/chat/load-chats', { token: token, folder_name: folderName })
      console.log("loaded Contacts", res.data)
      setContacts(res.data)
      // setAreChatsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  async function sendMultiple(){
    selectedContacts.forEach(q => {
      socket.emit("send", {token,  chat_id : q,  text : postURL })
    })
    setShowShareModal(false)
  }


  useEffect(() => {
    loadChats()
  }, [folderName])

  return (
    <div className="modal fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-20  " style={{ backgroundColor: "rgba(0,0,0,0.86) " }}>
      <div style={{width : "400px"}} className="content bg-white shadow-lg py-5 px-5 rounded ">
        <header className='flex gap-4  mb-4'>
          <p onClick={() => folderName != "primary" ? setFolderName('primary') : ""}
            className={`text-2xl  font-semibold  cursor-pointer ${folderName == "primary" && "pb-1 border-b-2 border-orange-400"} `}  >
            Primary
          </p>
          <p onClick={() => folderName != "secondary" ? setFolderName('secondary') : ""}
            className={` text-2xl  font-semibold cursor-pointer  ${folderName == "secondary" && "pb-1 border-b-2 border-orange-400"} `} >
            Secondary
          </p>
        </header>
        {
          contacts.map((i, j) =>
            <div className='flex gap-2 items-center justify-between'>
              <div className="left flex gap-3 py-1">
                <Avatar avatar={i.chat_id.target.avatar} username={i.chat_id.target.username} style={{ width: "24px", height: "24px" }} />
                <Username username={i.chat_id.target.username} />
              </div>
              <input onChange={ (e) =>  e.target.checked ?  setSelectedContacts( [...selectedContacts , i.chat_id._id ]  )  :setSelectedContacts( selectedContacts.filter(k => k != i.chat_id._id   ) )   }  type="checkbox" className='w-5 h-5' />
            </div>
          )
        }
        <div className="actions flex gap-2 mt-4">
          <button className='flex-1 ' 
          onClick={() => setShowShareModal(false)}
          > Cancel </button>
          <button onClick={() => sendMultiple() }  disabled={selectedContacts.length == 0}
          className={`flex-1 rounded-md text-white bg-blue-600 hover:bg-blue-800 ${selectedContacts.length == 0 && "bg-blue-400 hover:bg-blue-400 cursor-not-allowed "  }   `}
          > Send </button>
        </div>

      </div>
    </div>
  )
}
