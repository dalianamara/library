const addIssue = async (newIssue) => {
  await fetch("http://localhost:5000/issue/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newIssue),
  }).catch((error) => {
    window.alert(error);
    return;
  });
};

export default addIssue;
