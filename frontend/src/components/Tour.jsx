import { useEffect, useState } from "react";
import api from "../api";

export default function ToursList() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await api.get("/tours");
        setTours(res.data);
      } catch (err) {
        console.error("Error cargando tours:", err);
      }
    };
    fetchTours();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Tours disponibles</h2>
      {tours.length === 0 && <p>No hay tours disponibles.</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {tours.map((t) => (
          <div key={t._id} className="border p-4 rounded shadow">
            {/* Foto principal (si existe) */}
            {t.photos?.[0] && (
              <img
                src={t.photos[0]} // si guardas URLs completas
                alt={t.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <h3 className="font-bold">{t.title}</h3>
            <p>{t.description}</p>
            <p className="text-sm text-gray-600">
              📍 {t.location || "Ubicación no especificada"}
            </p>
            <p className="text-sm text-gray-600">
              💲 Precio: ₡{t.price}
            </p>
            {t.date && (
              <p className="text-xs text-gray-500">
                Fecha: {new Date(t.date).toLocaleDateString()}
              </p>
            )}
            <p className="text-xs text-gray-500">ID: {t._id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
