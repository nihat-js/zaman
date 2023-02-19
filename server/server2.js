require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const path = require('path')
//middlewares
const auth = require('./middlewares/auth')
//routes
const message = require('./routes/message')
const entry = require('./routes/entry')
const chat = require('./routes/chat')
const settings = require('./routes/settings')
const get= require('./routes/get')

// controllers
const follow = require('./controllers/follow/follow')
const unfollow = require('./controllers/follow/unfollow')


app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use(express.static('storage'))
app.use('/api/entry/',entry)
app.use('/api/message/',auth,message)
app.use('/api/chat/',auth,chat)
app.use('/api/settings',auth,settings)
app.use('/api/get/',get)

app.post('/api/follow',auth,follow)
app.post('/api/unfollow',auth,unfollow)


const server = app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on port ${server.address().port}`)})
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, ()=>{  console.log("Connected to MongoDB")})
