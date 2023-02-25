const route  = require('express').Router()

const  {suggestedProfiles ,profile , account , accountEdit , avatarSet  } = require("../controllers/user/user")

route.post('/suggested-profiles',suggestedProfiles)
route.post('/profile',profile)
route.post('/account',account)
route.post("/avatar/set",(req,res)  => res.send('printer')  )



route.post('/ok',(req,res) => res.json({message: 'bbbb'}) )

module.exports = route