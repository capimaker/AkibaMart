// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext/UserState";
import api from "../utils/axios";

export default function Profile() {
  const { getUserInfo, user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo();
    (async () => {
      try {
        const { data } = await api.get("/orders");
        console.log("Pedidos recibidos:", data);
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [getUserInfo]);

  if (!user)    return <p>Cargando perfil…</p>;
  if (loading)  return <p>Cargando tus pedidos…</p>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>👤 Bienvenido, {user.name}</h1>

      <section style={{ marginTop: "2rem" }}>
        <h2>Mis pedidos:</h2>
        {orders.length === 0 ? (
          <p>No tienes pedidos todavía.</p>
        ) : (
          orders.map((order) => {
            // 1) calculamos total con optional chaining
            const total = order.products.reduce((sum, item) => {
              const price = item.product?.price ?? 0;
              const qty   = item.quantity ?? 0;
              return sum + price * qty;
            }, 0);

            return (
              <div
                key={order._id}
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid #ccc",
                  marginBottom: "1rem",
                }}
              >
                <p><strong>ID Pedido:</strong> {order._id}</p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p><strong>Total:</strong> €{total.toFixed(2)}</p>

                <details style={{ marginTop: "0.5rem" }}>
                  <summary style={{ cursor: "pointer" }}>
                    Ver productos ({order.products.length})
                  </summary>
                  <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
                    {order.products.map((item, i) => {
                      const name  = item.product?.name     ?? "Producto desconocido";
                      const price = item.product?.price    ?? 0;
                      const qty   = item.quantity           ?? 0;
                      return (
                        <li key={i}>
                          {name} × {qty} — €{price.toFixed(2)}
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
