import closeSvg from "../../assets/svg/close-black.svg"

import { useEffect, useState } from "react"

export default function Popup(props) {
  let { setShowPopup, user } = props
  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('ban-popup')) {
        console.log('ok')
        setShowPopup(false)
      }
    })
    return () => {
      console.log("Clean up")
    }
  }, [])

  return (
    <div style={{ backgroundColor: "rgba(0,0,0, .7) " }} className="ban-popup absolute top-0 left-0 w-full min-h-screen   flex  justify-center items-center z-10" >
      <div className="content bg-white px-10 py-10 rounded-lg   " style={{ width: "500px" }}>
        <div className=''>
          <header className='flex justify-between mb-4'>
            <p></p>
            <p className='text-3xl font-bold '> Ban user </p>
            <img onClick={() => setShowPopup(false)} className='w-6  hover:-rotate-90 duration-300 cursor-pointer' src={closeSvg} alt="" />
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
            <span className='w-2/12 font-semibold ' >  Reason</span>
            <select  className="bg-gray-50 border border-gray-300 text-gray-900 py-2 px-3 rounded-sm"  name="" id="">
              <option value="0"> 0 - Scam  </option>
              <option value="1"> 1 - Hate Speech </option>
              <option value="2"> 2 - Scam  </option>
              <option value="3"> 3 - Other  </option>
            </select>
          </div>
          <div className=" flex gap-8 items-center mb-4">
            <span className='w-2/12 font-semibold ' > Duration   </span>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 py-2 px-3 rounded-sm" name="" id="">
              <option value="0"> 6 Hours  </option>
              <option value="1"> 1 Day </option>
              <option value="2"> 2  Days </option>
              <option value="3"> 3 Days  </option>
              <option value="3"> 1 Week   </option>
              <option value=""> 2 Weeks  </option>
              <option value=""> 4 Weeks </option>
              <option value=""> Permanent  </option>
            </select>

          </div>
          <div className=" flex gap-8 items-center mb-4">
            <span className='w-2/12 font-semibold ' > Ban Score   </span>

            <input type="number" className='bg-slate-100 px-2 py-2 w-9/12  rounded-md text-gray-400 outline-none' defaultValue={1} max={12} min={0} />

          </div>
          <div className="input flex gap-8 items-center mb-4">
            <span className='w-2/12 font-semibold text-xl' >  Message</span>
            <textarea placeholder='Optinal'
              className="border border-gray-400 resize-none outline-none rounded-md px-4 py-2" id="" cols="30" rows="2"></textarea>
          </div>

          <div className="button-wrap text-center">
            <button
              className=" w-6/12 border-2 border-indigo-600 rounded px-8 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300">
              Ban user
            </button>
          </div>
        </div>
      </div>
      <div className="content"></div>
    </div>

  )
}
