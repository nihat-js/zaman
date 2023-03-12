import React from 'react'
import Messages from './Messages'
import Form from './Form'
export default function Conversation({currentChat , chatTheme,messages , deleteMessage,send}) {
  return (
    <div className=
      {`right w-7/12  flex flex-col py-5 px-3  ${currentChat == "" ? "hidden" : ""}  
            ${chatTheme == 0 ? "bg-slate-50" : chatTheme == 1 ? "bg-sky-800 " :
          chatTheme == 2 ? "bg-indigo-800  " : chatTheme == 3 ? "bg-green-800" : chatTheme == 4 ? "bg-yellow-800" : ""} 
            `} style={{ maxHeight: "700px" }}>
      <header className='flex gap-2 py-3 px-2 shadow-md rounded-md mb-5'>
        <p> Select theme </p>
        <div className='flex gap-2'>
          {
            ["slate-200", "sky-800", "indigo-800", "green-800", "yellow-800"].map((i, j) => {
              return <div onClick={() => updateTheme(j)}
                className={`w-5 h-5 rounded-md hover:opacity-70 bg-${i} ${j == chatTheme ? "border border-blue-800" : ""} `} />
            })
          }
        </div>
      </header>
      <Messages messages={messages} chatTheme={chatTheme} deleteMessage={deleteMessage} />
      <Form send={send} />

    </div>
  )
}
