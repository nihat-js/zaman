import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../utils/getCookie'
import { useContext, useEffect, useState } from 'react'
import Avatar from '../components/User/Avatar'
import Username from "../components/User/Username"
import FollowButton from '../components/User/FollowButton'
import cakeSvg from '../assets/svg/cake.svg'
import rowSvg from '../assets/svg/row.svg'
import gridSvg from '../assets/svg/grid.svg'
import PostBox from "../components/Post/Box"
import PostSkleton from "../components/Post/Skleton"
import Nav from '../components/Nav'
import { MainContext } from '../contexts/Main'
import { host } from "../config/config"
import { Link } from 'react-router-dom'
import loadingSvg from '../assets/svg/loading.svg'

export default function Index() {
  const params = useParams()
  const navigate = useNavigate()

  const { user, theme } = useContext(MainContext)
  const target_username = params.username
  const [target, setTarget] = useState("Loading")
  const [posts, setPosts] = useState([])
  const [isChanged, setIsChanged] = useState(params)
  const [isSubmitting, setIsSubmitting] = useState(false)
  let me;


  if (target_username == user.username) {
    me = true
  }

  useEffect(() => {
    loadUser()
    loadPosts()

  }, [params])




  async function loadPosts() {
    setPosts("loading")
    try {
      let response = await axios.post(host + 'api/post/place', { name: "user", token: getCookie('token'), target_username: target_username })
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

  async function loadUser() {
    try {
      let response = await axios.post(host + "api/user/profile", { token: getCookie('token'), target_username: target_username })
      setTarget(response.data)
      console.log("loadUser", response)
    } catch (err) {
      console.log(err)
    }
  }

  const unfollowButton = <button
    onClick={() => isSubmitting ? "" : unfollow()}
    className={` flex gap-1 items-center px-2 py-1 text-violet-800 border border-violet-600  rounded-lg hover:bg-violet-800 hover:text-white  text-sm ${isSubmitting ? "cursor-not-allowed" : ""}   `}>
    <span> Following </span>
    {isSubmitting && <img className='w-4 animate-spin' src={loadingSvg} />}
  </button>

  const followButton = <button
    onClick={() => follow()}
    className={`px-2 py-1 text-white bg-violet-400 rounded-lg hover:bg-violet-800 text-sm  flex gap-1 items-center ${isSubmitting ? "cursor-not-allowed" : ""}  `}>
    <span> Follow</span>
    {isSubmitting && <img className='w-4 animate-spin' src={loadingSvg} />}
  </button>

  async function follow() {
    setIsSubmitting(true)
    try {
      let result = await axios.post(host + "/api/follow", { token: getCookie('token'), target_username: target_username })
      setTarget({...target,isFollowing : true , followers_count : target.followers_count +1 })
    } catch (error) {
      console.log(error)
    }
    setIsSubmitting(false)

  }
  async function unfollow() {
    let response = confirm(`Are you sure you want to unfollow  " ${target.username}" ? `)
    if (!response) {
      return false
    }
    setIsSubmitting(true)
    try {
      let result = await axios.post(host +  "api/unfollow", { token: getCookie('token'), target_username: target.username })
      // console.log("res", result)
      setTarget({...target,isFollowing : false , followers_count : target.followers_count -1  })
    } catch (error) {
      console.log(error)
    }
    setIsSubmitting(false)
  }






  return (
    <div className={`profile-page min-h-full bg-slate-100 ${theme == "dark"  ? "bg-slate-800" : ""} `}>

      <Nav />


      <section className="start mt-5">
        <div style={{ maxWidth: "800px" }} className="mx-auto flex gap-12  "  >
          <Avatar style={{ width: '80px' }} me={me} avatar={target.avatar} username={target.username} />
          <div className='right'>
            <header className='flex gap-8 mb-6 '>
              <Username className="username font-bold text-indigo-800 text-3xl" username={target.username} >   </Username>
              {me ? <div className='mb-0'>
                <Link to="/settings">
                  <button className='bg-indigo-600 text-white px-2 py-2 hover:bg-indigo-800'> Edit account </button>
                </Link>
              </div> :
                <div className='flex gap-3 '>
                  {
                    target.isFollowing ? unfollowButton : followButton
                  }

                  {/* <FollowButton isFollowing={target.isFollowing} target_username={target.username} /> */}
                  <button className='px-2 py-2 bg-danube-600 font-bold text-white rounded-md' onClick={handleMessage} > Message </button>
                </div>

              }
            </header>
            <div className="stats">
              <span className='followers px-2 py-1 bg-slate-300 mr-2 rounded-md cursor-pointer hover:bg-slate-400 ' > Followers {target.followers_count} </span>
              <span className='following  px-2 py-1 bg-slate-300 mr-2 rounded-md cursor-pointer hover:bg-slate-400 '> Following  {target.followings_count} </span>
              <span className='posts  px-2 py-1 bg-slate-300 mr-2 rounded-md cursor-pointer hover:bg-slate-400  ' >  Posts count  {target.posts_count} </span>
            </div>
            <div className="bio mt-4 text-xl font-semibold"> {target?.bio} </div>

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

