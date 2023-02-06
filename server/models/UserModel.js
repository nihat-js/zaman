const mongoose =  require('mongoose')

const schema = new mongoose.Schema({
  username : {type : String , required : true, unique: true,},
  password : {type : String, required: true}
  active_devices
})







const active_devices = [
  {
    user_agent : "",
    first_login_time : "",
    isActive : false ,
  }
]