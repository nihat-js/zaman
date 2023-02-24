import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from '../Avatar'

import lockOnSvg from "../../assets/svg/lock-on.svg"
import lockOffSvg from "../../assets/svg/lock-off.svg"
import trashSvg from "../../assets/svg/trash.svg"

import UserBanPopup from './UserBanPopup'

export default function Users() {

  const [searchType, setSearchType] = useState("Username")
  const searchTypes = ["Username", "Email", "Id"]
  const [searchValue, setSearchValue] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [users, setUsers] = useState([])
  const host = "http://localhost:5000/"

  async function loadUsers() {
    try {
      let result = await axios.post(host + "api/admin/graphql", { model: "user", sortObj: { cake_day: 1 } })
      setUsers(result.data)
    } catch (err) {
      console.log(err)
    }
  }
   const [selectedUser,setSelectedUser] = useState({})

  useEffect(() => {
    loadUsers()
  })

  function handleSearch() {

  }




  return (
    <div className='page'>
      {showPopup && <UserBanPopup  user={selectedUser} setShowPopup={setShowPopup} />}

      <div className="find-user mb-16">

        <div class="py-4">
          <p className="text font-semibold text-2xl text-gray-400 mb-8 ">
            Use search button when you search with different type than username
          </p>
          <div style={{ gridTemplateColumns: "1fr 5fr 1fr", maxWidth: "1000px" }} className="grid gap-8">
            <Dropdown searchTypes={searchTypes} searchType={searchType} setSearchType={setSearchType} />
            <input onchange={(e) => handleSearch(e.target.value)}
              type="text" placeholder="Full Name" class="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 outline-none" />
            <button onchange={(e) => handleSearch(e.target.value)}
              class="border-2 border-indigo-600 rounded px-6 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300">
              Search
              <i class="fas fa-chevron-right ml-2 text-sm"></i>
            </button>

          </div>
        </div>

        <div className="selected-user"></div>

      </div>



      <div className="users-full  px-6 py-8 bg-white rounded-lg shadow-md" >
        <header className="flex justify-between mb-8" >
          <h3 className="title text-indigo-800 font-bold text-3xl "> Actions on users </h3>
          <button className="bg-indigo-800  px-5 py-2 text-white hover:bg-indigo-600 rounded-lg " onClick={() => setCurrentTabName('Users')} > Go to users </button>
        </header>



        <div className="my-table">
          <header style={{ gridTemplateColumns: "1fr 3fr 3fr 2fr 2fr 2fr" }} className="grid mb-2  gap-6">
            <p> </p>
            <p className="text-indigo-500 font-semibold">Avatar</p>
            <p className="text-indigo-500 font-semibold">Username</p>
            <p className="text-indigo-500 font-semibold">Email</p>
            <p className="text-indigo-500 font-semibold">Privacy</p>
            <p className="actions"> Actions            </p>
          </header>
          <div className="body mt-8">
            {users.map((i, j) => {
              return (
                <div key={j}
                  style={{ gridTemplateColumns: "1fr 3fr  3fr 2fr 2fr 2fr", }}
                  className="grid gap-6  mb-3 hover:bg-slate-100 py-2 rounded-md px-2">
                  <input type="checkbox" name="" id="" />
                  <Avatar style={{ width: "48px" }} avatar={i.avatar} username={i.username} />
                  <p className="username" style={{ wordBreak: 'break-word' }} > {i.username}   </p>
                  <p className="username " style={{ wordBreak: 'break-word' }}> {i.email}   </p>
                  <p className="followings_count"> {i.privacy == 0 ? "Public" : "Private"} </p>
                  <p className="actions flex gap-2">
                    <img className='w-8 cursor-pointer hover:bg-slate-200 rounded-full' src={trashSvg} alt="" />
                    <img onClick={() => { setShowPopup(true) ; setSelectedUser(i)   } } 
                    className='w-8 cursor-pointer hover:bg-slate-200 rounded-full ' src={lockOnSvg} alt="" />
                  </p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}




function Dropdown(props) {
  let { searchTypes, searchType, setSearchType } = props



  return (
    <div class="dropdown inline-block relative group">
      <button class="bg-indigo-300 text-indigo-700 font-semibold py-2 px-4 rounded inline-flex items-center">
        <span class="mr-1"> {searchType} </span>
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
      </button>
      <ul class="dropdown-menu absolute hidden text-indigo-700 pt-1 group-hover:block w-full">
        {
          searchTypes.map((i, j) => i != searchType &&
            <li class="" onClick={() => setSearchType(i)} >
              <a class="rounded-t bg-indigo-200 hover:bg-indigo-400 py-2 px-4 block whitespace-no-wrap" href="#">{i}  </a>
            </li>)
        }
      </ul>
    </div>
  )

}