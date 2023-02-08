const User = require('../models/User')

async function getUserStats() {
  let { target_username } = req.body
  if (!target_username) {
    return res.json({ message: "Invalid data", status: false })
  }

  let target = await User.findOne({ username: target_username })
  if (!target) {
    return res.json({ message: "User not found", status: false })
  }

  let stats = {
    followings_count: target.followings_count,
    followers_count: target.followers_count,
    posts_count: target.posts_count,
  }

  res.json({message : "Successfull" , status : true, data : stats})

}

module.e