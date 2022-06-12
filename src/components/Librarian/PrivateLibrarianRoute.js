import { Navigate } from "react-router-dom";

export default function PrivateLibrarianRoute({ children, type }) {
  const auth = localStorage.isLoggedIn;
  console.log(type);
  return auth === "true" && type === "librarian" ? (
    children
  ) : (
    <Navigate to="/signup" />
  );
}
