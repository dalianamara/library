import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { ViewUsersTable } from "./ViewUsersTable";
import { getUsers } from "../functions/getUsers";
import "../Content.css";
import "../css/ViewUsers.css";

export default function ViewUsers() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let users = getUsers();
    users.then((result) => {
      const users = result.filter((user) => user.user === "user");
      setRecords(users);
    });
    return;
  }, []);

  async function deleteUser(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
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
          <tbody>
            {records.map((record) => (
              <ViewUsersTable
                record={record}
                deleteUser={() => deleteUser(record._id)}
                key={record._id}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}
