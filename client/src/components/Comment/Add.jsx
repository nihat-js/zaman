import React, { useRef, useState } from 'react'
import axios from 'axios'
import { getCookie } from '../../utils/getCookie'
import Avatar from '../User/Avatar'
import gallerySvg from "../../assets/svg/gallery.svg"
import gifSvg from "../../assets/svg/gif.svg"
import gif1 from '../../assets/svg/gif-1.gif'





export default function AddComment(props) {
  const { post_id , refresh } = props

  const [image, setImage] = useState()
  const [text, setText] = useState('')
  const inputFile = useRef()

  function handleImageClick() {
    inputFile.current.click()
  }
  function handleInputChange() {
    setImage(inputFile.current.files[0])
    console.log('qa')
  }

  async function handlePostButton(gif_name) {
    if (!text ){
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
      formData.append("gif_name",gif_name)
      formData.append("token", getCookie('token'))
      let response = await axios.post('http://localhost:5000/api/comment/add', formData )
      setImage(null)
      setText('')
      console.log(response)
      refresh()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    
    <div className="add-comment flex gap-3 mb-5 ">
      {/* <div className='absolute w-screen h-screen top-0  left-0 ' style={{backgroundColor : "rgba(0,0,0,0.3) "}} > */}
        {/* <div className="content"> */}
          {/* Wao */}
        {/* </div> */}
      {/* </div> */}
      <Avatar me={true} className="w-6" src="" />
      <div className="right w-full">
        <form className='mb-4'>
          <input value={text} onChange={(e) => setText(e.target.value)} type="text"
            className=" w-full outline-none px-1 py-2 rounded-md border- border border-sky-600" />
          <input accept="image/png, image/jpeg" onChange={() => handleInputChange()} type="file" ref={inputFile} hidden />
        </form>
        <div className="preview">
          {image && <img src={URL.createObjectURL(image)} className="w-20" />}
        </div>
        <div className="actions flex justify-between items-center">
          <div className='left flex gap-1'>
            <img onClick={handleImageClick} src={gallerySvg} className="w-8 cursor-pointer mr-4  hover:bg-slate-200 p-1  rounded-md" />
            <img  src={gifSvg} className="w-6 cursor-pointer " /> 
            <img  src={gif1} className="w-8 rounded-full cursor-pointer " alt="" />
          </div>
          <div className="right">
            <button className='px-2 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-600' onClick={handlePostButton}> Post </button>

          </div>

        </div>
      </div>
    </div>


  )
}
