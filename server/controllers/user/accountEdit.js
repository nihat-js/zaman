const User = require("../../models/User")


async function accountEdit (req, res) {
  let { user_id, username, email, phone_number, bio, gender } = req.body

  let obj = {}

  if (username) {
    username = username.trim().toLowerCase()
    let isExists = await User.findOne({ username: username })
    isExists ? res.status(406).json({ message: "Username already exists", }) : obj.username = username
  }
  if (email) {
    let isExists = await User.findOne({ email: email })
    isExists ? res.status(406).json({ message: "Email already exists", }) : obj.email = email
  }
  if (phone_number) {
    obj.phone_number = phone_number
  }
  if (bio && bio.length < 12) {
    obj.bio = bio
  }
  if (gender && ['male', 'female'].includes(gender)) {
    obj.gender = gender
  }

}

module.exports = accountEdit
