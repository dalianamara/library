import React from "react";
import { Link } from "react-router-dom";
import "../Content.css";
import "../css/ViewUsers.css";
export const ViewUsersTable = (props) => (
  <tr>
    <td>{props.record.first}</td>
    <td>{props.record.last}</td>
    <td>{props.record.username}</td>
    <td>
      <Link
        id="buttons"
        className="btn btn-link"
        to={`/record/edit/${props.record._id}`}
        style={{ color: "black" }}
      >
        Edit
      </Link>
      |
      <button
        id="buttons"
        className="btn btn-link"
        onClick={() => {
          props.deleteUser(props.record._id);
          window.location.href = "/viewusers";
        }}
        style={{ color: "black", height: "25px", paddingLeft: "5px" }}
      >
        Delete
      </button>
    </td>
  </tr>
);
