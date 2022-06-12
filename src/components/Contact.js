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
          <p style={{ fontSize: "20px" }}>
            <b>Address</b>
          </p>
          Ioan Slavici Street, nr. 20
          <br /> Timisoara, 300077
          <br /> Timis, Romania
          <br />
          <p style={{ fontSize: "20px" }}>
            <b>Phone number</b>
          </p>
          +40 (0)342 192 651
          <p style={{ fontSize: "20px" }}>
            <b>Email</b>
          </p>
          contact@librarymanagement.ro
        </p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Contact;
