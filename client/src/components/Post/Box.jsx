import axios from "axios";
import { getCookie } from "../../utils/getCookie";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { host } from "../../config/config";
import AddComment from "../Comment/Add";
import CommentBox from '../Comment/Box'
import Skleton from "../Comment/Skleton"
import heartSvg from "../../assets/svg/heart.svg"
import commentSvg from '../../assets/svg/comment.svg'
import shareSvg from '../../assets/svg/share.svg'
import saveSvg from '../../assets/svg/save.svg'
import calculateTimeForUser from "../../utils/calculateTimeForUser";
import threeDotsSvg from '../../assets/svg/three-dots.svg'
import flagSvg from "../../assets/svg/flag.svg"
import Avatar from "../User/Avatar";


import primarySvg from "../../assets/svg/primary.svg"
import secondarySvg from "../../assets/svg/secondary.svg"
import sadSvg from "../../assets/svg/sad.png"
import arrowLeftSvg from "../../assets/svg/arrow-left.svg"
import arrowRightSvg from "../../assets/svg/arrow-right.svg"
import { MainContext } from "../../contexts/Main";
import Username from "../User/Username"
import ReportModal from './ReportModal'
export default function PostBox(props) {

  let { user } = useContext(MainContext)

  let { _id, createdAt, text, reactions_count, reaction, reactions, author_id, comments_count, sources } = props.data
  let { avatar, username } = props.data.author_id


  let [isReacted, setIsReacted] = useState(reaction)
  let [isPostDeleted, setIsPostDeleted] = useState(false)


  const [comments, setComments] = useState([])
  const [commentsStatus, setCommentsStatus] = useState("closed") // closed, loading,  open
  const [reactionsCount, setReeactionsCount] = useState(reactions_count)
  const [showComments, setShowComments] = useState(false)
  const [areCommentsLoading, setAreCommentsLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const showOptionsRef = useRef()
  const [showReportModal, setShowReportModal] = useState(false)
  const [sourceIndex, setSourceIndex] = useState(0)
  const [commentsCount, setCommentsCount] = useState(comments_count)

  async function handleReact() {

  }

  async function loadComments() {
    setCommentsStatus("loading")
    try {
      let result = await axios.post(host + "api/comment/load", { token: getCookie('token'), post_id: _id })
      setComments(result.data)
      console.log("comments", result.data)
      setCommentsStatus("open")
    } catch (err) {
      console.log(err)
    }
  }

  async function deletePost(req, res) {
    try {
      let response = await axios.post(host + "api/post/delete", { token: getCookie('token'), post_id: _id })
      console.log(response.data)
      setIsPostDeleted(true)
    } catch (err) {
      console.log(err)
    }
  }

  async function reactToPost(incoming) {
    if (isReacted == "loading") {
      console.log('Please wait')
      return false
    }
    let first = isReacted, last;
    if (incoming == first) {
      last = ""
    } else {
      last = incoming
    }
    setIsReacted("loading")
    try {
      let response = await axios.post(host + "api/post/react", { token: getCookie('token'), name: last, post_id: _id })
      let val
      if (first == "down" && last == "up") {
        val = 2
      } else if (first == "up" && last == 'down') {
        val = -2
      } else if (first == "down" && last == "") {
        val = 1
      } else if (first == "up" && last == "") {
        val = -1
      }else if (first == "" && last == "up" ){
        val = 1
      }else if (first == "" && last =="down"){
        val = -1
      }
      console.log('val',val)
      setReeactionsCount(reactionsCount + val)
      setIsReacted(last)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

 


  if (isPostDeleted) {
    return <div className="bg-gray-50 mb-6 py-5 px-5 rounded-md flex gap-4 items-center">
      <span className="text-teal-800 font-semibold"> Hey we deleted it </span>
      <img className="rounded-md" src={sadSvg} />
    </div>
  }
  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('page')) {
        console.log('ok')
        setShowOptions(false)
      }
    })
  }, [])


  return (

    <div className="bg-gray-50 mb-6 py-5 px-5 rounded-md post-box "  >

      {showReportModal && <ReportModal post_id={_id} closeModal={() => setShowReportModal(false)} />}

      <header className="flex justify-between px-2 mb-5 items-center" >
        <div className="left flex gap-3">
          <Avatar avatar={avatar} username={username} />
          <Username username={username} className="font-semibold text-xl hover:text-gray-500 " />

        </div>
        <div className="right relative">
          <img onClick={() => setShowOptions(true)}
            className="three w-8 p-1 rounded-full cursor-pointer hover:bg-slate-200 " src={threeDotsSvg} alt="" />
          <div ref={showOptionsRef}
            className={`post-options absolute bg-white   rounded-md  shadow-md z-10   ${showOptions ? "" : "hidden"} `}>

            <button className="px-2 py-3  rounded hover:bg-slate-100  ">  Unfollow</button>
            <Link to={"/profile/" + username  } >
              <button className="px-2 py-3  rounded hover:bg-slate-100    ">  Visit Profile </button>
            </Link>
            <button
              className="px-2 py-3  rounded hover:bg-slate-100 flex gap-2  "
              onClick={() => { setShowOptions(false); setShowReportModal(true) }}
            >
              <img src={flagSvg} className="w-6" />
              <span> Report  </span>
            </button>
            {username == user.username &&
              <button className="text-red-800 px-2 py-3  rounded hover:bg-slate-100 flex gap-2 " onClick={() => deletePost()}  > Delete post </button>
            }
            <button onClick={() => setShowOptions(false)} > Cancel </button>

          </div>
        </div>
      </header>
      <div className="gallery relative mb-4">
        {5 > 3 ? <img style={{ width: "100%" }} onDoubleClick={() => reactToPost('up')} src={"http://localhost:5000/images/" + sources[sourceIndex]} /> : ""}
        {sources.length > 1 &&
          <img onClick={() => sourceIndex + 1 == sources.length ? setSourceIndex(0) : setSourceIndex(sourceIndex + 1)}
            className="w-8 absolute top-1/2 right-4 bg-slate-50 rounded-full p-2 cursor-pointer hover:bg-slate-200  opacity-50 hover:opacity-90 " src={arrowRightSvg} />
        }
        {sources.length > 1 &&
          <img   onClick={() => sourceIndex == 0 ? setSourceIndex(sources.length - 1) : setSourceIndex(sourceIndex - 1)}
            className="transition-all duration-300 w-8 absolute top-1/2 left-4  bg-slate-50 rounded-full p-2 cursor-pointer hover:bg-slate-200 opacity-50 hover:opacity-90  " src={arrowLeftSvg} />
        }

      </div>
      {
        typeof sources == 'object' && sources.length > 1 &&
        <div className="flex justify-center gap-2">
          {
            sources.map((i, j) => {
              return (
                <p  key={j} className={`w-2 h-2 bg-indigo-400  rounded-full  cursor-pointer hover:bg-indigo-600 ${j == sourceIndex ? 'bg-indigo-800  ' : ""} `}
                  onClick={() => setSourceIndex(j)} > </p>
              )
            })
          }
        </div>
      }
      <div className="text font-semibold mb-4 text-xl" >
        {text}
      </div>

      <div className="text-gray-600" > {calculateTimeForUser(createdAt)} </div>
      <div className="actions flex gap-2 items-center mb-5 ">

        <div className="likes flex gap-2  pr-5 items-center ">
          <img className={`w-10 p-2  hover:bg-slate-200 rounded-full
            ${isReacted == "up" ? "bg-slate-300" : ""}`}
            onClick={() => reactToPost('up')}
            src={primarySvg} alt="" />
          <span className="count font-semibold text-xl"> {reactionsCount || 0}   </span>
          <img className={`w-10  p-2 hover:bg-slate-200 rounded-full    ${isReacted == "down" ? "bg-slate-300" : ""}          `}
            onClick={() => reactToPost('down')}
            src={secondarySvg} alt="" />
        </div>

        <button onClick={() => { commentsStatus == "closed" ? loadComments() : commentsStatus == "open" ? setCommentsStatus("closed") : "" }}
          className="flex gap-1 px-5  items-center hover:bg-slate-200">
          <img className="w-8 p-1" src={commentSvg} alt="" />
          <span>  {commentsCount > 0 && commentsCount}  </span>
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
        {commentsStatus != "closed" && <AddComment post_id={_id} refresh={loadComments} />}
        <hr />
        {commentsStatus == "loading" && [...new Array(3)].map((item, index) => <Skleton key={index} />)}
        {commentsStatus == "open" && comments.length > 0 ? comments.map((item, index) => <CommentBox key={index} data={item} />) : ""}
        {commentsStatus == "open" && comments.length == 0 && <div> <p className="text text-gray-500" > Oops, An awesome chance to make  a first comment </p> </div>}
      </div>

    </div>



  )
}