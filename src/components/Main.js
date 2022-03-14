import React, { Component } from "react";
import Image from "./Image";
import "./Content.css";
import Footer from "./Footer.js";
const Main = () => {
  return (
    <div className="content">
      <div style={{ display: "flex" }}>
        <Image image="books.jpg" link="/about" text={"ABOUT"}></Image>
        <Image image="contact.jpg" link="/contact" text={"CONTACT"}></Image>
      </div>
      <div style={{ display: "flex" }}>
        <Image
          image="catalogue.jpg"
          link="/viewbooksuser"
          text={"CATALOGUE"}
        ></Image>
        <Image image="feedback.jpg" link="/feedback" text={"FEEDBACK"}></Image>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Main;
