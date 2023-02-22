import React from 'react'
import Avatar from '../Avatar'
import heartSvg from "../../assets/svg/heart.svg"
import heartOffSvg from "../../assets/svg/heart-off.svg"

export default function CommentBox(props) {
  const { text, author_id } = props.data
  const {avatar,username } = author_id

  async function reactToComment() {

  }

  return (
    <div className="comment flex gap-2">
      <div className="left">
        <Avatar className="w-6" src="" />
      </div>
      <div className="right w-full  ">
        <header className="flex gap-2">
          <h4  > {username} </h4>
          <span className="text-gray-500"> 2h ago </span>
        </header>
        <div className="body w-full flex justify-between">
          <div className="left">
            <p className="text"> {text}  </p>
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
