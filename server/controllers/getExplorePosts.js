const Post = require('../models/Post')
const User = require('../models/User')


async function getExplorePosts(req,res){
  const {user_id} = req.body

  let posts = await Post.find().populate('author',['username','pp'])
  let arr = [...posts]



  return res.json({message:"Successfull" , data: posts})

}




module.exports = getExplorePosts