const mongoose = require("mongoose")

const Post = mongoose.model("posts", new mongoose.Schema({
  text : {type : String ,maxlength : 255},
  sources : [],
  author : {type : mongoose.Schema.Types.ObjectId , ref : "users" },
  reactions :  []



},{timestamps : true}))


module.exports = Post