const mongoose = require('mongoose');

const schema=  new mongoose.Schema({
  users : [{ type : mongoose.Schema.Types.ObjectId, ref : 'users' }],
})

const Chat = mongoose.model('chats', schema);

module.exports = Chat

// eltun 63e1101e1c0a167a1f3c11ec
// nihat_ 63e0c7c9929c725bdb4caecf