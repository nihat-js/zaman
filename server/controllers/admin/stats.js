const User = require("../../models/User")
const Post = require("../../models/Post")
const Comment = require("../../models/Comment")
const PostReaction = require("../../models/PostReaction")
async function main(req, res) {

  let usersCount = await User.countDocuments()
  let postsCount = await Post.countDocuments()
  let commentsCount = await Comment.countDocuments()
  let postReactionsCount = await Post.countDocuments()

  return res.status(200).json({
    usersCount,
    postsCount,
    commentsCount,
    postReactionsCount
  })

}

module.exports = main