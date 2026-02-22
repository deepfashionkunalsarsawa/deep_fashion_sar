import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const ADMIN_PATH = import.meta.env.VITE_ADMIN_SECRET_PATH;

  if (!token) {
    return <Navigate to={`/${ADMIN_PATH}/login`} />;
  }

  return children;
}