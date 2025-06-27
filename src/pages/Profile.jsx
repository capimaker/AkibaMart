import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext/UserState";
import api from "../utils/axios";

 const Profile = () => {
   const { getUserInfo, user } = useUser();
 
 const [orders, setOrders] = useState([]);

   useEffect(() => {
  
   getUserInfo();
   
    const fetchOrders = async () => {
      try {
       const { data } = await api.get("/orders");
       setOrders(data);
     } catch (err) {
       console.error("Error al cargar pedidos:", err);
     }
   };
   fetchOrders();
   }, []);

   if (!user) {
     return <span>👤</span>;
   }


 return (
   <div style={{ maxWidth: 600, margin: "2rem auto" }}>
     <h1>👤 Perfil de {user.name}</h1>

      <section style={{ marginTop: "2rem" }}>
       <h2>Mis pedidos</h2>
        {orders.length === 0 ? (
          <p>No tienes pedidos todavía.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
              <p><strong>ID Pedido:</strong> {order._id}</p>
              <p><strong>Total:</strong> €{order.total}</p>
              <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
         ))
        )}
      </section>
    </div>
  );
 };

 export default Profile;