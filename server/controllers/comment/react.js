const Comment = require('../../models/Comment')
const CommentReaction = require('../../models/CommentReaction.js')
const allReactions = ['up', 'down',] // for future ' primary', "secondary" ,'like', 'love', 'haha', 'wow', 'sad', 'angry'

async function reactToComment(req, res) {
  const { comment_id, user_id, name } = req.body
  const isReacted = await CommentReaction.findOne({ comment_id, user_id })

  // console.log('d',isReacted , name )
  if (!isReacted && allReactions.includes(name)) {
    console.log("Debugging 1")
    let commentReaction = new CommentReaction({ user_id, comment_id, name })
    let savedCommentReaction = await commentReaction.save()
    let val = name == "up" ? 1 : name == "down" ? -1 : 0;
    let comment = await Comment.findByIdAndUpdate(comment_id,{$inc : {score : val}})
    return res.status(200).send()
  }

  else if (isReacted && name == "") { // delete reaction
    let val = isReacted.name == 'up' ? -1 : isReacted.name == "down" ? 1 : 0
    let comment = await Comment.findByIdAndUpdate(comment_id, { $inc: { score: val } })
    let savedIsReacted = await isReacted.remove()
    return res.status(203).send()
  }

  else if (isReacted && allReactions.includes(name) && isReacted.name != name) {
    console.log("foo")
    let val = (isReacted.name == "up" && name == "down") ? -2 : (isReacted.name == "down" && name == "up") ? 2 : 0;
    let comment = await Comment.findByIdAndUpdate(comment_id, { $inc : { score: val } })
    let savedComment = await comment.save()
    isReacted.name = name 
    let saved = await isReacted.save()
    return res.status(203).send()
  }else{
    return res.status(481).send()
  }

}

module.exports = reactToComment
