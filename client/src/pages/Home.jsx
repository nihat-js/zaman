import { useEffect, useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import './Home.scss'

import { getCookie } from '../utils/getCookie'
import Nav from '../components/Nav'
import PostBox from '../components/Post/Box'
import PostSkleton from "../components/Post/Skleton"
import CreatePost from "../components/Post/Create";
import SuggestedProfiles from "../components/Home/SuggestedProfiles";
import Notification from '../components/Home/Notification'
import LeftNav from "../components/Home/LeftNav"

export default function Index() {


  const [posts, setPosts] = useState("load")
  const [place, setPlace] = useState("feed") // explore // trend
  const navigate  = useNavigate()
  
  useEffect(()=>{
    if (!localStorage.getItem('user')){
      navigate('/login')
    }
  },[])


  async function loadPosts() {
    setPosts("loading")
    // console.log('zz')
    try {
      let response = await axios.post('http://localhost:5000/api/post/place', { name : place, token: getCookie('token') })
      console.log(response.data)
      setPosts(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    loadPosts()
  },[place])



  return (
    <div className="feed-page min-h-screen bg-slate-100 relative  ">
      <Nav />

      <div style={{ maxWidth: "1200px" }} className="flex mx-auto gap-10 mt-6  pt-1">
        <div className="lg:w-2/12 mt-6   md:w/6/12 ">
          <LeftNav place={place} setPlace={setPlace} />
        </div>
        <div className="lg:w-7/12    wrap-place "  style={{height:"800px" , overflowY : "auto" , scrollbarWidth : "none" , WebkitOverflowScrolling : 'none'  }}>
          <CreatePost />
          <div className="mt-8"> </div>
          { 
          typeof(posts) == "object"  ? posts.map((item, index) => <PostBox key={index} data={item} />)  :
          <PostSkleton />
          }
        </div>
        <div className="lg:w-3/12 sticky  top-0 md:order-2  ">
          <Notification />
          <SuggestedProfiles />

        </div>
      </div>


    </div>
  )
}
