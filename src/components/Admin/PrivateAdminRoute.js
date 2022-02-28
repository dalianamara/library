import { Navigate, useEffect, useState } from "react-router-dom";

export default function PrivateAdminRoute({ children }) {
  const auth = localStorage.isLoggedIn;
  const user = localStorage.user;
  return auth === "true" && user === "admin" ? (
    children
  ) : (
    <Navigate to="/signup" />
  );
}
