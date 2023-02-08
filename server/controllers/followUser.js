const User = require('../models/User')
const Follow = require('../models/Follow')
async function followUser (req,res){
    const {user_id , target_username} = req.body;
    if ( !(user_id && target_username)){
      return res.json({message : "Invalid data"})
    }
    
    let target = await User.findOne({username : target_username})
    if (!target){
      return res.json({message : "User not found"})
    }
    const target_id = target._id
    
    const isFollowing = await Follow.findOne({following_id : user_id , followed_id  : target_id})
    if (isFollowing){
      return res.json({message : "Already following"})
    }

    const follow = new Follow({
      following_id : user_id,
      followed_id : target_id
    })
    
    const followSaved = await follow.save()
    if (!followSaved){
      return res.json({message : "Something went wrong could not follow"})
    }
    
    const user = await User.findById(user_id)
    user.followings_count = user.followings_count == null? 1 : user.followings_count + 1

    target = await User.findById(target_id)
    target.followers_count = target.followers_count == null? 1 : target.followers_count + 1

    let userSaved = await user.save()
    let targetSaved = await target.save()

    if ( !userSaved ||!targetSaved){
        return res.json({message : "Something went wrong could not increase following count "})
    }

    res.json({message : "Successfully followed" , status : true})

}









module.exports = followUser