import { useState } from "react";
import api from "../utils/axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  name: "",
  last_name: "",
  email: "",
  password: "",
  adress: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users", formData);
      const { user, token } = res.data;

      register(user);
      localStorage.setItem("token", token);
      navigate("/home");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Error al registrarse");
    }
  };

  return (
    
     <div style={{ maxWidth: "400px", margin: "3rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "10px" }}>
    <h1 style={{ textAlign: "center" }}>Registro</h1>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="last_name"
          placeholder="Apellido"
          value={formData.last_name}
          onChange={handleChange}
          required
          />
        
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

        <input
          type="text"
          name="adress"
          value={formData.adress || ""}
          onChange={handleChange}
          placeholder="Introduce tu dirección"
          />
        <button type="submit" style={{ padding: "0.5rem", background: "black", color: "white", border: "none", borderRadius: "5px" }}>Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
