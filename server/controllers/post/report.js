const Report = require("../../models/Report")



async function report(req,res){
  const {user_id , argument,   post_id} = req.body

  if ( !argument || !post_id ||   ![0,1,2,3,4].includes(argument) ){
    return res.status(461).send()
  }
  let isExists = await Report.findOne({who_id : user_id, model : "post" ,model_id : post_id  })

  if (isExists){
    return res.status(206).send()
  }

  let report = new Report({
    who_id : user_id, 
    model  : "post",
    model_id : post_id,
    argument ,
  })

  let saved = report.save()

  return res.status(201).send()

}

module.exports = report