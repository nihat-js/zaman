const User = require('../models/User')
const bcrypt = require('bcrypt')
async function register(req,res){

  let {username,email , password} = req.body 

  if (  !(username && email && password )){
    return res.json({message:"Invalid Data" , status : false})
  }
  username = username.toLowerCase()
  email = email.toLowerCase()
  const usernameCheck = await User.findOne({username : username})
  if (usernameCheck){
    return res.json({message:"Username already exists" , status : false })
  }
  const emailCheck = await  User.findOne({email : email})
  if (emailCheck){
    return res.json({message:"Email already exists", status : false })
  }
  
  if (password.length < 6){
    return res.json({message:"Minimum password length is 6", status : false })
  }

  let hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
     username,email,password : hashedPassword
  })

  const userSaved = await user.save()
  if (userSaved){
    return res.json({message:"User registered successfully", status : true , data : userSaved})
  }

}

module.exports = register