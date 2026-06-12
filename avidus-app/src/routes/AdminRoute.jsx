import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "Admin") {
    return <Navigate to="/tasks" />;
  }

  return children;
};

export default AdminRoute;
