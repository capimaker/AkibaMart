import React, { useState } from "react";
import { useNavigate }     from "react-router-dom";
import { useUser } from "../context/UserContext/UserState";

const Login = () => {
  const { login } = useUser();
  const navigate  = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/home");
    } catch (error) {
      alert("Error al iniciar sesión: " + (error.response?.data?.msg || "Error inesperado"));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "3rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ padding: "0.5rem", background: "black", color: "white", border: "none", borderRadius: "5px" }}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
