import axios from "axios";
const API_URL = "https://akibapi.onrender.com/api-docs/orders";

const createOrder = async (cart) => {
    const token = localStorage.getItem("token");
    try {
        await axios.post(API_URL + "/create", { productIds: cart },
            {
                headers: {
                    authorization: token,
                },
            },);
    } catch (error) {
        console.error(error)
    }
};

const orderService = {
    createOrder
};

export default orderService;
  