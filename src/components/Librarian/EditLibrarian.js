import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../css/SignUp.css";
const EditLibrarian = () => {
  const [model, setModel] = useState({
    first: "",
    last: "",
    email: "",
    username: "",
    password: "",
    user: "librarian",
  });

  const [validPass, setValidPass] = useState(true);
  const [validUname, setValidUname] = useState(true);
  const [nonExistent, setNotExistent] = useState(true);
  const [nonExistentEmail, setNotExistentEmail] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [users, setUsers] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:5000/user/`);

      if (response.status !== 200) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      records.map((record) =>
        record._id === localStorage.id ? setModel(record) : ""
      );
      setUsers(records);
    }
    getUsers();

    return;
  }, [users.length]);

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
      user: model.user,
    };
    if (isPasswordChanged === true) editedUser["password"] = model.password;
    if (validPassword && validEmailB && validUsername === true) {
      await fetch(`http://localhost:5000/user/update/${model._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      }).catch((error) => {
        window.alert(error);
        return;
      });
      window.location.href = "/";
    }
  }

  const validatePassword = (pass) => {
    const password = /^[A-Za-z0-9]\w{6,30}$/;
    if (isPasswordChanged !== false) {
      if (pass.value.match(password)) {
        setValidPass(true);
        return true;
      } else {
        setValidPass(false);

        return false;
      }
    } else {
      setValidPass(true);
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailExpression = /\S+@\S+\.\S+/;
    if (isEmailChanged !== false) {
      const existent = users.filter(
        (user) => user.email === email.value && user._id !== model._id
      );
      if (existent.length === 0) {
        setNotExistentEmail(true);
        if (email.value.match(emailExpression)) {
          setValidEmail(true);
          return true;
        } else {
          setValidEmail(false);
          return false;
        }
      } else {
        setNotExistentEmail(false);
        return false;
      }
    } else {
      setValidEmail(true);
      return true;
    }
  };

  const validateUsername = (uname) => {
    const username = /\S+@\S+\.\S+/;
    if (isUsernameChanged !== false) {
      const existent = users.filter(
        (user) => user.username === uname.value && user._id !== model._id
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
    } else {
      setNotExistent(true);
      return true;
    }
  };

  return (
    <>
      <div className="content">
        <center>
          <br />
          <h1 style={{ marginBlockEnd: "0em" }}>Edit librarian</h1>
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
                onChange={(e) => {
                  setIsUsernameChanged(true);
                  update({ username: e.target.value });
                }}
              />
              {!nonExistent ? (
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
                Email
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={model.email}
                onChange={(e) => {
                  setIsEmailChanged(true);
                  update({ email: e.target.value });
                }}
              />
              {!nonExistentEmail ? (
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
                onChange={(e) => {
                  setIsPasswordChanged(true);
                  update({ password: e.target.value });
                }}
              />

              {!validPass ? (
                <>
                  <span className="error" style={{ color: "red" }}>
                    Sorry, this password is invalid.
                  </span>
                  <br />
                </>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Edit librarian"
                className="editButton"
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

export default EditLibrarian;
