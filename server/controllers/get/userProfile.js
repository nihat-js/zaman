const User = require('../../models/user');

async function index(req,res){
  const {user_id , target_username} = req.body

  let target = await User.findOne({username : target_username}).
  select("username followings_count followers_count ")
  if (!user){
    return res.status(404)
  }

  return res.json(user)
}


module.exports = User