const User = require("../../models/User")
const Follow = require('../../models/Follow')
async function index (req,res){
  const {user_id,target_username , skip , limit} = req.body

  // skip = isNaN(skip) ||  parseInt(skip) 
  // limit = isNaN(limit) :


  if  (!target_username){
    const user = await User.findById(user_id)
    res.json()
  }else{
    const target = await User.findOne(target_username)

  }



}


module.exports = index
