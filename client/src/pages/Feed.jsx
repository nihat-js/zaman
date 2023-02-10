import { useEffect, useState } from "react";
import axios from 'axios'
import { getCookie } from '../utils/getCookie'

import Nav from '../components/Nav'
import PostBox from '../components/PostBox'

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
  },[])

  return (
    <div className="feed-page min-h-screen bg-slate-100">
      <Nav />
      <section className="start">
        <div className="container mx-auto">
          <form onSubmit={(e) => post(e)}>
            <input className=""  value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="What are your thoughts" />
            <button> Share  </button>
          </form>
        </div>
      </section>

      <section className="m  py-10">
        <div className="container mx-auto">
          {posts.map((item,index)=> <PostBox key={index} data={item} />  )}
        </div>
      </section>

    </div>
  )
}
