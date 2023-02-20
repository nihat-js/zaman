const User = require("../models/User")

async function index (req,res){
  const {value} = req.body 
  if (!value){
    return res.status(400).send()
  }

  let users = await User.find({username : { $regex : value } }).select("username avatar").lean()

  return res.status(200).json(users)

}






module.exports = index