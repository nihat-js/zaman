import { useContext, useState } from "react"
import { MainContext } from "../../contexts/Main"
import Avatar from "../User/Avatar"
import threeDotsSvg from '../../assets/svg/three-dots.svg'
import muteSvg from "../../assets/svg/mute.svg"

export default function Contacts(props) {
  const { chat_id, unseen_messages_count, } = props.item
  const foo = props.item.isMuted
  const { setCurrentChat, currentChat, currentfolderName, setCurrentFolderName } = props
  const { users_id, last_message } = chat_id
  const { theme } = useContext(MainContext)

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





  let chatTitle = chat_id.target.username
  let chatAvatar = chat_id.target.avatar
  return (
    <div className={`message flex  justify-between items-center py-2  rounded-md cursor-pointer
      ${currentChat == chat_id._id ? "bg-slate-300" : ""}
    ` }
    >
      <div className={`left flex justify-between gap-6 items-center hover:bg-slate-200 ${theme == "dark" ? "hover:bg-slate-600" : ""}  flex-1 py-2 px-2 rounded-md   `}
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
        <img className={`w-8 hover:bg-slate-200 p-1 rounded-md  ${theme == "dark" ? "hover:bg-slate-600" : ""}  `} onClick={() => setShowOptions(!showOptios)} src={threeDotsSvg} alt="" />
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
