const User = require('../../models/User')
const Follow = require('../../models/Follow')


async function follow (req,res){

  const {user_id , target_username} = req.body;
  if ( !(user_id && target_username)){
      return res.status(406);
    }
    
    let target = await User.findOne({username : target_username})
    if (!target){
      return res.status(402)
    }
    const target_id = target._id
    
    const isFollowing = await Follow.findOne({who_id : user_id , whom_id  : target_id})
    if (isFollowing){
      console.log('already following')
      return res.status(409).send()
    }
    
    const follow = new Follow({
      who_id : user_id,
      whom_id : target_id
    })
    
    const followSaved = await follow.save()
    if (!followSaved){
      return res.status(500).send() 
    }
    console.log('format')
    
    const user = await User.findById(user_id)
    user.followings_count = user.followings_count == null? 1 : user.followings_count + 1

    target = await User.findById(target_id)
    target.followers_count = target.followers_count == null? 1 : target.followers_count + 1

    let userSaved = await user.save()
    let targetSaved = await target.save()

    if ( !userSaved ||!targetSaved){
        return res.status(501).send() 
        // message : "Something went wrong could not increase following count 
    }

    return res.status(200).send()
    // message : "Successfully followed" 

}









module.exports = follow