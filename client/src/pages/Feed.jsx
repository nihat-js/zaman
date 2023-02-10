import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


import { getCookie } from '../utils/getCookie'
import Nav from '../components/Nav'
import PostBox from '../components/PostBox'

import gallerySvg from '../assets/svg/gallery.svg'

const userPp = "https://cdn-icons-png.flaticon.com/512/1173/1173745.png"
const username = "nihat_"
export default function Index() {



  async function post(e) {
    e.preventDefault()
    let response = await axios.post('http://localhost:5000/post', { text: text, token: getCookie('token') })
    console.log(response.data)
  }

  async function getExplorePosts() {
    let response = await axios.post('http://localhost:5000/get-explore-posts', { token: getCookie('token') })
    setPosts(response.data.data)
    console.log(response.data)
  }

  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getExplorePosts()
  }, [])

  return (
    <div className="feed-page min-h-screen bg-slate-100">
      <Nav />


      <section className="start py-5 ">
        <div className="container mx-auto bg-white">
          <div className="row flex gap-2  py-4 px-5">
            <div className="left">
              <Link to={"profile/" + username} >
                <img src={userPp} className="w-8" alt="" />
              </Link>
            </div>
            <div className="right ">
              <div className="header">
                <textarea cols="3"  style={{width: "400px"}}  className="py-2 px-4 bg-gray-200 rounded-sm  border-gray-200 outline-none" value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="What are your thoughts" />
              </div>
              <div className="actions mt-2 flex ">
                <div className="flex gap-1  py-2 px-2 hover:bg-gray-300 cursor-pointer">
                  <img src={gallerySvg} className="w-6" alt="" />
                  <span> Add image </span>
                </div>
                <div >
                <button className=" px-2 py-2  bg-teal-800 text-white  rounded-sm " > Post  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="m  py-10">
        <div className="container mx-auto">
          {posts.map((item, index) => <PostBox key={index} data={item} />)}
        </div>
      </section>

    </div>
  )
}
