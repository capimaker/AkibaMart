
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductContext/ProductState";
import { Link } from "react-router-dom";

const API_BASE = "https://akibapi.onrender.com";

const Product = () => {
  const { products, getProducts, addCart, cart } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(80);

  
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect (() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  
  const filteredProducts = products.filter((p) => {
    const term  = search.toLowerCase();
    const nameMatch = p.name.toLowerCase().includes(term);
    const categoryMatch = p.categories?.some((c) =>
      c.name.toLowerCase().includes(term)
    );
    const priceMatch = p.price <= maxPrice;
    return (nameMatch || categoryMatch) && priceMatch;
  });

  //incorporado para hacer el cart: 

const renderProduct = () => {
  return products.map((product) => (
    <div key={product._id}>
      <span>{product.name}</span>
      <span>{product.price.toFixed(2)}</span>
      <button onClick={() => addCart(product)}>Add Cart</button>
    </div>
  ));
};
  //fin del código necesario para cart

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre o categoría"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", display: "block" }}
      />

      <label htmlFor="price">Precio máximo: €{maxPrice}</label>
      <input
        type="range"
        id="price"
        min="0"
        max="80"
        step="1"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        style={{ marginBottom: "20px", display: "block" }}
      />

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
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3>{p.name}</h3>
                  <img
                    src={imgSrc}
                    alt={p.name}
                    style={{ width: "200px", height: "auto", cursor: "pointer" }}
                  />
                </Link>
                <p>Precio: €{p.price}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Aquí llamamos a renderProduct para mostrar la lista con el botón Add Cart */}
      <div className="cart-products">{renderProduct()}</div>
    </div>
  );
};

export default Product;