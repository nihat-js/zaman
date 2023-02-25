const Post = require('../models/Post')
const Follows = require('../models/Follow')
const PostReaction = require('../models/PostReaction')
async function index(req, res) {

  const { user_id } = req.body
  let arr = []

  const posts = await Post.find().lean(). sort({createdAt : -1}).populate('author_id', ['_id','username', 'avatar'])

  for (let i = 0; i < posts.length;i++ ) {
    const isFollowing = await Follows.find({ who_id: user_id, whom_id: posts[i].author_id._id })
    if (isFollowing.length > 0) {
      arr.push(posts[i])
    }
    const isReacted = await PostReaction.find()
  }
  // console.log(posts,arr)


return res.status(200).json(arr)

}


module.exports = index