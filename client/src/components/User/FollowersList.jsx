import { useEffect, useState } from 'react'
import closeSvg from '../../assets/svg/close-black.svg'
import { host } from '../../config/config'
import axios from 'axios'
import { token } from '../../utils/utils'
import Avatar from './Avatar'
import Username from './Username'
import FollowButton from './FollowButton'

export default function FollowersList({ target_username, me, setShowFollowersList }) {
  const [data, setData] = useState([])
  async function get() {
    setData("loading")
    let obj = { token, target_username }
    let res = await axios.post(host + "api/user/list/followers", obj)
    // console.log(res)
    setData(res.data)
  }
  useEffect(() => {
    get()
  }, [])


  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.85)" }} className='fixed top-0 left-0 w-screen h-screen  flex justify-center items-center z-50 ' >
      <div className="content px-4 py-4 rounded-md bg-white z-50 " style={{ width: "400px" }} >
        <header className='flex justify-between'>
          <p className=""></p>
          <p className="font-bold text-2xl mb-4"> Followers  List  </p>
          <img onClick={() => setShowFollowersList(false)}
            className='w-6 rounded-full hover:bg-slate-200' src={closeSvg} alt="" />
        </header>
        <main>
          {typeof (data) == "object" && data.length > 0 && data.map((i, j) => <div key={j} className='flex justify-between py-2 rounded-md hover:bg-slate-200 px-2 '>
            <div className="left flex gap-3">
              <Avatar username={i.username} avatar={i.avatar} />
              <Username className="text-xl" username={i.username} />
            </div>
            <div className="right">
              <FollowButton isFollowing = {i.isFollowing} target_username={i.username} />
            </div>
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
