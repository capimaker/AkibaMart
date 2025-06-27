import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/routes/PrivateRoute";
import Header from "./components/layout/Header";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext/UserState";
import Products from "./components/Products/Products";
import { ProductProvider } from "./context/ProductContext/ProductState";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <ProductProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/products" element={<Products />} />
                <Route path="/register" element={<Regiser />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
              <Products />
            </Router>
          </ProductProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
