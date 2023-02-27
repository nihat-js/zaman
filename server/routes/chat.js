const router = require("express").Router();



const move = require("../controllers/chat/move")
const loadChats = require("../controllers/chat/loadChats")
const sendMessage = require("../controllers/chat/sendMessage")
const startOrFindChat = require("../controllers/chat/startOrFindChat")
const loadMessages = require("../controllers/chat/loadMessages")



router.post("/move", move)
router.post("/load-chats",    loadChats)
router.post("/send-message",sendMessage)
router.post("/start-or-find-chat",startOrFindChat)
router.post("/message/load",loadMessages)
router.post("/message/send",sendMessage)


module.exports = router