import { useEffect, useState } from "react";
import axios from "../utils/axios";

const Profile = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Error al cargar pedidos", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Mi Perfil</h1>
      <h2>Mis pedidos:</h2>
      {orders.length === 0 ? (
  <p>No tienes pedidos todavía.</p>
) : (
  orders.map((order) => (
  <div key={order.id} className="order">
    <p><strong>ID Pedido:</strong> {order.id}</p>
    <p><strong>Total:</strong> {order.total}€</p>
    <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>
  </div>
)))}
    </div>
  );
};

export default Profile;
