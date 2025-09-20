"use client";

import { useState } from "react";
import { MapPin, Users, Calendar, TreePine, Bird, Cloud, Flower2, Mountain } from "lucide-react";
import api from "../api"; // login real con tu backend

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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-emerald-50 to-blue-100">
        {/* Nubes flotantes */}
        <div className="absolute top-10 left-10 text-sky-300 animate-float">
          <Cloud className="h-16 w-16 opacity-60" />
        </div>
        <div className="absolute top-20 right-20 text-sky-200 animate-float" style={{ animationDelay: "2s" }}>
          <Cloud className="h-12 w-12 opacity-40" />
        </div>
        <div className="absolute top-32 left-1/3 text-sky-300 animate-float" style={{ animationDelay: "4s" }}>
          <Cloud className="h-20 w-20 opacity-50" />
        </div>

        {/* Árboles */}
        <div className="absolute bottom-0 left-16 text-emerald-600 animate-sway">
          <TreePine className="h-24 w-24 opacity-70" />
        </div>
        <div className="absolute bottom-0 right-16 text-emerald-700 animate-sway" style={{ animationDelay: "1s" }}>
          <TreePine className="h-20 w-20 opacity-60" />
        </div>
        <div className="absolute bottom-0 left-1/4 text-emerald-500 animate-sway" style={{ animationDelay: "3s" }}>
          <TreePine className="h-28 w-28 opacity-50" />
        </div>

        {/* Pájaros volando */}
        <div className="absolute top-1/4 text-gray-600 animate-fly">
          <Bird className="h-6 w-6 opacity-70" />
        </div>
        <div className="absolute top-1/3 text-gray-500 animate-fly" style={{ animationDelay: "8s" }}>
          <Bird className="h-5 w-5 opacity-60" />
        </div>

        {/* Montañas */}
        <div className="absolute bottom-0 left-0 text-slate-400 opacity-30">
          <Mountain className="h-32 w-32" />
        </div>
        <div className="absolute bottom-0 right-0 text-slate-500 opacity-25">
          <Mountain className="h-40 w-40" />
        </div>

        {/* Flores flotantes */}
        <div className="absolute bottom-20 right-1/4 text-pink-400 animate-float" style={{ animationDelay: "1.5s" }}>
          <Flower2 className="h-8 w-8 opacity-60" />
        </div>
        <div className="absolute bottom-32 left-1/3 text-yellow-400 animate-float" style={{ animationDelay: "3.5s" }}>
          <Flower2 className="h-6 w-6 opacity-50" />
        </div>
      </div>

      {/* Card del login */}
      
      <div className="w-full max-w-md relative z-10 bg-white/90 backdrop-blur-sm border rounded-lg shadow-2xl animate-in fade-in slide-in-from-bottom duration-700 p-6">
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
            className="w-full bg-blue-500 text-white py-2 rounded shadow-md hover:bg-blue-600 transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
