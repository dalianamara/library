import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Footer from "../Footer";
import IssuePopup from "./IssuePopup";
import "../Content.css";
import "../css/Issue.css";

const View = (props) => {
  const [homeVisibility, setHomeVisibility] = useState(false);
  const [pickupVisibility, setPickupVisibility] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  let today = new Date();
  let day = today.getDate();
  let month = today.toLocaleString("default", { month: "2-digit" });
  let year = today.getFullYear();
  let dueDate = new Date(new Date().setDate(today.getDate() + 31));
  let dueDay = dueDate.getDate();
  let dueMonth = dueDate.toLocaleString("default", { month: "2-digit" });
  let dueYear = dueDate.getFullYear();
  dueDate = dueYear + "-" + dueMonth + "-" + dueDay;
  today = year + "-" + month + "-" + day;

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/user/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      records.map((record) =>
        record.username === localStorage.username ? setCurrentUser(record) : ""
      );
      setUsers(records);
    }
    getRecords();
    return;
  }, [users.length]);

  async function handleSubmitHome() {
    console.log(currentUser);
    if (
      currentUser.city !== null &&
      currentUser.street !== null &&
      currentUser.phoneNumber !== null
    ) {
      const newIssue = {
        first: currentUser.first,
        last: currentUser.last,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        city: currentUser.city,
        street: currentUser.street,
        bookId: `${props.record._id}`,
        bookTitle: `${props.record.title}`,
        deliveryType: "home",
        isApproved: undefined,
        isReturned: undefined,
        returnApproval: undefined,
        fine: 0,
        issueDate: today.toString(),
        dueDate: dueDate,
        isReserved: props.type === "reserve" ? "true" : "false",
        receipt: undefined,
      };
      await fetch("http://localhost:5000/issue/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIssue),
      }).catch((error) => {
        window.alert(error);
        return;
      });
      const response = await fetch(
        `http://localhost:5000/book/${props.record._id.toString()}`
      );
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      setHomeVisibility(!homeVisibility);
    } else {
      setErrorVisibility(!errorVisibility);
    }
  }

  async function handleSubmitPickup() {
    const newIssue = {
      first: currentUser.first,
      last: currentUser.last,
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber,
      city: "Timisoara",
      street: "Cozia no. 176",
      bookId: `${props.record._id}`,
      bookTitle: `${props.record.title}`,
      deliveryType: "pickup",
      isApproved: undefined,
      isReturned: undefined,
      returnApproval: undefined,
      fine: 0,
      issueDate: today.toString(),
      dueDate: dueDate,
      isReserved: undefined,
      receipt: undefined,
    };
    await fetch("http://localhost:5000/issue/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIssue),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setPickupVisibility(!pickupVisibility);
  }
  const handleOk = (e) => {
    setPickupVisibility(e);
  };
  return (
    <>
      <h1 style={{ marginBlockEnd: "0em" }}>Delivery address</h1>
      <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
      <div style={{ display: "flex" }}>
        <div className="issueContainer">
          <p style={{ fontFamily: "Times New Roman", fontSize: "20px" }}>
            Home delivery
          </p>
          <p style={{ margin: "2px" }}>
            The issued books will be delivered to your home address after
            confirmation.
          </p>
          <div style={{ marginLeft: "80px" }}>
            <p
              style={{
                fontFamily: "Times New Roman",
                float: "left",
                margin: "0px",
              }}
            >
              <b>City: </b>
              {/* {users.username === localStorage.username ? } */}
              {currentUser.city !== undefined &&
              currentUser.city !== "" &&
              currentUser.city !== null
                ? currentUser.city
                : "not set"}
            </p>
            <br />
            <p
              style={{
                fontFamily: "Times New Roman",
                float: "left",
                margin: "0px",
              }}
            >
              <b>Street: </b>
              {currentUser.street !== undefined &&
              currentUser.street !== "" &&
              currentUser.street !== null
                ? currentUser.street
                : "not set"}
            </p>
            <br />
            <p
              style={{
                fontFamily: "Times New Roman",
                float: "left",
                margin: "0px",
              }}
            >
              <b>Contact: </b>
              {currentUser.first + " " + currentUser.last}
            </p>
            <br />
            <p
              style={{
                fontFamily: "Times New Roman",
                float: "left",
                margin: "0px",
              }}
            >
              <b>Phone number: </b>
              {currentUser.phoneNumber !== undefined &&
              currentUser.phoneNumber !== "" &&
              currentUser.phoneNumber !== null
                ? currentUser.phoneNumber
                : "not set"}
            </p>
          </div>
          <br />
          <Link to={`/${currentUser._id}/changeSettings`} id="adressButton">
            Change address
          </Link>
          <br />
          <button
            // to={`/${props.record._id}/issue/home`}
            onClick={handleSubmitHome}
            id="adressButton"
            style={{ marginTop: "120px", height: "30px" }}
          >
            Free delivery at home
          </button>
          <IssuePopup
            isOpen={homeVisibility}
            title="Home Delivery"
            content={props.record}
            deliveryType={"Home"}
            onOk={handleOk}
          ></IssuePopup>
          <IssuePopup
            isOpen={errorVisibility}
            title="Address error"
            content={
              "Address was not set yet. Please return to the previous page to set your correct address."
            }
            deliveryType={"Home"}
            onOk={handleOk}
          ></IssuePopup>
        </div>

        <div className="issueContainer">
          <p style={{ fontFamily: "Times New Roman", fontSize: "20px" }}>
            Pickup
          </p>
          <div style={{ marginLeft: "80px" }}>
            <p
              style={{
                fontFamily: "Times New Roman",
                float: "left",
                margin: "0px",
              }}
            >
              <b>City: </b>
              Timisoara
            </p>
            <br />
            <p
              style={{
                fontFamily: "Times New Roman",
                float: "left",
                margin: "0px",
              }}
            >
              <b>Street: </b>
              {"Cozia no. 176"}
            </p>
            <br />
            <p
              style={{
                fontFamily: "Times New Roman",
                float: "left",
                margin: "0px",
              }}
            >
              <b>Delivery day: </b>
              {"Monday"}
            </p>
            <br />
            <button
              // to={`/${props.record._id}/issue/pickup`}
              onClick={handleSubmitPickup}
              id="adressButton"
              style={{
                marginTop: "215px",
                height: "30px",
                marginLeft: "40px",
                width: "180px",
              }}
            >
              Free delivery at pickup
            </button>
            <IssuePopup
              isOpen={pickupVisibility}
              title="Pickup Delivery"
              content={props.record}
              deliveryType={"Pickup"}
              onOk={handleOk}
            ></IssuePopup>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Issue(props) {
  const [records, setRecords] = useState([]);
  const location = useLocation().pathname.split("/");

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/book/`);
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

  async function getBook(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "GET",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function displayBook() {
    return records.map((record) => {
      if (record._id === location[1]) {
        return (
          <>
            <View
              record={record}
              getRecord={() => getBook(record._id)}
              key={record._id}
              isSet={false}
              type={props.type}
            />
          </>
        );
      } else <p>not found</p>;
    });
  }

  return (
    <>
      <div className="content">{displayBook()}</div>
      <Footer></Footer>
    </>
  );
}
