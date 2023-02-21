const route = require("express").Router();

const create = require("../controllers/post/create")

route.post("/create",create)

module.exports = route