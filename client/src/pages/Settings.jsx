import Nav from '../components/Nav'

import Avatar from '../components/User/Avatar'
import Username from "../components/User/Username"
import LeftNav from "../components/Settings/LeftNav"
import logo from "../assets/svg/logo.png"
import { host } from "../config/config"
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getCookie } from "../utils/getCookie"
import { MainContext } from '../contexts/Main'


export default function Index() {

  let { user, updateUser } = useContext(MainContext)
  let [data, setData] = useState("loading")
  let [form, setForm] = useState({})


  async function uploadAvatar(e){
    if (!e.target.files[0] ) return false
    try{
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('token', getCookie('token') )
      let result = await axios.post(host + "/api/user/avatar/upload")
      // updateUser({avatar : result.data  })
    }catch(err){
      console.log(err)
    }
  }


 


  async function setAvatar(file_name) {
    try {
      let result = await axios.post(host + "api/user/avatar/set", { token: getCookie('token'), file_name })
      if (result) {
        updateUser({ avatar: file_name })
      }
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }


  async function handleInput()


 
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
          <LeftNav />
        </div>


        <div className='w-8/12 mt-8 '>
          <form action="" encType='multipart/form-data' >
            <input onChange={(e) => uploadAvatar(e)} id="file" type="file" name="file" className='hidden' />
          </form>
          <header className='flex gap-12 '>
            <Avatar style={{ width: "100px" }} me={true} />
            <div>
              <Username me={true} style={{ color: "#192021" }} />
              <label htmlFor="file">
                <p className='text-indigo-800 mt-8 border-indigo-800 border  px-2 py-1 
                  rounded-md hover:bg-indigo-800 hover:text-white '> Change Avatar </p>
              </label>
            </div>
            <div>
              <div className="img-wrap flex gap-3 mb-4">
                {
                  ["sample-1.svg", "sample-2.svg", "sample-3.svg", "sample-4.svg"].map((i, j) => {
                    return <img key={j} onClick={() => setAvatar(i)}
                      className='w-12 rounded-md cursor-pointer hover:border-indigo-400 border-2 hover:brightness-90 ' src={host + "avatars/" + i} />
                  })
                }
              </div>
              <p className="text"> Or use sample images </p>
            </div>
          </header>

          <UsernameInput />




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


function UsernameInput(props) {
  const { data, handleInput } = props.data
  return (
    <div style={{ maxWidth: "500px" }} className="username-group flex  mt-10 gap-4 items-center">
      <label htmlFor='username' className="username w-3/12  font-semibold text-xl text-gray-500 "> Username </label>
      <input name="username"
        value={typeof (user) == "object" ? user.username : "ee"} onChange={(e) => handleInput(e)}
        className='w-9/12 outline-none px-2 py-3  border border-indigo-300 focus:border-indigo-500 rounded-sm' type="text" id="username" />
    </div>
  )
}

function EmailInput(props) {
  const { data, handleInput } = props.data
  return (
    <div style={{ maxWidth: "500px" }} className=" flex  mt-10 gap-4 items-center">
      <label htmlFor='email' className="email w-3/12  font-semibold text-xl text-gray-500 "> Email </label>
      <input name="email"
        value={typeof (user) == "object" ? data.email : "ee"} onChange={(e) => handleInput(e)}
        className='w-9/12 outline-none px-2 py-3  border border-indigo-300 focus:border-indigo-500 rounded-sm' type="text" id="username" />
    </div>
  )
}

function BioInput(props) {
  return (
    <div style={{ maxWidth: "500px" }} className="bio-group flex  mt-8 gap-4 items-center">
      <label htmlFor='bio' className="bio w-3/12  font-semibold text-xl text-gray-500 "> Bio </label>
      <textarea
        className='w-9/12 outline-none px-2 py-3  border border-indigo-300 rounded-sm focus:border-indigo-500 resize-none '
        type="text" id="bio"
        value={typeof (user) == "object" ? user.bio : ""} />
    </div>

  )
}


function PhoneInput(props) {
  const { data, handleInput } = props.data
  return (
    <div style={{ maxWidth: "500px" }} className="number-group flex  mt-8 gap-4 items-center">
      <label htmlFor='number' className="number w-3/12  font-semibold text-xl text-gray-500 "> Phone number </label>
      <input value={typeof (user) == "object" ? user.phone_number : ""}
        className='w-9/12 outline-none px-2 py-3  border border-indigo-300 rounded-sm focus:border-indigo-500 ' type="text" id="number" />
    </div>

  )
}











