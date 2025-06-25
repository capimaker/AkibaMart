import { useUser } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

