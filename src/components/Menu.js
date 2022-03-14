import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Menu.css";
import MyLibrary from "./pages/MyLibrary";
import settings from "./images/settings.png";
import Main from "./Main";
import Services from "./pages/Services";
import ProductPage from "./pages/ProductPage";
import Issue from "./pages/Issue";
import Faq from "./pages/Faq";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Online from "./pages/Online";
import ViewUsers from "./Librarian/ViewUsers";
import AddLibrarian from "./Admin/AddLibrarian";
import AddBooks from "./Librarian/AddBooks";
import ViewBooks from "./Librarian/ViewBooks";
import ViewIssuedBooks from "./Librarian/ViewIssuedBooks";
import ViewBooksAsUser from "./pages/ViewBooksAsUser";
import ViewLibrarians from "./Admin/ViewLibrarians";
import PrivateRoute from "./pages/PrivateRoute";
import PrivateAdminRoute from "./Admin/PrivateAdminRoute";
import { Component } from "react/cjs/react.production.min";
import PrivateLibrarianRoute from "./Librarian/PrivateLibrarianRoute";
import EditAddressDetails from "./pages/EditAddressDetails";
import EditBookDetails from "./Librarian/EditBookDetails";
import PendingBooks from "./Librarian/PendingBooks";
import PendingReservation from "./Librarian/PendingReservation";
import ReturnedBooks from "./Librarian/ReturnedBooks";
import ViewIssuedBooksByUser from "./pages/ViewIssuedBooksByUser";
import ReturnBooks from "./pages/ReturnBooks";
import AddReview from "./pages/AddReview";
import PendingReviews from "./Admin/PendingReviews";
import EditUser from "./pages/EditUser";
import RenewBook from "./pages/RenewBook";
import ViewReservedBooksByUser from "./pages/ViewReservedBooksByUser";
import ViewFines from "./pages/ViewFines";
import ViewPaidFines from "./Librarian/ViewPaidFines";
import EditUserAdmin from "./Librarian/EditUser";
import EditIssue from "./Librarian/EditIssue";
import Feedback from "./Feedback";
import Borrows from "./pages/Borrows";
import Extend from "./pages/Extend";
import Fees from "./pages/Fees";

function checkUser() {
  const user = localStorage.getItem("user");
  return user;
}
class Menu extends Component {
  constructor(props) {
    super(props);
    this.rerenderCallback = this.rerenderCallback.bind(this);
    this.rerenderSignupCallback = this.rerenderSignupCallback.bind(this);
  }
  rerenderCallback() {
    this.forceUpdate();
  }
  rerenderSignupCallback() {
    localStorage.setItem("isLoggedIn", false);
    this.forceUpdate();
  }
  useForceUpdate() {}

