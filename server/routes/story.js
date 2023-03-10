const router = require("express").Router();


const add = require("../controllers/story/add")

router.post('/add', add)




module.exports = router