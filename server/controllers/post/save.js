const Post = require("./../../models/Post")
const Saved = require("../../models/Saved")

async function main(req, res) {
  let { user_id, post_id, val } = req.body

  if (!post_id  ) return res.status(455).send()
  
  
  if (val == 1) {
    let isExists = Saved.findOne({ user_id, post_id })
    if (!isExists) return res.status(499).send()

    let saved = new Saved({
      user_id,
      post_id
    })
    let savedSaved = await saved.save()
    return res.status(200).send()
  }

  else if (val == 0){
    let result = await Saved.findOneAndDelete({user_id,post_id})
    return res.status(201).send()
  }


}


module.exports = main