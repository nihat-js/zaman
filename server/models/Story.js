const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
  source : { type : String, required : true },
   
},{timestamps:true})




const Story = mongoose.model('stories',schema)
module.exports = Story

