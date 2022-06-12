import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";
const RenewBook = () => {
  const [model, setModel] = useState({
    first: "",
    last: "",
    email: "",
    phoneNumber: "",
    city: "",
    bookId: "",
    bookTitle: "",
    deliveryType: "",
    isApproved: "",
    isReturned: "",
    returnApproval: "",
    fine: "",
    issueDate: "",
    returnDate: "",
    dueDate: "",
    days: "",
  });
  const url = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchissues() {
      const id = url.id.toString();
      const response = await fetch(
        `http://localhost:5000/issue/${url.id.toString()}`
      );
      if (response.status !== 200) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const issue = await response.json();
      if (!issue) {
        const message = `Issue ${id} does not exist`;
        window.alert(message);
        navigate(-1);
        return;
      }
      setModel(issue);
    }
    fetchissues();
    return;
  }, [url.id, navigate]);

  const update = (value) => {
    return setModel((prev) => {
      return { ...prev, ...value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const editedissue = {
      first: model.first,
      last: model.last,
      email: model.email,
      phoneNumber: model.phoneNumber,
      city: model.city,
      bookId: model.bookId,
      bookTitle: model.bookTitle,
      deliveryType: model.deliveryType,
      isApproved: model.isApproved,
      isReturned: model.isReturned,
      returnApproval: model.returnApproval,
      fine: model.fine,
      issueDate: model.issueDate,
      dueDate: model.dueDate,
      returnDate: model.returnDate,
      days: model.days,
    };
    await fetch(`http://localhost:5000/issue/edit/${url.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedissue),
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
          <h1 style={{ marginBlockEnd: "0em" }}>Renew issue</h1>
          <hr
            style={{ border: "1px solid black", borderColor: "#A04000" }}
          ></hr>
          <form onSubmit={handleSubmit}>
            {/* input for first name */}
            <div className="form-group">
              <label htmlFor="firstName" style={{ float: "left" }}>
                First Name
              </label>
              <br />
              <input
                disabled
                type="text"
                className="form-control"
                id="firstName"
                value={model.first}
                onChange={(e) => update({ firstName: e.target.value })}
              />
            </div>
            {/* input for author */}
            <div className="form-group">
              <label htmlFor="lastName" style={{ float: "left" }}>
                Last Name
              </label>
              <br />
              <input
                disabled
                type="text"
                className="form-control"
                id="lastName"
                value={model.last}
                style={{ width: "100%" }}
                onChange={(e) => update({ lastName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" style={{ float: "left" }}>
                Email
              </label>
              <br />
              <input
                type="text"
                disabled
                className="form-control"
                id="email"
                value={model.email}
                style={{ width: "100%" }}
                onChange={(e) => update({ email: e.target.value })}
              />
            </div>
            {/* input for publisher */}
            <div className="form-group">
              <label htmlFor="isReturned" style={{ float: "left" }}>
                Returned
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="isReturned"
                disabled
                value={model.isReturned === null ? "no" : "yes"}
                style={{ width: "100%" }}
                onChange={(e) => update({ isReturned: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="issueDate" style={{ float: "left" }}>
                Issue Date
              </label>
              <br />
              <input
                disabled
                type="date"
                required
                className="form-control"
                id="issueDate"
                value={model.issueDate}
                style={{ width: "100%" }}
                onChange={(e) => update({ issueDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate" style={{ float: "left" }}>
                Due Date
              </label>
              <br />
              <input
                type="date"
                required
                className="form-control"
                id="dueDate"
                value={model.dueDate}
                style={{ width: "100%" }}
                onChange={(e) => update({ dueDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Renew issue"
                className="btn btn-primary"
              />
            </div>
          </form>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </center>
      </div>
      <Footer></Footer>
    </>
  );
};

export default RenewBook;
