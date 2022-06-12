export const getIssues = async () => {
  const response = await fetch(`http://localhost:5000/issue/`);
  if (response.status !== 200) {
    const message = `An error occured: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const records = await response.json();
  return records;
};

export const getIssue = async (issueId) => {
  const records = getIssue();
  records.then((result) => {
    return result;
  });
  await fetch(`http://localhost:5000/${issueId}`, {
    method: "GET",
  });
};
