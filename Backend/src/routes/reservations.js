const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const rctl = require('../controllers/reservationsController')

// Todas protegidas
router.post('/', auth, rctl.createReservation)
router.get('/', auth, rctl.getReservations)
router.get('/:id', auth, rctl.getReservation)
router.put('/:id', auth, rctl.updateReservation)
router.delete('/:id', auth, rctl.deleteReservation)

module.exports = router
