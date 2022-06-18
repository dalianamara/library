import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { ViewPaidFinesTable } from "./ViewPaidFinesTable";
import "../Content.css";
import "../css/ViewBooks.css";

export default function ViewPaidFines() {
  const [records, setRecords] = useState([]);
  const [approved, setIsApproved] = useState(false);
  useEffect(() => {
    setIsApproved(false);
    async function getFines() {
      const response = await fetch(`http://localhost:5000/issue/`);
      if (response.status !== 200) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      const issuedBooks = records.filter(
        (el) =>
          el.isApproved === "true" &&
          el.receipt !== null &&
          el.receipt !== "" &&
          el.paid !== "true"
      );
      setRecords(issuedBooks);
    }
    getFines();
    return;
  }, [approved]);

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Fines approvals</h1>
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
              <th>Fine</th>
              <th>Receipt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              return (
                <ViewPaidFinesTable
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
