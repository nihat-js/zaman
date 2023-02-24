const mongoose =  require('mongoose')

const schema = new mongoose.Schema({
  username : {type : String , required : true, unique: true,},
  email : {type : String , required : true, unique: true,},
  password : {type : String, required: true},
  active_devices : [],
  avatar : {type : String , default : ''},
  cover : {type : String , default : ""} ,
  active_device : {},
  followers_count : {type : Number, default : 0},
  followings_count : {type : Number, default : 0 },
  posts_count : {type : Number, default : 0 },
  stories_count : {type : Number, default : 0 },
  privacy : {type : Number, default : 0}, // 0 public 1 private
  interests : []  ,
  unseen_notifications_count : {type : Number , default : 0},
  cake_day : { type : Date , default : Date.now() } ,
  violation : {   }  // reason message who_id 
})



const User = mongoose.model('users', schema)

module.exports = User