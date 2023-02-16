import Nav from '../components/Nav'

import { useState } from 'react'
export default function Index() {

  const sectionsArr = [
    'Set avatar', 'Change Password', 'Privacy'
  ]

  const [sections, setSections] = useState(sectionsArr)
  const [selectedSection, setSelectedSection] = useState(sectionsArr[0])
  const [components, setComponents] = useState([
    <SetProfilePicture />, <ChangePassword />, <Privacy />
  ])


  return (
    <div className="setttings-page min-h-screen w-full bg-slate-100">
      <Nav />
      <section className="start py-10">
        <div className="container mx-auto ">
          <div className="row flex  gap-12">
            <div className="left-column w-4/12 border-r-gray-700 ">
              {sections.map((item, index) => <h4 key={index}
                onClick={() => setSelectedSection(item)}
                className={`px-2 py-4 bg-white border border-gray-300 border-1 border-l-0 ${selectedSection == item ? " border-l-2 border-l-danube-800" : ""} `} > {item} </h4>)}
            </div>
            <div className="right-column w-8/12">
              {(() => {
                console.log(selectedSection, sectionsArr[0])
                let index = sectionsArr.indexOf(selectedSection)
                return components[index]
              }
              )()}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}














function MainInfo() {
  <div>
    <input type="text" placeholder='Username' />
    <input type="text" placeholder='Bio' />

    <input type="text" />
  </div>
}