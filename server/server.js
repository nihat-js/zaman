require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose =  require('mongoose')
const app = express()


//middlewares
const auth  = require('./middlewares/auth')

//controllers
const register = require('./controllers/register')
const login = require('./controllers/login')

const sendMessage = require('./controllers/sendMessage')
const loadMessages = require('./controllers/loadMessages')
const loadChats = require('./controllers/loadChats')



app.use(cors())
app.use(express.json())



app.post('/register',register)
app.post('/login',login)
app.post("/load-chats",auth,loadChats)
app.post("/send-message",auth,sendMessage)
app.post("/load-messages",auth,loadMessages)





const server = app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on port ${server.address().port}`)})
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, ()=>{  console.log("Connected to MongoDB")})


