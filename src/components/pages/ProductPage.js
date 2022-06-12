import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Footer from "../Footer";
import "../Content.css";
import "../css/ProductDetails.css";
import document from "../images/document.png";
import calendar from "../images/calendar.png";
import publisher from "../images/publisher.png";
import genre from "../images/genre.png";
import { getBooks } from "../functions/getBooks";
import addReview from "../functions/addReview";
import { getUser } from "../functions/getUsers";
import "../css/stars.css";
import { getReviews } from "../functions/getReviews";

const useShowLess = (description) => {
  const [show, setShow] = useState(false);
  let i = 0;
  return (
    <>
      <div
        key={`${i++}`}
        style={{
          fontFamily: "Times New Roman",
          fontSize: "20px",
          marginTop: "0px",
          marginLeft: "226px",
          textIndent: "20px",
        }}
      >
        {show === false ? description.substring(0, 400) + "..." : description}
        <br />
        {description.length > 0 ? (
          <button
            onClick={() => setShow(!show)}
            style={{ borderColor: "none" }}
          >
            {show === false ? "Read more..." : "Read less..."}
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

const DisplayLayout = (props) => (
  <div>
    <h1
      style={{
        marginBlockEnd: "0em",
        fontFamily: "Times New Roman",
        fontSize: "40px",
      }}
    >
      {props.record.title}
    </h1>
    <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
    <div className="bookCover" style={{ marginRight: "20px" }}>
      <img
        src={`${props.record.cover}`}
        alt="cover"
        style={{ width: "222px", marginTop: "10px", float: "left" }}
      />
      <span
        style={{
          fontFamily: "Times New Roman",
          fontSize: "20px",
          marginTop: "0px",
          marginLeft: "10px",
        }}
      >
        <b>By {props.record.author}</b>
      </span>
      <br />
      {useShowLess(props.record.description)}
      <br />
      <hr
        style={{
          border: "1px solid black",
          borderColor: "rgba(0, 0, 0, 0.2)",
          marginLeft: "230px",
        }}
      ></hr>
      {/* details book */}
      <div className="detailsContainer">
        <span
          style={{
            fontFamily: "Times New Roman",
            fontSize: "20px",
            marginTop: "0px",
            marginLeft: "10px",
          }}
        >
          Print length
          <br />
          <img
            src={document}
            alt="document"
            style={{ width: "40px", marginLeft: "30px" }}
          />
          <br />
          <span style={{ marginLeft: "15px", fontSize: "15px" }}>
            {props.record.pages} pages
          </span>
        </span>
        {/* publication date */}
        <span
          style={{
            fontFamily: "Times New Roman",
            fontSize: "20px",
            marginTop: "0px",
            marginLeft: "30px",
            marginRight: "10px",
          }}
        >
          Publication date
          <br />
          <img
            src={calendar}
            alt="calendar"
            style={{ width: "40px", marginLeft: "40px" }}
          />
          <br />
          <span style={{ marginLeft: "24px", fontSize: "15px" }}>
            {props.record.year}
          </span>
        </span>
        {/* publisher */}
        <span
          style={{
            fontFamily: "Times New Roman",
            fontSize: "20px",
            marginTop: "0px",
            marginLeft: "30px",
            marginRight: "10px",
            width: "100px",
          }}
        >
          <span style={{ marginLeft: "15px" }}>Publisher</span>
          <br />
          <img
            src={publisher}
            alt="publisher"
            style={{ width: "40px", marginLeft: "30px" }}
          />
          <br />
          <span style={{ fontSize: "15px" }}>{props.record.publisher}</span>
        </span>
        {/* genre */}
        <span
          style={{
            fontFamily: "Times New Roman",
            fontSize: "20px",
            marginTop: "0px",
            marginLeft: "30px",
            marginRight: "10px",
          }}
        >
          <span style={{ marginLeft: "20px" }}>Genre</span>
          <br />
          <img
            src={genre}
            alt="genre"
            style={{ width: "40px", marginLeft: "30px" }}
          />
          <br />
          <span style={{ marginLeft: "15px", fontSize: "15px" }}>
            {props.record.genre}
          </span>
        </span>

        <span
          style={{
            fontFamily: "Times New Roman",
            fontSize: "20px",
            marginTop: "0px",
            marginLeft: "30px",
            marginRight: "10px",
          }}
        ></span>
      </div>
      <hr
        style={{
          border: "1px solid black",
          borderColor: "rgba(0, 0, 0, 0.2)",
          marginLeft: "230px",
        }}
      ></hr>
      <br />
      <Link
        to={`/${props.record._id}/issue`}
        id="issueButton"
        value="Issue book"
        style={{ marginLeft: "400px" }}
      >
        Issue book
      </Link>
      <br />
      <br />
    </div>
  </div>
);

const DisplayReviewsLayout = (props) => (
  <div className="reviewContainer">
    <span style={{ fontFamily: "Times New Roman", fontSize: "18px" }}>
      {props.review.firstName} {props.review.lastName}
    </span>
    <span style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
      , {props.review.date}{" "}
    </span>
    <br />
    <span>{props.review.content}</span>
  </div>
);

export default function ProductPage(id) {
  const [records, setRecords] = useState([]);
  const location = useLocation().pathname.split("/");
  const [reviewContent, setReviewContent] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  let today = new Date();
  let day = today.getDate();
  let month = today.toLocaleString("default", { month: "long" });
  let year = today.getFullYear();
  const defaultStars = [1, 2, 3, 4, 5];
  let currentBook = {};

  useEffect(() => {
    let record = getBooks();
    let review = getReviews();
    record.then((result) => {
      setRecords(result);
    });
    review.then((result) => {
      setReviews(result);
    });
    return;
  }, [records.length, reviews.length]);

  today = day + " " + month + " " + year;
  const handleAddReview = async () => {
    let currentUser = await getUser(localStorage.id);
    const review = {
      bookId: currentBook._id,
      userId: currentUser[0]._id,
      firstName: currentUser[0].first,
      lastName: currentUser[0].last,
      date: today.toString(),
      content: reviewContent,
      stars: stars,
      isApproved: undefined,
    };
    addReview(review);
  };

  function displayBook() {
    return records.map((record) => {
      if (record._id === location[1]) {
        currentBook = record;
        return (
          <>
            <DisplayLayout
              record={record}
              key={record._id}
              isLonger={record.description.split(" ").length > 400}
            />
          </>
        );
      } else <p>not found</p>;
    });
  }

  function displayReviews() {
    return reviews.map((review) => {
      if (review.bookId === location[1] && review.isApproved === "true") {
        return (
          <>
            <DisplayReviewsLayout review={review} key={review._id} />
          </>
        );
      } else <p>not found</p>;
    });
  }
  return (
    <>
      <div className="content">{displayBook()}</div>
      <br />
      <br />
      <br />
      <h3 style={{ marginBottom: "0px", padding: "0px" }}>REVIEWS</h3>
      {defaultStars.map((star) => {
        return (
          <button
            className={star <= stars ? "on" : "off"}
            onClick={() => setStars(star)}
          >
            ★
          </button>
        );
      })}
      <br />
      <textarea
        placeholder={`${localStorage.firstName}, share your opinion!`}
        style={{ width: "99%" }}
        onChange={(e) => setReviewContent(e.target.value)}
      ></textarea>
      <br />
      <button
        style={{ color: "white", marginLeft: "545px" }}
        id={stars === 0 ? "issueButtonDisabled" : "issueButton"}
        disabled={stars === 0 ? true : false}
        onClick={handleAddReview}
      >
        ADD
      </button>
      <br />
      <div className="content">{displayReviews()}</div>
      <Footer></Footer>
    </>
  );
}
