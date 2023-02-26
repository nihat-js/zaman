const Post = require("./../../models/Post")
const Comment = require("../../models/Comment")
async function deletePost(req,res){
  let {user_id, post_id} = req.body
  let post = await Post.findById(post_id)


  if (post.author_id != user_id){
    return res.status(482).send()
  }

  let savedResult = await  post.remove()
  let deleted = Comment.deleteMany({author_id: user_id}) // delete related comments
  return res.status(200).send()

} 


module.exports = deletePost