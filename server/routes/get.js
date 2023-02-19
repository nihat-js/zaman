const route  = require('express').Router()
const auth = require('../middlewares/auth')

const suggestedProfiles = require('../controllers/get/suggestedProfiles')


route.post('/suggested-profiles',auth,suggestedProfiles)

module.exports = route