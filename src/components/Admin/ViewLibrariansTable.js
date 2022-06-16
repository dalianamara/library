import React from "react";
import { Link } from "react-router-dom";
import "../Content.css";
import "../css/ViewUsers.css";
export const ViewLibrariansTable = (props) => (
  <tr>
    <td>{props.record.first}</td>
    <td>{props.record.last}</td>
    <td>{props.record.email}</td>
    <td>{props.record.username}</td>
    <td>
      <Link
        id="buttons"
        to={`/edit/${props.record._id}`}
        style={{ color: "black" }}
      >
        Edit
      </Link>
      |
      <button
        id="buttons"
        onClick={() => {
          props.deleteRecord(props.record._id);
          window.location.href = "/viewlib";
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);
