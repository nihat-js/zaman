const route = require("express").Router();



const create = require("../controllers/post/create")
const react= require("../controllers/post/react")
const place = require("../controllers/post/place")

route.post("/create",create)
route.post("/react",react)
route.post("/place",place)

module.exports = route