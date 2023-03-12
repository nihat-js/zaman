import React, { useState } from 'react'
import axios from "axios"
import { host } from '../../config/config'
import { getToken } from '../../utils/utils'
import loadingSvg from '../../assets/svg/loading.svg'

export default function FollowButton(props) {

  const { target_username } = props
  const [isFollowing, setIsFollowing] = useState(props.isFollowing)
  const [isSubmitting, setIsSubmitting] = useState(false)
  async function follow() {
    setIsSubmitting(true)
    try {
      let result = await axios.post(host + "api/user/follow", { token: getToken, target_username: target_username })
      setIsFollowing(true)
    } catch (error) {
      console.log(error)
    } 
    setIsSubmitting(false)
  }
  async function unfollow() {
    let response = confirm(`Are you sure you want to unfollow  " ${target_username}" ? `)
    if (!response) {return false }
    setIsSubmitting(true)
    try {
      let result = await axios.post(host + "api/user/unfollow", { token: getToken, target_username: target_username })
      setIsFollowing(false)
      // console.log("res", result)
    } catch (error) {
      console.log(error)
    }
    setIsSubmitting(false)
  }



  return (
    <>
      {
        isFollowing ? <button
          onClick={() => isSubmitting ? "" : unfollow()}
          className={` cursor-default flex gap-1 items-center px-2 py-1 text-violet-800 border border-violet-600  rounded-lg hover:bg-violet-800 hover:text-white  text-sm ${isSubmitting ? "cursor-not-allowed" : ""}   `}>
          <span> Following </span>
          {isSubmitting && <img className='w-4 animate-spin' src={loadingSvg} />}
        </button> :
          <button
            onClick={() => follow()}
            className={` cursor-default px-2 py-1 text-white bg-violet-400 rounded-lg hover:bg-violet-800 text-sm  flex gap-1 items-center ${isSubmitting ? "cursor-not-allowed" : ""}  `}>
            <span> Follow</span>
            {isSubmitting && <img className='w-4 animate-spin' src={loadingSvg} />}
          </button>
      }
    </>

  )
}
