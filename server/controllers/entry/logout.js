const User =  require('../../models/User')

async function  index (req,res){
  const {user_id} = req.body 
  
  const user = await User.findOne({_id:user_id})
  if (!user){
    return res.status(404)
  }

  user.active_device = {}
  let savedUser = user.save()
  if (!savedUser){
    return res.status(500)
  }
  return res.status(200)

}

module.exports = index