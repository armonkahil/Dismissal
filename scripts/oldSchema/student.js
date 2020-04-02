const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
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
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  tShirtSize: {
    type: String
  },
  gradeLevel: {
    type: Number,
    min: [1, 'Pre-K'],
    max: 5
  },
  disabilities: {
    type: String
  },
  allergies: {
    type: String
  },
  studentDoctor: {
    type: String
  },
  authorizedPickup: [
    {
      type: String,
      required: true
    }
  ],
  guardians: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Guardian'
    }
  ],
  siblings: [
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

const Student = mongoose.model('Student', studentSchema)

module.exports = Student
