import Nav from '../components/Nav'

import { useState } from 'react'
export default function Index() {

  const sectionsArr = [
    'Set avatar', 'Change Password', 'Privacy'
  ]

  const [sections, setSections] = useState(sectionsArr)
  const [selectedSection, setSelectedSection] = useState(sectionsArr[0])
  const [components, setComponents] = useState([
    <SetProfilePicture/> , <ChangePassword/> , <Privacy/>
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

function SetProfilePicture() {
  const [sampleImages, setSampleImages] = useState([
    "https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg",
    "https://images.freeimages.com/images/large-previews/962/avatar-man-with-mustages-1632966.jpg",
    "https://images.freeimages.com/images/large-previews/d66/woman-avatar-1632963.jpg"
  ])

  function changeProfilePicture(src)  {
    console.log(src)
  }

  return (
    <div>
      <div className="samples">
        <div className="row flex gap-3">
        {sampleImages.map((item, index) => <img src={item} key={index} className="w-14 rounded-full cursor-pointer " onClick={() => changeProfilePicture(item) } />)}
        </div>
      </div>
    </div>
  )
}


function ChangePassword(){
  return(
    <div>
      <form action="">
        <input type="text" placeholder='Old Password' />
        <input type="text" placeholder='New Password' />
        <input type="text" placeholder='Confirm new password' />
        <button> Change Password </button>
      </form>
    </div>
  )
}

function Privacy () {
  return (
    <div>
      <p className="text">
      When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don’t have an  account.
      </p>
    </div>
  )
}

function StorySettings(){
  return (
    <div>
      <p className="text"> Who can't see your stor settings </p>
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