import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";
const EditDetails = () => {
  const [model, setModel] = useState({
    first: "",
    last: "",
    email: "",
    city: "",
    street: "",
    phoneNumber: "",
    username: "",
    password: "",
    user: "",
  });
  const url = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const id = url.id.toString();
      const response = await fetch(`http://localhost:5000/record/${id}`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();
      if (!user) {
        const message = `Record ${id} does not exist`;
        window.alert(message);
        navigate(-1);
        return;
      }
      setModel(user);
    }
    fetchUsers();
    return;
  }, [url.id, navigate]);
  const update = (value) => {
    return setModel((prev) => {
      return { ...prev, ...value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const editedUser = {
      first: model.first,
      last: model.last,
      email: model.email,
      city: model.city,
      street: model.street,
      phoneNumber: model.phoneNumber,
      username: model.username,
      password: model.password,
      user: model.user,
    };
    await fetch(`http://localhost:5000/record/update/${url.id}`, {
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

  return (
    <>
      <div className="content">
        <center>
          <br />
          <h1 style={{ marginBlockEnd: "0em" }}>Change address</h1>
          <hr
            style={{ border: "1px solid black", borderColor: "#A04000" }}
          ></hr>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" style={{ float: "left" }}>
                City<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="city"
                required
                name="city"
                value={model.city}
                style={{ width: "100%" }}
                onChange={(e) => update({ city: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" style={{ float: "left" }}>
                Street<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="street"
                required
                name="street"
                value={model.street}
                onChange={(e) => update({ street: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ float: "left" }}>
                Phone Number<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={model.phoneNumber}
                style={{ width: "100%" }}
                onChange={(e) => update({ phoneNumber: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Update user"
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
