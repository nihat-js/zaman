const mongoose = require('mongoose');

const schema=  new mongoose.Schema({

  who_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users' , required: true},
  model : {type : String, required : true}, // user or  post or comment
  model_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users'}, // if availiable
  argument : { type :Number ,default : 0 ,  required: true } , // 0 spam / 1 hate speech / 2 scam  / 3 other
  // additional_message : { type:String,  } // not availiable now
  
},{timestamps : true} )

const Reports = mongoose.model('reports', schema);

module.exports = Reports;