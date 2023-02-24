import React, { useState } from 'react'

import LeftNav from '../components/Admin/LeftNav'
import DashBoard from '../components/Admin/DashBoard'
import Logout from '../components/Admin/Logout'
import Posts from "../components/Admin/Posts"
import Users from "../components/Admin/Users"

import usersSvg from "../assets/svg/user.svg"
import logoutSvg from "../assets/svg/logout.svg"
import dashBoardSvg from "../assets/svg/dashboard.svg"
import postsSvg from "../assets/svg/posts.svg"


export default function Index() {


  let tabs = [
    {
      name  : "Dashboard",
      component : <DashBoard/>,
      svg: dashBoardSvg,

    },
    {
      name : "Users",
      component : <Users />,
      svg : usersSvg
    },
    {
      name : "Posts",
      component : <Posts />,
      svg : postsSvg ,
    },
    {
      name : 'Logout',
      component :<Logout/>,
      svg : logoutSvg

    }
  ]

  const [currentTabName,setCurrentTabName] = useState("Dashboard")



  let navDivStyle = "bg-indigo-800 text-white w-full hover:rounded-tr-full  "
  return (
    <div className='flex gap-10 min-h-screen bg-slate-50 '>

      <div className="w-2/12">
        <LeftNav tabs={tabs} currentTabName={currentTabName} setCurrentTabName={setCurrentTabName} />

      </div>

      <div className='w-10/12'>

        {
          tabs[ tabs.findIndex(tab => tab.name === currentTabName) ].component
        }


      </div>




    </div>
  )
}


