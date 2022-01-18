import React, { useState } from "react";
import Footer from "../Footer";
import "../css/SignUp.css";
const AddBooks = () => {
  const [model, setModel] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const update = (value) => {
    return setModel((prev) => {
      return { ...prev, ...value };
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = { ...model };
    await fetch("http://localhost:5000/book/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setModel({ title: "", author: "", genre: "" });
  }

  return (
    <>
      <div className="content">
        <center>
          <br />
          <h1 style={{ "margin-block-end": "0em" }}>Add a new book</h1>
          <hr
            style={{ border: "1px solid black", borderColor: "#A04000" }}
          ></hr>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" style={{ float: "left" }}>
                Title
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="title"
                value={model.title}
                onChange={(e) => update({ title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author" style={{ float: "left" }}>
                Author
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="author"
                value={model.author}
                style={{ width: "100%" }}
                onChange={(e) => update({ author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="genre" style={{ float: "left" }}>
                Genre
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="genre"
                value={model.genre}
                style={{ width: "100%" }}
                onChange={(e) => update({ genre: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Add book"
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

export default AddBooks;
