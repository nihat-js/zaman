const bcrypt  = require('bcrypt')
const User = require('../../models/User')
async function index(req,res){
  const {user_id,old_password,new_password} = req.body

  if (!user_id ||!old_password ||!new_password) {
    return res.status(406)
  }

  const user = await User.findById(user_id)
  const isMatch = await bcrypt.compare(old_password,user.password)

  if (!isMatch){
    return res.status(405)
  }

  const hash = await bcrypt.hash(new_password,10)
  user.password = hash
  if (hash){
    return
  }


  
}