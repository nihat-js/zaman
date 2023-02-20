const Chat = require('../../models/Chat')
const Chat = require("../../models/Chat")
const UserChat = require("../../models/UserChat")

async function  index (req,res){
  const { user_id  ,target_username , }  = req.body 
  if (!target_username){
    return res.status(404).send()
  }
  target_username = target_username.toLowerCase()
  const target = await User.findOne({username:target_username}).lean()
  if (!target){
    return res.status(405).send()
  }
  const target_id = target._id



  let isChatExists  = await Chat.findOne({users_id : { $in : target_id , $size : 2 }  })
  if (!isChatExists){
    const chat = new Chat ({      users_id : [target_id, user_id], })
    let savedChat = new chat.save()
    if (!savedChat){   return res.status(500).send() }

    const userChat = new UserChat({
      user_id ,
      chat_id : savedChat._id,
    })

    const savedUserChat = new userChat.save()
    if (!savedChat) {  return res.status(500).send() }

    return savedChat._id

  }else{
    return  res.status(200).json({chat_id : isChatExists._id  })
  }

}