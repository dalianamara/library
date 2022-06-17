import "../Content.css";
import Footer from "../Footer";
const Extend = () => {
  return (
    <div className="content">
      <h1>Extend due date</h1>
      <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
      <p>
        • The user is obligated to return the issued books before due date or to
        extend the due date.
        <br />
        <br />
        <span style={{ fontSize: "20px" }}>
          <b>The steps for extending the due date:</b>
        </span>
        <br />
        <span style={{ marginTop: "-10px", lineHeight: "1.6" }}>
          1. Log into your account.
          <br />
          2. Hover the "MY LIBRARY" menu item
          <br />
          3. Click "Issued Books"
          <br />
          4. Find the book you want to extend the due date for
          <br />
          5. Click "Renew" button (If the due date is passed, the fine will be
          applied and the "Renew" button won't work anymore)
          <br />
          6. You will be redirected to a page where you have to choose the due
          date.
          <br />
          7. Click "Renew issue" button.
        </span>
      </p>
      <Footer></Footer>
    </div>
  );
};

export default Extend;
