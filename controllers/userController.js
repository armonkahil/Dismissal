const db = require('../models')
// const bcrypt = require('bcrypt')
// const User = require('../models/User')
const passport = require('../config/passport')

// Defining methods for the UserController
module.exports = {
  findAllUsers: (req, res) => {
    db.User.find({})
      .then(dbModel => res.json(dbModel))
      .catch(error => res.status(422).json(error))
  },
  findAUserById: (req, res) => {
    db.User.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(error => res.status(422).json(error))
  },
  findOneUser: (req, res) => {
    db.User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log('User.js post error: ', err)
      }
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      })
    })
      .then(dbModel => res.json(dbModel))

      .catch(error => res.status(422).json(error))
  },

  createUser: (req, res) => {
    // console.log('create route hit')
    // console.log(req.body)
    const { username, password } = req.body
    // console.log('request body coming in:', req.body)

    db.User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log('User.js post error: ', err)
      } else if (user) {
        console.log('user:', user)

        res.json({
          error: `Sorry, already a user with the username: ${username}`
        })
      } else {
        const newUser = new db.User({
          username: username,
          password: password
        })
        newUser.save((err, savedUser) => {
          if (err) return res.json(err)
          res.json(savedUser)
        })
      }
    })
  },
  updateUser: (req, res) => {
    db.User.findOneAndUpdate({ _id: req.body._id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  removeUser: (req, res) => {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  logInUser: (req, res, done) => {
    // console.log('done:', done)
    // console.log('req.body', req.body)
    // console.log('loginUser route hit')
    const { username, password } = req.body
    db.User.findOne(
      { username: username },
      (err, user) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return res.json({ message: 'Incorrect username' })
        }
        if (!user.checkPassword(password)) {
          return res.json({ message: 'Incorrect password' })
        }
        return res.json(user)
      },
      passport.authenticate('local'),
      (req, res) => {
        console.log('logged in', req.user)
        var userInfo = {
          username: req.user.username
        }
        res.send(userInfo)
      }
    ).catch(err => res.status(422).json(err))
  }
}
