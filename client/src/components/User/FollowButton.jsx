import React, { useState } from 'react'
import axios from "axios"
import { getCookie } from '../../utils/getCookie'
export default function FollowButton(props) {

  const { target_username, isFollowing } = props

  const [isFollowing_, setIsFollowing] = useState(isFollowing)
  console.log("fb", isFollowing_, target_username)


  const unfollowButton = <button
    onClick={() => isSubmitting ? "" : unfollow()}
    className={` flex gap-1 items-center px-2 py-1 text-violet-800 border border-violet-600  rounded-lg hover:bg-violet-800 hover:text-white  text-sm ${isSubmitting ? "cursor-not-allowed" : ""}   `}>
    <span> Following </span>
    {isSubmitting && <img className='w-4 animate-spin' src={loadingSvg} />}
  </button>

  const followButton = <button
    onClick={() => follow()}
    className={`px-2 py-1 text-white bg-violet-400 rounded-lg hover:bg-violet-800 text-sm  flex gap-1 items-center ${isSubmitting ? "cursor-not-allowed" : ""}  `}>
    <span> Follow</span>
    {isSubmitting && <img className='w-4 animate-spin' src={loadingSvg} />}
  </button>

  async function follow() {
    setIsSubmitting(true)
    try {
      let result = await axios.post(host + "/api/follow", { token: getCookie('token'), target_username: target_username })
      setTarget({ ...target, isFollowing: true, followers_count: target.followers_count + 1 })
    } catch (error) {
      console.log(error)
    }
    setIsSubmitting(false)

  }
  async function unfollow() {
    let response = confirm(`Are you sure you want to unfollow  " ${target.username}" ? `)
    if (!response) {
      return false
    }
    setIsSubmitting(true)
    try {
      let result = await axios.post(host + "api/unfollow", { token: getCookie('token'), target_username: target.username })
      // console.log("res", result)
      setTarget({ ...target, isFollowing: false, followers_count: target.followers_count - 1 })
    } catch (error) {
      console.log(error)
    }
    setIsSubmitting(false)
  }



  return (
    isFollowing_ ? unfollowButton : followButton
  )
}
