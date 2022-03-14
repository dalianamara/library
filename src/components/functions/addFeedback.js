const addFeedback = async (newFeedback) => {
  await fetch("http://localhost:5000/feedback/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFeedback),
  }).catch((error) => {
    window.alert(error);
    return;
  });
};

export default addFeedback;
