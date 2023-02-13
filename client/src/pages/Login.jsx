import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import lockSvg from '../assets/svg/lock.svg'
import userSvg from '../assets/svg/user.svg'
import loadingWhiteSvg from '../assets/svg/loading-white.svg'
import { Link , useNavigate } from 'react-router-dom'
import {getCookie} from '../utils/getCookie'
export default function Index() {

  const navigate = useNavigate();


  const URL = "http://localhost:5000/login"

  const divUsername = useRef()
  const divPassword = useRef()
  const inpUsername = useRef()
  const inpPassword = useRef()

  const [isProcessing, setIsProcessing] = useState(false)
  const [error,setError] = useState(false)


  function isLoggedIn(){
    if (getCookie('token')){
      navigate('/feed')
    }
  }

  useEffect(()=>{
    isLoggedIn()
  },[])

  async function login() {
    const inpUsernameVal = inpUsername.current.value
    const inpPasswordVal = inpPassword.current.value
    if (inpUsernameVal === '' || inpPasswordVal === '') {
      setError("Please fill the fields")
      return false
    }

    setIsProcessing(true)
    let response = await axios.post(URL, { "username": inpUsernameVal, "password": inpPasswordVal })
    // console.log(response)
    if (response.data.status){
      document.cookie = "token=" + response.data.token
      navigate('/feed')
    }else{
      setError(response.data.message)
    }
    setIsProcessing(false)
  }

  useEffect(() => {
    
  })




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
            <div className="errors mt-3">
              <span className='text-sm text-red-700 font-bold' > {error} </span>
            </div>
            <div className="button-wrap flex justify-center mt-10  ">
              <button  onClick={(e) => { e.preventDefault() ;  isProcessing === false ? login(e) : ""  } } 
              className={`flex gap-2  justify-center items-center bg-teal-600 hover:bg-teal-700 text-white rounded-md text-xl 
              hover:shadow-md py-2 px-4 w-8/12 ${isProcessing && 'cursor-not-allowed' } `}>
                <img  className={` ${isProcessing ? 'w-5 animate-spin' : 'hidden'} `} src={loadingWhiteSvg} alt="" />
                <span> Login</span>
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
