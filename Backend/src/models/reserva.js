import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  fechaReserva: { type: Date, default: Date.now },
  cantidadPersonas: { type: Number, default: 1 }
});

export default mongoose.model("Reserva", reservaSchema);
