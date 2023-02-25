import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import gallerySvg from '../../assets/svg/gallery.svg'
import { getCookie } from "../../utils/getCookie";
import getUser from '../../utils/getUser'
import cameraSvg from '../../assets/svg/camera.svg'
import closeSvg from '../../assets/svg/close.svg'
import loadingSvg from "../../assets/svg/loading.svg"
const user = getUser()
const { username, avatar } = user
export default function CreatePost() {

  const [text, setText] = useState('');
  const inputFile = useRef()
  const [arr, setArr] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)



  async function handleImageButton() {
    // console.log("started")
    if (arr.length < 5) {
      inputFile.current.click()
    } else {
      alert("You can only upload 5 images")
    }
  }
  async function handleImageUpload(e) {
    if (inputFile.current.files.length > 0) {
      setArr([...arr, inputFile.current.files[0]])

    }
  }
  async function handlePostButton(e) {
    e.preventDefault()
    if (arr.length == 0 && !text) {
      return false
    }
    // console.log(arr)
    setIsSubmitting(true)
    try {
      let formData = new FormData()
      arr.forEach((item, index) => {
        formData.append("image" + index, item)
      })
      formData.append("text", text)
      formData.append("token", getCookie('token'))
      let response = await axios.post('http://localhost:5000/api/post/create', formData)
      console.log(response.data)
      setText('')
      setArr([])
    } catch (err) {
      console.log(err)
    }
    setIsSubmitting(false)

  }

  return (
    <section className="start py-2 ">
      <form action="" encType="multipart/form-data" >
        <input className="hidden" onChange={handleImageUpload} ref={inputFile} type="file" multiple />
      </form>
      <div className="container mx-auto bg-slate-50 rounded-lg shadow-md">
        <div className="row flex gap-2  py-4 px-5">
          <div className="left">
            <Link to={"profile/" + username} >
              <img src={avatar ? "http://localhost:5000/avatars/" + avatar : "http://localhost:5000/avatars/default.svg"} className="w-8" alt="" />
            </Link>
          </div>
          <div className="right ">
            <header className="flex gap-1">
              <textarea rows={1} cols={80}
                className=" w-full py-2 px-4 bg-gray-200  border-gray-200 outline-none resize-none rounded-md" value={text}
                onChange={(e) => setText(e.target.value)} type="text"
                placeholder="What are your thoughts ? " />
            </header>

            <div className="actions mt-2 flex ">
              <button onClick={() => { !isSubmitting ? handleImageButton() : "" }} className=" flex gap-2  py-2 px-2 hover:bg-gray-300 cursor-pointer">
                <img src={cameraSvg} className={`w-6 `} alt="" />
                <span className="font-semibold text-purple-600"> Add image </span>
              </button>
              <div >
                <button onClick={(e) => handlePostButton(e)}
                  className={`flex gap-2 items-center px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 ${isSubmitting ? "cursor-not-allowed" : ""}  `}>
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                  <img className={`w-4 animate-spin ${isSubmitting ? "" : "hidden"}  `} src={loadingSvg} alt="" />
                  <span className="relative group-hover:text-white"> Post it </span>
                </button>
              </div>
            </div>
            <div className="preview flex gap-4 mt-6">

              {arr.map((item, index) => <div key={index} className="relative" >
                <img style={{ width: "120px" }} className="w-6 rounded-md" src={URL.createObjectURL(item)} />
                <div onClick={() => setArr([...arr.slice(0, index), ...arr.slice(index + 1)])}
                  className="absolute top-0 right-0   w-7 h-7 rounded-full px-2 py-2 hover:bg-red-800 bg-red-600 flex justify-center items-center text-white cursor-pointer ">
                  <img className="" src={closeSvg} alt="" />
                </div>
              </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
