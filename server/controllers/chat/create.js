const Chat = require('../../models/Chat')
const User = require('../../models/User')
async function index(req, res) {
  const { user_id, target_username } = req.body
  
  if (!target_username) {
    return res.json({ message: "Invalid data " })
  }

  const target = await User.findOne({ username: target_username })
  const target_id = target._id

  const isChatExists = await Chat.findOne({ users_id: { $size: 2, $all: [user_id, target_id] } })
  if (isChatExists) {
    return res.json({ message: "Already exists" })
  }

  const chat = new Chat({
    users_id : [user_id, target_id]
  })

  const savedChat = await chat.save()
  if (!savedChat){
    return res.json({ message: "Something went wrong" })
  }

  res.json({message: "Chat created"})


}


module.exports = index