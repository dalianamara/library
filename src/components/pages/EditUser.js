import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../css/SignUp.css";
const EditUser = () => {
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
  const [nonExistent, setNotExistent] = useState(true);
  const [nonExistentEmail, setNotExistentEmail] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [records, setRecords] = useState([]);
  const [showPass, setShowPass] = useState(false);

  const togglePassword = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      records.map((record) =>
        record._id === localStorage.id ? setModel(record) : ""
      );
      setRecords(records);
    }
    getUsers();

    return;
  }, [records.length]);

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
    const validEmailB = validateEmail(email);
    const editedUser = {
      first: model.first,
      last: model.last,
      email: model.email,
      username: model.username,
      street: model.street,
      city: model.city,
      phoneNumber: model.phoneNumber,
      password: model.password,
      user: model.user,
    };

    if (validPassword && validEmailB && validUsername === true) {
      await fetch(`http://localhost:5000/record/update/${model._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      }).catch((error) => {
        window.alert(error);
        return;
      });
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
      setNotExistentEmail(true);
      setValidEmail(true);
      return true;
    } else {
      setNotExistentEmail(false);
      setValidEmail(false);
      return false;
    }
  };

  const validateUsername = (uname) => {
    const username = /^[A-Za-z]\w{5,30}$/;
    const existent = records.filter(
      (user) => (user.username === uname.value) === true
    );
    if (existent.length === 0) {
      setNotExistent(true);
      if (uname.value.match(username)) {
        setValidUname(true);
        return true;
      } else {
        setValidUname(false);
        return false;
      }
    } else {
      setNotExistent(false);
      return false;
    }
  };
  return (
    <>
      <div className="content">
        <center>
          <br />
          <h1 style={{ marginBlockEnd: "0em" }}>Edit user</h1>
          <hr
            style={{ border: "1px solid black", borderColor: "#A04000" }}
          ></hr>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstname" style={{ float: "left" }}>
                First name
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={model.first}
                onChange={(e) => update({ first: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname" style={{ float: "left" }}>
                Last name
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={model.last}
                style={{ width: "100%" }}
                onChange={(e) => update({ last: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" style={{ float: "left" }}>
                Username
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="username"
                name="uname"
                value={model.username}
                style={{ width: "100%" }}
                onChange={(e) => update({ username: e.target.value })}
              />
              {!nonExistent ? (
                <span className="error" style={{ color: "red" }}>
                  this username already exists
                </span>
              ) : !validUname ? (
                <span className="error" style={{ color: "red" }}>
                  username error
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email" style={{ float: "left" }}>
                Email
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={model.email}
                onChange={(e) => update({ email: e.target.value })}
              />
              {!nonExistentEmail ? (
                <span className="error" style={{ color: "red" }}>
                  this email already exists
                </span>
              ) : !validEmail ? (
                <span className="error" style={{ color: "red" }}>
                  this email is not correct
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ float: "left" }}>
                Password
              </label>
              <br />
              <input
                type={showPass ? "text" : "password"}
                className="form-control"
                id="password"
                name="pass"
                value={model.password}
                style={{ width: "100%" }}
                onChange={(e) => update({ password: e.target.value })}
              />
              <input
                type="checkbox"
                checked={showPass}
                onClick={togglePassword}
              ></input>
              <label for={"showPass"}>Show password</label>
              {!validPass ? (
                <span className="error" style={{ color: "red" }}>
                  eroare password
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Edit user"
                className="btn btn-primary"
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

export default EditUser;