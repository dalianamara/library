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
  // const users = records.map((record) => record);
  const [model, setModel] = useState({
    username: "",
    password: "",
  });
  const valid = () => {
    return username.length > 0 && password.length > 0;
  };
  const [error, setError] = useState("");

  useEffect(() => {
    const newUser = { username: model.username, password: model.password };
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
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
  }, [model, records.length]);

  const update = (value) => {
    return setModel((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (records !== undefined) {
        if (model.username === records.username) {
          if (bcrypt.compareSync(model.password, records.password)) {
            localStorage.setItem("id", records._id);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("email", records.email);
            localStorage.setItem("user", records.user);
            props.setUserCallback(false, records.user);
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
      }
    } catch (err) {
      if (err.message === "Wrong username") {
        setValidUsername(false);
        setValidPass(true);
      } else if (err.message === "Wrong password") {
        setValidPass(false);
        setValidUsername(true);
      }
    }
    // window.location.href = "/";
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
                value={model.username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  update({ username: e.target.value });
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
                value={model.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  update({ password: e.target.value });
                }}
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
                // block
                id="loginButton"
                size="lg"
                data-testid={"loginButton"}
                disabled={!valid()}
                onSubmit={handleSubmit}
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
