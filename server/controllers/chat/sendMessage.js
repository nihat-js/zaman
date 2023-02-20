const Chat = require("../../models/Chat")
const Message = require("../../models/Message")
async function index(req,res){
  const {text,user_id , chat_id} = req.body  
  if (!text|| !chat_id){
    return res.status(406).send()
  }

  const chat = await Chat.findById(chat_id)
  if (!chat){
    return res.status(402).send()
  }
  if ( !chat.users.includes(user_id) ){
    return res.status(403).send()
  }

  const message = new Message({
    text,
    sender_id : user_id,
    chat_id,
  })
  const savedMessage = await message.save()
  chat.last_message = last_message
  const savedChat = await chat.save() 

  if (!savedMessage || !last_message ){
    return res.status(500).send()
  }

  return res.status(200)

}