import usersSvg from "../../assets/svg/user.svg"
import logoutSvg from "../../assets/svg/logout.svg"
import dashBoardSvg from "../../assets/svg/dashboard.svg"
import logo from "../../assets/svg/zaman.png"

import "./LeftNav.css"

export default function SideNav(props) {

  const { tabs, currentTabName, setCurrentTabName, showNames } = props

  return (

    <nav className="left-nav w-full min-h-screen bg-gradient-to-r  from-purple-500 to-purple-700   py-10 ">
      <div className="img-wrap mb-10 px-5">
        <img src={logo} alt="" />
      </div>


      {tabs.map((item, index) => {
        return (
          <div onClick={ () => setCurrentTabName(item.name) }  
          className="flex gap-8 text-white w-full relative hover:bg-slate-50  py-4 px-5 ">
            <img src={item.svg} alt="" className='w-8' />
            <span> {item.name} </span>
          </div>
        )

      })}

    </nav>
  )
}
