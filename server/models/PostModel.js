const mongoose = require("mongoose")

const Post = mongoose.model("Post", new mongoose.Schema({
  text : {type : String , required : true},
  sources : [],
  
  timestamp : { type: Date, default: Date.now() },


}))