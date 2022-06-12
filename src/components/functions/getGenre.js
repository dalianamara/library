export const getGenre = async () => {
  const response = await fetch(`http://localhost:5000/genre/`);
  if (response.status !== 200) {
    const message = `An error occured: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const records = await response.json();
  return Promise.resolve(records);
};
