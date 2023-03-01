import primarySvg from "../../assets/svg/primary.svg"
import secondarySvg from "../../assets/svg/secondary.svg"

import heartSvg from "../../assets/svg/heart.svg"
import heartOffSvg from "../../assets/svg/heart-off.svg"
import gallerySvg from "../../assets/svg/gallery.svg"

import commentSvg from '../../assets/svg/comment.svg'
import shareSvg from '../../assets/svg/share.svg'
import saveSvg from '../../assets/svg/save.svg'
import threeDotsSvg from '../../assets/svg/three-dots.svg'
import { useState } from "react"
import { MainContext } from "../../contexts/Main"



export default function PostBox(props) {

  const {theme} = useState(MainContext)

  return (
    <div className={`  bg-slate-30 ${theme == "dark" ? "bg-slate-800" : "" }  mb-6 py-5 px-5 rounded-md`}>
      <header className="flex justify-between px-2 mb-5 items-center" >
        <div className="left flex gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100" alt="" />
          <p className="font-semibold text-xl  bg-slate-200 animate-pulse text-transparent rounded-md ">  iamloading  </p>
        </div>
        <div className="right">
          <img className="w-8 p-1 rounded-full cursor-pointer hover:bg-slate-200" src={threeDotsSvg} alt="" />
        </div>
      </header>
      <div className="gallery relative mb-8">
        <div style={{ width: "600px", height: "300px" }} className="bg-slate-200 animate-pulse duration-300 rounded-lg" >
        </div>
        <div className="indicator"></div>
      </div>
      <div className="actions flex gap-2  justify-between ">
        <div className="left flex gap-2">
          <div className="likes flex gap-2  pr-5 items-center ">
            <img className="w-8 p-1  hover:bg-blue-300 rounded-full" src={primarySvg} alt="" />
            <span className="count bg-slate-200 animate-pulse duration-300 rounded-lg text-transparent "> 0  hearts </span>
            <img className="w-8 p-1  hover:bg-blue-300 rounded-full" src={secondarySvg} alt="" />
          </div>
          <button onClick={() => { commentsStatus == "closed" ? loadComments() : commentsStatus == "open" ? setCommentsStatus("closed") : "" }}
            className="flex gap-1 px-5  items-center ">
            <img className="w-8 p-1" src={commentSvg} alt="" />
            <span className="bg-slate-200 text-transparent  ">   5521  </span>
          </button>
        </div>
        <button className="flex gap-2  items-center group ">
          <img className="w-8 p-1 group-hover:bg-green-300 rounded-full " src={saveSvg} alt="" />
        </button>
      </div>

      {/* <div className="comments">
        {commentsStatus != "closed" && <AddComment post_id={_id} />}
        {commentsStatus == "loading" && [...new Array(3)].map((item, index) => <Skleton key={index} />)}
        {commentsStatus == "open" && comments.length > 0 && comments.map((item, index) => <CommentBox key={index} data={item} />)}
        {commentsStatus == "open" && comments.length == 0 && <div> <p className="text text-gray-500" > Oops, An awesome chance to make  a first comment </p> </div>}
      </div> */}

    </div>



  )
}