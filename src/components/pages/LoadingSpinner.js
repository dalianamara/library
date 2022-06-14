import React, { useEffect, useState } from "react";
import "../css/IssuePopup.css";
import "../css/Issue.css";
import "../css/Spinner.css";
import { Oval } from "react-loader-spinner";
const LoadingPopup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    isOpen && (
      <div
        style={{
          visibility: isOpen ? "visible" : "hidden",
          opacity: isOpen ? "1" : "0",
        }}
        className={"overlay"}
      >
        <div className="message">
          <div style={{ marginLeft: "35%", marginTop: "20%" }}>
            <Oval />
          </div>
          <br />
          <br />
          <div style={{ marginLeft: "25%" }}>
            <h2>Loading users</h2>{" "}
          </div>
        </div>
      </div>
    )
  );
};
export default LoadingPopup;
