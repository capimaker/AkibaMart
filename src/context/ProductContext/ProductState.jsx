import React, {createContext, useReducer} from 'react';
import axios from 'axios';
import ProductReducer from './ProductReducer';

const initialState = {
    products: [],
    product: {},

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

return (
    <ProductContext.Provider
    value = {{
        products:state.products,
        getProducts,
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