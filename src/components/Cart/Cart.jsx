import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext/ProductState";
import orderService from "../../services/OrderService";
import { Link } from "react-router-dom";

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
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/products">
          <button>Ver productos</button>
        </Link>
      </div>
    );
  }

  const cartItems = cart.map((item, i) => (
    <div className="cart" key={i} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
      <h3>{item.name}</h3>
      <p>Cantidad: {item.quantity || 1}</p>
      <p>Subtotal: €{(item.price * (item.quantity || 1)).toFixed(2)}</p>
      {/* Eliminar individual aún no está implementado en el contexto */}
    </div>
  ));

  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}>
      <h1>🛒 Tu Carrito</h1>
      {cartItems}
      <h2>Total: €{total.toFixed(2)}</h2>
      <button onClick={clearCart} style={{ marginTop: "1rem" }}>
        Vaciar carrito
      </button>
      <button onClick={createNewOrder} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
        Realizar pedido
      </button>
    </div>
  );
};

export default Cart;
