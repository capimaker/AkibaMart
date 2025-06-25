import axios from "axios";

const api = axios.create({
  baseURL: "https://akibapi.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
