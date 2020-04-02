const router = require('express').Router()
const adminRoutes = require('./admins')
const familyRoutes = require('./families')
const familyRoutes2 = require('./families2')
const userRoutes = require('./users')

// admin routes
router.use('/admins', adminRoutes)
// family routes
router.use('/families', familyRoutes)
router.use('/families2', familyRoutes2)
// user routes
router.use('/users', userRoutes)

module.exports = router
