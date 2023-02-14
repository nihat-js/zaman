const router = require("express").Router();

const create = require("../controllers/chat/create");
const load = require('../controllers/chat/load')


router.post('/create',create)
router.post('/load',load)



module.exports = router