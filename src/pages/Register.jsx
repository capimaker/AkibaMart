
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios"; 
import './Register.css'

const Register = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:      "",
    last_name: "",
    email:     "",
    password:  "",
    adress:    "",
  });

  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      
      await api.post("/users", formData);
      
      
      navigate("/login");
    } catch (err) {
      
      console.error("Error al registrarse:", err);
      setError(err.response?.data?.message || "Error inesperado");
    }
  };

  
  return (
    <div className='register__background'>
    <div className="register__container">
      <h1 style={{ textAlign: "center" }}>Registro</h1>

      
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="register__form"
      >
        
        <input
         className="form"
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
         className="form"
          type="text"
          name="last_name"
          placeholder="Apellidos"
          value={formData.last_name}
          onChange={handleChange}
          required
        />

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

        <input
         className="form"
          type="text"
          name="adress"
          placeholder="Dirección"
          value={formData.adress}
          onChange={handleChange}
        />

        
        <button
          type="submit"
          className="register__button"
        >
          Registrarse
        </button>
      </form>
    </div>
    </div>
  );
};


export default Register;
