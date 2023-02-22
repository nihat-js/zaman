const Post = require('../../models/Post')
const PostReaction = require('../../models/PostReaction')
const User = require('../../models/User')


async function getExplorePosts(req, res) {

  const {user_id} = req.body



  let posts = await Post.find().sort({createdAt : -1 }).populate({
    path :"author_id",
    select : "username avatar"

  }).lean()

   for (let i = 0; i < arr.length; i++) {
     let reaction = await  PostReaction.findOne({post_id  : arr[i]._id })
     if (reaction) {
      arr[i].reaction = arr.name
     }
   }

  console.log("I am last one")
  return res.json({ message: "Successfull", data: arr })

}


module.exports = getExplorePosts