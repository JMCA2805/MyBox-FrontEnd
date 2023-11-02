import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";

export default function ProtectedRoute({ children, redirectTo = "/Login" }) {
  const { signup, signin, logout, isAuthenticated, loading } = useAuth();
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  return children ? children : <Outlet />;
}
