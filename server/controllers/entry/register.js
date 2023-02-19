const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
async function register(req, res) {

  let { username, email, password } = req.body

  if (!(username && email && password)) {
    return res.status(406)
  }
  username = username.toLowerCase().trim()
  email = email.toLowerCase().trim()

  if (username.includes(" ") || email.includes(" ")) {
    return res.status(407)
  }

  const usernameCheck = await User.findOne({ username: username })
  if (usernameCheck) {
    return res.status(402).json({ message: "Username already exists", status: false })
  }
  const emailCheck = await User.findOne({ email: email })
  if (emailCheck) {
    return res.status(402).json({ message: "Email already exists", status: false })
  }

  if (password.length < 6) {
    return res.status(405)
  }

  let hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    username, email, password: hashedPassword
  })

  const active_device = {
    session: require('crypto').randomBytes(32).toString('hex'),
    ip: req.header('x-forwarded-for') || req.socket.remoteAddress,
    user_id: user._id
  }
  user.active_device = active_device



  const userSaved = await user.save()
  if (!userSaved) {
    return res.status(500).json({ message: "Internal Server Error", })
  }
  const obj = {
    username: userSaved.username,
    avatar: userSaved.avatar,
    cake_day: userSaved.cake_day,
  }

  return res.status(200).json({ message: "User registered successfully", token: jwt.sign(active_device, process.env.JWT_SECRET), user: obj })

}

module.exports = register