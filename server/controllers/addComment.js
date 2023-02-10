const Comment = require('../models/Comment')

async function addComment (req,res){
  let author_id = req.body.user_id
  let {post_id ,text } = req.body

  if ( !post_id || !text ){
    return res.json({message: "Invalid data"})
  }

  let comment = new Comment({author_id,post_id,text})
  let savedComment = await comment.save()
  if (!savedComment){
    return res.json({message: "Something went wrong"})
  }
  res.json({message: "Comment added successfully"})
} 


module.exports = addComment