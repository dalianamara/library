import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewBooks.css";
import { ViewReturnedBooksTable } from "./ReturnedBooksTable";
import { getIssues } from "../functions/getIssues";

export default function ViewUsers() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let issues = getIssues();
    issues.then((issue) => {
      const pendingIssues = issue.filter(
        (el) => el.isReturned === "true" && el.returnApproval === null
      );
      setRecords(pendingIssues);
    });
    return;
  }, []);

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Return approvals</h1>
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
                <ViewReturnedBooksTable record={record} key={record._id} />
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}
