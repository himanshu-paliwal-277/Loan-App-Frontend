import { Navigate } from 'react-router-dom';
import store from '../../store/state';
// import useAuthStore from './authStore';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = store();
  console.log("isAuthenticated: ", isAuthenticated, "role: ", role);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
