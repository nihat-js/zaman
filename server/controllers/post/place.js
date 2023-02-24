const Post = require('../../models/Post')
const PostReaction = require('../../models/PostReaction')
const User = require('../../models/User')



async function main(req, res) {
  const { user_id, name, target_username } = req.body
  let posts;
  if (name == "feed") {
     posts = await Post.find().sort({ createdAt: -1 }).populate({
      path: "author_id",
      select: "username avatar"
    }).lean()
  }
  else if (name == "trend") {
     posts = await Post.find().sort({ comments_count }).populate({
      path: "author_id",
      select: "username avatar"
    })
  } else if (name == "explore") {
     posts = await Post.find().sort({ saved_count }).populate({
      path: "author_id",
      select: "username avatar"
    })
  }

  else if (name == "user") {
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
  return res.status(200).json(posts)

  // for (let i = 0; i < arr.length; i++) {
  //   let reaction = await PostReaction.findOne({ post_id: arr[i]._id })
  //   if (reaction) {
  //     arr[i].reaction = arr.name
  //   }
  // }

}

module.exports = main