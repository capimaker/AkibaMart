import React, {createContext, useReducer} from 'react';
import axios from 'axios';
import CartReducer from './CartReducer';




import  {createContext} from "react";

const initialState = {
    products: [],
};

const API_URL = "https://akibapi.onrender.com/products";

export const CartContext = createContext (initialState);

export const CartProvider = ({children }) => {
    const [state, dispatch] = useReducer(CartReducer, initialState); //inicializamos reducer

const getProducts = async () => {
    const res = await axios.get("https://akibapi.onrender.com/products");
    dispatch({
        type:"GET_PRODUCTS",
        payload: res.data,
    });
}
return (
    <CartContext.Provider // hacemos global el estado de CartContext
    value = {{
        products:state.products,
        getProducts,
    }}>
        {children}
    </CartContext.Provider>
);
};
