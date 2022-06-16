import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import "../css/SignUp.css";
import "../css/EditUser.css";
const EditUser = () => {
  const [model, setModel] = useState({
    first: "",
    last: "",
    email: "",
    username: "",
    password: "",
    user: "user",
  });
  const url = useParams();
  const [validPass, setValidPass] = useState(true);
  const [validUname, setValidUname] = useState(true);
  const [nonExistent, setNotExistent] = useState(true);
  const [nonExistentEmail, setNotExistentEmail] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [records, setRecords] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);
  const togglePassword = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    async function getUsers() {
      const id = url.id.toString();
      const response = await fetch(`http://localhost:5000/user/`);
      if (response.status !== 200) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      records.map((record) => (record._id === id ? setModel(record) : ""));
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
    console.log(pass);
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
      window.location.href = "/viewusers";
    }
  }

  const validatePassword = (pass) => {
    const password = /^[A-Za-z]\w{6,14}$/;
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
      if (email.value.match(emailExpression)) {
        setValidEmail(true);
        return true;
      } else {
        setValidEmail(false);
        return false;
      }
    } else {
      setValidEmail(true);
      return true;
    }
  };

  const validateUsername = (uname) => {
    const username = /^[A-Za-z]\w{5,30}$/;
    if (isUsernameChanged !== false) {
      if (uname.value.match(username)) {
        setValidUname(true);
        return true;
      } else {
        setValidUname(false);
        return false;
      }
    } else {
      setValidUname(true);
      return true;
    }
  };

  return (
    <>
      <div className="content">
        <center>
          <br />
          <h1 style={{ marginBlockEnd: "0em" }}>Edit User</h1>
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
                onChange={(e) => {
                  setIsEmailChanged(true);
                  update({ email: e.target.value });
                }}
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
                onChange={(e) => {
                  setIsPasswordChanged(true);
                  update({ password: e.target.value });
                }}
              />
              {!validPass ? (
                <span className="error" style={{ color: "red" }}>
                  Password error
                  <br />
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <input type="submit" value="Edit user" className="editButton" />
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
