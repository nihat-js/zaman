const Post = require('../../models/Post')
const PostReaction = require('../../models/PostReaction')
const allReactions = ['primary', 'like', 'love', 'haha', 'wow', 'sad', 'angry',]

async function reactToPost(req, res) {
  const { post_id, user_id, name } = req.body
  if (!post_id || !name || !user_id || !allReactions.includes(name)) {
    return res.status(459).send()
  }

  const isReacted = await PostReaction.findOne({ post_id, user_id })
  if (isReacted) {
    return res.status(439).send()  //message  : Already reacted to this post
  }


  const postReaction = new PostReaction({
    user_id,
    post_id,
    name
  })

  const savedPostReaction = await postReaction.save()
  if (!savedPostReaction) {
    return res.status(505).send()  // message : 'Something went wrong
  }

  const post = await Post.findById(post_id)
  if (!post) {
    return res.status(501).send();  // message : 'Something went wrong
  }
  let findIndex = post.reactions.findIndex(reaction => reaction.name === name)
  findIndex > -1 ? post.reactions[findIndex].count++ :    post.reactions.push({name ,count : 1 }) 
  // console.log("debug",post.reactions[findIndex])

  post.markModified('reactions')
  const savedPost = await post.save()
  if (!savedPost) {
    return res.status(500).send()
  }

  return res.status(200).send()



}

module.exports = reactToPost
