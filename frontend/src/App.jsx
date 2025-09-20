// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/register";
import Reservation from "./components/Reservation";

export default function App() {
  const [user, setUser] = useState(null); // Usuario logueado

  return (
    <Router>
      <Routes>
        {/* Ruta por defecto: si hay usuario, va a reservas, si no, login */}
        <Route
          path="/"
          element={user ? <Navigate to="/reservas" /> : <Login onLogin={setUser} />}
        />

        {/* Ruta de registro */}
        <Route
          path="/registro"
          element={<Register onRegister={setUser} />}
        />

        {/* Ruta de reservas (solo si hay usuario) */}
        <Route
          path="/reservas"
          element={user ? <Reservation user={user} /> : <Navigate to="/" />}
        />

        {/* Ruta fallback: cualquier otra dirección redirige al home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
