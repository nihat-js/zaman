const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  user_id : { type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true },
  post_id : { type : mongoose.Schema.Types.ObjectId, ref : 'posts', required : true },
  name : { type : String, required : true },
}, {timestamps : true})

const PostReaction = mongoose.model('post_reactions',schema)






module.exports = PostReaction