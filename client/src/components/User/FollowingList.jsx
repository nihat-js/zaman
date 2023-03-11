import { useEffect, useState } from 'react'
import closeSvg from '../../assets/svg/close-black.svg'
import { host } from '../../config/config'
import axios from 'axios'
import { getToken } from '../../utils/utils'
export default function FollowingsList({ target_username , me  }) {
  const [data, setData] = useState([])
  username = "eltun"
  me = false
  async function get() {
    setData("loading")
    let  obj = { token :  getToken }
    me == true ? obj.me = true : obj.target_username = target_username
    let res = await axios.post(host + "api/user/list/followings", obj )
    console.log(res.data)
    setData(res.data)
  }


  useEffect(()=>{
    get()
  },[])


  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.85)" }} className='absolute top-0 left-0 w-screen h-screen  flex justify-center items-center' >
      <div className="content px-2 py-4 rounded-md bg-white z-100 " style={{ width: "400px" }} >
        <header className='flex justify-between'>
          <p className=""></p>
          <p className="font-bold"> Following List  </p>
          <img className='w-6 rounded-full hover:bg-slate-400' src={closeSvg} alt="" />
        </header>
        <main>
          {typeof (data) == "object" && data.length > 0 && data.map((i, j) => <div>
            
          </div>)
          }
          {typeof (data == "object") && data.length == 0 && <p>
            It's empty 
          </p>}
        </main>
      </div>
    </div>
  )
}
