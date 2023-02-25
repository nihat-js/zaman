const User = require('../models/user');
async function index(req,res){
  const {user_id} = req.body

  let user = await User.findById(user_id).select("followings_count followers_count posts_count bio")
  if (!user){
    return res.status(404)
  }
  return res.json(user)
}


module.exports = User