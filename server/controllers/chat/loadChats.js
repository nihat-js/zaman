const UserChat = require("../../models/UserChat")
const Chat = require("../../models/Chat")
const folderNameArr = ['request', 'primary', 'secondary', 'trash']


async function main(req, res) {
  const { user_id, folder_name } = req.body
  if (!folder_name || !folderNameArr.includes(folder_name)  ) {
    return res.status(405).send()
  }
  
  let arr = await UserChat.find({ user_id , folder_name  }).sort({ updatedAt : -1 , unseen_messages_count : -1 }) .populate({
    path : "chat_id",
    populate : {
      path :"users_id",
      select : "username avatar",
    }
  })

  return res.status(200).json(arr)
}


module.exports = main