import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [tours, setTours] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:4000/api/tours"; // tu backend

  // GET -> obtener tours
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await axios.get(API_URL);
      setTours(res.data);
    } catch (err) {
      console.error("Error al obtener tours:", err);
    }
  };

  // POST y PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await axios.put(`${API_URL}/${editId}`, { nombre, precio });
        setTours(tours.map(t => (t._id === editId ? res.data : t)));
        setEditId(null);
      } else {
        const res = await axios.post(API_URL, { nombre, precio });
        setTours([...tours, res.data]);
      }
      setNombre("");
      setPrecio("");
    } catch (err) {
      console.error("Error al guardar tour:", err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTours(tours.filter(t => t._id !== id));
    } catch (err) {
      console.error("Error al eliminar tour:", err);
    }
  };

  // EDIT
  const handleEdit = (tour) => {
    setNombre(tour.nombre);
    setPrecio(tour.precio);
    setEditId(tour._id);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Gestión de Tours</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Actualizar" : "Agregar"}</button>
      </form>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tours.map(tour => (
            <tr key={tour._id}>
              <td>{tour.nombre}</td>
              <td>${tour.precio}</td>
              <td>
                <button onClick={() => handleEdit(tour)}>Editar</button>
                <button onClick={() => handleDelete(tour._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
