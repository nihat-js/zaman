import { createContext, useContext , Provider } from "react";

export const UserContext = createContext()

const User = {
  username : "",
  pp  : ""
}


export default function UserProvider ({children}) {
  return (
    <UserContext.Provider value={User}>
      {children}
    </UserContext.Provider>
  )
}