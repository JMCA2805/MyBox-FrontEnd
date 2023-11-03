import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";

export default function ProtectedRoute({
  children,
  redirectTo = "/Login",
  rol,
}) {
  const { loading, isAuthenticated, user } = useAuth();
  if (loading) return <h1>Cargando...</h1>;
  if (!loading && !isAuthenticated)
    return <Navigate to={redirectTo} replace />;
  if (!rol.includes(user.rol)) return <Navigate to={redirectTo} replace />;
  return children ? children : <Outlet />;
}
