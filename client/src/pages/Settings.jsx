import Nav from '../components/Nav'

import Avatar from '../components/User/Avatar'
import Username from "../components/User/Username"
import LeftNav from "../components/Settings/LeftNav"
import logo from "../assets/svg/logo.png"
import { host } from "../config/config"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getCookie } from "../utils/getCookie"
export default function Index() {


  let [user, setUser] = useState("loading")
  let [form, setForm] = useState({})




  const tabs = [{ name: "Public settings", }, { name: "Account Security" },]
  const [currentTabName, setCurrentTabName] = useState('')


  async function loadUser() {
    try {
      let response = await axios.post(host + "api/user/account", { token: getCookie('token') })
      console.log(response.data)
      setUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div className="setttings-page min-h-screen w-full bg-slate-50">
      <Nav />

      <div style={{ maxWidth: "1200px" }} className='flex gap-12 mx-auto '>
        <div className='w-4/12'>
          <nav className="left-nav w-full   bg-indigo-800    py-10 rounded-r-2xl ">
            <div className="img-wrap mb-10 px-5">
              {/* <img src={logo} alt="" /> */}
            </div>
            {tabs.map((item, index) => {
              return (
                <div onClick={() => setCurrentTabName(item.name)}
                  className={`flex gap-8 group text-white w-full relative hover:bg-slate-50  py-4 px-5   `}>
                  {/* <img src={item.} alt="" className='w-8' /> */}
                  <span className="  font-semibold group-hover:text-indigo-800" >  {item.name} </span>
                </div>
              )
            })}
          </nav>
        </div>

        <div className='w-8/12 mt-8 '>
          <header className='flex gap-12 '>
            <Avatar style={{ width: "100px" }} me={true} />
            <div>
              <Username me={true} style={{ color: "#192021" }} />
              <button className='text-indigo-800 mt-8 border-indigo-800 border  px-2 py-1 
            rounded-md hover:bg-indigo-800 hover:text-white '> Change Avatar </button>
            </div>
            <div>
              <div className="img-wrap flex gap-3 mb-4">
                <img className='w-12 rounded-md cursor-pointer  ' src={host + "/avatars/sample-1.svg"} alt="" />
                <img className='w-12 rounded-md cursor-pointer  ' src={host + "/avatars/sample-2.svg"} alt="" />
                <img className='w-12 rounded-md cursor-pointer  ' src={host + "/avatars/sample-3.svg"} alt="" />
                <img className='w-12 rounded-md cursor-pointer  ' src={host + "/avatars/sample-4.svg"} alt="" />
              </div>
              <p className="text"> Or use sample images </p>
            </div>
          </header>

          <div style={{ maxWidth: "500px" }} className="username-group flex  mt-10 gap-4 items-center">
            <label htmlFor='username' className="username w-3/12  font-semibold text-xl text-gray-500 "> Username </label>
            <input value={typeof (user) == "object" ? user.username : "ee"}
              className='w-9/12 outline-none px-2 py-3  border border-indigo-300 focus:border-indigo-500 rounded-sm' type="text" id="username" />
          </div>

          <div style={{ maxWidth: "500px" }} className="email-group flex  mt-8 gap-4 items-center">
            <label htmlFor='email' className="email w-3/12  font-semibold text-xl text-gray-500 "> Email </label>
            <input value={typeof (user) == "object" ? user.email : ""}
              className='w-9/12 outline-none px-2 py-3  border border-indigo-300 rounded-sm focus:border-indigo-500 ' type="text" id="email" />
          </div>

          <div style={{ maxWidth: "500px" }} className="number-group flex  mt-8 gap-4 items-center">
            <label htmlFor='number' className="number w-3/12  font-semibold text-xl text-gray-500 "> Phone number </label>
            <input value={typeof (user) == "object" ? user.phone_number : ""}
              className='w-9/12 outline-none px-2 py-3  border border-indigo-300 rounded-sm focus:border-indigo-500 ' type="text" id="number" />
          </div>

          <div style={{ maxWidth: "500px" }} className="bio-group flex  mt-8 gap-4 items-center">
            <label htmlFor='bio' className="bio w-3/12  font-semibold text-xl text-gray-500 "> Bio </label>
            <textarea
              className='w-9/12 outline-none px-2 py-3  border border-indigo-300 rounded-sm focus:border-indigo-500 resize-none '
              type="text" id="bio"
              value={typeof (user) == "object" ? user.bio : ""} />
          </div>

          <div style={{ maxWidth: "500px" }} className="gender-group flex  mt-8 gap-4 items-center">
            <p className='w-3/12' > Gender </p>
            <div className='bg-slate-200 py-2 px-2 rounded-md'>
              {
                ['male', 'female', 'none'].map((i, j) => {
                  // return <button className={`px-6 py-2 cursor-pointer select-none rounded-md  ${ typeof(user) == "object" && user.gender == i ? "bg-indigo-800 text-white " : '' }`} > {i} </button>
                })
              }
            </div>
          </div>

          <div className="button-wrap mt-6">
            <button className='px-5 py-3 bg-indigo-600 text-white hover:bg-indigo-800 rounded ' > Save it </button>
          </div>

        </div>
      </div >

    </div >






  )
}













