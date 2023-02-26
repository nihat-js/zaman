const User = require("../../models/User")
const Follow = require("../../models/Follow")
  async function profile(req, res) {
  const { user_id, target_username } = req.body
  // console.log("target" , target_username)
  let target = await User.findOne({ username: target_username }).
    select("username avatar followings_count followers_count posts_count bio cake_day ").lean()

  if (!target) { return res.status(404).send() }
  let target_id = target._id
  if (target_id == user_id) {
    return res.status(200).send()
  }

  let isFollowing = await Follow.findOne({ who_id: user_id, whom_id: target_id })
  if (isFollowing) {
    target.isFollowing = true
  }else{
    target.isFollowing = false
  }

  return res.status(200).json(target)
}

module.exports = profile