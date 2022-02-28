import "../Content.css";
import Footer from "../Footer";
import "../css/faq.css";
const Faq = () => {
  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Frequenly Asked Questions</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <p>
          <div className="question">Where is this library located?</div>
          <div className="answer">*ADD LOCATION*</div>
        </p>

        <p>
          <div className="question">
            What is the time for the return of the borrowed documents?{" "}
          </div>
          <div className="answer">
            The legal time in which you can return the documents is 14 working
            days. It can be extended with librarian's approval.
          </div>
        </p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Faq;
