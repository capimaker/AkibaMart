
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext/ProductState";
import { useUser } from "../context/UserContext/UserState";
import api from "../utils/axios";

export default function Home() {
  const { user } = useUser();
  const { products, getProducts } = useContext(ProductContext);

  
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  
  const topFive = products.slice(0, 5);

  return (
    <div style={{ padding: "2rem" }}>
     
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        {user
          ? `Bienvenido, ${user.name} a AkibaMart`
          : "Bienvenido a AkibaMart"}
      </h2>

      
      <div className="home-product-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem" }}>
        {topFive.map((p) => (
          <div key={p._id} className="product-card" style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <Link to={`/products/${p._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h3>{p.name}</h3>
              <img
                src={
                  p.image.startsWith("http")
                    ? p.image
                    : `https://akibapi.onrender.com${p.image.startsWith("/home") ? "" : "/home"}${p.image}`
                }
                alt={p.name}
                style={{ width: "100%", height: "auto", objectFit: "cover", marginBottom: "0.5rem" }}
              />
            </Link>
            <p><strong>€{p.price}</strong> 🛒 </p>
          </div>
        ))}
      </div>

      
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link to="/products">
          <button style={{
            padding:      "0.75rem 1.5rem",
            fontSize:     "1rem",
            background:   "#111",
            color:        "#fff",
            border:       "none",
            borderRadius: "5px",
            cursor:       "pointer"
          }}>
            Ver todos los productos
          </button>
        </Link>
      </div>
    </div>
  );
}
