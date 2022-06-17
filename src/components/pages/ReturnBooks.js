import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewBooks.css";
import { ViewReturnedBooksTable } from "./ViewReturnedBooksTable";

export default function ReturnBooks() {
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

      const pendingIssues = records.filter(
        (el) =>
          (el.isReturned === null || el.isReturned !== "true") &&
          el.isApproved !== null &&
          el.isApproved !== undefined &&
          el.isApproved !== "false" &&
          el.userId === localStorage.id &&
          (el.returnApproval === "false" || el.returnApproval === null)
      );
      console.log(pendingIssues);
      setRecords(pendingIssues);
    }
    getRecords();
    return;
  }, [approved]);
  console.log(records);
  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Books to return</h1>
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
                <ViewReturnedBooksTable
                  record={record}
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
