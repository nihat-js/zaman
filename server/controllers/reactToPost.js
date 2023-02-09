const Post = require('../models/Post')
const PostReaction = require('../models/PostReaction')
const allReactions = ['like', 'love', 'haha', 'wow', 'sad', 'angry',]

async function reactToPost (req,res){
 const {post_id , user_id, name}  = req.body

 if ( !post_id || !name  || !user_id){
  return res.json({message : 'Please provide post_id and name'})
 }

 let isIn = allReactions.indexOf(name)
 if (isIn === -1){
  return res.json({message : 'Invalid reaction'})
 }

 const result = await PostReaction.find({post_id, user_id })

 if (result){
  return res.json({message : `Already reacted to this post`})
 }

 
 const postReaction = new PostReaction({
  user_id ,
  post_id ,
  name
 })

 const savedPostReaction = await postReaction.save()
 if (!savedPostReaction){
  return res.json({message : 'Something went wrong'})
 }

 const post = await Post.findById(post_id)
 if (!post){
  return res.json({message : 'Something went wrong'})
 }



 !post.reactions[name] ? post.reactions[name] = {name , count : 1} : post.reaction[name].count++

 const savedPost = await post.save()
 if (!savedPost){
  return res.json({message : 'Something went wrong'})
 }

 res.json({message : "succesfull"})



}