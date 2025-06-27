
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext/UserState";

const PrivateRoute = ({ children }) => {
  const { token } = useUser();
  const location = useLocation();

  // Si no tenemos token, vamos a login (guardamos de dónde venimos)
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si hay token, mostramos la ruta protegida
  return children;
};

export default PrivateRoute;
