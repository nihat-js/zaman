const Post = require('../../models/Post')
const PostReaction = require('../../models/PostReaction')
const User = require('../../models/User')
const Saved = require("../../models/Saved")


async function main(req, res) {
  const { user_id, name, target_username, post_id } = req.body
  let posts;
  if (name == "feed") {
    posts = await Post.find().sort({ createdAt: -1 }).populate({
      path: "author_id",
      select: "username avatar stories_count"
    }).lean()
  }
  else if (name == "trend") {
    // console.log('bura gelirem')
    posts = await Post.find().sort({ comments_count: -1 }).populate({
      path: "author_id",
      select: "username avatar stories_count"
    }).lean()
  } else if (name == "explore") {
    posts = await Post.find().sort({ saved_count: -1 }).populate({
      path: "author_id",
      select: "username avatar  stories_count "
    }).lean()
  }

  else if (name == "user") {
    if (!target_username) {
      posts = await Post.find({ author_id: user_id }).sort({createdAt : -1}).limit(10).skip(0)
    } else {
      const target = await User.findOne({ username: target_username })
      if (!target) return res.status(404).send()
      posts = await Post.find({ author_id: target._id }).limit(10).skip(0).populate({
        path: "author_id",
        select: "username avatar"
      }).lean()
    }
  }
  else if (name == "saved") {
    let saveds = await Saved.find({ user_id }).populate({
      path: 'post_id',
      populate: {
        path: 'author_id',
        select: 'username avatar'
      }
    })
    posts = saveds.map(x => x.post_id)
    // console.log('p', posts)
  } else if (name == "specific") {
    let post = await Post.findById(post_id)
     posts = [post]
  }


  let arr = JSON.parse(JSON.stringify(posts))
  // console.log('place',arr)
  if (arr.length == 0){
    return res.send()
  }
  for (let i = 0; i < arr.length; i++) {
    let reaction = await PostReaction.findOne({ post_id: arr[i]._id, user_id })
    if (reaction) { arr[i].reaction = reaction.name }
  }

  for (let i = 0; i < arr.length; i++) {
    let saved = await Saved.findOne({ post_id: arr[i]._id, user_id })
    if (saved) {arr[i].saved = true}
  }

  // console.log(arr)
  return res.status(200).json(arr)
}

module.exports = main