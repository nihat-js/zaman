const Message = require('../models/messageModel')

async function loadMessages (req,res){
  if (!req.body.chatId){
    return res.json({message:"Invalid Data", status : false})
  }
  let messages = await Message.find({chat_id : req.body.chatId})
  console.log(req.body.chatId)
  res.json({message : "Messages loaded successfully", status : true, data : messages})
  
}


module.exports = loadMessages