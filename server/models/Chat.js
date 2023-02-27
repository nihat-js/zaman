const mongoose = require('mongoose');

const schema=  new mongoose.Schema({
  users_id : [{ type : mongoose.Schema.Types.ObjectId, ref : 'users'  , required : true }],
  // type : { type : String , default : 'private' },
  theme : {type  : String , default : "" },
  last_message : {type  : String, default : "" },
  messages_count : { type : Number, default : 0 },
  title : {type : String ,default : ""},
  avatar : { type : String , default : "" }
})

const model = mongoose.model('chats', schema);

module.exports = model

// eltun 63e1101e1c0a167a1f3c11ec
// nihat_ 63e0c7c9929c725bdb4caecf