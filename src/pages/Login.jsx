import axios from "../utils/axios";

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("/users/login", {
      email,
      password
    });

    const { user, token } = response.data;

    login(user);
    localStorage.setItem("token", token);
    navigate("/home");

  } catch (error) {
    alert("Error al iniciar sesión: " + error.response?.data?.msg || "Error inesperado");
    console.error(error);
  }
};
