{/*import AddProduct from "./AddProduct/AddProduct"; Necesario si sólo hacemos el CRUD*/}
import React, {useContext, useEffect} from "react";
import { ProductContext } from "../../context/ProductContext/ProductState";
import Product from "./Product/Product";

const Products = () => {
  return (
    <div>
      {/*<AddProduct/>*/}
      <Product />
  
    </div>
  );
};

export default Products;

const ProductsCart = () =>  {
  const {getProducts, products} = useContext (ProductContext);

  useEffect(() => {
    getProducts();
  }, []);

  const product = products.map ((product) => {
    return (
      <div key = {product._id}>
        <span> {product.name}</span>
        <span> {product.price.toFixed(2)}</span>
      </div>
    );
  });
};

export default ProductsCart;
