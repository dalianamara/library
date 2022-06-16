import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { ViewPendingReservationTable } from "./ViewPendingReservationTable";
import { getIssues } from "../functions/getIssues";
import { getBooks } from "../functions/getBooks";
import "../Content.css";
import "../css/ViewBooks.css";

export default function ViewUsers() {
  const [records, setRecords] = useState([]);
  const [books, setBooks] = useState([]);
  const [approved, setIsApproved] = useState(false);
  useEffect(() => {
    setIsApproved(false);
    let issues = getIssues();
    issues.then((issue) => {
      const pendingIssues = issue.filter(
        (el) => el.isApproved === null && el.isReserved === "true"
      );
      setRecords(pendingIssues);
    });
    return;
  }, [approved]);

  useEffect(() => {
    setIsApproved(false);
    let books = getBooks();
    books.then((book) => {
      setBooks(book);
    });
    return;
  }, [approved]);

  const getBook = (id) => {
    return books.filter((book) => book._id === id);
  };
  console.log(records, books);
  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Reservation approvals</h1>
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
            {records.map((record) => {
              return (
                <ViewPendingReservationTable
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
