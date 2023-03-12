import React, { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../contexts/Main'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/src/ReactCrop.scss'

import Avatar from '../User/Avatar'
import addStorySvg from "../../assets/svg/add-story.svg"
import logo from "../../assets/svg/zaman.png"
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { host } from '../../config/config'
import axios from 'axios'
import { token } from '../../utils/utils'

import Username from '../User/Username'
import calculateTimeForUser from '../../utils/calculateTimeForUser'

export default function Story() {

  const { user } = useContext(MainContext)
  const [crop, setCrop] = useState({
    unit: "px",
    width: "500",
    height: "500"
  })
  const [image, setImage] = useState()
  const [users, setUsers] = useState([])
  const imageRef = useRef()



  async function add() {
    let croppedImage = await getCroppedImg(imageRef.current, crop,)
    try {
      let formData = new FormData()
      formData.append('file', croppedImage)
      formData.append('token', token)
      let res = await axios.post(host + "api/story/add", formData)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  async function load() {
    console.log('story loading',)
    let res = await axios.post(host + "api/story/load", { token })
    setUsers(res.data)
  }

  async function showUserStory(username) {
    let res = await axios.post(host + "api/story/user", { token ,target_username: username })
    console.log(res)
  }

  useEffect(() => {
    load()
  }, [])


  return (
    <div className='py-2  flex gap-2' >
      <UserStory current={user} />

      <div className="me relative ">
        <Avatar me={true} style={{ width: "75px", height: "75px" }} />
        <img className='w-6  z-5 rounded-full cursor-pointer hover:bg-blue-500 ' src={addStorySvg} alt="" />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        {image && <CropDemo crop={crop} src={URL.createObjectURL(image)} setCrop={setCrop} imageRef={imageRef} />}
        <button onClick={add}
          className='btn py-2 px-3 bg-blue-800 text-white rounded-md'>
          Upload it
        </button>
      </div>
      {users.map((i, j) => <div key={j}>
        <div className="avatar-wrap" onClick={() => showUserStory(i.username)} >
          <Avatar disableLink username={i.username} Avatar={i.avatar} />
        </div>
        <p> {i.username} </p>
      </div>)}
    </div>
  )
}

function CropDemo({ src, crop, setCrop, imageRef }) {

  return (
    <ReactCrop crop={crop} onChange={c => { setCrop(c); }} aspect={1} >
      <img ref={imageRef} src={src} />
    </ReactCrop>
  )
}



function UserStory({ current, previous, next }) {
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  current = {
    username: "code",
  }
  async function get() {
    let res = await axios.post(host + "api/story/user", { token , target_username: current.username })
    setData(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    get()
  }, [])



  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-50  ' style={{ backgroundColor: "rgba(0,0,0,0.85)" }} >
      <div className="content bg-white py-4 px-3 rounded-md shadow-md " style={{ width: "500px" }}>
        <div className="indicator flex  gap-1">
          {data.map((i, j) => <p  key={j} className='line flex-1 bg-gray-200 select-none rounded-md text-transparent inline-block text-sm ' > . </p>)}
        </div>
        <header className='flex justify-between py-4'>
          <div className="left flex gap-2">
            <Avatar username = {current.username} disableLink />
            <Username username={current.username} />
            <p className="time text-gray-600 text-sm "> { data[currentIndex] && calculateTimeForUser ( data[currentIndex].created_at ) } </p>
          </div>
          <div className="right flex gap-2">
            <img className='w-6' src={playSvg} alt="" />
            <img  className='w-6' src={OptionsSvg} alt="" />
          </div>
        </header>
        <div className="source">
          <img className='w-full'  src={host + "stories/" + data[currentIndex]?.source} alt="" />
        </div>
      </div>
    </div >
  )
}