changePassword = async function (req, res) {

  const { user_id, old_password, new_password } = req.body

  if (!user_id || !old_password || !new_password) {
    return res.status(406)
  }

  const user = await User.findById(user_id)
  const isMatch = await bcrypt.compare(old_password, user.password)

  if (!isMatch) {
    return res.status(405)
  }

  const hash = await bcrypt.hash(new_password, 10)
  user.password = hash
  const savedUser = await user.save()
  if (!savedUser) { return res.status(500) }

  const token = jwt.sign({ user_id: user_id }, process.env.SECRET)

}

module.exports = changePassword