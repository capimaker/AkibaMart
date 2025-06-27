// src/utils/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://akibapi.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor que se ejecuta antes de cada petición
api.interceptors.request.use((config) => {
  // 1) Recupera el token, si existe
  const token = localStorage.getItem("token");
  // 2) Si lo hay, añade el header Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
