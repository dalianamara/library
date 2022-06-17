import React, { useEffect, useState } from "react";
import "../css/IssuePopup.css";
import "../css/Issue.css";

const IssuePopup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let today = new Date();
  let nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 2);
  let deliveryNumericDay = nextDay.getDate();
  let deliveryMonth = nextDay.toLocaleString("default", { month: "long" });
  let deliveryDay = nextDay.toLocaleString("default", { weekday: "long" });
  const handleOk = (e) => {
    setIsOpen(false);
    props.onOk(false);
    if (props.title !== "Address error")
      window.location.href = "/viewbooksuser";
  };
  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return props.content.title !== undefined ? (
    <div
      style={{
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? "1" : "0",
      }}
      className={"overlay"}
    >
      <div className="box">
        <h2>{props.title}</h2>

        <br />
        <img
          src={`${props.content.cover}`}
          alt={"cover"}
          style={{ width: "160px", float: "left" }}
        />
        <div style={{ float: "left", marginLeft: "30px" }}>
          <div style={{ width: "800px" }}>
            <h3 style={{ marginBottom: "0px", textAlign: "left" }}>
              {props.content.title}
            </h3>
          </div>
          <div style={{ textAlign: "left" }}>
            <span>A book by {props.content.author}</span>
          </div>
        </div>
        <hr
          style={{
            border: "0.1px solid black",
            borderColor: "rgba(190,190,190, 0.4)",
            width: "80%",
            marginLeft: "180px",
            margin: "0px",
            marginTop: "5px",
          }}
        ></hr>
        <div style={{ textAlign: "left" }}>
          <span style={{ color: "#6AA121", float: "left", marginLeft: "30px" }}>
            <b>{props.deliveryType} Delivery</b>
          </span>
        </div>
        <br />
        <div style={{ width: "800px", marginLeft: "120px" }}>
          {props.type !== "reserve" ? (
            <span
              style={{
                float: "left",
                marginLeft: "70px",
                marginTop: "20px",
                textAlign: "left",
              }}
            >
              {`The book can arrive at your address on
             ${deliveryDay}, ${deliveryNumericDay} ${deliveryMonth}, if the issue will be approved today`}{" "}
            </span>
          ) : (
            <span
              style={{
                float: "left",
                marginLeft: "70px",
                marginTop: "-100px",
                textAlign: "left",
              }}
            >
              The issued book will be issued after a copy will be available and
              the librarian confirmed the reservation.
            </span>
          )}
        </div>
        <br />
        <br />
        <button
          onClick={handleOk}
          style={{ marginTop: "4%", width: "50px", height: "30px" }}
          id={"adressButton"}
        >
          OK
        </button>
      </div>
    </div>
  ) : (
    <div
      style={{
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? "1" : "0",
      }}
      className={"overlay"}
    >
      <div className="errorBox">
        <h2>{props.title}</h2>
        <br />

        <div style={{ float: "left", marginLeft: "30px" }}>
          <h4 style={{ marginBottom: "0px" }}>{props.content}</h4>
        </div>
        <hr
          style={{
            border: "0.1px solid black",
            borderColor: "rgba(190,190,190, 0.4)",
            width: "80%",
            marginLeft: "150px",
            margin: "0px",
            marginTop: "5px",
          }}
        ></hr>

        <br />

        <br />
        <br />
        <button
          onClick={handleOk}
          style={{ marginTop: "10px", width: "50px", height: "30px" }}
          id={"adressButton"}
        >
          OK
        </button>
      </div>
    </div>
  );
};
export default IssuePopup;
