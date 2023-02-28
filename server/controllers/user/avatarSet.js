const User = require("../../models/User")
let allowedSampleNames = ['sample-1.svg', 'sample-2.svg', 'sample-3.svg',
 'sample-4.svg','sample-5.svg','sample-6.svg','sample-7.svg','sample-8.svg','sample-9.svg','sample-10.svg']


async function avatarSet(req, res) {
  let { file_name , user_id } = req.body
  if ( !file_name ||  !allowedSampleNames.includes(file_name)  ) return res.status(467).send()
  // console.log(file_name)
  let result = await User.findByIdAndUpdate(user_id, { avatar: file_name })
  if (!result) return res.status(501)
  res.status(201).send()
}


module.exports = avatarSet