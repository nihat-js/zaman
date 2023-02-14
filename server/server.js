require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose =  require('mongoose')
const app = express()







// const schema = new graphQl.GraphQLSchema({query : })

// //middlewares

// const auth  = require('./middlewares/auth')

// //controllers
// const register = require('./controllers/register')
// const login = require('./controllers/login')

// const sendMessage = require('./controllers/message/sendMessage')
// const loadMessages = require('./controllers/message/loadMessages')
// const loadChats = require('./controllers/chat/loadChats')
// const followUser = require('./controllers/followUser')
// const getUserStats = require("./controllers/getUserStats")
// const post = require('./controllers/post')
// const getUserPosts = require('./controllers/getUserPosts')
// const reactToPost = require('./controllers/reactToPost')
// const isReactedToPost = require('./controllers/post/isReactedToPost')
// const getExplorePosts = require('./controllers/getExplorePosts')
// const addComment = require('./controllers/comment/addComment')

const message = require('./controllers/message/index')



app.use(cors())
app.use(express.json())


// app.post('/register',register)
// app.post('/login',login)


app.post('/message',message)


// app.post("/load-chats",auth,loadChats)
// app.post("/send-message",auth,sendMessage)
// app.post("/load-messages",auth,loadMessages)
// app.post("/follow-user",auth,followUser)

// app.post('/get-user-stats',getUserStats)
// app.post('/get-user-posts',getUserPosts)
// app.post('/post',auth,post)
// app.post('/react-to-post',auth,reactToPost)
// app.post('/get-explore-posts',auth,getExplorePosts)
// app.post('/is-reacted-to-post',auth,isReactedToPost)
// app.post('/add-comment',auth,addComment)



const server = app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on port ${server.address().port}`)})
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, ()=>{  console.log("Connected to MongoDB")})


