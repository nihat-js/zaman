import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../utils/getCookie'
import { useEffect, useState } from 'react'
import Avatar from '../components/Avatar'
import Username from "../components/Username"
import FollowButton from '../components/FollowButton'
import cakeSvg from '../assets/svg/cake.svg'
import rowSvg from '../assets/svg/row.svg'
import gridSvg from '../assets/svg/grid.svg'
import PostBox from "../components/Post/Box"
import PostSkleton from "../components/Post/Skleton"
import Nav from '../components/Nav'
import getUser from "../utils/getUser"


export default function Index() {
  const params = useParams()
  const navigate = useNavigate()
  const user = getUser()
  const target_username = params.username
  const [target, setTarget] = useState("Loading")
  const [posts, setPosts] = useState([])
  const host = "http://localhost:5000/"
  let me;


  useEffect(() => {
    if (target_username == user.username) {
      me = true
    }
  }, [])





  async function loadPosts() {
    setPosts("loading")
    try {
      let response = await axios.post(host + 'api/post/place', { name: "profile", token: getCookie('token') })
      console.log(response.data)
      setPosts(response.data)
    } catch (err) {
      console.log(err)
    }
  }


  async function handleMessage(req, res) {
    try {
      let response = await axios.post("http://localhost:5000/api/chat/start-or-find-chat", { target_username, token: getCookie('token') })
      console.log(response)
      navigate("/chat/" + response.data.chat_id)
    } catch (err) {
      console.log(err)
    }
  }

  async function loadProfile() {
    try {
      let response = await axios.post(host + "api/get/target-profile", { token: getCookie('token'), target_username: target_username })
      setTarget(response.data)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    loadProfile()
    loadPosts()
  }, [])



  return (
    <div className="profile-page min-h-full bg-slate-100">

      <Nav />


      <section className="start mt-5">
        <div style={{ maxWidth: "800px" }} className="mx-auto flex gap-12  "  >
          <Avatar style={{ width: '80px' }} me={me} avatar={target.avatar} username={target.username} />
          <div className='right'>
            <header className='flex gap-8 '>
              <Username className="username font-bold text-indigo-800 text-3xl"  > {target.username}  </Username>
              <FollowButton />
              <button className='px-2 py-2 bg-danube-600 font-bold text-white rounded-md' onClick={handleMessage} > Message </button>
            </header>
            <div className="stats">
              <span className='followers' > Followers {target.followers_count} </span>
              <span className='following'> Following  {target.followings_count} </span>
              <span className='posts' >  Posts count  {target.posts_count} </span>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="start">
        <div style={{ maxWidth: "1200px" }} className="mx-auto flex flex-col items-center justify-between ">
          <div className="row mx-auto flex flex-col content-center" style={{ maxWidth: "800px" }}> */}
      {/* <div style={{ minWidth: "800px", height: "150px" }} className="cover bg-slate-200 rounded-lg"> </div> */}
      {/* <div className="img-wrap mx-auto">
            </div>
            <h3 className="username font-bold text-2xl"> {target.username} </h3>
            
            <div className="cake-day flex gap-1">
              <span> Cake day  </span>
              <img className='w-6' src={cakeSvg} alt="" />
              <span>  {target.createdAt} </span>
            </div>
            <div className="actions flex gap-2">
              <FollowButton isFollowing={target.isFollowing} target_username={target_username} />
            </div>
          </div>
        </div> */}

      {/*         
        <section className="test py-20">
          <div style={{ maxWidth: "1000px" }} className="container mx-auto">
            <hr />
            <div className="filter flex justify-center mt-6 gap-2  ">
              <div className={`flex gap-1 py-2 px-3 cursor-pointer hover:bg-danube-600 hover:text-white    ${postStyle == "grid" ? "font-bold" : "text-gray-600"}  `}>
                <img className='w-5' src={gridSvg} alt="" />
                <span className='text-sm'>Grid style</span>
              </div>
              <div className={`flex gap-1 py-2 px-3 cursor-pointer hover:bg-danube-600 hover:text-white    ${postStyle == "row" ? "font-bold" : "text-gray-600"} `}>
                <img className='w-5' src={rowSvg} alt="" />
                <span className='text-sm'> Row style </span>
              </div>
            </div>
          </div>
        </section> */}

      <section className="posts py-10">
        <div style={{ maxWidth: "600px" }} className="mx-auto" >

          {
            typeof (posts) == "object" ? posts.map((item, index) => <PostBox key={index} data={item} />) :
              <PostSkleton />
          }
        </div>
      </section>

      {/* </section> */}

    </div>
  )
}

