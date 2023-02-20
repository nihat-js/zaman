const mongoose = require('mongoose');

const schema=  new mongoose.Schema({
  user_id : { type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true },
  chat_id : { type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true },
  unseen_messages : { type : Number , default : 0 }  
},{timestamps : true})

const Chat = mongoose.model('chats', schema);

module.exports = Chat
