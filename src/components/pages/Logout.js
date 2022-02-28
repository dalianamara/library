import React, { useState, useEffect } from "react";
import "./Login.css";
import Footer from "../Footer";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  localStorage.setItem("isLoggedIn", false);
  return <div>{<Navigate to="/login" />}</div>;
};
export default Login;
