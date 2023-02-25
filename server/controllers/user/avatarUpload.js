const User = require("../../models/User")

async function avatarUpload() {
  console.log('started')
  let allowedExtensions = ['png', 'jpg', 'jpeg',]
  let { image } = req.files
  let { user_id } = req.body

  if (!image) {
    return res.status(400).send()
  }
  let ext = image.name.split(".").pop()
  let isAllowed = allowedExtensions.includes(ext)
  if (!isAllowed) return res.status(466).send()
  let fileName = new Date().getTime() + "." + ext;
  try {
    await req.files.image.mv("storage/avatars/" + fileName,)
    let user = await User.findById(user_id)
    if (user.avatar) {
      fs.unlinkSync("../../storage/avatars" + user.avatar)
    }
    user.avatar = fileName
    let result = await user.save()
    if (!result) return res.statut(503).save()
    res.status(200).send()
  } catch (err) {
    console.log(err)
  }


}
module.exports = avatarUpload