import React, { useState } from 'react'
import Avatar from '../User/Avatar'
import Username from '../User/Username'
import primarySvg from "../../assets/svg/primary.svg"
import secondarySvg from "../../assets/svg/secondary.svg"
import { host } from '../../config/config'
import calculateTimeForUser from '../../utils/calculateTimeForUser'
import axios from 'axios'
import { getCookie } from '../../utils/getCookie'

export default function CommentBox(props) {
  let { _id, text, author_id, sources, reaction, createdAt, score } = props.data
  let { avatar, username, } = author_id
  let src = sources?.length > 0 ? host + "images/" + sources[0] : ""
  // console.log("src", src)

  const [isReacted, setIsReacted] = useState( reaction ? reaction : "none" )
  const [scoreCount, setScoreCount] = useState(score)

  async function handleReact(name) {
    if (isReacted == "loading"){
      return false
    }
    let previous = isReacted 
    
    setIsReacted('loading')
    console.log('name',name)
    try {
      let res = await axios.post(host + "api/comment/react", { token: getCookie('token'), comment_id: _id, name })
      let payload;
      if (previous == "down" && name == "none") {
        payload = 1
      }
      else if (previous == "down" && name == "up") {
        payload = 2
      } else if (previous == "none" && name == "down") {
        payload = -1
      } else if (previous == "none" && name == "up") {
        payload = 1
      } else if (previous == "up" && name == "none") {
        payload = -1
      } else if (previous == "up" && name == "down"){
        payload = -2
      }else{
        payload = "fuck you"
      }
      console.log('le',previous ,name , payload )
      setScoreCount(scoreCount + payload)
      setIsReacted(name)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="comment flex gap-2 py-2 mt-2  px-4 border-slate-50 border rounded-md">
      <div className="left">
        <Avatar username={username} className="w-6" src="" />
      </div>
      <div className="right w-full  ">
        <header className="flex gap-2">
          <Username username={username} className="text-base" />
          <span className="text-gray-500 text-sm"> {calculateTimeForUser(createdAt)} </span>
        </header>
        <div className="body w-full flex justify-between mt-2 font-semibold">
          <div className="left">
            <p className="text select-none" onDoubleClick={() => !isReacted ? handleReact("up") : ""}  > {text}  </p>
            <img className='rounded-md' src={src} style={{ maxWidth: "150px" }} alt="" />
          </div>
          <div className="right ">
            <img onClick={() => isReacted == 'up' ? handleReact('none') : handleReact("up")}
              className={`w-5 p-1 mb-1 cursor-pointer hover:bg-slate-200 ${isReacted == "up" ? "bg-slate-300" : ""}  `}
              src={primarySvg} alt="" />
            <span className='ml-1 mb-1 font-semibold'>  {scoreCount|| 0}  </span>
            <img onClick={() => {   isReacted == "down" ? handleReact('none') :  handleReact('down')  }}
              className={`w-5 p-1 cursor-pointer hover:bg-slate-200  ${isReacted == "down" ? "bg-slate-300" : ""}  `} // 
              src={secondarySvg} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
