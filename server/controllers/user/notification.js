const Notification = require("../../models/Notification")

async function notification (req,res){
  const {user_id} = req.body
  const result = await Notification.find({whom_id : user_id}).lean()


  return res.status(201).json(result)

}

module.exports = notification