const mongoose = require('mongoose')

const Comment = mongoose.model('comments', new mongoose.Schema({
  author_id : { type: mongoose.Schema.Types.ObjectId, ref: 'users', required : true } ,
  post_id : { type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: true },
  text : { type: String, required: true },
  score : {type : Number , default : 0} ,
  reactions : [],
  sources : [],
},{timestamps : true}))




module.exports = Comment