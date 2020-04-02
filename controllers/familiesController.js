const db = require('../models')

// Defining methods for the familiesController
module.exports = {
  // find all families
  findAllFamilies: (req, res) => {
    db.Family.find(req.query)
      .sort('familyLastName -test')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // find a Family by id
  findFamilyById: (req, res) => {
    db.Family.findOne({ familyId: parseInt(req.params.id) })
      .then(dbModel => {
        // console.log('DB MODEL CONSOLE', dbModel)
        res.send(dbModel)
      })
      .catch(err => res.status(422).json(err))
  },
  // create a Family
  createFamily: (req, res) => {
    db.Family.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // update a Family
  updateFamily: (req, res) => {
    db.Family.findOneAndUpdate({ _id: req.body._id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // remove a Family
  removeFamily: (req, res) => {
    db.Family.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
