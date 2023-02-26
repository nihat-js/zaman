import React, { useContext, useEffect } from 'react'
import getUser from '../../utils/getUser'
import { Link } from 'react-router-dom'
import { MainContext } from '../../contexts/Main'
export default function Username(props) {
  const user = useContext(MainContext)
  let { me, username , style , className } = props
  
  if (me) {
    username = user.username
  }


  return (

    <p style={style} className={`username font-bold text-indigo-800 text-2xl ${className} `}>
      <Link to ={"/profile/"+ username } >
        {username}
      </Link>
    </p>

  )
}
