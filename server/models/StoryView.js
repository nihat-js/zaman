const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
  story_id : {type : mongoose.Schema.Types.ObjectId, ref : 'stories', required : true},
   
},{timestamps:true})




const StoryView = mongoose.model('story_views',schema)
module.exports = StoryView

