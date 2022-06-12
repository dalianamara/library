import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewBooks.css";
let receipt = "";
let imageChosed = false;
const View = (props) => {
  return (
    <tr>
      <td>{props.record.bookTitle}</td>
      <td>{props.record.first}</td>
      <td>{props.record.last}</td>
      <td>{props.record.deliveryType}</td>
      <td>{props.record.returnApproval === "true" ? "yes" : "no"}</td>
      <td>{props.record.issueDate}</td>
      <td>{props.record.dueDate}</td>
      <td>{props.record.fine}</td>
      <td>{props.record.verified === true ? "yes" : "no"}</td>
      <td>
        <input
          type="file"
          id="receipt"
          accept=".png, .jpg, .jpeg"
          style={{ width: "186px", display: "none" }}
          onChange={(e) => {
            let fileReader = new FileReader();
            let base64URL = "";
            let image = e.target.files[0];
            fileReader.readAsDataURL(image);
            fileReader.onload = (image) => {
              base64URL = fileReader.result;
              receipt = base64URL;
            };
            imageChosed = true;
          }}
        ></input>
        <button>
          <label for="receipt">Choose image</label>
        </button>
        <button
          id={"buttons"}
          disabled={!imageChosed}
          onClick={() => props.updateReceipt(props, receipt)}
          style={
            imageChosed
              ? {
                  color: "black",
                  width: "91px",
                  height: "21px",
                  pointerEvents: "auto",
                }
              : {
                  color: "black",
                  width: "91px",
                  height: "21px",
                  pointerEvents: "none",
                }
          }
        >
          Send receipt
        </button>
      </td>
    </tr>
  );
};

async function updateReceipt(props, receipt) {
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
    fine: props.fine,
    issueDate: props.issueDate,
    dueDate: props.dueDate,
    returnDate: props.returnDate,
    days: props.days,
    receipt: receipt,
    paid: props.paid,
    verified: !props.verified,
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

export default function ViewUsers() {
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
      const issuedBooks = records.filter(
        (el) =>
          el.isApproved === "true" &&
          el.email === localStorage.email &&
          el.fine !== 0 &&
          (el.paid === null || el.paid === "false") &&
          el.receipt === null
      );
      setRecords(issuedBooks);
    }
    getRecords();
    return;
  });

  function recordList() {
    return records.map((record) => {
      return (
        <View
          record={record}
          key={record._id}
          updateReceipt={() => updateReceipt(record, receipt)}
        />
      );
    });
  }

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Pay Fines</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Delivery Type</th>
              <th>Returned</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Fine</th>
              <th>Verified</th>
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
