import React, { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../contexts/Main'

import Avatar from '../User/Avatar'
import addStorySvg from "../../assets/svg/add-story.svg"
import "cropperjs/dist/cropper.min.css";
import { host } from '../../config/config'
import axios from 'axios'
import { token } from '../../utils/utils'
import { cropImage } from '../../utils/utils'
import Username from '../User/Username'
import EditImage from './EditImage';

export default function Story() {

  const { user } = useContext(MainContext)
  const [file, setFile] = useState()
  const [users, setUsers] = useState([])




  async function load() {
    let res = await axios.post(host + "api/story/load", { token })
    console.log('story loading',res)
    setUsers(res.data)
  }


  useEffect(() => {
    load()
  }, [])


  return (
    <div className='mt-2  flex gap-2 items-center' >

      {file && <EditImage  setFile={setFile} src={URL.createObjectURL(file)}   />}

      <div className="me relative ">
        <Avatar  me={true} style={{ width: "60px", height: "60px" }} />
        <label htmlFor="file">
          <img className='w-5  z-5 rounded-full cursor-pointer hover:bg-blue-500 ' src={addStorySvg} alt="" />
        </label>
        <input type="file" id="file" hidden onChange={(e) => setFile(e.target.files[0])} />
      </div>
      {users.map((i, j) => <div key={j}>
        <div className="avatar-wrap"  >
          <Avatar arr={users} index={j}  />
        </div>
        <p> {i.username} </p>
      </div>)}
    </div>
  )
}



