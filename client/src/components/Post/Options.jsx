import React, { useContext } from 'react'
import { MainContext } from '../../contexts/Main';
import { Link } from 'react-router-dom';
import flagSvg from "../../assets/svg/flag.svg"

export default function Options({ showOptions, setShowOptions, setShowReportModal,username,setIsEditing, }) {

  const {user} = useContext(MainContext)

  return (
    <div className={`post-options absolute bg-white   rounded-md  shadow-md z-10  right-2  w-fit ${showOptions ? "" : "hidden"} `}>

      {username == user.username &&
        <button className="px-2 py-3  rounded hover:bg-slate-100  "
          onClick={() => { setShowOptions(false); setIsEditing(true) }}>
          Edit
        </button>
      }


      <Link to={"/profile/" + username} >
        <button className="px-2 py-3  rounded hover:bg-slate-100    ">  Visit Profile </button>
      </Link>
      <button
        className="px-2 py-3  rounded hover:bg-slate-100 flex gap-2  "
        onClick={() => { setShowOptions(false); setShowReportModal(true) }} >
        <img src={flagSvg} className="w-6" />
        <span className="text-sm"> Report  </span>
      </button>
      {username == user.username &&
        <button className="text-red-800 px-2 py-3  rounded hover:bg-slate-100 flex gap-2 " onClick={() => deletePost()}  > Delete post </button>
      }
      <button className="px-2 py-3  rounded hover:bg-slate-100   "
        onClick={() => setShowOptions(false)} > Cancel </button>

    </div>
  )
}
