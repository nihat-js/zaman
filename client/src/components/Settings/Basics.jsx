
import Avatar from '../../components/User/Avatar'
import Username from "../../components/User/Username"
import logo from "../../assets/svg/logo.png"
import { host } from "../../config/config"
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { token } from '../../utils/utils'
import { MainContext } from '../../contexts/Main'
import InputEmoji from "react-input-emoji";
import { token } from '../../utils/utils'

export default function Basics() {


  let { user, updateUser } = useContext(MainContext)
  let [data, setData] = useState("loading")
  let [copy, setCopy] = useState()
  let [isDataLoading, setIsDataLoading] = useState(true)


  async function uploadAvatar(e) {
    if (!e.target.files[0]) return false
    try {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('token', token)
      let result = await axios.post(host + "api/user/avatar/upload",formData)
      if (result.status >=200  && result.status< 300){
        updateUser({avatar : result.data.avatar  })

      }
    } catch (err) {
      console.log(err)
    }
  }





  async function setAvatar(file_name) {
    try {
      let result = await axios.post(host + "api/user/avatar/set", { token, file_name })
      if (result) {
        updateUser({ avatar: file_name })
      }
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }



  async function handleSubmit() {
    // console.log('g',data.gender)
    setIsDataLoading(true)
    let touched = {}
    copy.username != data.username ? touched.username = data.username : null
    copy.email != data.email ? touched.email = data.email : null
    copy.bio != data.bio ? touched.bio = data.bio : null
    copy.phone_number != data.phone_number ? touched.phone_number = data.phone_number : null
    copy.gender != data.gender ? touched.gender = data.gender : null

    console.log('touched',touched)
    try {
      console.log(touched)
      let response = await axios.post(host + "api/user/account/edit", { token, ...touched })
      console.log(response.data)
      setData(response.data)
      setCopy(response.data)
      setIsDataLoading(false)
    } catch (err) {
      console.log(err)
    }
  }



  async function loadData() {
    setIsDataLoading(true)
    try {
      let response = await axios.post(host + "api/user/account", { token })
      console.log(response.data)
      setData(response.data)
      setCopy(response.data)
      setIsDataLoading(false)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    loadData()
  }, [])


  return (
    <div className='w-8/12'>
      <form action="" encType='multipart/form-data' >
        <input onChange={(e) => uploadAvatar(e)} id="file" type="file" name="file" className='hidden' />
      </form>
      <header className='flex gap-12 '>
        <Avatar style={{ width: "100px" }} me={true} disableLink={true} />
        <div>
          <Username me={true} style={{ color: "#192021" }} />
          <label htmlFor="file">
            <p className='text-indigo-800 mt-3 border-indigo-800 border  px-2 py-1 
                  rounded-md hover:bg-indigo-800 hover:text-white '> Change Avatar </p>
          </label>
        </div>
        <div>
          <div style={{gridTemplateColumns : "1fr 1fr 1fr 1fr"}} className="img-wrap grid gap-3 mb-4">
            {
              ["sample-1.svg", "sample-2.svg", "sample-3.svg", "sample-4.svg", "sample-5.svg", "sample-6.svg", "sample-7.svg", "sample-8.svg"].map((i, j) => {
                return <img key={j} onClick={() => setAvatar(i)}
                  className='w-12 rounded-md cursor-pointer hover:border-indigo-400 border-2 hover:brightness-90 ' src={host + "avatars/" + i} />
              })
            }
          </div>
          <p className="text"> Or use sample images </p>
        </div>
      </header>

      <UsernameInput data={data} setData={setData} isDataLoading={isDataLoading} />
      <EmailInput data={data} setData={setData} isDataLoading={isDataLoading} />
      <PhoneInput data={data} setData={setData} isDataLoading={isDataLoading} />
      <BioInput data={data} setData={setData} isDataLoading={isDataLoading} />
      <GenderInput data={data} setData={setData} isDataLoading={isDataLoading} />




      <div className="button-wrap mt-6">
        <button onClick={handleSubmit} disabled={isDataLoading} className='px-5 py-3 bg-indigo-600 text-white hover:bg-indigo-800 rounded ' > Save it </button>
      </div>

    </div>
  )
}


function UsernameInput(props) {
  const { data, setData, isDataLoading } = props
  return (
    <div style={{ maxWidth: "500px" }} className="username-group flex  mt-10 gap-4 items-center">
      <label htmlFor='username' className="username w-3/12  font-semibold text-xl text-gray-500 "> Username </label>
      <input name="username" disabled={isDataLoading}
        value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })}
        className='w-9/12 outline-none px-2 py-3  border border-indigo-300 focus:border-indigo-500 rounded-sm' type="text" id="username" />
    </div>
  )
}

