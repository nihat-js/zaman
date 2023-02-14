const mongoose = require('mongoose');

const schema=  new mongoose.Schema({
  text : {type : String , required : true},
  sender_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
  chat_id : {type : mongoose.Schema.Types.ObjectId, ref:'chats',  required  : true},
  seen_by : [{type : mongoose.Schema.Types.ObjectId, ref : 'users',}],
  reactions : [{type : mongoose.Schema.Types.ObjectId, ref : 'users',}],
  reactions_count  :{type :Number , default : 0}
  
}, )

const Message = mongoose.model('messages', schema);

module.exports = Message;