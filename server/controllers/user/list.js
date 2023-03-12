const User = require("../../models/User")
const Follow = require("../../models/Follow")




async function followingsList(req,res) {
  const { user_id, target_username } = req.body
  let target = await User.findOne({ username: target_username })
  if (!target) return res.status(478).send()
  let arr = await Follow.find({ who_id: target._id }).populate({path : "whom_id" , select: "username avatar" }).lean()
  
  if (target._id == user_id) {
    arr = arr.map(k => k.whom_id.isFollowing = true)
    arr = arr.map (k => k.whom_id )
    return res.status(200).json(arr)
  }

  for (let i=0;i<arr.length;i++){
    const isFollowing = await Follow.findOne({who_id : user_id , whom_id : target._id})
    if (isFollowing) arr[i].whom_id.isFollowing = true
  }
  arr = arr.map(k => k.whom_id)

  return res.status(202).json(arr)
}

async function followersList(req,res) {
  const { user_id, target_username } = req.body
  let target = await User.findOne({ username: target_username }).select("_id username ")
  if (!target) return res.status(478).send()
  let arr = await Follow.find({ whom_id: user_id }).populate({path : 'who_id' , select : "username avatar" }).lean()
  

  for (let i=0;i<arr.length;i++){
    const isFollowing = await Follow.findOne({who_id : user_id , whom_id : arr[i].who_id})
    if (isFollowing) arr[i].who_id.isFollowing = true
  }
  arr = arr.map ( x => x.who_id )

  return res.status(202).json(arr)

}

module.exports = {
  followersList,
  followingsList
}