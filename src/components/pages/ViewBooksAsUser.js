import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { getGenre } from "../functions/getGenre";
import close from "../images/close.png";
import "../css/ViewBooksAsUser.css";
import { getBooks } from "../functions/getBooks";

const View = (props) => (
  <div className="bookContainer">
    <div className="book" style={{ marginRight: "20px" }}>
      <Link
        to={`/${props.record._id}`}
        style={{
          color: "black",
          padding: "0px",
          paddingBottom: "0px",
          backgroundColor: "transparent",
        }}
      >
        <img
          src={`${props.record.cover}`}
          alt="cover"
          style={{
            width: "100%",
          }}
        />
      </Link>
    </div>
    <p
      style={{
        fontFamily: "Times New Roman",
        fontSize: "20px",
        height: "50px",
        marginLeft: "5px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {props.record.title}
    </p>
    <p style={{ fontFamily: "Times New Roman" }}>{props.record.author}</p>

    {props.record.stock === 0 ? (
      <>
        <Link
          to={`/${props.record._id}/reserve`}
          id="issueButton"
          value="Reserve"
        >
          Reserve
        </Link>
      </>
    ) : (
      <Link
        to={`/${props.record._id}/issue`}
        id="issueButton"
        value="Issue book"
      >
        Issue book
      </Link>
    )}
  </div>
);

export default function ViewBooksAsUser() {
  const [records, setRecords] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const getGenres = () => {
    const genres = getGenre();
    genres.then((result) => {
      setGenres(result);
    });
  };

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    let books = getBooks();
    books.then((result) => {
      setRecords(result);
    });

    const newRecords = records.filter((el) =>
      category === ""
        ? title === ""
          ? el
          : (setIsFiltered(true),
            el.title.toLowerCase().includes(title.toLowerCase()))
        : title === ""
        ? el.genre === category
        : (setIsFiltered(true),
          el.title.toLowerCase().includes(title.toLowerCase()))
    );
    console.log(filteredBooks);
    setFilteredBooks(newRecords);
    return;
  }, [category, title]);

  async function getBook(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "GET",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return (isFiltered === true ? filteredBooks : records).map((record) => {
      return (
        <>
          <View
            record={record}
            deleteRecord={() => getBook(record._id)}
            key={record._id}
          />
        </>
      );
    });
  }

  const onChangeSelect = (value, filter) => {
    setCategory(value);
    setIsFiltered(filter);
  };

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Catalogue</h1>
        Filter by category{" "}
        <select onChange={(e) => onChangeSelect(e.target.value, true)}>
          <option value="" selected={!isFiltered} disabled hidden></option>
          {genres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <button id="buttons" onClick={() => onChangeSelect("", false)}>
          <img
            src={close}
            alt="close"
            // className="image"
            style={{ width: "12px", marginLeft: "-20px" }}
          />
        </button>
        <input
          type={"text"}
          style={{ marginLeft: "600px", width: "200px" }}
          placeholder={"Search by title..."}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <table style={{ marginTop: 20 }} cols="3">
          <div
            className={"container"}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {recordList()}
          </div>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}
