const router = require("express").Router();

const stats = require("../controllers/admin/stats");
const graphql = require("../controllers/admin/graphql");
const {ban, unban} = require("../controllers/admin/user")

router.use("/stats", stats);
router.use("/graphql",graphql)

router.use("/ban", ban)
router.use("/unban", unban)






module.exports = router