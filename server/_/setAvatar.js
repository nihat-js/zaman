const path = require('path')
const allowedExtension = ['png', 'jpg', 'jpeg'];
const sampleNames = [
  "sample-1.svg",
  "sample-2.svg",
  "sample-3.svg",
  "sample-4.svg"
]
const User = require('../../models/User')


async function index(req, res) {


  const file = req.files.image;

  if (file) {
    const extension = file.name.split('.').pop();
    if (!allowedExtension.includes(extension)) {
      return res.status(422).send("Invalid Image");
    }

    const { user_id } = req.body
    const newfileName = user_id + "." + extension
    const filePath = __dirname + "../../../../storage/pp/" + newfileName
        file.mv(filePath, async (err) => {
      if (err) return res.status(500).json(err);

      const user = await User.findById(user_id)
      user.pp = newfileName

      const savedUser = await user.save()
      if (!savedUser)
        return res.status(500).json({ message: "Internal Server Error" })

      return res.send({ status: true });
    });
  }
  else{
    const sampleName = req.body.sample_name
    if (sampleNames.includes(sampleName)) {
      return res.status(422).json("Invalid Sample Name")
    }else{
      const user = await User.findById(req.body.user_id)
      user.avatar = sampleName
      const savedUser = await user.save()
      if (!savedUser){
        return res.status(422).json("Something went wrong")
      }
      res.status(200).json({status: true})
    }
  }





}

module.exports = index


