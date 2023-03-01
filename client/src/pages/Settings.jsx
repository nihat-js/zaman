import Nav from '../components/Nav'

import Avatar from '../components/User/Avatar'
import Username from "../components/User/Username"
import LeftNav from "../components/Settings/LeftNav"
import logo from "../assets/svg/zaman.png"
import { host } from "../config/config"
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getCookie } from "../utils/getCookie"
import { MainContext } from '../contexts/Main'
import Basics from "../components/Settings/Basics"
import ChangePassword from "../components/Settings/ChangePassword"


export default function Index() {

  const [currentTab, setCurrentTab] = useState("basics")
  const {theme} = useContext(MainContext)
  return (
    <div className={`setttings-page min-h-screen w-full bg-slate-50 ${theme == "dark" ? "bg-slate-800" : ""}  `}>
      <Nav />
      <div style={{ maxWidth: "1200px" }} className='flex gap-12 mx-auto mt-8'>
        <div className='w-4/12'>
          <img src={logo} alt="" />
          <div className='mt-4' >
            <p className={`py-4 px-3 bg-teal-800 rounded-md hover:bg-teal-700 text-white mb-2 font-bold border-b-black border-b-2 
              ${currentTab === "basics" ? "bg-teal-500" : ""}            `}
              onClick={() => setCurrentTab('basics')}
            > Basic Settings  </p>
            <p className={`py-4 px-3 bg-teal-800 rounded-md hover:bg-teal-700 text-white mb-2 font-bold border-b-black border-b-2  ${currentTab === "password" ? "bg-teal-500" : ""}     `}
              onClick={() => setCurrentTab('password')}
            > Change Password </p>
          </div>
        </div>

        <div className='w-8/12'>
          {currentTab == "basics" ? <Basics /> : <ChangePassword />}
        </div>

      </div >

    </div >






  )
}







