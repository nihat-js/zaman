const Comment  = require('../models/Comment')
async function getComments(req,res){
  const {post_id} = req.body
  if (!post_id){
    return res.json({message : "Invalid data"})
  }

  let comments = await Comment.find({post_id}).populate('author_id',['username','pp'])
  console.log(comments)
}