import { Link } from 'react-router-dom'
import getUser from "../../utils/getUser"
import { MainContext } from '../../contexts/Main'
import { useContext } from 'react'
import { host } from '../../config/config'
export default function Avatar(props) {
  const {user,updateUser} = useContext(MainContext)
  const { className, avatar, username, style, me } = props
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
      <img style={style} src={src} className={` w-8 cursor-pointer rounded-full hover:outline-2    ${className} hover:outline-indigo-600 outline outline-0  `} />
    </Link>
  )
}
