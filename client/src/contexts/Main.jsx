import axios from "axios";
import { createContext, useContext, Provider, useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom'


export const MainContext = createContext()




export default function Index({ children }) {

  const [user, setUser] = useState({})
  
  useEffect(() => {

    if ( !localStorage.getItem('user')){
    }

    let obj = JSON.parse(localStorage.getItem('user'))
    setUser(obj)
  }, [])


  function updateUser(obj) {
    // console.log('updating', obj);
    let oldObj = JSON.parse(localStorage.getItem('user'))
    let newObj = { ...user, ...obj }
    // console.log(newObj)
    localStorage.setItem("user", JSON.stringify(newObj))
    setUser(newObj)
  }

  return (
    <MainContext.Provider value={{ user, updateUser }} >
      {children}
    </MainContext.Provider>
  )
}
