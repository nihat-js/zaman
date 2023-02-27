const User = require("../../models/User")


async function accountEdit(req, res) {
  let { user_id, username, email, phone_number, bio, gender } = req.body
  let obj = {}


  if (username) {
    username = username.trim().toLowerCase()
    let isExists = await User.findOne({ username: username })
    if (isExists) {
      return res.status(406).json({ message: "Username already exists", })
    } else {
      obj.username = username
    }
  }
  if (email) {
    let isExists = await User.findOne({ email: email })
    if (isExists){
      return  res.status(406).json({ message: "Email already exists", })
    }else{
      obj.email = email
    }
  }
  if (phone_number) {
    obj.phone_number = phone_number
  }
  if (bio && bio.length < 120) {
    obj.bio = bio
  }
  if (gender && [0, 1, 2].includes(gender)) {
    obj.gender = gender
  }

  console.log('bil bunu',obj)
  let result = await User.findByIdAndUpdate(user_id, { ...obj }, ).select('username email phone_number bio gender')
  return res.status(200).json(result)


}

module.exports = accountEdit
