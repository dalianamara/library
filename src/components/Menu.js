import React from "react";
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
import EditUserAdmin from "./Admin/EditLibrarian";
import EditUserLibrarian from "./Librarian/EditLibrarian";
import EditUserByLibrarian from "./Librarian/EditUser";
import EditIssue from "./Librarian/EditIssue";
import Feedback from "./Feedback";
import Borrows from "./pages/Borrows";
import Extend from "./pages/Extend";
import Fees from "./pages/Fees";
import Terms from "./pages/Terms";
import About from "./About";
import Contact from "./Contact";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.rerenderCallback = this.rerenderCallback.bind(this);
    this.rerenderSignupCallback = this.rerenderSignupCallback.bind(this);
    this.state = {
      user: [],
    };
  }

  checkUser() {
    if (this.state.user === undefined) return "none";
    else return this.state.user.user;
  }

  componentDidMount() {
    fetch(`http://localhost:5000/user/`)
      .then((response) => response.json())
      .then((user) => {
        const users = user.find((user) => user._id === localStorage.id);
        this.setState({ user: users });
      })
      .catch((e) => {
        this.setState({ user: [{ user: "none" }] });
        console.log("The user does not exist");
        return;
      });
  }

  rerenderCallback() {
    this.forceUpdate();
  }

  useForceUpdate() {}

  rerenderSignupCallback() {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("username", null);
    localStorage.setItem("firstName", null);
    localStorage.setItem("user", null);
    localStorage.setItem("email", null);
    localStorage.setItem("id", null);
    this.forceUpdate();
  }

  render() {
    return (
      <Router>
        <div className="horizontal-menu">
          <Link to="/" className={"menuButton"}>
            HOME
          </Link>
          {console.log(this.checkUser())}
          {/* check if user is admin then show admin related menu */}
          {localStorage.getItem("isLoggedIn") === "true" ? (
            this.checkUser() === "admin" ? (
              <div className="dropdownMenu">
                <button className="dropdownbutton">LIBRARIANS</button>
                <div className="dropdown-menu">
                  <Link to="/addlib" className={"menuButton"}>
                    ADD LIBRARIAN
                  </Link>
                  <Link to="/viewlib" className={"menuButton"}>
                    VIEW LIBRARIANS
                  </Link>
                </div>
              </div>
            ) : this.checkUser() === "librarian" ? (
              <div className="dropdownMenu">
                <button className="dropdownbutton">BOOKS</button>
                <div className="dropdown-menu">
                  <Link to="/addbook" className={"menuButton"}>
                    ADD BOOK
                  </Link>

                  <Link to="/viewbook" className={"menuButton"}>
                    VIEW BOOKS
                  </Link>

                  <Link to="/viewIssuedBooks" className={"menuButton"}>
                    VIEW ISSUED BOOKS
                  </Link>

                  <Link to="/pending" className={"menuButton"}>
                    PENDING ISSUE BOOKS
                  </Link>

                  <Link to="/returned" className={"menuButton"}>
                    PENDING RETURNING BOOKS
                  </Link>

                  <Link to="/reserve" className={"menuButton"}>
                    PENDING RESERVED BOOKS
                  </Link>
                </div>
              </div>
            ) : this.checkUser() === "user" ? (
              <div className="dropdownMenu">
                <button className="dropdownbutton">MY LIBRARY</button>
                <div className="dropdown-menu">
                  <Link to="/online" className={"menuButton"}>
                    Online Public Acces Catalogue
                  </Link>

                  <Link to="/viewbooksuser" className={"menuButton"}>
                    Catalogue
                  </Link>

                  <Link to="/issuedBooks" className={"menuButton"}>
                    Issued books
                  </Link>

                  <Link to="/return" className={"menuButton"}>
                    Returned books
                  </Link>

                  <Link to="/reserved" className={"menuButton"}>
                    Reserved books
                  </Link>

                  <Link to="/fines" className={"menuButton"}>
                    Fine and Fees
                  </Link>
                </div>
              </div>
            ) : (
              <div className="dropdownMenu">
                <button className="dropdownbutton">MY LIBRARY</button>
                <div className="dropdown-menu">
                  <Link to="/online" className={"menuButton"}>
                    Online Public Access Catalogue
                  </Link>
                </div>
              </div>
            )
          ) : (
            <div className="dropdownMenu">
              <button className="dropdownbutton">MY LIBRARY</button>
              <div className="dropdown-menu">
                <Link to="/online" className={"menuButton"}>
                  Online Public Access Catalogue
                </Link>
              </div>
            </div>
          )}

          {this.checkUser() === "admin" &&
          localStorage.getItem("isLoggedIn") === "true" ? (
            ""
          ) : this.checkUser() === "librarian" &&
            localStorage.getItem("isLoggedIn") === "true" ? (
            <div className="dropdownMenu">
              <button className="dropdownbutton">USERS</button>
              <div className="dropdown-menu">
                <Link to="/viewusers" className={"menuButton"}>
                  VIEW USERS
                </Link>
              </div>
            </div>
          ) : localStorage.getItem("isLoggedIn") === "true" &&
            this.checkUser() === "user" ? (
            <>
              <div className="dropdownMenu">
                <button className="dropdownbutton">SERVICES</button>
                <div className="dropdown-menu">
                  <Link to="/borrows" className={"menuButton"}>
                    Borrows and returns
                  </Link>

                  <Link to="/finesandfees" className={"menuButton"}>
                    Fees
                  </Link>

                  <Link to="/extend" className={"menuButton"}>
                    Extend due date
                  </Link>
                </div>
              </div>
              <Link
                // id="buttons"
                to="/user/edit"
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
            <></>
          )}
          {this.checkUser() === "admin" &&
          localStorage.getItem("isLoggedIn") === "true" ? (
            <Link to="/pendingReviews" className={"menuButton"}>
              VIEW REVIEWS
            </Link>
          ) : this.checkUser() === "librarian" &&
            localStorage.getItem("isLoggedIn") === "true" ? (
            <>
              <div className="dropdownMenu">
                <button className="dropdownbutton">FINES</button>
                <div className="dropdown-menu">
                  <Link to="/paidfines">PAID FINES</Link>
                </div>
              </div>
              <Link
                // id="buttons"
                to="/user/edit"
                // onClick={async () => handleApproval("false")}
                style={{
                  background: "transparent",
                  border: "0px",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginLeft: "750px",
                  padding: "0px",
                }}
              >
                <img src={settings} alt="settings" style={{ width: "20px" }} />
              </Link>
            </>
          ) : (
            ""
          )}

          {/* check if user is logged in then show logout button instead of login  */}
          {localStorage.getItem("isLoggedIn") === "true" ? (
            <a id="login" data-testid="login">
              <button
                style={{
                  background: "none",
                  borderColor: "none",
                  display: "block",
                  color: "white",
                  float: "left",
                  textDecoration: "none",
                  fontSize: "15px",
                  cursor: "pointer",
                  borderStyle: "none",
                }}
                onClick={this.rerenderSignupCallback}
              >
                LOGOUT
              </button>
            </a>
          ) : (
            <Link to="/login" style={{ float: "right" }}>
              LOGIN
            </Link>
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
                <PrivateAdminRoute type={this.checkUser()}>
                  <AddLibrarian />
                </PrivateAdminRoute>
              }
            />

            <Route
              path="/pendingReviews"
              element={
                <PrivateAdminRoute type={this.checkUser()}>
                  <PendingReviews />
                </PrivateAdminRoute>
              }
            />
            <Route
              path="/viewlib"
              element={
                <PrivateAdminRoute type={this.checkUser()}>
                  <ViewLibrarians />
                </PrivateAdminRoute>
              }
            />

            <Route
              path="/review/edit/:id"
              element={
                <PrivateAdminRoute type={this.checkUser()}>
                  <PendingReviews />
                </PrivateAdminRoute>
              }
            />
            {/* private librarian routes */}
            <Route
              path="/addbook"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <AddBooks />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/book/edit/:id"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <EditBookDetails />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/issue/update/:id"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <EditIssue />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/user/edit/:id"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <EditUserLibrarian />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/record/edit/:id"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <EditUserByLibrarian />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <PrivateAdminRoute type={this.checkUser()}>
                  <EditUserAdmin />
                </PrivateAdminRoute>
              }
            />

            <Route
              path="/viewbook"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <ViewBooks />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/pending"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <PendingBooks />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/reserve"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <PendingReservation />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/returned"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <ReturnedBooks />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/viewusers"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <ViewUsers />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/paidfines"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <ViewPaidFines />
                </PrivateLibrarianRoute>
              }
            />

            <Route
              path="/viewIssuedBooks"
              element={
                <PrivateLibrarianRoute type={this.checkUser()}>
                  <ViewIssuedBooks />
                </PrivateLibrarianRoute>
              }
            />

            {/* private user routes */}
            <Route
              path="/viewbooksuser"
              element={
                <PrivateRoute type={this.checkUser()}>
                  <ViewBooksAsUser />
                </PrivateRoute>
              }
            />

            <Route
              path="/user/edit"
              element={
                <PrivateRoute type={this.checkUser()}>
                  <EditUser />
                </PrivateRoute>
              }
            />

            <Route
              path="/issue/edit/:id"
              element={
                <PrivateRoute type={this.checkUser()}>
                  <RenewBook />
                </PrivateRoute>
              }
            />

            <Route
              path={`/:id`}
              element={
                <PrivateRoute type={this.checkUser()}>
                  <ProductPage id={window.location} />
                </PrivateRoute>
              }
            />
            <Route
              path="/return"
              element={
                <PrivateRoute type={this.checkUser()}>
                  <ReturnBooks />
                </PrivateRoute>
              }
            />
            <Route
              path={`/:id/issue`}
              element={
                <PrivateRoute type={this.checkUser()}>
                  <Issue id={window.location} />
                </PrivateRoute>
              }
            />

            <Route
              path={`/:id/reserve`}
              element={
                <PrivateRoute type={this.checkUser()}>
                  <Issue id={window.location} type="reserve" />
                </PrivateRoute>
              }
            />

            <Route
              path={`/add`}
              element={
                <PrivateRoute type={this.checkUser()}>
                  <AddReview />
                </PrivateRoute>
              }
            />

            <Route
              path={`/:id/changeSettings`}
              element={
                <PrivateRoute type={this.checkUser()}>
                  <EditAddressDetails />
                </PrivateRoute>
              }
            />

            <Route
              path={`/issuedBooks`}
              element={
                <PrivateRoute type={this.checkUser()}>
                  <ViewIssuedBooksByUser />
                </PrivateRoute>
              }
            />

            <Route
              path={`/reserved`}
              element={
                <PrivateRoute type={this.checkUser()}>
                  <ViewReservedBooksByUser />
                </PrivateRoute>
              }
            />

            <Route
              path={`/fines`}
              element={
                <PrivateRoute type={this.checkUser()}>
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
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
