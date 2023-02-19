import React, { useState } from 'react'
import notificationSvg from '../assets/svg/notification.svg'
import arrowDownSvg from '../assets/svg/arrow-down.svg'
import arrowUpSvg from '../assets/svg/arrow-up.svg'

export default function Notification() {

  const [show, setShow] = useState(false)

  return (
    <div className='py-5'>
      <header className='flex justify-between'>
        <div className='flex gap-1 items-center'>
          <img className='w-4' src={notificationSvg} alt="" />
          <p className='font-semibold text-sm'> Notifications </p>
        </div>
        <img   onClick={ () => setShow(!show) } className=' w-6 cursor-pointer hover:bg-slate-200 rounded-full ' src={show ? arrowUpSvg :  arrowDownSvg}  alt="" />
      </header>
    </div>
  )
}

function Box() {
  <div>
    <img className='w-6' src="" alt="" />
  </div>
}
