const router = require('express').Router()
const adminsController = require('../../controllers/adminsController')

// Matches with "/api/admins"
router
  .route('/')
  .get(adminsController.findAllAdmins)
  .post(adminsController.createAdmin)

// Matches with "/api/admins/:id"
router
  .route('/:id')
  .get(adminsController.findAdminById)
  .put(adminsController.updateAdmin)
  .delete(adminsController.removeAdmin)

module.exports = router
