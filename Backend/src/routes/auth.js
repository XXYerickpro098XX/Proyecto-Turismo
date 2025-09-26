const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Faltan campos' })
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Correo ya registrado' })
    const user = await User.create({ name, email, password, role })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' })
    const ok = await user.comparePassword(password)
    if (!ok) return res.status(400).json({ message: 'Credenciales inválidas' })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
