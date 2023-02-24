
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
import threeDotsSvg from '../../assets/svg/three-dots.svg'



export default function PostBox(props) {

  return (
    <div className="bg-gray-50 mb-6 py-5 px-5 rounded-md">
      <header className="flex justify-between px-2 mb-5 items-center" >
        <div className="left flex gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100"  alt="" />
          <p className="font-semibold text-xl  bg-slate-200 animate-pulse text-transparent rounded-md ">  iamloading  </p>
        </div>
        <div className="right">
          <img className="w-8 p-1 rounded-full cursor-pointer hover:bg-slate-200" src={threeDotsSvg} alt="" />
        </div>
      </header>
      <div className="gallery relative mb-8">
        <div style={{width : "600px" , height : "400px"}} className="bg-slate-200 animate-pulse duration-300 rounded-lg" >
        </div>
        <div className="indicator"></div>
      </div>
      <div className="actions flex gap-2 items-center mb-5 ">
        <div className="likes flex gap-2  pr-5 items-center ">
          <img className="w-8 p-1  hover:bg-blue-300 rounded-full" src={heartSvg} alt="" />
          <span className="count bg-slate-200 animate-pulse duration-300 rounded-lg "> 0  hearts </span>
        </div>
        <button onClick={() => { commentsStatus == "closed" ? loadComments() : commentsStatus == "open" ? setCommentsStatus("closed") : "" }}
          className="flex gap-1 px-5  items-center hover:bg-slate-200">
          <img className="w-8 p-1" src={commentSvg} alt="" />
          <span className="">   5  </span>
        </button>
        <button>
          <img className="w-8 p-1" src={shareSvg} alt="" />
        </button>
        <button className="flex gap-2  items-center group ">
          <img className="w-8 p-1 group-hover:bg-green-300 rounded-full " src={saveSvg} alt="" />
          <span className=" text-gray-600 group-hover:text-green-500 transition-all duration-200" > Save </span>
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