import React, { useState } from "react";
import "./Login.css";
import Footer from "../Footer";
import { Link } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const valid = () => {
    return username.length > 0 && password.length > 0;
  };

  const submit = async (e) => {
    e.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="content">
        <center>
          <br />
          <h1 style={{ "margin-block-end": "0em" }}>Login</h1>
          <hr
            style={{ border: "1px solid black", borderColor: "#A04000" }}
          ></hr>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <br />
            <input
              type="text"
              id={"username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label>Password</label>
            <br />
            <input
              id={"password"}
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button
              type="submit"
              block
              size="lg"
              id={"submit"}
              disabled={!valid()}
              submit={submit}
            >
              Login
            </button>
            <br />

            <Link
              to="/signup"
              style={{
                color: "black",
                marginLeft: "52%",
                backgroundColor: "transparent",
              }}
            >
              Don't have an account?
            </Link>
          </form>
          <br /> <br />
        </center>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;
