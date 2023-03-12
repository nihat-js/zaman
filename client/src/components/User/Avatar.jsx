import { Link } from 'react-router-dom'
import { MainContext } from '../../contexts/Main'
import { useContext, useEffect, useState } from 'react'
import { host } from '../../config/config'
import StoryModal from '../Story/Modal'
export default function Avatar(props) {
  const { user, updateUser } = useContext(MainContext)
  const [showZoom, setShowZoom] = useState(false)
  let { className, avatar, username, stories_count, style, me, disableLink } = props
  let src, to
  const [showStory, setShowStory] = useState(false)
  if (me) {
    src = user.avatar ? host + "/avatars/" + user.avatar : host + "/avatars/default.svg"
    to = "/profile/" + user.username
  } else {
    src = avatar ? host + "/avatars/" + avatar : host + "/avatars/default.svg"
    to = "/profile/" + username
  }



  let img = <img onClick={() => stories_count > 0 ? setShowStory(true) : setShowZoom(true)} style={style} src={src}
    className={` w-9 h-9 object-contain  rounded-full     ${className} ${stories_count > 0 ? "border-2 border-red-400" : " cursor-zoom-in"}  `} />

  return (
    <>
      {showZoom && <ZoomModal src={src} setShowZoom={setShowZoom} />}

      {showStory && <StoryModal setShowStory={setShowStory} arr={[{ username: username, avatar: avatar }]} />}
      {img}

    </>
  )
}

function ZoomModal({ src, setShowZoom }) {

  function check(e) {
    console.log("zoom event listener")
    if (e.target.classList.contains("zoom-modal")) {
      setShowZoom(false)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', check)
    return () => {
      document.body.removeEventListener('click', check)
    }
  }, [])


  return (
    <div className='zoom-modal absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-40  ' style={{ backgroundColor: "rgba(0,0,0,0.85)" }} >
      <div className="content bg-white py-4 px-6 rounded-md shadow-md " >
        <img  className='rounded-full' style={{ width: "150px", height: "150px" }} src={src} alt="" />
      </div>
    </div>
  )
}
