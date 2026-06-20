import { Navigate, useLocation } from 'react-router-dom';

/**
 * Guards authenticated routes.
 * Stores the intended URL so we can redirect back after login.
 * Replace localStorage with a proper auth context when the backend is ready.
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('access_token');

  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
