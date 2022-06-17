import "./Content.css";
import Footer from "./Footer";
import "./css/faq.css";
const About = () => {
  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>About</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <p style={{ fontSize: "17px", lineHeight: "1.6" }}>
          The library was founded in November 1st, 2009 having 10.000 books.
          Nowadays, the library offers the reader over 500.000 books. The main
          reason this library was founded was to help the readers issue books
          easier.
          <br />
          <span style={{ fontSize: "20px" }}>
            <b>OBJECTIVES:</b>
          </span>
          <br />
          <span style={{ fontSize: "17px", lineHeight: "1.6" }}>
            o Possibility to create an account within the application
            <br />
            o Ability to authenticate within the application
            <br />
            o Possibility to borrow, reserve and return a book
            <br />
            o Possibility to add reviews
            <br />
            o Possibility to access information regarding the loan, penalties,
            due date, terms and conditions, frequently asked questions
            <br />
            o Possibility to view the book catalog, the catalog of books
            borrowed by the user, the catalog of books being booked, the catalog
            of books being returned, the catalog of books not returned after the
            due date
            <br />
            o Possibility to load the proof of payment of penalties in case of
            non-compliance with the loan term
            <br />
            o Possibility to filter the books according to the category
            <br />
            o Possibility to extend the due date (before it expires)
            <br />
            o Possibility to choose the type of delivery: home delivery or
            pickup in the library
            <br />
            o Ability to edit profile information
            <br />
            o Ability to search by book title
            <br />
          </span>
        </p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
