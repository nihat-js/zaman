const Post = require('../../models/Post')
const PostReaction = require('../../models/PostReaction')

async function main(req, res) {
  const { post_id, user_id,  } = req.body

  if (!post_id || !user_id) {
    return res.status(459).send()
  }

  const result = await PostReaction.find({ post_id, user_id })
  if (!result){
    return res.status(431).send()
  }
  let name = result.name
  let post = await Post.findById(post_id)

  let findIndex = post.reactions.findIndex(reaction => reaction.name === name)
  findIndex > -1 ? post.reactions[findIndex].count++ :    post.reactions.push({name ,count : 1 }) 

  post.reactions.count ?  "" : post.reactions.count =0  
  
  if (name == "primary"){
    post.reactions.count +=1
  }else if (name == "secondary"){
    post.reactions.count -= 1
  }


  return res.status(205).send()  





}

module.exports = reactToPost
