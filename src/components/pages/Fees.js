import "../Content.css";
import Footer from "../Footer";
const Fees = () => {
  return (
    <div className="content">
      <h1>Fines and Fees</h1>
      <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
      <p>
        • Non-compliance with the loan term is sanctioned with the payment of a
        penalty of <b>0.3 lei</b> for each day of delay, for each book.
      </p>
      <Footer></Footer>
    </div>
  );
};

export default Fees;
