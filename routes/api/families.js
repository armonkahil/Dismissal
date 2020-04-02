const router = require('express').Router()
const familiesController = require('../../controllers/familiesController')

// Matches with "/api/families"
router
  .route('/')
  .get(familiesController.findAllFamilies)
  .post(familiesController.createFamily)

// Matches with "/api/families/:id"
router
  .route('/:id')
  .get(familiesController.findFamilyById)
  .put(familiesController.updateFamily)
  .delete(familiesController.removeFamily)

module.exports = router
