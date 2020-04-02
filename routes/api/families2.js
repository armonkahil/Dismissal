const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const passport = require('passport')

// Load Validation
const validateProfileInput = require('../../validation/profile')

// Load Family Model
const Family = require('../../models/Family')
// Load User Model
const User = require('../../models/User')

// @route   GET api/Family/test
// @desc    Tests Family route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Family Works' }))

// @route   GET api/Family
// @desc    Get current users Family
// @access  Private
router.get(
  '/',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}

    Family.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(Family => {
        if (!Family) {
          errors.noprofile = 'There is no Family for this user'
          return res.status(404).json(errors)
        }
        res.json(Family)
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route   GET api/Family/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {}

  Family.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles'
        return res.status(404).json(errors)
      }

      res.json(profiles)
    })
    .catch(err => {
      res.status(404).json({ Family: 'There are no profiles' })
      console.log(err)
    })
})

// @route   GET api/Family/handle/:handle
// @desc    Get Family by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {}

  Family.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(Family => {
      if (!Family) {
        errors.noprofile = 'There is no Family for this user'
        res.status(404).json(errors)
      }

      res.json(Family)
    })
    .catch(err => res.status(404).json(err))
})

// @route   GET api/Family/user/:user_id
// @desc    Get Family by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {}

  Family.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(Family => {
      if (!Family) {
        errors.noprofile = 'There is no Family for this user'
        res.status(404).json(errors)
      }

      res.json(Family)
    })
    .catch(err =>
      res.status(404).json({ Family: 'There is no Family for this user' })
    )
})

// @route   POST api/Family
// @desc    Create or edit user Family
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors)
    }

    // Get fields
    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.status) profileFields.status = req.body.status
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',')
    }

    // Social
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram

    Family.findOne({ user: req.user.id }).then(Family => {
      if (Family) {
        // Update
        Family.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(Family => res.json(Family))
      } else {
        // Create

        // Check if handle exists
        Family.findOne({ handle: profileFields.handle }).then(Family => {
          if (Family) {
            errors.handle = 'That handle already exists'
            res.status(400).json(errors)
          }

          // Save Family
          new Family(profileFields).save().then(Family => res.json(Family))
        })
      }
    })
  }
)

// @route   POST api/Family/experience
// @desc    Add experience to Family
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body)

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors)
    }

    Family.findOne({ user: req.user.id }).then(Family => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add to exp array
      Family.experience.unshift(newExp)

      Family.save().then(Family => res.json(Family))
    })
  }
)

// @route   POST api/Family/education
// @desc    Add education to Family
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body)

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors)
    }

    Family.findOne({ user: req.user.id }).then(Family => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add to exp array
      Family.education.unshift(newEdu)

      Family.save().then(Family => res.json(Family))
    })
  }
)

// @route   DELETE api/Family/experience/:exp_id
// @desc    Delete experience from Family
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Family.findOne({ user: req.user.id })
      .then(Family => {
        // Get remove index
        const removeIndex = Family.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id)

        // Splice out of array
        Family.experience.splice(removeIndex, 1)

        // Save
        Family.save().then(Family => res.json(Family))
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route   DELETE api/Family/education/:edu_id
// @desc    Delete education from Family
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Family.findOne({ user: req.user.id })
      .then(Family => {
        // Get remove index
        const removeIndex = Family.education
          .map(item => item.id)
          .indexOf(req.params.edu_id)

        // Splice out of array
        Family.education.splice(removeIndex, 1)

        // Save
        Family.save().then(Family => res.json(Family))
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route   DELETE api/Family
// @desc    Delete user and Family
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Family.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      )
    })
  }
)

module.exports = router
