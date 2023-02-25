const mongoose =  require('mongoose')

const schema = new mongoose.Schema({
  username : {type : String , required : true, unique: true,},
  email : {type : String , required : true, unique: true,},
  password : {type : String, required: true},
  active_devices : [],
  phone_number : {type : String, required : true, },
  bio : { type :String ,    },
  gender: {type : Number  }, // 0 female 1 male
  avatar : {type : String , default : ''},
  cover : {type : String , default : ""} ,
  active_device : {},
  phone_number : {type : String},
  followers_count : {type : Number, default : 0},
  followings_count : {type : Number, default : 0 },
  posts_count : {type : Number, default : 0 },
  stories_count : {type : Number, default : 0 },
  privacy : {type : Number, default : 0}, // 0 public 1 private
  interests : []  ,
  unseen_notifications_count : {type : Number , default : 0},
  cake_day : { type : Date , default : Date.now() } ,
  violations : {   }  , // reason message who_id 
  is_admin : {type : Boolean, default : false}, 
  role : {type : Number , default : 0} // 0-user 1-moderator 2-admin
})



const User = mongoose.model('users', schema)

module.exports = User