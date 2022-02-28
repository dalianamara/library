export const getUsers = async () => {
  const response = await fetch(`http://localhost:5000/record/`);
  if (!response.ok) {
    const message = `An error occured: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const records = await response.json();
  return Promise.resolve(records);
};

export const getUser = async (userId) => {
  const records = await getUsers();
  await fetch(`http://localhost:5000/record/${userId}`, {
    method: "GET",
  });
  const newRecords = records.filter((el) => el._id === userId);
  return newRecords;
};
