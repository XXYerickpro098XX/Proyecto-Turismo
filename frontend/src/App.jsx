// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register"; // 👈 con R mayúscula
import Reservation from "./components/Reservation";
import Landing from "./components/Landing"; // 👈 asegúrate que el archivo sea Landing.jsx con L mayúscula

export default function App() {
  const [user, setUser] = useState(null); // Usuario logueado

  return (
    <Router>
      <Routes>
        {/* Ruta de registro (pública) */}
        <Route
          path="/registro"
          element={<Register onRegister={setUser} />}
        />

        {/* Ruta raíz: login si no hay user, landing si sí */}
        <Route
          path="/"
          element={user ? <Navigate to="/Landing" /> : <Login onLogin={setUser} />}
        />

        {/* Ruta de landing (solo usuarios logueados) */}
        <Route
          path="/landing"
          element={user ? <Landing user={user} /> : <Navigate to="/" />}
        />

        {/* Ruta de reservas (solo usuarios logueados) */}
        <Route
          path="/reservas"
          element={user ? <Reservation user={user} /> : <Navigate to="/" />}
        />

        {/* Ruta fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
