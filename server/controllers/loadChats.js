const Chat = require('../models/chatModel')

async function loadChats(req,res){
  if (!req.body.userId){
    return res.json({message:"Invalid Data", status : false})
  }
  const  {userId} = req.body
  let chats = await Chat.find({ users : {$in : userId } })


  let arr = []
  for (let i=0;i<chats.length;i++){
    arr.push({id : chats[i]._id,  user_id : chats[i].users[0]})
  }


  res.json({message : "Chats loaded successfully", status : true, data : chats})
}

module.exports = loadChats