import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import "../Content.css";
import "../css/ViewBooks.css";
let fine = 0;
const View = (props) => {
  let today = new Date();
  const dueDate = new Date(props.record.dueDate);
  let todays_date = new Date(today);
  let mins = dueDate.getTime() - todays_date.getTime();
  let days = mins / (1000 * 3600 * 24);
  console.log(mins, days)

  useEffect(() => {
    if (days < 0) {
      fine = (0.3 * -days).toFixed(2);
    } else {
      fine = 0;
    }
    props.updateFine(props.record, fine);
  }, [days, props]);
  
  return ( <tr>
    <td>{props.record.bookTitle}</td>
    <td>{props.record.first}</td>
    <td>{props.record.last}</td>
    <td>
      {props.record.street}, {props.record.city}
    </td>
    <td>{props.record.phoneNumber}</td>
    <td>{props.record.fine}</td>
    <td>
      <Link
        id="buttons"
        to={`/issue/update/${props.record._id}`}
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
  </tr>)
};

export default function ViewIssuedBooks() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function getIssues() {
      const response = await fetch(`http://localhost:5000/issue/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const issues = await response.json();
      const issuedBooks = issues.filter((el) => el.isApproved === "true");
      setIssues(issuedBooks);
    }
    getIssues();
    return;
  });
  async function updateFine(props, fine) {
    const editedIssue = {
      first: props.first,
      last: props.last,
      email: props.email,
      phoneNumber: props.phoneNumber,
      city: props.city,
      street: props.street,
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
      receipt: props.receipt,
      paid: props.paid,
    };
    await fetch(`http://localhost:5000/issue/edit/${props._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedIssue),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  async function deleteIssue(id) {
    await fetch(`http://localhost:5000/issue/delete/${id}`, {
      method: "DELETE",
    });
    const newIssues = issues.filter((el) => el._id !== id);
    setIssues(newIssues);
  }

  function issueList() {
    return issues.map((record) => {
      return (
        <View
          record={record}
          deleteRecord={() => deleteIssue(record._id)}
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
              <th></th>
            </tr>
          </thead>
          <tbody>{issueList()}</tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}
