const bcrypt = require('bcrypt')
const User = require('../../models/User')

let user_id, user, action

// action types

// 10 - set avatar

async function main(req,res) {
  user_id = req.body.user_id
  action = req.body.action

  let user = await User.findById(user_id)

  if (action.type == "set_avatar"){
    
  }


  // if (action.type == "privacy") {
  //   changePrivacy()
  // }else if (action.type=="change_password"){
  //   changePassword()
  // }else 
}

async function changePassword() {

}


async function changePrivacy(req, res) {
  const { val, user_id } = req.body
  if (val != 0 && val != 1) {
    return res.json({ message: "Invalid data", status: false })
  }
  const user = await User.findById(user_id)
  if (!user) {
    return res.json({ message: "User not found", status: false })
  }
  user.privacy = val
  const savedUser = await user.save()

  if (!savedUser) {
    return res.json({ message: "Something went wrong", status: false })
  }

  return res.json({ message: "User privacy changed", status: true })
}



module.exports = main