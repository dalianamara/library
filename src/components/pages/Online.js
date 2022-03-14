import "../Content.css";
import Footer from "../Footer";
const Online = () => {
  return (
    <>
      <div className="content">
        <h1 style={{ marginBlockEnd: "0em" }}>Online Public Acces Catalogue</h1>
        <hr style={{ border: "1px solid black", borderColor: "#A04000" }}></hr>
        <p>
          • In this online catalogue, you can find several books that you can
          borrow, extend the time for the return of the borrowed documents,
          access to the section "Fine and Fees" where you can see if you have
          any penalties, access to your personal details, where you can edit the
          information.
          <br />• You can search books by title.
          <br />• You can filter books by genre.
          <br />• You can view the whole catalogue.
        </p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Online;
