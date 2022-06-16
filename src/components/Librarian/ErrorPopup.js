import React, { useEffect, useState } from "react";
import "../css/ErrorPopup.css";
// import "../css/Issue.css";

const IssuePopup = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOk = (e) => {
    setIsOpen(false);
    props.onOk(false);
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <div
      style={{
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? "1" : "0",
      }}
      className={"overlay"}
    >
      <div className="box">
        <h2>{"Error"}</h2>
        <br />
        {props.message}
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
