require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose =  require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')


const User = require('./models/UserModel')
const Message = require('./models/messageModel')
const Chat =  require('./models/chatModel')
const app = express()
const auth 


app.use(cookieParser())
app.use(cors())
app.use(express.json())

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${server.address().port}`)
})

app.post('/register',register)
app.post('/login',login)
app.post("/send-message",auth,sendMessage)
app.post("/load-messages",loadMessages)
app.post("/load-chats",loadChats)





mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, ()=>{
  console.log("Connected to MongoDB")
})




async function login (req,res){
  if (!req.body.username ||!req.body.password){
    return res.json({message:"Invalid Data", status : false})
  }
  let {username, password}  = req.body
  username = username.toLowerCase()
  
  let user = await User.findOne({username : username})
  if (!user){
    return res.json({message:"User not found", status : false })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  
  if (!isPasswordValid){
    return res.json({message:"Invalid Password", status : false })
  }
  
  const active_device = {
    session : require('crypto').randomBytes(32).toString('hex') ,
    ip : req.header('x-forwarded-for') || req.socket.remoteAddress ,
    user_id : user._id
  }

  user.active_device = active_device

  let userSaved = await user.save()
  if (!userSaved){
    return res.json({message:"Error happened", status : false })
  }
  

  res.json({message:"Logged in successfully", status : true,  token : jwt.sign(active_device, process.env.JWT_SECRET)}  )


  

}

async function sendMessage(req,res){
  // const sender = "63e0c7c9929c725bdb4caecf"
  // const receiver = "63e0c7c9929c725bdb4caecf"

  if (!req.body.sender ||!req.body.receiver || !req.body.text || !req.body.chatId){
    return res.json({message:"Invalid Data", status : false})
  }

  let  {sender,receiver,text} = req.body
  const message = new Message({text,sender,receiver,chatId  })  

  const savedMessage = await message.save()
  if (!savedMessage){
    return  res.json({message : "Could not send message", status : false})
  }
  res.json({message : "Message sent successfully", status : true, data : savedMessage})
}

async function loadMessages (req,res){
  if (!req.body.chatId){
    return res.json({message:"Invalid Data", status : false})
  }
  let messages = await Message.find({chat_id : req.body.chatId})
  console.log(req.body.chatId)
  res.json({message : "Messages loaded successfully", status : true, data : messages})
  
}


async function loadChats(req,res){
  if (!req.body.userId){
    return res.json({message:"Invalid Data", status : false})
  }
  const  {userId} = req.body
  let chats = await Chat.find({ users : {$in : userId } })


  let arr = []
  for (let i=0;i<chats.length;i++){
    arr.push({id : chats[i]._id,  user_id : chats[i].users[0]})
  }


  res.json({message : "Chats loaded successfully", status : true, data : chats})
}