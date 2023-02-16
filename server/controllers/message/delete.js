const Message = require('../../models/Message')
async function index(req,res){
  let {user_id ,message_id } = req.body
  if (!user_id ||!message_id) {
    return res.json({message : "Invalid data"})
  }

  const messages = await Message.find({user_id : user_id,message_id wwwwww})

}


module.exports = index