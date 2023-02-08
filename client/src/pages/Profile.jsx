import {useParams} from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../utils/getCookie'
import { useEffect } from 'react'
export default function Index() {

  const params  = useParams()
  const target_username = params.username

  
  async function getUserStats(){
    let response = await axios.post('http://localhost:5000/get-user-stats')
    console.log(response.data)

  }

  async function follow(){
    let response = await axios.post('http://localhost:5000/follow-user',{target_username, token: getCookie('token')})
    console.log(response.data)
  }

  useEffect(()=>{
    getUserStats()                
  })

  return (
    <div className="profile-page">

      <section className="start">
        <div className="container">
          <h3> Follow this user </h3>
          <span className='' > Followers 0 </span>
          <span className=''> Following 0</span>
          <span >  Posts count 0 </span>
          <button onClick={() => follow()}> Follow eltun </button>
        </div>
      </section>

    </div>
  )
}
