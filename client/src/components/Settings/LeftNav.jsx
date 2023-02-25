import usersSvg from "../../assets/svg/user.svg"
import logoutSvg from "../../assets/svg/logout.svg"
import dashBoardSvg from "../../assets/svg/dashboard.svg"
import logo from "../../assets/svg/zaman.png"

import "./LeftNav.css"

export default function LeftNav(props) {


  const tabs = [{ name: "Public settings", }, { name: "Account Security" },]

  return (
    <nav className="left-nav w-full   bg-indigo-800    py-10 rounded-r-2xl ">
      <div className="img-wrap mb-10 px-5">
      </div>
      {tabs.map((item, index) => {
        return (
          <div onClick={() => setCurrentTabName(item.name)}
            className={`flex gap-8 group text-white w-full relative hover:bg-slate-50  py-4 px-5   `}>
            <span className="  font-semibold group-hover:text-indigo-800" >  {item.name} </span>
          </div>
        )
      })}
    </nav>
  )
}
