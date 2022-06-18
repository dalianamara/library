import addBooks from "../functions/addBooks";
describe("AddBook test", () => {
  test("Given any input the book is added in database", async () => {
    const bookModel = {
      title: "HTML & CSS: Design and Build Websites",
      author: "Jon Duckett",
      genre: "Programming",
      cover: "cover",
      year: 2014,
      description: "An introduction to the basics of HTML and CSS",
      pages: 512,
      publisher: "John Wiley & Sons",
      stock: 3,
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(bookModel),
      })
    );

    await addBooks(bookModel);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
