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
import { ProductProvider} from "./context/ProductContext/ProductState";



function App() {

  return (
    <>
      <BrowserRouter>
        <UserProvider>
        <ProductProvider>
            <Header />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                  </PrivateRoute>
                  } />
                  <Route path="/register" element={<Register />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/products" element={<Products />} />
               {/*} <Route path="/cart" element={<Cart />} />*/}
            </Routes>
      </ProductProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
