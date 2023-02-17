
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
