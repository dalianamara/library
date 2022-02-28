const addBooks = async (newBook) => {
  await fetch("http://localhost:5000/book/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  }).catch((error) => {
    window.alert(error);
    return;
  });
};

export default addBooks;
