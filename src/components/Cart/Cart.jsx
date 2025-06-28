import {useContext} from "react";
import {ProductContext} from "../../context/ProductContext/ProductState";
import React, { useEffect } from "react";


const Cart = () => {
    const { cart, clearCart} = useContext (ProductContext);

useEffect (() => {
    localStorage.setItem ("cart", JSON.stringify(cart));
}, [cart]);


    if (cart.length <= 0) {
        return <span> No tienes ningún producto añadido en el carrito</span>;
    
    }

    const cartItem = cart.map((cartItem, i) => {
        return (
            <div className="cart" key= {i}>
                <span> {cartItem.name}</span>
                <span>{cartItem.price.toFixed(2)} €</span>
            </div>
        );
    });
    return (
        <div>
            {cartItem}
            <button onClick ={() => clearCart()}> Clear Cart </button>
        </div>
    );
};

export default Cart;