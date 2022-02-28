import { Navigate, useEffect, useState } from "react-router-dom";

export default function PrivateLibrarianRoute({ children }) {
  const auth = localStorage.isLoggedIn;
  const user = localStorage.user;
  return auth === "true" && user === "librarian" ? (
    children
  ) : (
    <Navigate to="/signup" />
  );
}
