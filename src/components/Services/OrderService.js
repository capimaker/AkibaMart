import axios from "axios";

const API_URL = "https://akibapi.onrender.com/orders";

const createOrder = async (cart) => {
    const token = localStorage.getItem("token");
    const productIds = cart.map(product => product._id);

    try {
        await axios.post(API_URL + "/create", { productIds }, {
            headers: {
                authorization: token,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

const orderService = {
    createOrder,
};

export default orderService;