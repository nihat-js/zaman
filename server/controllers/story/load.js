const User = require("../../models/User")
const Follow = require("../../models/Follow")
module.exports = async function load (){
  const {user_id} = req.body

  
 let list = await   Follow.find( {who_id : user_id , "whom_id.stories_count"   : { $gt : 0 }  }).populate({ path : "whom_id" , select : "stories_count" })

 console.log(list)




}