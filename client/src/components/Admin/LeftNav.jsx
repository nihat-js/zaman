import usersSvg from "../../assets/svg/user.svg"
import logoutSvg from "../../assets/svg/logout.svg"
import dashBoardSvg from "../../assets/svg/dashboard.svg"
import logo from "../../assets/svg/zaman.png"

import "./LeftNav.css"

export default function SideNav(props) {

  const { tabs, currentTabName, setCurrentTabName, showNames } = props

  return (

    <nav className="left-nav w-full min-h-screen  bg-indigo-800    py-10 rounded-r-2xl ">
      <div className="img-wrap mb-10 px-5">
        {showNames &&
          <img src={logo} alt="" />
        }
      </div>


      {tabs.map((item, index) => {
        return (
          <div onClick={() => setCurrentTabName(item.name)}
            className={`flex gap-8 group text-white w-full relative hover:bg-slate-50  py-4 px-5 ${currentTabName == item.name ? "bg-indigo-700" : ""}  `}>
            <img src={item.svg} alt="" className='w-8' />
            <span className="  font-semibold group-hover:text-indigo-800" >  {showNames && item.name} </span>
          </div>
        )

      })}

    </nav>
  )
}
