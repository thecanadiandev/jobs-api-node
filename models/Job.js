const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxlength: 50
  },
  position: {
    type: String,
    required: [true, 'Please provide company name'],
    maxlength: 100
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId, // types job with user 
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, {
  timestamps: true // auto manages createdAt, updatedAt
})
  
module.exports = mongoose.model('Job', JobSchema)