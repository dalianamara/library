import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Menu.css";
import MyLibrary from "./pages/MyLibrary";
import Main from "./Main";
import Services from "./pages/Services";
import Faq from "./pages/Faq";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Online from "./pages/Online";
import ViewUsers from "./pages/ViewUsers";
import AddLibrarian from "./Admin/AddLibrarian";
import AddBooks from "./Librarian/AddBooks";
import ViewBooks from "./Librarian/ViewBooks";
import ViewLibrarians from "./Admin/ViewLibrarians";
export default function Menu() {
  return (
    <Router>
      <div className="horizontal-menu">
        <a>
          <Link to="/">HOME</Link>
        </a>
        <div className="dropdownMenu">
          <button className="dropdownbutton">MY LIBRARY</button>
          <div className="dropdown-menu">
            <a>
              <Link to="/online">Online Public Acces Catalogue</Link>
            </a>
            <a href="#">Access </a>
            <a href="#">LINK</a>
          </div>
        </div>
        <a>
          <Link to="/services">SERVICES</Link>
        </a>
        <a id="login">
          <Link to="/login">Login</Link>
        </a>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route index element={<Main />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="/online" element={<Online />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/viewusers" element={<ViewUsers />} />
          <Route path="/viewbooks" element={<ViewBooks />} />
          <Route path="/viewlib" element={<ViewLibrarians />} />
          <Route path="/addlib" element={<AddLibrarian />} />
          <Route path="/addbook" element={<AddBooks />} />
        </Routes>
      </div>
    </Router>
  );
}
