const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../../models/User')


module.exports = async function login (req,res){
  console.log('bura geldi')
  if (!req.body.username ||!req.body.password){
    return res.status(406)  
  }
  let {username, password}  = req.body
  username = username.toLowerCase().trim()
  
  let user = await User.findOne({username : username})
  if (!user){
    return res.status(402).json({message : "User not found"})
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  
  if (!isPasswordValid){
    return res.status(401).json({message:"Invalid Password",  })
  }
  
  const active_device = {
    session : require('crypto').randomBytes(32).toString('hex') ,
    ip : req.header('x-forwarded-for') || req.socket.remoteAddress ,
    user_id : user._id
  }

  user.active_device = active_device

  let userSaved = await user.save()
  if (!userSaved){
    return res.status(500).json({message:"Something went wrong", })
  }

  const obj = {
    username : user.username,
    avatar : user.avatar ,
    cake_day : user.cake_day,
  }

  res.status(200).json({message:"Logged in successfully", user : obj ,  token : jwt.sign(active_device, process.env.JWT_SECRET)}  )

}


