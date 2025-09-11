// backend/src/models/Tour.js
import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Tour", tourSchema);
