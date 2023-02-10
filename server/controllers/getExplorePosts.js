const Post = require('../models/Post')
const PostReaction = require('../models/PostReaction')
const User = require('../models/User')


async function getExplorePosts(req, res) {
  const { user_id } = req.body

  let posts = await Post.find().populate('author', ['username', 'pp'])
  let arr = JSON.parse(JSON.stringify(posts))
  
   for (let i = 0; i < arr.length; i++) {
     let a = await  PostReaction.findOne({post_id  : arr[i]._id })
     if (a) {
      arr[i].reaction = a.name
     }
   }

  console.log("I am last one")
  return res.json({ message: "Successfull", data: arr })

}


module.exports = getExplorePosts