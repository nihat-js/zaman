import React, { useContext, useRef, useState } from 'react'
import axios from 'axios'
import { token } from '../../utils/utils'
import Avatar from '../User/Avatar'
import gallerySvg from "../../assets/svg/gallery.svg"
import gifSvg from "../../assets/svg/gif.svg"
import gif1 from '../../assets/svg/gif-1.gif'
import closeSvg from "../../assets/svg/close.svg"
import { host } from '../../config/config'
import { MainContext } from '../../contexts/Main'
import EditImage from './EditImage'




export default function AddComment(props) {
  const { theme } = useContext(MainContext)
  const { post_id, refresh } = props
  const [file, setFile] = useState()
  const [image, setImage] = useState()
  const [text, setText] = useState('')
  const inputFile = useRef()

  function handleImageClick() {
    inputFile.current.click()
  }
  function handleInputChange() {
    setImage(inputFile.current.files[0])
    // console.log('qa')
  }

  async function handlePostButton(gif_name) {
    if (!text) {
      return false
    }
    try {
      let formData = new FormData()
      if (image) {
        formData.append('image1', image)
      }
      console.log("started")
      formData.append('text', text)
      formData.append("post_id", post_id)
      formData.append("gif_name", gif_name)
      formData.append("token", token)
      let response = await axios.post(host + "api/comment/add", formData)
      setImage(null)
      setText('')
      console.log(response)
      refresh()
    } catch (err) {
      console.log(err)
    }
  }

  return (

    <div className={`add-comment flex gap-3 mb-5 ${theme == "dark" ? "bg-slate-600" : ""} py-2 px-2  `}>
      {file && <EditImage src={URL.createObjectURL(file)} setFile={setFile} setImage={setImage} />}
      <Avatar me={true} className="w-6" src="" />
      <div className="right w-full">
        <form className='mb-4'>
          <input value={text} onChange={(e) => setText(e.target.value)} type="text"
            className={` w-full outline-none px-1 py-2 rounded-md border- border border-sky-600 
            ${theme == "dark" ? "bg-slate-600 border-slate-400" : ""} `} />
          <input accept="image/png, image/jpeg" onChange={() => setFile(inputFile.current.files[0])} type="file" ref={inputFile} hidden />
        </form>
        <div className="preview ">
          <div className=" relative img-wrap">
            {image && <img src={URL.createObjectURL(image)} className="w-20 rounded-md" />}
            {image && <img onClick={() => setImage() } className='w-7 p-1 absolute top-0 right-0 rounded-full bg-red-600 hover:bg-red-800' src={closeSvg} alt="" />}
          </div>
        </div>
        <div className="actions flex justify-between items-center">
          <div className='left flex gap-1'>
            <img onClick={handleImageClick} src={gallerySvg} className="w-8 cursor-pointer mr-4  hover:bg-slate-200 p-1  rounded-md" />
            <img src={gifSvg} className="w-6 cursor-pointer " />
            <img src={gif1} className="w-8 rounded-full cursor-pointer " alt="" />
          </div>
          <div className="right">
            <button className='px-2 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-600' onClick={handlePostButton}> Post </button>

          </div>

        </div>
      </div>
    </div>


  )
}
