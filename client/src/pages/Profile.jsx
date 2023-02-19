import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../utils/getCookie'
import { useEffect, useState } from 'react'
import FollowButton from '../components/FollowButton'

import cakeSvg from '../assets/svg/cake.svg'
import rowSvg from '../assets/svg/row.svg'
import gridSvg from '../assets/svg/grid.svg'


import PostBox from '../components/PostBox'
import Nav from '../components/Nav'
export default function Index() {


  
  const params = useParams()
  const target_username = params.username
  const [isLoading,setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [postStyle, setPostStyle] = useState('grid')
  const [target,setTarget] = useState({})
  
  async function getTargetProfile(){
    try{  
      let response = await axios.post("http://localhost:5000/api/get/target-profile",{token : getCookie('token') , target_username : target_username })
      setTarget(response.data)
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }



  useEffect(() => {
    getTargetProfile()
  }, [])



  return (
    <div className="profile-page">

      <Nav />


      <section className="start">
        <div style={{maxWidth : "1200px"}}  className="mx-auto flex flex-col items-center justify-between ">
          <div className="row mx-auto flex flex-col content-center" style={{ maxWidth: "800px" }}>
            <div style={{ minWidth : "800px", height:"200px"}} className="cover bg-slate-200 rounded-lg">
            </div>
            <div className="img-wrap mx-auto">
              <img className='w-20 rounded-full -mt-10' src={target.avatar == "" ? "http://localhost:5000/avatars/default.svg" : "http://localhost:5000/avatars/" + target.avatar} alt="" />
            </div>
            <h3 className="username font-bold text-2xl"> {target.username} </h3>
            <div className="stats">
              <span className='followers' > Followers {target.followers_count} </span>
              <span className='following'> Following  {target.followings_count} </span>
              <span className='posts' >  Posts count  {target.posts_count} </span>
            </div>
            <div className="cake-day flex gap-1">
              <span> Cake day  </span>
              <img className='w-6' src={cakeSvg} alt="" />
              <span>  {target.createdAt} </span>
            </div>
            <div className="actions flex gap-2">
              <FollowButton isFollowing={target.isFollowing}  target_username={target_username} />

              <button className='px-2 py-3 bg-danube-600 font-bold text-white rounded-md'> Message </button>
            </div>
          </div>
        </div>
        <section className="posts py-20">
          <div style={{ maxWidth: "1000px" }} className="container mx-auto">
            <hr />
            <div className="filter flex justify-center mt-6 gap-2  ">
              <div className={`flex gap-1 py-2 px-3 cursor-pointer hover:bg-danube-600 hover:text-white    ${postStyle == "grid" ? "font-bold" : "text-gray-600"}  `}>
                <img className='w-5' src={gridSvg} alt="" />
                <span className='text-sm'>Grid style</span>
              </div>
              <div className={`flex gap-1 py-2 px-3 cursor-pointer hover:bg-danube-600 hover:text-white    ${postStyle == "row" ? "font-bold" : "text-gray-600"} ` }>
                <img className='w-5' src={rowSvg} alt="" />
                <span className='text-sm'> Row style </span>
              </div>
            </div>
          </div>
        </section>

      </section>

    </div>
  )
}

