require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
//routes
const message = require('./routes/message')
const entry = require('./routes/entry')

app.use(express.json())
app.use(cors())


app.use('/api/message/',message)
app.use('/api/entry/',entry)


const server = app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on port ${server.address().port}`)})
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, ()=>{  console.log("Connected to MongoDB")})
