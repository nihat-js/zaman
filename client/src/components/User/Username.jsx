import React, { useEffect } from 'react'
import getUser from '../../utils/getUser'
import { Link } from 'react-router-dom'

export default function Username(props) {
  const user = getUser()
  let { me, username , style , className } = props

  useEffect(() => {
    if (me) {
      username = user.username
    }
  })

  return (

    <p style={style} className={`username font-bold text-indigo-800 text-2xl ${className} `}>
      <Link to ={"/profile"+ username } >
        {username}
      </Link>
    </p>

  )
}
