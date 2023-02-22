const Post = require('../../models/Post')
const PostReaction = require('../../models/PostReaction')
const allReactions = ['primary', 'like', 'love', 'haha', 'wow', 'sad', 'angry',]

async function main(req, res) {
  const { post_id, user_id, name } = req.body

  if (!post_id || !user_id) {
    return res.status(459).send()
  }

  const result = await PostReaction.findOneAndRemove({ post_id, user_id })
  if (!result){
    return res.status(203).send() //message  : You didn't react
  }

  return res.status(205).send()  





}

module.exports = reactToPost
