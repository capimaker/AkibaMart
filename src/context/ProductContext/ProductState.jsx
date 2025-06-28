import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import ProductReducer from './ProductReducer';

let cart = [];
try {
  const storedCart = localStorage.getItem("cart");
  cart = storedCart && storedCart !== "undefined" ? JSON.parse(storedCart) : [];
} catch (error) {
  cart = [];
}

const initialState = {
  products: [],
  product: {},
  cart: cart
};

export const ProductContext = createContext(initialState);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

 
  const getProducts = async () => {
    try {
      const res = await axios.get("https://akibapi.onrender.com/products");
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
      });
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  
  useEffect(() => {
    getProducts();
  }, []);

  const addCart = (product) => {
    dispatch({
      type: "ADD_CART",
      payload: product,
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        getProducts,      
        addCart,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};