import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import "../Content.css";
import "../css/ViewBooks.css";

const View = (props) => (
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
        to={`/book/edit/${props.record._id}`}
        style={{ color: "black", height: "21px" }}
      >
        Edit
      </Link>
      |
      <button
        id="buttons"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
        style={{ color: "black", height: "25px" }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function ViewPaidFines() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/issue/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      const issuedBooks = records.filter(
        (el) => el.isApproved === "true" && el.receipt !== null
      );
      setRecords(issuedBooks);
    }
    getRecords();
    return;
  });

  async function deleteUser(id) {
    await fetch(`http://localhost:5000/book/delete/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return records.map((record) => {
      return (
        <View
          record={record}
          deleteRecord={() => deleteUser(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Catalogue</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Delivery Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{recordList()}</tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}