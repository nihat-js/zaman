const User = require("../../models/User")


async function main (req,res){
  const {target_id , reason , duration ,message } =  req.body

  if (!target_id , !reason , !duration){
    return res.status(406).send() // Missing parametrs
  }

}