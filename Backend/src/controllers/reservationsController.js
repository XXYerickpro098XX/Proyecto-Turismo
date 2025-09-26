const Reservation = require('../models/Reservation')
const Tour = require('../models/Tour')

exports.createReservation = async (req, res) => {
  try {
    const { tour: tourId, guests } = req.body
    const tour = await Tour.findById(tourId)
    if (!tour) return res.status(404).json({ message: 'Tour no existe' })
    // Opcional: validar capacidad
    const reservation = await Reservation.create({ user: req.user._id, tour: tourId, guests })
    res.status(201).json(reservation)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getReservations = async (req, res) => {
  try {
    // Si query ?mine=true devolver solo del usuario
    const filter = req.query.mine === 'true' ? { user: req.user._id } : {}
    const reservations = await Reservation.find(filter).populate('tour').populate('user','name email')
    res.json(reservations)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('tour').populate('user','name email')
    if (!reservation) return res.status(404).json({ message: 'Reserva no encontrada' })
    res.json(reservation)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!reservation) return res.status(404).json({ message: 'Reserva no encontrada' })
    res.json(reservation)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id)
    if (!reservation) return res.status(404).json({ message: 'Reserva no encontrada' })
    res.json({ message: 'Reserva eliminada' })
  } catch (err) { res.status(500).json({ message: err.message }) }
}
