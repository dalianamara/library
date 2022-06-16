import "../Content.css";
import Footer from "../Footer";
import "../css/faq.css";
const Faq = () => {
  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Terms and Conditions</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <p style={{ fontSize: "20px" }}>
          <b>GENERAL INFORMATION</b>
        </p>
        <p>
          The "Terms and Conditions" document implies the legal agreement
          between you as User and/or Visitor and Library Management, regarding
          the use of the Site, access to and use of the facilities of the Site,
          etc. We recommend reading the Terms and Conditions prior to using the
          Site for more proper use. Accessing and visiting the Site, creating a
          new account in the Site and using the facilities that it offers means
          full acceptance of these Terms and Conditions. The Terms and
          Conditions can be modified anytime without notice.
          <p>
            <p style={{ fontSize: "20px" }}>
              <b>GENERAL USAGE CONDITIONS:</b>
            </p>
            • The library is a public site accesible to everyone interested in
            reading from our library. <br />• We reserve the right to rescrict
            or deny access by visitors to certain functions of the site if
            there's a suspicious of fraud.
          </p>
          <p style={{ fontSize: "20px" }}>
            <b>CONFIDENTIALITY:</b>
          </p>
          We are maintaining the confidentiality of the information you provide
          to us. We respect and protect the data provided to us by our readers
          and take all necessary measures to ensure a high level of security.
        </p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Faq;
