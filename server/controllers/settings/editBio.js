async function index (req,res){
  const {user_id , bio} = req.body
  if (!user_id || !bio){
    return res.status(406)
  }
  if (bio.length > 200){
    return res.status(407)
  }

  const user = await User.findById(user_id)
  user.bio = bio
  const savedUser = await user.save()
  if (!savedUser){
    return res.status(500)
  }
  return res.status(200)

}