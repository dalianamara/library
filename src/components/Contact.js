import "./Content.css";
import Footer from "./Footer";
import "./css/faq.css";
const Contact = () => {
  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Contact</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <p>
          <span style={{ fontSize: "20px", lineHeight: "1.6" }}>
            <b>Address</b>
          </span>
          <br />
          Ioan Slavici Street, nr. 20
          <br /> Timisoara, 300077
          <br /> Timis, Romania
          <br />
          <br />
          <span style={{ fontSize: "20px", lineHeight: "1.6" }}>
            <b>Phone number</b>
          </span>{" "}
          <br />
          +40 (0)342 192 651 <br />
          <br />
          <span style={{ fontSize: "20px", lineHeight: "1.6" }}>
            <b>Email</b>
          </span>{" "}
          <br />
          contact@librarymanagement.ro
        </p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Contact;
