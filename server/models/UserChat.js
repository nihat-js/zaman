const mongoose = require('mongoose');

const schema=  new mongoose.Schema({
  user_id : { type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true },
  chat_id : { type : mongoose.Schema.Types.ObjectId, ref : 'chats', required : true },
  folder_name : { type : String , required : true   }  , // "request" , "primary" , "secondary" , "archive" , "trash"
  isMuted : { type : Number , default : 0 }, 
  unseen_messages_count : { type : Number , default : 0 }  
},{timestamps : true})

const model = mongoose.model('user_chats', schema);

module.exports = model
