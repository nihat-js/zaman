import axios from 'axios'
import { useEffect } from 'react'



export default function Index() {

  const URL = "http://localhost:5000/login"

  async function login(){
    let response = await axios.post(URL,{"username":"nihat_","password":"nihat1234"})
  
    document.cookie="token="+response.data.token
    console.log(response)
  }


  return (
    <div>
      <button onClick={() => login()}> Login </button>
    </div>


  )
}
