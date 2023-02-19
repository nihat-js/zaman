import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../utils/getCookie'
import { useEffect, useState } from 'react'

import cakeSvg from '../assets/svg/cake.svg'
import rowSvg from '../assets/svg/row.svg'
import gridSvg from '../assets/svg/grid.svg'


import PostBox from '../components/PostBox'
import Nav from '../components/Nav'
export default function Index() {


  
  const params = useParams()
  const target_username = params.username
  const [posts, setPosts] = useState([])

  const [postStyle, setPostStyle] = useState('grid')

  const target = {
    username: "Eltun",
    avatar: "",
    created: "",
    followers_count: 0,
    followings_count: 0,
    posts_count: 0,
    createdAt: "21 may 2022"
  }


  useEffect(() => {
    // getUserProfile()
  }, [])



  return (
    <div className="profile-page">


      <Nav />


      <section className="start">
        <div className="container">
          <div className="row mx-auto flex flex-col content-center" style={{ maxWidth: "600px" }}>
            <div className="img-wrap">
              <img className='w-16' src={target.avatar == "" ? "http://localhost:5000/avatars/default.svg" : "http://localhost:5000/" + target.avatar} alt="" />
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
              <button className='px-2 py-3 bg-danube-600 font-bold text-white  rounded-md' onClick={() => follow()}> Follow  </button>
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

