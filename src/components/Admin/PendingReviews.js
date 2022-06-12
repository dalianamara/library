import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewBooks.css";
import approve from "../images/approve.png";
import reject from "../images/reject.png";

const View = (props) => {
  const handleApproval = async (approve) => {
    const editedReview = {
      bookId: props.record.bookId,
      firstName: props.record.firstName,
      lastName: props.record.lastName,
      date: props.record.date,
      content: props.record.content,
      stars: props.record.stars,
      isApproved: approve,
    };
    await fetch(`http://localhost:5000/review/edit/${props.record._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedReview),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };
  return (
    <tr>
      <td>{props.record.firstName}</td>
      <td>{props.record.lastName}</td>
      <td>{props.record.date}</td>
      <td>{props.record.content}</td>
      <td>{props.record.stars}</td>
      <td>
        <button
          id="buttons"
          onClick={async () => handleApproval("true")}
          style={{ color: "black", height: "21px" }}
        >
          <img
            src={approve}
            alt="approve"
            className="image"
            style={{ width: "20px" }}
          />
        </button>
        <button
          id="buttons"
          onClick={async () => handleApproval("false")}
          style={{ color: "black", height: "21px" }}
        >
          <img
            src={reject}
            alt="approve"
            className="image"
            style={{ width: "20px" }}
          />
        </button>
      </td>
    </tr>
  );
};

export default function ViewReviews() {
  const [reviews, setReviews] = useState([]);
  console.log(reviews);
  useEffect(() => {
    async function getReviews() {
      const response = await fetch(`http://localhost:5000/review/`);
      if (response.status !== 200) {
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
  }, [reviews]);

  function recordList() {
    return reviews.map((record) => {
      return <View record={record} key={record._id} />;
    });
  }

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
          <tbody>{recordList()}</tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}
