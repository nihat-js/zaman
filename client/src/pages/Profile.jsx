import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../utils/getCookie'
import { useEffect, useState } from 'react'

import PostBox from '../components/PostBox'
import Nav from '../components/Nav'
export default function Index() {

  const params = useParams()
  const target_username = params.username
  const [stats, setStats] = useState({})

  const [posts, setPosts] = useState([])

  
  const target = {
    username : "Eltun",
    avatar : "",
    created : "",
  }
  

  useEffect(() => {
    // getUserProfile()
  }, [])

  

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
            {posts.map((item, index) => <PostBox key={index} target_username={target_username} data={item} />)}
          </div>

        </div>
      </section>

      <section className="start">
        <div className="container">
          <div className="row" style={{maxWidth:"600px"}}>
              <div className="img-wrap">
                <img src={target.avatar == "" ? "http:localhost:5000/" : "a"} alt="" />
              </div>
          </div>
        </div>
      </section>

    </div>
  )
}

