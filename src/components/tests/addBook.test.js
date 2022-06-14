import addBooks from "../functions/addBooks";
import request from "supertest";
describe("AddBook tests", () => {
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

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(bookModel),
      })
    );
    const res = request("http://localhost:5000").get("/book");
    console.log(res);
    await addBooks(bookModel);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
