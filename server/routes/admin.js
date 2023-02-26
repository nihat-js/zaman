const router = require("express").Router();

const stats = require("../controllers/admin/stats");
const graphql = require("../controllers/admin/graphql");
const {ban, unban , sendNotification , search} = require("../controllers/admin/user")

router.post("/stats", stats);
router.post("/graphql",graphql)

router.post("/user/unban", unban)
router.post("/user/notification/send",sendNotification)
router.post('/user/search', search)




module.exports = router