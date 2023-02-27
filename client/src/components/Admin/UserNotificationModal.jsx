import closeSvg from "../../assets/svg/close-black.svg"

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import {host} from '../../config/config'
import {getCookie} from "../../utils/getCookie"
export default function UserNotificationModal(props) {
  let { close, user } = props
  const messageRef = useRef()
  const typeRef = useRef()
  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('ban-popup')) {
        close(false)
      }
    })
    return () => {
      console.log("Clean up")
    }
  }, [])

  async function handleSubmit() {
    try{
      let res = await axios.post(host + "api/admin/user/notification/send", 
      { token : getCookie('token') ,target_id : user._id , type : typeRef.current.value , message : messageRef.current.value  })
      console.log(res)
      close()
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div style={{ backgroundColor: "rgba(0,0,0, .7) " }} className="ban-popup absolute top-0 left-0 w-full min-h-screen   flex  justify-center items-center z-10" >
      <div className="content bg-white px-10 py-10 rounded-lg   " style={{ width: "500px" }}>
        <div className=''>
          <header className='flex justify-between mb-4'>
            <p></p>
            <p className='text-3xl font-bold mb-4 '> Send notification to  User </p>
            <img onClick={() => close()} className='w-6  hover:-rotate-90 duration-300 cursor-pointer' src={closeSvg} alt="" />
          </header>
          <div className="input flex gap-8 items-center mb-4  ">
            <span className='w-2/12 font-semibold ' > User Id </span>
            <input type="text" className='bg-gray-200 px-2 py-2 w-9/12  rounded-md text-gray-400 ' disabled={true} value={user._id} />
          </div>
          <div className="input flex gap-8 items-center mb-4">
            <span className='w-2/12 font-semibold ' >  Username</span>
            <input type="text" className='bg-gray-200 px-2 py-2 w-9/12  rounded-md text-gray-400 ' disabled={true} value={user.username} />
          </div>

          <div className="input flex gap-8 items-center mb-4">
            <span className='w-2/12 font-semibold ' >  Type  </span>
            <select ref={typeRef} className="bg-gray-50 border border-gray-300 text-gray-900 py-2 px-3 rounded-sm" name="" id="">
              <option value="0"> 0 - Just  notification </option>
              <option value="1"> 1 - Warning  </option>
              <option value="2"> 2 - Danger </option>
            </select>

          </div>



          <div className="input flex gap-8 items-center mb-4">
            <span className='w-2/12 font-semibold text-xl' >  Message</span>
            <textarea  ref={messageRef} placeholder='Send a brief reason for user'
              className="border border-gray-400 resize-none outline-none rounded-md px-4 py-2" id="" cols="30" rows="2"></textarea>
          </div>

          <div className="button-wrap text-center">
            <button
              className=" w-6/12 border-2 border-indigo-600 rounded px-8 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
              onClick={handleSubmit }>
              Send notification
            </button>
            <p className="text bg-teal-600 text-white px-4 py-2  mt-5 rounded-md hover:bg-teal-800"> Please don't abuse this method  </p>
          </div>
        </div>
      </div>
      <div className="content"></div>
    </div>

  )
}
