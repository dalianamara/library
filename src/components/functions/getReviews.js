export const getReviews = async () => {
  const response = await fetch(`http://localhost:5000/review/`);
  if (!response.ok) {
    const message = `An error occured: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const records = await response.json();
  return records;
};

export const getReview = async (bookId) => {
  const records = getReviews();
  records.then((result) => {
    return result;
  });
  await fetch(`http://localhost:5000/${bookId}`, {
    method: "GET",
  });
  console.log(records);
  //   const newRecords = records.filter((el) => el._id !== bookId);
  //   return newRecords;
};
