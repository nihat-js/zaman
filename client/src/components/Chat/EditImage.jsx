import { useState, useRef } from "react"
import { token } from "../../utils/utils"
import { cropImage } from "../../utils/utils"
import ReactCrop from 'react-image-crop'

export default function EditImage({ file, setFile }) {

  const [crop, setCrop] = useState({
    unit: "%",
    width: "100",
    height: "100"
  })
  const imageRef = useRef()


  return (
    <div className="fixed left-0 right-0 flex justify-center items-center w-screen h-screen  z-50 " style={{ backgroundColor: "rgba(0,0,0,0.85)" }} >
      <div className="content bg-white py-4 rounded-md px-3 " style={{ maxWidth: "500px" }} >
        <ReactCrop crop={crop} onChange={c => { setCrop(c); }} aspect={1} >
          <img ref={imageRef} src={URL.createObjectURL(file)} />
        </ReactCrop>
        <div className="actions flex justify-end gap-3">
          <button onClick={() => setFile('') } 
          className="py-2 px-3 text-blue-600 hover:text-blue-800 font-semibold  rounded-md" >  Cancel </button>
          <button className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md " >  Send  </button>

        </div>
      </div>
    </div>
  )
}

