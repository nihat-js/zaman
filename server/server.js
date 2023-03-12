require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const path = require('path')
const http = require('http');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken')

//middlewares
const auth = require('./middlewares/auth')
const adminAuth = require("./middlewares/adminAuth")
//routes
// const message = require('./routes/message')
const entry = require('./routes/entry')
const chat = require('./routes/chat')
const post = require("./routes/post")
const comment = require("./routes/comment")
const admin = require("./routes/admin")
const user = require("./routes/user")
const story = require("./routes/story")





// controllers
const search = require('./controllers/search')


app.use(express.json())
app.use(cors())
app.use(fileUpload())


app.get('/test',(req,res)=> res.send("test") )
app.use(express.static('storage'))
app.use('/api/entry/', entry)
// app.use('/api/message/',auth,message)
app.use('/api/chat/', auth, chat)
app.use("/api/post/", auth, post)
app.use("/api/comment/", auth, comment)
app.use("/api/admin", adminAuth, admin)

app.use("/api/user/", auth, user)
app.use("/api/story/",auth,story)

app.post('/api/search', search)


app.post('/ok', (req, res) => res.send('ok'))


app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on ${process.env.PORT} `) })
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, () => { console.log("Connected to MongoDB") })


const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });
const User = require("./models/User")
const Chat = require("./models/Chat")
const UserChat = require("./models/UserChat")
const Message = require("./models/Message")
global.users = []



io.on('connection', (socket) => {
  // console.log(`New client connected: ${socket.id}`);
  let socket_id = socket.id
  // socket.on('register', async (token) => {
  //   socket.join("room")
  //   if (!token) return false
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET)
  //   let user = await User.findById(decoded.user_id)
  //   global.users.push({ socket_id, user_id: decoded.user_id })
  //   // console.log('a',global.users)
  // })


  socket.on('join', async (data) => {
    if (!data.chat_id) return false
    const decoded = jwt.verify(data.token, process.env.JWT_SECRET)
    console.log('joinin', data.chat_id)
    const hasAccess = await UserChat.find({ chat_id: data.chat_id, user_id: decoded.user_id })
    if (!hasAccess) { return false }
    await socket.join(data.chat_id)
  })




  socket.on('load', async (data) => {
    console.log('loading', data.chat_id)
    const messages = await Message.find({ chat_id: data.chat_id }).populate({ path: "sender_id", select: "username avatar" }).sort({ createAt: -1 })
    io.to(data.chat_id).emit('load', messages)
    // console.log(socket.rooms      )
  })

  socket.on('leave', async (data) => {
    socket.leave(data.chat_id)
    // console.log('leaving',data.chat_id)
  })


  socket.on('send', async (data) => {
    if (!data.token) return false
    // console.log('sending',data)
    const decoded = jwt.verify(data.token, process.env.JWT_SECRET)
    const user_id = decoded.user_id
    let message = new Message({
      sender_id: user_id,
      chat_id: data.chat_id,
      text: data.text
    })
    let savedMessage = await message.save()
    savedMessage = await savedMessage.populate(({ path: "sender_id", select: "username avatar" }))
    io.to(data.chat_id).emit('new', savedMessage)
    // console.log(savedMessage)
  })

  socket.on('delete', async (data) => {
    console.log('deleting', data.message_id)
    if (!data.token) return false
    const decoded = jwt.verify(data.token, process.env.JWT_SECRET)
    const user_id = decoded.user_id
    // met 
    let deleted = await Message.findOneAndDelete({ sender_id: user_id, _id: data.message_id })
    io.to(data.chat_id).emit('delete', data.message_id)
  })

  socket.on('theme', async (data) => {
    console.log('theme', data.theme)
    io.to(data.chat_id).emit('theme', data.theme)
  })

});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app