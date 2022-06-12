import { Navigate } from "react-router-dom";

export default function PrivateAdminRoute({ children, type }) {
  const auth = localStorage.isLoggedIn;

  return auth === "true" && type === "admin" ? (
    children
  ) : (
    <Navigate to="/signup" />
  );
}
