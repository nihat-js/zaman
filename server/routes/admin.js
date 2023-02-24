const router = require("express").Router();

const stats = require("../controllers/admin/stats");
const graphql = require("../controllers/admin/graphql");
router.use("/stats", stats);
router.use("/graphql",graphql)







module.exports = router