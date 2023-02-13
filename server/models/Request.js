const mongoose = require('mongoose')


const schema=  new mongoose.Schema({
  sender_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
  receiver_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
}, )

const Request = mongoose.model('requests',schema)