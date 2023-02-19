import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


import { getCookie } from '../utils/getCookie'
import Nav from '../components/Nav'
import PostBox from '../components/PostBox'
import CreatePost from "../components/CreatePost";
import SuggestedProfiles from "../components/SuggestedProfiles";
import Notification from '../components/Notification'

export default function Index() {





  async function getExplorePosts() {
    let response = await axios.post('http://localhost:5000/get-home-posts', { token: getCookie('token') })
    setPosts(response.data.data)
    console.log(response.data)
  }


  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // getExplorePosts()
  }, [])

  return (
    <div className="feed-page min-h-screen bg-slate-100">
      <Nav />
      <div style={{ maxWidth: "1200px" }} className="mx-auto">
        <CreatePost />
      </div>

      <div style={{ maxWidth: "1200px" }} className="flex mx-auto gap-12">
        <div className="w-9/12">
          {posts.map((item, index) => <PostBox key={index} data={item} />)}
        </div>
        <div className="w-3/12"> 
        <Notification />
        <SuggestedProfiles /> 
        
        </div>
      </div>


    </div>
  )
}
