import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewUsers.css";
import { ViewFeedbacksTable } from "./ViewFeedbacksTable";
export default function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const feedback = await fetch(`http://localhost:5000/feedback/`);
      if (!feedback.ok) {
        const message = `An error occured: ${feedback.statusText}`;
        window.alert(message);
        return;
      }
      const feedbacks = await feedback.json();
      setFeedbacks(feedbacks);
    }
    getReviews();
    return;
  }, []);

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Feedback</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <ViewFeedbacksTable record={feedback} key={feedback._id} />
            ))}
          </tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}
