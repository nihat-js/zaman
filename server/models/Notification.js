const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  action_name: { type: String, required: true },
  text: { type: String, }
}, { timestamps: true })




const Notification = mongoose.model('notifications', schema)
module.exports = Notification

