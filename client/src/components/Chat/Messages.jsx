import React, { useContext } from 'react'
import { MainContext } from '../../contexts/Main'
import Avatar from '../User/Avatar'
import trashSvg from "../../assets/svg/trash.svg"

export default function Messages({messages,chatTheme,deleteMessage}) {
  const {user} = useContext(MainContext)
  
  return (
    <div className="messages-div flex-1 px-5   " style={{ overflowY: "auto" }} >
      {
        messages.map((i, j) => {
          return (<div key={j}
            className={`message  flex items-center  mb-3 rounded-lg ${user.username}   ${i.sender_id.username == user.username ? "justify-end  " : "justify-start  "}                     `}>
            {
              i.sender_id.username == user.username &&
              <button className='hover:bg-slate-200' onClick={() => deleteMessage(i._id)} >
                <img className='w-6  rounded-md mr-2 p-1' src={trashSvg} alt="" />
              </button>
            }

            {i.sender_id.username != user.username &&
              < Avatar username={i.sender_id.username} avatar={i.sender_id.avatar} />
            }

            <p className={`py-3 px-3 mx-2 bg-slate-100  rounded-md 
                          ${chatTheme == 0 ? "" : chatTheme == 1 ? "bg-sky-600 " :
                chatTheme == 2 ? " text-black  " : chatTheme == 3 ? "bg-green-600" : chatTheme == 4 ? "bg-yellow-600" : ""} 
                      `} > {i.text}  </p>

            {i.sender_id.username == user.username &&
              < Avatar username={i.sender_id.username} avatar={i.sender_id.avatar} />
            }

          </div>
          )
        })
      }
    </div>
  )
}
