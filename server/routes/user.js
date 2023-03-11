const route = require('express').Router()
const {followingsList , followersList } = require("../controllers/user/list")

route.post('/suggested', require("../controllers/user/suggested"))
route.post('/profile', require("../controllers/user/profile"))
route.post('/account', require("../controllers/user/account"))
route.post('/account/edit', require("../controllers/user/accountEdit"))
route.post("/avatar/set", require("../controllers/user/avatarSet"))
route.post("/avatar/upload", require("../controllers/user/avatarUpload"))
route.post("/account/change-password", require('../controllers/user/changePassword'))
route.post('/notification', require("../controllers/user/notification"))
route.post('/follow',require("../controllers/user/follow"))
route.post('/unfollow',require("../controllers/user/unfollow"))

route.post('/list/followers', followersList)
route.post('/list/followings',  followingsList )



module.exports = route