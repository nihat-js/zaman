const User = require("../../models/User")
const Follow = require("../../models/Follow")




async function followingsList(req,res) {
  const { user_id, target_username } = req.body
  console.log('t',target_username)
  let target = await User.findOne({ username: target_username })
  if (!target) return res.status(478).send()
  let arr = await Follow.find({ who_id: target._id }).lean()
  
  if (target._id == user_id) {
    arr = arr.map(k => k.isFollowing = true)
    return res.send(200).json(arr)
  }

  for (let i=0;i<arr.length;i++){
    const isFollowing = await Follow.findOne({who_id : user_id , whom_id : target._id})
    if (isFollowing) arr.isFollowing = true
  }

  return res.status(205).json(arr)
}

async function followersList(req,res) {
  const { user_id, target_username } = req.body
  let target = await User.findOne({ username: target_username }).select("_id username ")
  if (!target) return res.status(478).send()
  let arr = await Follow.find({ whom_id: user_id }).lean()
  

  for (let i=0;i<arr.length;i++){
    const isFollowing = await Follow.findOne({who_id : user_id , whom_id : target._id})
    if (isFollowing) arr.isFollowing = true
  }

  console.log(arr)
  return res.status(205).json(arr)

}

module.exports = {
  followersList,
  followingsList
}