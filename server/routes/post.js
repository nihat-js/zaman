const route = require("express").Router();

const create = require("../controllers/post/create")
const userPosts = require("../controllers/post/userPosts")
route.post("/create",create)
route.post("/user-posts",userPosts)

module.exports = route