"use client";

import { useState } from "react";
import { MapPin, Users, Calendar, Cloud, Trees } from "lucide-react";
import api from "../api"; // Tu archivo api.js

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin?.(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-sky-100 via-emerald-50 to-blue-100">
      {/* Fondo animado */}
      <Cloud className="absolute top-10 left-10 h-16 w-16 opacity-60 animate-float text-sky-300" />
      <Cloud className="absolute top-20 right-20 h-12 w-12 opacity-40 animate-float text-sky-200" style={{ animationDelay: "2s" }} />
      <Trees className="absolute bottom-0 left-16 h-24 w-24 opacity-70 animate-sway text-emerald-600" />
      <Trees className="absolute bottom-0 right-16 h-20 w-20 opacity-60 animate-sway text-emerald-700" style={{ animationDelay: "1s" }} />

      {/* Card con formulario */}
      <div className="w-full max-w-md relative z-10 p-6 border rounded shadow-2xl bg-white">
        <div className="text-center mb-6">
          <div className="flex justify-center space-x-2 text-blue-500 mb-2">
            <MapPin className="h-6 w-6" />
            <Users className="h-6 w-6" />
            <Calendar className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Registro de Viajes Turísticos</h1>
          <p className="text-gray-600">Inicie sesión para administrar tours, guías y reservas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
