import axios from "axios";

const API_URL = "https://akibapi.onrender.com";

const createOrder = async (cart) => {
  const token = localStorage.getItem("token");
  

  const productIds = cart.map(product => product._id);

  try {
    await axios.post(`${API_URL}/orders`, { productIds }, {
      headers: {
        authorization: token, 
      },
    });
  } catch (error) {
    console.error("Error al crear el pedido:", error.response?.data || error.message);
  }
};


const orderService = {
    createOrder,
};

export default orderService;