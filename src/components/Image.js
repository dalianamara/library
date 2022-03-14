import React from "react";
import "./Image.css";
import { Link } from "react-router-dom";
const Image = (props) => {
  return (
    <div className="images">
      <Link className="main" to={props.link}>
        <img src={"images/" + props.image} className="image" alt={"main"} />
        <div className="overlay_text">
          <div className="text">{props.text}</div>
        </div>
      </Link>
    </div>
  );
};
export default Image;
