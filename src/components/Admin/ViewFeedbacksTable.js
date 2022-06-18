import React from "react";
import "../Content.css";
import "../css/ViewUsers.css";
export const ViewFeedbacksTable = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.email}</td>
    <td>{props.record.message}</td>
  </tr>
);
