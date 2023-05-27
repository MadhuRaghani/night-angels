import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function PrivateRoute({ children }) {
  const location = useLocation();
  const { token } = useContext(AuthContext);

  return token ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}

export default PrivateRoute;
