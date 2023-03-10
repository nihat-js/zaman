import React, { useContext, useRef, useState } from 'react'
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

export default function Story() {

  const { user } = useContext(MainContext)
  const [crop, setCrop] = useState({
    unit: "px",
    width: "500",
    height: "500"
  })
  const [file, setFile] = useState()
  const imageRef = useRef()
  const [croppedImage, setCroppedImage] = useState("")


  async function getResult() {
    // const reader = new FileReader()
    // reader.addEventListener('load', () => {
    //   let a = getCroppedImg(previewCanvasRef, reader.result?.toString() || " ", crop, file.name)
    //   setCroppedImage(a)
    // })
    // reader.readAsDataURL(file)
    console.log('bb')
    getCroppedImg(imageRef.current,crop,setCroppedImage)
  }

  async function add (){
    try{
      let res =   await axios.post(host + "/api/story/add")
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className='py-2  flex gap-2' >
      <div className="me relative ">
        <Avatar me={true} style={{ width: "75px", height: "75px" }} />
        <img className='w-6  z-5 rounded-full cursor-pointer hover:bg-blue-500 ' src={addStorySvg} alt="" />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      {file && <CropDemo crop={crop} src={URL.createObjectURL(file)} setCrop={setCrop} imageRef={imageRef}  />}
      <div className="result">
        <button onClick={getResult} > Get result </button>
         { croppedImage  && <img src={croppedImage} />  } 
      </div>
      <button onClick={add} 
      className='btn py-2 px-3 bg-blue-800 text-white rounded-md'>
        Upload it
      </button>
    </div>
  )
}

function CropDemo({ src, crop, setCrop , imageRef }) {

  return (
    <ReactCrop crop={crop} onChange={c => { setCrop(c); }} aspect={1} >
      <img ref={imageRef} src={src} />
    </ReactCrop>
  )
}

 function getCroppedImg (image, crop, setCroppedImage) {
  console.log("element",image)
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
  
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
      
    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    setCroppedImage(base64Image);
}