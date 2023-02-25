const route  = require('express').Router()

const  {suggestedProfiles ,profile , account , accountEdit , avatarSet  } = require("../controllers/user/user")

// route.post('/suggested-profiles',suggestedProfiles)
// route.post('/profile',profile)

route.post('/account',account)
route.post("/avatar/set",avatarSet)
// route.post('/account/edit',accountEdit)



route.post('/ok',(req,res) => res.json({message: 'bbbb'}) )

module.exports = route