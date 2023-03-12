import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import './Home.scss'

import Nav from '../components/Nav'
import PostBox from '../components/Post/Box'
import PostSkleton from "../components/Post/Skleton"
import CreatePost from "../components/Post/Create";
import SuggestedProfiles from "../components/Home/SuggestedProfiles";
import Notification from '../components/Home/Notification'
import LeftNav from "../components/Home/LeftNav"
import { MainContext } from "../contexts/Main";
import { host } from "../config/config";
import StoryList from "../components/Story/List";
import { token } from "../utils/utils";

export default function Index() {


  const [posts, setPosts] = useState("load")
  const [place, setPlace] = useState("feed") // explore // trend
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login')
    }
  }, [])

  const { theme } = useContext(MainContext)

  async function loadPosts() {
    setPosts("loading")
    // console.log('zz')
    try {
      let response = await axios.post(host + "api/post/place", { name: place, token: token })
      console.log(response.data)
      setPosts(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [place])



  return (
    <div className={`feed-page min-h-screen bg-slate-100  ${theme == "light" ? "bg-slate-100" : "bg-slate-800"}   relative  `}>


      <Nav />

      <div style={{ maxWidth: "1200px" }} className="mx-auto" >
        {/* <StoryList /> */}
      </div>

      <div style={{ maxWidth: "1200px" }} className="feed-inner lg:flex md:flex sm:block mx-auto gap-10 mt-6  pt-1  ">
        <div className="lg:w-2/12 mt-6   md:w/6/12 wrap-left-nav ">
          <LeftNav place={place} setPlace={setPlace} />
        </div>
        <div className="lg:w-7/12 wrap-middle     " style={{ height: "800px", overflowY: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: 'none' }}>
          <CreatePost />
          <div className="mt-8"> </div>
          {
            typeof (posts) == "object" ? posts.map((item, index) => <PostBox key={index} data={item} />) :
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
