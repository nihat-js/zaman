import axios from 'axios'
import usersSvg from "../../assets/svg/users.svg"
import commentsSvg from "../../assets/svg/comment.svg"
import reactionsSvg from "../../assets/svg/reactions.svg"
import postsSvg from "../../assets/svg/posts.svg"
import refreshSvg from "../../assets/svg/refresh.svg"
import { useEffect, useState } from "react"
import StatsSkleton from './StatsSkleton'
import StatsBox from './StatsBox'
import Avatar from "../User/Avatar"
import {getCookie} from "../../utils/getCookie"
export default function DashBoard(props) {
  const { setCurrentTabName, showNames, setshowNames } = props


  let host = "http://localhost:5000/"
  let [stats, setStats] = useState({})
  let [recentUsers, setRecentUsers] = useState([])
  let [mostFollowedUsers, setMostFollowedUsers] = useState([])
  async function loadStats() {
    try {
      let result = await axios.post(host + "api/admin/stats", { token : getCookie('token')  })
      // console.log(result)
      setStats(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadStats()
    loadMostFollowedUsers()
    loadRecentUsers()
  }, [])

  async function loadMostFollowedUsers() {
    try {
      let result = await axios.post(host + "api/admin/graphql", { token : getCookie('token') , model: "user", sortObj: { followings_count: 1 } })
      console.log('start');
      setMostFollowedUsers(result.data)
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }


  async function loadRecentUsers() {
    try {
      let result = await axios.post(host + "api/admin/graphql", { model: "user", sortObj: { cake_day: 1 }  , token : getCookie('token')  })
      setRecentUsers(result.data)
      console.log("recents", result.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="dashboard" >



      <div className="boxes flex gap-8 mb-10">

        {Object.keys(stats).length == 0 ?
          [...new Array(3)].map((item, index) => <StatsSkleton />) :
          <>
            <StatsBox svg={usersSvg} title={stats.usersCount + " Users"} subtitle="All time" />
            <StatsBox svg={postsSvg} title={stats.postsCount + " Posts"} subtitle="All posts" />
            <StatsBox svg={commentsSvg} title={stats.commentsCount + " Comments"} subtitle="Post comments" />
            <StatsBox svg={reactionsSvg} title={stats.postReactionsCount + " Reactions"} subtitle="Post reactions" />
          </>
        }

      </div>
      <div className="flex gap-8 ">
        <div className="recent-users w-8/12 px-6 py-8 bg-white rounded-lg shadow-md" >
          <header className="flex justify-between mb-8" >
            <h3 className="title text-indigo-800 font-bold text-3xl "> Recent users </h3>
            <button className="bg-indigo-800  px-5 py-2 text-white hover:bg-indigo-600 rounded-lg " onClick={() => setCurrentTabName('Users')} > Go to users </button>
          </header>
          <div className="">
            <header style={{ gridTemplateColumns: "2fr 2fr 2fr 2fr" }} className="grid mb-2  gap-6">
              <p className="text-indigo-500 font-semibold">Avatar</p>
              <p className="text-indigo-500 font-semibold">Username</p>
              <p className="text-indigo-500 font-semibold">Email</p>
              <p className="text-indigo-500 font-semibold">Privacy</p>

            </header>
            <div className="body mt-8">
              {recentUsers.map((i, j) => {
                return (
                  <div key={j}
                    style={{ gridTemplateColumns: "2fr 2fr 2fr 2fr" }}
                    className="grid gap-6  mb-3 hover:bg-slate-100 py-2 rounded-md px-2"> 
                    <Avatar style={{ width: "48px" }} avatar={i.avatar} username={i.username} />
                    <p className="username"> {i.username}   </p>
                    <p className="username"> {i.email}   </p>
                    <p className="followings_count"> {i.privacy == 0 ? "Public" : "Private"} </p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        <div className="most-followed-users w-4/12 px-6 py-8 bg-white rounded-lg shadow-md ">
          <header className="flex justify-between mb-8" >
            <h3 className="title text-indigo-800 font-bold text-3xl "> Most followed users </h3>
            <img onClick={() => loadMostFollowedUsers() } src={refreshSvg} className="cursor-pointer hover:rotate-180 duration-300" alt="" />
          </header>
          <div className="body">
            <header className='flex justify-between mb-2'>
              <p className='font-semibold text-indigo-800'> User </p>
              <p className='font-semibold text-indigo-800'> Followers Count </p>
            </header>
            {mostFollowedUsers.map((i, j) => <div key={j}
              className="flex justify-between   mb-3 hover:bg-slate-100 py-2 rounded-md px-1">
              <div className='flex gap-2'>
                <Avatar avatar={i.avatar} username={i.username} />
                <p className="username font-bold text-xl"> {i.username} </p>
              </div>
              <p className="followers-count text-2xl  font-semibold  "> {i.followers_count} </p>
            </div>)}
          </div>
        </div>
      </div>



    </div>
  )
}


function SkletonRow() {

}