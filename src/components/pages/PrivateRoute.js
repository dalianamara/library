import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const auth = localStorage.isLoggedIn;
  return auth === "true" ? children : <Navigate to="/signup" />;
}
