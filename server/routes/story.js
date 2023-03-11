const router = require("express").Router();
const add = require("../controllers/story/add")
const load = require("../controllers/story/load")
const user = require("../controllers/story/user")
router.post('/add', add)
router.post('/load', load)
router.post('/user',user)




module.exports = router