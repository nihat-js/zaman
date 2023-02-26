import { Link } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import {MainContext} from "../contexts/Main"
import {host} from "../config/config"

import zamanImage from '../assets/svg/zaman.png'
import logoutSvg from '../assets/svg/logout.svg'
import homeSvg from '../assets/svg/home.svg'
import chatSvg from '../assets/svg/chat.svg'
import moonSvg from '../assets/svg/moon.svg'
import notificationSvg from '../assets/svg/notification.svg'

import './Nav.scss'

import { useState } from 'react'

export default function Index() {

  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [hasFocus, setHasFocus] = useState(false)

  const  { user }  = useContext(MainContext)

  async function search() {
    if (!value || value.length < 2) {
      setSearchResults([])
      return false
    }
    try {
      let result = await axios.post(host +"api/search", { value: value })
      setSearchResults(result.data)
      // console.log(result.data)
    } catch (err) {
      console.log(err)
    }
  }



  const linkClassName = "px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer "


  return (
    <nav className='main shadow-md py-3 bg-white    w-full  ' >
      <div style={{ maxWidth: "1200px"  }} className="container mx-auto  ">
        <div className="row flex justify-between items-center gap-16   ">

          <div className=" flex-1 relative w-full ">
            
            <div className="relative ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                // onBlur={() => setHasFocus(false)}
                onFocus={() => setHasFocus(true)}
                onKeyUp={search}
                onChange={(e) => setValue(e.target.value)}

                type="search" id="default-search"
                className="block w-full outline-none p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-fgray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search with username " required value={value} />

              {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
            <div className={`search-results absolute w-full mt-5 z-10  shadow-lg py-4 rounded-md bg-white  ${hasFocus ? "" : "hidden"}  `}>
              {value.length >= 2 && searchResults.length == 0 ? <div className='px-4 py-2' > No user found </div> : searchResults.map((item, index) => <Link to={"/profile/" + item.username} >
                <div className="result flex gap-2 px-4 py-2 hover:bg-slate-100  items-center   ">
                  <div className="img-wrap">
                    <img className='w-8 rounded-full' src={item.avatar ? "http://localhost:5000/avatars/" + item.avatar : "http://localhost:5000/avatars/default.svg"} alt="" />

                  </div>
                  <h3 className="username font-bold text-base"> {item.username} </h3>
                </div>
              </Link>

              )}

            </div>


          </div>


          <div className="links     ">
            <ul className='flex gap-3 '>
              <Link to='/'>
                <li className={linkClassName} >

                  <img className='w-6' src={homeSvg} alt="" />
                </li>
              </Link>
              <Link to='/chat'>
                <li className={linkClassName} >
                  <img className='w-6' src={chatSvg} alt="" />
                </li>
              </Link>

              {/* <Link to='/notifications'>
                <li className={linkClassName} >
                  <img className='w-6' src={notificationSvg} alt="" />
                </li>
              </Link> */}

              <li className={linkClassName}>
                <img className='w-6 h-6' src={moonSvg} alt="" />
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

            </ul>
          </div>
        </div>
      </div>
    </nav >
  )
}
