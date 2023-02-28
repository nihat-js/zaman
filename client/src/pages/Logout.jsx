import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index() {

  const navigate = useNavigate()

  function clearCookie(){
    document.cookie = "token="
    localStorage.clear()
    navigate('/login')
  }

  useEffect(()=>{
    clearCookie()
  })

  return (
    <div></div>
  )
}
