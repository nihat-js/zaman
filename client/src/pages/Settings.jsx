import Nav from '../components/Nav'

import Avatar from '../components/User/Avatar'
import Username from "../components/User/Username"
// import SettingsTab from "../components/Settings/Tab"


import { useEffect, useState } from 'react'


export default function Index() {

  // const tabNames = ['Set Profile Picture', 'Main', 'Change Password', 'Privacy', 'Story']
  // const tabComponents = [<Avatar/>, <Main />, <Password />, <Privacy />, <Story />]


  // useEffect(() => {
  //   setActiveTab(tabNames[0])
  // }, [])

  // const [activeTab, setActiveTab] = useState('')



  return (
    <div className="setttings-page min-h-screen w-full bg-slate-50">
      <Nav />
      {/* <section className="start py-10">
        <div className="container mx-auto ">
          <div className="row flex  gap-12">
            <div className="left-column w-3/12 border-r-gray-700 ">
              {tabNames.map((item, index) => <h4 key={index}
                onClick={() => setActiveTab(index)}
                className={`px-2 py-4 bg-white border border-gray-300 border-1 border-l-0 ${activeTab == item ? " border-l-2 border-l-danube-800" : ""} `} > {item} </h4>)}
            </div>
            <div className="right-column w-9/12">
              {(() => {
                console.log(tabComponents[activeTab])
                return tabComponents[ tabNames.indexOf(activeTab)]
              }
              )()}
              <Avatar me={true} />
                  
            </div>
          </div>
        </div>
      </section> */}

      <SettingsTab />



      
    </div>
  )
}













