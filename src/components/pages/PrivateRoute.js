import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, type }) {
  const auth = localStorage.isLoggedIn;

  return auth === "true" && type === "user" ? (
    children
  ) : (
    <Navigate to="/signup" />
  );
}
