import React, { useState } from 'react'
import axios from 'axios'
import { host } from '../../config/config'
import commentSvg from '../../assets/svg/comment.svg'
import shareSvg from '../../assets/svg/share.svg'
import saveSvg from '../../assets/svg/save.svg'
import saveFillSvg from "../../assets/svg/save-fill.svg"
import primarySvg from "../../assets/svg/primary.svg"
import secondarySvg from "../../assets/svg/secondary.svg"
import { getCookie } from '../../utils/getCookie'
export default function Actions({ reaction, commentsStatus, loadComments, reactions_count, comments_count , saved , _id }) {

  let [isReacted, setIsReacted] = useState( reaction ? reaction :  "none"  )
  const [reactionsCount, setReeactionsCount] = useState(reactions_count)
  const [commentsCount, setCommentsCount] = useState(comments_count)
  const [isSaved, setIsSaved] = useState(saved)

  async function reactToPost(name) {
    if (isReacted == "loading") {
      console.log('Please wait')
      return false
    }
    // console.log("name",isReacted)
    let previous = isReacted
    setIsReacted("loading")
    try {
      let response = await axios.post(host + "api/post/react", { token: getCookie('token'), name: name, post_id: _id })
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
      }
      // console.log('payload', payload)
      setReeactionsCount(reactionsCount + payload)
      setIsReacted(name)
      // console.log(response.data)
    } catch (err) {
      console.log(err)
    }


  }


  async function save() {
    let val = isSaved ? 0 : 1
    console.log(val)
    try {
      let res = await axios.post(host + "api/post/save", { token: getCookie('token'), post_id: _id, val })
      setIsSaved(!isSaved)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="actions flex gap-2 justify-between mb-5 mt-2 ">

      <div className="left flex gap-2 ">
        <div className="likes flex gap-2  pr-5 items-center ">
          <img className={`w-9 p-2  hover:bg-slate-200 rounded-full
        ${isReacted == "up" ? "bg-slate-300" : ""}`}
            onClick={() => isReacted == 'up' ? reactToPost('none') : reactToPost('up')}
            src={primarySvg} alt="" />
          <span className="count font-semibold text-xl"> {reactionsCount || 0}   </span>
          <img className={`w-9  p-2 hover:bg-slate-200 rounded-full    ${  isReacted == "down" ? "bg-slate-300" : ""}          `}
            onClick={() => isReacted == 'down' ? reactToPost('none')  :  reactToPost('down')  }
            src={secondarySvg} alt="" />
        </div>

        <button onClick={() => { commentsStatus == "closed" ? loadComments() : commentsStatus == "open" ? setCommentsStatus("closed") : "" }}
          className="flex gap-1 px-5  items-center hover:bg-slate-200">
          <img className="w-8 p-1" src={commentSvg} alt="" />
          <span>  {commentsCount > 0 && commentsCount}  </span>
        </button>
      </div>



      <button className="flex gap-2  items-center group hover:bg-slate-300 px-2 "
        onClick={() => save()}
      >
        <img className="w-8 p-1  rounded-full " src={isSaved ? saveFillSvg : saveSvg} alt="" />
      </button>
    </div>

  )
}
