import React, { useState } from 'react'

import LeftNav from '../components/Admin/LeftNav'
import DashBoard from '../components/Admin/DashBoard'
import Logout from '../components/Admin/Logout'
import Posts from "../components/Admin/Posts"
import Users from "../components/Admin/Users"
import Reports from "..//components/Admin/Reports"



import usersSvg from "../assets/svg/user.svg"
import logoutSvg from "../assets/svg/logout.svg"
import dashBoardSvg from "../assets/svg/dashboard.svg"
import postsSvg from "../assets/svg/posts.svg"
import reportsSvg from "../assets/svg/reports.svg"
import threeLineHorizontalSvg from "../assets/svg/three-line-horizontal.svg"



export default function Index() {

  const [currentTabName, setCurrentTabName] = useState("Dashboard")
  const [showNames, setshowNames] = useState(true)
  let tabs = [
    {
      name: "Dashboard",
      component: <DashBoard setCurrentTabName={setCurrentTabName} showNames={showNames} setshowNames={setshowNames} />,
      svg: dashBoardSvg,

    },
    {
      name: "Reports",
      component: <Reports />,
      svg: reportsSvg,
    },
    {
      name: "Users",
      component: <Users />,
      svg: usersSvg
    },
    {
      name: "Posts",
      component: <Posts />,
      svg: postsSvg,
    },
    {
      name: 'Logout',
      component: <Logout />,
      svg: logoutSvg

    }
  ]
  function greeting() {
    let user =  JSON.parse ( localStorage.getItem('user') )
    let today = new Date()
    let curHr = today.getHours()
    let phrase ;
    if (curHr < 6){
      phrase= "Good developing"
    }
    else if (curHr < 12) {
      phrase =  'Good morning'
    } else if (curHr < 18) {
      phrase =  'Good afternoon'
    } else {
      phrase =  'Good evening'
    }
    return phrase +" " + user.username
  }




  let navDivStyle = "bg-indigo-800 text-white w-full hover:rounded-tr-full  "
  return (
    <div className='flex gap-10 min-h-screen bg-slate-50 '>

      <div className={`${showNames ? "w-2/12" : "w-1/12"} duration-300 transition-all `}>
        <LeftNav tabs={tabs} currentTabName={currentTabName} setCurrentTabName={setCurrentTabName} showNames={showNames} setshowNames={setshowNames} />

      </div>

      <div className={`${showNames ? "w-10/12" : "w-11/12"} px-16  `}>
        <header className="mt-10 flex mb-8 justify-between " >
          <div className="left flex gap-4">
            <img className="w-8 cursor-pointer" src={threeLineHorizontalSvg} onClick={() => setshowNames(!showNames)} alt="" />
            <h4 className="text-3xl font-bold text-indigo-800">  {greeting()}  </h4>
          </div>
          <div className="right">
            <div className='bg-indigo-300 w-8 h-8 '></div>
          </div>
        </header>
        {
          tabs[tabs.findIndex(tab => tab.name === currentTabName)].component
        }


      </div>




    </div>
  )
}


