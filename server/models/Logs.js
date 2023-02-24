const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  who_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users' , required: true },
  whom_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users'  },
  action_name : {type : String, required: true },
  action_id : {type : mongoose.Schema.Types.ObjectId,   },
  text : {type : String , }
},{timestamps:true})




const Log = mongoose.model('logs',schema)
module.exports = Log

