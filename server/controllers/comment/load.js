const Comment  = require('../../models/Comment')


async function main(req,res){
  const {post_id , sort } = req.body
  if (!post_id){
    return res.status(406).send() 
  }

  if ( sort == "recent"){

  }else if (sort == "relevant"){
    
  }

  let comments = await Comment.find({post_id}).sort().populate({
    path : "author_id",
    select : "username avatar"
  })
  return res.status(200).json(comments)

}


module.exports = main