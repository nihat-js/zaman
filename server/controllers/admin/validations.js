const User = require("../../models/User")

function validateSortObj(model, obj) {
  let newObj = {}
  let forbidden = ["password",]
  let keys = Object.keys(User.schema.paths);
  let values = [-1,0,1]
  for (let x in obj) {
    if (typeof x == "string" && !forbidden.includes(x) && keys.includes(x)  &&  values.includes( obj[x])   )
    newObj[x] = obj[x]
  }
  return  newObj
}



module.exports = {validateSortObj}