const route = require("express").Router();
const create = require("../controllers/post/create")
const react= require("../controllers/post/react")
const place = require("../controllers/post/place")
const deletePost = require("../controllers/post/delete")
const report = require("../controllers/post/report")
route.post("/create",create)
route.post("/react",react)
route.post("/place",place)
route.post("/delete",deletePost)
route.post("/report",report)
module.exports = route