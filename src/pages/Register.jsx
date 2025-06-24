import { useState } from "react";
import axios from "../utils/axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
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
      const res = await axios.post("/users/register", formData);
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
    <div className="registro">
      <h1>Registro de usuario</h1>
      <form onSubmit={handleSubmit} className="submit" >
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
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
        <button type="submit">Registrarse</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
