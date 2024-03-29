import React, { useState } from "react";
import Footer from "../Footer";
import "../css/SignUp.css";
const AddReview = (props) => {
  const [model, setModel] = useState({
    firstName: "",
    lastName: "",
    date: "",
    content: props.content,
    stars: 0,
  });

  const update = (value) => {
    return setModel((prev) => {
      return { ...prev, ...value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const newReview = { ...model };
    await fetch("http://localhost:5000/review/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setModel({
      firstName: "",
      lastName: "",
      date: "",
      content: "",
      stars: 0,
    });
  }

  return (
    <>
      <div className="content">
        <center>
          <br />
          <h1 style={{ marginBlockEnd: "0em" }}>Add new book</h1>
          <hr
            style={{ border: "1px solid black", borderColor: "#A04000" }}
          ></hr>
          <form onSubmit={handleSubmit}>
            {/* input for description */}
            <div className="form-group" style={{ float: "left" }}>
              <br />
              <input
                type="file"
                className="form-control"
                id="cover"
                onChange={(e) => {
                  let fileReader = new FileReader();
                  let base64URL = "";
                  let image = e.target.files[0];
                  fileReader.readAsDataURL(image);
                  fileReader.onload = (image) => {
                    base64URL = fileReader.result;
                    update({ cover: base64URL });
                  };
                }}
              />
            </div>
            <div
              className="form-group"
              style={{ float: "right", height: "200px" }}
            >
              <label htmlFor="description" style={{ float: "left" }}>
                Description<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <textarea
                required
                className="form-control"
                id="description"
                value={model.description}
                style={{ width: "95%", height: "267px" }}
                onChange={(e) => update({ description: e.target.value })}
              />
            </div>
            {/* input for title */}
            <div className="form-group">
              <label htmlFor="title" style={{ float: "left" }}>
                Title<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                required
                type="text"
                className="form-control"
                id="title"
                value={model.title}
                onChange={(e) => update({ title: e.target.value })}
              />
            </div>
            {/* input for author */}
            <div className="form-group">
              <label htmlFor="author" style={{ float: "left" }}>
                Author<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                required
                type="text"
                className="form-control"
                id="author"
                value={model.author}
                style={{ width: "100%" }}
                onChange={(e) => update({ author: e.target.value })}
              />
            </div>
            {/* input for publication date */}
            <div className="form-group">
              <label htmlFor="publication_date" style={{ float: "left" }}>
                Publication date<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                required
                type="date"
                className="form-control"
                id="year"
                value={model.year}
                style={{ width: "100%" }}
                onChange={(e) => update({ year: e.target.value })}
              />
            </div>
            {/* input for pages */}
            <div className="form-group">
              <label htmlFor="print_length" style={{ float: "left" }}>
                Print length<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                required
                type="text"
                className="form-control"
                id="pages"
                value={model.pages}
                style={{ width: "100%" }}
                onChange={(e) => update({ pages: e.target.value })}
              />
            </div>
            {/* input for stock */}
            <div className="form-group">
              <label htmlFor="stock" style={{ float: "left" }}>
                Stock<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                required
                type="text"
                className="form-control"
                id="stock"
                value={model.stock}
                style={{ width: "100%" }}
                onChange={(e) => update({ stock: e.target.value })}
              />
            </div>
            {/* input for publisher */}
            <div className="form-group">
              <label htmlFor="publisher" style={{ float: "left" }}>
                Publisher<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                required
                type="text"
                className="form-control"
                id="publisher"
                value={model.publisher}
                style={{ width: "100%" }}
                onChange={(e) => update({ publisher: e.target.value })}
              />
            </div>
            {/* input for genre */}
            <div className="form-group">
              <label htmlFor="genre" style={{ float: "left" }}>
                Genre<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <select
                key={model.genre}
                id="genre"
                style={{ width: "103%" }}
                required
                onChange={(e) => update({ genre: e.target.value })}
              >
                <option value="" disabled hidden></option>
                <option value="Romance">Romance</option>
                <option value="Drama">Drama</option>
                <option value="Children">Children</option>
              </select>
            </div>
            {/* button for submit */}
            <div className="form-group">
              <input
                type="submit"
                value="Add book"
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

export default AddReview;
