import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext/ProductState";
import api from "../utils/axios";

const API_BASE = "https://akibapi.onrender.com";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addCart } = useContext(ProductContext); 

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Cargando producto…</p>;

  const imgSrc = product.image.startsWith("http")
    ? product.image
    : `${API_BASE}${product.image.startsWith("/") ? "" : "/"}${product.image}`;

  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}>
      <h1>{product.name}</h1>
      <img
        src={imgSrc}
        alt={product.name}
        style={{ width: "100%", maxWidth: 400, objectFit: "cover" }}
      />
      <p><strong>Precio:</strong> €{product.price}</p>
      <p><strong>Categorías:</strong> {product.categories?.map(c => c.name).join(", ")}</p>
      <p>{product.description}</p>
      <button
        onClick={() => addCart(product)} 
        style={{
          padding: "0.75rem 1.5rem",
          marginTop: "1rem",
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductDetail;
