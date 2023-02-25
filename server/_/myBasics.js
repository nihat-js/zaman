const User = require('../models/User')
async function index (req,res){
  const {user_id} = req.body

  const user = await User.findById(user_id)
  return res.status(200).json({username : user.username , avatar : user.avatar})


}


module.exports = index