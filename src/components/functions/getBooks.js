export const getBooks = async () => {
  const response = await fetch(`http://localhost:5000/book/`);
  if (!response.ok) {
    const message = `An error occured: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const records = await response.json();
  return records;
};

export const getBook = async (bookId) => {
  const records = getBooks();
  records.then((result) => {
    return result;
  });
  await fetch(`http://localhost:5000/${bookId}`, {
    method: "GET",
  });
  //   const newRecords = records.filter((el) => el._id !== bookId);
  //   return newRecords;
};
