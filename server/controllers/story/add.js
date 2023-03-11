const Story = require("../../models/Story")
const User = require("../../models/User")
const allowedExtensions = ['jpg', 'jpeg', 'gif', 'png']

// const gifNames=['gif-1.gif','gif-2.gif']
async function main(req, res) {
  const { user_id } = req.body
  if (!req.files?.file) return res.status(469).send()

  const ext = req.files.file.name.split('.').pop()
  if (!allowedExtensions.includes(ext)) return res.status(455).send()
  let name = new Date().getTime() + "." + ext;

  try {
    await req.files.file.mv("storage/stories/" + name,)
    let story = new Story({author_id : user_id  , source : name ,  })
    await story.save()
    await  User.findByIdAndUpdate(user_id,{ $inc : { stories_count : 1 } })

  } catch (err) {
    console.log(err)
  }
  return res.status(202).send()
}



module.exports = main