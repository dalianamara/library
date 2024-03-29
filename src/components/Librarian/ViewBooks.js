import React, { useState, useEffect } from "react";
import { getBooks } from "../functions/getBooks";
import Footer from "../Footer";
import { ViewBooksTable } from "./ViewBooksTable";
import "../Content.css";
import "../css/ViewBooks.css";

export default function ViewBooks() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let books = getBooks();
    books.then((result) => {
      setRecords(result);
    });
    return;
  }, []);

  async function deleteBook(id) {
    await fetch(`http://localhost:5000/book/delete/${id}`, {
      method: "DELETE",
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
          <tbody>
            {records.map((record) => {
              return (
                <ViewBooksTable
                  record={record}
                  deleteBook={() => deleteBook(record._id)}
                  key={record._id}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}
