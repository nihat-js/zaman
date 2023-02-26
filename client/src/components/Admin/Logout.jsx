import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index() {

  const navigate = useNavigate()

  function clearCookie(){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00"
    navigate('/login')
  }

  useEffect(()=>{
    clearCookie()
  })

  return (
    <div></div>
  )
}
