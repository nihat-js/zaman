import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../../contexts/Main'
export default function Username({ me, username, style, className, disableLink }) {
  const { user } = useContext(MainContext)
  if (me) {
    username = user.username
  }
  let to = "/profile/" + username
  let template = <p style={style} className={`username font-bold    ` + className}>   {username} </p>

  return (
    <div>
      {disableLink ? template :
        <Link to={to} >
          {template}
        </Link>
      }
    </div>


  )
}
