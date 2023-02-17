import { createContext, useContext, Provider, useState, useEffect } from "react";

export const UserContext = createContext()

const [user, setUser] = useState({})

async function getUser() {
  let result = await axios.get('http://localhost:5000/api/get/offline-dat')
  if (result.status > 200 && result.status < 300) {
    console.log(result)
    setUser(result.data)
  }
}

useEffect(() => {
  getUser()
})


export default function UserProvider({ children }) {
  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  )
}
