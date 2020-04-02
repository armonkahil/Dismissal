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
      }
    }
  ],
  students: [
    {
      firstName: {
        type: String,
        required: true
      },
      middleName: {
        type: String
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
      }
    }
  ],
  authorizedPickUp: [
    {
      type: String
    }
  ]
})

const Family = mongoose.model('Family', familySchema)

module.exports = Family
