import React, { useState } from 'react'
import axios from "axios"
import {getCookie} from '../utils/getCookie'
import loadingSvg from '../assets/svg/loading.svg'
export default function FollowButton(props) {

  const {target_username} = props

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFollowing, setIsFollowing] = useState(props.isFollowing)

  // console.log(isFollowing , target_username)
  async function follow() {
    setIsSubmitting(true)
    try {
      let result = await axios.post("http://localhost:5000/api/follow", { token: getCookie('token'), target_username: target_username })
      setIsFollowing(true)
    } catch (error) {
      console.log(error)
    }
    setIsSubmitting(false)

  }
  async function unfollow() {
    let response = confirm(`Are you sure you want to unfollow  " ${username}" ? `)
    if (!response) {
      return false
    }
    setIsSubmitting(true)
    try {
      let result = await axios.post("http://localhost:5000/api/unfollow", { token: getCookie('token'), target_username: username })
      // console.log("res", result)
      setIsFollowing(false)
    } catch (error) {
      console.log(error)
    }
    setIsSubmitting(false)
  }


  const unfollowButton = <button onClick={() => isSubmitting ? "" : unfollow()}
    className={` flex gap-1 items-center px-2 py-1 text-violet-800 border border-violet-600  rounded-lg hover:bg-violet-800 hover:text-white  text-sm ${isSubmitting ? "cursor-not-allowed" : ""}   `}>
    <span> Following </span>
    {isSubmitting && <img className='w-4 animate-spin' src={loadingSvg} />}
  </button>

  const followButton = <button onClick={() => follow()}
    className={`px-2 py-1 text-white bg-violet-400 rounded-lg hover:bg-violet-800 text-sm  flex gap-1 items-center ${isSubmitting ? "cursor-not-allowed" : ""}  `}>
    <span> Follow</span>
    {isSubmitting && <img className='w-4 animate-spin' src={loadingSvg} />}
  </button>

  return (
    isFollowing ?  unfollowButton : followButton
  )
}
