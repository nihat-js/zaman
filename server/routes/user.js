const route  = require('express').Router()

const  {suggestedProfiles ,profile  } = require("../controllers/user/user")

route.post('/suggested-profiles',suggestedProfiles)
route.post('/profile',profile)
module.exports = route