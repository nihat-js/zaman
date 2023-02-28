const Post = require("./../../models/Post")
async function main(req,res){
  let {user_id, post_id,text } = req.body
  console.log(user_id,post_id)
  if (!post_id || !text) return res,status(487).send()

  let result = await Post.findOneAndUpdate({_id :post_id , author_id : user_id  }, {text} )
  console.log('r',result)
  if (!result) return res.status(502).send()
  return res.status(200).send()

} 


module.exports = main