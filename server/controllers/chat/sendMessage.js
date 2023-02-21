const Chat = require("../../models/Chat")
const UserChat = require("../../models/UserChat")

const Message = require("../../models/Message")
async function main (req,res){
  const {text,user_id , chat_id} = req.body  
  if (!text|| !chat_id){
    return res.status(406).send()
  }

  const UserChat = await Chat.findById(chat_id , user_id)
  if (!UserChat){
    return res.status(406).send()
  }


  const message = new Message({
    text,
    sender_id : user_id,
    chat_id,
  })

  const savedMessage = await message.save()
  if (!savedMessage){
    return  res.status(432).send()
  }

  return res.status(200)

}

module.exports = main