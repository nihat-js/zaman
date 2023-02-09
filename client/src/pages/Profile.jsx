import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../utils/getCookie'
import { useEffect, useState } from 'react'


export default function Index() {

  const params = useParams()
  const target_username = params.username
  const [stats,setStats] = useState({})

  const [posts, setPosts] = useState([])

  async function getUserStats() {
    let response = await axios.post('http://localhost:5000/get-user-stats', { target_username })
    setStats(response.data.data)
    

  }

  async function follow() {
    let response = await axios.post('http://localhost:5000/follow-user', { target_username, token: getCookie('token') })
    console.log(response.data)
  }

  async function getUserPosts(){
    let response = await axios.post('http://localhost:5000/get-user-posts',{target_username : "nihat_"})
    setPosts(response.data.data)
    console.log("Get user posts",response.data)
  }


  useEffect(() => {
    getUserStats()
    getUserPosts()
  },[])

  return (
    <div className="profile-page">

      <section className="start">
        <div className="container">
          <h3> Follow this user </h3>
          <div className="stats">
            <span className='followers' > Followers {stats.followers_count} </span>
            <span className='following'> Following  {stats.followings_count} </span>
          <span className='posts' >  Posts count  {stats.posts_count} </span>
          <button onClick={() => follow()}> Follow eltun </button>
          </div>
          <h3 className="title"> User's posts </h3>
          <div className="posts">
            {posts.map ((item,index) =>  <PostBox key={index} target_username={target_username} data={item} /> )}
          </div>

        </div>
      </section>

    </div>
  )
}

function PostBox(props){
  const {createdAt , text , reactions_count , _id } = props.data
  const target_username = props.target_username

  async function reactToPost (name){
    let response  = await axios.post('http://localhost:5000/react-to-post',
    {token : getCookie('token'),  post_id : _id , name ,  })
    console.log(response.data)
  }

  return (
    <div>
      <div className="header">
          <h4 className="username"> {target_username} </h4>
          <p className="date"> {createdAt}  </p>
      </div>
      <div className="body">
        {text}
      </div>
      <div className="actions">
        <span> {reactions_count} reactions  </span>
        <button onClick={() => reactToPost('like') } > Like </button>
        <button onClick={() => reactToPost('love') } > Love   </button>
        <button onClick={() =>  reactToPost('haha')  } > Haha </button>
      </div>
    </div>
  )
}