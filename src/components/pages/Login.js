import React, { useState, useEffect } from "react";
import "./Login.css";
import Footer from "../Footer";
import { Link, Navigate } from "react-router-dom";
import bcrypt from "bcryptjs";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState([]);
  const [validPass, setValidPass] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const [userModel, setUserModel] = useState({
    username: "",
    password: "",
  });
  const valid = () => {
    return username.length > 0 && password.length > 0;
  };

  useEffect(() => {
    const newUser = {
      username: userModel.username,
      password: userModel.password,
    };
    async function getUsers() {
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
      const user = await response.json();
      setUser(user);
    }
    getUsers();
    return;
  }, [userModel, user.length]);

  const update = (value) => {
    return setUserModel((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (user !== undefined) {
        if (userModel.username === user.username) {
          if (bcrypt.compareSync(userModel.password, user.password)) {
            localStorage.setItem("id", user._id);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("email", user.email);
            localStorage.setItem("user", user.user);
            props.setUserCallback(false, user, user.user);
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
              <label style={{ marginLeft: "-280px" }}>Username</label>
              <br />
              <input
                type="text"
                name="uname"
                data-testid="username"
                required
                id={"username"}
                value={userModel.username}
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
              <label style={{ marginLeft: "-280px" }}>Password</label>
              <br />
              <input
                id={"password"}
                data-testid="password"
                name="pass"
                type="password"
                value={userModel.password}
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
