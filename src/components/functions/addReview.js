const addReview = async (newReview) => {
  await fetch("http://localhost:5000/review/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReview),
  }).catch((error) => {
    window.alert(error);
    return;
  });
};

export default addReview;
