import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../utils/getCookie'

export default function SuggestedProfiles() {

  const [users, setUsers] = useState([])
  const [isLoading,setIsLoading] = useState(true)


  async function get() {
    try {
      let response = await axios.post('http://localhost:5000/api/get/suggested-profiles', { token: getCookie('token') })
      // console.log(response.data)
      setUsers(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    get()
  }, [])

  return (
    <div className=''>
      <header className='flex justify-between mb-4'>
        <p className="text text-gray-600 "> Suggestions for you</p>
        <button className='font-bold' >Refresh        </button>
      </header>
      <div className="body">
        {users.map((item, index) => <Box key={index} item={item} />)}
      </div>
    </div >
  )
}
function Box(props){
  const {item} = props
  const [isSubmitting,setIsSubmitting] = useState(false)

  async function follw (){

  }
  async function unfollow (){

  }

  return (
    <div  className="flex justify-between py-2 hover:bg-slate-200 px-1 rounded-md" >
          <div className='flex gap-2 items-center'>
            <Link to={"/profile/" + item.username} >
              <img className='w-8 rounded-full' src={item.avatar ? "http://localhost:5000/avatars/" + item.avatar : "http://localhost:5000/avatars/default.svg"} alt="" />
            </Link >
            <Link to={"/profile/" + item.username} >
              <p className="username font-bold"> {item.username} </p>
            </Link>
          </div>
          <button className='px-2 py-1 text-white bg-violet-600 rounded-lg hover:bg-violet-800 text-sm '> Follow  </button>
        </div>
  )
}