import React, { useState } from "react";
import { useNavigate }     from "react-router-dom";
import { useUser } from "../context/UserContext/UserState";
import './Login.css'

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
    <div className="login__background">
    <div className="login__container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="form"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="form"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="form__button">
          Iniciar sesión
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
