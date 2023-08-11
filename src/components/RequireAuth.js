import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/context";

function RequireAuth({ children, role }) {
  const auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!(auth.user.role === role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

export default RequireAuth;
