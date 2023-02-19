const User = require('../../models/User')
const Follow = require('../../models/Follow')
async function index(req,res){
  const {user_id} = req.body
  let users = await User.find({_id : {$ne : user_id } }).select("_id username avatar privacy ")

  if (users.length == 0 ){
    return res.status(404)
  }
  users = JSON.parse( JSON.stringify(users) )
  for (let i=0;i<users.length;i++){
    const isFollowing = await Follow.findOne({who_id : user_id , whom_id : users[i]._id })
    !isFollowing ? users[i].isFollowing = false : users[i].isFollowing = true
  }
  return res.status(200).json(users)


}


module.exports = index