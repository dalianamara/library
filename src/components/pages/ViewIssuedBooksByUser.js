import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import "../Content.css";
import "../css/ViewBooks.css";
let fine = 0;
const View = (props) => {
  const issueDate = new Date(props.record.issueDate);
  const dueDate = new Date(props.record.dueDate);
  let today = new Date();
  let day = today.getDate();
  let month = today.toLocaleString("default", { month: "numeric" });
  let year = today.getFullYear();
  today = month + "/" + day + "/" + year;
  let todday = new Date(today);
  let mins = dueDate.getTime() - issueDate.getTime();
  let mins1 = dueDate.getTime() - todday.getTime();
  let days = mins / (1000 * 3600 * 24);
  let days1 = mins1 / (1000 * 3600 * 24);
  if (days1 < 0) {
    fine = (0.8 * -days1).toFixed(2);
  } else {
    fine = 0;
  }
  useEffect(() => {
    props.updateFine(props.record, fine);
  }, [days1]);

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
      <td>{props.record.returnApproval === "true" ? "yes" : "no"}</td>
      <td>{props.record.issueDate}</td>
      <td>{props.record.dueDate}</td>
      <td>{Math.round(days1)}</td>
      <td>{fine + " lei"}</td>
      <td>
        <Link
          id={fine > 0 ? "disabledButton" : "buttons"}
          to={`/issue/edit/${props.record._id}`}
          style={{ color: "black", height: "21px" }}
        >
          Renew
        </Link>
      </td>
    </tr>
  );
};

export default function ViewUsers() {
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
        (el) => el.isApproved === "true" && el.email === localStorage.email
      );
      setRecords(issuedBooks);
    }
    getRecords();
    return;
  });

  async function updateFine(props, fine) {
    const editedissue = {
      first: props.first,
      last: props.last,
      email: props.email,
      phoneNumber: props.phoneNumber,
      city: props.city,
      bookId: props.bookId,
      bookTitle: props.bookTitle,
      deliveryType: props.deliveryType,
      isApproved: props.isApproved,
      isReturned: props.isReturned,
      returnApproval: props.returnApproval,
      fine: fine,
      issueDate: props.issueDate,
      dueDate: props.dueDate,
      days: props.days,
    };
    await fetch(`http://localhost:5000/issue/edit/${props._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedissue),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  function recordList() {
    return records.map((record) => {
      return (
        <View
          record={record}
          updateFine={() => updateFine(record, fine)}
          key={record._id}
        />
      );
    });
  }

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Issued Books</h1>
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
              <th>Returned</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Days left</th>
              <th>Fine</th>
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
