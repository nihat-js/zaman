import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { host } from '../../config/config'
import commentSvg from '../../assets/svg/comment.svg'
import shareSvg from '../../assets/svg/share.svg'
import saveSvg from '../../assets/svg/save.svg'
import saveFillSvg from "../../assets/svg/save-fill.svg"
import primarySvg from "../../assets/svg/primary.svg"
import secondarySvg from "../../assets/svg/secondary.svg"

import linkSvg from "../../assets/svg/link.svg"
import { token } from '../../utils/utils'
import ShareModal from './ShareModal'
export default function Actions({ reaction, commentsStatus, loadComments, reactions_count, comments_count, saved, _id }) {
  const postURL = "http://localhost:5173/post/" + _id
  let [isReacted, setIsReacted] = useState(reaction ? reaction : "none")
  const [reactionsCount, setReeactionsCount] = useState(reactions_count)
  const [commentsCount, setCommentsCount] = useState(comments_count)
  const [isSaved, setIsSaved] = useState(saved)
  const [showShareModal, setShowShareModal] = useState(false)
  async function reactToPost(name) {
    if (isReacted == "loading") {
      console.log('Please wait')
      return false
    }
    // console.log("name",isReacted)
    let previous = isReacted
    setIsReacted("loading")
    try {
      let response = await axios.post(host + "api/post/react", { token, name: name, post_id: _id })
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
      } else if (previous == "up" && name == "down") {
        payload = -2
      } else {
      }
      // console.log('payload', payload)
      setReeactionsCount(reactionsCount + payload)
      setIsReacted(name)
      // console.log(response.data)
    } catch (err) {
      console.log(err)
    }


  }

  async function copy() {
    window.navigator.clipboard.writeText(postURL)
  }

  


  async function save() {
    let val = isSaved ? 0 : 1
    console.log(val)
    try {
      let res = await axios.post(host + "api/post/save", { token, post_id: _id, val })
      setIsSaved(!isSaved)
    } catch (err) {
      console.log(err)
    }
  }

 


  return (
    <div className="actions flex gap-2 justify-between mb-5 mt-2 ">
      {showShareModal &&   <ShareModal setShowShareModal={setShowShareModal} postURL={postURL}  />       }
      <div className="left flex gap-2 ">
        <div className="likes flex gap-2   items-center ">
          <img className={`w-8 p-2  hover:bg-slate-200 rounded-full
        ${isReacted == "up" ? "bg-slate-300" : ""}`}
            onClick={() => isReacted == 'up' ? reactToPost('none') : reactToPost('up')}
            src={primarySvg} alt="" />
          <span className="count font-semibold text-xl"> {reactionsCount || 0}   </span>
          <img className={`w-8 p-2 hover:bg-slate-200 rounded-full    ${isReacted == "down" ? "bg-slate-300" : ""}          `}
            onClick={() => isReacted == 'down' ? reactToPost('none') : reactToPost('down')}
            src={secondarySvg} alt="" />
        </div>

        <button onClick={() => { commentsStatus == "closed" ? loadComments() : commentsStatus == "open" ? setCommentsStatus("closed") : "" }}
          className="flex gap-1 px-1  items-center hover:bg-slate-200 rounded-md">
          <img className="w-8 p-1" src={commentSvg} alt="" />
          <span className='font-semibold'>  {commentsCount > 0 ? commentsCount + " Comments" : "0 Comment"}  </span>
        </button>
        <img className='w-8 rounded-full hover:bg-slate-200 p-1 active:bg-blue-400' src={linkSvg} onClick={() => copy()} />

        <div className=''>
          <img src={shareSvg} className="w-8 rounded-full hover:bg-slate-200 p-1" alt="" onClick={() => setShowShareModal(true) } />

        </div>
      </div>



      <img onClick={() => save()} className="w-8 p-1  rounded-full p hover:bg-slate-300 " src={isSaved ? saveFillSvg : saveSvg} alt="" />
    </div>

  )
}
