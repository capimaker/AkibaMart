import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/routes/PrivateRoute";
import Header from "./components/layout/Header";
import { UserProvider } from "./context/UserContext/UserState";
import Products from "./components/Products/Products";
import { ProductProvider } from "./context/ProductContext/ProductState";
import Cart from "./components/Cart/Cart";
import ProductDetail from "./components/Products/ProductDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <ProductProvider>
              <Header />
              <Routes>
                <Route path="/products" element={<Products />} />
                 <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
              </Routes>
              <Products />
          </ProductProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;