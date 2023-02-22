import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../utils/getCookie'
import { useEffect, useState } from 'react'
import Avatar from '../components/Avatar'

import FollowButton from '../components/FollowButton'

import cakeSvg from '../assets/svg/cake.svg'
import rowSvg from '../assets/svg/row.svg'
import gridSvg from '../assets/svg/grid.svg'


import PostBox from '../components/PostBox'
import Nav from '../components/Nav'
export default function Index() {


  
  const params = useParams()
  const navigate = useNavigate()
  const target_username = params.username
  const [isLoading,setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [postStyle, setPostStyle] = useState('grid')
  const [target,setTarget] = useState({})




  async function handleMessage(req,res){
    try {
      let response = await axios.post("http://localhost:5000/api/chat/start-or-find-chat",{target_username , token : getCookie('token')})
      console.log(response)
      navigate("/chat/" + response.data.chat_id)
    }catch(err){
      console.log(err)
    }
  }

  async function getTargetProfile(){
    try{  
      let response = await axios.post("http://localhost:5000/api/get/target-profile",{token : getCookie('token') , target_username : target_username })
      setTarget(response.data)
      // console.log(response)
    }catch(err){
      console.log(err)
    }
  }

  async function getPosts(){
    try{
      let response  = await axios.post("http://localhost:5000/api/post/user-posts",{token : getCookie('token')})
      console.log(response)
      setPosts(response.data)
    }catch(err){
      console.log(err)
    }
  }



  useEffect(() => {
    getTargetProfile()
    getPosts()
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
              <Avatar className="w-16 mt-10"  avatar={target.avatar} username={target.username} />              
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
              <button className='px-2 py-3 bg-danube-600 font-bold text-white rounded-md' onClick={handleMessage} > Message </button>
            </div>
          </div>
        </div>
        <section className="test py-20">
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

        <section className="posts py-10">
          <div style={{maxWidth : "600px"}}  className="mx-auto" >
            { posts.map((item,index) => <PostBox item={item} key={index} />  )  }
          </div>
        </section>

      </section>

    </div>
  )
}

