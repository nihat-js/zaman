const User = require('../../models/User')
const Follow = require('../../models/Follow')


async function unfollow (req,res){
  
    const {user_id , target_username} = req.body;
    if ( !(user_id && target_username)){
      return res.status(406).send()
    }
    
    let target = await User.findOne({username : target_username})
    if (!target){
      return res.status(402).send()
    }
    const target_id = target._id
    
    let result = await Follow.findOneAndDelete({who_id : user_id , whom_id  : target_id})

    if (!result){
      return res.status(430).send()
    }

    
    const user = await User.findById(user_id)

    user.followings_count -= 1

    target = await User.findById(target_id)
    target.followers_count -=1  

    let userSaved = await user.save()
    let targetSaved = await target.save()

    if ( !userSaved ||!targetSaved){
        return res.status(500).send()
        // message : "Something went wrong could not increase following count 
    }

    res.status(200).send()

}

module.exports = unfollow

