const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const express = require('express')

const router = express.Router()
const keys = require('../../config/keys')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')
// const Family = require("../../models/Family");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  console.log('req.body', req.body)
  const { email, password, family_id } = req.body
  const { errors, isValid } = validateRegisterInput(req.body)
  console.log('errors:', errors)
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors)
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        })

        console.log(family_id)
        const newUser = new User({
          email: email,
          avatar,
          familyId: family_id,
          password: password
        })
        console.log('new user to add', newUser)

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })

    .catch(err => console.log(err))
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // const username = req.body.username;
  const password = req.body.password

  // Find user by email
  User.findOne({ email: req.body.username }).then(user => {
    console.log('user:', user)
    // Check for user
    if (!user) {
      errors.username = 'User not found'
      return res.status(404).json(errors)
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          username: user.username,
          admin: user.admin,
          familyId: user.familyId
        } // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          // expires in 2 hours
          { expiresIn: 7200 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
              // Postman Troubleshooting
              // token: token
            })
          }
        )
      } else {
        errors.password = 'Password incorrect'
        return res.status(400).json(errors)
      }
    })
  })
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(res)
    res.json({
      id: req.user.id,
      name: req.user.name,
      admin: req.user.admin
    })
  }
)

router.get(
  '/current/family',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('id coming', req.body._id)
    User.findById(req.body._id)
      .populate('familyId')
      .then(data => res.json(data))
    console.log(res.data)
    res.json
  }
)

module.exports = router
