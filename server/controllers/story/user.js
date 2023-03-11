const User = require("../../models/User")
const Follow = require("../../models/Follow")
const Story = require("../../models/Story")
module.exports = async function main(req, res) {
  const { user_id, target_username } = req.body
  let  target, target_id
  if (target_username) {
     target = await User.findOne({username : target_username}).select('source created_at')
    target_id = target._id
  } else {
    target_id = user_id
  }


  let userStories = await Story.find({ author_id: target_id })
  //  console.log('target_id', target_id, userStories)
  return res.status(202).json( userStories )




}