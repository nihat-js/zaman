const router = require("express").Router();

const stats = require("../controllers/admin/stats");
const graphql = require("../controllers/admin/graphql");
const {ban, unban , sendNotification , search} = require("../controllers/admin/user")

router.use("/stats", stats);
router.use("/graphql",graphql)

router.use("user/ban", ban)
router.use("user/unban", unban)
router.use("user/send-notification",sendNotification)
router.use('user/search', search)





module.exports = router