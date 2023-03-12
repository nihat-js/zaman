const Comment  = require('../../models/Comment')
const CommentReaction = require("../../models/CommentReaction")

async function main(req,res){
  const {user_id , post_id , sort } = req.body
  if (!post_id){    return res.status(406).send() }

  if ( sort == "recent"){

  }else if (sort == "relevant"){

  }

  let comments = await Comment.find({post_id : post_id}).sort().populate({ path : "author_id",    select : "username avatar stories_count "  }).lean()

  for (let i=0;i<comments.length;i++){
    let result = await CommentReaction.findOne({ comment_id : comments[i]._id , user_id })
    if (result) {
      comments[i].reaction = result.name
    }
  }
  // console.log(comments)

  return res.status(200).json(comments)

}


module.exports = main