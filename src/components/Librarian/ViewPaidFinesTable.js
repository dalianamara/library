import React from "react";
import "../Content.css";
import "../css/ViewBooks.css";
import approve from "../images/approve.png";
import reject from "../images/reject.png";

export const ViewPaidFinesTable = (props) => {
  const handleApproval = async (approve) => {
    const editedIssue = {
      first: props.record.first,
      last: props.record.last,
      email: props.record.email,
      phoneNumber: props.record.phoneNumber,
      city: props.record.city,
      street: props.record.street,
      bookId: props.record.bookId,
      bookTitle: props.record.bookTitle,
      deliveryType: props.record.deliveryType,
      returnApproval: approve,
      isReturned: props.record.isReturned,
      fine: props.record.fine,
      isApproved: props.record.isApproved,
      issueDate: props.record.issueDate,
      returnDate: props.record.returnDate,
      dueDate: props.record.dueDate,
      receipt: approve ? props.record.receipt : null,
      paid: approve,
      verified: true,
    };
    await fetch(`http://localhost:5000/issue/edit/${props.record._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedIssue),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };
  return (
    <tr>
      <td>{props.record.bookTitle}</td>
      <td>{props.record.first}</td>
      <td>{props.record.last}</td>
      <td>
        {props.record.street}, {props.record.city}
      </td>
      <td>{props.record.phoneNumber}</td>
      <td>{props.record.deliveryType}</td>
      <td>{props.record.fine}</td>
      <td>
        <img
          src={props.record.receipt}
          alt="receipt"
          style={{ width: "100px" }}
        />
        <br></br>
        <a
          download={`${props.record.first}_${props.record.last}-${props.record.bookTitle}_receipt.jpg`}
          href={props.record.receipt}
        >
          <div style={{ color: "black" }}>Download receipt </div>
        </a>
      </td>
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
