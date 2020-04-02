const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Family Schema
const familySchema = new Schema({
  familyLastName: {
    type: String,
    required: true
  },
  address: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipCode: {
      type: String
    }
  },
  emergencyContact: {
    type: String,
    required: true
  },
  guardians: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Guardian'
    }
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    }
  ]
})

const Family = mongoose.model('Family', familySchema)

module.exports = Family
