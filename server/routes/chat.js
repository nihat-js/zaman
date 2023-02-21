const router = require("express").Router();



const changeChatFolder = require("../controllers/chat/changeChatFolder")
const loadChats = require("../controllers/chat/loadChats")
const sendMessage = require("../controllers/chat/sendMessage")
const startOrFindChat = require("../controllers/chat/startOrFindChat")




router.post("/change-chat-folder",changeChatFolder)
router.post("/load-chats",loadChats)
router.post("/send-message",sendMessage)
router.post("/start-or-find-chat",startOrFindChat)

module.exports = router