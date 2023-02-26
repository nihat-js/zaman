const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  who_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users',  },
  whom_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  type: { type: Number, default : 0  }, // 0 , 1, 2 ,3
  message: { type: String, }
}, { timestamps: true })




const Notification = mongoose.model('notifications', schema)
module.exports = Notification

