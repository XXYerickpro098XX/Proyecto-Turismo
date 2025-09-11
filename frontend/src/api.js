import axios from "axios";

const API = "http://localhost:5000/api";

// instancia de axios
const api = axios.create({
  baseURL: API,
});

// Interceptor: agrega token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
