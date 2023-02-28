const jwt = require('jsonwebtoken');
const User = require('../models/User');



async function auth(req, res, next) {
  let { token } = req.body
  if (!token) {  return res.status(406).send()  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  // console.log(decoded)
  let user = await User.findById(decoded.user_id)
  if (!user) {
    return res.status(401).send()
  }
  
  // console.log('verifying',token,);
  // if (user.active_device?.session == decoded.session) {
    req.body.user_id = decoded.user_id
    // console.log("Authentication successfull")
    next()
  // }
}


module.exports = auth