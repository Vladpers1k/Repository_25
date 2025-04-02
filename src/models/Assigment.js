const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true }
})

module.exports = mongoose.model('Assignment', assignmentSchema)
