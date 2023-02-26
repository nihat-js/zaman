const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  user_id : { type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true },
  comment_id : { type : mongoose.Schema.Types.ObjectId, ref : 'comments', required : true },
  name : { type : String, required : true },
}, {timestamps : true})

const CommentReaction = mongoose.model('comment_reactions',schema)






module.exports = CommentReaction