import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import "../Content.css";
import "../css/ViewUsers.css";
import { getUsers } from "../functions/getUsers";
import { ViewLibrariansTable } from "./ViewLibrariansTable";
export default function ViewUsers() {
  const [librarians, setLibrarians] = useState([]);

  useEffect(() => {
    let users = getUsers();
    users.then((result) => {
      const users = result.filter((user) => user.user === "librarian");
      setLibrarians(users);
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
          {librarians.map((librarian) => (
            <ViewLibrariansTable
              record={librarian}
              deleteRecord={() => deleteUser(librarian._id)}
              key={librarian._id}
            />
          ))}
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}
