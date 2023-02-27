const UserChat = require("../../models/UserChat")
const Chat = require("../../models/Chat")
const folderNameArr = ['request', 'primary', 'secondary', 'trash']
const User = require("../../models/User")


async function main(req, res) {
  const { user_id, folder_name } = req.body
  if (!folder_name || !folderNameArr.includes(folder_name)) {
    return res.status(405).send()
  }
  // console.log('burdayam', folder_name, user_id)
  // { user_id, folder_name }
  let chats = await UserChat.find({ user_id, folder_name, }).sort({ updatedAt: -1, unseen_messages_count: -1 }).populate({ path: "chat_id", }).lean()


  for (let i=0;i<chats.length;i++){
    let id = chats[i].chat_id.users_id[0] != user_id ? chats[i].chat_id.users_id[0] : chats[i].chat_id.users_id[1]
    let user = await User.findById(id).select('username avatar')
    // console.log(user)
    chats[i].chat_id.target = user

  }

  // console.log(chats)

  return res.status(200).json(chats)
}


module.exports = main