import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductContext/ProductState";
import { Link } from "react-router-dom";

const Product = () => {
  const { products, getProducts } = useContext(ProductContext); //usamos useContext para traernos el contexto de tareas que hemos creado
  const [search, setSearch] = useState(""); //usamos useState para las búsquedas del buscador
  const [maxPrice, setMaxPrice] = useState(80);

  useEffect(() => {
    getProducts(); //en el useContext se guardarán las tareas al ejecutar getProducts
  }, []);

  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase(); //.toLowerCase hace que la búsqueda no sea case sensitive
    const nameMatch = product.name.toLowerCase().includes(term);
    const categoryMatch = product.categories.some(
      (
        category //el .some es un método que recorre el array y devuelve true si al menos un elemento cumple la
      ) =>
        //condición que le pasamos. Necesitamos .some porque las categorías son arrays de objetos en la API, mientras que el name en la API es un simple string y por eso
        // podemos usar .includes.
        category.name.toLowerCase().includes(term)
    );
    const priceMatch = product.price <= maxPrice;

    return (nameMatch || categoryMatch) && priceMatch;
  });

  return (
    <>
      <input
        type="text"
        placeholder="Buscar por nombre o categoría"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", display:"block" }}
      />

      <label htmlFor="price">Precio máximo:  €{maxPrice}</label>
      <input 
        type="range" //este rango nos permite establecer un precio mínimo
        id="price"
        min="0"
        max="80"
        step="1"
        value={maxPrice}
        onChange={(e) => setMaxPrice (Number(e.target.value))}
        style = {{ marginBottom: "20px", display:"block"}}
        />


      {filteredProducts.map((product) => (
        <div className="product" key={product._id}>
          <h3>{product.name}</h3>
          <p>Precio: €{product.price}</p>
          <img src={product.image} style={{ width: "200px", height: "auto" }} />
        </div>
      ))}
    </>
  );
};

export default Product;
