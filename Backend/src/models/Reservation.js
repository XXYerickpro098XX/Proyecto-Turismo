const { Schema: Sc, model: Mo } = require('mongoose')

const reservationSchema = new Sc({
  user: { type: Sc.Types.ObjectId, ref: 'User', required: true },
  tour: { type: Sc.Types.ObjectId, ref: 'Tour', required: true },
  guests: { type: Number, default: 1 },
  status: { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' },
  reservedAt: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports = Mo('Reservation', reservationSchema)
