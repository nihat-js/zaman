import { useRef , useState } from 'react'
import axios from 'axios'

import {getCookie} from '../../utils/getCookie'

export default function SetProfilePicture() {

  const sampleImages = ["sample-1.svg", "sample-2.svg", "sample-3.svg", "sample-4.svg"]
  const inputFile = useRef()
  const [image, setImage] = useState()


  async function handleClick(e) {
    e.preventDefault()
    const formData = new FormData();

    const token = getCookie('token')
    const image = inputFile.current.files[0]
    
    formData.append('image', image)
    formData.append('token',token)
    console.log(token)
    let reader = new FileReader();


    let response = await axios.post('http://localhost:5000/api/settings/set-pp', formData,   )
    console.log(response)
  }

    return (<div>
      sdghsefhsdf
      <div className="samples">
        <div className="row flex gap-3">
          {sampleImages.map((item, index) => <img src={item} key={index} className="w-14 rounded-full cursor-pointer " onClick={() => handleClick(item)} />)}
        </div>
        <form onSubmit={handleClick} encType="multipart/form-data" >
          <input ref={inputFile} type="file" name="image" />
          <button className='text-white bg-danube-800 px-2 py-3 bold' > Upload </button>
        </form>
      </div>
    </div>
    )
  }