const User = require("../../models/User")

async function account (req, res) {
  let { user_id } = req.body
  let user = await User.findById(user_id).select("username email phone_number bio gender").lean()
  return res.status(200).json(user)
}



module.exports = account