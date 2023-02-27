const Chat = require("../../models/Chat")
const UserChat = require("../../models/UserChat")
const Message = require("../../models/Message")


async function main(req, res) {
  const { text, user_id, chat_id } = req.body
  console.log('c',chat_id)
  if (!text || !chat_id) {
    return res.status(406).send()
  }

  const userChat = await UserChat.findOne({chat_id, user_id})
  if (!userChat) {
    return res.status(406).send()
  }
  const message = new Message({
    text,
    sender_id: user_id,
    chat_id,
  })
  const savedMessage = await message.save()
  if (!savedMessage) {
    return res.status(432).send()
  }

  const members = await Chat.findById(chat_id)
  const target = members.users_id[0] == user_id ? members.users_id[1] : members.users_id[0]
  console.log('target',target)
  const update = await UserChat.findOneAndUpdate({ chat_id, user_id: target._id }, { $inc: { unseen_messages_count: 1 } })

  return res.status(200).send()

}




module.exports = main