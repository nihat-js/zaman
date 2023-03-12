import React, { useEffect, useState } from 'react'
import { host } from "../../config/config"
import axios from 'axios'
import Avatar from "../User/Avatar"
import Username from "../User/Username"
import threeSvg from "../../assets/svg/three-dots.svg"
import { token } from '../../utils/utils'
export default function Posts() {

  let [data, setData] = useState([])
  let [showOptions,setShowOptions] = useState(false)
  async function loadData() {
    try {
      let res = await axios.post(host + "api/admin/graphql", { model: "report" , token    } , )
      setData(res.data)
      console.log("report", res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])
  

  return (

    <div>

      <div className="row flex gap-2 ">
        {
          data.map((i, j) => {
            return (
              <div className='flex justify-between bg-white px-5 py-5 rounded-md shadow-md '>
                <div className="left">
                  <header className='flex gap-2'>
                    <p className="text  "> Who  </p>
                    <Avatar avatar={i.who_id.avatar} username={i.who_id.username} />
                    <Username username={i.who_id.username} />
                  </header>
                  <p className="argument font-semibold  mt-4 ">
                    Argument :
                    {
                      i.argument == 0 ? "Spam" : i.argument == 1 ? "Hate Speech" : i.argument == 2 ? "Scam" : i.argument == 3 ? "Other" : ""
                    }</p>
                </div>

                <div className="right">
                  <img src={threeSvg} alt="" 
                  className='w-6 cursor-pointer' 
                   onClick={() => setShowOptions(true)} />
                  
                  {showOptions && <Options setShowOptions={setShowOptions} /> }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

function Options({setShowOptions}) {
  return (
    <div className='absolute bg-white transition-all duration-300 flex flex-col '>
      <button className=' px-4 py-2 text-red-800 font-xl text-bold hover:bg-slate-100 '> Delete report  </button>
      <button className = "  px-4 py-2  font-xl text-bold hover:bg-slate-100" 
      onClick={() => setShowOptions(false) }
      > Cancel </button>

    </div>
  )
}