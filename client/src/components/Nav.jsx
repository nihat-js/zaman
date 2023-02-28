import { Link } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { MainContext } from "../contexts/Main"
import { host } from "../config/config"

import zamanImage from '../assets/svg/zaman.png'
import logoutSvg from '../assets/svg/logout.svg'
import homeSvg from '../assets/svg/home.svg'
import chatSvg from '../assets/svg/chat.svg'
import moonSvg from '../assets/svg/moon.svg'
import notificationSvg from '../assets/svg/notification.svg'
import profileSvg from "../assets/svg/profile.svg"
import settingsSvg from "../assets/svg/settings.svg"

import './Nav.scss'

import { useState } from 'react'
import Avatar from './User/Avatar'

export default function Index() {

  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [hasFocus, setHasFocus] = useState(false)

  const { user , theme ,reverseTheme } = useContext(MainContext)

  async function search() {
    if (!value || value.length < 2) {
      setSearchResults([])
      return false
    }
    try {
      let result = await axios.post(host + "api/search", { value: value })
      setSearchResults(result.data)
      // console.log(result.data)
    } catch (err) {
      console.log(err)
    }
  }



  const linkClassName = `px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer ${theme == "dark" ?   "bg-gray-300 hover:bg-gray-700" : ""  } `


  return (
    <nav className={`main shadow-md py-3  ${theme == "light" ? "bg-white" : "bg-gray-900"}      w-full  `}>
      <div style={{ maxWidth: "1200px" }} className="container mx-auto  ">
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
                    <Avatar className='w-8 ' avatar={item.avatar} username={item.username} />

                  </div>
                  <h3 className="username font-bold text-base"> {item.username} </h3>
                </div>
              </Link>

              )}

            </div>


          </div>


          <div className="links     ">
            <ul className='flex gap-3 items-center '>
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
                <img className='w-6 h-6' src={moonSvg} alt="" onClick={reverseTheme} />
              </li>
              <li className={`px-4 py-2 rounded-lg hover:bg-gray-300  relative cursor-pointer     ${theme == "dark" ?   "bg-gray-300 hover:bg-gray-700" : ""}  `}  onClick={() => setToggle(!toggle)} >
                <div className='flex items-center gap-1'>
                  <Avatar className='w-6 rounded-full'  me={true} />
                  <span> {user.username} </span>
                </div>

                <div className={`bg-white border  border-gray-200 mt-4 dropbox left-0  z-50 absolute ${toggle ? "" : "hidden"}  `}>


                  <Link className='px-1 py-2 hover:bg-gray-100 flex gap-2' to={"/profile/" + user.username}>
                    <img className='w-5' src={profileSvg} alt="" />
                    <span className='text-sm'> Profile </span>
                  </Link>

                  <Link className='px-1 py-2 hover:bg-gray-100 flex gap-2' to="/settings" >
                    <img className='w-5' src={settingsSvg} alt="" />
                    <span className='text-sm'> Account </span>
                  </Link>

                  <Link to='/logout' className='px-1 py-2  hover:bg-gray-100 flex gap-2'>
                      <img className='w-5' src={logoutSvg} alt="" />
                      <span className='text-sm'> Logout </span>
                  </Link>



                </div>


              </li>

            </ul>
          </div>
        </div>
      </div>
    </nav >
  )
}
