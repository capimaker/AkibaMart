import {useContext} from "react";
import {ProductContext} from "../../context/ProductContext/ProductState";



const Cart = () => {
    const { cart, clearCart} = useContext (ProductContext);


    if (cart.length <= 0) {
        return <span> No tienes ningún producto añadido en el carrito</span>;
    
    }

    const createNewOrder = () => {
        createOrder(cart);
        clearCart();
    };

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
            <button onClick = {() => createNewOrder()}>Create Order </button>
        </div>
    );
};

export default Cart;