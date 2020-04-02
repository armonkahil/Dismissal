const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoPopulate = require('mongoose-autopopulate')
const UserSchema = new Schema({
  email: {
    type: String,
    // required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  familyId: {
    type: String,
    required: true
  }
})
const User = mongoose.model('users', UserSchema)
UserSchema.plugin(autoPopulate)
module.exports = User
