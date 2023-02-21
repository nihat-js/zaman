const Post = require('../../models/Post')
const User = require('../../models/User')

async function getUserPosts(req,res){
  const {target_username} = req.body

  const target = await User.findOne({username:target_username})
  if (!target){
    return res.json({message : "User not foud" , status : false})
  }

  const posts = await Post.find({author:target._id})

  if (!posts){
    return res.json({message : "No posts found", status : false})
  }

  res.json({message :"Successful" , status : true , data : posts})

}






module.exports = getUserPosts