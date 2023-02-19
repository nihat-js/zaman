import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import lockSvg from '../assets/svg/lock.svg'
import userSvg from '../assets/svg/user.svg'
import loadingWhiteSvg from '../assets/svg/loading-white.svg'
import emailSvg from '../assets/svg/email.svg'

import { Link, useNavigate } from 'react-router-dom'
import { getCookie } from '../utils/getCookie'

import InputGroup from '../components/InputGroup'

export default function Index() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const URL = "http://localhost:5000/api/entry/register"


  function isLoggedIn() {
    if (getCookie('token')) {
      navigate('/feed')
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  async function handleClick() {
    if (!username || !password || !cpassword || !email) {
      setError("Please fill the fields")
      return false
    }
    if (password.length< 6){
      return setError("Password must be at least 6 characters long")
    }

    if (password != cpassword) {
      setError("Passwords do not match")
      return false
    }

    setIsSubmitting(true)
    try {
      let response = await axios.post(URL, {
        username: username,
        email: email,
        password: password,
      })
      document.cookie = "token=" + response.data.token
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate('/settings')
    } catch (error) {
      setError(error.response.data.message)
    }
    setIsSubmitting(false)
  }





  return (
    <div className='login-page min-h-screen ' style={{ backgroundColor: '#f2f4f7' }}>

      <section className="start ">

        <div className="container mx-auto min-h-screen  flex justify-center items-center">
          <form action=" " style={{ minWidth: "400px" }} className="px-8 py-6 bg-white rounded-md shadow-md">

            <h1 className="title  text-4xl text-center mb-10 font-bold "> Login  </h1>
            <InputGroup text="Username" image={userSvg} type="text" value={username} setValue={setUsername} />
            <InputGroup text="Email" image={emailSvg} type="text" value={email} setValue={setEmail} />
            <InputGroup text="Password" image={lockSvg} type="password" value={password} setValue={setPassword} />
            <InputGroup text="Confirm Password" image={lockSvg} type="password" value={cpassword} setValue={setCpassword} />
            <div className="errors mt-3">
              <span className='text-sm text-red-700 font-bold' >  {error} </span>
            </div>

            <div className="button-wrap flex justify-center mt-10  ">
              <button
                onClick={(e) => { e.preventDefault(); isSubmitting === false ? handleClick() : "" }}
                className={`flex gap-2  justify-center items-center bg-teal-600 hover:bg-teal-700 text-white rounded-md text-xl 
              hover:shadow-md py-2 px-4 w-8/12 ${isSubmitting && 'cursor-not-allowed'} `}>
                <img className={`w-5 ${isSubmitting ? 'animate-spin' : 'hidden'} `} src={loadingWhiteSvg} alt="" />
                <span> Signup </span>
              </button>
            </div>
            <div className="i-have mt-8 text-center">
              <span className='cursor-pointer text-sm font-semibold' style={{ color: "#645C99" }}>
                <Link to='/login'>
                  Oops, I have an account
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>


    </div>


  )
}


