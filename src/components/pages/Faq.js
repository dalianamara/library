import "../Content.css";
import Footer from "../Footer";
import "../css/faq.css";
const Faq = () => {
  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Frequenly Asked Questions</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>

        <div className="question">Where is this library located?</div>
        <div className="answer">
          Ioan Slavici Street, nr. 20
          <br />
          Timisoara, 300077
          <br />
          Timis, Romania
        </div>
        <br />
        <div className="question">
          What is the time for the return of the borrowed documents?{" "}
        </div>
        <div className="answer">
          The legal time in which you can return the documents is 14 working
          days.
        </div>
        <br />
        <div className="question">
          What is the fee in case return was not done before due date?{" "}
        </div>
        <div className="answer">
          Non-compliance with the loan term is sanctioned with the payment of a
          penalty of <b>0.3 lei</b> for each day of delay, for each book.
        </div>
        <br />
      </div>
      <Footer></Footer>
    </>
  );
};

export default Faq;
