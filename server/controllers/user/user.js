const User = require('../../models/User')
const Follow = require('../../models/Follow')
const bcrypt = require('bcrypt')
const path = require('path')
const allowedExtension = ['png', 'jpg', 'jpeg'];
const sampleNames = [  "sample-1.svg",   "sample-2.svg", "sample-3.svg","sample-4.svg" ]


exports.suggestedProfiles =  async function suggestedProfiles(req, res) {
  const { user_id } = req.body
  let users = await User.find({ _id: { $ne: user_id } }).select("_id username avatar privacy ").lean()


  for (let i = 0; i < users.length; i++) {
    const isFollowing = await Follow.findOne({ who_id: user_id, whom_id: users[i]._id })
    !isFollowing ? users[i].isFollowing = false : users[i].isFollowing = true
  }
  return res.status(200).json(users)


}


exports.profile = async function profile(req, res) {
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
  }

  return res.status(200).json(target)
}

exports.editBio = async function (req, res) {
  const { user_id, bio } = req.body
  if (!user_id || !bio || bio.length > 250) {
    return res.status(406).send()
  }

  let result = await User.findByIdAndUpdate(user_id, { bio })
  if (!result) { return res.status(500) }
  return res.status(200).send()
}


exports.changePassword = async function (req, res)  {

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




async function index(req, res) {


  const file = req.files.image;

  if (file) {
    const extension = file.name.split('.').pop();
    if (!allowedExtension.includes(extension)) {
      return res.status(422).send("Invalid Image");
    }

    const { user_id } = req.body
    const newfileName = user_id + "." + extension
    const filePath = __dirname + "../../../../storage/pp/" + newfileName
    file.mv(filePath, async (err) => {
      if (err) return res.status(500).json(err);

      const user = await User.findById(user_id)
      user.pp = newfileName

      const savedUser = await user.save()
      if (!savedUser)
        return res.status(500).json({ message: "Internal Server Error" })

      return res.send({ status: true });
    });
  }
  else {
    const sampleName = req.body.sample_name
    if (sampleNames.includes(sampleName)) {
      return res.status(422).json("Invalid Sample Name")
    } else {
      const user = await User.findById(req.body.user_id)
      user.avatar = sampleName
      const savedUser = await user.save()
      if (!savedUser) {
        return res.status(422).json("Something went wrong")
      }
      res.status(200).json({ status: true })
    }
  }





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
