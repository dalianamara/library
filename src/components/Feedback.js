import React, { useState } from "react";
import Footer from "./Footer";
import "./css/Feedback.css";
import addFeedback from "./functions/addFeedback";

const AddFeedback = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const update = (value) => {
    return setFeedback((prev) => {
      return { ...prev, ...value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const newFeedback = { ...feedback };
    setIsSent(true);
    addFeedback(newFeedback);

    setFeedback({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <>
      <div className="content">
        <br />
        <h1 style={{ marginBlockEnd: "0em" }}>Send feedback</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <form onSubmit={handleSubmit}>
          <div
            className="form-group"
            style={{ marginLeft: "400px", height: "200px" }}
          >
            <label htmlFor="message">
              Message<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <textarea
              required
              className="form-control"
              id="message"
              value={feedback.message}
              style={{ width: "700px", height: "167px" }}
              onChange={(e) => update({ message: e.target.value })}
            />
          </div>
          {/* input for name */}
          <div className="form-group" style={{ marginTop: "-200px" }}>
            <label htmlFor="name" style={{ float: "left" }}>
              Name<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input
              required
              type="text"
              className="form-control"
              id="name"
              value={feedback.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </div>
          {/* input for author */}
          <div className="form-group">
            <label htmlFor="email" style={{ float: "left" }}>
              Email<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input
              required
              type="text"
              className="form-control"
              id="email"
              value={feedback.email}
              style={{ width: "100%" }}
              onChange={(e) => update({ email: e.target.value })}
            />
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          {/* button for submit */}
          <div className="form-group">
            <input
              type="submit"
              id="button"
              value="Submit feedback"
              className="btn btn-primary"
            />
          </div>
          {isSent && (
            <center>
              <span className={"feedbackAction"}>Feedback sent</span>
            </center>
          )}
        </form>
        <br />
      </div>
      <Footer></Footer>
    </>
  );
};

export default AddFeedback;
