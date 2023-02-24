const mongoose = require('mongoose');

const schema=  new mongoose.Schema({

  who_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
  whom_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
  reason : { Number ,default : 0  } // 0 spam / 1 hate speech / 2 scam  / 3 other
  
},{timestamps : true} )

const Reports = mongoose.model('reports', schema);
,
module.exports = Reports;