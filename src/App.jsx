import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Products from "./components/Products/Products";
import { ProductProvider} from "./context/ProductContext/ProductState";

function App() {
  return (
    <div className ="App">
      <ProductProvider>
      <Products/>
      </ProductProvider>
    </div>
  );
}

export default App;
