const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
      'Please add a valid email'
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  }
})

/**
 * Do not use arrow functions. 
 * A regular fn always point to the current doc, since we use "this"
 */

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
  next();
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch;
}

module.exports = mongoose.model('User', UserSchema)