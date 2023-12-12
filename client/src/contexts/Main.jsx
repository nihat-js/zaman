import axios from "axios";
import { createContext, useContext, Provider, useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom'


export const MainContext = createContext()


const chatThemes = [
  {
    "bgColor" : "bg-slate-50"
  },
  {
    "bgColor" : "bg-sky-800",
  },
  {
    "bgColor" : "bg-indigio-800",
  },
  {
    "bgColor" : "bg-green-800",
  },
  {
    "bgColor" : "bg-yellow-800"
  }
]



export default function Index({ children }) {

  const [user, setUser] = useState({})
  const [theme,setTheme] = useState({})
  useEffect(() => {
    let obj = JSON.parse(localStorage.getItem('user'))
    setUser(obj)
    let theme_ = localStorage.getItem('theme')
    if (!theme_ || !['light','dark'].includes(theme_) ){
      localStorage.setItem('theme','light')
      setTheme('light')
    }else{
      setTheme(theme_)
    }


  }, [])


  function reverseTheme(){
    let next ;
    next = theme == "light" ? "dark"  : "light" 
    localStorage.setItem('theme',next)
    setTheme(next)
  }

  


  function updateUser(obj) {
    // console.log('updating', obj);
    let oldObj = JSON.parse(localStorage.getItem('user'))
    let newObj = { ...user, ...obj }
    // console.log(newObj)
    localStorage.setItem("user", JSON.stringify(newObj))
    setUser(newObj)
  }

  return (
    <MainContext.Provider value={{ user, updateUser, theme,reverseTheme,chatThemes }} >
      {children}
    </MainContext.Provider>
  )
}
