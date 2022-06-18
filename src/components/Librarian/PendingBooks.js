import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewBooks.css";
import { getIssues } from "../functions/getIssues";
import { ViewPendingBooksTable } from "./ViewPendingBooksTable";
import { getBooks } from "../functions/getBooks";

export default function Viewbooks() {
  const [issues, setIssues] = useState([]);
  const [books, setBooks] = useState([]);
  const [approved, setIsApproved] = useState(false);
  useEffect(() => {
    setIsApproved(false);
    let issues = getIssues();

    issues.then((issue) => {
      const pendingIssues = issue.filter(
        (el) =>
          (el.isApproved === undefined || el.isApproved === null) &&
          (el.isReserved === false ||
            el.isReserved === null ||
            el.isReserved === "false")
      );
      setIssues(pendingIssues);
    });
    return;
  }, [approved]);

  const getBook = (id) => {
    return books.filter((book) => book._id === id);
  };

  useEffect(() => {
    setIsApproved(false);
    let books = getBooks();
    books.then((book) => {
      setBooks(book);
    });
    return;
  }, [approved]);

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Issue approvals</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Delivery Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {issues.map((record) => {
              return (
                <ViewPendingBooksTable
                  record={record}
                  key={record._id}
                  book={getBook(record.bookId)[0]}
                  setIsApproved={setIsApproved}
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
