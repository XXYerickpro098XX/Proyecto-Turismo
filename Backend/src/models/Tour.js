const { Schema: S, model: M } = require('mongoose')

const tourSchema = new S({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  price: { type: Number, default: 0 },
  date: { type: Date },
  capacity: { type: Number, default: 10 },
  guide: { type: S.Types.ObjectId, ref: 'User' },
  photos: [String],
  createdBy: { type: S.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = M('Tour', tourSchema)
