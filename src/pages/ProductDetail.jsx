import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext/ProductState";
import api from "../utils/axios";
import './ProductDetail.css'

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

  if (!product) return <p className="loading">Cargando producto…</p>;

  const imgSrc = product.image.startsWith("http")
    ? product.image
    : `${API_BASE}${product.image.startsWith("/") ? "" : "/"}${product.image}`;

  return (
    <div className="product__background">
    <div className="product__card">
      <h1>{product.name}</h1>
      <img
        src={imgSrc}
        alt={product.name}
      />
      <p><strong>Precio:</strong> €{product.price}</p>
      <p><strong>Categorías:</strong> {product.categories?.map(c => c.name).join(", ")}</p>
      <p>{product.description}</p>
        <button onClick={() => addToCart(product)} >
       Añadir al carrito
     </button>
    </div>
    </div>
  );
};

export default ProductDetail;
