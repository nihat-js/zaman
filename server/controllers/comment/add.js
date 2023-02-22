const Comment = require('../../models/Comment')
const allowedExtensions = ['jpg', 'jpeg', 'gif', 'png']

async function addComment(req, res) {
  const { user_id, post_id, text } = req.body
  let sources = []
  if (!post_id) {
    return res.status(456).send()
  }

  if (req.files?.image1) {

    const ext = req.files.image1.name.split('.').pop()
    if (allowedExtensions.includes(ext)) {
      let name = new Date().getTime() + "." + ext;
      try {
        await req.files.image1.mv("storage/images/" + name,)
        sources.push(name)
      } catch (err) {
        console.log(err)
      }
    }
  }
  if (sources.length == 0 && !text ){
    return res.status(407).send()
  }

  let comment = new Comment({
    author_id : user_id ,
    text,
    post_id : post_id,
    sources : sources,
    reactions :[],
  })

  let savedComment = await comment.save()
  if (!savedComment) {
    return res.status(501).send()
  }

  res.status(200).send()
}


module.exports = addComment