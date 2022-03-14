import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewBooksAsUser.css";

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
            width: "150px",
          }}
        />
      </Link>
    </div>
    <p style={{ fontFamily: "Times New Roman", fontSize: "20px" }}>
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
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/book/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      const newRecords = records.filter((el) =>
        category === ""
          ? title === ""
            ? el
            : el.title.toLowerCase().includes(title.toLowerCase())
          : title === ""
          ? el.genre === category
          : el.title.toLowerCase().includes(title.toLowerCase())
      );
      setRecords(newRecords);
    }
    getRecords();
    return;
  }, [records.length, category, title]);

  async function getBook(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "GET",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return records.map((record) => {
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

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Catalogue</h1>
        Filter by category{" "}
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="" selected disabled hidden></option>
          <option>Romance</option>
          <option>Children</option>
          <option>Drama</option>
        </select>
        <input
          type={"text"}
          style={{ marginLeft: "700px", width: "200px" }}
          placeholder={"Search..."}
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
