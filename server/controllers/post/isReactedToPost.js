const PostReaction = require('../../models/PostReaction')

 async function isReactedToPost (req,res) {
  const { user_id , post_id } = req.body

  const postReaction = PostReaction.findOne({user_id,post_id})
  if (postReaction.length > 0){
    return postReaction.name
  }else{
    return false
  }

}

module.exports = isReactedToPost
