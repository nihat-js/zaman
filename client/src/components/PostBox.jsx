import axios from "axios";
import { getCookie } from "../utils/getCookie";
import { useState } from "react";
import { Link } from 'react-router-dom'

import AddComment from "./AddComment";

import likeSvg from "../assets/svg/like.svg"
import likeFilledSvg from '../assets/svg/like-filled.svg'
import likeColorfulSvg from '../assets/svg/like-colorful.svg'
import loveSvg from '../assets/svg/love.svg'
import hahaSvg from '../assets/svg/haha.svg'
import commentSvg from '../assets/svg/comment.svg'
import shareSvg from '../assets/svg/share.svg'

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

  const { createdAt, text, reactions, _id, author , reaction } = props.data
  let totalReactionsCount = 0;
  let timeForUser = calculateTimeForUser(createdAt)
  reactions.map(item => {
    totalReactionsCount += item.count
  })


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
    <div className=" bg-white mb-6 py-3 px-2" >
      <div className="post-header flex gap-2 ">
      <div className="left">
        <Link to={`/profile/${author.username}`}>
          <img className="w-8  border-2 rounded-full " src={author.pp} alt="" />
        </Link>
      </div>
      <div className="right">
        <div className="header flex gap-2 align-center">
          <h2 className="username font-bold cursor-pointer "> <Link to={"/profile/" + author.username}>  @{author.username}   </Link> </h2>
          <p className="date text-gray-700 text-sm" > {timeForUser}  </p>
        </div>
        <div className="body  mt-2 ">
          {text}
        </div>
        <div className='reactions flex gap-1 mt-2'>
          {reactions.map(item => {
            if (item.name == 'like') {
              return <img className="w-4" src={likeColorfulSvg} />
            } else if (item.name == 'love') {
              return <img className="w-4" src={loveSvg} />
            } else if (item.name == 'haha') {
              return <img className="w-4" src={hahaSvg} />
            }
          })}
          <span>
            {totalReactionsCount}
          </span>
        </div>
        <div className="actions flex gap-2 mt-2">
          <div className="flex gap-1  py-2 px-2 hover:bg-gray-300 cursor-pointer" onClick={() => reactToPost('like')} >
            <img className="w-5 rounded-full " src={ reaction == "like" ? likeFilledSvg : likeSvg} alt="" />
            <span onClick={ () => reaction ? unReactToPost() : reactToPost() }  > Like </span>
          </div>
          <div className="flex gap-1  py-2 px-2 hover:bg-gray-300 cursor-pointer"  >
            <img className="w-5 rounded-full " src={commentSvg} alt="" />
            <span> Comment </span>
          </div>

          <div className="flex gap-1  py-2 px-2 hover:bg-gray-300 cursor-pointer"  >
            <img className="w-5 rounded-full " src={shareSvg} alt="" />
            <span> Share </span>
          </div>

          {/* <button onClick={() => reactToPost('love')} > <img className="w-5 rounded-full" src={loveSvg} /> </button> */}
          {/* <button onClick={() => reactToPost('haha')} > <img className="w-5 rounded-full " src={hahaSvg} />  </button> */}
        </div>
      </div>
      </div>
      <div className="comments">
          <AddComment id={_id} />
      </div>
    </div>
  )
}