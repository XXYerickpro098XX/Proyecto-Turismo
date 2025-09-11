import { useState } from "react";
import api from "../api";

export default function ReservationForm() {
  const [tourId, setTourId] = useState("");
  const [seats, setSeats] = useState(1);

  const handleReserve = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/reservations", { tour: tourId, seats });
      alert("Reserva creada con ID: " + res.data._id);
    } catch (err) {
      alert(err.response?.data?.message || "Error al reservar");
    }
  };

  return (
    <form onSubmit={handleReserve} className="mt-6 space-y-2">
      <h2 className="text-xl font-semibold">Reservar Tour</h2>
      <input
        type="text"
        placeholder="ID del tour"
        value={tourId}
        onChange={(e) => setTourId(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        value={seats}
        min="1"
        onChange={(e) => setSeats(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Reservar
      </button>
    </form>
  );
}
