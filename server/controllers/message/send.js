const Chat = require('../../models/Chat')
const Message = require('../../models/Message')


async function sendMessage(req,res){

  let {user_id,text,chat_id} = req.body
  if (!  (user_id && text && chat_id ) ){
    return res.json({message:"Invalid Data", status : false})
  }

  const hasAccessToChat = await Chat.findOne({_id : chat_id ,users_id :  { $in : user_id } })
  if (!hasAccessToChat){
    return res.json({message:"You don't have access to this chat", status : false})
  }
  

  const message = new Message({
    text,
    sender_id : user_id,
    chat_id
  })

  const savedMessage = await message.save()
  if (!savedMessage){
    return  res.json({message : "Could not send message", status : false})
  }
  res.json({message : "Message sent successfully", status : true, data : savedMessage})
}

module.exports = sendMessage