function EmailInput(props) {
  const { data, setData, isDataLoading } = props
  return (
    <div style={{ maxWidth: "500px" }} className=" flex  mt-10 gap-4 items-center">
      <label htmlFor='email' className="email w-3/12  font-semibold text-xl text-gray-500 "> Email </label>
      <input name="email" disabled={isDataLoading}
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        className='w-9/12 outline-none px-2 py-3  border border-indigo-300 focus:border-indigo-500 rounded-sm' type="text" id="username" />
    </div>
  )
}

function BioInput(props) {
  const { data, setData, isDataLoading } = props

  function handleChange(val){
    setData({...data,bio:val})
    console.log(data)
  }


  return (
    <div style={{ maxWidth: "500px" }} className="bio-group flex  mt-8 gap-4 items-center">
      <label htmlFor='bio' className="bio w-3/12  font-semibold text-xl text-gray-500 "> Bio </label>
      {/* <textarea disabled={isDataLoading}
        className='w-9/12 outline-none px-2 py-3  border border-indigo-300 rounded-sm focus:border-indigo-500 resize-none '
        type="text" id="bio"
        value={data.bio}
        onChange={(e) => setData({ ...data, bio: e.target.value })} /> */}
      <InputEmoji value={data.bio} onChange={handleChange} placeholder="Your bio" />
    </div>

  )
}


function PhoneInput(props) {
  const { data, setData, isDataLoading } = props
  return (
    <div style={{ maxWidth: "500px" }} className="number-group flex  mt-8 gap-4 items-center">
      <label htmlFor='number' className="number w-3/12  font-semibold text-xl text-gray-500 "> Phone number </label>
      <input disabled={isDataLoading}
        value={data.phone_number}
        onChange={(e) => setData({ ...data, phone_number: e.target.value })}
        className='w-9/12 outline-none px-2 py-3  border border-indigo-300 rounded-sm focus:border-indigo-500 ' type="text" id="number" />
    </div>

  )
}



function GenderInput(props) {
  const { data, setData, isDataLoading } = props
  return (<div style={{ maxWidth: "500px" }} className="gender-group flex  mt-8 gap-4 items-center">
    <p className='w-3/12' > Gender </p>
    <div className='bg-slate-200 py-2 px-2 rounded-md'>
      <button
        onClick={() => setData({ ...data, gender: 1 })}
        className={`px-6 py-2 cursor-pointer select-none rounded-md hover:bg-slate-300   ${data.gender == 1 ? "bg-indigo-800 text-white hover:bg-indigo-500 " : ''}`} >
        Female
      </button>
      <button
        onClick={() => setData({ ...data, gender: 2 })}
        className={`px-6 py-2 cursor-pointer select-none rounded-md  hover:bg-slate-300 ${data.gender == 2 ? "bg-indigo-800 text-white hover:bg-indigo-600 " : ''}`} >
        Male
      </button>
      <button
        onClick={() => setData({ ...data, gender: 0 })}
        className={`px-6 py-2 cursor-pointer select-none rounded-md  hover:bg-slate-300 ${data.gender == 0 || !data.gender ? "bg-indigo-800 text-white hover:bg-indigo-600 " : ""} `}  >
        None
      </button>
    </div>
  </div>
  )
}


