const route = require("express").Router();

const create = require("../controllers/post/create")
// const userPosts = require("../controllers/post/userPosts")
const react= require("../controllers/post/react")
route.post("/create",create)
// route.post("/user-posts",userPosts)
route.post("/react",react)

module.exports = route