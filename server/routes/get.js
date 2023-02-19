const route  = require('express').Router()
const auth = require('../middlewares/auth')

const suggestedProfiles = require('../controllers/get/suggestedProfiles')
const homePosts = require('../controllers/get/homePosts')
const targetProfile = require('../controllers/get/targetProfile')

route.post('/suggested-profiles',auth,suggestedProfiles)
route.post('/home-posts',auth,homePosts)
route.post('/target-profile',auth,targetProfile)
module.exports = route