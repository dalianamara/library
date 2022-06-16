import React from "react";
import "../Content.css";
import "../css/ViewBooks.css";
import approve from "../images/approve.png";
import reject from "../images/reject.png";

export const ViewPendingReviewsTable = (props) => {
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
          onClick={async () => {
            handleApproval("true");
            props.setIsApproved(true);
          }}
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
          onClick={async () => {
            handleApproval("false");
            props.setIsApproved(true);
          }}
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
