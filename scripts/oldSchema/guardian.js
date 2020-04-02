const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Parent Schema
const guardianSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  suffix: {
    type: String
  },
  relation: {
    type: String,
    required: true
  },
  homePhone: {
    type: String,
    required: true
  },
  workPhone: {
    type: String
  },
  cellPhone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  // kids go here
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    }
  ],
  family: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Family'
    }
  ]
})

const Guardian = mongoose.model('Guardian', guardianSchema)

module.exports = Guardian
