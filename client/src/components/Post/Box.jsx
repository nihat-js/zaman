import axios from "axios";
import { getCookie } from "../../utils/getCookie";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { host } from "../../config/config";
import AddComment from "../Comment/Add";
import CommentBox from '../Comment/Box'
import Skleton from "../Comment/Skleton"

import calculateTimeForUser from "../../utils/calculateTimeForUser";
import threeDotsSvg from '../../assets/svg/three-dots.svg'
import Avatar from "../User/Avatar";
import Gallery from "./Gallery";


import sadSvg from "../../assets/svg/sad.png"
import { MainContext } from "../../contexts/Main";
import Username from "../User/Username"
import ReportModal from './ReportModal'
import Options from "./Options";
import Actions from "./Actions";
export default function PostBox(props) {

  let { user,theme } = useContext(MainContext)

  let { _id, createdAt, reactions_count, reaction, reactions, author_id, comments_count, sources , saved } = props.data
  let { avatar, username } = props.data.author_id


  let [isPostDeleted, setIsPostDeleted] = useState(false)


  let [text, setText] = useState(props.data.text)
  const [comments, setComments] = useState([])
  const [commentsStatus, setCommentsStatus] = useState("closed") // closed, loading,  open
  const [showComments, setShowComments] = useState(false)
  const [areCommentsLoading, setAreCommentsLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  async function edit() {
    try {
      let res = await axios.post(host + "api/post/edit", { token: getCookie('token'), post_id: _id, text: text })
    } catch (err) {
      console.log(err)
    }
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

    <div className={`bg-slate-50 mb-6 py-5 px-5 rounded-md post-box ${theme == "dark" ? "bg-slate-700 text-slate-800" : ""}  `   } >

      {showReportModal && <ReportModal post_id={_id} closeModal={() => setShowReportModal(false)} />}

      <header className="flex justify-between px-2 mb-5 items-center" >
        <div className="left flex gap-3">
          <Avatar avatar={avatar} username={username} />
          <Username username={username} className="font-semibold text-xl hover:text-gray-500 " />

        </div>
        <div className="right relative">
          <img onClick={() => setShowOptions(true)}
            className="three w-8 p-1 rounded-full cursor-pointer hover:bg-slate-200 " src={threeDotsSvg} alt="" />
          <Options showOptions={showOptions} setShowOptions={setShowOptions} 
           setShowReportModal={setShowReportModal} deletePost={deletePost} username={username} setIsEditing={setIsEditing}  />
        </div>
      </header>
      <Gallery sources={sources} />
      
      <div className="text mt-2 "  >
        <input spellCheck={false} disabled={!isEditing} className={` bg-transparent text font-semibold mb-1 mt-2 px-2 py-2 text-xl outline-none w-full   ${isEditing ? "border-b-2 border-b-gray-300 " : ""} `}
          onChange={(e) => setText(e.target.value)} value={text} />
        {
          isEditing && <div className="flex justify-end mt-3 gap-2">
            <button className="text-blue-700  font-bold py-2 px-4   hover:bg-white rounded-md"
              onClick={() => setIsEditing(false)}> Cancel  </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => { setIsEditing(false); edit() }} > Save  </button>

          </div>
        }
      </div>

      <div className="text-gray-400 text-sm hover:opacity-50 " > {calculateTimeForUser(createdAt)} </div>
        <Actions  _id={_id} saved={saved} reaction={reaction} loadComments={loadComments} 
         commentsStatus={commentsStatus} comments_count={comments_count} reactions_count={reactions_count} />
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