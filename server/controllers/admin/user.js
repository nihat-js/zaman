const User = require("../../models/User")
const Log = require("../../models/Logs")
const Notification = require("../../models/Notification")
async function ban(req, res) {
  let { target_id, reason, duration, message, score } = req.body

  if (!target_id || !reason || !duration || !score || duration < 0 || score < 0 || score > 12) {
    return res.status(406).send() // Missing parametrs
  }
  let user = await User.findById(target_id);
  user.violation.score = user.violation.score ? user.violation.score + 1 : score
  user.violation.unban_time = user.unban_time ? new Date(user.unban_time + duration) : new Date(Date.now() + duration)
  user.violation.reason = reason
  user.violation.message = message


  let log = new Log({
    who_id: user_id,
    whom_id: target_id,
    action_name: "ban",
  })

}




async function unban(req, res) {
  let { user_id, target_id } = req.body

  let user = await User.findById(target_id);
  user.violation.unban_time = null


  let log = new Log({
    who_id: user_id,
    whom_id: target_id,
    action_name: "unban",
  })

  let savedLog = log.save()
  let savedUser = await user.save()
  if (!savedUser || !savedLog) return res.status(501).send() // server

  res.status(200).send()

}


async function sendNotification(req, res) {
  let { user_id, target_id, text, action_name } = req.body

  if (!target_id) return res.status(406).send()

  let notification = new Notification({
    user_id: target_id,
    action_name: action_name,
    text: text
  })

  let savedNotification = await notification.save()
  if (!savedNotification) return res.status(501).send() // server

  return res.status(200).send()



}

async function search(req, res) {

  let { id, username, email } = req.body
  if (id) {
    let result = await User.findById(id).lean()
  } else if (email) {
    let result = await User.findOne({ email: email }).lean()
  } else if (username) {
    let result = await User.find({ username: { $regex: username } }).limit(5).lean()

  }
  result ? res.status(200).json(result) : res.status(401).send()
}

module.exports = { ban, unban, sendNotification, search }
