const User = require('../../models/User')
const Follow = require('../../models/Follow')
async function index(req,res){
  const {user_id} = req.body
  console.log("uf",user_id)
  let users = await User.find({_id : {$ne : user_id } })

  if (users.length == 0 ){
    return res.status(404)
  }
  
  for (let i=0;i<users.length;i++){
    const isFollowing = await Follow.findOne({following_id  : users[i]._id, followe
  }

  return res.status(200).json(users)


}


module.exports = index