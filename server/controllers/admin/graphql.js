const User = require("../../models/User")
const Post = require("../../models/Post")
const Comment = require("../../models/Comment")
const Report = require("../../models/Report")
const { validateSortObj } = require("./validations")

async function main(req, res) {
  let { model, sortObj } = req.body
  let validatedSortObj = {}
  if (model == "user") {
    typeof sortObj == "object" &&   Object.keys(sortObj).length>0  ?  validatedSortObj = validateSortObj(User,sortObj) : {}
    // console.log("val",validatedSortObj)
    let users = await User.find().sort(validatedSortObj)
    return res.status(200).json(users)
  }
  
  else if (model == "post") {
    typeof sortObj == "object" &&   Object.keys(sortObj).length>0  ?  validatedSortObj = validateSortObj(User,sortObj) : {}
    // console.log('a',sortObj)
    let posts = await Post.find().sort({ createdAt: -1 }).populate({
      path : "author_id",
      select : "username avatar"
    })
    return res.status(200).json(posts)
  }else if(model == "report" ) {

    let report = await Report.find()
    return res.status(200).json(report)
  }
  else{
    return res.status(409).send() // wrong model
  }
  

 

}

module.exports = main