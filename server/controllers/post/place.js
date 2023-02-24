const Post = require('../../models/Post')
const PostReaction = require('../../models/PostReaction')
const User = require('../../models/User')

async function wa(req, res) {
  const { user_id, target_username, skip } = req.body
  let limit = 10



}

async function getExplorePosts(req, res) {
  const { user_id, place, target_username } = req.body
  let posts;
  if (place == "feed") {
    let posts = await Post.find().sort({ createdAt: -1 }).populate({
      path: "author_id",
      select: "username avatar"
    }).lean()
  }
  else if (place == "trend") {
    let posts = await Post.find().sort({ comments_count }).populate({
      path: "author_id",
      select: "username avatar"
    })
  } else if (place == "explore") {
    let posts = await Post.find().sort({ saved_count }).populate({
      path: "author_id",
      select: "username avatar"
    })
  }

  else if (place == "user") {
    if (!target_username) {
      posts = await Post.find({ author_id: user_id }).limit(10).skip(0)
    } else {
      const target = await User.findOne({ username: target_username })
      if (!target) return res.status(404).send()
      posts = await Post.find({ author_id: target._id }).limit(limit).skip(0).populate({
        path: "author_id",
        select: "username avatar"
      })
    }
  }

  for (let i = 0; i < arr.length; i++) {
    let reaction = await PostReaction.findOne({ post_id: arr[i]._id })
    if (reaction) {
      arr[i].reaction = arr.name
    }
  }

  console.log("I am last one")
  return res.json({ message: "Successfull", data: arr })

}