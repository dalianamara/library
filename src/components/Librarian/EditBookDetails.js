import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";
const EditDetails = () => {
  const [model, setModel] = useState({
    title: "",
    author: "",
    genre: "",
    cover: "",
    year: "",
    description: "",
    pages: "",
    publisher: "",
  });
  const url = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      const id = url.id.toString();
      const response = await fetch(
        `http://localhost:5000/book/${url.id.toString()}`
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
    fetchBooks();
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
      title: model.title,
      author: model.author,
      genre: model.genre,
      cover: model.cover,
      year: model.year,
      description: model.description,
      pages: model.pages,
      publisher: model.publisher,
      stock: model.stock,
    };
    await fetch(`http://localhost:5000/book/edit/${url.id}`, {
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
          <h1 style={{ marginBlockEnd: "0em" }}>Add new book</h1>
          <hr
            style={{ border: "1px solid black", borderColor: "#A04000" }}
          ></hr>
          <form onSubmit={handleSubmit}>
            {/* input for description */}
            <div className="form-group" style={{ float: "left" }}>
              <label htmlFor="cover" style={{ float: "left" }}>
                Cover
              </label>
              <img
                id="coverImage"
                src={model.cover}
                style={{
                  maxWidth: "270px",
                  border: "2px solid grey",
                  maxHeight: "405px",
                }}
              />
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
                Description
              </label>
              <br />
              <textarea
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
            {/* input for author */}
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
            {/* input for publication date */}
            <div className="form-group">
              <label htmlFor="publication_date" style={{ float: "left" }}>
                Publication date
              </label>
              <br />
              <input
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
                Print length
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="pages"
                value={model.pages}
                style={{ width: "100%" }}
                onChange={(e) => update({ pages: e.target.value })}
              />
            </div>
            {/* input for publisher */}
            <div className="form-group">
              <label htmlFor="publisher" style={{ float: "left" }}>
                Publisher
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="publisher"
                value={model.publisher}
                style={{ width: "100%" }}
                onChange={(e) => update({ publisher: e.target.value })}
              />
            </div>
            {/* input for stock */}
            <div className="form-group">
              <label htmlFor="stock" style={{ float: "left" }}>
                Stock
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="stock"
                value={model.stock}
                onChange={(e) => update({ stock: e.target.value })}
              />
            </div>
            {/* input for genre */}
            <div className="form-group">
              <label htmlFor="genre" style={{ float: "left" }}>
                Genre
              </label>
              <br />
              <select
                id="genre"
                style={{ width: "103%" }}
                onChange={(e) => update({ genre: e.target.value })}
              >
                <option value="" selected disabled hidden>
                  {model.genre}
                </option>
                <option value="Romance">Romance</option>
                <option value="Drama">Drama</option>
                <option value="Children">Children</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Edit book"
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

export default EditDetails;
