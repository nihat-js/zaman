const mongoose = require('mongoose')

const Comment = mongoose.model('comments', new mongoose.Schema({
  post_id : { type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: true },
  user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'users', required : true } ,
  text : { type: String, required: true },
  reactions : []
}))


module.exports = Comment