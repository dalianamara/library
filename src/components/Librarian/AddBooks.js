import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../css/AddBooks.css";
import blank from "../images/blank.jpg";
import addBooks from "../functions/addBooks";
import addGenre from "../functions/addGenre";
import { getGenre } from "../functions/getGenre";
const AddBook = () => {
  let today = new Date();
  let day = today.getDate();
  let month = today.toLocaleString("default", { month: "2-digit" });
  let year = today.getFullYear();
  let counter = 0;
  today = year + "-" + month + "-" + day;
  const [bookModel, setBookModel] = useState({
    title: "",
    author: "",
    genre: "",
    cover: "",
    year: "",
    description: "",
    pages: 0,
    publisher: "",
    stock: 0,
  });

  const [genreModel, setGenreModel] = useState({
    name: "",
  });
  const [cover, setCover] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState(false);
  const [updated, setUpdated] = useState(false);
  const getGenres = () => {
    const genres = getGenre();
    genres.then((result) => {
      setGenres(result);
    });
  };

  useEffect(() => {
    setUpdated(false);
    getGenres();
  }, [updated]);

  const updateBook = (value) => {
    return setBookModel((prev) => {
      return { ...prev, ...value };
    });
  };

  const addNewGenre = (value) => {
    setGenreModel((prev) => {
      return { ...prev, ...value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = { ...bookModel };
    addBooks(newUser);
    setCover(false);
    setBookModel({
      title: "",
      author: "",
      genre: "",
      cover: "",
      year: "",
      description: "",
      pages: 0,
      publisher: "",
      stock: 0,
    });
  }

  async function handleAddGenre(e) {
    e.preventDefault();
    const newGenre = { ...genreModel };
    addGenre(newGenre);
    setUpdated(true);
    setGenreModel({
      name: "",
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
            {/* input for cover */}
            <div className="form-group" style={{ float: "left" }}>
              <label htmlFor="cover" style={{ float: "left" }}>
                Cover<span style={{ color: "red" }}>*</span>
              </label>
              {cover === false ? (
                <img
                  id="coverImage"
                  data-testid="coverImage"
                  alt="coverImage"
                  src={blank}
                  style={{
                    maxWidth: "270px",
                    border: "2px solid grey",
                    maxHeight: "405px",
                    height: "405px",
                  }}
                />
              ) : (
                <img
                  id="coverImage"
                  data-testid="coverImage"
                  alt="coverImage"
                  src={bookModel.cover}
                  style={{
                    maxWidth: "270px",
                    border: "2px solid grey",
                    maxHeight: "405px",
                  }}
                />
              )}
              <br />
              <input
                type="file"
                required
                data-testid="cover"
                className="form-control"
                id="cover"
                style={{ color: "transparent" }}
                onChange={(e) => {
                  let fileReader = new FileReader();
                  let base64URL = "";
                  let image = e.target.files[0];
                  fileReader.readAsDataURL(image);
                  fileReader.onload = (image) => {
                    base64URL = fileReader.result;
                    updateBook({ cover: base64URL });
                  };
                  setCover(true);
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
                data-testid="description"
                id="description"
                value={bookModel.description}
                style={{ width: "95%", height: "267px" }}
                onChange={(e) => updateBook({ description: e.target.value })}
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
                data-testid="title"
                className="form-control"
                id="title"
                value={bookModel.title}
                onChange={(e) => updateBook({ title: e.target.value })}
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
                data-testid="author"
                value={bookModel.author}
                style={{ width: "100%" }}
                onChange={(e) => updateBook({ author: e.target.value })}
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
                data-testid="year"
                className="form-control"
                id="year"
                value={bookModel.year}
                style={{ width: "100%" }}
                onChange={(e) => updateBook({ year: e.target.value })}
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
                data-testid="pages"
                value={bookModel.pages}
                style={{ width: "100%" }}
                onChange={(e) =>
                  updateBook({
                    pages: e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1"),
                  })
                }
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
                data-testid="stock"
                className="form-control"
                id="stock"
                value={bookModel.stock}
                style={{ width: "100%" }}
                onChange={(e) =>
                  updateBook({
                    stock: e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1"),
                  })
                }
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
                data-testid="publisher"
                value={bookModel.publisher}
                style={{ width: "100%" }}
                onChange={(e) => updateBook({ publisher: e.target.value })}
              />
            </div>
            {/* input for genre */}
            <div className="form-group">
              <label htmlFor="genre" style={{ float: "left" }}>
                Genre<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <select
                key={`${bookModel.genre} - ${counter++}`}
                id="genre"
                style={{ width: "103%" }}
                required
                data-testid="genre"
                value={bookModel.genre}
                onChange={(e) => updateBook({ genre: e.target.value })}
              >
                <option value="" disabled hidden></option>
                {genres.map((genre) => (
                  <option
                    key={`${genre.name} - ${counter++}`}
                    value={genre.name}
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* button for submit */}
            <div className="form-group">
              <input type="submit" value="Add book" className="editButton" />
            </div>
          </form>
          <div>
            <input
              style={{ marginLeft: "-100px" }}
              type="checkbox"
              data-testid="genreCheckbox"
              checked={genre}
              onChange={() => setGenre(!genre)}
            />
            <label htmlFor="genre">Add new genre</label>
          </div>
          {genre && (
            <div>
              <input
                required
                type="text"
                className="form-control"
                id="newGenre"
                style={{ width: "30%", marginLeft: "-330px" }}
                onChange={(e) => addNewGenre({ name: e.target.value })}
              />
              <br />
              {updated ? (
                <>
                  <span
                    className="error"
                    data-testid="error"
                    style={{ color: "green", marginLeft: "-340px" }}
                  >
                    Genre added successfully.
                  </span>
                  <br />
                </>
              ) : (
                ""
              )}

              <button
                onClick={handleAddGenre}
                className="addNewGenreButton"
                style={{ marginLeft: "-60px", marginTop: "10px" }}
              >
                Add genre
              </button>
            </div>
          )}
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

export default AddBook;
