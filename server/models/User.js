const mongoose =  require('mongoose')

const schema = new mongoose.Schema({
  username : {type : String , required : true, unique: true,},
  email : {type : String , required : true, unique: true,},
  password : {type : String, required: true},
  active_devices : [],
  pp : {type : String , default : ''},
  active_device : {},

})



const User = mongoose.model('users', schema)

module.exports = User