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
  });
  const update = (value) => {
    return setModel((prev) => {
      return { ...prev, ...value };
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = { ...model };
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setModel({ first: "", last: "", email: "", username: "", password: "" });
  }

  return (
    <>
      <div className="content">
        <center>
          <br />
          <h1 style={{ "margin-block-end": "0em" }}>Sign up</h1>
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
                value={model.username}
                style={{ width: "100%" }}
                onChange={(e) => update({ username: e.target.value })}
              />
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
                value={model.email}
                onChange={(e) => update({ email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ float: "left" }}>
                Password
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="password"
                value={model.password}
                style={{ width: "100%" }}
                onChange={(e) => update({ password: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Create user"
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

export default SignUp;
