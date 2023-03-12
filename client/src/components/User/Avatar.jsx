import { Link } from 'react-router-dom'
import { MainContext } from '../../contexts/Main'
import { useContext, useState } from 'react'
import { host } from '../../config/config'
import StoryModal from '../Story/Modal'
export default function Avatar(props) {
  const { user, updateUser } = useContext(MainContext)
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



  let img = <img onClick={() => stories_count > 0 ? setShowStory(true)  : ""   } style={style} src={src} 
  className={` w-9 h-9 object-contain  rounded-full     ${className} ${stories_count > 0  && "border-2 border-red-400" }  `} />

  return (
    <>
      {showStory && <StoryModal setShowStory={setShowStory} arr={  [{username : username , avatar : avatar } ]}  />}
      {stories_count > 0 ? img : <Link to={to} >   {img} </Link >}

    </>
  )
}
