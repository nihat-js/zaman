import { useEffect, useState } from "react"
import calculateTimeForUser from "../../utils/calculateTimeForUser"
import Avatar from "../User/Avatar"
import Username from "../User/Username"
import playSvg from "../../assets/svg/play.svg"
import pauseSvg from "../../assets/svg/pause.svg"
import arrowLeftSvg from "../../assets/svg/arrow-left.svg"
import arrowRightSvg from "../../assets/svg/arrow-right.svg"
import closeSvg from "../../assets/svg/close-black.svg"
import axios from "axios"
import { host } from "../../config/config"
import { token } from "../../utils/utils"
import OptionsSvg from "../../assets/svg/three-dots.svg"

export default function StoryModal({ arr, current, previous, next, setShowStory }) {
  const [data, setData] = useState([])
  const [arrIndex, setArrIndex] = useState(0)
  const [dataIndex, setDataIndex] = useState(0)
  let timerId
  async function get() {
    let res = await axios.post(host + "api/story/user", { token, target_username: arr[arrIndex].username })
    setData(res.data)
    console.log("story loaded", res.data)
  }

  function renderRightArrow() {
    if (arrIndex + 1 < arr.length || dataIndex + 1 < data.length) {
      return <img onClick={() => setDataIndex(dataIndex + 1)}
        className="w-7 p-1 bg-slate-100 rounded-full hover:bg-slate-200 absolute right-0 top-1/2 " src={arrowRightSvg} alt="" />
    }
  }
  function renderLeftArrow() {
    if (arrIndex > 0 || dataIndex > 0) {
      return <img onClick={() => setDataIndex(dataIndex - 1)} className="w-7 p-1 bg-slate-100 rounded-full hover:bg-slate-200 absolute left-0 top-1/2 " src={arrowLeftSvg} alt="" />
    }
  }

  function startTimer() {
    timerId = setInterval(() => {
      console.log('dd',dataIndex,data.length)
      if (dataIndex + 1 < data.length) {
        setDataIndex(dataIndex + 1)
      } else if (arrIndex + 1 < arr.length) {
        setArrIndex(arrIndex + 1)
      } else {
        setShowStory(false)
      }
      console.log('bug')
    }, 4000)
  }

  useEffect(() => {
    get()
    // startTimer()
    return () => {
      clearInterval(timerId)
    }
  }, [])



  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-50  ' style={{ backgroundColor: "rgba(0,0,0,0.85)" }} >
      <div className="content bg-white py-4 px-6 rounded-md shadow-md " style={{ width: "500px" }}>
        <div className="indicator flex  gap-1">
          {data.map((i, j) => <p key={j} className={`line flex-1 bg-gray-200 select-none rounded-md text-transparent inline-block text-sm h-2  ${ j == dataIndex && "bg-gray-400"  } `} > . </p>)}
        </div>
        <header className='flex justify-between py-4'>
          <div className="left flex gap-2">
            <Avatar username={arr[arrIndex].username} disableLink />
            <Username username={arr[arrIndex].username} />
            <p className="time text-gray-600 text-sm "> {data[dataIndex] && calculateTimeForUser(data[dataIndex].created_at)} </p>
          </div>
          <div className="right flex gap-2">
            <img className='w-6' src={playSvg} alt="" />
            <img className='w-6' src={OptionsSvg} alt="" />
            <img className='w-6 rounded-full hover:bg-slate-200 ' src={closeSvg} onClick={() => setShowStory(false)} />

          </div>
        </header>
        <div className="source relative">
          {renderLeftArrow()}
          {renderRightArrow()}
          <img className='w-full' src={host + "stories/" + data[dataIndex]?.source} alt="" />
        </div>
      </div>
    </div >
  )
}