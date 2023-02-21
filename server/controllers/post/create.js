const Post = require('../../models/Post')
const allowedExtensions = ['jpg','jpeg','gif','png']

async function post (req,res){
  const {text ,   user_id} = req.body
  let sources  = []
  console.log('starting')
  for (let i=0; i< 5 ;i ++){
    if (!req.files) {
      break
    }
    if (  req.files.hasOwnProperty("image" + i)   ){
      const ext = req.files["image"+ i].name.split('.').pop()
      if (!allowedExtensions.includes(ext)) continue 
      console.log("ext",ext)
      let name = new Date().getTime()  + "." + ext
      req.files["image"+ i].mv('storage/images/'+ name ,err =>{
        if (err) console.log(err)
        sources.push(name)
      })
    }
  }
  if (sources.length == 0 && !text){
    return res.status(400).send()  // error: "No image or text"
  }

  let post = new Post({
    text ,
    sources,
    author_id : user_id,
    comments_count : 0,
    topics : "",
    reactions : 0,
  })

  let savedPost = post.save()
  if (!savedPost){
    return res.status(400).send()
  }

  return res.status(200).json({post_id : savedPost._id})



}


module.exports = post