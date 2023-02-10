import { Link } from 'react-router-dom'
import zamanImage from '../assets/svg/zaman.png'


export default function Index() {

  const linkClassName = "text-white bg-teal-700 px-4 py-2 rounded-lg hover:bg-teal-800 hover:text"

  return (
    <nav className='shadow-md py-3' >
      <div className="container mx-auto  ">
        <div className="row flex justify-between align-center">
          <div className="brand">
            <Link to='/feed'> <img src={zamanImage} alt="" /> </Link>
          </div>
          <div className="links">
            <ul className='flex gap-3'>
              <li className={linkClassName} ><Link to='/feed'>  Feed </Link> </li>
              <li className={linkClassName} ><Link to='/chat'>  DM </Link> </li>
              <li className={linkClassName}  >   <Link to='/explore'>  Explore </Link>  </li>
              <li className={linkClassName}  > <Link to='/profile'> Profile  </Link></li>
              <li className={linkClassName}  ><Link to='/logout'> Logout  </Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
