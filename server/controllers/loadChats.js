const Chat = require('../models/Chat')
const User = require('../models/User')
async function loadChats(req,res){
  const  {user_id} = req.body
  let chats = await Chat.find({ users : {$in : user_id } })


  let arr = []
  for (let i=0;i<chats.length;i++){
    let id = chats[i]._id
    let target_id = chats[i].users[0]  != user_id ? chats[i].users[0] : chats[i].users[1]
    let target = await  User.findById(target_id)
    let target_username =  target.username
    let target_pp = target.pp

    arr.push({id,target_username, target_pp})
  }


  res.json({message : "Chats loaded successfully", status : true, data : arr})
}

module.exports = loadChats