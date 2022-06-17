import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { ViewReservedBooksTable } from "./ViewReservedBooksTable";
import "../Content.css";
import "../css/ViewBooks.css";

export default function ViewUsers() {
  const [records, setRecords] = useState([]);
  const [approved, setIsApproved] = useState(false);
  useEffect(() => {
    setIsApproved(false);
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/issue/`);
      if (response.status !== 200) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      const issuedBooks = records.filter(
        (el) => el.isReserved === "true" && el.userId === localStorage.id
      );
      setRecords(issuedBooks);
    }
    getRecords();
    return;
  }, [approved]);

  async function cancelReservation(id) {
    await fetch(`http://localhost:5000/issue/delete/${id}`, {
      method: "DELETE",
    });
  }

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Reserved Books</h1>
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
                <ViewReservedBooksTable
                  record={record}
                  cancelReservation={() => cancelReservation(record._id)}
                  key={record._id}
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
