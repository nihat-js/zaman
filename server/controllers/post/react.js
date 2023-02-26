const Post = require('../../models/Post')
const PostReaction = require('../../models/PostReaction')
const allReactions = ['up', 'down',] // for future ' primary', "secondary" ,'like', 'love', 'haha', 'wow', 'sad', 'angry'

async function reactToPost(req, res) {
  const { post_id, user_id, name } = req.body
  const isReacted = await PostReaction.findOne({ post_id, user_id })

  // console.log('d',isReacted , name )
  if (!isReacted && allReactions.includes(name)) {
    console.log("Debugging 1")
    let postReaction = new PostReaction({ user_id, post_id, name })
    let savedPostReaction = await postReaction.save()
    let val = name == "up" ? 1 : name == "down" ? -1 : 0;
    let post = await Post.findByIdAndUpdate(post_id,{$inc : {reactions_count : val}})
    return res.status(200).send()
  }

  else if (isReacted && name == "") { // delete reaction
    let val = isReacted.name == 'up' ? -1 : isReacted.name == "down" ? 1 : 0
    let post = await Post.findByIdAndUpdate(post_id, { $inc: { reactions_count: val } })
    let savedIsReacted = await isReacted.remove()
    return res.status(203).send()
  }

  else if (isReacted && allReactions.includes(name) && isReacted.name != name) {
    console.log("foo")
    let val = (isReacted.name == "up" && name == "down") ? -2 : (isReacted.name == "down" && name == "up") ? 2 : 0;
    let post = await Post.findByIdAndUpdate(post_id, { $inc : { reactions_count: val } })
    let savedPost = await post.save()
    isReacted.name = name 
    let saved = await isReacted.save()
    return res.status(203).send()
  }else{
    return res.status(481).send()
  }

}

module.exports = reactToPost
