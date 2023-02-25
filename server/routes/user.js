const route  = require('express').Router()


const suggested  = require("../controllers/user/suggested")
const profile = require("../controllers/user/profile")
const account = require("../controllers/user/account")
const avatarSet = require("../controllers/user/avatarSet")
const avatarUpload = require("../controllers/user/avatarUpload")

route.post('/suggested',suggested)
route.post('/profile',profile)
route.post('/account',account)
route.post("/avatar/set",avatarSet  )
route.post("/avatar/upload",avatarUpload)




module.exports = route