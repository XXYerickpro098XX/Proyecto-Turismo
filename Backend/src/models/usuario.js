import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // luego podés encriptar con bcrypt
});

export default mongoose.model("Usuario", usuarioSchema);
