const User = require('../models/user');
module.exports = async function login (req,res){
  if (!req.body.username ||!req.body.password){
    return res.json({message:"Invalid Data", status : false})
  }
  let {username, password}  = req.body
  username = username.toLowerCase()
  
  let user = await User.findOne({username : username})
  if (!user){
    return res.json({message:"User not found", status : false })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  
  if (!isPasswordValid){
    return res.json({message:"Invalid Password", status : false })
  }
  
  const active_device = {
    session : require('crypto').randomBytes(32).toString('hex') ,
    ip : req.header('x-forwarded-for') || req.socket.remoteAddress ,
    user_id : user._id
  }

  user.active_device = active_device

  let userSaved = await user.save()
  if (!userSaved){
    return res.json({message:"Error happened", status : false })
  }
  

  res.json({message:"Logged in successfully", status : true,  token : jwt.sign(active_device, process.env.JWT_SECRET)}  )

}


