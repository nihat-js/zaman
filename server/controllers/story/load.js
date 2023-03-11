const User = require("../../models/User")
const Follow = require("../../models/Follow")
module.exports = async function load(req, res) {
  const { user_id } = req.body

  console.log('story load')

  let all = await Follow.find({ who_id: user_id, }).populate({ path: "whom_id", select: "stories_count username avatar", }).lean()
  let arr = []

  for (let i = 0; i < all.length; all++) {
    if (all[i].whom_id.stories_count > 0)
      arr.push(all[i].whom_id)
  }

  
  res.status(202).json(arr)




}