const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  author_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
  source : { type : String, required : true },
  view_count :  { type : Number ,default : 0 },
  created_at : { type  : Date , default : Date.now() }
   
})




const Story = mongoose.model('stories',schema)
module.exports = Story

