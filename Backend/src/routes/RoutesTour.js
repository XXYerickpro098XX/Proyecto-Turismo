// backend/src/routes/RoutesTour.js
import express from "express";
import Tour from "../models/Tour.js";

const router = express.Router();

// GET todos los tours
router.get("/", async (req, res) => {
  const tours = await Tour.find();
  res.json(tours);
});

// POST crear tour
router.post("/", async (req, res) => {
  const nuevoTour = new Tour(req.body);
  await nuevoTour.save();
  res.json(nuevoTour);
});

// PUT actualizar tour
router.put("/:id", async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tour);
});

// DELETE eliminar tour
router.delete("/:id", async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Tour eliminado" });
});

export default router;
