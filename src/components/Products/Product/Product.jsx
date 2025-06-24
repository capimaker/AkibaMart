import { useContext, useEffect } from "react";
import { ProductContext } from "../../../context/ProductContext/ProductState";
import { Link } from "react-router-dom";

const Product = () => {
  const { products, getProducts } = useContext(ProductContext); //usamos useContext para traernos el contexto de tareas que hemos creado
  useEffect(() => {
    getProducts(); //en el useContext se guardarán las tareas al ejecutar getProducts
  }, []);

  const productList = products.map((product) => { //renderizamos cada una de los productos
    return (
      <div className="product" key={product._id}>
        <h3>{product.name}</h3>
        <img
        src ={product.image}
        style = {{width:"200px", height:"auto"}}
        />
      </div>
    );
  });
  return <>{productList}</>;
};

export default Product;
