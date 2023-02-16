import { useRef } from 'react'
import sample1 from '../../../../storage/pp/sample-1.svg'
import sample2 from '../../../../storage/pp/sample-2.svg'
import sample3 from '../../../../storage/pp/sample-3.svg'
import sample4 from '../../../../storage/pp/sample-4.svg'


export default function SetProfilePicture() {

  const sampleImages = [sample1, sample2, sample3, sample4]
  const inputFile = useRef()


  async function handleClick(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', inputFile.current.files[0])
    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

    return (<div>
      sdghsefhsdf
      <div className="samples">
        <div className="row flex gap-3">
          {sampleImages.map((item, index) => <img src={item} key={index} className="w-14 rounded-full cursor-pointer " onClick={() => handleClick(item)} />)}
        </div>
        <form onSubmit={handleClick} encType="multipart/form-data" >
          <input ref={inputFile} type="file" name="file" />
          <button > Upload </button>
        </form>
      </div>
    </div>
    )
  }