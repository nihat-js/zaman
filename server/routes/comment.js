const route = require('express').Router();
const add = require("../controllers/comment/add")
const load = require("../controllers/comment/load")

route.post('/add',add)
route.post('/load',load)

module.exports = route