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


  const [posts,setPosts] = useState([])


  async function getHomePosts() {
    try{
      let response = await axios.post('http://localhost:5000/api/get/home-posts', { token: getCookie('token') })
      setPosts(response.data)
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }



  useEffect(() => {
    getHomePosts()
  }, [])

  return (
    <div className="feed-page min-h-screen bg-slate-100">
      <Nav />

      <div style={{ maxWidth: "1200px" }} className="flex mx-auto gap-12 mt-6">
        <div className="w-9/12">
        <CreatePost />
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
