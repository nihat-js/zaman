const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  following_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
  followed_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
},{timestamps:true})




const Follow = mongoose.model('follows',schema)
module.exports = Follow

