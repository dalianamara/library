import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewBooks.css";
import approve from "../images/approve.png";
import reject from "../images/reject.png";

const View = (props) => {
  const handleApproval = async (approve) => {
    let today = new Date();
    let day = today.getDate();
    let month = today.toLocaleString("default", { month: "2-digit" });
    let year = today.getFullYear();
    today = year + "-" + month + "-" + day;
    const editedUser = {
      first: props.record.first,
      last: props.record.last,
      email: props.record.email,
      phoneNumber: props.record.phoneNumber,
      city: props.record.city,
      street: props.record.street,
      bookId: props.record.bookId,
      bookTitle: props.record.bookTitle,
      deliveryType: props.record.deliveryType,
      isApproved: props.record.isApproved,
      returnApproval: props.record.returnApproval,
      isReturned: approve,
      fine: props.record.fine,
      issueDate: props.record.issueDate,
      returnDate: today,
      dueDate: props.record.dueDate,
      isReserved: undefined,
      paid: props.record.paid,
    };
    await fetch(`http://localhost:5000/issue/edit/${props.record._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };

  return (
    <tr>
      <td style={{ width: "400px" }}>{props.record.bookTitle}</td>
      <td>{props.record.first}</td>
      <td>{props.record.last}</td>
      <td>
        {props.record.street}, {props.record.city}
      </td>
      <td>{props.record.phoneNumber}</td>
      <td>{props.record.deliveryType}</td>
      <td>
        <button
          id="buttons"
          onClick={async () => handleApproval("true")}
          style={{ color: "black", height: "21px" }}
        >
          <img
            src={approve}
            className="image"
            style={{ width: "20px" }}
            alt={"approve"}
          />
        </button>
      </td>
    </tr>
  );
};

export default function ReturnBooks() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/issue/`);
      if (response.status !== 200) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();

      const pendingIssues = records.filter(
        (el) =>
          el.isReturned === null &&
          el.isApproved !== null &&
          el.isApproved !== undefined &&
          el.isApproved !== "false" &&
          el.email === localStorage.email
      );
      setRecords(pendingIssues);
    }
    getRecords();
    return;
  });

  function recordList() {
    return records.map((record) => {
      return <View record={record} key={record._id} />;
    });
  }

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Books to return</h1>
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
