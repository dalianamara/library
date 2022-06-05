import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";
const EditDetails = () => {
  const [model, setModel] = useState({
    first: "",
    last: "",
    email: "",
    city: "",
    username: "",
    password: "",
    phoneNumber: "",
    street: "",
    user: "user",
  });
  const url = useParams();
  const navigate = useNavigate();
  const [validUname, setValidUname] = useState(true);
  const [nonExistent, setNotExistent] = useState(true);
  const [nonExistentEmail, setNotExistentEmail] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const id = url.id.toString();
      const response = await fetch(
        `http://localhost:5000/user/${url.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user = await response.json();
      if (!user) {
        const message = `User ${id} does not exist`;
        window.alert(message);
        navigate(-1);
        return;
      }
      setModel(user);
    }
    fetchUsers();
    return;
  }, [url.id, navigate]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`http://localhost:5000/user/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const users = await response.json();
      if (!users) {
        const message = `User does not exist`;
        window.alert(message);
        return;
      }
      setUsers(users);
    }
    fetchUsers();
    return;
  }, [users]);

  const update = (value) => {
    return setModel((prev) => {
      return { ...prev, ...value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { uname, email } = document.forms[0];
    const validUsername = validateUsername(uname);
    const validEmailB = validateEmail(email);
    if (validEmailB && validUsername === true) {
      const editedUser = {
        first: model.first,
        last: model.last,
        email: model.email,
        city: model.city,
        username: model.username,
        password: model.password,
        phoneNumber: model.phoneNumber,
        street: model.street,
        user: "user",
      };

      await fetch(`http://localhost:5000/user/update/${url.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      }).catch((error) => {
        window.alert(error);
        return;
      });
      navigate(-1);
    }
  }

  const validateEmail = (email) => {
    const emailExpression = /\S+@\S+\.\S+/;
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
  };

  const validateUsername = (uname) => {
    const username = /^[A-Za-z]\w{5,30}$/;
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
              <label htmlFor="city" style={{ float: "left" }}>
                City
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="city"
                value={model.city}
                style={{ width: "100%" }}
                onChange={(e) => update({ city: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="street" style={{ float: "left" }}>
                Street
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="street"
                value={model.street}
                style={{ width: "100%" }}
                onChange={(e) => update({ street: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" style={{ float: "left" }}>
                Phone Number
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                value={model.phoneNumber}
                style={{ width: "100%" }}
                onChange={(e) => update({ phoneNumber: e.target.value })}
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
            <div className="form-group"></div>
            <div className="form-group">
              <input
                type="submit"
                value="Edit user"
                style={{ marginTop: "10px" }}
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

export default EditDetails;
