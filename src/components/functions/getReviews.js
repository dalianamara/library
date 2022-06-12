export const getReviews = async () => {
  const response = await fetch(`http://localhost:5000/review/`);
  if (response.status !== 200) {
    const message = `An error occured: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const records = await response.json();
  return records;
};
