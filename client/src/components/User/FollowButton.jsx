import React, { useState } from 'react'
import axios from "axios"
import { getCookie } from '../../utils/getCookie'
export default function FollowButton(props) {

  const { target_username, isFollowing } = props

  const [isFollowing_, setIsFollowing] = useState(isFollowing)

    console.log("fb",isFollowing_, target_username)

  



  return (
    isFollowing_ ? unfollowButton : followButton
  )
}
