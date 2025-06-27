import React from "react";
import { useCart } from "../context/CartContext/CartState";
import { Link }    from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/products">
          <button>Ver productos</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}>
      <h1>🛒 Tu Carrito</h1>
      {cart.map(item => (
        <div key={item._id} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
          <h3>{item.name}</h3>
          <p>Cantidad: {item.quantity}</p>
          <p>Subtotal: €{item.quantity * item.price}</p>
          <button onClick={() => removeFromCart(item)}>Eliminar</button>
        </div>
      ))}
      <h2>Total: €{total.toFixed(2)}</h2>
      <button onClick={clearCart} style={{ marginTop: "1rem" }}>
        Vaciar carrito
      </button>
      {/* Aquí ahora meteré  “Realizar pedido” */}
    </div>
  );
}
