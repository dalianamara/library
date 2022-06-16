import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewBooks.css";
import { ViewPendingReviewsTable } from "./PendingReviewsTable";

export default function ViewUsers() {
  const [reviews, setReviews] = useState([]);
  const [approved, setIsApproved] = useState(false);
  useEffect(() => {
    setIsApproved(false);
    async function getReviews() {
      const response = await fetch(`http://localhost:5000/review/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      const pendingReviews = records.filter(
        (el) => el.isApproved === null || el.isApproved === undefined
      );
      setReviews(pendingReviews);
    }
    getReviews();
    return;
  }, [approved]);

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Review approvals</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date</th>
              <th>Content</th>
              <th>Stars</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((record) => {
              return (
                <ViewPendingReviewsTable
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
