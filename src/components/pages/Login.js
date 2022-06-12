import React, { useState, useEffect } from "react";
import "./Login.css";
import Footer from "../Footer";
import { Link, Navigate } from "react-router-dom";
import bcrypt from "bcryptjs";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [records, setRecords] = useState([]);
  const [validPass, setValidPass] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const users = records.map((record) => record);

  const valid = () => {
    return username.length > 0 && password.length > 0;
  };
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/user/`);
      if (response.status !== 200) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  const findUser = (username) => {
    const userdata = users.find((user) => user.username === username);
    localStorage.setItem("id", userdata._id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userdata = users.find((user) => user.username === username);
    try {
      if (userdata) {
        if (bcrypt.compareSync(password, userdata.password)) {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("username", userdata.username);
          localStorage.setItem("firstName", userdata.first);
          localStorage.setItem("email", userdata.email);
          localStorage.setItem("user", userdata.user);
          setSuccess(true);

          setValidPass(true);
          setValidUsername(true);
          props.rerenderCallback();
        } else {
          throw Error("Wrong password");
        }
      } else {
        throw Error("Wrong username");
      }
    } catch (err) {
      if (err.message === "Wrong username") setValidUsername(false);
      else if (err.message === "Wrong password") setValidPass(false);
    }
    window.location.href = "/";
  };

  const renderForm = () => {
    return (
      <>
        <div className="content">
          <center>
            <br />
            <h1 style={{ marginBlockEnd: "0em" }}>Login</h1>
            <hr
              style={{ border: "1px solid black", borderColor: "#A04000" }}
            ></hr>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <br />
              <input
                type="text"
                name="uname"
                data-testid="username"
                required
                id={"username"}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  findUser(e.target.value);
                }}
              />
              <br />
              {!validUsername ? (
                <span
                  className="error"
                  data-testid="error"
                  style={{ color: "red" }}
                >
                  Sorry, your username is inccorect.
                </span>
              ) : (
                ""
              )}
              <br />
              <label>Password</label>
              <br />
              <input
                id={"password"}
                data-testid="password"
                name="pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              {!validPass ? (
                <span
                  className="error"
                  data-testid="error"
                  style={{ color: "red" }}
                >
                  Sorry, your password is inccorect.
                </span>
              ) : (
                ""
              )}
              <br />
              <button
                type="submit"
                block
                id="loginButton"
                size="lg"
                data-testid={"loginButton"}
                // id={"submit"}
                disabled={!valid()}
                submit={handleSubmit}
              >
                Login
              </button>
              <br />

              <Link
                to="/signup"
                style={{
                  color: "black",
                  marginLeft: "60.5%",
                  backgroundColor: "transparent",
                }}
              >
                Register
              </Link>
            </form>
            <br /> <br />
          </center>
        </div>
        <Footer></Footer>
      </>
    );
  };

  return <div>{success ? <Navigate to="/" /> : renderForm()}</div>;
};
export default Login;
