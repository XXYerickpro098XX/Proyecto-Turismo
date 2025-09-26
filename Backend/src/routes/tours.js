const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ctl = require('../controllers/toursController')

// Public: listar y ver
router.get('/', ctl.getTours)
router.get('/:id', ctl.getTour)

// Protected: CRUD
router.post('/', auth, ctl.createTour)
router.put('/:id', auth, ctl.updateTour)
router.delete('/:id', auth, ctl.deleteTour)

module.exports = router
