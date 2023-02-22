import exploreSvg from "../assets/svg/explore.svg"
import popularSvg from "../assets/svg/popular.svg"
import feedSvg from "../assets/svg/feed.svg"
import { useState } from "react"
export default function LeftNav(props) {

  const {place,setPlace} = props

 

  return (
    <div className=''>
      <h3 className="title font-bold text-xl mb-4 "> Choose your place </h3>
      <div 
        onClick={  () => setPlace("feed") }
      className={`flex gap-3 hover:bg-slate-200 rounded-md cursor-pointer py-2 px-2  ${place == "feed" ? "bg-purple-200" : ""}` }>
        <img className="w-6" src={feedSvg} alt="" />
        <div className="">
          <p className="text-xl font-semibold"> Feed </p>
          <p className="text-gray-600"> Chill with friends </p>
        </div>
      </div>

      <div onClick={  () => setPlace("explore") }
      className="flex gap-3 hover:bg-slate-200 rounded-md cursor-pointer py-2 px-2">
        <img className="w-6" src={exploreSvg} alt="" />
        <div className="">
          <p className="text-xl font-semibold"> Explore </p>
          <p className="text-gray-600 "> There is a world out there  </p>
        </div>
      </div>

      <div onClick={  () => setPlace("popular") }
      className="flex gap-3 hover:bg-slate-200 rounded-md cursor-pointer py-2 px-2">
        <img className="w-6" src={popularSvg} alt="" />
        <div className="">
          <p className="text-xl font-semibold"> Popular </p>
          <p className="text-gray-600"> What is trend today </p>
        </div>
      </div>


    </div>
  )
}
