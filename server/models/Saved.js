const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  user_id : { type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true },
  post_id : { type : mongoose.Schema.Types.ObjectId, ref : 'posts', required : true },
}, {timestamps : true})

const Saved = mongoose.model('saved',schema)


module.exports = Saved


