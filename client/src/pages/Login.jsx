import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import lockSvg from '../assets/svg/lock.svg'
import userSvg from '../assets/svg/user.svg'
import { Link } from 'react-router-dom'
export default function Index() {

  const URL = "http://localhost:5000/login"

  const divUsername = useRef()
  const divPassword = useRef()
  const inpUsername = useRef()
  const inpPassword = useRef()

  const [isLogging,setIsLogging] = useState(false) 

  async function login() {
    const inpUsernameVal = inpUsername.current.value
    const inpPasswordVal = inpPassword.current.value

    let response = await axios.post(URL, { "username": inpUsernameVal, "password": inpPasswordVal })
    document.cookie = "token=" + response.data.token
    console.log(response)
  }






  return (
    <div className='login-page min-h-screen ' style={{ backgroundColor: '#f2f4f7' }}>

      <section className="start ">
        <div className="container mx-auto min-h-screen  flex justify-center items-center">
          <form action=" " style={{ minWidth: "400px" }} className="px-8 py-6 bg-white rounded-md shadow-md">
            <h1 className="title  text-4xl text-center mb-10 font-bold "> Login  </h1>

            <div className="username mb-12 relative ">
              <div ref={divUsername} className='flex gap-2 absolute top-1 duration-200 ' onClick={() => { divUsername.current.style.top = "-25px"; inpUsername.current.focus() }}>
                <img src={userSvg} alt="" className='w-4' />
                <span className='text-gray-400 text-sm'> Username </span>
              </div>
              <input ref={inpUsername} type="text" className='w-full border-b-2 px-3 py-1 border-b-gray-200 outline-none'
                onBlur={() => divUsername.current.style.top = "4px"}
                onFocus={() => { divUsername.current.style.top = "-25px"; inpUsername.current.focus() }} />
            </div>

            <div className="password mb-4 relative ">
              <div ref={divPassword} className='flex gap-2 absolute top-1 duration-200 ' onClick={() => { divPassword.current.style.top = "-25px"; divPassword.current.focus() }}>
                <img src={lockSvg} alt="" className='w-4' />
                <span className='text-gray-400 text-sm'> Password </span>
              </div>
              <input ref={inpPassword} type="text" className='w-full border-b-2 px-3 py-1 border-b-gray-200 outline-none'
                onBlur={() => divPassword.current.style.top = "4px"}
                onFocus={() => { divPassword.current.style.top = "-25px"; divPassword.current.focus() }} />
            </div>
            <div className="forgot-password">
              <span className="text-sm cursor-pointer font-semibold px-3 py-2  hover:bg-danube-600 text-danube-600 rounded-md hover:text-white " >  <Link to='/forgot-password'> Forgot Password     </Link>  </span>
            </div>
            <div className="button-wrap text-center mt-10">
              <button className='bg-teal-600 hover:bg-teal-500 text-white rounded-sm text-xl hover:shadow-md py-2 px-4 w-8/12 '>
                Login
              </button>
            </div>
            <div className="i-have mt-8 text-center">
              <span className='cursor-pointer text-sm font-semibold' style={{ color: "#645C99" }}>
                <Link to='/register'>
                  No, I don't have account
                </Link>
              </span>
            </div>

          </form>
        </div>
      </section>


    </div>


  )
}
