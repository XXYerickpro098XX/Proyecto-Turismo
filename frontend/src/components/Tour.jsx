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
        console.error(err);
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
            {t.images?.[0] && (
              <img
                src={`http://localhost:5000${t.images[0]}`}
                alt={t.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <h3 className="font-bold">{t.title}</h3>
            <p>{t.description}</p>
            <p className="text-sm text-gray-600">
              Precio: ₡{t.price} | Duración: {t.durationHours}h
            </p>
            <p className="text-xs text-gray-500">ID: {t._id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
