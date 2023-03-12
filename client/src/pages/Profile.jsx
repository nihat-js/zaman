import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../utils/getCookie'
import { useContext, useEffect, useState } from 'react'
import Avatar from '../components/User/Avatar'
import Username from "../components/User/Username"
import FollowButton from '../components/User/FollowButton'
import cakeSvg from '../assets/svg/cake.svg'
import PostBox from "../components/Post/Box"
import PostSkleton from "../components/Post/Skleton"
import Nav from '../components/Nav'
import { MainContext } from '../contexts/Main'
import { host } from "../config/config"
import { Link } from 'react-router-dom'
import FollowingsList from '../components/User/FollowersList'
import FollowersList from '../components/User/FollowersList'
export default function Index() {
  const params = useParams()
  const navigate = useNavigate()
  const { user, theme } = useContext(MainContext)
  const target_username = params.username
  const [target, setTarget] = useState("Loading")
  const [posts, setPosts] = useState([])
  const [showFollowersList,setShowFollowersList ] = useState(false)
  const [showFollowingsList,setShowFollowingsList] = useState(false)
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
      let response = await axios.post(host + "api/chat/start-or-find-chat", { target_username, token: getCookie('token') })
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







  return (
    <div className={`profile-page min-h-screen bg-slate-100 ${theme == "dark" ? "bg-slate-800" : ""} `}>
      <Nav />
      { showFollowingsList && <FollowingsList me = {me} target_username={target_username} setShowFollowingsList={setShowFollowingsList} />    }
      { showFollowersList && <FollowersList me={me} target_username={target_username}  setShowFollowersList={setShowFollowersList} />    }

      <section className="start mt-5">
        <div style={{ maxWidth: "700px" }} className="mx-auto flex gap-12  "  >
          <Avatar style={{ width: '80px' , height : "80px" }} me={me} avatar={target.avatar} username={target.username} />
          <div className='right'>
            <header className='flex gap-8 mb-6 '>
              <Username className=" text-3xl cursor-pointer " username={target.username} disableLink  >   </Username>
              {me ? <div className='mb-0'>
                <Link to="/settings">
                  <button className='bg-indigo-600 text-white px-2 py-2 hover:bg-indigo-800'> Edit account </button>
                </Link>
              </div> :
                <div className='flex gap-3 '>
                  { target.username  && <FollowButton  isFollowing={target.isFollowing} target_username={target.username} /> }
                  <button className='px-2 py-2 bg-danube-600 font-bold text-white rounded-md' onClick={handleMessage} > Message </button>
                </div>
              }
            </header>
            <div className="stats">
              <span onClick={ () => setShowFollowersList(true) } 
              className='followers px-2 py-1 bg-slate-300 mr-2 rounded-md cursor-pointer hover:bg-slate-400 ' > Followers {target.followers_count} </span>
              <span onClick={()=> setShowFollowingsList(true) } 
              className='following  px-2 py-1 bg-slate-300 mr-2 rounded-md cursor-pointer hover:bg-slate-400 '> Following  {target.followings_count} </span>
              <span className='posts  px-2 py-1 bg-slate-300 mr-2 rounded-md cursor-pointer hover:bg-slate-400  ' >  Posts count  {target.posts_count} </span>
            </div>
            <div className="bio mt-4 text-2xl font-semibold"> {target?.bio} </div>
          </div>
        </div>
      </section>


      <section className="posts py-10">
        <div style={{ maxWidth: "700px" }} className="mx-auto" >
          {
            typeof (posts) == "object" ? posts.map((item, index) => <PostBox key={index} data={item} />) :
              <PostSkleton />
          }
        </div>
      </section>
    </div>
  )
}

