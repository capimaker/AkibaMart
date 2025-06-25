
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/routes/PrivateRoute";
import Header from "./components/layout/Header";

function App() {
  return (
    <>
   <Header/>
      <main>
        <Routes>
          <Route path="/home" element={<h2>Bienvenido a AkibaMart</h2>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
           <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        </Routes>
      </main>
     </>
  );
}

export default App;
