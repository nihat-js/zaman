require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose =  require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${server.address().port}`)
})

app.get('/register',(req,res)=>{
  
})


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, ()=>{
  console.log("Connected to MongoDB")
})
