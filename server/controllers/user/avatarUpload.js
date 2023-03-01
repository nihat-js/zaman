const User = require("../../models/User")
const fs = require("fs")
const path = require("path")
const samples = ['sample-1.svg','sample-2.svg','sample-3.svg','sample-4.svg','sample-5.svg','sample-6.svg','sample-6.svg','sample-7.svg','sample-8.svg']
async function avatarUpload(req,res) {
  let allowedExtensions = ['png', 'jpg', 'jpeg',]
  let { file } = req.files
  let { user_id } = req.body
  
  if (!file) {
    return res.status(400).send()
  }
  console.log('started')
  let ext = file.name.split(".").pop()
  let isAllowed = allowedExtensions.includes(ext)
  if (!isAllowed) return res.status(466).send()
  let fileName = new Date().getTime() + "." + ext;
  try {
    await file.mv("storage/avatars/" + fileName,)
    let user = await User.findById(user_id)
    if (user.avatar ['sample-1.sv']  && !samples.includes(user.avatar) ) {
      fs.unlinkSync( path.join (__dirname  + '../../storage/avatars/', user.avatar )  )
    }
    user.avatar = fileName
    console.log('file name',fileName)
    let result = await user.save()
    if (!result) return res.statut(503).save()
    res.status(200).json({avatar : fileName})
  } catch (err) {
    console.log(err)
  }


}
module.exports = avatarUpload