import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from "../components/Nav"
import { host } from '../config/config'
import { MainContext } from '../contexts/Main'
import { token } from '../utils/utils'
import PostBox from '../components/Post/Box'
import PostSkleton from '../components/Post/Skleton'
export default function PostPage() {
  const { theme } = useContext(MainContext)
  const params = useParams()
  const postId = params.id

  const [data, setData] = useState("")

  async function get() {
    let res = await axios.post(host + "api/post/place", { post_id: postId, token, name: "specific" })
    // console.log(res)
    setData(res.data[0])
  }

  useEffect(() => {
    get()
  }, [])

  return (
    <div>
      <Nav />
      <main className="mx-auto" style={{ maxWidth: "700px" }} >
        {data ? <PostBox data={data} /> : <PostSkleton />}

      </main>
    </div>
  )
}
