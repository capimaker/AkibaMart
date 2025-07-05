
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext/ProductState";
import { useUser } from "../context/UserContext/UserState";
import api from "../utils/axios";
import './Home.css'

export default function Home() {
  const { user } = useUser();
  const { products, getProducts } = useContext(ProductContext);

  
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  
  const topFive = products.slice(0, 5);

  return (
    <>
      <h2 className="welcome">
        {user
          ? `Bienvenido, ${user.name} a AkibaMart`
          : "Bienvenido a AkibaMart"}
      </h2>
    <div className="home__container">
        <Link to="/products">
          <button>
            <strong>
            Ver todos los productos
            </strong>
          </button>
        </Link>
        </div>
    <div>

      <div>
      <div className="home-product-list" >
        {topFive.map((p) => (
          <div key={p._id} className="product-card" >
            <Link to={`/products/${p._id}`} >
              <h3>{p.name}</h3>
              <img
                src={
                  p.image.startsWith("http")
                    ? p.image
                    : `https://akibapi.onrender.com${p.image.startsWith("/home") ? "" : "/home"}${p.image}`
                }
                alt={p.name}
              />
            </Link>
            <p><strong>€{p.price}</strong> 🛒 </p>
          </div>
        ))}
      </div>
      </div>
      </div>
    </>
  );
}
