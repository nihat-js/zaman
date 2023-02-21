const UserChat = require("../../models/UserChat")
const foldeNameArr = ['request','primary','secondary','trash']
async function main (req,res){
  const {user_id , folder_name , chat_id} = req.body
  if (!folder_name){
    return res.status(400).send()
  }
  if (!foldeNameArr.includes(folder_name)){
    return res.status(401).send()
  }

  const result = await UserChat.findOneAndUpdate({user_id , chat_id ,   },{folder_name  })

  if (!result){
    return res.status(500).send()
  }


}
module.exports = main