  render() {
    return (
      <Router>
        <div className="horizontal-menu">
          <a>
            <Link to="/">HOME</Link>
          </a>
          {/* check if user is admin then show admin related menu */}
          {localStorage.getItem("isLoggedIn") === "true" ? (
            checkUser() === "admin" ? (
              <div className="dropdownMenu">
                <button className="dropdownbutton">LIBRARIANS</button>
                <div className="dropdown-menu">
                  <a>
                    <Link to="/addlib">ADD LIBRARIAN</Link>
                  </a>
                </div>
              </div>
            ) : checkUser() === "librarian" ? (
              <div className="dropdownMenu">
                <button className="dropdownbutton">BOOKS</button>
                <div className="dropdown-menu">
                  <a>
                    <Link to="/addbook">ADD BOOK</Link>
                  </a>
                  <a>
                    <Link to="/viewbook">VIEW BOOKS</Link>
                  </a>
                  <a>
                    <Link to="/viewIssuedBooks">VIEW ISSUED BOOKS</Link>
                  </a>
                  <a>
                    <Link to="/pending">PENDING ISSUE BOOKS</Link>
                  </a>
                  <a>
                    <Link to="/returned">PENDING RETURNING BOOKS</Link>
                  </a>
                  <a>
                    <Link to="/reserve">RESERVED BOOKS</Link>
                  </a>
                </div>
              </div>
            ) : (
              <div className="dropdownMenu">
                <button className="dropdownbutton">MY LIBRARY</button>
                <div className="dropdown-menu">
                  <a>
                    <Link to="/online">Online Public Acces Catalogue</Link>
                  </a>
                  <a>
                    <Link to="/viewbooksuser">Catalogue</Link>
                  </a>
                  <a>
                    <Link to="/issuedBooks">Issued books</Link>
                  </a>
                  <a>
                    <Link to="/return">Returned books</Link>
                  </a>
                  <a>
                    <Link to="/reserved">Reserved books</Link>
                  </a>
                  <a>
                    <Link to="/fines">Fine and Fees</Link>
                  </a>
                </div>
              </div>
            )
          ) : (
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
          )}

          {checkUser() === "admin" &&
          localStorage.getItem("isLoggedIn") === "true" ? (
            <a>
              <Link to="/viewlib">VIEW LIBRARIANS</Link>
            </a>
          ) : checkUser() === "librarian" &&
            localStorage.getItem("isLoggedIn") === "true" ? (
            <div className="dropdownMenu">
              <button className="dropdownbutton">USERS</button>
              <div className="dropdown-menu">
                <a>
                  <Link to="/viewusers">VIEW USERS</Link>
                </a>
              </div>
            </div>
          ) : localStorage.getItem("isLoggedIn") === "true" &&
            checkUser() === "user" ? (
            <>
              <div className="dropdownMenu">
                <button className="dropdownbutton">SERVICES</button>
                <div className="dropdown-menu">
                  <a>
                    <Link to="/borrows">Borrows and returns</Link>
                  </a>
                  <a>
                    <Link to="/finesandfees">Fees</Link>
                  </a>
                  <a>
                    <Link to="/extend">Extend due date</Link>
                  </a>
                </div>
              </div>
              <Link
                // id="buttons"
                to="/record/edit"
                // onClick={async () => handleApproval("false")}
                style={{
                  background: "transparent",
                  border: "0px",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginLeft: "770px",
                  padding: "0px",
                }}
              >
                <img src={settings} alt="settings" style={{ width: "20px" }} />
              </Link>
            </>
          ) : (
            <>
              <a>
                <Link to="/services">SERVICES</Link>
              </a>
            </>
          )}

          {/* {checkUser() === "admin" &&
            localStorage.getItem("isLoggedIn") === "true" && (
              <a>
                <Link to="/pendingReviews">VIEW REVIEWS</Link>
              </a>
            )} */}

          {checkUser() === "admin" &&
          localStorage.getItem("isLoggedIn") === "true" ? (
            <a>
              <Link to="/pendingReviews">VIEW REVIEWS</Link>
            </a>
          ) : checkUser() === "librarian" &&
            localStorage.getItem("isLoggedIn") === "true" ? (
            <div className="dropdownMenu">
              <button className="dropdownbutton">FINES</button>
              <div className="dropdown-menu">
                <a>
                  <Link to="/paidfines">PAID FINES</Link>
                </a>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* check if user is logged in then show logout button instead of login  */}
          {localStorage.getItem("isLoggedIn") === "true" ? (
            <a id="login">
              <button
                style={{
                  background: "none",
                  borderColor: "none",
                  display: "block",
                  color: "white",
                  float: "left",
                  textDecoration: "none",
                  fontSize: "15px",
                  paddingBottom: "7px",
                  paddingTop: "7px",
                  // padding: "7px 7px",
                  // paddingRight: "6px",
                  borderStyle: "none",
                }}
                onClick={this.rerenderSignupCallback}
              >
                LOGOUT
              </button>
            </a>
          ) : (
            <a id="login">
              <Link to="/login">LOGIN</Link>
            </a>
          )}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route index element={<Main />} />
            <Route path="/mylibrary" element={<MyLibrary />} />
            <Route path="/online" element={<Online />} />
            <Route path="/services" element={<Services />} />
            {/* private admin routes  */}
            <Route
              path="/addlib"
              element={
                <PrivateAdminRoute>
                  <AddLibrarian />
                </PrivateAdminRoute>
              }
            />

            <Route
              path="/pendingReviews"
              element={
                <PrivateAdminRoute>
                  <PendingReviews />
                </PrivateAdminRoute>
              }
            />
            <Route
              path="/viewlib"
              element={
                <PrivateAdminRoute>
                  <ViewLibrarians />
                </PrivateAdminRoute>
              }
            />

            <Route
              path="/review/edit/:id"
              element={
                <PrivateAdminRoute>
                  <PendingReviews />
                </PrivateAdminRoute>
              }
            />
            {/* private librarian routes */}
            <Route
              path="/addbook"
              element={
                <PrivateLibrarianRoute>
                  <AddBooks />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/book/edit/:id"
              element={
                <PrivateLibrarianRoute>
                  <EditBookDetails />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/issue/update/:id"
              element={
                <PrivateLibrarianRoute>
                  <EditIssue />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/record/edit/:id"
              element={
                <PrivateLibrarianRoute>
                  <EditUserAdmin />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/viewbook"
              element={
                <PrivateLibrarianRoute>
                  <ViewBooks />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/pending"
              element={
                <PrivateLibrarianRoute>
                  <PendingBooks />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/reserve"
              element={
                <PrivateLibrarianRoute>
                  <PendingReservation />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/returned"
              element={
                <PrivateLibrarianRoute>
                  <ReturnedBooks />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/viewusers"
              element={
                <PrivateLibrarianRoute>
                  <ViewUsers />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/paidfines"
              element={
                <PrivateLibrarianRoute>
                  <ViewPaidFines />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/viewIssuedBooks"
              element={
                <PrivateLibrarianRoute>
                  <ViewIssuedBooks />
                </PrivateLibrarianRoute>
              }
            />

            {/* private user routes */}
            <Route
              path="/viewbooksuser"
              element={
                <PrivateRoute>
                  <ViewBooksAsUser />
                </PrivateRoute>
              }
            />

            <Route
              path="/record/edit"
              element={
                <PrivateRoute>
                  <EditUser />
                </PrivateRoute>
              }
            />

            <Route
              path="/issue/edit/:id"
              element={
                <PrivateRoute>
                  <RenewBook />
                </PrivateRoute>
              }
            />

            <Route
              path={`/:id`}
              element={
                <PrivateRoute>
                  <ProductPage id={window.location} />
                </PrivateRoute>
              }
            />
            <Route
              path="/return"
              element={
                <PrivateRoute>
                  <ReturnBooks />
                </PrivateRoute>
              }
            />
            <Route
              path={`/:id/issue`}
              element={
                <PrivateRoute>
                  <Issue id={window.location} />
                </PrivateRoute>
              }
            />

            <Route
              path={`/:id/reserve`}
              element={
                <PrivateRoute>
                  <Issue id={window.location} type="reserve" />
                </PrivateRoute>
              }
            />

            <Route
              path={`/add`}
              element={
                <PrivateRoute>
                  <AddReview />
                </PrivateRoute>
              }
            />

            <Route
              path={`/:id/changeSettings`}
              element={
                <PrivateRoute>
                  <EditAddressDetails />
                </PrivateRoute>
              }
            />

            <Route
              path={`/issuedBooks`}
              element={
                <PrivateRoute>
                  <ViewIssuedBooksByUser />
                </PrivateRoute>
              }
            />

            <Route
              path={`/reserved`}
              element={
                <PrivateRoute>
                  <ViewReservedBooksByUser />
                </PrivateRoute>
              }
            />

            <Route
              path={`/fines`}
              element={
                <PrivateRoute>
                  <ViewFines />
                </PrivateRoute>
              }
            />

            {/* public access */}
            <Route
              path="/login"
              element={<Login rerenderCallback={this.rerenderCallback} />}
            />
            <Route path="/faq" element={<Faq />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/finesandfees" element={<Fees />} />
            <Route path="/extend" element={<Extend />} />
            <Route path="/borrows" element={<Borrows />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default Menu;
