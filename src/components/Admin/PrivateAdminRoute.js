import { Navigate } from "react-router-dom";
import LoadingSpinner from "../pages/LoadingSpinner";
export default function PrivateAdminRoute({ children, type, isLoading }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return type === "" && isLoading === false ? (
    <LoadingSpinner isOpen={isLoading} />
  ) : isLoading === true ? (
    <LoadingSpinner isOpen={isLoading} />
  ) : isLoggedIn === "true" ? (
    type === "admin" ? (
      children
    ) : (
      <Navigate to="/signup" />
    )
  ) : (
    <Navigate to="/signup" />
  );
}
