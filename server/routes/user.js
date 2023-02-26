const route  = require('express').Router()


const suggested  = require("../controllers/user/suggested")
const profile = require("../controllers/user/profile")
const account = require("../controllers/user/account")
const avatarSet = require("../controllers/user/avatarSet")
const avatarUpload = require("../controllers/user/avatarUpload")
const accountEdit = require("../controllers/user/accountEdit")
const changePassword = require('../controllers/user/changePassword')

route.post('/suggested',suggested)
route.post('/profile',profile)
route.post('/account',account)
route.post('/account/edit',  accountEdit )
route.post("/avatar/set",avatarSet  )
route.post("/avatar/upload",avatarUpload)
route.post("/account/change-password",changePassword)




module.exports = route