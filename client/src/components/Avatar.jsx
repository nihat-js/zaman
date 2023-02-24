import { Link } from 'react-router-dom'
import getUser from "../utils/getUser"
const user = getUser()

export default function Avatar(props) {

  const { className, avatar, username, style, me } = props
  const host = "http://localhost:5000/"
  let src

  if (me) {
    src = user.avatar ? host + "/avatars/" + user.avatar : host + "/avatars/default.svg"
  } else {
    src = avatar ?  host + "/avatars/" + avatar :  host + "/avatars/default.svg"    
  }


  return (
    <Link to={"http://localhost:5173/profile/" + username} >
      <img style={style} src={src} className={` w-8 cursor-pointer rounded-full ${className}  `} />
    </Link>
  )
}
