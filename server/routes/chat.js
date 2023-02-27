const router = require("express").Router();



const changeChatFolder = require("../controllers/chat/changeChatFolder")
const loadChats = require("../controllers/chat/loadChats")
const sendMessage = require("../controllers/chat/sendMessage")
const startOrFindChat = require("../controllers/chat/startOrFindChat")
const loadMessages = require("../controllers/chat/loadMessages")



router.post("/change-chat-folder", changeChatFolder)
router.post("/load-chats",    loadChats)
router.post("/send-message",sendMessage)
router.post("/start-or-find-chat",startOrFindChat)
router.post("/message/load",loadMessages)
router.post("/message/send",sendMessage)


module.exports = router