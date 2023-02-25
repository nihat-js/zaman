import React from 'react'
import Avatar from '../User/Avatar'
import heartSvg from "../../assets/svg/heart.svg"
import heartOffSvg from "../../assets/svg/heart-off.svg"

export default function CommentBox(props) {
  let { text, author_id ,sources } = props.data
  let {avatar,username ,  } = author_id
  let host = "http://localhost:5000/"
  let src  = sources?.length > 0  ? host + "images/" + sources[0] : ""
  console.log("src",src)
  async function reactToComment() {

  }

  return (
    <div className="comment flex gap-2">
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
          <div className="right">
            <img className="w-6" src={heartSvg} alt="" />
            <img className="w-6" src={heartOffSvg} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
