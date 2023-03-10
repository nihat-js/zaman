const Post = require('../../models/Post')
const User = require("../../models/User")
const allowedExtensions = ['jpg', 'jpeg', 'gif', 'png']

async function post(req, res) {
  const { text, user_id } = req.body
  let sources = []
  // console.log(req.files)
  // console.log('starting')
  
  if (!text){
    return false
  }


  for (let i = 0; i < 5; i++) {
    console.log("loop", i)
    if (req.files["image" + i]) {
      const ext = req.files["image" + i].name.split('.').pop()
      if (!allowedExtensions.includes(ext)) continue
      console.log("looper",i)
      let name = new Date().getTime() + "." + ext;
      try {
        await req.files["image" + i].mv("storage/images/" + name, )
        sources.push(name)
        console.log("deal with")
      }catch(err){
        console.log(err)
      }

    }
  }
  console.log("mysources", sources)
  if (sources.length == 0 && !text) {
    return res.status(400).send()  // error: "No image or text"
  }
  let post = new Post({
    text,
    sources,
    author_id: user_id,
    comments_count: 0,
    topics: "",
    reactions: [],
  })

  let savedPost = post.save()
  if (!savedPost) {
    return res.status(400).send()
  }

  let user =  await User.findById(user_id)
  user.posts_count  = user.posts_count ? user.posts_count + 1 : 1 ;
  let savedUser = await user.save()

  return res.status(200).json({ post_id: savedPost._id })



}


module.exports = post