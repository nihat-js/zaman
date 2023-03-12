import React, { useEffect, useState } from 'react'
import { host } from "../../config/config"
import axios from 'axios'
import Avatar from "../User/Avatar"
import Username from "../User/Username"
import threeSvg from "../../assets/svg/three-dots.svg"
import { token } from '../../utils/utils'
export default function Posts() {

  let [data, setData] = useState([])

  async function loadData() {
    try {
      let res = await axios.post(host + "api/admin/graphql", { model: "post" , token })
      setData(res.data)
      console.log("reports", res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])


  return (

    <div>

      <div className="row flex gap-">
        {
          data.map((i, j) => {
            return (
              <div className='flex gap-8 bg-white px-3 py-5 rounded-md shadow-md '>
                <div className="left ">
                  <img  style={ {width : "100px"}} src={host + "/images/" + i.sources[0]} alt="" />
                </div>
                <div className="middle flex gap-1">
                  <Avatar avatar={i.author_id.avatar} username={i.author_id.username}  />
                  <Username username={i.author_id.username} />
                </div>
                <div className="right">
                  <img src={threeSvg} alt="" className='w-6' />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
