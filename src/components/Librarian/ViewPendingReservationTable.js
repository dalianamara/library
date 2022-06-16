import React from "react";
import "../Content.css";
import "../css/ViewBooks.css";
import approve from "../images/approve.png";
import reject from "../images/reject.png";

export const ViewPendingReservationTable = (props) => {
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
      returnApproval: props.record.returnApproval,
      isReturned: props.record.isReturned,
      fine: props.record.fine,
      isApproved: approve,
      issueDate: props.record.issueDate,
      returnDate: props.record.returnDate,
      dueDate: props.record.dueDate,
      isReserved: !approve,
      receipt: undefined,
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

    const response = await fetch(
      `http://localhost:5000/book/${props.record.bookId.toString()}`
    );
    if (response.status !== 200) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const book = await response.json();
    if (!book) {
      const message = `Book ${props.record.bookId} does not exist`;
      window.alert(message);
      return;
    }
    const editedBook = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      cover: book.cover,
      year: book.year,
      description: book.description,
      pages: book.pages,
      stock: approve === "true" ? book.stock - 1 : book.stock,
      publisher: book.publisher,
    };
    await fetch(`http://localhost:5000/book/edit/${props.record.bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedBook),
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
      <td>
        <button
          id={
            props.book === undefined || props.book.stock === 0
              ? "disabled"
              : "buttons"
          }
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
            data-testid={"approve"}
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
            alt="reject"
            data-testid={"reject"}
            className="image"
            style={{ width: "20px" }}
          />
        </button>
      </td>
    </tr>
  );
};
