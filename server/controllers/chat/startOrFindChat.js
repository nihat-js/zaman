const Chat = require('../../models/Chat')
const UserChat = require("../../models/UserChat")
const User = require("../../models/User")
async function main(req, res) {
  let { user_id, target_username, } = req.body

  if (!target_username) {
    return res.status(404).send()
  }
  target_username = target_username.toLowerCase()
  const target = await User.findOne({ username: target_username }).select("_id ")
  if (!target) {
    return res.status(405).send()
  }
  console.log('me and target',user_id,target._id) 
  const target_id = target._id
  
  let isChatExists = await Chat.findOne({ users_id: { $in: target_id, $size: 2 } })
  if (isChatExists) {
    return res.status(200).json({ chat_id: isChatExists._id })
  }
  
  
  const chat = new Chat({ users_id: [target_id, user_id], })
  // console.log(chat)
  let savedChat = await chat.save()
  if (!savedChat) { return res.status(500).send() }
  



  const userChat = new UserChat({
    user_id : user_id,
    folder_name: "primary",
    chat_id: savedChat._id,
  })
  const targetUserChat = new UserChat({
    user_id: target_id,
    chat_id: savedChat._id,
    folder_name: "request"
  })
  const savedUserChat = await userChat.save()
  const savedTargetUserChat = await targetUserChat.save()
  if (!savedUserChat || !savedTargetUserChat) {
    return res.status(500).send()
  }
  return res.status(200).json({ chat_id: savedChat._id })


}


module.exports = main