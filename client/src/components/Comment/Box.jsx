import React, { useState } from 'react'
import Avatar from '../User/Avatar'

import primarySvg from "../../assets/svg/primary.svg"
import secondarySvg from "../../assets/svg/secondary.svg"
import { host } from '../../config/config'

export default function CommentBox(props) {
  let { text, author_id ,sources, reaction } = props.data
  let {avatar,username ,  } = author_id
  let src  = sources?.length > 0  ? host + "images/" + sources[0] : ""
  console.log("src",src)

  const [isReacted,setIsReacted] = useState(reaction)

  async function  handleReact() {
    t
  }

  return (
    <div className="comment flex gap-2 py-2 mt-2 ">
      <div className="left">
        <Avatar username={username}  className="w-6" src="" />
      </div>
      <div className="right w-full  ">
        <header className="flex gap-2">
          <h4  > {username} </h4>
          <span className="text-gray-500"> 2h ago </span>
        </header>
        <div className="body w-full flex justify-between">
          <div className="left">
            <p className="text"> {text}  </p>
            <img className='rounded-md' src={src} style={{maxWidth:"150px"}} alt="" />
          </div>
          <div className="right ">
            <img onClick={() =>  isReacted == "" ? handleReact('up') : hand } 
            className="w-4 mb-1" src={primarySvg} alt="" />
            <img className="w-4" src={secondarySvg} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
