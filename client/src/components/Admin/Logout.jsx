import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../../contexts/Main'
export default function Index() {
  const {user,updateUser} = useContext(MainContext) 
  const navigate = useNavigate()

  function clearCookie(){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00"
    updateUser({username : "" , avatar : ""})
    navigate('/login')
  }

  useEffect(()=>{
    clearCookie()
  })

  return (
    <div></div>
  )
}
