import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext/ProductState";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  const product = products.find((p) => p._id === id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Precio: €{product.price}</p>
      <img src={product.image} alt={product.name} style={{ width: "200px" }} />
    </div>
  );
};

export default ProductDetail;