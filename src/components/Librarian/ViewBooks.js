import React, { useState, useEffect } from "react";
import { getBooks } from "../functions/getBooks";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import "../Content.css";
import "../css/ViewBooks.css";

const View = (props) => (
  <tr>
    <td>
      {<img src={props.record.cover} alt="cover" style={{ width: "100px" }} />}
    </td>
    <td style={{ width: "450px" }}>{props.record.title}</td>
    <td>{props.record.author}</td>
    <td>{props.record.genre}</td>
    <td>{props.record.pages}</td>
    <td>{props.record.stock}</td>
    <td>
      <Link
        id="buttons"
        to={`/book/edit/${props.record._id}`}
        style={{ color: "black", height: "21px" }}
      >
        Edit
      </Link>
      |{" "}
      <button
        id="buttons"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
        style={{ color: "black", height: "25px" }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function ViewBooks() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let books = getBooks();
    books.then((result) => {
      setRecords(result);
    });

    return;
  }, [records.length]);

  async function deleteBook(id) {
    await fetch(`http://localhost:5000/book/delete/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return records.map((record) => {
      return (
        <View
          record={record}
          deleteRecord={() => deleteBook(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Catalogue</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Pages</th>
              <th>In stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{recordList()}</tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}
