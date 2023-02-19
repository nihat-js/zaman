import axios from "axios";
import { getCookie } from "../utils/getCookie";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import AddComment from "./AddComment";
import CommentBox from './CommentBox'

import likeSvg from "../assets/svg/like.svg"
import likeFilledSvg from '../assets/svg/like-filled.svg'
import likeColorfulSvg from '../assets/svg/like-colorful.svg'
import loveSvg from '../assets/svg/love.svg'
import hahaSvg from '../assets/svg/haha.svg'
import commentSvg from '../assets/svg/comment.svg'
import shareSvg from '../assets/svg/share.svg'
import saveSvg from '../assets/svg/save.svg'

const getMonthName = (month, lang = "en") => {
  const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthNamesAz = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
  if (lang === "en") {
    return monthNamesEn[month - 1]
  } else if (lang === "az") {
    return monthNamesAz[month - 1]
  }
}

const calculateTimeForUser = (stringDate) => {
  let text;
  let original = new Date(stringDate);
  let current = new Date()
  if (current.getDate() == original.getDate()) {
    text = "Today" + original.getHours() + ":" + original.getMinutes()
  } else if (current.getDate() == original.getDate() + 1) {
    text = "Yesterday" + original.getHours() + ":" + original.getMinutes()
  }
  else if (current.getFullYear() == original.getFullYear()) {
    text = original.getDate() + " " + getMonthName(original.getUTCMonth()) + " " + original.getHours() + ":" + original.getMinutes()
  }
  return text
}

export default function PostBox(props) {

  const [isCommentsExtended, setIsCommentsExtended] = useState(false);
  const { createdAt, text, reactions, _id, author_id, reaction, comments_count } = props.data
  const { avatar, username } = props.data.author_id
  let totalReactionsCount = 0;
  let timeForUser = calculateTimeForUser(createdAt)
  reactions.map(item => {
    totalReactionsCount += item.count
  })

  useEffect(() => {
    if (isCommentsExtended) {

    }
  }, [isCommentsExtended])



  async function reactToPost(name) {
    let response = await axios.post('http://localhost:5000/react-to-post',
      { token: getCookie('token'), post_id: _id, name, })
    console.log(response.data)
  }

  async function unreactToPost(name) {
    let response = await axios.post('http://localhost:5000/unreact-to-post',
      { token: getCookie('token'), post_id: _id, name, })
    console.log(response.data)
  }


  return (
    <div className=" bg-gray-50 mb-6 py-3 px-5" >
      <div className="post-header flex gap-4 ">
        <div className="left">
          <Link to={`/profile/${author_id.username}`}>
            <img className="w-8  border-2 rounded-full" src={avatar ? "http://localhost:5000/avatars/" + avatar : "http:/localhost:5000/avatars/default.svg"} alt="" />
          </Link>
        </div>
        <div className="right">
          <header className=" flex gap-2 items-center">
            <h2 className="username font-bold cursor-pointer text-sm "> <Link to={"/profile/" + author_id.username}>  @{author_id.username}   </Link> </h2>
            <p className="date text-gray-700 text-sm " > {timeForUser}  </p>
          </header>
          <div className="body  mt-2 ">
            {text}
          </div>
          <div className='reactions flex gap-1 mt-2'>
            {reactions.map((item, index) => {
              if (item.name == 'like') {
                return <img key={index} className="w-4" src={likeColorfulSvg} />
              } else if (item.name == 'love') {
                return <img key={index} className="w-4" src={loveSvg} />
              } else if (item.name == 'haha') {
                return <img key={index} className="w-4" src={hahaSvg} />
              }
            })}
            <span>
              {totalReactionsCount > 0 && totalReactionsCount}
            </span>
          </div>
          <div className="actions flex gap-2 mt-2 mb-5">
            <div className="flex gap-1  py-2 px-2 hover:bg-gray-300 cursor-pointer" onClick={() => reactToPost('like')} >
              <img className="w-5 rounded-full " src={reaction == "like" ? likeFilledSvg : likeSvg} alt="" />
              <span onClick={() => reaction ? unReactToPost() : reactToPost()}  > Like </span>
            </div>
            <div className="flex gap-1  py-2 px-2 hover:bg-gray-300 cursor-pointer"  >
              <img className="w-5 rounded-full " src={commentSvg} alt="" />
              <span> {comments_count} </span>
              <span> Comment </span>
            </div>
            <div className="flex gap-2   py-2 px-2 hover:bg-gray-300 cursor-pointe">
              <img className="w-5" src={saveSvg} alt="" />
              <span> Save </span>
            </div>

            <div className="flex gap-1  py-2 px-2 hover:bg-gray-300 cursor-pointer"  >
              <img className="w-5 rounded-full " src={shareSvg} alt="" />
              <span> Share </span>
            </div>

          </div>

          <AddComment id={_id} />
          <div className="comments"></div>
        </div>

      </div>
    </div>
  )
}