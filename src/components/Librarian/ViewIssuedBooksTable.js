import React from "react";
import { Link } from "react-router-dom";
import "../Content.css";
import "../css/ViewBooks.css";

export const ViewIssuedBooksTable = (props) => (
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
      <Link
        id="buttons"
        to={`/issue/update/${props.record._id}`}
        style={{ color: "black", height: "21px" }}
      >
        Edit
      </Link>
      |{" "}
      <button
        id="buttons"
        onClick={() => {
          props.deleteRecord(props.record._id);
          window.location.href = "/viewIssuedBooks";
        }}
        style={{ color: "black", height: "25px" }}
      >
        Delete
      </button>
    </td>
  </tr>
);
