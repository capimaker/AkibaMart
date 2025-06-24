import axios from "axios";
const axios = axios.create({
  baseURL: "https://akibapi.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});
export default axios;