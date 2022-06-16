import React from "react";
import "../Content.css";
import "../css/ViewBooks.css";
import approve from "../images/approve.png";
import reject from "../images/reject.png";
import editIssue from "../functions/editIssue";
import editBook from "../functions/editBook";

export const ViewPendingBooksTable = (props) => {
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
      isApproved: approve,
      issueDate: props.record.issueDate,
      returnDate: props.record.returnDate,
      dueDate: props.record.dueDate,
      receipt: props.record.receipt,
      paid: props.record.paid,
    };
    editIssue(props.record._id, editedIssue);

    const editedBook = {
      title: props.book.title,
      author: props.book.author,
      genre: props.book.genre,
      cover: props.book.cover,
      year: props.book.year,
      description: props.book.description,
      pages: props.book.pages,
      stock: approve === "true" ? props.book.stock - 1 : props.book.stock,
      publisher: props.book.publisher,
    };
    editBook(props.book._id, editedBook);
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
            className="image"
            style={{ width: "20px" }}
          />
        </button>
      </td>
    </tr>
  );
};
