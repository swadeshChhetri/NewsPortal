import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { admin, token, loading } = useAdminAuth();
  if (loading) return null;

  if (!admin || !token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
