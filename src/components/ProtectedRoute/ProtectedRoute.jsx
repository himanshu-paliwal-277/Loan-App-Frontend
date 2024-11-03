// import { Navigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import store from "../../store/state";
// import useAuthStore from './authStore';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = store();
  console.log("isAuthenticated: ", isAuthenticated, "role: ", role);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  console.log("require role: ", requiredRole, "role: ", role);

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  console.log("isAuthenticated: ", isAuthenticated, "role: ", role);

  return children;
};

export default ProtectedRoute;
