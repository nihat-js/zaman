const Chat = require("../../models/Chat")
const UserChat = require("../../models/UserChat")
const User = require("../../models/User")
async function main(req, res) {
  let { user_id, target_username, } = req.body

  if (!target_username) {
    return res.status(404).send()
  }
  target_username = target_username.toLowerCase()
  // console.log(target_username)
  const target = await User.findOne({ username: target_username }).lean().select("_id ")
  if (!target) {
    return res.status(405).send()
  }
  const target_id = target._id


  let isChatExists = await Chat.findOne({ users_id: { $in: target_id, $size: 2 } })
  if (isChatExists) {
    return res.status(200).json({ chat_id: isChatExists._id })
  }

  if (!isChatExists) {
    const chat = new Chat({ users_id: [target_id, user_id], })
    // console.log(chat)
    let savedChat = await chat.save()
    if (!savedChat) { return res.status(500).send() }

    const userChat = new UserChat({
      user_id,
      chat_id: savedChat._id,
      folder_name: "primary",
    })
    const targetUserChat = new UserChat({
      user_id  :  target_id,
      chat_id: savedChat._id,
      folder_name: "request"
    })
    const savedUserChat = userChat.save()
    const savedTargetUserChat = targetUserChat.save()
    if (!savedUserChat || !savedTargetUserChat){
      return res.status(500).send()
    }
    return res.status(200).json({ chat_id: savedChat._id })
  }

  return res.status(200).json({ chat_id: isChatExists._id })

}


module.exports = main