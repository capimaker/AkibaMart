import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext/ProductState";
import orderService from "../../services/OrderService";
import { Link } from "react-router-dom";
import './Cart.css'

const Cart = () => {
  const { cart, clearCart } = useContext(ProductContext);

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const createNewOrder = async () => {
    await orderService.createOrder(cart);
    clearCart();
    alert("Pedido realizado con éxito");
  };

  if (cart.length <= 0) {
    return (
      <div className="cart__background">
      <div className="cart__empty">
        <h2>Tu carrito está vacío</h2>
        <Link to="/products">
          <button>Ver productos</button>
        </Link>
      </div>
      </div>
    );
  }

  const cartItems = cart.map((item, i) => (
    <div className="cart" key={i}>
      <h3>{item.name}</h3>
      <p>Cantidad: {item.quantity || 1}</p>
      <p>Subtotal: €{(item.price * (item.quantity || 1)).toFixed(2)}</p>
    </div>
  ));

  return (
    <div className="cart__background">
    <div className="cart__container">
      <h1>🛒 Tu Carrito</h1>
      {cartItems}
      <h2>Total: €{total.toFixed(2)}</h2>
      <button onClick={clearCart}>
        Vaciar carrito
      </button>
      <button onClick={createNewOrder}>
        Realizar pedido
      </button>
    </div>
    </div>
  );
};

export default Cart;
