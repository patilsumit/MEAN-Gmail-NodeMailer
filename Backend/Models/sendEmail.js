const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const EmailSchema = new Schema({
  sender: {
    type: String
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = sendEmail = mongoose.model('sendEmail', EmailSchema)