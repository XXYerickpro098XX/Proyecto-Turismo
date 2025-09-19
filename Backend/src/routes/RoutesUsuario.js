import express from "express";
import Usuario from "../models/usuario.js";

const router = express.Router();

// GET todos los usuarios
router.get("/", async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// POST crear usuario
router.post("/", async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  await nuevoUsuario.save();
  res.json(nuevoUsuario);
});

// PUT actualizar usuario
router.put("/:id", async (req, res) => {
  const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(usuario);
});

// DELETE usuario
router.delete("/:id", async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Usuario eliminado" });
});

export default router;
