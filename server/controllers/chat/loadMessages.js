const Message = require("../../models/Message")
const UserChat  = require("../../models/UserChat")
async function main(req,res) {
  const {user_id , chat_id} = req.body

  const chat = await UserChat.findOne({user_id , chat_id})

  if (!chat){
    return res.status(488).send() // no access
  }

  const messages = await Message.find({chat_id}).populate({
    path : 'sender_id',
    select : "username avatar"
  })

  return res.status(201).json(messages)


}

module.exports = main