import React, { useState } from "react";
import Footer from "../Footer";
import "../css/SignUp.css";

const SignUp = () => {
  const [model, setModel] = useState({
    first: "",
    last: "",
    email: "",
    username: "",
    password: "",
    user: "user",
  });

  const [validPass, setValidPass] = useState(true);
  const [validUname, setValidUname] = useState(true);
  const [existUsername, setExistUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [existEmail, setExistEmail] = useState(false);

  const update = (value) => {
    return setModel((prev) => {
      return { ...prev, ...value };
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const { uname, pass, email } = document.forms[0];
    const validPassword = validatePassword(pass);
    const validUsername = validateUsername(uname);
    const validEmailInForm = validateEmail(email);

    if (validPassword && validEmailInForm && validUsername === true) {
      const newUser = { ...model };
      const response = await fetch("http://localhost:5000/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const errorVerify = await response.json();

      if (errorVerify.success === false) {
        if (errorVerify.message === "Both exist") {
          setExistUsername(true);
          setExistEmail(true);
        }
        if (errorVerify.message === "Username already exists") {
          setExistEmail(false);
          setExistUsername(true);
        } else if (errorVerify.message === "Email already exists") {
          setExistUsername(false);
          setExistEmail(true);
        }
        return;
      } else {
        setExistUsername(false);
        setExistEmail(false);
        setModel({
          first: "",
          last: "",
          email: "",
          username: "",
          password: "",
          user: "user",
        });
      }
    }
  }

  const validatePassword = (pass) => {
    const password = /^[A-Za-z]\w{6,14}$/;
    if (pass.value.match(password)) {
      setValidPass(true);
      return true;
    } else {
      setValidPass(false);

      return false;
    }
  };

  const validateEmail = (email) => {
    const emailExpression = /\S+@\S+\.\S+/;
    if (email.value.match(emailExpression)) {
      setValidEmail(true);
      return true;
    } else {
      setValidEmail(false);
      return false;
    }
  };

  const validateUsername = (uname) => {
    const username = /^[A-Za-z0-9]\w{5,30}$/;
    if (uname.value.match(username)) {
      setValidUname(true);
      return true;
    } else {
      setValidUname(false);
      return false;
    }
  };

  const renderSignUpForm = () => {
    return (
      <>
        <div className="content">
          <center>
            <br />
            <h1 style={{ marginBlockEnd: "0em" }}>Sign up</h1>
            <hr
              style={{ border: "1px solid black", borderColor: "#A04000" }}
            ></hr>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstname" style={{ float: "left" }}>
                  First name<span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  key={"firstname"}
                  required
                  value={model.first}
                  onChange={(e) => update({ first: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname" style={{ float: "left" }}>
                  Last name<span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  required
                  className="form-control"
                  id="lastname"
                  value={model.last}
                  style={{ width: "100%" }}
                  onChange={(e) => update({ last: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username" style={{ float: "left" }}>
                  Username<span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  required
                  name="uname"
                  value={model.username}
                  style={{ width: "100%" }}
                  onChange={(e) => update({ username: e.target.value })}
                />

                {existUsername ? (
                  <span className="error" style={{ color: "red" }}>
                    Sorry, this username already exists.
                  </span>
                ) : !validUname ? (
                  <span className="error" style={{ color: "red" }}>
                    Sorry, this username is invalid. <br />
                    Use only letters and decimals.
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email" style={{ float: "left" }}>
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  name="email"
                  value={model.email}
                  onChange={(e) => update({ email: e.target.value })}
                />
                {existEmail ? (
                  <span className="error" style={{ color: "red" }}>
                    Sorry, this email already exists.
                  </span>
                ) : !validEmail ? (
                  <span className="error" style={{ color: "red" }}>
                    Sorry, this email is invalid.
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password" style={{ float: "left" }}>
                  Password<span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  name="pass"
                  required
                  value={model.password}
                  style={{ width: "100%" }}
                  onChange={(e) => update({ password: e.target.value })}
                />
                {!validPass ? (
                  <span className="error" style={{ color: "red" }}>
                    Invalid password
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Create user"
                  className="registerButton"
                />
              </div>
            </form>
            <br />
          </center>
        </div>
        <Footer></Footer>
      </>
    );
  };
  return <div>{renderSignUpForm()}</div>;
};

export default SignUp;
