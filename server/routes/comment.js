const route = require('express').Router();
const add = require("../controllers/comment/add")
const load = require("../controllers/comment/load")
const react = require("../controllers/comment/react")
route.post('/add',add)
route.post('/load',load)
route.post('/react',react)

module.exports = route