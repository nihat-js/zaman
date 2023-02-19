const jwt = require('jsonwebtoken');
const User = require('../models/User');



async function auth(req, res, next) {
console.log('verifying');
  let { token } = req.body
  if (!token) {
    return res.status(406)
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  // console.log(decoded)
  let user = await User.findById(decoded.user_id)
  if (!user) {
    return res.status(401)
  }
  
  if (user.active_device?.session == decoded.session) {
    req.body.user_id = decoded.user_id
    console.log("Authentication successfull")
    next()
  }
}


module.exports = auth