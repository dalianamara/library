import React, { useState, useEffect } from "react";
import "./Login.css";
import Footer from "../Footer";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({});
  const [records, setRecords] = useState([]);
  const users = records.map((record) => record);
  const errorMessages = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const valid = () => {
    return username.length > 0 && password.length > 0;
  };
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);
      if (!response.ok) {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let { uname, pass } = document.forms[0];
    const userdata = users.find((user) => user.username === uname.value);
    if (userdata) {
      if (userdata.password !== pass.value) {
      } else {
        console.log("wrong password");
        setSuccess(true);
      }
    } else {
      console.log("wrong username");
    }
  };

  const renderForm = () => {
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
                name="uname"
                required
                id={"username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <label>Password</label>
              <br />
              <input
                id={"password"}
                name="pass"
                type="password"
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
                submit={handleSubmit}
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
  return <div>{success ? <Navigate to="/services" /> : renderForm()}</div>;
};

export default Login;
