const Tour = require('../models/Tour')

exports.createTour = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user._id }
    const tour = await Tour.create(data)
    res.status(201).json(tour)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find().populate('guide','name email')
    res.json(tours)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('guide','name email')
    if (!tour) return res.status(404).json({ message: 'Tour no encontrado' })
    res.json(tour)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!tour) return res.status(404).json({ message: 'Tour no encontrado' })
    res.json(tour)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    if (!tour) return res.status(404).json({ message: 'Tour no encontrado' })
    res.json({ message: 'Tour eliminado' })
  } catch (err) { res.status(500).json({ message: err.message }) }
}
