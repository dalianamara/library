import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewBooks.css";
import approve from "../images/approve.png";
import reject from "../images/reject.png";

const View = (props) => {
  const handleApproval = async (approve) => {
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
      returnApproval: props.record.returnApproval,
      isReturned: props.record.isReturned,
      fine: props.record.fine,
      isApproved: approve,
      issueDate: props.record.issueDate,
      dueDate: props.record.dueDate,
      isReserved: false,
      receipt: undefined,
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

    const response = await fetch(
      `http://localhost:5000/book/${props.record.bookId.toString()}`
    );
    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const user = await response.json();
    if (!user) {
      const message = `Record ${props.record.bookId} does not exist`;
      window.alert(message);
      return;
    }
    const editedBook = {
      title: user.title,
      author: user.author,
      genre: user.genre,
      cover: user.cover,
      year: user.year,
      description: user.description,
      pages: user.pages,
      stock: approve === "true" ? user.stock - 1 : user.stock,
      publisher: user.publisher,
    };
    await fetch(`http://localhost:5000/book/edit/${props.record.bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedBook),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };
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
          id={
            props.book === undefined || props.book.stock === 0
              ? "disabled"
              : "buttons"
          }
          onClick={async () => handleApproval("true")}
          style={{ color: "black", height: "21px" }}
        >
          <img
            src={approve}
            alt="approve"
            className="image"
            style={{ width: "20px" }}
          />
        </button>
        <button
          id="buttons"
          onClick={async () => handleApproval("false")}
          style={{ color: "black", height: "21px" }}
        >
          <img
            src={reject}
            alt="reject"
            className="image"
            style={{ width: "20px" }}
          />
        </button>
      </td>
    </tr>
  );
};

export default function ViewUsers() {
  const [records, setRecords] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/issue/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      const pendingIssues = records.filter(
        (el) => el.isApproved === null || el.isReserved === "true"
      );
      setRecords(pendingIssues);
    }
    getRecords();
    return;
  });

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(`http://localhost:5000/book/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const books = await response.json();
      setBooks(books);
    };
    getBooks();
    return;
  }, [books.length]);

  const getBook = (id) => {
    return books.filter((book) => book._id === id);
  };

  function recordList() {
    return records.map((record) => {
      return (
        <View
          record={record}
          key={record._id}
          book={getBook(record.bookId)[0]}
        />
      );
    });
  }

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Reservation approvals</h1>
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
