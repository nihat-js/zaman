import React, { useEffect, useState } from 'react'
import notificationSvg from '../../assets/svg/notification.svg'
import arrowDownSvg from '../../assets/svg/arrow-down.svg'
import arrowUpSvg from '../../assets/svg/arrow-up.svg'
import axios from 'axios'
import { getCookie } from "../../utils/getCookie"
import { host } from "../../config/config"
import calculateTimeForUser from "../../utils/calculateTimeForUser"
export default function Notification() {

  const [show, setShow] = useState(false)

  const [data, setData] = useState([])

  async function load() {
    if (!show) {
      return false
    }
    try {
      let res = await axios.post(host + "api/user/notification",
        { token: getCookie('token') })
      setData(res.data)
      console.log('notif', res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    load()
  }, [show])


  return (
    <div className='py-5 px-4 bg-white rounded-md shadow-md mb-6'>
      <header className='flex justify-between'>
        <div className='flex gap-1 items-center'>
          <img className='w-4' src={notificationSvg} alt="" />
          <p className='font-semibold text-sm'> Notifications </p>
        </div>
        <img onClick={() => setShow(!show)} className=' w-6 cursor-pointer hover:bg-slate-200 rounded-full ' src={show ? arrowUpSvg : arrowDownSvg} alt="" />
      </header>
      <div className="body">
        {
          typeof (data) == 'object' && show && data.map((i, j) => {
            return (
              <div className="card px-4 py-3 mt-2 bg-white rounded-md shadow-md hover:bg-slate-100">
                <span className='text-xl font-semibold  '> {i.message} </span>
                <p className='text-gray-600 text-sm mt-2'> {calculateTimeForUser(i.createdAt)}  </p>
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

function Box() {
  <div>
    <img className='w-6' src="" alt="" />
  </div>
}
