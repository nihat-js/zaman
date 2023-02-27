const UserChat = require("../../models/UserChat")
const Chat = require("../../models/Chat")
const values = [0, 1]


async function main(req, res) {

  const { user_id,chat_id ,  val } = req.body
  if ( !chat_id || !values.includes(val)) {
    return res.status(492).send()
  }
  
  let result = await UserChat.findOneAndUpdate({ user_id, chat_id }, { isMuted : val })
  return res.status(201).send()

}
module.exports = main