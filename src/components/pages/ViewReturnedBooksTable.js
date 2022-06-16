import React from "react";
import "../Content.css";
import "../css/ViewBooks.css";
import approve from "../images/approve.png";

export const ViewReturnedBooksTable = (props) => {
  const handleApproval = async (approve) => {
    let today = new Date();
    let day = today.getDate();
    let month = today.toLocaleString("default", { month: "2-digit" });
    let year = today.getFullYear();
    today = year + "-" + month + "-" + day;
    const editedUser = {
      first: props.record.first,
      last: props.record.last,
      email: props.record.email,
      phoneNumber: props.record.phoneNumber,
      city: props.record.city,
      street: props.record.street,
      bookId: props.record.bookId,
      bookTitle: props.record.bookTitle,
      deliveryType: props.record.deliveryType,
      isApproved: props.record.isApproved,
      returnApproval: props.record.returnApproval,
      isReturned: approve,
      fine: props.record.fine,
      issueDate: props.record.issueDate,
      returnDate: today,
      dueDate: props.record.dueDate,
      isReserved: undefined,
      paid: props.record.paid,
    };
    await fetch(`http://localhost:5000/issue/edit/${props.record._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };

  return (
    <tr>
      <td style={{ width: "400px" }}>{props.record.bookTitle}</td>
      <td>{props.record.first}</td>
      <td>{props.record.last}</td>
      <td>
        {props.record.street}, {props.record.city}
      </td>
      <td>{props.record.phoneNumber}</td>
      <td>{props.record.deliveryType}</td>
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
            className="image"
            style={{ width: "20px" }}
            alt={"approve"}
          />
        </button>
      </td>
    </tr>
  );
};
