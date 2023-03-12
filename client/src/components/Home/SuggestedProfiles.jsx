import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { token } from "../../utils/utils"

import { host } from "../../config/config"
import Avatar from "../User/Avatar"
import FollowButton from "../User/FollowButton"
import loadingSvg from '../../assets/svg/loading.svg'
import Username from '../User/Username'

export default function SuggestedProfiles() {

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  async function get() {
    setIsLoading(true)
    try {
      let response = await axios.post(host + "api/user/suggested", { token })
      // console.log(response.data)
      setUsers(response.data)
      setIsLoading(false)
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
        <button className='font-semibold' onClick={get} >Refresh        </button>
      </header>
      <div className="body">
        {isLoading ? [...new Array(5)].map((item, index) => <SkletonBox key={index} />) :
          users.map((item, index) => <Box key={index} item={item} />)}
      </div>

    </div >
  )
}

function SkletonBox() {
  return (
    <div className="flex justify-between py-2  px-1 rounded-md" >
      <div className='flex gap-2 items-center'>
        <div className='w-6 h-6 animate-pulse bg-slate-200 rounded-full' alt="" />
        <p className=" bg-slate-200 animate-pulse  duration-300 text-transparent username font-semibold"> randomrandom </p>
      </div>
      <button className={`px-1  animate-pulse duration-300 rounded-md bg-slate-200 text-transparent text-sm `}>
        Follow
      </button>
    </div>
  )
}

function Box(props) {
  const { avatar, username, stories_count } = props.item
  const [isFollowing, setIsFollowing] = useState(props.item.isFollowing)
  const [isSubmitting, setIsSubmitting] = useState(false)



  const followButton = <button onClick={() => follow()}
    className={`px-2 py-1 text-white bg-violet-400 rounded-lg hover:bg-violet-800 text-sm  flex gap-1 items-center ${isSubmitting ? "cursor-not-allowed" : ""}  `}>
    <span> Follow</span>
    {isSubmitting && <img className='w-4 animate-spin' src={loadingSvg} />}
  </button>

  const unfollowButton = <button onClick={() => isSubmitting ? "" : unfollow()}
    className={` flex gap-1 items-center px-2 py-1 text-violet-800 border border-violet-600  rounded-lg hover:bg-violet-800 hover:text-white  text-sm ${isSubmitting ? "cursor-not-allowed" : ""}   `}>
    <span> Following </span>
    {isSubmitting && <img className='w-4 animate-spin' src={loadingSvg} />}
  </button>

  return (
    <div className="flex justify-between py-2 hover:bg-slate-200 px-1 rounded-md" >
      <div className='flex gap-2 items-center'>
        <Avatar username={username} avatar={avatar} stories_count={stories_count} />
        <Username username={username} avatar={avatar} />
      </div>
      <FollowButton target_username={username} isFollowing={isFollowing} />
    </div>
  )
}