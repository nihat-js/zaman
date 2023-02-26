import Avatar from '../User/Avatar'
import primarySvg from "../../assets/svg/primary.svg"
import secondarySvg from "../../assets/svg/secondary.svg"

export default function CommentBox(props) {


  return (
    <div className="comment flex gap-2 select-none">
      <div className="left">
        <div className="w-6 h-6  rounded-full bg-slate-200 text-transparent animate-pulse "  > </div>
      </div>
      <div className="right w-full  ">
        <header className="flex gap-2 mb-2">
          <h4  className='bg-slate-200 text-transparent animate-pulse rounded-sm' > zamanzaman </h4>
          <span className="bg-slate-200 text-transparent animate-pulse rounded-sm"> 1hourago </span>
        </header>
        <div className="body w-full flex justify-between">
          <div className="left">
            <p className="bg-slate-200 text-transparent animate-pulse rounded-sm  "> onelinetextassume  </p>
          </div>
          <div className="right">
            <img className="w-6" src={primarySvg} alt="" />
            <img className="w-6" src={secondarySvg} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
