import axios from "axios";
import { createContext, useContext, Provider, useState, useEffect } from "react";



export const MainContext = createContext()




export default function Index({ children }) {
  function toggleTheme(val) {
    if (!val) {
      return false
    }
    local
  }

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light')
    }
    let currentTheme = localStorage.getItem('theme')
    setTheme(currentTheme)

  }, [])
  const [theme, setTheme] = useState("")


  return (
    <MainContext.Provider value={{}} >
      {children}
    </MainContext.Provider>
  )
}
