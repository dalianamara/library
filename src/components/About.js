import "./Content.css";
import Footer from "./Footer";
import "./css/faq.css";
const About = () => {
  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>About</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <p>
          The library was founded in November 1st, 2009 having 10.000 books.
          Nowadays, the library offers the reader over 500.000 books. The main
          reason this library was founded was to help the readers
        </p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
