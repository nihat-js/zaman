import { Link } from 'react-router-dom'
import zamanImage from '../assets/svg/zaman.png'

import getUser from '../utils/getUser'
import getTheme from '../utils/getTheme'
import logoutSvg from '../assets/svg/logout.svg'
import homeSvg from '../assets/svg/home.svg'
import chatSvg from '../assets/svg/chat.svg'
import moonSvg from '../assets/svg/moon.svg'
import { useState } from 'react'

export default function Index() {

  const [toggle, setToggle] = useState(false)

  const linkClassName = "px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer "
  const user = getUser()



  return (
    <nav className='shadow-md py-3 bg-white' >
      <div className="container mx-auto  ">
        <div className="row flex justify-between align-center">
          <div className="brand">
            <Link to='/feed'> <img src={zamanImage} alt="" /> </Link>
          </div>
          <div className="links">
            <ul className='flex gap-3 '>

              <li className={linkClassName} >
                <Link to='/feed'>
                  <img className='w-6' src={homeSvg} alt="" />
                </Link>
              </li>
              <li className={linkClassName} >
                <Link to='/chat'>
                  <img className='w-6' src={chatSvg} alt="" />
                </Link>
              </li>

              <li className="px-4 py-2 rounded-lg hover:bg-gray-300  relative cursor-pointer" >
                <div className='flex items-center gap-1' onClick={() => setToggle(!toggle)}>
                  <img className='w-6 rounded-full ' src={user.avatar ? "http://localhost:5000/avatars/" + user.avatar : "http://localhost:5000/avatars/default.svg"} />
                  <span> {user.username} </span>
                </div>

                <div className={`bg-white border  border-gray-200 mt-4 dropbox absolute ${toggle ? "" : "hidden"} `}>


                  <div className="profile flex ">
                    <Link className='px-5 py-3 hover:bg-gray-100' to={"/profile/" + user.username}>
                      Profile
                    </Link>
                  </div>

                  <div className="settings">
                    <Link className='px-5 py-3 hover:bg-gray-100' to="/settings" >
                      Settings
                    </Link>
                  </div>
                  <div className="logout flex gap-1 ">
                    <Link to='/logout' className='flex gap-1 px-5 py-3 hover:bg-gray-100'>
                      <img className='w-5' src={logoutSvg} alt="" />
                      <span> Logout </span>
                    </Link>
                  </div>



                </div>


              </li>
              <li className={linkClassName}>
                <img className='w-6 h-6' src={moonSvg} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav >
  )
}
