import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./components/Products/Products";
import { ProductProvider } from "./context/ProductContext/ProductState";
import { CartProvider } from "./context/CartContext/CartState";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ProductProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/register" element = {<Regiser />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Products />
          </Router>
        </ProductProvider>
      </UserProvider>
    </div>
  );
}

export default App;
