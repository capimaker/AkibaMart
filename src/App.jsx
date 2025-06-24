import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Importar páginas
//import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
//import Cart from "./pages/Cart";
//import AdminPanel from "./pages/AdminPanel";
//import ProductDetail from "./pages/ProductDetail";

// Importar layout
//import Header from "./components/layout/Header";
//import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
         {/* <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
         {/* <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/products/:id" element={<ProductDetail />} />*/}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
