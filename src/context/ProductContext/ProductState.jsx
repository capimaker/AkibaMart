import React, {createContext, useReducer} from 'react';
import axios from 'axios';
import ProductReducer from './ProductReducer';

const cart = JSON.parse (localStorage.getItem("cart")) || [];

const initialState = {
    products: [],
    product: {},
    cart: cart
};



export const ProductContext = createContext(initialState);//definimos contexto

export const ProductProvider = ({children }) => {
    const [state, dispatch] = useReducer(ProductReducer, initialState); //inicializamos reducer

const getProducts = async () => {
    const res = await axios.get("https://akibapi.onrender.com/products");
    dispatch({
        type:"GET_PRODUCTS",
        payload: res.data,
    });
}

const addCart = (product) => {
    dispatch({
        type: "ADD_CART",
        payload:product,
    });
};

const clearCart = () => {
    dispatch ({
        type:"CLEAR_CART",
    });
};

return (
    <ProductContext.Provider // hacemos global el estado de ProductContext, para que los children tengan acceso
    value = {{
        products:state.products,
        getProducts,
        addCart, 
        clearCart
    }}>
        {children}
    </ProductContext.Provider>
);
};

// const getProduct = async (_id) => {
//     try {
//         const res = await axios.get ("https://akibapi.onrender.com/products" + _id);
//         dispatch ({
//             type: "GET_TASK",
//             payload: res.data,
//         });
//     } catch (error) {
//         console.error (error);
//     }
// }
// }