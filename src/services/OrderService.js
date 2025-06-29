import axios from "axios";

const API_URL = "https://akibapi.onrender.com";

const createOrder = async (cart) => {
  // Extraemos los IDs de los productos del carrito
  const productIds = cart.map(product => product._id);

  // Obtenemos el token del localStorage
  const token = localStorage.getItem("token");

  // Añadimos "Bearer " al token para cumplir con lo que espera el backend
  const authHeader = `Bearer ${token}`;

  try {
    await axios.post(`${API_URL}/orders`, { productIds }, {
      headers: {
        authorization: authHeader,
      },
    });

    console.log("✅ Pedido creado con éxito");
  } catch (error) {
    console.error("❌ Error al crear el pedido:", error.response?.data || error.message);
  }
};

export default {
  createOrder,
};
