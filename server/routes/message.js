const router = require("express").Router();


const send = require('../controllers/message/send')
const delete_ = require('../controllers/message/delete')
const load = require('../controllers/message/load')


router.post('/send',send)
router.post('/load',load)




module.exports = router