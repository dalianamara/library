import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { ViewIssuedBooksTable } from "./ViewIssuedBooksTable";
import "../Content.css";
import "../css/ViewBooks.css";

export default function ViewIssuedBooks() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/issue/`);
      if (response.status !== 200) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      const issuedBooks = records.filter((el) => el.isApproved === "true");
      setRecords(issuedBooks);
    }
    getRecords();
    return;
  }, []);

  async function deleteIssue(id) {
    await fetch(`http://localhost:5000/issue/delete/${id}`, {
      method: "DELETE",
    });
  }

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Issued Books</h1>
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
                <ViewIssuedBooksTable
                  record={record}
                  deleteRecord={() => deleteIssue(record._id)}
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
