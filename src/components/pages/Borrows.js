import "../Content.css";
import Footer from "../Footer";
const Borrows = () => {
  return (
    <div className="content">
      <h1>Borrows and returns</h1>
      <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
      <p>
        • Depending on the number of copies of a book, the books can pe borrowed
        for 1 month with the possibility of extending it <b>before</b> due date.
        If the book loan has expired, you have to return it, then if it's
        possible to borrow it again.
        <br />
        <span style={{ fontSize: "20px", lineHeight: "1.6" }}>
          <b>The steps for borrowing a book:</b>
        </span>
        <span
          style={{ marginLeft: "10px", marginTop: "-10px", lineHeight: "1.6" }}
        >
          1. Create an account.
          <br />
          2. Hover the "MY LIBRARY" menu item
          <br />
          3. Click "Catalogue"
          <br />
          4. Choose the book you want to borrow
          <br />
          5. Click "Issue Book" button (If the book is out of stock then it will
          appear "Reserve book" button)
          <br />
          6. You will be redirected to a page where you have to choose the
          delivery type: either home delivery or pickup. Choose whatever
          delivery you want.
          <br />
          <span style={{ marginLeft: "15px", lineHeight: "1.6" }}>
            • If you choose <b>home delivery</b> then you have to fill in your
            address. For this you have to click "Change address" and fill the
            empty spaces.
          </span>
          <br />
          <span style={{ marginLeft: "15px", lineHeight: "1.6" }}>
            • If you choose <b>pickup delivery</b> then you have to go to the
            library address mentioned in the pickup area. No other details
            should be changed.
          </span>
          <br />
          7. A pop up will appear with the issue confirmation.
          <br />
          8. The librarian will approve or reject your issue.
        </span>
      </p>
      <Footer></Footer>
    </div>
  );
};

export default Borrows;
