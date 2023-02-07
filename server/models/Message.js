const mongoose = require('mongoose');

const schema=  new mongoose.Schema({
  text : {type : String , required : true},
  sender : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
  chat_id : {type : mongoose.Schema.Types.ObjectId, ref:'chats',  required  : true},

  seenBy : [{type : mongoose.Schema.Types.ObjectId, ref : 'users',}],
  reactions : [{type : mongoose.Schema.Types.ObjectId, ref : 'users',}],
  
}, )

const Message = mongoose.model('messages', schema);

module.exports = Message;