import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


import { getCookie } from '../utils/getCookie'
import Nav from '../components/Nav'
import PostBox from '../components/Post/Box'
import PostSkleton from "../components/Post/Skleton"
import CreatePost from "../components/Post/Create";
import SuggestedProfiles from "../components/Home/SuggestedProfiles";
import Notification from '../components/Home/Notification'
import LeftNav from "../components/Home/LeftNav"

export default function Index() {


  const [posts, setPosts] = useState("loa")
  const [place, setPlace] = useState("feed") // explore // trend
  

  async function loadPosts() {
    setPosts("loading")
    // console.log('zz')
    try {
      let response = await axios.post('http://localhost:5000/api/post/place', { name : "feed", token: getCookie('token') })
      // console.log(response.data)
      setPosts(response.data)
    } catch (err) {
      console.log(err)
    }
  }




  useEffect(() => {
    // loadPosts()
  }, [])

  return (
    <div className="feed-page min-h-screen bg-slate-100">
      <Nav />

      <div style={{ maxWidth: "1200px" }} className="flex mx-auto gap-10 mt-6">
        <div className="w-2/12 mt-6">
          <LeftNav place="feed" setPlace={setPlace} />
        </div>
        <div className="w-7/12">
          <CreatePost />
          { 
          typeof(posts) == "object"  ? posts.map((item, index) => <PostBox key={index} data={item} />)  :
          <PostSkleton />
          }
        </div>
        <div className="w-3/12">
          <Notification />
          <SuggestedProfiles />

        </div>
      </div>


    </div>
  )
}
