const jwt = require('jsonwebtoken');
const User = require('../models/User');



async function adminAuth(req, res, next) {
  let { token } = req.body
  if (!token) {
    return res.status(406).send()
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  // console.log(decoded)
  let user = await User.findById(decoded.user_id)
  if (!user) {
    return res.status(401).send()
  }
  
  if (user.active_device?.session == decoded.session && user.role > 0 ) {
    req.body.user_id = decoded.user_id
    console.log("Admin adminAuth")
    next()
  }
}


module.exports = adminAuth