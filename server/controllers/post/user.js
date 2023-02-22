const Post = require('../../models/Post')
async function main (req,res){
  const {user_id , target_username , skip} = req.body
  let limit = 10
  if (!target_username){
    const posts = await Post.find({author_id  : user_id}).limit(10).skip(0)
    return res.status(200).json(posts)
  }

  const target = await User.findOne({username : target_username})
  if (!target) return res.status(404).send()
  const posts = await Post.find({author_id : target._id}).limit(limit).skip(0).populate({
    path : "author_id",
    select : "username avatar"
  })

  return res.status(200).json(posts)


}

module.exports = main