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






// controllers
const follow = require('./controllers/follow/follow')
const unfollow = require('./controllers/follow/unfollow')
const search = require('./controllers/search')


app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use(express.static('storage'))
app.use('/api/entry/', entry)
// app.use('/api/message/',auth,message)
app.use('/api/chat/', auth, chat)
app.use("/api/post/", auth, post)
app.use("/api/comment/", auth, comment)
app.use("/api/admin", adminAuth, admin)

app.use("/api/user/", auth, user)

app.post('/api/follow', auth, follow)
app.post('/api/unfollow', auth, unfollow)
app.post('/api/search', search)


app.post('/ok', (req, res) => res.send('ok'))


app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on ${process.env.PORT} `) })
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, () => { console.log("Connected to MongoDB") })


const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });
const User = require("./models/User")
global.users = []



io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  let socket_id = socket.id

  socket.on('register', async (token) => {
    if (!token) return false
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('foo')
    let user = await User.findById(decoded.user_id)
    global.users.push( { socket_id, user_id : decoded.user_id })
    console.log('a',global.users)
  })

  socket.on('message', (data) => {
    console.log(`Received message from client ${socket.id}: ${data}`);

    // Broadcast the message to all connected clients except for the sender
    socket.broadcast.emit('message', data);
  });

  // Set up a disconnect event listener for this client
  socket.on('disconnect', () => {
    global.users =  global.users.filter( i => i.socket_id != socket.id )
    console.log(`Client disconnected: ${socket.id}`);
    console.log(global.users)
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});