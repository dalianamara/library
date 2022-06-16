const editBook = async (bookId, editedBook) => {
  await fetch(`http://localhost:5000/book/edit/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedBook),
  }).catch((error) => {
    window.alert("bookid");
    return;
  });
};

export default editBook;
