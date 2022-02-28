const addLibrarian = async (newLibrarian) => {
  await fetch("http://localhost:5000/librarian/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLibrarian),
  }).catch((error) => {
    window.alert(error);
    return;
  });
};

export default addLibrarian;
