import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Usage: <ProtectedRoute role="ngo"><SomePage /></ProtectedRoute>
function ProtectedRoute({ role, children }) {
  const { user } = useAuth();

  // Not logged in: go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role: go to home
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;