import React from "react";
import "../Content.css";
import "../css/ViewBooks.css";
export const ViewReservedBooksTable = (props) => {
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
          id={"buttons"}
          onClick={() => {
            props.cancelReservation(props.record._id);
            props.setIsApproved(true);
          }}
          style={{ color: "black", height: "21px" }}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};
