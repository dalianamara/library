import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import "../Content.css";
import "../css/ViewUsers.css";
const View = (props) => (
  <tr>
    <td>{props.record.first}</td>
    <td>{props.record.last}</td>
    <td>{props.record.username}</td>
    <td>
      <Link
        id="buttons"
        className="btn btn-link"
        to={`/edit/${props.record._id}`}
        style={{ color: "black" }}
      >
        Edit
      </Link>
      |
      <button
        id="buttons"
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
        style={{ color: "black", height: "25px", paddingLeft: "5px" }}
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
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      const users = records.filter((user) => user.user === "user");

      setRecords(users);
    }
    getRecords();
    return;
  });

  async function deleteUser(id) {
    await fetch(`http://localhost:5000/${id}`, {
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
        <h1 style={{ marginBlockEnd: "0em" }}>Users</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Username</th>
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
