async function sendMessage(req,res){
  // const sender = "63e0c7c9929c725bdb4caecf"
  // const receiver = "63e0c7c9929c725bdb4caecf"

  if (!req.body.sender ||!req.body.receiver || !req.body.text || !req.body.chatId){
    return res.json({message:"Invalid Data", status : false})
  }

  let  {sender,receiver,text} = req.body
  const message = new Message({text,sender,receiver,chatId  })  

  const savedMessage = await message.save()
  if (!savedMessage){
    return  res.json({message : "Could not send message", status : false})
  }
  res.json({message : "Message sent successfully", status : true, data : savedMessage})
}