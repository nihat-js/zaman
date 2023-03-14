import React, { useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/src/ReactCrop.scss'
import axios from 'axios'
import { cropImage } from '../../utils/utils'

export default function EditImage({ src,setFile , setImage }) {
  const imageRef = useRef()
  const [crop, setCrop] = useState({
    unit: "px",
    // width: "400",
    height: "400"
  })

  async function add() {
    let croppedImage = await cropImage(imageRef.current,crop)
    setFile()
    setImage(croppedImage)
  }


  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-50  ' style={{ backgroundColor: "rgba(0,0,0,0.85)" }} >
      <div className="content bg-white py-4 px-6 rounded-md shadow-md " style={{ width: "500px" }}>

        <ReactCrop crop={crop} onChange={c => { setCrop(c); }} aspect={9/9}  >
          <img ref={imageRef} src={src} />
        </ReactCrop>
        <div className="actions flex justify-end flex-3 mt-4">
          <button className='px-3 py-2 text-blue-600 font-semibold ' onClick={ () => setFile() }
          > Cancel </button>
          <button  className='px-3 py-2 bg-blue-600 text-white hover:bg-blue-800 rounded-md'  onClick={ () => add() }
          > Add  </button>
        </div>
      </div>
    </div >


  )
}

