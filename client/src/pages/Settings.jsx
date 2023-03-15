import Nav from '../components/Nav'

import logo from "../assets/svg/zaman.png"
import logoLightSvg from "../assets/svg/logo-light.svg"
import logoDarkSvg from "../assets/svg/logo-dark.svg"
import { host } from "../config/config"
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { MainContext } from '../contexts/Main'
import Basics from "../components/Settings/Basics"
import ChangePassword from "../components/Settings/ChangePassword"
import './Settings.scss'

export default function Index() {

  const [currentTab, setCurrentTab] = useState("basics")
  const {theme} = useContext(MainContext)
  return (
    <div className={`settings-page min-h-screen w-full bg-slate-50 ${theme == "dark" ? "bg-slate-800" : ""}  `}>
      <Nav />
      <main style={{ maxWidth: "1200px" }} className=' flex md:flex-wrap lg:flex-nowrap   gap-12 mx-auto mt-8'>
        <div className=' md:w-12/12  lg:w-4/12 left' >
          <img  style={{width : "200px"}} src={ theme == "light" ?  logoLightSvg : logoDarkSvg} alt="" />
          <div className='mt-4' >
            <p className={`py-4 px-3 bg-blue-800 rounded-md hover:bg-blue-700 text-white mb-2 font-bold border-b-black border-b-2 
              ${currentTab === "basics" ? "bg-blue-500" : ""}            `}
              onClick={() => setCurrentTab('basics')}
            > Basic Settings  </p>
            <p className={`py-4 px-3 bg-blue-800 rounded-md hover:bg-blue-700 text-white mb-2 font-bold border-b-black border-b-2  ${currentTab === "password" ? "bg-teal-500" : ""}     `}
              onClick={() => setCurrentTab('password')}
            > Change Password </p>
          </div>
        </div>

        <div className='md:w-12/12 lg:w-8/12 right '>
          {currentTab == "basics" ? <Basics /> : <ChangePassword />}
        </div>

      </main >

    </div >






  )
}







