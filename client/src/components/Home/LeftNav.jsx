import exploreSvg from "../../assets/svg/explore.svg"
import popularSvg from "../../assets/svg/popular.svg"
import feedSvg from "../../assets/svg/feed.svg"
import savedSvg from "../../assets/svg/save.svg"
import checkerSvg from "../../assets//svg/checker.svg"
import tictactSvg from "../../assets/svg/tictac.svg"
import { useContext, useState } from "react"
import { MainContext } from "../../contexts/Main"
import { Link } from "react-router-dom"
export default function Tab(props) {
  const {theme} = useContext(MainContext)

  const {place,setPlace} = props

 

  return (
    <div className={` py-2 px-2 rounded-md ${theme == "dark" ?  "bg-gray-900 text-gray-700" : "" } "  }`}>

      <h3 className="title font-bold text-xl mb-4 "> Find place </h3>
      <div className="mb-3 flex gap-3">
        <Link className="w-10" to={"/game/tic"}  > <img className="w-10 rounded-full hover:bg-slate-200" src={tictactSvg} /> </Link >
        <a href="http://127.0.0.1:5500/checker-game-demo/" > <img className="w-10 rounded-full hover:bg-slate-200" src={checkerSvg} /> </a >
      </div>
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
      className={`flex gap-3 hover:bg-slate-200 rounded-md cursor-pointer py-2 px-2  ${place == "explore" ? "bg-purple-200" : ""} `}>
        <img className="w-6" src={exploreSvg} alt="" />
        <div className="">
          <p className="text-xl font-semibold"> Explore </p>
          <p className="text-gray-600 "> There is a world out there  </p>
        </div>
      </div>

      <div onClick={  () => setPlace("trend") }
      className={`flex gap-3 hover:bg-slate-200 rounded-md cursor-pointer py-2 px-2  ${place == "trend" ? "bg-purple-200" : ""} `}>
        <img className="w-6" src={popularSvg} alt="" />
        <div className="">
          <p className="text-xl font-semibold"> Trend </p>
          <p className="text-gray-600"> What is popular today </p>
        </div>
      </div>

      <div onClick={  () => setPlace("saved") }
      className={`flex gap-3 hover:bg-slate-200 rounded-md cursor-pointer py-2 px-2  ${place == "saved" ? "bg-purple-200" : ""} `}>
        <img className="w-6" src={savedSvg} alt="" />
        <div className="">
          <p className="text-xl font-semibold"> Saved </p>
          <p className="text-gray-600"> Saved list </p>
        </div>
      </div>



    </div>
  )
}
