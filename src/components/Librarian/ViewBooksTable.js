import React from "react";
import { Link } from "react-router-dom";
import "../Content.css";
import "../css/ViewBooks.css";

export const ViewBooksTable = (props) => (
  <tr>
    <td>
      {<img src={props.record.cover} alt="cover" style={{ width: "100px" }} />}
    </td>
    <td style={{ width: "450px" }}>{props.record.title}</td>
    <td>{props.record.author}</td>
    <td>{props.record.genre}</td>
    <td>{props.record.pages}</td>
    <td>{props.record.stock}</td>
    <td>
      <Link
        id="buttons"
        to={`/book/edit/${props.record._id}`}
        style={{ color: "black", height: "21px" }}
      >
        Edit
      </Link>
      |
      <button
        id="buttons"
        onClick={() => {
          props.deleteBook(props.record._id);
          window.location.href = "/viewbook";
        }}
        style={{ color: "black", height: "25px" }}
      >
        Delete
      </button>
    </td>
  </tr>
);
