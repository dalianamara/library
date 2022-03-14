import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/EditIssue.css";
import Footer from "../Footer";
import blank from "../images/blank.jpg";
const EditDetails = () => {
  const [model, setModel] = useState({
    first: "",
    last: "",
    email: "",
    phoneNumber: "",
    city: "",
    street: null,
    bookId: "",
    bookTitle: "",
    deliveryType: "",
    isApproved: "",
    isReturned: null,
    returnApproval: null,
    fine: 0,
    issueDate: "",
    dueDate: "",
    isReserved: null,
    receipt: null,
  });
  const url = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const id = url.id.toString();
      const response = await fetch(
        `http://localhost:5000/issue/${url.id.toString()}`
      );
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
    const editedIssue = {
      first: model.first,
      last: model.last,
      email: model.email,
      phoneNumber: model.phoneNumber,
      city: model.city,
      street: model.street,
      bookId: model.bookId,
      bookTitle: model.bookTitle,
      deliveryType: model.deliveryType,
      isApproved: model.isApproved,
      isReturned: model.isReturned,
      returnApproval: model.returnApproval,
      fine: model.fine,
      issueDate: model.issueDate,
      dueDate: model.dueDate,
      isReserved: model.isReserved,
      receipt: model.receipt,
    };

    await fetch(`http://localhost:5000/issue/edit/${url.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedIssue),
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
          <h1 style={{ marginBlockEnd: "0em" }}>Edit issue</h1>
          <hr
            style={{ border: "1px solid black", borderColor: "#A04000" }}
          ></hr>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ display: "flex" }}>
              <div>
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
              <div style={{ marginLeft: "20px" }}>
                <label htmlFor="issueDate" style={{ float: "left" }}>
                  Issue Date
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="issueDate"
                  value={model.issueDate}
                  onChange={(e) => update({ issueDate: e.target.value })}
                />
              </div>
            </div>
            {/* <div style={{ float: "right" }}>
              <label
                htmlFor="deliveryType"
                style={{
                  marginLeft: "-420px",
                }}
              >
                Receipt
              </label>
              <br />
              <img
                style={{
                  maxWidth: "270px",
                  marginLeft: "-420px",
                  border: "2px solid grey",
                  maxHeight: "405px",
                }}
                alt={"receipt"}
                src={model.receipt ?? blank}
              ></img>
            </div> */}

            <div className="form-group" style={{ display: "flex" }}>
              <div>
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
              <div style={{ marginLeft: "20px" }}>
                <label htmlFor="issueDate" style={{ float: "left" }}>
                  Due Date
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="issueDate"
                  value={model.issueDate}
                  onChange={(e) => update({ issueDate: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <div>
                <label htmlFor="city" style={{ float: "left" }}>
                  City
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={model.city}
                  style={{ width: "163px" }}
                  onChange={(e) => update({ city: e.target.value })}
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <label
                  htmlFor="isApproved"
                  style={{ float: "left", marginLeft: "-6px" }}
                >
                  Approved
                </label>
                <br />
                <select
                  id="isApproved"
                  style={{ width: "170px", marginLeft: "-7px" }}
                  required
                  onChange={(e) => update({ isApproved: e.target.value })}
                >
                  <option value={model.isApproved} selected hidden>
                    {model.isApproved === "true" ? "yes" : "no"}
                  </option>
                  <option value="true">yes</option>
                  <option value="false">no</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <div>
                <label htmlFor="street" style={{ float: "left" }}>
                  Street
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  value={model.street}
                  style={{ width: "163px" }}
                  onChange={(e) => update({ street: e.target.value })}
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <label
                  htmlFor="isReturned"
                  style={{ float: "left", marginLeft: "-6px" }}
                >
                  Returned
                </label>
                <br />
                <select
                  id="isReturned"
                  style={{ width: "170px", marginLeft: "-7px" }}
                  required
                  onChange={(e) => update({ isReturned: e.target.value })}
                >
                  <option value={model.isReturned} selected hidden>
                    {model.isReturned === "true" ? "yes" : "no"}
                  </option>
                  <option value="true">yes</option>
                  <option value="false">no</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <div>
                <label htmlFor="phoneNumber" style={{ float: "left" }}>
                  Phone Number
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  value={model.phoneNumber}
                  style={{ width: "163px" }}
                  onChange={(e) => update({ phoneNumber: e.target.value })}
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <label
                  htmlFor="returnApproval"
                  style={{ float: "left", marginLeft: "-6px" }}
                >
                  Approved for return
                </label>
                <br />
                <select
                  id="returnApproval"
                  style={{ width: "170px", marginLeft: "-7px" }}
                  required
                  onChange={(e) => update({ returnApproval: e.target.value })}
                >
                  <option value={model.returnApproval} selected hidden>
                    {model.returnApproval === "true" ? "yes" : "no"}
                  </option>
                  <option value="true">yes</option>
                  <option value="false">no</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <div>
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
              </div>
              <div style={{ marginLeft: "20px" }}>
                <label htmlFor="fine" style={{ float: "left" }}>
                  Fine
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="fine"
                  value={model.fine}
                  onChange={(e) =>
                    update({
                      fine: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <div>
                <label htmlFor="bookId" style={{ float: "left" }}>
                  Book ID
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="bookId"
                  name="bookId"
                  value={model.bookId}
                  style={{ width: "163px" }}
                  onChange={(e) => update({ bookId: e.target.value })}
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <label
                  htmlFor="isReserved"
                  style={{ float: "left", marginLeft: "-6px" }}
                >
                  Reserved
                </label>
                <br />
                <select
                  id="isReserved"
                  style={{ width: "170px", marginLeft: "-7px" }}
                  required
                  onChange={(e) => update({ isReserved: e.target.value })}
                >
                  <option value={model.isReserved} selected hidden>
                    {model.isReserved === "true" ? "yes" : "no"}
                  </option>
                  <option value="true">yes</option>
                  <option value="false">no</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <div>
                <label htmlFor="bookTitle" style={{ float: "left" }}>
                  Book Title
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="bookTitle"
                  name="bookTitle"
                  value={model.bookTitle}
                  style={{ width: "163px" }}
                  onChange={(e) => update({ bookTitle: e.target.value })}
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <label htmlFor="deliveryType" style={{ float: "left" }}>
                  Delivery Type
                </label>
                <br />
                <select
                  id="deliveryType"
                  style={{ width: "180%", marginLeft: "-7px" }}
                  required
                  onChange={(e) => update({ deliveryType: e.target.value })}
                >
                  <option value={model.deliveryType} selected hidden>
                    {model.deliveryType}
                  </option>
                  <option value="home">home</option>
                  <option value="pickup">pickup</option>
                </select>
              </div>
            </div>

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
