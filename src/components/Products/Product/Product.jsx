
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductContext/ProductState";
import { Link } from "react-router-dom";
import './Product.css';

const API_BASE = "https://akibapi.onrender.com";

const Product = () => {
  const { products, getProducts, addCart, cart } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(35);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = products.filter((p) => {
    const term = search.toLowerCase();
    const nameMatch = p.name.toLowerCase().includes(term);
    const categoryMatch = p.categories?.some((c) =>
      c.name.toLowerCase().includes(term)
    );
    const priceMatch = p.price <= maxPrice;
    return (nameMatch || categoryMatch) && priceMatch;
  });

  return (
    <>
    <div className="product__container">
    <div>
      <div className="search__container">
      <input
        className="search_bar"
        type="text"
        placeholder="Buscar por nombre o categoría"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
  
      <label htmlFor="price" className="search__radio">Precio máximo: €{maxPrice}</label>
      <input 
      className="search__radio"
        type="range"
        id="price"
        min="0"
        max="35"
        step="1"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
    </div>
      {filteredProducts.length === 0 ? (
        <p>No se encontraron productos para esos criterios.</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((p) => {
            const imgSrc = p.image.startsWith("http")
              ? p.image
              : `${API_BASE}${p.image.startsWith("/") ? "" : "/"}${p.image}`;

            return (
              <div className="product" key={p._id}>
                <Link
                  to={`/products/${p._id}`}
                >
                  <h3>{p.name}</h3>
                  <img
                    src={imgSrc}
                    alt={p.name}
                  />
                </Link>
                <p>Precio: €{p.price}</p>
                <button onClick={() => addCart(p)}>Agregar al carrito</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default Product;