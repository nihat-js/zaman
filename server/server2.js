require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
//middlewares
const auth = require('./middlewares/auth')
//routes
const message = require('./routes/message')
const entry = require('./routes/entry')
const chat = require('./routes/chat')
const settings = require('./routes/settings')


app.use(express.json())
app.use(cors())
app.use(fileUpload())


app.use('/api/entry/',entry)
app.use('/api/message/',auth,message)
app.use('/api/chat/',auth,chat)
app.use('/api/settings',auth,settings)


const server = app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on port ${server.address().port}`)})
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, ()=>{  console.log("Connected to MongoDB")})
