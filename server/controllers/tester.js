const User = require('../models/User');

module.exports =  function (req, res)  {
  User.find({},(err,docs)=>{
    res.json(docs)
  })
}