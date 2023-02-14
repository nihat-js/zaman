const Message = require('../../models/Message')
const Chat = require('../../models/Chat')
async function loadMessages(req, res) {

  let { chat_id , user_id , limit , skip } = req.body
  limit =  parseInt(limit)
  skip = parseInt(skip)


  if (!limit  || isNaN(limit) || limit > 15 || limit < 1    ){
    limit = 15
  }
  if (!skip  || isNaN(skip) || skip < 1    ){
    skip = 0
  }

  if (!chat_id) {
    return res.json({ message: "Invalid Data", status: false })
  }

  const hasAccessToChat = await Chat.findOne({_id : chat_id ,users_id :  { $in : user_id } })
  if (!hasAccessToChat){
    return res.json({message:"You don't have access to this chat", status : false})
  }

  let messages = await Message.find({ chat_id  : chat_id}).sort({createdAt : -1 }).limit(limit).skip(skip)
  let arr = []


  

  for (let i = 0; i < messages.length; i++) {

    let type = user_id == messages[i].sender ? 'sent' : 'received'
    let text = messages[i].text
    arr.push({ type, text })
  }

  res.json({ message: "Messages loaded successfully", status: true, data: arr })

}


module.exports = loadMessages