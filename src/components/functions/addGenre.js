const addGenre = async (newGenre) => {
  await fetch("http://localhost:5000/genre/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGenre),
  }).catch((error) => {
    window.alert(error);
    return;
  });
};

export default addGenre;
