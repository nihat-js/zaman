const Message = require('../../models/Message')

async function loadMessages(req, res) {

  const { chat_id , user_id } = req.body


  if (!chat_id) {
    return res.json({ message: "Invalid Data", status: false })
  }
  let messages = await Message.find({ chat_id  : chat_id})
  let arr = []

  // let user = await User.findById(user_id)
  // let user_pp = user.pp

  

  for (let i = 0; i < messages.length; i++) {

    let type = user_id == messages[i].sender ? 'sent' : 'received'
    let text = messages[i].text
    arr.push({ type, text })
  }

  res.json({ message: "Messages loaded successfully", status: true, data: arr })

}


module.exports = loadMessages