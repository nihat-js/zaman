
const Post = require('../../models/Post')

async function post (req,res){
  const {text , sources , user_id} = req.body
  
  if (!text && !sources) {
    return res.json({message : "Not valid data" , status : false})
  }

  const myPost = new Post({
    text : text,
    author : user_id
  })

  const myPostSaved = await myPost.save()
  if (!myPostSaved) {
    return res.json({message : "Could not post it ", status : false ,  })
  }

  res.json({message : "Posted successfully", status : true})
}


module.exports = post