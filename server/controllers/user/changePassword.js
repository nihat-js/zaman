const bcrypt = require('bcrypt')
const User = require("../../models/User")
const jwt = require("jsonwebtoken")
async function changePassword(req, res) {

  const { user_id, old_password, new_password  } = req.body

  if (!user_id || !old_password || !new_password ||new_password.length< 6 ) {
    return res.status(406).send()
  }

  const user = await User.findById(user_id)
  const isMatch = await bcrypt.compare(old_password, user.password)

  if (!isMatch) {
    return res.status(489).send()
  }

  const hash = await bcrypt.hash(new_password, 10)
  // console.log("hash",hash, user.password)
  // if (user.password == hash){
  //   return res.status(456) // you can not use old password
  // }

  user.password = hash

  const active_device = {
    session: require('crypto').randomBytes(32).toString('hex'),
    ip: req.header('x-forwarded-for') || req.socket.remoteAddress,
    user_id: user._id
  }
  user.active_device = active_device


  const savedUser = await user.save()
  if (!savedUser) { return res.status(500) }

  // const token = jwt.sign({ active_device }, process.env.SECRET)
  return res.status(200).send()

}

module.exports = changePassword