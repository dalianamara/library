const editIssue = async (issueId, newIssue) => {
  await fetch(`http://localhost:5000/issue/edit/${issueId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newIssue),
  }).catch((error) => {
    window.alert("issue");
    return;
  });
};

export default editIssue;
