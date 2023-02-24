import { Link } from 'react-router-dom'
import getUser from "../utils/getUser"
const user = getUser()

export default function Avatar(props) {

  const { className, avatar, username, style, me } = props
  const host = "http://localhost:5000/"
  let src,to
  if (me) {
    src = user.avatar ? host + "/avatars/" + user.avatar : host + "/avatars/default.svg"
    to = "/profile/" + user.username
  } else {
    src = avatar ?  host + "/avatars/" + avatar :  host + "/avatars/default.svg"    
    to =  "/profile/" + username
  }


  return (
    <Link to={to} >
      <img style={style} src={src} className={` w-8 cursor-pointer rounded-full ${className} hover:outline-indigo-600 outline-4   `} />
    </Link>
  )
}
