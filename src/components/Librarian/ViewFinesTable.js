import React from "react";
import "../Content.css";
import "../css/ViewBooks.css";

export const ViewFinesTable = (props) => {
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
        {props.record.receipt !== null ? (
          <img
            src={props.record.receipt}
            alt="receipt"
            style={{ width: "100px" }}
          />
        ) : (
          ""
        )}
        <br></br>
        {props.record.receipt !== null ? (
          <a
            download={`${props.record.first}_${props.record.last}-${props.record.bookTitle}_receipt.jpg`}
            href={props.record.receipt}
          >
            <div style={{ color: "black" }}>Download receipt </div>
          </a>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};
