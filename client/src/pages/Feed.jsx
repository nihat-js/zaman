import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


import { getCookie } from '../utils/getCookie'
import Nav from '../components/Nav'
import PostBox from '../components/PostBox'
import CreatePost from "../components/CreatePost";


export default function Index() {





  async function getExplorePosts() {
    let response = await axios.post('http://localhost:5000/get-explore-posts', { token: getCookie('token') })
    setPosts(response.data.data)
    console.log(response.data)
  }


  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getExplorePosts()
  }, [])

  return (
    <div className="feed-page min-h-screen bg-slate-100">
      <Nav />
      <CreatePost/>
      <section className="m  py-10">
        <div className="container mx-auto">
          {posts.map((item, index) => <PostBox key={index} data={item} />)}
        </div>
      </section>

    </div>
  )
}
