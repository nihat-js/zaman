import axios from "axios";
import { getCookie } from "../../utils/getCookie";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import AddComment from "../Comment/Add";
import CommentBox from '../Comment/Box'
import Skleton from "../Comment/Skleton"
import heartSvg from "../../assets/svg/heart.svg"
import heartOffSvg from "../../assets/svg/heart-off.svg"
import gallerySvg from "../../assets/svg/gallery.svg"

import likeSvg from "../../assets/svg/like.svg"
import likeFilledSvg from '../../assets/svg/like-filled.svg'
import likeColorfulSvg from '../../assets/svg/like-colorful.svg'
import loveSvg from '../../assets/svg/love.svg'
import hahaSvg from '../../assets/svg/haha.svg'
import commentSvg from '../../assets/svg/comment.svg'
import shareSvg from '../../assets/svg/share.svg'
import saveSvg from '../../assets/svg/save.svg'
import getUser from "../../utils/getUser"

import threeDotsSvg from '../../assets/svg/three-dots.svg'
import Avatar from "../Avatar";

const user = getUser()


export default function PostBox(props) {

  const { _id, createdAt, text, reactions, author_id, comments_count, sources } = props.data
  let { avatar, username } = props.data.author_id

  const [comments, setComments] = useState([])
  const [commentsStatus, setCommentsStatus] = useState("closed") // closed, loading,  open
  const [showComments, setShowComments] = useState(false)
  const [areCommentsLoading, setAreCommentsLoading] = useState(false)

  const host = "http://localhost:5000/"
  let isReacted = false

  if (!username) {
    username = user.username
    avatar = user.avatar ? "http://localhost:5000/avatars/" + user.avatar : "http://localhost:5000/avatars/default.svg"
  } else {
    avatar = avatar ? "http://localhost:5000/avatars/" + user.avatar : "http://localhost:5000/avatars/default.svg"
  }

  let totalReactionsCount = 0;
  // let timeForUser = calculateTimeForUser(createdAt)
  reactions.map(item => {
    totalReactionsCount += item.count
  })

  let userLink = "/profile" + username



  async function loadComments() {
    setCommentsStatus("loading")
    try {
      let result = await axios.post(host + "api/comment/load", { token: getCookie('token'), post_id: _id })
      setComments(result.data)
      console.log(result)
    } catch (err) {
      console.log(err)
    }
    setCommentsStatus("open")
  }

  async function reactToPost(name) {
    name = "primary"
    try{
      let response = await axios.post(host + "api/post/react",{ token: getCookie('token'), name: name, post_id: _id })
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }

  async function unreactToPost(name) {
    let response = await axios.post('http://localhost:5000/unreact-to-post',
      { token: getCookie('token'), post_id: _id, name, })
    console.log(response.data)
  }


  return (

    <div className="bg-gray-50 mb-6 py-5 px-5 rounded-md">
      <header className="flex justify-between px-2 mb-5 items-center" >
        <div className="left flex gap-3">
          <Link to={userLink} >
            <img className="w-8 rounded-full border-slate-100 " src={avatar} alt="" />
          </Link>
          <Link to={userLink} >
            <p className="font-semibold text-xl hover:text-gray-500 ">  {username}  </p>
          </Link>

        </div>
        <div className="right">
          <img className="w-8 p-1 rounded-full cursor-pointer hover:bg-slate-200" src={threeDotsSvg} alt="" />
        </div>
      </header>
      <div className="gallery relative mb-8">
        {sources?.[0] && <img onDoubleClick={reactToPost}  src={"http://localhost:5000/images/" + sources[0]} />}
        <div className="indicator"></div>
      </div>
      <div className="actions flex gap-2 items-center mb-5 ">
        <div className="likes flex gap-2  pr-5 items-center ">
          <img className="w-8 p-1  hover:bg-blue-300 rounded-full" src={heartSvg} alt="" />
          <span className="count"> 0  heart </span>
          <img className="w-8 p-1 hover:bg-slate-300 rounded-full " src={heartOffSvg} alt="" />
        </div>
        <button onClick={() => { commentsStatus == "closed" ? loadComments() : commentsStatus == "open" ? setCommentsStatus("closed") : "" }}
          className="flex gap-1 px-5  items-center hover:bg-slate-200">
          <img className="w-8 p-1" src={commentSvg} alt="" />
          <span>  {comments_count > 0 && comments_count}  </span>
        </button>
        <button>
          <img className="w-8 p-1" src={shareSvg} alt="" />
        </button>
        <button className="flex gap-2  items-center group ">
          <img className="w-8 p-1 group-hover:bg-green-300 rounded-full " src={saveSvg} alt="" />
          <span className=" text-gray-600 group-hover:text-green-500 transition-all duration-200" > Save </span>
        </button>
      </div>

      <div className="comments">
        {commentsStatus != "closed" && <AddComment post_id={_id} />}
        {commentsStatus == "loading" && [...new Array(3)].map((item, index) => <Skleton key={index} />)}
        {commentsStatus == "open" && comments.length > 0 && comments.map((item, index) => <CommentBox key={index} data={item} />)}
        {commentsStatus == "open" && comments.length == 0 && <div> <p className="text text-gray-500" > Oops, An awesome chance to make  a first comment </p> </div>}
      </div>

    </div>


 
  )
}