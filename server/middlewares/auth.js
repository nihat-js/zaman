const jwt = require('jsonwebtoken');
const User = require('../models/User');



async function auth(req, res, next) {
  let { token } = req.body
  if (!token) {
    return res.json({ message: "Invalid data" })
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  console.log(decoded)
  
  let user = await User.findById(decoded.user_id)
  if (!user) {
    return res.json({ message: "Invalid dataa" })
  }
  
  if (user.active_device?.session == decoded.session) {
    console.log('zib')
    req.body.user_id = decoded.user_id
    console.log("Authentication successfull")
    next()
  }
}


module.exports = auth