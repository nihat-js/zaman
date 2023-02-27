require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const path = require('path')
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
app.use('/api/entry/',entry)
// app.use('/api/message/',auth,message)
app.use('/api/chat/',auth,chat)
app.use("/api/post/",auth,post)
app.use("/api/comment/",auth,comment)
app.use("/api/admin",adminAuth,admin)

app.use("/api/user/",auth,user)

app.post('/api/follow',auth,follow)
app.post('/api/unfollow',auth,unfollow)
app.post('/api/search',search)


app.post('/ok',(req,res) => res.send('ok') )


const server = app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on port ${server.address().port}`)})
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, ()=>{  console.log("Connected to MongoDB")})
