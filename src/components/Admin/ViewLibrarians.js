import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import "../Content.css";
import "../css/ViewUsers.css";
const View = (props) => (
  <tr>
    <td>{props.record.first}</td>
    <td>{props.record.last}</td>
    <td>{props.record.email}</td>
    <td>{props.record.username}</td>
    <td>
      <Link
        className="btn btn-link"
        to={`/edit/${props.record._id}`}
        style={{ color: "black" }}
      >
        Edit
      </Link>
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function ViewUsers() {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/user/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  async function deleteUser(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    let librarians = [];
    records.map((record) => {
      if (record.user === "librarian") librarians.push(record);
    });
    return librarians.map((librarian) => (
      <View
        record={librarian}
        deleteRecord={() => deleteUser(librarian._id)}
        key={librarian._id}
      />
    ));
  }

  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Librarians</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Username</th>
            <th></th>
          </thead>
          {recordList()}
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}
