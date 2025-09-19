import express from "express";
import Reserva from "../models/reserva.js";

const router = express.Router();

// GET todas las reservas
router.get("/", async (req, res) => {
  const reservas = await Reserva.find().populate("usuario tour");
  res.json(reservas);
});

// POST crear reserva
router.post("/", async (req, res) => {
  const nuevaReserva = new Reserva(req.body);
  await nuevaReserva.save();
  res.json(nuevaReserva);
});

// PUT actualizar reserva
router.put("/:id", async (req, res) => {
  const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(reserva);
});

// DELETE reserva
router.delete("/:id", async (req, res) => {
  await Reserva.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Reserva eliminada" });
});

export default router;
