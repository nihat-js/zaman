import { Link } from 'react-router-dom'
import getUser from "../../utils/getUser"
import { MainContext } from '../../contexts/Main'
import { useContext } from 'react'
import { host } from '../../config/config'
export default function Avatar(props) {
  const { user, updateUser } = useContext(MainContext)
  const { className, avatar, username, style, me, disableLink } = props
  let src, to
  if (me) {
    src = user.avatar ? host + "/avatars/" + user.avatar : host + "/avatars/default.svg"
    to = "/profile/" + user.username
  } else {
    src = avatar ? host + "/avatars/" + avatar : host + "/avatars/default.svg"
    to = "/profile/" + username
  }

  let img = <img style={style} src={src} className={` w-8 h-8 object-contain  rounded-full hover:outline-2    ${className} hover:outline-indigo-600 outline outline-0  `} />

  return (
    disableLink ? img : 
    <Link to={to} >   {img} </Link >    
  )
}
