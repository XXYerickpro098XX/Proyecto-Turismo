const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Topology / routes
const authRoutes = require('src/routes/auth')
const tourRoutes = require('src/routes/tours')
const reservationRoutes = require('src/routes/reservations')

app.use('/api/auth', authRoutes)
app.use('/api/tours', tourRoutes)
app.use('/api/reservations', reservationRoutes)

// health
app.get('/', (req, res) => res.json({ ok: true, proyecto: 'Proyecto 13 - Turismo' }))

const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch(err => {
  console.error('Error conectando a MongoDB:', err.message)
})
